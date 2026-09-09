import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Trigonometría Aplicada Contextualizada";
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("3.3.19", "3. Geometría y trigonometría", "Ficha: Trigonometría Aplicada Contextualizada");

    // ======================================================
    // PROBLEMA 1: EDIFICIO Y ASTA DE BANDERA
    // ======================================================
    const dist1 = Math.floor(Math.random() * 31) + 90; // 90 a 120 m
    const angEdificio1 = Math.floor(Math.random() * 5) + 26; // 26° a 30°
    const angAsta1 = angEdificio1 + Math.floor(Math.random() * 3) + 3; // +3° a 5°
    
    const hEdificio1 = (dist1 * Math.tan(angEdificio1 * Math.PI / 180)).toFixed(1);
    const hTotal1 = (dist1 * Math.tan(angAsta1 * Math.PI / 180)).toFixed(1);
    const hAsta1 = (parseFloat(hTotal1) - parseFloat(hEdificio1)).toFixed(1);
    const distVisual1 = (dist1 / Math.cos(angAsta1 * Math.PI / 180)).toFixed(1);

    const svg1 = `
    <svg width="220" height="180" style="overflow: visible;">
        <line x1="10" y1="160" x2="210" y2="160" stroke="black" stroke-width="1.5" />
        <rect x="170" y="70" width="35" height="90" fill="#f0f0f0" stroke="black" stroke-width="1.5" />
        <rect x="175" y="80" width="8" height="12" fill="gray" />
        <rect x="190" y="80" width="8" height="12" fill="gray" />
        <rect x="175" y="100" width="8" height="12" fill="gray" />
        <rect x="190" y="100" width="8" height="12" fill="gray" />
        <!-- Asta -->
        <line x1="187" y1="70" x2="187" y2="40" stroke="black" stroke-width="2" />
        <polygon points="187,40 197,45 187,50" fill="red" />
        <!-- Líneas visuales -->
        <line x1="30" y1="160" x2="187" y2="70" stroke="blue" stroke-dasharray="3,3" />
        <line x1="30" y1="160" x2="187" y2="40" stroke="red" stroke-dasharray="3,3" />
        <circle cx="30" cy="160" r="3" fill="black" />
        <text x="25" y="175" font-family="Arial" font-size="12" font-weight="bold">O</text>
        <!-- Ángulos -->
        <path d="M 50,160 A 20,20 0 0 0 47,150" fill="none" stroke="blue" stroke-width="1.2" />
        <text x="53" y="153" font-family="Arial" font-size="10" fill="blue">${angEdificio1}°</text>
        <path d="M 60,160 A 30,30 0 0 0 55,142" fill="none" stroke="red" stroke-width="1.2" />
        <text x="63" y="138" font-family="Arial" font-size="10" fill="red">${angAsta1}°</text>
        <text x="100" y="175" font-family="Arial" font-size="12" text-anchor="middle">${dist1} m</text>
    </svg>`;

    html += `
    <div class="seccion-title">I. Edificio y Asta de Bandera</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            [Contexto: Urbanismo] Un observador situado en un punto $O$, al nivel del suelo y a una distancia horizontal de $${dist1}\\text{ m}$ de la base de un edificio, mide los ángulos de elevación a la base y a la punta de un asta de bandera ubicada en la parte superior del edificio. El ángulo de elevación a la base del asta (techo del edificio) es de $${angEdificio1}^\\circ$, mientras que el ángulo de elevación a la punta del asta es de $${angAsta1}^\\circ$.
        </div>
        
        <div style="display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center; margin-top: 20px;">
            <div style="flex: 1; min-width: 280px;">
                <ol class="FT_ol_a">
                    <li>Calcule la altura del edificio. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
                    <li>Determine la altura total desde el suelo hasta la punta del asta de bandera. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
                    <li>Deduzca la longitud del asta de bandera. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                    <li>Halle la distancia en línea recta desde el punto $O$ hasta la punta del asta. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                </ol>
            </div>
            
            <div style="width: 240px; text-align: center;">
                ${svg1}
            </div>
        </div>
    </div><div class="page-break"></div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 3.3.19:</b><br>
        <b>I.</b><br>
        1a) $h = ${dist1} \\cdot \\tan ${angEdificio1}^\\circ \\approx ${hEdificio1}\\text{ m}$<br>
        1b) $H = ${dist1} \\cdot \\tan ${angAsta1}^\\circ \\approx ${hTotal1}\\text{ m}$<br>
        1c) $h_{\\text{asta}} = ${hTotal1} - ${hEdificio1} = ${hAsta1}\\text{ m}$<br>
        1d) Distancia visual: $d = \\frac{${dist1}}{\\cos ${angAsta1}^\\circ} \\approx ${distVisual1}\\text{ m}$<br>
    `;

    // ======================================================
    // PROBLEMA 2: EL TEJADO DE UNA CASA (PITCH)
    // ======================================================
    const anchoCasa2 = Math.floor(Math.random() * 5) + 12; // Ancho: 12 a 16 m
    const alero2 = 0.8; // Alero sobresaliente a cada lado
    const baseTejado2 = anchoCasa2 + 2 * alero2;
    const vigaTejado2 = (baseTejado2 / 2 + (Math.random() * 1.5 + 1.0)).toFixed(1); // Longitud viga
    
    // Inclinación
    const cosPitch2 = (baseTejado2 / 2) / parseFloat(vigaTejado2);
    const pitchRad2 = Math.acos(cosPitch2);
    const pitchDeg2 = (pitchRad2 * 180 / Math.PI).toFixed(1);
    const alturaTejado2 = (parseFloat(vigaTejado2) * Math.sin(pitchRad2)).toFixed(1);
    const soporteSugerido2 = (parseFloat(alturaTejado2) * 0.9).toFixed(1);

    const svg2 = `
    <svg width="220" height="150" style="overflow: visible;">
        <!-- Casa y Tejado -->
        <rect x="30" y="80" width="160" height="60" fill="none" stroke="black" stroke-dasharray="2,2" />
        <polygon points="15,80 110,35 205,80" fill="none" stroke="black" stroke-width="2" />
        <!-- Soporte central -->
        <line x1="110" y1="35" x2="110" y2="80" stroke="blue" stroke-dasharray="3,3" />
        <!-- Etiquetas de texto -->
        <text x="15" y="95" font-family="Arial" font-size="12" font-weight="bold">A</text>
        <text x="110" y="25" font-family="Arial" font-size="12" font-weight="bold">B</text>
        <text x="205" y="95" font-family="Arial" font-size="12" font-weight="bold">C</text>
        
        <text x="60" y="50" font-family="Arial" font-size="11" transform="rotate(-23, 60, 50)">${vigaTejado2} m</text>
        <line x1="30" y1="150" x2="190" y2="150" stroke="black" stroke-width="1" />
        <polygon points="30,150 35,147 35,153" fill="black" />
        <polygon points="190,150 185,147 185,153" fill="black" />
        <text x="110" y="145" font-family="Arial" font-size="11" text-anchor="middle">${anchoCasa2} m</text>
    </svg>`;

    html += `
    <div class="seccion-title">II. El Tejado de una Casa</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            [Contexto: Construcción] Un arquitecto diseña la estructura simétrica del tejado de una vivienda unifamiliar. Las paredes exteriores de la casa están separadas por una distancia de $${anchoCasa2}\\text{ m}$. El tejado sobresale lateralmente $${alero2}\\text{ m}$ a cada lado (alero) para proteger las paredes de la lluvia. Las vigas inclinadas principales $[AB]$ y $[BC]$ tienen una longitud de $${vigaTejado2}\\text{ m}$ cada una.
        </div>
        
        <div style="display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center; margin-top: 20px;">
            <div style="flex: 1; min-width: 280px;">
                <ol class="FT_ol_a">
                    <li>Escriba la longitud total de la base horizontal del tejado $[AC]$. <span class="mark">1</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
                    <li>Calcule la inclinación (ángulo del tejado con la horizontal) en el punto $A$. <span class="mark">4</span> <tlacuache-renglon n="4" color="#f9f9f9"></tlacuache-renglon></li>
                    <li>Halle la altura vertical máxima del tejado desde la base horizontal. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
                    <li>Determine la longitud de un soporte vertical central que se colocará a una altura equivalente al 90% de la altura máxima. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                </ol>
            </div>
            
            <div style="width: 240px; text-align: center;">
                ${svg2}
            </div>
        </div>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `
        <br><b>II.</b><br>
        2a) Longitud horizontal $[AC] = ${anchoCasa2} + 2(0.8) = ${baseTejado2}\\text{ m}$<br>
        2b) Ángulo $\\theta = \\arccos\\left(\\frac{${baseTejado2/2}}{${vigaTejado2}}\\right) \\approx ${pitchDeg2}^\\circ$<br>
        2c) Altura máxima $h_{\\text{max}} = ${vigaTejado2} \\cdot \\sin(${pitchDeg2}^\\circ) \\approx ${alturaTejado2}\\text{ m}$<br>
        2d) Longitud del soporte: $h_{\\text{soporte}} = 0.9 \\cdot ${alturaTejado2} \\approx ${soporteSugerido2}\\text{ m}$<br>
    `;

    // ======================================================
    // PROBLEMA 3: FARO Y BARCOS
    // ======================================================
    const hFaro3 = Math.floor(Math.random() * 21) + 40; // Altura faro: 40 a 60 m
    const angDep1_3 = Math.floor(Math.random() * 5) + 12; // Ángulo 1: 12° a 16°
    const angDep2_3 = angDep1_3 + Math.floor(Math.random() * 8) + 10; // Ángulo 2: angDep1 + 10° a 17°

    const distIni3 = (hFaro3 / Math.tan(angDep1_3 * Math.PI / 180)).toFixed(1);
    const distFin3 = (hFaro3 / Math.tan(angDep2_3 * Math.PI / 180)).toFixed(1);
    const distRecorrida3 = (parseFloat(distIni3) - parseFloat(distFin3)).toFixed(1);
    const velocidad3 = (parseFloat(distRecorrida3) / 2).toFixed(1); // 2 minutos

    const svg3 = `
    <svg width="220" height="150" style="overflow: visible;">
        <!-- Mar -->
        <line x1="10" y1="130" x2="210" y2="130" stroke="black" stroke-width="1.5" />
        <!-- Faro -->
        <rect x="20" y="30" width="20" height="100" fill="gray" stroke="black" />
        <!-- Línea horizontal de referencia en la cima del faro -->
        <line x1="20" y1="30" x2="160" y2="30" stroke="black" stroke-dasharray="2,2" />
        <!-- Barcos visuales -->
        <line x1="30" y1="30" x2="180" y2="130" stroke="blue" stroke-dasharray="3,3" />
        <line x1="30" y1="30" x2="110" y2="130" stroke="red" stroke-dasharray="3,3" />
        <!-- Barco pos 1 -->
        <circle cx="180" cy="130" r="3" fill="blue" />
        <text x="180" y="145" font-family="Arial" font-size="10" text-anchor="middle">Barco 1</text>
        <!-- Barco pos 2 -->
        <circle cx="110" cy="130" r="3" fill="red" />
        <text x="110" y="145" font-family="Arial" font-size="10" text-anchor="middle">Barco 2</text>
        <!-- Faro texto altura -->
        <text x="10" y="80" font-family="Arial" font-size="11" text-anchor="end">${hFaro3} m</text>
        <!-- Ángulos de depresión -->
        <path d="M 60,30 A 30,30 0 0 1 52,48" fill="none" stroke="blue" stroke-width="1.2" />
        <text x="65" y="45" font-family="Arial" font-size="9" fill="blue">${angDep1_3}°</text>
        
        <path d="M 50,30 A 20,20 0 0 1 38,45" fill="none" stroke="red" stroke-width="1.2" />
        <text x="42" y="25" font-family="Arial" font-size="9" fill="red">${angDep2_3}°</text>
    </svg>`;

    html += `
    <div class="seccion-title">III. Faro y Barcos</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            [Contexto: Navegación] Desde la cima de un faro vertical de $${hFaro3}\\text{ m}$ de altura sobre el nivel del mar, un vigilante divisa un barco que se aproxima directamente hacia la costa. Inicialmente, el ángulo de depresión al barco es de $${angDep1_3}^\\circ$. Transcurridos exactamente 2 minutos, el vigilante mide nuevamente el ángulo de depresión y registra $${angDep2_3}^\\circ$.
        </div>
        
        <div style="display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center; margin-top: 20px;">
            <div style="flex: 1; min-width: 280px;">
                <ol class="FT_ol_a">
                    <li>Calcule la distancia horizontal inicial desde la base del faro hasta el barco. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
                    <li>Halle la distancia horizontal final desde la base del faro hasta el barco. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
                    <li>Calcule la distancia total que recorrió el barco durante esos 2 minutos. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                    <li>Determine la velocidad promedio del barco en metros por minuto. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                </ol>
            </div>
            
            <div style="width: 240px; text-align: center;">
                ${svg3}
            </div>
        </div>
    </div><div class="page-break"></div>
    `;

    solucion += `
        <br><b>III.</b><br>
        3a) Distancia inicial: $d_{\\text{ini}} = \\frac{${hFaro3}}{\\tan ${angDep1_3}^\\circ} \\approx ${distIni3}\\text{ m}$<br>
        3b) Distancia final: $d_{\\text{fin}} = \\frac{${hFaro3}}{\\tan ${angDep2_3}^\\circ} \\approx ${distFin3}\\text{ m}$<br>
        3c) Distancia recorrida: $d_{\\text{rec}} = ${distIni3} - ${distFin3} = ${distRecorrida3}\\text{ m}$<br>
        3d) Velocidad promedio: $v = \\frac{${distRecorrida3}}{2} \\approx ${velocidad3}\\text{ m min}^{-1}$<br>
    `;

    // ======================================================
    // PROBLEMA 4: GLOBO AEROSTÁTICO (SISTEMA)
    // ======================================================
    const distTotal4 = 400; // Distancia entre observadores: 400 m
    const angObsA4 = 35; // Ángulo de elevación de A: 35°
    const angObsB4 = 55; // Ángulo de elevación de B: 55°
    
    // Resolución del sistema:
    const tanA4 = Math.tan(angObsA4 * Math.PI / 180);
    const tanB4 = Math.tan(angObsB4 * Math.PI / 180);
    const distA4 = (distTotal4 * tanB4 / (tanA4 + tanB4)).toFixed(1);
    const alturaGlobo4 = (parseFloat(distA4) * tanA4).toFixed(1);
    const distVisualB4 = ((distTotal4 - parseFloat(distA4)) / Math.cos(angObsB4 * Math.PI / 180)).toFixed(1);

    const svg4 = `
    <svg width="220" height="150" style="overflow: visible;">
        <!-- Suelo -->
        <line x1="10" y1="120" x2="210" y2="120" stroke="black" stroke-width="1.5" />
        <!-- Globo -->
        <circle cx="120" cy="40" r="12" fill="orange" stroke="black" />
        <polygon points="115,52 125,52 120,60" fill="brown" />
        <!-- Observadores -->
        <circle cx="30" cy="120" r="3" fill="black" />
        <text x="25" y="135" font-family="Arial" font-size="12" font-weight="bold">A</text>
        
        <circle cx="180" cy="120" r="3" fill="black" />
        <text x="180" y="135" font-family="Arial" font-size="12" font-weight="bold">B</text>
        <!-- Líneas visuales -->
        <line x1="30" y1="120" x2="120" y2="40" stroke="blue" stroke-dasharray="2,2" />
        <line x1="180" y1="120" x2="120" y2="40" stroke="red" stroke-dasharray="2,2" />
        <line x1="120" y1="40" x2="120" y2="120" stroke="gray" stroke-dasharray="3,3" />
        <!-- Ángulos -->
        <path d="M 50,120 A 20,20 0 0 0 46,108" fill="none" stroke="blue" stroke-width="1.2" />
        <text x="52" y="115" font-family="Arial" font-size="10" fill="blue">${angObsA4}°</text>
        
        <path d="M 160,120 A 20,20 0 0 1 165,105" fill="none" stroke="red" stroke-width="1.2" />
        <text x="145" y="115" font-family="Arial" font-size="10" fill="red">${angObsB4}°</text>
        <!-- Línea de cota inferior -->
        <line x1="30" y1="145" x2="180" y2="145" stroke="black" stroke-width="0.8" />
        <text x="105" y="142" font-family="Arial" font-size="10" text-anchor="middle">${distTotal4} m</text>
    </svg>`;

    html += `
    <div class="seccion-title">IV. Globo Aerostático</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            [Contexto: Vuelo en Globo] Dos observadores, $A$ y $B$, se encuentran al nivel del suelo en una llanura, separados por una distancia horizontal de $${distTotal4}\\text{ m}$. Ambos observan simultáneamente un globo aerostático que se encuentra suspendido en el aire en un punto directamente sobre la línea recta que une a los dos observadores. El ángulo de elevación medido por el observador $A$ es de $${angObsA4}^\\circ$ y el ángulo de elevación medido por el observador $B$ es de $${angObsB4}^\\circ$.
        </div>
        
        <div style="display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center; margin-top: 20px;">
            <div style="flex: 1; min-width: 280px;">
                <ol class="FT_ol_a">
                    <li>Formule una ecuación para la altura $h$ del globo en términos de la distancia horizontal $x$ desde el observador $A$ hasta el punto directamente bajo el globo. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                    <li>Calcule la distancia horizontal $x$ desde el observador $A$ hasta el punto directamente bajo el globo. <span class="mark">4</span> <tlacuache-renglon n="4" color="#f9f9f9"></tlacuache-renglon></li>
                    <li>Determine la altura vertical $h$ a la que se encuentra el globo sobre el suelo. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                    <li>Calcule la distancia en línea recta desde el observador $B$ hasta el globo. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                </ol>
            </div>
            
            <div style="width: 240px; text-align: center;">
                ${svg4}
            </div>
        </div>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `
        <br><b>IV.</b><br>
        4a) $h = x \\cdot \\tan ${angObsA4}^\\circ$ y $h = (${distTotal4} - x) \\cdot \\tan ${angObsB4}^\\circ$<br>
        4b) $x = \\frac{${distTotal4} \\cdot \\tan ${angObsB4}^\\circ}{\\tan ${angObsA4}^\\circ + \\tan ${angObsB4}^\\circ} \\approx ${distA4}\\text{ m}$<br>
        4c) Altura del globo: $h = ${distA4} \\cdot \\tan ${angObsA4}^\\circ \\approx ${alturaGlobo4}\\text{ m}$<br>
        4d) Distancia visual de B: $d = \\frac{${distTotal4} - ${distA4}}{\\cos ${angObsB4}^\\circ} \\approx ${distVisualB4}\\text{ m}$
    </div>
    `;

    return [html, solucion];
}
