import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Puntos en el espacio: Coordenadas y Distancias';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Generación de puntos aleatorios para el espacio 3D
    const p1 = [Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5];
    const p2 = [Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5];
    
    // Distancia al cuadrado para evitar raíces complejas al estudiante
    let distSq = Math.pow(p2[0]-p1[0], 2) + Math.pow(p2[1]-p1[1], 2) + Math.pow(p2[2]-p1[2], 2);
    let dist = Math.sqrt(distSq).toFixed(2);

    let Pregunta = `<div class="problema2">
    <h3>Evaluación: Puntos en el espacio (Capítulo 9)</h3>
    <p>Considere los puntos A $(${p1[0]}, ${p1[1]}, ${p1[2]})$ y B $(${p2[0]}, ${p2[1]}, ${p2[2]})$ en el espacio tridimensional.</p>
    <ol class="FT_ol_a">
        <li>Represente aproximadamente los puntos A y B en el sistema de ejes coordenados 3D proporcionado. <div>3</div></li>
        <center><div id="ggb_space" style="width: 400px; height: 350px;"></div></center>${CR(2)}
        <li>Calcule la distancia exacta entre los puntos A y B. <div>2</div></li>${CR(2)}
        <li>Determine el punto medio M del segmento AB. <div>2</div></li>${CR(2)}
        <li>Si un punto P se desplaza desde A hacia B siguiendo una línea recta, ¿cuál es el vector de traslación $\\vec{AB}$? <div>2</div></li>${CR(2)}
    </ol></div><div class="page"></div>`;

    let Solucion = `<div class="ans"><b>Solucionario:</b><br>
    (2) Distancia $d = \\sqrt{(${p2[0]}-${p1[0]})^2 + (${p2[1]}-${p1[1]})^2 + (${p2[2]}-${p1[2]})^2} = \\sqrt{${distSq}} \\approx ${dist}$<br>
    (3) Punto Medio $M = \\left( \\frac{${p1[0]}+${p2[0]}}{2}, \\frac{${p1[1]}+${p2[1]}}{2}, \\frac{${p1[2]}+${p2[2]}}{2} \\right) = (${(p1[0]+p2[0])/2}, ${(p1[1]+p2[1])/2}, ${(p1[2]+p2[2])/2})$<br>
    (4) Vector $\\vec{AB} = (${p2[0]-p1[0]}, ${p2[1]-p1[1]}, ${p2[2]-p1[2]})$
    </div>`;

    return [Pregunta, Solucion];
}

// Renderizado de Geogebra para visualización 3D básica
export async function renderGeoGebra(container, totalElements) {
    const material_id = "w9m8g5p2"; // ID genérico para visor 3D
    const params = {
        appName: '3d',
        width: 400,
        height: 350,
        material_id: material_id,
        showToolBar: false,
        showAlgebraInput: false,
        appletOnLoad(api) {
            api.evalCommand("A = (${p1[0]}, ${p1[1]}, ${p1[2]})");
            api.evalCommand("B = (${p2[0]}, ${p2[1]}, ${p2[2]})");
            api.evalCommand("Segmento(A, B)");
        }
    };
    // Nota: El contenedor debe existir en el DOM al renderizar
    new GGBApplet(params, true).inject('ggb_space');
}