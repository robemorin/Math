import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Prismas, pirámides, conos y cilindros: Área superficial y volumen (Abierta)';
}

export function tipo() {
  return 3; // 3 - Abierto interactivo con math-field
}

// Función para redondear a 3 cifras significativas (estándar IB)
function roundTo3SF(num) {
  if (num === 0 || !isFinite(num) || isNaN(num)) return 0;
  let d = Math.ceil(Math.log10(Math.abs(num)));
  let power = 3 - d;
  let magnitude = Math.pow(10, power);
  let shifted = Math.round(num * magnitude);
  return shifted / magnitude;
}

// Funciones auxiliares geométricas
function regularPolygonArea(n, s) {
  return (n * s * s) / (4 * Math.tan(Math.PI / n));
}

function regularPolygonPerimeter(n, s) {
  return n * s;
}

// -------------------------------------------------------------
// Sub-problemas (versión abierta)
// -------------------------------------------------------------

function subPrismaVolumen(i) {
  const polyNames = { 3: 'triangular regular', 4: 'cuadrangular regular', 5: 'pentagonal regular', 6: 'hexagonal regular', 8: 'octagonal regular' };
  const nLados = [3, 4, 5, 6, 8][Math.floor(Math.random() * 5)];
  const s = Math.floor(Math.random() * 7) + 3;
  const h = Math.floor(Math.random() * 9) + 4;

  const aBase = regularPolygonArea(nLados, s);
  const volExact = aBase * h;
  const ans3sf = roundTo3SF(volExact);

  const html = `
    <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${volExact}" style="display: none;">
      <p>${i + 1}.- Considere un prisma ${polyNames[nLados]} recto cuya base tiene lados de longitud $s = ${s}\\text{ cm}$ y su altura es $h = ${h}\\text{ cm}$.</p>
      <p>Calcule el volumen de dicho prisma. Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
      <table>
        <tr>
          <td>Volumen: </td>
          <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> cm³</td>
        </tr>
      </table>
    </div>
  `;
  return { html, respuestaImprimible: `$${ans3sf}\\text{ cm}^3$` };
}

function subPrismaLado(i) {
  const polyNames = { 3: 'triangular regular', 4: 'cuadrangular regular', 5: 'pentagonal regular', 6: 'hexagonal regular' };
  const nLados = [3, 4, 5, 6][Math.floor(Math.random() * 4)];
  const sExact = Math.floor(Math.random() * 6) + 3;
  const h = Math.floor(Math.random() * 8) + 4;

  const aBase = regularPolygonArea(nLados, sExact);
  const vol = roundTo3SF(aBase * h);
  const sCalculado = Math.sqrt((4 * vol * Math.tan(Math.PI / nLados)) / (nLados * h));
  const ans3sf = roundTo3SF(sCalculado);

  const html = `
    <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${sCalculado}" style="display: none;">
      <p>${i + 1}.- Un prisma ${polyNames[nLados]} recto tiene un volumen de $V = ${vol}\\text{ cm}^3$ y una altura de $h = ${h}\\text{ cm}$.</p>
      <p>Determine la longitud del lado de la base ($s$). Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
      <table>
        <tr>
          <td>Lado de la base ($s$): </td>
          <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> cm</td>
        </tr>
      </table>
    </div>
  `;
  return { html, respuestaImprimible: `$${ans3sf}\\text{ cm}$` };
}

function subPrismaAltura(i) {
  const polyNames = { 3: 'triangular regular', 4: 'cuadrangular regular', 5: 'pentagonal regular', 6: 'hexagonal regular' };
  const nLados = [3, 4, 5, 6][Math.floor(Math.random() * 4)];
  const s = Math.floor(Math.random() * 6) + 3;
  const hExact = Math.floor(Math.random() * 8) + 5;

  const aBase = regularPolygonArea(nLados, s);
  const vol = roundTo3SF(aBase * hExact);
  const hCalculado = vol / regularPolygonArea(nLados, s);
  const ans3sf = roundTo3SF(hCalculado);

  const html = `
    <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${hCalculado}" style="display: none;">
      <p>${i + 1}.- Un prisma ${polyNames[nLados]} recto cuenta con una base cuyos lados miden $s = ${s}\\text{ cm}$. Si el volumen total del prisma es de $V = ${vol}\\text{ cm}^3$,</p>
      <p>calcule la altura ($h$) del prisma. Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
      <table>
        <tr>
          <td>Altura ($h$): </td>
          <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> cm</td>
        </tr>
      </table>
    </div>
  `;
  return { html, respuestaImprimible: `$${ans3sf}\\text{ cm}$` };
}

