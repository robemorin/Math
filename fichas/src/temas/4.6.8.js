import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Probabilidad con Diagramas de Árbol";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("4.6.8", "4. Estadística y probabilidad", "Ficha: Probabilidad con Diagramas de Árbol");

    // ==========================================
    // EJERCICIO 1 (CUARTILLA 1): LEY DE PROBABILIDAD TOTAL ABSTRACTA Y CONTEXTO
    // ==========================================
    const pA = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.4).toFixed(2)); // 0.4, 0.5, 0.6
    const pB_dado_A = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.7).toFixed(2)); // 0.7, 0.8, 0.9
    const pB_dado_noA = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.2).toFixed(2)); // 0.2, 0.3, 0.4
    const pNoA = parseFloat((1 - pA).toFixed(2));

    const pB_total = parseFloat((pA * pB_dado_A + pNoA * pB_dado_noA).toFixed(4));

    // Fábrica de botellas
    const pMaqA = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.4).toFixed(2)); // 0.4, 0.5, 0.6
    const pMaqB = parseFloat((1 - pMaqA).toFixed(2));
    const pDef_A = parseFloat((Math.floor(Math.random() * 3) * 0.01 + 0.04).toFixed(3)); // 0.04, 0.05, 0.06
    const pDef_B = parseFloat((Math.floor(Math.random() * 2) * 0.01 + 0.02).toFixed(3)); // 0.02, 0.03
    const pDef_total = parseFloat((pMaqA * pDef_A + pMaqB * pDef_B).toFixed(5));

    html += `
    <div class="seccion-title">I. Ley de Probabilidad Total y Diagramas de Árbol</div>
    <div class="exercise-step">
        <p><strong>1.</strong> Sean $A$ y $B$ dos sucesos tales que $P(A) = ${pA}$, $P(B \\mid A) = ${pB_dado_A}$ y $P(B \\mid A') = ${pB_dado_noA}$.</p>
        <ol class="FT_ol_a">
            <li>
                Represente la situación mediante un diagrama de árbol de dos etapas, indicando las probabilidades en cada rama. <span class="mark">2</span>
                <div style="border: 1px dashed #bbb; height: 110px; margin: 8px 0; background-color: #fafafa; border-radius: 4px;"></div>
            </li>
            <li>
                Calcule el valor exacto de la probabilidad total $P(B)$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>

        <p style="margin-top: 20px;"><strong>2.</strong> En una planta embotelladora, la Máquina A produce el $${Math.round(pMaqA * 100)}\\%$ de las botellas, mientras que la Máquina B produce el resto. Se sabe que la Máquina A daña el $${(pDef_A * 100).toFixed(1)}\\%$ de su producción, y la Máquina B daña el $${(pDef_B * 100).toFixed(1)}\\%$ de la suya.</p>
        <ol class="FT_ol_a">
            <li>
                Construya un diagrama de árbol para representar este proceso de producción. <span class="mark">2</span>
                <div style="border: 1px dashed #bbb; height: 110px; margin: 8px 0; background-color: #fafafa; border-radius: 4px;"></div>
            </li>
            <li>
                Determine la probabilidad de que una botella elegida al azar de la producción total esté dañada. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>
    `;

    // ==========================================
    // EJERCICIO 2 (CUARTILLA 2): SELECCIÓN EN URNAS Y PROBABILIDAD CONDICIONAL / BAYES
    // ==========================================
    const rx = Math.floor(Math.random() * 3) + 2; // 2 a 4
    const wx = Math.floor(Math.random() * 2) + 2; // 2 a 3
    const totalX = rx + wx;

    const ry = Math.floor(Math.random() * 2) + 3; // 3 a 4
    const wy = Math.floor(Math.random() * 2) + 1; // 1 a 2
    const totalY = ry + wy;

    const pR_dado_X = rx / totalX;
    const pR_dado_Y = ry / totalY;
    const pR_total = 0.5 * pR_dado_X + 0.5 * pR_dado_Y;
    const pX_dado_R = (0.5 * pR_dado_X) / pR_total;

    html += `
    <div class="seccion-title">II. Selección por Etapas y Probabilidad Condicional A Posteriori</div>
    <div class="exercise-step">
        <p><strong>3.</strong> Se tienen dos cajas con fichas de colores:</p>
        <ul>
            <li>La Caja $X$ contiene $${rx}$ fichas rojas y $${wx}$ fichas blancas.</li>
            <li>La Caja $Y$ contiene $${ry}$ fichas rojas y $${wy}$ fichas blancas.</li>
        </ul>
        <p>Se lanza una moneda equilibrada para elegir una de las cajas con igual probabilidad ($0.5$), y a continuación se extrae una ficha al azar de la caja seleccionada.</p>

        <ol class="FT_ol_a">
            <li>
                Dibuje un diagrama de árbol completo que modele la selección de la caja y el color de la ficha extraída, etiquetando cada rama con su respectiva probabilidad. <span class="mark">2</span>
                <div style="border: 1px dashed #bbb; height: 130px; margin: 8px 0; background-color: #fafafa; border-radius: 4px;"></div>
            </li>
            <li>
                Halle la probabilidad de que la ficha extraída sea de color rojo. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Sabiendo que la ficha extraída resultó ser de color rojo, calcule la probabilidad de que provenga de la Caja $X$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 4.6.8 (Probabilidad con Diagramas de Árbol):</b><br><br>

        <b>1. Ley de Probabilidad Total Abstracta:</b><br>
        * a) Árbol con ramas $A$ (${pA}) y $A'$ (${pNoA}); desde $A$: $B$ (${pB_dado_A}) y $B'$ (${(1-pB_dado_A).toFixed(2)}); desde $A'$: $B$ (${pB_dado_noA}) y $B'$ (${(1-pB_dado_noA).toFixed(2)}).<br>
        * b) $P(B) = P(A)P(B \\mid A) + P(A')P(B \\mid A') = (${pA})(${pB_dado_A}) + (${pNoA})(${pB_dado_noA}) = $ <b>${pB_total}</b><br><br>

        <b>2. Planta Embotelladora:</b><br>
        * a) Árbol con ramas Máquina A (${pMaqA}) y Máquina B (${pMaqB}); desde A: Dañada (${pDef_A}), No dañada (${(1-pDef_A).toFixed(3)}); desde B: Dañada (${pDef_B}), No dañada (${(1-pDef_B).toFixed(3)}).<br>
        * b) $P(D) = P(A)P(D \\mid A) + P(B)P(D \\mid B) = (${pMaqA})(${pDef_A}) + (${pMaqB})(${pDef_B}) = $ <b>${pDef_total}</b><br><br>

        <b>3. Cajas y Moneda (Bayes):</b><br>
        * a) Árbol: 1ª etapa Cajas $X$ ($0.5$) e $Y$ ($0.5$). 2ª etapa desde $X$: Roja ($${rx}/${totalX}$), Blanca ($${wx}/${totalX}$); desde $Y$: Roja ($${ry}/${totalY}$), Blanca ($${wy}/${totalY}$).<br>
        * b) $P(R) = 0.5 \\times \\frac{${rx}}{${totalX}} + 0.5 \\times \\frac{${ry}}{${totalY}} = ${(0.5*pR_dado_X).toFixed(4)} + ${(0.5*pR_dado_Y).toFixed(4)} = $ <b>${pR_total.toFixed(4)}</b><br>
        * c) $P(X \\mid R) = \\frac{P(X \\cap R)}{P(R)} = \\frac{0.5 \\times (${rx}/${totalX})}{${pR_total.toFixed(4)}} \\approx $ <b>${pX_dado_R.toFixed(4)}</b>
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
