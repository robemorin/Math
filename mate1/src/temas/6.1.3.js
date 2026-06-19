import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Longitud de un arco';
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
    
    // Calcular longitud de arco exacta y redondeada
    const L = unidades === 'rad' ? r * parseFloat(angulosPosibles) : (Math.PI * r * theta) / 180;
    const ansCorrect = roundTo3SF(L);

    // Definición de ángulos de inicio y fin para el dibujo SVG
    const startAngle = 0;
    const endAngle = theta;

    const center = { x: 100, y: 100 };
    const radiusSVG = 70;

    const startPt = polarToCartesian(center.x, center.y, radiusSVG, startAngle);
    const endPt = polarToCartesian(center.x, center.y, radiusSVG, endAngle);
    const arcPath = describeArc(center.x, center.y, radiusSVG, startAngle, endAngle);

    // Posición para el texto del radio (a la mitad del radio horizontal a 0 grados)
    const rTextX = center.x + radiusSVG / 2;
    const rTextY = center.y - 8;

    // Posición para el texto del ángulo central (en la bisectriz del ángulo)
    const midAngleRad = ((startAngle + endAngle) / 2) * Math.PI / 180;
    const angleTextX = center.x + 28 * Math.cos(midAngleRad);
    const angleTextY = center.y + 28 * Math.sin(midAngleRad) + 5;

    const svgHTML = `
      <svg width="200" height="200" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
        <!-- Círculo completo en línea discontinua (dashed) -->
        <circle cx="${center.x}" cy="${center.y}" r="${radiusSVG}" fill="none" stroke="#ccc" stroke-dasharray="4,4" stroke-width="2" />
        
        <!-- Radios que delimitan el sector -->
        <line x1="${center.x}" y1="${center.y}" x2="${startPt.x}" y2="${startPt.y}" stroke="#444" stroke-width="1.5" />
        <line x1="${center.x}" y1="${center.y}" x2="${endPt.x}" y2="${endPt.y}" stroke="#444" stroke-width="1.5" />
        
        <!-- Arco en línea continua y gruesa -->
        <path d="${arcPath}" fill="none" stroke="#ff4757" stroke-width="4.5" stroke-linecap="round" />
        
        <!-- Textos y etiquetas -->
        <text x="${rTextX}" y="${rTextY}" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#333" text-anchor="middle">r = ${r} cm</text>
        <text x="${angleTextX}" y="${angleTextY}" font-family="sans-serif" font-size="12px" fill="#444" text-anchor="middle">${angulosPosibles} ${unidades}</text>
      </svg>
    `;

    const P = `
      ${numeroPregunta === 0 ? '<h2>Fórmula de la longitud del arco: $$L = r\\theta$$   $$L = \\frac{\\pi r \\theta}{180^\\circ}$$</h2>' : ''}
      <p>${numeroPregunta + 1}.- Determine la longitud del arco de color rojo destacado en la siguiente figura. Redondee su respuesta a 3 cifras significativas.</p>
      <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
        ${svgHTML}
      </div>
    `;

    // Opción correcta
    const R = [`$${ansCorrect}\\text{ cm}$`];

    // Generar distractores plausibles
    // 1. Área del sector circular (fórmula errónea)
    const areaSector = unidades === 'rad' ? 0.5 * r * r * parseFloat(angulosPosibles) : 0.5 * r * L;
    const distArea = roundTo3SF(areaSector);
    R.push(`$${distArea}\\text{ cm}$`);

    // 2. Uso incorrecto de la conversión de unidades (multiplicar/dividir pi/180 erróneamente)
    const conversionErronea = unidades === 'rad' ? L * (180 / Math.PI) : L * (Math.PI / 180);
    const distConv = roundTo3SF(conversionErronea);
    R.push(`$${distConv}\\text{ cm}$`);

    // 3. Multiplicar por 2 de más o de menos (usar diámetro en lugar de radio o similar)
    R.push(`$${roundTo3SF(L * 2)}\\text{ cm}$`);
    R.push(`$${roundTo3SF(L / 2)}\\text{ cm}$`);

    // 4. Distractor aleatorio cercano
    let offset = (Math.random() * 4 - 2);
    if (Math.abs(offset) < 0.5) offset += 1;
    R.push(`$${roundTo3SF(L + offset)}\\text{ cm}$`);

    // Asegurar que no haya repetidos
    for (let j = 1; j < 6; ++j) {
      let intentos = 0;
      while (tlacu.pregunta.hayRepetidos(R) && intentos < 20) {
        // Generar una variación si hay duplicados
        let varOffset = (Math.random() * 6 - 3);
        if (Math.abs(varOffset) < 0.5) varOffset = 1.5;
        R[j] = `$${roundTo3SF(Math.abs(L + varOffset))}\\text{ cm}$`;
        intentos++;
      }
    }

    return [P, R];

  } catch (error) {
    console.error('Error al generar la pregunta:', error);
  }
}