function subPrismaSuperficie(i) {
  const polyNames = { 3: 'triangular regular', 4: 'cuadrangular regular', 5: 'pentagonal regular', 6: 'hexagonal regular' };
  const nLados = [3, 4, 5, 6][Math.floor(Math.random() * 4)];
  const s = Math.floor(Math.random() * 6) + 3;
  const h = Math.floor(Math.random() * 9) + 4;

  const aBase = regularPolygonArea(nLados, s);
  const perim = regularPolygonPerimeter(nLados, s);
  const areaTotal = 2 * aBase + perim * h;
  const ans3sf = roundTo3SF(areaTotal);

  const html = `
    <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${areaTotal}" style="display: none;">
      <p>${i + 1}.- Calcule el área superficial total de un prisma ${polyNames[nLados]} recto cerrado con lado de la base $s = ${s}\\text{ cm}$ y altura $h = ${h}\\text{ cm}$.</p>
      <p>Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
      <table>
        <tr>
          <td>Área superficial total: </td>
          <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> cm²</td>
        </tr>
      </table>
    </div>
  `;
  return { html, respuestaImprimible: `$${ans3sf}\\text{ cm}^2$` };
}

function subPiramideVolumen(i) {
  const polyNames = { 3: 'triangular regular (tetraedro)', 4: 'base cuadrada', 6: 'base hexagonal regular' };
  const nLados = [3, 4, 6][Math.floor(Math.random() * 3)];
  const s = Math.floor(Math.random() * 6) + 4;
  const h = Math.floor(Math.random() * 8) + 6;

  const aBase = regularPolygonArea(nLados, s);
  const vol = (1 / 3) * aBase * h;
  const ans3sf = roundTo3SF(vol);

  const html = `
    <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${vol}" style="display: none;">
      <p>${i + 1}.- Una pirámide recta de ${polyNames[nLados]} tiene un lado de la base de $s = ${s}\\text{ cm}$ y una altura perpendicular de $h = ${h}\\text{ cm}$.</p>
      <p>Calcule el volumen de la pirámide. Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
      <table>
        <tr>
          <td>Volumen: </td>
          <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> cm³</td>
        </tr>
      </table>
    </div>
  `;
  return { html, respuestaImprimible: `$${ans3sf}\\text{ cm}^3$` };
}

function subPiramideSuperficie(i) {
  const s = (Math.floor(Math.random() * 5) + 3) * 2;
  const h = Math.floor(Math.random() * 7) + 5;

  const semiLado = s / 2;
  const slant = Math.sqrt(h * h + semiLado * semiLado);
  const aBase = s * s;
  const areaTotal = aBase + 2 * s * slant;
  const ans3sf = roundTo3SF(areaTotal);

  const html = `
    <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${areaTotal}" style="display: none;">
      <p>${i + 1}.- Una pirámide recta de base cuadrada tiene lados en su base de $s = ${s}\\text{ cm}$ y una altura perpendicular de $h = ${h}\\text{ cm}$.</p>
      <p>Determine el área superficial total de la pirámide (incluyendo la base). Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
      <table>
        <tr>
          <td>Área superficial total: </td>
          <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> cm²</td>
        </tr>
      </table>
    </div>
  `;
  return { html, respuestaImprimible: `$${ans3sf}\\text{ cm}^2$` };
}

function subCilindroRadio(i) {
  const rExact = Math.floor(Math.random() * 6) + 3;
  const h = Math.floor(Math.random() * 8) + 5;

  const vol = roundTo3SF(Math.PI * rExact * rExact * h);
  const rCalculado = Math.sqrt(vol / (Math.PI * h));
  const ans3sf = roundTo3SF(rCalculado);

  const html = `
    <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${rCalculado}" style="display: none;">
      <p>${i + 1}.- Un cilindro circular recto tiene un volumen de $V = ${vol}\\text{ cm}^3$ y una altura de $h = ${h}\\text{ cm}$.</p>
      <p>Calcule el radio ($r$) de la base del cilindro. Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
      <table>
        <tr>
          <td>Radio ($r$): </td>
          <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> cm</td>
        </tr>
      </table>
    </div>
  `;
  return { html, respuestaImprimible: `$${ans3sf}\\text{ cm}$` };
}

