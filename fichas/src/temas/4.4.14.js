import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

// Fuente original: [94].pdf
export function name() {
    return 'Probabilidad Condicional y Diagramas de Árbol';
}

function CR(n) {
    return "<br>".repeat(n);
}

export async function pregunta() {
    // Problema 1: Urnas y monedas (Parametrizado Ejercicio 8)
    const redA = 2, blueA = 3;
    const redB = 4, blueB = 1;
    const totalA = redA + blueA;
    const totalB = redB + blueB;
    
    // Problema 2: Máquinas y mal funcionamiento (Parametrizado Ejercicio 10)
    const probX = (Math.floor(Math.random() * 5) + 5) / 100; // 5% a 9%
    const probY = (Math.floor(Math.random() * 5) + 3) / 100; // 3% a 7%

    let Pregunta = `<div class="problema2">
    <h3>Evaluación de Probabilidad y Diagramas de Árbol</h3>
    
    <p><b>1. (Urnas)</b> La urna A contiene ${redA} bolas rojas y ${blueA} azules. La urna B contiene ${redB} rojas y ${blueB} azules. Se elige una urna lanzando una moneda justa (cara para A, cruz para B) y se extrae una bola.</p>
    <ol class="FT_ol_a">
        <li>Dibuje un diagrama de árbol que represente esta situación. <div>2</div></li>${CR(2)}
        <li>Determine la probabilidad de que la bola extraída sea roja. <div>2</div></li>${CR(2)}
        <li>Dado que la bola es roja, ¿cuál es la probabilidad de que provenga de la urna B? <div>3</div></li>${CR(3)}
    </ol>

    <p><b>2. (Máquinas)</b> La máquina X tiene una probabilidad de $${probX * 100}\\%$ de mal funcionamiento diario, y la máquina Y tiene una probabilidad de $${probY * 100}\\%$.</p>
    <ol class="FT_ol_a">
        <li>Halle la probabilidad de que <i>exactamente una</i> de las máquinas falle hoy. <div>3</div></li>${CR(2)}
        <li>Halle la probabilidad de que <i>al menos una</i> máquina falle hoy. <div>3</div></li>${CR(2)}
    </ol>
    </div><div class="page"></div>`;

    // Cálculos para soluciones
    const pRed = (0.5 * (redA/totalA)) + (0.5 * (redB/totalB));
    const pB_dado_Red = (0.5 * (redB/totalB)) / pRed;
    
    const pExactOne = (probX * (1 - probY)) + ((1 - probX) * probY);
    const pAtLeastOne = 1 - ((1 - probX) * (1 - probY));

    let Solucion = `<div class="ans">
    <b>P1:</b> 
    (1b) $P(R) = 0.5 \\times \\frac{${redA}}{${totalA}} + 0.5 \\times \\frac{${redB}}{${totalB}} = ${pRed.toFixed(4)}$<br>
    (1c) $P(B|R) = \\frac{P(B \\cap R)}{P(R)} = \\frac{0.5 \\times ${redB/totalB}}{${pRed.toFixed(4)}} \\approx ${pB_dado_Red.toFixed(4)}$<br><br>
    
    <b>P2:</b> 
    (2a) $P(\\text{Exacta}) = ${probX}(${1-probY}) + (${1-probX})${probY} = ${pExactOne.toFixed(4)}$<br>
    (2b) $P(\\text{Al menos}) = 1 - P(\\text{Ninguna}) = 1 - (${1-probX})(${1-probY}) = ${pAtLeastOne.toFixed(4)}$
    </div>`;

    return [Pregunta, Solucion];
}