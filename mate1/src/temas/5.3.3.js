import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Sucesiones geométricas III';
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

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  if (b > a) { let t = a; a = b; b = t; }
  while (true) {
    if (b === 0) return a;
    a %= b;
    if (a === 0) return b;
    b %= a;
  }
}

function formatFrac(n, d) {
  if (d === 0) return "undefined";
  if (n === 0) return "0";
  let sign = (n < 0) !== (d < 0) ? "-" : "";
  n = Math.abs(Math.round(n));
  d = Math.abs(Math.round(d));
  let g = gcd(n, d);
  n /= g;
  d /= g;
  if (d === 1) return `${sign}${n}`;
  return `${sign}\\frac{${n}}{${d}}`;
}

function reciclado(numeroPregunta) {
  let r_num, r_den, u1, m, n;
  let attempts = 0;
  do {
    if (Math.random() < 0.5) {
      r_den = 1;
      let valid = [2, 3, 4, 5]; // Positivos para simplificar raíces de grado par
      r_num = valid[Math.floor(Math.random() * valid.length)];
    } else {
      let dens = [2, 3, 4, 5];
      r_den = dens[Math.floor(Math.random() * dens.length)];
      let nums = [1, 2, 3, 4, 5]; // Positivos
      r_num = nums[Math.floor(Math.random() * nums.length)];
      while (gcd(Math.abs(r_num), r_den) !== 1 || Math.abs(r_num) === r_den) {
        r_num = nums[Math.floor(Math.random() * nums.length)];
      }
    }
    
    u1 = Math.floor(Math.random() * 41) - 20;
    while(u1 === 0) u1 = Math.floor(Math.random() * 41) - 20;

    m = Math.floor(Math.random() * 4) + 2; // 2 to 5
    n = m + Math.floor(Math.random() * 3) + 1; // m+1 to m+3

    let pNum = u1 * Math.pow(r_num, n - 1);
    let pDen = Math.pow(r_den, n - 1);

    if (Math.abs(pNum) <= 10000 && pDen <= 10000) {
      break; 
    }
    attempts++;
  } while (attempts < 1000);

  if (attempts >= 1000) {
    u1 = 2; r_num = 2; r_den = 1; m = 2; n = 4;
  }

  let um_str = formatFrac(u1 * Math.pow(r_num, m - 1), Math.pow(r_den, m - 1));
  let un_str = formatFrac(u1 * Math.pow(r_num, n - 1), Math.pow(r_den, n - 1));

  let q_type = Math.floor(Math.random() * 3); // 0: u1, 1: r, 2: u_q
  
  let P_base = `${numeroPregunta + 1}.- En una sucesión geométrica, sabemos que $u_{${m}} = ${um_str}$ y $u_{${n}} = ${un_str}$. `;
  let P = "";
  let answer_str;
  let q = 0;

  if (q_type === 0) {
    P = P_base + `Halla el primer término $u_1$.`;
    answer_str = formatFrac(u1, 1);
  } else if (q_type === 1) {
    P = P_base + `Halla la razón común $r$.`;
    answer_str = formatFrac(r_num, r_den);
  } else {
    q = Math.floor(Math.random() * 7) + 5; // 5 to 11
    while (q === m || q === n) q++;
    P = P_base + `Halla el valor del término $u_{${q}}$.`;
    answer_str = formatFrac(u1 * Math.pow(r_num, q - 1), Math.pow(r_den, q - 1));
  }

  let R = [];
  R[0] = `$${answer_str}$`;

  for (let i = 1; i < 6; ++i) {
    let fake_str;
    let fallback = 0;
    do {
      let rnd = Math.random();
      if (q_type === 0) {
        if (rnd < 0.3) fake_str = formatFrac(u1 * r_num, r_den); 
        else if (rnd < 0.6) fake_str = formatFrac(u1 * r_den, r_num); 
        else fake_str = formatFrac(u1 + (Math.floor(Math.random() * 11) - 5), 1);
      } else if (q_type === 1) {
        if (rnd < 0.3) fake_str = formatFrac(r_den, r_num); // recíproco
        else if (rnd < 0.6) fake_str = formatFrac(Math.pow(r_num, n - m), Math.pow(r_den, n - m)); // olvidar sacar raíz
        else {
            // Resolverlo como progresión aritmética
            let d_num = u1 * Math.pow(r_num, n-1) * Math.pow(r_den, m-1) - u1 * Math.pow(r_num, m-1) * Math.pow(r_den, n-1);
            let d_den = Math.pow(r_den, n+m-2) * (n - m);
            fake_str = formatFrac(d_num, d_den);
        }
      } else {
        if (rnd < 0.2) fake_str = formatFrac(u1 * Math.pow(r_num, q), Math.pow(r_den, q)); // falló el (q-1)
        else if (rnd < 0.4) fake_str = formatFrac(u1 * Math.pow(r_den, q - 1), Math.pow(r_num, q - 1)); // razón inversa
        else if (rnd < 0.6) {
          fake_str = formatFrac(u1 * Math.pow(r_num, m-1) * Math.pow(r_num, q-1), Math.pow(r_den, m-1) * Math.pow(r_den, q-1));
        } else if (rnd < 0.8) {
            // Aritmética
            let d_num = u1 * Math.pow(r_num, n-1) * Math.pow(r_den, m-1) - u1 * Math.pow(r_num, m-1) * Math.pow(r_den, n-1);
            let d_den = Math.pow(r_den, n+m-2) * (n-m);
            let uq_num = u1 * Math.pow(r_num, m-1) * d_den + (q - m) * d_num * Math.pow(r_den, m-1);
            let uq_den = Math.pow(r_den, m-1) * d_den;
            fake_str = formatFrac(uq_num, uq_den);
        } else {
          let offset = Math.floor(Math.random() * 5) + 1;
          fake_str = formatFrac(u1 * Math.pow(r_num, q - 1) + (Math.random()>0.5?1:-1) * offset * Math.pow(r_den, q - 1), Math.pow(r_den, q - 1));
        }
      }

      if (fallback > 10 || fake_str === answer_str || fake_str === "undefined" || isNaN(parseInt(fake_str)) && !fake_str.includes("\\frac") && fake_str !== "0") {
         let offset = Math.floor(Math.random() * 5) + 1;
         if (q_type === 1) {
            fake_str = formatFrac(r_num + offset, r_den);
         } else {
            fake_str = formatFrac(u1 * Math.pow(r_num, q_type===0?0:q-1) + offset * Math.pow(r_den, q_type===0?0:q-1), Math.pow(r_den, q_type===0?0:q-1));
         }
      }
      fallback++;
      R[i] = `$${fake_str}$`;
    } while (tlacu.pregunta.hayRepetidos(R) || fake_str === answer_str || fake_str === "undefined");
  }

  return [P, R];
}
