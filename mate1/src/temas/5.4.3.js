import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Decaimiento exponencial';
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
      { tipo: 'radiactivo', elemento: 'un isótopo radiactivo', unidadMasa: 'g', unidadTiempo: 'años', u0_min: 50, u0_max: 200, p_min: 8, p_max: 25, n_min: 3, n_max: 8 },
      { tipo: 'poblacion', elemento: 'una especie en peligro de extinción', unidadMasa: 'individuos', unidadTiempo: 'años', u0_min: 400, u0_max: 950, p_min: 4, p_max: 12, n_min: 4, n_max: 10 },
      { tipo: 'medicamento', elemento: 'un medicamento en el torrente sanguíneo', unidadMasa: 'mg', unidadTiempo: 'horas', u0_min: 100, u0_max: 500, p_min: 12, p_max: 30, n_min: 3, n_max: 7 }
    ];

    const ctx = contextos[Math.floor(Math.random() * contextos.length)];
    const u0 = Math.floor(Math.random() * (ctx.u0_max - ctx.u0_min + 1)) + ctx.u0_min;
    const p = Math.floor(Math.random() * (ctx.p_max - ctx.p_min + 1)) + ctx.p_min;
    const n = Math.floor(Math.random() * (ctx.n_max - ctx.n_min + 1)) + ctx.n_min;

    const r = 1 - p / 100;
    const exactVal = u0 * Math.pow(r, n);
    const ansCorrect = ctx.tipo === 'poblacion' ? Math.round(exactVal) : roundTo3SF(exactVal);

    const unidadStr = ctx.unidadMasa === 'individuos' ? 'individuos' : ctx.unidadMasa;
    const redTexto = ctx.tipo === 'poblacion' ? 'al entero más cercano' : 'a 3 cifras significativas';

    const P = `
      <p>${numeroPregunta + 1}.- La cantidad inicial de ${ctx.elemento} es de $${u0}\\text{ ${ctx.unidadMasa === 'individuos' ? '' : ctx.unidadMasa}}$. Si se reduce a una tasa constante del $${p}\\%$ cada ${ctx.unidadTiempo.slice(0, -1)}, estima la cantidad restante después de $${n}$ ${ctx.unidadTiempo} (redondea ${redTexto}).</p>
    `;

    const R = [`$${ansCorrect}${ctx.tipo === 'poblacion' ? '' : `\\text{ ${unidadStr}}`}$`];

    // Distractores
    // 1. Error de signo: usar crecimiento (1 + p/100)
    const comoCrecimiento = ctx.tipo === 'poblacion' ? Math.round(u0 * Math.pow(1 + p/100, n)) : roundTo3SF(u0 * Math.pow(1 + p/100, n));
    R.push(`$${comoCrecimiento}${ctx.tipo === 'poblacion' ? '' : `\\text{ ${unidadStr}}`}$`);

    // 2. Descuento lineal simple: u0 - n*(u0 * p/100)
    const lineal = Math.max(1, ctx.tipo === 'poblacion' ? Math.round(u0 - n * (u0 * (p / 100))) : roundTo3SF(u0 - n * (u0 * (p / 100))));
    R.push(`$${lineal}${ctx.tipo === 'poblacion' ? '' : `\\text{ ${unidadStr}}`}$`);

    // 3. Evaluar n-1 periodos
    const offByOne = ctx.tipo === 'poblacion' ? Math.round(u0 * Math.pow(r, n - 1)) : roundTo3SF(u0 * Math.pow(r, n - 1));
    R.push(`$${offByOne}${ctx.tipo === 'poblacion' ? '' : `\\text{ ${unidadStr}}`}$`);

    // 4. Evaluar n+1 periodos
    const offByOneMas = ctx.tipo === 'poblacion' ? Math.round(u0 * Math.pow(r, n + 1)) : roundTo3SF(u0 * Math.pow(r, n + 1));
    R.push(`$${offByOneMas}${ctx.tipo === 'poblacion' ? '' : `\\text{ ${unidadStr}}`}$`);

    // 5. Variación
    const varOffset = ctx.tipo === 'poblacion' ? Math.round(ansCorrect * 1.15 + 2) : roundTo3SF(ansCorrect * 1.25);
    R.push(`$${varOffset}${ctx.tipo === 'poblacion' ? '' : `\\text{ ${unidadStr}}`}$`);

    for (let j = 1; j < 6; ++j) {
      let intentos = 0;
      while (tlacu.pregunta.hayRepetidos(R) && intentos < 30) {
        let fake = ctx.tipo === 'poblacion' ? Math.max(1, ansCorrect + (j % 2 === 0 ? j * 8 : -j * 8)) : roundTo3SF(Math.abs(ansCorrect * (1 + (j * 0.15))));
        R[j] = `$${fake}${ctx.tipo === 'poblacion' ? '' : `\\text{ ${unidadStr}}`}$`;
        intentos++;
      }
    }

    return [P, R];

  } catch (error) {
    console.error('Error al generar la pregunta:', error);
  }
}
