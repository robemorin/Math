import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Probabilidad y Condicional';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Problema 1: Extracción de bolas sin reemplazo (Basado en ejemplo 20)
    let nNegras = 6;
    let nBlancas = 4;
    let total = nNegras + nBlancas;
    
    // Problema 2: Probabilidad condicionada con Diagrama de Venn (Basado en sección H)
    let nItalian = 14 + 8;
    let nFrench = 8 + 7;
    let totalEst = 14 + 8 + 7 + 1;

    let Pregunta = `<div class="problema2"><h3>Ejercicios de Probabilidad y Condicional</h3>
    <p><i>Nota: Fuente original [93].pdf</i></p>
    <div class="problema2">1.- Una bolsa contiene ${nNegras} bolas negras y ${nBlancas} blancas. Se extraen 3 bolas al azar sin reemplazo.
    <ol class="FT_ol_a">
        <li>Dibuje un diagrama de árbol que represente esta situación. <div>2</div></li>${CR(5)}
        <li>Determine la probabilidad de que se extraiga exactamente una bola negra. <div>3</div></li>${CR(2)}
    </ol></div>

    <div class="problema2">2.- En un grupo de ${totalEst} estudiantes, ${14} estudian solo italiano, ${7} estudian solo francés, ${8} estudian ambos y ${1} no estudia ninguno.
    <br>Si se elige un estudiante al azar:
    <ol class="FT_ol_a">
        <li>Calcule la probabilidad de que el estudiante estudie francés. <div>2</div></li>${CR(1)}
        <li>Calcule la probabilidad de que el estudiante estudie italiano, dado que estudia francés ($P(I|F)$). <div>3</div></li>${CR(2)}
    </ol></div>

    <div class="problema2">3.- Un mazo de cartas tiene 52 cartas. Se extraen 4 cartas sin reemplazo.
    <ol class="FT_ol_a">
        <li>Halle la probabilidad de que las cuatro cartas sean rojas. <div>3</div></li>${CR(2)}
        <li>Halle la probabilidad de que al menos una carta sea negra. <div>3</div></li>${CR(2)}
    </ol></div>
    </div>`;

    let Solucion = `<div class="ans"><b>Soluciones:</b><br>
    <b>1b:</b> $P(1N) = \\frac{6}{10} \\cdot \\frac{4}{9} \\cdot \\frac{3}{8} + \\frac{4}{10} \\cdot \\frac{6}{9} \\cdot \\frac{3}{8} + \\frac{4}{10} \\cdot \\frac{3}{9} \\cdot \\frac{6}{8} = 3 \\cdot \\frac{72}{720} = 0.3$<br>
    <b>2a:</b> $P(F) = \\frac{15}{30} = 0.5$<br>
    <b>2b:</b> $P(I|F) = \\frac{8}{15} \\approx 0.533$<br>
    <b>3a:</b> $\\frac{26}{52} \\cdot \\frac{25}{51} \\cdot \\frac{24}{50} \\cdot \\frac{23}{49} \\approx 0.0577$<br>
    <b>3b:</b> $1 - P(\\text{todas rojas}) = 1 - 0.0577 = 0.9423$</div>`;

    return [Pregunta, Solucion];
}