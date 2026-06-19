import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Perímetro de un sector circular (Abierta)';
}

export function tipo() {
  return 3; // 3 - Abierto interactivo
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

export async function pregunta(i, totalPreguntas, esImprimible = false) {
  try {
    // Generar radio aleatorio entre 3 y 15 cm
    const r = Math.floor(Math.random() * 13) + 3;
    const unidades = Math.random() < 0.5 ? 'rad' : '°';
    let theta;
    let angulosPosibles;
    if (unidades === 'rad') {
      angulosPosibles = (Math.random() * 5 + 0.3).toPrecision(3);
      theta = parseFloat(angulosPosibles) * 180 / Math.PI;
    } else {
      angulosPosibles = Math.floor(Math.random() * 300) + 30;
      theta = angulosPosibles;
    }
    
    // Calcular longitud de arco y perímetro del sector
    const L = unidades === 'rad' ? r * parseFloat(angulosPosibles) : (Math.PI * r * theta) / 180;
    const P_val = 2 * r + L;
    const ans3sf = roundTo3SF(P_val);

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
        <!-- Resto del círculo completo en línea discontinua (dashed) -->
        <circle cx="${center.x}" cy="${center.y}" r="${radiusSVG}" fill="none" stroke="#ccc" stroke-dasharray="4,4" stroke-width="2" />
        
        <!-- Bordes del sector circular en línea sólida destacada roja -->
        <line x1="${center.x}" y1="${center.y}" x2="${startPt.x}" y2="${startPt.y}" stroke="#ff4757" stroke-width="4.5" stroke-linecap="round" />
        <line x1="${center.x}" y1="${center.y}" x2="${endPt.x}" y2="${endPt.y}" stroke="#ff4757" stroke-width="4.5" stroke-linecap="round" />
        <path d="${arcPath}" fill="none" stroke="#ff4757" stroke-width="4.5" stroke-linecap="round" />
        
        <!-- Textos y etiquetas -->
        <text x="${rTextX}" y="${rTextY}" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#333" text-anchor="middle">r = ${r} cm</text>
        <text x="${angleTextX}" y="${angleTextY}" font-family="sans-serif" font-size="12px" fill="#444" text-anchor="middle">${angulosPosibles} ${unidades}</text>
      </svg>
    `;

    const Pregunta = `
      ${i === 0 ? '<h2> $$P = 2r + L$$</h2>' : ''}
      <div class="pregunta-abierta" data-r="${r}" data-unidades="${unidades}" data-angulos-posibles="${angulosPosibles}" data-theta="${theta}" style="display: none;">
        <p>${i + 1}.- Halle el perímetro del sector circular en la siguiente figura. <span id="resultado_${i}" name="question"></span></p>
        
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
          ${svgHTML}
        </div>
        
        <table>
          <tr>
            <td>Perímetro del sector: </td>
            <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> cm</td>
          </tr>
        </table>
      </div>
    `;

    if (esImprimible) {
      return [Pregunta, `$${ans3sf}\\text{ cm}$`];
    }

    if (totalPreguntas - 1 === i) render(null, totalPreguntas);
    return Pregunta;

  } catch (error) {
    console.error('Error al cargar la pregunta:', error);
  }
}

export async function render(container, n, code) {
  window.accionR2P = function (i) {
    let totalPuntos = 1;
    let puntos = 0;
    let pregunta = document.getElementsByClassName('pregunta-abierta');
    const mathFields = pregunta[i].getElementsByTagName('math-field');
    
    // Calcular en caliente para no exponer la respuesta
    const r = parseFloat(pregunta[i].dataset.r);
    const unidades = pregunta[i].dataset.unidades;
    const angulosPosibles = pregunta[i].dataset.angulosPosibles;
    const theta = parseFloat(pregunta[i].dataset.theta);

    const L = unidades === 'rad' ? r * parseFloat(angulosPosibles) : (Math.PI * r * theta) / 180;
    const ansCorrectExact = 2 * r + L;
    const ansCorrect3SF = roundTo3SF(ansCorrectExact);

    let respuestaStr = mathFields[0].value.trim();
    let respuestaVal = parseFloat(respuestaStr.replace(/,/g, '.'));

    if (isNaN(respuestaVal)) {
      mathFields[0].style.backgroundColor = "#ffcccc";
      return [puntos, totalPuntos];
    }

    const errorRelativo = Math.abs(respuestaVal - ansCorrectExact) / ansCorrectExact;
    const errorAbsoluto3SF = Math.abs(respuestaVal - ansCorrect3SF);

    if (errorAbsoluto3SF < 0.02 || errorRelativo < 0.01) {
      puntos++;
      mathFields[0].style.border = "solid 5px green";
      mathFields[0].style.backgroundColor = "#e2fbe2";
    } else {
      mathFields[0].style.border = "solid 5px red";
      document.getElementById(`error_${i}`).textContent = ` Correcto: ${ansCorrect3SF}`;
    }

    return [puntos, totalPuntos];
  };
}
