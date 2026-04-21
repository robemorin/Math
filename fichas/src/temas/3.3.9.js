import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

/**
 * Fuente original: [66].pdf
 * Ejercicios de Trigonometría (Regla del seno y coseno)
 * Diseñado para 40 minutos de práctica.
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<div style='height: 30px;'></div>";
    return s;
}

export function name() {
    return 'Práctica de Trigonometría: Triángulos No Rectángulos';
}

export async function pregunta() {
    // Problema 1: Regla del coseno (Contexto navegación/distancia)
    let d1 = 4.5;
    let d2 = 6;
    let ang1 = 32;
    let dist_cuadrado = Math.pow(d1, 2) + Math.pow(d2, 2) - 2 * d1 * d2 * Math.cos(ang1 * Math.PI / 180);
    let dist = Math.sqrt(dist_cuadrado).toFixed(2);

    // Problema 2: Altura de colina (Trigonometría básica/doble ángulo)
    let h_torre = 42;
    let ang_sup = 13.2;
    let ang_inf = 8.3;
    // h_total = x * tan(ang_sup), h_colina = x * tan(ang_inf)
    // x = h_torre / (tan(ang_sup) - tan(ang_inf))
    let x = h_torre / (Math.tan(ang_sup * Math.PI / 180) - Math.tan(ang_inf * Math.PI / 180));
    let h_colina = (x * Math.tan(ang_inf * Math.PI / 180)).toFixed(1);

    let Pregunta = `<div class="problema">
    <h3>Práctica: Trigonometría en triángulos no rectángulos</h3>
    <p><i>Instrucciones: Resuelva los siguientes problemas. Muestre todo el procedimiento detallado.</i></p>

    <div class="problema2">1.- Un orientador corre ${d1} km, luego gira un ángulo de ${ang1}^\\circ$ y corre otros ${d2} km. ¿Qué tan lejos está de su punto de inicio?
    <div>Espacio para resolución:</div>${CR(4)}
    </div>

    <div class="problema2">2.- Una torre de ${h_torre} m de altura se encuentra sobre una colina. Desde un punto, el ángulo de elevación a la cima es de ${ang_sup}^\\circ$ y a la base es de ${ang_inf}^\\circ$. Calcule la altura de la colina.
    <div>Espacio para resolución:</div>${CR(5)}
    </div>

    <div class="problema2">3.- Un jugador de fútbol se encuentra a 26 m de un poste de portería y a 23 m del otro. La portería mide 5 m de ancho. Calcule el ángulo de visión que tiene el jugador hacia la portería.
    <div>Espacio para resolución:</div>${CR(5)}
    </div>
    
    <div class="page"></div>
    
    <div class="problema2">4.- Desde el pie de un edificio se observa la copa de un árbol con un ángulo de elevación de $22^\\circ$. Desde la parte superior del edificio (a 150 m), se observa la misma copa con un ángulo de depresión de $50^\\circ$. ¿Qué tan lejos está el árbol de la base del edificio?
    <div>Espacio para resolución:</div>${CR(8)}
    </div>
    </div>`;

    let Solucion = `<div class="ans">
    <b>Soluciones sugeridas:</b><br>
    1. Aplicando la regla del coseno: $x = \\sqrt{${d1}^2 + ${d2}^2 - 2(${d1})(${d2})\\cos(${ang1}^\\circ)} \\approx ${dist}$ km.<br>
    2. Usando sistema de ecuaciones con tangentes: $h = \\frac{${h_torre} \\cdot \\tan(${ang_inf}^\\circ)}{\\tan(${ang_sup}^\\circ) - \\tan(${ang_inf}^\\circ)} \\approx ${h_colina}$ m.<br>
    3. Regla del coseno para el ángulo $\\theta$: $\\cos(\\theta) = \\frac{26^2 + 23^2 - 5^2}{2 \\cdot 26 \\cdot 23}$. <br>
    4. Mediante trigonometría en triángulos rectángulos superpuestos, $d = \\frac{150}{\\tan(22^\\circ) + \\tan(50^\\circ)} \\approx 105.7$ m.
    </div>`;

    return [Pregunta, Solucion];
}