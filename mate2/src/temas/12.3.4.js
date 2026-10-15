import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Puntos máximos, mínimos y optimización (Abierta)';
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
    // 4 tipos de problemas de máximos/mínimos y optimización extraídos de la ficha 5.3.1
    // 0: Polinomio factorizado f(x) = x(x - 3k)^2 -> Máximo local en x = k
    // 1: Función con radical f(x) = ax - b*sqrt(x) -> Punto crítico en x = (b / (2a))^2
    // 2: Función racional f(x) = ax + b/x^2 -> Mínimo local en x = (2b/a)^(1/3)
    // 3: Optimización contextual (Contenedor abierto de base cuadrada con V fijo) -> Lado x óptimo
    const tipoProblema = Math.floor(Math.random() * 4);

    let enunciado = '';
    let promptCampo = '';
    let unidadTxt = '';
    let ansCorrectExact = 0;

    if (tipoProblema === 0) {
      // Caso 0: f(x) = x(x - 3k)^2 = x^3 - 6k x^2 + 9k^2 x
      // f'(x) = 3(x - k)(x - 3k). Máximo local en x = k, Mínimo local en x = 3k.
      const k = Math.floor(Math.random() * 4) + 2; // 2, 3, 4, 5
      const coefB = 6 * k;
      const coefC = 9 * k * k;

      // Pedir coordenada x del máximo local (x = k)
      ansCorrectExact = k;
      enunciado = `Considere la función polinomial $f(x) = x(x - ${3 * k})^2 = x^3 - ${coefB}x^2 + ${coefC}x$. Halle la coordenada $x$ del <b>máximo local</b> de la función resolviendo analíticamente la ecuación $f'(x) = 0$.`;
      promptCampo = 'Coordenada $x$ del máximo local:';
      unidadTxt = '';

    } else if (tipoProblema === 1) {
      // Caso 1: g(x) = ax - b \sqrt{x}
      // g'(x) = a - b / (2 \sqrt{x}) = 0 => \sqrt{x} = b / (2a) => x = (b / (2a))^2
      const r = Math.floor(Math.random() * 3) + 2; // r = 2, 3, 4 => x crítico = 4, 9, 16
      const a = Math.floor(Math.random() * 3) + 2; // 2, 3, 4
      const b = 2 * a * r;

      ansCorrectExact = r * r;
      enunciado = `Sea la función $g(x) = ${a}x - ${b}\\sqrt{x}$, definida para $x > 0$. Halle el valor de $x$ que anula su primera derivada ($g'(x) = 0$).`;
      promptCampo = 'Valor de $x$ crítico:';
      unidadTxt = '';

    } else if (tipoProblema === 2) {
      // Caso 2: h(x) = ax + b / x^2 para x > 0
      // h'(x) = a - 2b / x^3 = 0 => x^3 = 2b / a
      const xCrit = Math.floor(Math.random() * 3) + 2; // 2, 3, 4
      const a = Math.floor(Math.random() * 3) + 2; // 2, 3, 4
      const b = 0.5 * a * Math.pow(xCrit, 3);

      ansCorrectExact = xCrit;
      enunciado = `Considere la función racional $h(x) = ${a}x + \\frac{${b}}{x^2}$, con $x > 0$. Determine la coordenada $x$ donde la función alcanza su <b>mínimo local</b>.`;
      promptCampo = 'Coordenada $x$ del mínimo:';
      unidadTxt = '';

    } else {
      // Caso 3: Optimización contextual (Caja abierta de base cuadrada con volumen fijo V0)
      // A(x) = x^2 + 4V0 / x.
      // A'(x) = 2x - 4V0 / x^2 = 0 => 2x^3 = 4V0 => x^3 = 2V0 => x = cbrt(2V0)
      const V0 = (Math.floor(Math.random() * 4) + 2) * 100; // 200, 300, 400, 500 cm^3
      const coefLateral = 4 * V0;
      ansCorrectExact = Math.cbrt(coefLateral / 2);

      enunciado = `Se desea fabricar un contenedor abierto por la parte superior, con base cuadrada de lado $x\\text{ cm}$ y volumen obligatorio de $V = ${V0}\\text{ cm}^3$. El área de material requerido es $A(x) = x^2 + \\frac{${coefLateral}}{x}$. Halle el valor del lado de la base $x$ que <b>minimiza</b> el uso de material.`;
      promptCampo = 'Lado $x$ óptimo:';
      unidadTxt = 'cm';
    }

    const ans3sf = roundTo3SF(ansCorrectExact);

    const Pregunta = `
      ${i === 0 ? '<h2>Puntos estacionarios y optimización: resolver $f\'(x) = 0$ y evaluar criterios de extremos relativos.</h2>' : ''}
      <div class="pregunta-abierta" data-ans="${ansCorrectExact}" style="display: none;">
        <p>${i + 1}.- ${enunciado} Redondee su respuesta a 3 cifras significativas si no es un número entero. <span id="resultado_${i}" name="question"></span></p>
        
        <table style="margin: 15px auto;">
          <tr>
            <td style="padding-right: 10px; font-weight: bold;">${promptCampo} </td>
            <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> ${unidadTxt}</td>
          </tr>
        </table>
      </div>
    `;

    if (esImprimible) {
      return [Pregunta, `$${ans3sf}${unidadTxt ? `\\text{ ${unidadTxt}}` : ''}$`];
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

    const ansCorrectExact = parseFloat(pregunta[i].dataset.ans);
    const ansCorrect3SF = roundTo3SF(ansCorrectExact);

    let respuestaStr = mathFields[0].value.trim();
    let respuestaVal = parseFloat(respuestaStr.replace(/,/g, '.'));

    if (isNaN(respuestaVal)) {
      mathFields[0].style.backgroundColor = "#ffcccc";
      return [puntos, totalPuntos];
    }

    const errorRelativo = Math.abs(respuestaVal - ansCorrectExact) / Math.abs(ansCorrectExact);
    const errorAbsoluto3SF = Math.abs(respuestaVal - ansCorrect3SF);

    // Margen de tolerancia IB
    if (errorAbsoluto3SF < 0.03 || errorRelativo < 0.015) {
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
