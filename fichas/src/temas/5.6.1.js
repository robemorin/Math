import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Integración en Contextos Físicos";
}

export function tipo() {
    return 1;
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("5.6.1", "5. Cálculo", "Ficha: Integración en Contextos Físicos");

    // ======================================================
    // EJERCICIO 1: CINEMÁTICA
    // ======================================================
    const k1 = Math.floor(Math.random() * 4) + 1;
    const c1 = Math.floor(Math.random() * 10) + 5;
    const s0 = Math.floor(Math.random() * 10);
    const t_final = Math.floor(Math.random() * 3) + 2; 
    const pos_final = Math.pow(t_final, 3) - k1 * Math.pow(t_final, 2) + c1 * t_final + s0;
    const a_t2 = 6 * 2 - 2 * k1;

    // ======================================================
    // EJERCICIO 2: TRABAJO MECÁNICO
    // ======================================================
    const k2 = (Math.floor(Math.random() * 5) + 2) * 3; 
    const coeff_int = (k2 * 2) / 3; 
    const dist2 = 4;
    const trabajo2 = coeff_int * Math.pow(dist2, 1.5);

    // ======================================================
    // EJERCICIO 3: DINÁMICA DE FLUIDOS
    // ======================================================
    const k3 = Math.floor(Math.random() * 10) + 10;
    const t_fin3 = Math.floor(Math.random() * 5) + 4; 
    const vol_total3 = (2 * k3 * Math.sqrt(t_fin3)) - (2 * k3 * Math.sqrt(1));

    // ======================================================
    // EJERCICIO 4: ELECTRICIDAD
    // ======================================================
    const a4 = 3;
    const b4 = 2 * (Math.floor(Math.random() * 3) + 1);
    const t_carga = 4;
    const carga_total = Math.pow(t_carga, 3) + (b4 / 2) * Math.pow(t_carga, 2);

    html += `
    <div class="seccion-title">I. Cinemática y Movimiento Rectilíneo</div>
    <div class="exercise-step">
        <p><strong>1.</strong> Una partícula se mueve en línea recta tal que su velocidad, $v$ (en m s$^{-1}$), en el instante $t$ segundos viene dada por:</p>
        <p style="text-align:center;">$$v(t) = 3t^2 - ${2*k1}t + ${c1}, \\quad t \\geq 0$$</p>
        <p>Se sabe que en el instante $t=0$, la partícula se encuentra en la posición $s = ${s0}$ metros.</p>
        <ol class="FT_ol_a">
            <li>
                Determine una expresión para el desplazamiento $s(t)$ de la partícula. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Calcule la posición de la partícula en el instante $t = ${t_final}$ segundos. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Halle la aceleración de la partícula en $t = 2$ segundos. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="seccion-title">II. Trabajo Mecánico por una Fuerza Variable</div>
    <div class="exercise-step">
        <p><strong>2.</strong> Una fuerza variable $F$ actúa sobre un objeto desplazándolo a lo largo del eje $x$. La magnitud de la fuerza en Newtons está dada por $F(x) = ${k2}\\sqrt{x}$, donde $x$ es la posición en metros desde el origen ($x=0$).</p>
        <ol class="FT_ol_a">
            <li>
                Deduzca una expresión para el trabajo realizado $W(x)$ en función de la distancia $x$, partiendo desde el origen. <span class="mark">3</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Calcule el trabajo realizado durante los primeros $4$ metros de recorrido. <span class="mark">3</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>

    <div class="seccion-title">III. Dinámica de Fluidos (Tasa de Fuga)</div>
    <div class="exercise-step">
        <p><strong>3.</strong> Un tanque contiene agua y presenta una fuga. La tasa a la que el agua sale del tanque, en litros por minuto, está modelada por:</p>
        <p style="text-align:center;">$$R(t) = \\frac{${k3}}{\\sqrt{t}}, \\quad t \\geq 1$$</p>
        <ol class="FT_ol_a">
            <li>
                Deduzca una expresión general para el volumen total de agua fugada $V(t)$ en función del tiempo $t$. <span class="mark">3</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Calcule la cantidad total de agua que se fuga del tanque entre $t = 1$ y $t = ${t_fin3}$ minutos. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="seccion-title">IV. Corriente y Carga Eléctrica</div>
    <div class="exercise-step">
        <p><strong>4.</strong> La corriente eléctrica $I$ (en Amperios) que fluye por un conductor se define como $I(t) = \\frac{dq}{dt}$, donde $q$ es la carga en Coulombs. Se modela la corriente mediante la función $I(t) = ${a4}t^2 + ${b4}t$, para $0 \\leq t \\leq 10$, con la condición inicial $q(0) = 0$.</p>
        <ol class="FT_ol_a">
            <li>
                Determine una expresión para la carga $q(t)$. <span class="mark">3</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Calcule la carga total acumulada después de ${t_carga}$ segundos. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Explique el significado físico del área bajo la curva de la gráfica de $I(t)$ contra $t$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    </div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 5.6.1 (Integración en Contextos Físicos):</b><br><br>
        <b>1. Cinemática:</b><br>
        * a) $s(t) = \\int (3t^2 - ${2*k1}t + ${c1})\\,dt = t^3 - ${k1}t^2 + ${c1}t + ${s0}$<br>
        * b) $s(${t_final}) = (${t_final})^3 - ${k1}(${t_final})^2 + ${c1}(${t_final}) + ${s0} = ${pos_final}$ m<br>
        * c) $a(t) = \\frac{dv}{dt} = 6t - ${2*k1} \\implies a(2) = 6(2) - ${2*k1} = ${a_t2}$ m s$^{-2}$<br><br>

        <b>2. Trabajo Mecánico:</b><br>
        * a) $W(x) = \\int_0^x ${k2}u^{1/2}\\,du = \\left[ \\frac{2}{3}(${k2})u^{3/2} \\right]_0^x = ${coeff_int.toFixed(2)}x^{3/2}$<br>
        * b) $W(4) = ${coeff_int.toFixed(2)}(4)^{1.5} = ${coeff_int.toFixed(2)}(8) = ${trabajo2.toFixed(2)}$ J<br><br>

        <b>3. Dinámica de Fluidos:</b><br>
        * a) $V(t) = \\int ${k3}t^{-1/2}\\,dt = 2(${k3})\\sqrt{t} + C = ${2*k3}\\sqrt{t} + C$<br>
        * b) $\\Delta V = \\int_1^{${t_fin3}} R(t)\\,dt = \\left[ ${2*k3}\\sqrt{t} \\right]_1^{${t_fin3}} = ${2*k3}(\\sqrt{${t_fin3}} - 1) \\approx ${vol_total3.toFixed(2)}$ litros<br><br>

        <b>4. Electricidad:</b><br>
        * a) $q(t) = \\int (${a4}t^2 + ${b4}t)\\,dt = t^3 + ${b4/2}t^2$<br>
        * b) $q(${t_carga}) = (${t_carga})^3 + ${b4/2}(${t_carga})^2 = ${carga_total}$ C<br>
        * c) El área bajo la curva representa la integral definida de la corriente con respecto al tiempo, es decir, la carga eléctrica total transferida en el intervalo.
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
