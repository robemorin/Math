import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Sistemas de ecuaciones lineales 2x2';
}

export function tipo() {
  return 0;
  /*
  0 - Opción múltiple
  1 - Abierto
  2 - Geogebra
  3 - Híbrido
  */
}

function formatearEcuacion(a, b, c) {
  let ecuacion = '';

  // Término en x
  if (a === 1) {
    ecuacion += 'x';
  } else if (a === -1) {
    ecuacion += '-x';
  } else {
    ecuacion += `${a}x`;
  }

  // Término en y
  if (b === 1) {
    ecuacion += ' + y';
  } else if (b === -1) {
    ecuacion += ' - y';
  } else if (b > 0) {
    ecuacion += ` + ${b}y`;
  } else {
    ecuacion += ` - ${Math.abs(b)}y`;
  }

  ecuacion += ` = ${c}`;
  return ecuacion;
}

export async function pregunta(numeroPregunta) {
  try {
    let a1, b1, a2, b2, det;
    // Generar coeficientes enteros no nulos con determinante != 0
    do {
      a1 = Math.floor(Math.random() * 9) - 4; // [-4, 4]
      if (a1 === 0) a1 = Math.random() < 0.5 ? 1 : -1;

      b1 = Math.floor(Math.random() * 9) - 4;
      if (b1 === 0) b1 = Math.random() < 0.5 ? 1 : -1;

      a2 = Math.floor(Math.random() * 9) - 4;
      if (a2 === 0) a2 = Math.random() < 0.5 ? 1 : -1;

      b2 = Math.floor(Math.random() * 9) - 4;
      if (b2 === 0) b2 = Math.random() < 0.5 ? 1 : -1;

      det = a1 * b2 - a2 * b1;
    } while (det === 0);

    // Generar solución entera (x, y)
    let x = Math.floor(Math.random() * 11) - 5; // [-5, 5]
    let y = Math.floor(Math.random() * 11) - 5; // [-5, 5]

    const c1 = a1 * x + b1 * y;
    const c2 = a2 * x + b2 * y;

    const ec1 = formatearEcuacion(a1, b1, c1);
    const ec2 = formatearEcuacion(a2, b2, c2);

    const P = `${numeroPregunta + 1}.- Resuelva el siguiente sistema de ecuaciones lineales:
      $$\\begin{cases} ${ec1} \\\\ ${ec2} \\end{cases}$$`;

    const formatoSol = (valX, valY) => `$x = ${valX}, \\quad y = ${valY}$`;

    const R = [formatoSol(x, y)];

    // Generar distractores verosímiles
    const distractores = [
      [x, -y],
      [-x, y],
      [-x, -y],
      [y, x],
      [x + 1, y - 1],
      [x - 1, y + 1],
      [x + 2, y],
      [x, y - 2]
    ];

    for (let d of distractores) {
      if (R.length >= 6) break;
      const opcion = formatoSol(d[0], d[1]);
      if (!R.includes(opcion)) {
        R.push(opcion);
      }
    }

    // Si aún faltan distractores por coincidencias
    while (R.length < 6) {
      let dx = x + Math.floor(Math.random() * 7) - 3;
      let dy = y + Math.floor(Math.random() * 7) - 3;
      const opcion = formatoSol(dx, dy);
      if (!R.includes(opcion)) {
        R.push(opcion);
      }
    }

    // Datos primarios para el procedimiento
    const datosPrimarios = {
      a1,
      b1,
      c1,
      a2,
      b2,
      c2,
      x,
      y
    };

    return [P, R, datosPrimarios];
  } catch (error) {
    console.error('Error al generar la pregunta 1.4.1:', error);
  }
}

/**
 * Función global auxiliar para alternar pestañas del procedimiento
 */
