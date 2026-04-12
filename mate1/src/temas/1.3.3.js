import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Ecuación general de la mediatriz a partir de dos puntos';
}

export function tipo(){
  return 0; // 0 - Opción múltiple
}

function tempEcLine(D, c) { // D is [A, B]
  // Normalize so that A is positive, or if A=0 then B is positive
  let A = D[0], B = D[1];
  if (A < 0 || (A === 0 && B < 0)) {
    A = -A;
    B = -B;
    c = -c;
  }
  
  let cadena = "";
  let terms = 0;
  
  if (A !== 0) {
      if (A === 1) cadena += "x";
      else if (A === -1) cadena += "-x";
      else cadena += `${A}x`;
      terms++;
  }

  if (B !== 0) {
      if (terms > 0 && B > 0) cadena += "+";
      if (Math.abs(B) === 1) {
          cadena += (B < 0 ? "-" : "") + "y";
      } else {
          cadena += `${B}y`;
      }
      terms++;
  }

  if (c !== 0) {
      if (terms > 0 && c > 0) cadena += "+";
      cadena += `${c}`;
  } else if (terms === 0) {
      cadena += "0";
  }
  cadena += `=0`;

  return `$${cadena}$`;
}

// Custom GCD function just in case
function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b > a) { var temp = a; a = b; b = temp; }
    while (true) {
        if (b === 0) return a;
        a %= b;
        if (a === 0) return b;
        b %= a;
    }
}

export async function pregunta(numeroPregunta) { 
  try {
    let A, B;
    do {
      A = [Math.ceil(Math.random()*10-5), Math.ceil(Math.random()*10-5)];
      B = [Math.ceil(Math.random()*10-5), Math.ceil(Math.random()*10-5)];
    } while (A[0] === B[0] && A[1] === B[1]);

    let Ap = 2 * (B[0] - A[0]);
    let Bp = 2 * (B[1] - A[1]);
    let Cp = A[0]*A[0] - B[0]*B[0] + A[1]*A[1] - B[1]*B[1];
    
    // Simplify parameters
    let g = gcd(Ap, gcd(Bp, Cp));
    if (g !== 0) {
        Ap /= g;
        Bp /= g;
        Cp /= g;
    }

    // Normalize so that A > 0 or A=0, B>0
    if (Ap < 0 || (Ap === 0 && Bp < 0)) {
      Ap = -Ap;
      Bp = -Bp;
      Cp = -Cp;
    }

    const P = `${numeroPregunta+1}.- Considere que en la ecuación general de la línea recta $Ax+By+C=0$, $A \\ge 0$ y $A,B,C$ son números enteros primos relativos. Determine la ecuación de la mediatriz del segmento que une los puntos $A:(${A[0]}, ${A[1]})$ y $B:(${B[0]}, ${B[1]})$`;
    const R = [tempEcLine([Ap, Bp], Cp)];

    for(let i=1;i<6;++i){
      let nAp = Ap, nBp = Bp, nCp = Cp;
      do {
        let errorType = Math.floor(Math.random() * 3);
        if (errorType === 0) nAp += Math.round(Math.random()*4-2);
        else if (errorType === 1) nBp += Math.round(Math.random()*4-2);
        else nCp += Math.round(Math.random()*4-2);

        // Force some change if randomly it added 0
        if (nAp === Ap && nBp === Bp && nCp === Cp) {
            nCp += 1;
        }

        // Simplify and Normalize wrong answers like the real answer
        let g2 = gcd(nAp, gcd(nBp, nCp));
        if (g2 !== 0 && !isNaN(g2)) {
            nAp /= g2;
            nBp /= g2;
            nCp /= g2;
        }

        if (nAp < 0 || (nAp === 0 && nBp < 0)) {
           nAp = -nAp; nBp = -nBp; nCp = -nCp;
        }

        R[i] = tempEcLine([nAp, nBp], nCp);
      } while( tlacu.pregunta.hayRepetidos(R) || isNaN(nAp) || isNaN(nBp) || isNaN(nCp) );
    }
    return [P, R];

  } catch (error) {
    console.error('Error:', error);
  }
}
