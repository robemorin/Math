import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Capacidad y unidades de volumen';
}

export function tipo() {
  return 0; // 0 - Opción múltiple
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

export async function pregunta(numeroPregunta) {
  try {
    const tipoEjercicio = Math.floor(Math.random() * 2);

    let P = '';
    let R = [];
    let ansCorrect = 0;

    if (tipoEjercicio === 0) {
      // Tanque rectangular en metros -> Capacidad en Litros o kiloLitros
      const l = (Math.floor(Math.random() * 20) + 15) / 10; // 1.5 a 3.4 m
      const w = (Math.floor(Math.random() * 15) + 10) / 10; // 1.0 a 2.4 m
      const h = (Math.floor(Math.random() * 15) + 10) / 10; // 1.0 a 2.4 m

      const vol_m3 = l * w * h;
      const capacidadLitros = vol_m3 * 1000; // 1 m3 = 1000 L
      ansCorrect = roundTo3SF(capacidadLitros);

      P = `
        ${numeroPregunta === 0 ? '<h2>Relación de capacidad y volumen: $$1\\text{ cm}^3 = 1\\text{ mL}$$, $$1\\text{ m}^3 = 1\\,000\\text{ L} = 1\\text{ kL}$$</h2>' : ''}
        <p>${numeroPregunta + 1}.- Un depósito de agua rectangular tiene unas dimensiones internas de $${l}\\text{ m} \\times ${w}\\text{ m} \\times ${h}\\text{ m}$. Calcule la capacidad máxima del depósito en <strong>litros (L)</strong>. Redondee su respuesta a 3 cifras significativas.</p>
      `;

      R.push(`$${ansCorrect}\\text{ L}$`);
      // Distractores
      // 1. En metros cúbicos sin convertir a litros
      R.push(`$${roundTo3SF(vol_m3)}\\text{ L}$`);
      // 2. Factor 100 en lugar de 1000
      R.push(`$${roundTo3SF(vol_m3 * 100)}\\text{ L}$`);
      // 3. Factor 10000
      R.push(`$${roundTo3SF(vol_m3 * 10000)}\\text{ L}$`);
      // 4. Dividir entre 1000
      R.push(`$${roundTo3SF(vol_m3 / 1000)}\\text{ L}$`);
      // 5. Offset
      R.push(`$${roundTo3SF(capacidadLitros + 500)}\\text{ L}$`);

    } else {
      // Recipiente cilíndrico en cm -> Capacidad en Litros
      const r = Math.floor(Math.random() * 10) + 8; // radio 8 a 17 cm
      const h = Math.floor(Math.random() * 15) + 15; // altura 15 a 29 cm

      const vol_cm3 = Math.PI * r * r * h;
      const capacidadL = vol_cm3 / 1000; // 1000 cm3 = 1 L
      ansCorrect = roundTo3SF(capacidadL);

      P = `
        ${numeroPregunta === 0 ? '<h2>Relación de capacidad y volumen: $$1\\text{ L} = 1\\,000\\text{ mL} = 1\\,000\\text{ cm}^3$$</h2>' : ''}
        <p>${numeroPregunta + 1}.- Un recipiente cilíndrico tiene un radio interno de $r = ${r}\\text{ cm}$ y una altura de $h = ${h}\\text{ cm}$. Calcule la capacidad máxima del recipiente en <strong>litros (L)</strong>. Redondee su respuesta a 3 cifras significativas.</p>
      `;

      R.push(`$${ansCorrect}\\text{ L}$`);
      // Distractores
      // 1. En cm3 (sin dividir entre 1000)
      R.push(`$${roundTo3SF(vol_cm3)}\\text{ L}$`);
      // 2. Dividir entre 100 en lugar de 1000
      R.push(`$${roundTo3SF(vol_cm3 / 100)}\\text{ L}$`);
      // 3. Dividir entre 10000
      R.push(`$${roundTo3SF(vol_cm3 / 10000)}\\text{ L}$`);
      // 4. Olvidar elevar el radio al cuadrado (2 * pi * r * h / 1000)
      R.push(`$${roundTo3SF(2 * Math.PI * r * h / 1000)}\\text{ L}$`);
      // 5. Offset
      R.push(`$${roundTo3SF(capacidadL + 1.5)}\\text{ L}$`);
    }

    for (let j = 1; j < 6; ++j) {
      let intentos = 0;
      while (tlacu.pregunta.hayRepetidos(R) && intentos < 20) {
        let varOffset = (Math.random() * 0.4 - 0.2) * ansCorrect;
        if (Math.abs(varOffset) < 0.1) varOffset = 0.5;
        R[j] = `$${roundTo3SF(Math.abs(ansCorrect + varOffset))}\\text{ L}$`;
        intentos++;
      }
    }

    return [P, R];

  } catch (error) {
    console.error('Error al generar la pregunta:', error);
  }
}
