import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Geometría: Longitud de arco y área de sector';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Problema 1: Longitud de arco (Contextualizado: un abanico circular)
    let r1 = Math.floor(Math.random() * 8) + 5;
    let theta1 = 45 + Math.floor(Math.random() * 90);
    let arc1 = (theta1 / 360) * 2 * Math.PI * r1;

    let Pregunta = `<div class="problema2">1.- Un abanico circular de papel tiene un radio de $${r1}$ cm y un ángulo central de $${theta1}^{\\circ}$.
    <ol class="FT_ol_a">
        <li>Calcule la longitud del borde curvo (arco) del abanico. <div>2</div></li>${CR(2)}
        <li>Si se decora el borde con una cinta, ¿cuántos centímetros de cinta se necesitan para cubrir el perímetro total del abanico? <div>3</div></li>${CR(2)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (1a) $L = \\frac{${theta1}}{360} \\cdot 2 \\cdot \\pi \\cdot ${r1} \\approx ${(arc1).toFixed(2)}$ cm. (1b) $P = 2(${r1}) + ${arc1.toFixed(2)} \\approx ${(2*r1 + arc1).toFixed(2)}$ cm.</div><br>`;

    // Problema 2: Área de sector (Contextualizado: rodaja de pizza)
    let r2 = Math.floor(Math.random() * 10) + 10;
    let theta2 = 30 + Math.floor(Math.random() * 30);
    let area2 = (theta2 / 360) * Math.PI * Math.pow(r2, 2);

    Pregunta += `<div class="problema2">2.- Una rodaja de pizza tiene forma de sector circular con radio $${r2}$ cm y un ángulo central de $${theta2}^{\\circ}$.
    <ol class="FT_ol_a">
        <li>Halle el área de la superficie superior de la rodaja. <div>2</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> (2a) $A = \\frac{${theta2}}{360} \\cdot \\pi \\cdot ${r2}^2 \\approx ${(area2).toFixed(2)}$ cm$^2$.</div><br>`;

    // Problema 3: Radio inverso
    let arc3 = 15 + Math.floor(Math.random() * 10);
    let theta3 = 60;
    let r3 = (arc3 * 360) / (2 * Math.PI * theta3);

    Pregunta += `<div class="problema2">3.- El arco de un sector circular tiene una longitud de $${arc3}$ mm y el ángulo en el centro es de $${theta3}^{\\circ}$. Calcule el radio del círculo. <div>3</div></li>${CR(3)}
    </div>`;

    Solucion += `<div class="ans"><b>P3:</b> $${arc3} = \\frac{60}{360} \\cdot 2 \\cdot \\pi \\cdot r \\Rightarrow r = \\frac{${arc3} \\cdot 360}{120 \\cdot \\pi} \\approx ${(r3).toFixed(2)}$ mm.</div><br>`;

    // Problema 4: Perímetro inverso
    let r4 = Math.floor(Math.random() * 5) + 3;
    let theta4 = 90;
    let P4 = 2 * r4 + (theta4 / 360) * 2 * Math.PI * r4;

    Pregunta += `<div class="problema2">4.- Un sector circular tiene un radio de $${r4}$ cm y un ángulo de $${theta4}^{\\circ}$. Determine el perímetro de dicho sector (la suma del arco y los dos radios). <div>3</div></li>${CR(3)}
    </div>`;

    Solucion += `<div class="ans"><b>P4:</b> $P = 2(${r4}) + (\\frac{90}{360} \\cdot 2 \\cdot \\pi \\cdot ${r4}) \\approx ${(P4).toFixed(2)}$ cm.</div><br>`;

    return [Pregunta, Solucion];
}