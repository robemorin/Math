import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

// Fuente original: [131].pdf
export function name() {
    return 'Estadística Descriptiva y Frecuencia Acumulada';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Generación dinámica de datos para un problema de frecuencia acumulada
    let N = 200; 
    let media = 20;
    
    // Simulación de datos para una ojiva (frecuencia acumulada)
    // x: [0, 5, 10, 15, 20, 25, 30, 35, 40]
    // y: [0, 10, 40, 90, 140, 175, 192, 198, 200]
    
    let Pregunta = `<div class="problema2"><h3>Análisis de datos agrupados</h3>
    <p>El siguiente gráfico muestra el tiempo (en minutos) que tardan <b>${N}</b> estudiantes en llegar a la escuela.</p>
    <center>
    <tlacuache-ejes size="400,400" xlabel="Tiempo (min)" ylabel="Frecuencia Acumulada" xlim="0,40" dx="5" ylim="0,200" dy="20">
        <tlacuache-poli_fa x="0,5,10,15,20,25,30,35,40" y="0,10,40,90,140,175,192,198,200"></tlacuache-poli_fa>
    </tlacuache-ejes>
    </center>
    <ol class="FT_ol_a">
        <li>Estime el número de estudiantes que tardan entre 10 y 20 minutos en llegar. <div>2</div></li>${CR(2)}
        <li>Si el 30% de los estudiantes tardan más de $m$ minutos, estime el valor de $m$. <div>3</div></li>${CR(2)}
        <li>Complete la siguiente tabla de frecuencias para el intervalo de $30 \le t < 35$. <div>2</div></li>
        <table border="1" style="margin-top:10px; width:50%; text-align:center;">
            <tr><th>Intervalo</th><th>Frecuencia</th></tr>
            <tr><td>$30 \le t < 35$</td><td>${"_______"}</td></tr>
        </table>${CR(2)}
    </ol></div>
    <div class="page"></div>`;

    let Solucion = `<div class="ans"><b>Soluciones Estimadas:</b><br>
    (1) $F(20) - F(10) = 140 - 40 = 100$ estudiantes.<br>
    (2) 30% de 200 es 60. Buscamos $F(m) = 200 - 60 = 140$. Mirando la gráfica, $m = 20$ minutos.<br>
    (3) $F(35) - F(30) = 198 - 192 = 6$ estudiantes.</div>`;

    // --- Problema 2: Estadística descriptiva (Varianza y Desviación) ---
    Pregunta += `<div class="problema2"><h3>Cálculo estadístico</h3>
    <p>Considere el conjunto de datos: $117, 129, 105, 124, 123, 128, 131, 124, 123, 125, 108$.</p>
    <ol class="FT_ol_a">
        <li>Halle la media $\\bar{x}$ del conjunto de datos. <div>2</div></li>${CR(2)}
        <li>Calcule la varianza poblacional $\\sigma^2$ y la desviación estándar $\\sigma$. <div>3</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>Soluciones P2:</b><br>
    (1) $\\bar{x} = 122.45$ <br>
    (2) $\\sigma^2 \\approx 55.52$, $\\sigma \\approx 7.45$</div>`;

    return [Pregunta, Solucion];
}