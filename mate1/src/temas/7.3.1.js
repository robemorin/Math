import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Problemas multi-paso en triángulos rectángulos';
}

export function tipo() {
  return 3; // 3 - Abierto interactivo con revisión en accionR2P
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

// Convertir grados a radianes
const degToRad = (deg) => (deg * Math.PI) / 180;

export async function pregunta(i, totalPreguntas, esImprimible = false) {
  try {
    // 3 tipos de problemas geométricos multi-paso:
    // Tipo 0: Triángulos anidados en la misma dirección (mismo lado de la perpendicular)
    // Tipo 1: Triángulos espalda con espalda (observadores a ambos lados de la perpendicular común)
    // Tipo 2: Perpendicular dividida / Triángulos apilados (dos ángulos de elevación desde un mismo vértice)
    const tipoEjercicio = Math.floor(Math.random() * 3);

    let svgHTML = '';
    let descripcionHTML = '';
    let filaA = '', filaB = '', filaC = '';
    let ansA = 0, ansB = 0, ansC = 0;
    let respImpresa = '';

    if (tipoEjercicio === 0) {
      // -------------------------------------------------------------
      // TIPO 0: Triángulos anidados sobre la misma base horizontal
      // -------------------------------------------------------------
      const alphaDeg = Math.floor(Math.random() * 14) + 25; // 25° a 38°
      const betaDeg = alphaDeg + Math.floor(Math.random() * 11) + 15; // 40° a 63°
      const d = Math.floor(Math.random() * 21) + 15; // AB = 15 a 35

      const alphaRad = degToRad(alphaDeg);
      const betaRad = degToRad(betaDeg);

      // x = BC, h = CD, hipo = AD
      const xVal = (d * Math.tan(alphaRad)) / (Math.tan(betaRad) - Math.tan(alphaRad));
      const hVal = xVal * Math.tan(betaRad);
      const hipoMayor = (d + xVal) / Math.cos(alphaRad);

      ansA = roundTo3SF(xVal);
      ansB = roundTo3SF(hVal);
      ansC = roundTo3SF(hipoMayor);

      svgHTML = `
        <svg width="380" height="230" viewBox="0 0 380 230" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 12px auto; display: block;">
          <!-- Triángulo mayor ACD -->
          <polygon points="40,180 310,180 310,40" fill="#eef6fb" stroke="#2980b9" stroke-width="2.5" stroke-linejoin="round" />
          <!-- Segmento BD -->
          <line x1="160" y1="180" x2="310" y2="40" stroke="#2980b9" stroke-width="2" stroke-dasharray="4,3" />

          <!-- Ángulo recto en C -->
          <path d="M 292,180 L 292,162 L 310,162" fill="none" stroke="#2980b9" stroke-width="1.8" />
          <circle cx="301" cy="171" r="1.5" fill="#2980b9" />

          <!-- Ángulo alpha en A -->
          <path d="M 75,180 A 35 35 0 0 0 70,161" fill="none" stroke="#e67e22" stroke-width="2" />
          <text x="82" y="172" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#d35400">${alphaDeg}°</text>

          <!-- Ángulo beta en B -->
          <path d="M 195,180 A 35 35 0 0 0 187,156" fill="none" stroke="#e67e22" stroke-width="2" />
          <text x="200" y="168" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#d35400">${betaDeg}°</text>

          <!-- Vértices -->
          <circle cx="40" cy="180" r="4" fill="#2980b9" />
          <text x="32" y="202" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#2c3e50">A</text>
          <circle cx="160" cy="180" r="4" fill="#2980b9" />
          <text x="157" y="202" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#2c3e50">B</text>
          <circle cx="310" cy="180" r="4" fill="#2980b9" />
          <text x="316" y="198" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#2c3e50">C</text>
          <circle cx="310" cy="40" r="4" fill="#2980b9" />
          <text x="318" y="38" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#2c3e50">D</text>

          <!-- Medidas -->
          <line x1="42" y1="210" x2="158" y2="210" stroke="#7f8c8d" stroke-width="1.2" />
          <text x="100" y="208" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#2c3e50" text-anchor="middle">${d}</text>
          <text x="235" y="208" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#c0392b" text-anchor="middle">x</text>
          <text x="330" y="115" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#c0392b">h</text>
        </svg>
      `;

      descripcionHTML = `Considere la siguiente figura donde la base mide $AB = ${d}$, los ángulos de elevación son $\\alpha = ${alphaDeg}^\\circ$ y $\\beta = ${betaDeg}^\\circ$, y el ángulo en $C$ es recto ($90^\\circ$).`;
      filaA = `Distancia horizontal $x = BC$:`;
      filaB = `Altura perpendicular $h = CD$:`;
      filaC = `Longitud del segmento $AD$:`;
      respImpresa = `a) $x \\approx ${ansA}$, \\quad b) $h \\approx ${ansB}$, \\quad c) $AD \\approx ${ansC}$`;

    } else if (tipoEjercicio === 1) {
      // -------------------------------------------------------------
      // TIPO 1: Espalda con espalda (cateto perpendicular común central)
      // -------------------------------------------------------------
      // Vértices: A en la izquierda, C pie perpendicular, B en la derecha, D cúspide arriba
      // Se conoce la distancia total AB = D_tot, y los ángulos en A (alpha) y en B (beta)
      const alphaDeg = Math.floor(Math.random() * 16) + 30; // 30° a 45°
      const betaDeg = Math.floor(Math.random() * 16) + 30; // 30° a 45°
      const D_tot = Math.floor(Math.random() * 26) + 35; // 35 a 60

      const alphaRad = degToRad(alphaDeg);
      const betaRad = degToRad(betaDeg);

      // Relaciones: AC = h / tan(alpha), CB = h / tan(beta)
      // AC + CB = D_tot => h * (1/tan(alpha) + 1/tan(beta)) = D_tot
      const hVal = D_tot / ((1 / Math.tan(alphaRad)) + (1 / Math.tan(betaRad)));
      const acVal = hVal / Math.tan(alphaRad);
      const adVal = hVal / Math.sin(alphaRad);

      ansA = roundTo3SF(hVal);
      ansB = roundTo3SF(acVal);
      ansC = roundTo3SF(adVal);

      svgHTML = `
        <svg width="380" height="230" viewBox="0 0 380 230" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 12px auto; display: block;">
          <!-- Triángulo mayor compuesto ADB -->
          <polygon points="40,180 340,180 190,40" fill="#eef6fb" stroke="#2980b9" stroke-width="2.5" stroke-linejoin="round" />
          <!-- Perpendicular común CD -->
          <line x1="190" y1="180" x2="190" y2="40" stroke="#2980b9" stroke-width="2" stroke-dasharray="4,3" />

          <!-- Ángulo recto en C (ambos lados) -->
          <path d="M 172,180 L 172,162 L 190,162" fill="none" stroke="#2980b9" stroke-width="1.5" />
          <circle cx="181" cy="171" r="1.5" fill="#2980b9" />

          <!-- Ángulo alpha en A -->
          <path d="M 75,180 A 35 35 0 0 0 71,159" fill="none" stroke="#e67e22" stroke-width="2" />
          <text x="82" y="172" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#d35400">${alphaDeg}°</text>

          <!-- Ángulo beta en B -->
          <path d="M 305,180 A 35 35 0 0 1 309,159" fill="none" stroke="#e67e22" stroke-width="2" />
          <text x="272" y="172" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#d35400">${betaDeg}°</text>

          <!-- Vértices -->
          <circle cx="40" cy="180" r="4" fill="#2980b9" />
          <text x="28" y="202" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#2c3e50">A</text>
          <circle cx="190" cy="180" r="4" fill="#2980b9" />
          <text x="187" y="202" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#2c3e50">C</text>
          <circle cx="340" cy="180" r="4" fill="#2980b9" />
          <text x="345" y="202" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#2c3e50">B</text>
          <circle cx="190" cy="40" r="4" fill="#2980b9" />
          <text x="186" y="30" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#2c3e50">D</text>

          <!-- Cota total AB -->
          <line x1="42" y1="216" x2="338" y2="216" stroke="#7f8c8d" stroke-width="1.2" />
          <text x="190" y="213" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#2c3e50" text-anchor="middle">AB = ${D_tot}</text>

          <!-- Incógnitas -->
          <text x="202" y="115" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#c0392b">h</text>
          <text x="110" y="196" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#c0392b" text-anchor="middle">x₁</text>
        </svg>
      `;

      descripcionHTML = `En la figura, la perpendicular común $CD = h$ divide el triángulo en dos triángulos rectángulos con ángulo recto en $C$. Se conoce la distancia total $AB = ${D_tot}$ y los ángulos $\\alpha = ${alphaDeg}^\\circ$ y $\\beta = ${betaDeg}^\\circ$.`;
      filaA = `Altura común $h = CD$:`;
      filaB = `Segmento de base $x_1 = AC$:`;
      filaC = `Longitud del segmento $AD$:`;
      respImpresa = `a) $h \\approx ${ansA}$, \\quad b) $x_1 \\approx ${ansB}$, \\quad c) $AD \\approx ${ansC}$`;

    } else {
      // -------------------------------------------------------------
      // TIPO 2: Triángulos apilados / Perpendicular dividida
      // -------------------------------------------------------------
      // Vértices: A en el suelo, C pie perpendicular ($90^\circ$).
      // Segmento vertical perpendicular dividido en B (altura h1) y D (cúspide total h_tot).
      // Se conoce la base AC = b_dist, ángulo alpha hacia B y ángulo beta hacia D.
      const alphaDeg = Math.floor(Math.random() * 11) + 25; // 25° a 35°
      const betaDeg = alphaDeg + Math.floor(Math.random() * 13) + 15; // 40° a 60°
      const b_dist = Math.floor(Math.random() * 21) + 20; // base AC: 20 a 40

      const alphaRad = degToRad(alphaDeg);
      const betaRad = degToRad(betaDeg);

      // h1 = BC, h_tot = CD, y = BD (diferencia)
      const h1Val = b_dist * Math.tan(alphaRad);
      const hTotVal = b_dist * Math.tan(betaRad);
      const diffVal = hTotVal - h1Val;

      ansA = roundTo3SF(h1Val);
      ansB = roundTo3SF(hTotVal);
      ansC = roundTo3SF(diffVal);

      svgHTML = `
        <svg width="380" height="230" viewBox="0 0 380 230" style="background-color: #fdfdfd; border: 1px solid #e0e0e0; border-radius: 8px; margin: 12px auto; display: block;">
          <!-- Triángulo mayor ACD -->
          <polygon points="50,180 300,180 300,35" fill="#eef6fb" stroke="#2980b9" stroke-width="2.5" stroke-linejoin="round" />
          <!-- Segmento intermedio AB -->
          <line x1="50" y1="180" x2="300" y2="115" stroke="#2980b9" stroke-width="2" stroke-dasharray="4,3" />

          <!-- Ángulo recto en C (300, 180) -->
          <path d="M 282,180 L 282,162 L 300,162" fill="none" stroke="#2980b9" stroke-width="1.8" />
          <circle cx="291" cy="171" r="1.5" fill="#2980b9" />

          <!-- Ángulo alpha (hacia B) -->
          <path d="M 85,180 A 35 35 0 0 0 81,165" fill="none" stroke="#e67e22" stroke-width="2" />
          <text x="92" y="176" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#d35400">${alphaDeg}°</text>

          <!-- Ángulo beta (hacia D) -->
          <path d="M 105,180 A 55 55 0 0 0 94,151" fill="none" stroke="#27ae60" stroke-width="2" />
          <text x="110" y="162" font-family="sans-serif" font-size="12px" font-weight="bold" fill="#27ae60">${betaDeg}°</text>

          <!-- Vértices -->
          <circle cx="50" cy="180" r="4" fill="#2980b9" />
          <text x="36" y="198" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#2c3e50">A</text>
          <circle cx="300" cy="180" r="4" fill="#2980b9" />
          <text x="306" y="198" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#2c3e50">C</text>
          <circle cx="300" cy="115" r="4" fill="#2980b9" />
          <text x="306" y="120" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#2c3e50">B</text>
          <circle cx="300" cy="35" r="4" fill="#2980b9" />
          <text x="306" y="35" font-family="sans-serif" font-size="14px" font-weight="bold" fill="#2c3e50">D</text>

          <!-- Cota base AC -->
          <text x="175" y="202" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#2c3e50" text-anchor="middle">AC = ${b_dist}</text>

          <!-- Cotas verticales -->
          <text x="325" y="150" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#c0392b">h₁</text>
          <text x="325" y="75" font-family="sans-serif" font-size="13px" font-weight="bold" fill="#c0392b">y</text>
        </svg>
      `;

      descripcionHTML = `En la figura, desde el vértice $A$ se observan los puntos $B$ y $D$ sobre la misma perpendicular $CD$ con ángulos $\\alpha = ${alphaDeg}^\\circ$ y $\\beta = ${betaDeg}^\\circ$. La base mide $AC = ${b_dist}$ y el ángulo en $C$ es recto ($90^\\circ$).`;
      filaA = `Altura inferior $h_1 = BC$:`;
      filaB = `Altura total $h_{\\text{total}} = CD$:`;
      filaC = `Diferencia de altura $y = BD$:`;
      respImpresa = `a) $h_1 \\approx ${ansA}$, \\quad b) $h_{\\text{total}} \\approx ${ansB}$, \\quad c) $y \\approx ${ansC}$`;
    }

    const Pregunta = `
      ${i === 0 ? '<h2>Problemas multi-paso en triángulos rectángulos</h2><p>Responda los siguientes incisos redondeando cada valor a <b>3 cifras significativas</b>.</p>' : ''}
      <div class="pregunta-abierta" 
           data-ans-a="${ansA}" 
           data-ans-b="${ansB}" 
           data-ans-c="${ansC}" 
           style="display: none;">
        
        <p><b>${i + 1}.-</b> ${descripcionHTML} <span id="resultado_${i}" name="question"></span></p>
        
        <div style="display: flex; justify-content: center; margin: 10px 0;">
          ${svgHTML}
        </div>
        
        <table border="0" cellpadding="6" style="margin: 10px auto; font-size: 15px;">
          <tr>
            <td style="text-align: right;"><b>a)</b> ${filaA}</td>
            <td><math-field id="mf_a_${i}"></math-field> <span id="pista_a_${i}" style="color: #c0392b; font-weight: bold; margin-left: 8px;"></span></td>
          </tr>
          <tr>
            <td style="text-align: right;"><b>b)</b> ${filaB}</td>
            <td><math-field id="mf_b_${i}"></math-field> <span id="pista_b_${i}" style="color: #c0392b; font-weight: bold; margin-left: 8px;"></span></td>
          </tr>
          <tr>
            <td style="text-align: right;"><b>c)</b> ${filaC}</td>
            <td><math-field id="mf_c_${i}"></math-field> <span id="pista_c_${i}" style="color: #c0392b; font-weight: bold; margin-left: 8px;"></span></td>
          </tr>
        </table>
      </div>
    `;

    if (esImprimible) {
      return [Pregunta, respImpresa];
    }

    if (totalPreguntas - 1 === i) render(null, totalPreguntas);
    return Pregunta;

  } catch (error) {
    console.error('Error al generar la pregunta 7.3.1:', error);
  }
}

export async function render(container, n, code) {
  // Rutina de revisión automatizada para r2p_core
  window.accionR2P = function (i) {
    let totalPuntos = 3;
    let puntos = 0;

    const preguntas = document.getElementsByClassName('pregunta-abierta');
    const preguntaDiv = preguntas[i];
    if (!preguntaDiv) return [0, totalPuntos];

    const mfA = document.getElementById(`mf_a_${i}`);
    const mfB = document.getElementById(`mf_b_${i}`);
    const mfC = document.getElementById(`mf_c_${i}`);

    const pistaA = document.getElementById(`pista_a_${i}`);
    const pistaB = document.getElementById(`pista_b_${i}`);
    const pistaC = document.getElementById(`pista_c_${i}`);

    // Limpiar pistas previas
    if (pistaA) pistaA.textContent = '';
    if (pistaB) pistaB.textContent = '';
    if (pistaC) pistaC.textContent = '';

    const ansA_Esperado = parseFloat(preguntaDiv.dataset.ansA);
    const ansB_Esperado = parseFloat(preguntaDiv.dataset.ansB);
    const ansC_Esperado = parseFloat(preguntaDiv.dataset.ansC);

    const inputs = [
      { elem: mfA, pistaElem: pistaA, esperado: ansA_Esperado },
      { elem: mfB, pistaElem: pistaB, esperado: ansB_Esperado },
      { elem: mfC, pistaElem: pistaC, esperado: ansC_Esperado }
    ];

    let primeraIncorrectaMostrada = false;

    inputs.forEach(item => {
      if (!item.elem) return;
      const rawVal = item.elem.value.trim().replace(/,/g, '.');
      const val = parseFloat(rawVal);
      // Tolerancia: 2.5% o 0.3 absoluto para admitir pequeñas diferencias de redondeo estándar
      const tolerancia = Math.max(0.3, Math.abs(item.esperado * 0.025));

      if (!isNaN(val) && Math.abs(val - item.esperado) <= tolerancia) {
        item.elem.style.border = "3px solid #27ae60";
        item.elem.style.backgroundColor = "transparent";
        puntos++;
      } else {
        // Marcado de contorno rojo
        item.elem.style.border = "3px solid #e74c3c";
        item.elem.style.backgroundColor = "transparent";

        // Si es la primer casilla incorrecta, mostrar la respuesta correcta
        if (!primeraIncorrectaMostrada && item.pistaElem) {
          item.pistaElem.textContent = `Correcto: ${item.esperado}`;
          primeraIncorrectaMostrada = true;
        }
      }
    });

    return [puntos, totalPuntos];
  };
}
