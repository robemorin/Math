import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Pendiente Instantánea y Límites Numéricos";
}

export function tipo() {
    return 1;
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("5.1.5", "5. Cálculo", "Ficha: Pendiente Instantánea y Límites Numéricos");

    // ==========================================
    // EJERCICIO 1: FUNCIÓN CUADRÁTICA F(X) = X^2 + CX EN X=2 (5 PUNTOS)
    // ==========================================
    const c = Math.floor(Math.random() * 3) + 2; // 2, 3, 4
    const f2 = 4 + 2 * c;
    const slope_exact1 = 4 + c;

    const h_vals1 = [-0.1, -0.01, -0.001, 0, 0.001, 0.01, 0.1];
    const table1 = h_vals1.map(h => {
        if (h === 0) {
            return { h, x: 2, fx: f2, m: "No definido" };
        }
        const x = parseFloat((2 + h).toFixed(3));
        const fx = parseFloat((x * x + c * x).toFixed(6));
        const m = parseFloat(((fx - f2) / h).toFixed(4));
        return { h, x, fx, m };
    });

    // ==========================================
    // EJERCICIO 2: MOVIMIENTO DE PARTÍCULA S(T) = T^2 + VT EN T=3 (5 PUNTOS)
    // ==========================================
    const v = Math.floor(Math.random() * 3) + 1; // 1, 2, 3
    const s3 = 9 + 3 * v;
    const velocity_exact = 6 + v;

    const h_vals2 = [-0.1, -0.01, -0.001, 0, 0.001, 0.01, 0.1];
    const table2 = h_vals2.map(h => {
        if (h === 0) {
            return { h, t: 3, st: s3, v_med: "No definido" };
        }
        const t = parseFloat((3 + h).toFixed(3));
        const st = parseFloat((t * t + v * t).toFixed(6));
        const v_med = parseFloat(((st - s3) / h).toFixed(4));
        return { h, t, st, v_med };
    });

    html += `
    <div class="seccion-title">I. Pendiente Secante y Límite Numérico</div>
    <div class="exercise-step">
        <p><strong>1.</strong> Considere la función cuadrática $f(x) = x^2 + ${c}x$. Deseamos estimar la pendiente de la recta tangente (pendiente instantánea) a la curva en el punto $P(2, ${f2})$.</p>

        <ol class="FT_ol_a">
            <li>
                Complete la siguiente tabla calculando los valores de $f(x)$ y la pendiente de la recta secante $m_{\\text{sec}} = \\frac{f(2+h) - f(2)}{h}$ para cada valor de perturbación $h$. <span class="mark">3</span>
                <div style="display: flex; justify-content: center; margin: 15px 0;">
                    <table style="border-collapse: collapse; border: 1px solid #ccc; font-size: 0.9em; min-width: 360px; text-align: center;">
                        <thead>
                            <tr style="background-color: #f5f5f5;">
                                <th style="border: 1px solid #ddd; padding: 6px;">$h$</th>
                                <th style="border: 1px solid #ddd; padding: 6px;">$x = 2 + h$</th>
                                <th style="border: 1px solid #ddd; padding: 6px;">$f(x)$</th>
                                <th style="border: 1px solid #ddd; padding: 6px;">$m_{\\text{sec}}$</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 5px;">$-0.1$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;">$1.9$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 5px;">$-0.01$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;">$1.99$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 5px;">$-0.001$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;">$1.999$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                            </tr>
                            <tr style="background-color: #fff4f4;">
                                <td style="border: 1px solid #ddd; padding: 5px; font-weight: bold;">$0$</td>
                                <td style="border: 1px solid #ddd; padding: 5px; font-weight: bold;">$2.0$</td>
                                <td style="border: 1px solid #ddd; padding: 5px; font-weight: bold;">${f2}</td>
                                <td style="border: 1px solid #ddd; padding: 5px; font-weight: bold; color: #c00;">Indeterminado</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 5px;">$0.001$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;">$2.001$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 5px;">$0.01$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;">$2.01$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 5px;">$0.1$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;">$2.1$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </li>
            <li>
                A partir de las tendencias observadas en la tabla, estime el valor de la pendiente de la recta tangente a la curva en $x = 2$. Explique detalladamente su deducción formal y por qué no es posible evaluar directamente cuando $h = 0$. <span class="mark">2</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>

    <div class="seccion-title">II. Aplicación en Cinemática Física</div>
    <div class="exercise-step">
        <p><strong>2.</strong> La posición de una partícula que se desplaza sobre una línea recta está dada por la función $s(t) = t^2 + ${v}t$, donde $s$ se mide en metros y $t$ en segundos.</p>

        <ol class="FT_ol_a">
            <li>
                Complete la tabla calculando la velocidad promedio en los intervalos $[3, 3+h]$ para aproximar la velocidad en el instante $t = 3$. <span class="mark">3</span>
                <div style="display: flex; justify-content: center; margin: 15px 0;">
                    <table style="border-collapse: collapse; border: 1px solid #ccc; font-size: 0.9em; min-width: 380px; text-align: center;">
                        <thead>
                            <tr style="background-color: #f5f5f5;">
                                <th style="border: 1px solid #ddd; padding: 6px;">Intervalo</th>
                                <th style="border: 1px solid #ddd; padding: 6px;">$h$</th>
                                <th style="border: 1px solid #ddd; padding: 6px;">$s(3+h)$</th>
                                <th style="border: 1px solid #ddd; padding: 6px;">$v_{\\text{prom}}$ (m/s)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 5px;">$[3, 2.9]$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;">$-0.1$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 5px;">$[3, 2.99]$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;">$-0.01$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 5px;">$[3, 2.999]$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;">$-0.001$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                            </tr>
                            <tr style="background-color: #fff4f4;">
                                <td style="border: 1px solid #ddd; padding: 5px; font-weight: bold;">$[3, 3]$</td>
                                <td style="border: 1px solid #ddd; padding: 5px; font-weight: bold;">$0$</td>
                                <td style="border: 1px solid #ddd; padding: 5px; font-weight: bold;">${s3}</td>
                                <td style="border: 1px solid #ddd; padding: 5px; font-weight: bold; color: #c00;">Indeterminado</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 5px;">$[3, 3.001]$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;">$0.001$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 5px;">$[3, 3.01]$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;">$0.01$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 5px;">$[3, 3.1]$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;">$0.1$</td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                                <td style="border: 1px solid #ddd; padding: 5px;"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </li>
            <li>
                Estime la velocidad instantánea de la partícula en $t = 3$ s y determine la ecuación de la recta tangente a la curva de posición en dicho punto. <span class="mark">2</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    </div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 5.1.5 (Pendiente Instantánea y Límites Numéricos):</b><br><br>
        <b>1. Función $f(x) = x^2 + ${c}x$ en $P(2, ${f2})$:</b><br>
        * $h=-0.1 \\implies f(1.9) = ${table1[0].fx}, m_{\\text{sec}} = ${table1[0].m.toFixed(1)}$<br>
        * $h=-0.01 \\implies f(1.99) = ${table1[1].fx}, m_{\\text{sec}} = ${table1[1].m.toFixed(2)}$<br>
        * $h=-0.001 \\implies f(1.999) = ${table1[2].fx}, m_{\\text{sec}} = ${table1[2].m.toFixed(3)}$<br>
        * $h=0.001 \\implies f(2.001) = ${table1[4].fx}, m_{\\text{sec}} = ${table1[4].m.toFixed(3)}$<br>
        * $h=0.01 \\implies f(2.01) = ${table1[5].fx}, m_{\\text{sec}} = ${table1[5].m.toFixed(2)}$<br>
        * $h=0.1 \\implies f(2.1) = ${table1[6].fx}, m_{\\text{sec}} = ${table1[6].m.toFixed(1)}$<br>
        * Estimación límite: A medida que $h \\to 0$, $m_{\\text{sec}} \\to ${slope_exact1}$. En $h=0$ no se puede evaluar directamente porque resulta en la indeterminación $0/0$.<br><br>

        <b>2. Cinemática $s(t) = t^2 + ${v}t$ en $t = 3$:</b><br>
        * $h=-0.1 \\implies s(2.9) = ${table2[0].st}, v_{\\text{prom}} = ${table2[0].v_med.toFixed(1)}\\text{ m/s}$<br>
        * $h=-0.01 \\implies s(2.99) = ${table2[1].st}, v_{\\text{prom}} = ${table2[1].v_med.toFixed(2)}\\text{ m/s}$<br>
        * $h=-0.001 \\implies s(2.999) = ${table2[2].st}, v_{\\text{prom}} = ${table2[2].v_med.toFixed(3)}\\text{ m/s}$<br>
        * $h=0.001 \\implies s(3.001) = ${table2[4].st}, v_{\\text{prom}} = ${table2[4].v_med.toFixed(3)}\\text{ m/s}$<br>
        * $h=0.01 \\implies s(3.01) = ${table2[5].st}, v_{\\text{prom}} = ${table2[5].v_med.toFixed(2)}\\text{ m/s}$<br>
        * $h=0.1 \\implies s(3.1) = ${table2[6].st}, v_{\\text{prom}} = ${table2[6].v_med.toFixed(1)}\\text{ m/s}$<br>
        * Velocidad instantánea en $t=3$: $v(3) = ${velocity_exact}\\text{ m/s}$.<br>
        * Recta tangente en $(3, ${s3})$: $s - ${s3} = ${velocity_exact}(t - 3) \\implies s = ${velocity_exact}t - ${3 * velocity_exact - s3}$.
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
