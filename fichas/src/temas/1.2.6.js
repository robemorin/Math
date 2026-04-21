// Generado a partir de: 1.2.6.js (Original movido a src/temporal/)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return 'Series Aritméticas: Sumatoria y Aplicaciones';
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    // --- DATOS ALEATORIOS ---
    // Problema 1: Directo Sn
    const u1_1 = Math.floor(Math.random() * 5) + 5;
    const d_1 = Math.floor(Math.random() * 4) + 2;
    const n_1 = 20; 
    const Sn_1 = (n_1 / 2) * (2 * u1_1 + (n_1 - 1) * d_1);

    // Problema 2: Sigma Notation
    const k_start = 1;
    const k_end = 12;
    const coeff = Math.floor(Math.random() * 5) + 2;
    const constant = Math.floor(Math.random() * 10) + 1;
    // Sum_{k=1}^12 (coeff*k + constant)
    const u1_sig = coeff * 1 + constant;
    const u12_sig = coeff * 12 + constant;
    const Sn_sig = (12 / 2) * (u1_sig + u12_sig);

    // Problema 3: Auditorio
    const filas = 15 + Math.floor(Math.random() * 5);
    const inicial = 20 + Math.floor(Math.random() * 5);
    const aumento = 2; // Siempre 2 para que sea realista
    const Sn_auditorio = (filas / 2) * (2 * inicial + (filas - 1) * aumento);

    // --- CONSTRUCCIÓN DEL HTML ---
    html += ai.getHeader("1.2.6", "Series Aritméticas", "Matemáticas AI NM - Sucesiones");

    html += `
        <div class="seccion-title">I. Sumatoria de Progresiones Aritméticas</div>
        <div class="exercise-step">
            Considere una sucesión aritmética donde $u_1 = ${u1_1}$ y $d = ${d_1}$.
            <ol class="FT_ol_a">
                <li>Halle el valor de $u_{20}$. <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Calcule la suma de los primeros 20 términos de la sucesión, $S_{20}$. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            </ol>
        </div>

        <div class="seccion-title">II. Notación de Sumatoria (Sigma)</div>
        <div class="exercise-step">
            Evalúe el valor de la siguiente expresión sin utilizar directamente la calculadora:
            <p style="text-align: center; font-size: 1.2rem;">$\\sum_{k=${k_start}}^{${k_end}} (${coeff}k + ${constant})$</p>
            <ol class="FT_ol_a">
                <li>Escriba el primer y el último término de la serie. <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Halle el valor total de la suma. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            </ol>
        </div>

        ${ai.getTiTip("Para calcular sumatorias en la TI-84, presiona <code>ALPHA + WINDOW</code> y selecciona <code>2: summation Σ(</code>.")}

        <div class="page-break"></div>

        <div class="seccion-title">III. Modelización: El Auditorio</div>
        <div class="exercise-step">
            <div class="contexto-especial">
                <b>Situación:</b> Un auditorio tiene $${filas}$ filas de asientos. La primera fila tiene $${inicial}$ asientos, y cada fila sucesiva tiene $${aumento}$ asientos más que la anterior.
            </div>
            <ol class="FT_ol_a">
                <li>Halle el número de asientos que hay en la última fila. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Calcule la capacidad total de asientos del auditorio. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
                <li><b>Razonamiento:</b> Si se desea duplicar la capacidad total aumentando solo el número de filas (manteniendo $u_1$ y $d$), estime cuántas filas adicionales se necesitarían. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
            </ol>
        </div>

        <div class="seccion-title">IV. Espacio para Cálculos TI-84</div>
        <div style="border: 1px solid #ccc; height: 200px; padding: 10px; font-size: 0.8rem; color: #999;">
            Utilice este espacio para anotar los comandos o listas utilizadas en su calculadora:
        </div>
    </div>
    `;

    // --- SOLUCIONARIO ---
    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 1.2.6:</b><br>
        1a. $u_{20} = ${u1_1} + 19\\cdot ${d_1} = ${u1_1 + 19 * d_1}$ [M1 A1] | 1b. $S_{20} = \\frac{20}{2}(u_1 + u_{20}) = 10(${u1_1} + ${u1_1 + 19 * d_1}) = ${Sn_1}$ [M1 A1]<br>
        2a. $u_1 = ${u1_sig}, u_{12} = ${u12_sig}$ [A2] | 2b. $S_{12} = 6(${u1_sig} + ${u12_sig}) = ${Sn_sig}$ [M1 A1]<br>
        3a. $u_{${filas}} = ${inicial} + ${filas - 1}\\cdot 2 = ${inicial + (filas - 1) * 2}$ [M1 A1]<br>
        3b. $S_{${filas}} = ${Sn_auditorio}$ [M1 A2]<br>
        3c. Resolver $\\frac{n}{2}(2\\cdot ${inicial} + (n-1)\\cdot 2) = ${2 * Sn_auditorio}$ para $n$. (Aprox ${Math.round(Math.sqrt(4 * Sn_auditorio + (inicial - 1) ** 2) - (inicial - 1))} filas totales). [M1 A2]
    </div>
    `;

    return [html, solucion];
}

export async function renderGeoGebra(container, totalElements) {}
