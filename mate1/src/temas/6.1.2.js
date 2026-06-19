import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Circunferencia de un círculo (Abierta)';
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
    // Generar radio aleatorio entre 3 y 15 cm
    const r = Math.floor(Math.random() * 13) + 3;
    
    // Calcular circunferencia exacta y redondeada
    const C_val = 2 * Math.PI * r;
    const ans3sf = roundTo3SF(C_val);

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

    const Pregunta = `
      ${i === 0 ? '<h2>Fórmula de la circunferencia: $$C = 2\\pi r$$ o $$C = \\pi d$$</h2>' : ''}
      <div class="pregunta-abierta" data-r="${r}" style="display: none;">
        <p>${i + 1}.- Determine la circunferencia (perímetro) del círculo mostrado en la siguiente figura. Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
        
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
          ${svgHTML}
        </div>
        
        <table>
          <tr>
            <td>Circunferencia: </td>
            <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> cm</td>
          </tr>
        </table>
      </div>
    `;

    if (esImprimible) {
      return [Pregunta, `$${ans3sf}\\text{ cm}$`];
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
    
    // Calcular en caliente para no exponer la respuesta
    const r = parseFloat(pregunta[i].dataset.r);
    const ansCorrectExact = 2 * Math.PI * r;
    const ansCorrect3SF = roundTo3SF(ansCorrectExact);

    let respuestaStr = mathFields[0].value.trim();
    
    // Limpieza básica de la entrada y conversión a flotante
    let respuestaVal = parseFloat(respuestaStr.replace(/,/g, '.'));

    if (isNaN(respuestaVal)) {
      mathFields[0].style.backgroundColor = "#ffcccc";
      return [puntos, totalPuntos];
    }

    // Tolerancia razonable para diferencias de redondeo o valor aproximado de pi
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
