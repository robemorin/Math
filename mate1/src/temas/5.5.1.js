import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Interés compuesto y depreciación';
}

export function tipo() {
  return 0; // 0 - Opción múltiple
}

export async function pregunta(numeroPregunta) {
  try {
    // 50% probabilidad de interés compuesto (crecimiento/sumar) y 50% depreciación (decrecimiento/restar)
    const esInteres = Math.random() < 0.5;

    let capital, tasa, anios, exacto, P, redTexto;

    if (esInteres) {
      const tiposFreq = [
        { nombre: 'anualmente', k: 1 },
        { nombre: 'semestralmente', k: 2 },
        { nombre: 'trimestralmente', k: 4 },
        { nombre: 'mensualmente', k: 12 },
        { nombre: 'diariamente', k: 365 }
      ];
      const freq = tiposFreq[Math.floor(Math.random() * tiposFreq.length)];
      capital = (Math.floor(Math.random() * 18) + 3) * 1000; // 3,000 a 20,000
      tasa = (Math.floor(Math.random() * 14) + 6) / 2; // 3.0% a 9.5%
      anios = Math.floor(Math.random() * 8) + 3; // 3 a 10 años
      const N = anios * freq.k;

      // tlacu.financiera para interés compuesto
      exacto = Math.abs(tlacu.financiera(N, tasa, -capital, 0, null, freq.k, freq.k));

      P = `
        ${numeroPregunta === 0 ? '<h2>Finanzas: Interés compuesto y depreciación</h2>' : ''}
        <p>${numeroPregunta + 1}.- Se invierte una cantidad de <strong>$${capital.toLocaleString('en-US')}</strong> a una tasa de interés compuesto del <strong>${tasa}%</strong> anual, capitalizable <strong>${freq.nombre}</strong> durante <strong>${anios}</strong> años.</p>
        <p>Halla el valor final de la inversión (a dos cifras decimales).</p>
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

      // Depreciación: FV = PV * (1 - r/100)^n
      exacto = capital * Math.pow(1 - tasa / 100, anios);

      P = `
        <p>${numeroPregunta + 1}.- Se adquiere ${item.nombre} por un valor inicial de <strong>$${capital.toLocaleString('en-US')}</strong>. Si su valor se deprecia anualmente a una tasa constante del <strong>${tasa}%</strong>, calcula su valor residual al cabo de <strong>${anios}</strong> años (a dos cifras decimales).</p>
      `;
    }

    const ansCorrect = exacto.toFixed(2);
    const R = [`$${ansCorrect}$`];

    // Distractores cruzados para evaluar si el alumno sabe si sumar o restar:
    // 1. Error conceptual de signo inverso (apreciar si era depreciación, o depreciar si era interés)
    const signoInverso = esInteres 
      ? (capital * Math.pow(1 - tasa / 100, anios)).toFixed(2)
      : (capital * Math.pow(1 + tasa / 100, anios)).toFixed(2);
    R.push(`$${signoInverso}$`);

    // 2. Modelo lineal (interés simple o depreciación lineal)
    const lineal = esInteres
      ? (capital * (1 + (tasa / 100) * anios)).toFixed(2)
      : Math.max(0, capital - anios * (capital * (tasa / 100))).toFixed(2);
    R.push(`$${lineal}$`);

    // 3. Evaluar anios - 1
    const offMenos = esInteres
      ? (capital * Math.pow(1 + (tasa / 100), anios - 1)).toFixed(2)
      : (capital * Math.pow(1 - tasa / 100, anios - 1)).toFixed(2);
    R.push(`$${offMenos}$`);

    // 4. Evaluar anios + 1
    const offMas = esInteres
      ? (capital * Math.pow(1 + (tasa / 100), anios + 1)).toFixed(2)
      : (capital * Math.pow(1 - tasa / 100, anios + 1)).toFixed(2);
    R.push(`$${offMas}$`);

    // 5. Variación
    const variacion = (exacto * 1.08 + 15).toFixed(2);
    R.push(`$${variacion}$`);

    for (let j = 1; j < 6; ++j) {
      let intentos = 0;
      while (tlacu.pregunta.hayRepetidos(R) && intentos < 30) {
        let fake = (exacto + (j % 2 === 0 ? 1 : -1) * (j * 110 + 45)).toFixed(2);
        R[j] = `$${fake}$`;
        intentos++;
      }
    }

    return [P, R];

  } catch (error) {
    console.error('Error al generar la pregunta:', error);
  }
}
