import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Área superficial de cilindros';
}

export function tipo() {
  return 0; // 0 - Opción múltiple
}

// Función para redondear a 3 cifras significativas (estándar IB)
function roundTo3SF(num) {
  if (num === 0) return 0;
  let d = Math.ceil(Math.log10(Math.abs(num)));
  let power = 3 - d;
  let magnitude = Math.pow(10, power);
  let shifted = Math.round(num * magnitude);
  return shifted / magnitude;
}

export async function pregunta(numeroPregunta) {
  try {
    const r = Math.floor(Math.random() * 8) + 3; // radio 3 a 10 cm
    const h = Math.floor(Math.random() * 10) + 5; // altura 5 a 14 cm

    // Área superficial total de un cilindro cerrado: A = 2*pi*r*h + 2*pi*r^2
    const areaCurva = 2 * Math.PI * r * h;
    const areaBases = 2 * Math.PI * r * r;
    const areaTotal = areaCurva + areaBases;
    const ansCorrect = roundTo3SF(areaTotal);

    const svgHTML = `
      <svg width="220" height="200" viewBox="0 0 220 200" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
        <!-- Tapa inferior posterior discontinua -->
        <path d="M 50 140 A 60 20 0 0 1 170 140" fill="none" stroke="#7fb3d5" stroke-width="1.5" stroke-dasharray="3,3" />
        <!-- Tapa inferior frontal sólida -->
        <path d="M 50 140 A 60 20 0 0 0 170 140" fill="none" stroke="#2980b9" stroke-width="2" />
        
        <!-- Laterales del cilindro -->
        <line x1="50" y1="50" x2="50" y2="140" stroke="#2980b9" stroke-width="2" />
        <line x1="170" y1="50" x2="170" y2="140" stroke="#2980b9" stroke-width="2" />
        
        <!-- Tapa superior elipse sólida -->
        <ellipse cx="110" cy="50" rx="60" ry="20" fill="#d4e6f1" stroke="#2980b9" stroke-width="2" />
        
        <!-- Centro y radio en la tapa superior -->
        <circle cx="110" cy="50" r="2.5" fill="#333" />
        <line x1="110" y1="50" x2="170" y2="50" stroke="#333" stroke-width="1.5" />
        <text x="140" y="44" font-family="sans-serif" font-size="11px" font-weight="bold" fill="#333" text-anchor="middle">r = ${r} cm</text>
        
        <!-- Línea y texto de altura -->
        <line x1="35" y1="50" x2="35" y2="140" stroke="#555" stroke-width="1.5" />
        <line x1="30" y1="50" x2="40" y2="50" stroke="#555" stroke-width="1" />
        <line x1="30" y1="140" x2="40" y2="140" stroke="#555" stroke-width="1" />
        <text x="25" y="100" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#333" text-anchor="end">h = ${h} cm</text>
      </svg>
    `;

    const P = `
      ${numeroPregunta === 0 ? '<h2>Área superficial total del cilindro cerrado: $$A = 2\\pi rh + 2\\pi r^2$$</h2>' : ''}
      <p>${numeroPregunta + 1}.- Calcule el área superficial total del cilindro cerrado mostrado en la figura. Redondee su respuesta a 3 cifras significativas.</p>
      <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
        ${svgHTML}
      </div>
    `;

    const R = [`$${ansCorrect}\\text{ cm}^2$`];

    // Distractores plausibles
    // 1. Solo área curva lateral (sin tapas)
    R.push(`$${roundTo3SF(areaCurva)}\\text{ cm}^2$`);

    // 2. Con una sola tapa (abierto por un extremo)
    R.push(`$${roundTo3SF(areaCurva + Math.PI * r * r)}\\text{ cm}^2$`);

    // 3. Volumen del cilindro (pi * r^2 * h)
    const vol = Math.PI * r * r * h;
    R.push(`$${roundTo3SF(vol)}\\text{ cm}^2$`);

    // 4. Fórmula errónea pi*r*h + pi*r^2 (falta factor 2 en ambos términos)
    R.push(`$${roundTo3SF(Math.PI * r * h + Math.PI * r * r)}\\text{ cm}^2$`);

    // 5. Variación
    let offset = (Math.random() * 30 - 15);
    if (Math.abs(offset) < 5) offset = 15;
    R.push(`$${roundTo3SF(Math.abs(areaTotal + offset))}\\text{ cm}^2$`);

    for (let j = 1; j < 6; ++j) {
      let intentos = 0;
      while (tlacu.pregunta.hayRepetidos(R) && intentos < 20) {
        let varOffset = (Math.random() * 40 - 20);
        if (Math.abs(varOffset) < 3) varOffset = 18;
        R[j] = `$${roundTo3SF(Math.abs(areaTotal + varOffset))}\\text{ cm}^2$`;
        intentos++;
      }
    }

    return [P, R];

  } catch (error) {
    console.error('Error al generar la pregunta:', error);
  }
}
