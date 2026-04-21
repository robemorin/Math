import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Ficha de Práctica: Regla del Seno';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

/**
 * Nota: Los ejercicios se basan en la fuente original [63].pdf (Capítulo 8)
 * sobre trigonometría en triángulos no rectángulos.
 */

export async function pregunta() {
    // Problema 1: Cálculo directo (A, B, a) -> b
    let A1 = Math.floor(Math.random() * 30) + 40;
    let B1 = Math.floor(Math.random() * 30) + 50;
    let a1 = Math.floor(Math.random() * 10) + 5;
    let b1 = (a1 * Math.sin(B1 * Math.PI / 180)) / Math.sin(A1 * Math.PI / 180);

    let Pregunta = `<div class="problema">
    <h3>Práctica de Trigonometría: Regla del Seno</h3>
    <p>Utilice la regla del seno: $\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}$ para resolver los siguientes problemas.</p>
    
    <div class="problema2">1.- En el triángulo ABC, se tiene que $\\hat{A} = ${A1}^\\circ$, $\\hat{B} = ${B1}^\\circ$ y el lado $a = ${a1} \\text{ cm}$. Halle la longitud del lado $b$ (muestre el procedimiento). <div>4</div></div>${CR(3)}
    
    <div class="problema2">2.- Un barco de rescate recibe una señal de dos botes salvavidas. El ángulo entre los dos botes desde el barco es de $42^\\circ$. La distancia entre el barco y el primer bote es de $120 \\text{ m}$. Si el ángulo en la posición del primer bote es $75^\\circ$, ¿cuál es la distancia entre el segundo bote y el barco? <div>6</div></div>${CR(5)}
    
    <div class="problema2">3.- Considere el triángulo con lados $p = 15 \\text{ cm}$, $q = 12 \\text{ cm}$ y el ángulo opuesto al lado $p$ es de $80^\\circ$. Calcule el ángulo opuesto al lado $q$. <div>5</div></div>${CR(5)}
    
    <div class="problema2">4.- Dos estaciones de monitoreo forestal, A y B, están separadas por una distancia de $15 \\text{ km}$. Un incendio ocurre en el punto C. Desde A se observa el incendio con un ángulo de $55^\\circ$ respecto a la línea AB, y desde B se observa con un ángulo de $40^\\circ$ respecto a la misma línea. Calcule la distancia entre la estación A y el incendio (punto C). <div>6</div></div>${CR(6)}
    </div><div class="page"></div>`;

    let Solucion = `<div class="ans">
    <b>Soluciones sugeridas:</b><br>
    <b>P1:</b> $b = \\frac{${a1} \\cdot \\sin(${B1}^\\circ)}{\\sin(${A1}^\\circ)} \\approx ${b1.toFixed(2)} \\text{ cm}$.<br><br>
    <b>P2:</b> Usando $\\frac{120}{\\sin(75^\\circ)} = \\frac{x}{\\sin(42^\\circ)}$, entonces $x = \\frac{120 \\cdot \\sin(42^\\circ)}{\\sin(75^\\circ)} \\approx 83.05 \\text{ m}$.<br><br>
    <b>P3:</b> $\\frac{\\sin Q}{12} = \\frac{\\sin 80^\\circ}{15} \\Rightarrow \\sin Q = \\frac{12 \\cdot \\sin 80^\\circ}{15} \\approx 0.7878 \\Rightarrow Q \\approx 52.0^\\circ$.<br><br>
    <b>P4:</b> Ángulo $C = 180^\\circ - 55^\\circ - 40^\\circ = 85^\\circ$. Regla del seno: $\\frac{b}{\\sin 40^\\circ} = \\frac{15}{\\sin 85^\\circ}$. Entonces $b = \\frac{15 \\cdot \\sin 40^\\circ}{\\sin 85^\\circ} \\approx 9.68 \\text{ km}$.
    </div>`;

    return [Pregunta, Solucion];
}