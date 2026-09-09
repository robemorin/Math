import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Tiempo en modelos exponenciales';
}

export function tipo() {
  return 0; // 0 - Opción múltiple
}

function roundTo3SF(num) {
  if (num === 0) return 0;
  let d = Math.ceil(Math.log10(Math.abs(num)));
  let power = 3 - d;
  let magnitude = Math.pow(10, power);
  let shifted = Math.round(num * magnitude);
  return shifted / magnitude;
}

export async function pregunta(numeroPregunta) {
  try {
    const contextos = [
      { especie: 'bacterias', unidadTiempo: 'horas', u0_min: 100, u0_max: 300, p_min: 12, p_max: 25, mult_min: 3, mult_max: 8 },
      { especie: 'conejos en una reserva', unidadTiempo: 'meses', u0_min: 50, u0_max: 150, p_min: 8, p_max: 18, mult_min: 4, mult_max: 10 },
      { especie: 'truchas en un lago', unidadTiempo: 'años', u0_min: 200, u0_max: 600, p_min: 6, p_max: 15, mult_min: 3, mult_max: 6 }
    ];

    const ctx = contextos[Math.floor(Math.random() * contextos.length)];
    const u0 = Math.floor(Math.random() * (ctx.u0_max - ctx.u0_min + 1)) + ctx.u0_min;
    const p = Math.floor(Math.random() * (ctx.p_max - ctx.p_min + 1)) + ctx.p_min;
    const multiplicador = Math.floor(Math.random() * (ctx.mult_max - ctx.mult_min + 1)) + ctx.mult_min;
    const meta = u0 * multiplicador;

    const r = 1 + p / 100;
    const exactN = Math.log(meta / u0) / Math.log(r);
    const ansCorrect = roundTo3SF(exactN);

    const P = `
      <p>${numeroPregunta + 1}.- Una población inicial de $${u0}$ ${ctx.especie} crece a una tasa del $${p}\\%$ cada ${ctx.unidadTiempo.slice(0, -1)}. ¿Cuánto tiempo tomará para que la población alcance los $${meta}$ individuos? (Redondea a 3 cifras significativas).</p>
    `;

    const R = [`$${ansCorrect}\\text{ ${ctx.unidadTiempo}}$`];

    // Distractores
    // 1. Crecimiento lineal: (meta - u0) / (u0 * p/100)
    const linealN = roundTo3SF((meta - u0) / (u0 * (p / 100)));
    R.push(`$${linealN}\\text{ ${ctx.unidadTiempo}}$`);

    // 2. Olvidar sumar 1 en la base del logaritmo: ln(meta/u0) / ln(p/100)
    const logErroneo = roundTo3SF(Math.abs(Math.log(meta / u0) / Math.log(p / 100)));
    R.push(`$${logErroneo}\\text{ ${ctx.unidadTiempo}}$`);

    // 3. Invertir cociente logarítmico
    const logInverso = roundTo3SF(Math.log(r) / Math.log(meta / u0));
    R.push(`$${logInverso}\\text{ ${ctx.unidadTiempo}}$`);

    // 4. Multiplicador directo sin base
    const multDirecto = roundTo3SF(multiplicador / (p / 100));
    R.push(`$${multDirecto}\\text{ ${ctx.unidadTiempo}}$`);

    // 5. Variación
    const varOffset = roundTo3SF(exactN * 1.3);
    R.push(`$${varOffset}\\text{ ${ctx.unidadTiempo}}$`);

    for (let j = 1; j < 6; ++j) {
      let intentos = 0;
      while (tlacu.pregunta.hayRepetidos(R) && intentos < 30) {
        let fake = roundTo3SF(Math.abs(exactN + (j % 2 === 0 ? j * 1.5 : -j * 1.2)));
        R[j] = `$${fake}\\text{ ${ctx.unidadTiempo}}$`;
        intentos++;
      }
    }

    return [P, R];

  } catch (error) {
    console.error('Error al generar la pregunta:', error);
  }
}
