import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Repaso: Geometría, Superficie y Volumen';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Ejercicio 1: Sector circular (Variables aleatorias)
    let r1 = Math.floor(Math.random() * 5) + 3;
    let arc1 = (Math.random() * 3 + 2).toFixed(2);
    let angle_deg = ((parseFloat(arc1) * 360) / (2 * Math.PI * r1)).toFixed(1);
    let area_sector = (Math.PI * Math.pow(r1, 2) * (parseFloat(angle_deg) / 360)).toFixed(2);

    let Pregunta = `<div class="problema2"><h3>1. Sector Circular</h3>
    Considere un sector circular con radio $r = ${r1} \\text{ cm}$ y una longitud de arco de $${arc1} \\text{ cm}$.
    <ol class="FT_ol_a">
        <li>Halle el ángulo $\\theta^\\circ$ del sector (3 cifras significativas). <div>2</div></li>${CR(2)}
        <li>Calcule el área del sector. <div>2</div></li>${CR(2)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (1a) $\\theta \\approx ${angle_deg}^\\circ$ (1b) $Area \\approx ${area_sector} \\text{ cm}^2$</div><br>`;

    // Ejercicio 2: Superficie y Volumen (Cilindro)
    let h2 = Math.floor(Math.random() * 20) + 10;
    let d2 = Math.floor(Math.random() * 10) + 5;
    let r2 = d2 / 2;
    let vol2 = (Math.PI * Math.pow(r2, 2) * h2).toFixed(2);

    Pregunta += `<div class="problema2"><h3>2. Geometría de Sólidos</h3>
    Un envase cilíndrico tiene una altura de $${h2} \\text{ mm}$ y un diámetro de $${d2} \\text{ mm}$.
    <ol class="FT_ol_a">
        <li>Calcule el volumen del cilindro. <div>2</div></li>${CR(2)}
        <li>Si se desea cubrir el interior con un material aislante, ¿qué área de superficie lateral interna se debe cubrir? <div>3</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> (2a) $V \\approx ${vol2} \\text{ mm}^3$ (2b) $A_{lat} = 2\\pi r h \\approx ${(2 * Math.PI * r2 * h2).toFixed(2)} \\text{ mm}^2$</div><br>`;

    // Ejercicio 3: Hexagonal (Gazebo)
    let lado3 = (Math.random() * 0.5 + 1).toFixed(1);
    let apotema3 = (lado3 / (2 * Math.tan(Math.PI / 6))).toFixed(2);
    let area_base = (3 * lado3 * apotema3).toFixed(2);

    Pregunta += `<div class="problema2"><h3>3. Contexto: Construcción</h3>
    Un gazebo hexagonal tiene lados de base de $${lado3} \\text{ m}$ y una altura de pared de $0.75 \\text{ m}$.
    <ol class="FT_ol_a">
        <li>Determine el área de la base hexagonal. <div>3</div></li>${CR(2)}
        <li>Si la altura total desde el suelo al ápice del techo es de $2.25 \\text{ m}$, calcule el área lateral de las 6 paredes rectangulares. <div>2</div></li>${CR(2)}
    </ol></div><div class="page"></div>`;

    Solucion += `<div class="ans"><b>P3:</b> (3a) $A_{base} \\approx ${area_base} \\text{ m}^2$ (3b) $A_{paredes} = 6 \\times (${lado3} \\times 0.75) \\approx ${(6 * lado3 * 0.75).toFixed(2)} \\text{ m}^2$</div>`;

    return [Pregunta, Solucion];
}

// Nota: Los ejercicios han sido adaptados pedagógicamente del archivo [40].pdf para un tiempo de 40 minutos.