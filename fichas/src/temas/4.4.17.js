import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

// Fuente original: [97].pdf

export function name() {
    return 'Probabilidad y Estadística - Evaluación Práctica';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Problema 1: Estadística descriptiva y probabilidad experimental
    // Datos: 0:2, 1:5, 2:9, 3:5, 4:4, 5:4, 6:1 (Total = 30)
    let total = 30;
    let freq5 = 4;
    let freqMenos3 = 2 + 5 + 9; // 0, 1, 2
    let probA = (freq5 / total).toFixed(2);
    let probB = (freqMenos3 / total).toFixed(2);

    let Pregunta = `<div class="problema">
    <h3>1. Probabilidad Experimental</h3>
    <p>Kate registró el número de correos electrónicos enviados diariamente durante 30 días. Los datos se muestran en la tabla:</p>
    <table border="1" style="width:50%; text-align:center;">
        <tr><th>Nº de emails</th><th>Frecuencia</th></tr>
        <tr><td>0</td><td>2</td></tr><tr><td>1</td><td>5</td></tr><tr><td>2</td><td>9</td></tr>
        <tr><td>3</td><td>5</td></tr><tr><td>4</td><td>4</td></tr><tr><td>5</td><td>4</td></tr><tr><td>6</td><td>1</td></tr>
    </table>
    <br>
    <p>Calcule la probabilidad experimental de que mañana envíe:</p>
    <ol class="FT_ol_a">
        <li>Exactamente 5 correos. <div>2</div></li>${CR(1)}
        <li>Menos de 3 correos. <div>2</div></li>${CR(1)}
    </ol></div><div class="page"></div>`;

    // Problema 2: Diagramas de Venn
    Pregunta += `<div class="problema">
    <h3>2. Conjuntos y Probabilidad</h3>
    <p>Sea $C$ el evento de que una letra seleccionada al azar de la palabra "MATHEMATICS" sea una vocal.</p>
    <ol class="FT_ol_a">
        <li>Defina el espacio muestral $U$ y el evento $C$. <div>2</div></li>${CR(3)}
        <li>Represente los conjuntos en un diagrama de Venn. <div>2</div></li>
        <center><tlacuache-venn ancho="300" s1="0.4" s2="0.2" s3="0.1"></tlacuache-venn></center>${CR(1)}
        <li>Describa en palabras qué representa $C'$. <div>1</div></li>${CR(2)}
        <li>Si se elige una letra al azar, halle $P(C)$ y $P(C')$. <div>2</div></li>${CR(2)}
    </ol></div>`;

    // Problema 3: Eventos independientes
    let pA = 0.1, pB = 0.2, pC = 0.3;
    let probNinguno = (1 - pA) * (1 - pB) * (1 - pC);
    let probAlMenosUno = 1 - probNinguno;

    Pregunta += `<div class="problema">
    <h3>3. Probabilidad Compuesta</h3>
    <p>Tres estudiantes A, B y C tienen una probabilidad de resolver un problema matemático de $${pA * 100}\\%$, $${pB * 100}\\%$ y $${pC * 100}\\%$ respectivamente. Si trabajan de forma independiente:</p>
    <ol class="FT_ol_a">
        <li>Explique qué significa que sean "eventos independientes". <div>2</div></li>${CR(3)}
        <li>Calcule la probabilidad de que al menos uno de ellos resuelva el problema. <div>4</div></li>${CR(4)}
    </ol></div>`;

    let Solucion = `<div class="ans">
    <b>P1:</b> (a) $P = 4/30 \\approx ${probA}$ (b) $P = 16/30 \\approx ${probB} <br>
    <b>P2:</b> (a) $U = \\{M, A, T, H, E, I, C, S\\}, C = \\{A, E, A, I\\}$ (c) $C'$ es el evento de elegir una consonante. (d) $P(C) = 4/11, P(C') = 7/11$ (considerando letras totales de la palabra). <br>
    <b>P3:</b> (b) $P(\\text{al menos uno}) = 1 - (0.9 \\times 0.8 \\times 0.7) = 1 - 0.504 = 0.496$
    </div>`;

    return [Pregunta, Solucion];
}