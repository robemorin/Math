import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Estadística descriptiva y representación de datos';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

/**
 * Fuente original: [108].pdf
 * Ficha de práctica: Estadística Descriptiva (Intervalos y Histogramas)
 * Tiempo estimado: 40 minutos
 */
export async function pregunta() {
    // Datos aleatorios para el ejercicio: Alturas de un equipo (cm)
    const inicio = 160;
    const paso = 5;
    const freqs = [3, 7, 12, 8, 4, 1]; // frecuencias para 6 intervalos
    
    let Pregunta = `<div class="problema2"><h3>1.- Análisis de datos continuos: Estaturas</h3>
    <p>Se ha registrado la estatura (en cm) de un grupo de estudiantes. Los datos se han organizado en la siguiente tabla de frecuencias:</p>
    <center>
    <table border="1" cellpadding="5">
        <tr><th>Estatura ($H$ cm)</th><th>Frecuencia</th></tr>
        <tr><td>$${inicio} \\le H < ${inicio + paso}$</td><td>${freqs[0]}</td></tr>
        <tr><td>$${inicio + paso} \\le H < ${inicio + 2 * paso}$</td><td>${freqs[1]}</td></tr>
        <tr><td>$${inicio + 2 * paso} \\le H < ${inicio + 3 * paso}$</td><td>${freqs[2]}</td></tr>
        <tr><td>$${inicio + 3 * paso} \\le H < ${inicio + 4 * paso}$</td><td>${freqs[3]}</td></tr>
        <tr><td>$${inicio + 4 * paso} \\le H < ${inicio + 5 * paso}$</td><td>${freqs[4]}</td></tr>
        <tr><td>$${inicio + 5 * paso} \\le H < ${inicio + 6 * paso}$</td><td>${freqs[5]}</td></tr>
    </table>
    </center>
    <ol class="FT_ol_a">
        <li>Explique por qué el <i>estatura</i> es una variable continua. <div>2</div></li>${CR(2)}
        <li>En el espacio inferior, construya un histograma para los datos. Asegúrese de rotular los ejes y colocar un título. <div>4</div></li>
        <center>
            <tlacuache-ejes size="300,300" xlabel="Estatura (cm)" ylabel="Frecuencia" xlim="${inicio},${inicio + 6 * paso}" dx="${paso}" ylim="0,15" dy="2">
                <tlacuache-histograma inicio="${inicio}" paso="${paso}" frecuencias="${freqs.join(',')}"></tlacuache-histograma>
            </tlacuache-ejes>
        </center>${CR(1)}
        <li>Identifique la clase modal y explique qué representa en este contexto. <div>2</div></li>${CR(2)}
        <li>¿Cómo describiría la forma de la distribución (sesgada a la derecha, izquierda o simétrica)? <div>2</div></li>${CR(1)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (1a) Es continua porque puede tomar cualquier valor dentro de un intervalo real (medición). (1c) Clase modal: $${inicio + 2 * paso} \\le H < ${inicio + 3 * paso}$. (1d) Sesgada a la derecha (positivamente).</div><br>`;

    // Problema 2: Selección de gráfico
    Pregunta += `<div class="problema2"><h3>2.- Selección de representación</h3>
    <p>Para cada conjunto de datos, decida si es más apropiado utilizar un <b>histograma</b> o un <b>gráfico de columnas</b> y justifique brevemente.</p>
    <ol class="FT_ol_a">
        <li>Tiempo dedicado a estudiar (en minutos) para 50 estudiantes agrupados por intervalos de 10 minutos. <div>2</div></li>${CR(2)}
        <li>Número de hermanos de cada estudiante de una clase (0, 1, 2, 3 o más). <div>2</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> (2a) Histograma (variable continua). (2b) Gráfico de columnas (variable discreta).</div>`;

    return [Pregunta, Solucion];
}