import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Regla del Seno: El caso ambiguo';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

// Fuente original: [67].pdf (Trigonometría de triángulos no rectángulos)
export async function pregunta() {
    // Generación de parámetros aleatorios para el problema (Caso ambiguo)
    // Se asegura que sea el caso ambiguo (a < c * sin(A) es imposible, a > c es 1 sol, c*sin(A) < a < c es 2 sol)
    let A = 30; // Ángulo fijo para facilitar el cálculo
    let c = 10 + Math.floor(Math.random() * 5);
    let sinA = Math.sin(A * Math.PI / 180);
    let h = c * sinA;
    let a = (Math.floor(h) + 1) + Math.floor(Math.random() * (c - Math.floor(h) - 1));

    let Pregunta = `<div class="problema2"><h3>Análisis de triángulos (Caso ambiguo de la regla del seno)</h3>
    <p>Considere el triángulo ABC donde el ángulo $A = ${A}^\\circ$, el lado $c = ${c}\\text{ cm}$ y el lado $a = ${a}\\text{ cm}$.</p>
    <ol class="FT_ol_a">
        <li>Determine el valor de la altura $h$ desde el vértice $C$ al lado $AB$. <div>2</div></li>${CR(2)}
        <li>Utilice la regla del seno para hallar los posibles valores del ángulo $C$. <div>4</div></li>${CR(4)}
        <li>Justifique, mediante cálculos, si el triángulo dado tiene una, dos o ninguna solución posible. <div>3</div></li>${CR(4)}
    </ol></div><div class="page"></div>`;

    let sinC = (c * Math.sin(A * Math.PI / 180)) / a;
    let C1 = Math.asin(sinC) * 180 / Math.PI;
    let C2 = 180 - C1;

    let Solucion = `<div class="ans"><b>Solución:</b>
    <br>1. La altura es $h = c \\cdot \\sin(A) = ${c} \\cdot \\sin(${A}^\\circ) = ${h.toFixed(2)}\\text{ cm}$.
    <br>2. Aplicando $\\frac{\\sin C}{c} = \\frac{\\sin A}{a}$: $\\sin C = \\frac{${c} \\cdot \\sin(${A}^\\circ)}{${a}} \\approx ${sinC.toFixed(4)}$.
    <br>3. Los ángulos posibles son $C_1 \\approx ${C1.toFixed(2)}^\\circ$ y $C_2 \\approx ${C2.toFixed(2)}^\\circ$. 
    Como $A + C_2 = ${A + parseFloat(C2.toFixed(2))}^\\circ < 180^\\circ$, existen <b>dos soluciones</b> para este triángulo.</div><br>`;

    // --- Problema 2: Contexto aplicado ---
    let b_lat = 12 + Math.floor(Math.random() * 4);
    let a_lat = 10 + Math.floor(Math.random() * 2);
    let angB = 35;

    Pregunta += `<div class="problema2">4.- Un barco observa dos faros. El faro A está a $${b_lat}\\text{ km}$ de distancia y el faro B a $${a_lat}\\text{ km}$. Si el ángulo formado por el barco y los dos faros es $${angB}^\\circ$ en el faro B:
    <ol class="FT_ol_a">
        <li>Dibuje un esquema de la situación. <div>2</div></li>${CR(6)}
        <li>Calcule la medida del ángulo en el faro A. <div>3</div></li>${CR(3)}
    </ol></div>`;

    let sinA_lat = (b_lat * Math.sin(angB * Math.PI / 180)) / a_lat;
    let A_lat = sinA_lat > 1 ? "No existe solución" : Math.asin(sinA_lat) * 180 / Math.PI;

    Solucion += `<div class="ans"><b>P4:</b> $\\sin A = \\frac{${b_lat} \\cdot \\sin(${angB}^\\circ)}{${a_lat}} \\approx ${sinA_lat.toFixed(4)}$. 
    ${sinA_lat > 1 ? "El ángulo no existe (el lado opuesto es muy corto)." : "Ángulo $A \\approx " + A_lat.toFixed(2) + "^\\circ$."}</div>`;

    return [Pregunta, Solucion];
}