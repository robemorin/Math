import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Cuadráticas + derivadas";
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("2.4.3", "2. Funciones", "Cuadráticas + derivadas");

    // ======================================================
    // EJERCICIO 1: EL DISCRIMINANTE
    // ======================================================
    const b1 = (Math.floor(Math.random() * 5) + 1) * 2; 
    const c1 = Math.floor(Math.random() * 10) + 1;
    const m1 = Math.floor(Math.random() * 4) + 1;
    const diff = b1 - m1;
    const target_delta = diff * diff; 
    const k_tangente = c1 - (target_delta / 4);

    html += `
    <div class="seccion-title">I. Análisis Abstracto: El Discriminante</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            Considere la parábola $f(x) = x^2 + ${b1}x + ${c1}$ y la recta $g(x) = ${m1}x + k$, donde $k$ es una constante real.
        </div>
        <ol class="FT_ol_a">
            <li>Muestre que la ecuación que determina las coordenadas $x$ de los puntos de intersección es $x^2 + (${diff})x + (${c1} - k) = 0$. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Utilizando el discriminante, determine el valor exacto de $k$ para el cual la recta es <strong>tangente</strong> a la parábola. <span class="mark">3</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Halle el rango de valores de $k$ para los cuales la recta corta a la parábola en dos puntos distintos. <span class="mark">3</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 2.4.3:</b><br>
        <b>I.</b> 1a. $x^2 + ${b1}x + ${c1} = ${m1}x + k \\Rightarrow x^2 + (${diff})x + (${c1}-k) = 0$ | 1b. $\\Delta = 0 \\Rightarrow (${diff})^2 - 4(1)(${c1}-k) = 0 \\Rightarrow k = ${k_tangente}$ | 1c. Para dos puntos, $\\Delta > 0 \\Rightarrow k > ${k_tangente}$<br>
    `;

    // ======================================================
    // EJERCICIO 2: SISTEMA DE 3 PUNTOS
    // ======================================================
    const a2 = Math.floor(Math.random() * 2) + 1;
    const b2 = Math.floor(Math.random() * 6) - 3; 
    const c2 = Math.floor(Math.random() * 10) - 5; 
    const p1x = 1, p1y = a2 + b2 + c2;
    const p2x = -1, p2y = a2 - b2 + c2;
    const p3x = 2, p3y = 4*a2 + 2*b2 + c2;

    html += `
    <div class="seccion-title">II. Modelado Algebraico: Ecuación desde 3 puntos</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            Una función cuadrática tiene la forma $y = ax^2 + bx + c$ y su gráfica pasa por los puntos $A(1, ${p1y})$, $B(-1, ${p2y})$ y $C(2, ${p3y})$.
        </div>
        <ol class="FT_ol_a">
            <li>Escriba un sistema de tres ecuaciones lineales en términos de $a, b$ y $c$ utilizando los puntos dados. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Resuelva el sistema algebraicamente para hallar los valores de $a, b$ y $c$. <span class="mark">4</span> <tlacuache-renglon n="4" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Determine las coordenadas del vértice de esta parábola. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    `;

    const vertexX2 = -b2 / (2 * a2);
    const vertexY2 = a2 * vertexX2 * vertexX2 + b2 * vertexX2 + c2;

    solucion += `<b>II.</b> 2a. Ecuaciones: $a+b+c=${p1y}; a-b+c=${p2y}; 4a+2b+c=${p3y}$ | 2b. $a=${a2}, b=${b2}, c=${c2} \\Rightarrow y=${a2}x^2+${b2}x+${c2}$ | 2c. Vértice: $(${vertexX2.toFixed(2)}, ${vertexY2.toFixed(2)})$<br>`;

    // ======================================================
    // EJERCICIO 3: GEOMETRÍA INSCRITA
    // ======================================================
    const K = Math.floor(Math.random() * 5) + 8; 

    html += `
    <div class="seccion-title">III. Optimización Geométrica: Figura Inscrita</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            Considere la región delimitada por la gráfica de $y = ${K} - x^2$ y el eje $x$. Se inscribe un rectángulo en esta región tal que su base descansa sobre el eje $x$ y sus dos vértices superiores tocan la parábola.
        </div>
        <ol class="FT_ol_a">
            <li>Si la coordenada $x$ del vértice superior derecho del rectángulo es $x$, muestre que el área del rectángulo viene dada por $A(x) = 2${K}x - 2x^3$. <span class="mark">3</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Indique el dominio lógico de $x$ para que exista tal rectángulo. <span class="mark">1</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Utilice su calculadora de pantalla gráfica o métodos analíticos para hallar el valor de $x$ que maximiza el área del rectángulo. <span class="mark">3</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule el área máxima posible. <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    <div class="page-break"></div>
    `;

    const x_max_area = Math.sqrt(K / 3);
    const area_val_max = 2 * K * x_max_area - 2 * Math.pow(x_max_area, 3);

    solucion += `<b>III.</b> 3a. Base=$2x$, Altura=$y=${K}-x^2 \\Rightarrow A = 2x(${K}-x^2)$ | 3b. $0 < x < \\sqrt{${K}}$ | 3c. $x = \\sqrt{${K}/3} \\approx ${x_max_area.toFixed(3)}$ | 3d. $A_{max} \\approx ${area_val_max.toFixed(2)}$<br>`;

    // ======================================================
    // EJERCICIO 4: TRANSFORMACIONES Y FAMILIAS
    // ======================================================
    const h4 = Math.floor(Math.random() * 5) + 2; 
    const k4 = Math.floor(Math.random() * 5) + 1;
    const a4 = -2;

    html += `
    <div class="seccion-title">IV. Transformaciones Funcionales</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            Sea $f(x) = x^2$. La función $g(x)$ se obtiene aplicando las siguientes transformaciones a $f(x)$ en orden:
            <ul style="margin-bottom:10px; padding-left: 20px;">
                <li>Traslación horizontal de ${h4} unidades a la derecha.</li>
                <li>Reflexión sobre el eje $x$.</li>
                <li>Estiramiento vertical por un factor de ${Math.abs(a4)}.</li>
                <li>Traslación vertical de ${k4} unidades hacia arriba.</li>
            </ul>
        </div>
        <ol class="FT_ol_a">
            <li>Escriba la expresión para $g(x)$ en la forma canónica (vértice). <span class="mark">3</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Determine las coordenadas de los interceptos con el eje $x$ de $g(x)$, expresando sus respuestas en forma exacta (raíces). <span class="mark">4</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    `;

    solucion += `<b>IV.</b> 4a. $g(x) = ${a4}(x - ${h4})^2 + ${k4}$ | 4b. $0 = ${a4}(x - ${h4})^2 + ${k4} \\Rightarrow x = ${h4} \\pm \\sqrt{${k4/2}}$<br>`;

    // ======================================================
    // EJERCICIO 5: INGENIERÍA (PUENTE COLGANTE)
    // ======================================================
    const distTorres = 200; 
    const alturaTorres = Math.floor(Math.random() * 20) + 40; 
    const alturaMinima = 5; 
    const a_bridge = (alturaTorres - alturaMinima) / 10000;
    const x_check = 50;
    const y_check = a_bridge * x_check * x_check + alturaMinima;

    html += `
    <div class="seccion-title">V. Aplicación Compleja: Ingeniería de Puente Colgante</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            El cable principal de un puente colgante forma una parábola. Las dos torres que sostienen el cable están separadas por ${distTorres} metros y tienen una altura de ${alturaTorres} metros sobre la carretera. En el punto más bajo (exactamente a la mitad entre las torres), el cable está a ${alturaMinima} metros sobre la carretera.
        </div>
        <ol class="FT_ol_a">
            <li>Ubique el punto más bajo del cable en el eje $y$ (es decir, vértice en $(0, ${alturaMinima})$) y halle la ecuación de la parábola que modela la forma del cable. <span class="mark">3</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule la altura del cable sobre la carretera en un punto situado a 50 metros de una de las torres. <span class="mark">3</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Si se coloca un soporte vertical adicional cada 20 metros a lo largo del puente, determine la longitud del soporte ubicado a 40 metros del centro del puente. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    `;

    const y_soporte = a_bridge * 40 * 40 + alturaMinima;

    solucion += `<b>V.</b> 5a. $y = ${a_bridge.toFixed(5)}x^2 + ${alturaMinima}$ | 5b. A 50m de la torre ($x=50$): $y = ${y_check.toFixed(2)}$ m | 5c. Soporte en $x=40$: $y = ${y_soporte.toFixed(2)}$ m<br>`;

    // ======================================================
    // EJERCICIO 6: INECUACIONES CUADRÁTICAS
    // ======================================================
    const r1 = Math.floor(Math.random() * 3) + 1;
    const r2 = r1 + Math.floor(Math.random() * 4) + 2; 
    const sum = r1 + r2;
    const prod = r1 * r2;

    html += `
    <div class="seccion-title">VI. Inecuaciones Cuadráticas</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            Considere la desigualdad $x^2 - ${sum}x + ${prod} < 0$.
        </div>
        <ol class="FT_ol_a">
            <li>Factorice la expresión cuadrática. <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Utilice un diagrama de signos o una gráfica para determinar el conjunto solución de la desigualdad. <span class="mark">3</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    `;

    solucion += `<b>VI.</b> 6a. $(x - ${r1})(x - ${r2}) < 0$ | 6b. Solución: $]${r1}, ${r2}[$ (o ${r1} < x < ${r2})</div>`;

    html += `\n    <div class="page-break"></div>\n`;

    return [html, solucion];
}
