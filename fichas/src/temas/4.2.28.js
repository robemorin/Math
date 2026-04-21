import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Estadística Descriptiva y Gráficos';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

// Fuente original: [133].pdf
export async function pregunta() {
    // Generación de datos aleatorios para la tabla de frecuencias (estilo ejercicio 10 del PDF)
    let min = 0;
    let base = 10;
    let freqs = [
        Math.floor(Math.random() * 5) + 1,
        Math.floor(Math.random() * 10) + 10,
        Math.floor(Math.random() * 15) + 20,
        Math.floor(Math.random() * 10) + 10,
        Math.floor(Math.random() * 5) + 1
    ];

    let total = freqs.reduce((a, b) => a + b, 0);

    let Pregunta = `<div class="problema2"><h3>Práctica de Estadística: Análisis de Datos</h3>
    <p>Tiempo estimado: 40 minutos.</p>
    
    <div class="problema2">1.- Considere los siguientes datos agrupados sobre tiempos de reacción (en milisegundos):
    <br><br>
    <table border="1" style="width:100%; text-align:center;">
        <tr><td>Intervalos</td><td>${min}-${min+base}</td><td>${min+base}-${min+2*base}</td><td>${min+2*base}-${min+3*base}</td><td>${min+3*base}-${min+4*base}</td><td>${min+4*base}-${min+5*base}</td></tr>
        <tr><td>Frecuencia</td><td>${freqs[0]}</td><td>${freqs[1]}</td><td>${freqs[2]}</td><td>${freqs[3]}</td><td>${freqs[4]}</td></tr>
    </table>
    <br>
    <ol class="FT_ol_a">
        <li>Construya una gráfica de frecuencia acumulada (ojiva) en el espacio inferior. <div>4</div></li>
        ${CR(12)}
        <li>Estime la mediana y el rango intercuartil (RIC) a partir de su gráfica. <div>4</div></li>
        ${CR(3)}
        <li>Calcule la media y la desviación estándar estimada para estos datos. <div>4</div></li>
        ${CR(3)}
    </ol></div>

    <div class="problema2">2.- Análisis comparativo de procesos:
    <p>Se midió la consistencia en el llenado de dos máquinas (A y B) con 20 muestras cada una. Los datos de resumen son:</p>
    <ul>
        <li>Máquina A: $\\text{min}=${450+Math.floor(Math.random()*10)}, Q_1=${460+Math.floor(Math.random()*10)}, \\text{mediana}=${475+Math.floor(Math.random()*5)}, Q_3=${485+Math.floor(Math.random()*5)}, \\text{max}=${500+Math.floor(Math.random()*10)}$</li>
        <li>Máquina B: $\\text{min}=${440+Math.floor(Math.random()*10)}, Q_1=${455+Math.floor(Math.random()*10)}, \\text{mediana}=${465+Math.floor(Math.random()*10)}, Q_3=${495+Math.floor(Math.random()*10)}, \\text{max}=${510+Math.floor(Math.random()*10)}$</li>
    </ul>
    <ol class="FT_ol_a">
        <li>Dibuje un diagrama de cajas (box plot) comparativo para ambas máquinas. <div>4</div></li>
        ${CR(8)}
        <li>Comente sobre la consistencia y la media de ambos procesos basándose en los diagramas. <div>3</div></li>
        ${CR(4)}
    </ol></div></div>`;

    let Solucion = `<div class="ans"><b>Guía de Resolución:</b><br>
    P1: La ojiva debe marcar los puntos superiores de los intervalos (${base}, ${2*base}, etc.) con las frecuencias acumuladas (${freqs[0]}, ${freqs[0]+freqs[1]}, ...). <br>
    P2: El diagrama de cajas debe mostrar la dispersión comparativa. La Máquina con menor RIC es la más consistente.</div>`;

    return [Pregunta, Solucion];
}