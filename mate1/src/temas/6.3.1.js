import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Área superficial de prismas rectos';
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
    // Dimensiones del prisma recto rectangular (caja)
    const l = Math.floor(Math.random() * 8) + 4; // largo 4 a 11 cm
    const w = Math.floor(Math.random() * 5) + 3; // ancho 3 a 7 cm
    const h = Math.floor(Math.random() * 7) + 3; // alto 3 a 9 cm

    const areaTotal = 2 * (l * w + l * h + w * h);
    const ansCorrect = roundTo3SF(areaTotal);

    // SVG en perspectiva isométrica / oblicua
    const svgHTML = `
      <svg width="220" height="180" viewBox="0 0 220 180" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
        <!-- Cara frontal -->
        <rect x="30" y="70" width="110" height="70" fill="#e8f4fd" stroke="#2980b9" stroke-width="2" />
        
        <!-- Cara superior -->
        <polygon points="30,70 80,30 190,30 140,70" fill="#d4e6f1" stroke="#2980b9" stroke-width="2" />
        
        <!-- Cara lateral derecha -->
        <polygon points="140,70 190,30 190,100 140,140" fill="#a9cce3" stroke="#2980b9" stroke-width="2" />
        
        <!-- Líneas ocultas discontinuas -->
        <line x1="30" y1="140" x2="80" y2="100" stroke="#7fb3d5" stroke-width="1.5" stroke-dasharray="3,3" />
        <line x1="80" y1="100" x2="190" y2="100" stroke="#7fb3d5" stroke-width="1.5" stroke-dasharray="3,3" />
        <line x1="80" y1="100" x2="80" y2="30" stroke="#7fb3d5" stroke-width="1.5" stroke-dasharray="3,3" />

        <!-- Dimensiones y etiquetas -->
        <text x="85" y="158" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#333" text-anchor="middle">l = ${l} cm</text>
        <text x="175" y="130" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#333" text-anchor="middle">w = ${w} cm</text>
        <text x="18" y="110" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#333" text-anchor="middle">h = ${h} cm</text>
      </svg>
    `;

    const P = `
      ${numeroPregunta === 0 ? '<h2>Área superficial total de un prisma rectangular: $$A = 2(lw + lh + wh)$$</h2>' : ''}
      <p>${numeroPregunta + 1}.- Calcule el área superficial total del prisma rectangular mostrado en la figura. Redondee su respuesta a 3 cifras significativas.</p>
      <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
        ${svgHTML}
      </div>
    `;

    const R = [`$${ansCorrect}\\text{ cm}^2$`];

    // Distractores plausibles
    // 1. Volumen en lugar de área
    const vol = l * w * h;
    R.push(`$${roundTo3SF(vol)}\\text{ cm}^2$`);

    // 2. Olvidar el factor 2 (solo la suma de 3 caras)
    const mitadArea = l * w + l * h + w * h;
    R.push(`$${roundTo3SF(mitadArea)}\\text{ cm}^2$`);

    // 3. Olvidar las dos bases (área lateral 2(lh + wh))
    const areaLat = 2 * (l * h + w * h);
    R.push(`$${roundTo3SF(areaLat)}\\text{ cm}^2$`);

    // 4. Sumar perímetro por altura sin bases
    const dist4 = (2 * l + 2 * w) * h + l * w;
    R.push(`$${roundTo3SF(dist4)}\\text{ cm}^2$`);

    // 5. Offset
    let offset = Math.floor(Math.random() * 20) + 10;
    R.push(`$${roundTo3SF(areaTotal + offset)}\\text{ cm}^2$`);

    // Asegurar que no haya repetidos
    for (let j = 1; j < 6; ++j) {
      let intentos = 0;
      while (tlacu.pregunta.hayRepetidos(R) && intentos < 20) {
        let varOffset = (Math.random() * 30 - 15);
        if (Math.abs(varOffset) < 2) varOffset = 12;
        R[j] = `$${roundTo3SF(Math.abs(areaTotal + varOffset))}\\text{ cm}^2$`;
        intentos++;
      }
    }

    return [P, R];

  } catch (error) {
    console.error('Error al generar la pregunta:', error);
  }
}
