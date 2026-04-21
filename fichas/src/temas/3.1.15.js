import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

/**
 * Fuente original: [75].pdf
 * Ejercicio de Geometría 3D: Volumen y coordenadas (Pirámide rectangular)
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export function name() {
    return 'Geometría 3D: Pirámide en el Parque';
}

export async function pregunta() {
    // Parámetros aleatorios para la base (rectángulo)
    let w = (Math.floor(Math.random() * 4) + 6) * 10; // ancho (x)
    let h = (Math.floor(Math.random() * 4) + 6) * 10; // largo (y)
    let height = 15; // altura fija según problema original
    
    // Coordenadas base (A en origen, B en x, D en y, C en ambos)
    let A = [0, 0, 0];
    let B = [w, 0, 0];
    let D = [0, h, 0];
    let C = [w, h, 0];
    let Apex = [w/2, h/2, height];

    let Pregunta = `<div class="problema">
    <h3>Geometría 3D: Construcción de una carpa</h3>
    <p>Se desea construir una carpa con forma de pirámide rectangular sobre una base $ABCD$. La base se encuentra en el plano $Z=0$. El centro de la base es el punto medio entre $A$ y $C$. El vértice (ápice) de la carpa está situado directamente sobre el centro de la base a una altura de $${height}$ m.</p>
    
    <div class="row">
        <div class="col-6">
            <tlacuache-ejes size="300,300" xlabel="x (m)" ylabel="y (m)" xlim="0,${w+20}" ylim="0,${h+20}" dx="20" dy="20"></tlacuache-ejes>
        </div>
        <div class="col-6">
            <ol class="FT_ol_a">
                <li>Determine las coordenadas 3D de los vértices de la base $A, B, C, D$ y del ápice $V$. <div>3</div></li>${CR(2)}
                <li>Halle el volumen de aire dentro de la carpa. Recuerde: $V = \\frac{1}{3} \\cdot \\text{AreaBase} \\cdot \\text{altura}$. <div>2</div></li>${CR(2)}
                <li>Si se desea cubrir solo las caras laterales (excluyendo el suelo), calcule el área total de la lona necesaria. <div>4</div></li>${CR(3)}
            </ol>
        </div>
    </div>
    </div><div class="page"></div>`;

    // Cálculos para la solución
    let areaBase = w * h;
    let volumen = (1/3) * areaBase * height;
    
    // Cálculo de alturas de caras triangulares (apotemas)
    let h_face1 = Math.sqrt(Math.pow(h/2, 2) + Math.pow(height, 2));
    let h_face2 = Math.sqrt(Math.pow(w/2, 2) + Math.pow(height, 2));
    let areaLateral = (w * h_face1) + (h * h_face2);

    let Solucion = `<div class="ans"><b>Solución:</b>
    <br>(1) $A(${A.join(',')}), B(${B.join(',')}), C(${C.join(',')}), D(${D.join(',')}), V(${Apex.join(',')})$
    <br>(2) $Volumen = \\frac{1}{3} \\cdot (${w} \\cdot ${h}) \\cdot ${height} = ${volumen.toFixed(2)} \\text{ m}^3$
    <br>(3) Áreas laterales: $2 \\cdot (\\frac{1}{2} \\cdot ${w} \\cdot ${h_face1.toFixed(2)}) + 2 \\cdot (\\frac{1}{2} \\cdot ${h} \\cdot ${h_face2.toFixed(2)}) \\approx ${areaLateral.toFixed(2)} \\text{ m}^2$
    </div>`;

    return [Pregunta, Solucion];
}