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
    // Contexto: Encuesta de mascotas (Fuente original: [130].pdf)
    const gatos = [0, 1, 2, 3, 4, 5];
    const frecuencias = [
        Math.floor(Math.random() * 10) + 30, // 0 gatos
        Math.floor(Math.random() * 5) + 5,   // 1 gato
        Math.floor(Math.random() * 5) + 8,   // 2 gatos
        Math.floor(Math.random() * 5) + 3,   // 3 gatos
        Math.floor(Math.random() * 2) + 1,   // 4 gatos
        Math.floor(Math.random() * 2) + 1    // 5 gatos
    ];

    let totalDatos = frecuencias.reduce((a, b) => a + b, 0);
    let sumaProductos = 0;
    for(let i=0; i<gatos.length; i++) sumaProductos += gatos[i] * frecuencias[i];
    let media = (sumaProductos / totalDatos).toFixed(2);

    // Preparación de datos para la gráfica
    let dataX = gatos.join(',');
    let dataY = frecuencias.join(',');

    let Pregunta = `<div class="problema2"><h3>1. Análisis de datos estadísticos</h3>
    <p>Una protectora de animales realizó una encuesta sobre el número de gatos por hogar en una calle residencial. Los resultados obtenidos se resumen en la siguiente tabla:</p>
    <table border="1" style="text-align:center; margin: 10px auto; width: 80%;">
        <tr><td>Número de gatos</td>${gatos.map(n => `<td>${n}</td>`).join('')}</tr>
        <tr><td>Frecuencia</td>${frecuencias.map(f => `<td>${f}</td>`).join('')}</tr>
    </table>
    <ol class="FT_ol_a">
        <li>Dibuje un gráfico de barras adecuado para representar esta distribución. <div>3</div></li>
        <center><tlacuache-ejes size="300,400" xlabel="Gatos" ylabel="Frecuencia" xlim="0,6" dx="1" ylim="0,${Math.max(...frecuencias)+5}" dy="5">
            <tlacuache-histograma inicio="0" paso="1" frecuencias="${dataY}"></tlacuache-histograma>
        </tlacuache-ejes></center>
        ${CR(1)}
        <li>Determine el valor de la moda y la mediana de la distribución. <div>3</div></li>${CR(2)}
        <li>Calcule la media del número de gatos por hogar. <div>2</div></li>${CR(2)}
        <li>¿Cuál de las medidas de tendencia central (media, mediana o moda) describe mejor el "hogar típico" en este caso? Justifique su respuesta. <div>2</div></li>${CR(2)}
    </ol></div><div class="page"></div>`;

    let Solucion = `<div class="ans"><b>Solución P1:</b><br>
    (b) Moda = 0 (mayor frecuencia). Mediana: posición ${(totalDatos+1)/2} es 0 gatos.<br>
    (c) Media $\\bar{x} = \\frac{\\sum f \\cdot x}{\\sum f} = \\frac{${sumaProductos}}{${totalDatos}} \\approx ${media}$.<br>
    (d) La moda es la medida más representativa dado que los datos presentan una fuerte asimetría positiva.</div><br>`;

    // --- Problema 2: Interpretación de Histogramas ---
    let grupoA = [2, 5, 6, 4, 2, 1]; // Datos inventados para el histograma
    Pregunta += `<div class="problema2"><h3>2. Comparativa de tiempos de respuesta</h3>
    <p>Se midieron los tiempos (en segundos) que tardan dos grupos (Estudiantes A y B) en completar un reto lógico.</p>
    <ol class="FT_ol_a">
        <li>Observe los histogramas de los grupos. Calcule de forma estimada el rango de cada grupo. <div>2</div></li>${CR(3)}
        <li>¿Qué grupo presenta una distribución más simétrica? Explique. <div>2</div></li>${CR(3)}
        <li>Si la media del Grupo A es 35s y la del Grupo B es 38s, pero el Grupo B tiene una desviación estándar mucho mayor, ¿qué conclusión puede sacar sobre la consistencia de los estudiantes? <div>2</div></li>${CR(3)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>Solución P2:</b> (a) Rango = Máx - Mín (estimado según histograma). (b) Análisis visual: se busca la campana central. (c) La mayor desviación estándar en el Grupo B indica mayor dispersión y menor consistencia en los tiempos de respuesta.</div>`;

    return [Pregunta, Solucion];
}