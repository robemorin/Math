//10.3.2.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs'
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
  return 'Pendiente de la tangente (Abierta)';
}

export function tipo() {
  return 3;
}

export async function pregunta(i, code, esImprimible = false) {
  try {
      let type = Math.floor(Math.random() * 2); 
      let latexFunc = "";
      let m = 0;
      let x0 = 0;
      
      do {
          if (type === 0) { // Polynomial
              let a = Math.floor(Math.random() * 9) - 4; 
              if (a === 0) a = 1;
              let b = Math.floor(Math.random() * 9) - 4;
              let c = Math.floor(Math.random() * 9) - 4;
              x0 = Math.floor(Math.random() * 7) - 3; 
              
              let term1 = a === 1 ? 'x^2' : (a === -1 ? '-x^2' : `${a}x^2`);
              let term2 = b === 0 ? '' : (b === 1 ? '+x' : (b === -1 ? '-x' : (b > 0 ? `+${b}x` : `${b}x`)));
              let term3 = c === 0 ? '' : (c > 0 ? `+${c}` : `${c}`);
              
              latexFunc = `f(x) = ${term1}${term2}${term3}`;
              m = 2 * a * x0 + b;
          } else { // Fraction
              let c = Math.floor(Math.random() * 9) - 4;
              if (c === 0) c = 2;
              let n = Math.floor(Math.random() * 3) + 1; 
              do {
                  x0 = Math.floor(Math.random() * 5) - 2; 
              } while (x0 === 0);
              
              let powerX = n === 1 ? 'x' : `x^{${n}}`;
              latexFunc = `f(x) = \\frac{${c}}{${powerX}}`;
              m = (-c * n) / Math.pow(x0, n + 1);
          }
      } while (m === 0);

      // Usamos el valor real sin redondear demasiado para validar después,
      // pero el usuario deberá aproximarlo.
      const ans = m;

      const Pregunta = `
        <div class="pregunta-abierta" data-ans="${ans}" style="display: none;">
          <p>${i + 1}.- Calcula la pendiente de la recta tangente a la curva $${latexFunc}$ en el punto donde $x = ${x0}$. (Escribe tu respuesta en decimal)</p>
          <table>
            <tr>
              <td>Pendiente $m = $ </td>
              <td><math-field></math-field></td>
              <td><span class="feedback" style="display:none; color:red; margin-left:15px; font-weight:bold;"></span></td>
            </tr>
          </table>
        </div>
      `;

      if (esImprimible) {
          const respuesta = `$m = ${Number(ans.toPrecision(3))}$`;
          return [Pregunta, respuesta];
      }
      
      render();
      return Pregunta;
  } catch (error) {
      console.error('Error al cargar la pregunta:', error);
  }
}

export async function render(container, n, code) {
  // Configurar la función global de validación para esta pregunta
  window.accionR2P = function(i) {
      let totalPuntos = 1;
      let puntos = 0;
      let pregunta = document.getElementsByClassName('pregunta-abierta');
      const mathFields = pregunta[i].getElementsByTagName('math-field');
      const feedback = pregunta[i].getElementsByClassName('feedback')[0];
      const inputValue = mathFields[0].value;
      const rnumero = Number(inputValue); 
      
      let ans = Number(pregunta[i].dataset.ans);
      
      // Validar si está vacío o si no es un número (ej. el usuario metió letras/fracciones no soportadas)
      if (inputValue === '' || isNaN(rnumero)) {
          mathFields[0].style.backgroundColor = "red";
          feedback.style.display = "none";
          return [0, totalPuntos];
      }
      
      // Validar con margen de error del 1.5% (aproximadamente 3 cifras significativas)
      let errorRelativo = Math.abs((ans - rnumero) / ans);
      
      if (errorRelativo <= 0.015) {
          puntos++;
          mathFields[0].style.backgroundColor = ""; // reset background
          mathFields[0].style.border = "solid 5px green";
          feedback.style.display = "none";
      } else {
          mathFields[0].style.backgroundColor = "red";
          mathFields[0].style.border = "";
          let ansFormatted = Number(ans.toPrecision(3));
          feedback.innerHTML = `Incorrecto. La respuesta era: ${ansFormatted}`;
          feedback.style.display = "inline";
      }
      
      return [puntos, totalPuntos];
  };
}
