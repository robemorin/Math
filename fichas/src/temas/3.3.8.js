import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Trigonometría: Regla del seno y coseno';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // --- Problema 1: Altura de un objeto (Contexto Montaña/Bandera) ---
    // Basado en Ejercicio 1 del PDF
    let dist_base = 20;
    let ang1 = 35 + Math.floor(Math.random() * 10);
    let ang2 = ang1 + 15 + Math.floor(Math.random() * 10);
    
    let Pregunta = `<div class="problema2">1.- Un estudiante desea medir la altura de un asta de bandera. Desde un punto P toma un ángulo de elevación de $${ang1}^\\circ$. Al alejarse ${dist_base} metros en línea recta hacia el punto Q, el nuevo ángulo de elevación es de $${ang2}^\\circ$.
    <ol class="FT_ol_a">
        <li>Realice un esquema que represente la situación geométrica. <div>2</div></li>${CR(3)}
        <li>Utilice la regla del seno para determinar la altura del asta. <div>4</div></li>${CR(4)}
    </ol></div>`;

    // --- Problema 2: Distancia entre puntos (Contexto Lago) ---
    // Basado en Ejercicio 2 del PDF
    let d1 = 150 + Math.floor(Math.random() * 50);
    let d2 = 50 + Math.floor(Math.random() * 30);
    let ang_obtuso = 110 + Math.floor(Math.random() * 20);

    Pregunta += `<div class="problema2">2.- Para calcular la distancia a través de un lago entre los puntos P y R, un topógrafo mide la distancia desde P hasta un punto Q ($${d1}$ m) y desde Q hasta R ($${d2}$ m). El ángulo $\\widehat{PQR}$ es de $${ang_obtuso}^\\circ$.
    <ol class="FT_ol_a">
        <li>¿Qué teorema trigonométrico es más adecuado para hallar la distancia PR? Justifique. <div>2</div></li>${CR(2)}
        <li>Calcule la distancia entre P y R. <div>3</div></li>${CR(4)}
    </ol></div>`;

    // --- Problema 3: Corrección de trayectoria (Contexto Golf) ---
    // Basado en Ejercicio 3 del PDF
    let d_tiro = 220;
    let d_green = 340;
    let d_hierro = 160;

    Pregunta += `<div class="problema2">3.- Un golfista golpea su pelota ${d_tiro} m hacia el punto A. Desde allí, realiza un tiro de ${d_hierro} m hacia el hoyo G. Si la distancia directa desde el punto de salida T hasta el hoyo G es de ${d_green} m:
    <ol class="FT_ol_a">
        <li>Calcule el ángulo de desviación $\\widehat{TAG}$ (el ángulo que se desvió respecto a la línea recta ideal). <div>4</div></li>${CR(4)}
    </ol></div><div class="page"></div>`;

    let Solucion = `<div class="ans"><b>Soluciones:</b><br>
    P1: Altura $h = \\frac{${dist_base} \\cdot \\sin(${ang2}^\\circ) \\cdot \\sin(${ang1}^\\circ)}{\\sin(${ang2-ang1}^\\circ)} \\approx ${(dist_base * Math.sin(ang2*Math.PI/180) * Math.sin(ang1*Math.PI/180) / Math.sin((ang2-ang1)*Math.PI/180)).toFixed(2)}$ m.<br>
    P2: Se usa la Ley del Coseno: $PR^2 = ${d1}^2 + ${d2}^2 - 2(${d1})(${d2})\\cos(${ang_obtuso}^\\circ)$. $PR \\approx ${Math.sqrt(Math.pow(d1,2) + Math.pow(d2,2) - 2*d1*d2*Math.cos(ang_obtuso*Math.PI/180)).toFixed(2)}$ m.<br>
    P3: Ley del Coseno: $\\cos(A) = \\frac{${d_tiro}^2 + ${d_hierro}^2 - ${d_green}^2}{2(${d_tiro})(${d_hierro})}$. El ángulo $\\widehat{TAG} \\approx ${Math.acos((Math.pow(d_tiro,2) + Math.pow(d_hierro,2) - Math.pow(d_green,2)) / (2*d_tiro*d_hierro)) * 180 / Math.PI.toFixed(2)}^\\circ$.</div>`;

    return [Pregunta, Solucion];
}