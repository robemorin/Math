import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Área de un sector circular';
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

// Convierte coordenadas polares a cartesianas para el SVG
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  let angleInRadians = (angleInDegrees) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

// Genera la descripción de la ruta del arco SVG
function describeArc(x, y, radius, startAngle, endAngle) {
  let start = polarToCartesian(x, y, radius, endAngle);
  let end = polarToCartesian(x, y, radius, startAngle);
  let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
}

export async function pregunta(numeroPregunta) {
  try {
    // Generar radio aleatorio entre 3 y 15 cm
    const r = Math.floor(Math.random() * 13) + 3;
    
    // Generar ángulo en grados o radianes
    const unidades = Math.random() < 0.5 ? 'rad' : '°';
    let theta;
    let angulosPosibles;
    
    if (unidades === 'rad') {
      angulosPosibles = (Math.random() * 5 + 0.3).toPrecision(3);
      theta = parseFloat(angulosPosibles) * 180 / Math.PI; // Grados para el dibujo SVG
    } else {
      angulosPosibles = Math.floor(Math.random() * 300) + 30;
      theta = angulosPosibles;
    }
    
    // Calcular área del sector circular
    const thetaRad = unidades === 'rad' ? parseFloat(angulosPosibles) : (theta * Math.PI) / 180;
    const Area_val = 0.5 * r * r * thetaRad;
    const ansCorrect = roundTo3SF(Area_val);

    // Definición de ángulos de inicio y fin para el dibujo SVG
    const startAngle = 0;
    const endAngle = theta;

    const center = { x: 100, y: 100 };
    const radiusSVG = 70;

    const startPt = polarToCartesian(center.x, center.y, radiusSVG, startAngle);
    const endPt = polarToCartesian(center.x, center.y, radiusSVG, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    const sectorPath = `M ${center.x} ${center.y} L ${startPt.x} ${startPt.y} A ${radiusSVG} ${radiusSVG} 0 ${largeArcFlag} 1 ${endPt.x} ${endPt.y} Z`;

    // Posición para el texto del radio (a la mitad del radio horizontal a 0 grados)
    const rTextX = center.x + radiusSVG / 2;
    const rTextY = center.y - 8;

    // Posición para el texto del ángulo central (en la bisectriz del ángulo)
    const midAngleRad = ((startAngle + endAngle) / 2) * Math.PI / 180;
    const angleTextX = center.x + 28 * Math.cos(midAngleRad);
    const angleTextY = center.y + 28 * Math.sin(midAngleRad) + 5;

    const svgHTML = `
      <svg width="200" height="200" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
        <!-- Resto del círculo completo en línea discontinua (dashed) -->
        <circle cx="${center.x}" cy="${center.y}" r="${radiusSVG}" fill="none" stroke="#ccc" stroke-dasharray="4,4" stroke-width="2" />
        
        <!-- Sector sombreado con bordes destacados -->
        <path d="${sectorPath}" fill="#e0e0e0" stroke="#444" stroke-width="2" />
        
        <!-- Textos y etiquetas -->
        <text x="${rTextX}" y="${rTextY}" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#333" text-anchor="middle">r = ${r} cm</text>
        <text x="${angleTextX}" y="${angleTextY}" font-family="sans-serif" font-size="12px" fill="#444" text-anchor="middle">${angulosPosibles} ${unidades}</text>
      </svg>
    `;

    const P = `
      ${numeroPregunta === 0 ? '<h2>Fórmula del área de un sector circular: $$A = \\frac{1}{2} r^2 \\theta$$ (con $\\theta$ en radianes) o $$A = \\pi r^2 \\left(\\frac{\\theta}{360^\\circ}\\right)$$</h2>' : ''}
      <p>${numeroPregunta + 1}.- Determine el área del sector circular sombreado en la siguiente figura. Redondee su respuesta a 3 cifras significativas.</p>
      <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
        ${svgHTML}
      </div>
    `;

    // Opción correcta
    const R = [`$${ansCorrect}\\text{ cm}^2$`];

    // Generar distractores plausibles
    // 1. Longitud de arco L (confusión de fórmula)
    const L = r * thetaRad;
    R.push(`$${roundTo3SF(L)}\\text{ cm}^2$`);

    // 2. Perímetro del sector (confusión de fórmula: L + 2r)
    R.push(`$${roundTo3SF(L + 2 * r)}\\text{ cm}^2$`);

    // 3. Olvidar el factor de 0.5 (r^2 * theta)
    R.push(`$${roundTo3SF(r * r * thetaRad)}\\text{ cm}^2$`);

    // 4. Olvidar elevar al cuadrado el radio (0.5 * r * theta)
    R.push(`$${roundTo3SF(0.5 * r * thetaRad)}\\text{ cm}^2$`);

    // 5. Variación aleatoria
    let offset = (Math.random() * 8 - 4);
    if (Math.abs(offset) < 0.5) offset += 2;
    R.push(`$${roundTo3SF(Math.abs(Area_val + offset))}\\text{ cm}^2$`);

    // Asegurar que no haya repetidos
    for (let j = 1; j < 6; ++j) {
      let intentos = 0;
      while (tlacu.pregunta.hayRepetidos(R) && intentos < 20) {
        let varOffset = (Math.random() * 12 - 6);
        if (Math.abs(varOffset) < 0.5) varOffset = 3;
        R[j] = `$${roundTo3SF(Math.abs(Area_val + varOffset))}\\text{ cm}^2$`;
        intentos++;
      }
    }

    return [P, R];

  } catch (error) {
    console.error('Error al generar la pregunta:', error);
  }
}
