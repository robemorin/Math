import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

/* 
 * Fuente original: [45].pdf
 * Módulo de práctica: Razones trigonométricas en triángulos rectángulos.
 * Tiempo estimado: 40 minutos.
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
    // Problema 1: Cálculo de hipotenusa con coseno (Simulación de ejemplo 4a)
    let angle1 = 60 + Math.floor(Math.random() * 20); // 60-80 grados
    let adj1 = 5 + Math.floor(Math.random() * 10); // 5-15 cm
    let hyp1 = (adj1 / Math.cos(angle1 * Math.PI / 180)).toFixed(2);

    // Problema 2: Cálculo de ángulo (Simulación de ejemplo 4b)
    let op2 = 2 + Math.random() * 3; // 2-5
    let hyp2 = 7 + Math.random() * 3; // 7-10
    let angle2 = (2 * Math.asin(op2 / hyp2) * 180 / Math.PI).toFixed(1);

    let Pregunta = `
    <div class="problema2">
        <h3>Práctica de Trigonometría (IB Math NM)</h3>
        <p>Resuelva los siguientes ejercicios. Muestre todos sus pasos claramente.</p>
        
        <ol class="FT_ol_a">
            <li>En un triángulo isósceles con base ${adj1 * 2} cm, el ángulo de la base es $${angle1}^\\circ$. Calcule la longitud de los lados iguales ($x$ cm). <div>4</div></li>${CR(4)}
            
            <li>En un triángulo isósceles, los lados iguales miden ${hyp2.toFixed(1)} m y la base mide ${op2 * 2} m. Calcule el ángulo en el vértice superior ($\alpha$). <div>5</div></li>${CR(6)}
            
            <li><b>Teoría:</b> Dibuje un círculo de radio $r=4$ cm. Marque una tangente en un punto $P$ y una radio hacia el punto de contacto. ¿Qué ángulo forman entre sí? Justifique brevemente. <div>3</div></li>${CR(5)}
            
            <li>Considere una cuerda en un círculo de radio 10 cm. Si la distancia del centro a la cuerda es de 6 cm, calcule la longitud de la cuerda. <div>5</div></li>${CR(6)}
        </ol>
    </div>
    <div class="page"></div>`;

    let Solucion = `<div class="ans">
        <b>Soluciones:</b><br>
        1) $x = \\frac{${adj1}}{\\cos(${angle1}^\\circ)} \\approx ${hyp1}$ cm.<br>
        2) $\\sin(\\frac{\\alpha}{2}) = \\frac{${op2.toFixed(1)}}{${hyp2.toFixed(1)}} \\Rightarrow \\alpha = 2 \\cdot \\sin^{-1}(\\frac{${op2.toFixed(1)}}{${hyp2.toFixed(1)}}) \\approx ${angle2}^\\circ$.<br>
        3) El ángulo es $90^\\circ$ por propiedad del radio perpendicular a la tangente en el punto de contacto.<br>
        4) Por Pitágoras, media cuerda $h = \\sqrt{10^2 - 6^2} = 8$. Longitud total $= 16$ cm.
    </div>`;

    return [Pregunta, Solucion];
}