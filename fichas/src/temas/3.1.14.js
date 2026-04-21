import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Geometría Analítica en el Espacio: Volumen y Superficie';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // --- Problema 1: Prisma Rectangular (Parametrizado) ---
    let x1 = Math.floor(Math.random() * 4) + 2;
    let y1 = Math.floor(Math.random() * 4) + 2;
    let z1 = Math.floor(Math.random() * 4) + 2;
    
    let Pregunta = `<div class="problema2">1.- Considere un prisma rectangular con un vértice en el origen $(0,0,0)$ y dimensiones alineadas con los ejes coordenados. El vértice opuesto se encuentra en el punto $P(${x1}, ${y1}, ${z1})$.
    <ol class="FT_ol_a">
        <li>Determine el volumen del prisma. <div>2</div></li>${CR(1)}
        <li>Calcule el área de la superficie total del prisma. <div>3</div></li>${CR(2)}
    </ol></div>`;

    let vol = x1 * y1 * z1;
    let area = 2 * (x1 * y1 + x1 * z1 + y1 * z1);
    let Solucion = `<div class="ans"><b>P1:</b> (1a) $V = ${vol}$ unidades cúbicas. (1b) $A = ${area}$ unidades cuadradas.</div><br>`;

    // --- Problema 2: Esfera (Parametrizado) ---
    let cx = Math.floor(Math.random() * 6) - 3;
    let cy = Math.floor(Math.random() * 6) - 3;
    let cz = Math.floor(Math.random() * 6) - 3;
    let r = Math.floor(Math.random() * 4) + 2;

    Pregunta += `<div class="problema2">2.- Una esfera tiene su centro en el punto $C(${cx}, ${cy}, ${cz})$ y un radio de $r = ${r}$ unidades.
    <ol class="FT_ol_a">
        <li>Escriba la ecuación de la esfera. <div>2</div></li>${CR(1)}
        <li>Calcule el volumen exacto de la esfera en función de $\\pi$. <div>2</div></li>${CR(1)}
        <li>Determine el área de la superficie de la esfera. <div>2</div></li>${CR(2)}
    </ol></div>`;

    let volEsfera = ((4 / 3) * Math.pow(r, 3)).toFixed(1);
    let areaEsfera = (4 * Math.pow(r, 2));
    Solucion += `<div class="ans"><b>P2:</b> (2a) $(x-${cx})^2 + (y-${cy})^2 + (z-${cz})^2 = ${r*r}$ (2b) $V = \\frac{4}{3}\\pi(${r})^3 = ${volEsfera}\\pi$ (2c) $A = 4\\pi(${r})^2 = ${areaEsfera}\\pi$</div><br>`;

    // --- Problema 3: Pirámide (Distancia y punto medio) ---
    let b = Math.floor(Math.random() * 4) + 3;
    let h = Math.floor(Math.random() * 4) + 4;
    
    Pregunta += `<div class="problema2">3.- Una pirámide de base cuadrada tiene sus vértices en la base en $(0,0,0), (${b},0,0), (${b},${b},0)$ y $(0,${b},0)$. El vértice superior (ápice) está en $(\\frac{${b}}{2}, \\frac{${b}}{2}, ${h})$.
    <ol class="FT_ol_a">
        <li>Verifique que el ápice está centrado respecto a la base. <div>1</div></li>${CR(1)}
        <li>Calcule el volumen de la pirámide. <div>2</div></li>${CR(1)}
        <li>Halle la longitud de la arista lateral (desde el origen hasta el ápice). <div>2</div></li>${CR(2)}
    </ol></div>`;

    let volPiramide = (1/3) * (b * b) * h;
    let dist = Math.sqrt(Math.pow(b/2, 2) + Math.pow(b/2, 2) + Math.pow(h, 2)).toFixed(2);
    Solucion += `<div class="ans"><b>P3:</b> (3b) $V = \\frac{1}{3} \\cdot ${b*b} \\cdot ${h} = ${volPiramide}$ (3c) $d = \\sqrt{(${b/2})^2 + (${b/2})^2 + ${h}^2} \\approx ${dist}$</div>`;

    return [Pregunta, Solucion];
}