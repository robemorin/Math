import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Recta Tangente y Normal con Potencias Racionales y Negativas (Tipo Prueba 1)";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("5.2.5", "5. Cálculo", "Ficha: Recta Tangente y Normal con Potencias Racionales y Negativas (Tipo Prueba 1)");

    html += `
    <style>
        .FT_ol_i { counter-reset: subitem; padding-left: 20px; margin-top: 5px; }
        .FT_ol_i li { list-style: none; counter-increment: subitem; margin-bottom: 5px; }
        .FT_ol_i li::before { content: '(' counter(subitem, lower-roman) ') '; font-weight: bold; margin-right: 5px; }
    </style>
    `;

    // ==========================================
    // EJERCICIO 1 (CUARTILLA 1): FUNCIONES RACIONALES Y POTENCIAS NEGATIVAS
    // f(x) = a * x + b / x^2  en  x = x0
    // f'(x) = a - 2*b / x^3
    // ==========================================
    const a1 = Math.floor(Math.random() * 3) + 2; // 2, 3, 4
    const b1_mult = Math.floor(Math.random() * 3) + 2; // 2, 3, 4
    const x0 = 2; // x0 = 2 => x0^2 = 4, x0^3 = 8
    const b1 = b1_mult * 4; // 8, 12, 16 => b1/x0^2 es entero (2, 3, 4)

    const y0 = a1 * x0 + (b1 / (x0 * x0));
    // f'(x) = a1 - 2*b1 / x^3 => en x0=2: a1 - 2*b1/8 = a1 - b1/4
    const m_tan = a1 - (b1 / 4);
    const c_tan = y0 - m_tan * x0;

    html += `
    <div class="seccion-title">I. Recta Tangente y Normal en Funciones Racionales de la Forma $\\frac{a}{x^n}$</div>
    <div class="exercise-step">
        <p><strong>1.</strong> Considere la curva definida por la función:</p>
        <p style="text-align:center; font-size:1.15em;">
            $$f(x) = ${a1}x + \\frac{${b1}}{x^2}, \\quad x \\neq 0$$
        </p>
        <p>Sea $P$ el punto sobre la curva donde la abscisa es $x = ${x0}$.</p>
        
        <ol class="FT_ol_a">
            <li>
                Halle las coordenadas del punto $P(x_0, y_0)$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Halle la derivada $f'(x)$ expresando su resultado final sin exponentes negativos. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Determine la pendiente de la curva en el punto $P$ y halle la ecuación de la <strong>recta tangente</strong> a la curva en dicho punto. Escriba su respuesta en la forma $y = mx + c$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Halle la ecuación de la <strong>recta normal</strong> a la curva en el punto $P$. Escriba su respuesta en la forma $Ax + By + C = 0$, donde $A, B, C \\in \\mathbb{Z}$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
        ${ai.getTiTip("Para derivar términos en el denominador de la forma $\\frac{a}{x^n}$, reescríbalos primero como $a x^{-n}$ antes de aplicar la regla de la potencia $\\frac{d}{dx}[x^k] = k x^{k-1}$.")}
    </div>

    <div class="page-break"></div>

    <div class="seccion-title">II. Recta Tangente con Radicales de la Forma $\\sqrt{x}$, $\\sqrt[3]{x}$ y $\\frac{c}{\\sqrt{x}}$</div>
    <div class="exercise-step">
    `;

    // ==========================================
    // EJERCICIO 2 (CUARTILLA 2): FUNCIONES CON RADICALES
    // g(x) = k * sqrt(x) + c / sqrt(x)  en x = 4 o 9
    // g(x) = k * x^(1/2) + c * x^(-1/2)
    // g'(x) = (k / 2) * x^(-1/2) - (c / 2) * x^(-3/2)
    // ==========================================
    const x1 = 4; // sqrt(4) = 2, 4^(3/2) = 8
    const k2 = (Math.floor(Math.random() * 3) + 2) * 2; // 4, 6, 8 (múltiplo de 2 para simplificar)
    const c2 = (Math.floor(Math.random() * 3) + 2) * 8; // 16, 24, 32 (múltiplo de 8)

    // En x1 = 4:
    // g(4) = k2 * 2 + c2 / 2 = 2*k2 + c2/2
    const y1 = k2 * 2 + (c2 / 2);
    // g'(4) = (k2 / (2 * 2)) - (c2 / (2 * 8)) = (k2 / 4) - (c2 / 16)
    const m1_val = (k2 / 4) - (c2 / 16);
    const c1_tan = y1 - m1_val * x1;

    // Problema 3: Tangente paralela a una recta dada con raíz cúbica
    // h(x) = 6 * x^(1/3) = 6 * cbrt(x)
    // h'(x) = 2 * x^(-2/3) = 2 / cbrt(x^2)
    // Para que h'(x) = 1/2 => 2 / x^(2/3) = 1/2 => x^(2/3) = 4 => x = 4^(3/2) = 8
    const coef_cbrt = (Math.floor(Math.random() * 3) + 1) * 3; // 3, 6, 9
    // h(x) = coef_cbrt * x^(1/3)
    // h'(x) = (coef_cbrt / 3) * x^(-2/3) = A * x^(-2/3)
    const A_cbrt = coef_cbrt / 3;
    // En x = 8: h(8) = coef_cbrt * 2
    const y_cbrt = coef_cbrt * 2;
    // h'(8) = A_cbrt / (8^(2/3)) = A_cbrt / 4
    const m_cbrt = A_cbrt / 4;
    const c_cbrt_tan = y_cbrt - m_cbrt * 8;

    html += `
        <p><strong>2.</strong> Sea la función $g(x) = ${k2}\\sqrt{x} + \\frac{${c2}}{\\sqrt{x}}$, definida para $x > 0$.</p>
        <ol class="FT_ol_a">
            <li>
                Halle $g'(x)$ en términos de exponentes racionales. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Halle el valor exacto de la pendiente de la recta tangente a la curva $y = g(x)$ en el punto donde $x = ${x1}$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Deduzca la ecuación de la recta tangente en el punto $x = ${x1}$ en la forma $y = mx + c$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>

        <p style="margin-top: 20px;"><strong>3.</strong> Considere la curva dada por $h(x) = ${coef_cbrt}\\sqrt[3]{x}$, para $x > 0$.</p>
        <ol class="FT_ol_a">
            <li>
                Halle $h'(x)$. <span class="mark">1</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Determine las coordenadas del punto $Q$ sobre la gráfica de $h$ donde la recta tangente tiene una pendiente igual a $m = ${m_cbrt}$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Escriba la ecuación de dicha recta tangente en el punto $Q$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    </div>
    <div class="page-break"></div>
    `;

    // ==========================================
    // SOLUCIONARIO DETALLADO
    // ==========================================
    // Para la normal de f(x):
    let norm_sol_str = '';
    if (m_tan === 0) {
        norm_sol_str = `x = ${x0} \\implies x - ${x0} = 0`;
    } else {
        const m_norm = -1 / m_tan;
        // y - y0 = -(1/m_tan)(x - x0) => m_tan*(y - y0) = -(x - x0) => x + m_tan*y - (x0 + m_tan*y0) = 0
        const c_norm = -(x0 + m_tan * y0);
        norm_sol_str = `x + ${m_tan === 1 ? '' : m_tan === -1 ? '-' : m_tan}y ${c_norm >= 0 ? '+' : ''}${c_norm} = 0`;
    }

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem; line-height: 1.4;">
        <b>Solucionario 5.2.5 (Recta Tangente y Normal con Potencias Racionales y Negativas):</b><br><br>

        <b>1. Función Racional $f(x) = ${a1}x + \\frac{${b1}}{x^2}$ en $x = ${x0}$:</b><br>
        * a) Punto $P$: $f(${x0}) = ${a1}(${x0}) + \\frac{${b1}}{${x0}^2} = ${a1*x0} + \\frac{${b1}}{4} = ${y0} \\implies P(${x0}, ${y0})$.<br>
        * b) Derivada: $f(x) = ${a1}x + ${b1}x^{-2} \\implies f'(x) = ${a1}(1) + ${b1}(-2x^{-3}) = ${a1} - ${2*b1}x^{-3} = $ <b>$${a1} - \\frac{${2*b1}}{x^3}$</b>.<br>
        * c) Pendiente: $m = f'(${x0}) = ${a1} - \\frac{${2*b1}}{${x0}^3} = ${a1} - \\frac{${2*b1}}{8} = ${m_tan}$.<br>
        &nbsp;&nbsp;&nbsp;Ecuación de la tangente: $y - ${y0} = ${m_tan}(x - ${x0}) \\implies y = ${m_tan}x ${c_tan >= 0 ? '+' : ''}${c_tan}$.<br>
        * d) Pendiente normal: $m_{\\text{norm}} = -\\frac{1}{${m_tan}}$.<br>
        &nbsp;&nbsp;&nbsp;Ecuación de la normal: $y - ${y0} = -\\frac{1}{${m_tan}}(x - ${x0}) \\implies $ <b>$${norm_sol_str}$</b>.<br><br>

        <b>2. Radicales $g(x) = ${k2}\\sqrt{x} + \\frac{${c2}}{\\sqrt{x}}$ en $x = ${x1}$:</b><br>
        * a) Derivada: $g(x) = ${k2}x^{1/2} + ${c2}x^{-1/2} \\implies g'(x) = ${k2}\\left(\\frac{1}{2}\\right)x^{-1/2} + ${c2}\\left(-\\frac{1}{2}\\right)x^{-3/2} = $ <b>$${k2/2}x^{-1/2} - ${c2/2}x^{-3/2}$</b> (o $\\frac{${k2/2}}{\\sqrt{x}} - \\frac{${c2/2}}{\\sqrt{x^3}}$).<br>
        * b) Evaluación en $x = ${x1}$:<br>
        &nbsp;&nbsp;&nbsp;$g'(${x1}) = \\frac{${k2/2}}{\\sqrt{4}} - \\frac{${c2/2}}{(\\sqrt{4})^3} = \\frac{${k2/2}}{2} - \\frac{${c2/2}}{8} = ${k2/4} - ${c2/16} = $ <b>${m1_val}</b>.<br>
        * c) Punto: $g(${x1}) = ${k2}(2) + \\frac{${c2}}{2} = ${y1}$.<br>
        &nbsp;&nbsp;&nbsp;Ecuación tangente: $y - ${y1} = ${m1_val}(x - ${x1}) \\implies y = ${m1_val}x ${c1_tan >= 0 ? '+' : ''}${c1_tan}$.<br><br>

        <b>3. Raíz Cúbica $h(x) = ${coef_cbrt}\\sqrt[3]{x} = ${coef_cbrt}x^{1/3}$:</b><br>
        * a) Derivada: $h'(x) = ${coef_cbrt}\\left(\\frac{1}{3}\\right)x^{-2/3} = $ <b>$${A_cbrt}x^{-2/3}$</b> (o $\\frac{${A_cbrt}}{\\sqrt[3]{x^2}}$).<br>
        * b) Para $h'(x) = ${m_cbrt}$:<br>
        &nbsp;&nbsp;&nbsp;$\\frac{${A_cbrt}}{x^{2/3}} = ${m_cbrt} \\implies x^{2/3} = \\frac{${A_cbrt}}{${m_cbrt}} = 4 \\implies x = 4^{3/2} = (\\sqrt{4})^3 = 8$.<br>
        &nbsp;&nbsp;&nbsp;Coordenada $y$: $h(8) = ${coef_cbrt}\\sqrt[3]{8} = ${coef_cbrt}(2) = ${y_cbrt} \\implies $ <b>$Q(8, ${y_cbrt})$</b>.<br>
        * c) Ecuación de la tangente en $Q$: $y - ${y_cbrt} = ${m_cbrt}(x - 8) \\implies y = ${m_cbrt}x ${c_cbrt_tan >= 0 ? '+' : ''}${c_cbrt_tan}$.
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
