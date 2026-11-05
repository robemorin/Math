import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Teorema del coseno';
}

export function tipo() {
  return 0; // 0 - Opción múltiple
}

export async function pregunta(numeroPregunta) {
  try {
    const letrasTriangulos = [
      { v1: "A", v2: "B", v3: "C", s1: "a", s2: "b", s3: "c" },
      { v1: "P", v2: "Q", v3: "R", s1: "p", s2: "q", s3: "r" },
      { v1: "X", v2: "Y", v3: "Z", s1: "x", s2: "y", s3: "z" },
      { v1: "D", v2: "E", v3: "F", s1: "d", s2: "e", s3: "f" },
      { v1: "H", v2: "J", v3: "K", s1: "h", s2: "j", s3: "k" }
    ];

    const unidades = ["cm", "m", "mm"];

    const lt = letrasTriangulos[Math.floor(Math.random() * letrasTriangulos.length)];
    const u = unidades[Math.floor(Math.random() * unidades.length)];
    const modo = Math.random() < 0.5 ? 0 : 1; // 0: SAS (Hallar lado), 1: SSS (Hallar ángulo)

    const b = Math.floor(Math.random() * 12) + 6; // 6 a 17
    const c = Math.floor(Math.random() * 12) + 6; // 6 a 17
    const A_deg = Math.floor(Math.random() * 90) + 40; // 40° a 129°
    const A_rad = (A_deg * Math.PI) / 180;

    const a_exact = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(A_rad));
    const a = parseFloat(a_exact.toFixed(1));

    let P = '';
    let ansCorrecta = '';
    let valorCorrectoNum = 0;
    const poolDistractores = [];

    if (modo === 0) {
      // MODO 0 (SAS): Se dan dos lados y el ángulo comprendido, hallar el tercer lado
      valorCorrectoNum = a_exact;
      ansCorrecta = `$${valorCorrectoNum.toFixed(1)}\\text{ ${u}}$`;

      P = `
        ${numeroPregunta === 0 ? '<h2>Teorema del coseno: $$a^2 = b^2 + c^2 - 2bc\\cos(A), \\quad \\cos(A) = \\frac{b^2 + c^2 - a^2}{2bc}$$</h2>' : ''}
        <p>${numeroPregunta + 1}.- En el triángulo $${lt.v1}${lt.v2}${lt.v3}$, se sabe que el lado $${lt.s2} = ${b}\\text{ ${u}}$, el lado $${lt.s3} = ${c}\\text{ ${u}}$ y el ángulo en el vértice $${lt.v1}$ mide $${A_deg}^\\circ$. Halle la longitud del lado $${lt.s1}$ (redondee a 1 cifra decimal).</p>
      `;

      // Distractores comunes:
      // 1. Error de signo (+ en lugar de - en la fórmula del coseno)
      const errSigno = Math.sqrt(Math.max(1, b * b + c * c + 2 * b * c * Math.cos(A_rad)));
      poolDistractores.push(`$${errSigno.toFixed(1)}\\text{ ${u}}$`);

      // 2. Usar Pitágoras directamente: sqrt(b^2 + c^2)
      const errPitagoras = Math.sqrt(b * b + c * c);
      poolDistractores.push(`$${errPitagoras.toFixed(1)}\\text{ ${u}}$`);

      // 3. Olvidar el factor 2 en 2bc*cos(A)
      const errSinDos = Math.sqrt(Math.max(1, b * b + c * c - b * c * Math.cos(A_rad)));
      poolDistractores.push(`$${errSinDos.toFixed(1)}\\text{ ${u}}$`);

      // 4. Usar seno en lugar de coseno
      const errSeno = Math.sqrt(Math.max(1, b * b + c * c - 2 * b * c * Math.sin(A_rad)));
      poolDistractores.push(`$${errSeno.toFixed(1)}\\text{ ${u}}$`);

      // 5. Olvidar sacar raíz cuadrada (o variaciones cercanas)
      poolDistractores.push(`$${Math.abs(valorCorrectoNum + 2.3).toFixed(1)}\\text{ ${u}}$`);
      poolDistractores.push(`$${Math.max(1, valorCorrectoNum - 1.8).toFixed(1)}\\text{ ${u}}$`);

    } else {
      // MODO 1 (SSS): Se dan los tres lados, hallar un ángulo
      const cosA = Math.max(-0.99, Math.min(0.99, (b * b + c * c - a * a) / (2 * b * c)));
      const A_deg_calc = (Math.acos(cosA) * 180) / Math.PI;
      valorCorrectoNum = A_deg_calc;
      ansCorrecta = `$${valorCorrectoNum.toFixed(1)}^\\circ$`;

      P = `
        ${numeroPregunta === 0 ? '<h2>Teorema del coseno: $$a^2 = b^2 + c^2 - 2bc\\cos(A), \\quad \\cos(A) = \\frac{b^2 + c^2 - a^2}{2bc}$$</h2>' : ''}
        <p>${numeroPregunta + 1}.- En el triángulo $${lt.v1}${lt.v2}${lt.v3}$, se conocen las longitudes de sus tres lados: $${lt.s1} = ${a}\\text{ ${u}}$, $${lt.s2} = ${b}\\text{ ${u}}$ y $${lt.s3} = ${c}\\text{ ${u}}$. Halle la medida del ángulo del vértice $${lt.v1}$ (redondee a 1 cifra decimal).</p>
      `;

      // Distractores comunes:
      // 1. Ángulo suplementario (180° - A)
      poolDistractores.push(`$${(180 - valorCorrectoNum).toFixed(1)}^\\circ$`);

      // 2. Usar arcsin en lugar de arccos
      const errAsin = (Math.asin(Math.abs(cosA)) * 180) / Math.PI;
      poolDistractores.push(`$${errAsin.toFixed(1)}^\\circ$`);

      // 3. Calcular otro ángulo del triángulo (por ejemplo el vértice B)
      const cosB = Math.max(-0.99, Math.min(0.99, (a * a + c * c - b * b) / (2 * a * c)));
      const B_deg_calc = (Math.acos(cosB) * 180) / Math.PI;
      poolDistractores.push(`$${B_deg_calc.toFixed(1)}^\\circ$`);

      // 4. Olvidar el 2 en el denominador (si sigue en dominio [-1, 1])
      const cosSinDos = (b * b + c * c - a * a) / (b * c);
      if (cosSinDos >= -1 && cosSinDos <= 1) {
        poolDistractores.push(`$${((Math.acos(cosSinDos) * 180) / Math.PI).toFixed(1)}^\\circ$`);
      }

      // 5. Variaciones numéricas
      poolDistractores.push(`$${Math.max(5, valorCorrectoNum - 11.4).toFixed(1)}^\\circ$`);
      poolDistractores.push(`$${Math.min(175, valorCorrectoNum + 13.7).toFixed(1)}^\\circ$`);
    }

    const R = [ansCorrecta];

    for (const opt of poolDistractores) {
      if (opt && opt !== ansCorrecta && !R.includes(opt)) {
        R.push(opt);
      }
      if (R.length >= 6) break;
    }

    let extra = 1;
    while (R.length < 6) {
      const altVal = Math.max(1.5, valorCorrectoNum + (extra % 2 === 0 ? extra * 2.7 : -extra * 2.3));
      const opt = modo === 0
        ? `$${altVal.toFixed(1)}\\text{ ${u}}$`
        : `$${Math.min(175, altVal).toFixed(1)}^\\circ$`;
      if (!R.includes(opt)) {
        R.push(opt);
      }
      extra++;
    }

    for (let j = 1; j < 6; ++j) {
      let intentos = 0;
      while (tlacu.pregunta.hayRepetidos(R) && intentos < 20) {
        const altVal = valorCorrectoNum + (j + intentos) * 3.1 + 1.2;
        R[j] = modo === 0
          ? `$${altVal.toFixed(1)}\\text{ ${u}}$`
          : `$${Math.min(175, altVal).toFixed(1)}^\\circ$`;
        intentos++;
      }
    }

    return [P, R];
  } catch (error) {
    console.error('Error al generar la pregunta 8.3.1:', error);
  }
}
