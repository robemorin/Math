import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Razones Trigonométricas Básicas";
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("3.3.16", "3. Geometría y trigonometría", "Ficha: Razones Trigonométricas Básicas");

    // ======================================================
    // EJERCICIO 1: RAZONES TRIGONOMÉTRICAS DIRECTAS
    // ======================================================
    const triples = [
        { adj: 3, opp: 4, hyp: 5, unidad: "m" },
        { adj: 5, opp: 12, hyp: 13, unidad: "cm" },
        { adj: 8, opp: 15, hyp: 17, unidad: "cm" }
    ];
    const tri1 = triples[Math.floor(Math.random() * triples.length)];
    const thetaPos = Math.random() > 0.5 ? 0 : 1;
    
    let labelSeno, labelCoseno, labelTangente;
    if (thetaPos === 0) {
        labelSeno = `\\frac{${tri1.opp}}{${tri1.hyp}}`;
        labelCoseno = `\\frac{${tri1.adj}}{${tri1.hyp}}`;
        labelTangente = `\\frac{${tri1.opp}}{${tri1.adj}}`;
    } else {
        labelSeno = `\\frac{${tri1.adj}}{${tri1.hyp}}`;
        labelCoseno = `\\frac{${tri1.opp}}{${tri1.hyp}}`;
        labelTangente = `\\frac{${tri1.adj}}{${tri1.opp}}`;
    }

    const svgTri1 = `
    <svg width="200" height="150" style="display: block; margin: 10px auto; overflow: visible;">
        <!-- Triángulo -->
        <polygon points="40,30 40,120 160,120" fill="none" stroke="black" stroke-width="2" />
        <!-- Ángulo recto -->
        <polyline points="40,110 50,110 50,120" fill="none" stroke="black" stroke-width="1.5" />
        <!-- Arco para Theta -->
        ${thetaPos === 0 
            ? `<path d="M 40,55 A 25,25 0 0 1 58,48" fill="none" stroke="black" stroke-width="1.5" />
               <text x="48" y="70" font-family="Cambria Math, Times New Roman, serif" font-size="16" font-style="italic">θ</text>`
            : `<path d="M 135,120 A 25,25 0 0 1 148,110" fill="none" stroke="black" stroke-width="1.5" />
               <text x="120" y="115" font-family="Cambria Math, Times New Roman, serif" font-size="16" font-style="italic">θ</text>`
        }
        <!-- Lado vertical -->
        <text x="15" y="80" font-family="Arial" font-size="14" text-anchor="middle">${tri1.adj} ${tri1.unidad}</text>
        <!-- Lado horizontal -->
        <text x="100" y="140" font-family="Arial" font-size="14" text-anchor="middle">${tri1.opp} ${tri1.unidad}</text>
        <!-- Hipotenusa -->
        <text x="110" y="70" font-family="Arial" font-size="14" text-anchor="middle">${tri1.hyp} ${tri1.unidad}</text>
    </svg>`;

    html += `
    <div class="seccion-title">I. Razones Trigonométricas Directas</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            A partir del siguiente triángulo rectángulo, halle el valor exacto de cada una de las siguientes razones trigonométricas:
        </div>
        <div style="display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center;">
            <div>
                ${svgTri1}
            </div>
            <div style="min-width: 250px;">
                <ol class="FT_ol_a">
                    <li>$\\sin \\theta$ <span class="mark">1</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
                    <li>$\\cos \\theta$ <span class="mark">1</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
                    <li>$\\tan \\theta$ <span class="mark">1</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
                </ol>
            </div>
        </div>
    </div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 3.3.16:</b><br>
        <b>I.</b> 1a. $\\sin \\theta = ${labelSeno}$ | 1b. $\\cos \\theta = ${labelCoseno}$ | 1c. $\\tan \\theta = ${labelTangente}$<br>
    `;

    // ======================================================
    // EJERCICIO 2: USO DE CALCULADORA
    // ======================================================
    const angulo2 = [25, 35, 42, 55, 64][Math.floor(Math.random() * 5)];

    html += `
    <div class="seccion-title">II. Uso de Calculadora</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            Utilice su calculadora para hallar el valor de las siguientes expresiones, aproximando su respuesta a tres cifras decimales:
        </div>
        <ol class="FT_ol_a" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
            <li>$\\sin ${angulo2}^\\circ$ <span class="mark">1</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
            <li>$\\cos ${angulo2}^\\circ$ <span class="mark">1</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
            <li>$\\tan ${angulo2}^\\circ$ <span class="mark">1</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `<b>II.</b> 2a. $\\approx ${(Math.sin(angulo2 * Math.PI / 180)).toFixed(3)}$ | 2b. $\\approx ${(Math.cos(angulo2 * Math.PI / 180)).toFixed(3)}$ | 2c. $\\approx ${(Math.tan(angulo2 * Math.PI / 180)).toFixed(3)}$<br>`;

    // ======================================================
    // EJERCICIO 3: ENCONTRAR UN LADO DESCONOCIDO
    // ======================================================
    const caso3 = Math.random() > 0.5 ? 0 : 1;
    const angulo3 = [28, 37, 48, 52, 61][Math.floor(Math.random() * 5)];
    const ladoDado3 = Math.floor(Math.random() * 10) + 8; // entre 8 y 17
    
    let x_sol3, planteamiento3, svgTri3;

    if (caso3 === 0) {
        x_sol3 = (ladoDado3 * Math.sin(angulo3 * Math.PI / 180)).toFixed(2);
        planteamiento3 = `\\sin ${angulo3}^\\circ = \\frac{x}{${ladoDado3}}`;
        
        svgTri3 = `
        <svg width="200" height="150" style="display: block; margin: 10px auto; overflow: visible;">
            <polygon points="40,120 160,120 160,30" fill="none" stroke="black" stroke-width="2" />
            <polyline points="150,120 150,110 160,110" fill="none" stroke="black" stroke-width="1.5" />
            <!-- Ángulo -->
            <path d="M 65,120 A 25,25 0 0 1 60,107" fill="none" stroke="black" stroke-width="1.5" />
            <text x="75" y="112" font-family="Arial" font-size="14">${angulo3}°</text>
            <!-- Lado x -->
            <text x="175" y="80" font-family="Arial" font-size="14" text-anchor="middle">x</text>
            <!-- Hipotenusa -->
            <text x="90" y="65" font-family="Arial" font-size="14" text-anchor="middle" transform="rotate(-37, 90, 65)">${ladoDado3} cm</text>
        </svg>`;
    } else {
        x_sol3 = (ladoDado3 / Math.cos(angulo3 * Math.PI / 180)).toFixed(2);
        planteamiento3 = `\\cos ${angulo3}^\\circ = \\frac{${ladoDado3}}{x}`;

        svgTri3 = `
        <svg width="200" height="150" style="display: block; margin: 10px auto; overflow: visible;">
            <polygon points="40,120 160,120 160,30" fill="none" stroke="black" stroke-width="2" />
            <polyline points="150,120 150,110 160,110" fill="none" stroke="black" stroke-width="1.5" />
            <!-- Ángulo -->
            <path d="M 65,120 A 25,25 0 0 1 60,107" fill="none" stroke="black" stroke-width="1.5" />
            <text x="75" y="112" font-family="Arial" font-size="14">${angulo3}°</text>
            <!-- Lado adyacente -->
            <text x="100" y="140" font-family="Arial" font-size="14" text-anchor="middle">${ladoDado3} cm</text>
            <!-- Hipotenusa x -->
            <text x="90" y="65" font-family="Arial" font-size="14" text-anchor="middle" transform="rotate(-37, 90, 65)">x</text>
        </svg>`;
    }

    html += `
    <div class="seccion-title">III. Lados Desconocidos</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            Considere el siguiente triángulo rectángulo:
        </div>
        <div style="display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center;">
            <div>
                ${svgTri3}
            </div>
            <div style="min-width: 250px;">
                <ol class="FT_ol_a">
                    <li>Escriba una ecuación trigonométrica que relacione los lados conocidos con la variable $x$. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                    <li>Calcule el valor de $x$, expresando su respuesta con tres cifras significativas. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                </ol>
            </div>
        </div>
    </div>
    `;

    solucion += `<b>III.</b> 3a. $${planteamiento3}$ | 3b. $x \\approx ${parseFloat(x_sol3).toPrecision(3)}\\text{ cm}$<br>`;

    // ======================================================
    // EJERCICIO 4: ENCONTRAR UN ÁNGULO DESCONOCIDO
    // ======================================================
    const opp4 = Math.floor(Math.random() * 6) + 5; // de 5 a 10
    const adj4 = Math.floor(Math.random() * 6) + 6; // de 6 a 11
    const beta_rad = Math.atan(opp4 / adj4);
    const beta_deg = (beta_rad * 180 / Math.PI).toFixed(1);

    const svgTri4 = `
    <svg width="200" height="150" style="display: block; margin: 10px auto; overflow: visible;">
        <polygon points="40,120 160,120 40,30" fill="none" stroke="black" stroke-width="2" />
        <polyline points="40,110 50,110 50,120" fill="none" stroke="black" stroke-width="1.5" />
        <!-- Ángulo Beta (vértice inferior derecho) -->
        <path d="M 135,120 A 25,25 0 0 1 140,105" fill="none" stroke="black" stroke-width="1.5" />
        <text x="115" y="114" font-family="Cambria Math, Times New Roman, serif" font-size="16" font-style="italic">β</text>
        <!-- Cateto adyacente -->
        <text x="100" y="140" font-family="Arial" font-size="14" text-anchor="middle">${adj4} m</text>
        <!-- Cateto opuesto -->
        <text x="25" y="80" font-family="Arial" font-size="14" text-anchor="middle">${opp4} m</text>
    </svg>`;

    html += `
    <div class="seccion-title">IV. Ángulos Desconocidos</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            Halle el tamaño del ángulo marcado como $\\beta$ en el siguiente triángulo rectángulo:
        </div>
        <div style="display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center;">
            <div>
                ${svgTri4}
            </div>
            <div style="min-width: 250px;">
                <ol class="FT_ol_a">
                    <li>Muestre claramente la expresión trigonométrica que permite hallar el ángulo $\\beta$. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                    <li>Determine el valor del ángulo $\\beta$ en grados, redondeado a una cifra decimal. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                </ol>
            </div>
        </div>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `<b>IV.</b> 4a. $\\tan \\beta = \\frac{${opp4}}{${adj4}}$ | 4b. $\\beta \\approx ${beta_deg}^\\circ$</div>`;

    return [html, solucion];
}
