import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Circunferencia de un círculo';
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
    // Generar radio aleatorio entre 3 y 15 cm
    const r = Math.floor(Math.random() * 13) + 3;
    
    // Calcular circunferencia exacta y redondeada
    const C_val = 2 * Math.PI * r;
    const ansCorrect = roundTo3SF(C_val);

    const center = { x: 100, y: 100 };
    const radiusSVG = 70;

    const svgHTML = `
      <svg width="200" height="200" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
        <!-- Círculo completo en línea sólida destacado -->
        <circle cx="${center.x}" cy="${center.y}" r="${radiusSVG}" fill="none" stroke="#ff4757" stroke-width="4.5" />
        
        <!-- Centro del círculo -->
        <circle cx="${center.x}" cy="${center.y}" r="3" fill="#444" />
        
        <!-- Radio del círculo -->
        <line x1="${center.x}" y1="${center.y}" x2="${center.x + radiusSVG}" y2="${center.y}" stroke="#444" stroke-width="1.5" />
        
        <!-- Texto del radio r -->
        <text x="${center.x + radiusSVG / 2}" y="${center.y - 8}" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#333" text-anchor="middle">r = ${r} cm</text>
      </svg>
    `;

    const P = `
      ${numeroPregunta === 0 ? '<h2>Fórmula de la circunferencia: $$C = 2\\pi r$$ o $$C = \\pi d$$</h2>' : ''}
      <p>${numeroPregunta + 1}.- Determine la circunferencia (perímetro) del círculo mostrado en la siguiente figura. Redondee su respuesta a 3 cifras significativas.</p>
      <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
        ${svgHTML}
      </div>
    `;

    // Opción correcta
    const R = [`$${ansCorrect}\\text{ cm}$`];

    // Generar distractores plausibles
    // 1. Área del círculo (fórmula errónea: pi * r^2)
    const area = Math.PI * r * r;
    R.push(`$${roundTo3SF(area)}\\text{ cm}$`);

    // 2. Olvidar el factor 2 (pi * r)
    R.push(`$${roundTo3SF(Math.PI * r)}\\text{ cm}$`);

    // 3. Olvidar pi (2 * r)
    R.push(`$${roundTo3SF(2 * r)}\\text{ cm}$`);

    // 4. Multiplicar por 4 (4 * pi * r)
    R.push(`$${roundTo3SF(4 * Math.PI * r)}\\text{ cm}$`);

    // 5. Variación aleatoria
    let offset = (Math.random() * 6 - 3);
    if (Math.abs(offset) < 0.5) offset += 1.5;
    R.push(`$${roundTo3SF(C_val + offset)}\\text{ cm}$`);

    // Asegurar que no haya repetidos
    for (let j = 1; j < 6; ++j) {
      let intentos = 0;
      while (tlacu.pregunta.hayRepetidos(R) && intentos < 20) {
        let varOffset = (Math.random() * 10 - 5);
        if (Math.abs(varOffset) < 0.5) varOffset = 2;
        R[j] = `$${roundTo3SF(Math.abs(C_val + varOffset))}\\text{ cm}$`;
        intentos++;
      }
    }

    return [P, R];

  } catch (error) {
    console.error('Error al generar la pregunta:', error);
  }
}
