import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Área de una corona circular (Abierta)';
}

export function tipo() {
  return 3; // 3 - Abierto interactivo
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

export async function pregunta(i, totalPreguntas, esImprimible = false) {
  try {
    // Generar radio menor entre 2 y 8 cm
    const r = Math.floor(Math.random() * 7) + 2;
    // Generar radio mayor R tal que sea al menos 2 cm más grande y máximo 15 cm
    const R = r + Math.floor(Math.random() * 6) + 2;
    
    // Calcular área exacta para versión imprimible
    const Area_val = Math.PI * (R**2 - r**2);

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
        <text x="${center.x + rOuterSVG / 2 + 10}" y="${center.y + rOuterSVG / 4 + 10}" font-family="sans-serif" font-size="11px" font-weight="bold" fill="#333" text-anchor="middle">R = ${R}</text>
      </svg>
    `;

    const Pregunta = `
      ${i === 0 ? '<h2>$$A = \\pi (R^2 - r^2)$$</h2>' : ''}
      <div class="pregunta-abierta" data-r="${r}" data-rr="${R}" style="display: none;">
        <p>${i + 1}.- Determine el área de la corona circular sombreada sabiendo que $r=${r}$ y $R=${R}$. Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
        
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
          ${svgHTML}
        </div>
        
        <table>
          <tr>
            <td>Área de la corona: </td>
            <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> cm²</td>
          </tr>
        </table>
      </div>
    `;

    if (esImprimible) {
      return [Pregunta, `$${ans3sf}\\text{ cm}^2$`];
    }

    if (totalPreguntas - 1 === i) render(null, totalPreguntas);
    return Pregunta;

  } catch (error) {
    console.error('Error al cargar la pregunta:', error);
  }
}

export async function render(container, n, code) {
  window.accionR2P = function (i) {
    let totalPuntos = 1;
    let puntos = 0;
    let pregunta = document.getElementsByClassName('pregunta-abierta');
    const mathFields = pregunta[i].getElementsByTagName('math-field');
    
    // Calcular dinámicamente para proteger la respuesta
    const r = parseFloat(pregunta[i].dataset.r);
    const R = parseFloat(pregunta[i].dataset.rr);

    const ansCorrectExact = Math.PI * (R**2 - r**2);
    const ansCorrect3SF = roundTo3SF(ansCorrectExact);
    console.log(`${i}-. Respuesta correcta (exacta): ${ansCorrectExact}, Respuesta correcta (3SF): ${ansCorrect3SF} (R=${R}, r=${r})`);
    let respuestaStr = mathFields[0].value.trim();
    let respuestaVal = parseFloat(respuestaStr.replace(/,/g, '.'));

    if (isNaN(respuestaVal)) {
      mathFields[0].style.backgroundColor = "#ffcccc";
      return [puntos, totalPuntos];
    }

    const errorRelativo = Math.abs(respuestaVal - ansCorrectExact) / ansCorrectExact;
    const errorAbsoluto3SF = Math.abs(respuestaVal - ansCorrect3SF);

    if (errorAbsoluto3SF < 0.02 || errorRelativo < 0.01) {
      puntos++;
      mathFields[0].style.border = "solid 5px green";
      mathFields[0].style.backgroundColor = "#e2fbe2";
    } else {
      mathFields[0].style.border = "solid 5px red";
      document.getElementById(`error_${i}`).textContent = ` Correcto: ${ansCorrect3SF}`;
    }

    return [puntos, totalPuntos];
  };
}
