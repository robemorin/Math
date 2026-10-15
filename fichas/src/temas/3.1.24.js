// Generado para: Ficha de Área de Sectores Circulares y Regiones Compuestas
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Área de Sectores Circulares y Regiones Compuestas";
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

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("3.1.24", "3. Geometría y trigonometría", "Ficha: Área de Sectores Circulares y Regiones Compuestas");
    html += `
    <div class="contexto-especial" style="margin-bottom: 8px; font-size: 0.83rem; padding: 5px 10px;">
        <b>Instrucciones:</b> Resuelva los siguientes ejercicios sobre áreas de sectores circulares, coronas y regiones compuestas sombreadas. Muestre con claridad su procedimiento geométrico y algebraico. Redondee sus respuestas numéricas finales a <b>tres cifras significativas (3 c.s.)</b> o proporcione el valor exacto en términos de $\\pi$ cuando corresponda, indicando siempre las unidades.
    </div>
    `;

    const cardsHtml = [];
    const solucionesList = [];

    // ==========================================
    // EJERCICIO 1: SECTOR CIRCULAR BÁSICO (Cálculo directo de Área y Perímetro) [2 pts]
    // ==========================================
    {
        const r = Math.floor(Math.random() * 5) + 6; // 6 a 10 cm
        const theta = (Math.floor(Math.random() * 7) + 8) * 5; // 40° a 70° (pasos de 5°)
        const u = 'cm';

        const areaNum = (theta / 360) * Math.PI * r * r;
        const arcoNum = (theta / 360) * 2 * Math.PI * r;
        const perimNum = 2 * r + arcoNum;

        // SVG sector circular estándar en B/N de alto contraste
        const angRad = (theta * Math.PI) / 180;
        const svgR = 62;
        const ox = 35, oy = 72;
        const xEnd = ox + svgR * Math.cos(angRad);
        const yEnd = oy - svgR * Math.sin(angRad);
        const arcR = 22;
        const arcX = ox + arcR * Math.cos(angRad);
        const arcY = oy - arcR * Math.sin(angRad);

        const svg = `
        <svg width="170" height="90" viewBox="0 0 170 90" style="display:block; margin: 0 auto; overflow:visible;">
            <path d="M ${ox} ${oy} L ${ox + svgR} ${oy} A ${svgR} ${svgR} 0 0 0 ${xEnd} ${yEnd} Z" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.6"/>
            <path d="M ${ox + arcR} ${oy} A ${arcR} ${arcR} 0 0 0 ${arcX} ${arcY}" fill="none" stroke="#0f172a" stroke-width="1.3"/>
            <circle cx="${ox}" cy="${oy}" r="2" fill="#0f172a"/>
            <text x="${ox - 8}" y="${oy + 3}" font-family="Arial" font-size="10px" font-weight="bold" fill="#0f172a" text-anchor="end">O</text>
            <text x="${ox + 27}" y="${oy - 7}" font-family="Arial" font-size="9.5px" font-weight="bold" fill="#0f172a">${theta}°</text>
            <text x="${ox + 32}" y="${oy + 13}" font-family="Arial" font-size="10px" font-weight="bold" fill="#0f172a">r = ${r} ${u}</text>
        </svg>
        `;

        const card = `
        <div style="border: 1px solid #cbd5e1; background: #fff; padding: 5px 9px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
                <span style="font-weight: bold; color: #1e293b; font-size: 0.85rem;">1. Sector Circular: Área y Perímetro</span>
                <span class="mark">2</span>
            </div>
            <div style="font-size: 0.81rem; color: #1e293b; margin-bottom: 4px;">
                Sector circular de centro $O$, radio <b>$r = ${r}\\text{ ${u}}$</b> y ángulo central <b>$\\theta = ${theta}^\\circ$</b>.
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <div style="flex: 0 0 170px;">
                    ${svg}
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 0.81rem; font-weight: bold; color: #334155;">a) Área del sector ($A$):</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="19"></tlacuache-renglon>
                    <div style="font-size: 0.81rem; font-weight: bold; color: #334155; margin-top: 2px;">b) Perímetro total del sector:</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="19"></tlacuache-renglon>
                </div>
            </div>
        </div>
        `;
        cardsHtml.push(card);
        solucionesList.push(`<b>1. Sector Circular Básico ($r = ${r}\\text{ cm},\\; \\theta = ${theta}^\\circ$):</b><br>&bull; Área: $A = \\frac{${theta}}{360^\\circ} \\pi (${r})^2 = \\frac{${theta * r * r}}{360}\\pi \\approx <b>${roundTo3SF(areaNum)}\\text{ cm}^2</b>$<br>&bull; Perímetro: $P = 2r + \\frac{${theta}}{360}(2\\pi r) = 2(${r}) + \\frac{${theta}}{360}(2\\pi\\cdot ${r}) = ${2 * r} + ${roundTo3SF(arcoNum)} \\approx <b>${roundTo3SF(perimNum)}\\text{ cm}</b>$`);
    }

    // ==========================================
    // EJERCICIO 2: PROBLEMA INVERSO (Dado Área y Ángulo, hallar Radio y Arco) [2 pts]
    // ==========================================
    {
        const theta = (Math.floor(Math.random() * 5) + 6) * 15; // 90°, 105°, 120°, 135°, 150°
        const rInt = Math.floor(Math.random() * 4) + 6; // 6 a 9 cm para calcular un área plausible
        const areaVal = parseFloat(((theta / 360) * Math.PI * rInt * rInt).toFixed(1));
        const rReal = Math.sqrt((areaVal * 360) / (Math.PI * theta));
        const arcoVal = (theta / 360) * 2 * Math.PI * rReal;
        const perimVal = 2 * rReal + arcoVal;
        const u = 'cm';

        const angRad = (theta * Math.PI) / 180;
        const svgR = 56;
        const ox = 75, oy = 72;
        const xEnd = ox + svgR * Math.cos(angRad);
        const yEnd = oy - svgR * Math.sin(angRad);
        const arcR = 18;
        const arcX = ox + arcR * Math.cos(angRad);
        const arcY = oy - arcR * Math.sin(angRad);
        const largeArc = theta > 180 ? 1 : 0;

        const svg = `
        <svg width="170" height="90" viewBox="0 0 170 90" style="display:block; margin: 0 auto; overflow:visible;">
            <path d="M ${ox} ${oy} L ${ox + svgR} ${oy} A ${svgR} ${svgR} 0 ${largeArc} 0 ${xEnd} ${yEnd} Z" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.6"/>
            <path d="M ${ox + arcR} ${oy} A ${arcR} ${arcR} 0 ${largeArc} 0 ${arcX} ${arcY}" fill="none" stroke="#0f172a" stroke-width="1.3"/>
            <circle cx="${ox}" cy="${oy}" r="2" fill="#0f172a"/>
            <text x="${ox - 6}" y="${oy + 4}" font-family="Arial" font-size="10px" font-weight="bold" fill="#0f172a" text-anchor="end">O</text>
            <text x="${ox + 10}" y="${oy - 20}" font-family="Arial" font-size="9.5px" font-weight="bold" fill="#0f172a">${theta}°</text>
            <text x="85" y="44" font-family="Arial" font-size="9.5px" font-weight="bold" fill="#0f172a" text-anchor="middle">A = ${areaVal} ${u}²</text>
            <text x="${ox + 25}" y="${oy + 13}" font-family="Arial" font-size="9.5px" font-weight="bold" fill="#0f172a">r = ?</text>
        </svg>
        `;

        const card = `
        <div style="border: 1px solid #cbd5e1; background: #fff; padding: 5px 9px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
                <span style="font-weight: bold; color: #1e293b; font-size: 0.85rem;">2. Despeje Inverso del Radio y Perímetro</span>
                <span class="mark">2</span>
            </div>
            <div style="font-size: 0.81rem; color: #1e293b; margin-bottom: 4px;">
                Sector circular con área <b>$A = ${areaVal}\\text{ ${u}}^2$</b> y ángulo central <b>$\\theta = ${theta}^\\circ$</b>.
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <div style="flex: 0 0 170px;">
                    ${svg}
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 0.81rem; font-weight: bold; color: #334155;">a) Plantee la ecuación y halle el radio ($r$):</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="19"></tlacuache-renglon>
                    <div style="font-size: 0.81rem; font-weight: bold; color: #334155; margin-top: 2px;">b) Perímetro total del sector:</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="19"></tlacuache-renglon>
                </div>
            </div>
        </div>
        `;
        cardsHtml.push(card);
        solucionesList.push(`<b>2. Despeje Inverso ($A = ${areaVal}\\text{ cm}^2,\\; \\theta = ${theta}^\\circ$):</b><br>&bull; Despeje de $r$: $A = \\frac{${theta}}{360}\\pi r^2 \\implies r = \\sqrt{\\frac{${areaVal} \\times 360}{${theta}\\pi}} \\approx <b>${roundTo3SF(rReal)}\\text{ cm}</b>$<br>&bull; Perímetro: $s = \\frac{${theta}}{360}(2\\pi r) \\approx ${roundTo3SF(arcoVal)}\\text{ cm} \\implies P = 2(${roundTo3SF(rReal)}) + ${roundTo3SF(arcoVal)} \\approx <b>${roundTo3SF(perimVal)}\\text{ cm}</b>$`);
    }

    // ==========================================
    // EJERCICIO 3: SECTOR DE CORONA CIRCULAR (Franja / Pantalla de Lámpara) [2 pts]
    // ==========================================
    {
        const rInt = Math.floor(Math.random() * 3) + 5; // 5, 6, 7 cm
        const w = Math.floor(Math.random() * 3) + 3; // 3, 4, 5 cm
        const rExt = rInt + w;
        const theta = (Math.floor(Math.random() * 5) + 6) * 15; // 90° a 150°
        const u = 'cm';

        const areaCorona = (theta / 360) * Math.PI * (rExt * rExt - rInt * rInt);
        const arcInt = (theta / 360) * 2 * Math.PI * rInt;
        const arcExt = (theta / 360) * 2 * Math.PI * rExt;
        const perimCorona = arcInt + arcExt + 2 * w;

        const angRad = (theta * Math.PI) / 180;
        const sRint = 32;
        const sRext = 64;
        const ox = 50, oy = 74;
        const xIntEnd = ox + sRint * Math.cos(angRad);
        const yIntEnd = oy - sRint * Math.sin(angRad);
        const xExtEnd = ox + sRext * Math.cos(angRad);
        const yExtEnd = oy - sRext * Math.sin(angRad);

        const svg = `
        <svg width="170" height="90" viewBox="0 0 170 90" style="display:block; margin: 0 auto; overflow:visible;">
            <path d="M ${ox + sRint} ${oy} L ${ox + sRext} ${oy} A ${sRext} ${sRext} 0 0 0 ${xExtEnd} ${yExtEnd} L ${xIntEnd} ${yIntEnd} A ${sRint} ${sRint} 0 0 1 ${ox + sRint} ${oy} Z" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.6"/>
            <line x1="${ox}" y1="${oy}" x2="${ox + sRint}" y2="${oy}" stroke="#64748b" stroke-dasharray="2,2"/>
            <line x1="${ox}" y1="${oy}" x2="${xIntEnd}" y2="${yIntEnd}" stroke="#64748b" stroke-dasharray="2,2"/>
            <circle cx="${ox}" cy="${oy}" r="2" fill="#0f172a"/>
            <path d="M ${ox + 16} ${oy} A 16 16 0 0 0 ${ox + 16 * Math.cos(angRad)} ${oy - 16 * Math.sin(angRad)}" fill="none" stroke="#0f172a" stroke-width="1.2"/>
            <text x="${ox + 18}" y="${oy - 7}" font-family="Arial" font-size="8.5px" font-weight="bold" fill="#0f172a">${theta}°</text>
            <text x="${ox + sRint / 2}" y="${oy + 11}" font-family="Arial" font-size="8.5px" font-weight="bold" fill="#0f172a" text-anchor="middle">r=${rInt}</text>
            <text x="${ox + (sRint + sRext) / 2}" y="${oy + 11}" font-family="Arial" font-size="8.5px" font-weight="bold" fill="#0f172a" text-anchor="middle">w=${w}</text>
            <text x="${ox + sRext + 2}" y="${oy - 6}" font-family="Arial" font-size="9px" font-weight="bold" fill="#0f172a">R=${rExt} ${u}</text>
        </svg>
        `;

        const card = `
        <div style="border: 1px solid #cbd5e1; background: #fff; padding: 5px 9px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
                <span style="font-weight: bold; color: #1e293b; font-size: 0.85rem;">3. Sector de Corona Circular (Anillo)</span>
                <span class="mark">2</span>
            </div>
            <div style="font-size: 0.81rem; color: #1e293b; margin-bottom: 4px;">
                Radios concéntricos <b>$r = ${rInt}\\text{ ${u}}$</b>, <b>$R = ${rExt}\\text{ ${u}}$</b> (ancho $w = ${w}\\text{ ${u}}$) y ángulo <b>$\\theta = ${theta}^\\circ$</b>.
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <div style="flex: 0 0 170px;">
                    ${svg}
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 0.81rem; font-weight: bold; color: #334155;">a) Área de la franja sombreada ($A_s$):</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="19"></tlacuache-renglon>
                    <div style="font-size: 0.81rem; font-weight: bold; color: #334155; margin-top: 2px;">b) Longitud total del contorno/perímetro:</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="19"></tlacuache-renglon>
                </div>
            </div>
        </div>
        `;
        cardsHtml.push(card);
        solucionesList.push(`<b>3. Sector de Corona ($r = ${rInt}\\text{ cm},\\; R = ${rExt}\\text{ cm},\\; \\theta = ${theta}^\\circ$):</b><br>&bull; Área: $A_s = \\frac{${theta}}{360}\\pi(R^2 - r^2) = \\frac{${theta}}{360}\\pi(${rExt}^2 - ${rInt}^2) = \\frac{${theta}}{360}\\pi(${rExt * rExt - rInt * rInt}) \\approx <b>${roundTo3SF(areaCorona)}\\text{ cm}^2</b>$<br>&bull; Contorno: $P = \\text{arco}_R + \\text{arco}_r + 2w = \\frac{${theta}}{360}(2\\pi\\cdot ${rExt}) + \\frac{${theta}}{360}(2\\pi\\cdot ${rInt}) + 2(${w}) \\approx ${roundTo3SF(arcExt)} + ${roundTo3SF(arcInt)} + ${2 * w} \\approx <b>${roundTo3SF(perimCorona)}\\text{ cm}</b>$`);
    }

    // ==========================================
    // EJERCICIO 4: CUADRANTE INSCRITO EN CUADRADO (Región Esquina / Sobrante) [2 pts]
    // ==========================================
    {
        const lado = Math.floor(Math.random() * 5) + 6; // 6 a 10 cm
        const u = 'cm';

        const areaCuadrado = lado * lado;
        const areaCuadrante = 0.25 * Math.PI * lado * lado;
        const areaSombra = areaCuadrado - areaCuadrante;
        const perimSombra = 2 * lado + 0.25 * 2 * Math.PI * lado;

        const svg = `
        <svg width="170" height="90" viewBox="0 0 170 90" style="display:block; margin: 0 auto; overflow:visible;">
            <!-- Square background -->
            <rect x="50" y="10" width="70" height="70" fill="#f8fafc" stroke="#0f172a" stroke-width="1.5"/>
            <!-- Shaded corner region (gris oscuro punteado o sombreado para BN) -->
            <path d="M 50,10 L 120,10 L 120,80 A 70 70 0 0 1 50,10 Z" fill="#94a3b8" stroke="none"/>
            <!-- Sector outline (white) -->
            <path d="M 50,80 L 120,80 A 70 70 0 0 1 50,10 Z" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
            <rect x="50" y="72" width="8" height="8" fill="none" stroke="#0f172a" stroke-width="1"/>
            <circle cx="50" cy="80" r="2" fill="#0f172a"/>
            <text x="85" y="88" font-family="Arial" font-size="10px" font-weight="bold" fill="#0f172a" text-anchor="middle">${lado} ${u}</text>
            <text x="43" y="48" font-family="Arial" font-size="10px" font-weight="bold" fill="#0f172a" text-anchor="end">${lado} ${u}</text>
            <text x="106" y="32" font-family="Arial" font-size="9px" font-weight="bold" fill="#0f172a">Sombra</text>
        </svg>
        `;

        const card = `
        <div style="border: 1px solid #cbd5e1; background: #fff; padding: 5px 9px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
                <span style="font-weight: bold; color: #1e293b; font-size: 0.85rem;">4. Cuadrado con Cuadrante Inscrito</span>
                <span class="mark">2</span>
            </div>
            <div style="font-size: 0.81rem; color: #1e293b; margin-bottom: 4px;">
                Cuadrado de lado <b>$a = ${lado}\\text{ ${u}}$</b> con un cuadrante de círculo inscrito de radio <b>$r = ${lado}\\text{ ${u}}$</b>.
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <div style="flex: 0 0 170px;">
                    ${svg}
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 0.81rem; font-weight: bold; color: #334155;">a) Área de la región sombreada exterior:</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="19"></tlacuache-renglon>
                    <div style="font-size: 0.81rem; font-weight: bold; color: #334155; margin-top: 2px;">b) Perímetro del contorno sombreado:</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="19"></tlacuache-renglon>
                </div>
            </div>
        </div>
        `;
        cardsHtml.push(card);
        solucionesList.push(`<b>4. Cuadrado y Cuadrante ($a = ${lado}\\text{ cm}$):</b><br>&bull; Área: $A_{\\text{cuad}} - A_{\\text{cuadra}} = ${lado}^2 - \\frac{1}{4}\\pi(${lado})^2 = ${areaCuadrado} - ${roundTo3SF(areaCuadrante)} \\approx <b>${roundTo3SF(areaSombra)}\\text{ cm}^2</b>$<br>&bull; Perímetro de la región: $2a + \\frac{1}{4}(2\\pi a) = 2(${lado}) + \\frac{\\pi(${lado})}{2} = ${2 * lado} + ${roundTo3SF(0.5 * Math.PI * lado)} \\approx <b>${roundTo3SF(perimSombra)}\\text{ cm}</b>$`);
    }

    // ==========================================
    // EJERCICIO 5: SEGMENTO CIRCULAR (Sector menos Triángulo Isósceles) [3 pts]
    // ==========================================
    {
        const r = Math.floor(Math.random() * 4) + 6; // 6, 7, 8, 9 cm
        const thetas = [60, 90, 120];
        const theta = thetas[Math.floor(Math.random() * thetas.length)];
        const u = 'cm';

        const areaSector = (theta / 360) * Math.PI * r * r;
        const thetaRad = (theta * Math.PI) / 180;
        const areaTriang = 0.5 * r * r * Math.sin(thetaRad);
        const areaSeg = areaSector - areaTriang;
        const cuerda = 2 * r * Math.sin(thetaRad / 2);

        // Visualización SVG del segmento circular
        const angRad = (theta * Math.PI) / 180;
        const svgR = 64;
        const ox = 40, oy = 74;
        const xEnd = ox + svgR * Math.cos(angRad);
        const yEnd = oy - svgR * Math.sin(angRad);

        const svg = `
        <svg width="170" height="90" viewBox="0 0 170 90" style="display:block; margin: 0 auto; overflow:visible;">
            <!-- Sector base white -->
            <path d="M ${ox} ${oy} L ${ox + svgR} ${oy} A ${svgR} ${svgR} 0 0 0 ${xEnd} ${yEnd} Z" fill="#f8fafc" stroke="#0f172a" stroke-width="1.3"/>
            <!-- Triangle white -->
            <polygon points="${ox},${oy} ${ox + svgR},${oy} ${xEnd},${yEnd}" fill="#ffffff" stroke="#0f172a" stroke-width="1.2"/>
            <!-- Segment fill (shaded gris medio en BN) -->
            <path d="M ${ox + svgR} ${oy} A ${svgR} ${svgR} 0 0 0 ${xEnd} ${yEnd} Z" fill="#94a3b8" stroke="#0f172a" stroke-width="1.6"/>
            <!-- Angle mark -->
            <circle cx="${ox}" cy="${oy}" r="2" fill="#0f172a"/>
            <text x="${ox - 6}" y="${oy + 4}" font-family="Arial" font-size="10px" font-weight="bold" fill="#0f172a" text-anchor="end">O</text>
            <text x="${ox + 18}" y="${oy - 8}" font-family="Arial" font-size="9px" font-weight="bold" fill="#0f172a">${theta}°</text>
            <text x="${ox + 30}" y="${oy + 12}" font-family="Arial" font-size="9.5px" font-weight="bold" fill="#0f172a">r = ${r} ${u}</text>
            <text x="${(ox + svgR + xEnd) / 2 + 10}" y="${(oy + yEnd) / 2 - 2}" font-family="Arial" font-size="9px" font-weight="bold" fill="#0f172a">Segmento</text>
        </svg>
        `;

        const card = `
        <div style="border: 1px solid #cbd5e1; background: #fff; padding: 5px 9px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
                <span style="font-weight: bold; color: #1e293b; font-size: 0.85rem;">5. Segmento Circular ($A_{\\text{sector}} - A_{\\triangle}$)</span>
                <span class="mark">3</span>
            </div>
            <div style="font-size: 0.81rem; color: #1e293b; margin-bottom: 4px;">
                Sector circular $AOB$ con radio <b>$r = ${r}\\text{ ${u}}$</b> y ángulo en el centro <b>$\\theta = ${theta}^\\circ$</b>.
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <div style="flex: 0 0 170px;">
                    ${svg}
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 0.81rem; font-weight: bold; color: #334155;">a) Calcule el área del $\\triangle AOB$ y del sector $AOB$:</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="19"></tlacuache-renglon>
                    <div style="font-size: 0.81rem; font-weight: bold; color: #334155; margin-top: 2px;">b) Área del segmento sombreado y longitud de la cuerda $AB$:</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="19"></tlacuache-renglon>
                </div>
            </div>
        </div>
        `;
        cardsHtml.push(card);
        solucionesList.push(`<b>5. Segmento Circular ($r = ${r}\\text{ cm},\\; \\theta = ${theta}^\\circ$):</b><br>&bull; $A_{\\text{sector}} = \\frac{${theta}}{360}\\pi(${r}^2) \\approx ${roundTo3SF(areaSector)}\\text{ cm}^2$<br>&bull; $A_{\\triangle} = \\frac{1}{2}(${r})(${r})\\sin(${theta}^\\circ) \\approx ${roundTo3SF(areaTriang)}\\text{ cm}^2$<br>&bull; $A_{\\text{segmento}} = ${roundTo3SF(areaSector)} - ${roundTo3SF(areaTriang)} \\approx <b>${roundTo3SF(areaSeg)}\\text{ cm}^2</b>$<br>&bull; Cuerda $AB = 2(${r})\\sin(${theta / 2}^\\circ) \\approx <b>${roundTo3SF(cuerda)}\\text{ cm}</b>$`);
    }

    // ==========================================
    // EJERCICIO 6: PÉTALO FORMADO POR DOS CUADRANTES INTERSECTADOS [3 pts]
    // ==========================================
    {
        const L = Math.floor(Math.random() * 4) + 6; // 6, 7, 8, 9 cm
        const u = 'cm';

        // Dos cuadrantes se superponen en un cuadrado de lado L.
        // Área del pétalo = 2 * A_cuadrante - A_cuadrado = 2*(pi/4 * L^2) - L^2 = L^2 (pi/2 - 1)
        const areaCuad = L * L;
        const areaCuadran = 0.25 * Math.PI * L * L;
        const areaPetalo = 2 * areaCuadran - areaCuad;
        const perimPetalo = 2 * (0.25 * 2 * Math.PI * L); // dos arcos de 90°

        const svg = `
        <svg width="170" height="90" viewBox="0 0 170 90" style="display:block; margin: 0 auto; overflow:visible;">
            <!-- Square -->
            <rect x="52" y="10" width="66" height="66" fill="#f8fafc" stroke="#0f172a" stroke-width="1.4"/>
            <!-- Petal lens shape (gris sombreado en BN) -->
            <path d="M 52,76 A 66 66 0 0 1 118,10 A 66 66 0 0 1 52,76 Z" fill="#94a3b8" stroke="#0f172a" stroke-width="1.6"/>
            <!-- Quadrant arcs -->
            <path d="M 52,76 A 66 66 0 0 1 118,10" fill="none" stroke="#0f172a" stroke-width="1.5"/>
            <path d="M 118,10 A 66 66 0 0 1 52,76" fill="none" stroke="#0f172a" stroke-width="1.5"/>
            <text x="85" y="86" font-family="Arial" font-size="10px" font-weight="bold" fill="#0f172a" text-anchor="middle">L = ${L} ${u}</text>
            <text x="45" y="47" font-family="Arial" font-size="10px" font-weight="bold" fill="#0f172a" text-anchor="end">L = ${L}</text>
            <text x="85" y="46" font-family="Arial" font-size="8.5px" font-weight="bold" fill="#0f172a" text-anchor="middle">Pétalo</text>
        </svg>
        `;

        const card = `
        <div style="border: 1px solid #cbd5e1; background: #fff; padding: 5px 9px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
                <span style="font-weight: bold; color: #1e293b; font-size: 0.85rem;">6. Intersección de Cuadrantes (Pétalo Central)</span>
                <span class="mark">3</span>
            </div>
            <div style="font-size: 0.81rem; color: #1e293b; margin-bottom: 4px;">
                Cuadrado de lado <b>$L = ${L}\\text{ ${u}}$</b> conteniendo dos cuadrantes con centros en vértices opuestos.
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <div style="flex: 0 0 170px;">
                    ${svg}
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 0.81rem; font-weight: bold; color: #334155;">a) Calcule el área del pétalo sombreado ($A_p$):</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="19"></tlacuache-renglon>
                    <div style="font-size: 0.81rem; font-weight: bold; color: #334155; margin-top: 2px;">b) Perímetro total del pétalo (suma de los dos arcos):</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="19"></tlacuache-renglon>
                </div>
            </div>
        </div>
        `;
        cardsHtml.push(card);
        solucionesList.push(`<b>6. Pétalo en Cuadrado ($L = ${L}\\text{ cm}$):</b><br>&bull; Área: $A_{\\text{pétalo}} = 2\\cdot A_{\\text{cuadrante}} - A_{\\text{cuadrado}} = 2\\left(\\frac{\\pi(${L})^2}{4}\\right) - ${L}^2 = \\frac{\\pi(${L}^2)}{2} - ${areaCuad} \\approx <b>${roundTo3SF(areaPetalo)}\\text{ cm}^2</b>$<br>&bull; Perímetro: $P = 2 \\times \\left(\\frac{90^\\circ}{360^\\circ} \\cdot 2\\pi(${L})\\right) = \\pi(${L}) \\approx <b>${roundTo3SF(perimPetalo)}\\text{ cm}</b>$`);
    }

    // ==========================================
    // EJERCICIO 7: VENTANA NORMANDA (Rectángulo coronado por Semicírculo) [3 pts]
    // ==========================================
    {
        const b = (Math.floor(Math.random() * 4) + 3) * 2; // base par: 6, 8, 10, 12 dm
        const hRect = Math.floor(Math.random() * 4) + 8; // altura recta: 8, 9, 10, 11 dm
        const rSemi = b / 2;
        const u = 'dm';

        const areaRect = b * hRect;
        const areaSemi = 0.5 * Math.PI * rSemi * rSemi;
        const areaTotal = areaRect + areaSemi;
        const perimVentana = b + 2 * hRect + Math.PI * rSemi; // contorno exterior

        const svg = `
        <svg width="170" height="92" viewBox="0 0 170 92" style="display:block; margin: 0 auto; overflow:visible;">
            <!-- Rectangle fill -->
            <rect x="60" y="38" width="50" height="46" fill="#f1f5f9" stroke="#0f172a" stroke-width="1.5"/>
            <!-- Semicircle fill -->
            <path d="M 60,38 A 25 25 0 0 1 110,38 Z" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.5"/>
            <!-- Separator dashed line -->
            <line x1="60" y1="38" x2="110" y2="38" stroke="#64748b" stroke-dasharray="2,2"/>
            <!-- Center dot and radius -->
            <circle cx="85" cy="38" r="1.5" fill="#0f172a"/>
            <line x1="85" y1="38" x2="110" y2="38" stroke="#0f172a" stroke-width="1.2"/>
            <text x="85" y="91" font-family="Arial" font-size="9.5px" font-weight="bold" fill="#0f172a" text-anchor="middle">b = ${b} ${u}</text>
            <text x="53" y="64" font-family="Arial" font-size="9.5px" font-weight="bold" fill="#0f172a" text-anchor="end">h = ${hRect} ${u}</text>
            <text x="97" y="34" font-family="Arial" font-size="8px" font-weight="bold" fill="#0f172a">r = ${rSemi}</text>
        </svg>
        `;

        const card = `
        <div style="border: 1px solid #cbd5e1; background: #fff; padding: 5px 9px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
                <span style="font-weight: bold; color: #1e293b; font-size: 0.85rem;">7. Ventana Normanda (Región Compuesta Sumativa)</span>
                <span class="mark">3</span>
            </div>
            <div style="font-size: 0.81rem; color: #1e293b; margin-bottom: 4px;">
                Base rectangular <b>$b = ${b}\\text{ ${u}}$</b>, altura recta <b>$h = ${hRect}\\text{ ${u}}$</b> y semicírculo superior de radio <b>$r = ${rSemi}\\text{ ${u}}$</b>.
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <div style="flex: 0 0 170px;">
                    ${svg}
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 0.81rem; font-weight: bold; color: #334155;">a) Área total de la ventana ($A_{\\text{total}}$):</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="19"></tlacuache-renglon>
                    <div style="font-size: 0.81rem; font-weight: bold; color: #334155; margin-top: 2px;">b) Perímetro del marco exterior de la ventana:</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="19"></tlacuache-renglon>
                </div>
            </div>
        </div>
        `;
        cardsHtml.push(card);
        solucionesList.push(`<b>7. Ventana Normanda ($b = ${b}\\text{ dm},\\; h = ${hRect}\\text{ dm},\\; r = ${rSemi}\\text{ dm}$):</b><br>&bull; Área: $A_{\\text{rect}} + A_{\\text{semi}} = (${b})(${hRect}) + \\frac{1}{2}\\pi(${rSemi})^2 = ${areaRect} + ${roundTo3SF(areaSemi)} \\approx <b>${roundTo3SF(areaTotal)}\\text{ dm}^2</b>$<br>&bull; Perímetro del marco: $b + 2h + \\pi r = ${b} + 2(${hRect}) + \\pi(${rSemi}) = ${b + 2 * hRect} + ${roundTo3SF(Math.PI * rSemi)} \\approx <b>${roundTo3SF(perimVentana)}\\text{ dm}</b>$`);
    }

    // ==========================================
    // EJERCICIO 8: CUADRO CON 4 CUADRANTES EN LAS ESQUINAS [3 pts]
    // ==========================================
    {
        const r = Math.floor(Math.random() * 3) + 3; // 3, 4, 5 cm
        const extra = Math.floor(Math.random() * 3) + 2; // separación central entre esquinas
        const lado = 2 * r + extra; // Lado del cuadrado
        const u = 'cm';

        // 4 cuadrantes de radio r forman 1 círculo completo de radio r
        const areaCuad = lado * lado;
        const areaCirculo = Math.PI * r * r;
        const areaCentral = areaCuad - areaCirculo;
        const perimCentral = 2 * Math.PI * r + 4 * extra; // arcos de los 4 cuadrantes más los 4 lados rectos intermedios

        const svg = `
        <svg width="170" height="92" viewBox="0 0 170 92" style="display:block; margin: 0 auto; overflow:visible;">
            <!-- Square base -->
            <rect x="52" y="11" width="66" height="66" fill="#cbd5e1" stroke="#0f172a" stroke-width="1.5"/>
            <!-- 4 corner white quadrants -->
            <!-- Top-left -->
            <path d="M 52,11 L 76,11 A 24 24 0 0 1 52,35 Z" fill="#ffffff" stroke="#0f172a" stroke-width="1.2"/>
            <!-- Top-right -->
            <path d="M 118,11 L 94,11 A 24 24 0 0 0 118,35 Z" fill="#ffffff" stroke="#0f172a" stroke-width="1.2"/>
            <!-- Bottom-left -->
            <path d="M 52,77 L 76,77 A 24 24 0 0 0 52,53 Z" fill="#ffffff" stroke="#0f172a" stroke-width="1.2"/>
            <!-- Bottom-right -->
            <path d="M 118,77 L 94,77 A 24 24 0 0 1 118,53 Z" fill="#ffffff" stroke="#0f172a" stroke-width="1.2"/>
            <!-- Labels -->
            <text x="85" y="87" font-family="Arial" font-size="9.5px" font-weight="bold" fill="#0f172a" text-anchor="middle">L = ${lado} ${u}</text>
            <text x="45" y="47" font-family="Arial" font-size="9.5px" font-weight="bold" fill="#0f172a" text-anchor="end">L = ${lado}</text>
            <text x="64" y="24" font-family="Arial" font-size="7.5px" font-weight="bold" fill="#0f172a">r=${r}</text>
            <text x="85" y="47" font-family="Arial" font-size="8.5px" font-weight="bold" fill="#0f172a" text-anchor="middle">Centro</text>
        </svg>
        `;

        const card = `
        <div style="border: 1px solid #cbd5e1; background: #fff; padding: 5px 9px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 3px;">
                <span style="font-weight: bold; color: #1e293b; font-size: 0.85rem;">8. Cuadrado con Cuatro Cuadrantes en los Vértices</span>
                <span class="mark">3</span>
            </div>
            <div style="font-size: 0.81rem; color: #1e293b; margin-bottom: 4px;">
                Cuadrado de lado <b>$L = ${lado}\\text{ ${u}}$</b> con cuatro cuadrantes de radio <b>$r = ${r}\\text{ ${u}}$</b> recortados en sus esquinas.
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <div style="flex: 0 0 170px;">
                    ${svg}
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 0.81rem; font-weight: bold; color: #334155;">a) Calcule el área de la región sombreada central:</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="19"></tlacuache-renglon>
                    <div style="font-size: 0.81rem; font-weight: bold; color: #334155; margin-top: 2px;">b) Perímetro que rodea la región sombreada:</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="19"></tlacuache-renglon>
                </div>
            </div>
        </div>
        `;
        cardsHtml.push(card);
        solucionesList.push(`<b>8. Cuadrado con 4 Esquinas Circulares ($L = ${lado}\\text{ cm},\\; r = ${r}\\text{ cm}$):</b><br>&bull; Los 4 cuadrantes forman un círculo completo: $A_{\\text{círculo}} = \\pi(${r})^2 = ${r * r}\\pi \\approx ${roundTo3SF(areaCirculo)}\\text{ cm}^2$<br>&bull; Área sombreada: $A_{\\text{cuadrado}} - A_{\\text{círculo}} = ${lado}^2 - \\pi(${r})^2 = ${areaCuad} - ${roundTo3SF(areaCirculo)} \\approx <b>${roundTo3SF(areaCentral)}\\text{ cm}^2</b>$<br>&bull; Perímetro de la región: $2\\pi r + 4(L - 2r) = 2\\pi(${r}) + 4(${extra}) = ${roundTo3SF(2 * Math.PI * r)} + ${4 * extra} \\approx <b>${roundTo3SF(perimCentral)}\\text{ cm}</b>$`);
    }

    // ==========================================
    // ENSAMBLE DE PÁGINAS Y RETORNO
    // ==========================================

    // PÁGINA 1: Ejercicios 1, 2, 3, 4 (2 puntos c/u = 8 puntos)
    html += `
    <div class="exercise-step">
        <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 4px;">
            ${cardsHtml[0]}
            ${cardsHtml[1]}
            ${cardsHtml[2]}
        </div>
    </div>
    <div class="page-break"></div>
    `;

    // PÁGINA 2: Ejercicios 5, 6, 7, 8 (3 puntos c/u = 12 puntos) (Total ficha: 20 pts)
    html += `
    <div class="exercise-step">
        <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 4px;">
            ${cardsHtml[3]}
            ${cardsHtml[4]}
            ${cardsHtml[5]}
            ${cardsHtml[6]}
            ${cardsHtml[7]}
        </div>
    </div>
    <div class="page-break"></div>
    `;

    // SOLUCIONARIO DETALLADO
    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem; line-height: 1.5;">
        <b>Solucionario 3.1.24 - Área de Sectores Circulares y Regiones Compuestas:</b><br><br>
        <b>Página 1 (Ejercicios 1 al 4 &mdash; 2 puntos c/u):</b><br>
        ${solucionesList.slice(0, 4).join('<br><br>')}<br><br>
        <b>Página 2 (Ejercicios 5 al 8 &mdash; 3 puntos c/u):</b><br>
        ${solucionesList.slice(4, 8).join('<br><br>')}
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
