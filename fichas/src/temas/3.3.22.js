// Generado a partir de: mate1/src/temas/7.1.1.js, 7.1.3.js, 7.2.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Razones Trigonométricas y Triángulos Rectángulos";
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

    html += ai.getHeader("3.3.22", "3. Geometría y trigonometría", "Ficha: Razones Trigonométricas y Triángulos Rectángulos");
    html += `
    <div class="contexto-especial" style="margin-bottom: 20px;">
        <b>Instrucción:</b> Escriba la razón trigonométrica (en caso de ser necesario) y calcule el dato restante. Exprese los resultados con 3 cifras significativas.
    </div>
    `;

    // 10 ejercicios: 4 en la primera página y 6 en la segunda página
    const ejercicios = [
        // Página 1 (4 ejercicios más amplios)
        // 1. Hallar ángulo theta dados opuesto y adyacente (tan)
        { tipo: 'angulo', razon: 'tan' },
        // 2. Hallar ángulo theta dados opuesto e hipotenusa (sin)
        { tipo: 'angulo', razon: 'sin' },
        // 3. Hallar cateto x dado ángulo e hipotenusa (sin)
        { tipo: 'lado', razon: 'sin', ladoDado: 'hyp', buscar: 'opp' },
        // 4. Hallar hipotenusa x dados ambos catetos (Pitágoras)
        { tipo: 'pitagoras', buscar: 'hyp' },

        // Página 2 (6 ejercicios)
        // 5. Hallar cateto adyacente x dado ángulo e hipotenusa (cos)
        { tipo: 'lado', razon: 'cos', ladoDado: 'hyp', buscar: 'adj' },
        // 6. Hallar ángulo theta dados adyacente e hipotenusa (cos)
        { tipo: 'angulo', razon: 'cos' },
        // 7. Hallar cateto opuesto x dado ángulo y cateto adyacente (tan)
        { tipo: 'lado', razon: 'tan', ladoDado: 'adj', buscar: 'opp' },
        // 8. Hallar hipotenusa x dado cateto opuesto y ángulo (sin)
        { tipo: 'lado', razon: 'sin', ladoDado: 'opp', buscar: 'hyp' },
        // 9. Hallar cateto desconocido x dados un cateto y la hipotenusa (Pitágoras)
        { tipo: 'pitagoras', buscar: 'cat' },
        // 10. Hallar ángulo theta dados cateto opuesto y adyacente (tan)
        { tipo: 'angulo', razon: 'tan' }
    ];

    const cardsHtml = [];
    const solucionesList = [];
    const unidades = ['cm', 'm', 'cm', 'mm', 'm', 'cm', 'm', 'cm', 'm', 'cm'];

    for (let i = 0; i < ejercicios.length; i++) {
        const ej = ejercicios[i];
        const u = unidades[i];
        let svg = '';
        let razonSustituida = '';
        let resultadoStr = '';

        // Dimensiones del SVG según la página para aprovechar el espacio
        const isPagina1 = i < 4;
        const svgW = isPagina1 ? 220 : 190;
        const svgH = isPagina1 ? 145 : 125;
        const polyPoints = isPagina1 ? "35,115 185,115 185,25" : "30,100 155,100 155,25";
        const rightAnglePath = isPagina1 ? "M 170,115 L 170,100 L 185,100" : "M 143,100 L 143,88 L 155,88";
        const arcThetaPath = isPagina1 ? "M 65,115 A 30 30 0 0 0 57,98" : "M 55,100 A 25 25 0 0 0 49,86";
        const thetaX = isPagina1 ? 70 : 59;
        const thetaY = isPagina1 ? 107 : 94;

        const posXBase = isPagina1 ? 110 : 92;
        const posYBase = isPagina1 ? 134 : 116;
        const posXAlt = isPagina1 ? 193 : 162;
        const posYAlt = isPagina1 ? 72 : 62;
        const posXHip = isPagina1 ? 102 : 87;
        const posYHip = isPagina1 ? 62 : 55;

        if (ej.tipo === 'angulo') {
            const oppVal = Math.floor(Math.random() * 8) + 5;
            const adjVal = Math.floor(Math.random() * 8) + 5;
            const hypRad = oppVal * oppVal + adjVal * adjVal;
            const hypVal = Math.round(Math.sqrt(hypRad) * 10) / 10;

            let anguloCalculado = 0;
            let labelBase = '', labelAltura = '', labelHipo = '';

            if (ej.razon === 'sin') {
                anguloCalculado = (Math.asin(oppVal / hypVal) * 180 / Math.PI);
                labelAltura = `${oppVal} ${u}`;
                labelHipo = `${hypVal} ${u}`;
                razonSustituida = `\\sin(\\theta) = \\frac{${oppVal}}{${hypVal}}`;
            } else if (ej.razon === 'cos') {
                anguloCalculado = (Math.acos(adjVal / hypVal) * 180 / Math.PI);
                labelBase = `${adjVal} ${u}`;
                labelHipo = `${hypVal} ${u}`;
                razonSustituida = `\\cos(\\theta) = \\frac{${adjVal}}{${hypVal}}`;
            } else {
                anguloCalculado = (Math.atan(oppVal / adjVal) * 180 / Math.PI);
                labelBase = `${adjVal} ${u}`;
                labelAltura = `${oppVal} ${u}`;
                razonSustituida = `\\tan(\\theta) = \\frac{${oppVal}}{${adjVal}}`;
            }

            resultadoStr = `\\theta = ${roundTo3SF(anguloCalculado)}^\\circ`;

            svg = `
            <svg width="${svgW}" height="${svgH}" style="display: block; margin: 4px auto; overflow: visible;">
                <polygon points="${polyPoints}" fill="#f4f9fd" stroke="#2980b9" stroke-width="2" stroke-linejoin="round" />
                <path d="${rightAnglePath}" fill="none" stroke="#2980b9" stroke-width="1.3" />
                <path d="${arcThetaPath}" fill="none" stroke="#e67e22" stroke-width="1.8" />
                <text x="${thetaX}" y="${thetaY}" font-family="serif" font-size="14px" font-style="italic" fill="#d35400">θ</text>
                ${labelBase ? `<text x="${posXBase}" y="${posYBase}" font-family="Arial" font-size="12px" font-weight="bold" fill="#2c3e50" text-anchor="middle">${labelBase}</text>` : ''}
                ${labelAltura ? `<text x="${posXAlt}" y="${posYAlt}" font-family="Arial" font-size="12px" font-weight="bold" fill="#2c3e50" text-anchor="start">${labelAltura}</text>` : ''}
                ${labelHipo ? `<text x="${posXHip}" y="${posYHip}" font-family="Arial" font-size="12px" font-weight="bold" fill="#2c3e50" text-anchor="end">${labelHipo}</text>` : ''}
            </svg>`;

        } else if (ej.tipo === 'lado') {
            const angDeg = [28, 34, 42, 53, 62][Math.floor(Math.random() * 5)];
            const angRad = (angDeg * Math.PI) / 180;
            const valNum = Math.floor(Math.random() * 9) + 7;
            let calcLado = 0;
            let labelBase = '', labelAltura = '', labelHipo = '';

            if (ej.razon === 'sin') {
                if (ej.ladoDado === 'hyp' && ej.buscar === 'opp') {
                    calcLado = valNum * Math.sin(angRad);
                    labelHipo = `${valNum} ${u}`;
                    labelAltura = `x`;
                    razonSustituida = `\\sin(${angDeg}^\\circ) = \\frac{x}{${valNum}}`;
                } else {
                    calcLado = valNum / Math.sin(angRad);
                    labelAltura = `${valNum} ${u}`;
                    labelHipo = `x`;
                    razonSustituida = `\\sin(${angDeg}^\\circ) = \\frac{${valNum}}{x}`;
                }
            } else if (ej.razon === 'cos') {
                calcLado = valNum * Math.cos(angRad);
                labelHipo = `${valNum} ${u}`;
                labelBase = `x`;
                razonSustituida = `\\cos(${angDeg}^\\circ) = \\frac{x}{${valNum}}`;
            } else {
                calcLado = valNum * Math.tan(angRad);
                labelBase = `${valNum} ${u}`;
                labelAltura = `x`;
                razonSustituida = `\\tan(${angDeg}^\\circ) = \\frac{x}{${valNum}}`;
            }

            resultadoStr = `x = ${roundTo3SF(calcLado)}\\text{ ${u}}`;

            svg = `
            <svg width="${svgW}" height="${svgH}" style="display: block; margin: 4px auto; overflow: visible;">
                <polygon points="${polyPoints}" fill="#f4f9fd" stroke="#2980b9" stroke-width="2" stroke-linejoin="round" />
                <path d="${rightAnglePath}" fill="none" stroke="#2980b9" stroke-width="1.3" />
                <path d="${arcThetaPath}" fill="none" stroke="#e67e22" stroke-width="1.8" />
                <text x="${thetaX}" y="${thetaY}" font-family="Arial" font-size="11.5px" font-weight="bold" fill="#d35400">${angDeg}°</text>
                ${labelBase ? `<text x="${posXBase}" y="${posYBase}" font-family="Arial" font-size="12px" font-weight="bold" fill="${labelBase === 'x' ? '#c0392b' : '#2c3e50'}" text-anchor="middle">${labelBase}</text>` : ''}
                ${labelAltura ? `<text x="${posXAlt}" y="${posYAlt}" font-family="Arial" font-size="12px" font-weight="bold" fill="${labelAltura === 'x' ? '#c0392b' : '#2c3e50'}" text-anchor="start">${labelAltura}</text>` : ''}
                ${labelHipo ? `<text x="${posXHip}" y="${posYHip}" font-family="Arial" font-size="12px" font-weight="bold" fill="${labelHipo === 'x' ? '#c0392b' : '#2c3e50'}" text-anchor="end">${labelHipo}</text>` : ''}
            </svg>`;

        } else {
            // Teorema de Pitágoras
            if (ej.buscar === 'hyp') {
                const c1 = Math.floor(Math.random() * 7) + 5;
                const c2 = Math.floor(Math.random() * 7) + 5;
                const hypVal = Math.sqrt(c1 * c1 + c2 * c2);
                razonSustituida = `x^2 = ${c1}^2 + ${c2}^2`;
                resultadoStr = `x = ${roundTo3SF(hypVal)}\\text{ ${u}}`;

                svg = `
                <svg width="${svgW}" height="${svgH}" style="display: block; margin: 4px auto; overflow: visible;">
                    <polygon points="${polyPoints}" fill="#f4f9fd" stroke="#2980b9" stroke-width="2" stroke-linejoin="round" />
                    <path d="${rightAnglePath}" fill="none" stroke="#2980b9" stroke-width="1.3" />
                    <text x="${posXBase}" y="${posYBase}" font-family="Arial" font-size="12px" font-weight="bold" fill="#2c3e50" text-anchor="middle">${c1} ${u}</text>
                    <text x="${posXAlt}" y="${posYAlt}" font-family="Arial" font-size="12px" font-weight="bold" fill="#2c3e50" text-anchor="start">${c2} ${u}</text>
                    <text x="${posXHip}" y="${posYHip}" font-family="Arial" font-size="12px" font-weight="bold" fill="#c0392b" text-anchor="end">x</text>
                </svg>`;
            } else {
                const c1 = Math.floor(Math.random() * 6) + 5;
                const hypVal = c1 + Math.floor(Math.random() * 5) + 3;
                const c2 = Math.sqrt(hypVal * hypVal - c1 * c1);
                razonSustituida = `${hypVal}^2 = x^2 + ${c1}^2`;
                resultadoStr = `x = ${roundTo3SF(c2)}\\text{ ${u}}`;

                svg = `
                <svg width="${svgW}" height="${svgH}" style="display: block; margin: 4px auto; overflow: visible;">
                    <polygon points="${polyPoints}" fill="#f4f9fd" stroke="#2980b9" stroke-width="2" stroke-linejoin="round" />
                    <path d="${rightAnglePath}" fill="none" stroke="#2980b9" stroke-width="1.3" />
                    <text x="${posXBase}" y="${posYBase}" font-family="Arial" font-size="12px" font-weight="bold" fill="#2c3e50" text-anchor="middle">${c1} ${u}</text>
                    <text x="${posXAlt}" y="${posYAlt}" font-family="Arial" font-size="12px" font-weight="bold" fill="#c0392b" text-anchor="start">x</text>
                    <text x="${posXHip}" y="${posYHip}" font-family="Arial" font-size="12px" font-weight="bold" fill="#2c3e50" text-anchor="end">${hypVal} ${u}</text>
                </svg>`;
            }
        }

        const renglonAlto = isPagina1 ? 28 : 22;
        const card = `
        <div style="border: 1px solid #c5d6e2; background: #fff; padding: 8px 10px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); text-align: center;">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #eef2f5; padding-bottom: 3px; margin-bottom: 4px;">
                <span style="font-weight: bold; color: #2c3e50;">${i + 1}.</span>
                <span class="mark">2</span>
            </div>
            ${svg}
            <div style="margin-top: 6px;">
                <tlacuache-renglon n="2" color="#f9f9f9" alto="${renglonAlto}"></tlacuache-renglon>
            </div>
        </div>
        `;

        cardsHtml.push(card);
        solucionesList.push(`<b>${i + 1})</b> $${razonSustituida} \\implies ${resultadoStr}$`);
    }

    // PÁGINA 1: 4 ejercicios (Grid 2x2)
    html += `
    <div class="exercise-step">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 10px; margin-bottom: 20px;">
            ${cardsHtml[0]}
            ${cardsHtml[1]}
            ${cardsHtml[2]}
            ${cardsHtml[3]}
        </div>
    </div>
    <div class="page-break"></div>
    `;

    // PÁGINA 2: 6 ejercicios (Grid 2x3)
    html += `
    <div class="exercise-step">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 10px;">
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
    <div style="font-family: sans-serif; font-size: 0.85rem; line-height: 1.5;">
        <b>Solucionario 3.3.22 - Razones Trigonométricas y Triángulos Rectángulos:</b><br><br>
        <b>Página 1:</b><br>
        ${solucionesList.slice(0, 4).join('<br>')}<br><br>
        <b>Página 2:</b><br>
        ${solucionesList.slice(4, 10).join('<br>')}
    </div>
    `;

    return [html, solucion];
}
