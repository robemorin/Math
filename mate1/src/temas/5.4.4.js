import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Decaimiento exponencial (Abierta)';
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
      { tipo: 'radiactivo', elemento: 'un isótopo radiactivo', unidadMasa: 'g', unidadTiempo: 'años', u0_min: 50, u0_max: 200, p_min: 8, p_max: 25, n_min: 3, n_max: 8 },
      { tipo: 'poblacion', elemento: 'una especie en peligro de extinción', unidadMasa: 'individuos', unidadTiempo: 'años', u0_min: 400, u0_max: 950, p_min: 4, p_max: 12, n_min: 4, n_max: 10 },
      { tipo: 'medicamento', elemento: 'un medicamento en el torrente sanguíneo', unidadMasa: 'mg', unidadTiempo: 'horas', u0_min: 100, u0_max: 500, p_min: 12, p_max: 30, n_min: 3, n_max: 7 }
    ];

    const ctx = contextos[Math.floor(Math.random() * contextos.length)];
    const u0 = Math.floor(Math.random() * (ctx.u0_max - ctx.u0_min + 1)) + ctx.u0_min;
    const p = Math.floor(Math.random() * (ctx.p_max - ctx.p_min + 1)) + ctx.p_min;
    const n = Math.floor(Math.random() * (ctx.n_max - ctx.n_min + 1)) + ctx.n_min;

    const r = 1 - p / 100;
    const exactVal = u0 * Math.pow(r, n);
    const ansCorrect = ctx.tipo === 'poblacion' ? Math.round(exactVal) : roundTo3SF(exactVal);

    const unidadStr = ctx.unidadMasa === 'individuos' ? 'individuos' : ctx.unidadMasa;
    const redTexto = ctx.tipo === 'poblacion' ? 'al entero más cercano' : 'a 3 cifras significativas';

    const Pregunta = `
      <div class="pregunta-abierta" data-u0="${u0}" data-p="${p}" data-n="${n}" data-tipo="${ctx.tipo}" style="display: none;">
        <p>${i + 1}.- La cantidad inicial de ${ctx.elemento} es de $${u0}\\text{ ${ctx.unidadMasa === 'individuos' ? '' : ctx.unidadMasa}}$. Si se reduce a una tasa constante del $${p}\\%$ cada ${ctx.unidadTiempo.slice(0, -1)}, calcula la cantidad restante después de $${n}$ ${ctx.unidadTiempo} (redondea ${redTexto}). <span id="resultado_${i}" name="question"></span></p>
        
        <table>
          <tr>
            <td>Cantidad restante: </td>
            <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> ${ctx.tipo === 'poblacion' ? '' : unidadStr}</td>
          </tr>
        </table>
      </div>
    `;

    if (esImprimible) {
      return [Pregunta, `$${ansCorrect}${ctx.tipo === 'poblacion' ? '' : `\\text{ ${unidadStr}}`}$`];
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
    const num_n = parseFloat(pregunta[i].dataset.n);
    const tipo = pregunta[i].dataset.tipo;

    const exactVal = u0 * Math.pow(1 - p / 100, num_n);
    const ansCorrect = tipo === 'poblacion' ? Math.round(exactVal) : roundTo3SF(exactVal);

    let respuestaStr = mathFields[0].value.trim();
    let respuestaVal = parseFloat(respuestaStr.replace(/,/g, '.'));

    if (isNaN(respuestaVal)) {
      mathFields[0].style.backgroundColor = "#ffcccc";
      return [puntos, totalPuntos];
    }

    let esCorrecto = false;
    if (tipo === 'poblacion') {
      esCorrecto = Math.abs(respuestaVal - ansCorrect) <= 1 || Math.abs(respuestaVal - exactVal) < 1.0;
    } else {
      const errorRelativo = Math.abs(respuestaVal - exactVal) / exactVal;
      const errorAbsoluto = Math.abs(respuestaVal - ansCorrect);
      esCorrecto = errorAbsoluto < 0.05 || errorRelativo < 0.015;
    }

    if (esCorrecto) {
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
