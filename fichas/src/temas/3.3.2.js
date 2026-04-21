import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Fuente original: [59].pdf
 * Módulo para práctica de Trigonometría (Área de triángulos y figuras)
 * Tiempo estimado: 40 minutos
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Problema 1: Cálculo de área con regla del seno
    let a1 = Math.floor(Math.random() * 8) + 5;
    let b1 = Math.floor(Math.random() * 10) + 8;
    let ang1 = Math.floor(Math.random() * 40) + 30;
    let area1 = (0.5 * a1 * b1 * Math.sin(ang1 * Math.PI / 180)).toFixed(2);

    let Pregunta = `<div class="problema"><h3>1. Cálculo de Áreas (Regla del Seno)</h3>
    <p>Calcule el área de los siguientes triángulos (muestre su procedimiento):</p>
    <ol class="FT_ol_a">
        <li>Un triángulo con lados de ${a1} cm y ${b1} cm que forman un ángulo incluido de ${ang1}^\\circ$. <div>3</div></li>${CR(2)}
        <li>Un triángulo isósceles con lados iguales de 12 cm y un ángulo distinto de $40^\\circ$ entre los lados iguales. <div>3</div></li>${CR(2)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (1a) Area $\\approx ${area1} \\text{ cm}^2$. (1b) Area $= 0.5 \\times 12 \\times 12 \\times \\sin(40^\\circ) \\approx 46.28 \\text{ cm}^2$.</div><br>`;

    // Problema 2: Hallar lado desconocido dado el área
    let base = Math.floor(Math.random() * 5) + 6;
    let area_dada = Math.floor(Math.random() * 20) + 40;
    let ang_dado = 55;
    let x_val = (2 * area_dada / (base * Math.sin(ang_dado * Math.PI / 180))).toFixed(2);

    Pregunta += `<div class="problema"><h3>2. Resolución de incógnitas</h3>
    <p>En el triángulo ABC, el área es ${area_dada} cm$^2$. Si el lado $c = ${base}$ cm y el ángulo $\\hat{B} = ${ang_dado}^\\circ$, halle la longitud del lado $a$. <div>4</div></p>${CR(4)}</div>`;
    
    Solucion += `<div class="ans"><b>P2:</b> Usando Area $= 0.5 \\cdot a \\cdot c \\cdot \\sin(B) \\Rightarrow a = \\frac{2 \\cdot ${area_dada}}{${base} \\cdot \\sin(${ang_dado}^\\circ)} \\approx ${x_val} \\text{ cm}$.</div><br>`;

    // Problema 3: Aplicación a paralelogramos/rombos
    let lado_p = Math.floor(Math.random() * 5) + 8;
    let ang_p = 60;
    let area_p = (Math.pow(lado_p, 2) * Math.sin(ang_p * Math.PI / 180)).toFixed(2);

    Pregunta += `<div class="problema"><h3>3. Figuras compuestas</h3>
    <p>Un paralelogramo tiene lados de ${lado_p} cm y ${lado_p} cm (es un rombo) con un ángulo interno de ${ang_p}^\\circ$. Calcule su área. <div>4</div></p>${CR(4)}</div>`;

    Solucion += `<div class="ans"><b>P3:</b> Area $= a \\cdot b \\cdot \\sin(\\theta) = ${lado_p}^2 \\cdot \\sin(${ang_p}^\\circ) \\approx ${area_p} \\text{ cm}^2$.</div><div class="page"></div>`;

    // Problema 4: Interpretación geométrica (Alturas)
    let b_base = 20;
    let h_alt = 12;
    let area_f = 0.5 * b_base * h_alt;

    Pregunta += `<div class="problema"><h3>4. Alturas y Áreas</h3>
    <p>Un triángulo tiene una base de ${b_base} cm y una altura correspondiente de ${h_alt} cm.</p>
    <ol class="FT_ol_a">
        <li>Calcule el área del triángulo. <div>2</div></li>${CR(1)}
        <li>Si el lado adyacente a la base mide 15 cm, ¿cuál es el ángulo que forma con la base? <div>3</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P4:</b> (4a) Area $= 120 \\text{ cm}^2$. (4b) $\\sin(\\theta) = 12/15 \\Rightarrow \\theta \\approx 53.1^\\circ$.</div>`;

    return [Pregunta, Solucion];
}