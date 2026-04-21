import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Sucesiones aritméticas III';
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
  let u1 = Math.floor(Math.random() * 101) - 50; // -50 a 50
  let d = 0;
  while (d === 0) {
    d = Math.floor(Math.random() * 41) - 20; // -20 a 20, dif de 0
  }

  let m = Math.floor(Math.random() * 10) + 2; // 2 a 11
  let n = m + Math.floor(Math.random() * 10) + 2; // m+2 a m+11
  
  let um = u1 + (m - 1) * d;
  let un = u1 + (n - 1) * d;

  let q_type = Math.floor(Math.random() * 3); // 0, 1, 2
  
  let P_base = `${numeroPregunta + 1}.- En una sucesión aritmética, sabemos que $u_{${m}} = ${um}$ y $u_{${n}} = ${un}$. `;
  let P = "";
  let answer;
  let R = [];
  let q = 0;

  if (q_type === 0) {
    P = P_base + `Halla el primer término $u_1$.`;
    answer = u1;
  } else if (q_type === 1) {
    P = P_base + `Halla la diferencia común $d$.`;
    answer = d;
  } else {
    q = Math.floor(Math.random() * 25) + 5; // 5 a 29
    while (q === m || q === n) q++; // Evitar preguntar por uno de los datos
    P = P_base + `Halla el valor del término $u_{${q}}$.`;
    answer = u1 + (q - 1) * d;
  }

  R[0] = `$${answer}$`;

  for (let i = 1; i < 6; ++i) {
    let fake_ans;
    do {
      let rnd = Math.random();
      if (q_type === 0) { // Distractores para u1
        if (rnd < 0.25) fake_ans = answer + d;
        else if (rnd < 0.5) fake_ans = answer - d;
        else if (rnd < 0.75) fake_ans = answer + um; 
        else fake_ans = answer + Math.floor(Math.random() * 21) - 10;
      } else if (q_type === 1) { // Distractores para d
        if (rnd < 0.25) fake_ans = -answer; 
        else if (rnd < 0.5) fake_ans = Math.round((un - um) / (n - m + 1)); 
        else if (rnd < 0.75) fake_ans = Math.round((un - um) / (n - m - 1));
        else fake_ans = answer + (Math.floor(Math.random() * 2) === 0 ? 1 : -1) * (Math.floor(Math.random() * 5) + 1);
      } else { // Distractores para u_q
        if (rnd < 0.2) fake_ans = u1 + q * d; 
        else if (rnd < 0.4) fake_ans = u1 + (q - 1) * (-d); 
        else if (rnd < 0.6) fake_ans = answer + d;
        else if (rnd < 0.8) fake_ans = answer - d;
        else {
          let offset = Math.floor(Math.random() * 11) - 5;
          if (offset === 0) offset = 1;
          fake_ans = answer + offset * Math.abs(d);
        }
      }

      if (fake_ans === answer || isNaN(fake_ans)) {
        fake_ans = answer + (Math.floor(Math.random() * 2) === 0 ? 1 : -1) * (Math.floor(Math.random() * 10) + 1);
      }
      R[i] = `$${fake_ans}$`;
    } while (tlacu.pregunta.hayRepetidos(R));
  }

  return [P, R];
}
