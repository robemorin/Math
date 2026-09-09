import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Recta Tangente y Normal (Tipo Prueba 1)";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("5.2.4", "5. Cálculo", "Ficha: Recta Tangente y Normal (Tipo Prueba 1)");

    // Añadir estilo para subincisos romanos si no existen en CSS global
    html += `
    <style>
        .FT_ol_i { counter-reset: subitem; padding-left: 20px; margin-top: 5px; }
        .FT_ol_i li { list-style: none; counter-increment: subitem; margin-bottom: 5px; }
        .FT_ol_i li::before { content: '(' counter(subitem, lower-roman) ') '; font-weight: bold; margin-right: 5px; }
    </style>
    `;

    // ==========================================
    // EJERCICIO 1 (CUARTILLA 1): POLINÓMICA CÚBICA
    // f(x) = x^3 - b1 x^2 + c1 x + d1
    // ==========================================
    const b1 = Math.floor(Math.random() * 3) + 3; // 3, 4, 5
    const c1 = Math.floor(Math.random() * 4) + 2; // 2, 3, 4, 5
    const d1 = Math.floor(Math.random() * 10) + 15; // 15 a 24

    const x0 = 2;
    const y0 = Math.pow(x0, 3) - b1 * Math.pow(x0, 2) + c1 * x0 + d1;
    const m_tan = 3 * Math.pow(x0, 2) - 2 * b1 * x0 + c1;
    const c_tan = y0 - m_tan * x0;

    // ==========================================
    // EJERCICIO 2 (CUARTILLA 2): MODELO CUADRÁTICO APLICADO
    // g(x) = a2 x^2 - b2 x + c2
    // ==========================================
    const a2 = Math.floor(Math.random() * 3) + 2; // 2, 3, 4
    const b2 = (Math.floor(Math.random() * 3) + 1) * 2; // 2, 4, 6
    const c2 = Math.floor(Math.random() * 5) + 3; // 3 a 7
    
    const k_mult = Math.floor(Math.random() * 3) + 1;
    const x_par = k_mult;
    const pendiente_deseada = 2 * a2 * x_par - b2;
    const y_par = a2 * x_par * x_par - b2 * x_par + c2;
    const c_par_tan = y_par - pendiente_deseada * x_par;

    html += `
    <div class="seccion-title">I. Análisis Analítico: Recta Tangente y Recta Normal</div>
    <div class="exercise-step">
        <p><strong>1.</strong> Considere la función polinómica dada por:</p>
        <p style="text-align:center; font-size:1.1em;">
            $$f(x) = x^3 - ${b1}x^2 + ${c1}x + ${d1}, \\quad x \\in \\mathbb{R}$$
        </p>
        <p>Sea $P$ el punto sobre la gráfica de $f$ donde $x = ${x0}$.</p>
        
        <ol class="FT_ol_a">
            <li>
                Halle las coordenadas del punto $P$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Halle la derivada $f'(x)$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Deduzca la ecuación de la <strong>recta tangente</strong> a la curva en el punto $P$. Escriba su respuesta en la forma $y = mx + c$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Escriba la pendiente de la <strong>recta normal</strong> a la gráfica de $f$ en el punto $P$ y determine su ecuación general en la forma $ax + by + d = 0$, donde $a, b, d \\in \\mathbb{Z}$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
        ${ai.getTiTip("Para verificar sus resultados, introduzca la función en <code>[Y=]</code> y utilice <code>[2nd] [PRGM] (DRAW) -> 5:Tangent(</code> indicando el valor de $x$.")}
    </div>

    <div class="page-break"></div>

    <div class="seccion-title">II. Tangentes con Pendiente Dada y Contexto Aplicado</div>
    <div class="exercise-step">
        <p><strong>2.</strong> Se modela el perfil de una rampa de patinaje mediante la curva:</p>
        <p style="text-align:center; font-size:1.1em;">
            $$g(x) = ${a2}x^2 - ${b2}x + ${c2}, \\quad x \\geq 0$$
        </p>
        <p>donde $x$ e $y$ están medidos en metros. Una barra de soporte debe ser instalada de forma completamente paralela a la recta $L_1$ de ecuación $y = ${pendiente_deseada}x - 12$.</p>

        <ol class="FT_ol_a">
            <li>
                Halle $g'(x)$. <span class="mark">1</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Determine la coordenada $x$ del punto $Q$ sobre la curva donde la recta tangente es paralela a $L_1$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Halle la ecuación de dicha recta tangente en el punto $Q$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Existe un punto donde la recta tangente a la curva $g(x)$ es horizontal.
                <ol class="FT_ol_i">
                    <li>Halle las coordenadas de dicho punto crítico. <span class="mark">2</span>
                        <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
                    </li>
                    <li>Indique la ecuación de dicha tangente horizontal y justifique brevemente si corresponde a un punto mínimo o máximo de la rampa. <span class="mark">2</span>
                        <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
                    </li>
                </ol>
            </li>
        </ol>
    </div>
    </div>
    <div class="page-break"></div>
    `;

    // CÁLCULOS DEL SOLUCIONARIO
    const norm_A = 1;
    const norm_B = m_tan;
    const norm_C = -(x0 + m_tan * y0);

    const x_critico = (b2 / (2 * a2)).toFixed(2);
    const y_critico = (a2 * Math.pow(b2 / (2 * a2), 2) - b2 * (b2 / (2 * a2)) + c2).toFixed(2);

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 5.2.4 (Recta Tangente y Normal - Prueba 1):</b><br><br>

        <b>1. Polinomio $f(x) = x^3 - ${b1}x^2 + ${c1}x + ${d1}$ en $x = ${x0}$:</b><br>
        * a) $f(${x0}) = (${x0})^3 - ${b1}(${x0})^2 + ${c1}(${x0}) + ${d1} = 8 - ${4*b1} + ${2*c1} + ${d1} = ${y0}$. Coordenadas: $P(${x0}, ${y0})$.<br>
        * b) $f'(x) = 3x^2 - ${2*b1}x + ${c1}$.<br>
        * c) Pendiente: $m = f'(${x0}) = 3(${x0})^2 - ${2*b1}(${x0}) + ${c1} = 12 - ${4*b1} + ${c1} = ${m_tan}$.<br>
        &nbsp;&nbsp;Ecuación tangente: $y - ${y0} = ${m_tan}(x - ${x0}) \\implies y = ${m_tan}x ${c_tan >= 0 ? '+' : ''}${c_tan}$.<br>
        * d) Pendiente normal: $m_{\\text{norm}} = -\\frac{1}{${m_tan}}$.<br>
        &nbsp;&nbsp;Ecuación normal: $y - ${y0} = -\\frac{1}{${m_tan}}(x - ${x0}) \\implies ${m_tan}(y - ${y0}) = -(x - ${x0}) \\implies x + ${m_tan}y ${norm_C >= 0 ? '+' : ''}${norm_C} = 0$.<br><br>

        <b>2. Modelo $g(x) = ${a2}x^2 - ${b2}x + ${c2}$ y paralelismo:</b><br>
        * a) $g'(x) = ${2*a2}x - ${b2}$.<br>
        * b) La recta $L_1$ tiene pendiente $m = ${pendiente_deseada}$. Para que sea paralela:<br>
        &nbsp;&nbsp;$g'(x) = ${pendiente_deseada} \\implies ${2*a2}x - ${b2} = ${pendiente_deseada} \\implies ${2*a2}x = ${pendiente_deseada + b2} \\implies x = ${x_par}$.<br>
        * c) Coordenada $y$: $g(${x_par}) = ${a2}(${x_par})^2 - ${b2}(${x_par}) + ${c2} = ${y_par}$.<br>
        &nbsp;&nbsp;Ecuación tangente: $y - ${y_par} = ${pendiente_deseada}(x - ${x_par}) \\implies y = ${pendiente_deseada}x ${c_par_tan >= 0 ? '+' : ''}${c_par_tan}$.<br>
        * d) Tangente horizontal:<br>
        &nbsp;&nbsp;i. $g'(x) = 0 \\implies ${2*a2}x - ${b2} = 0 \\implies x = ${x_critico}$, $y = ${y_critico}$. Punto: $(${x_critico}, ${y_critico})$.<br>
        &nbsp;&nbsp;ii. Ecuación: $y = ${y_critico}$. Corresponde a un mínimo local/absoluto porque el coeficiente principal $a = ${a2} > 0$ (parábola cóncava hacia arriba, $g''(x) = ${2*a2} > 0$).
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
