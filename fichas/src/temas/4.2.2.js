import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

/* 
 * Fuente original: [105].pdf
 * Módulo para Evaluación de Estadística Descriptiva (IB Math AA/AI)
 * Tiempo estimado: 40 minutos
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export function name() {
    return 'Estadística Descriptiva: Análisis de Datos';
}

export async function pregunta() {
    // Generación de datos dinámicos: Cantidad de goles por partido
    let goles = Array.from({length: 15}, () => Math.floor(Math.random() * 5));
    let frec = {};
    goles.forEach(g => frec[g] = (frec[g] || 0) + 1);
    
    let Pregunta = `<div class="problema2"><h3>Análisis de Datos Estadísticos (40 min)</h3>
    <p>La siguiente serie de datos representa el número de goles anotados por el equipo "Los Titanes" en sus últimos ${goles.length} partidos:</p>
    <p style="font-family: monospace; font-size: 1.2em; background: #f4f4f4; padding: 10px;">${goles.join(', ')}</p>
    
    <ol class="FT_ol_a">
        <li><b>Tabla de Frecuencias:</b> Complete la tabla con las frecuencias absolutas ($f$) y relativas ($rf$). <div>4</div></li>
        ${CR(5)}
        <li><b>Representación:</b> Utilice el espacio inferior para dibujar un diagrama de columnas que represente estos datos. <div>4</div></li>
        ${CR(12)}
        <li><b>Medidas de tendencia central:</b> Identifique la moda y calcule la media de goles por partido. <div>3</div></li>
        ${CR(3)}
        <li><b>Análisis de distribución:</b> ¿Cómo describiría la forma de esta distribución (simétrica, sesgada)? ¿Hay valores atípicos? Justifique brevemente. <div>3</div></li>
        ${CR(4)}
        <li><b>Probabilidad:</b> ¿Qué porcentaje de los partidos el equipo anotó 2 o más goles? <div>2</div></li>
        ${CR(2)}
    </ol>
    </div>
    <div class="page"></div>`;

    let Solucion = `<div class="ans"><b>Solucionario:</b><br>
    (1) Frecuencias calculadas según los datos: ${JSON.stringify(frec)}.<br>
    (3) Moda: ${Object.keys(frec).reduce((a, b) => frec[a] > frec[b] ? a : b)}. Media: ${(goles.reduce((a,b)=>a+b, 0)/goles.length).toFixed(2)}.<br>
    (5) Porcentaje: ${((goles.filter(x => x >= 2).length / goles.length) * 100).toFixed(1)}%.</div>`;

    return [Pregunta, Solucion];
}

/* 
 * NOTA PARA EL PROFESOR: 
 * Este módulo incluye una estructura diseñada para impresión.
 * El uso de <tlacuache-milimetrado> puede ser añadido para los ejercicios de gráficas si se requiere mayor precisión visual.
 */