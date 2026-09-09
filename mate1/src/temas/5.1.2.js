import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Término general de una sucesión (Abierta)';
}

export function tipo() {
  return 3; // 3 - Abierto interactivo
}

export async function pregunta(i, totalPreguntas, esImprimible = false) {
  try {
    const tipoFormula = Math.floor(Math.random() * 4);
    let formulaLatex = '';
    let k = Math.floor(Math.random() * 6) + 2;
    let ansVal = 0;

    if (tipoFormula === 0) {
      const a = (Math.floor(Math.random() * 9) + 2) * (Math.random() < 0.3 ? -1 : 1);
      const b = Math.floor(Math.random() * 21) - 10;
      const bStr = b === 0 ? '' : (b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`);
      formulaLatex = `u_n = ${a === 1 ? '' : (a === -1 ? '-' : a)}n${bStr}`;
      k = Math.floor(Math.random() * 20) + 3;
      ansVal = a * k + b;
    } else if (tipoFormula === 1) {
      const a = Math.floor(Math.random() * 3) + 1;
      const b = Math.floor(Math.random() * 21) - 10;
      const bStr = b === 0 ? '' : (b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`);
      const aStr = a === 1 ? '' : a;
      formulaLatex = `u_n = ${aStr}n^2${bStr}`;
      k = Math.floor(Math.random() * 8) + 2;
      ansVal = a * (k * k) + b;
    } else if (tipoFormula === 2) {
      const base = [2, 3, 5][Math.floor(Math.random() * 3)];
      const c = Math.floor(Math.random() * 4) + 1;
      const cStr = c === 1 ? '' : `${c} \\times `;
      formulaLatex = `u_n = ${cStr}${base}^n`;
      k = base === 2 ? Math.floor(Math.random() * 6) + 1 : Math.floor(Math.random() * 4) + 1;
      ansVal = c * Math.pow(base, k);
    } else {
      const a = Math.floor(Math.random() * 15) + 5;
      const b = [2, 3][Math.floor(Math.random() * 2)];
      k = Math.floor(Math.random() * 5) + 2;
      if (Math.random() < 0.5) {
        formulaLatex = `u_n = ${a} - (-${b})^n`;
        ansVal = a - Math.pow(-b, k);
      } else {
        formulaLatex = `u_n = (-1)^n (${a}n)`;
        ansVal = Math.pow(-1, k) * (a * k);
      }
    }

    const Pregunta = `
      ${i === 0 ? '<h2>Sucesiones numéricas: Fórmula explícita</h2>' : ''}
      <div class="pregunta-abierta" data-ans="${ansVal}" style="display: none;">
        <p>${i + 1}.- Una sucesión está definida por la fórmula explícita $${formulaLatex}$. <span id="resultado_${i}" name="question"></span></p>
        <p>Halla el valor del término $u_{${k}}$.</p>
        
        <table>
          <tr>
            <td>$u_{${k}} = $</td>
            <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span></td>
          </tr>
        </table>
      </div>
    `;

    if (esImprimible) {
      return [Pregunta, `$${ansVal}$`];
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
    
    const ansCorrect = parseFloat(pregunta[i].dataset.ans);
    let respuestaStr = mathFields[0].value.trim();
    let respuestaVal = parseFloat(respuestaStr.replace(/,/g, '.'));

    if (isNaN(respuestaVal)) {
      mathFields[0].style.backgroundColor = "#ffcccc";
      return [puntos, totalPuntos];
    }

    if (Math.abs(respuestaVal - ansCorrect) < 0.001) {
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
