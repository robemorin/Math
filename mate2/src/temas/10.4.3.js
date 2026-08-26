//10.4.3.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs'
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
  return 'Simplificación de límites racionales (Abierta)';
}

export function tipo() {
  return 3;
}

// Función auxiliar para convertir array de coeficientes a texto LaTeX
function polyToLatex(c) {
    let str = "";
    let n = c.length - 1;
    for (let i = 0; i <= n; i++) {
        let coef = c[i];
        if (coef === 0) continue;
        
        let power = n - i;
        let term = "";
        
        // Signo
        if (coef > 0 && str !== "") term += "+";
        else if (coef < 0) term += "-";
        
        let absCoef = Math.abs(coef);
        
        // Coeficiente
        if (absCoef !== 1 || power === 0) term += absCoef;
        
        // Variable
        if (power === 1) term += "x";
        else if (power > 1) term += `x^{${power}}`;
        
        str += term;
    }
    return str === "" ? "0" : str;
}

export async function pregunta(i, code, esImprimible = false) { 
  try {
      // D(x) = ax + b, tal que el límite tienda a k, con k = -b/a
      let a = Math.floor(Math.random() * 3) + 1; // 1, 2 o 3
      let k = Math.floor(Math.random() * 9) - 4; // -4 a 4
      let b = -a * k;
      let D = [a, b];
      
      // Q(x) = polinomio cociente (grado 1 o 2)
      let type = Math.floor(Math.random() * 2); 
      let Q = [];
      if (type === 0) {
          // Grado 1
          let q1 = Math.floor(Math.random() * 5) + 1;
          if (Math.random() < 0.5) q1 = -q1;
          let q0 = Math.floor(Math.random() * 9) - 4;
          Q = [q1, q0];
      } else {
          // Grado 2
          let q2 = Math.floor(Math.random() * 3) + 1;
          if (Math.random() < 0.5) q2 = -q2;
          let q1 = Math.floor(Math.random() * 9) - 4;
          let q0 = Math.floor(Math.random() * 9) - 4;
          Q = [q2, q1, q0];
      }
      
      // P(x) = D(x) * Q(x)
      let P_poly = tlacu.conv(D, Q);
      
      const latexExpr = `\\frac{${polyToLatex(P_poly)}}{${polyToLatex(D)}}`;
      
      const Pregunta = `
        <div class="pregunta-abierta" data-qcoef="${Q.join(',')}" style="display: none;">
          <p>${i+1}.- Escribe el límite equivalente al simplificar la  fracción </p>
          <div style="font-size: 1.2em; text-align: center; margin: 10px 0;">$\\lim_{x \\to ${k}} ${latexExpr}$</div>
          <table>
            <tr>
              <td>$\\lim_{x \\to ${k}} $  </td>
              <td><math-field></math-field></td>
              <td><span class="feedback" style="display:none; color:red; margin-left:15px; font-weight:bold;"></span></td>
            </tr>
          </table>
        </div>
      `;
      
      if (esImprimible) {
          const respuesta = `$${polyToLatex(Q)}$`;
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
      let latexEsperado = polyToLatex(qCoef);
      
      // Comparamos el string despojándolo de espacios y llaves
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
