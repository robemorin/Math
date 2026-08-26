//10.3.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs'
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Pendiente de la tangente';
}

export function tipo(){
  return 0;
}

export async function pregunta(np) { 
  function formatNumber(val) {
      if (val === 0) return '0';
      // Formatear a 3 cifras significativas y evitar error de log10(0) en tlacu.cs
      let rounded = Number(val.toPrecision(3));
      try {
          return tlacu.cs(rounded);
      } catch (e) {
          return rounded.toString();
      }
  }

  function P1(){
      let type = Math.floor(Math.random() * 2); 
      let latexFunc = "";
      let m = 0;
      let x0 = 0;
      
      // Forzamos a que m no sea 0 para evitar problemas
      do {
          if (type === 0) { // Polynomial ax^2 + bx + c
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
          } else { // Fraction c / x^n
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
      
      const P=`${np+1}.- Calcula la pendiente de la recta tangente a la curva $${latexFunc}$ en el punto donde $x = ${x0}$.`;
      const ans = m; 
      
      const R=[`$${formatNumber(ans)}$`];
      
      for(let i=1;i<6;++i){
          do{
              let fakeAns = m * (Math.random() * 2.5 - 1.25) + (Math.random() * 4 - 2);
              if (Math.abs(fakeAns) < 0.01) {
                  fakeAns = 0.1; // prevenir el cero en distractores
              }
              R[i] = `$${formatNumber(fakeAns)}$`;
          }while(tlacu.pregunta.hayRepetidos(R))
      }
      return [P,R]
  }

  try {
    return P1()
  } catch (error) {
    console.error('Error generando pregunta:', error);
    return [`Error en la generación: ${error.message}`, ["0", "1", "2", "3", "4", "5"]];
  }
}
