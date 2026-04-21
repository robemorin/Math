import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Probabilidad Condicional y El Problema de Monty Hall';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Contexto: Problema de Monty Hall (Fuente: [95].pdf)
    // Parametrización: Nombres de los participantes
    let nombres = ["Ana", "Carlos", "Beatriz", "Diego"];
    let nombre = nombres[Math.floor(Math.random() * nombres.length)];

    let Pregunta = `<div class="problema2">
    <h3>El Dilema de ${nombre}</h3>
    <p>${nombre} participa en un concurso de televisión. Hay 3 puertas cerradas: detrás de una hay un coche y detrás de las otras dos hay cabras. ${nombre} elige la Puerta 1. El presentador, que sabe qué hay detrás de cada puerta, abre una puerta diferente (digamos la Puerta 3) que contiene una cabra. Luego, el presentador le pregunta a ${nombre}: "¿Deseas cambiar tu elección a la Puerta 2?".</p>
    
    <ol class="FT_ol_a">
        <li>Dibuje un diagrama de árbol que represente las tres situaciones iniciales posibles (Coche en P1, P2 o P3) y las acciones del presentador. <div>6</div></li>${CR(6)}
        
        <li>Utilizando notación de probabilidad condicional, calcule $P(\\text{Coche en P2} | \\text{Presentador abre P3})$. <div>4</div></li>${CR(3)}
        
        <li>Si ${nombre} decide cambiar, ¿cuál es la probabilidad de ganar el coche? Explique su razonamiento. <div>3</div></li>${CR(3)}
        
        <li><b>Independencia:</b> Suponga que se añaden dos eventos $A$ y $B$. Si $P(A) = 0.6$, $P(B) = 0.3$ y $P(A \\cap B) = 0.18$. 
        <br>¿Son $A$ y $B$ eventos independientes? Justifique su respuesta mediante la definición formal: $P(A \\cap B) = P(A) \\times P(B)$. <div>4</div></li>${CR(3)}
    </ol>
    </div>`;

    let Solucion = `<div class="ans"><b>Solucionario:</b><br>
    (1) El árbol debe mostrar las ramas: P1(1/3), P2(1/3), P3(1/3). Si P1, presentador abre P2 o P3 (prob 1/2). Si P2, presenta P3. Si P3, presenta P2.<br>
    (2) Por el Teorema de Bayes o análisis del árbol: $P(\\text{Gana cambiando}) = 2/3$.<br>
    (3) Al cambiar, ${nombre} gana si originalmente eligió una cabra (prob 2/3).<br>
    (4) $0.6 \\times 0.3 = 0.18$. Como $P(A \\cap B) = 0.18$, los eventos <b>son independientes</b>.</div>`;

    return [Pregunta, Solucion];
}