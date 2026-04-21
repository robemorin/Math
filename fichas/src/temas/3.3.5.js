import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

// Fuente original: [62].pdf
export function name() {
    return 'Regla del Seno y Coseno: Práctica de Triángulos';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Problema 1: Regla del seno (Variante del ej 11)
    let angulo = 40;
    let b = 5;
    let c = 6;
    // Ley del seno: sin(C)/c = sin(40)/x  => sin(C) = 6*sin(40)/5
    let sinC = (c * Math.sin(angulo * Math.PI / 180)) / b;
    let C = Math.asin(sinC) * 180 / Math.PI;
    let A = 180 - angulo - C;
    let x = (b * Math.sin(A * Math.PI / 180)) / Math.sin(angulo * Math.PI / 180);

    let Pregunta = `<div class="problema2"><h3>1. Análisis de Triángulos (Regla del Seno)</h3>
    <p>En el triángulo siguiente, se dan dos lados y un ángulo no comprendido:</p>
    <div style="text-align:center; margin: 20px;">
        <svg width="200" height="150" viewBox="0 0 200 150">
            <line x1="20" y1="130" x2="180" y2="60" stroke="black" />
            <line x1="180" y1="60" x2="50" y2="30" stroke="black" />
            <line x1="50" y1="30" x2="20" y2="130" stroke="black" />
            <text x="30" y="110" font-size="14">$40^\\circ$</text>
            <text x="120" y="40" font-size="14">${c} \\text{ cm}$</text>
            <text x="100" y="110" font-size="14">${b} \\text{ cm}$</text>
            <text x="10" y="80" font-size="14">$x$</text>
        </svg>
    </div>
    <ol class="FT_ol_a">
        <li>Calcule el valor de los posibles ángulos internos restantes. <div>3</div></li>${CR(2)}
        <li>Determine el valor de $x$ (longitud del lado desconocido). <div>2</div></li>${CR(2)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> Uso de $\\frac{\\sin(A)}{a} = \\frac{\\sin(B)}{b}$. Resultados: $C \\approx ${C.toFixed(1)}^\\circ, A \\approx ${A.toFixed(1)}^\\circ, x \\approx ${x.toFixed(2)} \\text{ cm}$.</div><br>`;

    // Problema 2: Regla del Coseno (Variante del ej 13)
    let a2 = 8, b2 = 9, C2 = 130;
    let c2 = Math.sqrt(Math.pow(a2, 2) + Math.pow(b2, 2) - 2 * a2 * b2 * Math.cos(C2 * Math.PI / 180));
    let theta = Math.asin((a2 * Math.sin(C2 * Math.PI / 180)) / c2) * 180 / Math.PI;

    Pregunta += `<div class="problema2"><h3>2. Regla del Coseno</h3>
    <p>Calcule el ángulo $\\theta$ en el siguiente triángulo:</p>
    <div style="text-align:center; margin: 20px;">
        <svg width="200" height="150" viewBox="0 0 200 150">
            <line x1="20" y1="120" x2="180" y2="120" stroke="black" />
            <line x1="180" y1="120" x2="100" y2="30" stroke="black" />
            <line x1="100" y1="30" x2="20" y2="120" stroke="black" />
            <text x="100" y="60" font-size="14">$\\theta$</text>
            <text x="50" y="90" font-size="14">${a2} \\text{ cm}$</text>
            <text x="130" y="90" font-size="14">${b2} \\text{ cm}$</text>
            <text x="100" y="20" font-size="14">$130^\\circ$</text>
        </svg>
    </div>
    <ol class="FT_ol_a">
        <li>Halle la longitud del lado opuesto al ángulo de $130^\\circ$. <div>2</div></li>${CR(2)}
        <li>Halle el valor del ángulo $\\theta$. <div>3</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> Usando ley del coseno: $c^2 = 8^2 + 9^2 - 2(8)(9)\\cos(130^\\circ)$. $c \\approx ${c2.toFixed(2)}$. Luego $\\frac{\\sin(\\theta)}{8} = \\frac{\\sin(130^\\circ)}{${c2.toFixed(2)}}$, $\\theta \\approx ${theta.toFixed(1)}^\\circ$.</div><br>`;

    // Problema 3: Aplicación práctica (Variante del ej 14)
    Pregunta += `<div class="problema2"><h3>3. Triángulos en el plano</h3>
    <p>ABC es un triángulo equilátero de lado 10 cm. Un punto P se encuentra dentro del triángulo tal que $AP = 5$ cm y $BP = 6$ cm. Plantee el procedimiento para hallar la distancia de P a C.</p>
    ${CR(6)}
    <div>Espacio para desarrollo (Use ley del coseno en los triángulos subyacentes):</div>${CR(6)}
    </div>`;

    Solucion += `<div class="ans"><b>P3:</b> Se deben usar dos leyes del coseno para encontrar los ángulos alrededor de P y luego restar de $60^\\circ$ para hallar el tercer triángulo.</div>`;

    return [Pregunta, Solucion];
}