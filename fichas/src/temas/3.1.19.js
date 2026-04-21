import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Geometría en el Espacio: 3D';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // --- Problema 1: Distancia y punto medio ---
    let x1 = Math.floor(Math.random() * 6) - 3;
    let y1 = Math.floor(Math.random() * 6) - 3;
    let z1 = Math.floor(Math.random() * 6) - 3;
    let x2 = Math.floor(Math.random() * 6) - 3;
    let y2 = Math.floor(Math.random() * 6) - 3;
    let z2 = Math.floor(Math.random() * 6) - 3;
    
    let dist = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2) + Math.pow(z2-z1, 2)).toFixed(2);
    let mx = (x1+x2)/2;
    let my = (y1+y2)/2;
    let mz = (z1+z2)/2;

    let Pregunta = `<div class="problema2">
    <h3>1. Geometría Analítica en 3D</h3>
    Dados los puntos $A(${x1}, ${y1}, ${z1})$ y $B(${x2}, ${y2}, ${z2})$:
    <ol class="FT_ol_a">
        <li>Halle la distancia exacta entre $A$ y $B$. <div>2</div></li>${CR(2)}
        <li>Determine las coordenadas del punto medio del segmento $[AB]$. <div>2</div></li>${CR(2)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (1a) $d = \\sqrt{(${x2}-${x1})^2 + (${y2}-${y1})^2 + (${z2}-${z1})^2} = ${dist}$ (1b) $M = (${mx}, ${my}, ${mz})$</div><br>`;

    // --- Problema 2: Esfera ---
    let cx = Math.floor(Math.random() * 5) - 2;
    let cy = Math.floor(Math.random() * 5) - 2;
    let cz = Math.floor(Math.random() * 5) - 2;
    let r = Math.floor(Math.random() * 4) + 2;
    
    Pregunta += `<div class="problema2">
    <h3>2. Geometría de la Esfera</h3>
    Una esfera tiene su centro en $C(${cx}, ${cy}, ${cz})$ y un radio de $r = ${r}$ unidades.
    <ol class="FT_ol_a">
        <li>Halle el volumen de la esfera (use $\\pi \\approx 3.14$). <div>2</div></li>${CR(2)}
        <li>Halle el área superficial de la esfera. <div>2</div></li>${CR(2)}
    </ol></div>`;

    let vol = (4/3 * Math.PI * Math.pow(r, 3)).toFixed(2);
    let area = (4 * Math.PI * Math.pow(r, 2)).toFixed(2);
    Solucion += `<div class="ans"><b>P2:</b> (2a) $V = \\frac{4}{3}\\pi r^3 \\approx ${vol}$ (2b) $A = 4\\pi r^2 \\approx ${area}$</div><br>`;

    // --- Problema 3: Aplicación (Coordenadas y distancia) ---
    // Contexto similar al ejercicio 7 del PDF
    let hx = Math.floor(Math.random() * 4) + 1;
    let hy = Math.floor(Math.random() * 4) + 1;
    let hz = 0.2; // 200m
    let mx_coord = Math.floor(Math.random() * 4) - 2;
    let my_coord = Math.floor(Math.random() * 4) - 2;
    let mz_coord = 0.5; // 500m

    Pregunta += `<div class="problema2">
    <h3>3. Modelización en el terreno</h3>
    Un senderista se encuentra en el punto $H(${hx}, ${hy}, ${hz})$ (en km). Observa la cima de una montaña en $M(${mx_coord}, ${my_coord}, ${mz_coord})$.
    <ol class="FT_ol_a">
        <li>Calcule la distancia horizontal entre el senderista y la montaña. <div>2</div></li>${CR(2)}
        <li>Calcule la distancia recta (lineal) entre el senderista y la cima de la montaña. <div>3</div></li>${CR(2)}
    </ol></div><div class="page"></div>`;

    let dist_horiz = Math.sqrt(Math.pow(mx_coord-hx, 2) + Math.pow(my_coord-hy, 2)).toFixed(2);
    let dist_total = Math.sqrt(Math.pow(mx_coord-hx, 2) + Math.pow(my_coord-hy, 2) + Math.pow(mz_coord-hz, 2)).toFixed(2);

    Solucion += `<div class="ans"><b>P3:</b> (3a) $d_{horiz} = ${dist_horiz}$ km (3b) $d_{total} = ${dist_total}$ km</div>`;

    return [Pregunta, Solucion];
}