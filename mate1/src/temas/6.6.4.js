import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Esferas y semiesferas: Área superficial y volumen (Abierta)';
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

// -------------------------------------------------------------
// Sub-problemas de Esferas y Semiesferas (Versión Abierta)
// -------------------------------------------------------------

// 1. Área superficial de una esfera dado el radio r
function subEsferaAreaRadio(i) {
  const r = Math.floor(Math.random() * 12) + 3;
  const areaExact = 4 * Math.PI * r * r;
  const ans3sf = roundTo3SF(areaExact);

  const html = `
    ${i === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${areaExact}" style="display: none;">
      <p>${i + 1}.- Una esfera tiene un radio de $r = ${r}\\text{ cm}$.</p>
      <p>Calcule el área superficial de la esfera ($A = 4\\pi r^2$). Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
      <table>
        <tr>
          <td>Área superficial: </td>
          <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> cm²</td>
        </tr>
      </table>
    </div>
  `;
  return { html, respuestaImprimible: `$${ans3sf}\\text{ cm}^2$` };
}

// 2. Área superficial de una esfera dado el diámetro d
function subEsferaAreaDiametro(i) {
  const d = (Math.floor(Math.random() * 10) + 3) * 2;
  const r = d / 2;
  const areaExact = 4 * Math.PI * r * r;
  const ans3sf = roundTo3SF(areaExact);

  const html = `
    ${i === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${areaExact}" style="display: none;">
      <p>${i + 1}.- Una esfera tiene un diámetro de $d = ${d}\\text{ cm}$.</p>
      <p>Determine el área superficial de la esfera. Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
      <table>
        <tr>
          <td>Área superficial: </td>
          <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> cm²</td>
        </tr>
      </table>
    </div>
  `;
  return { html, respuestaImprimible: `$${ans3sf}\\text{ cm}^2$` };
}

