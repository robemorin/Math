import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

// Fuente original: [124].pdf

export function name() {
    return 'Análisis de Frecuencias Acumuladas';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Parámetros dinámicos para el ejercicio
    const base = 140;
    const intervalos = [140, 145, 150, 155, 160, 165, 170];
    const frec = [5, 8, 12, 10, 6, 4]; // Frecuencias simples
    let acum = [];
    let temp = 0;
    for(let f of frec) { temp += f; acum.push(temp); }
    const total = temp;

    let Pregunta = `<div class="problema2"><h3>Análisis de tiempos de carrera</h3>
    <p>Se ha registrado el tiempo (en minutos) que tardan ${total} corredores en completar una ruta de montaña. Los datos se resumen en la siguiente tabla:</p>
    <table border="1" style="border-collapse: collapse; width: 80%; margin: 10px auto; text-align: center;">
        <tr><th>Tiempo ($t$ min)</th><th>Frecuencia</th></tr>
        <tr><td>${intervalos[0]} $\\leq t <$ ${intervalos[1]}</td><td>${frec[0]}</td></tr>
        <tr><td>${intervalos[1]} $\\leq t <$ ${intervalos[2]}</td><td>${frec[1]}</td></tr>
        <tr><td>${intervalos[2]} $\\leq t <$ ${intervalos[3]}</td><td>${frec[2]}</td></tr>
        <tr><td>${intervalos[3]} $\\leq t <$ ${intervalos[4]}</td><td>${frec[3]}</td></tr>
        <tr><td>${intervalos[4]} $\\leq t <$ ${intervalos[5]}</td><td>${frec[4]}</td></tr>
        <tr><td>${intervalos[5]} $\\leq t <$ ${intervalos[6]}</td><td>${frec[5]}</td></tr>
    </table>

    <ol class="FT_ol_a">
        <li>Complete la columna de frecuencia acumulada y dibuje el polígono de frecuencias acumuladas en el espacio inferior. <div>3</div></li>${CR(12)}
        <li>Utilizando el gráfico, estime la mediana del tiempo de carrera. <div>2</div></li>${CR(3)}
        <li>Estime cuántos corredores terminaron la carrera en menos de ${intervalos[4]} minutos. <div>2</div></li>${CR(3)}
        <li>Si el 20% más rápido de los corredores recibe un premio, ¿cuál es el tiempo máximo para obtener dicho premio? <div>3</div></li>${CR(3)}
    </ol>
    
    <center>
    <tlacuache-ejes size="400,400" xlabel="Tiempo (min)" ylabel="Frec. Acumulada" xlim="140,175" dx="5" ylim="0,50" dy="5">
    </tlacuache-ejes>
    </center>
    </div>`;

    let Solucion = `<div class="ans"><b>Solución sugerida:</b><br>
    (1) Frecuencias acumuladas: ${acum.join(', ')}.<br>
    (2) Mediana: Corresponde al valor $n/2 = ${total/2} \\Rightarrow$ buscar en el eje y, $t \\approx 153$ min.<br>
    (3) Para $t < ${intervalos[4]}$, la frecuencia acumulada es ${frec[0]+frec[1]+frec[2]+frec[3]} corredores.<br>
    (4) 20% de ${total} = ${0.2 * total}. El tiempo correspondiente es el valor de $t$ donde $y=${0.2 * total}$, $t \\approx 147$ min.</div>`;

    return [Pregunta, Solucion];
}