import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Sistemas de ecuaciones lineales 2x2 II';
}

export function tipo() {
  return 3;
  /*
  0 - Opción múltiple
  1 - Abierto
  2 - Geogebra
  3 - Híbrido
  */
}

export function directivaIA(){
  const contexto =['Economia', 'Ecologia', 'Logistica', 'Crecimiento poblacional', 'Ergonomia', 'Analisis estadistico de un fenomeno social',
     'kermese', 'feria de ciencias', 'competencia de matematicas', 'competencia de robotica', 'competencia de programacion', 'competencia de ingenieria',
     'competencia de ciencias', 'competencia de quimica', 'competencia de biologia', 'competencia de fisica', 'competencia de astronomia', 'competencia de geografia', 'competencia de historia', 'competencia de literatura', 'competencia de arte', 'competencia de musica', 'competencia de teatro', 'competencia de danza', 'competencia de fotografia', 'competencia de cine', 'competencia de animacion', 'competencia de videojuegos'];
  return `Actúa como un examinador senior y redactor jefe de currículo para el curso de Matemáticas: Aplicaciones e Interpretaciones NM (Nivel Medio) 
del Bachillerato Internacional (IB). Tu tarea es diseñar un único ejercicio original tipo examen (que conste de varios incisos progresivos: a, b, c...) 
acompañado de su respectivo criterio de corrección oficial (mark scheme).Sigue rigurosamente las siguientes directrices pedagógicas y de formato del IB:
1. Contextualización Realista: El problema debe estar situado en un contexto del mundo real con el tema central sea '${name()}' y
contextualizado en ${contexto[Math.floor(Math.random() * contexto.length)]}. 
Evita problemas puramente abstractos o algebraicos sin aplicación.
2. Uso de la Tecnología (GDC) Recuerda que en el curso AI SL el uso de la calculadora gráfica (GDC) está permitido en ambos exámenes (Paper 1 y Paper 2).
Diseña el ejercicio de modo que requiera el uso inteligente de funciones de la GDC, sin caer en cálculos manuales tediosos innecesarios.
3. Selección y Rigor de los Términos de Instrucción (Command Terms)Utiliza estrictamente la taxonomía oficial de términos de instrucción del IB para los distintos incisos
(por ejemplo: Determine, Escriba, Calcula, Encuentre, Mueste, Demuestre, Explique, Interprete, Compruebe, Bosqueje). La dificultad debe escalar de forma natural:
Inciso inicial (a): Directo, uso básico de una fórmula del cuadernillo de fórmulas o lectura simple de datos (1-2 marcas).
Inciso intermedio (b): Aplicación de un modelo matemático, interpretación de un parámetro en contexto o análisis estadístico (2-4 marcas).
Inciso final (c): Justificación crítica, limitación del modelo matemático propuesto, o un cálculo más complejo que requiera conectar dos bloques temáticos (2-3 marcas).
El puntaje total del ejercicio debe oscilar entre 6 y 9 marcas.
4. Estructura de Salida Requerida: Proporciona la respuesta estructurada estrictamente en dos secciones con encabezados de nivel 3:
### Enunciado del Ejercicio
Numerado correctamente, con contexto del mundo real y definición clara de variables y unidades. Con incisos progresivos (a, b, c...).
### Solución y Mark Scheme Oficial
Desglosando paso a paso las marcas de método ($M$), de respuesta exacta/precisa ($A$), de razonamiento/explicación ($R$), y las marcas de tendencia (FT - Follow Through) si aplican en incisos posteriores.
5. Formato de Respuesta y Matemáticas: Redacta la respuesta en formato Markdown estándar estructurado (usa encabezados ###, negritas **, listas - y párrafos limpios). Para todas las expresiones, variables y fórmulas matemáticas utiliza estrictamente delimitadores LaTeX: usa $...$ para matemáticas en línea (ejemplo: $y = mx + b$, marcas $[M1]$) y $$...$$ para ecuaciones principales en bloque. Asegúrate de cerrar siempre cada signo de dólar para no romper el modo matemático. NO uses el signo $ para representar dinero (si hablas de dinero escribe "USD", "euros" o "MXN").
6. La respuesta debe ser exclusivamente en español, sin traducciones al inglés ni a otros idiomas. No incluyas explicaciones adicionales fuera de la estructura solicitada.
`;
}

