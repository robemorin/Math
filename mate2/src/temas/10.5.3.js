//10.5.3.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs'
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
  return 'Derivada por definición (Numerador simplificado)';
}

export function tipo() {
  return 3; 
}

function polyToLatexVar(c, variable='x') {
    let str = "";
    let n = c.length - 1;
    for (let i = 0; i <= n; i++) {
        let coef = c[i];
        if (coef === 0) continue;
        let power = n - i;
        let term = "";
        
        if (coef > 0 && str !== "") term += "+";
        else if (coef < 0) term += "-";
        
        let absCoef = Math.abs(coef);
        if (absCoef !== 1 || power === 0) term += absCoef;
        
        if (power === 1) term += variable;
        else if (power > 1) term += `${variable}^{${power}}`;
        
        str += term;
    }
    return str === "" ? "0" : str;
}

function shiftPolynomial(coefs, a) {
    let res = [...coefs];
    let n = res.length;
    for (let i = 0; i < n; i++) {
        for (let j = 1; j < n - i; j++) {
            res[j] = res[j] + a * res[j - 1];
        }
    }
    return res;
}

export async function pregunta(i, code, esImprimible = false) { 
  try {
      let degree = Math.random() > 0.5 ? 2 : 3;
      let Q = [];
      if (degree === 2) {
          Q = [
              Math.floor(Math.random() * 5) + 1,
              Math.floor(Math.random() * 9) - 4,
              Math.floor(Math.random() * 9) - 4
          ];
          if (Math.random() > 0.5) Q[0] = -Q[0];
      } else {
          Q = [
              Math.floor(Math.random() * 3) + 1,
              Math.floor(Math.random() * 7) - 3,
              Math.floor(Math.random() * 7) - 3,
              Math.floor(Math.random() * 7) - 3
          ];
          if (Math.random() > 0.5) Q[0] = -Q[0];
      }
      
      let a = Math.floor(Math.random() * 7) - 3; 
      
      let shifted = shiftPolynomial(Q, a);
      let simplified = [...shifted];
      // Al simplificar el numerador f(a+h) - f(a), la constante f(a) se cancela
      simplified[simplified.length - 1] = 0; 
      
      let qCoefStr = simplified.join(',');
      const latexFunc = polyToLatexVar(Q, 'x');
      
      // Ajustar visualización del a
      let a_str = a < 0 ? `(${a})` : `${a}`;
      let a_mas_h = a < 0 ? `${a}+h` : `${a}+h`;
      
      const Pregunta = `
        <div class="pregunta-abierta" data-qcoef="${qCoefStr}" style="display: none;">
          <p>${i+1}.- Desarrolla y simplifica el numerador del límite para calcular la derivada de $f(x) = ${latexFunc}$ en $a = ${a}$.</p>
          <div style="font-size: 1.2em; text-align: center; margin: 10px 0;">
            $\\lim_{h \\to 0} \\frac{f(${a_mas_h}) - f(${a_str})}{h} = \\lim_{h \\to 0} \\frac{\\text{Numerador}}{h}$
          </div>
          <table>
            <tr>
              <td>Numerador = </td>
              <td><math-field></math-field></td>
              <td><span class="feedback" style="display:none; color:red; margin-left:15px; font-weight:bold;"></span></td>
            </tr>
          </table>
        </div>
      `;
      
      if (esImprimible) {
          const respuesta = `$${polyToLatexVar(simplified, 'h')}$`;
          return [Pregunta, respuesta];
      }
      
      render();
      return Pregunta;
      
  } catch (error) {
    console.error('Error generando pregunta:', error);
  }
}

export async function render(container, n, code) {
  window.accionR2P = function(i) {
      let totalPuntos = 1;
      let puntos = 0;
      let pregunta = document.getElementsByClassName('pregunta-abierta');
      const mathFields = pregunta[i].getElementsByTagName('math-field');
      const feedback = pregunta[i].getElementsByClassName('feedback')[0];
      const inputValue = mathFields[0].value;
      
      let qCoef = pregunta[i].dataset.qcoef.split(',').map(Number);
      let latexEsperado = polyToLatexVar(qCoef, 'h');
      
      // Ignoramos espacios y llaves en la comparación para no penalizar sintaxis equivalente
      const caracteresAEliminar = /[ ,{}]/g;
      const strEsperado = latexEsperado.replace(caracteresAEliminar, "");
      const strUsuario = inputValue.replace(caracteresAEliminar, "");
      
      if (inputValue === '') {
          mathFields[0].style.backgroundColor = "red";
          feedback.style.display = "none";
          return [0, totalPuntos];
      }
      
      if (strUsuario === strEsperado) {
          puntos++;
          mathFields[0].style.backgroundColor = "";
          mathFields[0].style.border = "solid 5px green";
          feedback.style.display = "none";
      } else {
          mathFields[0].style.backgroundColor = "red";
          mathFields[0].style.border = "";
          feedback.innerHTML = `Incorrecto. La respuesta era: ${latexEsperado}`;
          feedback.style.display = "inline";
      }
      
      return [puntos, totalPuntos];
  };
}
