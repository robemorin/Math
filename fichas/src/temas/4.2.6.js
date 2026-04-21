import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Estadística Descriptiva y Representación de Datos';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Generar datos aleatorios para un problema de estaturas (similar al ejercicio 5)
    // Datos: 6 valores para un histograma
    let freqs = [10, 15, 30, 20, 12, 5];
    let total = freqs.reduce((a, b) => a + b, 0);

    let Pregunta = `<div class="problema2"><h3>Análisis de Datos: Altura de Semillas</h3>
    <p>Se ha tomado una muestra de ${total} semillas de un vivero para medir sus alturas (en mm). Los resultados se presentan en la siguiente tabla:</p>
    <table border="1" style="width:50%; text-align:center; margin: 10px auto;">
        <tr><th>Altura (mm)</th><th>Frecuencia</th></tr>
        <tr><td>$300 \\le h < 325$</td><td>${freqs[0]}</td></tr>
        <tr><td>$325 \\le h < 350$</td><td>${freqs[1]}</td></tr>
        <tr><td>$350 \\le h < 375$</td><td>${freqs[2]}</td></tr>
        <tr><td>$375 \\le h < 400$</td><td>${freqs[3]}</td></tr>
        <tr><td>$400 \\le h < 425$</td><td>${freqs[4]}</td></tr>
        <tr><td>$425 \\le h < 450$</td><td>${freqs[5]}</td></tr>
    </table>
    <ol class="FT_ol_a">
        <li>Construya un histograma de frecuencias en el espacio provisto. <div>4</div></li>
        <center>
            <tlacuache-ejes size="400,300" xlabel="Altura (mm)" ylabel="Frecuencia" xlim="300,450" dx="25" ylim="0,35" dy="5">
                <tlacuache-histograma inicio="300" paso="25" frecuencias="${freqs.join(',')}"></tlacuache-histograma>
            </tlacuache-ejes>
        </center>${CR(2)}
        <li>¿Qué porcentaje de las semillas tienen una altura menor a 375 mm? <div>2</div></li>${CR(3)}
        <li>Si se sabe que en el vivero hay un total de 1500 semillas, estime cuántas tendrían una altura entre 400 y 450 mm basándose en la muestra. <div>3</div></li>${CR(3)}
    </ol></div><div class="page"></div>`;

    let p2 = ((freqs[0] + freqs[1] + freqs[2]) / total * 100).toFixed(1);
    let p3 = Math.round(((freqs[4] + freqs[5]) / total) * 1500);

    let Solucion = `<div class="ans"><b>Soluciones:</b><br>
    (2) Suma de frecuencias $h < 375$ es ${freqs[0]+freqs[1]+freqs[2]}. Porcentaje: $\\frac{${freqs[0]+freqs[1]+freqs[2]}}{${total}} \\times 100 = ${p2}\\%$.<br>
    (3) Proporción en muestra: $\\frac{${freqs[4]+freqs[5]}}{${total}}$. Estimación: $\\frac{${freqs[4]+freqs[5]}}{${total}} \\times 1500 = ${p3}$ semillas.</div>`;

    return [Pregunta, Solucion];
}

/* 
   Fuente original: [109].pdf
   Nota: Los ejercicios fueron adaptados para evaluar la competencia de 
   análisis de datos estadísticos (subtema 4.2 del programa IB).
*/