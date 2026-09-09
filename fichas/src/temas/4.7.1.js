import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Sucesos Independientes y Dependientes";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("4.7.1", "4. Estadística y probabilidad", "Ficha: Sucesos Independientes y Dependientes");

    // ==========================================
    // EJERCICIO 1 (CUARTILLA 1): DEFINICIÓN FORMAL DE INDEPENDENCIA
    // ==========================================
    const pA = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.4).toFixed(2)); // 0.4, 0.5, 0.6
    const pB = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.3).toFixed(2)); // 0.3, 0.4, 0.5
    const pInt_ind = parseFloat((pA * pB).toFixed(3));
    const pUnion_ind = parseFloat((pA + pB - pInt_ind).toFixed(3));

    const p1 = parseFloat((Math.floor(Math.random() * 3) * 0.05 + 0.70).toFixed(2)); // 0.70 a 0.80
    const p2 = parseFloat((Math.floor(Math.random() * 3) * 0.05 + 0.65).toFixed(2)); // 0.65 a 0.75
    const pAmbos = parseFloat((p1 * p2).toFixed(4));
    const pAlMenosUno = parseFloat((p1 + p2 - pAmbos).toFixed(4));
    const pNingunoTiro = parseFloat(((1 - p1) * (1 - p2)).toFixed(4));

    html += `
    <div class="seccion-title">I. Definición y Regla del Producto para Sucesos Independientes</div>
    <div class="exercise-step">
        <p><strong>1.</strong> Sean $A$ y $B$ dos eventos independientes tales que $P(A) = ${pA}$ y $P(B) = ${pB}$.</p>
        <ol class="FT_ol_a">
            <li>Halle el valor de la probabilidad conjunta $P(A \\cap B)$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>Calcule la probabilidad de la unión $P(A \\cup B)$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>

        <p style="margin-top: 25px;"><strong>2.</strong> Dos jugadores de baloncesto, Mateo y Lucas, lanzan un tiro libre cada uno de forma completamente independiente. La probabilidad de que Mateo enceste es $P(M) = ${p1}$, mientras que la probabilidad de que Lucas enceste es $P(L) = ${p2}$.</p>
        <ol class="FT_ol_a">
            <li>Calcule la probabilidad de que ambos jugadores encesten su tiro. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>Calcule la probabilidad de que al menos uno de los dos jugadores enceste. <span class="mark">3</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>
    `;

    // ==========================================
    // EJERCICIO 2 (CUARTILLA 2): CONTRASTACIÓN DE INDEPENDENCIA EN CONTEXTO
    // ==========================================
    const pF = parseFloat((Math.floor(Math.random() * 2) * 0.1 + 0.5).toFixed(1)); // 0.5, 0.6
    const pB_dep = parseFloat((Math.floor(Math.random() * 2) * 0.1 + 0.4).toFixed(1)); // 0.4, 0.5
    
    const sonIndep = Math.random() > 0.5;
    let pAmbosDep;
    if (sonIndep) {
        pAmbosDep = parseFloat((pF * pB_dep).toFixed(2));
    } else {
        pAmbosDep = parseFloat((pF * pB_dep - 0.08).toFixed(2));
    }

    const prod_esperado = parseFloat((pF * pB_dep).toFixed(2));
    const cond_B_dado_F = (pAmbosDep / pF).toFixed(3);

    html += `
    <div class="seccion-title">II. Prueba Formal de Independencia y Condicionalidad</div>
    <div class="exercise-step">
        <p><strong>3.</strong> En un club deportivo escolar, el ${Math.round(pF * 100)}\\% de los miembros practica fútbol ($F$) y el ${Math.round(pB_dep * 100)}\\% practica básquetbol ($B$). Además, se conoce que la probabilidad de que un estudiante practique ambos deportes es $P(F \\cap B) = ${pAmbosDep}$.</p>

        <ol class="FT_ol_a">
            <li>
                Halle la probabilidad condicional de que un estudiante practique básquetbol sabiendo que ya practica fútbol: $P(B \\mid F)$. <span class="mark">3</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Utilizando la condición matemática formal de independencia ($P(F \\cap B) = P(F) \\times P(B)$ o $P(B \\mid F) = P(B)$), demuestre si los eventos "practicar fútbol" y "practicar básquetbol" son independientes o dependientes. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 4.7.3 (Sucesos Independientes y Dependientes):</b><br><br>

        <b>1. Eventos Independientes Básicos:</b><br>
        * a) $P(A \\cap B) = P(A) \\cdot P(B) = (${pA})(${pB}) = $ <b>${pInt_ind}</b><br>
        * b) $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = ${pA} + ${pB} - ${pInt_ind} = $ <b>${pUnion_ind}</b><br><br>

        <b>2. Tiros Libres Independientes:</b><br>
        * a) $P(M \\cap L) = P(M) \\cdot P(L) = (${p1})(${p2}) = $ <b>${pAmbos}</b><br>
        * b) $P(\\text{Al menos uno}) = 1 - P(M' \\cap L') = 1 - (1 - ${p1})(1 - ${p2}) = 1 - ${pNingunoTiro} = $ <b>${pAlMenosUno}</b> (o vía suma de probabilidades).<br><br>

        <b>3. Deportes en el Club:</b><br>
        * a) $P(B \\mid F) = \\frac{P(F \\cap B)}{P(F)} = \\frac{${pAmbosDep}}{${pF}} \\approx $ <b>${cond_B_dado_F}</b><br>
        * b) Comprobación de independencia:<br>
        &nbsp;&nbsp;$P(F) \\times P(B) = (${pF})(${pB_dep}) = ${prod_esperado}$.<br>
        &nbsp;&nbsp;Comparando con $P(F \\cap B) = ${pAmbosDep}$:<br>
        &nbsp;&nbsp;${sonIndep 
            ? `Como $P(F \\cap B) = P(F) \\times P(B) = ${pAmbosDep}$, los eventos <b>SÍ son independientes</b>.` 
            : `Como $P(F \\cap B) = ${pAmbosDep} \\neq ${prod_esperado} = P(F) \\times P(B)$, los eventos <b>NO son independientes (son dependientes)</b>.`
        }
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
