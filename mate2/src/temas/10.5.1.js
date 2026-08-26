//10.5.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs'
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
  return 'Derivada por definición (Sin expandir)';
}

export function tipo() {
  return 0; // Opción múltiple
}

// Función estándar para el polinomio en x
function polyToLatex(c) {
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
        
        if (power === 1) term += "x";
        else if (power > 1) term += `x^{${power}}`;
        
        str += term;
    }
    return str === "" ? "0" : str;
}

// Función adaptada para el binomio (a+h)
// Se incluye localmente por seguridad en caso de que tlacuache no se haya actualizado aún
function polyToShiftedLatex(coefs, a, variable = 'h') {
    let str = "";
    let n = coefs.length - 1;
    // Formato estricto (a+h) para ser didáctico
    let base = `(${a}+${variable})`; 

    for (let i = 0; i <= n; i++) {
        let coef = coefs[i];
        if (coef === 0) continue;
        let power = n - i;
        let term = "";
        
        if (coef > 0 && str !== "") term += "+";
        else if (coef < 0) term += "-";
        
        let absCoef = Math.abs(coef);
        if (absCoef !== 1 || power === 0) term += absCoef;
        
        if (power === 1) term += base;
        else if (power > 1) term += `${base}^{${power}}`;
        
        str += term;
    }
    return str === "" ? "0" : str;
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
      
      // Valor en el que se evalúa el límite
      let a = Math.floor(Math.random() * 7) - 3; 
      
      // Evaluar f(a)
      let fa = 0;
      let n = Q.length - 1;
      for (let i = 0; i <= n; i++) {
          fa += Q[i] * Math.pow(a, n - i);
      }
      
      // Formatear f(a) para proteger los negativos con paréntesis
      let fa_str = fa //< 0 ? `(${fa})` : `${fa}`;
      
      const latexFunc = polyToLatex(Q);
      const P_texto = `${np+1}.- Identifica la expresión correcta que plantea la derivada de la función $f(x) = ${latexFunc}$ en el punto $a = ${a}$ usando la definición $\\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}$.`;
      
      // Generar expresión correcta
      let shifted = polyToShiftedLatex(Q, a, 'h');
      let exprCorrecta = `\\lim_{h \\to 0} \\frac{\\biggl(${shifted}\\biggr) - \\biggl(${fa_str}\\biggr)}{h}`;
      
      const R = [`$${exprCorrecta}$`];
      
      // Distractores
      for (let i = 1; i < 6; ++i) {
          do {
              let fakeA = a;
              let fakeFa = fa;
              let fakeSign = "-";
              
              let errType = Math.floor(Math.random() * 4);
              if (errType === 0) {
                  // Se equivocan en el signo de a
                  fakeA = -a;
                  // Si a era 0, este error no sirve, forzamos otro
                  if (a === 0) fakeA = 1;
              } else if (errType === 1) {
                  // Suman f(a) en vez de restarlo
                  fakeSign = "+";
              } else if (errType === 2) {
                  // f(a) calculado mal
                  fakeFa = fa + (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1);
              } else {
                  // a diferente
                  fakeA = a + (Math.random() > 0.5 ? 1 : -1);
              }
              
              let fakeShifted = polyToShiftedLatex(Q, fakeA, 'h');
              let fakeFa_str = fakeFa < 0 ? `(${fakeFa})` : `${fakeFa}`;
              
              let fakeExpr = `\\lim_{h \\to 0} \\frac{\\biggl(${fakeShifted}\\biggr) ${fakeSign} \\biggl(${fakeFa_str}\\biggr)}{h}`;
              
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
