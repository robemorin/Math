import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

// Fuente original: [61].pdf (Regla del coseno)

export function name() {
    return 'Regla del Coseno';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Problema 1: Hallar lado desconocido (Caso S-A-S)
    let a = Math.floor(Math.random() * 5) + 6;
    let b = Math.floor(Math.random() * 4) + 8;
    let C = 30 + Math.floor(Math.random() * 5) * 10; // Ángulo entre 30 y 70
    let c2 = a * a + b * b - 2 * a * b * Math.cos(C * Math.PI / 180);
    let c = Math.sqrt(c2).toFixed(2);

    let Pregunta = `<div class="problema2"><h3>Práctica de la Regla del Coseno</h3>
    1.- En el triángulo ABC, se tiene que $AC = ${a}\\text{ cm}$, $BC = ${b}\\text{ cm}$ y el ángulo $\\hat{C} = ${C}^\\circ$.
    <ol class="FT_ol_a">
        <li>Dibuje un bosquejo del triángulo. <div>2</div></li>${CR(4)}
        <li>Calcule la longitud del lado $AB$ (denotado como $c$). <div>3</div></li>${CR(4)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (1b) $c^2 = ${a}^2 + ${b}^2 - 2(${a})(${b})\\cos(${C}^\\circ) \\Rightarrow c \\approx ${c}\\text{ cm}$</div><br>`;

    // Problema 2: Hallar ángulo desconocido (Caso L-L-L)
    let s1 = 7, s2 = 8, s3 = 9; // Lados fijos para un triángulo válido
    let cosA = (Math.pow(s2, 2) + Math.pow(s3, 2) - Math.pow(s1, 2)) / (2 * s2 * s3);
    let angA = (Math.acos(cosA) * 180 / Math.PI).toFixed(1);

    Pregunta += `<div class="problema2">2.- Dado un triángulo con lados de longitudes $7\\text{ cm}$, $8\\text{ cm}$ y $9\\text{ cm}$.
    <ol class="FT_ol_a">
        <li>Halle la medida del ángulo opuesto al lado de $7\\text{ cm}$. <div>4</div></li>${CR(6)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> $\\cos A = \\frac{8^2 + 9^2 - 7^2}{2(8)(9)} = ${cosA.toFixed(3)} \\Rightarrow A \\approx ${angA}^\\circ$</div><br>`;

    // Problema 3: Aplicación (Contextualizada)
    let d1 = 120, d2 = 150, ang = 110;
    let dist = Math.sqrt(Math.pow(d1, 2) + Math.pow(d2, 2) - 2 * d1 * d2 * Math.cos(ang * Math.PI / 180)).toFixed(1);

    Pregunta += `<div class="problema2">3.- Dos barcos parten de un mismo puerto. Uno navega $${d1}\\text{ km}$ hacia el Norte y el otro $${d2}\\text{ km}$ en una dirección de $110^\\circ$ respecto al primero. ¿A qué distancia se encuentran los barcos entre sí? <div>5</div></div>${CR(8)}`;

    Solucion += `<div class="ans"><b>P3:</b> $x^2 = ${d1}^2 + ${d2}^2 - 2(${d1})(${d2})\\cos(${ang}^\\circ) \\Rightarrow x \\approx ${dist}\\text{ km}$</div>`;

    return [Pregunta, Solucion];
}