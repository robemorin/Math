import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Distancia y Punto Medio en 3D";
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("3.1.21", "3. Geometría y trigonometría", "Ficha: Distancia y Punto Medio en 3D");

    // ==========================================
    // EJERCICIO 1: PUNTO MEDIO Y ÁNGULO DEL TRIÁNGULO (4 PUNTOS)
    // ==========================================
    const P = {
        x: Math.floor(Math.random() * 8) - 4, // -4 a 3
        y: Math.floor(Math.random() * 8) - 4,
        z: Math.floor(Math.random() * 8) - 4
    };

    const Q = {
        x: P.x + (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1),
        y: P.y + (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1),
        z: P.z + (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1)
    };

    const R = {
        x: Q.x + (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1),
        y: Q.y + (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1),
        z: Q.z + (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1)
    };

    const M = { x: (P.x + Q.x) / 2, y: (P.y + Q.y) / 2, z: (P.z + Q.z) / 2 };
    const N = { x: (Q.x + R.x) / 2, y: (Q.y + R.y) / 2, z: (Q.z + R.z) / 2 };

    const PQ_sq = (Q.x - P.x)**2 + (Q.y - P.y)**2 + (Q.z - P.z)**2;
    const QR_sq = (R.x - Q.x)**2 + (R.y - Q.y)**2 + (R.z - Q.z)**2;
    const PR_sq = (R.x - P.x)**2 + (R.y - P.y)**2 + (R.z - P.z)**2;

    const c = Math.sqrt(PQ_sq);
    const a = Math.sqrt(QR_sq);
    const b = Math.sqrt(PR_sq);

    const cosQ = (QR_sq + PQ_sq - PR_sq) / (2 * a * c);
    const cosQ_safe = Math.max(-1, Math.min(1, cosQ));
    const angQ = Math.acos(cosQ_safe) * 180 / Math.PI;

    html += `
    <div class="seccion-title">I. Puntos y Distancias</div>
    <div class="exercise-step">
        <div class="contexto-especial"><strong>Instrucción para el alumno:</strong> Lea los siguientes enunciados, plantee las fórmulas algebraicas de geometría tridimensional y resuelva con orden y claridad.</div>
        <p><strong>1.</strong> Tres puntos en el espacio tridimensional están definidos por las coordenadas $P(${P.x}, ${P.y}, ${P.z})$, $Q(${Q.x}, ${Q.y}, ${Q.z})$ y $R(${R.x}, ${R.y}, ${R.z})$.</p>
        <ol class="FT_ol_a">
            <li>Halle las coordenadas de los puntos medios $M$ y $N$ de los segmentos $[PQ]$ y $[QR]$ respectivamente. <span class="mark">2</span><tlacuache-renglon n="6" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Determine la medida del ángulo $\\angle PQR$ en el vértice $Q$, justificando los cálculos de las distancias intermedias necesarias. <span class="mark">2</span><tlacuache-renglon n="9" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 3.1.21:</b><br><br>
        <b>1.</b><br>
        <b>a) Coordenadas de los puntos medios $M$ y $N$ [2 puntos]:</b><br>
        * $M$ es el punto medio del segmento $[PQ]$:<br>
        $M = \\left( \\frac{${P.x} + ${Q.x}}{2}, \\frac{${P.y} + ${Q.y}}{2}, \\frac{${P.z} + ${Q.z}}{2} \\right) = \\mathbf{(${M.x}, ${M.y}, ${M.z})}$ [1 punto]<br>
        * $N$ es el punto medio del segmento $[QR]$:<br>
        $N = \\left( \\frac{${Q.x} + ${R.x}}{2}, \\frac{${Q.y} + ${R.y}}{2}, \\frac{${Q.z} + ${R.z}}{2} \\right) = \\mathbf{(${N.x}, ${N.y}, ${N.z})}$ [1 punto]<br><br>
        
        <b>b) Medida del ángulo $\\angle PQR$ en el vértice $Q$ [2 puntos]:</b><br>
        * Distancias:<br>
        $PQ = \\sqrt{(${Q.x} - ${P.x})^2 + (${Q.y} - ${P.y})^2 + (${Q.z} - ${P.z})^2} = \\sqrt{${PQ_sq}} \\approx ${c.toFixed(3)}$<br>
        $QR = \\sqrt{(${R.x} - ${Q.x})^2 + (${R.y} - ${Q.y})^2 + (${R.z} - ${Q.z})^2} = \\sqrt{${QR_sq}} \\approx ${a.toFixed(3)}$<br>
        $PR = \\sqrt{(${R.x} - ${P.x})^2 + (${R.y} - ${P.y})^2 + (${R.z} - ${P.z})^2} = \\sqrt{${PR_sq}} \\approx ${b.toFixed(3)}$ [1 punto]<br>
        * Ley del Coseno:<br>
        $\\cos(\\angle PQR) = \\frac{PQ^2 + QR^2 - PR^2}{2 \\cdot PQ \\cdot QR} = \\frac{${PQ_sq} + ${QR_sq} - ${PR_sq}}{2 \\cdot ${c.toFixed(2)} \\cdot ${a.toFixed(2)}} = \\frac{${PQ_sq + QR_sq - PR_sq}}{${(2 * a * c).toFixed(2)}} \\approx ${cosQ.toFixed(4)}$<br>
        $\\angle PQR = \\arccos(${cosQ.toFixed(4)}) \\approx \\mathbf{${angQ.toFixed(1)}^\\circ}$ [1 punto]<br><br>
    `;

    // ==========================================
    // EJERCICIO 2: ECUACIÓN DE DISTANCIA Y VALOR ADMISIBLE (6 PUNTOS)
    // ==========================================
    const cuaternas = [
        { dy: 3, dz: 6, dist: 7, dx: 2 },
        { dy: 4, dz: 12, dist: 13, dx: 3 },
        { dy: 2, dz: 2, dist: 3, dx: 1 }
    ];

    const seleccion = cuaternas[Math.floor(Math.random() * cuaternas.length)];
    
    const A_coord = {
        x: Math.floor(Math.random() * 8) - 4,
        y: Math.floor(Math.random() * 8) - 4,
        z: Math.floor(Math.random() * 8) - 4
    };

    const signY = Math.random() > 0.5 ? 1 : -1;
    const signZ = Math.random() > 0.5 ? 1 : -1;

    const B_y = A_coord.y + signY * seleccion.dy;
    const B_z = A_coord.z + signZ * seleccion.dz;

    const D_min_sq = seleccion.dy**2 + seleccion.dz**2;
    const D_min = Math.sqrt(D_min_sq);

    const k1 = A_coord.x + seleccion.dx;
    const k2 = A_coord.x - seleccion.dx;

    html += `
    <div class="seccion-title">II. Ecuación de Distancia Parametrizada</div>
    <div class="exercise-step">
        <p><strong>2.</strong> Considere el punto fijo $A(${A_coord.x}, ${A_coord.y}, ${A_coord.z})$ y el punto $B(k, ${B_y}, ${B_z})$, cuya coordenada en el eje $x$ está expresada en términos de un parámetro real $k$.</p>
        <ol class="FT_ol_a">
            <li>Halle el valor mínimo admisible que puede tomar la distancia entre los puntos $A$ y $B$ para que exista al menos una solución real para el parámetro $k$. <span class="mark">2</span><tlacuache-renglon n="7" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Sabiendo que la distancia entre $A$ y $B$ es de $${seleccion.dist}$ unidades, calcule los dos posibles valores reales del parámetro $k$. <span class="mark">4</span><tlacuache-renglon n="9" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div><div class="page-break"></div>
    `;

    solucion += `
        <b>2.</b><br>
        <b>a) Valor mínimo admisible de la distancia [2 puntos]:</b><br>
        * Distancia en términos de $k$:<br>
        $D(k) = \\sqrt{(k - (${A_coord.x}))^2 + (${B_y} - (${A_coord.y}))^2 + (${B_z} - (${A_coord.z}))^2}$<br>
        $D(k) = \\sqrt{(k - (${A_coord.x}))^2 + ${seleccion.dy**2} + ${seleccion.dz**2}} = \\sqrt{(k - (${A_coord.x}))^2 + ${D_min_sq}}$ [1 punto]<br>
        * El valor mínimo ocurre cuando $(k - (${A_coord.x}))^2 = 0$, es decir, cuando $k = ${A_coord.x}$.<br>
        $D_{\\text{min}} = \\sqrt{${D_min_sq}} = \\mathbf{${D_min.toFixed(2)}}$ (o de forma exacta: $\\sqrt{${D_min_sq}}$). [1 punto]<br><br>

        <b>b) Hallar los posibles valores de $k$ para $D = ${seleccion.dist}$ [4 puntos]:</b><br>
        * Plantear ecuación: $(k - (${A_coord.x}))^2 + ${D_min_sq} = ${seleccion.dist}^2$ [1 punto]<br>
        * Despejar el término con $k$:<br>
        $(k - (${A_coord.x}))^2 = ${seleccion.dist * seleccion.dist} - ${D_min_sq} = ${seleccion.dx * seleccion.dx}$ [1 punto]<br>
        * Obtener soluciones aplicando la raíz:<br>
        $k - (${A_coord.x}) = \\pm ${seleccion.dx}$ [1 punto]<br>
        $k_1 = ${A_coord.x} + ${seleccion.dx} = \\mathbf{${k1}}$ y $k_2 = ${A_coord.x} - ${seleccion.dx} = \\mathbf{${k2}}$ [1 punto]
    </div>
    `;

    return [html, solucion];
}
