import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

// Fuente original: [48].pdf, Capítulo 7, Ejercicios 7E
// Tema: Razones trigonométricas en triángulos rectángulos (3.2)

export function name() {
    return 'Problemas de Aplicación: Trigonometría';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Parámetros dinámicos
    let shadow = (Math.random() * 5 + 6).toFixed(2); // entre 6 y 11m
    let angle1 = 40 + Math.floor(Math.random() * 25); // entre 40 y 65 grados
    let hillAngle = 18;
    let walkDist = 150;
    let altPoint = 80;
    let riverWidth = 120;
    let riverAngle = 37;
    let trainDist = 200;
    let trainRise = 5.5;

    let Pregunta = `<div class="problema2">
    <h3>Práctica de Aplicaciones Trigonométricas (40 min)</h3>
    
    <ol>
        <li><b>Sombra y Elevación:</b> Un poste vertical proyecta una sombra de $${shadow} \\text{ m}$ cuando el ángulo de elevación del sol es de $${angle1}^\\circ$. Calcule la altura del poste. <div>4</div></li>${CR(4)}
        
        <li><b>El Sendero en la Colina:</b> Una colina tiene una inclinación constante de $${hillAngle}^\\circ$ respecto a la horizontal.
            <ol class="FT_ol_a">
                <li>Si camino $${walkDist} \\text{ m}$ a lo largo de la ladera, ¿a qué altura sobre el nivel del mar me encuentro? <div>3</div></li>${CR(3)}
                <li>Si ahora deseo llegar a un punto a $${altPoint} \\text{ m}$ de altura, ¿qué distancia debo recorrer a lo largo de la colina? <div>3</div></li>${CR(3)}
            </ol>
        </li>
        
        <li><b>Cruzando el Río:</b> Un topógrafo necesita medir la anchura de un río. Se sitúa en el punto A, directamente opuesto a un poste B en la otra orilla. Camina $${riverWidth} \\text{ m}$ paralelo a la orilla hasta el punto C. Desde C, mide el ángulo de visión hacia B obteniendo $${riverAngle}^\\circ$. ¿Cuál es la anchura del río (distancia AB)? <div>4</div></li>${CR(4)}
        
        <li><b>Gradiente Ferroviario:</b> Un tren debe subir por una vía con un gradiente constante de $${trainRise} \\text{ m}$ de altura por cada $${trainDist} \\text{ m}$ de recorrido a lo largo de la vía. Calcule el ángulo de inclinación de la vía. <div>3</div></li>${CR(4)}
    </ol>
    </div>`;

    // Cálculos para el docente
    let sol1 = (parseFloat(shadow) * Math.tan(angle1 * Math.PI / 180)).toFixed(2);
    let sol2a = (walkDist * Math.sin(hillAngle * Math.PI / 180)).toFixed(2);
    let sol2b = (altPoint / Math.sin(hillAngle * Math.PI / 180)).toFixed(2);
    let sol3 = (riverWidth * Math.tan(riverAngle * Math.PI / 180)).toFixed(2);
    let sol4 = (Math.asin(trainRise / trainDist) * 180 / Math.PI).toFixed(2);

    let Solucion = `<div class="ans"><b>Solucionario:</b><br>
    P1: $h = ${shadow} \\cdot \\tan(${angle1}^\\circ) \\approx ${sol1} \\text{ m}$<br>
    P2: (a) $h = ${walkDist} \\cdot \\sin(${hillAngle}^\\circ) \\approx ${sol2a} \\text{ m}$; (b) $d = ${altPoint} / \\sin(${hillAngle}^\\circ) \\approx ${sol2b} \\text{ m}$<br>
    P3: $AB = ${riverWidth} \\cdot \\tan(${riverAngle}^\\circ) \\approx ${sol3} \\text{ m}$<br>
    P4: $\\theta = \\arcsin(${trainRise}/${trainDist}) \\approx ${sol4}^\\circ$
    </div>`;

    return [Pregunta, Solucion];
}