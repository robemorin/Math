import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Razones Trigonométricas en Triángulos Rectángulos';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // --- Problema 1: Cálculo de lados ---
    let hyp1 = (Math.random() * 5 + 5).toFixed(1);
    let ang1 = Math.floor(Math.random() * 20 + 25);
    let x1 = (hyp1 * Math.sin(ang1 * Math.PI / 180)).toFixed(2);
    let y1 = (hyp1 * Math.cos(ang1 * Math.PI / 180)).toFixed(2);

    let Pregunta = `<div class="problema2"><h3>1. Resolución de Triángulos</h3>
    Considere un triángulo rectángulo donde la hipotenusa mide $${hyp1}$ cm y uno de sus ángulos agudos es de $${ang1}^{\\circ}$.
    <ol class="FT_ol_a">
        <li>Calcule la longitud del cateto opuesto ($x$) al ángulo dado. <div>2</div></li>${CR(2)}
        <li>Calcule la longitud del cateto adyacente ($y$) al ángulo dado. <div>2</div></li>${CR(2)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (1a) $x = ${hyp1} \\sin(${ang1}^{\\circ}) \\approx ${x1}$ cm. (1b) $y = ${hyp1} \\cos(${ang1}^{\\circ}) \\approx ${y1}$ cm.</div><br>`;

    // --- Problema 2: Área y Perímetro ---
    let base2 = (Math.random() * 4 + 4).toFixed(1);
    let ang2 = 50;
    let altura2 = (base2 * Math.tan(ang2 * Math.PI / 180)).toFixed(2);
    let hip2 = (base2 / Math.cos(ang2 * Math.PI / 180)).toFixed(2);
    let perim = (parseFloat(base2) + parseFloat(altura2) + parseFloat(hip2)).toFixed(2);
    let area = (0.5 * base2 * altura2).toFixed(2);

    Pregunta += `<div class="problema2"><h3>2. Geometría Aplicada</h3>
    En el triángulo $ABC$, el ángulo $\\hat{C} = 90^{\\circ}$, el ángulo $\\hat{A} = ${ang2}^{\\circ}$ y el cateto $AC = ${base2}$ cm.
    <ol class="FT_ol_a">
        <li>Calcule el perímetro del triángulo $ABC$. <div>3</div></li>${CR(2)}
        <li>Calcule el área del triángulo $ABC$. <div>2</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> (2a) $BC = ${altura2}, AB = ${hip2}$. Perímetro $\\approx ${perim}$ cm. (2b) Área $\\approx ${area}$ cm$^2$.</div><br>`;

    // --- Problema 3: Razones inversas (Encontrar ángulos) ---
    let o3 = Math.floor(Math.random() * 3 + 3);
    let h3 = Math.floor(Math.random() * 4 + 7);
    let ang3 = (Math.asin(o3 / h3) * 180 / Math.PI).toFixed(2);

    Pregunta += `<div class="problema2"><h3>3. Uso de la calculadora</h3>
    En un triángulo rectángulo, el cateto opuesto a un ángulo $\\theta$ mide $${o3}$ m y la hipotenusa mide $${h3}$ m.
    <ol class="FT_ol_a">
        <li>Escriba la razón trigonométrica que relaciona estos lados. <div>1</div></li>${CR(1)}
        <li>Calcule el valor de $\\theta$ en grados, redondeado a 2 decimales. <div>2</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P3:</b> (3a) $\\sin(\\theta) = \\frac{${o3}}{${h3}}$. (3b) $\\theta = \\sin^{-1}(\\frac{${o3}}{${h3}}) \\approx ${ang3}^{\\circ}$.</div>`;

    return [Pregunta, Solucion];
}

// Nota técnica: Ejercicios basados en el PDF [43].pdf, adaptados para el temario 3.2.