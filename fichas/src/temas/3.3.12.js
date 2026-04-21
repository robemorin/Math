import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Trigonometría en Triángulos No Rectángulos';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Generación de parámetros aleatorios para el problema 1 (Regla del seno)
    let angA = 52;
    let angB = 43;
    let sideA = 8;
    // x / sen(52) = 8 / sen(43) -> x = 8 * sen(52) / sen(43)
    let x_val = (sideA * Math.sin(angA * Math.PI / 180) / Math.sin(angB * Math.PI / 180)).toFixed(2);

    // Generación para problema 2 (Elevación)
    let alt = 30; // 30m hacia el árbol
    let ang1 = 42 * Math.PI / 180;
    let ang2 = 60 * Math.PI / 180;
    // h/tan(42) = 30 + h/tan(60) -> h(1/tan(42) - 1/tan(60)) = 30
    let h = (30 / (1 / Math.tan(ang1) - 1 / Math.tan(ang2))).toFixed(2);

    let Pregunta = `<div class="problema2">
    <h3>Práctica de Trigonometría (Fuente original: [69].pdf)</h3>
    <p>Resuelva los siguientes problemas utilizando las herramientas de trigonometría (ley del seno, ley del coseno y área de triángulos).</p>
    
    <ol class="FT_ol_a">
        <li><b>Aplicación de la Ley del Seno:</b> Dado un triángulo con un lado de $${sideA} \\text{ cm}$, un ángulo opuesto de $${angA}^\\circ$ y otro ángulo adyacente de $${angB}^\\circ$. Halle la longitud del lado $x$ opuesto al ángulo de $${angB}^\\circ$. <div>4</div></li>${CR(4)}
        
        <li><b>Área de un triángulo:</b> Considere un triángulo con lados de $9 \\text{ cm}$ y $12 \\text{ cm}$ que forman un ángulo entre ellos. Si el ángulo mide $${40 + Math.floor(Math.random()*40)}^\\circ$, calcule el área del triángulo. <div>3</div></li>${CR(4)}
        
        <li><b>Problema de elevación:</b> Desde un punto A, el ángulo de elevación a la copa de un árbol es $${(42 + Math.floor(Math.random()*5))}^\\circ$. Al caminar $30 \\text{ m}$ hacia el árbol, el nuevo ángulo de elevación es $${(60 + Math.floor(Math.random()*5))}^\\circ$. Determine la altura del árbol. <div>6</div></li>${CR(6)}
        
        <li><b>Ley del Coseno:</b> Un triángulo tiene lados de longitud $8 \\text{ cm}$ y $7 \\text{ cm}$, y el ángulo entre ellos es $60^\\circ$.
            <ol>
                <li>Halle la longitud del tercer lado $x$. <div>3</div></li>${CR(3)}
                <li>Halle el área del triángulo. <div>2</div></li>${CR(3)}
            </ol>
        </li>
    </ol>
    </div>
    <div class="page"></div>`;

    let Solucion = `<div class="ans">
    <b>P1:</b> Usando la ley del seno: $\\frac{x}{\\sin(${angB}^\\circ)} = \\frac{8}{\\sin(${angA}^\\circ)} \\Rightarrow x = \\frac{8 \\cdot \\sin(${angB}^\\circ)}{\\sin(${angA}^\\circ)} \\approx ${x_val} \\text{ cm}$.<br><br>
    <b>P2:</b> Área $= \\frac{1}{2} ab \\sin(C) = \\frac{1}{2}(9)(12)\\sin(\\theta) \\approx 54 \\cdot \\sin(\\theta)$.<br><br>
    <b>P3:</b> Altura del árbol mediante sistema de ecuaciones trigonométricas: $h \\approx ${h} \\text{ m}$.<br><br>
    <b>P4:</b> (a) $x^2 = 8^2 + 7^2 - 2(8)(7)\\cos(60^\\circ) = 64 + 49 - 56 = 57 \\Rightarrow x = \\sqrt{57} \\approx 7.55 \\text{ cm}$. (b) Área $= \\frac{1}{2}(8)(7)\\sin(60^\\circ) \\approx 24.25 \\text{ cm}^2$.
    </div>`;

    return [Pregunta, Solucion];
}