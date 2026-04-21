import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Módulo de práctica: Trigonometría en el espacio y proyecciones
 * Fuente original: [52].pdf, página 194
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export function name() {
    return 'Trigonometría: Proyecciones y Ángulos en el Espacio';
}

export async function pregunta() {
    // Parámetros dinámicos para los problemas
    let ladoL = Math.floor(Math.random() * 5) + 8; // Lado del cubo
    let altura = Math.floor(Math.random() * 4) + 6; // Altura de la pirámide

    let Pregunta = `<div class="problema2">
    <h3>Práctica: Trigonometría en el espacio</h3>
    <p>Utilice sus conocimientos sobre proyecciones y razones trigonométricas para resolver los siguientes problemas.</p>
    
    <div class="problema2">1.- Considere un cubo de arista ${ladoL} cm. Sean $A$ y $H$ vértices opuestos en una cara lateral, y $M$ el punto medio de la arista base.
    <ol class="FT_ol_a">
        <li>Dibuje la proyección del segmento $[AH]$ sobre la base del cubo. <div>2</div></li>${CR(2)}
        <li>Halle el ángulo formado entre el segmento $[AH]$ y la base del cubo. <div>3</div></li>${CR(3)}
        <li>Si se traza un segmento $[AM]$, calcule la longitud de dicho segmento. <div>3</div></li>${CR(4)}
    </ol></div>

    <div class="problema2">2.- En una pirámide de base cuadrada con altura ${altura} cm, el vértice superior es $X$ y el centro de la base es $P$. Si la distancia del centro $P$ a una de las aristas de la base $Q$ es de $6$ cm:
    <ol class="FT_ol_a">
        <li>Identifique la proyección del segmento $[XQ]$ sobre la base. <div>2</div></li>${CR(2)}
        <li>Calcule la medida del ángulo que forma el segmento $[XQ]$ con la base de la pirámide. <div>4</div></li>${CR(4)}
    </ol></div>
    
    <div class="page"></div>
    <div class="problema2">3.- Espacio para cálculos adicionales y diagramas:</div>${CR(12)}
    </div>`;

    // Lógica para soluciones (referenciales para el profesor)
    let angulo_AH = Math.atan(ladoL / ladoL) * (180 / Math.PI);
    let dist_AM = Math.sqrt(Math.pow(ladoL, 2) + Math.pow(ladoL / 2, 2));
    let angulo_XQ = Math.atan(altura / 6) * (180 / Math.PI);

    let Solucion = `<div class="ans"><b>Solucionario:</b>
    <br><b>P1:</b> (1a) La proyección es el segmento que une la base del vértice A con H en el plano base. 
    (1b) $\\theta = \\tan^{-1}(\\frac{${ladoL}}{${ladoL}}) = 45^\\circ$. 
    (1c) $AM = \\sqrt{${ladoL}^2 + (${ladoL}/2)^2} = \\sqrt{${(Math.pow(ladoL, 2) + Math.pow(ladoL / 2, 2)).toFixed(2)}} \\approx ${dist_AM.toFixed(2)}$ cm.
    <br><br><b>P2:</b> (2a) La proyección es el segmento $[PQ]$. 
    (2b) $\\theta = \\tan^{-1}(\\frac{${altura}}{6}) \\approx ${angulo_XQ.toFixed(2)}^\\circ$.
    </div>`;

    return [Pregunta, Solucion];
}

// Nota: Esta ficha está diseñada para imprimirse directamente. 
// Se recomienda usar un navegador con la opción "imprimir como PDF".