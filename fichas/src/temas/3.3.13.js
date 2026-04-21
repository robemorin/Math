import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Fuente original: [70].pdf
 * Módulo para práctica de Trigonometría (Regla del seno/coseno, área)
 * Tiempo estimado: 40 minutos.
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // --- Problema 1: Regla del Coseno (Contexto navegación) ---
    let distAB = Math.floor(Math.random() * 5) + 8;
    let distAC = Math.floor(Math.random() * 4) + 5;
    let angleA = 30 + Math.floor(Math.random() * 30);
    
    // Ley del coseno para BC: a^2 = b^2 + c^2 - 2bc*cos(A)
    let b = distAC;
    let c = distAB;
    let BC = Math.sqrt(Math.pow(b, 2) + Math.pow(c, 2) - 2 * b * c * Math.cos(angleA * Math.PI / 180));

    let Pregunta = `<div class="problema2">
    <h3>1. Navegación marítima</h3>
    Un barco sale del puerto A con la intención de llegar al puerto B. Sin embargo, por una corriente, se desvía y llega al puerto C después de navegar ${distAC} km. La distancia original planeada de A a B es ${distAB} km. El ángulo de desviación en A fue de ${angleA}^\\circ$.
    <ol class="FT_ol_a">
        <li>Calcule la distancia directa entre el punto C y el punto B. <div>3</div></li>${CR(2)}
        <li>Si el barco hubiera seguido la ruta original de A a B, pero el viaje de C a B hubiera sido afectado por una tormenta aumentando la distancia en 2 km adicionales, ¿qué distancia total habría recorrido? <div>2</div></li>${CR(2)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (1a) $BC^2 = ${distAC}^2 + ${distAB}^2 - 2(${distAC})(${distAB})\\cos(${angleA}^\\circ) \\approx ${BC.toFixed(2)}^2 \\Rightarrow BC \\approx ${BC.toFixed(2)}$ km.</div><br>`;

    // --- Problema 2: Regla del Seno (Caso ambigüo) ---
    let b2 = 7;
    let a2 = 5;
    let angleC = 42;
    // sin(A)/a = sin(C)/c -> sin(A) = a * sin(C) / c (No es el caso, usaremos los datos del PDF 15)
    
    Pregunta += `<div class="problema2">
    <h3>2. Triángulo ambigüo</h3>
    En el triángulo ABC, $A\\hat{C}B = ${angleC}^\\circ$, $AB = ${a2}$ cm y $AC = ${b2}$ cm.
    <ol class="FT_ol_a">
        <li>Determine los dos posibles valores para el ángulo $A\\hat{B}C$. <div>4</div></li>${CR(3)}
        <li>Calcule el área del triángulo para ambos casos. <div>3</div></li>${CR(3)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> (2a) Por regla del seno: $\\sin(B) = \\frac{${b2}\\sin(${angleC}^\\circ)}{${a2}}$. Esto genera dos ángulos suplementarios para B.</div><br>`;

    // --- Problema 3: Aplicación del área ---
    let side1 = 11.3;
    let side2 = 19.2;
    let area = 80;
    // Area = 0.5 * a * b * sin(C) -> sin(C) = 2 * area / (a*b)
    let sinC = (2 * area) / (side1 * side2);
    let angleC_calc = Math.asin(sinC) * 180 / Math.PI;

    Pregunta += `<div class="problema2">
    <h3>3. Área de un terreno</h3>
    Un terreno triangular tiene dos lados de longitud ${side1} m y ${side2} m. El área del terreno es de ${area} m$^2$.
    <ol class="FT_ol_a">
        <li>Halle los dos posibles valores para el ángulo incluido entre estos dos lados. <div>3</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P3:</b> $\\sin(C) = \\frac{2 \\times ${area}}{${side1} \\times ${side2}} \\approx ${sinC.toFixed(4)}$. $C_1 \\approx ${angleC_calc.toFixed(1)}^\\circ, C_2 \\approx 180 - ${angleC_calc.toFixed(1)}^\\circ$.</div><br><div class="page"></div>`;

    return [Pregunta, Solucion];
}

export function name() {
    return 'Práctica de Trigonometría IB';
}