import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Prismas, pirámides, conos y cilindros: Área superficial y volumen';
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

// Funciones auxiliares geométricas
function regularPolygonArea(n, s) {
  // Área de un polígono regular de n lados y longitud s: A = (n * s^2) / (4 * tan(pi / n))
  return (n * s * s) / (4 * Math.tan(Math.PI / n));
}

function regularPolygonPerimeter(n, s) {
  return n * s;
}

function regularPolygonApothem(n, s) {
  return s / (2 * Math.tan(Math.PI / n));
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

  // Si faltan distractores o hay duplicados, rellenar con perturbaciones
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
// Generadores de Sub-problemas
// -------------------------------------------------------------

// Sub-problema 1: Prisma regular de n lados - Calcular Volumen dado lado s y altura h
function subPrismaVolumen(nPreg) {
  const polyNames = { 3: 'triangular regular', 4: 'cuadrangular regular', 5: 'pentagonal regular', 6: 'hexagonal regular', 8: 'octagonal regular' };
  const nLados = [3, 4, 5, 6, 8][Math.floor(Math.random() * 5)];
  const s = Math.floor(Math.random() * 7) + 3; // 3 a 9 cm
  const h = Math.floor(Math.random() * 9) + 4; // 4 a 12 cm

  const aBase = regularPolygonArea(nLados, s);
  const vol = aBase * h;

  const P = `
    ${nPreg === 0 ? '<h2>Prismas y sólidos regulares: Relaciones métricas</h2>' : ''}
    <p>${nPreg + 1}.- Considere un prisma ${polyNames[nLados]} recto cuya base tiene lados de longitud $s = ${s}\\text{ cm}$ y su altura es $h = ${h}\\text{ cm}$.</p>
    <p>Calcule el volumen de dicho prisma. Redondee su respuesta a 3 cifras significativas.</p>
  `;

  const perim = regularPolygonPerimeter(nLados, s);
  const apot = regularPolygonApothem(nLados, s);
  const areaSup = 2 * aBase + perim * h;

  const distractores = [
    vol / 3,
    areaSup,
    perim * h,
    apot * h * s,
    vol * 0.75,
    vol * 1.33
  ];

  return [P, formatOptions(vol, distractores, '\\text{ cm}^3')];
}

// Sub-problema 2: Prisma regular de n lados - Calcular lado de la base dado Volumen V y altura h
function subPrismaLado(nPreg) {
  const polyNames = { 3: 'triangular regular', 4: 'cuadrangular regular', 5: 'pentagonal regular', 6: 'hexagonal regular' };
  const nLados = [3, 4, 5, 6][Math.floor(Math.random() * 4)];
  const sExact = Math.floor(Math.random() * 6) + 3; // 3 a 8 cm
  const h = Math.floor(Math.random() * 8) + 4; // 4 a 11 cm

  const aBase = regularPolygonArea(nLados, sExact);
  const vol = roundTo3SF(aBase * h);

  const sCalculado = Math.sqrt((4 * vol * Math.tan(Math.PI / nLados)) / (nLados * h));

  const P = `
    <p>${nPreg + 1}.- Un prisma ${polyNames[nLados]} recto tiene un volumen de $V = ${vol}\\text{ cm}^3$ y una altura de $h = ${h}\\text{ cm}$.</p>
    <p>Determine la longitud del lado de la base ($s$). Redondee su respuesta a 3 cifras significativas.</p>
  `;

  const distractores = [
    Math.sqrt(vol / h),
    vol / (nLados * h),
    sCalculado * (nLados / 4),
    Math.sqrt((2 * vol) / h),
    sCalculado + 2,
    Math.max(1, sCalculado - 1.5)
  ];

  return [P, formatOptions(sCalculado, distractores, '\\text{ cm}')];
}

// Sub-problema 3: Prisma regular de n lados - Calcular altura h dado Volumen V y lado de la base s
function subPrismaAltura(nPreg) {
  const polyNames = { 3: 'triangular regular', 4: 'cuadrangular regular', 5: 'pentagonal regular', 6: 'hexagonal regular' };
  const nLados = [3, 4, 5, 6][Math.floor(Math.random() * 4)];
  const s = Math.floor(Math.random() * 6) + 3; // 3 a 8 cm
  const hExact = Math.floor(Math.random() * 8) + 5; // 5 a 12 cm

  const aBase = regularPolygonArea(nLados, s);
  const vol = roundTo3SF(aBase * hExact);

  const hCalculado = vol / regularPolygonArea(nLados, s);

  const P = `
    <p>${nPreg + 1}.- Un prisma ${polyNames[nLados]} recto cuenta con una base cuyos lados miden $s = ${s}\\text{ cm}$. Si el volumen total del prisma es de $V = ${vol}\\text{ cm}^3$,</p>
    <p>calcule la altura ($h$) del prisma. Redondee su respuesta a 3 cifras significativas.</p>
  `;

  const distractores = [
    vol / (nLados * s),
    hCalculado * 3,
    vol / (s * s),
    hCalculado / 3,
    hCalculado * 1.4,
    hCalculado * 0.7
  ];

  return [P, formatOptions(hCalculado, distractores, '\\text{ cm}')];
}

// Sub-problema 4: Prisma regular de n lados - Calcular Área Superficial Total
function subPrismaSuperficie(nPreg) {
  const polyNames = { 3: 'triangular regular', 4: 'cuadrangular regular', 5: 'pentagonal regular', 6: 'hexagonal regular' };
  const nLados = [3, 4, 5, 6][Math.floor(Math.random() * 4)];
  const s = Math.floor(Math.random() * 6) + 3; // 3 a 8 cm
  const h = Math.floor(Math.random() * 9) + 4; // 4 a 12 cm

  const aBase = regularPolygonArea(nLados, s);
  const perim = regularPolygonPerimeter(nLados, s);
  const areaLateral = perim * h;
  const areaTotal = 2 * aBase + areaLateral;

  const P = `
    <p>${nPreg + 1}.- Calcule el área superficial total de un prisma ${polyNames[nLados]} recto cerrado con lado de la base $s = ${s}\\text{ cm}$ y altura $h = ${h}\\text{ cm}$.</p>
    <p>Redondee su respuesta a 3 cifras significativas.</p>
  `;

  const vol = aBase * h;
  const distractores = [
    areaLateral,
    areaLateral + aBase,
    vol,
    2 * aBase + s * h,
    areaTotal * 1.25,
    areaTotal * 0.8
  ];

  return [P, formatOptions(areaTotal, distractores, '\\text{ cm}^2')];
}

// Sub-problema 5: Pirámide recta regular - Volumen dado lado base s y altura vertical h
function subPiramideVolumen(nPreg) {
  const polyNames = { 3: 'triangular regular (tetraedro)', 4: 'base cuadrada', 6: 'base hexagonal regular' };
  const nLados = [3, 4, 6][Math.floor(Math.random() * 3)];
  const s = Math.floor(Math.random() * 6) + 4; // 4 a 9 cm
  const h = Math.floor(Math.random() * 8) + 6; // 6 a 13 cm

  const aBase = regularPolygonArea(nLados, s);
  const vol = (1 / 3) * aBase * h;

  const P = `
    <p>${nPreg + 1}.- Una pirámide recta de ${polyNames[nLados]} tiene un lado de la base de $s = ${s}\\text{ cm}$ y una altura perpendicular de $h = ${h}\\text{ cm}$.</p>
    <p>Calcule el volumen de la pirámide. Redondee su respuesta a 3 cifras significativas.</p>
  `;

  const volPrisma = aBase * h;
  const distractores = [
    volPrisma,
    volPrisma / 2,
    (1 / 3) * (nLados * s) * h,
    vol * 1.5,
    vol * 0.65
  ];

  return [P, formatOptions(vol, distractores, '\\text{ cm}^3')];
}

// Sub-problema 6: Pirámide de base cuadrada - Área Superficial Total (Pitágoras para apotema lateral)
function subPiramideSuperficie(nPreg) {
  const s = (Math.floor(Math.random() * 5) + 3) * 2; // número par (6, 8, 10, 12, 14 cm)
  const h = Math.floor(Math.random() * 7) + 5; // altura 5 a 11 cm

  const semiLado = s / 2;
  const slant = Math.sqrt(h * h + semiLado * semiLado);
  const aBase = s * s;
  const areaLateral = 2 * s * slant;
  const areaTotal = aBase + areaLateral;

  const P = `
    <p>${nPreg + 1}.- Una pirámide recta de base cuadrada tiene lados en su base de $s = ${s}\\text{ cm}$ y una altura perpendicular de $h = ${h}\\text{ cm}$.</p>
    <p>Determine el área superficial total de la pirámide (incluyendo la base). Redondee su respuesta a 3 cifras significativas.</p>
  `;

  const slantErr = h;
  const distractores = [
    aBase + 2 * s * slantErr,
    areaLateral,
    (1 / 3) * aBase * h,
    aBase + 4 * s * slant,
    areaTotal * 1.2,
    areaTotal * 0.85
  ];

  return [P, formatOptions(areaTotal, distractores, '\\text{ cm}^2')];
}

// Sub-problema 7: Cilindro - Obtener radio r a partir del volumen V y la altura h
function subCilindroRadio(nPreg) {
  const rExact = Math.floor(Math.random() * 6) + 3; // 3 a 8 cm
  const h = Math.floor(Math.random() * 8) + 5; // 5 a 12 cm

  const vol = roundTo3SF(Math.PI * rExact * rExact * h);
  const rCalculado = Math.sqrt(vol / (Math.PI * h));

  const P = `
    <p>${nPreg + 1}.- Un cilindro circular recto tiene un volumen de $V = ${vol}\\text{ cm}^3$ y una altura de $h = ${h}\\text{ cm}$.</p>
    <p>Calcule el radio ($r$) de la base del cilindro. Redondee su respuesta a 3 cifras significativas.</p>
  `;

  const distractores = [
    2 * rCalculado,
    vol / (Math.PI * h),
    Math.sqrt(vol / h),
    vol / (2 * Math.PI * h),
    rCalculado * 1.5,
    Math.max(1, rCalculado - 1)
  ];

  return [P, formatOptions(rCalculado, distractores, '\\text{ cm}')];
}

// Sub-problema 8: Cilindro - Obtener altura h a partir del área superficial total A y el radio r
function subCilindroAlturaDesdeArea(nPreg) {
  const r = Math.floor(Math.random() * 5) + 3; // 3 a 7 cm
  const hExact = Math.floor(Math.random() * 7) + 5; // 5 a 11 cm

  const areaTotal = roundTo3SF(2 * Math.PI * r * hExact + 2 * Math.PI * r * r);
  const hCalculado = (areaTotal - 2 * Math.PI * r * r) / (2 * Math.PI * r);

  const P = `
    <p>${nPreg + 1}.- Un cilindro cerrado tiene un área superficial total de $A = ${areaTotal}\\text{ cm}^2$ y un radio de base $r = ${r}\\text{ cm}$.</p>
    <p>Calcule la altura ($h$) del cilindro. Redondee su respuesta a 3 cifras significativas.</p>
  `;

  const distractores = [
    areaTotal / (2 * Math.PI * r),
    (areaTotal - Math.PI * r * r) / (2 * Math.PI * r),
    areaTotal / (Math.PI * r * r),
    hCalculado * 1.3,
    Math.max(1, hCalculado - 2)
  ];

  return [P, formatOptions(hCalculado, distractores, '\\text{ cm}')];
}

// Sub-problema 9: Cono - Volumen dado radio r y altura h
function subConoVolumen(nPreg) {
  const r = Math.floor(Math.random() * 5) + 3; // 3 a 7 cm
  const h = Math.floor(Math.random() * 7) + 6; // 6 a 12 cm

  const vol = (1 / 3) * Math.PI * r * r * h;

  const P = `
    <p>${nPreg + 1}.- Un cono circular recto tiene un radio en la base de $r = ${r}\\text{ cm}$ y una altura perpendicular de $h = ${h}\\text{ cm}$.</p>
    <p>Calcule el volumen del cono. Redondee su respuesta a 3 cifras significativas.</p>
  `;

  const distractores = [
    Math.PI * r * r * h,
    0.5 * Math.PI * r * r * h,
    (4 / 3) * Math.PI * Math.pow(r, 3),
    Math.PI * r * h,
    vol * 1.35,
    vol * 0.7
  ];

  return [P, formatOptions(vol, distractores, '\\text{ cm}^3')];
}

// Sub-problema 10: Cono - Área Superficial Total dada la altura h y el radio r (calculando generatriz s con Pitágoras)
function subConoSuperficie(nPreg) {
  const ternas = [
    { r: 3, h: 4 },
    { r: 5, h: 12 },
    { r: 6, h: 8 },
    { r: 8, h: 15 },
    { r: 7, h: 10 },
    { r: 4, h: 7 }
  ];
  const choice = ternas[Math.floor(Math.random() * ternas.length)];
  const r = choice.r;
  const h = choice.h;

  const sGeneratriz = Math.sqrt(r * r + h * h);
  const areaBase = Math.PI * r * r;
  const areaCurva = Math.PI * r * sGeneratriz;
  const areaTotal = areaBase + areaCurva;

  const P = `
    <p>${nPreg + 1}.- Un cono circular recto cerrado tiene un radio de base de $r = ${r}\\text{ cm}$ y una altura perpendicular de $h = ${h}\\text{ cm}$.</p>
    <p>Calcule el área superficial total del cono ($A = \\pi r s + \\pi r^2$, donde $s$ es la generatriz o altura inclinada). Redondee su respuesta a 3 cifras significativas.</p>
  `;

  const distractores = [
    areaCurva,
    Math.PI * r * h + areaBase,
    (1 / 3) * Math.PI * r * r * h,
    2 * Math.PI * r * sGeneratriz + areaBase,
    areaTotal * 1.25,
    areaTotal * 0.8
  ];

  return [P, formatOptions(areaTotal, distractores, '\\text{ cm}^2')];
}

// Sub-problema 11: Prisma triangular recto con catetos en la base
function subPrismaTriangularRecto(nPreg) {
  const a = Math.floor(Math.random() * 5) + 3; // cateto 1 (3 a 7 cm)
  const b = Math.floor(Math.random() * 5) + 4; // cateto 2 (4 a 8 cm)
  const c = Math.sqrt(a * a + b * b); // hipotenusa
  const h = Math.floor(Math.random() * 8) + 5; // longitud/altura del prisma

  const aBase = 0.5 * a * b;
  const perim = a + b + c;
  const areaLateral = perim * h;
  const areaTotal = 2 * aBase + areaLateral;
  const vol = aBase * h;

  const pedirVolumen = Math.random() < 0.5;

  if (pedirVolumen) {
    const P = `
      <p>${nPreg + 1}.- Considere un prisma triangular recto cuyas bases son triángulos rectángulos con catetos de longitud $a = ${a}\\text{ cm}$ y $b = ${b}\\text{ cm}$. La longitud (altura del prisma) es $h = ${h}\\text{ cm}$.</p>
      <p>Calcule el volumen de este prisma. Redondee su respuesta a 3 cifras significativas.</p>
    `;
    const distractores = [
      a * b * h,
      vol / 3,
      areaTotal,
      (a + b + c) * h,
      vol * 1.3
    ];
    return [P, formatOptions(vol, distractores, '\\text{ cm}^3')];
  } else {
    const P = `
      <p>${nPreg + 1}.- Considere un prisma triangular recto cerrado cuyas bases son triángulos rectángulos con catetos de longitud $a = ${a}\\text{ cm}$ y $b = ${b}\\text{ cm}$. La longitud (altura del prisma) es $h = ${h}\\text{ cm}$.</p>
      <p>Calcule el área superficial total del prisma. Redondee su respuesta a 3 cifras significativas.</p>
    `;
    const distractores = [
      areaLateral,
      areaLateral + aBase,
      vol,
      (a + b) * h + 2 * aBase,
      areaTotal * 1.25
    ];
    return [P, formatOptions(areaTotal, distractores, '\\text{ cm}^2')];
  }
}

// Sub-problema 12: Cono - Obtener altura perpendicular h a partir del volumen V y el radio r
function subConoAltura(nPreg) {
  const r = Math.floor(Math.random() * 5) + 3; // 3 a 7 cm
  const hExact = Math.floor(Math.random() * 7) + 5; // 5 a 11 cm

  const vol = roundTo3SF((1 / 3) * Math.PI * r * r * hExact);
  const hCalculado = (3 * vol) / (Math.PI * r * r);

  const P = `
    <p>${nPreg + 1}.- Un cono circular recto tiene un volumen de $V = ${vol}\\text{ cm}^3$ y el radio de su base mide $r = ${r}\\text{ cm}$.</p>
    <p>Determine la altura perpendicular ($h$) del cono. Redondee su respuesta a 3 cifras significativas.</p>
  `;

  const distractores = [
    vol / (Math.PI * r * r),
    (2 * vol) / (Math.PI * r * r),
    (3 * vol) / (2 * Math.PI * r),
    hCalculado * 1.5,
    Math.max(1, hCalculado - 2)
  ];

  return [P, formatOptions(hCalculado, distractores, '\\text{ cm}')];
}

// -------------------------------------------------------------
// Función Principal Exportada
// -------------------------------------------------------------
export async function pregunta(numeroPregunta) {
  try {
    const generadores = [
      subPrismaVolumen,
      subPrismaLado,
      subPrismaAltura,
      subPrismaSuperficie,
      subPiramideVolumen,
      subPiramideSuperficie,
      subCilindroRadio,
      subCilindroAlturaDesdeArea,
      subConoVolumen,
      subConoSuperficie,
      subPrismaTriangularRecto,
      subConoAltura
    ];

    const seleccionador = Math.floor(Math.random() * generadores.length);
    return generadores[seleccionador](numeroPregunta);

  } catch (error) {
    console.error('Error al generar la pregunta 6.6.1:', error);
  }
}
