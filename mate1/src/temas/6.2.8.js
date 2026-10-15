import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Área de regiones compuestas circulares (Abierta)';
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

export async function pregunta(i, totalPreguntas, esImprimible = false) {
  try {
    // 5 tipos de figuras compuestas basadas en 3.1.24
    // 0: Cuadrado con cuadrante de círculo inscrito (esquina sombreada)
    // 1: Segmento circular (Sector - Triángulo)
    // 2: Pétalo central (intersección de dos cuadrantes en un cuadrado)
    // 3: Ventana normanda (rectángulo + semicírculo)
    // 4: Cuadrado con 4 cuadrantes recortados en los vértices (área central sombreada)
    const tipoProblema = Math.floor(Math.random() * 5);

    let enunciado = '';
    let svgHTML = '';
    let ansCorrectExact = 0;
    let unidadTxt = 'cm²';

    if (tipoProblema === 0) {
      // Caso 0: Cuadrado con cuadrante inscrito (esquina sobrante sombreada)
      const a = Math.floor(Math.random() * 5) + 6; // 6 a 10 cm
      ansCorrectExact = a * a - 0.25 * Math.PI * a * a;
      
      enunciado = `Un cuadrado de lado $a = ${a}\\text{ cm}$ tiene inscrito un cuadrante circular de radio $r = ${a}\\text{ cm}$. Calcule el área de la región sombreada exterior al cuadrante.`;

      svgHTML = `
        <svg width="200" height="200" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
          <!-- Cuadrado exterior -->
          <rect x="35" y="35" width="130" height="130" fill="#f8fafc" stroke="#333" stroke-width="2"/>
          <!-- Esquina sombreada -->
          <path d="M 35,35 L 165,35 L 165,165 A 130 130 0 0 1 35,35 Z" fill="#94a3b8" stroke="none"/>
          <!-- Cuadrante en blanco -->
          <path d="M 35,165 L 165,165 A 130 130 0 0 1 35,35 Z" fill="#ffffff" stroke="#333" stroke-width="2"/>
          <!-- Ángulo recto y centro -->
          <rect x="35" y="153" width="12" height="12" fill="none" stroke="#444" stroke-width="1.2"/>
          <circle cx="35" cy="165" r="3" fill="#333"/>
          <text x="100" y="182" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#333" text-anchor="middle">a = ${a} cm</text>
          <text x="25" y="105" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#333" text-anchor="end">a = ${a} cm</text>
          <text x="135" y="70" font-family="sans-serif" font-size="11px" font-weight="bold" fill="#1e293b" text-anchor="middle">Sombra</text>
        </svg>
      `;

    } else if (tipoProblema === 1) {
      // Caso 1: Segmento circular
      const r = Math.floor(Math.random() * 5) + 6; // 6 a 10 cm
      const angulos = [60, 90, 120];
      const theta = angulos[Math.floor(Math.random() * angulos.length)];
      const thetaRad = (theta * Math.PI) / 180;
      
      const aSector = 0.5 * r * r * thetaRad;
      const aTriang = 0.5 * r * r * Math.sin(thetaRad);
      ansCorrectExact = aSector - aTriang;

      enunciado = `Un sector circular de radio $r = ${r}\\text{ cm}$ tiene un ángulo central $\\theta = ${theta}^\\circ$. Calcule el área del segmento circular sombreado (área del sector menos el área del triángulo isósceles).`;

      const svgR = 100;
      const ox = 50, oy = 150;
      const xEnd = ox + svgR * Math.cos(thetaRad);
      const yEnd = oy - svgR * Math.sin(thetaRad);
      const arcMarkR = 25;
      const arcMarkX = ox + arcMarkR * Math.cos(thetaRad);
      const arcMarkY = oy - arcMarkR * Math.sin(thetaRad);

      svgHTML = `
        <svg width="200" height="200" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
          <!-- Sector circular base -->
          <path d="M ${ox} ${oy} L ${ox + svgR} ${oy} A ${svgR} ${svgR} 0 0 0 ${xEnd} ${yEnd} Z" fill="#f8fafc" stroke="#333" stroke-width="1.8"/>
          <!-- Triángulo isósceles sin sombra -->
          <polygon points="${ox},${oy} ${ox + svgR},${oy} ${xEnd},${yEnd}" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
          <!-- Segmento sombreado -->
          <path d="M ${ox + svgR} ${oy} A ${svgR} ${svgR} 0 0 0 ${xEnd} ${yEnd} Z" fill="#94a3b8" stroke="#333" stroke-width="2"/>
          <!-- Arco indicador de ángulo -->
          <path d="M ${ox + arcMarkR} ${oy} A ${arcMarkR} ${arcMarkR} 0 0 0 ${arcMarkX} ${arcMarkY}" fill="none" stroke="#444" stroke-width="1.2"/>
          <circle cx="${ox}" cy="${oy}" r="3" fill="#333"/>
          <text x="${ox - 8}" y="${oy + 4}" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#333" text-anchor="end">O</text>
          <text x="${ox + 35}" y="${oy - 12}" font-family="sans-serif" font-size="11px" font-weight="bold" fill="#333">${theta}°</text>
          <text x="${ox + 50}" y="${oy + 16}" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#333">r = ${r} cm</text>
        </svg>
      `;

    } else if (tipoProblema === 2) {
      // Caso 2: Pétalo central en cuadrado
      const L = Math.floor(Math.random() * 5) + 5; // 5 a 9 cm
      ansCorrectExact = (Math.PI / 2 - 1) * L * L;

      enunciado = `En un cuadrado de lado $L = ${L}\\text{ cm}$ se trazan dos cuadrantes de círculo con centros en vértices opuestos. Calcule el área del pétalo central sombreado resultante de la intersección.`;

      svgHTML = `
        <svg width="200" height="200" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
          <!-- Cuadrado exterior -->
          <rect x="35" y="35" width="130" height="130" fill="#f8fafc" stroke="#333" stroke-width="2"/>
          <!-- Pétalo central -->
          <path d="M 35,165 A 130 130 0 0 1 165,35 A 130 130 0 0 1 35,165 Z" fill="#94a3b8" stroke="#333" stroke-width="2"/>
          <!-- Arcos guía -->
          <path d="M 35,165 A 130 130 0 0 1 165,35" fill="none" stroke="#444" stroke-width="1.5"/>
          <path d="M 165,35 A 130 130 0 0 1 35,165" fill="none" stroke="#444" stroke-width="1.5"/>
          <text x="100" y="182" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#333" text-anchor="middle">L = ${L} cm</text>
          <text x="25" y="105" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#333" text-anchor="end">L = ${L} cm</text>
        </svg>
      `;

    } else if (tipoProblema === 3) {
      // Caso 3: Ventana Normanda (rectángulo + semicírculo)
      const b = (Math.floor(Math.random() * 4) + 3) * 2; // base par: 6, 8, 10, 12 cm
      const h = Math.floor(Math.random() * 4) + 7; // altura recta: 7, 8, 9, 10 cm
      const rSemi = b / 2;
      ansCorrectExact = b * h + 0.5 * Math.PI * rSemi * rSemi;

      enunciado = `Una ventana normanda consta de un rectángulo coronado por un semicírculo. Si la base es $b = ${b}\\text{ cm}$, la altura de la parte rectangular es $h = ${h}\\text{ cm}$ y el radio del semicírculo es $r = ${rSemi}\\text{ cm}$, calcule el área total de la figura.`;

      svgHTML = `
        <svg width="200" height="200" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
          <!-- Rectángulo -->
          <rect x="55" y="80" width="90" height="85" fill="#f1f5f9" stroke="#333" stroke-width="2"/>
          <!-- Semicírculo -->
          <path d="M 55,80 A 45 45 0 0 1 145,80 Z" fill="#94a3b8" stroke="#333" stroke-width="2"/>
          <!-- Separación punteada -->
          <line x1="55" y1="80" x2="145" y2="80" stroke="#64748b" stroke-dasharray="3,3" stroke-width="1.5"/>
          <!-- Centro y radio -->
          <circle cx="100" cy="80" r="2.5" fill="#333"/>
          <line x1="100" y1="80" x2="145" y2="80" stroke="#333" stroke-width="1.3"/>
          <text x="100" y="182" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#333" text-anchor="middle">b = ${b} cm</text>
          <text x="45" y="125" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#333" text-anchor="end">h = ${h} cm</text>
          <text x="122" y="74" font-family="sans-serif" font-size="10px" font-weight="bold" fill="#333">r = ${rSemi}</text>
        </svg>
      `;

    } else {
      // Caso 4: Cuadrado con 4 esquinas de cuadrante recortadas (área central sombreada)
      const r = Math.floor(Math.random() * 3) + 3; // 3, 4, 5 cm
      const extra = Math.floor(Math.random() * 3) + 2; // 2, 3, 4 cm
      const lado = 2 * r + extra;
      ansCorrectExact = lado * lado - Math.PI * r * r;

      enunciado = `Un cuadrado de lado $L = ${lado}\\text{ cm}$ tiene cuatro cuadrantes de radio $r = ${r}\\text{ cm}$ recortados en cada uno de sus vértices. Calcule el área de la región sombreada central.`;

      svgHTML = `
        <svg width="200" height="200" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 10px auto; display: block;">
          <!-- Cuadrado sombreado de fondo -->
          <rect x="35" y="35" width="130" height="130" fill="#94a3b8" stroke="#333" stroke-width="2"/>
          <!-- Cuadrante superior izquierdo -->
          <path d="M 35,35 L 82,35 A 47 47 0 0 1 35,82 Z" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
          <!-- Cuadrante superior derecho -->
          <path d="M 165,35 L 118,35 A 47 47 0 0 0 165,82 Z" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
          <!-- Cuadrante inferior izquierdo -->
          <path d="M 35,165 L 82,165 A 47 47 0 0 0 35,118 Z" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
          <!-- Cuadrante inferior derecho -->
          <path d="M 165,165 L 118,165 A 47 47 0 0 1 165,118 Z" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
          <text x="100" y="182" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#333" text-anchor="middle">L = ${lado} cm</text>
          <text x="25" y="105" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#333" text-anchor="end">L = ${lado} cm</text>
          <text x="58" y="55" font-family="sans-serif" font-size="10px" font-weight="bold" fill="#333">r = ${r}</text>
        </svg>
      `;
    }

    const ans3sf = roundTo3SF(ansCorrectExact);

    const Pregunta = `
      ${i === 0 ? '<h2>Área de regiones compuestas circulares: plantee sumas y restas de áreas de figuras básicas ($A_{\\text{círculo}} = \\pi r^2$, $A_{\\text{sector}} = \\frac{\\theta}{360}\\pi r^2$, etc.)</h2>' : ''}
      <div class="pregunta-abierta" data-ans="${ansCorrectExact}" style="display: none;">
        <p>${i + 1}.- ${enunciado} Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
        
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
          ${svgHTML}
        </div>
        
        <table>
          <tr>
            <td>Área de la región sombreada: </td>
            <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> ${unidadTxt}</td>
          </tr>
        </table>
      </div>
    `;

    if (esImprimible) {
      return [Pregunta, `$${ans3sf}\\text{ ${unidadTxt}}$`];
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
    
    // Obtener respuesta correcta exacta almacenada
    const ansCorrectExact = parseFloat(pregunta[i].dataset.ans);
    const ansCorrect3SF = roundTo3SF(ansCorrectExact);

    let respuestaStr = mathFields[0].value.trim();
    let respuestaVal = parseFloat(respuestaStr.replace(/,/g, '.'));

    if (isNaN(respuestaVal)) {
      mathFields[0].style.backgroundColor = "#ffcccc";
      return [puntos, totalPuntos];
    }

    // Tolerancia estándar (IB): 3 cifras significativas o 1% de error relativo
    const errorRelativo = Math.abs(respuestaVal - ansCorrectExact) / ansCorrectExact;
    const errorAbsoluto3SF = Math.abs(respuestaVal - ansCorrect3SF);

    if (errorAbsoluto3SF < 0.03 || errorRelativo < 0.015) {
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
