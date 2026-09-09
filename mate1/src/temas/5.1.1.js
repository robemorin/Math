import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Término general de una sucesión';
}

export function tipo() {
  return 0; // 0 - Opción múltiple
}

export async function pregunta(numeroPregunta) {
  try {
    return generarPregunta(numeroPregunta);
  } catch (error) {
    console.error('Error al generar la pregunta:', error);
  }
}

function generarPregunta(numeroPregunta) {
  // Tipos de fórmulas:
  // 0: lineal u_n = a*n + b
  // 1: cuadrática u_n = a*n^2 + b
  // 2: exponencial u_n = a * b^n
  // 3: alternante / potencia negativa u_n = a - (-b)^n o (-1)^n * (a*n)
  const tipoFormula = Math.floor(Math.random() * 4);

  let formulaLatex = '';
  let k = Math.floor(Math.random() * 6) + 2; // término a evaluar
  let ansVal = 0;
  let distractorFn;

  if (tipoFormula === 0) {
    const a = (Math.floor(Math.random() * 9) + 2) * (Math.random() < 0.3 ? -1 : 1);
    const b = Math.floor(Math.random() * 21) - 10;
    const bStr = b === 0 ? '' : (b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`);
    formulaLatex = `u_n = ${a === 1 ? '' : (a === -1 ? '-' : a)}n${bStr}`;
    k = Math.floor(Math.random() * 20) + 3; // k entre 3 y 22
    ansVal = a * k + b;

    distractorFn = (rnd) => {
      if (rnd < 0.25) return a * (k - 1) + b;
      if (rnd < 0.5) return a * (k + 1) + b;
      if (rnd < 0.75) return a * k - b;
      return ansVal + (Math.floor(Math.random() * 11) - 5 || 3);
    };
  } else if (tipoFormula === 1) {
    const a = Math.floor(Math.random() * 3) + 1; // 1 a 3
    const b = Math.floor(Math.random() * 21) - 10;
    const bStr = b === 0 ? '' : (b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`);
    const aStr = a === 1 ? '' : a;
    formulaLatex = `u_n = ${aStr}n^2${bStr}`;
    k = Math.floor(Math.random() * 8) + 2; // k entre 2 y 9
    ansVal = a * (k * k) + b;

    distractorFn = (rnd) => {
      if (rnd < 0.25) return a * (2 * k) + b;
      if (rnd < 0.5) return a * ((k - 1) * (k - 1)) + b;
      if (rnd < 0.75) return a * ((k + 1) * (k + 1)) + b;
      return ansVal + (Math.floor(Math.random() * 11) - 5 || 4);
    };
  } else if (tipoFormula === 2) {
    const base = [2, 3, 5][Math.floor(Math.random() * 3)];
    const c = Math.floor(Math.random() * 4) + 1;
    const cStr = c === 1 ? '' : `${c} \\times `;
    formulaLatex = `u_n = ${cStr}${base}^n`;
    k = base === 2 ? Math.floor(Math.random() * 6) + 1 : Math.floor(Math.random() * 4) + 1;
    ansVal = c * Math.pow(base, k);

    distractorFn = (rnd) => {
      if (rnd < 0.25) return c * base * k;
      if (rnd < 0.5) return c * Math.pow(base, k - 1);
      if (rnd < 0.75) return c * Math.pow(base, k + 1);
      return ansVal + (Math.floor(Math.random() * 9) - 4 || 2);
    };
  } else {
    const a = Math.floor(Math.random() * 15) + 5;
    const b = [2, 3][Math.floor(Math.random() * 2)];
    k = Math.floor(Math.random() * 5) + 2;
    if (Math.random() < 0.5) {
      formulaLatex = `u_n = ${a} - (-${b})^n`;
      ansVal = a - Math.pow(-b, k);
      distractorFn = (rnd) => {
        if (rnd < 0.3) return a - Math.pow(b, k);
        if (rnd < 0.6) return a + Math.pow(b, k);
        return ansVal + (Math.floor(Math.random() * 7) - 3 || 2);
      };
    } else {
      formulaLatex = `u_n = (-1)^n (${a}n)`;
      ansVal = Math.pow(-1, k) * (a * k);
      distractorFn = (rnd) => {
        if (rnd < 0.4) return -ansVal;
        if (rnd < 0.7) return Math.pow(-1, k - 1) * (a * (k - 1));
        return ansVal + (Math.floor(Math.random() * 9) - 4 || 3);
      };
    }
  }

  const P = `
    ${numeroPregunta === 0 ? '<h2>Sucesiones numéricas: Fórmula explícita</h2>' : ''}
    <p>${numeroPregunta + 1}.- Una sucesión está definida por la fórmula explícita $${formulaLatex}$.</p>
    <p>Halla el valor del término $u_{${k}}$.</p>
  `;

  const R = [`$${ansVal}$`];

  for (let i = 1; i < 6; ++i) {
    let fakeVal;
    let attempts = 0;
    do {
      fakeVal = distractorFn(Math.random());
      if (fakeVal === ansVal || isNaN(fakeVal)) {
        fakeVal = ansVal + (i % 2 === 0 ? i * 2 : -i * 2);
      }
      R[i] = `$${fakeVal}$`;
      attempts++;
    } while (tlacu.pregunta.hayRepetidos(R) && attempts < 30);
  }

  return [P, R];
}
