import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Crecimiento exponencial (Abierta)';
}

export function tipo() {
  return 3; // 3 - Abierto interactivo
}

export async function pregunta(i, totalPreguntas, esImprimible = false) {
  try {
    const contextos = [
      { especie: 'hormigas en un hormiguero', unidadTiempo: 'semanas', u0_min: 200, u0_max: 800, p_min: 5, p_max: 18, n_min: 5, n_max: 15 },
      { especie: 'venados en una reserva natural', unidadTiempo: 'años', u0_min: 30, u0_max: 90, p_min: 8, p_max: 22, n_min: 4, n_max: 10 },
      { especie: 'bacterias en un cultivo', unidadTiempo: 'horas', u0_min: 100, u0_max: 500, p_min: 15, p_max: 35, n_min: 3, n_max: 8 },
      { especie: 'conejos en una granja', unidadTiempo: 'meses', u0_min: 40, u0_max: 120, p_min: 6, p_max: 15, n_min: 6, n_max: 14 }
    ];

    const ctx = contextos[Math.floor(Math.random() * contextos.length)];
    const u0 = Math.floor(Math.random() * (ctx.u0_max - ctx.u0_min + 1)) + ctx.u0_min;
    const p = Math.floor(Math.random() * (ctx.p_max - ctx.p_min + 1)) + ctx.p_min;
    const n = Math.floor(Math.random() * (ctx.n_max - ctx.n_min + 1)) + ctx.n_min;

    const r = 1 + p / 100;
    const exactVal = u0 * Math.pow(r, n);
    const ansCorrect = Math.round(exactVal);

    const Pregunta = `
      <div class="pregunta-abierta" data-u0="${u0}" data-p="${p}" data-n="${n}" style="display: none;">
        <p>${i + 1}.- La población inicial de una colonia de ${ctx.especie} es de $${u0}$. Si la población aumenta a una tasa constante de $${p}\\%$ cada ${ctx.unidadTiempo.slice(0, -1)}, calcula la cantidad estimada de individuos presentes después de $${n}$ ${ctx.unidadTiempo} (redondea al entero más cercano). <span id="resultado_${i}" name="question"></span></p>
        
        <table>
          <tr>
            <td>Población final: </td>
            <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span></td>
          </tr>
        </table>
      </div>
    `;

    if (esImprimible) {
      return [Pregunta, `$${ansCorrect}$`];
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

    const exactVal = u0 * Math.pow(1 + p / 100, num_n);
    const ansCorrect = Math.round(exactVal);

    let respuestaStr = mathFields[0].value.trim();
    let respuestaVal = parseFloat(respuestaStr.replace(/,/g, '.'));

    if (isNaN(respuestaVal)) {
      mathFields[0].style.backgroundColor = "#ffcccc";
      return [puntos, totalPuntos];
    }

    // Tolerancia: exacto al entero redondeado o dentro de +-1 por diferencias de redondeo intermedio
    if (Math.abs(respuestaVal - ansCorrect) <= 1 || Math.abs(respuestaVal - exactVal) < 1.0) {
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
