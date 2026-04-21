import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Probabilidad Básica y Tablas de Contingencia';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

// Fuente original: [82].pdf
export async function pregunta() {
    // Generación aleatoria de datos para la tabla de contingencia
    let A1 = Math.floor(Math.random() * 200) + 100;
    let A2 = Math.floor(Math.random() * 200) + 100;
    let B1 = Math.floor(Math.random() * 200) + 100;
    let B2 = Math.floor(Math.random() * 200) + 100;

    let totalA = A1 + A2;
    let totalB = B1 + B2;
    let totalC1 = A1 + B1;
    let totalC2 = A2 + B2;
    let granTotal = totalA + totalB;

    let Pregunta = `<div class="problema2">
    <h3>Análisis de Probabilidad mediante Tablas de Contingencia</h3>
    <p>En una encuesta reciente, se clasificó a un grupo de personas según dos criterios. Los resultados se muestran en la siguiente tabla:</p>
    <center>
    <table border="1" cellpadding="10" style="border-collapse: collapse; text-align: center;">
        <tr><th></th><th>Categoría X</th><th>Categoría Y</th><th>Total</th></tr>
        <tr><th>Grupo A</th><td>${A1}</td><td>${A2}</td><td>${totalA}</td></tr>
        <tr><th>Grupo B</th><td>${B1}</td><td>${B2}</td><td>${totalB}</td></tr>
        <tr><th>Total</th><td>${totalC1}</td><td>${totalC2}</td><td>${granTotal}</td></tr>
    </table>
    </center>
    <br>
    <ol class="FT_ol_a">
        <li>Determine la probabilidad de que una persona seleccionada al azar pertenezca al Grupo A. <div>2</div></li>${CR(2)}
        <li>Calcule $P(A \\cap Y)$. <div>2</div></li>${CR(2)}
        <li>Calcule $P(B \\cup X)$. Explique brevemente su procedimiento usando la fórmula de la unión. <div>3</div></li>${CR(3)}
        <li>Si se selecciona una persona del Grupo B, ¿cuál es la probabilidad de que pertenezca a la Categoría X? <div>3</div></li>${CR(3)}
    </ol>
    </div><div class="page"></div>`;

    // Cálculos para la solución
    let pA = (totalA / granTotal).toFixed(4);
    let pAnY = (A2 / granTotal).toFixed(4);
    let pBuX = ((totalB + totalC1 - B1) / granTotal).toFixed(4);
    let pXcondB = (B1 / totalB).toFixed(4);

    let Solucion = `<div class="ans"><b>Soluciones:</b>
    <br>(1) $P(A) = \\frac{${totalA}}{${granTotal}} \\approx ${pA}$
    <br>(2) $P(A \\cap Y) = \\frac{${A2}}{${granTotal}} \\approx ${pAnY}$
    <br>(3) $P(B \\cup X) = P(B) + P(X) - P(B \\cap X) = \\frac{${totalB} + ${totalC1} - ${B1}}{${granTotal}} = \\frac{${totalB + totalC1 - B1}}{${granTotal}} \\approx ${pBuX}$
    <br>(4) $P(X|B) = \\frac{n(X \\cap B)}{n(B)} = \\frac{${B1}}{${totalB}} \\approx ${pXcondB}$
    </div>`;

    return [Pregunta, Solucion];
}