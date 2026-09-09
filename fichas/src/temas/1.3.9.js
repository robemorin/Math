// Generado para: Ficha de Entrenamiento en Lectura, Planteamiento y Resolución Algebraica de Sucesiones
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return 'Lectura y Planteamiento Algebraico: Sucesiones Aritméticas y Geométricas';
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    // ======================================================
    // DATOS DINÁMICOS Y CONTROLADOS
    // ======================================================
    
    // Nivel 1: Planteamiento de razón y diferencia con incógnita lineal
    // Ejemplo Aritmética: x + 1, 2x - 3, 4x - 11 -> (2x - 3) - (x + 1) = (4x - 11) - (2x - 3)
    // x - 4 = 2x - 8 => x = 4. Términos: 5, 5, 5 (trivial) -> Usemos: 2x, 3x+1, 5x-1 -> x+1 = 2x-2 => x = 3. Términos: 6, 10, 14 (d=4).
    const x_arit = 3;
    const t1_arit = "2x";
    const t2_arit = "3x + 1";
    const t3_arit = "5x - 1";
    const u1_arit_val = 6;
    const u2_arit_val = 10;
    const u3_arit_val = 14;
    const d_arit_val = 4;

    // Nivel 2: Planteamiento Geométrico Cuadrático (Tipo IB P1)
    // Términos: x - a, b, x + c -> b^2 = (x - a)(x + c)
    // Ejemplo: x - 3, 6, x + 2 -> 36 = x^2 - x - 6 -> x^2 - x - 42 = 0 -> (x - 7)(x + 6) = 0
    const b_geom = 6;
    const x_pos = 7;
    const x_neg = -6;

    // Nivel 3: Problema Contextualizado de Doble Planteamiento (Modelización)
    // Un teatro / auditorio con gradas:
    // Fila 1 tiene u1 asientos, cada fila aumenta d asientos.
    const filas_total = 25;
    const asientos_f1 = 18;
    const aumento_fila = 2;
    const target_fila = 20;
    const u_target = asientos_f1 + (target_fila - 1) * aumento_fila; // 18 + 19*2 = 56
    const total_asientos = (filas_total / 2) * (2 * asientos_f1 + (filas_total - 1) * aumento_fila); // 12.5 * (36 + 48) = 12.5 * 84 = 1050

    // ======================================================
    // CONSTRUCCIÓN HTML (PÁGINA 1)
    // ======================================================
    html += ai.getHeader("1.3.9", "1. Número y Álgebra", "Lectura, Planteamiento y Resolución: Sucesiones");

    html += `
        <div class="seccion-title">I. Activación: Identificación y Planteamiento de la Condición Fundamental</div>
        <div class="exercise-step">
            <p>Para resolver problemas de sucesiones con incógnitas algebraicas, primero debe plantearse la <em>definición formal</em> de la diferencia común ($d$) o la razón común ($r$):</p>
            <ul>
                <li><strong>Progresión Aritmética (PA):</strong> La diferencia entre términos consecutivos es constante: $u_2 - u_1 = u_3 - u_2 = d$.</li>
                <li><strong>Progresión Geométrica (PG):</strong> La razón entre términos consecutivos es constante: $\\frac{u_2}{u_1} = \\frac{u_3}{u_2} = r \\implies (u_2)^2 = u_1 \\cdot u_3$.</li>
            </ul>
        </div>

        <div class="exercise-step">
            <b>1.</b> Tres términos consecutivos de una <strong>progresión aritmética</strong> vienen dados por $${t1_arit}$, $${t2_arit}$ y $${t3_arit}$.
            <ol class="FT_ol_a">
                <li>Plantee una ecuación lineal utilizando la condición $u_2 - u_1 = u_3 - u_2$. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Resuelva la ecuación para hallar el valor de $x$. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Escriba el valor numérico de los tres términos y determine el valor de la diferencia común $d$. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            </ol>
        </div>

        <div class="seccion-title">II. Desarrollo: Planteamiento Cuadrático en Progresiones Geométricas</div>
        <div class="exercise-step">
            <b>2.</b> Tres términos consecutivos de una <strong>progresión geométrica</strong> son $x - 3$, $6$ y $x + 2$.
            <ol class="FT_ol_a">
                <li>A partir de la razón común $r = \\frac{u_2}{u_1} = \\frac{u_3}{u_2}$, demuestre que $x$ debe satisfacer la ecuación cuadrática:
                    $$x^2 - x - 42 = 0$$ <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Factorice la ecuación o use la fórmula general para hallar los dos posibles valores de $x$. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Para cada valor de $x$ hallado, escriba los tres términos de la sucesión y la razón común $r$ correspondiente. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
            </ol>
        </div>

        ${ai.getTiTip("En la TI-84 CE puedes verificar raíces cuadráticas y sistemas usando <code>APPS</code> > <code>PlySmlt2</code> (Polynomial Root Finder), o graficando $Y_1 = x^2 - x - 42$ y buscando los <code>zeros</code> mediante <code>2nd + TRACE [CALC]</code>.")}

        <div class="page-break"></div>

        <!-- ======================================================
             PÁGINA 2: MODELIZACIÓN Y LECTURA CRÍTICA DE PROBLEMAS
        ====================================================== -->
        <div class="seccion-title">III. Modelización y Comprensión Lectora: Diseño de un Auditorio</div>
        <div class="exercise-step">
            <div class="contexto-especial">
                <b>Contexto Real:</b> Una empresa de arquitectura está diseñando un nuevo auditorio municipal con un total de $${filas_total}$ filas de asientos. En la primera fila se colocarán $${asientos_f1}$ asientos, en la segunda fila $${asientos_f1 + aumento_fila}$ asientos, en la tercera $${asientos_f1 + aumento_fila * 2}$ asientos, y así sucesivamente, aumentando un número fijo de asientos por fila.
            </div>

            <ol class="FT_ol_a">
                <li><strong>Identificación del modelo:</strong> Justifique detalladamente qué tipo de sucesión modela el número de asientos por fila, indicando el valor del primer término ($u_1$) y del parámetro característico ($d$ o $r$). <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                <li><strong>Término enésimo:</strong> Escriba la fórmula del término general $u_n$ para el número de asientos en la fila $n$ y calcule cuántos asientos habrá en la fila $${target_fila}$. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
                <li><strong>Capacidad total (Sumatoria):</strong> Plantee y calcule la capacidad total de asientos del auditorio cuando se completen las $${filas_total}$ filas. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
                <li><strong>Presupuesto y costo:</strong> Si el costo de instalación es de $45$ USD por cada asiento en las primeras 10 filas y de $35$ USD por asiento de la fila 11 a la 25, plantee la operación necesaria y determine el costo total de instalación de todo el auditorio. <span class="mark">3</span> <tlacuache-renglon n="4" color="#f9f9f9"></tlacuache-renglon></li>
            </ol>
        </div>

        <div class="seccion-title">IV. Metacognición y Estrategia de Planteamiento</div>
        <div class="exercise-step">
            <b>3. Guía de auto-verificación:</b> Explique con sus propias palabras cuál es la diferencia en el planteamiento cuando un problema dice: <em>"¿Cuántos elementos hay en la fila 20?"</em> frente a cuando dice: <em>"¿Cuántos elementos hay en total en las 20 filas?"</em>. Indique qué fórmula del cuadernillo del IB corresponde a cada caso.
            <span class="mark">2</span>
            <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
        </div>
        <div class="page-break"></div>
    `;

    // ======================================================
    // SOLUCIONARIO DETALLADO
    // ======================================================
    const s10_asientos = (10 / 2) * (2 * asientos_f1 + 9 * aumento_fila); // 5 * (36 + 18) = 270
    const s11_25_asientos = total_asientos - s10_asientos; // 1050 - 270 = 780
    const costo_total = (s10_asientos * 45) + (s11_25_asientos * 35); // 270*45 + 780*35 = 12150 + 27300 = 39450

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem; line-height: 1.4;">
        <b>Solucionario 1.3.9 - Lectura y Planteamiento de Sucesiones:</b><br><br>
        
        <b>I. Progresión Aritmética Lineal:</b><br>
        1a. Planteamiento: $(3x + 1) - (2x) = (5x - 1) - (3x + 1) \\implies x + 1 = 2x - 2$ [M1 A1]<br>
        1b. $2x - x = 1 + 2 \\implies x = 3$ [A1]<br>
        1c. Términos: $u_1 = 2(3) = 6$, $u_2 = 3(3)+1 = 10$, $u_3 = 5(3)-1 = 14$. Diferencia $d = 10 - 6 = 4$ [A1 A1]<br><br>

        <b>II. Progresión Geométrica Cuadrática:</b><br>
        2a. $\\frac{6}{x-3} = \\frac{x+2}{6} \\implies 36 = (x-3)(x+2) \\implies 36 = x^2 - x - 6 \\implies x^2 - x - 42 = 0$ [M1 R1 A1]<br>
        2b. $(x - 7)(x + 6) = 0 \\implies x_1 = 7, \\; x_2 = -6$ [M1 A1]<br>
        2c. Si $x = 7$: términos son $4, 6, 9$ con $r = \\frac{6}{4} = 1.5$. Si $x = -6$: términos son $-9, 6, -4$ con $r = -\\frac{6}{9} = -\\frac{2}{3}$ [A2 A1]<br><br>

        <b>III. Modelización de Auditorio:</b><br>
        3a. Es una <b>Progresión Aritmética</b> porque se suma una cantidad constante en cada fila. $u_1 = ${asientos_f1}$, $d = ${aumento_fila}$ [R1 A1]<br>
        3b. $u_n = 18 + (n-1)(2) = 2n + 16$. En fila 20: $u_{20} = 18 + (19)(2) = $ <b>${u_target} asientos</b> [M1 A1]<br>
        3c. $S_{25} = \\frac{25}{2}\\left(2(18) + (24)(2)\\right) = 12.5 \\times (36 + 48) = 12.5 \\times 84 = $ <b>${total_asientos} asientos</b> [M1 A1]<br>
        3d. Asientos filas 1 a 10: $S_{10} = 5(36 + 18) = 270$ asientos.<br>
        Asientos filas 11 a 25: $1050 - 270 = 780$ asientos.<br>
        Costo total = $(270 \\times 45) + (780 \\times 35) = 12,150 + 27,300 = $ <b>$${costo_total.toLocaleString('en-US')} USD</b> [M1 A1]<br><br>

        <b>IV. Metacognición:</b><br>
        "En la fila 20" busca un término puntual ($u_{20} = u_1 + 19d$). "En total en las 20 filas" busca la acumulación o sumatoria total ($S_{20} = \\frac{20}{2}(u_1 + u_{20})$) [R2].
    </div>
    `;

    return [html, solucion];
}

export async function renderGeoGebra(container, totalElements) { }
