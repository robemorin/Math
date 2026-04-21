import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Estadística: Interpretación de Diagramas de Caja';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

/**
 * Helper para calcular resumen de 5 números
 */
function getFiveNumberSummary(data) {
    data.sort((a, b) => a - b);
    const min = data[0];
    const max = data[data.length - 1];
    const median = data[Math.floor(data.length / 2)];
    const q1 = data[Math.floor(data.length / 4)];
    const q3 = data[Math.floor(3 * data.length / 4)];
    return [min, q1, median, q3, max];
}

export async function pregunta() {
    // Fuente original: [120].pdf
    // Generación de datos aleatorios
    let data = [8, 2, 3, 9, 6, 5, 3, 2, 2, 6, 2, 5, 4, 5, 5, 6];
    let summary = getFiveNumberSummary(data.sort((a,b)=>a-b));
    let q1 = summary[1], med = summary[2], q3 = summary[3];
    let iqr = q3 - q1;
    let range = summary[4] - summary[0];

    let Pregunta = `<div class="problema2">
    <h3>Análisis de datos estadísticos</h3>
    <p>Considere el siguiente conjunto de datos obtenido de una encuesta sobre la cantidad de libros leídos al año por un grupo de estudiantes:</p>
    <div style="background:#f9f9f9; padding: 10px; border-left: 5px solid #ccc;">
        ${data.join(', ')}
    </div>
    
    <ol class="FT_ol_a">
        <li>Determine el resumen de los cinco números (mínimo, Q1, mediana, Q3, máximo). <div>3</div></li>${CR(3)}
        <li>Calcule el rango y el rango intercuartílico (RIC). <div>2</div></li>${CR(2)}
        <li>A continuación, se muestra un espacio para dibujar el diagrama de caja correspondiente. Incluya la escala necesaria en el eje x. <div>3</div></li>${CR(8)}
        <li>¿Qué porcentaje de los datos se encuentra por debajo de $${q1}$? Justifique su respuesta. <div>2</div></li>${CR(2)}
        <li>Si añadimos un estudiante que leyó 20 libros, ¿cómo afectaría esto al rango? Explique sin necesidad de realizar el cálculo completo. <div>2</div></li>${CR(3)}
    </ol>
    </div>`;

    let Solucion = `<div class="ans"><b>Solucionario:</b><br>
    (1) Min: ${summary[0]}, Q1: ${q1}, Med: ${med}, Q3: ${q3}, Max: ${summary[4]}<br>
    (2) Rango: ${range}, RIC: ${iqr}<br>
    (3) Estudiante debe dibujar la caja centrada en [${q1}, ${q3}] con bigotes hasta ${summary[0]} y ${summary[4]}.<br>
    (4) $25\\%$, ya que $Q_1$ representa el primer cuartil.<br>
    (5) El rango aumentaría drásticamente, pues el valor máximo original (${summary[4]}) sería reemplazado por 20.</div>`;

    return [Pregunta, Solucion];
}