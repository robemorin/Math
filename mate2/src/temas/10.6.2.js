// 10.6.2.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return "Derivada de potencias y radicales";
}

export function tipo() {
  return 0; // Opción múltiple
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

function simplifyFrac(num, den) {
  if (den < 0) {
    num = -num;
    den = -den;
  }
  const d = gcd(num, den);
  return [num / d, den / d];
}

// Formatea x^p o \sqrt[m]{x^n} o x o 1
function formatRootOrPow(m, n) {
  if (n === 0) return "";
  if (m === 1) {
    if (n === 1) return "x";
    return `x^{${n}}`;
  }
  const rootPrefix = m === 2 ? "\\sqrt" : `\\sqrt[${m}]`;
  if (n === 1) return `${rootPrefix}{x}`;
  return `${rootPrefix}{x^{${n}}}`;
}

// Formatea expresiones generales de la forma: C * x^(numExp / denExp)
// Devuelve la representación matemática en LaTeX (fracción simplificada y radical/potencia en numerador o denominador)
function formatTerm(numCoeff, denCoeff, numExp, denExp) {
  [numCoeff, denCoeff] = simplifyFrac(numCoeff, denCoeff);
  [numExp, denExp] = simplifyFrac(numExp, denExp);

  if (numCoeff === 0) return "0";

  const isNeg = numCoeff < 0;
  const absNumCoeff = Math.abs(numCoeff);
  const signStr = isNeg ? "-" : "";

  // Exponente 0: constante
  if (numExp === 0) {
    if (denCoeff === 1) return `${signStr}${absNumCoeff}`;
    return `${signStr}\\frac{${absNumCoeff}}{${denCoeff}}`;
  }

  const isExpPos = numExp > 0;
  const absNumExp = Math.abs(numExp);
  const rootStr = formatRootOrPow(denExp, absNumExp);

  if (isExpPos) {
    // Variable en numerador
    if (denCoeff === 1) {
      if (absNumCoeff === 1) return `${signStr}${rootStr}`;
      return `${signStr}${absNumCoeff}${rootStr}`;
    } else {
      const topStr = absNumCoeff === 1 ? rootStr : `${absNumCoeff}${rootStr}`;
      return `${signStr}\\frac{${topStr}}{${denCoeff}}`;
    }
  } else {
    // Exponente negativo: variable en denominador
    const botVar = denCoeff === 1 ? rootStr : `${denCoeff}${rootStr}`;
    return `${signStr}\\frac{${absNumCoeff}}{${botVar}}`;
  }
}

export async function pregunta(np, code, esImprimible = false) {
  function P1() {
    // Seleccionar tipo de ejercicio:
    // 0: a / (b * \sqrt[m]{x^n}) -> f(x) = (a/b) * x^(-n/m)
    // 1: \sqrt[m]{x^n}          -> f(x) = 1 * x^(n/m)
    // 2: a / (b * x^n)          -> f(x) = (a/b) * x^(-n)
    const subtype = Math.floor(Math.random() * 3);

    let exprFuncLatex = "";
    let cNum = 1, cDen = 1, eNum = 1, eDen = 1;

    if (subtype === 0) {
      // Forma a / (b * \sqrt[m]{x^n})
      let a = Math.floor(Math.random() * 8) + 1; // 1..8
      let b = Math.floor(Math.random() * 5) + 1; // 1..5
      if (Math.random() > 0.5) a = -a;
      [a, b] = simplifyFrac(a, b);

      let m = Math.floor(Math.random() * 4) + 2; // 2..5 (índice radical >= 2)
      let n = Math.floor(Math.random() * 5) + 1; // 1..5
      // Evitar que n sea múltiplo exacto de m para que mantenga la forma radical
      while (n % m === 0) {
        n = Math.floor(Math.random() * 5) + 1;
      }

      cNum = a;
      cDen = b;
      eNum = -n;
      eDen = m;

      // Generar LaTeX de la función original
      const isNeg = a < 0;
      const absA = Math.abs(a);
      const signStr = isNeg ? "-" : "";
      const rootPart = formatRootOrPow(m, n);
      const denPart = b === 1 ? rootPart : `${b}${rootPart}`;
      exprFuncLatex = `${signStr}\\frac{${absA}}{${denPart}}`;

    } else if (subtype === 1) {
      // Forma \sqrt[m]{x^n}
      let m = Math.floor(Math.random() * 4) + 2; // 2..5
      let n = Math.floor(Math.random() * 5) + 1; // 1..5
      while (n % m === 0) {
        n = Math.floor(Math.random() * 5) + 1;
      }

      cNum = 1;
      cDen = 1;
      eNum = n;
      eDen = m;

      exprFuncLatex = formatRootOrPow(m, n);

    } else {
      // Forma a / (b * x^n)
      let a = Math.floor(Math.random() * 8) + 1; // 1..8
      let b = Math.floor(Math.random() * 5) + 1; // 1..5
      if (Math.random() > 0.5) a = -a;
      [a, b] = simplifyFrac(a, b);

      let n = Math.floor(Math.random() * 4) + 1; // 1..4 (potencia)

      cNum = a;
      cDen = b;
      eNum = -n;
      eDen = 1;

      const isNeg = a < 0;
      const absA = Math.abs(a);
      const signStr = isNeg ? "-" : "";
      const powPart = n === 1 ? "x" : `x^{${n}}`;
      const denPart = b === 1 ? powPart : `${b}${powPart}`;
      exprFuncLatex = `${signStr}\\frac{${absA}}{${denPart}}`;
    }

    // Derivada matemática:
    // Si f(x) = C * x^(p/q), entonces f'(x) = C * (p/q) * x^((p - q)/q)
    const derivCNum = cNum * eNum;
    const derivCDen = cDen * eDen;
    const derivENum = eNum - eDen;
    const derivEDen = eDen;

    const correcta = formatTerm(derivCNum, derivCDen, derivENum, derivEDen);

    const P = `
      <div class="pregunta-opcion-multiple">
        <p>${np + 1}.- Determine la derivada de la función $f(x) = ${exprFuncLatex}$.</p>
      </div>
    `;

    const R = [`$f'(x) = ${correcta}$`];

    // Generación de 5 distractores robustos con errores algebraicos y de cálculo típicos
    for (let k = 1; k < 6; ++k) {
      let intentos = 0;
      do {
        intentos++;
        let fakeCNum = derivCNum;
        let fakeCDen = derivCDen;
        let fakeENum = derivENum;
        let fakeEDen = derivEDen;

        const errType = (k - 1 + intentos) % 6;

        if (errType === 0) {
          // Error de signo en la derivada
          fakeCNum = -fakeCNum;
        } else if (errType === 1) {
          // Se le sumó 1 al exponente en lugar de restar 1 (error tipo integral o despiste)
          fakeENum = eNum + eDen;
          fakeEDen = eDen;
        } else if (errType === 2) {
          // No restó el denominador en la potencia fraccionaria (dejó el exponente original)
          fakeENum = eNum;
          fakeEDen = eDen;
        } else if (errType === 3) {
          // No multiplicó el coeficiente por el exponente original o se olvidó de multiplicar por el numerador/denominador
          fakeCNum = cNum;
          fakeCDen = cDen;
        } else if (errType === 4) {
          // Invirtió la fracción del exponente al multiplicar el coeficiente
          fakeCNum = cNum * eDen;
          fakeCDen = cDen * (eNum === 0 ? 1 : Math.abs(eNum));
          if (eNum < 0) fakeCNum = -fakeCNum;
        } else {
          // Pequeña variación en el exponente resultante
          const delta = (intentos % 2 === 0 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1);
          fakeENum = derivENum + delta * derivEDen;
        }

        const fakeStr = formatTerm(fakeCNum, fakeCDen, fakeENum, fakeEDen);
        R[k] = `$f'(x) = ${fakeStr}$`;

      } while (tlacu.pregunta.hayRepetidos(R) && intentos < 30);

      // Si por alguna razón colisiona tras 30 intentos, forzar un distractor aleatorio único
      while (tlacu.pregunta.hayRepetidos(R)) {
        const altC = derivCNum + k * (Math.random() > 0.5 ? 1 : -1);
        const fakeStr = formatTerm(altC, derivCDen, derivENum - k * derivEDen, derivEDen);
        R[k] = `$f'(x) = ${fakeStr}$`;
      }
    }

    if (esImprimible) {
      return [P, R[0]];
    }

    return [P, R];
  }

  try {
    return P1();
  } catch (error) {
    console.error('Error generando pregunta en 10.6.2.js:', error);
    return [`Error en la generación: ${error.message}`, ["0", "1", "2", "3", "4", "5"]];
  }
}

export async function render(container, n, code) {
  // Ejercicio de opción múltiple (tipo 0), no requiere lógica interactiva adicional
}
