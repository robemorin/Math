import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Cálculo de ángulos en figuras 2D y 3D';
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

// Convertir radianes a grados
const radToDeg = (rad) => (rad * 180) / Math.PI;

export async function pregunta(numeroPregunta) {
  try {
    // 4 tipos de problemas geométricos para calcular un ángulo agudo θ:
    // 0: Ángulo entre la diagonal y la base de un rectángulo
    // 1: Ángulo en la base de un triángulo isósceles
    // 2: Ángulo de inclinación de la cara lateral de una pirámide regular respecto a la base
    // 3: Ángulo que forma la diagonal espacial con la base de un paralelepípedo
    const caso = Math.floor(Math.random() * 4);

    let P = '';
    let svgHTML = '';
    let anguloCorrecto = 0;
    const poolDistractores = [];

    if (caso === 0) {
      // ----------------------------------------------------------------------
      // CASO 1: Ángulo entre la diagonal y la base de un rectángulo
      // tan(θ) = a / b => θ = arctan(a / b)
      // ----------------------------------------------------------------------
      const b = Math.floor(Math.random() * 10) + 6; // base: 6 a 15 cm
      const a = Math.floor(Math.random() * 7) + 4; // altura: 4 a 10 cm
      anguloCorrecto = radToDeg(Math.atan(a / b));

      svgHTML = `
        <svg width="260" height="180" viewBox="0 0 260 180" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
          <!-- Rectángulo -->
          <rect x="40" y="35" width="170" height="100" fill="#eef6fb" stroke="#2980b9" stroke-width="2.5" />
          
          <!-- Diagonal -->
          <line x1="40" y1="135" x2="210" y2="35" stroke="#2980b9" stroke-width="2.2" />

          <!-- Ángulo recto en vértice inferior derecho (210, 135) -->
          <path d="M 195,135 L 195,120 L 210,120" fill="none" stroke="#2980b9" stroke-width="1.8" />
          <circle cx="202" cy="127" r="1.5" fill="#2980b9" />

          <!-- Arco del ángulo θ entre la diagonal y la base en (40, 135) -->
          <path d="M 75,135 A 35 35 0 0 0 68,118" fill="none" stroke="#e67e22" stroke-width="2.2" />
          <text x="82" y="128" font-family="serif" font-size="16px" font-style="italic" fill="#d35400">θ</text>

          <!-- Medidas -->
          <text x="125" y="155" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#2c3e50" text-anchor="middle">b = ${b} cm</text>
          <text x="225" y="90" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#2c3e50" text-anchor="start">a = ${a} cm</text>
        </svg>
      `;

      P = `
        ${numeroPregunta === 0 ? '<h2>Ángulos en figuras geométricas: $$\\theta = \\arctan\\left(\\frac{\\text{op}}{\\text{ady}}\\right), \\quad \\theta = \\arccos\\left(\\frac{\\text{ady}}{\\text{hip}}\\right)$$</h2>' : ''}
        <p>${numeroPregunta + 1}.- Calcule la medida del ángulo $\\theta$ que forma la diagonal con la base del rectángulo de dimensiones $b = ${b}\\text{ cm}$ y $a = ${a}\\text{ cm}$. Redondee su respuesta a 3 cifras significativas.</p>
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
          ${svgHTML}
        </div>
      `;

      // Distractores
      // 1. Ángulo complementario: 90° - θ (ángulo con la vertical)
      poolDistractores.push(`$${roundTo3SF(90 - anguloCorrecto)}^\\circ$`);
      // 2. Razón invertida: arctan(b / a)
      poolDistractores.push(`$${roundTo3SF(radToDeg(Math.atan(b / a)))}^\\circ$`);
      // 3. Confundir cateto con hipotenusa: arcsin(a / b) si a < b
      if (a < b) {
        poolDistractores.push(`$${roundTo3SF(radToDeg(Math.asin(a / b))) }^\\circ$`);
      } else {
        poolDistractores.push(`$${roundTo3SF(radToDeg(Math.asin(b / a))) }^\\circ$`);
      }
      // 4. Con hipotenusa real confundida: arccos(a / diag)
      const diag = Math.sqrt(a * a + b * b);
      poolDistractores.push(`$${roundTo3SF(radToDeg(Math.acos(a / diag)))}^\\circ$`);
      // 5. Variación
      poolDistractores.push(`$${roundTo3SF(Math.abs(anguloCorrecto - 12.4))}^\\circ$`);

    } else if (caso === 1) {
      // ----------------------------------------------------------------------
      // CASO 2: Ángulo en la base de un triángulo isósceles
      // Base b (par), lados iguales L. Mitad de la base: b/2.
      // cos(θ) = (b / 2) / L => θ = arccos((b / 2) / L)
      // ----------------------------------------------------------------------
      const mitadB = Math.floor(Math.random() * 5) + 3; // 3 a 7 cm
      const b = mitadB * 2; // base: 6 a 14 cm
      const L = mitadB + Math.floor(Math.random() * 6) + 2; // L > mitadB: 5 a 14 cm

      anguloCorrecto = radToDeg(Math.acos(mitadB / L));

      svgHTML = `
        <svg width="260" height="200" viewBox="0 0 260 200" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
          <!-- Triángulo isósceles -->
          <polygon points="40,160 220,160 130,40" fill="#eef6fb" stroke="#2980b9" stroke-width="2.5" stroke-linejoin="round" />

          <!-- Altura h (línea punteada) -->
          <line x1="130" y1="40" x2="130" y2="160" stroke="#7f8c8d" stroke-width="1.8" stroke-dasharray="4,3" />

          <!-- Ángulo recto en la base -->
          <path d="M 130,145 L 145,145 L 145,160" fill="none" stroke="#2980b9" stroke-width="1.8" />
          <circle cx="137" cy="152" r="1.5" fill="#2980b9" />

          <!-- Arco del ángulo θ en la base (vértice izquierdo: 40, 160) -->
          <path d="M 72,160 A 32 32 0 0 0 65,138" fill="none" stroke="#e67e22" stroke-width="2.2" />
          <text x="78" y="152" font-family="serif" font-size="16px" font-style="italic" fill="#d35400">θ</text>

          <!-- Etiquetas de lados -->
          <text x="75" y="95" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#2c3e50" text-anchor="end">L = ${L} cm</text>
          <text x="185" y="95" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#2c3e50" text-anchor="start">L = ${L} cm</text>
          <text x="130" y="180" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#2c3e50" text-anchor="middle">base = ${b} cm</text>
        </svg>
      `;

      P = `
        ${numeroPregunta === 0 ? '<h2>Ángulos en figuras geométricas: $$\\theta = \\arctan\\left(\\frac{\\text{op}}{\\text{ady}}\\right), \\quad \\theta = \\arccos\\left(\\frac{\\text{ady}}{\\text{hip}}\\right)$$</h2>' : ''}
        <p>${numeroPregunta + 1}.- En un triángulo isósceles con lados iguales $L = ${L}\\text{ cm}$ y base $b = ${b}\\text{ cm}$, calcule la medida del ángulo basal $\\theta$. Redondee su respuesta a 3 cifras significativas.</p>
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
          ${svgHTML}
        </div>
      `;

      // Distractores
      // 1. Usar base completa b en vez de b/2: arccos(b / L) si b < L
      if (b < L) {
        poolDistractores.push(`$${roundTo3SF(radToDeg(Math.acos(b / L)))}^\\circ$`);
      } else {
        poolDistractores.push(`$${roundTo3SF(radToDeg(Math.asin(mitadB / L)))}^\\circ$`);
      }
      // 2. Ángulo del vértice superior / semiángulo superior (90° - θ)
      poolDistractores.push(`$${roundTo3SF(90 - anguloCorrecto)}^\\circ$`);
      // 3. Ángulo del vértice completo: 2 * (90° - θ)
      poolDistractores.push(`$${roundTo3SF(2 * (90 - anguloCorrecto))}^\\circ$`);
      // 4. Usar arcsin en vez de arccos: arcsin((b/2) / L)
      poolDistractores.push(`$${roundTo3SF(radToDeg(Math.asin(mitadB / L)))}^\\circ$`);
      // 5. Usar tangente: arctan((b/2) / L)
      poolDistractores.push(`$${roundTo3SF(radToDeg(Math.atan(mitadB / L)))}^\\circ$`);

    } else if (caso === 2) {
      // ----------------------------------------------------------------------
      // CASO 3: Ángulo de inclinación de la cara lateral de una pirámide regular respecto a la base
      // Lado de la base L_b (par), altura vertical H_p.
      // Distancia del centro al punto medio de la arista = L_b / 2.
      // tan(θ) = H_p / (L_b / 2) => θ = arctan(H_p / (L_b / 2))
      // ----------------------------------------------------------------------
      const apotemaBase = Math.floor(Math.random() * 5) + 3; // 3 a 7 cm
      const L_b = apotemaBase * 2; // base: 6 a 14 cm
      const H_p = Math.floor(Math.random() * 7) + 5; // altura: 5 a 11 cm

      anguloCorrecto = radToDeg(Math.atan(H_p / apotemaBase));

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
          <line x1="95" y1="120" x2="130" y2="35" stroke="#7fb3d5" stroke-width="1.5" stroke-dasharray="3,3" />

          <!-- Altura interior H_p (130, 35) a (130, 135) -->
          <line x1="130" y1="35" x2="130" y2="135" stroke="#7f8c8d" stroke-width="1.8" stroke-dasharray="3,3" />
          
          <!-- Apotema basal: centro (130, 135) al punto medio frontal (105, 150) -->
          <line x1="130" y1="135" x2="105" y2="150" stroke="#7f8c8d" stroke-width="1.8" stroke-dasharray="3,3" />

          <!-- Altura de cara lateral (apotema lateral) -->
          <line x1="130" y1="35" x2="105" y2="150" stroke="#e74c3c" stroke-width="2.5" />

          <!-- Centro de la base -->
          <circle cx="130" cy="135" r="2.5" fill="#333" />

          <!-- Arco del ángulo θ en (105, 150) -->
          <path d="M 112,146 A 15 15 0 0 0 110,132" fill="none" stroke="#e67e22" stroke-width="2" />
          <text x="88" y="138" font-family="serif" font-size="16px" font-style="italic" fill="#d35400">θ</text>

          <!-- Etiquetas -->
          <text x="105" y="168" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#2c3e50" text-anchor="middle">L = ${L_b} cm</text>
          <text x="145" y="85" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#2c3e50">H = ${H_p} cm</text>
        </svg>
      `;

      P = `
        ${numeroPregunta === 0 ? '<h2>Ángulos en figuras geométricas: $$\\theta = \\arctan\\left(\\frac{\\text{op}}{\\text{ady}}\\right), \\quad \\theta = \\arccos\\left(\\frac{\\text{ady}}{\\text{hip}}\\right)$$</h2>' : ''}
        <p>${numeroPregunta + 1}.- En una pirámide regular de base cuadrada con arista de la base $L = ${L_b}\\text{ cm}$ y altura vertical $H = ${H_p}\\text{ cm}$, calcule el ángulo de inclinación $\\theta$ de la cara lateral respecto al plano de la base. Redondee su respuesta a 3 cifras significativas.</p>
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
          ${svgHTML}
        </div>
      `;

      // Distractores
      // 1. Usar L_b completo en vez de L_b / 2: arctan(H / L_b)
      poolDistractores.push(`$${roundTo3SF(radToDeg(Math.atan(H_p / L_b)))}^\\circ$`);
      // 2. Ángulo complementario: 90° - θ
      poolDistractores.push(`$${roundTo3SF(90 - anguloCorrecto)}^\\circ$`);
      // 3. Razón invertida: arctan((L_b / 2) / H)
      poolDistractores.push(`$${roundTo3SF(radToDeg(Math.atan(apotemaBase / H_p)))}^\\circ$`);
      // 4. Ángulo con la arista lateral oblicua en vez de la apotema (diagonal de base)
      const semidiag = (L_b * Math.SQRT2) / 2;
      poolDistractores.push(`$${roundTo3SF(radToDeg(Math.atan(H_p / semidiag)))}^\\circ$`);
      // 5. Variación
      poolDistractores.push(`$${roundTo3SF(Math.abs(anguloCorrecto - 14.2))}^\\circ$`);

    } else {
      // ----------------------------------------------------------------------
      // CASO 4: Ángulo que forma la diagonal espacial con el plano de la base en un paralelepípedo
      // Base l, w; diagonal de la base d_base = sqrt(l^2 + w^2); altura h.
      // tan(θ) = h / d_base => θ = arctan(h / sqrt(l^2 + w^2))
      // ----------------------------------------------------------------------
      const l = Math.floor(Math.random() * 6) + 4; // 4 a 9 cm
      const w = Math.floor(Math.random() * 5) + 3; // 3 a 7 cm
      const h = Math.floor(Math.random() * 6) + 4; // 4 a 9 cm

      const d_base = Math.sqrt(l * l + w * w);
      anguloCorrecto = radToDeg(Math.atan(h / d_base));

      svgHTML = `
        <svg width="260" height="200" viewBox="0 0 260 200" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
          <!-- Cara frontal -->
          <rect x="35" y="80" width="130" height="80" fill="#e8f4fd" stroke="#2980b9" stroke-width="2" />
          
          <!-- Cara superior -->
          <polygon points="35,80 95,35 225,35 165,80" fill="#d4e6f1" stroke="#2980b9" stroke-width="2" />
          
          <!-- Cara lateral derecha -->
          <polygon points="165,80 225,35 225,115 165,160" fill="#a9cce3" stroke="#2980b9" stroke-width="2" />
          
          <!-- Líneas ocultas de la base -->
          <line x1="35" y1="160" x2="95" y2="115" stroke="#7fb3d5" stroke-width="1.5" stroke-dasharray="3,3" />
          <line x1="95" y1="115" x2="225" y2="115" stroke="#7fb3d5" stroke-width="1.5" stroke-dasharray="3,3" />
          <line x1="95" y1="115" x2="95" y2="35" stroke="#7fb3d5" stroke-width="1.5" stroke-dasharray="3,3" />

          <!-- Diagonal de la base (desde (35, 160) hasta (225, 115)) -->
          <line x1="35" y1="160" x2="225" y2="115" stroke="#7f8c8d" stroke-width="1.8" stroke-dasharray="3,3" />

          <!-- Diagonal espacial D: desde (35, 160) hasta (225, 35) -->
          <line x1="35" y1="160" x2="225" y2="35" stroke="#e74c3c" stroke-width="2.2" stroke-dasharray="5,4" />

          <!-- Arco del ángulo θ en (35, 160) entre la diagonal base y la espacial -->
          <path d="M 68,152 A 35 35 0 0 0 65,138" fill="none" stroke="#e67e22" stroke-width="2.2" />
          <text x="75" y="145" font-family="serif" font-size="16px" font-style="italic" fill="#d35400">θ</text>

          <!-- Etiquetas -->
          <text x="100" y="178" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#2c3e50" text-anchor="middle">l = ${l} cm</text>
          <text x="205" y="148" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#2c3e50" text-anchor="middle">w = ${w} cm</text>
          <text x="238" y="75" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#2c3e50">h = ${h} cm</text>
        </svg>
      `;

      P = `
        ${numeroPregunta === 0 ? '<h2>Ángulos en figuras geométricas: $$\\theta = \\arctan\\left(\\frac{\\text{op}}{\\text{ady}}\\right), \\quad \\theta = \\arccos\\left(\\frac{\\text{ady}}{\\text{hip}}\\right)$$</h2>' : ''}
        <p>${numeroPregunta + 1}.- En el paralelepípedo recto mostrado con dimensiones $l = ${l}\\text{ cm}$, $w = ${w}\\text{ cm}$ y $h = ${h}\\text{ cm}$, determine el ángulo $\\theta$ que forma la diagonal espacial con el plano de la base. Redondee su respuesta a 3 cifras significativas.</p>
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
          ${svgHTML}
        </div>
      `;

      // Distractores
      // 1. Usar solo una dimensión de la base (ej. l o w): arctan(h / l)
      poolDistractores.push(`$${roundTo3SF(radToDeg(Math.atan(h / l)))}^\\circ$`);
      poolDistractores.push(`$${roundTo3SF(radToDeg(Math.atan(h / w)))}^\\circ$`);
      // 2. Ángulo complementario (con la arista vertical): 90° - θ
      poolDistractores.push(`$${roundTo3SF(90 - anguloCorrecto)}^\\circ$`);
      // 3. Razón invertida: arctan(d_base / h)
      poolDistractores.push(`$${roundTo3SF(radToDeg(Math.atan(d_base / h)))}^\\circ$`);
      // 4. Usar la diagonal espacial en lugar de la base en el denominador: arcsin(h / D)
      const D_esp = Math.sqrt(l * l + w * w + h * h);
      poolDistractores.push(`$${roundTo3SF(radToDeg(Math.acos(h / D_esp)))}^\\circ$`);
    }

    const ansCorrecta = `$${roundTo3SF(anguloCorrecto)}^\\circ$`;
    const R = [ansCorrecta];

    for (let opt of poolDistractores) {
      if (opt && opt !== ansCorrecta && !R.includes(opt)) {
        R.push(opt);
      }
      if (R.length >= 6) break;
    }

    // Variaciones numéricas si hicieran falta opciones
    let extra = 1;
    while (R.length < 6) {
      const altAng = anguloCorrecto + (extra % 2 === 0 ? extra * 3.8 : -extra * 4.2);
      if (altAng > 0 && altAng < 90) {
        const opt = `$${roundTo3SF(altAng)}^\\circ$`;
        if (!R.includes(opt)) {
          R.push(opt);
        }
      }
      extra++;
    }

    // Evitar duplicados
    for (let j = 1; j < 6; ++j) {
      let intentos = 0;
      while (tlacu.pregunta.hayRepetidos(R) && intentos < 20) {
        const altAng = anguloCorrecto + (j + intentos) * 4.5 + 1.3;
        R[j] = `$${roundTo3SF(altAng)}^\\circ$`;
        intentos++;
      }
    }

    return [P, R];

  } catch (error) {
    console.error('Error al generar la pregunta 7.4.3:', error);
  }
}
