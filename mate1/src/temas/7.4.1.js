import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Aplicaciones geométricas del Teorema de Pitágoras';
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

// Representación de radical: entero si es cuadrado perfecto, sino \sqrt{n}
function formatRadical(radicand) {
  const root = Math.round(Math.sqrt(radicand));
  if (root * root === radicand) {
    return `${root}`;
  }
  return `\\sqrt{${radicand}}`;
}

function formatOption(radicand, valorNum) {
  const radStr = formatRadical(radicand);
  if (!radStr.startsWith('\\sqrt')) {
    return `$${radStr}\\text{ cm}$`;
  }
  return `$${radStr} \\approx ${roundTo3SF(valorNum)}\\text{ cm}$`;
}

export async function pregunta(numeroPregunta) {
  try {
    // 4 tipos de problemas geométricos:
    // 0: Diagonal de un rectángulo
    // 1: Altura de un triángulo isósceles
    // 2: Altura de la cara lateral (apotema lateral) de una pirámide regular de base cuadrada
    // 3: Diagonal espacial de un paralelepípedo (prisma rectangular)
    const caso = Math.floor(Math.random() * 4);

    let P = '';
    let svgHTML = '';
    let radCorrecto = 0;
    let valorCorrecto = 0;
    const poolDistractores = [];

    if (caso === 0) {
      // ----------------------------------------------------------------------
      // CASO 1: Diagonal de un rectángulo (base b, altura a)
      // d = sqrt(b^2 + a^2)
      // ----------------------------------------------------------------------
      const b = Math.floor(Math.random() * 10) + 6; // 6 a 15 cm
      const a = Math.floor(Math.random() * 7) + 4; // 4 a 10 cm
      radCorrecto = b * b + a * a;
      valorCorrecto = Math.sqrt(radCorrecto);

      svgHTML = `
        <svg width="260" height="180" viewBox="0 0 260 180" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
          <!-- Rectángulo -->
          <rect x="40" y="35" width="170" height="100" fill="#eef6fb" stroke="#2980b9" stroke-width="2.5" />
          
          <!-- Diagonal -->
          <line x1="40" y1="135" x2="210" y2="35" stroke="#e74c3c" stroke-width="2.2" stroke-dasharray="5,4" />

          <!-- Ángulo recto en vértice inferior izquierdo -->
          <path d="M 40,120 L 55,120 L 55,135" fill="none" stroke="#2980b9" stroke-width="1.8" />
          <circle cx="47" cy="127" r="1.5" fill="#2980b9" />

          <!-- Medidas -->
          <text x="125" y="155" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#2c3e50" text-anchor="middle">b = ${b} cm</text>
          <text x="25" y="90" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#2c3e50" text-anchor="middle">a = ${a} cm</text>
          <text x="135" y="75" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#c0392b" text-anchor="middle">d</text>
        </svg>
      `;

      P = `
        ${numeroPregunta === 0 ? '<h2>Aplicaciones de Pitágoras: $$d = \\sqrt{b^2 + a^2}, \\quad h = \\sqrt{L^2 - (b/2)^2}, \\quad D = \\sqrt{l^2 + w^2 + h^2}$$</h2>' : ''}
        <p>${numeroPregunta + 1}.- Calcule la longitud de la diagonal $d$ de un rectángulo cuya base mide $b = ${b}\\text{ cm}$ y su altura mide $a = ${a}\\text{ cm}$.</p>
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
          ${svgHTML}
        </div>
      `;

      // Distractores
      // 1. Suma directa sin elevar al cuadrado: a + b
      poolDistractores.push(`$${a + b}\\text{ cm}$`);
      // 2. Resta de cuadrados (confundir con cateto)
      const diffSq = Math.abs(b * b - a * a);
      if (diffSq > 0) poolDistractores.push(formatOption(diffSq, Math.sqrt(diffSq)));
      // 3. Semiperímetro o promedio
      poolDistractores.push(`$${roundTo3SF((a + b) / 2)}\\text{ cm}$`);
      // 4. Raíz de la suma sin cuadrados
      poolDistractores.push(formatOption(a + b, Math.sqrt(a + b)));
      // 5. Sin raíz
      poolDistractores.push(`$${radCorrecto}\\text{ cm}$`);

    } else if (caso === 1) {
      // ----------------------------------------------------------------------
      // CASO 2: Altura de un triángulo isósceles
      // Base b (par), lados iguales L. La mitad de la base es b/2.
      // h = sqrt(L^2 - (b/2)^2)
      // ----------------------------------------------------------------------
      const mitadB = Math.floor(Math.random() * 6) + 3; // 3 a 8 cm
      const b = mitadB * 2; // base par: 6 a 16 cm
      const L = mitadB + Math.floor(Math.random() * 5) + 2; // L > mitadB: asegurar que L > b/2

      radCorrecto = L * L - mitadB * mitadB;
      valorCorrecto = Math.sqrt(radCorrecto);

      svgHTML = `
        <svg width="260" height="200" viewBox="0 0 260 200" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
          <!-- Triángulo isósceles -->
          <polygon points="40,160 220,160 130,40" fill="#eef6fb" stroke="#2980b9" stroke-width="2.5" stroke-linejoin="round" />

          <!-- Altura h -->
          <line x1="130" y1="40" x2="130" y2="160" stroke="#e74c3c" stroke-width="2" stroke-dasharray="4,3" />

          <!-- Ángulo recto en la base de la altura -->
          <path d="M 130,145 L 145,145 L 145,160" fill="none" stroke="#2980b9" stroke-width="1.8" />
          <circle cx="137" cy="152" r="1.5" fill="#2980b9" />

          <!-- Etiquetas de lados -->
          <text x="75" y="95" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#2c3e50" text-anchor="end">${L} cm</text>
          <text x="185" y="95" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#2c3e50" text-anchor="start">${L} cm</text>
          <text x="130" y="180" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#2c3e50" text-anchor="middle">base = ${b} cm</text>
          <text x="138" y="105" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#c0392b" text-anchor="start">h</text>
        </svg>
      `;

      P = `
        ${numeroPregunta === 0 ? '<h2>Aplicaciones de Pitágoras: $$d = \\sqrt{b^2 + a^2}, \\quad h = \\sqrt{L^2 - (b/2)^2}, \\quad D = \\sqrt{l^2 + w^2 + h^2}$$</h2>' : ''}
        <p>${numeroPregunta + 1}.- Calcule la altura $h$ de un triángulo isósceles cuyos lados iguales miden $L = ${L}\\text{ cm}$ y su base mide $b = ${b}\\text{ cm}$.</p>
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
          ${svgHTML}
        </div>
      `;

      // Distractores
      // 1. Usar la base completa b en vez de b/2: sqrt(|L^2 - b^2|)
      const errBaseCompleta = Math.abs(L * L - b * b);
      if (errBaseCompleta > 0) poolDistractores.push(formatOption(errBaseCompleta, Math.sqrt(errBaseCompleta)));
      // 2. Sumar en vez de restar: L^2 + (b/2)^2
      const sumSq = L * L + mitadB * mitadB;
      poolDistractores.push(formatOption(sumSq, Math.sqrt(sumSq)));
      // 3. Resta directa sin elevar al cuadrado: L - mitadB
      poolDistractores.push(`$${L - mitadB}\\text{ cm}$`);
      // 4. L - b
      poolDistractores.push(`$${Math.abs(L - b)}\\text{ cm}$`);
      // 5. Sin raíz
      poolDistractores.push(`$${radCorrecto}\\text{ cm}$`);

    } else if (caso === 2) {
      // ----------------------------------------------------------------------
      // CASO 3: Altura de la cara lateral (apotema lateral) de una pirámide de base cuadrada
      // Lado de la base L_b (par), altura interior H_p.
      // Distancia del centro al lado = L_b / 2.
      // Apotema lateral s = sqrt(H_p^2 + (L_b / 2)^2)
      // ----------------------------------------------------------------------
      const apotemaBase = Math.floor(Math.random() * 5) + 3; // 3 a 7 cm
      const L_b = apotemaBase * 2; // base par: 6 a 14 cm
      const H_p = Math.floor(Math.random() * 7) + 5; // altura pirámide: 5 a 11 cm

      radCorrecto = H_p * H_p + apotemaBase * apotemaBase;
      valorCorrecto = Math.sqrt(radCorrecto);

      svgHTML = `
        <svg width="260" height="210" viewBox="0 0 260 210" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
          <!-- Base en perspectiva -->
          <polygon points="45,150 165,150 215,120 95,120" fill="#e8f4fd" stroke="#2980b9" stroke-width="1.5" stroke-dasharray="3,3" />
          <line x1="45" y1="150" x2="165" y2="150" stroke="#2980b9" stroke-width="2" />
          <line x1="165" y1="150" x2="215" y2="120" stroke="#2980b9" stroke-width="2" />
          
          <!-- Aristas laterales frontales -->
          <line x1="45" y1="150" x2="130" y2="35" stroke="#2980b9" stroke-width="2" />
          <line x1="165" y1="150" x2="130" y2="35" stroke="#2980b9" stroke-width="2" />
          <line x1="215" y1="120" x2="130" y2="35" stroke="#2980b9" stroke-width="2" />
          <!-- Arista oculta -->
          <line x1="95" y1="120" x2="130" y2="35" stroke="#7fb3d5" stroke-width="1.5" stroke-dasharray="3,3" />

          <!-- Altura interior H_p desde cúspide al centro (130, 135) -->
          <line x1="130" y1="35" x2="130" y2="135" stroke="#7f8c8d" stroke-width="1.8" stroke-dasharray="3,3" />
          
          <!-- Apotema de la base: desde el centro (130, 135) al punto medio de la arista frontal (105, 150) -->
          <line x1="130" y1="135" x2="105" y2="150" stroke="#7f8c8d" stroke-width="1.8" stroke-dasharray="3,3" />

          <!-- Altura de la cara lateral (apotema lateral s): desde cúspide (130, 35) al punto medio (105, 150) -->
          <line x1="130" y1="35" x2="105" y2="150" stroke="#e74c3c" stroke-width="2.5" />

          <!-- Ángulo recto en el centro de la base -->
          <circle cx="130" cy="135" r="2.5" fill="#333" />

          <!-- Etiquetas -->
          <text x="105" y="168" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#2c3e50" text-anchor="middle">L = ${L_b} cm</text>
          <text x="145" y="85" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#2c3e50">H = ${H_p} cm</text>
          <text x="105" y="90" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#c0392b" text-anchor="end">s</text>
        </svg>
      `;

      P = `
        ${numeroPregunta === 0 ? '<h2>Aplicaciones de Pitágoras: $$d = \\sqrt{b^2 + a^2}, \\quad h = \\sqrt{L^2 - (b/2)^2}, \\quad D = \\sqrt{l^2 + w^2 + h^2}$$</h2>' : ''}
        <p>${numeroPregunta + 1}.- En una pirámide regular de base cuadrada con lado de base $L = ${L_b}\\text{ cm}$ y altura vertical $H = ${H_p}\\text{ cm}$, calcule la altura de la cara lateral (apotema lateral $s$).</p>
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
          ${svgHTML}
        </div>
      `;

      // Distractores
      // 1. Usar el lado completo L_b en vez de L_b / 2: sqrt(H^2 + L_b^2)
      const errLadoCompleto = H_p * H_p + L_b * L_b;
      poolDistractores.push(formatOption(errLadoCompleto, Math.sqrt(errLadoCompleto)));
      // 2. Restar en vez de sumar: |H^2 - (L_b/2)^2|
      const diffSqPir = Math.abs(H_p * H_p - apotemaBase * apotemaBase);
      if (diffSqPir > 0) poolDistractores.push(formatOption(diffSqPir, Math.sqrt(diffSqPir)));
      // 3. Suma directa H + L_b/2
      poolDistractores.push(`$${H_p + apotemaBase}\\text{ cm}$`);
      // 4. H + L_b
      poolDistractores.push(`$${H_p + L_b}\\text{ cm}$`);
      // 5. Sin raíz
      poolDistractores.push(`$${radCorrecto}\\text{ cm}$`);

    } else {
      // ----------------------------------------------------------------------
      // CASO 4: Diagonal espacial de un paralelepípedo (prisma rectangular)
      // Dimensiones l, w, h
      // D = sqrt(l^2 + w^2 + h^2)
      // ----------------------------------------------------------------------
      const l = Math.floor(Math.random() * 6) + 4; // 4 a 9 cm
      const w = Math.floor(Math.random() * 5) + 3; // 3 a 7 cm
      const h = Math.floor(Math.random() * 6) + 4; // 4 a 9 cm

      radCorrecto = l * l + w * w + h * h;
      valorCorrecto = Math.sqrt(radCorrecto);

      svgHTML = `
        <svg width="260" height="200" viewBox="0 0 260 200" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
          <!-- Cara frontal -->
          <rect x="35" y="80" width="130" height="80" fill="#e8f4fd" stroke="#2980b9" stroke-width="2" />
          
          <!-- Cara superior -->
          <polygon points="35,80 95,35 225,35 165,80" fill="#d4e6f1" stroke="#2980b9" stroke-width="2" />
          
          <!-- Cara lateral derecha -->
          <polygon points="165,80 225,35 225,115 165,160" fill="#a9cce3" stroke="#2980b9" stroke-width="2" />
          
          <!-- Líneas ocultas discontinuas -->
          <line x1="35" y1="160" x2="95" y2="115" stroke="#7fb3d5" stroke-width="1.5" stroke-dasharray="3,3" />
          <line x1="95" y1="115" x2="225" y2="115" stroke="#7fb3d5" stroke-width="1.5" stroke-dasharray="3,3" />
          <line x1="95" y1="115" x2="95" y2="35" stroke="#7fb3d5" stroke-width="1.5" stroke-dasharray="3,3" />

          <!-- Diagonal espacial D: desde vértice frontal inferior izquierdo (35, 160) hasta vértice posterior superior derecho (225, 35) -->
          <line x1="35" y1="160" x2="225" y2="35" stroke="#e74c3c" stroke-width="2.5" stroke-dasharray="6,4" />

          <!-- Etiquetas -->
          <text x="100" y="178" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#2c3e50" text-anchor="middle">l = ${l} cm</text>
          <text x="205" y="148" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#2c3e50" text-anchor="middle">w = ${w} cm</text>
          <text x="22" y="125" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#2c3e50" text-anchor="middle">h = ${h} cm</text>
          <text x="145" y="90" font-family="sans-serif" font-size="15px" font-weight="bold" fill="#c0392b" text-anchor="middle">D</text>
        </svg>
      `;

      P = `
        ${numeroPregunta === 0 ? '<h2>Aplicaciones de Pitágoras: $$d = \\sqrt{b^2 + a^2}, \\quad h = \\sqrt{L^2 - (b/2)^2}, \\quad D = \\sqrt{l^2 + w^2 + h^2}$$</h2>' : ''}
        <p>${numeroPregunta + 1}.- Calcule la longitud de la diagonal espacial $D$ del paralelepípedo recto (caja rectangular) de dimensiones $l = ${l}\\text{ cm}$, $w = ${w}\\text{ cm}$ y $h = ${h}\\text{ cm}$.</p>
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
          ${svgHTML}
        </div>
      `;

      // Distractores
      // 1. Diagonal solo de la base (2D): sqrt(l^2 + w^2)
      const baseDiagSq = l * l + w * w;
      poolDistractores.push(formatOption(baseDiagSq, Math.sqrt(baseDiagSq)));
      // 2. Suma lineal de las 3 aristas: l + w + h
      poolDistractores.push(`$${l + w + h}\\text{ cm}$`);
      // 3. Diagonal de la cara frontal: sqrt(l^2 + h^2)
      const frontDiagSq = l * l + h * h;
      poolDistractores.push(formatOption(frontDiagSq, Math.sqrt(frontDiagSq)));
      // 4. Promedio de aristas
      poolDistractores.push(`$${roundTo3SF((l + w + h) / 3)}\\text{ cm}$`);
      // 5. Sin raíz
      poolDistractores.push(`$${radCorrecto}\\text{ cm}$`);
    }

    const ansCorrecta = formatOption(radCorrecto, valorCorrecto);
    const R = [ansCorrecta];

    // Llenar con los distractores geométricos calculados
    for (let opt of poolDistractores) {
      if (opt && opt !== ansCorrecta && !R.includes(opt)) {
        R.push(opt);
      }
      if (R.length >= 6) break;
    }

    // Variaciones numéricas adicionales en caso de que falten opciones hasta 6
    let extra = 1;
    while (R.length < 6) {
      const altRad = radCorrecto + (extra % 2 === 0 ? extra * 6 : -extra * 5);
      if (altRad > 1) {
        const opt = formatOption(altRad, Math.sqrt(altRad));
        if (!R.includes(opt)) {
          R.push(opt);
        }
      }
      extra++;
    }

    // Evitar repetidos usando tlacuache
    for (let j = 1; j < 6; ++j) {
      let intentos = 0;
      while (tlacu.pregunta.hayRepetidos(R) && intentos < 20) {
        const altRad = radCorrecto + (j + intentos) * 7 + 3;
        R[j] = formatOption(altRad, Math.sqrt(altRad));
        intentos++;
      }
    }

    return [P, R];

  } catch (error) {
    console.error('Error al generar la pregunta 7.4.1:', error);
  }
}
