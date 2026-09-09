import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Volumen de prismas y cilindros';
}

export function tipo() {
  return 0; // 0 - Opción múltiple
}

// Función para redondear a 3 cifras significativas (estándar IB)
function roundTo3SF(num) {
  if (num === 0) return 0;
  let d = Math.ceil(Math.log10(Math.abs(num)));
  let power = 3 - d;
  let magnitude = Math.pow(10, power);
  let shifted = Math.round(num * magnitude);
  return shifted / magnitude;
}

export async function pregunta(numeroPregunta) {
  try {
    const esPrismaTriangular = Math.random() < 0.5;

    let P = '';
    let R = [];
    let ansCorrect = 0;

    if (esPrismaTriangular) {
      // Prisma triangular recto
      const base = Math.floor(Math.random() * 7) + 4; // base 4 a 10 cm
      const h_tri = Math.floor(Math.random() * 6) + 3; // altura del triángulo 3 a 8 cm
      const L = Math.floor(Math.random() * 8) + 6; // longitud del prisma 6 a 13 cm

      const areaBase = 0.5 * base * h_tri;
      const vol = areaBase * L;
      ansCorrect = roundTo3SF(vol);

      const svgHTML = `
        <svg width="240" height="180" viewBox="0 0 240 180" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
          <!-- Cara triangular frontal -->
          <polygon points="40,140 110,140 75,70" fill="#e8f4fd" stroke="#2980b9" stroke-width="2" />
          
          <!-- Cara lateral superior derecha -->
          <polygon points="75,70 110,140 200,90 165,20" fill="#d4e6f1" stroke="#2980b9" stroke-width="2" />
          <!-- Cara lateral superior izquierda -->
          <polygon points="40,140 75,70 165,20 130,90" fill="#a9cce3" stroke="#2980b9" stroke-width="2" />
          
          <!-- Altura del triángulo frontal -->
          <line x1="75" y1="70" x2="75" y2="140" stroke="#e74c3c" stroke-width="1.5" stroke-dasharray="3,3" />
          <text x="83" y="105" font-family="sans-serif" font-size="11px" font-weight="bold" fill="#e74c3c">h = ${h_tri} cm</text>
          
          <!-- Base y longitud -->
          <text x="75" y="155" font-family="sans-serif" font-size="11px" font-weight="bold" fill="#333" text-anchor="middle">b = ${base} cm</text>
          <text x="160" y="130" font-family="sans-serif" font-size="11px" font-weight="bold" fill="#333" text-anchor="middle">L = ${L} cm</text>
        </svg>
      `;

      P = `
        ${numeroPregunta === 0 ? '<h2>Volumen de un sólido uniforme: $$V = A_{\\text{base}} \\times h$$</h2>' : ''}
        <p>${numeroPregunta + 1}.- Calcule el volumen del prisma triangular recto mostrado en la figura. Redondee su respuesta a 3 cifras significativas.</p>
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
          ${svgHTML}
        </div>
      `;

      R.push(`$${ansCorrect}\\text{ cm}^3$`);
      // Distractores
      // 1. Olvidar el 1/2 en el área de la base
      R.push(`$${roundTo3SF(base * h_tri * L)}\\text{ cm}^3$`);
      // 2. Multiplicar por 1/3 (como si fuera pirámide)
      R.push(`$${roundTo3SF(vol / 3)}\\text{ cm}^3$`);
      // 3. Solo área de la base
      R.push(`$${roundTo3SF(areaBase)}\\text{ cm}^3$`);
      // 4. Suma de dimensiones
      R.push(`$${roundTo3SF(base + h_tri + L)}\\text{ cm}^3$`);
      // 5. Offset
      R.push(`$${roundTo3SF(vol + 25)}\\text{ cm}^3$`);

    } else {
      // Cilindro
      const r = Math.floor(Math.random() * 6) + 3; // 3 a 8 cm
      const h = Math.floor(Math.random() * 8) + 5; // 5 a 12 cm

      const vol = Math.PI * r * r * h;
      ansCorrect = roundTo3SF(vol);

      const svgHTML = `
        <svg width="220" height="190" viewBox="0 0 220 190" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
          <path d="M 50 135 A 60 18 0 0 1 170 135" fill="none" stroke="#7fb3d5" stroke-width="1.5" stroke-dasharray="3,3" />
          <path d="M 50 135 A 60 18 0 0 0 170 135" fill="none" stroke="#2980b9" stroke-width="2" />
          
          <line x1="50" y1="45" x2="50" y2="135" stroke="#2980b9" stroke-width="2" />
          <line x1="170" y1="45" x2="170" y2="135" stroke="#2980b9" stroke-width="2" />
          
          <ellipse cx="110" cy="45" rx="60" ry="18" fill="#d4e6f1" stroke="#2980b9" stroke-width="2" />
          
          <circle cx="110" cy="45" r="2.5" fill="#333" />
          <line x1="110" y1="45" x2="170" y2="45" stroke="#333" stroke-width="1.5" />
          <text x="140" y="38" font-family="sans-serif" font-size="11px" font-weight="bold" fill="#333" text-anchor="middle">r = ${r} cm</text>
          
          <line x1="35" y1="45" x2="35" y2="135" stroke="#555" stroke-width="1.5" />
          <text x="25" y="95" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#333" text-anchor="end">h = ${h} cm</text>
        </svg>
      `;

      P = `
        ${numeroPregunta === 0 ? '<h2>Volumen del cilindro: $$V = \\pi r^2 h$$</h2>' : ''}
        <p>${numeroPregunta + 1}.- Calcule el volumen del cilindro mostrado en la figura. Redondee su respuesta a 3 cifras significativas.</p>
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
          ${svgHTML}
        </div>
      `;

      R.push(`$${ansCorrect}\\text{ cm}^3$`);
      // Distractores
      // 1. Área superficial total
      const areaTot = 2 * Math.PI * r * h + 2 * Math.PI * r * r;
      R.push(`$${roundTo3SF(areaTot)}\\text{ cm}^3$`);
      // 2. Olvidar elevar al cuadrado el radio (2 * pi * r * h)
      R.push(`$${roundTo3SF(2 * Math.PI * r * h)}\\text{ cm}^3$`);
      // 3. Cono (1/3 * pi * r^2 * h)
      R.push(`$${roundTo3SF(vol / 3)}\\text{ cm}^3$`);
      // 4. pi * r * h^2
      R.push(`$${roundTo3SF(Math.PI * r * h * h)}\\text{ cm}^3$`);
      // 5. Offset
      R.push(`$${roundTo3SF(vol + 30)}\\text{ cm}^3$`);
    }

    for (let j = 1; j < 6; ++j) {
      let intentos = 0;
      while (tlacu.pregunta.hayRepetidos(R) && intentos < 20) {
        let varOffset = (Math.random() * 40 - 20);
        if (Math.abs(varOffset) < 3) varOffset = 15;
        R[j] = `$${roundTo3SF(Math.abs(ansCorrect + varOffset))}\\text{ cm}^3$`;
        intentos++;
      }
    }

    return [P, R];

  } catch (error) {
    console.error('Error al generar la pregunta:', error);
  }
}
