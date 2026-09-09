import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Área de Sectores Circulares y Regiones Compuestas";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("3.1.24", "3. Geometría y trigonometría", "Ficha: Área de Sectores Circulares y Regiones Compuestas");

    // ==========================================
    // EJERCICIO 1 (CUARTILLA 1): ÁREA DIRECTA E INVERSA DE SECTORES CIRCULARES
    // ==========================================
    // Problema 1: Área de sector simple y despeje
    const r1 = Math.floor(Math.random() * 5) + 8; // 8 a 12 cm
    const theta1 = (Math.floor(Math.random() * 7) + 8) * 5; // 40° a 70°
    const areaSector1 = (theta1 / 360) * Math.PI * r1 * r1;

    // Problema 2: Inverso (Dado área y ángulo, hallar radio y perímetro)
    const theta2 = (Math.floor(Math.random() * 5) + 6) * 15; // 90°, 105°, 120°, 135°, 150°
    const areaDada2 = parseFloat((Math.floor(Math.random() * 8) * 5 + 35).toFixed(1)); // 35 a 70 cm^2
    const r2 = Math.sqrt((areaDada2 * 360) / (Math.PI * theta2));
    const arc2 = (theta2 / 360) * 2 * Math.PI * r2;
    const perim2 = 2 * r2 + arc2;

    // SVG para sector 1
    const angleRad1 = (theta1 * Math.PI) / 180;
    const svgR = 85;
    const cx1 = 110, cy1 = 110;
    const xEnd1 = cx1 + svgR * Math.cos(angleRad1);
    const yEnd1 = cy1 - svgR * Math.sin(angleRad1);

    html += `
    <div class="seccion-title">I. Cálculo Directo e Inverso del Área de un Sector Circular</div>
    <div class="exercise-step">
        <p><strong>1.</strong> La figura muestra un sector circular de radio $r = ${r1}\\text{ cm}$ con ángulo central $\\theta = ${theta1}^\\circ$.</p>

        <div style="display:flex; justify-content:center; margin: 10px 0;">
            <svg width="220" height="130" viewBox="20 10 200 110" style="background:#fff;">
                <path d="M ${cx1} ${cy1} L ${cx1 + svgR} ${cy1} A ${svgR} ${svgR} 0 0 0 ${xEnd1} ${yEnd1} Z" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
                <path d="M ${cx1 + 26} ${cy1} A 26 26 0 0 0 ${cx1 + 26 * Math.cos(angleRad1)} ${cy1 - 26 * Math.sin(angleRad1)}" fill="none" stroke="#b45309" stroke-width="1.5"/>
                <text x="${cx1 - 14}" y="${cy1 + 5}" font-family="sans-serif" font-size="13" font-weight="bold">O</text>
                <text x="${cx1 + 38}" y="${cy1 - 8}" font-family="sans-serif" font-size="11" fill="#b45309">${theta1}°</text>
                <text x="${cx1 + 35}" y="${cy1 + 16}" font-family="sans-serif" font-size="12">${r1} cm</text>
            </svg>
        </div>

        <ol class="FT_ol_a">
            <li>
                Escriba la fórmula del área de un sector circular en grados sexagesimales y calcule el área exacta en términos de $\\pi$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Exprese el valor del área redondeado a tres cifras significativas. <span class="mark">1</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>

        <p style="margin-top: 20px;"><strong>2.</strong> Un sector circular tiene un ángulo en el centro de $${theta2}^\\circ$ y un área de $${areaDada2}\\text{ cm}^2$.</p>
        <ol class="FT_ol_a">
            <li>
                Plantee una ecuación para el área y deduzca que el radio del sector es $r \\approx ${r2.toFixed(2)}\\text{ cm}$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                A partir del valor hallado de $r$, calcule el perímetro total de dicho sector. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>
    `;

    // ==========================================
    // EJERCICIO 2 (CUARTILLA 2): REGIONES COMPUESTAS Y MODELACIÓN (LÁMPARA CONCÉNTRICA)
    // ==========================================
    // Problema 3: Corona circular parcial / Pantalla de lámpara
    // R_ext = R_int + w
    const rInt = Math.floor(Math.random() * 4) + 6; // 6 a 9 cm
    const anchoW = Math.floor(Math.random() * 3) + 4; // 4 a 6 cm
    const rExt = rInt + anchoW; // 10 a 15 cm
    const thetaCorona = (Math.floor(Math.random() * 5) + 6) * 15; // 90° a 150°

    const areaInt = (thetaCorona / 360) * Math.PI * rInt * rInt;
    const areaExt = (thetaCorona / 360) * Math.PI * rExt * rExt;
    const areaFranja = areaExt - areaInt;

    const arcoInt = (thetaCorona / 360) * 2 * Math.PI * rInt;
    const arcoExt = (thetaCorona / 360) * 2 * Math.PI * rExt;
    const perimFranja = arcoInt + arcoExt + 2 * anchoW;

    // SVG para la franja / pantalla de lámpara
    const angRadC = (thetaCorona * Math.PI) / 180;
    const scale = 5.5;
    const sRint = rInt * scale;
    const sRext = rExt * scale;
    const ccx = 110, ccy = 120;
    const xIntEnd = ccx + sRint * Math.cos(angRadC);
    const yIntEnd = ccy - sRint * Math.sin(angRadC);
    const xExtEnd = ccx + sRext * Math.cos(angRadC);
    const yExtEnd = ccy - sRext * Math.sin(angRadC);

    // Problema 4: Lúnula / semicírculo sobre triángulo isósceles rectángulo
    const ladoC = Math.floor(Math.random() * 4) + 6; // 6 a 9 cm
    const hip = Math.sqrt(2 * ladoC * ladoC);
    const radioSemicirc = hip / 2;
    const areaTriang = 0.5 * ladoC * ladoC;
    const areaSemicirc = 0.5 * Math.PI * radioSemicirc * radioSemicirc;
    const areaLunula = areaSemicirc - ( (0.25 * Math.PI * ladoC * ladoC) - areaTriang );

    html += `
    <div class="seccion-title">II. Coronas Circulares Parciales y Regiones Sombreadas Compuestas</div>
    <div class="exercise-step">
        <p><strong>3.</strong> Para confeccionar la pantalla de una lámpara, se recorta una lámina de tela con forma de sector de corona circular comprendido entre dos radios concéntricos $r = ${rInt}\\text{ cm}$ y $R = ${rExt}\\text{ cm}$, con un ángulo central común de $\\theta = ${thetaCorona}^\\circ$.</p>

        <div style="display:flex; justify-content:center; margin: 10px 0;">
            <svg width="260" height="140" viewBox="10 10 240 125" style="background:#fff;">
                <!-- Ring sector path -->
                <path d="M ${ccx + sRint} ${ccy} L ${ccx + sRext} ${ccy} A ${sRext} ${sRext} 0 0 0 ${xExtEnd} ${yExtEnd} L ${xIntEnd} ${yIntEnd} A ${sRint} ${sRint} 0 0 1 ${ccx + sRint} ${ccy} Z" fill="#e0e7ff" stroke="#4338ca" stroke-width="2"/>
                <!-- Center point -->
                <circle cx="${ccx}" cy="${ccy}" r="3" fill="#1e1b4b"/>
                <text x="${ccx - 14}" y="${ccy + 4}" font-family="sans-serif" font-size="12" font-weight="bold">O</text>
                <!-- Dotted radius lines to origin -->
                <line x1="${ccx}" y1="${ccy}" x2="${ccx + sRint}" y2="${ccy}" stroke="#6366f1" stroke-dasharray="3"/>
                <line x1="${ccx}" y1="${ccy}" x2="${xIntEnd}" y2="${yIntEnd}" stroke="#6366f1" stroke-dasharray="3"/>
                <!-- Angle mark -->
                <path d="M ${ccx + 22} ${ccy} A 22 22 0 0 0 ${ccx + 22 * Math.cos(angRadC)} ${ccy - 22 * Math.sin(angRadC)}" fill="none" stroke="#dc2626" stroke-width="1.5"/>
                <text x="${ccx + 30}" y="${ccy - 8}" font-family="sans-serif" font-size="11" fill="#dc2626">${thetaCorona}°</text>
                <!-- Labels -->
                <text x="${ccx + (sRint + sRext)/2}" y="${ccy + 14}" font-family="sans-serif" font-size="10" text-anchor="middle">${anchoW} cm</text>
                <text x="${ccx + sRint/2}" y="${ccy - 4}" font-family="sans-serif" font-size="10" fill="#6366f1">${rInt} cm</text>
                <text x="${ccx + sRext + 4}" y="${ccy - 12}" font-family="sans-serif" font-size="11" fill="#4338ca">R=${rExt}</text>
            </svg>
        </div>

        <ol class="FT_ol_a">
            <li>
                Demuestre que el área superficial de la lámina de tela es aproximadamente $${areaFranja.toFixed(1)}\\text{ cm}^2$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Se colocará un ribete protector alrededor de todo el contorno exterior de la pieza cortada. Calcule la longitud total de dicho ribete. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>

        <p style="margin-top: 25px;"><strong>4.</strong> La figura inferior ilustra un cuadrado de lado $a = ${ladoC}\\text{ cm}$ en cuyo interior se inscribe un cuadrante de círculo de radio $a$ con centro en uno de sus vértices.</p>
        <ol class="FT_ol_a">
            <li>
                Halle el área exacta de la región sobrante comprendida entre el cuadrado y el cuadrante inscrito. Dé su respuesta redondeada a tres cifras significativas. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>
    `;

    // Solucionario
    const areaCuadrado = ladoC * ladoC;
    const areaCuadrante = 0.25 * Math.PI * ladoC * ladoC;
    const areaSobrante = areaCuadrado - areaCuadrante;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 3.1.24 (Área de Sectores Circulares y Regiones Compuestas):</b><br><br>

        <b>1. Cálculo de Área Directa e Inversa:</b><br>
        * a) Fórmula: $A = \\frac{\\theta}{360^\\circ} \\pi r^2 = \\frac{${theta1}}{360} \\pi (${r1}^2) = \\frac{${theta1 * r1 * r1}}{360} \\pi = $ <b>${parseFloat(((theta1 * r1 * r1) / 360).toFixed(3))}\\pi\\text{ cm}^2$</b>.<br>
        * b) A 3 cifras significativas: $A \\approx $ <b>${areaSector1.toFixed(1)}\\text{ cm}^2$</b> (o <b>${parseFloat(areaSector1.toPrecision(3))}\\text{ cm}^2$</b>).<br><br>

        <b>2. Inverso: Radio y Perímetro dado el Área:</b><br>
        * a) $A = \\frac{\\theta}{360} \\pi r^2 \\implies ${areaDada2} = \\frac{${theta2}}{360} \\pi r^2$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Despeje: $r^2 = \\frac{${areaDada2} \\times 360}{${theta2}\\pi} \\implies r = \\sqrt{\\frac{${(areaDada2 * 360).toFixed(1)}}{${theta2}\\pi}} \\approx $ <b>${r2.toFixed(2)}\\text{ cm}</b>.<br>
        * b) Arco: $s = \\frac{${theta2}}{360} \\times 2\\pi(${r2.toFixed(2)}) \\approx ${arc2.toFixed(2)}\\text{ cm}$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Perímetro: $2r + s = 2(${r2.toFixed(2)}) + ${arc2.toFixed(2)} \\approx $ <b>${perim2.toFixed(2)}\\text{ cm}</b>.<br><br>

        <b>3. Sector de Corona Circular (Pantalla de Lámpara):</b><br>
        * a) $A = A_{\\text{ext}} - A_{\\text{int}} = \\frac{${thetaCorona}}{360}\\pi(R^2 - r^2) = \\frac{${thetaCorona}}{360}\\pi(${rExt}^2 - ${rInt}^2) = \\frac{${thetaCorona}}{360}\\pi(${rExt*rExt - rInt*rInt}) \\approx $ <b>${areaFranja.toFixed(1)}\\text{ cm}^2$</b>.<br>
        * b) Contorno: $\\text{Arco mayor} + \\text{Arco menor} + 2\\times\\text{grosor}$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;$\\text{Arco mayor} = \\frac{${thetaCorona}}{360} \\times 2\\pi(${rExt}) \\approx ${arcoExt.toFixed(2)}\\text{ cm}$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;$\\text{Arco menor} = \\frac{${thetaCorona}}{360} \\times 2\\pi(${rInt}) \\approx ${arcoInt.toFixed(2)}\\text{ cm}$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;$\\text{Perímetro total} = ${arcoExt.toFixed(2)} + ${arcoInt.toFixed(2)} + 2(${anchoW}) \\approx $ <b>${perimFranja.toFixed(2)}\\text{ cm}</b>.<br><br>

        <b>4. Región Comprendida Cuadrado - Cuadrante:</b><br>
        * a) $A_{\\text{cuadrado}} = a^2 = ${ladoC}^2 = ${areaCuadrado}\\text{ cm}^2$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;$A_{\\text{cuadrante}} = \\frac{1}{4}\\pi(${ladoC}^2) = \\frac{${ladoC*ladoC}\\pi}{4} \\approx ${areaCuadrante.toFixed(2)}\\text{ cm}^2$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;$A_{\\text{sobrante}} = ${areaCuadrado} - ${areaCuadrante.toFixed(2)} \\approx $ <b>${areaSobrante.toFixed(2)}\\text{ cm}^2$</b> (o <b>${parseFloat(areaSobrante.toPrecision(3))}\\text{ cm}^2$</b> a 3 c.s.).
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
