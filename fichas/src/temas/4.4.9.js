import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Fuente original: [89].pdf
 * Módulo para práctica de Probabilidad básica (Ley de adición y sucesos excluyentes)
 * IB Math AI NM - Subtema 4.4
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Problema 1: Aplicación directa de la Ley de Adición
    let pa = parseFloat((Math.random() * 0.4 + 0.3).toFixed(1));
    let pb = parseFloat((Math.random() * 0.3 + 0.2).toFixed(1));
    let p_int = parseFloat((Math.random() * 0.1 + 0.1).toFixed(1));
    let paub = (pa + pb - p_int).toFixed(2);

    let Pregunta = `<div class="problema2"><h3>1. Ley de Adición de Probabilidades</h3>
    Dados dos eventos $A$ y $B$, donde $P(A) = ${pa}$, $P(B) = ${pb}$ y $P(A \\cap B) = ${p_int}$.
    <ol class="FT_ol_a">
        <li>Calcule $P(A \\cup B)$. <div>2</div></li>${CR(2)}
        <li>¿Son los eventos $A$ y $B$ mutuamente excluyentes? Justifique su respuesta. <div>2</div></li>${CR(2)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (a) $P(A \\cup B) = ${pa} + ${pb} - ${p_int} = ${paub}$ (b) No, porque $P(A \\cap B) \\neq 0$.</div><br>`;

    // Problema 2: Contextualizado (Estudiantes)
    let total = 40;
    let soloA = Math.floor(Math.random() * 10) + 5;
    let soloB = Math.floor(Math.random() * 10) + 5;
    let ninguno = Math.floor(Math.random() * 5) + 3;
    let ambos = total - (soloA + soloB + ninguno);

    Pregunta += `<div class="problema2"><h3>2. Análisis de datos en un grupo</h3>
    En un grupo de ${total} estudiantes, ${soloA + ambos} practican fútbol, ${soloB + ambos} practican natación y ${ninguno} no practican ninguno de los dos deportes. ${ambos} estudiantes practican ambos deportes. Si se selecciona un estudiante al azar:
    <ol class="FT_ol_a">
        <li>Calcule la probabilidad de que el estudiante practique al menos uno de los dos deportes. <div>3</div></li>${CR(2)}
        <li>Si se elige un estudiante que practica fútbol, ¿cuál es la probabilidad de que también practique natación? <div>2</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> (a) $P(F \\cup N) = \\frac{${total - ninguno}}{${total}} = ${((total - ninguno) / total).toFixed(2)}$ (b) $P(N|F) = \\frac{${ambos}}{${soloA + ambos}} \\approx ${(ambos / (soloA + ambos)).toFixed(3)}$</div><br>`;

    // Problema 3: Diagrama de Venn y eventos excluyentes
    let valX = Math.round(Math.random() * 10 + 10) / 100;
    let valY = Math.round(Math.random() * 10 + 10) / 100;
    
    Pregunta += `<div class="problema2"><h3>3. Diagrama de Venn</h3>
    En un experimento aleatorio, $P(X) = ${valX.toFixed(2)}$ y $P(Y) = ${valY.toFixed(2)}$. Se sabe que los eventos son <b>mutuamente excluyentes</b>.
    <ol class="FT_ol_a">
        <li>Represente esta situación en un diagrama de Venn indicando las probabilidades en cada zona. <div>3</div></li>${CR(6)}
        <li>Halle $P(X \\cup Y)$. <div>2</div></li>${CR(2)}
    </ol></div><div class="page"></div>`;

    Solucion += `<div class="ans"><b>P3:</b> (a) Dos círculos separados en el diagrama. $P(X)=${valX.toFixed(2)}$, $P(Y)=${valY.toFixed(2)}$. (b) $P(X \\cup Y) = ${valX + valY}$</div>`;

    return [Pregunta, Solucion];
}