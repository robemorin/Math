import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

// Fuente original: [122].pdf
// Subtema: 4.2 Estadística descriptiva y representación de datos

export function name() {
    return 'Diagramas de Caja y Bigotes';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

function getFiveNumberSummary() {
    // Genera datos aleatorios para que la lógica siempre sea válida
    let min = Math.floor(Math.random() * 5) + 5;
    let q1 = min + Math.floor(Math.random() * 5) + 2;
    let median = q1 + Math.floor(Math.random() * 5) + 2;
    let q3 = median + Math.floor(Math.random() * 5) + 2;
    let max = q3 + Math.floor(Math.random() * 8) + 2;
    return [min, q1, median, q3, max];
}

export async function pregunta() {
    let A = getFiveNumberSummary();
    let B = getFiveNumberSummary();

    let Pregunta = `<div class="problema2"><h3>Análisis de Comparación de Datos</h3>
    <p>Una empresa compara los tiempos de respuesta (en segundos) de dos servidores: Servidor A y Servidor B. Se han obtenido los siguientes resúmenes de cinco números:</p>
    <ul>
        <li><b>Servidor A:</b> Min=${A[0]}, Q1=${A[1]}, Med=${A[2]}, Q3=${A[3]}, Max=${A[4]}</li>
        <li><b>Servidor B:</b> Min=${B[0]}, Q1=${B[1]}, Med=${B[2]}, Q3=${B[3]}, Max=${B[4]}</li>
    </ul>
    <ol class="FT_ol_a">
        <li>Dibuje el diagrama de caja y bigotes paralelo para ambos servidores en la escala inferior. <div>4</div></li>
        ${CR(8)}
        <li>Calcule el Rango Intercuartílico (RIC) para ambos servidores. ¿Qué servidor tiene una mayor variabilidad en sus datos centrales? <div>3</div></li>
        ${CR(3)}
        <li>Basándose en la mediana, ¿qué servidor es más rápido en promedio? Justifique. <div>2</div></li>
        ${CR(2)}
        <li>Si un cliente requiere una respuesta muy consistente (baja dispersión total), ¿qué servidor elegiría? Explique usando el concepto de rango. <div>3</div></li>
        ${CR(2)}
    </ol>
    <center>
        <tlacuache-cuartil q="${A.join(',')},${B.join(',')}" lim="0,50,5" dim="300,500" xlabel="Tiempo (segundos)"></tlacuache-cuartil>
    </center>
    </div>`;

    let ricA = A[3] - A[1];
    let ricB = B[3] - B[1];
    let rangeA = A[4] - A[0];
    let rangeB = B[4] - B[0];
    
    let faster = A[2] < B[2] ? "Servidor A" : "Servidor B";

    let Solucion = `<div class="ans"><b>Soluciones:</b><br>
    (2) RIC A = ${ricA}, RIC B = ${ricB}. El de mayor RIC tiene más variabilidad.<br>
    (3) Es más rápido el ${faster} debido a que tiene una mediana menor.<br>
    (4) Se prefiere el servidor con menor rango ($Range_A = ${rangeA}, Range_B = ${rangeB}$).
    </div>`;

    return [Pregunta, Solucion];
}