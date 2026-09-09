import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Crecimiento exponencial';
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
      { especie: 'hormigas en un hormiguero', unidadTiempo: 'semanas', u0_min: 200, u0_max: 800, p_min: 5, p_max: 18, n_min: 5, n_max: 15, tipoRespuesta: 'entero' },
      { especie: 'venados en una reserva natural', unidadTiempo: 'años', u0_min: 30, u0_max: 90, p_min: 8, p_max: 22, n_min: 4, n_max: 10, tipoRespuesta: 'entero' },
      { especie: 'bacterias en un cultivo', unidadTiempo: 'horas', u0_min: 100, u0_max: 500, p_min: 15, p_max: 35, n_min: 3, n_max: 8, tipoRespuesta: 'entero' },
      { especie: 'conejos en una granja', unidadTiempo: 'meses', u0_min: 40, u0_max: 120, p_min: 6, p_max: 15, n_min: 6, n_max: 14, tipoRespuesta: 'entero' }
    ];

    const ctx = contextos[Math.floor(Math.random() * contextos.length)];
    const u0 = Math.floor(Math.random() * (ctx.u0_max - ctx.u0_min + 1)) + ctx.u0_min;
    const p = Math.floor(Math.random() * (ctx.p_max - ctx.p_min + 1)) + ctx.p_min;
    const n = Math.floor(Math.random() * (ctx.n_max - ctx.n_min + 1)) + ctx.n_min;

    const r = 1 + p / 100;
    const exactVal = u0 * Math.pow(r, n);
    const ansCorrect = Math.round(exactVal);

    const P = `
      <p>${numeroPregunta + 1}.- La población inicial de una colonia de ${ctx.especie} es de $${u0}$. Si la población aumenta a una tasa constante de $${p}\\%$ cada ${ctx.unidadTiempo.slice(0, -1)}, estima la cantidad de individuos presentes después de $${n}$ ${ctx.unidadTiempo} (redondea al entero más cercano).</p>
    `;

    const R = [`$${ansCorrect}$`];

    // Distractores comunes
    // 1. Crecimiento lineal simple u0 + n*(u0 * p/100)
    const lineal = Math.round(u0 + n * (u0 * (p / 100)));
    R.push(`$${lineal}$`);

    // 2. Olvidar sumar 1 a la razón: u0 * (p/100)^n
    const sinUno = roundTo3SF(u0 * Math.pow(p / 100, n));
    R.push(`$${sinUno}$`);

    // 3. Evaluar en n-1 periodos
    const offByOneMenos = Math.round(u0 * Math.pow(r, n - 1));
    R.push(`$${offByOneMenos}$`);

    // 4. Evaluar en n+1 periodos
    const offByOneMas = Math.round(u0 * Math.pow(r, n + 1));
    R.push(`$${offByOneMas}$`);

    // 5. Variación porcentual
    const variacion = Math.round(ansCorrect * (1 + (Math.random() * 0.2 - 0.1)));
    R.push(`$${variacion}$`);

    // Asegurar no repetidos
    for (let j = 1; j < 6; ++j) {
      let intentos = 0;
      while (tlacu.pregunta.hayRepetidos(R) && intentos < 30) {
        let delta = (j % 2 === 0 ? 1 : -1) * (Math.floor(Math.random() * 20) + j * 5);
        R[j] = `$${ansCorrect + delta}$`;
        intentos++;
      }
    }

    return [P, R];

  } catch (error) {
    console.error('Error al generar la pregunta:', error);
  }
}
