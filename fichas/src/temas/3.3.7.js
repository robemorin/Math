import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Trigonometría: Regla del seno y coseno';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br><br><br>";
    return s;
}

export async function pregunta() {
    // Ejercicio dinámico 1: Regla del coseno (Triángulo lado-ángulo-lado)
    let a1 = Math.floor(Math.random() * 10) + 10;
    let b1 = Math.floor(Math.random() * 10) + 5;
    let C1 = 60; // Ángulo fijo para facilitar cálculo manual
    let c1 = Math.sqrt(a1**2 + b1**2 - 2*a1*b1*Math.cos(C1 * Math.PI/180)).toFixed(2);

    // Ejercicio dinámico 2: Regla del seno
    let A2 = 40;
    let a2 = Math.floor(Math.random() * 5) + 5;
    let B2 = 70;
    let b2 = (a2 * Math.sin(B2 * Math.PI/180) / Math.sin(A2 * Math.PI/180)).toFixed(2);

    let Pregunta = `
    <h3>Evaluación: Trigonometría en Triángulos No Rectángulos</h3>
    <p><b>Instrucciones:</b> Utilice su calculadora y los espacios proporcionados para desarrollar los procedimientos. Tiempo estimado: 40 minutos.</p>
    
    <div class="problema2">1.- En un terreno triangular, se conocen dos lados y el ángulo comprendido: $a = ${a1}$ m, $b = ${b1}$ m y $\\hat{C} = ${C1}^{\\circ}$.
    <ol class="FT_ol_a">
        <li>Determine la longitud del tercer lado $c$. <div>4</div></li>${CR(1)}
        <li>Calcule el área del triángulo. <div>3</div></li>${CR(1)}
    </ol></div>

    <div class="problema2">2.- Considere un triángulo donde $\\hat{A} = ${A2}^{\\circ}$, $a = ${a2}$ cm y $\\hat{B} = ${B2}^{\\circ}$.
    <ol class="FT_ol_a">
        <li>Halle la longitud del lado $b$. <div>4</div></li>${CR(1)}
        <li>¿Es posible que este triángulo presente el "caso ambiguo"? Justifique su respuesta. <div>3</div></li>${CR(1)}
    </ol></div>
    
    <div class="page"></div>
    <div class="problema2">3.- Un barco observa dos faros en la costa. La distancia entre faros es de 12 km. Desde el barco, el ángulo formado entre los faros es de $45^{\\circ}$. Si un faro dista 8 km del barco, ¿a qué distancia se encuentra el segundo faro del barco? (Sugerencia: aplique la regla del seno o coseno). <div>6</div></div>${CR(4)}
    `;

    let Solucion = `<div class="ans">
    <b>P1:</b> (1a) Por regla del coseno: $c^2 = ${a1}^2 + ${b1}^2 - 2(${a1})(${b1})\\cos(${C1}^{\\circ}) \\Rightarrow c \\approx ${c1}$ m. 
    (1b) Área: $\\frac{1}{2}ab\\sin(C) \\approx ${(0.5 * a1 * b1 * Math.sin(C1*Math.PI/180)).toFixed(2)}$ m$^2$.<br><br>
    <b>P2:</b> (2a) Por regla del seno: $\\frac{b}{\\sin(${B2}^{\\circ})} = \\frac{${a2}}{\\sin(${A2}^{\\circ})} \\Rightarrow b \\approx ${b2}$ cm.
    (2b) No, porque el ángulo dado es opuesto al lado conocido y es mayor a otro ángulo dado, o simplemente no cumple las condiciones del caso ambiguo (lado opuesto al ángulo menor).<br><br>
    <b>P3:</b> Aplicando regla del seno: $\\frac{\\sin(${45}^{\\circ})}{12} = \\frac{\\sin(\\theta)}{8} \\dots$ (cálculos adicionales según modelo).
    </div>`;

    return [Pregunta, Solucion];
}