<ref_base>
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Trigonometría en cuerpos 3D';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Ejercicios basados en la fuente original: [50].pdf (Capítulo 7)
    
    // Problema 1: Prisma rectangular (Dimensiones aleatorias)
    let largo = Math.floor(Math.random() * 8) + 10;
    let ancho = Math.floor(Math.random() * 5) + 5;
    let alto = Math.floor(Math.random() * 3) + 4;
    
    // Diagonal de la base
    let diag_base = Math.sqrt(largo**2 + ancho**2);
    // Ángulo de elevación
    let angulo = (Math.atan(alto / diag_base) * 180 / Math.PI).toFixed(1);

    let Pregunta = `<div class="problema2">
    <h3>1.- Trigonometría en prismas rectangulares</h3>
    <p>Un prisma rectangular tiene dimensiones de ${largo} cm de largo, ${ancho} cm de ancho y ${alto} cm de alto. Sea $\\theta$ el ángulo entre la diagonal espacial y la base del prisma.</p>
    <ol class="FT_ol_a">
        <li>Dibuje el prisma e indique con una línea gruesa la diagonal espacial y el ángulo $\\theta$. <div>2</div></li>${CR(3)}
        <li>Calcule la longitud de la diagonal de la base. <div>2</div></li>${CR(2)}
        <li>Determine el valor del ángulo $\\theta$. <div>3</div></li>${CR(2)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (2) $\\sqrt{${largo}^2 + ${ancho}^2} = \\sqrt{${largo**2 + ancho**2}} \\approx ${(diag_base).toFixed(2)}$ cm. (3) $\\tan(\\theta) = \\frac{${alto}}{${diag_base.toFixed(2)}} \\Rightarrow \\theta \\approx ${angulo}^{\\circ}$</div><br>`;

    // Problema 2: El Cono (Ejemplo 19 del PDF)
    let radio = Math.floor(Math.random() * 5) + 10;
    let angulo_v = 40;
    let altura_c = (radio / Math.tan((angulo_v/2) * Math.PI / 180)).toFixed(2);
    let volumen = ( (1/3) * Math.PI * Math.pow(radio, 2) * altura_c / 1000 ).toFixed(3);

    Pregunta += `<div class="problema2">
    <h3>2.- Aplicaciones en conos</h3>
    <p>Un cono tiene un ángulo vertical de $${angulo_v}^{\\circ}$ y un radio de base de $${radio}$ cm.</p>
    <ol class="FT_ol_a">
        <li>Halle la altura del cono. <div>3</div></li>${CR(2)}
        <li>Calcule la capacidad del cono en litros ($1000 \\text{ cm}^3 = 1 \\text{ litro}$). <div>3</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> (1) $\\text{altura} = \\frac{${radio}}{\\tan(${angulo_v/2}^{\\circ})} = ${altura_c}$ cm. (2) $V = \\frac{1}{3}\\pi(${radio})^2(${altura_c}) \\approx ${volumen}$ litros.</div><br>`;

    // Problema 3: Cubo (Ejemplo 17 del PDF)
    let lado = Math.floor(Math.random() * 5) + 8;
    let diag_cara = Math.sqrt(2 * lado**2).toFixed(2);
    let diag_cubo = Math.sqrt(3 * lado**2).toFixed(2);

    Pregunta += `<div class="problema2">
    <h3>3.- Geometría en cubos</h3>
    <p>Un cubo tiene aristas de longitud $${lado}$ cm. Sea $D$ el vértice inferior izquierdo y $F$ el vértice superior opuesto.</p>
    <ol class="FT_ol_a">
        <li>Halle la longitud de la diagonal de una de las caras. <div>2</div></li>${CR(2)}
        <li>Halle la longitud de la diagonal espacial (de $D$ a $F$). <div>2</div></li>${CR(2)}
    </ol></div><div class="page"></div>`;

    Solucion += `<div class="ans"><b>P3:</b> (1) $d = \\sqrt{${lado}^2 + ${lado}^2} = ${diag_cara}$ cm. (2) $d = \\sqrt{${lado}^2 + ${lado}^2 + ${lado}^2} = ${diag_cubo}$ cm.</div>`;

    return [Pregunta, Solucion];
}
</ref_base>