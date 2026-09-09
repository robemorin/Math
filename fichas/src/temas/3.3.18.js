import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Aplicaciones en Rombos y Trapecios";
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("3.3.18", "3. Geometría y trigonometría", "Ficha: Aplicaciones en Rombos y Trapecios");

    const figuras = [];
    const respuestasVal = [];
    
    // ======================================================
    // FIGURA 1: Trapecio - Encontrar lado x
    // ======================================================
    const a1 = Math.floor(Math.random() * 4) + 6;
    const ang1 = [65, 70, 75][Math.floor(Math.random() * 3)];
    const ang2 = [48, 52, 55][Math.floor(Math.random() * 3)];
    const h1 = a1 * Math.sin(ang1 * Math.PI / 180);
    const x1 = (h1 / Math.sin(ang2 * Math.PI / 180)).toFixed(1);
    respuestasVal.push(`${x1} \\text{ cm}`);

    figuras.push({
        instrucción: "Halle la longitud del lado $x$:",
        svg: `
        <svg width="200" height="130" style="display: block; margin: auto; overflow: visible;">
            <!-- Trapecio -->
            <polygon points="50,30 110,30 160,100 20,100" fill="none" stroke="black" stroke-width="2" />
            <!-- Ángulos base -->
            <path d="M 35,100 A 15,15 0 0 1 30,86" fill="none" stroke="black" stroke-width="1.2" />
            <text x="35" y="93" font-family="Arial" font-size="11">${ang1}°</text>
            
            <path d="M 145,100 A 15,15 0 0 0 151,88" fill="none" stroke="black" stroke-width="1.2" />
            <text x="128" y="93" font-family="Arial" font-size="11">${ang2}°</text>
            
            <!-- Etiquetas de lados -->
            <text x="25" y="60" font-family="Arial" font-size="12" text-anchor="end">${a1} cm</text>
            <text x="145" y="60" font-family="Arial" font-size="12" text-anchor="start">x</text>
        </svg>`
    });

    // ======================================================
    // FIGURA 2: Rombo - Encontrar el Área
    // ======================================================
    const lado2 = Math.floor(Math.random() * 5) + 5;
    const ang2_val = [50, 60, 70][Math.floor(Math.random() * 3)];
    const area2 = (lado2 * lado2 * Math.sin(ang2_val * Math.PI / 180)).toFixed(1);
    respuestasVal.push(`${area2} \\text{ cm}^2`);

    figuras.push({
        instrucción: "Halle el área del rombo:",
        svg: `
        <svg width="200" height="130" style="display: block; margin: auto; overflow: visible;">
            <!-- Rombo -->
            <polygon points="70,30 150,30 130,100 50,100" fill="none" stroke="black" stroke-width="2" />
            <!-- Ángulo -->
            <path d="M 65,100 A 15,15 0 0 1 61,86" fill="none" stroke="black" stroke-width="1.2" />
            <text x="68" y="93" font-family="Arial" font-size="11">${ang2_val}°</text>
            <!-- Etiquetas de lados con marcas de igual (opcional, ponemos lado) -->
            <text x="85" y="65" font-family="Arial" font-size="12" text-anchor="end">${lado2} cm</text>
            <text x="100" y="23" font-family="Arial" font-size="12" text-anchor="middle">${lado2} cm</text>
        </svg>`
    });

    // ======================================================
    // FIGURA 3: Trapecio - Encontrar ángulo α
    // ======================================================
    const a3 = 6;
    const b3 = 8;
    const ang3_base = 70;
    const h3 = a3 * Math.sin(ang3_base * Math.PI / 180);
    const alpha3_rad = Math.asin(h3 / b3);
    const alpha3 = (alpha3_rad * 180 / Math.PI).toFixed(1);
    respuestasVal.push(`${alpha3}^\\circ`);

    figuras.push({
        instrucción: "Halle el ángulo $\\alpha$:",
        svg: `
        <svg width="200" height="130" style="display: block; margin: auto; overflow: visible;">
            <polygon points="50,30 110,30 160,100 20,100" fill="none" stroke="black" stroke-width="2" />
            <!-- Ángulos base -->
            <path d="M 35,100 A 15,15 0 0 1 30,86" fill="none" stroke="black" stroke-width="1.2" />
            <text x="35" y="93" font-family="Arial" font-size="11">${ang3_base}°</text>
            
            <path d="M 145,100 A 15,15 0 0 0 151,88" fill="none" stroke="black" stroke-width="1.2" />
            <text x="135" y="93" font-family="Cambria Math, serif" font-size="12" font-style="italic">α</text>
            
            <!-- Etiquetas de lados -->
            <text x="25" y="60" font-family="Arial" font-size="12" text-anchor="end">${a3} cm</text>
            <text x="145" y="60" font-family="Arial" font-size="12" text-anchor="start">${b3} cm</text>
        </svg>`
    });

    // ======================================================
    // FIGURA 4: Rombo - Encontrar diagonal menor x
    // ======================================================
    const lado4 = Math.floor(Math.random() * 5) + 8;
    const ang4_val = [50, 60][Math.floor(Math.random() * 2)];
    const diagMenor4 = (2 * lado4 * Math.sin((ang4_val / 2) * Math.PI / 180)).toFixed(1);
    respuestasVal.push(`${diagMenor4} \\text{ m}`);

    figuras.push({
        instrucción: "Halle la longitud de la diagonal menor $x$:",
        svg: `
        <svg width="200" height="130" style="display: block; margin: auto; overflow: visible;">
            <!-- Rombo verticalizado -->
            <polygon points="100,20 150,65 100,110 50,65" fill="none" stroke="black" stroke-width="2" />
            <!-- Diagonal menor -->
            <line x1="50" y1="65" x2="150" y2="65" stroke="gray" stroke-dasharray="3,3" stroke-width="1.2" />
            <!-- Ángulo agudo a la izquierda -->
            <path d="M 65,60 A 15,15 0 0 1 65,70" fill="none" stroke="black" stroke-width="1.2" />
            <text x="68" y="68" font-family="Arial" font-size="11">${ang4_val}°</text>
            <!-- Lado -->
            <text x="135" y="40" font-family="Arial" font-size="12">${lado4} m</text>
            <!-- Diagonal etiqueta -->
            <text x="100" y="60" font-family="Arial" font-size="12" text-anchor="middle">x</text>
        </svg>`
    });

    // ======================================================
    // FIGURA 5: Trapecio - Encontrar el Área
    // ======================================================
    const bInf5 = Math.floor(Math.random() * 4) + 12;
    const bSup5 = Math.floor(Math.random() * 3) + 7;
    const ladoLat5 = Math.floor(Math.random() * 3) + 6;
    const ang5_val = 65;
    const h5 = ladoLat5 * Math.sin(ang5_val * Math.PI / 180);
    const area5 = (((bInf5 + bSup5) / 2) * h5).toFixed(1);
    respuestasVal.push(`${area5} \\text{ m}^2`);

    figuras.push({
        instrucción: "Halle el área del trapecio:",
        svg: `
        <svg width="200" height="130" style="display: block; margin: auto; overflow: visible;">
            <polygon points="60,30 130,30 170,100 30,100" fill="none" stroke="black" stroke-width="2" />
            <!-- Ángulo -->
            <path d="M 45,100 A 15,15 0 0 1 41,86" fill="none" stroke="black" stroke-width="1.2" />
            <text x="48" y="93" font-family="Arial" font-size="11">${ang5_val}°</text>
            <!-- Lados -->
            <text x="35" y="65" font-family="Arial" font-size="12" text-anchor="end">${ladoLat5} m</text>
            <text x="95" y="23" font-family="Arial" font-size="12" text-anchor="middle">${bSup5} m</text>
            <text x="100" y="115" font-family="Arial" font-size="12" text-anchor="middle">${bInf5} m</text>
        </svg>`
    });

    // ======================================================
    // FIGURA 6: Paralelogramo - Encontrar lado x
    // ======================================================
    const base6 = Math.floor(Math.random() * 4) + 8;
    const ang6_val = 55;
    const areaDada6 = Math.floor(Math.random() * 15) + 35;
    const x6 = (areaDada6 / (base6 * Math.sin(ang6_val * Math.PI / 180))).toFixed(1);
    respuestasVal.push(`${x6} \\text{ cm}`);

    figuras.push({
        instrucción: `Halle la longitud del lado $x$, si el área de la figura es $ ${areaDada6}\\text{ cm}^2$:`,
        svg: `
        <svg width="200" height="130" style="display: block; margin: auto; overflow: visible;">
            <polygon points="60,30 150,30 130,100 40,100" fill="none" stroke="black" stroke-width="2" />
            <path d="M 55,100 A 15,15 0 0 1 51,86" fill="none" stroke="black" stroke-width="1.2" />
            <text x="58" y="93" font-family="Arial" font-size="11">${ang6_val}°</text>
            <!-- Lados -->
            <text x="85" y="115" font-family="Arial" font-size="12" text-anchor="middle">${base6} cm</text>
            <text x="42" y="65" font-family="Arial" font-size="12" text-anchor="end">x</text>
        </svg>`
    });

    html += `
    <div class="seccion-title">I. Aplicaciones Geométricas</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            Calcula el valor solicitado en cada una de las siguientes figuras (redondea a 3 cifras significativas):
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 20px;">
            <div style="border: 1px solid #ddd; padding: 15px; border-radius: 6px; text-align: center; page-break-inside: avoid;">
                <p style="margin: 0 0 10px 0; font-weight: bold; text-align: left;">1. ${figuras[0].instrucción}</p>
                ${figuras[0].svg}
                <tlacuache-renglon n="2" color="#f9f9f9" alto="25"></tlacuache-renglon>
            </div>
            <div style="border: 1px solid #ddd; padding: 15px; border-radius: 6px; text-align: center; page-break-inside: avoid;">
                <p style="margin: 0 0 10px 0; font-weight: bold; text-align: left;">2. ${figuras[1].instrucción}</p>
                ${figuras[1].svg}
                <tlacuache-renglon n="2" color="#f9f9f9" alto="25"></tlacuache-renglon>
            </div>
            <div style="border: 1px solid #ddd; padding: 15px; border-radius: 6px; text-align: center; page-break-inside: avoid;">
                <p style="margin: 0 0 10px 0; font-weight: bold; text-align: left;">3. ${figuras[2].instrucción}</p>
                ${figuras[2].svg}
                <tlacuache-renglon n="2" color="#f9f9f9" alto="25"></tlacuache-renglon>
            </div>
            <div style="border: 1px solid #ddd; padding: 15px; border-radius: 6px; text-align: center; page-break-inside: avoid;">
                <p style="margin: 0 0 10px 0; font-weight: bold; text-align: left;">4. ${figuras[3].instrucción}</p>
                ${figuras[3].svg}
                <tlacuache-renglon n="2" color="#f9f9f9" alto="25"></tlacuache-renglon>
            </div>
            <div style="border: 1px solid #ddd; padding: 15px; border-radius: 6px; text-align: center; page-break-inside: avoid;">
                <p style="margin: 0 0 10px 0; font-weight: bold; text-align: left;">5. ${figuras[4].instrucción}</p>
                ${figuras[4].svg}
                <tlacuache-renglon n="2" color="#f9f9f9" alto="25"></tlacuache-renglon>
            </div>
            <div style="border: 1px solid #ddd; padding: 15px; border-radius: 6px; text-align: center; page-break-inside: avoid;">
                <p style="margin: 0 0 10px 0; font-weight: bold; text-align: left;">6. ${figuras[5].instrucción}</p>
                ${figuras[5].svg}
                <tlacuache-renglon n="2" color="#f9f9f9" alto="25"></tlacuache-renglon>
            </div>
        </div>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 3.3.18:</b><br>
        1) $${respuestasVal[0]}$ | 2) $${respuestasVal[1]}$ | 3) $${respuestasVal[2]}$ | 4) $${respuestasVal[3]}$ | 5) $${respuestasVal[4]}$ | 6) $${respuestasVal[5]}$
    </div>
    `;

    return [html, solucion];
}
