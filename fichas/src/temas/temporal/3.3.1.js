/* Fuente original: [57].pdf - Capítulo 8: Trigonometría de triángulos no rectángulos */

import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export function name() {
    return 'Trigonometría: Regla del seno y coseno';
}

export async function pregunta() {
    // Problema 1: Regla del Coseno (Contexto: Triangulación de barcos)
    let a = Math.floor(Math.random() * 5) + 6;
    let b = Math.floor(Math.random() * 5) + 8;
    let C_deg = 60 + Math.floor(Math.random() * 30);
    let C_rad = C_deg * Math.PI / 180;
    let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2) - 2 * a * b * Math.cos(C_rad));

    let Pregunta = `<div class="problema2">1.- Dos barcos parten de un puerto al mismo tiempo. El barco A viaja $${a}$ km hacia el Norte y el barco B viaja $${b}$ km en una dirección de $${C_deg}^{\\circ}$ respecto al rumbo del barco A.
    <ol class="FT_ol_a">
        <li>Halle la distancia entre los dos barcos al cabo de ese tiempo. <div>3</div></li>${CR(3)}
        <li>Si el barco A es más lento, ¿qué ángulo debe formar el barco B para que la distancia sea menor? (Discusión teórica). <div>2</div></li>${CR(2)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (1a) Por regla del coseno: $c^2 = ${a}^2 + ${b}^2 - 2(${a})(${b})\\cos(${C_deg}^{\\circ}) \\Rightarrow c \\approx ${c.toFixed(2)}$ km.</div><br>`;

    // Problema 2: Regla del Seno
    let A_deg = 45 + Math.floor(Math.random() * 20);
    let B_deg = 30 + Math.floor(Math.random() * 15);
    let a_side = 10 + Math.floor(Math.random() * 10);
    let b_side = (a_side * Math.sin(B_deg * Math.PI / 180)) / Math.sin(A_deg * Math.PI / 180);

    Pregunta += `<div class="problema2">2.- En un triángulo $\\triangle ABC$, se sabe que $\\hat{A} = ${A_deg}^{\\circ}$, $\\hat{B} = ${B_deg}^{\\circ}$ y el lado $a = ${a_side}$ cm.
    <ol class="FT_ol_a">
        <li>Calcule la medida del ángulo $\\hat{C}$. <div>1</div></li>${CR(1)}
        <li>Halle la longitud del lado $b$. <div>2</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> (2a) $\\hat{C} = 180^{\\circ} - (${A_deg}^{\\circ} + ${B_deg}^{\\circ}) = ${180 - A_deg - B_deg}^{\\circ}$. (2b) $\\frac{${a_side}}{\\sin(${A_deg}^{\\circ})} = \\frac{b}{\\sin(${B_deg}^{\\circ})} \\Rightarrow b \\approx ${b_side.toFixed(2)}$ cm.</div><br>`;

    // Problema 3: Área de un triángulo
    let side1 = 5 + Math.floor(Math.random() * 5);
    let side2 = 6 + Math.floor(Math.random() * 5);
    let angle_deg = 120;
    let area = 0.5 * side1 * side2 * Math.sin(angle_deg * Math.PI / 180);

    Pregunta += `<div class="problema2">3.- Un terreno triangular tiene dos lados de $${side1}$ m y $${side2}$ m que forman un ángulo de $${angle_deg}^{\\circ}$.
    <ol class="FT_ol_a">
        <li>Calcule el área del terreno. <div>2</div></li>${CR(3)}
    </ol></div><div class="page"></div>`;

    Solucion += `<div class="ans"><b>P3:</b> $\\text{Área} = \\frac{1}{2} \\cdot ${side1} \\cdot ${side2} \\cdot \\sin(${angle_deg}^{\\circ}) \\approx ${area.toFixed(2)}$ m$^2$.</div>`;

    return [Pregunta, Solucion];
}