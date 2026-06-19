import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Área de un sector de corona circular';
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

export async function pregunta(numeroPregunta) {
  try {
    // Generar radio menor r entre 2 y 8 cm
    const r = Math.floor(Math.random() * 7) + 2;
    // Generar radio mayor R tal que sea al menos 2 cm más grande y máximo 15 cm
    const R_val = r + Math.floor(Math.random() * 6) + 2;
    
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
    
    // Calcular área del sector de corona circular
    const thetaRad = unidades === 'rad' ? parseFloat(angulosPosibles) : (theta * Math.PI) / 180;
    const Area_val = 0.5 * (R_val * R_val - r * r) * thetaRad;
    const ansCorrect = roundTo3SF(Area_val);

    // Definición de ángulos para el dibujo SVG
    const startAngle = 0;
    const endAngle = theta;

    const center = { x: 100, y: 100 };
    const rOuterSVG = 75;
    const rInnerSVG = 35;

    const startPtOuter = polarToCartesian(center.x, center.y, rOuterSVG, startAngle);
    const endPtOuter = polarToCartesian(center.x, center.y, rOuterSVG, endAngle);
    const startPtInner = polarToCartesian(center.x, center.y, rInnerSVG, startAngle);
    const endPtInner = polarToCartesian(center.x, center.y, rInnerSVG, endAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    // Ruta de la figura cerrada del sector de la corona circular:
    // M (inicio interior) -> L (inicio exterior) -> A (arco exterior) -> L (fin interior) -> A (arco interior hacia atrás) -> Z
    const sectorCrownPath = [
      "M", startPtInner.x, startPtInner.y,
      "L", startPtOuter.x, startPtOuter.y,
      "A", rOuterSVG, rOuterSVG, 0, largeArcFlag, 1, endPtOuter.x, endPtOuter.y,
      "L", endPtInner.x, endPtInner.y,
      "A", rInnerSVG, rInnerSVG, 0, largeArcFlag, 0, startPtInner.x, startPtInner.y,
      "Z"
    ].join(" ");

    // Posiciones para etiquetas
    const midAngleRad = ((startAngle + endAngle) / 2) * Math.PI / 180;
    const angleTextX = center.x + 22 * Math.cos(midAngleRad);
    const angleTextY = center.y + 22 * Math.sin(midAngleRad) + 4;

    const svgHTML = `
      <svg width="200" height="200" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
        <!-- Círculos completos concéntricos en línea discontinua (dashed) -->
        <circle cx="${center.x}" cy="${center.y}" r="${rOuterSVG}" fill="none" stroke="#ccc" stroke-dasharray="4,4" stroke-width="1.5" />
        <circle cx="${center.x}" cy="${center.y}" r="${rInnerSVG}" fill="none" stroke="#ccc" stroke-dasharray="4,4" stroke-width="1.5" />
        
        <!-- Líneas discontinuas desde el centro para marcar los radios -->
        <line x1="${center.x}" y1="${center.y}" x2="${startPtInner.x}" y2="${startPtInner.y}" stroke="#999" stroke-dasharray="2,2" stroke-width="1" />
        <line x1="${center.x}" y1="${center.y}" x2="${endPtInner.x}" y2="${endPtInner.y}" stroke="#999" stroke-dasharray="2,2" stroke-width="1" />
        
        <!-- Sector de corona circular sombreado con borde continuo -->
        <path d="${sectorCrownPath}" fill="#e0e0e0" stroke="#444" stroke-width="2" />
        
        <!-- Marcador de centro -->
        <circle cx="${center.x}" cy="${center.y}" r="2.5" fill="#444" />
        
        <!-- Textos y etiquetas de radios y ángulo -->
        <text x="${center.x + rInnerSVG / 2}" y="${center.y - 6}" font-family="sans-serif" font-size="11px" font-weight="bold" fill="#333" text-anchor="middle">r = ${r}</text>
        <text x="${center.x + rOuterSVG - 15}" y="${center.y - 6}" font-family="sans-serif" font-size="11px" font-weight="bold" fill="#333" text-anchor="middle">R = ${R_val}</text>
        <text x="${angleTextX}" y="${angleTextY}" font-family="sans-serif" font-size="11px" fill="#444" text-anchor="middle">${angulosPosibles} ${unidades}</text>
      </svg>
    `;

    const P = `
      ${numeroPregunta === 0 ? '<h2>$$A = \\frac{1}{2} (R^2 - r^2) \\theta$$  $$A = \\pi (R^2 - r^2) \\left(\\frac{\\theta}{360^\\circ}\\right)$$</h2>' : ''}
      <p>${numeroPregunta + 1}.- Calcule el área del sector de corona circular con $R = ${R_val}$, $r = ${r}$ y $\\theta = ${angulosPosibles} ${unidades == "°" ? "°" : "\\text{ rad}"}$ representado por la siguiente figura soombreada.</p>
      <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
        ${svgHTML}
      </div>
    `;

    // Opción correcta
    const R = [`$${ansCorrect}\\text{ cm}^2$`];

    // Generar distractores plausibles
    // 1. Área de toda la corona circular (olvidar la proporción del ángulo)
    const areaCoronaCompleta = Math.PI * (R_val * R_val - r * r);
    R.push(`$${roundTo3SF(areaCoronaCompleta)}\\text{ cm}^2$`);

    // 2. Usar resta de radios al cuadrado: 0.5 * (R - r)^2 * theta
    const distRestaAlCuadrado = 0.5 * (R_val - r) * (R_val - r) * thetaRad;
    R.push(`$${roundTo3SF(distRestaAlCuadrado)}\\text{ cm}^2$`);

    // 3. Sumar sectores en vez de restarlos: 0.5 * (R^2 + r^2) * theta
    const distSumaSectores = 0.5 * (R_val * R_val + r * r) * thetaRad;
    R.push(`$${roundTo3SF(distSumaSectores)}\\text{ cm}^2$`);

    // 4. Únicamente el sector exterior: 0.5 * R^2 * theta
    const distSoloExterior = 0.5 * R_val * R_val * thetaRad;
    R.push(`$${roundTo3SF(distSoloExterior)}\\text{ cm}^2$`);

    // 5. Variación aleatoria
    let offset = (Math.random() * 6 - 3);
    if (Math.abs(offset) < 0.5) offset += 1.5;
    R.push(`$${roundTo3SF(Math.abs(Area_val + offset))}\\text{ cm}^2$`);

    // Asegurar que no haya repetidos
    for (let j = 1; j < 6; ++j) {
      let intentos = 0;
      while (tlacu.pregunta.hayRepetidos(R) && intentos < 20) {
        let varOffset = (Math.random() * 8 - 4);
        if (Math.abs(varOffset) < 0.5) varOffset = 2.5;
        R[j] = `$${roundTo3SF(Math.abs(Area_val + varOffset))}\\text{ cm}^2$`;
        intentos++;
      }
    }

    return [P, R];

  } catch (error) {
    console.error('Error al generar la pregunta:', error);
  }
}
