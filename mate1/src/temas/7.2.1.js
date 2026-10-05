import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Resolución de triángulos rectángulos (Lados y ángulos)';
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

// Convertir grados a radianes y viceversa
const degToRad = (deg) => (deg * Math.PI) / 180;
const radToDeg = (rad) => (rad * 180) / Math.PI;

export async function pregunta(numeroPregunta) {
  try {
    // Modo de la pregunta:
    // 0: Encontrar un ángulo desconocido (se dan 2 lados)
    // 1: Encontrar un lado desconocido (se da 1 ángulo y 1 lado)
    const modo = Math.random() < 0.5 ? 0 : 1;

    let svgHTML = '';
    let P = '';
    let ansCorrecta = '';
    let valorCorrectoNum = 0;
    const poolDistractores = [];

    if (modo === 0) {
      // MODO 0: Encontrar un ángulo (θ) dados 2 lados
      // Triángulo con:
      // Base: adyacente (a)
      // Altura: opuesto (b)
      // Hipotenusa: (c)
      const a = Math.floor(Math.random() * 12) + 4; // 4 a 15
      const b = Math.floor(Math.random() * 12) + 4; // 4 a 15
      const c = Math.round(Math.sqrt(a * a + b * b) * 10) / 10;

      // Qué 2 lados dar:
      // 0: opuesto y adyacente -> tan(θ) = b / a -> θ = arctan(b / a)
      // 1: opuesto e hipotenusa -> sin(θ) = b / c -> θ = arcsin(b / c)
      // 2: adyacente e hipotenusa -> cos(θ) = a / c -> θ = arccos(a / c)
      const subCaso = Math.floor(Math.random() * 3);

      let labelBase = '';
      let labelAltura = '';
      let labelHipo = '';
      let fnUsada = '';

      if (subCaso === 0) {
        valorCorrectoNum = radToDeg(Math.atan(b / a));
        labelBase = `${a}`;
        labelAltura = `${b}`;
        fnUsada = '\\tan';
      } else if (subCaso === 1) {
        valorCorrectoNum = radToDeg(Math.asin(b / c));
        labelAltura = `${b}`;
        labelHipo = `${c}`;
        fnUsada = '\\sin';
      } else {
        valorCorrectoNum = radToDeg(Math.acos(a / c));
        labelBase = `${a}`;
        labelHipo = `${c}`;
        fnUsada = '\\cos';
      }

      ansCorrecta = `$${roundTo3SF(valorCorrectoNum)}^\\circ$`;

      svgHTML = `
        <svg width="250" height="200" viewBox="0 0 250 200" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
          <polygon points="40,160 200,160 200,40" fill="#eef6fb" stroke="#2980b9" stroke-width="2.5" stroke-linejoin="round" />
          <path d="M 182,160 L 182,142 L 200,142" fill="none" stroke="#2980b9" stroke-width="1.8" />
          <circle cx="191" cy="151" r="1.5" fill="#2980b9" />
          <path d="M 75,160 A 35 35 0 0 0 68,139" fill="none" stroke="#e67e22" stroke-width="2" />
          <text x="82" y="152" font-family="serif" font-size="16px" font-style="italic" fill="#d35400">θ</text>
          ${labelBase ? `<text x="120" y="180" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#2c3e50" text-anchor="middle">${labelBase}</text>` : ''}
          ${labelAltura ? `<text x="216" y="105" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#2c3e50" text-anchor="start">${labelAltura}</text>` : ''}
          ${labelHipo ? `<text x="110" y="90" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#2c3e50" text-anchor="end">${labelHipo}</text>` : ''}
        </svg>
      `;

      P = `
        ${numeroPregunta === 0 ? '<h2>Razones trigonométricas inversas: $$\\theta = \\arcsin\\left(\\frac{\\text{op}}{\\text{hip}}\\right), \\quad \\theta = \\arccos\\left(\\frac{\\text{ady}}{\\text{hip}}\\right), \\quad \\theta = \\arctan\\left(\\frac{\\text{op}}{\\text{ady}}\\right)$$</h2>' : ''}
        <p>${numeroPregunta + 1}.- Calcule la medida del ángulo agudo $\\theta$ en grados a partir del triángulo rectángulo de la figura. Redondee su respuesta a 3 cifras significativas.</p>
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
          ${svgHTML}
        </div>
      `;

      // Distractores para ángulos:
      // 1. Ángulo complementario (90° - θ)
      poolDistractores.push(`$${roundTo3SF(90 - valorCorrectoNum)}^\\circ$`);
      // 2. Usar la función inversa con la razón recíproca o invertida si es < 1
      if (subCaso === 0) {
        poolDistractores.push(`$${roundTo3SF(radToDeg(Math.atan(a / b)))}^\\circ$`);
        poolDistractores.push(`$${roundTo3SF(radToDeg(Math.asin(Math.min(1, b / (a + b)))))}^\\circ$`);
      } else if (subCaso === 1) {
        poolDistractores.push(`$${roundTo3SF(radToDeg(Math.acos(b / c)))}^\\circ$`);
        poolDistractores.push(`$${roundTo3SF(radToDeg(Math.atan(b / c)))}^\\circ$`);
      } else {
        poolDistractores.push(`$${roundTo3SF(radToDeg(Math.asin(a / c)))}^\\circ$`);
        poolDistractores.push(`$${roundTo3SF(radToDeg(Math.atan(a / c)))}^\\circ$`);
      }
      // 3. Error de radianes a grados o variaciones
      poolDistractores.push(`$${roundTo3SF(Math.abs(valorCorrectoNum - 12.5))}^\\circ$`);
      poolDistractores.push(`$${roundTo3SF(valorCorrectoNum + 15.2)}^\\circ$`);

    } else {
      // MODO 1: Encontrar un lado desconocido (x) dado un ángulo y un lado
      const anguloDeg = Math.floor(Math.random() * 50) + 20; // 20° a 70°
      const anguloRad = degToRad(anguloDeg);
      const ladoDadoVal = Math.floor(Math.random() * 15) + 6; // 6 a 20

      // Subcasos:
      // 0: Se da hipotenusa, hallar opuesto x = hip * sin(θ)
      // 1: Se da hipotenusa, hallar adyacente x = hip * cos(θ)
      // 2: Se da adyacente, hallar opuesto x = ady * tan(θ)
      // 3: Se da adyacente, hallar hipotenusa x = ady / cos(θ)
      // 4: Se da opuesto, hallar adyacente x = op / tan(θ)
      // 5: Se da opuesto, hallar hipotenusa x = op / sin(θ)
      const subCaso = Math.floor(Math.random() * 6);

      let labelBase = '';
      let labelAltura = '';
      let labelHipo = '';
      let nombreLado = 'del lado desconocido $x$';

      if (subCaso === 0) {
        // dado hipotenusa, hallar opuesto (altura)
        valorCorrectoNum = ladoDadoVal * Math.sin(anguloRad);
        labelHipo = `${ladoDadoVal}`;
        labelAltura = 'x';
        labelBase = '';
        nombreLado = 'del cateto opuesto $x$';
      } else if (subCaso === 1) {
        // dado hipotenusa, hallar adyacente (base)
        valorCorrectoNum = ladoDadoVal * Math.cos(anguloRad);
        labelHipo = `${ladoDadoVal}`;
        labelBase = 'x';
        labelAltura = '';
        nombreLado = 'del cateto adyacente $x$';
      } else if (subCaso === 2) {
        // dado adyacente, hallar opuesto (altura)
        valorCorrectoNum = ladoDadoVal * Math.tan(anguloRad);
        labelBase = `${ladoDadoVal}`;
        labelAltura = 'x';
        labelHipo = '';
        nombreLado = 'del cateto opuesto $x$';
      } else if (subCaso === 3) {
        // dado adyacente, hallar hipotenusa
        valorCorrectoNum = ladoDadoVal / Math.cos(anguloRad);
        labelBase = `${ladoDadoVal}`;
        labelHipo = 'x';
        labelAltura = '';
        nombreLado = 'de la hipotenusa $x$';
      } else if (subCaso === 4) {
        // dado opuesto, hallar adyacente (base)
        valorCorrectoNum = ladoDadoVal / Math.tan(anguloRad);
        labelAltura = `${ladoDadoVal}`;
        labelBase = 'x';
        labelHipo = '';
        nombreLado = 'del cateto adyacente $x$';
      } else {
        // dado opuesto, hallar hipotenusa
        valorCorrectoNum = ladoDadoVal / Math.sin(anguloRad);
        labelAltura = `${ladoDadoVal}`;
        labelHipo = 'x';
        labelBase = '';
        nombreLado = 'de la hipotenusa $x$';
      }

      ansCorrecta = `$${roundTo3SF(valorCorrectoNum)}$`;

      svgHTML = `
        <svg width="250" height="200" viewBox="0 0 250 200" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
          <polygon points="40,160 200,160 200,40" fill="#eef6fb" stroke="#2980b9" stroke-width="2.5" stroke-linejoin="round" />
          <path d="M 182,160 L 182,142 L 200,142" fill="none" stroke="#2980b9" stroke-width="1.8" />
          <circle cx="191" cy="151" r="1.5" fill="#2980b9" />
          <path d="M 75,160 A 35 35 0 0 0 68,139" fill="none" stroke="#e67e22" stroke-width="2" />
          <text x="82" y="152" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#d35400">${anguloDeg}°</text>
          ${labelBase ? `<text x="120" y="180" font-family="sans-serif" font-size="14px" font-weight="bold" fill="${labelBase === 'x' ? '#c0392b' : '#2c3e50'}" text-anchor="middle">${labelBase}</text>` : ''}
          ${labelAltura ? `<text x="216" y="105" font-family="sans-serif" font-size="14px" font-weight="bold" fill="${labelAltura === 'x' ? '#c0392b' : '#2c3e50'}" text-anchor="start">${labelAltura}</text>` : ''}
          ${labelHipo ? `<text x="110" y="90" font-family="sans-serif" font-size="14px" font-weight="bold" fill="${labelHipo === 'x' ? '#c0392b' : '#2c3e50'}" text-anchor="end">${labelHipo}</text>` : ''}
        </svg>
      `;

      P = `
        ${numeroPregunta === 0 ? '<h2>Razones trigonométricas: $$\\sin(\\theta) = \\frac{\\text{op}}{\\text{hip}}, \\quad \\cos(\\theta) = \\frac{\\text{ady}}{\\text{hip}}, \\quad \\tan(\\theta) = \\frac{\\text{op}}{\\text{ady}}$$</h2>' : ''}
        <p>${numeroPregunta + 1}.- Determine la longitud ${nombreLado} en el triángulo rectángulo mostrado. Redondee su respuesta a 3 cifras significativas.</p>
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
          ${svgHTML}
        </div>
      `;

      // Distractores para lados:
      // 1. Multiplicar en vez de dividir (o dividir en vez de multiplicar)
      poolDistractores.push(`$${roundTo3SF(ladoDadoVal * Math.cos(anguloRad))}$`);
      poolDistractores.push(`$${roundTo3SF(ladoDadoVal * Math.sin(anguloRad))}$`);
      poolDistractores.push(`$${roundTo3SF(ladoDadoVal / Math.cos(anguloRad))}$`);
      poolDistractores.push(`$${roundTo3SF(ladoDadoVal / Math.sin(anguloRad))}$`);
      poolDistractores.push(`$${roundTo3SF(ladoDadoVal * Math.tan(anguloRad))}$`);
      poolDistractores.push(`$${roundTo3SF(ladoDadoVal / Math.tan(anguloRad))}$`);
    }

    const R = [ansCorrecta];

    for (let opt of poolDistractores) {
      if (opt && opt !== ansCorrecta && !R.includes(opt)) {
        R.push(opt);
      }
      if (R.length >= 6) break;
    }

    // Rellenar si faltan opciones
    let extra = 1;
    const isDeg = ansCorrecta.includes('^\\circ');
    while (R.length < 6) {
      const altVal = valorCorrectoNum + (extra % 2 === 0 ? extra * 2.5 : -extra * 2.1);
      if (altVal > 0) {
        const opt = `$${roundTo3SF(altVal)}${isDeg ? '^\\circ' : ''}$`;
        if (!R.includes(opt)) {
          R.push(opt);
        }
      }
      extra++;
    }

    // Evitar repetidos
    for (let j = 1; j < 6; ++j) {
      let intentos = 0;
      while (tlacu.pregunta.hayRepetidos(R) && intentos < 20) {
        const altVal = valorCorrectoNum + (j + intentos) * 3.7;
        R[j] = `$${roundTo3SF(altVal)}${isDeg ? '^\\circ' : ''}$`;
        intentos++;
      }
    }

    return [P, R];

  } catch (error) {
    console.error('Error al generar la pregunta:', error);
  }
}