export function video(){
  return "https://youtu.be/9Ni80BgzNIA?si=4WYhOTxm5AdVqvt1&t=9"; // Reemplaza con tu enlace de YouTube
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

export async function pregunta(i, code, esImprimible = false) {
  try {
    let a1, b1, a2, b2, det;
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

    const x = Math.floor(Math.random() * 11) - 5; // [-5, 5]
    const y = Math.floor(Math.random() * 11) - 5; // [-5, 5]

    const c1 = a1 * x + b1 * y;
    const c2 = a2 * x + b2 * y;

    const ec1 = formatearEcuacion(a1, b1, c1);
    const ec2 = formatearEcuacion(a2, b2, c2);

    const Pregunta = `
      <div class="pregunta-abierta" 
           data-a1="${a1}" data-b1="${b1}" data-c1="${c1}" 
           data-a2="${a2}" data-b2="${b2}" data-c2="${c2}" 
           data-x="${x}" data-y="${y}" style="display: none;">
        <p>${i + 1}.- Resuelva el siguiente sistema de ecuaciones lineales para $x$ y $y$:
        $$\\begin{cases} ${ec1} \\\\ ${ec2} \\end{cases}$$
        <span id="resultado_${i}" name="question"></span></p>
        <p>
          $x = $ <math-field id="mf_x_${i}"></math-field> &nbsp;&nbsp;&nbsp;&nbsp;
          $y = $ <math-field id="mf_y_${i}"></math-field>
          <span id="ans_${i}" style="margin-left: 15px;"><i>e.g.</i> $x = 3, \\; y = -2$</span>
        </p>
        <div id="proc_container_${i}" style="margin-top: 10px;"></div>
      </div>
    `;

    if (esImprimible) {
      const respuesta = `$x = ${x}, \\quad y = ${y}$`;
      return [Pregunta, respuesta];
    }

    render();
    return Pregunta;
  } catch (error) {
    console.error('Error al generar la pregunta 1.4.2:', error);
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
 * Genera el procedimiento matemático paso a paso con pestañas (Determinantes y Eliminación).
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

    <p><strong>Paso 2: Calcular el determinante general ($\\Delta$)</strong></p>
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
    <div style="background: #ffffff; border: 1px solid #bfdbfe; border-left: 4px solid #2563eb; padding: 14px; border-radius: 6px; margin-top: 10px;">
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

export async function render() {
  window.accionR2P = function (i) {
    let totalPuntos = 2;
    let puntos = 0;
    const preguntas = document.getElementsByClassName('pregunta-abierta');
    const preguntaActual = preguntas[i];

    if (!preguntaActual) return [0, totalPuntos];

    const mathFields = preguntaActual.getElementsByTagName('math-field');
    const ansX = mathFields[0] ? mathFields[0].value.trim() : '';
    const ansY = mathFields[1] ? mathFields[1].value.trim() : '';

    const expectedX = preguntaActual.dataset.x;
    const expectedY = preguntaActual.dataset.y;

    // Validación de x
    if (ansX === expectedX) {
      puntos++;
      if (mathFields[0]) mathFields[0].style.border = 'solid 3px green';
    } else {
      if (mathFields[0]) mathFields[0].style.backgroundColor = '#ffcccc';
    }

    // Validación de y
    if (ansY === expectedY) {
      puntos++;
      if (mathFields[1]) mathFields[1].style.border = 'solid 3px green';
    } else {
      if (mathFields[1]) mathFields[1].style.backgroundColor = '#ffcccc';
    }

    // Mostrar respuesta correcta
    const ansElement = document.getElementById(`ans_${i}`);
    if (ansElement) {
      if (puntos === totalPuntos) {
        ansElement.innerHTML = '';
      } else {
        ansElement.innerHTML = `R: $x = ${expectedX}, \\quad y = ${expectedY}$`;
        if (window.MathJax && window.MathJax.typesetPromise) {
          MathJax.typesetPromise([ansElement]).catch((err) =>
            console.error('Error procesando MathJax:', err)
          );
        }
      }
    }

    // Botón de ver procedimiento interactivo bajo demanda
    const procContainer = document.getElementById(`proc_container_${i}`);
    if (procContainer && !procContainer.querySelector('.btn-proc-abierta')) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'r2p-ia-action-btn btn-proc-abierta';
      btn.innerText = '🔍 Ver procedimiento (Paso a paso)';
      btn.style.marginTop = '6px';
      btn.style.cursor = 'pointer';

      const procBox = document.createElement('div');
      procBox.style.display = 'none';

      btn.addEventListener('click', async () => {
        if (procBox.style.display !== 'none') {
          procBox.style.display = 'none';
          btn.innerText = '🔍 Ver procedimiento (Paso a paso)';
        } else {
          procBox.innerHTML = procedimiento(preguntaActual.dataset);
          procBox.style.display = 'block';
          btn.innerText = '🔼 Ocultar procedimiento';
          if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([procBox]);
          }
        }
      });

      procContainer.appendChild(btn);
      procContainer.appendChild(procBox);
    }

    return [puntos, totalPuntos];
  };
}