function subCilindroAlturaDesdeArea(i) {
  const r = Math.floor(Math.random() * 5) + 3;
  const hExact = Math.floor(Math.random() * 7) + 5;

  const areaTotal = roundTo3SF(2 * Math.PI * r * hExact + 2 * Math.PI * r * r);
  const hCalculado = (areaTotal - 2 * Math.PI * r * r) / (2 * Math.PI * r);
  const ans3sf = roundTo3SF(hCalculado);

  const html = `
    <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${hCalculado}" style="display: none;">
      <p>${i + 1}.- Un cilindro cerrado tiene un área superficial total de $A = ${areaTotal}\\text{ cm}^2$ y un radio de base $r = ${r}\\text{ cm}$.</p>
      <p>Calcule la altura ($h$) del cilindro. Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
      <table>
        <tr>
          <td>Altura ($h$): </td>
          <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> cm</td>
        </tr>
      </table>
    </div>
  `;
  return { html, respuestaImprimible: `$${ans3sf}\\text{ cm}$` };
}

function subConoVolumen(i) {
  const r = Math.floor(Math.random() * 5) + 3;
  const h = Math.floor(Math.random() * 7) + 6;

  const vol = (1 / 3) * Math.PI * r * r * h;
  const ans3sf = roundTo3SF(vol);

  const html = `
    <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${vol}" style="display: none;">
      <p>${i + 1}.- Un cono circular recto tiene un radio en la base de $r = ${r}\\text{ cm}$ y una altura perpendicular de $h = ${h}\\text{ cm}$.</p>
      <p>Calcule el volumen del cono. Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
      <table>
        <tr>
          <td>Volumen: </td>
          <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> cm³</td>
        </tr>
      </table>
    </div>
  `;
  return { html, respuestaImprimible: `$${ans3sf}\\text{ cm}^3$` };
}

function subConoSuperficie(i) {
  const ternas = [
    { r: 3, h: 4 },
    { r: 5, h: 12 },
    { r: 6, h: 8 },
    { r: 8, h: 15 },
    { r: 7, h: 10 },
    { r: 4, h: 7 }
  ];
  const choice = ternas[Math.floor(Math.random() * ternas.length)];
  const r = choice.r;
  const h = choice.h;

  const sGeneratriz = Math.sqrt(r * r + h * h);
  const areaTotal = Math.PI * r * r + Math.PI * r * sGeneratriz;
  const ans3sf = roundTo3SF(areaTotal);

  const html = `
    <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${areaTotal}" style="display: none;">
      <p>${i + 1}.- Un cono circular recto cerrado tiene un radio de base de $r = ${r}\\text{ cm}$ y una altura perpendicular de $h = ${h}\\text{ cm}$.</p>
      <p>Calcule el área superficial total del cono ($A = \\pi r s + \\pi r^2$, donde $s$ es la generatriz). Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
      <table>
        <tr>
          <td>Área superficial total: </td>
          <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> cm²</td>
        </tr>
      </table>
    </div>
  `;
  return { html, respuestaImprimible: `$${ans3sf}\\text{ cm}^2$` };
}

function subPrismaTriangularRecto(i) {
  const a = Math.floor(Math.random() * 5) + 3;
  const b = Math.floor(Math.random() * 5) + 4;
  const c = Math.sqrt(a * a + b * b);
  const h = Math.floor(Math.random() * 8) + 5;

  const aBase = 0.5 * a * b;
  const perim = a + b + c;
  const areaTotal = 2 * aBase + perim * h;
  const vol = aBase * h;

  const pedirVolumen = Math.random() < 0.5;

  if (pedirVolumen) {
    const ans3sf = roundTo3SF(vol);
    const html = `
      <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${vol}" style="display: none;">
        <p>${i + 1}.- Considere un prisma triangular recto cuyas bases son triángulos rectángulos con catetos de longitud $a = ${a}\\text{ cm}$ y $b = ${b}\\text{ cm}$. La longitud (altura del prisma) es $h = ${h}\\text{ cm}$.</p>
        <p>Calcule el volumen de este prisma. Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
        <table>
          <tr>
            <td>Volumen: </td>
            <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> cm³</td>
          </tr>
        </table>
      </div>
    `;
    return { html, respuestaImprimible: `$${ans3sf}\\text{ cm}^3$` };
  } else {
    const ans3sf = roundTo3SF(areaTotal);
    const html = `
      <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${areaTotal}" style="display: none;">
        <p>${i + 1}.- Considere un prisma triangular recto cerrado cuyas bases son triángulos rectángulos con catetos de longitud $a = ${a}\\text{ cm}$ y $b = ${b}\\text{ cm}$. La longitud (altura del prisma) es $h = ${h}\\text{ cm}$.</p>
        <p>Calcule el área superficial total del prisma. Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
        <table>
          <tr>
            <td>Área superficial total: </td>
            <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> cm²</td>
          </tr>
        </table>
      </div>
    `;
    return { html, respuestaImprimible: `$${ans3sf}\\text{ cm}^2$` };
  }
}

