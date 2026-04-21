import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Estadística descriptiva y representación de datos';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

// Fuente original: [106].pdf
export async function pregunta() {
    // --- Problema 1: Datos discretos ---
    const freq = [8, 12, 10, 8, 4, 2, 1, 1]; // Datos basados en el PDF
    const total = freq.reduce((a, b) => a + b, 0);
    const n_mas_de_3 = freq.slice(4).reduce((a, b) => a + b, 0);
    const porcentaje = ((n_mas_de_3 / total) * 100).toFixed(1);

    let Pregunta = `<div class="problema2">
    <h3>1. Análisis de Frecuencias (Tiempo Estimado: 20 min)</h3>
    <p>Se realizó una encuesta a ${total} personas sobre cuántas veces comieron fuera la semana pasada. Los resultados se muestran a continuación:</p>
    <center>
    <tlacuache-ejes size="400,250" xlabel="número de veces" ylabel="frecuencia" xlim="0,8" dx="1" ylim="0,15" dy="5">
        <tlacuache-histograma inicio="0" paso="1" frecuencias="${freq.join(',')}"></tlacuache-histograma>
    </tlacuache-ejes>
    </center>
    <ol class="FT_ol_a">
        <li>¿Cuántas personas fueron encuestadas? <div>1</div></li>${CR(1)}
        <li>Identifique la moda de los datos. <div>1</div></li>${CR(1)}
        <li>¿Cuántas personas encuestadas no comieron fuera en absoluto? <div>1</div></li>${CR(1)}
        <li>¿Qué porcentaje de las personas encuestadas comieron fuera más de tres veces? <div>2</div></li>${CR(2)}
    </ol></div><div class="page"></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (a) ${total} personas. (b) 1 vez. (c) ${freq[0]} personas. (d) ${porcentaje}\\%</div><br>`;

    // --- Problema 2: Datos agrupados ---
    // Generar datos aleatorios para grupo de vehículos
    let inicio = 8;
    let freqs = [Math.floor(Math.random() * 5) + 3, Math.floor(Math.random() * 5) + 5, Math.floor(Math.random() * 5) + 8, Math.floor(Math.random() * 5) + 6, Math.floor(Math.random() * 5) + 2];
    let total_vehiculos = freqs.reduce((a, b) => a + b, 0);

    Pregunta += `<div class="problema2">
    <h3>2. Datos Agrupados (Tiempo Estimado: 20 min)</h3>
    <p>Un guardia de seguridad registró el número de vehículos que pasaron por una entrada durante intervalos de 10 minutos. Los datos se resumen en la siguiente tabla:</p>
    <table border="1" style="width:50%; margin: 10px auto; text-align:center;">
        <tr><th>Número de vehículos</th><th>Frecuencia</th></tr>
        <tr><td>0 a 9</td><td>${freqs[0]}</td></tr>
        <tr><td>10 a 19</td><td>${freqs[1]}</td></tr>
        <tr><td>20 a 29</td><td>${freqs[2]}</td></tr>
        <tr><td>30 a 39</td><td>${freqs[3]}</td></tr>
        <tr><td>40 a 49</td><td>${freqs[4]}</td></tr>
    </table>
    <ol class="FT_ol_a">
        <li>Identifique la clase modal (el intervalo con mayor frecuencia). <div>1</div></li>${CR(1)}
        <li>¿Cuántos intervalos fueron registrados en total? <div>1</div></li>${CR(1)}
        <li>Si añadimos una nueva observación de 25 vehículos, ¿cómo cambiaría la frecuencia de la clase modal? <div>2</div></li>${CR(2)}
        <li>Discusión: ¿Por qué es útil agrupar datos cuando tenemos muchos valores distintos? <div>2</div></li>${CR(4)}
    </ol></div>`;

    let maxFreq = Math.max(...freqs);
    let modalClass = ["0-9", "10-19", "20-29", "30-39", "40-49"][freqs.indexOf(maxFreq)];
    
    Solucion += `<div class="ans"><b>P2:</b> (a) La clase modal es ${modalClass}. (b) ${total_vehiculos}. (c) La frecuencia de la clase 20-29 aumenta en 1. (d) Facilita la visualización y el análisis de tendencias en grandes conjuntos de datos.</div>`;

    return [Pregunta, Solucion];
}