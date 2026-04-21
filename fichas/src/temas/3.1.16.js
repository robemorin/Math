<ref_base>
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Geometría en el Espacio 3D - Vectores y Planos';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Generación dinámica de parámetros para un prisma rectangular
    // Fuente original: [76].pdf
    let l = Math.floor(Math.random() * 3) + 3; // Largo X
    let w = Math.floor(Math.random() * 3) + 3; // Ancho Y
    let h = Math.floor(Math.random() * 3) + 3; // Altura Z
    
    // Coordenadas
    let A = [0, 0, 0];
    let B = [l, 0, 0];
    let C = [l, w, 0];
    let D = [0, w, h]; // Vértice elevado para representar un punto arbitrario
    let E = [0, 0, h];

    let Pregunta = `<div class="problema2"><h3>Práctica: Geometría Analítica en el Espacio (3D)</h3>
    <p>Considere un prisma rectangular ubicado en un sistema de coordenadas 3D. Los vértices de la base son $A(${A[0]},${A[1]},${A[2]})$, $B(${B[0]},${B[1]},${B[2]})$, $C(${C[0]},${C[1]},${C[2]})$. El vértice superior sobre el origen es $E(${E[0]},${E[1]},${E[2]})$.</p>
    
    <ol class="FT_ol_a">
        <li>Determine las coordenadas del punto medio $M$ del segmento $[AB]$. <div>2</div></li>${CR(2)}
        <li>Calcule la longitud del segmento $[AE]$. <div>2</div></li>${CR(2)}
        <li>Si el segmento $[AE]$ representa un cable, halle el ángulo de inclinación de dicho cable respecto al plano base $ABCO$ (plano $XY$). <div>3</div></li>${CR(3)}
        <li>Dado un punto $P(${D[0]}, ${D[1]}, ${D[2]})$, encuentre el vector $\\vec{AP}$. <div>2</div></li>${CR(2)}
        <li>Determine el vector unitario en la dirección de $\\vec{AP}$. <div>3</div></li>${CR(3)}
    </ol></div>`;

    // Lógica de soluciones
    let M = [l/2, 0, 0];
    let distAE = Math.sqrt(Math.pow(E[0]-A[0],2) + Math.pow(E[1]-A[1],2) + Math.pow(E[2]-A[2],2));
    let angulo = Math.atan(h / Math.sqrt(Math.pow(l,2) + Math.pow(w,2))) * (180/Math.PI);
    let vectorAP = [D[0]-A[0], D[1]-A[1], D[2]-A[2]];
    let modAP = Math.sqrt(vectorAP[0]**2 + vectorAP[1]**2 + vectorAP[2]**2);
    let unitAP = vectorAP.map(x => (x/modAP).toFixed(3));

    let Solucion = `<div class="ans"><b>Soluciones:</b><br>
    (1) $M = (${M[0]}, ${M[1]}, ${M[2]})$ <br>
    (2) $|AE| = ${distAE.toFixed(2)}$ <br>
    (3) $\\theta = \\arctan\\left(\\frac{${h}}{\\sqrt{${l}^2+${w}^2}}\\right) \\approx ${angulo.toFixed(2)}^\\circ$ <br>
    (4) $\\vec{AP} = \\begin{pmatrix} ${vectorAP[0]} \\\\ ${vectorAP[1]} \\\\ ${vectorAP[2]} \\end{pmatrix}$ <br>
    (5) $\\vec{u} = \\begin{pmatrix} ${unitAP[0]} \\\\ ${unitAP[1]} \\\\ ${unitAP[2]} \\end{pmatrix}$</div>`;

    return [Pregunta, Solucion];
}
</ref_base>