import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Fuente original: [91].pdf
 * Módulo para ficha de probabilidad (Eventos dependientes e independientes)
 * Tiempo estimado: 40 minutos
 */

export function name() {
    return 'Probabilidad y Eventos Dependientes';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // --- Problema 1: Red Eléctrica (Basado en Ejercicio 12 del PDF) ---
    // p es la probabilidad de que un switch esté cerrado.
    // Estructura: (Switch A y B en paralelo) en serie con (Switch C y D en paralelo)
    // Probabilidad de flujo = (1 - (1-p)^2) * (1 - (1-p)^2)
    
    let p_val = (Math.floor(Math.random() * 4) + 4) / 10; // p entre 0.4 y 0.7
    let prob_paralelo = 1 - Math.pow(1 - p_val, 2);
    let prob_total = Math.pow(prob_paralelo, 2);

    let Pregunta = `<div class="problema2"><h3>1. Análisis de Red Eléctrica</h3>
    <p>Considere una red eléctrica donde cuatro interruptores operan de forma independiente. La probabilidad de que cada interruptor esté cerrado es $p = ${p_val}. La red permite el flujo de A a B si hay un camino cerrado.</p>
    <div style="text-align: center; margin: 20px;">
        <svg width="300" height="100" viewBox="0 0 300 100">
            <line x1="20" y1="50" x2="60" y2="50" stroke="black" stroke-width="2"/>
            <circle cx="60" cy="50" r="3" fill="black"/>
            <path d="M60,50 L90,20 L150,20 L180,50" fill="none" stroke="black" stroke-width="2"/>
            <path d="M60,50 L90,80 L150,80 L180,50" fill="none" stroke="black" stroke-width="2"/>
            <line x1="180" y1="50" x2="220" y2="50" stroke="black" stroke-width="2"/>
            <circle cx="220" cy="50" r="3" fill="black"/>
            <path d="M220,50 L250,20 L310,20 L340,50" fill="none" stroke="black" stroke-width="2"/>
            <path d="M220,50 L250,80 L310,80 L340,50" fill="none" stroke="black" stroke-width="2"/>
        </svg>
    </div>
    <ol class="FT_ol_a">
        <li>Determine la probabilidad de que exista corriente de A a B en función de $p$. <div>3</div></li>${CR(2)}
        <li>Si $p = ${p_val}, calcule la probabilidad numérica de que fluya corriente. <div>2</div></li>${CR(2)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (1a) $P = (1-(1-p)^2)^2$ (1b) $P = ${(prob_total).toFixed(4)}$</div><br>`;

    // --- Problema 2: Desafío de Dardos (Basado en Ejercicio 13) ---
    // Estrategia 1: P-Q-P | Estrategia 2: Q-P-Q
    // P_p = probabilidad de ganar contra Penny, P_q = contra Quentin.
    // Dado que Penny es mejor, supongamos P_p > P_q.
    let pp = 0.7; // Probabilidad de ganar a Penny
    let pq = 0.85; // Probabilidad de ganar a Quentin
    
    // Probabilidad de ganar 2 de 3: 
    // Estrategia 1 (P-Q-P): (pp*pq*pp) + (pp*pq*(1-pp)) + (pp*(1-pq)*pp) + ((1-pp)*pq*pp)
    let estr1 = pp*pq*pp + pp*pq*(1-pp) + pp*(1-pq)*pp + (1-pp)*pq*pp;
    let estr2 = pq*pp*pq + pq*pp*(1-pq) + pq*(1-pp)*pq + (1-pq)*pp*pq;

    Pregunta += `<div class="problema2"><h3>2. Estrategia de juego</h3>
    <p>Kane debe ganar 2 de 3 partidas. Puede jugar contra Penny (probabilidad de ganar $${pp}$) o Quentin (probabilidad de ganar $${pq}$).</p>
    <ol class="FT_ol_a">
        <li>Calcule la probabilidad de ganar el desafío bajo la secuencia Penny-Quentin-Penny. <div>3</div></li>${CR(2)}
        <li>¿Qué estrategia debe elegir para maximizar sus probabilidades de victoria? Justifique matemáticamente. <div>3</div></li>${CR(3)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> (2a) $P_1 = ${estr1.toFixed(3)}$ (2b) Comparar con $P_2 = ${estr2.toFixed(3)}$. Elegir mayor probabilidad.</div><br>`;

    // --- Problema 3: Probabilidad condicional (Extracción sin reemplazo) ---
    let rojas = 6;
    let azules = 4;
    let total = rojas + azules;

    Pregunta += `<div class="problema2"><h3>3. Eventos dependientes</h3>
    <p>Una urna contiene ${rojas} bolas rojas y ${azules} bolas azules. Se extraen dos bolas sin reemplazo.</p>
    <ol class="FT_ol_a">
        <li>Dibuje un diagrama de árbol que represente esta situación. <div>3</div></li>${CR(6)}
        <li>Calcule la probabilidad de que ambas bolas sean del mismo color. <div>3</div></li>${CR(2)}
    </ol></div><div class="page"></div>`;

    Solucion += `<div class="ans"><b>P3:</b> (3b) $P(RR) + P(AA) = (\\frac{${rojas}}{${total}} \\times \\frac{${rojas-1}}{${total-1}}) + (\\frac{${azules}}{${total}} \\times \\frac{${azules-1}}{${total-1}}) = ${( (rojas*(rojas-1) + azules*(azules-1)) / (total*(total-1)) ).toFixed(3)}$</div>`;

    return [Pregunta, Solucion];
}