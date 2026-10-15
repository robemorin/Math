// Generado para: Ficha de Superficie y Volumen de Sólidos (Prismas, Cilindros, Pirámides y Conos)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Superficie y Volumen de Sólidos (Prismas, Cilindros, Pirámides y Conos)";
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

    html += ai.getHeader("3.1.30", "3. Geometría y trigonometría", "Ficha: Superficie y Volumen de Sólidos");
    html += `
    <div class="contexto-especial" style="margin-bottom: 10px; font-size: 0.85rem; padding: 5px 10px;">
        <b>Instrucciones:</b> Para cada sólido, calcule el <b>Área de Superficie Total ($A_T$)</b> y el <b>Volumen ($V$)</b> a partir de las medidas dadas en la figura. En los conos y sólidos de base regular, determine primero los datos faltantes (apotemas, generatrices o alturas) mediante trigonometría o el Teorema de Pitágoras. Exprese sus respuestas finales con 3 cifras significativas y las unidades correspondientes.
    </div>
    `;

    // Total: 8 sólidos (4 en página 1, 4 en página 2)
    // PÁGINA 1: (2 pts c/u)
    // 1. Prisma Rectangular Recto
    // 2. Cilindro Circular Recto
    // 3. Prisma Triangular Recto
    // 4. Pirámide Recta de Base Cuadrada
    // PÁGINA 2:
    // 5. Cono Recto (dados r y h, hallar generatriz g) [2 pts]
    // 6. Cono Recto (dados r y g, hallar altura h) [2 pts]
    // 7. Prisma de Base Polígono Regular > 4 lados (Hexagonal / Pentagonal) [4 pts]
    // 8. Pirámide de Base Polígono Regular > 4 lados (Hexagonal / Pentagonal) [4 pts]

    const cardsHtml = [];
    const solucionesList = [];

    // ==========================================
    // 1. PRISMA RECTANGULAR RECTO [2 pts]
    // ==========================================
    {
        const l = Math.floor(Math.random() * 5) + 6; // 6 a 10
        const w = Math.floor(Math.random() * 4) + 3; // 3 a 6
        const h = Math.floor(Math.random() * 5) + 4; // 4 a 8
        const u = 'cm';

        const area = 2 * (l * w + l * h + w * h);
        const vol = l * w * h;

        const svg = `
        <svg width="170" height="90" viewBox="0 0 170 90" style="display:block; margin: 0 auto; overflow:visible;">
            <line x1="25" y1="70" x2="55" y2="35" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3"/>
            <line x1="55" y1="35" x2="135" y2="35" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3"/>
            <line x1="55" y1="35" x2="55" y2="10" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3"/>

            <polygon points="25,70 105,70 105,45 25,45" fill="#e2e8f0" stroke="#334155" stroke-width="1.5"/>
            <polygon points="105,70 135,35 135,10 105,45" fill="#cbd5e1" stroke="#334155" stroke-width="1.5"/>
            <polygon points="25,45 55,10 135,10 105,45" fill="#f8fafc" stroke="#334155" stroke-width="1.5"/>

            <text x="65" y="82" font-family="Arial" font-size="10.5px" font-weight="bold" fill="#1e293b" text-anchor="middle">${l} ${u}</text>
            <text x="123" y="60" font-family="Arial" font-size="10.5px" font-weight="bold" fill="#1e293b">${w} ${u}</text>
            <text x="16" y="58" font-family="Arial" font-size="10.5px" font-weight="bold" fill="#1e293b" text-anchor="end">${h} ${u}</text>
        </svg>
        `;

        const card = `
        <div style="border: 1px solid #cbd5e1; background: #fff; padding: 6px 10px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 4px;">
                <span style="font-weight: bold; color: #1e293b; font-size: 0.88rem;">1. Prisma Rectangular Recto</span>
                <span class="mark">2</span>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <div style="flex: 0 0 170px;">
                    ${svg}
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 0.82rem; font-weight: bold; color: #334155;">a) Área Total ($A_T$):</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>
                    <div style="font-size: 0.82rem; font-weight: bold; color: #334155; margin-top: 2px;">b) Volumen ($V$):</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>
                </div>
            </div>
        </div>
        `;
        cardsHtml.push(card);
        solucionesList.push(`<b>1. Prisma Rectangular:</b><br>&bull; $A_T = 2(${l}\\cdot${w} + ${l}\\cdot${h} + ${w}\\cdot${h}) = ${area}\\text{ cm}^2$<br>&bull; $V = ${l}\\times ${w}\\times ${h} = ${vol}\\text{ cm}^3$`);
    }

    // ==========================================
    // 2. CILINDRO CIRCULAR RECTO [2 pts]
    // ==========================================
    {
        const r = Math.floor(Math.random() * 4) + 3; // 3 a 6
        const h = Math.floor(Math.random() * 6) + 7; // 7 a 12
        const u = 'cm';

        const areaExactaPi = 2 * r * r + 2 * r * h;
        const areaNum = 2 * Math.PI * r * (r + h);
        const volExactoPi = r * r * h;
        const volNum = Math.PI * r * r * h;

        const svg = `
        <svg width="170" height="90" viewBox="0 0 170 90" style="display:block; margin: 0 auto; overflow:visible;">
            <path d="M 50,70 A 35 11 0 0 1 120,70" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" fill="none"/>
            <path d="M 50,70 A 35 11 0 0 0 120,70" stroke="#334155" stroke-width="1.5" fill="#e2e8f0"/>

            <rect x="50" y="20" width="70" height="50" fill="#f1f5f9" stroke="none"/>
            <path d="M 50,70 A 35 11 0 0 0 120,70 L 120,20 A 35 11 0 0 1 50,20 Z" fill="#f1f5f9" stroke="none"/>

            <line x1="50" y1="20" x2="50" y2="70" stroke="#334155" stroke-width="1.5"/>
            <line x1="120" y1="20" x2="120" y2="70" stroke="#334155" stroke-width="1.5"/>

            <ellipse cx="85" cy="20" rx="35" ry="11" fill="#cbd5e1" stroke="#334155" stroke-width="1.5"/>

            <line x1="85" y1="20" x2="120" y2="20" stroke="#2563eb" stroke-width="1.5"/>
            <circle cx="85" cy="20" r="2" fill="#2563eb"/>
            <text x="102" y="16" font-family="Arial" font-size="10.5px" font-weight="bold" fill="#2563eb" text-anchor="middle">r = ${r} ${u}</text>

            <line x1="38" y1="20" x2="38" y2="70" stroke="#dc2626" stroke-width="1.2"/>
            <line x1="34" y1="20" x2="42" y2="20" stroke="#dc2626" stroke-width="1.2"/>
            <line x1="34" y1="70" x2="42" y2="70" stroke="#dc2626" stroke-width="1.2"/>
            <text x="32" y="48" font-family="Arial" font-size="10.5px" font-weight="bold" fill="#dc2626" text-anchor="end">h = ${h} ${u}</text>
        </svg>
        `;

        const card = `
        <div style="border: 1px solid #cbd5e1; background: #fff; padding: 6px 10px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 4px;">
                <span style="font-weight: bold; color: #1e293b; font-size: 0.88rem;">2. Cilindro Circular Recto</span>
                <span class="mark">2</span>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <div style="flex: 0 0 170px;">
                    ${svg}
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 0.82rem; font-weight: bold; color: #334155;">a) Área Total ($A_T$):</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>
                    <div style="font-size: 0.82rem; font-weight: bold; color: #334155; margin-top: 2px;">b) Volumen ($V$):</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>
                </div>
            </div>
        </div>
        `;
        cardsHtml.push(card);
        solucionesList.push(`<b>2. Cilindro Circular:</b><br>&bull; $A_T = 2\\pi r(r+h) = 2\\pi(${r})(${r+h}) = ${areaExactaPi}\\pi \\approx ${roundTo3SF(areaNum)}\\text{ cm}^2$<br>&bull; $V = \\pi r^2 h = \\pi(${r})^2(${h}) = ${volExactoPi}\\pi \\approx ${roundTo3SF(volNum)}\\text{ cm}^3$`);
    }

    // ==========================================
    // 3. PRISMA TRIANGULAR RECTO [2 pts]
    // ==========================================
    {
        const mult = Math.floor(Math.random() * 2) + 1;
        const ca = 3 * mult;
        const co = 4 * mult;
        const hip = 5 * mult;
        const L = Math.floor(Math.random() * 4) + 8;
        const u = 'cm';

        const areaBase = (ca * co) / 2;
        const perimBase = ca + co + hip;
        const areaTotal = 2 * areaBase + perimBase * L;
        const vol = areaBase * L;

        const svg = `
        <svg width="170" height="90" viewBox="0 0 170 90" style="display:block; margin: 0 auto; overflow:visible;">
            <line x1="30" y1="70" x2="70" y2="35" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3"/>
            <line x1="70" y1="35" x2="135" y2="35" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3"/>
            <line x1="70" y1="35" x2="70" y2="10" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3"/>

            <polygon points="30,70 95,70 30,30" fill="#e2e8f0" stroke="#334155" stroke-width="1.5"/>
            <polygon points="30,30 95,70 135,35 70,-5" fill="#cbd5e1" stroke="#334155" stroke-width="1.5"/>

            <path d="M 30,60 L 40,60 L 40,70" fill="none" stroke="#334155" stroke-width="1.1"/>

            <line x1="95" y1="70" x2="135" y2="35" stroke="#334155" stroke-width="1.5"/>
            <line x1="30" y1="30" x2="70" y2="-5" stroke="#334155" stroke-width="1.5"/>
            <line x1="70" y1="-5" x2="135" y2="35" stroke="#334155" stroke-width="1.5"/>

            <text x="62" y="81" font-family="Arial" font-size="10px" font-weight="bold" fill="#1e293b" text-anchor="middle">${ca} ${u}</text>
            <text x="22" y="52" font-family="Arial" font-size="10px" font-weight="bold" fill="#1e293b" text-anchor="end">${co} ${u}</text>
            <text x="68" y="44" font-family="Arial" font-size="9.5px" font-weight="bold" fill="#1e293b">${hip} ${u}</text>
            <text x="120" y="60" font-family="Arial" font-size="10px" font-weight="bold" fill="#1e293b">${L} ${u}</text>
        </svg>
        `;

        const card = `
        <div style="border: 1px solid #cbd5e1; background: #fff; padding: 6px 10px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 4px;">
                <span style="font-weight: bold; color: #1e293b; font-size: 0.88rem;">3. Prisma Triangular Recto</span>
                <span class="mark">2</span>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <div style="flex: 0 0 170px;">
                    ${svg}
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 0.82rem; font-weight: bold; color: #334155;">a) Área Total ($A_T$):</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>
                    <div style="font-size: 0.82rem; font-weight: bold; color: #334155; margin-top: 2px;">b) Volumen ($V$):</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>
                </div>
            </div>
        </div>
        `;
        cardsHtml.push(card);
        solucionesList.push(`<b>3. Prisma Triangular:</b><br>&bull; $A_{\\text{base}} = \\frac{${ca}\\times ${co}}{2} = ${areaBase}\\text{ cm}^2$<br>&bull; $A_T = 2(${areaBase}) + (${ca}+${co}+${hip})(${L}) = ${areaTotal}\\text{ cm}^2$<br>&bull; $V = ${areaBase}\\times ${L} = ${vol}\\text{ cm}^3$`);
    }

    // ==========================================
    // 4. PIRÁMIDE RECTA DE BASE CUADRADA [2 pts]
    // ==========================================
    {
        const b = (Math.floor(Math.random() * 3) + 3) * 2; // 6, 8, 10
        const h = Math.floor(Math.random() * 4) + 6; // 6, 7, 8, 9
        const u = 'cm';

        const apotema = Math.sqrt(h * h + (b / 2) * (b / 2));
        const areaBase = b * b;
        const areaLateral = 4 * (0.5 * b * apotema);
        const areaTotal = areaBase + areaLateral;
        const vol = (1 / 3) * areaBase * h;

        const svg = `
        <svg width="170" height="92" viewBox="0 0 170 92" style="display:block; margin: 0 auto; overflow:visible;">
            <line x1="30" y1="75" x2="60" y2="52" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3"/>
            <line x1="60" y1="52" x2="135" y2="52" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3"/>

            <line x1="82" y1="12" x2="82" y2="63" stroke="#dc2626" stroke-width="1.3" stroke-dasharray="3,3"/>
            <line x1="82" y1="63" x2="67" y2="75" stroke="#dc2626" stroke-width="1.1" stroke-dasharray="3,3"/>

            <line x1="82" y1="12" x2="67" y2="75" stroke="#2563eb" stroke-width="1.4"/>

            <polygon points="30,75 105,75 82,12" fill="#f1f5f9" stroke="#334155" stroke-width="1.5"/>
            <polygon points="105,75 135,52 82,12" fill="#cbd5e1" stroke="#334155" stroke-width="1.5"/>

            <line x1="30" y1="75" x2="105" y2="75" stroke="#334155" stroke-width="1.5"/>
            <line x1="105" y1="75" x2="135" y2="52" stroke="#334155" stroke-width="1.5"/>
            <line x1="30" y1="75" x2="82" y2="12" stroke="#334155" stroke-width="1.5"/>

            <text x="67" y="86" font-family="Arial" font-size="10.5px" font-weight="bold" fill="#1e293b" text-anchor="middle">L = ${b} ${u}</text>
            <text x="86" y="44" font-family="Arial" font-size="10px" font-weight="bold" fill="#dc2626">h = ${h} ${u}</text>
            <text x="63" y="40" font-family="Arial" font-size="9.5px" font-weight="bold" fill="#2563eb" text-anchor="end">ap</text>
        </svg>
        `;

        const card = `
        <div style="border: 1px solid #cbd5e1; background: #fff; padding: 6px 10px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 4px;">
                <span style="font-weight: bold; color: #1e293b; font-size: 0.88rem;">4. Pirámide Recta de Base Cuadrada</span>
                <span class="mark">2</span>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <div style="flex: 0 0 170px;">
                    ${svg}
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 0.82rem; font-weight: bold; color: #334155;">a) Apotema ($ap$) y Área Total ($A_T$):</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>
                    <div style="font-size: 0.82rem; font-weight: bold; color: #334155; margin-top: 2px;">b) Volumen ($V$):</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>
                </div>
            </div>
        </div>
        `;
        cardsHtml.push(card);
        solucionesList.push(`<b>4. Pirámide de Base Cuadrada:</b><br>&bull; Apotema lateral: $ap = \\sqrt{${h}^2 + (${b / 2})^2} = \\sqrt{${h * h + (b / 2) * (b / 2)}} \\approx ${roundTo3SF(apotema)}\\text{ cm}$<br>&bull; $A_T = (${b})^2 + 4\\left(\\frac{${b}\\cdot ap}{2}\\right) = ${areaBase} + 2(${b})(${roundTo3SF(apotema)}) \\approx ${roundTo3SF(areaTotal)}\\text{ cm}^2$<br>&bull; $V = \\frac{1}{3}(${b}^2)(${h}) = ${roundTo3SF(vol)}\\text{ cm}^3$`);
    }

    // ==========================================
    // 5. CONO CIRCULAR RECTO - CASO 1: Dados r y h (Hallar g) [2 pts]
    // ==========================================
    {
        const r = Math.floor(Math.random() * 3) + 3; // 3 a 5
        const h = Math.floor(Math.random() * 4) + 6; // 6 a 9
        const g = Math.sqrt(r * r + h * h);
        const u = 'cm';

        const areaTotal = Math.PI * r * (r + g);
        const vol = (1 / 3) * Math.PI * r * r * h;

        const svg = `
        <svg width="170" height="92" viewBox="0 0 170 92" style="display:block; margin: 0 auto; overflow:visible;">
            <path d="M 45,75 A 38 11 0 0 1 125,75" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" fill="none"/>
            <path d="M 45,75 A 38 11 0 0 0 125,75" stroke="#334155" stroke-width="1.5" fill="#e2e8f0"/>

            <polygon points="45,75 85,15 125,75" fill="#f1f5f9" stroke="none"/>
            <line x1="45" y1="75" x2="85" y2="15" stroke="#334155" stroke-width="1.5"/>
            <line x1="125" y1="75" x2="85" y2="15" stroke="#334155" stroke-width="1.5"/>

            <line x1="85" y1="15" x2="85" y2="75" stroke="#dc2626" stroke-width="1.3" stroke-dasharray="3,3"/>
            <line x1="85" y1="75" x2="125" y2="75" stroke="#2563eb" stroke-width="1.5"/>
            <circle cx="85" cy="75" r="2" fill="#2563eb"/>

            <path d="M 85,67 L 93,67 L 93,75" fill="none" stroke="#dc2626" stroke-width="1.1"/>

            <text x="105" y="86" font-family="Arial" font-size="10.5px" font-weight="bold" fill="#2563eb" text-anchor="middle">r = ${r} ${u}</text>
            <text x="79" y="48" font-family="Arial" font-size="10.5px" font-weight="bold" fill="#dc2626" text-anchor="end">h = ${h} ${u}</text>
            <text x="58" y="42" font-family="Arial" font-size="10px" font-weight="bold" fill="#047857" text-anchor="end">g = ?</text>
        </svg>
        `;

        const card = `
        <div style="border: 1px solid #cbd5e1; background: #fff; padding: 6px 10px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 4px;">
                <span style="font-weight: bold; color: #1e293b; font-size: 0.88rem;">5. Cono Circular Recto (Hallar Generatriz $g$)</span>
                <span class="mark">2</span>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <div style="flex: 0 0 170px;">
                    ${svg}
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 0.82rem; font-weight: bold; color: #334155;">a) Generatriz ($g$) y Área Total ($A_T$):</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>
                    <div style="font-size: 0.82rem; font-weight: bold; color: #334155; margin-top: 2px;">b) Volumen ($V$):</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>
                </div>
            </div>
        </div>
        `;
        cardsHtml.push(card);
        solucionesList.push(`<b>5. Cono ($r$ y $h$):</b><br>&bull; $g = \\sqrt{${r}^2 + ${h}^2} = \\sqrt{${r * r + h * h}} \\approx ${roundTo3SF(g)}\\text{ cm}$<br>&bull; $A_T = \\pi r^2 + \\pi r g = \\pi(${r})^2 + \\pi(${r})(${roundTo3SF(g)}) \\approx ${roundTo3SF(areaTotal)}\\text{ cm}^2$<br>&bull; $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi(${r})^2(${h}) \\approx ${roundTo3SF(vol)}\\text{ cm}^3$`);
    }

    // ==========================================
    // 6. CONO CIRCULAR RECTO - CASO 2: Dados r y g (Hallar h) [2 pts]
    // ==========================================
    {
        const r = Math.floor(Math.random() * 3) + 4; // 4, 5, 6
        const hInt = Math.floor(Math.random() * 3) + 7; // 7, 8, 9
        const g = Math.round(Math.sqrt(r * r + hInt * hInt) * 10) / 10;
        const hReal = Math.sqrt(g * g - r * r);
        const u = 'cm';

        const areaTotal = Math.PI * r * (r + g);
        const vol = (1 / 3) * Math.PI * r * r * hReal;

        const svg = `
        <svg width="170" height="92" viewBox="0 0 170 92" style="display:block; margin: 0 auto; overflow:visible;">
            <path d="M 45,75 A 38 11 0 0 1 125,75" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3,3" fill="none"/>
            <path d="M 45,75 A 38 11 0 0 0 125,75" stroke="#334155" stroke-width="1.5" fill="#e2e8f0"/>

            <polygon points="45,75 85,15 125,75" fill="#f1f5f9" stroke="none"/>
            <line x1="45" y1="75" x2="85" y2="15" stroke="#334155" stroke-width="1.5"/>
            <line x1="125" y1="75" x2="85" y2="15" stroke="#334155" stroke-width="1.5"/>

            <line x1="85" y1="15" x2="85" y2="75" stroke="#dc2626" stroke-width="1.3" stroke-dasharray="3,3"/>
            <line x1="85" y1="75" x2="125" y2="75" stroke="#2563eb" stroke-width="1.5"/>
            <circle cx="85" cy="75" r="2" fill="#2563eb"/>

            <path d="M 85,67 L 93,67 L 93,75" fill="none" stroke="#dc2626" stroke-width="1.1"/>

            <text x="105" y="86" font-family="Arial" font-size="10.5px" font-weight="bold" fill="#2563eb" text-anchor="middle">r = ${r} ${u}</text>
            <text x="79" y="48" font-family="Arial" font-size="10.5px" font-weight="bold" fill="#dc2626" text-anchor="end">h = ?</text>
            <text x="115" y="42" font-family="Arial" font-size="10.5px" font-weight="bold" fill="#047857">g = ${g} ${u}</text>
        </svg>
        `;

        const card = `
        <div style="border: 1px solid #cbd5e1; background: #fff; padding: 6px 10px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 4px;">
                <span style="font-weight: bold; color: #1e293b; font-size: 0.88rem;">6. Cono Circular Recto (Hallar Altura $h$)</span>
                <span class="mark">2</span>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
                <div style="flex: 0 0 170px;">
                    ${svg}
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 0.82rem; font-weight: bold; color: #334155;">a) Altura ($h$) y Área Total ($A_T$):</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>
                    <div style="font-size: 0.82rem; font-weight: bold; color: #334155; margin-top: 2px;">b) Volumen ($V$):</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>
                </div>
            </div>
        </div>
        `;
        cardsHtml.push(card);
        solucionesList.push(`<b>6. Cono ($r$ y $g$):</b><br>&bull; $h = \\sqrt{${g}^2 - ${r}^2} = \\sqrt{${Math.round((g * g - r * r) * 100) / 100}} \\approx ${roundTo3SF(hReal)}\\text{ cm}$<br>&bull; $A_T = \\pi r^2 + \\pi r g = \\pi(${r})^2 + \\pi(${r})(${g}) \\approx ${roundTo3SF(areaTotal)}\\text{ cm}^2$<br>&bull; $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi(${r})^2(${roundTo3SF(hReal)}) \\approx ${roundTo3SF(vol)}\\text{ cm}^3$`);
    }

    // ==========================================
    // 7. PRISMA RECTO DE BASE POLIGONAL REGULAR (5 a 10 lados, sin figura) [4 pts]
    // ==========================================
    {
        const poligonoInfo = [
            { n: 5, nombre: 'pentagonal regular' },
            { n: 6, nombre: 'hexagonal regular' },
            { n: 7, nombre: 'heptagonal regular' },
            { n: 8, nombre: 'octagonal regular' },
            { n: 9, nombre: 'nonagonal regular' },
            { n: 10, nombre: 'decagonal regular' }
        ];
        const poli = poligonoInfo[Math.floor(Math.random() * poligonoInfo.length)];
        const nLados = poli.n;
        const nombrePoli = poli.nombre;

        const s = Math.floor(Math.random() * 4) + 4; // lado: 4 a 7 cm
        const h = Math.floor(Math.random() * 5) + 8; // altura: 8 a 12 cm
        const u = 'cm';

        // Apotema de base: ap = s / (2 * tan(180° / n))
        const angRad = (Math.PI / nLados);
        const apBase = s / (2 * Math.tan(angRad));
        const perimBase = nLados * s;
        const areaBase = (perimBase * apBase) / 2;
        const areaLateral = perimBase * h;
        const areaTotal = 2 * areaBase + areaLateral;
        const vol = areaBase * h;

        const card = `
        <div style="border: 1px solid #cbd5e1; background: #fff; padding: 6px 12px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 4px;">
                <span style="font-weight: bold; color: #1e293b; font-size: 0.88rem;">7. Prisma Recto de Base ${nombrePoli.charAt(0).toUpperCase() + nombrePoli.slice(1)}</span>
                <span class="mark">4</span>
            </div>
            <div style="margin-bottom: 4px; font-size: 0.86rem; color: #1e293b;">
                Considere un prisma recto cuya base es un <b>polígono ${nombrePoli}</b> ($n = ${nLados}$) con lado de base $s = ${s}\\text{ ${u}}$ y altura del prisma $h = ${h}\\text{ ${u}}$.
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div>
                    <div style="font-size: 0.82rem; font-weight: bold; color: #334155;">a) Apotema de la base ($ap_b$) y Área Total ($A_T$):</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>
                </div>
                <div>
                    <div style="font-size: 0.82rem; font-weight: bold; color: #334155;">b) Volumen ($V$):</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>
                </div>
            </div>
        </div>
        `;
        cardsHtml.push(card);
        solucionesList.push(`<b>7. Prisma de Base ${nombrePoli.charAt(0).toUpperCase() + nombrePoli.slice(1)} ($n=${nLados}$):</b><br>&bull; Apotema base: $ap_b = \\frac{${s}}{2\\tan(${roundTo3SF(180 / nLados)}^\\circ)} \\approx ${roundTo3SF(apBase)}\\text{ cm}$<br>&bull; $A_{\\text{base}} = \\frac{${nLados}(${s})(${roundTo3SF(apBase)})}{2} \\approx ${roundTo3SF(areaBase)}\\text{ cm}^2$<br>&bull; $A_T = 2(${roundTo3SF(areaBase)}) + ${nLados}(${s})(${h}) \\approx ${roundTo3SF(areaTotal)}\\text{ cm}^2$<br>&bull; $V = (${roundTo3SF(areaBase)})(${h}) \\approx ${roundTo3SF(vol)}\\text{ cm}^3$`);
    }

    // ==========================================
    // 8. PIRÁMIDE RECTA DE BASE POLIGONAL REGULAR (5 a 10 lados, sin figura) [4 pts]
    // ==========================================
    {
        const poligonoInfo = [
            { n: 5, nombre: 'pentagonal regular' },
            { n: 6, nombre: 'hexagonal regular' },
            { n: 7, nombre: 'heptagonal regular' },
            { n: 8, nombre: 'octagonal regular' },
            { n: 9, nombre: 'nonagonal regular' },
            { n: 10, nombre: 'decagonal regular' }
        ];
        const poli = poligonoInfo[Math.floor(Math.random() * poligonoInfo.length)];
        const nLados = poli.n;
        const nombrePoli = poli.nombre;

        const s = Math.floor(Math.random() * 4) + 4; // lado: 4 a 7 cm
        const h = Math.floor(Math.random() * 4) + 7; // altura vertical: 7 a 10 cm
        const u = 'cm';

        const angRad = (Math.PI / nLados);
        const apBase = s / (2 * Math.tan(angRad));
        const apLateral = Math.sqrt(h * h + apBase * apBase);
        const perimBase = nLados * s;
        const areaBase = (perimBase * apBase) / 2;
        const areaLateral = nLados * (0.5 * s * apLateral);
        const areaTotal = areaBase + areaLateral;
        const vol = (1 / 3) * areaBase * h;

        const card = `
        <div style="border: 1px solid #cbd5e1; background: #fff; padding: 6px 12px; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; margin-bottom: 4px;">
                <span style="font-weight: bold; color: #1e293b; font-size: 0.88rem;">8. Pirámide Recta de Base ${nombrePoli.charAt(0).toUpperCase() + nombrePoli.slice(1)}</span>
                <span class="mark">4</span>
            </div>
            <div style="margin-bottom: 4px; font-size: 0.86rem; color: #1e293b;">
                Considere una pirámide recta cuya base es un <b>polígono ${nombrePoli}</b> ($n = ${nLados}$) con lado de base $s = ${s}\\text{ ${u}}$ y altura vertical perpendicular $h = ${h}\\text{ ${u}}$.
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div>
                    <div style="font-size: 0.82rem; font-weight: bold; color: #334155;">a) Apotemas ($ap_b$, $ap_l$) y Área Total ($A_T$):</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>
                </div>
                <div>
                    <div style="font-size: 0.82rem; font-weight: bold; color: #334155;">b) Volumen ($V$):</div>
                    <tlacuache-renglon n="2" color="#f9f9f9" alto="20"></tlacuache-renglon>
                </div>
            </div>
        </div>
        `;
        cardsHtml.push(card);
        solucionesList.push(`<b>8. Pirámide de Base ${nombrePoli.charAt(0).toUpperCase() + nombrePoli.slice(1)} ($n=${nLados}$):</b><br>&bull; Apotema base: $ap_b = \\frac{${s}}{2\\tan(${roundTo3SF(180 / nLados)}^\\circ)} \\approx ${roundTo3SF(apBase)}\\text{ cm}$<br>&bull; Apotema lateral: $ap_l = \\sqrt{${h}^2 + (${roundTo3SF(apBase)})^2} \\approx ${roundTo3SF(apLateral)}\\text{ cm}$<br>&bull; $A_{\\text{base}} = \\frac{${nLados}(${s})(${roundTo3SF(apBase)})}{2} \\approx ${roundTo3SF(areaBase)}\\text{ cm}^2$<br>&bull; $A_T = ${roundTo3SF(areaBase)} + ${nLados}\\left(\\frac{${s}\\cdot ${roundTo3SF(apLateral)}}{2}\\right) \\approx ${roundTo3SF(areaTotal)}\\text{ cm}^2$<br>&bull; $V = \\frac{1}{3}(${roundTo3SF(areaBase)})(${h}) \\approx ${roundTo3SF(vol)}\\text{ cm}^3$`);
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

    // PÁGINA 2: Ejercicios 5, 6 (2 pts c/u) y 7, 8 (4 pts c/u) = 12 puntos (Total ficha: 20 pts)
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

    // SOLUCIONARIO
    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem; line-height: 1.5;">
        <b>Solucionario 3.1.30 - Superficie y Volumen de Sólidos:</b><br><br>
        <b>Página 1 (2 puntos c/u):</b><br>
        ${solucionesList.slice(0, 4).join('<br><br>')}<br><br>
        <b>Página 2 (Ej. 5-6: 2 pts c/u | Ej. 7-8: 4 pts c/u):</b><br>
        ${solucionesList.slice(4, 8).join('<br><br>')}
    </div>
    `;

    return [html, solucion];
}