function subConoAltura(i) {
  const r = Math.floor(Math.random() * 5) + 3;
  const hExact = Math.floor(Math.random() * 7) + 5;

  const vol = roundTo3SF((1 / 3) * Math.PI * r * r * hExact);
  const hCalculado = (3 * vol) / (Math.PI * r * r);
  const ans3sf = roundTo3SF(hCalculado);

  const html = `
    <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${hCalculado}" style="display: none;">
      <p>${i + 1}.- Un cono circular recto tiene un volumen de $V = ${vol}\\text{ cm}^3$ y el radio de su base mide $r = ${r}\\text{ cm}$.</p>
      <p>Determine la altura perpendicular ($h$) del cono. Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
      <table>
        <tr>
          <td>Altura perpendicular ($h$): </td>
          <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> cm</td>
        </tr>
      </table>
    </div>
  `;
  return { html, respuestaImprimible: `$${ans3sf}\\text{ cm}$` };
}

// -------------------------------------------------------------
// Función Principal Exportada
// -------------------------------------------------------------
export async function pregunta(i, totalPreguntas, esImprimible = false) {
  try {
    const generadores = [
      subPrismaVolumen,
      subPrismaLado,
      subPrismaAltura,
      subPrismaSuperficie,
      subPiramideVolumen,
      subPiramideSuperficie,
      subCilindroRadio,
      subCilindroAlturaDesdeArea,
      subConoVolumen,
      subConoSuperficie,
      subPrismaTriangularRecto,
      subConoAltura
    ];

    const seleccionador = Math.floor(Math.random() * generadores.length);
    const ejercicio = generadores[seleccionador](i);

    if (esImprimible) {
      return [ejercicio.html, ejercicio.respuestaImprimible];
    }

    if (totalPreguntas - 1 === i) {
      render(null, totalPreguntas);
    }

    return ejercicio.html;

  } catch (error) {
    console.error('Error al generar la pregunta 6.6.2:', error);
  }
}

export async function render(container, n, code) {
  window.accionR2P = function (i) {
    let totalPuntos = 1;
    let puntos = 0;
    let preguntas = document.getElementsByClassName('pregunta-abierta');
    const mathFields = preguntas[i].getElementsByTagName('math-field');

    const ans3sf = parseFloat(preguntas[i].dataset.ans);
    const ansExact = parseFloat(preguntas[i].dataset.exact);

    let respuestaStr = mathFields[0].value.trim();
    let respuestaVal = parseFloat(respuestaStr.replace(/,/g, '.'));

    if (isNaN(respuestaVal)) {
      mathFields[0].style.backgroundColor = "#ffcccc";
      return [puntos, totalPuntos];
    }

    // Criterio de tolerancia IB: 3 cifras significativas o error relativo < 1.5%
    const errorRelativo = Math.abs(respuestaVal - ansExact) / ansExact;
    const errorAbsoluto3SF = Math.abs(respuestaVal - ans3sf);

    if (errorAbsoluto3SF < 0.05 || errorRelativo < 0.015) {
      puntos++;
      mathFields[0].style.border = "solid 5px green";
      mathFields[0].style.backgroundColor = "#e2fbe2";
    } else {
      mathFields[0].style.border = "solid 5px red";
      const errSpan = document.getElementById(`error_${i}`);
      if (errSpan) {
        errSpan.textContent = ` Correcto: ${ans3sf}`;
      }
    }

    return [puntos, totalPuntos];
  };
}
