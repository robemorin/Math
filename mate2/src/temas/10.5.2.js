//10.5.2.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs'
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
  return 'Derivada por definición (Desarrollado)';
}

export function tipo() {
  return 0; // Opción múltiple
}

// Función auxiliar para convertir array a LaTeX con una variable específica (ej. 'x' o 'h')
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

// Algoritmo iterativo de Horner para expandir/desplazar P(x) a P(x+a)
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

export async function pregunta(np) { 
  function P1() {
      // Polinomio de grado 2 o 3
      let degree = Math.random() > 0.5 ? 2 : 3;
      let Q = [];
      if (degree === 2) {
          Q = [
              Math.floor(Math.random() * 5) + 1, // x^2
              Math.floor(Math.random() * 9) - 4, // x
              Math.floor(Math.random() * 9) - 4  // c
          ];
          if (Math.random() > 0.5) Q[0] = -Q[0];
      } else {
          Q = [
              Math.floor(Math.random() * 3) + 1, // x^3
              Math.floor(Math.random() * 7) - 3, // x^2
              Math.floor(Math.random() * 7) - 3, // x
              Math.floor(Math.random() * 7) - 3  // c
          ];
          if (Math.random() > 0.5) Q[0] = -Q[0];
      }
      
      let a = Math.floor(Math.random() * 7) - 3; 
      
      // Expandir P(x+a) -> P(h)
      let shifted = shiftPolynomial(Q, a);
      
      // El último elemento de 'shifted' es exactamente f(a)
      let fa = shifted[shifted.length - 1];
      
      let fa_str = fa < 0 ? `(${fa})` : `${fa}`;
      
      const latexFunc = polyToLatexVar(Q, 'x');
      const P_texto = `${np+1}.- Determina el límite que permite calcular la derivada de $f(x) = ${latexFunc}$ en $a = ${a}$.`;
      
      let expandedStr = polyToLatexVar(shifted, 'h');
      let exprCorrecta = `\\lim_{h \\to 0} \\frac{(${expandedStr}) - ${fa_str}}{h}`;
      
      const R = [`$${exprCorrecta}$`];
      
      for (let i = 1; i < 6; ++i) {
          do {
              let fakeShifted = [...shifted];
              
              let errType = Math.floor(Math.random() * 2);
              if (errType === 0) {
                  // Evaluar (x-a) en vez de (x+a)
                  fakeShifted = shiftPolynomial(Q, -a);
                  if (a === 0) {
                      fakeShifted[0] = -fakeShifted[0]; // Forzar cambio si a=0
                  }
              } else {
                  // Alterar un coeficiente intermedio o principal, excluyendo la constante 
                  // para que siga cancelando visualmente con f(a) y sea un distractor sutil.
                  let idx = Math.floor(Math.random() * (shifted.length - 1)); // 0 hasta n-2
                  fakeShifted[idx] += (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
              }
              
              let fakePolyStr = polyToLatexVar(fakeShifted, 'h');
              
              // La función evaluada al final siempre se mantiene correcta
              let fakeExpr = `\\lim_{h \\to 0} \\frac{(${fakePolyStr}) - ${fa_str}}{h}`;
              
              R[i] = `$${fakeExpr}$`;
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
