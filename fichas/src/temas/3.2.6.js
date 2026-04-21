import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Trigonometría en Triángulos y Círculos';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Problemas basados en el PDF [47].pdf
    
    // Problema 1: Cuerda en círculo (Similar a ejemplo 7)
    let radio1 = (Math.random() * 5 + 5).toFixed(1);
    let angulo1 = Math.floor(Math.random() * 40) + 80;
    let longCuerda1 = (2 * radio1 * Math.sin((angulo1 / 2) * Math.PI / 180)).toFixed(2);

    // Problema 2: Ángulo subtendido por cuerda
    let cuerda2 = (Math.random() * 4 + 6).toFixed(1);
    let radio2 = (Math.random() * 2 + 7).toFixed(1);
    let angulo2 = (2 * Math.asin(cuerda2 / (2 * radio2)) * 180 / Math.PI).toFixed(1);

    let Pregunta = `<div class="problema">
    <h3>Práctica de Trigonometría en el Círculo</h3>
    <p><i>Nota: Para todos los ejercicios, considere que la unidad está en cm.</i></p>
    
    <div class="problema2">1.- Un círculo tiene un radio de $${radio1}\\text{ cm}$. Una cuerda del círculo subtiende un ángulo de $${angulo1}^\\circ$ en su centro.
    <ol class="FT_ol_a">
        <li>Dibuje un esquema que represente la situación (indique el radio y el ángulo). <div>2</div></li>${CR(3)}
        <li>Calcule la longitud de la cuerda. <div>3</div></li>${CR(2)}
    </ol></div>

    <div class="problema2">2.- Una cuerda de un círculo mide $${cuerda2}\\text{ cm}$ de longitud. Si el radio del círculo es $${radio2}\\text{ cm}$, halle el ángulo subtendido por la cuerda en el centro del círculo. <div>4</div></div>${CR(3)}

    <div class="problema2">3.- Considere un punto P a $15\\text{ cm}$ del centro de un círculo cuyo radio es $5\\text{ cm}$. Se trazan tangentes desde P hasta el círculo.
    <ol class="FT_ol_a">
        <li>Dibuje el radio hacia el punto de tangencia y explique por qué se forma un triángulo rectángulo. <div>2</div></li>${CR(3)}
        <li>Calcule el ángulo entre las dos tangentes. <div>4</div></li>${CR(3)}
    </ol></div>
    </div>`;

    let Solucion = `<div class="ans">
    <b>P1:</b> (1b) $x = 2 \\cdot ${radio1} \\cdot \\sin(${angulo1}/2)^\\circ \\approx ${longCuerda1}\\text{ cm}$<br>
    <b>P2:</b> $\\theta = 2 \\cdot \\arcsin(${cuerda2} / (2 \\cdot ${radio2})) \\approx ${angulo2}^\\circ$<br>
    <b>P3:</b> (3b) Usando $\\sin(\\theta/2) = \\text{radio}/\\text{distancia} = 5/15 \\Rightarrow \\theta/2 \\approx 19.47^\\circ \\Rightarrow \\theta \\approx 38.94^\\circ$
    </div>`;

    return [Pregunta, Solucion];
}

/* 
Fuente original de los ejercicios: [47].pdf
Temática: 3.2 Razones trigonométricas en triángulos rectángulos (aplicadas a geometría del círculo).
Preparado para impresión: Se han incluido espacios para resolución manuscrita.
*/