import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Trigonometría: Regla del seno y coseno';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Problema 1: Regla del Seno (Triángulos no rectángulos)
    let angA = 30 + Math.floor(Math.random() * 40);
    let angB = 20 + Math.floor(Math.random() * 30);
    let ladoA = 5 + Math.floor(Math.random() * 10);
    let ladoB = (ladoA * Math.sin(angB * Math.PI / 180) / Math.sin(angA * Math.PI / 180)).toFixed(2);

    let Pregunta = `<div class="problema2"><h3>1. Aplicación de la Regla del Seno</h3>
    <p>En el triángulo $\\triangle ABC$, se tiene que $\\hat{A} = ${angA}^\\circ$, $\\hat{B} = ${angB}^\\circ$ y el lado $a = ${ladoA}\\text{ cm}$.</p>
    <ol class="FT_ol_a">
        <li>Halle la medida del lado $b$. <div>3</div></li>${CR(2)}
        <li>Halle el área del triángulo si el lado $c$ mide ${Math.floor(ladoA + 2)}\\text{ cm}$. <div>3</div></li>${CR(2)}
    </ol></div>`;

    // Problema 2: Regla del Coseno (Contextualizado)
    let d1 = 100 + Math.floor(Math.random() * 100);
    let d2 = 100 + Math.floor(Math.random() * 100);
    let angC = 60 + Math.floor(Math.random() * 40);

    Pregunta += `<div class="problema2"><h3>2. Navegación</h3>
    <p>Dos barcos salen de un puerto al mismo tiempo. Uno viaja ${d1}\\text{ km}$ hacia el norte y el otro ${d2}\\text{ km}$ en una dirección de $${angC}^\\circ$ respecto al primero. ¿A qué distancia se encuentran los barcos entre sí?</p>${CR(5)}
    </div>`;

    // Problema 3: Perímetro y área
    let s1 = 10 + Math.floor(Math.random() * 10);
    let s2 = 10 + Math.floor(Math.random() * 10);
    let angBetween = 50 + Math.floor(Math.random() * 30);

    Pregunta += `<div class="problema2"><h3>3. Geometría de triángulos</h3>
    <p>Considere un triángulo con dos lados de ${s1}\\text{ m}$ y ${s2}\\text{ m}$, y un ángulo comprendido de $${angBetween}^\\circ$.</p>
    <ol class="FT_ol_a">
        <li>Calcule la longitud del tercer lado. <div>3</div></li>${CR(2)}
        <li>Calcule el perímetro del triángulo. <div>2</div></li>${CR(2)}
    </ol></div><div class="page"></div>`;

    let Solucion = `<div class="ans"><b>Soluciones:</b><br>
    P1: (a) $b = \\frac{${ladoA} \\cdot \\sin(${angB}^\\circ)}{\\sin(${angA}^\\circ)} \\approx ${ladoB}\\text{ cm}$ <br>
    P2: $x^2 = ${d1}^2 + ${d2}^2 - 2(${d1})(${d2})\\cos(${angC}^\\circ)$. Calculando la raíz. <br>
    P3: (a) $c^2 = ${s1}^2 + ${s2}^2 - 2(${s1})(${s2})\\cos(${angBetween}^\\circ)$</div>`;

    return [Pregunta, Solucion];
}

/* 
Fuente original: [71].pdf
El módulo cubre los subtemas 3.3 (Regla del seno, coseno y área de un triángulo)
El tiempo estimado para el estudiante es de 40 minutos.
*/