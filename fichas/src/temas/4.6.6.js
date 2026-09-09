import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Conceptos de Probabilidad Simple y Algebraica";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("4.6.6", "4. Estadística y probabilidad", "Ficha: Conceptos de Probabilidad Simple y Algebraica");

    // ==========================================
    // EJERCICIO 1 (CUARTILLA 1): URNAS Y CONJUNTOS
    // ==========================================
    const rojas = Math.floor(Math.random() * 4) + 5; // 5 a 8
    const azules = Math.floor(Math.random() * 4) + 6; // 6 a 9
    const verdes = Math.floor(Math.random() * 3) + 3; // 3 a 5
    const totalUrna = rojas + azules + verdes;

    const probAzul = (azules / totalUrna).toFixed(3);
    const probNoRoja = ((azules + verdes) / totalUrna).toFixed(3);

    const totalEst = 30;
    const mate = Math.floor(Math.random() * 5) + 15; // 15 a 19
    const fisica = Math.floor(Math.random() * 4) + 12; // 12 a 15
    const ambos = Math.floor(Math.random() * 3) + 5; // 5 a 7

    const soloMate = mate - ambos;
    const soloFisica = fisica - ambos;
    const ninguno = totalEst - (soloMate + soloFisica + ambos);

    const probSoloFisica = (soloFisica / totalEst).toFixed(3);
    const probNinguno = (ninguno / totalEst).toFixed(3);

    html += `
    <div class="seccion-title">I. Espacios Muestrales y Probabilidad de Eventos</div>
    <div class="exercise-step">
        <p><strong>1.</strong> Una urna opaca contiene ${rojas} bolas rojas, ${azules} bolas azules y ${verdes} bolas verdes idénticas al tacto. Se extrae una bola al azar.</p>
        <ol class="FT_ol_a">
            <li>Calcule la probabilidad de que la bola extraída sea azul. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>Calcule la probabilidad de que la bola extraída no sea de color rojo. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>

        <p style="margin-top: 20px;"><strong>2.</strong> En un grupo de ${totalEst} estudiantes de bachillerato, ${mate} cursan Matemáticas, ${fisica} cursan Física y ${ambos} cursan ambas asignaturas simultáneamente.</p>
        <ol class="FT_ol_a">
            <li>Determine el número de estudiantes que cursan únicamente Física y halle la probabilidad de seleccionar al azar a uno de ellos. <span class="mark">3</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>Calcule la probabilidad de elegir un estudiante que no curse ninguna de las dos asignaturas. <span class="mark">3</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>
    `;

    // ==========================================
    // EJERCICIO 3 (CUARTILLA 2): PROBABILIDAD ALGEBRAICA
    // ==========================================
    const c = 2;
    const d = Math.floor(Math.random() * 3) + 3; // 3 a 5
    const K = 4;
    const x_sol = d;
    const amargos_sol = c * x_sol + d;
    const total_sol = (c + 1) * x_sol + d;

    html += `
    <div class="seccion-title">II. Problemas de Probabilidad con Modelación Algebraica</div>
    <div class="exercise-step">
        <p><strong>3.</strong> Una caja contiene bombones de chocolate de dos tipos: chocolates con leche y chocolates amargos.</p>
        <div class="contexto-especial">
            Se sabe que en la caja hay exactamente $x$ chocolates con leche y $(2x + ${d})$ chocolates amargos. Al tomar un chocolate al azar de la caja, la probabilidad de que sea de chocolate con leche es exactamente de $\\frac{1}{4}$.
        </div>

        <ol class="FT_ol_a">
            <li>
                Escriba una expresión en términos de $x$ para el número total de chocolates contenidos en la caja. <span class="mark">1</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Plantee una ecuación fraccionaria en función de $x$ que modele la probabilidad indicada y resuélvala para hallar el valor de $x$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Deduzca cuántos chocolates amargos hay en la caja y verifique explícitamente el valor de la probabilidad total. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 4.6.6 (Conceptos de Probabilidad Simple y Algebraica):</b><br><br>

        <b>1. Urna: Total = ${totalUrna} bolas</b><br>
        * a) $P(\\text{Azul}) = \\frac{${azules}}{${totalUrna}} \\approx $ <b>${probAzul}</b><br>
        * b) $P(\\text{No roja}) = \\frac{${azules} + ${verdes}}{${totalUrna}} = \\frac{${azules + verdes}}{${totalUrna}} \\approx $ <b>${probNoRoja}</b><br><br>

        <b>2. Estudiantes: Total = ${totalEst}</b><br>
        * a) Solo Física $= ${fisica} - ${ambos} = ${soloFisica}$ estudiantes. $P(\\text{Solo Física}) = \\frac{${soloFisica}}{${totalEst}} \\approx $ <b>${probSoloFisica}</b><br>
        * b) Ninguna $= ${totalEst} - (${soloMate} + ${soloFisica} + ${ambos}) = ${ninguno}$. $P(\\text{Ninguna}) = \\frac{${ninguno}}{${totalEst}} \\approx $ <b>${probNinguno}</b><br><br>

        <b>3. Chocolates (Álgebra):</b><br>
        * a) Total $= x + (2x + ${d}) = 3x + ${d}$ chocolates.<br>
        * b) Ecuación: $\\frac{x}{3x + ${d}} = \\frac{1}{4} \\implies 4x = 3x + ${d} \\implies $ <b>$x = ${x_sol}</b>$.<br>
        * c) Chocolates amargos: $2(${x_sol}) + ${d} = $ <b>${amargos_sol} chocolates</b>. Total = ${total_sol}. Verificación: $\\frac{${x_sol}}{${total_sol}} = \\frac{1}{4}$.
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
