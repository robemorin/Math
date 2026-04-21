import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Sucesiones geométricas I';
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
  let r_num, r_den, u1, n;
  let attempts = 0;
  do {
    if (Math.random() < 0.5) {
      r_den = 1;
      let valid = [-5, -4, -3, -2, 2, 3, 4, 5];
      r_num = valid[Math.floor(Math.random() * valid.length)];
    } else {
      let dens = [2, 3, 4, 5];
      r_den = dens[Math.floor(Math.random() * dens.length)];
      let nums = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
      r_num = nums[Math.floor(Math.random() * nums.length)];
      while (gcd(Math.abs(r_num), r_den) !== 1 || Math.abs(r_num) === r_den) {
        r_num = nums[Math.floor(Math.random() * nums.length)];
      }
    }
    
    u1 = Math.floor(Math.random() * 41) - 20;
    while(u1 === 0) u1 = Math.floor(Math.random() * 41) - 20;

    n = Math.floor(Math.random() * 8) + 3; // 3 to 10

    let pNum = u1 * Math.pow(r_num, n - 1);
    let pDen = Math.pow(r_den, n - 1);

    if (Math.abs(pNum) <= 10000 && pDen <= 10000) {
      break; 
    }
    attempts++;
  } while (attempts < 1000);

  if (attempts >= 1000) {
    u1 = 2; r_num = 2; r_den = 1; n = 5;
  }

  let P = `${numeroPregunta + 1}.- En una sucesión geométrica, el primer término es $u_1=${u1}$ y la razón común es $r=${formatFrac(r_num, r_den)}$. Halla el valor del término $u_{${n}}$.`;

  let un_str = formatFrac(u1 * Math.pow(r_num, n - 1), Math.pow(r_den, n - 1));

  let R = [];
  R[0] = `$${un_str}$`;

  for (let i = 1; i < 6; ++i) {
    let fake_str;
    let fallback = 0;
    do {
      let rnd = Math.random();
      if (rnd < 0.2) {
        // Error de no restar 1
        fake_str = formatFrac(u1 * Math.pow(r_num, n), Math.pow(r_den, n));
      } else if (rnd < 0.4) {
        // Multiplicar en vez de potenciar
        fake_str = formatFrac(u1 * r_num * n, r_den);
      } else if (rnd < 0.6) {
        // Error de signo en r (esto podría ser igual a la respuesta si n-1 es par)
        fake_str = formatFrac(u1 * Math.pow(-r_num, n - 1), Math.pow(r_den, n - 1));
      } else if (rnd < 0.8) {
        // Voltear la razón
        fake_str = formatFrac(u1 * Math.pow(r_den, n - 1), Math.pow(r_num !== 0 ? r_num : 1, n - 1));
      } else {
        // Tratarla como aritmética
        fake_str = formatFrac(u1 * r_den + (n - 1) * r_num, r_den); 
      }

      if (fallback > 10 || fake_str === un_str || fake_str === "undefined" || isNaN(parseInt(fake_str)) && !fake_str.includes("\\frac") && fake_str !== "0") {
        let offset = Math.floor(Math.random() * 10) + 1;
        fake_str = formatFrac(u1 * Math.pow(r_num, n - 1) + (Math.random() > 0.5 ? offset : -offset) * Math.pow(r_den, n - 1), Math.pow(r_den, n - 1));
      }
      fallback++;
      R[i] = `$${fake_str}$`;
    } while (tlacu.pregunta.hayRepetidos(R) || fake_str === un_str || fake_str === "undefined");
  }

  return [P, R];
}
