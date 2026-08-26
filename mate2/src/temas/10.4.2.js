//10.4.2.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs'
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
  return 'Simplificación de límites racionales';
}

export function tipo() {
  return 0;
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

export async function pregunta(np) { 
  function P1() {
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
      const P_texto = `${np+1}.- ¿Cuál es la expresión equivalente al simplificar la siguiente fracción (asumiendo $x \\neq ${k}$)? <br> <div style="font-size: 1.2em; text-align: center; margin: 10px 0;">$${latexExpr}$</div>`;
      
      // La respuesta correcta es Q(x)
      const R = [`$${polyToLatex(Q)}$`];
      
      // Generar 5 distractores
      for(let i = 1; i < 6; ++i){
          do {
              let fakeQ = [...Q];
              // Elegimos un coeficiente al azar para cambiar
              let idx = Math.floor(Math.random() * fakeQ.length);
              let diff = Math.floor(Math.random() * 7) - 3;
              if (diff === 0) diff = 1;
              
              if (Math.random() > 0.5) {
                  // Invertir el signo
                  fakeQ[idx] = -fakeQ[idx];
              } else {
                  // Alterar el valor
                  fakeQ[idx] += diff;
              }
              
              // Evitar que el coeficiente principal se vuelva 0
              if (fakeQ[0] === 0) fakeQ[0] = 1;
              
              R[i] = `$${polyToLatex(fakeQ)}$`;
          } while(tlacu.pregunta.hayRepetidos(R));
      }
      
      return [P_texto, R];
  }

  try {
    return P1();
  } catch (error) {
    console.error('Error generando pregunta:', error);
    return [`Error en la generación: ${error.message}`, ["0", "1", "2", "3", "4", "5"]];
  }
}
