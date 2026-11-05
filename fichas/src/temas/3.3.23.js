import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Teorema del Coseno (Representación y Cálculo)";
}

export function tipo() {
    return 1;
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

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("3.3.23", "3. Geometría y trigonometría", "Ficha: Teorema del Coseno (Representación y Cálculo)");
    html += `
    <div class="contexto-especial" style="margin-bottom: 18px;">
        <b>Instrucción:</b> Para cada uno de los siguientes ejercicios, <b>dibuje y rotule</b> el triángulo correspondiente y aplique el <b>Teorema del Coseno</b> para calcular el valor de la incógnita.
    </div>
    `;

    // 10 ejercicios distribuidos idéntico a 3.3.22 (4 en página 1 y 6 en página 2)
    // Alternancia entre buscar lado (SAS) y buscar ángulo (SSS)
    const ejercicios = [
        // Página 1 (4 ejercicios amplios)
        { tipo: 'lado' },   // 1. Lado
        { tipo: 'angulo' }, // 2. Ángulo
        { tipo: 'lado' },   // 3. Lado
        { tipo: 'angulo' }, // 4. Ángulo

        // Página 2 (6 ejercicios)
        { tipo: 'lado' },   // 5. Lado
        { tipo: 'angulo' }, // 6. Ángulo
        { tipo: 'lado' },   // 7. Lado
        { tipo: 'angulo' }, // 8. Ángulo
        { tipo: 'lado' },   // 9. Lado
        { tipo: 'angulo' }  // 10. Ángulo
    ];

    const conjuntosLetras = [
        { V1: 'A', V2: 'B', V3: 'C', l1: 'a', l2: 'b', l3: 'c' },
        { V1: 'P', V2: 'Q', V3: 'R', l1: 'p', l2: 'q', l3: 'r' },
        { V1: 'X', V2: 'Y', V3: 'Z', l1: 'x_1', l2: 'y_1', l3: 'z_1' }, // para evitar colisión con incógnita x
        { V1: 'D', V2: 'E', V3: 'F', l1: 'd', l2: 'e', l3: 'f' },
        { V1: 'M', V2: 'N', V3: 'K', l1: 'm', l2: 'n', l3: 'k' },
        { V1: 'A', V2: 'B', V3: 'C', l1: 'a', l2: 'b', l3: 'c' },
        { V1: 'P', V2: 'Q', V3: 'R', l1: 'p', l2: 'q', l3: 'r' },
        { V1: 'D', V2: 'E', V3: 'F', l1: 'd', l2: 'e', l3: 'f' },
        { V1: 'R', V2: 'S', V3: 'T', l1: 'r', l2: 's', l3: 't' },
        { V1: 'U', V2: 'V', V3: 'W', l1: 'u', l2: 'v', l3: 'w' }
    ];

    const unidades = ['cm', 'm', 'cm', 'km', 'm', 'cm', 'm', 'cm', 'm', 'cm'];
    const cardsHtml = [];
    const solucionesList = [];

    for (let i = 0; i < ejercicios.length; i++) {
        const ej = ejercicios[i];
        const u = unidades[i];
        const L = conjuntosLetras[i];
        const isPagina1 = i < 4;

        let enunciadoDatos = '';
        let formulaSustituida = '';
        let resultadoStr = '';

        if (ej.tipo === 'lado') {
            // Caso SAS: Se dan dos lados adyacentes b y c, y el ángulo comprendido A. Hallar lado opuesto a = x.
            const b = randInt(5, 14);
            const c = randInt(5, 14);
            // Ángulo entre 35° y 125° (evitar 90° exacto para que sea no rectángulo)
            let A_deg = randInt(35, 125);
            if (A_deg === 90) A_deg = 95;
            const A_rad = (A_deg * Math.PI) / 180;

            const x_exact = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(A_rad));
            const x_calc = roundTo3SF(x_exact);

            enunciadoDatos = `En $\\triangle ${L.V1}${L.V2}${L.V3}$: lado $${L.l2} = ${b}\\text{ ${u}}$, lado $${L.l3} = ${c}\\text{ ${u}}$ y $\\angle ${L.V1} = ${A_deg}^\\circ$. Calcule el lado $x = ${L.l1}$.`;
            formulaSustituida = `x^2 = ${b}^2 + ${c}^2 - 2(${b})(${c})\\cos(${A_deg}^\\circ)`;
            resultadoStr = `x = ${x_calc}\\text{ ${u}}`;

        } else {
            // Caso SSS: Se dan los tres lados a, b, c válidos (cumpliendo desigualdad triangular). Hallar ángulo theta = \angle A.
            const b = randInt(6, 13);
            const c = randInt(6, 13);
            let A_target_deg = randInt(35, 120);
            if (A_target_deg === 90) A_target_deg = 82;
            const A_target_rad = (A_target_deg * Math.PI) / 180;
            
            // Calculamos a aproximado para garantizar triángulo geométrico coherente
            let a_val = Math.round(Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(A_target_rad)) * 10) / 10;
            if (a_val === b + c || a_val === Math.abs(b - c)) a_val += 1;

            const cosA = (b * b + c * c - a_val * a_val) / (2 * b * c);
            const theta_deg = (Math.acos(cosA) * 180) / Math.PI;
            const theta_calc = roundTo3SF(theta_deg);

            enunciadoDatos = `En $\\triangle ${L.V1}${L.V2}${L.V3}$: $${L.l1} = ${a_val}\\text{ ${u}}$, $${L.l2} = ${b}\\text{ ${u}}$ y $${L.l3} = ${c}\\text{ ${u}}$. Calcule $\\theta = \\angle ${L.V1}$.`;
            formulaSustituida = `\\cos(\\theta) = \\frac{${b}^2 + ${c}^2 - (${a_val})^2}{2(${b})(${c})}`;
            resultadoStr = `\\theta = ${theta_calc}^\\circ`;
        }

        // Espacio para dibujo del alumno
        const boxDrawHeight = isPagina1 ? 115 : 95;
        const numRenglones = isPagina1 ? 3 : 2;
        const renglonAlto = isPagina1 ? 24 : 20;

        const card = `
        <div style="border: 1px solid #c5d6e2; background: #fff; padding: 10px 12px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #eef2f5; padding-bottom: 3px; margin-bottom: 6px;">
                    <span style="font-weight: bold; color: #2c3e50; font-size: 1rem;">${i + 1}.</span>
                    <span class="mark">3</span>
                </div>
                <div style="font-size: 0.88rem; color: #2c3e50; line-height: 1.4; margin-bottom: 8px; text-align: left;">
                    ${enunciadoDatos}
                </div>
            </div>

            <!-- Recuadro para que el alumno dibuje y represente el triángulo -->
            <div style="border: 1px dashed #7f8c8d; border-radius: 6px; background: #fafbfc; height: ${boxDrawHeight}px; position: relative; margin-bottom: 8px; display: flex; align-items: flex-start; justify-content: flex-end; padding: 4px 8px;">
                <span style="font-size: 0.68rem; color: #95a5a6; text-transform: uppercase; letter-spacing: 0.5px;">Espacio para dibujo y rotulación</span>
            </div>

            <div style="margin-top: auto;">
                <tlacuache-renglon n="${numRenglones}" color="#f9f9f9" alto="${renglonAlto}"></tlacuache-renglon>
            </div>
        </div>
        `;

        cardsHtml.push(card);
        solucionesList.push(`<b>${i + 1})</b> $${formulaSustituida} \\implies ${resultadoStr}$`);
    }

    // PÁGINA 1: 4 ejercicios (Grid 2x2)
    html += `
    <div class="exercise-step">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 10px; margin-bottom: 20px;">
            ${cardsHtml[0]}
            ${cardsHtml[1]}
            ${cardsHtml[2]}
            ${cardsHtml[3]}
        </div>
    </div>
    <!--div class="page-break"></div-->
    `;

    // PÁGINA 2: 6 ejercicios (Grid 2x3)
    html += `
    <div class="exercise-step">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 8px;">
            ${cardsHtml[4]}
            ${cardsHtml[5]}
            ${cardsHtml[6]}
            ${cardsHtml[7]}
            ${cardsHtml[8]}
            ${cardsHtml[9]}
        </div>
    </div>
    <div class="page-break"></div>
    `;

    // SOLUCIONARIO
    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem; line-height: 1.6;">
        <b>Solucionario - Teorema del Coseno (Representación y Cálculo):</b><br><br>
        <b>Página 1:</b><br>
        ${solucionesList.slice(0, 4).join('<br>')}<br><br>
        <b>Página 2:</b><br>
        ${solucionesList.slice(4, 10).join('<br>')}
    </div>
    `;

    return [html, solucion];
}
