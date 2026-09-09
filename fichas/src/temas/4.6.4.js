import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Probabilidad con Diagramas de Venn";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("4.6.4", "4. Estadística y probabilidad", "Ficha: Probabilidad con Diagramas de Venn");

    // ==========================================
    // EJERCICIO 1 (CUARTILLA 1): DIAGRAMA DE VENN DE 2 CONJUNTOS
    // ==========================================
    const v1 = Math.floor(Math.random() * 8) + 12; // Solo B: 12 a 19
    const v2 = Math.floor(Math.random() * 5) + 6;  // Ambos B y S: 6 a 10
    const v3 = Math.floor(Math.random() * 15) + 25; // Solo S: 25 a 39
    const v4 = Math.floor(Math.random() * 5) + 3;  // Ninguno: 3 a 7
    const total1 = v1 + v2 + v3 + v4;

    const prob1_ambos = (v2 / total1).toFixed(3);
    const prob1_ninguno = (v4 / total1).toFixed(3);
    const prob1_exact1 = ((v1 + v3) / total1).toFixed(3);

    html += `
    <div class="seccion-title">I. Eventos Compuestos con Dos Conjuntos</div>
    <div class="exercise-step">
        <p><strong>1.</strong> En una encuesta realizada a los visitantes de un centro invernal, se registró su preferencia por el snowboard ($B$) y el esquí alpino ($S$). Los resultados se presentan en el siguiente diagrama de Venn:</p>

        <div style="display: flex; justify-content: center; margin: 15px 0;">
            <tlacuache-venn ancho="300" conjuntos="'B','S'" s1="${v4}" s2="${v1}" s3="${v2}" s4="${v3}"></tlacuache-venn>
        </div>

        <p>Si se elige una persona al azar de este grupo, calcule la probabilidad de que le guste:</p>
        <ol class="FT_ol_a">
            <li>Ambas actividades deportivas ($B \\cap S$). <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>Ninguna de las dos actividades ($(B \\cup S)'$). <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>Exactamente una de las dos actividades. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>
    `;

    // ==========================================
    // EJERCICIO 2 (CUARTILLA 2): DIAGRAMA DE VENN DE 3 CONJUNTOS
    // ==========================================
    const s2_val = Math.floor(Math.random() * 6) + 8;  // Solo S
    const s3_val = Math.floor(Math.random() * 4) + 3;  // S y R solamente
    const s4_val = Math.floor(Math.random() * 5) + 7;  // Solo R
    const s5_val = Math.floor(Math.random() * 4) + 4;  // S y A solamente
    const s6_val = Math.floor(Math.random() * 3) + 2;  // Triple intersección
    const s7_val = Math.floor(Math.random() * 3) + 1;  // R y A solamente
    const s8_val = Math.floor(Math.random() * 5) + 5;  // Solo A
    const s1_val = Math.floor(Math.random() * 6) + 8;  // Fuera
    
    const total2 = s2_val + s3_val + s4_val + s5_val + s6_val + s7_val + s8_val + s1_val;

    const prob2_a = (s4_val / total2).toFixed(3);
    const prob2_b = ((s5_val + s6_val) / total2).toFixed(3);
    const prob2_c = ((s8_val + s1_val) / total2).toFixed(3);

    html += `
    <div class="seccion-title">II. Intersecciones Múltiples con Tres Conjuntos</div>
    <div class="exercise-step">
        <p><strong>2.</strong> El siguiente diagrama de Venn describe la participación de ${total2} estudiantes en tres disciplinas deportivas: fútbol ($S$), rugby ($R$) y tiro con arco ($A$):</p>

        <div style="display: flex; justify-content: center; margin: 15px 0;">
            <tlacuache-venn ancho="320" n="3" conjuntos="'S','R','A'" s1="${s1_val}" s2="${s2_val}" s3="${s3_val}" s4="${s4_val}" s5="${s5_val}" s6="${s6_val}" s7="${s7_val}" s8="${s8_val}"></tlacuache-venn>
        </div>

        <p>Determine la probabilidad de que un estudiante elegido aleatoriamente:</p>
        <ol class="FT_ol_a">
            <li>Practique exclusivamente rugby. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>Practique tanto fútbol como tiro con arco ($S \\cap A$). <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>No practique ni fútbol ni rugby ($(S \\cup R)'$). <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 4.6.4 (Probabilidad con Diagramas de Venn):</b><br><br>

        <b>1. Dos Conjuntos: Total = ${total1}</b><br>
        * a) $P(B \\cap S) = \\frac{${v2}}{${total1}} \\approx $ <b>${prob1_ambos}</b><br>
        * b) $P((B \\cup S)') = \\frac{${v4}}{${total1}} \\approx $ <b>${prob1_ninguno}</b><br>
        * c) $P(\\text{Exactamente uno}) = \\frac{${v1} + ${v3}}{${total1}} = \\frac{${v1 + v3}}{${total1}} \\approx $ <b>${prob1_exact1}</b><br><br>

        <b>2. Tres Conjuntos: Total = ${total2}</b><br>
        * a) $P(\\text{Solo rugby}) = \\frac{${s4_val}}{${total2}} \\approx $ <b>${prob2_a}</b><br>
        * b) $P(S \\cap A) = \\frac{${s5_val} + ${s6_val}}{${total2}} = \\frac{${s5_val + s6_val}}{${total2}} \\approx $ <b>${prob2_b}</b><br>
        * c) $P((S \\cup R)') = \\frac{${s8_val} + ${s1_val}}{${total2}} = \\frac{${s8_val + s1_val}}{${total2}} \\approx $ <b>${prob2_c}</b>
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
