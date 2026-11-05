import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Teorema del seno';
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
    const modo = Math.random() < 0.5 ? 0 : 1; // 0: Hallar lado, 1: Hallar ángulo

    let P = '';
    let ansCorrecta = '';
    let valorCorrectoNum = 0;
    const poolDistractores = [];

    if (modo === 0) {
      // MODO 0: Se conocen dos ángulos y un lado opuesto, hallar el otro lado opuesto
      const A_deg = Math.floor(Math.random() * 50) + 35; // 35° a 84°
      let B_deg = Math.floor(Math.random() * 50) + 35;   // 35° a 84°
      if (B_deg === A_deg) B_deg += 5;
      const b = Math.floor(Math.random() * 12) + 6;      // 6 a 17

      const A_rad = (A_deg * Math.PI) / 180;
      const B_rad = (B_deg * Math.PI) / 180;
      const a_exact = (b * Math.sin(A_rad)) / Math.sin(B_rad);

      valorCorrectoNum = a_exact;
      ansCorrecta = `$${valorCorrectoNum.toFixed(1)}\\text{ ${u}}$`;

      P = `
        ${numeroPregunta === 0 ? '<h2>Teorema del seno: $$\\frac{a}{\\sin(A)} = \\frac{b}{\\sin(B)} = \\frac{c}{\\sin(C)}$$</h2>' : ''}
        <p>${numeroPregunta + 1}.- En el triángulo $${lt.v1}${lt.v2}${lt.v3}$, se sabe que el ángulo en $${lt.v1}$ mide $${A_deg}^\\circ$, el ángulo en $${lt.v2}$ mide $${B_deg}^\\circ$ y el lado $${lt.s2} = ${b}\\text{ ${u}}$. Halle la longitud del lado $${lt.s1}$ (redondee a 1 cifra decimal).</p>
      `;

      // Distractores comunes:
      // 1. Invertir la razón de los senos: b * sin(B) / sin(A)
      const errInvertido = (b * Math.sin(B_rad)) / Math.sin(A_rad);
      poolDistractores.push(`$${errInvertido.toFixed(1)}\\text{ ${u}}$`);

      // 2. Usar cosenos en lugar de senos: b * cos(A) / cos(B)
      if (Math.abs(Math.cos(B_rad)) > 0.1) {
        const errCos = Math.abs((b * Math.cos(A_rad)) / Math.cos(B_rad));
        poolDistractores.push(`$${errCos.toFixed(1)}\\text{ ${u}}$`);
      }

      // 3. Proporción directa con los grados sin función trigonométrica: b * A / B
      const errLineal = (b * A_deg) / B_deg;
      poolDistractores.push(`$${errLineal.toFixed(1)}\\text{ ${u}}$`);

      // 4. Multiplicar ambos senos: b * sin(A) * sin(B)
      const errMult = b * Math.sin(A_rad) * Math.sin(B_rad);
      poolDistractores.push(`$${errMult.toFixed(1)}\\text{ ${u}}$`);

      // 5. Variaciones numéricas
      poolDistractores.push(`$${(valorCorrectoNum + 2.4).toFixed(1)}\\text{ ${u}}$`);
      poolDistractores.push(`$${Math.max(1.2, valorCorrectoNum - 1.9).toFixed(1)}\\text{ ${u}}$`);

    } else {
      // MODO 1: Se conocen dos lados y el ángulo opuesto al mayor, hallar el ángulo agudo opuesto al menor
      const A_deg = Math.floor(Math.random() * 30) + 30; // 30° a 59° (A menor que B)
      const B_deg = Math.floor(Math.random() * 30) + 65; // 65° a 94° (B mayor que A)
      const b = Math.floor(Math.random() * 12) + 8;      // 8 a 19

      const A_rad = (A_deg * Math.PI) / 180;
      const B_rad = (B_deg * Math.PI) / 180;

      const a_exact = (b * Math.sin(A_rad)) / Math.sin(B_rad);
      const a = parseFloat(a_exact.toFixed(1));

      const sinA = Math.min(0.999, (a * Math.sin(B_rad)) / b);
      const A_calc_deg = (Math.asin(sinA) * 180) / Math.PI;

      valorCorrectoNum = A_calc_deg;
      ansCorrecta = `$${valorCorrectoNum.toFixed(1)}^\\circ$`;

      P = `
        ${numeroPregunta === 0 ? '<h2>Teorema del seno: $$\\frac{\\sin(A)}{a} = \\frac{\\sin(B)}{b} = \\frac{\\sin(C)}{c}$$</h2>' : ''}
        <p>${numeroPregunta + 1}.- En el triángulo $${lt.v1}${lt.v2}${lt.v3}$, se sabe que el lado $${lt.s1} = ${a}\\text{ ${u}}$, el lado $${lt.s2} = ${b}\\text{ ${u}}$ y el ángulo en $${lt.v2}$ mide $${B_deg}^\\circ$. Halle la medida del ángulo en el vértice $${lt.v1}$ (redondee a 1 cifra decimal).</p>
      `;

      // Distractores comunes:
      // 1. Usar arccos en lugar de arcsin
      const errAcos = (Math.acos(sinA) * 180) / Math.PI;
      poolDistractores.push(`$${errAcos.toFixed(1)}^\\circ$`);

      // 2. Proporción lineal sin funciones trigonométricas: B_deg * (a / b)
      const errLineal = B_deg * (a / b);
      poolDistractores.push(`$${errLineal.toFixed(1)}^\\circ$`);

      // 3. Tercer ángulo del triángulo (180° - A - B)
      const tercerAngulo = 180 - valorCorrectoNum - B_deg;
      if (tercerAngulo > 5) {
        poolDistractores.push(`$${tercerAngulo.toFixed(1)}^\\circ$`);
      }

      // 4. Ángulo suplementario (180° - A)
      poolDistractores.push(`$${(180 - valorCorrectoNum).toFixed(1)}^\\circ$`);

      // 5. Variaciones numéricas
      poolDistractores.push(`$${Math.max(5, valorCorrectoNum - 8.3).toFixed(1)}^\\circ$`);
      poolDistractores.push(`$${(valorCorrectoNum + 9.6).toFixed(1)}^\\circ$`);
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
      const altVal = Math.max(1.5, valorCorrectoNum + (extra % 2 === 0 ? extra * 2.5 : -extra * 2.1));
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
        const altVal = valorCorrectoNum + (j + intentos) * 3.3 + 1.4;
        R[j] = modo === 0
          ? `$${altVal.toFixed(1)}\\text{ ${u}}$`
          : `$${Math.min(175, altVal).toFixed(1)}^\\circ$`;
        intentos++;
      }
    }

    return [P, R];
  } catch (error) {
    console.error('Error al generar la pregunta 8.4.1:', error);
  }
}
