import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Geometría Analítica y Sólidos - Repaso';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta(globalIndex = 0) {
    // Generación dinámica de datos
    let p1_x1 = Math.floor(Math.random() * 10) - 5;
    let p1_y1 = Math.floor(Math.random() * 10) - 5;
    let p1_x2 = Math.floor(Math.random() * 10) - 5;
    let p1_y2 = Math.floor(Math.random() * 10) - 5;

    let A = [Math.floor(Math.random() * 6) - 3, Math.floor(Math.random() * 6) - 3, Math.floor(Math.random() * 6) - 3];
    let B = [Math.floor(Math.random() * 6) - 3, Math.floor(Math.random() * 6) - 3, Math.floor(Math.random() * 6) - 3];
    let C = [Math.floor(Math.random() * 6) - 3, Math.floor(Math.random() * 6) - 3, Math.floor(Math.random() * 6) - 3];

    let r_hemis = Math.floor(Math.random() * 5) + 3;

    let Pregunta = `<div class="problema">
    <h3>Ficha de Práctica: Geometría Analítica (Fuente original: [77].pdf)</h3>
    
    <div class="problema2">1.- Plano Cartesiano:
    <ol class="FT_ol_a">
        <li>Represente los puntos $P(${p1_x1}, ${p1_y1})$ y $Q(${p1_x2}, ${p1_y2})$ en el siguiente plano. <div>2</div></li>
        <center><tlacuache-ejes size="300,300" xlim="-6,6" ylim="-6,6" dx="1" dy="1"></tlacuache-ejes></center>
        <li>Calcule la distancia $PQ$ y el punto medio del segmento $PQ$. <div>3</div></li>${CR(2)}
    </ol></div>

    <div class="problema2">2.- Clasificación de Triángulos:
    Dados los puntos $A(${A.join(', ')})$, $B(${B.join(', ')})$ y $C(${C.join(', ')})$.
    <ol class="FT_ol_a">
        <li>Determine las longitudes de los lados $AB$, $BC$ y $AC$. <div>4</div></li>${CR(3)}
        <li>¿Qué tipo de triángulo es $ABC$ (escaleno, isósceles o equilátero)? Justifique su respuesta. <div>2</div></li>${CR(2)}
    </ol></div>

    <div class="problema2">3.- Geometría en 3D (Esfera/Hemisferio):
    Un hemisferio tiene un radio de $r = ${r_hemis}$ unidades.
    <ol class="FT_ol_a">
        <li>Calcule el volumen del hemisferio. <div>3</div></li>${CR(2)}
        <li>Calcule el área de la superficie total (incluyendo la base circular). <div>3</div></li>${CR(2)}
    </ol></div>
    </div>`;

    // Cálculos para el solucionario
    let dist = Math.sqrt(Math.pow(p1_x2 - p1_x1, 2) + Math.pow(p1_y2 - p1_y1, 2)).toFixed(2);
    let pm = `(${(p1_x1 + p1_x2)/2}, ${(p1_y1 + p1_y2)/2})`;
    
    let vol = ((2/3) * Math.PI * Math.pow(r_hemis, 3)).toFixed(2);
    let area = (3 * Math.PI * Math.pow(r_hemis, 2)).toFixed(2);

    let Solucion = `<div class="ans">
    <b>Solucionario:</b><br>
    P1: Distancia $\\approx ${dist}$, Punto medio $= ${pm}$<br>
    P2: Use la fórmula de distancia $d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}$ para comparar los tres segmentos.<br>
    P3: Volumen $= ${vol}$ unidades cúbicas; Área total $= ${area}$ unidades cuadradas.
    </div>`;

    return [Pregunta, Solucion];
}