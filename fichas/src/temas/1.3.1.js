// Generado a partir de: 1.3.1.js (Original movido a src/temporal/)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return 'Sucesiones Geométricas: Crecimiento y Decaimiento';
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    // --- DATOS ALEATORIOS ---
    // Problema 1: Directo
    const u1_1 = Math.floor(Math.random() * 5) + 3;
    const r_1 = 2; // Razón simple para empezar
    const n_1 = 10;
    const seq1 = [u1_1, u1_1 * r_1, u1_1 * r_1 ** 2, u1_1 * r_1 ** 3];

    // Problema 2: Hallar r y u1
    const r_2 = 3;
    const u2_2 = 12;
    const u1_2 = u2_2 / r_2; // 4
    const u5_2 = u1_2 * r_2 ** 4; // 4 * 81 = 324

    // Problema 3: Contexto (Depreciación de un auto)
    const valor_inicial = 25000 + Math.floor(Math.random() * 5000);
    const tasa_depreciacion = 0.15; // 15% anual
    const r_v = 1 - tasa_depreciacion; // 0.85
    const anios = 5;
    const valor_final = valor_inicial * (r_v ** anios);

    // --- CONSTRUCCIÓN DEL HTML ---
    html += ai.getHeader("1.3.1", "Sucesiones Geométricas", "Matemáticas AI NM - Sucesiones");

    html += `
        <div class="seccion-title">I. Análisis de Progresiones Geométricas</div>
        <div class="exercise-step">
            Dada la siguiente sucesión geométrica: $${seq1.join(', ')}, \\dots$
            <ol class="FT_ol_a">
                <li>Indique la razón común $r$. <span class="mark">1</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Escriba el término general $u_n$. <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Calcule el valor de $u_{${n_1}}$. <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
            </ol>
        </div>

        <div class="seccion-title">II. Determinación de Parámetros</div>
        <div class="exercise-step">
            En una progresión geométrica de términos positivos, $u_2 = ${u2_2}$ y $u_5 = ${u5_2}$.
            <ol class="FT_ol_a">
                <li>Halle la razón común $r$. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Determine el primer término $u_1$. <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
            </ol>
        </div>

        ${ai.getTiTip("Para resolver ecuaciones con exponentes como $a^n = b$, puedes usar <code>2nd + TRACE [calc]</code> > <code>5: intersect</code> graficando ambas partes, o la función <code>Solver</code> en el menú <code>MATH</code>.")}

        <div class="page-break"></div>

        <div class="seccion-title">III. Modelización: Depreciación de Activos</div>
        <div class="exercise-step">
            <div class="contexto-especial">
                <b>Situación:</b> Un automóvil se compra por un valor de $${valor_inicial}$ USD. Cada año, el valor del automóvil se deprecia un $${tasa_depreciacion * 100}\\%$ respecto al valor del año anterior.
            </div>
            <ol class="FT_ol_a">
                <li>Justifique por qué el valor del automóvil sigue una progresión geométrica y escriba la razón común $r$. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Calcule el valor del automóvil después de $${anios}$ años. De su respuesta aproximada a la unidad más cercana. <span class="mark">3</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Halle el número de años necesarios para que el valor del automóvil sea inferior a $5000$ USD. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
            </ol> 
        </div>

        <div class="seccion-title">IV. Reflexión Cognitiva</div>
        <div class="exercise-step">
            Compare una sucesión aritmética y una geométrica que comiencen con el mismo $u_1 = 10$. Si $d=2$ y $r=1.2$, ¿cuál de las dos crecerá más rápido a largo plazo? Justifique.
            <span class="mark">2</span>
            <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
        </div>
    </div><div class="page-break"></div>
    `;

    // --- SOLUCIONARIO ---
    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 1.3.1:</b><br>
        1a. $r = ${r_1}$ [A1] | 1b. $u_n = ${u1_1} \\cdot (${r_1})^{n-1}$ [A1] | 1c. $u_{${n_1}} = ${u1_1 * r_1 ** (n_1 - 1)}$ [A1]<br>
        2a. $r^3 = \\frac{${u5_2}}{${u2_2}} = ${u5_2 / u2_2} \\rightarrow r = \\sqrt[3]{${u5_2 / u2_2}} = ${r_2}$ [M1 A1] | 2b. $u_1 = 12/3 = ${u1_2}$ [A1]<br>
        3a. Es geométrica porque se multiplica por un factor constante $(0.85)$. $r=0.85$ [R1 A1]<br>
        3b. $V = ${valor_inicial} \\cdot (0.85)^5 \\approx ${Math.round(valor_final)}$ [M1 A2]<br>
        3c. $5000 > ${valor_inicial} \\cdot (0.85)^n \\rightarrow \\dots \\rightarrow n \\approx ${Math.log(5000 / valor_inicial) / Math.log(0.85)} \\rightarrow 10$ años (aprox). [M1 A2]
    </div>
    `;

    return [html, solucion];
}

export async function renderGeoGebra(container, totalElements) { }