// 3. Despeje del radio r a partir del área superficial de la esfera A
function subEsferaRadioDesdeArea(i) {
  const rExact = Math.floor(Math.random() * 8) + 3;
  const area = roundTo3SF(4 * Math.PI * rExact * rExact);
  const rCalculado = Math.sqrt(area / (4 * Math.PI));
  const ans3sf = roundTo3SF(rCalculado);

  const html = `
    ${i === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${rCalculado}" style="display: none;">
      <p>${i + 1}.- Una esfera tiene un área superficial de $A = ${area}\\text{ cm}^2$.</p>
      <p>Calcule la longitud de su radio ($r$). Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
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

// 4. Área superficial total de una semiesfera SÓLIDA (curva + base plana circular)
function subSemiesferaAreaSolida(i) {
  const r = Math.floor(Math.random() * 8) + 3;
  const areaTotal = 3 * Math.PI * r * r;
  const ans3sf = roundTo3SF(areaTotal);

  const html = `
    ${i === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${areaTotal}" style="display: none;">
      <p>${i + 1}.- Considere una semiesfera sólida de radio $r = ${r}\\text{ cm}$.</p>
      <p>Calcule el área superficial total de la semiesfera (incluyendo la superficie curva y su base plana circular). Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
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

// 5. Área superficial exterior de un tazón / semiesfera HUECA (sin tapa)
function subSemiesferaAreaHueca(i) {
  const r = Math.floor(Math.random() * 8) + 4;
  const areaCurva = 2 * Math.PI * r * r;
  const ans3sf = roundTo3SF(areaCurva);

  const html = `
    ${i === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${areaCurva}" style="display: none;">
      <p>${i + 1}.- Un recipiente semiesférico hueco (abierto por la parte superior) tiene un radio exterior de $r = ${r}\\text{ cm}$.</p>
      <p>Calcule el área de la superficie exterior curva de este recipiente. Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
      <table>
        <tr>
          <td>Área curva exterior: </td>
          <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> cm²</td>
        </tr>
      </table>
    </div>
  `;
  return { html, respuestaImprimible: `$${ans3sf}\\text{ cm}^2$` };
}

// 6. Volumen de una esfera dado el radio r
function subEsferaVolumenRadio(i) {
  const r = Math.floor(Math.random() * 8) + 3;
  const volExact = (4 / 3) * Math.PI * Math.pow(r, 3);
  const ans3sf = roundTo3SF(volExact);

  const html = `
    ${i === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${volExact}" style="display: none;">
      <p>${i + 1}.- Una bola esférica tiene un radio de $r = ${r}\\text{ cm}$.</p>
      <p>Calcule el volumen de la esfera ($V = \\frac{4}{3}\\pi r^3$). Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
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

// 7. Volumen de una esfera dado el diámetro d
function subEsferaVolumenDiametro(i) {
  const d = (Math.floor(Math.random() * 8) + 3) * 2;
  const r = d / 2;
  const volExact = (4 / 3) * Math.PI * Math.pow(r, 3);
  const ans3sf = roundTo3SF(volExact);

  const html = `
    ${i === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${volExact}" style="display: none;">
      <p>${i + 1}.- Un globo meteorológico esférico tiene un diámetro de $d = ${d}\\text{ cm}$.</p>
      <p>Calcule su volumen. Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
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

// 8. Despeje del radio r a partir del volumen de la esfera V
function subEsferaRadioDesdeVolumen(i) {
  const rExact = Math.floor(Math.random() * 7) + 3;
  const vol = roundTo3SF((4 / 3) * Math.PI * Math.pow(rExact, 3));
  const rCalculado = Math.cbrt((3 * vol) / (4 * Math.PI));
  const ans3sf = roundTo3SF(rCalculado);

  const html = `
    ${i === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${rCalculado}" style="display: none;">
      <p>${i + 1}.- Una esfera tiene un volumen de $V = ${vol}\\text{ cm}^3$.</p>
      <p>Calcule la longitud de su radio ($r$). Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
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

// 9. Volumen de una semiesfera dado el radio r
function subSemiesferaVolumen(i) {
  const r = Math.floor(Math.random() * 8) + 3;
  const volExact = (2 / 3) * Math.PI * Math.pow(r, 3);
  const ans3sf = roundTo3SF(volExact);

  const html = `
    ${i === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${volExact}" style="display: none;">
      <p>${i + 1}.- Un domo semiesférico tiene un radio de $r = ${r}\\text{ cm}$.</p>
      <p>Calcule el volumen de espacio interior de la semiesfera ($V = \\frac{2}{3}\\pi r^3$). Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
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

// 10. Despeje del radio r a partir del volumen de una semiesfera V
function subSemiesferaRadioDesdeVolumen(i) {
  const rExact = Math.floor(Math.random() * 7) + 3;
  const vol = roundTo3SF((2 / 3) * Math.PI * Math.pow(rExact, 3));
  const rCalculado = Math.cbrt((3 * vol) / (2 * Math.PI));
  const ans3sf = roundTo3SF(rCalculado);

  const html = `
    ${i === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${rCalculado}" style="display: none;">
      <p>${i + 1}.- Una semiesfera tiene un volumen de $V = ${vol}\\text{ cm}^3$.</p>
      <p>Calcule la longitud de su radio ($r$). Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
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

// 11. Relación compuesta: Cono con tope semiesférico
function subCompuestoConoSemiesfera(i) {
  const r = Math.floor(Math.random() * 4) + 3;
  const hCono = Math.floor(Math.random() * 6) + 6;

  const volCono = (1 / 3) * Math.PI * r * r * hCono;
  const volSemiesfera = (2 / 3) * Math.PI * Math.pow(r, 3);
  const volTotal = volCono + volSemiesfera;
  const ans3sf = roundTo3SF(volTotal);

  const html = `
    ${i === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${volTotal}" style="display: none;">
      <p>${i + 1}.- Un sólido compuesto está formado por un cono de radio de base $r = ${r}\\text{ cm}$ y altura perpendicular $h = ${hCono}\\text{ cm}$, coronado en su base superior por una semiesfera del mismo radio $r = ${r}\\text{ cm}$.</p>
      <p>Calcule el volumen total de este cuerpo compuesto. Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
      <table>
        <tr>
          <td>Volumen total: </td>
          <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> cm³</td>
        </tr>
      </table>
    </div>
  `;
  return { html, respuestaImprimible: `$${ans3sf}\\text{ cm}^3$` };
}

// 12. Relación compuesta: Cilindro con dos extremos semiesféricos (cápsula)
function subCompuestoCapsulaVolumen(i) {
  const r = Math.floor(Math.random() * 4) + 2;
  const hCil = Math.floor(Math.random() * 8) + 6;

  const volCilindro = Math.PI * r * r * hCil;
  const volExtremos = (4 / 3) * Math.PI * Math.pow(r, 3);
  const volTotal = volCilindro + volExtremos;
  const ans3sf = roundTo3SF(volTotal);

  const html = `
    ${i === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <div class="pregunta-abierta" data-ans="${ans3sf}" data-exact="${volTotal}" style="display: none;">
      <p>${i + 1}.- Un depósito cerrado en forma de cápsula está compuesto por una sección central cilíndrica de radio $r = ${r}\\text{ cm}$ y longitud $h = ${hCil}\\text{ cm}$, cerrada en cada uno de sus dos extremos por una semiesfera de radio $r = ${r}\\text{ cm}$.</p>
      <p>Calcule el volumen total del depósito. Redondee su respuesta a 3 cifras significativas. <span id="resultado_${i}" name="question"></span></p>
      <table>
        <tr>
          <td>Volumen total: </td>
          <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span> cm³</td>
        </tr>
      </table>
    </div>
  `;
  return { html, respuestaImprimible: `$${ans3sf}\\text{ cm}^3$` };
}

// -------------------------------------------------------------
// Función Principal Exportada
// -------------------------------------------------------------
export async function pregunta(i, totalPreguntas, esImprimible = false) {
  try {
    const generadores = [
      subEsferaAreaRadio,
      subEsferaAreaDiametro,
      subEsferaRadioDesdeArea,
      subSemiesferaAreaSolida,
      subSemiesferaAreaHueca,
      subEsferaVolumenRadio,
      subEsferaVolumenDiametro,
      subEsferaRadioDesdeVolumen,
      subSemiesferaVolumen,
      subSemiesferaRadioDesdeVolumen,
      subCompuestoConoSemiesfera,
      subCompuestoCapsulaVolumen
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
    console.error('Error al generar la pregunta 6.6.4:', error);
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
