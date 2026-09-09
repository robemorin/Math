import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Anualidades, préstamos y amortizaciones (Abierta)';
}

export function tipo() {
  return 3; // 3 - Abierto interactivo
}

export async function pregunta(i, totalPreguntas, esImprimible = false) {
  try {
    const escenario = Math.floor(Math.random() * 3);

    let Pregunta = '';
    let resultadoExacto = 0;

    if (escenario === 0) {
      // PRÉSTAMO / AMORTIZACIÓN -> Hallar PMT
      const conceptos = ['un préstamo personal', 'un crédito automotriz', 'un préstamo hipotecario'];
      const concepto = conceptos[Math.floor(Math.random() * conceptos.length)];
      
      const prestamo = (Math.floor(Math.random() * 15) + 5) * 2000;
      const tasa = (Math.floor(Math.random() * 8) + 6);
      const anios = Math.floor(Math.random() * 4) + 2;
      const N = anios * 12;

      resultadoExacto = Math.abs(tlacu.financiera(N, tasa, prestamo, null, 0, 12, 12));

      Pregunta = `
        <div class="pregunta-abierta" data-escenario="0" data-n="${N}" data-tasa="${tasa}" data-pv="${prestamo}" data-pmt="0" data-fv="0" style="display: none;">
          <p>${i + 1}.- Una persona solicita <strong>${concepto}</strong> por un monto de <strong>$${prestamo.toLocaleString('en-US')}</strong> a una tasa de interés del <strong>${tasa}%</strong> anual compuesto mensualmente, que liquidará en cuotas mensuales iguales durante <strong>${anios}</strong> años. <span id="resultado_${i}" name="question"></span></p>
          <p>Calcula el pago mensual ($PMT$) que debe realizar (redondea a dos cifras decimales):</p>
          
          <table>
            <tr>
              <td>Pago mensual ($PMT$): $</td>
              <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span></td>
            </tr>
          </table>
        </div>
      `;
    } else if (escenario === 1) {
      // PLAN DE AHORRO / ANUALIDAD -> Hallar FV
      const ahorroInicial = Math.random() < 0.5 ? (Math.floor(Math.random() * 5) + 1) * 1000 : 0;
      const depositoMensual = (Math.floor(Math.random() * 8) + 2) * 100;
      const tasa = (Math.floor(Math.random() * 8) + 4) / 2;
      const anios = Math.floor(Math.random() * 6) + 3;
      const N = anios * 12;

      resultadoExacto = Math.abs(tlacu.financiera(N, tasa, -ahorroInicial, -depositoMensual, null, 12, 12));
      const textoInicial = ahorroInicial > 0 ? `un depósito inicial de <strong>$${ahorroInicial.toLocaleString('en-US')}</strong> y ` : '';

      Pregunta = `
        
        <div class="pregunta-abierta" data-escenario="1" data-n="${N}" data-tasa="${tasa}" data-pv="${-ahorroInicial}" data-pmt="${-depositoMensual}" data-fv="0" style="display: none;">
          <p>${i + 1}.- Para crear un fondo de ahorro, se realiza ${textoInicial}depósitos mensuales de <strong>$${depositoMensual.toLocaleString('en-US')}</strong> al final de cada mes en una cuenta que ofrece el <strong>${tasa}%</strong> anual compuesto mensualmente. <span id="resultado_${i}" name="question"></span></p>
          <p>Calcula el monto acumulado en la cuenta después de <strong>${anios}</strong> años (redondea a dos cifras decimales):</p>
          
          <table>
            <tr>
              <td>Monto acumulado ($FV$): $</td>
              <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span></td>
            </tr>
          </table>
        </div>
      `;
    } else {
      // CAPACIDAD DE FINANCIAMIENTO -> Hallar PV
      const cuota = (Math.floor(Math.random() * 6) + 3) * 100;
      const tasa = (Math.floor(Math.random() * 7) + 6);
      const anios = Math.floor(Math.random() * 3) + 3;
      const N = anios * 12;

      resultadoExacto = Math.abs(tlacu.financiera(N, tasa, null, -cuota, 0, 12, 12));

      Pregunta = `
        
        <div class="pregunta-abierta" data-escenario="2" data-n="${N}" data-tasa="${tasa}" data-pv="0" data-pmt="${-cuota}" data-fv="0" style="display: none;">
          <p>${i + 1}.- Un comprador puede pagar como máximo <strong>$${cuota.toLocaleString('en-US')}</strong> mensuales para adquirir un bien financiado a <strong>${anios}</strong> años con una tasa del <strong>${tasa}%</strong> anual compuesto mensualmente. <span id="resultado_${i}" name="question"></span></p>
          <p>Determina el monto máximo del préstamo ($PV$) que puede solicitar (redondea a dos cifras decimales):</p>
          
          <table>
            <tr>
              <td>Monto del préstamo ($PV$): $</td>
              <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span></td>
            </tr>
          </table>
        </div>
      `;
    }

    const ansCorrect = resultadoExacto.toFixed(2);

    if (esImprimible) {
      return [Pregunta, `$${ansCorrect}$`];
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

    const escenario = parseInt(pregunta[i].dataset.escenario);
    const N = parseFloat(pregunta[i].dataset.n);
    const tasa = parseFloat(pregunta[i].dataset.tasa);
    const pv = parseFloat(pregunta[i].dataset.pv);
    const pmt = parseFloat(pregunta[i].dataset.pmt);

    let resultadoExacto = 0;
    if (escenario === 0) {
      resultadoExacto = Math.abs(tlacu.financiera(N, tasa, pv, null, 0, 12, 12));
    } else if (escenario === 1) {
      resultadoExacto = Math.abs(tlacu.financiera(N, tasa, pv, pmt, null, 12, 12));
    } else {
      resultadoExacto = Math.abs(tlacu.financiera(N, tasa, null, pmt, 0, 12, 12));
    }

    const ansCorrectStr = resultadoExacto.toFixed(2);
    const ansCorrect = parseFloat(ansCorrectStr);

    let respuestaStr = mathFields[0].value.trim();
    let respuestaVal = parseFloat(respuestaStr.replace(/,/g, '.'));

    if (isNaN(respuestaVal)) {
      mathFields[0].style.backgroundColor = "#ffcccc";
      return [puntos, totalPuntos];
    }

    const errorAbsoluto = Math.abs(respuestaVal - ansCorrect);
    const errorRelativo = Math.abs(respuestaVal - resultadoExacto) / resultadoExacto;

    if (errorAbsoluto <= 0.1 || errorRelativo < 0.001) {
      puntos++;
      mathFields[0].style.border = "solid 5px green";
      mathFields[0].style.backgroundColor = "#e2fbe2";
    } else {
      mathFields[0].style.border = "solid 5px red";
      document.getElementById(`error_${i}`).textContent = ` Correcto: $${ansCorrectStr}`;
    }

    return [puntos, totalPuntos];
  };
}
