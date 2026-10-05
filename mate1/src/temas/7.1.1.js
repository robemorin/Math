import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Razones trigonométricas en triángulos rectángulos';
}

export function tipo() {
  return 0; // 0 - Opción múltiple
}

// Redondeo a 3 cifras significativas (estándar IB)
function roundTo3SF(num) {
  if (num === 0) return '0';
  let d = Math.ceil(Math.log10(Math.abs(num)));
  let power = 3 - d;
  let magnitude = Math.pow(10, power);
  let shifted = Math.round(num * magnitude);
  let res = shifted / magnitude;
  return res.toPrecision(3);
}

// Representación de una raíz cuadrada: si es cuadrado perfecto muestra el entero, sino \sqrt{n}
function formatSqrt(radicand) {
  const root = Math.round(Math.sqrt(radicand));
  if (root * root === radicand) {
    return `${root}`;
  }
  return `\\sqrt{${radicand}}`;
}

// Formato de fracción donde el numerador o denominador pueden ser una raíz o un entero
function formatFraction(numStr, denStr) {
  if (denStr === '1') return numStr;
  return `\\frac{${numStr}}{${denStr}}`;
}

export async function pregunta(numeroPregunta) {
  try {
    // Escoger aleatoriamente cuál par de lados se proporciona:
    // 0: Se dan ambos catetos (adyacente 'a' y opuesto 'b'). La hipotenusa 'c' se calcula como sqrt(a^2 + b^2).
    // 1: Se da cateto adyacente 'a' e hipotenusa 'c'. El cateto opuesto 'b' se calcula como sqrt(c^2 - a^2).
    // 2: Se da cateto opuesto 'b' e hipotenusa 'c'. El cateto adyacente 'a' se calcula como sqrt(c^2 - b^2).
    const caso = Math.floor(Math.random() * 3);

    let a, b, c; // a: adyacente, b: opuesto, c: hipotenusa
    let radA, radB, radC; // radicandos o cuadrados para mostrar en la raíz si es necesario
    let labelBase, labelAltura, labelHipo; // textos para el SVG
    let numStrA, numStrB, numStrC; // representaciones en LaTeX

    if (caso === 0) {
      // Se dan los catetos con valores enteros aleatorios
      a = Math.floor(Math.random() * 11) + 3; // 3 a 13
      b = Math.floor(Math.random() * 11) + 3; // 3 a 13
      radC = a * a + b * b;
      c = Math.sqrt(radC);

      labelBase = `${a}`;
      labelAltura = `${b}`;
      labelHipo = ''; // No se muestra en el triángulo

      numStrA = `${a}`;
      numStrB = `${b}`;
      numStrC = formatSqrt(radC);
    } else if (caso === 1) {
      // Se da el adyacente y la hipotenusa
      a = Math.floor(Math.random() * 9) + 3; // 3 a 11
      const diff = Math.floor(Math.random() * 6) + 2; // asegurar que c > a
      c = a + diff;
      radB = c * c - a * a;
      b = Math.sqrt(radB);

      labelBase = `${a}`;
      labelAltura = ''; // No se muestra
      labelHipo = `${c}`;

      numStrA = `${a}`;
      numStrB = formatSqrt(radB);
      numStrC = `${c}`;
    } else {
      // Se da el opuesto y la hipotenusa
      b = Math.floor(Math.random() * 9) + 3; // 3 a 11
      const diff = Math.floor(Math.random() * 6) + 2; // asegurar que c > b
      c = b + diff;
      radA = c * c - b * b;
      a = Math.sqrt(radA);

      labelBase = ''; // No se muestra
      labelAltura = `${b}`;
      labelHipo = `${c}`;

      numStrA = formatSqrt(radA);
      numStrB = `${b}`;
      numStrC = `${c}`;
    }

    // Función trigonométrica a pedir: sin(θ), cos(θ) o tan(θ)
    const funciones = ['\\sin(\\theta)', '\\cos(\\theta)', '\\tan(\\theta)'];
    const fnIndex = Math.floor(Math.random() * 3);
    const targetFn = funciones[fnIndex];

    let valorNumCorrecto = 0;
    let numCorrectoStr = '';
    let denCorrectoStr = '';

    if (fnIndex === 0) {
      // sin(θ) = opuesto / hipotenusa = b / c
      valorNumCorrecto = b / c;
      numCorrectoStr = numStrB;
      denCorrectoStr = numStrC;
    } else if (fnIndex === 1) {
      // cos(θ) = adyacente / hipotenusa = a / c
      valorNumCorrecto = a / c;
      numCorrectoStr = numStrA;
      denCorrectoStr = numStrC;
    } else {
      // tan(θ) = opuesto / adyacente = b / a
      valorNumCorrecto = b / a;
      numCorrectoStr = numStrB;
      denCorrectoStr = numStrA;
    }

    const fracCorrectaStr = formatFraction(numCorrectoStr, denCorrectoStr);
    const ansCorrecta = `$${fracCorrectaStr} \\approx ${roundTo3SF(valorNumCorrecto)}$`;

    // SVG esquemático (no a escala estricta, solo como referencia)
    const svgHTML = `
      <svg width="250" height="200" viewBox="0 0 250 200" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
        <!-- Triángulo -->
        <polygon points="40,160 200,160 200,40" fill="#eef6fb" stroke="#2980b9" stroke-width="2.5" stroke-linejoin="round" />
        
        <!-- Símbolo de ángulo recto en C (200, 160) -->
        <path d="M 182,160 L 182,142 L 200,142" fill="none" stroke="#2980b9" stroke-width="1.8" />
        <circle cx="191" cy="151" r="1.5" fill="#2980b9" />

        <!-- Arco del ángulo θ en el vértice A (40, 160) -->
        <path d="M 75,160 A 35 35 0 0 0 68,139" fill="none" stroke="#e67e22" stroke-width="2" />
        <text x="82" y="152" font-family="serif" font-size="16px" font-style="italic" fill="#d35400">θ</text>

        <!-- Etiquetas de los dos lados dados -->
        ${labelBase ? `<text x="120" y="180" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#2c3e50" text-anchor="middle">${labelBase}</text>` : ''}
        ${labelAltura ? `<text x="216" y="105" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#2c3e50" text-anchor="start">${labelAltura}</text>` : ''}
        ${labelHipo ? `<text x="110" y="90" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#2c3e50" text-anchor="end">${labelHipo}</text>` : ''}
      </svg>
    `;

    const P = `
      ${numeroPregunta === 0 ? '<h2>Razones trigonométricas: $$\\sin(\\theta) = \\frac{\\text{cateto opuesto}}{\\text{hipotenusa}}, \\quad \\cos(\\theta) = \\frac{\\text{cateto adyacente}}{\\text{hipotenusa}}, \\quad \\tan(\\theta) = \\frac{\\text{cateto opuesto}}{\\text{cateto adyacente}}$$</h2>' : ''}
      <p>${numeroPregunta + 1}.- Calcule el valor de $${targetFn}$ para el ángulo $\\theta$ a partir del triángulo rectángulo de la figura.</p>
      <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
        ${svgHTML}
      </div>
    `;

    // Armar opciones y distractores basados en confusiones comunes
    const formatOpt = (nStr, dStr, nVal, dVal) => {
      const frac = formatFraction(nStr, dStr);
      return `$${frac} \\approx ${roundTo3SF(nVal / dVal)}$`;
    };

    const R = [ansCorrecta];
    const poolDistractores = [];

    // 1. Razón recíproca (denominador / numerador)
    poolDistractores.push(formatOpt(denCorrectoStr, numCorrectoStr, (fnIndex === 0 ? c : fnIndex === 1 ? c : a), (fnIndex === 0 ? b : fnIndex === 1 ? a : b)));

    // 2. Otras razones trigonométricas entre los lados
    if (fnIndex === 0) {
      // Pedían sin (b / c). Distractores: cos (a / c), tan (b / a), a / b, c / a
      poolDistractores.push(formatOpt(numStrA, numStrC, a, c));
      poolDistractores.push(formatOpt(numStrB, numStrA, b, a));
      poolDistractores.push(formatOpt(numStrA, numStrB, a, b));
      poolDistractores.push(formatOpt(numStrC, numStrA, c, a));
    } else if (fnIndex === 1) {
      // Pedían cos (a / c). Distractores: sin (b / c), tan (b / a), a / b, c / b
      poolDistractores.push(formatOpt(numStrB, numStrC, b, c));
      poolDistractores.push(formatOpt(numStrB, numStrA, b, a));
      poolDistractores.push(formatOpt(numStrA, numStrB, a, b));
      poolDistractores.push(formatOpt(numStrC, numStrB, c, b));
    } else {
      // Pedían tan (b / a). Distractores: sin (b / c), cos (a / c), a / b, c / b, c / a
      poolDistractores.push(formatOpt(numStrB, numStrC, b, c));
      poolDistractores.push(formatOpt(numStrA, numStrC, a, c));
      poolDistractores.push(formatOpt(numStrA, numStrB, a, b));
      poolDistractores.push(formatOpt(numStrC, numStrB, c, b));
      poolDistractores.push(formatOpt(numStrC, numStrA, c, a));
    }

    // Error de signo en Pitágoras si se calculó la hipotenusa (sumando en vez de restar o viceversa)
    if (caso === 0) {
      // Calculó c como sqrt(a^2 - b^2) por error si a != b
      const diffSq = Math.abs(a * a - b * b);
      if (diffSq > 0) {
        poolDistractores.push(formatOpt(numCorrectoStr, formatSqrt(diffSq), (fnIndex === 2 ? b : b), Math.sqrt(diffSq)));
      }
    } else {
      // Calculó el cateto sumando cuadrados (c^2 + lado^2) por error
      const sumSq = c * c + (caso === 1 ? a * a : b * b);
      poolDistractores.push(formatOpt(formatSqrt(sumSq), numStrC, Math.sqrt(sumSq), c));
    }

    // Agregar distractores únicos
    for (let opt of poolDistractores) {
      if (opt && opt !== ansCorrecta && !R.includes(opt)) {
        R.push(opt);
      }
      if (R.length >= 6) break;
    }

    // Rellenar si faltan opciones
    let extra = 1;
    while (R.length < 6) {
      const altVal = valorNumCorrecto + extra * 0.15;
      const opt = `$\\approx ${roundTo3SF(altVal)}$`;
      if (!R.includes(opt)) {
        R.push(opt);
      }
      extra++;
    }

    // Asegurar que no haya repetidos
    for (let j = 1; j < 6; ++j) {
      let intentos = 0;
      while (tlacu.pregunta.hayRepetidos(R) && intentos < 20) {
        const alt = valorNumCorrecto + (j + intentos) * 0.12;
        R[j] = `$\\approx ${roundTo3SF(alt)}$`;
        intentos++;
      }
    }

    return [P, R];

  } catch (error) {
    console.error('Error al generar la pregunta:', error);
  }
}
