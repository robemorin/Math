import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Sucesiones aritméticas II';
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
  let u1 = Math.floor(Math.random() * 201) - 100; // -100 a 100
  let d = 0;
  while (d === 0) {
    d = Math.floor(Math.random() * 101) - 50; // -50 a 50, dif de 0
  }
  
  let u2 = u1 + d;
  let u3 = u1 + 2 * d;
  let u4 = u1 + 3 * d;

  let n = Math.floor(Math.random() * 26) + 5; // 5 a 30
  let un = u1 + (n - 1) * d;

  let P = `${numeroPregunta + 1}.- Encuentra el término $u_{${n}}$ de la sucesión: $${u1}, ${u2}, ${u3}, ${u4}, \\ldots$`;

  let R = [];
  R[0] = `$${un}$`;

  for (let i = 1; i < 6; ++i) {
    let fake_un;
    do {
      let rnd = Math.random();
      if (rnd < 0.2) { // Error común: no restar 1 a n
        fake_un = u1 + n * d;
      } else if (rnd < 0.4) { // Error de signo en d
        fake_un = u1 + (n - 1) * (-d);
      } else if (rnd < 0.6) { // Usar u2 como punto de partida sin ajustar n
        fake_un = u2 + (n - 1) * d;
      } else if (rnd < 0.8) { // Sumar n+1
        fake_un = u1 + (n + 1) * d;
      } else { // Desplazamiento aleatorio
        let offset = Math.floor(Math.random() * 11) - 5;
        if (offset === 0) offset = 1;
        fake_un = un + offset * Math.abs(d);
      }
      R[i] = `$${fake_un}$`;
    } while (tlacu.pregunta.hayRepetidos(R));
  }

  return [P, R];
}
