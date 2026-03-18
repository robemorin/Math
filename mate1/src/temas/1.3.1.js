import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
  return 'Ecuación de la mediatriz';
}
export function tipo() {
  return 0
  /*
  0 - Opción múltiple
  1 - Abierto
  2 - Geogebra
  */
}
export async function pregunta(numeroPregunta) {
  try {
    function tempEcLine(m, b) {
      let ms = tlacu.simplify_frac([m[0], m[1]]);
      let bs = tlacu.simplify_frac([b[0], b[1]]);
      let cadena = `$y =`;
      if (ms[0] != 0) {
        if (ms[0] < 0) cadena += "-";
        if (Math.abs(ms[0]) == 1 && ms[1] == 1) {
          cadena += "x";
        } else {
          cadena += tlacu.fraccion(Math.abs(ms[0]), ms[1]) + "x";
        }
      }
      if (bs[0] != 0) {
        if (ms[0] != 0 && bs[0] > 0) cadena += "+";
        else if (bs[0] < 0) cadena += "-";
        cadena += tlacu.fraccion(Math.abs(bs[0]), bs[1]);
      } else if (ms[0] == 0) {
        cadena += "0";
      }
      return cadena + "$";
    }


    let A = [Math.ceil(Math.random() * 10 - 5), Math.ceil(Math.random() * 10 - 5)], B
    do {
      B = [Math.ceil(Math.random() * 10 - 5), Math.ceil(Math.random() * 10 - 5)]
    } while ((A[0] == B[0]) || (A[1] == B[1]))
    const dummy = Math.round(Math.random())

    let m = [-(B[0] - A[0]), B[1] - A[1]]
    m = tlacu.simplify_frac(m)

    let b = [(A[1] + B[1]) * m[1] - m[0] * (A[0] + B[0]), 2 * m[1]]
    b = tlacu.simplify_frac(b)


    const P = `${numeroPregunta + 1}.- Determine la ecuación de la mediatriz del segmento con extremos en los puntos $A:(${A[0]}, ${A[1]})$ y $B:(${B[0]}, ${B[1]})$`
    const R = [tempEcLine(m, b)];

    for (let i = 1; i < 6; ++i) {
      do {
        if (dummy == 1) {
          m[0] += Math.round(Math.random() * 4 - 2)
        } else {
          b[0] += Math.round(Math.random() * 4 - 2)
        }
        R[i] = tempEcLine(m, b)
      } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R]

  } catch (error) {
    console.error('Error loading r2p_core.js:', error);
  }
}
