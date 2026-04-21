import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Ley de la Suma de Probabilidades y Diagramas de Venn';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

/**
 * Fuente original: [88].pdf
 * Generador de ficha de practica para probabilidad (4.4)
 */
export async function pregunta() {
    // Parámetros dinámicos para los conjuntos (múltiplos)
    let n_u = 99; // < 100
    let m1 = 7;
    let m2 = 5;
    
    // Cálculos para la solución
    let nA = Math.floor(n_u / m1);
    let nB = Math.floor(n_u / m2);
    let nAnB = Math.floor(n_u / (m1 * m2));
    let nAUB = nA + nB - nAnB;

    let Pregunta = `<div class="problema2"><h3>Práctica: Ley de la Suma de Probabilidades</h3>
    <p>Sea $U = \\{x \\in \\mathbb{Z}^+ : x < 100\\}$. Consideremos los conjuntos:</p>
    <ul>
        <li>$A = \\{\\text{múltiplos de } ${m1} \\text{ en } U\\}$</li>
        <li>$B = \\{\\text{múltiplos de } ${m2} \\text{ en } U\\}$</li>
    </ul>
    
    <ol class="FT_ol_a">
        <li>Determine el número de elementos en cada conjunto: $n(A)$, $n(B)$, $n(A \\cap B)$ y $n(A \\cup B)$. <div>4</div></li>${CR(4)}
        <li>Dibuje un diagrama de Venn que represente esta situación y sombree la región correspondiente a $A \\cup B$. <div>4</div></li>${CR(8)}
        <li>Si se elige un número al azar de $U$, calcule $P(A \\cup B)$ usando la fórmula de la suma. <div>3</div></li>${CR(3)}
        <li>Explique con sus propias palabras por qué restamos $n(A \\cap B)$ al sumar $n(A)$ y $n(B)$. <div>2</div></li>${CR(4)}
    </ol>
    </div><div class="page"></div>`;

    let Solucion = `<div class="ans"><b>Soluciones esperadas:</b><br>
    (1) $n(A) = ${nA}, n(B) = ${nB}, n(A \\cap B) = ${nAnB}, n(A \\cup B) = ${nAUB}$<br>
    (3) $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = \\frac{${nA}}{99} + \\frac{${nB}}{99} - \\frac{${nAnB}}{99} = \\frac{${nAUB}}{99}$<br>
    (4) Se resta para no contar dos veces los elementos que pertenecen a la intersección (doble conteo).</div>`;

    // Incluir componente visual de diagrama de Venn
    // s1: A solo, s2: B solo, s3: intersección, s4: exterior
    let s1 = nA - nAnB;
    let s2 = nB - nAnB;
    let s3 = nAnB;
    let s4 = n_u - nAUB;

    Pregunta += `<center><tlacuache-venn ancho="300" s1="${s1}" s2="${s2}" s3="${s3}" s4="${s4}"></tlacuache-venn></center>`;

    return [Pregunta, Solucion];
}