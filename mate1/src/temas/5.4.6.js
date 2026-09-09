import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Tiempo en modelos exponenciales (Abierta)';
}

export function tipo() {
  return 3; // 3 - Abierto interactivo
}

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
    const contextos = [
      { especie: 'bacterias', unidadTiempo: 'horas', u0_min: 100, u0_max: 300, p_min: 12, p_max: 25, mult_min: 3, mult_max: 8 },
      { especie: 'conejos en una reserva', unidadTiempo: 'meses ', u0_min: 50, u0_max: 150, p_min: 8, p_max: 18, mult_min: 4, mult_max: 10 },
      { especie: 'truchas en un lago', unidadTiempo: 'años', u0_min: 200, u0_max: 600, p_min: 6, p_max: 15, mult_min: 3, mult_max: 6 }
    ];

    const ctx = contextos[Math.floor(Math.random() * contextos.length)];
    const u0 = Math.floor(Math.random() * (ctx.u0_max - ctx.u0_min + 1)) + ctx.u0_min;
    const p = Math.floor(Math.random() * (ctx.p_max - ctx.p_min + 1)) + ctx.p_min;
    const multiplicador = Math.floor(Math.random() * (ctx.mult_max - ctx.mult_min + 1)) + ctx.mult_min;
    const meta = u0 * multiplicador;

    const r = 1 + p / 100;
    const exactN = Math.log(meta / u0) / Math.log(r);
    const ansCorrect = roundTo3SF(exactN);

    const Pregunta = `
      <div class="pregunta-abierta" data-u0="${u0}" data-p="${p}" data-meta="${meta}" style="display: none;">
        <p>${i + 1}.- Una población inicial de $${u0}$ ${ctx.especie} crece a una tasa constante del $${p}\\%$ cada ${ctx.unidadTiempo.slice(0, -1)}. ¿Cuánto tiempo tomará para que la población alcance los $${meta}$ individuos? (Calcula y redondea a 3 cifras significativas). <span id="resultado_${i}" name="question"></span></p>
        
        <table>
          <tr>
            <td>Tiempo estimado: </td>
            <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> ${ctx.unidadTiempo}</td>
          </tr>
        </table>
      </div>
    `;

    if (esImprimible) {
      return [Pregunta, `$${ansCorrect}\\text{ ${ctx.unidadTiempo}}$`];
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

    const u0 = parseFloat(pregunta[i].dataset.u0);
    const p = parseFloat(pregunta[i].dataset.p);
    const meta = parseFloat(pregunta[i].dataset.meta);

    const r = 1 + p / 100;
    const exactN = Math.log(meta / u0) / Math.log(r);
    const ansCorrect = roundTo3SF(exactN);

    let respuestaStr = mathFields[0].value.trim();
    let respuestaVal = parseFloat(respuestaStr.replace(/,/g, '.'));

    if (isNaN(respuestaVal)) {
      mathFields[0].style.backgroundColor = "#ffcccc";
      return [puntos, totalPuntos];
    }

    const errorRelativo = Math.abs(respuestaVal - exactN) / exactN;
    const errorAbsoluto = Math.abs(respuestaVal - ansCorrect);

    if (errorAbsoluto < 0.05 || errorRelativo < 0.02) {
      puntos++;
      mathFields[0].style.border = "solid 5px green";
      mathFields[0].style.backgroundColor = "#e2fbe2";
    } else {
      mathFields[0].style.border = "solid 5px red";
      document.getElementById(`error_${i}`).textContent = ` Correcto: ${ansCorrect}`;
    }

    return [puntos, totalPuntos];
  };
}
