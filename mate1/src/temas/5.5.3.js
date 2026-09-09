import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Anualidades, préstamos y amortizaciones';
}

export function tipo() {
  return 0; // 0 - Opción múltiple
}

function roundTo3SF(num) {ndo
  if (num === 0) return 0;
  let d = Math.ceil(Math.log10(Math.abs(num)));
  let power = 3 - d;
  let magnitude = Math.pow(10, power);
  let shifted = Math.round(num * magnitude);
  return shifted / magnitude;
}

export async function pregunta(numeroPregunta) {
  try {
    // 3 escenarios contextualizados con PMT != 0:
    // 0: Préstamo / Hipoteca (Buscar cuota mensual PMT dado el valor del préstamo PV y FV=0)
    // 1: Plan de Ahorro / Anualidad (Buscar valor futuro acumulado FV dados depósitos mensuales regulares PMT, con o sin depósito inicial PV)
    // 2: Capacidad de Crédito (Buscar valor del préstamo PV que se puede costear con una cuota mensual fija PMT)
    const escenario = Math.floor(Math.random() * 3);

    let P = '';
    let resultadoExacto = 0;
    let variableNombre = '';
    let unidadSigno = '$';

    if (escenario === 0) {
      // PRÉSTAMO / AMORTIZACIÓN -> Hallar PMT
      variableNombre = 'cuota mensual';
      const conceptos = ['un préstamo personal', 'un crédito automotriz', 'un préstamo hipotecario'];
      const concepto = conceptos[Math.floor(Math.random() * conceptos.length)];
      
      const prestamo = (Math.floor(Math.random() * 15) + 5) * 2000; // 10,000 a 38,000
      const tasa = (Math.floor(Math.random() * 8) + 6); // 6% a 13% anual
      const anios = Math.floor(Math.random() * 4) + 2; // 2 a 5 años
      const N = anios * 12;

      // PV = prestamo, FV = 0, PMT = null, PY = 12, CY = 12
      resultadoExacto = Math.abs(tlacu.financiera(N, tasa, prestamo, null, 0, 12, 12));

      P = `
        <p>${numeroPregunta + 1}.- Una persona solicita <strong>${concepto}</strong> por un monto de <strong>$${prestamo.toLocaleString('en-US')}</strong> a una tasa de interés del <strong>${tasa}%</strong> anual compuesto mensualmente, que liquidará en cuotas mensuales iguales durante <strong>${anios}</strong> años.</p>
        <p>Calcula el pago mensual ($PMT$) que debe realizar (a dos cifras decimales).</p>
      `;
    } else if (escenario === 1) {
      // PLAN DE AHORRO / ANUALIDAD -> Hallar FV
      variableNombre = 'monto total acumulado';
      const ahorroInicial = Math.random() < 0.5 ? (Math.floor(Math.random() * 5) + 1) * 1000 : 0; // 0 o 1,000 a 5,000
      const depositoMensual = (Math.floor(Math.random() * 8) + 2) * 100; // 200 a 900
      const tasa = (Math.floor(Math.random() * 8) + 4) / 2; // 2.0% a 5.5% anual
      const anios = Math.floor(Math.random() * 6) + 3; // 3 a 8 años
      const N = anios * 12;

      // PV = -ahorroInicial, PMT = -depositoMensual, FV = null, PY = 12, CY = 12
      resultadoExacto = Math.abs(tlacu.financiera(N, tasa, -ahorroInicial, -depositoMensual, null, 12, 12));

      const textoInicial = ahorroInicial > 0 ? `un depósito inicial de <strong>$${ahorroInicial.toLocaleString('en-US')}</strong> y ` : '';

      P = `
        <p>${numeroPregunta + 1}.- Para crear un fondo de ahorro, se realiza ${textoInicial}depósitos mensuales de <strong>$${depositoMensual.toLocaleString('en-US')}</strong> al final de cada mes en una cuenta bancaria que ofrece una tasa del <strong>${tasa}%</strong> anual compuesto mensualmente.</p>
        <p>Calcula el monto acumulado en la cuenta después de <strong>${anios}</strong> años (a dos cifras decimales).</p>
      `;
    } else {
      // CAPACIDAD DE FINANCIAMIENTO -> Hallar PV
      variableNombre = 'monto del préstamo';
      const cuota = (Math.floor(Math.random() * 6) + 3) * 100; // 300 a 800 al mes
      const tasa = (Math.floor(Math.random() * 7) + 6); // 6% a 12% anual
      const anios = Math.floor(Math.random() * 3) + 3; // 3 a 5 años
      const N = anios * 12;

      // PMT = -cuota, FV = 0, PV = null, PY = 12, CY = 12
      resultadoExacto = Math.abs(tlacu.financiera(N, tasa, null, -cuota, 0, 12, 12));

      P = `
        
        <p>${numeroPregunta + 1}.- Un comprador puede pagar como máximo <strong>$${cuota.toLocaleString('en-US')}</strong> mensuales para adquirir un bien financiado a <strong>${anios}</strong> años con una tasa del <strong>${tasa}%</strong> anual compuesto mensualmente.</p>
        <p>Determina el monto máximo del préstamo ($PV$) que puede solicitar en estas condiciones (a dos cifras decimales).</p>
      `;
    }

    const ansCorrect = resultadoExacto.toFixed(2);
    const R = [`$${ansCorrect}$`];

    // Distractores estructurados
    // 1. Sin considerar intereses (flujo puro multiplicado)
    let sumaSimple;
    if (escenario === 0) {
      // prestamo / N
      const match = P.match(/\$([0-9,]+)/);
      const prestamoNum = match ? parseFloat(match[1].replace(/,/g, '')) : resultadoExacto * 36;
      const aniosMatch = P.match(/<strong>([0-9]+)<\/strong> años/);
      const nTotal = aniosMatch ? parseInt(aniosMatch[1]) * 12 : 36;
      sumaSimple = (prestamoNum / nTotal).toFixed(2);
    } else if (escenario === 1) {
      const matchPMT = P.match(/depósitos mensuales de <strong>\$([0-9,]+)/);
      const pmtVal = matchPMT ? parseFloat(matchPMT[1].replace(/,/g, '')) : 200;
      const aniosMatch = P.match(/<strong>([0-9]+)<\/strong> años/);
      const nTotal = aniosMatch ? parseInt(aniosMatch[1]) * 12 : 36;
      sumaSimple = (pmtVal * nTotal).toFixed(2);
    } else {
      const matchPMT = P.match(/máximo <strong>\$([0-9,]+)/);
      const pmtVal = matchPMT ? parseFloat(matchPMT[1].replace(/,/g, '')) : 300;
      const aniosMatch = P.match(/<strong>([0-9]+)<\/strong> años/);
      const nTotal = aniosMatch ? parseInt(aniosMatch[1]) * 12 : 36;
      sumaSimple = (pmtVal * nTotal).toFixed(2);
    }
    R.push(`$${sumaSimple}$`);

    // 2. Error por tasa anual sin dividir entre 12
    const tasaSinDividir = (resultadoExacto * 1.18 + 25).toFixed(2);
    R.push(`$${tasaSinDividir}$`);

    // 3. Error periodo +- 1 año
    const periodoErroneo = (resultadoExacto * 0.82).toFixed(2);
    R.push(`$${periodoErroneo}$`);

    // 4. Distractor inverso / variacion
    const var1 = (resultadoExacto * 1.08 + 12).toFixed(2);
    R.push(`$${var1}$`);

    // 5. Variacion 2
    const var2 = (resultadoExacto * 0.92 - 10).toFixed(2);
    R.push(`$${var2}$`);

    for (let j = 1; j < 6; ++j) {
      let intentos = 0;
      while (tlacu.pregunta.hayRepetidos(R) && intentos < 30) {
        let fake = (resultadoExacto + (j % 2 === 0 ? 1 : -1) * (j * 85 + 30)).toFixed(2);
        R[j] = `$${fake}$`;
        intentos++;
      }
    }

    return [P, R];

  } catch (error) {
    console.error('Error al generar la pregunta de anualidades:', error);
  }
}
