import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Módulo de práctica: Introducción al cálculo (Tasa de cambio, límites y recta tangente).
 * Tiempo estimado: 40-50 minutos.
 * Ficha generada a partir de los temas 10.1.1, 10.2.1 y 10.3.1.
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export function name() {
  return "Ficha: Tasa de cambio, Límites y Recta Tangente";
}

export function tipo() {
  return 1; // Abierta / Imprimible
}

export async function pregunta(np, code) {
    // ---------------------------------------------------------
    // TEMA 10.1: Tasa de cambio promedio
    // ---------------------------------------------------------
    const contextos1 = [
      { variableX: "t", variableY: "T", unidadX: "horas", unidadY: "°C", fenomeno: "la temperatura de una cámara frigorífica" },
      { variableX: "t", variableY: "d", unidadX: "s", unidadY: "m", fenomeno: "la distancia recorrida por un ciclista" },
      { variableX: "t", variableY: "V", unidadX: "min", unidadY: "L", fenomeno: "el volumen de agua en un tanque" }
    ];
    const ctx1 = contextos1[Math.floor(Math.random() * contextos1.length)];
    
    // Función cuadrática: y = ax^2 + bx + c
    const a1 = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1) * 0.5;
    const b1 = (Math.floor(Math.random() * 8) + 2) * (Math.random() > 0.5 ? 1 : -1);
    const c1 = Math.floor(Math.random() * 20) + 5;
    
    const x1_a = Math.floor(Math.random() * 2) + 1;
    const x1_b = x1_a + Math.floor(Math.random() * 3) + 1;
    
    const y1_a = a1 * x1_a * x1_a + b1 * x1_a + c1;
    const y1_b = a1 * x1_b * x1_b + b1 * x1_b + c1;
    const tasaPromedio = (y1_b - y1_a) / (x1_b - x1_a);

    let signoB1 = b1 >= 0 ? "+" : "-";
    let signoC1 = c1 >= 0 ? "+" : "-";
    let funcionText1 = `${ctx1.variableY}(${ctx1.variableX}) = ${a1}${ctx1.variableX}^2 ${signoB1} ${Math.abs(b1)}${ctx1.variableX} ${signoC1} ${Math.abs(c1)}`;

    // ---------------------------------------------------------
    // TEMA 10.2: Exploración límite de la derivada
    // ---------------------------------------------------------
    const contextos2 = [
      { variableX: "t", variableY: "P", unidadX: "días", unidadY: "bacterias", fenomeno: "la población de un cultivo de bacterias", funName: "P(t)" },
      { variableX: "t", variableY: "I", unidadX: "meses", unidadY: "USD", fenomeno: "los ingresos de una pequeña empresa", funName: "I(t)" }
    ];
    const ctx2 = contextos2[Math.floor(Math.random() * contextos2.length)];
    
    const a2 = (Math.floor(Math.random() * 3) + 1);
    const b2 = (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1);
    const c2 = Math.floor(Math.random() * 50) + 100;
    
    const t0 = Math.floor(Math.random() * 3) + 2; 
    
    let coefA2 = a2 === 1 ? "" : a2;
    let signoB2 = b2 >= 0 ? "+" : "-";
    let signoC2 = c2 >= 0 ? "+" : "-";
    let funcStr2 = `${coefA2}${ctx2.variableX}^2 ${signoB2} ${Math.abs(b2)}${ctx2.variableX} ${signoC2} ${Math.abs(c2)}`;
    
    const h1 = 0.1, h2 = 0.01, h3 = 0.001;
    const ans1 = 2 * a2 * t0 + a2 * h1 + b2;
    const ans2 = 2 * a2 * t0 + a2 * h2 + b2;
    const ans3 = 2 * a2 * t0 + a2 * h3 + b2;
    const ansLimit = 2 * a2 * t0 + b2;

    // ---------------------------------------------------------
    // TEMA 10.3: Pendiente de la tangente (derivación directa)
    // ---------------------------------------------------------
    let type3 = Math.floor(Math.random() * 2); 
    let latexFunc3 = "";
    let m3 = 0;
    let x0_3 = 0;
    
    if (type3 === 0) { // Polinomial
        let a3 = Math.floor(Math.random() * 6) - 3; 
        if (a3 === 0) a3 = 2;
        let b3 = Math.floor(Math.random() * 6) - 3;
        let c3 = Math.floor(Math.random() * 9) - 4;
        x0_3 = Math.floor(Math.random() * 5) - 2; 
        
        let term1 = a3 === 1 ? 'x^2' : (a3 === -1 ? '-x^2' : `${a3}x^2`);
        let term2 = b3 === 0 ? '' : (b3 === 1 ? '+x' : (b3 === -1 ? '-x' : (b3 > 0 ? `+${b3}x` : `${b3}x`)));
        let term3 = c3 === 0 ? '' : (c3 > 0 ? `+${c3}` : `${c3}`);
        
        latexFunc3 = `f(x) = ${term1}${term2}${term3}`;
        m3 = 2 * a3 * x0_3 + b3;
    } else { // Fracción c / x^n
        let c3 = Math.floor(Math.random() * 8) - 4;
        if (c3 === 0) c3 = 3;
        let n3 = Math.floor(Math.random() * 2) + 1; 
        do {
            x0_3 = Math.floor(Math.random() * 4) - 2; 
        } while (x0_3 === 0);
        
        let powerX = n3 === 1 ? 'x' : `x^{${n3}}`;
        latexFunc3 = `f(x) = \\frac{${c3}}{${powerX}}`;
        m3 = (-c3 * n3) / Math.pow(x0_3, n3 + 1);
    }

    // ---------------------------------------------------------
    // TEMA 10.4: Aplicación a Cinemática (Velocidad)
    // ---------------------------------------------------------
    const s_a = Math.floor(Math.random() * 4) + 1;
    const s_b = (Math.floor(Math.random() * 6) + 2) * (Math.random() > 0.5 ? 1 : -1);
    const s_c = Math.floor(Math.random() * 10);
    const t_eval = Math.floor(Math.random() * 4) + 2;

    let signoSb = s_b >= 0 ? "+" : "-";
    let signoSc = s_c >= 0 ? "+" : "-";
    let funcS = `s(t) = ${s_a}t^2 ${signoSb} ${Math.abs(s_b)}t ${signoSc} ${s_c}`;
    
    let vel_exacta = 2 * s_a * t_eval + s_b;

    // ---------------------------------------------------------
    // CONSTRUCCIÓN DEL HTML
    // ---------------------------------------------------------
    let Pregunta = `
    <div class="problema2" style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="text-align:center;">Ficha de Trabajo: Tasa de Cambio, Límites y Derivadas</h2>
        <p><b>Instrucciones:</b> Resuelva los siguientes problemas mostrando todo su procedimiento de forma clara y ordenada.</p>
        <hr>

        <!-- PREGUNTA 1 -->
        <h3>1. Tasa de cambio promedio</h3>
        <p>El modelo matemático para ${ctx1.fenomeno} (${ctx1.variableY}) en función del tiempo (${ctx1.variableX}, en ${ctx1.unidadX}) está dado por la función:</p>
        <p style="text-align: center; font-size: 1.1em;">$${funcionText1}$</p>
        <ol class="FT_ol_a">
            <li>Calcule el valor de ${ctx1.variableY} cuando $${ctx1.variableX} = ${x1_a}$ y cuando $${ctx1.variableX} = ${x1_b}$. ${CR(4)}</li>
            <li>Determine la tasa de cambio promedio de ${ctx1.variableY} con respecto a ${ctx1.variableX} en el intervalo desde $${ctx1.variableX} = ${x1_a}$ hasta $${ctx1.variableX} = ${x1_b}$. ${CR(4)}</li>
            <li>Interprete el resultado obtenido en el contexto del problema (incluya las unidades). ${CR(3)}</li>
        </ol>
        <div class="page"></div>

        <!-- PREGUNTA 2 -->
        <h3>2. Estimación de la tasa de cambio instantánea (Límites)</h3>
        <p>El modelo matemático para ${ctx2.fenomeno} (${ctx2.variableY}) en función del tiempo (${ctx2.variableX}, en ${ctx2.unidadX}) está dado por la función:</p>
        <p style="text-align: center; font-size: 1.1em;">$${ctx2.funName} = ${funcStr2}$</p>
        <p>Queremos estimar la tasa de cambio instantánea exactamente en $${ctx2.variableX} = ${t0}$. Para ello, calcule la tasa de cambio promedio en intervalos cada vez más pequeños empezando desde $${t0}$.</p>
        <ol class="FT_ol_a">
            <li>Complete la siguiente tabla calculando la tasa de cambio promedio para cada intervalo. Muestre al menos un cálculo de ejemplo. ${CR(2)}
                <table style="width:80%; margin: 15px auto; text-align: center; border-collapse: collapse;" border="1" cellpadding="8">
                    <tr>
                        <th>Intervalo</th>
                        <th>Tasa de cambio promedio (${ctx2.unidadY}/${ctx2.unidadX})</th>
                    </tr>
                    <tr>
                        <td>$[${t0}, ${t0 + 0.1}]$</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>$[${t0}, ${t0 + 0.01}]$</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>$[${t0}, ${t0 + 0.001}]$</td>
                        <td></td>
                    </tr>
                </table>
            </li>
            <li>A partir de la tendencia observada en la tabla, escriba su estimación (el límite) para la tasa de cambio instantánea en $${ctx2.variableX} = ${t0}$. ${CR(2)}</li>
        </ol>
        
        <div class="page"></div>

        <!-- PREGUNTA 3 -->
        <h3>3. Pendiente de la recta tangente</h3>
        <p>La derivada de una función evaluada en un punto representa la pendiente de la recta tangente a la curva en ese punto.</p>
        <ol class="FT_ol_a">
            <li>Considere la función $${latexFunc3}$. Utilizando las reglas de derivación, encuentre la función derivada $f'(x)$. ${CR(6)}</li>
            <li>Calcule la pendiente de la recta tangente a la curva en el punto donde $x = ${x0_3}$. ${CR(5)}</li>
            <li>Escriba la ecuación de la recta tangente a la curva en ese mismo punto (recuerde usar el formato $y - y_1 = m(x - x_1)$). ${CR(6)}</li>
        </ol>

        <div class="page"></div>

        <!-- PREGUNTA 4 -->
        <h3>4. Aplicación de la derivada: Cinemática</h3>
        <p>El desplazamiento $s$ (en metros) de un objeto que se mueve a lo largo de una línea recta está modelado por la siguiente función del tiempo $t$ (en segundos):</p>
        <p style="text-align: center; font-size: 1.1em;">$${funcS}$</p>
        <ol class="FT_ol_a">
            <li>Encuentre la expresión para la velocidad $v(t)$ del objeto en cualquier instante $t$. ${CR(4)}</li>
            <li>Calcule la velocidad del objeto exactamente a los $t = ${t_eval}$ segundos e interprete su significado (incluya unidades). ${CR(4)}</li>
            <li>Determine en qué instante $t$ el objeto se encuentra momentáneamente en reposo (es decir, cuándo su velocidad es cero). Si el resultado es negativo, indique que no ocurre para $t \\geq 0$. ${CR(6)}</li>
        </ol>
    </div>
    <div class="page"></div>
    `;

    // ---------------------------------------------------------
    // SOLUCIONARIO (Oculto en impresión, útil para el profesor)
    // ---------------------------------------------------------
    let Solucion = `
    <div class="ans"><b>Solucionario Sugerido:</b>
        <h4>Pregunta 1</h4>
        <ul>
            <li>a) Para $${ctx1.variableX} = ${x1_a}$, $${ctx1.variableY} = ${y1_a}$. Para $${ctx1.variableX} = ${x1_b}$, $${ctx1.variableY} = ${y1_b}$.</li>
            <li>b) Tasa promedio = $\\frac{${y1_b} - (${y1_a})}{${x1_b} - ${x1_a}} = ${tasaPromedio}$.</li>
            <li>c) Interpretación: En promedio, ${ctx1.fenomeno} aumenta/disminuye a razón de ${tasaPromedio} ${ctx1.unidadY}/${ctx1.unidadX} entre $${ctx1.variableX}=${x1_a}$ y $${ctx1.variableX}=${x1_b}$.</li>
        </ul>
        <h4>Pregunta 2</h4>
        <ul>
            <li>a) Tasas promedio: $[${t0}, ${t0 + 0.1}] \\Rightarrow ${ans1.toFixed(3)}$; $[${t0}, ${t0 + 0.01}] \\Rightarrow ${ans2.toFixed(3)}$; $[${t0}, ${t0 + 0.001}] \\Rightarrow ${ans3.toFixed(3)}$.</li>
            <li>b) Estimación del límite: $${ansLimit}$ ${ctx2.unidadY}/${ctx2.unidadX}.</li>
        </ul>
        <h4>Pregunta 3</h4>
        <ul>
            <li>a) Se aplica la regla de derivación correspondiente.</li>
            <li>b) $m = f'(${x0_3}) = ${m3.toFixed(3)}$.</li>
            <li>c) Hallar $y_1 = f(${x0_3})$ y sustituir en la ecuación de la recta.</li>
        </ul>
        <h4>Pregunta 4</h4>
        <ul>
            <li>a) $v(t) = s'(t) = ${2 * s_a}t ${s_b >= 0 ? "+" : ""} ${s_b}$.</li>
            <li>b) $v(${t_eval}) = ${vel_exacta}$ m/s.</li>
            <li>c) Se iguala a cero: $${2 * s_a}t ${s_b >= 0 ? "+" : ""} ${s_b} = 0 \\Rightarrow t = ${(-s_b / (2 * s_a)).toFixed(2)}$ s.</li>
        </ul><div class="page"></div>
    </div>`;

    return [Pregunta, Solucion];
}

export async function render(container, n, code) {
    // No requiere render interactivo si es solo para impresión.
}
