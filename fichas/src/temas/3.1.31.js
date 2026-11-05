// Generado para: Ficha Examen IB AI NM - Triángulos Rectángulos, Geometría 3D, Finanzas y Estadística
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha Examen: Triángulos Rectángulos, Geometría 3D, Finanzas y Estadística";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

function roundTo3SF(num) {
    if (num === 0) return '0';
    let d = Math.ceil(Math.log10(Math.abs(num)));
    let power = 3 - d;
    let magnitude = Math.pow(10, power);
    let shifted = Math.round(num * magnitude);
    let res = shifted / magnitude;
    return res.toPrecision(3);
}

function roundTo2Dec(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("3.1.31", "3. Geometría y trigonometría / Repaso General", "Examen Formativo Tipo IB (Duración: 1 hora)");
    html += `
    <div class="contexto-especial" style="margin-bottom: 12px; font-size: 0.84rem; padding: 7px 12px; line-height: 1.4;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
            <b>Instrucciones Generales para el Estudiante:</b>
            <span style="font-weight: bold; background: #2563eb; color: #fff; padding: 2px 7px; border-radius: 4px; font-size: 0.75rem;">Tiempo estimado: 60 min &bull; Puntuación máxima: 40 pts</span>
        </div>
        Conteste todas las preguntas en los espacios provistos. Es obligatorio el uso de calculadora de pantalla gráfica (CPG / TI-84 CE). Salvo que se indique lo contrario en la pregunta, todas las respuestas numéricas deben darse de forma exacta o con una precisión de <b>tres cifras significativas (3 c.s.)</b>, o con <b>dos cifras decimales</b> para importes monetarios. Se deben mostrar todos los planteamientos y sustituciones en fórmulas para obtener puntuación de método.
    </div>
    `;

    const cardsHtml = [];
    const solucionesList = [];

    // =========================================================================
    // 1. PROBLEMA 1 (8 PUNTOS): TOPOGRAFÍA Y TRIÁNGULOS RECTÁNGULOS (2D)
    // =========================================================================
    {
        // Generación de ángulos de elevación: alpha (lejano) y beta (cercano)
        const alpha = Math.floor(Math.random() * 6) + 32; // 32° a 37°
        const beta = alpha + Math.floor(Math.random() * 10) + 16; // beta entre 48° y 63°
        const d = Math.floor(Math.random() * 15) + 30; // 30 a 44 m

        const radAlpha = (alpha * Math.PI) / 180;
        const radBeta = (beta * Math.PI) / 180;

        const tanAlpha = Math.tan(radAlpha);
        const tanBeta = Math.tan(radBeta);

        // h = (d * tanAlpha * tanBeta) / (tanBeta - tanAlpha)
        const hReal = (d * tanAlpha * tanBeta) / (tanBeta - tanAlpha);
        const xReal = hReal / tanBeta;
        const distDirectaB = Math.sqrt(xReal * xReal + hReal * hReal); // o hReal / sin(beta)

        const svg = `
        <svg width="250" height="135" viewBox="0 0 250 135" style="display:block; margin: 0 auto; overflow:visible;">
            <!-- Suelo -->
            <line x1="15" y1="110" x2="235" y2="110" stroke="#334155" stroke-width="2"/>
            
            <!-- Torre vertical -->
            <line x1="210" y1="110" x2="210" y2="20" stroke="#1e293b" stroke-width="3"/>
            <polygon points="206,110 214,110 211,20 209,20" fill="#475569"/>
            <line x1="202" y1="20" x2="218" y2="20" stroke="#dc2626" stroke-width="2"/>
            <circle cx="210" cy="18" r="3" fill="#dc2626"/>
            <path d="M 210,102 L 202,102 L 202,110" fill="none" stroke="#334155" stroke-width="1.2"/>

            <!-- Líneas visuales desde A y B -->
            <line x1="30" y1="110" x2="210" y2="20" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="4,3"/>
            <line x1="120" y1="110" x2="210" y2="20" stroke="#059669" stroke-width="1.8"/>

            <!-- Puntos A y B -->
            <circle cx="30" cy="110" r="3" fill="#2563eb"/>
            <circle cx="120" cy="110" r="3" fill="#059669"/>
            <text x="30" y="123" font-family="Arial" font-size="11px" font-weight="bold" fill="#2563eb" text-anchor="middle">A</text>
            <text x="120" y="123" font-family="Arial" font-size="11px" font-weight="bold" fill="#059669" text-anchor="middle">B</text>
            <text x="210" y="123" font-family="Arial" font-size="11px" font-weight="bold" fill="#1e293b" text-anchor="middle">Base</text>

            <!-- Arcos de los ángulos -->
            <path d="M 52,110 A 22 22 0 0 0 49,99" fill="none" stroke="#2563eb" stroke-width="1.3"/>
            <text x="58" y="105" font-family="Arial" font-size="9.5px" font-weight="bold" fill="#2563eb">${alpha}&deg;</text>

            <path d="M 138,110 A 18 18 0 0 0 133,98" fill="none" stroke="#059669" stroke-width="1.3"/>
            <text x="144" y="105" font-family="Arial" font-size="9.5px" font-weight="bold" fill="#059669">${beta}&deg;</text>

            <!-- Cota de distancia d entre A y B -->
            <line x1="30" y1="130" x2="120" y2="130" stroke="#475569" stroke-width="1"/>
            <line x1="30" y1="126" x2="30" y2="134" stroke="#475569" stroke-width="1"/>
            <line x1="120" y1="126" x2="120" y2="134" stroke="#475569" stroke-width="1"/>
            <text x="75" y="128" font-family="Arial" font-size="9.5px" font-weight="bold" fill="#475569" text-anchor="middle">d = ${d} m</text>

            <!-- Cota de altura h -->
            <line x1="225" y1="110" x2="225" y2="20" stroke="#dc2626" stroke-width="1.2"/>
            <line x1="221" y1="110" x2="229" y2="110" stroke="#dc2626" stroke-width="1.2"/>
            <line x1="221" y1="20" x2="229" y2="20" stroke="#dc2626" stroke-width="1.2"/>
            <text x="233" y="68" font-family="Arial" font-size="10.5px" font-weight="bold" fill="#dc2626">h</text>
        </svg>
        `;

        const card = `
        <div style="border: 1px solid #cbd5e1; background: #fff; padding: 8px 12px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 6px;">
                <span style="font-weight: bold; color: #1e293b; font-size: 0.92rem;">Pregunta 1 &mdash; Topografía y Modelización Trigonométrica</span>
                <span class="mark">8</span>
            </div>
            <div style="font-size: 0.86rem; color: #1e293b; margin-bottom: 6px; line-height: 1.45;">
                Un topógrafo se encuentra en el punto $A$ sobre un terreno horizontal y mide un ángulo de elevación de <b>$${alpha}^\\circ$</b> hacia la cúspide de una antena de comunicaciones de altura $h$. Luego avanza en línea recta una distancia de <b>$${d}\\text{ m}$</b> en dirección a la base de la antena hasta situarse en el punto $B$. Desde el punto $B$, el ángulo de elevación a la cúspide de la antena es de <b>$${beta}^\\circ$</b>.
            </div>
            <div style="display: flex; gap: 14px; align-items: flex-start;">
                <div style="flex: 0 0 250px;">
                    ${svg}
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 0.83rem; font-weight: bold; color: #334155;">
                        a) Escriba dos ecuaciones trigonométricas distintas en términos de la altura $h$ y la distancia horizontal $x$ entre el punto $B$ y la base de la torre. <span class="mark">2</span>
                    </div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>
                    
                    <div style="font-size: 0.83rem; font-weight: bold; color: #334155; margin-top: 4px;">
                        b) A partir de sus ecuaciones, <b>calcule</b> la altura $h$ de la antena en metros. <span class="mark">4</span>
                    </div>
                    <tlacuache-renglon n="3" color="#f9f9f9" alto="20"></tlacuache-renglon>

                    <div style="font-size: 0.83rem; font-weight: bold; color: #334155; margin-top: 4px;">
                        c) <b>Halle</b> la distancia directa en línea recta desde el punto $B$ hasta la cúspide de la antena. <span class="mark">2</span>
                    </div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>
                </div>
            </div>
        </div>
        `;
        cardsHtml.push(card);

        solucionesList.push(`
        <b>Pregunta 1 &mdash; Topografía y Modelización Trigonométrica [8 puntos en total]:</b><br>
        &bull; <b>a) Planteamiento de ecuaciones [2 pts]:</b><br>
        &nbsp;&nbsp;&bull; Triángulo desde $B$: $\\tan(${beta}^\\circ) = \\frac{h}{x} \\implies h = x\\tan(${beta}^\\circ)$ &nbsp; [M1]<br>
        &nbsp;&nbsp;&bull; Triángulo desde $A$: $\\tan(${alpha}^\\circ) = \\frac{h}{x + ${d}} \\implies h = (x + ${d})\\tan(${alpha}^\\circ)$ &nbsp; [A1]<br>
        &bull; <b>b) Cálculo de la altura $h$ [4 pts]:</b><br>
        &nbsp;&nbsp;&bull; Igualando expresiones para $h$: $x\\tan(${beta}^\\circ) = x\\tan(${alpha}^\\circ) + ${d}\\tan(${alpha}^\\circ)$ &nbsp; [M1]<br>
        &nbsp;&nbsp;&bull; Despejando $x$: $x = \\frac{${d}\\tan(${alpha}^\\circ)}{\\tan(${beta}^\\circ) - \\tan(${alpha}^\\circ)} = \\frac{${d}\\times ${roundTo3SF(tanAlpha)}}{${roundTo3SF(tanBeta)} - ${roundTo3SF(tanAlpha)}} \\approx ${roundTo3SF(xReal)}\\text{ m}$ &nbsp; [A1]<br>
        &nbsp;&nbsp;&bull; Sustituyendo para $h$: $h = (${roundTo3SF(xReal)})\\times \\tan(${beta}^\\circ) = (${roundTo3SF(xReal)})\\times ${roundTo3SF(tanBeta)}$ &nbsp; [M1]<br>
        &nbsp;&nbsp;&bull; $h \\approx <b>${roundTo3SF(hReal)}\\text{ m}</b>$ (o exacto/redondeado a 3 c.s.) &nbsp; [A1]<br>
        &bull; <b>c) Distancia directa desde $B$ a la cúspide [2 pts]:</b><br>
        &nbsp;&nbsp;&bull; $\\text{Distancia} = \\frac{h}{\\sin(${beta}^\\circ)} = \\frac{${roundTo3SF(hReal)}}{\\sin(${beta}^\\circ)}$ &nbsp;o&nbsp; $\\sqrt{x^2 + h^2} = \\sqrt{${roundTo3SF(xReal)}^2 + ${roundTo3SF(hReal)}^2}$ &nbsp; [M1]<br>
        &nbsp;&nbsp;&bull; $\\text{Distancia} \\approx <b>${roundTo3SF(distDirectaB)}\\text{ m}</b>$ &nbsp; [A1]
        `);
    }

    // =========================================================================
    // 2. PROBLEMA 2 (8 PUNTOS): PIRÁMIDE RECTA Y ÁNGULOS EN EL ESPACIO 3D
    // =========================================================================
    {
        // Dimensiones base rectangular: a x b
        const a = (Math.floor(Math.random() * 3) + 4) * 2; // 8, 10, 12 cm
        const b = (Math.floor(Math.random() * 3) + 6) * 2; // 12, 14, 16 cm
        const diagonalBase = Math.sqrt(a * a + b * b);
        const semiDiag = diagonalBase / 2;

        // Arista lateral e elegida para que la altura sea razonable
        const e = Math.round(semiDiag + Math.floor(Math.random() * 5) + 6); // ej. 15 a 22 cm
        const hPiramide = Math.sqrt(e * e - semiDiag * semiDiag);

        // Ángulo arista con plano base
        const angAristaBaseRad = Math.asin(hPiramide / e);
        const angAristaBaseDeg = (angAristaBaseRad * 180) / Math.PI;

        // Volumen
        const areaBase = a * b;
        const volPiramide = (1 / 3) * areaBase * hPiramide;

        const svg = `
        <svg width="220" height="135" viewBox="0 0 220 135" style="display:block; margin: 0 auto; overflow:visible;">
            <!-- Base en perspectiva -->
            <!-- Vértices base: A(30,105), B(120,105), C(175,75), D(85,75) -->
            <!-- Líneas punteadas traseras -->
            <line x1="30" y1="105" x2="85" y2="75" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3"/>
            <line x1="85" y1="75" x2="175" y2="75" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3"/>
            <line x1="85" y1="75" x2="105" y2="15" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3"/>

            <!-- Diagonales base en punteado -->
            <line x1="30" y1="105" x2="175" y2="75" stroke="#cbd5e1" stroke-width="1.2" stroke-dasharray="2,2"/>
            <line x1="120" y1="105" x2="85" y2="75" stroke="#cbd5e1" stroke-width="1.2" stroke-dasharray="2,2"/>

            <!-- Centro O y altura vertical VO -->
            <!-- O está en (102.5, 90) -->
            <circle cx="102.5" cy="90" r="2" fill="#dc2626"/>
            <text x="106" y="96" font-family="Arial" font-size="9px" font-weight="bold" fill="#dc2626">O</text>
            <line x1="105" y1="15" x2="102.5" y2="90" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="3,3"/>

            <!-- Aristas visibles -->
            <polygon points="30,105 120,105 105,15" fill="#f8fafc" opacity="0.6" stroke="none"/>
            <polygon points="120,105 175,75 105,15" fill="#e2e8f0" opacity="0.6" stroke="none"/>

            <line x1="30" y1="105" x2="120" y2="105" stroke="#334155" stroke-width="1.6"/>
            <line x1="120" y1="105" x2="175" y2="75" stroke="#334155" stroke-width="1.6"/>

            <!-- Arista lateral VA destacada -->
            <line x1="105" y1="15" x2="30" y2="105" stroke="#2563eb" stroke-width="2"/>
            <line x1="105" y1="15" x2="120" y2="105" stroke="#334155" stroke-width="1.6"/>
            <line x1="105" y1="15" x2="175" y2="75" stroke="#334155" stroke-width="1.6"/>

            <!-- Etiquetas de Vértices -->
            <text x="105" y="10" font-family="Arial" font-size="11px" font-weight="bold" fill="#1e293b" text-anchor="middle">V</text>
            <text x="22" y="112" font-family="Arial" font-size="10.5px" font-weight="bold" fill="#1e293b">A</text>
            <text x="125" y="114" font-family="Arial" font-size="10.5px" font-weight="bold" fill="#1e293b">B</text>
            <text x="180" y="78" font-family="Arial" font-size="10.5px" font-weight="bold" fill="#1e293b">C</text>
            <text x="80" y="72" font-family="Arial" font-size="10.5px" font-weight="bold" fill="#94a3b8">D</text>

            <!-- Cotas de dimensiones -->
            <text x="75" y="116" font-family="Arial" font-size="9.5px" font-weight="bold" fill="#334155" text-anchor="middle">AB = ${a} cm</text>
            <text x="155" y="97" font-family="Arial" font-size="9.5px" font-weight="bold" fill="#334155">BC = ${b} cm</text>
            <text x="56" y="52" font-family="Arial" font-size="9.5px" font-weight="bold" fill="#2563eb">e = ${e} cm</text>
        </svg>
        `;

        const card = `
        <div style="border: 1px solid #cbd5e1; background: #fff; padding: 8px 12px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 6px;">
                <span style="font-weight: bold; color: #1e293b; font-size: 0.92rem;">Pregunta 2 &mdash; Geometría del Espacio: Pirámide y Triángulos Rectángulos en 3D</span>
                <span class="mark">8</span>
            </div>
            <div style="font-size: 0.86rem; color: #1e293b; margin-bottom: 6px; line-height: 1.45;">
                La figura muestra una pirámide recta de base rectangular $ABCD$ y vértice $V$. Las dimensiones de la base son $AB = ${a}\\text{ cm}$ y $BC = ${b}\\text{ cm}$. Cada una de las cuatro aristas laterales mide $VA = VB = VC = VD = ${e}\\text{ cm}$. El punto $O$ es el centro geométrico de la base rectangular directamente debajo de $V$.
            </div>
            <div style="display: flex; gap: 14px; align-items: flex-start;">
                <div style="flex: 0 0 220px;">
                    ${svg}
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 0.83rem; font-weight: bold; color: #334155;">
                        a) <b>Halle</b> la longitud exacta de la diagonal de la base $AC$. <span class="mark">2</span>
                    </div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>

                    <div style="font-size: 0.83rem; font-weight: bold; color: #334155; margin-top: 4px;">
                        b) <b>Calcule</b> la altura vertical perpendicular $VO$ de la pirámide. <span class="mark">3</span>
                    </div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>

                    <div style="font-size: 0.83rem; font-weight: bold; color: #334155; margin-top: 4px;">
                        c) <b>Determine</b> el ángulo formado entre la arista lateral $VA$ y el plano de la base $ABCD$. <span class="mark">3</span>
                    </div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>
                </div>
            </div>
        </div>
        `;
        cardsHtml.push(card);

        solucionesList.push(`
        <b>Pregunta 2 &mdash; Pirámide Rectangular en 3D [8 puntos en total]:</b><br>
        &bull; <b>a) Diagonal de la base $AC$ [2 pts]:</b><br>
        &nbsp;&nbsp;&bull; Por Teorema de Pitágoras en $\\triangle ABC$: $AC = \\sqrt{AB^2 + BC^2} = \\sqrt{${a}^2 + ${b}^2} = \\sqrt{${a * a + b * b}}$ &nbsp; [M1]<br>
        &nbsp;&nbsp;&bull; $AC = <b>${roundTo3SF(diagonalBase)}\\text{ cm}</b>$ &nbsp; [A1]<br>
        &bull; <b>b) Altura vertical $VO$ [3 pts]:</b><br>
        &nbsp;&nbsp;&bull; El centro $O$ biseca la diagonal: $AO = \\frac{AC}{2} = \\frac{${roundTo3SF(diagonalBase)}}{2} = ${roundTo3SF(semiDiag)}\\text{ cm}$ &nbsp; [A1]<br>
        &nbsp;&nbsp;&bull; En el triángulo rectángulo $\\triangle VOA$: $VO = \\sqrt{VA^2 - AO^2} = \\sqrt{${e}^2 - (${roundTo3SF(semiDiag)})^2}$ &nbsp; [M1]<br>
        &nbsp;&nbsp;&bull; $VO = \\sqrt{${Math.round((e * e - semiDiag * semiDiag) * 100) / 100}} \\approx <b>${roundTo3SF(hPiramide)}\\text{ cm}</b>$ &nbsp; [A1]<br>
        &bull; <b>c) Ángulo entre la arista $VA$ y la base [3 pts]:</b><br>
        &nbsp;&nbsp;&bull; El ángulo requerido es $\\angle VAO$ en el triángulo rectángulo $\\triangle VOA$ &nbsp; [M1]<br>
        &nbsp;&nbsp;&bull; $\\cos(\\angle VAO) = \\frac{AO}{VA} = \\frac{${roundTo3SF(semiDiag)}}{${e}}$ &nbsp;o&nbsp; $\\sin(\\angle VAO) = \\frac{${roundTo3SF(hPiramide)}}{${e}}$ &nbsp; [M1]<br>
        &nbsp;&nbsp;&bull; $\\angle VAO \\approx <b>${roundTo3SF(angAristaBaseDeg)}^\\circ</b>$ &nbsp; [A1]
        `);
    }

    // =========================================================================
    // 3. PROBLEMA 3 (10 PUNTOS): MODELIZACIÓN DE SÓLIDO COMPUESTO (3D)
    // =========================================================================
    {
        // Silo: Cilindro con techo cónico
        const r = Math.floor(Math.random() * 3) + 3; // radio: 3 a 5 m
        const hCil = Math.floor(Math.random() * 5) + 8; // altura cilindro: 8 a 12 m
        const hCono = Math.floor(Math.random() * 3) + 4; // altura cono: 4 a 6 m
        const caudal = Math.floor(Math.random() * 4) + 12; // tasa de llenado: 12 a 15 m^3/min
        const coberturaLata = 35; // m^2 por lata
        const costoLata = Math.floor(Math.random() * 15) + 45; // 45 a 60 USD

        const generatriz = Math.sqrt(r * r + hCono * hCono);
        const volCilindro = Math.PI * r * r * hCil;
        const volCono = (1 / 3) * Math.PI * r * r * hCono;
        const volTotal = volCilindro + volCono;

        const vol85 = 0.85 * volTotal;
        const tiempoLlenado = vol85 / caudal;

        // Área exterior a pintar: lateral cilindro + lateral cono (sin base suelo ni base interior)
        const areaLatCil = 2 * Math.PI * r * hCil;
        const areaLatCono = Math.PI * r * generatriz;
        const areaTotalPintar = areaLatCil + areaLatCono;

        const numLatas = Math.ceil(areaTotalPintar / coberturaLata);
        const costoTotalPintura = numLatas * costoLata;

        const svg = `
        <svg width="190" height="150" viewBox="0 0 190 150" style="display:block; margin: 0 auto; overflow:visible;">
            <!-- Base cilindro -->
            <path d="M 40,125 A 45 12 0 0 1 130,125" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" fill="none"/>
            <path d="M 40,125 A 45 12 0 0 0 130,125" stroke="#334155" stroke-width="1.6" fill="#e2e8f0"/>

            <!-- Cuerpo cilíndrico -->
            <rect x="40" y="55" width="90" height="70" fill="#f8fafc" stroke="none"/>
            <path d="M 40,125 A 45 12 0 0 0 130,125 L 130,55 A 45 12 0 0 1 40,55 Z" fill="#f1f5f9" stroke="none"/>
            <line x1="40" y1="55" x2="40" y2="125" stroke="#334155" stroke-width="1.6"/>
            <line x1="130" y1="55" x2="130" y2="125" stroke="#334155" stroke-width="1.6"/>

            <!-- Unión cono-cilindro (elipse punteada y continua) -->
            <ellipse cx="85" cy="55" rx="45" ry="12" fill="#e2e8f0" stroke="#94a3b8" stroke-dasharray="3,2" stroke-width="1.2"/>

            <!-- Techo cónico -->
            <polygon points="40,55 85,15 130,55" fill="#f8fafc" opacity="0.8" stroke="none"/>
            <line x1="40" y1="55" x2="85" y2="15" stroke="#334155" stroke-width="1.6"/>
            <line x1="130" y1="55" x2="85" y2="15" stroke="#334155" stroke-width="1.6"/>

            <!-- Altura del cono en punteado rojo -->
            <line x1="85" y1="15" x2="85" y2="55" stroke="#dc2626" stroke-width="1.3" stroke-dasharray="2,2"/>
            <line x1="85" y1="55" x2="130" y2="55" stroke="#2563eb" stroke-width="1.4"/>
            <circle cx="85" cy="55" r="2" fill="#2563eb"/>

            <!-- Cotas de dimensiones -->
            <text x="108" y="52" font-family="Arial" font-size="9px" font-weight="bold" fill="#2563eb">r = ${r} m</text>
            <text x="79" y="38" font-family="Arial" font-size="9px" font-weight="bold" fill="#dc2626" text-anchor="end">h_c = ${hCono} m</text>

            <line x1="145" y1="55" x2="145" y2="125" stroke="#334155" stroke-width="1.1"/>
            <line x1="141" y1="55" x2="149" y2="55" stroke="#334155" stroke-width="1.1"/>
            <line x1="141" y1="125" x2="149" y2="125" stroke="#334155" stroke-width="1.1"/>
            <text x="153" y="94" font-family="Arial" font-size="9.5px" font-weight="bold" fill="#334155">H = ${hCil} m</text>

            <text x="114" y="30" font-family="Arial" font-size="9px" font-weight="bold" fill="#059669">g</text>
        </svg>
        `;

        const card = `
        <div style="border: 1px solid #cbd5e1; background: #fff; padding: 8px 12px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 6px;">
                <span style="font-weight: bold; color: #1e293b; font-size: 0.92rem;">Pregunta 3 &mdash; Modelización de Sólidos Compuestos en Contexto Real</span>
                <span class="mark">10</span>
            </div>
            <div style="font-size: 0.86rem; color: #1e293b; margin-bottom: 6px; line-height: 1.45;">
                Un silo industrial para el almacenamiento de grano está constituido por un cilindro circular recto de radio $r = ${r}\\text{ m}$ y altura cilíndrica $H = ${hCil}\\text{ m}$, rematado en su parte superior por un cono circular recto de la misma base y altura cónica $h_c = ${hCono}\\text{ m}$.
            </div>
            <div style="display: flex; gap: 14px; align-items: flex-start;">
                <div style="flex: 0 0 190px;">
                    ${svg}
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 0.83rem; font-weight: bold; color: #334155;">
                        a) <b>Calcule</b> la longitud de la generatriz $g$ del tejado cónico. <span class="mark">2</span>
                    </div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>

                    <div style="font-size: 0.83rem; font-weight: bold; color: #334155; margin-top: 4px;">
                        b) <b>Calcule</b> el volumen total del silo en metros cúbicos ($\\text{m}^3$). <span class="mark">3</span>
                    </div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>

                    <div style="font-size: 0.83rem; font-weight: bold; color: #334155; margin-top: 4px;">
                        c) El silo se llena mediante una cinta transportadora a un caudal constante de $${caudal}\\text{ m}^3/\\text{min}$. <b>Determine</b> el tiempo, en minutos, necesario para llenar el silo al <b>$85\\%$</b> de su capacidad total. <span class="mark">2</span>
                    </div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>

                    <div style="font-size: 0.83rem; font-weight: bold; color: #334155; margin-top: 4px;">
                        d) Toda la superficie exterior expuesta al ambiente (pared lateral del cilindro y techo cónico, excluyendo la base inferior) debe pintarse con sellador. Cada lata de sellador rinde para $${coberturaLata}\\text{ m}^2$ y cuesta $\\$${costoLata}$. <b>Calcule</b> el costo mínimo total en latas completas requeridas. <span class="mark">3</span>
                    </div>
                    <tlacuache-renglon n="3" color="#f9f9f9" alto="20"></tlacuache-renglon>
                </div>
            </div>
        </div>
        `;
        cardsHtml.push(card);

        solucionesList.push(`
        <b>Pregunta 3 &mdash; Silo Compuesto (Cilindro y Cono) [10 puntos en total]:</b><br>
        &bull; <b>a) Generatriz cónica $g$ [2 pts]:</b><br>
        &nbsp;&nbsp;&bull; $g = \\sqrt{r^2 + h_c^2} = \\sqrt{${r}^2 + ${hCono}^2} = \\sqrt{${r * r + hCono * hCono}}$ &nbsp; [M1]<br>
        &nbsp;&nbsp;&bull; $g \\approx <b>${roundTo3SF(generatriz)}\\text{ m}</b>$ &nbsp; [A1]<br>
        &bull; <b>b) Volumen total del silo [3 pts]:</b><br>
        &nbsp;&nbsp;&bull; $V_{\\text{cil}} = \\pi r^2 H = \\pi(${r}^2)(${hCil}) = ${r * r * hCil}\\pi \\approx ${roundTo3SF(volCilindro)}\\text{ m}^3$ &nbsp; [A1]<br>
        &nbsp;&nbsp;&bull; $V_{\\text{cono}} = \\frac{1}{3}\\pi r^2 h_c = \\frac{1}{3}\\pi(${r}^2)(${hCono}) \\approx ${roundTo3SF(volCono)}\\text{ m}^3$ &nbsp; [A1]<br>
        &nbsp;&nbsp;&bull; $V_{\\text{total}} = V_{\\text{cil}} + V_{\\text{cono}} \\approx <b>${roundTo3SF(volTotal)}\\text{ m}^3</b>$ &nbsp; [A1]<br>
        &bull; <b>c) Tiempo de llenado al 85% [2 pts]:</b><br>
        &nbsp;&nbsp;&bull; $V_{85} = 0.85 \\times ${roundTo3SF(volTotal)} \\approx ${roundTo3SF(vol85)}\\text{ m}^3$ &nbsp; [M1]<br>
        &nbsp;&nbsp;&bull; $t = \\frac{V_{85}}{${caudal}} = \\frac{${roundTo3SF(vol85)}}{${caudal}} \\approx <b>${roundTo3SF(tiempoLlenado)}\\text{ min}</b>$ &nbsp; [A1]<br>
        &bull; <b>d) Área lateral y costo de pintura [3 pts]:</b><br>
        &nbsp;&nbsp;&bull; $A_{\\text{ext}} = 2\\pi r H + \\pi r g = 2\\pi(${r})(${hCil}) + \\pi(${r})(${roundTo3SF(generatriz)}) \\approx ${roundTo3SF(areaLatCil)} + ${roundTo3SF(areaLatCono)} \\approx ${roundTo3SF(areaTotalPintar)}\\text{ m}^2$ &nbsp; [M1]<br>
        &nbsp;&nbsp;&bull; $\\text{Número de latas} = \\left\\lceil \\frac{${roundTo3SF(areaTotalPintar)}}{${coberturaLata}} \\right\\rceil = \\lceil ${roundTo3SF(areaTotalPintar / coberturaLata)} \\rceil = ${numLatas}\\text{ latas}$ &nbsp; [A1]<br>
        &nbsp;&nbsp;&bull; $\\text{Costo total} = ${numLatas} \\times \\$${costoLata} = <b>\\$${costoTotalPintura.toLocaleString()}</b>$ &nbsp; [A1]
        `);
    }

    // =========================================================================
    // 4. PROBLEMA 4 (7 PUNTOS): TEMA 1 - NÚMERO Y ÁLGEBRA: FINANZAS (INTERÉS COMPUESTO)
    // =========================================================================
    {
        const pv = Math.floor(Math.random() * 5 + 10) * 1000; // 10,000 a 14,000 USD
        const tasaPct = Math.round((Math.random() * 1.5 + 4.5) * 10) / 10; // 4.5% a 6.0%
        const k = 4; // trimestral (quarterly)
        const tipoComp = "trimestralmente";
        const nAnios = Math.floor(Math.random() * 3) + 5; // 5 a 7 años

        const targetMult = 1.6;
        const targetAmount = Math.round((pv * targetMult) / 1000) * 1000;

        // FV = PV * (1 + r / (100 * k))^(k * nAnios)
        const baseInteres = 1 + (tasaPct / (100 * k));
        const exponente = k * nAnios;
        const fvReal = pv * Math.pow(baseInteres, exponente);

        // n para alcanzar targetAmount:
        // targetAmount = pv * (1 + r/(100*k))^(k * t)
        // t = ln(targetAmount / pv) / (k * ln(baseInteres))
        const tContinuo = Math.log(targetAmount / pv) / (k * Math.log(baseInteres));
        const aniosEnteros = Math.ceil(tContinuo);

        const card = `
        <div style="border: 1px solid #cbd5e1; background: #fff; padding: 8px 12px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 6px;">
                <span style="font-weight: bold; color: #1e293b; font-size: 0.92rem;">Pregunta 4 &mdash; Número y Álgebra: Modelización Financiera e Interés Compuesto</span>
                <span class="mark">7</span>
            </div>
            <div style="font-size: 0.86rem; color: #1e293b; margin-bottom: 6px; line-height: 1.45;">
                Valentina deposita un capital inicial de <b>$\\$${pv.toLocaleString()}\\text{ USD}$</b> en una cuenta de ahorros de alto rendimiento que genera una tasa de interés nominal anual del <b>$${tasaPct}\\%$</b>, capitalizable <b>${tipoComp}</b> ($k = ${k}$). Valentina no realiza depósitos ni retiros adicionales durante todo el período.
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                <div>
                    <div style="font-size: 0.83rem; font-weight: bold; color: #334155;">
                        a) <b>Calcule</b> el saldo acumulado en la cuenta al término de $${nAnios}$ años. Dé su respuesta con dos cifras decimales. <span class="mark">3</span>
                    </div>
                    <tlacuache-renglon n="3" color="#f9f9f9" alto="20"></tlacuache-renglon>
                </div>
                <div>
                    <div style="font-size: 0.83rem; font-weight: bold; color: #334155;">
                        b) <b>Determine</b> el número mínimo de años <i>completos</i> necesarios para que el saldo acumulado en la cuenta supere por primera vez los <b>$\\$${targetAmount.toLocaleString()}\\text{ USD}$</b>. <span class="mark">4</span>
                    </div>
                    <tlacuache-renglon n="3" color="#f9f9f9" alto="20"></tlacuache-renglon>
                </div>
            </div>
        </div>
        `;
        cardsHtml.push(card);

        solucionesList.push(`
        <b>Pregunta 4 &mdash; Matemáticas Financieras [7 puntos en total]:</b><br>
        &bull; <b>a) Valor futuro al cabo de $${nAnios}$ años [3 pts]:</b><br>
        &nbsp;&nbsp;&bull; Sustitución en fórmula: $FV = ${pv}\\left(1 + \\frac{${tasaPct}}{100 \\times ${k}}\\right)^{${k} \\times ${nAnios}} = ${pv}\\left(1 + \\frac{${tasaPct}}{${100 * k}}\\right)^{${k * nAnios}}$ &nbsp; [M1]<br>
        &nbsp;&nbsp;&bull; $FV = ${pv} \\times (${roundTo3SF(baseInteres)})^{${k * nAnios}}$ &nbsp; [M1]<br>
        &nbsp;&nbsp;&bull; $FV = <b>\\$${roundTo2Dec(fvReal)}</b>$ &nbsp; [A1]<br>
        &bull; <b>b) Número de años para alcanzar $\\$${targetAmount.toLocaleString()}$ [4 pts]:</b><br>
        &nbsp;&nbsp;&bull; Planteamiento de la inecuación o uso de TVM Solver: $${pv}\\left(1 + \\frac{${tasaPct}}{${100 * k}}\\right)^{${k}n} > ${targetAmount}$ &nbsp; [M1]<br>
        &nbsp;&nbsp;&bull; Tomando logaritmos o resolviendo con CPG: $n = \\frac{\\ln(${targetAmount}/${pv})}{${k}\\ln(${roundTo3SF(baseInteres)})} \\approx ${roundTo3SF(tContinuo)}\\text{ años}$ &nbsp; [M1][A1]<br>
        &nbsp;&nbsp;&bull; Como se solicita el número mínimo de años <i>enteros/completos</i>: $n = <b>${aniosEnteros}\\text{ años}</b>$ &nbsp; [A1]
        `);
    }

    // =========================================================================
    // 5. PROBLEMA 5 (7 PUNTOS): TEMA 4 - ESTADÍSTICA BIVARIADA: REGRESIÓN LINEAL
    // =========================================================================
    {
        // 6 estudiantes: Horas de estudio vs Calificación examen
        const xVals = [3, 5, 7, 9, 11, 14];
        const mBase = Math.round((Math.random() * 0.8 + 3.4) * 10) / 10; // ~3.5 a 4.2
        const cBase = Math.floor(Math.random() * 8) + 38; // ~38 a 45

        // Generar y con pequeña variación aleatoria
        const yVals = xVals.map(x => {
            const noise = (Math.random() * 4 - 2);
            return Math.min(100, Math.max(30, Math.round(mBase * x + cBase + noise)));
        });

        // Cálculos estadísticos exactos
        const nPoints = xVals.length;
        const sumX = xVals.reduce((a, b) => a + b, 0);
        const sumY = yVals.reduce((a, b) => a + b, 0);
        const meanX = sumX / nPoints;
        const meanY = sumY / nPoints;

        let numCov = 0;
        let varX = 0;
        let varY = 0;
        for (let i = 0; i < nPoints; i++) {
            const dx = xVals[i] - meanX;
            const dy = yVals[i] - meanY;
            numCov += dx * dy;
            varX += dx * dx;
            varY += dy * dy;
        }

        const rPearson = numCov / Math.sqrt(varX * varY);
        const mReg = numCov / varX;
        const cReg = meanY - mReg * meanX;

        // Estimación dentro del rango (interpolación)
        const xEst = 8;
        const yEst = mReg * xEst + cReg;

        // Construir tabla HTML
        const tableRowsHtml = xVals.map((x, idx) => `
            <td style="border: 1px solid #cbd5e1; padding: 4px 8px; text-align: center;">${x}</td>
        `).join('');

        const tableYHtml = yVals.map(y => `
            <td style="border: 1px solid #cbd5e1; padding: 4px 8px; text-align: center; font-weight: bold;">${y}</td>
        `).join('');

        const card = `
        <div style="border: 1px solid #cbd5e1; background: #fff; padding: 8px 12px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 6px;">
                <span style="font-weight: bold; color: #1e293b; font-size: 0.92rem;">Pregunta 5 &mdash; Estadística y Probabilidad: Regresión Lineal y Correlación Bivariada</span>
                <span class="mark">7</span>
            </div>
            <div style="font-size: 0.86rem; color: #1e293b; margin-bottom: 6px; line-height: 1.45;">
                Una profesora de matemáticas investiga la relación entre el número de horas semanales dedicadas al estudio independiente ($x$) y la puntuación obtenida en el examen parcial ($y$) para una muestra aleatoria de $6$ estudiantes:
            </div>
            <div style="margin: 4px 0 8px 0; overflow-x: auto;">
                <table style="border-collapse: collapse; width: 100%; font-size: 0.83rem;">
                    <tr style="background: #f1f5f9;">
                        <th style="border: 1px solid #cbd5e1; padding: 4px 8px; text-align: left; width: 35%;">Horas de estudio semanales ($x$)</th>
                        ${tableRowsHtml}
                    </tr>
                    <tr>
                        <th style="border: 1px solid #cbd5e1; padding: 4px 8px; text-align: left; background: #f8fafc;">Puntuación del examen ($y$)</th>
                        ${tableYHtml}
                    </tr>
                </table>
            </div>
            ${ai.getTiTip("En la TI-84 CE: Ingrese los datos en <code>STAT > EDIT (L1, L2)</code>. Active diagnósticos en <code>MODE > DiagnosticOn</code> y calcule mediante <code>STAT > CALC > 8:LinReg(a+bx)</code>.")}
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                <div>
                    <div style="font-size: 0.83rem; font-weight: bold; color: #334155;">
                        a) <b>Calcule</b> el coeficiente de correlación momento-producto de Pearson ($r$). <span class="mark">2</span>
                    </div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>

                    <div style="font-size: 0.83rem; font-weight: bold; color: #334155; margin-top: 4px;">
                        b) <b>Escriba</b> la ecuación de la recta de regresión de $y$ sobre $x$ en la forma $y = ax + b$. <span class="mark">2</span>
                    </div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>
                </div>
                <div>
                    <div style="font-size: 0.83rem; font-weight: bold; color: #334155;">
                        c) Utilice su ecuación para <b>estimar</b> la puntuación de un estudiante que estudia $${xEst}$ horas semanales. <span class="mark">2</span>
                    </div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>

                    <div style="font-size: 0.83rem; font-weight: bold; color: #334155; margin-top: 4px;">
                        d) <b>Justifique</b> si la estimación obtenida en el inciso (c) es fiable. <span class="mark">1</span>
                    </div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>
                </div>
            </div>
        </div>
        `;
        cardsHtml.push(card);

        solucionesList.push(`
        <b>Pregunta 5 &mdash; Regresión Lineal y Correlación [7 puntos en total]:</b><br>
        &bull; <b>a) Coeficiente de correlación de Pearson ($r$) [2 pts]:</b><br>
        &nbsp;&nbsp;&bull; Usando la calculadora gráfica CPG con $L_1$ y $L_2$ &nbsp; [M1]<br>
        &nbsp;&nbsp;&bull; $r \\approx <b>${roundTo3SF(rPearson)}</b>$ (correlación lineal positiva fuerte) &nbsp; [A1]<br>
        &bull; <b>b) Recta de regresión de $y$ sobre $x$ [2 pts]:</b><br>
        &nbsp;&nbsp;&bull; Pendiente $a \\approx ${roundTo3SF(mReg)}$, ordenada al origen $b \\approx ${roundTo3SF(cReg)}$ &nbsp; [A1]<br>
        &nbsp;&nbsp;&bull; $y = <b>${roundTo3SF(mReg)}x + ${roundTo3SF(cReg)}</b>$ &nbsp; [A1]<br>
        &bull; <b>c) Estimación para $x = ${xEst}$ horas [2 pts]:</b><br>
        &nbsp;&nbsp;&bull; Sustituyendo: $\\hat{y} = (${roundTo3SF(mReg)})(${xEst}) + ${roundTo3SF(cReg)}$ &nbsp; [M1]<br>
        &nbsp;&nbsp;&bull; $\\hat{y} \\approx <b>${roundTo3SF(yEst)}</b>$ puntos &nbsp; [A1]<br>
        &bull; <b>d) Justificación de fiabilidad [1 pt]:</b><br>
        &nbsp;&nbsp;&bull; <b>Es fiable [R1]</b> porque se trata de una <i>interpolación</i> ($x = ${xEst}$ se encuentra dentro del rango de datos observados $[${xVals[0]}, ${xVals[nPoints - 1]}]$) y existe una correlación lineal fuerte ($r \\approx ${roundTo3SF(rPearson)}$).
        `);
    }

    // =========================================================================
    // ENSAMBLE DE PÁGINAS Y RETORNO
    // =========================================================================

    // PÁGINA 1: Preguntas 1 y 2 (16 puntos)
    html += `
    <div class="exercise-step">
        <div style="display: flex; flex-direction: column; gap: 10px;">
            ${cardsHtml[0]}
        </div>
    </div>
    <div class="page-break"></div>
    `;

    // PÁGINA 2: Pregunta 3 (10 puntos - Sólido Compuesto Modelización)
    html += `
    <div class="exercise-step">
        <div style="display: flex; flex-direction: column; gap: 10px;">
            ${cardsHtml[1]}
            ${cardsHtml[2]}
        </div>
    </div>
    <div class="page-break"></div>
    `;

    // PÁGINA 3: Preguntas 4 y 5 (14 puntos - Finanzas y Estadística Bivariada)
    html += `
    <div class="exercise-step">
        <div style="display: flex; flex-direction: column; gap: 10px;">
            ${cardsHtml[3]}
        </div>
    </div>
    <div class="page-break"></div>
    `;

    // SOLUCIONARIO COMPLETO Y CRITERIOS IB
    solucion += `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 0.85rem; line-height: 1.55; color: #1e293b;">
        <div style="border-bottom: 2px solid #2563eb; padding-bottom: 5px; margin-bottom: 12px;">
            <b style="font-size: 1rem; color: #1e293b;">Esquema de Calificación Oficial (Mark Scheme) &mdash; Ficha 3.1.31</b><br>
            <span style="color: #64748b; font-size: 0.8rem;">Matemáticas: Aplicaciones e Interpretación NM &bull; Total: 40 Puntos &bull; Duración: 60 min</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px;">
            ${solucionesList.join('<hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 8px 0;">')}
        </div>
    </div>
    `;

    return [html, solucion];
}
