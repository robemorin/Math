import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Integración Avanzada en Física";
}

export function tipo() {
    return 1;
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("5.6.2", "5. Cálculo", "Ficha: Integración Avanzada en Física");

    // ====================================================== 
    // EJERCICIO 1: GRAVITACIÓN (TRABAJO CON r^-2)
    // ====================================================== 
    const RadioTierra = 6400; // km
    const MasaSatelite = Math.floor(Math.random() * 500) + 1000; // 1000-1500 kg
    const K_exp = 4 * MasaSatelite; // x 10^14
    const r_inicial = RadioTierra;
    const r_final = RadioTierra + 20000; // 26400 km
    const W_orbita = K_exp * 1e14 * (1 / r_inicial - 1 / r_final);

    // ====================================================== 
    // EJERCICIO 2: CINEMÁTICA AVANZADA (Aceleración Variable)
    // ====================================================== 
    const k_acc = Math.floor(Math.random() * 4) + 2; 
    const V1 = Math.floor(Math.random() * 10) + 5;
    const C1 = V1 - 2 * k_acc;
    const C2 = -(4 / 3) * k_acc - C1;
    const t_eval = 4;
    const v_4 = 2 * k_acc * Math.sqrt(t_eval) + C1;
    const s_4 = (4 / 3) * k_acc * Math.pow(t_eval, 1.5) + C1 * t_eval + C2;

    // ====================================================== 
    // EJERCICIO 3: DENSIDAD LINEAL Y CENTRO DE MASA
    // ====================================================== 
    const L = Math.floor(Math.random() * 3) + 2; // 2, 3, 4 metros
    const A_den = Math.floor(Math.random() * 2) + 1;
    const B_den = Math.floor(Math.random() * 3) + 1;
    const Masa = A_den * L + (B_den / 3) * Math.pow(L, 3);
    const Momento = (A_den / 2) * Math.pow(L, 2) + (B_den / 4) * Math.pow(L, 4);
    const CM = Momento / Masa;

    // ====================================================== 
    // EJERCICIO 4: DINÁMICA DE FLUIDOS (Flujo en Tubería)
    // ====================================================== 
    const R_tubo = Math.floor(Math.random() * 5) + 2; // cm
    const V_max = Math.floor(Math.random() * 10) + 10; // cm/s
    const Flujo = (Math.PI / 2) * V_max * R_tubo * R_tubo;
    const Flujo_coef = (0.5 * V_max * R_tubo * R_tubo).toFixed(1);

    html += `
    <div class="seccion-title">I. Gravitación y Trabajo contra un Campo Inverso Cuadrático</div>
    <div class="exercise-step">
        <p><strong>1.</strong> La fuerza de atracción gravitacional $F$ que actúa sobre un satélite de masa $m = ${MasaSatelite}$ kg a una distancia $r$ del centro de la Tierra está dada por:</p>
        <p style="text-align:center;">$$F(r) = \\frac{K}{r^2}$$</p>
        <p>donde $K = ${K_exp} \\times 10^{14} \\text{ N km}^2$. El trabajo para desplazar el satélite desde un radio $r_a$ hasta $r_b$ es $W = \\int_{r_a}^{r_b} F(r)\\,dr$.</p>
        <ol class="FT_ol_a">
            <li>
                Reescriba la fuerza utilizando exponentes negativos y deduzca la expresión para el trabajo $W$ en términos de $K, r_a$ y $r_b$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Calcule el trabajo requerido para elevar el satélite desde la superficie terrestre ($r = ${r_inicial}$ km) hasta $r = ${r_final}$ km. Exprese en notación científica. <span class="mark">3</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Determine el trabajo teórico necesario para llevar el satélite desde la superficie hasta el infinito ($r \\to \\infty$). <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="seccion-title">II. Cinemática con Aceleración Variable</div>
    <div class="exercise-step">
        <p><strong>2.</strong> Una partícula se desplaza sobre el eje $x$. Para $t \\geq 1$, su aceleración está dada por $a(t) = \\frac{${k_acc}}{\\sqrt{t}}$ m s$^{-2}$. En $t = 1$ s, se observa que $v(1) = ${V1}$ m s$^{-1}$ y su posición es $s(1) = 0$ m.</p>
        <ol class="FT_ol_a">
            <li>
                Determine las expresiones analíticas para la velocidad $v(t)$ y el desplazamiento $s(t)$. <span class="mark">5</span>
                <tlacuache-renglon n="4" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Calcule la posición de la partícula en el instante $t = 4$ s. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>

    <div class="seccion-title">III. Densidad Lineal no Uniforme y Centro de Masa</div>
    <div class="exercise-step">
        <p><strong>3.</strong> Una varilla metálica de longitud $L = ${L}$ m tiene una densidad lineal que varía según $\\lambda(x) = ${A_den} + ${B_den}x^2$ kg m$^{-1}$, donde $0 \\leq x \\leq ${L}$.</p>
        <ol class="FT_ol_a">
            <li>
                Calcule la masa total $M = \\int_0^L \\lambda(x)\\,dx$ de la varilla. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Halle la coordenada del centro de masa $\\bar{x} = \\frac{1}{M}\\int_0^L x\\lambda(x)\\,dx$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Explique físicamente por qué $\\bar{x}$ se encuentra desplazado respecto al punto medio geométrico $x = ${L / 2}$ m. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="seccion-title">IV. Perfil de Flujo y Caudal en Tuberías Circulares</div>
    <div class="exercise-step">
        <p><strong>4.</strong> La velocidad de un fluido en una tubería de radio $R = ${R_tubo}$ cm depende de la distancia radial $r$ al centro según $v(r) = ${V_max}\\left(1 - \\frac{r^2}{${R_tubo * R_tubo}}\\right)$ cm s$^{-1}$. El caudal total $Q$ se calcula mediante integración por anillos: $Q = \\int_0^R v(r) \\cdot 2\\pi r\\,dr$.</p>
        <ol class="FT_ol_a">
            <li>
                Desarrolle la integral para deducir la fórmula general del caudal en función de $V_{\\text{max}}$ y $R$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Calcule el caudal total $Q$ exacto en términos de $\\pi$ y su aproximación a 3 cifras significativas. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    </div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 5.6.2 (Integración Avanzada en Física):</b><br><br>
        <b>1. Gravitación:</b><br>
        * a) $F(r) = K r^{-2}$. Luego $W = \\int_{r_a}^{r_b} K r^{-2}\\,dr = K\\left[-\\frac{1}{r}\\right]_{r_a}^{r_b} = K\\left(\\frac{1}{r_a} - \\frac{1}{r_b}\\right)$<br>
        * b) $W = (${K_exp}\\times 10^{14})\\left(\\frac{1}{${r_inicial}} - \\frac{1}{${r_final}}\\right) \\approx ${W_orbita.toExponential(3)}$ J<br>
        * c) Con $r_b \\to \\infty$, $\\frac{1}{r_b} \\to 0$, por lo que $W_{\\infty} = \\frac{K}{r_a} = \\frac{${K_exp}\\times 10^{14}}{${r_inicial}} \\approx ${(K_exp * 1e14 / r_inicial).toExponential(3)}$ J<br><br>

        <b>2. Cinemática con aceleración variable:</b><br>
        * a) $v(t) = \\int ${k_acc}t^{-1/2}\\,dt = 2(${k_acc})\\sqrt{t} + C_1$. Con $v(1)=${V1} \\implies C_1 = ${C1.toFixed(2)}$. Así, $v(t) = ${2*k_acc}\\sqrt{t} + ${C1.toFixed(2)}$<br>
        * $s(t) = \\int (${2*k_acc}t^{1/2} + ${C1.toFixed(2)})\\,dt = \\frac{4}{3}(${k_acc})t^{3/2} + ${C1.toFixed(2)}t + C_2$. Con $s(1)=0 \\implies C_2 = ${C2.toFixed(2)}$<br>
        * b) $s(4) = \\frac{4}{3}(${k_acc})(8) + ${C1.toFixed(2)}(4) + ${C2.toFixed(2)} = ${s_4.toFixed(2)}$ m<br><br>

        <b>3. Densidad lineal y centro de masa:</b><br>
        * a) $M = \\int_0^{${L}} (${A_den} + ${B_den}x^2)\\,dx = [${A_den}x + \\frac{${B_den}}{3}x^3]_0^{${L}} = ${Masa.toFixed(2)}$ kg<br>
        * b) Momento = $\\int_0^{${L}} (${A_den}x + ${B_den}x^3)\\,dx = [\\frac{${A_den}}{2}x^2 + \\frac{${B_den}}{4}x^4]_0^{${L}} = ${Momento.toFixed(2)}$. Luego $\\bar{x} = \\frac{${Momento.toFixed(2)}}{${Masa.toFixed(2)}} = ${CM.toFixed(3)}$ m<br>
        * c) Dado que $\\lambda(x)$ es creciente con $x^2$, la concentración de masa es mayor conforme $x \\to ${L}$, desplazando el centro de masa hacia la derecha del punto medio geométrico.<br><br>

        <b>4. Dinámica de Fluidos:</b><br>
        * a) $Q = 2\\pi V_{\\text{max}} \\int_0^R \\left(r - \\frac{r^3}{R^2}\\right)\\,dr = 2\\pi V_{\\text{max}} \\left[\\frac{r^2}{2} - \\frac{r^4}{4R^2}\\right]_0^R = 2\\pi V_{\\text{max}} \\left(\\frac{R^2}{4}\\right) = \\frac{\\pi}{2}V_{\\text{max}}R^2$<br>
        * b) $Q = \\frac{\\pi}{2}(${V_max})(${R_tubo})^2 = ${Flujo_coef}\\pi \\approx ${Flujo.toFixed(2)}$ cm$^3$ s$^{-1}$.
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