if (typeof window !== 'undefined') {
  window.cambiarPestanaProcedimiento = function (uid, metodo) {
    const tabDet = document.getElementById(`tab_det_${uid}`);
    const tabElim = document.getElementById(`tab_elim_${uid}`);
    const panelDet = document.getElementById(`panel_det_${uid}`);
    const panelElim = document.getElementById(`panel_elim_${uid}`);

    if (!tabDet || !tabElim || !panelDet || !panelElim) return;

    const estiloActivo = 'padding: 6px 14px; border: none; border-bottom: 2px solid #2563eb; background: #ffffff; color: #2563eb; font-weight: bold; cursor: pointer; border-radius: 4px 4px 0 0;';
    const estiloInactivo = 'padding: 6px 14px; border: none; border-bottom: 2px solid transparent; background: #e2e8f0; color: #475569; font-weight: normal; cursor: pointer; border-radius: 4px 4px 0 0;';

    if (metodo === 'det') {
      tabDet.style.cssText = estiloActivo;
      tabElim.style.cssText = estiloInactivo;
      panelDet.style.display = 'block';
      panelElim.style.display = 'none';
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([panelDet]);
      }
    } else {
      tabElim.style.cssText = estiloActivo;
      tabDet.style.cssText = estiloInactivo;
      panelElim.style.display = 'block';
      panelDet.style.display = 'none';
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([panelElim]);
      }
    }
  };
}

/**
 * Genera el procedimiento matemático paso a paso con pestañas (Determinantes y Eliminación/Reducción).
 */
