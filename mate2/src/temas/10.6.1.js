// 10.6.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return "Derivada de la función potencia";
}

export function tipo() {
  return 0; // Opción múltiple
}

// Formatea un término de la forma c * x^n en LaTeX
function formatMonomial(c, n) {
  if (c === 0) return "0";
  if (n === 0) return `${c}`;

  const isNeg = c < 0;
  const absC = Math.abs(c);
  const signStr = isNeg ? "-" : "";
  const coeffStr = absC === 1 ? "" : `${absC}`;

  if (n === 1) {
    return `${signStr}${coeffStr}x`;
  }
  return `${signStr}${coeffStr}x^{${n}}`;
}

export async function pregunta(np, code, esImprimible = false) {
  function P1() {
    let c = 0;
    let n = 0;

    // Generar coeficiente c != 0 y exponente entero n != 0
    // n entre 1 y 7, o negativo -1 a -5 ocasionalmente si se desea, pero para cx^n potencias estándar enteros:
    // Generamos n entero entre 1 y 8
    do {
      c = Math.floor(Math.random() * 19) - 9; // -9 a 9
    } while (c === 0);

    n = Math.floor(Math.random() * 8) + 1; // 1 a 8

    const funcLatex = formatMonomial(c, n);

    const P = `
      <div class="pregunta-opcion-multiple">
        <p>${np + 1}.- Determine la derivada de la función $f(x) = ${funcLatex}$.</p>
      </div>
    `;

    // Derivada correcta: f'(x) = (c * n) * x^(n - 1)
    const derivC = c * n;
    const derivN = n - 1;
    const correcta = formatMonomial(derivC, derivN);

    const R = [`$f'(x) = ${correcta}$`];

    // Distractores con errores comunes en la regla de potencias
    for (let k = 1; k < 6; ++k) {
      let intentos = 0;
      do {
        intentos++;
        let fakeC = derivC;
        let fakeN = derivN;
        const errType = (k - 1 + intentos) % 6;

        if (errType === 0) {
          // Error de signo en el coeficiente
          fakeC = -derivC;
        } else if (errType === 1) {
          // Sumó 1 al exponente en lugar de restar 1 (error tipo antiderivada)
          fakeN = n + 1;
          fakeC = derivC;
        } else if (errType === 2) {
          // No restó 1 al exponente (dejó el exponente original)
          fakeN = n;
          fakeC = derivC;
        } else if (errType === 3) {
          // No multiplicó por el exponente (dejó c)
          fakeC = c;
          fakeN = derivN;
        } else if (errType === 4) {
          // Dividió entre el nuevo exponente en lugar de multiplicar (o multiplicó por n-1)
          fakeC = c * (derivN === 0 ? 1 : derivN);
          fakeN = derivN;
        } else {
          // Exponente restó 2 o varió coeficiente ligeramente
          fakeC = derivC + (intentos % 2 === 0 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
          fakeN = Math.max(0, derivN);
        }

        const fakeStr = formatMonomial(fakeC, fakeN);
        R[k] = `$f'(x) = ${fakeStr}$`;

      } while (tlacu.pregunta.hayRepetidos(R) && intentos < 30);

      // Si colisiona tras varios intentos, generar variación garantizada
      while (tlacu.pregunta.hayRepetidos(R)) {
        const altC = derivC + k * (Math.random() > 0.5 ? 1 : -1) * (k + 1);
        const altN = Math.max(0, derivN + (k % 2 === 0 ? 1 : -1));
        const fakeStr = formatMonomial(altC, altN);
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
    console.error('Error generando pregunta en 10.6.1.js:', error);
    return [`Error en la generación: ${error.message}`, ["0", "1", "2", "3", "4", "5"]];
  }
}

export async function render(container, n, code) {
  // Ejercicio de opción múltiple (tipo 0), no requiere lógica interactiva adicional
}
