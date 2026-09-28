import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Esferas y semiesferas: Área superficial y volumen';
}

export function tipo() {
  return 0; // 0 - Opción múltiple
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

function formatOptions(correct, distractors, unitLaTeX) {
  const ansCorrect = roundTo3SF(correct);
  const R = [`$${ansCorrect}${unitLaTeX}$`];

  for (const d of distractors) {
    if (R.length >= 6) break;
    const rounded = roundTo3SF(d);
    if (!isNaN(rounded) && isFinite(rounded) && rounded > 0) {
      R.push(`$${rounded}${unitLaTeX}$`);
    }
  }

  // Rellenar con distractores numéricos si faltan
  let intentos = 0;
  while (R.length < 6 && intentos < 30) {
    const factor = 1 + (Math.random() * 0.5 - 0.25);
    const candidate = roundTo3SF(ansCorrect * factor);
    const candidateStr = `$${candidate}${unitLaTeX}$`;
    if (candidate > 0 && !R.includes(candidateStr)) {
      R.push(candidateStr);
    }
    intentos++;
  }

  for (let j = 1; j < R.length; ++j) {
    let repIntentos = 0;
    while (tlacu.pregunta.hayRepetidos(R) && repIntentos < 30) {
      const factor = 0.5 + Math.random() * 1.2;
      const val = roundTo3SF(ansCorrect * (factor === 1 ? 1.15 : factor));
      if (val > 0) {
        R[j] = `$${val}${unitLaTeX}$`;
      }
      repIntentos++;
    }
  }

  return R;
}

// -------------------------------------------------------------
// Sub-problemas de Esferas y Semiesferas
// -------------------------------------------------------------

// 1. Área superficial de una esfera dado el radio r
function subEsferaAreaRadio(nPreg) {
  const r = Math.floor(Math.random() * 12) + 3; // 3 a 14 cm
  const areaExact = 4 * Math.PI * r * r;

  const P = `
    ${nPreg === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <p>${nPreg + 1}.- Una esfera tiene un radio de $r = ${r}\\text{ cm}$.</p>
    <p>Calcule el área superficial de la esfera ($A = 4\\pi r^2$). Redondee su respuesta a 3 cifras significativas.</p>
  `;

  const vol = (4 / 3) * Math.PI * Math.pow(r, 3);
  const distractores = [
    vol, // Confundir área con volumen
    Math.PI * r * r, // Solo área del círculo máximo
    2 * Math.PI * r * r, // Área de semiesfera
    8 * Math.PI * r * r, // Multiplicar por 8
    areaExact * 1.25,
    areaExact * 0.75
  ];

  return [P, formatOptions(areaExact, distractores, '\\text{ cm}^2')];
}

// 2. Área superficial de una esfera dado el diámetro d
function subEsferaAreaDiametro(nPreg) {
  const d = (Math.floor(Math.random() * 10) + 3) * 2; // diámetro par 6 a 24 cm
  const r = d / 2;
  const areaExact = 4 * Math.PI * r * r;

  const P = `
    ${nPreg === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <p>${nPreg + 1}.- Una esfera tiene un diámetro de $d = ${d}\\text{ cm}$.</p>
    <p>Determine el área superficial de la esfera. Redondee su respuesta a 3 cifras significativas.</p>
  `;

  // Distractor común: usar diámetro como radio: 4*pi*d^2 = 4 veces el área correcta
  const areaConDiametro = 4 * Math.PI * d * d;
  const vol = (4 / 3) * Math.PI * Math.pow(r, 3);

  const distractores = [
    areaConDiametro,
    vol,
    2 * Math.PI * r * r,
    Math.PI * d * r,
    areaExact * 1.3,
    areaExact * 0.7
  ];

  return [P, formatOptions(areaExact, distractores, '\\text{ cm}^2')];
}

// 3. Despeje del radio r a partir del área superficial de la esfera A
function subEsferaRadioDesdeArea(nPreg) {
  const rExact = Math.floor(Math.random() * 8) + 3; // 3 a 10 cm
  const area = roundTo3SF(4 * Math.PI * rExact * rExact);

  // r = sqrt(A / (4*pi))
  const rCalculado = Math.sqrt(area / (4 * Math.PI));

  const P = `
    ${nPreg === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <p>${nPreg + 1}.- Una esfera tiene un área superficial de $A = ${area}\\text{ cm}^2$.</p>
    <p>Calcule la longitud de su radio ($r$). Redondee su respuesta a 3 cifras significativas.</p>
  `;

  // Distractores comunes:
  // d1: sqrt(A / pi) (olvidar el 4)
  // d2: 2 * rCalculado (diámetro)
  // d3: A / (4 * pi) (olvidar la raíz cuadrada)
  const distractores = [
    Math.sqrt(area / Math.PI),
    2 * rCalculado,
    area / (4 * Math.PI),
    rCalculado / 2,
    rCalculado * 1.4,
    Math.max(1, rCalculado - 1.5)
  ];

  return [P, formatOptions(rCalculado, distractores, '\\text{ cm}')];
}

// 4. Área superficial total de una semiesfera SÓLIDA (curva + base plana circular)
function subSemiesferaAreaSolida(nPreg) {
  const r = Math.floor(Math.random() * 8) + 3; // 3 a 10 cm
  // A = 2*pi*r^2 + pi*r^2 = 3*pi*r^2
  const areaCurva = 2 * Math.PI * r * r;
  const areaBase = Math.PI * r * r;
  const areaTotal = 3 * Math.PI * r * r;

  const P = `
    ${nPreg === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <p>${nPreg + 1}.- Considere una <b>semiesfera sólida</b> de radio $r = ${r}\\text{ cm}$.</p>
    <p>Calcule el área superficial total de la semiesfera (incluyendo la superficie curva y su base plana circular). Redondee su respuesta a 3 cifras significativas.</p>
  `;

  // Distractores:
  // d1: Solo superficie curva 2*pi*r^2 (olvidó la base)
  // d2: Esfera completa 4*pi*r^2
  // d3: Volumen de semiesfera (2/3)*pi*r^3
  const volSemiesfera = (2 / 3) * Math.PI * Math.pow(r, 3);
  const distractores = [
    areaCurva,
    4 * Math.PI * r * r,
    volSemiesfera,
    areaBase,
    areaTotal * 1.25,
    areaTotal * 0.8
  ];

  return [P, formatOptions(areaTotal, distractores, '\\text{ cm}^2')];
}

// 5. Área superficial exterior de un tazón / semiesfera HUECA (sin tapa)
function subSemiesferaAreaHueca(nPreg) {
  const r = Math.floor(Math.random() * 8) + 4; // 4 a 11 cm
  // Solo superficie curva = 2*pi*r^2
  const areaCurva = 2 * Math.PI * r * r;

  const P = `
    ${nPreg === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <p>${nPreg + 1}.- Un recipiente o tazón semiesférico hueco (abierto por la parte superior) tiene un radio exterior de $r = ${r}\\text{ cm}$.</p>
    <p>Calcule el área de la superficie exterior curva de este recipiente. Redondee su respuesta a 3 cifras significativas.</p>
  `;

  // Distractores:
  // d1: Semiesfera sólida (3*pi*r^2) sumando base inexistente
  // d2: Esfera completa (4*pi*r^2)
  const distractores = [
    3 * Math.PI * r * r,
    4 * Math.PI * r * r,
    Math.PI * r * r,
    (2 / 3) * Math.PI * Math.pow(r, 3),
    areaCurva * 1.3,
    areaCurva * 0.7
  ];

  return [P, formatOptions(areaCurva, distractores, '\\text{ cm}^2')];
}

// 6. Volumen de una esfera dado el radio r
function subEsferaVolumenRadio(nPreg) {
  const r = Math.floor(Math.random() * 8) + 3; // 3 a 10 cm
  const volExact = (4 / 3) * Math.PI * Math.pow(r, 3);

  const P = `
    ${nPreg === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <p>${nPreg + 1}.- Una bola esférica tiene un radio de $r = ${r}\\text{ cm}$.</p>
    <p>Calcule el volumen de la esfera ($V = \\frac{4}{3}\\pi r^3$). Redondee su respuesta a 3 cifras significativas.</p>
  `;

  const area = 4 * Math.PI * r * r;
  const distractores = [
    area, // Confundir con área
    (2 / 3) * Math.PI * Math.pow(r, 3), // Semiesfera
    Math.PI * Math.pow(r, 3), // Omitir 4/3
    (4 / 3) * Math.PI * r * r, // r^2 en vez de r^3
    volExact * 1.3,
    volExact * 0.7
  ];

  return [P, formatOptions(volExact, distractores, '\\text{ cm}^3')];
}

// 7. Volumen de una esfera dado el diámetro d
function subEsferaVolumenDiametro(nPreg) {
  const d = (Math.floor(Math.random() * 8) + 3) * 2; // diámetro par 6 a 20 cm
  const r = d / 2;
  const volExact = (4 / 3) * Math.PI * Math.pow(r, 3);

  const P = `
    ${nPreg === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <p>${nPreg + 1}.- Un globo meteorológico esférico tiene un diámetro de $d = ${d}\\text{ cm}$.</p>
    <p>Calcule su volumen. Redondee su respuesta a 3 cifras significativas.</p>
  `;

  // Distractor: usar d en lugar de r: (4/3)*pi*d^3 = 8 veces el volumen correcto
  const volConDiametro = (4 / 3) * Math.PI * Math.pow(d, 3);
  const distractores = [
    volConDiametro,
    (2 / 3) * Math.PI * Math.pow(r, 3),
    4 * Math.PI * r * r,
    (4 / 3) * Math.PI * d * r * r,
    volExact * 1.35,
    volExact * 0.65
  ];

  return [P, formatOptions(volExact, distractores, '\\text{ cm}^3')];
}

// 8. Despeje del radio r a partir del volumen de la esfera V
function subEsferaRadioDesdeVolumen(nPreg) {
  const rExact = Math.floor(Math.random() * 7) + 3; // 3 a 9 cm
  const vol = roundTo3SF((4 / 3) * Math.PI * Math.pow(rExact, 3));

  // r = cbrt( (3*V) / (4*pi) )
  const rCalculado = Math.cbrt((3 * vol) / (4 * Math.PI));

  const P = `
    ${nPreg === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <p>${nPreg + 1}.- Una esfera tiene un volumen de $V = ${vol}\\text{ cm}^3$.</p>
    <p>Calcule la longitud de su radio ($r$). Redondee su respuesta a 3 cifras significativas.</p>
  `;

  // Distractores:
  // d1: Diámetro (2 * r)
  // d2: Usar raíz cuadrada en vez de cúbica
  // d3: Olvidar 4/3: cbrt(vol / pi)
  const distractores = [
    2 * rCalculado,
    Math.sqrt(vol / (4 * Math.PI)),
    Math.cbrt(vol / Math.PI),
    Math.cbrt((4 * vol) / (3 * Math.PI)),
    rCalculado * 1.4,
    Math.max(1, rCalculado - 1.5)
  ];

  return [P, formatOptions(rCalculado, distractores, '\\text{ cm}')];
}

// 9. Volumen de una semiesfera dado el radio r
function subSemiesferaVolumen(nPreg) {
  const r = Math.floor(Math.random() * 8) + 3; // 3 a 10 cm
  const volExact = (2 / 3) * Math.PI * Math.pow(r, 3);

  const P = `
    ${nPreg === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <p>${nPreg + 1}.- Un domo semiesférico tiene un radio de $r = ${r}\\text{ cm}$.</p>
    <p>Calcule el volumen de espacio interior de la semiesfera ($V = \\frac{2}{3}\\pi r^3$). Redondee su respuesta a 3 cifras significativas.</p>
  `;

  const volEsfera = (4 / 3) * Math.PI * Math.pow(r, 3);
  const distractores = [
    volEsfera, // Esfera completa
    3 * Math.PI * r * r, // Área superficial
    Math.PI * Math.pow(r, 3),
    volExact / 2,
    volExact * 1.3,
    volExact * 0.75
  ];

  return [P, formatOptions(volExact, distractores, '\\text{ cm}^3')];
}

// 10. Despeje del radio r a partir del volumen de una semiesfera V
function subSemiesferaRadioDesdeVolumen(nPreg) {
  const rExact = Math.floor(Math.random() * 7) + 3; // 3 a 9 cm
  const vol = roundTo3SF((2 / 3) * Math.PI * Math.pow(rExact, 3));

  // r = cbrt( (3*V) / (2*pi) )
  const rCalculado = Math.cbrt((3 * vol) / (2 * Math.PI));

  const P = `
    ${nPreg === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <p>${nPreg + 1}.- Una semiesfera tiene un volumen de $V = ${vol}\\text{ cm}^3$.</p>
    <p>Calcule la longitud de su radio ($r$). Redondee su respuesta a 3 cifras significativas.</p>
  `;

  // Distractores:
  // d1: Confundir con esfera completa: cbrt( (3*V) / (4*pi) )
  // d2: Diámetro
  const distractores = [
    Math.cbrt((3 * vol) / (4 * Math.PI)),
    2 * rCalculado,
    Math.sqrt((3 * vol) / (2 * Math.PI)),
    rCalculado * 1.5,
    Math.max(1, rCalculado - 2)
  ];

  return [P, formatOptions(rCalculado, distractores, '\\text{ cm}')];
}

// 11. Relación compuesta: Cono con tope semiesférico (estilo helado / trompo del libro)
function subCompuestoConoSemiesfera(nPreg) {
  const r = Math.floor(Math.random() * 4) + 3; // radio 3 a 6 cm
  const hCono = Math.floor(Math.random() * 6) + 6; // altura cono 6 a 11 cm

  const volCono = (1 / 3) * Math.PI * r * r * hCono;
  const volSemiesfera = (2 / 3) * Math.PI * Math.pow(r, 3);
  const volTotal = volCono + volSemiesfera;

  const P = `
    ${nPreg === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <p>${nPreg + 1}.- Un sólido compuesto está formado por un cono de radio de base $r = ${r}\\text{ cm}$ y altura perpendicular $h = ${hCono}\\text{ cm}$, coronado en su base superior por una semiesfera del mismo radio $r = ${r}\\text{ cm}$.</p>
    <p>Calcule el volumen total de este cuerpo compuesto. Redondee su respuesta a 3 cifras significativas.</p>
  `;

  // Distractores:
  // d1: Solo el cono
  // d2: Solo la semiesfera
  // d3: Cono + esfera completa
  const distractores = [
    volCono,
    volSemiesfera,
    volCono + 2 * volSemiesfera,
    volTotal * 1.25,
    volTotal * 0.8
  ];

  return [P, formatOptions(volTotal, distractores, '\\text{ cm}^3')];
}

// 12. Relación compuesta: Cilindro cerrado por dos extremos semiesféricos (cápsula / tanque)
function subCompuestoCapsulaVolumen(nPreg) {
  const r = Math.floor(Math.random() * 4) + 2; // radio 2 a 5 cm
  const hCil = Math.floor(Math.random() * 8) + 6; // longitud cilíndrica 6 a 13 cm

  const volCilindro = Math.PI * r * r * hCil;
  // Dos semiesferas forman una esfera completa de radio r
  const volExtremos = (4 / 3) * Math.PI * Math.pow(r, 3);
  const volTotal = volCilindro + volExtremos;

  const P = `
    ${nPreg === 0 ? '<h2>Esferas y semiesferas: Área superficial y volumen</h2>' : ''}
    <p>${nPreg + 1}.- Un depósito cerrado en forma de cápsula está compuesto por una sección central cilíndrica de radio $r = ${r}\\text{ cm}$ y longitud $h = ${hCil}\\text{ cm}$, cerrada en cada uno de sus dos extremos por una semiesfera de radio $r = ${r}\\text{ cm}$.</p>
    <p>Calcule el volumen total del depósito. Redondee su respuesta a 3 cifras significativas.</p>
  `;

  // Distractores:
  // d1: Solo el cilindro
  // d2: Cilindro + 1 sola semiesfera (en vez de las dos)
  const distractores = [
    volCilindro,
    volCilindro + (2 / 3) * Math.PI * Math.pow(r, 3),
    volTotal * 1.25,
    volTotal * 0.75,
    volExtremos * 2
  ];

  return [P, formatOptions(volTotal, distractores, '\\text{ cm}^3')];
}

// -------------------------------------------------------------
// Función Principal Exportada
// -------------------------------------------------------------
export async function pregunta(numeroPregunta) {
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
    return generadores[seleccionador](numeroPregunta);

  } catch (error) {
    console.error('Error al generar la pregunta 6.6.3:', error);
  }
}
