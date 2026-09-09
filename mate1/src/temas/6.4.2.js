import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Volumen de pirámides y conos';
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
    const esCono = Math.random() < 0.5;

    let P = '';
    let R = [];
    let ansCorrect = 0;

    if (esCono) {
      // Cono circular recto
      const r = Math.floor(Math.random() * 6) + 3; // radio 3 a 8 cm
      const h = Math.floor(Math.random() * 8) + 6; // altura 6 a 13 cm

      const vol = (1 / 3) * Math.PI * r * r * h;
      ansCorrect = roundTo3SF(vol);

      const svgHTML = `
        <svg width="220" height="200" viewBox="0 0 220 200" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
          <!-- Base elíptica posterior -->
          <path d="M 50 150 A 60 18 0 0 1 170 150" fill="none" stroke="#7fb3d5" stroke-width="1.5" stroke-dasharray="3,3" />
          <!-- Base elíptica frontal -->
          <path d="M 50 150 A 60 18 0 0 0 170 150" fill="none" stroke="#2980b9" stroke-width="2" />
          
          <!-- Generatrices laterales -->
          <line x1="50" y1="150" x2="110" y2="30" stroke="#2980b9" stroke-width="2" />
          <line x1="170" y1="150" x2="110" y2="30" stroke="#2980b9" stroke-width="2" />
          
          <!-- Altura interior perpendicular -->
          <line x1="110" y1="30" x2="110" y2="150" stroke="#e74c3c" stroke-width="1.5" stroke-dasharray="3,3" />
          <!-- Radio de la base -->
          <circle cx="110" cy="150" r="2.5" fill="#333" />
          <line x1="110" y1="150" x2="170" y2="150" stroke="#333" stroke-width="1.5" />
          
          <!-- Textos -->
          <text x="140" y="144" font-family="sans-serif" font-size="11px" font-weight="bold" fill="#333" text-anchor="middle">r = ${r} cm</text>
          <text x="100" y="90" font-family="sans-serif" font-size="11px" font-weight="bold" fill="#e74c3c" text-anchor="end">h = ${h} cm</text>
        </svg>
      `;

      P = `
        ${numeroPregunta === 0 ? '<h2>Volumen del cono: $$V = \\frac{1}{3}\\pi r^2 h$$</h2>' : ''}
        <p>${numeroPregunta + 1}.- Calcule el volumen del cono circular recto mostrado en la figura. Redondee su respuesta a 3 cifras significativas.</p>
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
          ${svgHTML}
        </div>
      `;

      R.push(`$${ansCorrect}\\text{ cm}^3$`);
      // Distractores
      // 1. Cilindro completo (olvidar 1/3)
      R.push(`$${roundTo3SF(Math.PI * r * r * h)}\\text{ cm}^3$`);
      // 2. Olvidar el radio al cuadrado (1/3 * pi * r * h)
      R.push(`$${roundTo3SF((1 / 3) * Math.PI * r * h)}\\text{ cm}^3$`);
      // 3. 2/3 (como hemisferio)
      R.push(`$${roundTo3SF((2 / 3) * Math.PI * r * r * h)}\\text{ cm}^3$`);
      // 4. Área de la base solamente
      R.push(`$${roundTo3SF(Math.PI * r * r)}\\text{ cm}^3$`);
      // 5. Offset
      R.push(`$${roundTo3SF(vol + 18)}\\text{ cm}^3$`);

    } else {
      // Pirámide de base cuadrada
      const ladoBase = Math.floor(Math.random() * 6) + 4; // 4 a 9 cm
      const h_pir = Math.floor(Math.random() * 8) + 6; // 6 a 13 cm

      const areaBase = ladoBase * ladoBase;
      const vol = (1 / 3) * areaBase * h_pir;
      ansCorrect = roundTo3SF(vol);

      const svgHTML = `
        <svg width="220" height="200" viewBox="0 0 220 200" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
          <!-- Base en perspectiva -->
          <polygon points="35,145 135,145 185,115 85,115" fill="#e8f4fd" stroke="#2980b9" stroke-width="1.5" stroke-dasharray="3,3" />
          <line x1="35" y1="145" x2="135" y2="145" stroke="#2980b9" stroke-width="2" />
          <line x1="135" y1="145" x2="185" y2="115" stroke="#2980b9" stroke-width="2" />
          <line x1="35" y1="145" x2="110" y2="35" stroke="#2980b9" stroke-width="2" />
          <line x1="135" y1="145" x2="110" y2="35" stroke="#2980b9" stroke-width="2" />
          <line x1="185" y1="115" x2="110" y2="35" stroke="#2980b9" stroke-width="2" />
          <line x1="85" y1="115" x2="110" y2="35" stroke="#7fb3d5" stroke-width="1.5" stroke-dasharray="3,3" />
          
          <!-- Altura central de la pirámide -->
          <line x1="110" y1="35" x2="110" y2="130" stroke="#e74c3c" stroke-width="1.5" stroke-dasharray="3,3" />
          
          <text x="85" y="160" font-family="sans-serif" font-size="11px" font-weight="bold" fill="#333" text-anchor="middle">L = ${ladoBase} cm</text>
          <text x="100" y="85" font-family="sans-serif" font-size="11px" font-weight="bold" fill="#e74c3c" text-anchor="end">h = ${h_pir} cm</text>
        </svg>
      `;

      P = `
        ${numeroPregunta === 0 ? '<h2>Volumen de la pirámide: $$V = \\frac{1}{3} A_{\\text{base}} \\times h$$</h2>' : ''}
        <p>${numeroPregunta + 1}.- Calcule el volumen de la pirámide de base cuadrada mostrada en la figura. Redondee su respuesta a 3 cifras significativas.</p>
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
          ${svgHTML}
        </div>
      `;

      R.push(`$${ansCorrect}\\text{ cm}^3$`);
      // Distractores
      // 1. Prisma sin dividir entre 3
      R.push(`$${roundTo3SF(areaBase * h_pir)}\\text{ cm}^3$`);
      // 2. Dividir entre 2 en vez de 3
      R.push(`$${roundTo3SF(0.5 * areaBase * h_pir)}\\text{ cm}^3$`);
      // 3. Olvidar elevar al cuadrado el lado
      R.push(`$${roundTo3SF((1 / 3) * ladoBase * h_pir)}\\text{ cm}^3$`);
      // 4. Área de la base solamente
      R.push(`$${roundTo3SF(areaBase)}\\text{ cm}^3$`);
      // 5. Offset
      R.push(`$${roundTo3SF(vol + 15)}\\text{ cm}^3$`);
    }

    for (let j = 1; j < 6; ++j) {
      let intentos = 0;
      while (tlacu.pregunta.hayRepetidos(R) && intentos < 20) {
        let varOffset = (Math.random() * 30 - 15);
        if (Math.abs(varOffset) < 2) varOffset = 10;
        R[j] = `$${roundTo3SF(Math.abs(ansCorrect + varOffset))}\\text{ cm}^3$`;
        intentos++;
      }
    }

    return [P, R];

  } catch (error) {
    console.error('Error al generar la pregunta:', error);
  }
}
