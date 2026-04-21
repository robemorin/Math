import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Fuente original: [115].pdf
 * Módulo para evaluación de Estadística descriptiva (Medidas de tendencia central y tablas de frecuencias).
 * Tiempo estimado: 40 minutos.
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export function name() {
    return 'Estadística: Medidas de Tendencia Central';
}

export async function pregunta() {
    // Generación dinámica de datos para una tabla de frecuencias (contexto: número de goles en partidos)
    const valores = [0, 1, 2, 3, 4, 5];
    const freqs = [3, 8, 12, 10, 5, 2]; // Total = 40
    let totalFreq = freqs.reduce((a, b) => a + b, 0);
    
    let sumXF = 0;
    valores.forEach((v, i) => sumXF += v * freqs[i]);
    let mean = (sumXF / totalFreq).toFixed(2);
    
    // Cálculos para mediana
    // n+1 / 2 = 41/2 = 20.5, mediana entre 20 y 21
    // Acumuladas: 3, 11, 23 (aquí están 20 y 21)
    let mediana = 2; 
    let moda = 2;

    let Pregunta = `<div class="problema2">
    <h3>Práctica de Estadística Descriptiva</h3>
    <p>La siguiente tabla muestra el número de goles marcados por un equipo en los ${totalFreq} partidos disputados durante la temporada:</p>
    
    <table border="1" style="width:100%; text-align:center; border-collapse: collapse;">
        <tr><th>Goles (x)</th><th>Frecuencia (f)</th><th>Frecuencia Acumulada</th></tr>
        ${valores.map((v, i) => `<tr><td>${v}</td><td>${freqs[i]}</td><td>${freqs.slice(0, i+1).reduce((a,b)=>a+b)}</td></tr>`).join('')}
    </table>
    ${CR(1)}
    <ol class="FT_ol_a">
        <li>Calcule la media de goles por partido. <div>2</div></li>${CR(2)}
        <li>Identifique la mediana de los datos, justificando su respuesta usando las frecuencias acumuladas. <div>3</div></li>${CR(3)}
        <li>Determine la moda del conjunto de datos. <div>1</div></li>${CR(2)}
        <li>Si se añadiera un partido donde el equipo marca 6 goles, ¿cómo afectaría a la media? Explique. <div>2</div></li>${CR(3)}
    </ol>
    </div>
    <div class="page"></div>
    <div class="problema2">
        <h3>Ejercicio de Consolidación: Pesos de paquetes</h3>
        <p>Se ha medido el peso (en kg) de 50 paquetes. Los datos se resumen en la siguiente tabla:</p>
        <table border="1" style="width:100%; text-align:center; border-collapse: collapse;">
            <tr><th>Peso (kg)</th><td>1</td><td>2</td><td>3</td><td>4</td></tr>
            <tr><th>Frecuencia</th><td>10</td><td>20</td><td>15</td><td>5</td></tr>
        </table>
        ${CR(1)}
        <ol class="FT_ol_a">
            <li>Complete una tabla de frecuencias acumuladas. <div>2</div></li>${CR(3)}
            <li>Calcule la media, mediana y moda de los pesos. <div>4</div></li>${CR(4)}
        </ol>
    </div>`;

    let Solucion = `<div class="ans"><b>Soluciones:</b><br>
    <b>P1:</b><br>
    (1a) Media = $\\frac{\\sum xf}{\\sum f} = \\frac{0(3)+1(8)+2(12)+3(10)+4(5)+5(2)}{40} = \\frac{104}{40} = 2.6$ goles.<br>
    (1b) Mediana: Posición $\\frac{40+1}{2} = 20.5$. La 20ª y 21ª posición caen en la categoría de 2 goles (acumulada llega a 23). Mediana = 2.<br>
    (1c) Moda = 2 (mayor frecuencia: 12).<br>
    (1d) La media aumentaría, ya que el nuevo valor (6) es mayor que la media actual (2.6).<br>
    <br>
    <b>P2:</b><br>
    (2a) Acumuladas: 10, 30, 45, 50.<br>
    (2b) Media = $\\frac{1(10)+2(20)+3(15)+4(5)}{50} = \\frac{125}{50} = 2.5$ kg. Mediana: Posición 25.5 -> 2 kg. Moda = 2 kg.</div>`;

    return [Pregunta, Solucion];
}