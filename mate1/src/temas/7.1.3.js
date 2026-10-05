import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Teorema de Pitágoras';
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

// Representación de radical exacto o entero si es cuadrado perfecto
function formatRadical(radicand) {
  const root = Math.round(Math.sqrt(radicand));
  if (root * root === radicand) {
    return `${root}`;
  }
  return `\\sqrt{${radicand}}`;
}

export async function pregunta(numeroPregunta) {
  try {
    // Determinar qué lado es la incógnita:
    // 0: Se conocen los catetos 'a' y 'b', se pide la hipotenusa 'c' (c = sqrt(a^2 + b^2))
    // 1: Se conoce el cateto 'a' y la hipotenusa 'c', se pide el cateto opuesto 'b' (b = sqrt(c^2 - a^2))
    // 2: Se conoce el cateto 'b' y la hipotenusa 'c', se pide el cateto adyacente 'a' (a = sqrt(c^2 - b^2))
    const tipoIncognita = Math.floor(Math.random() * 3);

    let a, b, c;
    let radCorrecto;
    let valorCorrectoNum;
    let labelBase, labelAltura, labelHipo;
    let preguntaTexto;

    if (tipoIncognita === 0) {
      // Se conocen catetos a y b, incógnita c (hipotenusa)
      a = Math.floor(Math.random() * 12) + 3; // 3 a 14
      b = Math.floor(Math.random() * 12) + 3; // 3 a 14
      radCorrecto = a * a + b * b;
      c = Math.sqrt(radCorrecto);
      valorCorrectoNum = c;

      labelBase = `${a}`;
      labelAltura = `${b}`;
      labelHipo = 'x';
      preguntaTexto = 'la longitud de la hipotenusa $x$';
    } else if (tipoIncognita === 1) {
      // Se conoce cateto a e hipotenusa c, incógnita cateto b
      a = Math.floor(Math.random() * 10) + 3; // 3 a 12
      const diff = Math.floor(Math.random() * 7) + 2; // c > a
      c = a + diff;
      radCorrecto = c * c - a * a;
      b = Math.sqrt(radCorrecto);
      valorCorrectoNum = b;

      labelBase = `${a}`;
      labelAltura = 'x';
      labelHipo = `${c}`;
      preguntaTexto = 'la longitud del cateto desconocido $x$';
    } else {
      // Se conoce cateto b e hipotenusa c, incógnita cateto a
      b = Math.floor(Math.random() * 10) + 3; // 3 a 12
      const diff = Math.floor(Math.random() * 7) + 2; // c > b
      c = b + diff;
      radCorrecto = c * c - b * b;
      a = Math.sqrt(radCorrecto);
      valorCorrectoNum = a;

      labelBase = 'x';
      labelAltura = `${b}`;
      labelHipo = `${c}`;
      preguntaTexto = 'la longitud del cateto desconocido $x$';
    }

    const radStr = formatRadical(radCorrecto);
    const ansCorrecta = radStr.startsWith('\\sqrt')
      ? `$${radStr} \\approx ${roundTo3SF(valorCorrectoNum)}$`
      : `$${radStr}$`;

    // SVG esquemático del triángulo rectángulo
    const svgHTML = `
      <svg width="250" height="200" viewBox="0 0 250 200" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
        <!-- Triángulo -->
        <polygon points="40,160 200,160 200,40" fill="#eef6fb" stroke="#2980b9" stroke-width="2.5" stroke-linejoin="round" />
        
        <!-- Símbolo de ángulo recto -->
        <path d="M 182,160 L 182,142 L 200,142" fill="none" stroke="#2980b9" stroke-width="1.8" />
        <circle cx="191" cy="151" r="1.5" fill="#2980b9" />

        <!-- Etiquetas de los lados -->
        <text x="120" y="180" font-family="sans-serif" font-size="14px" font-weight="bold" fill="${labelBase === 'x' ? '#c0392b' : '#2c3e50'}" text-anchor="middle">${labelBase}</text>
        <text x="216" y="105" font-family="sans-serif" font-size="14px" font-weight="bold" fill="${labelAltura === 'x' ? '#c0392b' : '#2c3e50'}" text-anchor="start">${labelAltura}</text>
        <text x="110" y="90" font-family="sans-serif" font-size="14px" font-weight="bold" fill="${labelHipo === 'x' ? '#c0392b' : '#2c3e50'}" text-anchor="end">${labelHipo}</text>
      </svg>
    `;

    const P = `
      ${numeroPregunta === 0 ? '<h2>Teorema de Pitágoras: $$a^2 + b^2 = c^2 \\iff c = \\sqrt{a^2 + b^2}$$</h2>' : ''}
      <p>${numeroPregunta + 1}.- Determine ${preguntaTexto} en el siguiente triángulo rectángulo.</p>
      <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
        ${svgHTML}
      </div>
    `;

    // Armar opciones con distractores comunes:
    // Helper para formatear opción
    const formatOpt = (rad) => {
      if (rad <= 0) return null;
      const r = Math.sqrt(rad);
      const str = formatRadical(rad);
      return str.startsWith('\\sqrt')
        ? `$${str} \\approx ${roundTo3SF(r)}$`
        : `$${str}$`;
    };

    const R = [ansCorrecta];
    const poolDistractores = [];

    // Distractor 1: Error de operación (sumar en vez de restar o restar en vez de sumar)
    if (tipoIncognita === 0) {
      // Sumaba catetos directamente sin elevar al cuadrado: a + b
      const sumDirecta = a + b;
      poolDistractores.push(`$${sumDirecta}$`);

      // Restaba cuadrados: |a^2 - b^2|
      const diffSq = Math.abs(a * a - b * b);
      if (diffSq > 0) poolDistractores.push(formatOpt(diffSq));

      // Raíz de la suma sin cuadrados: sqrt(a + b)
      poolDistractores.push(formatOpt(a + b));

      // a^2 + b^2 sin sacar raíz
      poolDistractores.push(`$${radCorrecto}$`);
    } else {
      // Para catetos: sumar cuadrados en vez de restar: c^2 + lado^2
      const ladoDado = (tipoIncognita === 1 ? a : b);
      const sumSq = c * c + ladoDado * ladoDado;
      poolDistractores.push(formatOpt(sumSq));

      // Resta directa: c - lado
      poolDistractores.push(`$${c - ladoDado}$`);

      // c^2 - lado^2 sin sacar raíz cuadrada
      poolDistractores.push(`$${radCorrecto}$`);

      // Raíz de la resta directa: sqrt(c - lado)
      poolDistractores.push(formatOpt(c - ladoDado));
    }

    // Distractores con pequeñas variaciones en el radicando
    const offsets = [4, -4, 7, -7, 10, -10];
    for (const off of offsets) {
      const candidateRad = radCorrecto + off;
      if (candidateRad > 1) {
        poolDistractores.push(formatOpt(candidateRad));
      }
    }

    for (let opt of poolDistractores) {
      if (opt && opt !== ansCorrecta && !R.includes(opt)) {
        R.push(opt);
      }
      if (R.length >= 6) break;
    }

    // Rellenar hasta 6 si hiciera falta
    let extra = 1;
    while (R.length < 6) {
      const altRad = radCorrecto + extra * 5;
      const opt = formatOpt(altRad);
      if (opt && !R.includes(opt)) {
        R.push(opt);
      }
      extra++;
    }

    // Asegurar que no haya duplicados
    for (let j = 1; j < 6; ++j) {
      let intentos = 0;
      while (tlacu.pregunta.hayRepetidos(R) && intentos < 20) {
        const altRad = radCorrecto + (j + intentos) * 3 + 1;
        R[j] = formatOpt(altRad);
        intentos++;
      }
    }

    return [P, R];

  } catch (error) {
    console.error('Error al generar la pregunta:', error);
  }
}
