import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Sucesiones aritméticas I';
}

export function tipo() {
  return 0; // 0 - Opción múltiple
}

export async function pregunta(numeroPregunta) {
  try {
    return reciclado(numeroPregunta);
  } catch (error) {
    console.error('Error:', error);
  }
}

function reciclado(numeroPregunta) {
  let u1 = Math.floor(Math.random() * 41) - 20; // -20 a 20
  let d = 0;
  while (d === 0) {
    d = Math.floor(Math.random() * 31) - 15; // -15 a 15, dif de 0
  }
  let n = Math.floor(Math.random() * 41) + 10; // 10 a 50

  let un = u1 + (n - 1) * d;

  let P = `${numeroPregunta + 1}.- En una sucesión aritmética, el primer término es $u_1=${u1}$ y la diferencia común es $d=${d}$. Halla el valor del término $u_{${n}}$.`;

  let R = [];
  R[0] = `$${un}$`;

  for (let i = 1; i < 6; ++i) {
    let fake_un;
    do {
      let rnd = Math.random();
      if (rnd < 0.2) {
        fake_un = u1 + n * d; // Error común: no restar 1 a n
      } else if (rnd < 0.4) {
        fake_un = u1 + (n - 1) * (-d); // Error de signo en d
      } else if (rnd < 0.6) {
        fake_un = -u1 + (n - 1) * d; // Error de signo en u1
      } else if (rnd < 0.8) {
        fake_un = u1 + (n + 1) * d; // Sumar en lugar de restar
      } else {
        let offset = Math.floor(Math.random() * 11) - 5;
        if (offset === 0) offset = 1;
        fake_un = un + offset * Math.abs(d);
      }
      R[i] = `$${fake_un}$`;
    } while (tlacu.pregunta.hayRepetidos(R));
  }

  return [P, R];
}
