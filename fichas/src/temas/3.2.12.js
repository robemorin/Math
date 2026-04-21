import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Módulo de práctica: Trigonometría en triángulos rectángulos (IB Math AA/AI)
 * Fuente original: [53].pdf
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export function name() {
    return 'Trigonometría: Triángulos Rectángulos';
}

export async function pregunta() {
    // Generación de parámetros aleatorios para el problema 1
    let a1 = Math.floor(Math.random() * 5) + 3;
    let b1 = Math.floor(Math.random() * 5) + 3;
    let h1 = Math.sqrt(a1 * a1 + b1 * b1).toFixed(2);

    let Pregunta = `<div class="problema2">
    <h3>Práctica de Trigonometría (Preparación IB)</h3>
    <p>1.- Dado un triángulo rectángulo con catetos de longitudes $a = ${a1}$ cm y $b = ${b1}$ cm, donde $\\theta$ es el ángulo opuesto al cateto de longitud $b$:</p>
    <ol class="FT_ol_a">
        <li>Halle la longitud de la hipotenusa. <div>2</div></li>${CR(1)}
        <li>Halle $\\sin \\theta$, $\\cos \\theta$ y $\\tan \\theta$. <div>3</div></li>${CR(2)}
    </ol>
    
    <p>2.- Utilice su calculadora para hallar los siguientes valores (redondee a 3 cifras significativas):</p>
    <ol class="FT_ol_a" type="a">
        <li>$\\cos(${Math.floor(Math.random() * 80) + 10}^\\circ) =$ <div>1</div></li>
        <li>$\\sin(${Math.floor(Math.random() * 80) + 10}^\\circ) =$ <div>1</div></li>
        <li>$\\tan(${Math.floor(Math.random() * 80) + 10}^\\circ) =$ <div>1</div></li>
    </ol>${CR(2)}

    <p>3.- En los siguientes triángulos, halle el valor de $x$:</p>
    <div style="display: flex; gap: 20px;">
        <div style="width: 200px; height: 150px; border: 1px solid black; padding: 10px;">Esquema de triángulo con ángulo conocido y lado opuesto/adyacente. (Espacio para resolución)</div>
        <div style="width: 200px; height: 150px; border: 1px solid black; padding: 10px;">Esquema de triángulo con hipotenusa y ángulo conocido. (Espacio para resolución)</div>
    </div>
    ${CR(4)}

    <p>4.- Considere el triángulo $PQR$ donde el ángulo en $P = 90^\\circ$, $PQ = 40$ cm y $\\angle R = 28^\\circ$. Calcule:</p>
    <ol class="FT_ol_a">
        <li>El perímetro del triángulo $PQR$. <div>4</div></li>${CR(3)}
        <li>El área del triángulo $PQR$. <div>3</div></li>${CR(3)}
    </ol>
    </div>`;

    let Solucion = `<div class="ans">
    <b>Soluciones:</b><br>
    P1: Hipotenusa $\\approx ${h1}$. $\\sin \\theta \\approx ${(b1/h1).toFixed(3)}$, $\\cos \\theta \\approx ${(a1/h1).toFixed(3)}$, $\\tan \\theta \\approx ${(b1/a1).toFixed(3)}$.<br>
    P4: (Uso de razones trigonométricas) $PR = 40 / \\tan(28^\\circ) \\approx 75.2$ cm, $QR = 40 / \\sin(28^\\circ) \\approx 85.2$ cm.<br>
    Perímetro $\\approx 40 + 75.2 + 85.2 = 200.4$ cm. Área $= 0.5 \\times 40 \\times 75.2 = 1504$ cm$^2$.
    </div>`;

    return [Pregunta, Solucion];
}