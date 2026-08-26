//10.5.4.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs'
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
  return 'Derivada por definición (Numerador simplificado I)';
}

export function tipo() {
  return 0; // Opción múltiple
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

export async function pregunta(np) { 
  function P1() {
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
      // El numerador simplificado pierde el término constante f(a)
      simplified[simplified.length - 1] = 0; 
      
      const latexFunc = polyToLatexVar(Q, 'x');
      let a_str = a < 0 ? `(${a})` : `${a}`;
      let a_mas_h = a < 0 ? `${a}+h` : `${a}+h`;
      
      const P_texto = `${np+1}.- Identifica el numerador desarrollado y simplificado que resulta al calcular la derivada de $f(x) = ${latexFunc}$ en $a = ${a}$. 
      <br><div style="font-size: 1.2em; text-align: center; margin: 10px 0;">
      $\\lim_{h \\to 0} \\frac{f(${a_mas_h}) - f(${a_str})}{h} = \\lim_{h \\to 0} \\frac{\\text{Numerador}}{h}$
      </div>`;
      
      const exprCorrecta = polyToLatexVar(simplified, 'h');
      const R = [`$${exprCorrecta}$`];
      
      // Distractores
      for (let i = 1; i < 6; ++i) {
          do {
              let errType = Math.floor(Math.random() * 4);
              let fakeSimp = [...simplified];
              
              if (errType === 0) {
                  // No restan f(a), por lo que la constante sobrevive
                  fakeSimp = [...shifted];
                  if (fakeSimp[fakeSimp.length - 1] === 0) {
                      fakeSimp[fakeSimp.length - 1] = Math.floor(Math.random() * 5) + 1;
                  }
              } else if (errType === 1) {
                  // Se equivocan de signo y desarrollan f(a-h)
                  fakeSimp = shiftPolynomial(Q, -a);
                  fakeSimp[fakeSimp.length - 1] = 0; // Sí cancelan la constante
                  if (a === 0) {
                      fakeSimp[0] = -fakeSimp[0];
                  }
              } else if (errType === 2) {
                  // Error algebraico en expansión (coeficiente mal calculado)
                  let idx = Math.floor(Math.random() * (fakeSimp.length - 1)); // Modifica términos con h
                  fakeSimp[idx] += (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
              } else {
                  // Invierten todos los signos (como si hubieran restado f(a+h) al revés)
                  for (let k = 0; k < fakeSimp.length; k++) {
                      fakeSimp[k] = -fakeSimp[k];
                  }
              }
              
              let fakeExpr = polyToLatexVar(fakeSimp, 'h');
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
