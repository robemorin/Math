import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Estadística Descriptiva: Medidas de Dispersión';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

// Función auxiliar para ordenar y calcular cuartiles
function calcularEstadisticas(datos) {
    datos.sort((a, b) => a - b);
    const n = datos.length;
    const mediana = (n % 2 === 0) ? (datos[n/2 - 1] + datos[n/2]) / 2 : datos[Math.floor(n/2)];
    
    // Split para cuartiles
    const lowerHalf = datos.slice(0, Math.floor(n / 2));
    const upperHalf = datos.slice(Math.ceil(n / 2));
    
    const q1 = (lowerHalf.length % 2 === 0) ? (lowerHalf[lowerHalf.length/2 - 1] + lowerHalf[lowerHalf.length/2]) / 2 : lowerHalf[Math.floor(lowerHalf.length/2)];
    const q3 = (upperHalf.length % 2 === 0) ? (upperHalf[upperHalf.length/2 - 1] + upperHalf[upperHalf.length/2]) / 2 : upperHalf[Math.floor(upperHalf.length/2)];
    
    return { datos, min: datos[0], max: datos[n-1], q1, q2: mediana, q3, iqr: q3 - q1 };
}

export async function pregunta() {
    // Generación dinámica de datos (13 valores para coincidir con la lógica del PDF)
    let datos = Array.from({length: 13}, () => Math.floor(Math.random() * 40) + 10);
    let stats = calcularEstadisticas(datos);

    let Pregunta = `<div class="problema2"><h3>Práctica de Estadística: Medidas de Posición y Dispersión</h3>
    <p>Contexto: Un grupo de estudiantes midió el tiempo (en minutos) que tardan en completar una tarea de programación:</p>
    <p style="text-align:center; font-family:monospace; font-size:1.2em;">${datos.join(', ')}</p>
    <ol class="FT_ol_a">
        <li>Ordene los datos de menor a mayor y calcule el valor mínimo, máximo y la mediana ($Q_2$). <div>3</div></li>${CR(2)}
        <li>Determine el primer cuartil ($Q_1$) y el tercer cuartil ($Q_3$). <div>3</div></li>${CR(2)}
        <li>Halle el rango y el rango intercuartílico (IQR). <div>3</div></li>${CR(2)}
        <li>Si se añadiera un nuevo estudiante que tardó ${stats.max + 5} minutos, ¿cómo afectaría esto al rango de los datos? Justifique. <div>2</div></li>${CR(2)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>Solución:</b><br>
    Datos ordenados: ${stats.datos.join(', ')}<br>
    (1) Mínimo: ${stats.min}, Máximo: ${stats.max}, Mediana ($Q_2$): ${stats.q2}<br>
    (2) $Q_1 = ${stats.q1}, Q_3 = ${stats.q3}<br>
    (3) Rango: ${stats.max - stats.min}, IQR: ${stats.iqr}<br>
    (4) El nuevo máximo sería ${stats.max + 5}, por lo tanto el rango aumenta a ${(stats.max + 5) - stats.min}.</div>`;

    // --- Problema adicional de diseño ---
    Pregunta += `<div class="problema2">5.- (Análisis) A continuación, dibuje un diagrama de caja (box plot) representativo usando los valores calculados en los puntos anteriores.</div>
    <tlacuache-cuartil q="[${stats.min},${stats.q1},${stats.q2},${stats.q3},${stats.max}]" lim="${stats.min-5},${stats.max+5},5" dim="400,100" xlabel='Tiempo (minutos)'></tlacuache-cuartil>${CR(2)}`;

    return [Pregunta, Solucion];
}