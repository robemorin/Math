import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Área de una corona circular';
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
    // Generar radio menor entre 2 y 8 cm
    const r = Math.floor(Math.random() * 7) + 2;
    // Generar radio mayor R tal que sea al menos 2 cm más grande y máximo 15 cm
    const R_val = r + Math.floor(Math.random() * 6) + 2;
    
    // Calcular el área de la corona circular: A = pi * (R^2 - r^2)
    const Area_val = Math.PI * (R_val * R_val - r * r);
    const ansCorrect = roundTo3SF(Area_val);

    const center = { x: 100, y: 100 };
    const rOuterSVG = 75;
    const rInnerSVG = 35;

    // Calcular el punto diagonal para el radio mayor en 30 grados
    const rOuterPtX = center.x + rOuterSVG * Math.cos(30 * Math.PI / 180);
    const rOuterPtY = center.y + rOuterSVG * Math.sin(30 * Math.PI / 180);

    const svgHTML = `
      <svg width="200" height="200" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
        <!-- Círculo exterior relleno (el área de la corona) -->
        <circle cx="${center.x}" cy="${center.y}" r="${rOuterSVG}" fill="#e0e0e0" stroke="#444" stroke-width="2" />
        
        <!-- Círculo interior para vaciar el centro -->
        <circle cx="${center.x}" cy="${center.y}" r="${rInnerSVG}" fill="#fdfdfd" stroke="#444" stroke-width="2" />
        
        <!-- Centro del círculo -->
        <circle cx="${center.x}" cy="${center.y}" r="3" fill="#444" />
        
        <!-- Radio menor r (vertical hacia arriba) -->
        <line x1="${center.x}" y1="${center.y}" x2="${center.x}" y2="${center.y - rInnerSVG}" stroke="#444" stroke-width="1.5" />
        <text x="${center.x - 12}" y="${center.y - rInnerSVG / 2 + 4}" font-family="sans-serif" font-size="11px" font-weight="bold" fill="#333" text-anchor="middle">r = ${r}</text>
        
        <!-- Radio mayor R (diagonal hacia abajo derecha) -->
        <line x1="${center.x}" y1="${center.y}" x2="${rOuterPtX}" y2="${rOuterPtY}" stroke="#444" stroke-width="1.5" />
        <text x="${center.x + rOuterSVG / 2 + 10}" y="${center.y + rOuterSVG / 4 + 10}" font-family="sans-serif" font-size="11px" font-weight="bold" fill="#333" text-anchor="middle">R = ${R_val}</text>
      </svg>
    `;

    const P = `
      ${numeroPregunta === 0 ? '<h2> $$A = \\pi (R^2 - r^2)$$</h2>' : ''}
      <p>${numeroPregunta + 1}.- Determine el área de la corona circular, sabiendo que $r=${r}$ y $R=${R_val}$.</p>
      <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
        ${svgHTML}
      </div>
    `;

    // Opción correcta
    const R = [`$${ansCorrect}\\text{ cm}^2$`];

    // Generar distractores plausibles
    // 1. Error común: elevar al cuadrado la resta de radios (pi * (R - r)^2)
    const distRestaAlCuadrado = Math.PI * (R_val - r) * (R_val - r);
    R.push(`$${roundTo3SF(distRestaAlCuadrado)}\\text{ cm}^2$`);

    // 2. Sumar áreas en vez de restar (pi * (R^2 + r^2))
    const distSumaAreas = Math.PI * (R_val * R_val + r * r);
    R.push(`$${roundTo3SF(distSumaAreas)}\\text{ cm}^2$`);

    // 3. Área únicamente del círculo exterior (pi * R^2)
    const distSoloExterior = Math.PI * R_val * R_val;
    R.push(`$${roundTo3SF(distSoloExterior)}\\text{ cm}^2$`);

    // 4. Perímetro o diferencia de circunferencias (2 * pi * (R - r))
    const distPerimetro = 2 * Math.PI * (R_val - r);
    R.push(`$${roundTo3SF(distPerimetro)}\\text{ cm}^2$`);

    // 5. Desviación aleatoria
    let offset = (Math.random() * 8 - 4);
    if (Math.abs(offset) < 0.5) offset += 2;
    R.push(`$${roundTo3SF(Math.abs(Area_val + offset))}\\text{ cm}^2$`);

    // Asegurar que no haya repetidos
    for (let j = 1; j < 6; ++j) {
      let intentos = 0;
      while (tlacu.pregunta.hayRepetidos(R) && intentos < 20) {
        let varOffset = (Math.random() * 12 - 6);
        if (Math.abs(varOffset) < 0.5) varOffset = 3;
        R[j] = `$${roundTo3SF(Math.abs(Area_val + varOffset))}\\text{ cm}^2$`;
        intentos++;
      }
    }

    return [P, R];

  } catch (error) {
    console.error('Error al generar la pregunta:', error);
  }
}
