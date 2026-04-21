import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

// Fuente original: [46].pdf
export function name() {
    return 'Trigonometría en Triángulos Rectángulos';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Problema 1: Cálculo de ángulo (seno/coseno/tangente)
    let sideA = Math.floor(Math.random() * 5) + 3;
    let sideB = Math.floor(Math.random() * 5) + 6;
    let angle = (Math.atan(sideA / sideB) * 180 / Math.PI).toFixed(1);

    let Pregunta = `<div class="problema2"><h3>1.- Trigonometría Básica</h3>
    Considere un triángulo rectángulo con catetos de longitud $${sideA}\\text{ cm}$ y $${sideB}\\text{ cm}$. 
    <ol class="FT_ol_a">
        <li>Halle la medida del ángulo opuesto al cateto de $${sideA}\\text{ cm}$ (redondee a 3 cifras significativas). <div>3</div></li>${CR(2)}
        <li>Halle la longitud de la hipotenusa. <div>2</div></li>${CR(2)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (1a) $\\tan(\\theta) = \\frac{${sideA}}{${sideB}} \\Rightarrow \\theta \\approx ${angle}^{\\circ}$ (1b) $c = \\sqrt{${sideA}^2 + ${sideB}^2} \\approx ${(Math.sqrt(sideA*sideA + sideB*sideB)).toFixed(3)}\\text{ cm}$</div><br>`;

    // Problema 2: Aplicación en rectángulo (contextualización)
    let largo = (Math.random() * 5 + 7).toFixed(1);
    let ancho = (Math.random() * 2 + 2).toFixed(1);
    let angulo_diag = (Math.atan(ancho / largo) * 180 / Math.PI).toFixed(1);

    Pregunta += `<div class="problema2"><h3>2.- Aplicación en Rectángulos</h3>
    Un terreno rectangular mide $${largo}\\text{ m}$ de largo por $${ancho}\\text{ m}$ de ancho.
    <ol class="FT_ol_a">
        <li>Determine el ángulo que forma la diagonal con el lado más largo. <div>3</div></li>${CR(2)}
        <li>Si se coloca una valla que recorre la diagonal del terreno, ¿cuántos metros de valla se necesitan? <div>2</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> (2a) $\\theta = \\tan^{-1}(\\frac{${ancho}}{${largo}}) \\approx ${angulo_diag}^{\\circ}$ (2b) $d = \\sqrt{${largo}^2 + ${ancho}^2} \\approx ${(Math.sqrt(largo*largo + ancho*ancho)).toFixed(2)}\\text{ m}$</div><br>`;

    // Problema 3: Rombo (Propiedades de diagonales)
    let d1 = 12; 
    let d2 = 8;
    let ang_mitad = (Math.atan((d2/2) / (d1/2)) * 180 / Math.PI).toFixed(2);
    let ang_total = (2 * ang_mitad).toFixed(1);

    Pregunta += `<div class="problema2"><h3>3.- Geometría del Rombo</h3>
    Un rombo tiene diagonales de longitudes $${d1}\\text{ cm}$ y $${d2}\\text{ cm}$. Sabiendo que las diagonales se cortan perpendicularmente en su punto medio:
    <ol class="FT_ol_a">
        <li>Calcule la medida del ángulo más pequeño del rombo. <div>4</div></li>${CR(3)}
        <li>Halle la longitud del lado del rombo. <div>3</div></li>${CR(3)}
    </ol></div><div class="page"></div>`;

    Solucion += `<div class="ans"><b>P3:</b> (3a) $\\tan(\\frac{\\alpha}{2}) = \\frac{${d2/2}}{${d1/2}} \\Rightarrow \\alpha \\approx ${ang_total}^{\\circ}$ (3b) $L = \\sqrt{6^2 + 4^2} \\approx 7.21\\text{ cm}$</div>`;

    return [Pregunta, Solucion];
}