export function procedimiento(datos) {
  const a1 = Number(datos.a1);
  const b1 = Number(datos.b1);
  const c1 = Number(datos.c1);
  const a2 = Number(datos.a2);
  const b2 = Number(datos.b2);
  const c2 = Number(datos.c2);
  const x = Number(datos.x);
  const y = Number(datos.y);

  const uid = Math.random().toString(36).substring(2, 9);

  // --- Método 1: Determinantes (Cramer) ---
  const delta = a1 * b2 - a2 * b1;
  const deltaX = c1 * b2 - c2 * b1;
  const deltaY = a1 * c2 - a2 * c1;

  const ec1 = formatearEcuacion(a1, b1, c1);
  const ec2 = formatearEcuacion(a2, b2, c2);

  const htmlDeterminantes = `
    <p><strong>Paso 1: Identificar el sistema</strong></p>
    <p>$$\\begin{cases} (1)\\; ${ec1} \\\\ (2)\\; ${ec2} \\end{cases}$$</p>

    <p><strong>Paso 2: Calcular el determinante del sistema ($\\Delta$)</strong></p>
    <p>$$\\Delta = \\begin{vmatrix} ${a1} & ${b1} \\\\ ${a2} & ${b2} \\end{vmatrix} = (${a1})(${b2}) - (${a2})(${b1}) = ${a1 * b2} - (${a2 * b1}) = ${delta}$$</p>

    <p><strong>Paso 3: Calcular $\\Delta_x$ y obtener $x$</strong></p>
    <p>$$\\Delta_x = \\begin{vmatrix} ${c1} & ${b1} \\\\ ${c2} & ${b2} \\end{vmatrix} = (${c1})(${b2}) - (${c2})(${b1}) = ${c1 * b2} - (${c2 * b1}) = ${deltaX}$$</p>
    <p>$$x = \\frac{\\Delta_x}{\\Delta} = \\frac{${deltaX}}{${delta}} = ${x}$$</p>

    <p><strong>Paso 4: Calcular $\\Delta_y$ y obtener $y$</strong></p>
    <p>$$\\Delta_y = \\begin{vmatrix} ${a1} & ${c1} \\\\ ${a2} & ${c2} \\end{vmatrix} = (${a1})(${c2}) - (${a2})(${c1}) = ${a1 * c2} - (${a2 * c1}) = ${deltaY}$$</p>
    <p>$$y = \\frac{\\Delta_y}{\\Delta} = \\frac{${deltaY}}{${delta}} = ${y}$$</p>
    <p><strong>Solución:</strong> $x = ${x}, \\quad y = ${y}$</p>
  `;

  // --- Método 2: Eliminación (Suma y resta) ---
  // Multiplicamos ec1 por b2 y ec2 por -b1 para eliminar 'y'
  const m1 = b2;
  const m2 = -b1;

  const e1_a = a1 * m1;
  const e1_b = b1 * m1;
  const e1_c = c1 * m1;

  const e2_a = a2 * m2;
  const e2_b = b2 * m2;
  const e2_c = c2 * m2;

  const sumA = e1_a + e2_a;
  const sumC = e1_c + e2_c;

  const ecMult1 = formatearEcuacion(e1_a, e1_b, e1_c);
  const ecMult2 = formatearEcuacion(e2_a, e2_b, e2_c);

  const coefY = b1 > 0 ? `+ ${b1}` : `- ${Math.abs(b1)}`;
  const pasoSust = `${a1}(${x}) ${coefY}y = ${c1} \\implies ${a1 * x} ${coefY}y = ${c1}`;
  const pasoDespY = `${b1}y = ${c1} - (${a1 * x}) = ${c1 - a1 * x} \\implies y = \\frac{${c1 - a1 * x}}{${b1}} = ${y}`;

  const htmlEliminacion = `
    <p><strong>Paso 1: Preparar ecuaciones para eliminar $y$</strong></p>
    <p>Multiplicamos la ecuación $(1)$ por $(${m1})$ y la ecuación $(2)$ por $(${m2})$:</p>
    <p>
      $$(${m1}) \\cdot [${ec1}] \\implies ${ecMult1}$$
      $$(${m2}) \\cdot [${ec2}] \\implies ${ecMult2}$$
    </p>

    <p><strong>Paso 2: Sumar ambas ecuaciones miembro a miembro</strong></p>
    <p>
      $$\\begin{aligned}
        ${ecMult1} \\\\
        \\underline{+ \\; (${ecMult2})} \\\\
        ${sumA}x = ${sumC}
      \\end{aligned}$$
    </p>
    <p>Despejando $x$: $$x = \\frac{${sumC}}{${sumA}} = ${x}$$</p>

    <p><strong>Paso 3: Sustituir $x = ${x}$ en la ecuación $(1)$ para hallar $y$</strong></p>
    <p>$$${pasoSust}$$</p>
    <p>$$${pasoDespY}$$</p>
    <p><strong>Solución:</strong> $x = ${x}, \\quad y = ${y}$</p>
  `;

  return `
    <div style="margin-top: 8px;">
      <!-- Barra de Pestañas -->
      <div style="display: flex; gap: 4px; border-bottom: 2px solid #cbd5e1; margin-bottom: 12px;">
        <button id="tab_det_${uid}" type="button" onclick="window.cambiarPestanaProcedimiento('${uid}', 'det')" 
          style="padding: 6px 14px; border: none; border-bottom: 2px solid #2563eb; background: #ffffff; color: #2563eb; font-weight: bold; cursor: pointer; border-radius: 4px 4px 0 0;">
          📐 Por Determinantes (Cramer)
        </button>
        <button id="tab_elim_${uid}" type="button" onclick="window.cambiarPestanaProcedimiento('${uid}', 'elim')" 
          style="padding: 6px 14px; border: none; border-bottom: 2px solid transparent; background: #e2e8f0; color: #475569; font-weight: normal; cursor: pointer; border-radius: 4px 4px 0 0;">
          ⚡ Por Eliminación (Suma y Resta)
        </button>
      </div>

      <!-- Contenidos de las pestañas -->
      <div id="panel_det_${uid}" style="display: block;">
        ${htmlDeterminantes}
      </div>
      <div id="panel_elim_${uid}" style="display: none;">
        ${htmlEliminacion}
      </div>
    </div>
  `;
}
