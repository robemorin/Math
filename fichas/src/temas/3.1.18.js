import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Geometría Analítica y Espacial (IB NM)';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Generación dinámica de parámetros para la pirámide
    let a = Math.floor(Math.random() * 3) + 4; // Lado de la base
    let h = Math.floor(Math.random() * 3) + 5; // Altura
    
    // Problema 8: Fósiles (Contextualizado)
    let px = Math.floor(Math.random() * 5) + 2;
    let py = Math.floor(Math.random() * 4) + 5;
    let qx = Math.floor(Math.random() * 4) + 7;
    let qy = Math.floor(Math.random() * 3) + 2;
    let p_depth = 2.5;
    let q_depth = 2.9;

    let Pregunta = `<div class="problema2"><h3>1. Geometría en el Espacio (Pirámide)</h3>
    Una pirámide de base cuadrada tiene sus vértices en $O(0,0,0)$, $A(${a},0,0)$, $B(${a},${a},0)$ y $C(0,${a},0)$. El vértice $D$ se encuentra en $(${a/2},${a/2},${h})$.
    <ol class="FT_ol_a">
        <li>Determine el volumen de la pirámide. <div>2</div></li>${CR(2)}
        <li>Si $M$ es el punto medio de la arista $AB$, encuentre sus coordenadas. <div>1</div></li>${CR(1)}
        <li>Calcule la longitud del segmento $DM$. <div>2</div></li>${CR(1)}
    </ol></div><div class="page"></div>

    <div class="problema2"><h3>2. Análisis de Yacimiento Arqueológico</h3>
    En un sitio de excavación, los fósiles se encuentran bajo tierra. Las coordenadas en el plano son P(${px}, ${py}) y Q(${qx}, ${qy}) en metros. El fósil en P está a ${p_depth} m de profundidad y en Q a ${q_depth} m.
    <br><br>
    <center>
        <tlacuache-ejes size="300,300" xlim="0,12" ylim="0,12" dx="2" dy="2" xlabel="x (m)" ylabel="y (m)"></tlacuache-ejes>
    </center>
    <ol class="FT_ol_a">
        <li>Escriba las coordenadas 3D de los fósiles P y Q. <div>2</div></li>${CR(2)}
        <li>Calcule la distancia espacial entre ambos fósiles. <div>2</div></li>${CR(2)}
        <li>Determine el ángulo de depresión desde el punto P al punto Q. <div>3</div></li>${CR(3)}
    </ol></div>`;

    let v = (a * a * h) / 3;
    let mx = a;
    let my = a / 2;
    let mz = 0;
    let distDM = Math.sqrt(Math.pow(a/2 - a, 2) + Math.pow(a/2 - a/2, 2) + Math.pow(h - 0, 2));

    let Solucion = `<div class="ans"><b>Solución 1:</b> 
    (a) $V = \\frac{1}{3} \\cdot ${a*a} \\cdot ${h} = ${v} \\text{ u}^3$.
    (b) $M = (${a}, ${a/2}, 0)$.
    (c) $DM = \\sqrt{(${a/2}-${a})^2 + (${a/2}-${a/2})^2 + (${h}-0)^2} = \\sqrt{${Math.pow(-a/2, 2)} + 0 + ${h*h}} \\approx ${distDM.toFixed(2)}$.</div><br>
    
    <div class="ans"><b>Solución 2:</b> 
    (a) $P(${px}, ${py}, -${p_depth}), Q(${qx}, ${qy}, -${q_depth})$.
    (b) $d = \\sqrt{(${qx}-${px})^2 + (${qy}-${py})^2 + (${-q_depth} - (-${p_depth}))^2} \\approx ...$
    (c) Usar $\\tan(\\theta) = \\frac{\\Delta z}{\\text{dist horizontal}}$.</div>`;

    return [Pregunta, Solucion];
}

// Fuente original: [78].pdf - Ejercicios 5 y 8 adaptados para práctica de evaluación.