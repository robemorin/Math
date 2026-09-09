import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Cálculo de Ángulos (Práctica)";
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("3.3.17", "3. Geometría y trigonometría", "Ficha: Cálculo de Ángulos (Práctica)");

    const triangulos = [];
    const respuestasVal = [];
    const letrasGriegas = ["θ", "α", "β", "φ", "θ", "α", "β", "φ", "θ", "α"];
    const unidades = ["cm", "m", "cm", "mm", "m", "cm", "m", "cm", "mm", "m"];

    for (let k = 0; k < 10; k++) {
        const u = unidades[k];
        const letra = letrasGriegas[k];
        let anguloRad, anguloDeg, svg = "";
        const tipo = k % 3;

        if (k === 8) {
            const hyp = Math.floor(Math.random() * 8) + 11; 
            const opp = Math.floor(Math.random() * 5) + 5;   
            anguloRad = Math.asin(opp / hyp);
            anguloDeg = (anguloRad * 180 / Math.PI).toFixed(1);
            respuestasVal.push(`${anguloDeg}^\\circ`);

            svg = `
            <svg width="180" height="130" style="display: block; margin: auto; overflow: visible;">
                <polygon points="30,30 150,30 150,100" fill="none" stroke="black" stroke-width="2" />
                <polyline points="140,30 140,40 150,40" fill="none" stroke="black" stroke-width="1.2" />
                <path d="M 150,75 A 25,25 0 0 0 133,85" fill="none" stroke="black" stroke-width="1.2" />
                <text x="125" y="70" font-family="Cambria Math, serif" font-size="14" font-style="italic">${letra}</text>
                <text x="90" y="18" font-family="Arial" font-size="12" text-anchor="middle">${opp} ${u}</text>
                <text x="80" y="80" font-family="Arial" font-size="12" text-anchor="middle" transform="rotate(30, 80, 80)">${hyp} ${u}</text>
            </svg>`;
        } else if (k === 9) {
            const hyp = Math.floor(Math.random() * 8) + 12; 
            const adj = Math.floor(Math.random() * 5) + 6;   
            anguloRad = Math.acos(adj / hyp);
            anguloDeg = (anguloRad * 180 / Math.PI).toFixed(1);
            respuestasVal.push(`${anguloDeg}^\\circ`);

            svg = `
            <svg width="180" height="130" style="display: block; margin: auto; overflow: visible;">
                <polygon points="30,30 150,30 30,100" fill="none" stroke="black" stroke-width="2" />
                <polyline points="30,40 40,40 40,30" fill="none" stroke="black" stroke-width="1.2" />
                <path d="M 125,30 A 25,25 0 0 0 130,42" fill="none" stroke="black" stroke-width="1.2" />
                <text x="112" y="48" font-family="Cambria Math, serif" font-size="14" font-style="italic">${letra}</text>
                <text x="90" y="18" font-family="Arial" font-size="12" text-anchor="middle">${adj} ${u}</text>
                <text x="100" y="75" font-family="Arial" font-size="12" text-anchor="middle" transform="rotate(-30, 100, 75)">${hyp} ${u}</text>
            </svg>`;
        } else if (tipo === 0) {
            const hyp = Math.floor(Math.random() * 8) + 10;
            const opp = Math.floor(Math.random() * 5) + 5;
            anguloRad = Math.asin(opp / hyp);
            anguloDeg = (anguloRad * 180 / Math.PI).toFixed(1);
            respuestasVal.push(`${anguloDeg}^\\circ`);

            svg = `
            <svg width="180" height="130" style="display: block; margin: auto; overflow: visible;">
                <polygon points="30,100 150,100 30,20" fill="none" stroke="black" stroke-width="2" />
                <polyline points="30,90 40,90 40,100" fill="none" stroke="black" stroke-width="1.2" />
                <path d="M 125,100 A 25,25 0 0 1 130,88" fill="none" stroke="black" stroke-width="1.2" />
                <text x="110" y="95" font-family="Cambria Math, serif" font-size="14" font-style="italic">${letra}</text>
                <text x="20" y="65" font-family="Arial" font-size="12" text-anchor="end">${opp} ${u}</text>
                <text x="100" y="55" font-family="Arial" font-size="12" text-anchor="middle" transform="rotate(-33, 100, 55)">${hyp} ${u}</text>
            </svg>`;
        } else if (tipo === 1) {
            const hyp = Math.floor(Math.random() * 8) + 12;
            const adj = Math.floor(Math.random() * 5) + 6;
            anguloRad = Math.acos(adj / hyp);
            anguloDeg = (anguloRad * 180 / Math.PI).toFixed(1);
            respuestasVal.push(`${anguloDeg}^\\circ`);

            svg = `
            <svg width="180" height="130" style="display: block; margin: auto; overflow: visible;">
                <polygon points="30,100 150,100 30,20" fill="none" stroke="black" stroke-width="2" />
                <polyline points="30,90 40,90 40,100" fill="none" stroke="black" stroke-width="1.2" />
                <path d="M 30,45 A 25,25 0 0 1 43,36" fill="none" stroke="black" stroke-width="1.2" />
                <text x="38" y="58" font-family="Cambria Math, serif" font-size="14" font-style="italic">${letra}</text>
                <text x="20" y="60" font-family="Arial" font-size="12" text-anchor="end">${adj} ${u}</text>
                <text x="100" y="55" font-family="Arial" font-size="12" text-anchor="middle" transform="rotate(-33, 100, 55)">${hyp} ${u}</text>
            </svg>`;
        } else {
            const adj = Math.floor(Math.random() * 6) + 6;
            const opp = Math.floor(Math.random() * 5) + 4;
            anguloRad = Math.atan(opp / adj);
            anguloDeg = (anguloRad * 180 / Math.PI).toFixed(1);
            respuestasVal.push(`${anguloDeg}^\\circ`);

            svg = `
            <svg width="180" height="130" style="display: block; margin: auto; overflow: visible;">
                <polygon points="30,100 150,100 150,30" fill="none" stroke="black" stroke-width="2" />
                <polyline points="140,100 140,90 150,90" fill="none" stroke="black" stroke-width="1.2" />
                <path d="M 55,100 A 25,25 0 0 1 50,88" fill="none" stroke="black" stroke-width="1.2" />
                <text x="65" y="95" font-family="Cambria Math, serif" font-size="14" font-style="italic">${letra}</text>
                <text x="90" y="115" font-family="Arial" font-size="12" text-anchor="middle">${adj} ${u}</text>
                <text x="162" y="65" font-family="Arial" font-size="12" text-anchor="start">${opp} ${u}</text>
            </svg>`;
        }

        triangulos.push(svg);
    }

    html += `
    <div class="seccion-title">I. Cálculo de Ángulos</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            Calcula los siguientes ángulos marcados (redondea a 3 cifras significativas).
        </div>
        
        <!-- PÁGINA 1 -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div style="border: 1px solid #ddd; padding: 10px; border-radius: 6px; text-align: center;">
                <p style="margin: 0 0 5px 0; font-weight: bold; text-align: left;">1.</p>
                ${triangulos[0]}
                <tlacuache-renglon n="1" color="#f9f9f9" alto="25"></tlacuache-renglon>
            </div>
            <div style="border: 1px solid #ddd; padding: 10px; border-radius: 6px; text-align: center;">
                <p style="margin: 0 0 5px 0; font-weight: bold; text-align: left;">2.</p>
                ${triangulos[1]}
                <tlacuache-renglon n="1" color="#f9f9f9" alto="25"></tlacuache-renglon>
            </div>
            <div style="border: 1px solid #ddd; padding: 10px; border-radius: 6px; text-align: center;">
                <p style="margin: 0 0 5px 0; font-weight: bold; text-align: left;">3.</p>
                ${triangulos[2]}
                <tlacuache-renglon n="1" color="#f9f9f9" alto="25"></tlacuache-renglon>
            </div>
            <div style="border: 1px solid #ddd; padding: 10px; border-radius: 6px; text-align: center;">
                <p style="margin: 0 0 5px 0; font-weight: bold; text-align: left;">4.</p>
                ${triangulos[3]}
                <tlacuache-renglon n="1" color="#f9f9f9" alto="25"></tlacuache-renglon>
            </div>
            <div style="border: 1px solid #ddd; padding: 10px; border-radius: 6px; text-align: center;">
                <p style="margin: 0 0 5px 0; font-weight: bold; text-align: left;">5.</p>
                ${triangulos[4]}
                <tlacuache-renglon n="1" color="#f9f9f9" alto="25"></tlacuache-renglon>
            </div>
        </div>
    </div>
    
    

    <div class="seccion-title">I. Cálculo de Ángulos (Continuación)</div>
    <div class="exercise-step">
        <!-- PÁGINA 2 -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
            <div style="border: 1px solid #ddd; padding: 10px; border-radius: 6px; text-align: center;">
                <p style="margin: 0 0 5px 0; font-weight: bold; text-align: left;">6.</p>
                ${triangulos[5]}
                <tlacuache-renglon n="1" color="#f9f9f9" alto="25"></tlacuache-renglon>
            </div>
            <div style="border: 1px solid #ddd; padding: 10px; border-radius: 6px; text-align: center;">
                <p style="margin: 0 0 5px 0; font-weight: bold; text-align: left;">7.</p>
                ${triangulos[6]}
                <tlacuache-renglon n="1" color="#f9f9f9" alto="25"></tlacuache-renglon>
            </div>
            <div style="border: 1px solid #ddd; padding: 10px; border-radius: 6px; text-align: center;">
                <p style="margin: 0 0 5px 0; font-weight: bold; text-align: left;">8.</p>
                ${triangulos[7]}
                <tlacuache-renglon n="1" color="#f9f9f9" alto="25"></tlacuache-renglon>
            </div>
            <div style="border: 1px solid #ddd; padding: 10px; border-radius: 6px; text-align: center;">
                <p style="margin: 0 0 5px 0; font-weight: bold; text-align: left;">9.</p>
                ${triangulos[8]}
                <tlacuache-renglon n="1" color="#f9f9f9" alto="25"></tlacuache-renglon>
            </div>
            <div style="border: 1px solid #ddd; padding: 10px; border-radius: 6px; text-align: center;">
                <p style="margin: 0 0 5px 0; font-weight: bold; text-align: left;">10.</p>
                ${triangulos[9]}
                <tlacuache-renglon n="1" color="#f9f9f9" alto="25"></tlacuache-renglon>
            </div>
        </div>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 3.3.17:</b><br>
        1) $${respuestasVal[0]}$ | 2) $${respuestasVal[1]}$ | 3) $${respuestasVal[2]}$ | 4) $${respuestasVal[3]}$ | 5) $${respuestasVal[4]}$<br>
        6) $${respuestasVal[5]}$ | 7) $${respuestasVal[6]}$ | 8) $${respuestasVal[7]}$ | 9) $${respuestasVal[8]}$ | 10) $${respuestasVal[9]}$
    </div>
    `;

    return [html, solucion];
}
