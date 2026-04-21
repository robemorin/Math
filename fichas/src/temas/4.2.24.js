import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Fuente original: [128].pdf
 * Generador de ficha de Estadística Descriptiva (IB Math AI)
 * Tiempo estimado: 40 minutos
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export function name() {
    return 'Estadística Descriptiva - Ficha de Práctica';
}

export async function pregunta() {
    // Generación de datos aleatorios para el problema de béisbol (Ejercicio 8 del PDF)
    const generateRuns = () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 15));
    let equipoA = generateRuns();
    let equipoB = generateRuns();

    let Pregunta = `<div class="problema">
    <h3>1. Análisis de dispersión deportiva (Tiempo estimado: 20 min)</h3>
    <p>Dos entrenadores de béisbol registran las carreras anotadas por sus equipos en los últimos 10 partidos:</p>
    <ul>
        <li><b>Equipo A:</b> ${equipoA.join(', ')}</li>
        <li><b>Equipo B:</b> ${equipoB.join(', ')}</li>
    </ul>
    <ol class="FT_ol_a">
        <li>Calcule la media (\\(\\bar{x}\\)) y la mediana para ambos conjuntos de datos. <div>4</div></li>${CR(2)}
        <li>Determine la desviación estándar poblacional (\\(\\sigma\\)) para cada equipo. <div>4</div></li>${CR(3)}
        <li>¿Qué equipo presenta una mayor variabilidad en sus resultados? Justifique su respuesta basándose en la desviación estándar obtenida. <div>2</div></li>${CR(2)}
    </ol>
    </div>`;

    // Generación de problema de contexto (Ejercicio 9 del PDF - Modificado)
    let baseData = [1108, 1019, 850, 1243, 1100, 923, 964, 847, 918, 820, 781];
    
    Pregunta += `<div class="problema">
    <h3>2. Análisis de datos atípicos (Tiempo estimado: 20 min)</h3>
    <p>La cantidad de visitantes a un museo durante 11 días se registra como:</p>
    <p style="font-family: monospace;">${baseData.join(', ')}</p>
    <ol class="FT_ol_a">
        <li>Calcule la media y la desviación estándar poblacional de este conjunto de datos. <div>4</div></li>${CR(2)}
        <li>Suponga que el valor 850 se considera un "error de registro" y se elimina. Recalcule la media y la desviación estándar sin este valor. <div>4</div></li>${CR(3)}
        <li>Discuta cómo la eliminación de un valor atípico (outlier) afecta la desviación estándar y qué nos dice esto sobre la sensibilidad de esta medida. <div>2</div></li>${CR(2)}
    </ol>
    </div>
    <div class="page"></div>`;

    // Cálculos para la solución
    const calcMean = (arr) => arr.reduce((a, b) => a + b) / arr.length;
    const calcStd = (arr) => {
        let m = calcMean(arr);
        return Math.sqrt(arr.map(x => Math.pow(x - m, 2)).reduce((a, b) => a + b) / arr.length);
    };

    let meanA = calcMean(equipoA).toFixed(2);
    let meanB = calcMean(equipoB).toFixed(2);
    let stdA = calcStd(equipoA).toFixed(2);
    let stdB = calcStd(equipoB).toFixed(2);

    let Solucion = `<div class="ans">
    <b>P1:</b><br>
    Media A: ${meanA}, Media B: ${meanB}<br>
    \\(\\sigma_A\\) = ${stdA}, \\(\\sigma_B\\) = ${stdB}<br>
    El equipo con mayor \\(\\sigma\\) tiene mayor variabilidad.<br><br>
    
    <b>P2:</b><br>
    Conjunto original: Media \\(\\approx ${calcMean(baseData).toFixed(2)}\\), \\(\\sigma \\approx ${calcStd(baseData).toFixed(2)}\\)<br>
    Sin 850: Media \\(\\approx ${calcMean(baseData.filter(x => x !== 850)).toFixed(2)}\\), \\(\\sigma \\approx ${calcStd(baseData.filter(x => x !== 850)).toFixed(2)}\\)<br>
    La desviación estándar disminuye al eliminar valores extremos, lo que demuestra que la medida es sensible a outliers.
    </div>`;

    return [Pregunta, Solucion];
}