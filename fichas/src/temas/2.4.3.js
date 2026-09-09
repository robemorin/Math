import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Análisis y Síntesis de Modelos Cuadráticos";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("2.4.3", "2. Funciones", "Ficha: Análisis y Síntesis de Modelos Cuadráticos");

    // ======================================================
    // EJERCICIO 1: EL DISCRIMINANTE (Recta y Parábola)
    // ======================================================
    const b1 = (Math.floor(Math.random() * 5) + 1) * 2;
    const c1 = Math.floor(Math.random() * 10) + 1;
    const m1 = Math.floor(Math.random() * 4) + 1;
    const diff = b1 - m1;
    const target_delta = diff * diff;
    const k_tangente = c1 - (target_delta / 4);

    // ======================================================
    // EJERCICIO 2: SISTEMA DE 3 PUNTOS
    // ======================================================
    const a2 = Math.floor(Math.random() * 2) + 1; // 1 o 2
    const b2 = Math.floor(Math.random() * 6) - 3;
    const c2 = Math.floor(Math.random() * 10) - 5; 
    const p1y = a2 + b2 + c2;
    const p2y = a2 - b2 + c2;
    const p3y = 4 * a2 + 2 * b2 + c2;
    const vertexX2 = -b2 / (2 * a2);
    const vertexY2 = a2 * vertexX2 * vertexX2 + b2 * vertexX2 + c2;

    // ======================================================
    // EJERCICIO 3: GEOMETRÍA INSCRITA (OPTIMIZACIÓN)
    // ======================================================
    const K = Math.floor(Math.random() * 5) + 8; // 8 a 12
    const x_max_area = Math.sqrt(K / 3);
    const area_val_max = 2 * K * x_max_area - 2 * Math.pow(x_max_area, 3);

    // ======================================================
    // EJERCICIO 4: TRANSFORMACIONES Y FAMILIAS
    // ======================================================
    const h4 = Math.floor(Math.random() * 5) + 2; 
    const k4 = Math.floor(Math.random() * 5) + 1;
    const a4 = -2;

    // ======================================================
    // EJERCICIO 5: APLICACIÓN EN INGENIERÍA (PUENTE COLGANTE)
    // ======================================================
    const distTorres = 200;
    const alturaTorres = Math.floor(Math.random() * 20) + 40;
    const alturaMinima = 5;
    const a_bridge = (alturaTorres - alturaMinima) / 10000;
    const y_check = a_bridge * 50 * 50 + alturaMinima;
    const y_soporte = a_bridge * 40 * 40 + alturaMinima;

    html += `
    <div class="seccion-title">I. Intersección de Curvas y Condición de Tangencia</div>
    <div class="exercise-step">
        <p><strong>1.</strong> Considere la parábola $f(x) = x^2 + ${b1}x + ${c1}$ y la recta $g(x) = ${m1}x + k$, donde $k$ es una constante real.</p>
        <ol class="FT_ol_a">
            <li>Muestre que la ecuación que determina las coordenadas $x$ de los puntos de intersección es $x^2 + (${diff})x + (${c1} - k) = 0$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>Utilizando el discriminante $\\Delta$, determine el valor exacto de $k$ para el cual la recta es <strong>tangente</strong> a la parábola. <span class="mark">3</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>Halle el rango de valores de $k$ para los cuales la recta corta a la parábola en dos puntos distintos. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="seccion-title">II. Determinación de Parábolas mediante Sistema de Puntos</div>
    <div class="exercise-step">
        <p><strong>2.</strong> Una curva parabólica tiene por ecuación general $y = ax^2 + bx + c$ y pasa por los puntos $A(1, ${p1y})$, $B(-1, ${p2y})$ y $C(2, ${p3y})$.</p>
        <ol class="FT_ol_a">
            <li>Escriba un sistema de tres ecuaciones lineales en términos de $a, b$ y $c$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>Resuelva el sistema para hallar los coeficientes $a, b$ y $c$, y determine las coordenadas de su vértice. <span class="mark">4</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>

    <div class="seccion-title">III. Optimización de Figuras Inscritas</div>
    <div class="exercise-step">
        <p><strong>3.</strong> Considere la región delimitada por la parábola $y = ${K} - x^2$ y el eje $x$. Se inscribe un rectángulo simétrico con su base sobre el eje $x$ y sus dos vértices superiores en la parábola.</p>
        <ol class="FT_ol_a">
            <li>Si el vértice superior derecho tiene abscisa $x$, demuestre que el área del rectángulo es $A(x) = ${2*K}x - 2x^3$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>Determine el dominio válido de $x$ y calcule el valor de $x$ que maximiza dicha área junto con el área máxima obtenida. <span class="mark">4</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="seccion-title">IV. Modelización en Ingeniería: Cable de Puente Colgante</div>
    <div class="exercise-step">
        <p><strong>4.</strong> El cable principal de un puente colgante describe una parábola. Dos torres de ${alturaTorres}$ metros de altura están separadas por una distancia de ${distTorres}$ metros. En el centro del puente, el cable alcanza su altura mínima de ${alturaMinima}$ metros sobre la calzada.</p>
        <ol class="FT_ol_a">
            <li>Situando el origen de coordenadas en el centro de la calzada bajo el punto más bajo del cable (vértice en $(0, ${alturaMinima})$), halle la ecuación de la parábola. <span class="mark">3</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>Calcule la altura del cable a una distancia de 50 metros del centro y la longitud del tirante vertical situado a 40 metros del centro. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 2.4.3 (Análisis y Síntesis de Modelos Cuadráticos):</b><br><br>

        <b>1. Intersección y Tangencia:</b><br>
        * a) $x^2 + ${b1}x + ${c1} = ${m1}x + k \\implies x^2 + (${diff})x + (${c1} - k) = 0$.<br>
        * b) Tangencia $\\Delta = 0 \\implies (${diff})^2 - 4(1)(${c1} - k) = 0 \\implies ${target_delta} = 4(${c1} - k) \\implies k = ${k_tangente}$.<br>
        * c) Dos puntos distintos $\\Delta > 0 \\implies k > ${k_tangente}$.<br><br>

        <b>2. Sistema de Puntos:</b><br>
        * a) $a(1)^2 + b(1) + c = ${p1y}$; $a(-1)^2 - b + c = ${p2y}$; $a(2)^2 + 2b + c = ${p3y}$.<br>
        * b) Solución: $a = ${a2}, b = ${b2}, c = ${c2}$. Ecuación: $y = ${a2}x^2 ${b2 >= 0 ? '+' : ''}${b2}x ${c2 >= 0 ? '+' : ''}${c2}$.<br>
        &nbsp;&nbsp;Vértice: $x_v = ${vertexX2.toFixed(2)}, y_v = ${vertexY2.toFixed(2)} \\implies (${vertexX2.toFixed(2)}, ${vertexY2.toFixed(2)})$.<br><br>

        <b>3. Optimización Geométrica:</b><br>
        * a) Vértice en $(x, ${K} - x^2)$. Base $= 2x$, Altura $= ${K} - x^2 \\implies A(x) = 2x(${K} - x^2) = ${2*K}x - 2x^3$.<br>
        * b) Dominio: $0 < x < \\sqrt{${K}} \\approx ${(Math.sqrt(K)).toFixed(2)}$.<br>
        &nbsp;&nbsp;$A'(x) = ${2*K} - 6x^2 = 0 \\implies x = \\sqrt{\\frac{${K}}{3}} \\approx ${x_max_area.toFixed(3)}$. Área máxima $\\approx ${area_val_max.toFixed(2)}$ unidades$^2$.<br><br>

        <b>4. Cable de Puente Colgante:</b><br>
        * a) Vértice en $(0, ${alturaMinima}) \\implies y = ax^2 + ${alturaMinima}$. Pasa por $(100, ${alturaTorres}) \\implies a(100)^2 + ${alturaMinima} = ${alturaTorres} \\implies a = ${(a_bridge).toFixed(5)}$.<br>
        &nbsp;&nbsp;Ecuación: $y = ${(a_bridge).toFixed(5)}x^2 + ${alturaMinima}$.<br>
        * b) A $50$ m del centro: $y(50) = ${(a_bridge).toFixed(5)}(2500) + ${alturaMinima} \\approx ${y_check.toFixed(2)}$ m.<br>
        &nbsp;&nbsp;Tirante a $40$ m: $y(40) = ${(a_bridge).toFixed(5)}(1600) + ${alturaMinima} \\approx ${y_soporte.toFixed(2)}$ m.
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
