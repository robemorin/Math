import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Longitud de Arco y Perímetro de Sectores";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("3.1.23", "3. Geometría y trigonometría", "Ficha: Longitud de Arco y Perímetro de Sectores");

    // ==========================================
    // EJERCICIO 1 (CUARTILLA 1): LONGITUD DE ARCO, PERÍMETRO Y PROBLEMAS INVERSOS
    // ==========================================
    // Datos aleatorios para problema 1
    const r1 = Math.floor(Math.random() * 5) + 6; // 6 a 10 cm
    const theta1 = (Math.floor(Math.random() * 8) + 8) * 5; // 40° a 75°
    const l1 = (theta1 / 360) * 2 * Math.PI * r1;
    const perim1 = 2 * r1 + l1;

    // Datos para problema 2 (inverso: hallar radio dado el arco y ángulo)
    const theta2 = (Math.floor(Math.random() * 6) + 6) * 10; // 60° a 110°
    const l2 = parseFloat((Math.floor(Math.random() * 10) * 0.5 + 15).toFixed(1)); // 15.0 a 19.5 cm
    const r2 = (l2 * 360) / (2 * Math.PI * theta2);
    const perim2 = 2 * r2 + l2;

    // SVG para ilustrar el sector 1
    const angleRad = (theta1 * Math.PI) / 180;
    const svgR = 85;
    const cx = 110, cy = 110;
    const x2 = cx + svgR * Math.cos(angleRad);
    const y2 = cy - svgR * Math.sin(angleRad);
    const largeArcFlag = theta1 > 180 ? 1 : 0;

    html += `
    <div class="seccion-title">I. Longitud de Arco y Perímetro de Sectores Circulares</div>
    <div class="exercise-step">
        <p><strong>1.</strong> La siguiente figura muestra un sector circular de centro $O$, radio $r = ${r1}\\text{ cm}$ y ángulo central $\\theta = ${theta1}^\\circ$.</p>

        <div style="display:flex; justify-content:center; align-items:center; margin: 10px 0;">
            <svg width="220" height="130" viewBox="20 10 200 110" style="background:#fff;">
                <!-- Sector fill and border -->
                <path d="M ${cx} ${cy} L ${cx + svgR} ${cy} A ${svgR} ${svgR} 0 ${largeArcFlag} 0 ${x2} ${y2} Z" fill="#e8f0fe" stroke="#1a73e8" stroke-width="2"/>
                <!-- Angle arc -->
                <path d="M ${cx + 26} ${cy} A 26 26 0 0 0 ${cx + 26 * Math.cos(angleRad)} ${cy - 26 * Math.sin(angleRad)}" fill="none" stroke="#d93025" stroke-width="1.5"/>
                <!-- Labels -->
                <text x="${cx - 14}" y="${cy + 5}" font-family="sans-serif" font-size="13" font-weight="bold">O</text>
                <text x="${cx + 38}" y="${cy - 8}" font-family="sans-serif" font-size="11" fill="#d93025">${theta1}°</text>
                <text x="${cx + 35}" y="${cy + 16}" font-family="sans-serif" font-size="12">${r1} cm</text>
                <text x="${cx + svgR + 6}" y="${cy - 18}" font-family="sans-serif" font-size="12" fill="#1a73e8">s</text>
            </svg>
        </div>

        <ol class="FT_ol_a">
            <li>
                Halle la longitud del arco $s$. Dé su respuesta redondeada a tres cifras significativas. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Determine el perímetro total del sector circular. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>

        <p style="margin-top: 20px;"><strong>2.</strong> Un sector circular tiene un ángulo central de $${theta2}^\\circ$ y una longitud de arco de $${l2}\\text{ cm}$.</p>
        <ol class="FT_ol_a">
            <li>
                Demuestre que el radio $r$ del sector circular es aproximadamente $${r2.toFixed(2)}\\text{ cm}$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Calcule el perímetro total de dicho sector. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>
    `;

    // ==========================================
    // EJERCICIO 2 (CUARTILLA 2): FIGURAS COMPUESTAS Y CONTEXTO REAL (PISTA ATLÉTICA)
    // ==========================================
    // Pista de atletismo: dos tramos rectos de L metros y dos curvas semicirculares de diámetro d metros
    const L_recta = (Math.floor(Math.random() * 4) + 8) * 10; // 80, 90, 100, 110 metros
    const d_pista = Math.floor(Math.random() * 10) + 55; // 55 a 64 metros
    const perimCurvas = Math.PI * d_pista;
    const perimTotalPista = 2 * L_recta + perimCurvas;

    // Segunda parte: vuelta y velocidad del corredor
    const minPista = Math.floor(Math.random() * 2) + 1; // 1 o 2 min
    const segPista = (Math.floor(Math.random() * 6) + 3) * 5; // 15 a 40 s
    const tiempoTotalSeg = minPista * 60 + segPista;
    const velocidad = perimTotalPista / tiempoTotalSeg;

    html += `
    <div class="seccion-title">II. Perímetro de Regiones Compuestas y Modelación en Contexto Real</div>
    <div class="exercise-step">
        <p><strong>3.</strong> Una pista de atletismo escolar consta de dos tramos rectilíneos paralelos de longitud $L = ${L_recta}\\text{ m}$ unidos en sus extremos por dos curvas que forman semicírculos de diámetro interior $d = ${d_pista}\\text{ m}$, como se ilustra en el siguiente esquema:</p>

        <div style="display:flex; justify-content:center; margin: 10px 0;">
            <svg width="280" height="120" viewBox="0 0 280 120" style="background:#fff;">
                <!-- Straight segments -->
                <line x1="80" y1="20" x2="200" y2="20" stroke="#222" stroke-width="2"/>
                <line x1="80" y1="100" x2="200" y2="100" stroke="#222" stroke-width="2"/>
                <!-- Semi-circles -->
                <path d="M 80 20 A 40 40 0 0 0 80 100" fill="none" stroke="#222" stroke-width="2"/>
                <path d="M 200 20 A 40 40 0 0 1 200 100" fill="none" stroke="#222" stroke-width="2"/>
                <!-- Dashed diameter lines -->
                <line x1="80" y1="20" x2="80" y2="100" stroke="#999" stroke-dasharray="4"/>
                <line x1="200" y1="20" x2="200" y2="100" stroke="#999" stroke-dasharray="4"/>
                <!-- Labels -->
                <text x="130" y="15" font-family="sans-serif" font-size="12" text-anchor="middle">${L_recta} m</text>
                <text x="130" y="115" font-family="sans-serif" font-size="12" text-anchor="middle">${L_recta} m</text>
                <text x="85" y="65" font-family="sans-serif" font-size="11" fill="#555">d = ${d_pista} m</text>
                <text x="140" y="60" font-family="sans-serif" font-size="12" fill="#888" font-style="italic" text-anchor="middle">Interior</text>
            </svg>
        </div>

        <ol class="FT_ol_a">
            <li>
                Muestre que la distancia total recorrida por un atleta a lo largo de una vuelta completa por el borde interior de la pista es aproximadamente $${perimTotalPista.toFixed(1)}\\text{ m}$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Un corredor completa una vuelta en un tiempo de $${minPista}\\text{ min y } ${segPista}\\text{ s}$. Calcule su rapidez media en $\\text{m}\\cdot\\text{s}^{-1}$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>

        <p style="margin-top: 25px;"><strong>4.</strong> El diseño de una ventana de arco (estilo normando) consiste en un rectángulo coronado por un semicírculo. La base de la ventana mide $1.2\\text{ m}$ y la altura de la sección rectangular es de $1.8\\text{ m}$.</p>
        <ol class="FT_ol_a">
            <li>
                Halle el perímetro exterior del marco metálico de toda la ventana. Redondee su respuesta a dos cifras decimales. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>
    `;

    // Solucionario
    const perimVentana = 1.2 + 2 * 1.8 + Math.PI * 0.6;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 3.1.23 (Longitud de Arco y Perímetro de Sectores):</b><br><br>

        <b>1. Longitud de Arco y Perímetro Directo:</b><br>
        * a) $s = \\frac{\\theta}{360^\\circ} \\times 2\\pi r = \\frac{${theta1}}{360} \\times 2\\pi(${r1}) \\approx $ <b>${l1.toFixed(2)}\\text{ cm}</b> (o <b>${parseFloat(l1.toPrecision(3))}\\text{ cm}</b> a 3 c.s.).<br>
        * b) Perímetro $= 2r + s = 2(${r1}) + ${l1.toFixed(2)} = $ <b>${perim1.toFixed(2)}\\text{ cm}</b> (o <b>${parseFloat(perim1.toPrecision(3))}\\text{ cm}</b>).<br><br>

        <b>2. Problema Inverso de Radio:</b><br>
        * a) Ecuación: $s = \\frac{\\theta}{360} \\times 2\\pi r \\implies ${l2} = \\frac{${theta2}}{360} \\times 2\\pi r$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Despeje: $r = \\frac{${l2} \\times 360}{2\\pi \\times ${theta2}} \\approx $ <b>${r2.toFixed(2)}\\text{ cm}</b>.<br>
        * b) Perímetro $= 2r + s = 2(${r2.toFixed(2)}) + ${l2} \\approx $ <b>${perim2.toFixed(2)}\\text{ cm}</b>.<br><br>

        <b>3. Pista de Atletismo:</b><br>
        * a) Longitud de las dos curvas semicirculares $= 2 \\times \\left(\\frac{1}{2}\\pi d\\right) = \\pi d = \\pi(${d_pista}) \\approx ${(Math.PI * d_pista).toFixed(2)}\\text{ m}$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Perímetro total $= 2L + \\pi d = 2(${L_recta}) + ${(Math.PI * d_pista).toFixed(2)} = $ <b>${perimTotalPista.toFixed(1)}\\text{ m}</b>.<br>
        * b) Tiempo total en segundos $= ${minPista} \\times 60 + ${segPista} = ${tiempoTotalSeg}\\text{ s}$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Rapidez media $= \\frac{\\text{Distancia}}{\\text{Tiempo}} = \\frac{${perimTotalPista.toFixed(1)}}{${tiempoTotalSeg}} \\approx $ <b>${velocidad.toFixed(2)}\\text{ m}\\cdot\\text{s}^{-1}</b>.<br><br>

        <b>4. Ventana Normanda:</b><br>
        * a) Radio del semicírculo superior: $r = \\frac{1.2}{2} = 0.6\\text{ m}$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Arco semicircular: $s = \\pi r = 0.6\\pi \\approx ${(Math.PI * 0.6).toFixed(3)}\\text{ m}$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Perímetro exterior: $\\text{base} + 2\\times\\text{altura} + \\text{arco} = 1.2 + 2(1.8) + ${(Math.PI * 0.6).toFixed(3)} \\approx $ <b>${perimVentana.toFixed(2)}\\text{ m}</b>.
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
