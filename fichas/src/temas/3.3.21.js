import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Trigonometría y Geometría 3D (Sin Gráficos)";
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("3.3.21", "3. Geometría y trigonometría", "Ficha: Trigonometría y Geometría 3D (Sin Gráficos)");
    html += `<div class="contexto-especial" style="margin-bottom: 20px;"><b>Instrucciones:</b> Dibuja tus propios esquemas y resuelve cada ejercicio utilizando 3 cifras significativas.</div>`;

    // ======================================================
    // PROBLEMA 1 (Distancia 3D en habitación)
    // ======================================================
    const largo1 = (Math.floor(Math.random() * 5) + 6); // 6 a 10 m
    const ancho1 = (Math.floor(Math.random() * 4) + 4); // 4 a 7 m
    const alto1 = (Math.floor(Math.random() * 3) + 2.5).toFixed(1); // 2.5 a 4.5 m
    const altPers1 = (Math.floor(Math.random() * 4) * 0.1 + 1.5).toFixed(2); // 1.50 a 1.80 m
    
    const difAlto1 = (alto1 - altPers1).toFixed(2);
    const distSuelo1 = Math.sqrt(largo1*largo1 + ancho1*ancho1);
    const distCabezaAraña1 = Math.sqrt(distSuelo1*distSuelo1 + difAlto1*difAlto1);

    html += `
    <div class="seccion-title">I. Distancia en Habitación</div>
    <div class="exercise-step">
        <p>Una habitación rectangular tiene un largo de $${largo1}\\text{ m}$, un ancho de $${ancho1}\\text{ m}$ y una altura vertical de $${alto1}\\text{ m}$. Una araña se encuentra en una esquina superior del techo. Una persona que mide $${altPers1}\\text{ m}$ de altura está de pie en la esquina opuesta del suelo.</p>
        <ol class="FT_ol_a">
            <li>Calcula la distancia horizontal en el suelo entre la persona y la proyección vertical de la araña. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Determina la distancia en línea recta desde la cabeza de la persona hasta la araña en el techo. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 3.3.21:</b><br>
        <b>I.</b><br>
        a) Diagonal del suelo $d_{\\text{suelo}} = \\sqrt{${largo1}^2 + ${ancho1}^2} = \\mathbf{${distSuelo1.toFixed(2)}\\text{ m}}$<br>
        b) Altura de la araña respecto a la cabeza = $${alto1} - ${altPers1} = ${difAlto1}\\text{ m}$.<br>
           Distancia en línea recta = $\\sqrt{${distSuelo1.toFixed(3)}^2 + ${difAlto1}^2} = \\mathbf{${distCabezaAraña1.toFixed(2)}\\text{ m}}$<br>
    `;

    // ======================================================
    // PROBLEMA 2 (Rampa/Prisma triangular)
    // ======================================================
    const h2 = (Math.floor(Math.random() * 5) * 0.05 + 0.20).toFixed(2);
    const w2 = (Math.floor(Math.random() * 6) * 0.2 + 1.5).toFixed(1);
    const l2 = (Math.floor(Math.random() * 5) * 0.2 + 1.0).toFixed(1);
    
    const ce2 = Math.sqrt(w2*w2 + l2*l2);
    const cd2 = Math.sqrt(h2*h2 + ce2*ce2);
    const ang2 = Math.atan(h2 / ce2) * 180 / Math.PI;

    html += `
    <div class="seccion-title">II. Prisma Triangular Recto</div>
    <div class="exercise-step">
        <p>Una rampa metálica de acceso se construye en forma de prisma triangular recto. La altura vertical del prisma es de $${h2}\\text{ m}$, el ancho de su base rectangular de soporte es de $${w2}\\text{ m}$ y el largo del prisma es de $${l2}\\text{ m}$.</p>
        <ol class="FT_ol_a">
            <li>Halle la longitud de la diagonal de la base rectangular sobre el suelo. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule la longitud de la arista inclinada (diagonal mayor del prisma) y el ángulo de inclinación que forma con la base horizontal. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    `;

    solucion += `
        <br><b>II.</b><br>
        a) Diagonal de la base $d_{\\text{base}} = \\sqrt{${w2}^2 + ${l2}^2} = \\mathbf{${ce2.toFixed(2)}\\text{ m}}$<br>
        b) Arista inclinada (diagonal mayor) = $\\sqrt{${h2}^2 + ${ce2.toFixed(4)}^2} = \\mathbf{${cd2.toFixed(2)}\\text{ m}}$.<br>
           Ángulo de inclinación = $\\arctan\\left(\\frac{${h2}}{${ce2.toFixed(3)}}\\right) = \\mathbf{${ang2.toFixed(1)}^\\circ}$<br>
    `;

    // ======================================================
    // PROBLEMA 3 (Pirámide de base rectangular/cuadrada)
    // ======================================================
    const s3 = (Math.floor(Math.random() * 6) * 0.2 + 1.2).toFixed(1);
    const arista3 = (Math.floor(Math.random() * 6) * 0.3 + 2.5).toFixed(1);
    
    const diagBase3 = s3 * Math.sqrt(2);
    const semidiag3 = diagBase3 / 2;
    const hPyramid3 = Math.sqrt(arista3*arista3 - semidiag3*semidiag3);
    const angAristaBase3 = Math.acos(semidiag3 / arista3) * 180 / Math.PI;

    html += `
    <div class="seccion-title">III. Pirámide Recta</div>
    <div class="exercise-step">
        <p>Una pirámide recta tiene una base cuadrada de lado $s = ${s3}\\text{ m}$. La longitud de cada una de sus aristas laterales (desde el vértice superior a una esquina de la base) mide $${arista3}\\text{ m}$.</p>
        <ol class="FT_ol_a">
            <li>Halle la altura vertical de la pirámide. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Determine la medida del ángulo que forma una arista lateral con la diagonal de la base cuadrada. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    `;

    solucion += `
        <br><b>III.</b><br>
        a) Diagonal de la base $d = ${s3}\\sqrt{2} = ${diagBase3.toFixed(3)}\\text{ m}$, por lo tanto semidiagonal $d_m = ${semidiag3.toFixed(3)}\\text{ m}$.<br>
           Altura vertical $h = \\sqrt{${arista3}^2 - ${semidiag3.toFixed(3)}^2} = \\mathbf{${hPyramid3.toFixed(2)}\\text{ m}}$.<br>
        b) $\\cos(\\theta) = \\frac{${semidiag3.toFixed(3)}}{${arista3}} \\implies \\theta = \\mathbf{${angAristaBase3.toFixed(1)}^\\circ}$<br>
    `;

    // ======================================================
    // PROBLEMA 4 (Cono recto)
    // ======================================================
    const d4 = Math.floor(Math.random() * 5) * 2 + 8;
    const r4 = d4 / 2;
    const angDeg4 = Math.floor(Math.random() * 11) + 55;
    const angRad4 = angDeg4 * Math.PI / 180;
    
    const hCone4 = r4 * Math.tan(angRad4);
    const vol4 = (1/3) * Math.PI * (r4 * r4) * hCone4;

    html += `
    <div class="seccion-title">IV. Cono Recto</div>
    <div class="exercise-step">
        <p>Un sólido metálico tiene la forma de un cono circular recto. Se sabe que el diámetro de la base circular es de $${d4}\\text{ cm}$ y el ángulo de elevación de su superficie lateral (generatriz) respecto a su base es de $${angDeg4}^\\circ$.</p>
        <ol class="FT_ol_a">
            <li>Determine la altura vertical del cono. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule el volumen del sólido en centímetros cúbicos. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    `;

    solucion += `
        <br><b>IV.</b><br>
        a) Radio de la base $r = ${r4}\\text{ cm}$. Altura vertical $h = ${r4} \\tan(${angDeg4}^\\circ) = \\mathbf{${hCone4.toFixed(2)}\\text{ cm}}$.<br>
        b) Volumen $V = \\frac{1}{3} \\pi r^2 h = \\frac{1}{3} \\pi (${r4})^2 (${hCone4.toFixed(3)}) = ${vol4.toFixed(1)}\\text{ cm}^3 \\approx \\mathbf{${vol4.toFixed(0)}\\text{ cm}^3}$<br>
    `;

    // ======================================================
    // PROBLEMA 5 (Cometa y observadores)
    // ======================================================
    const cuerda5 = Math.floor(Math.random() * 11) + 30;
    const angElev5 = Math.floor(Math.random() * 11) + 35;
    const distObs5 = Math.floor(Math.random() * 16) + 50;
    
    const angRad5 = angElev5 * Math.PI / 180;
    const hKite5 = cuerda5 * Math.sin(angRad5);
    const distHorizKite5 = cuerda5 * Math.cos(angRad5);
    const distHorizTotal5 = distObs5 + distHorizKite5;
    const distObsKite5 = Math.sqrt(distHorizTotal5*distHorizTotal5 + hKite5*hKite5);
    const angElevObs5 = Math.atan(hKite5 / distHorizTotal5) * 180 / Math.PI;

    html += `
    <div class="seccion-title">V. Cometa y Observadores</div>
    <div class="exercise-step">
        <p>Rico está volando una cometa. Ha soltado $${cuerda5}\\text{ m}$ de cuerda y esta mantiene un ángulo de elevación constante de $${angElev5}^\\circ$. Su amigo Edward está situado en la misma línea, a una distancia de $${distObs5}\\text{ m}$ desde el punto de anclaje de la cometa, en la dirección opuesta a la que vuela la cometa.</p>
        <ol class="FT_ol_a">
            <li>Calcule la distancia en línea recta desde la posición de Edward hasta la cometa en el aire. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Determine la medida del ángulo de elevación de la cometa visto desde la posición de Edward. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `
        <br><b>V.</b><br>
        a) Altura de la cometa $h = ${cuerda5} \\sin(${angElev5}^\\circ) = ${hKite5.toFixed(2)}\\text{ m}$.<br>
           Dist. horizontal desde R a cometa = $${cuerda5} \\cos(${angElev5}^\\circ) = ${distHorizKite5.toFixed(2)}\\text{ m}$.<br>
           Dist. horizontal total Edward a cometa = $${distObs5} + ${distHorizKite5.toFixed(2)} = ${distHorizTotal5.toFixed(2)}\\text{ m}$.<br>
           Dist. en línea recta = $\\sqrt{${distHorizTotal5.toFixed(2)}^2 + ${hKite5.toFixed(2)}^2} = \\mathbf{${distObsKite5.toFixed(2)}\\text{ m}}$.<br>
        b) Ángulo de elevación = $\\arctan\\left(\\frac{${hKite5.toFixed(2)}}{${distHorizTotal5.toFixed(2)}}\\right) = \\mathbf{${angElevObs5.toFixed(1)}^\\circ}$
    </div>
    `;

    return [html, solucion];
}
