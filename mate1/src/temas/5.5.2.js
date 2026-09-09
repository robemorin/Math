import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Interés compuesto y depreciación (Abierta)';
}

export function tipo() {
  return 3; // 3 - Abierto interactivo
}

export async function pregunta(i, totalPreguntas, esImprimible = false) {
  try {
    const esInteres = Math.random() < 0.5;

    let capital, tasa, anios, exacto, Pregunta, k = 1;

    if (esInteres) {
      const tiposFreq = [
        { nombre: 'anualmente', k: 1 },
        { nombre: 'semestralmente', k: 2 },
        { nombre: 'trimestralmente', k: 4 },
        { nombre: 'mensualmente', k: 12 },
        { nombre: 'diariamente', k: 365 }
      ];
      const freq = tiposFreq[Math.floor(Math.random() * tiposFreq.length)];
      k = freq.k;
      capital = (Math.floor(Math.random() * 18) + 3) * 1000;
      tasa = (Math.floor(Math.random() * 14) + 6) / 2;
      anios = Math.floor(Math.random() * 8) + 3;
      const N = anios * k;

      exacto = Math.abs(tlacu.financiera(N, tasa, -capital, 0, null, k, k));

      Pregunta = `
        <div class="pregunta-abierta" data-tipo="interes" data-capital="${capital}" data-tasa="${tasa}" data-anios="${anios}" data-k="${k}" style="display: none;">
          <p>${i + 1}.- Se invierte una cantidad de <strong>$${capital.toLocaleString('en-US')}</strong> a una tasa de interés compuesto del <strong>${tasa}%</strong> anual, capitalizable <strong>${freq.nombre}</strong> durante <strong>${anios}</strong> años. <span id="resultado_${i}" name="question"></span></p>
          <p>Calcula el valor final acumulado de la inversión (redondea a dos cifras decimales):</p>
          
          <table>
            <tr>
              <td>Valor final ($FV$): $</td>
              <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span></td>
            </tr>
          </table>
        </div>
      `;
    } else {
      const bienes = [
        { nombre: 'un automóvil nuevo', min: 18000, max: 45000, tasaMin: 12, tasaMax: 20 },
        { nombre: 'equipo de cómputo para oficina', min: 8000, max: 25000, tasaMin: 15, tasaMax: 30 },
        { nombre: 'maquinaria industrial', min: 30000, max: 80000, tasaMin: 8, tasaMax: 16 },
        { nombre: 'un dron profesional', min: 2500, max: 7000, tasaMin: 14, tasaMax: 25 }
      ];
      const item = bienes[Math.floor(Math.random() * bienes.length)];
      capital = (Math.floor(Math.random() * ((item.max - item.min) / 1000 + 1)) * 1000) + item.min;
      tasa = Math.floor(Math.random() * (item.tasaMax - item.tasaMin + 1)) + item.tasaMin;
      anios = Math.floor(Math.random() * 5) + 3;

      exacto = capital * Math.pow(1 - tasa / 100, anios);

      Pregunta = `
        
        <div class="pregunta-abierta" data-tipo="depreciacion" data-capital="${capital}" data-tasa="${tasa}" data-anios="${anios}" data-k="1" style="display: none;">
          <p>${i + 1}.- Se adquiere ${item.nombre} por un valor de <strong>$${capital.toLocaleString('en-US')}</strong>. Si su valor se deprecia anualmente a una tasa constante del <strong>${tasa}%</strong>, calcula su valor residual al cabo de <strong>${anios}</strong> años (redondea a dos cifras decimales). <span id="resultado_${i}" name="question"></span></p>
          
          <table>
            <tr>
              <td>Valor residual ($FV$): $</td>
              <td><math-field id="input_${i}"></math-field><span id="error_${i}"></span></td>
            </tr>
          </table>
        </div>
      `;
    }

    const ansCorrect = exacto.toFixed(2);

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

    const tipo = pregunta[i].dataset.tipo;
    const capital = parseFloat(pregunta[i].dataset.capital);
    const tasa = parseFloat(pregunta[i].dataset.tasa);
    const anios = parseFloat(pregunta[i].dataset.anios);
    const k = parseFloat(pregunta[i].dataset.k);

    let exacto;
    if (tipo === 'interes') {
      const N = anios * k;
      exacto = Math.abs(tlacu.financiera(N, tasa, -capital, 0, null, k, k));
    } else {
      exacto = capital * Math.pow(1 - tasa / 100, anios);
    }

    const ansCorrectStr = exacto.toFixed(2);
    const ansCorrect = parseFloat(ansCorrectStr);

    let respuestaStr = mathFields[0].value.trim();
    let respuestaVal = parseFloat(respuestaStr.replace(/,/g, '.'));

    if (isNaN(respuestaVal)) {
      mathFields[0].style.backgroundColor = "#ffcccc";
      return [puntos, totalPuntos];
    }

    const errorAbsoluto = Math.abs(respuestaVal - ansCorrect);
    const errorRelativo = Math.abs(respuestaVal - exacto) / exacto;

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
