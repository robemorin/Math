import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Integrales Definidas Fundamentales";
}

export function tipo() {
    return 1;
}

// Utilidades aritméticas para simplificación de fracciones exactas
function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        a %= b;
        [a, b] = [b, a];
    }
    return a;
}

function frac(num, den = 1) {
    if (den === 0) throw new Error("Denominador cero");
    if (den < 0) {
        num = -num;
        den = -den;
    }
    const g = gcd(num, den);
    return { num: num / g, den: den / g };
}

function subFrac(f1, f2) {
    return frac(f1.num * f2.den - f2.num * f1.den, f1.den * f2.den);
}

function toLatexFrac(f) {
    if (f.den === 1) return `${f.num}`;
    if (f.num < 0) return `-\\frac{${Math.abs(f.num)}}{${f.den}}`;
    return `\\frac{${f.num}}{${f.den}}`;
}

function randInt(min, max, excludeZero = false) {
    let val = 0;
    do {
        val = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (excludeZero && val === 0);
    return val;
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

    html += ai.getHeader("5.5.2", "5. Análisis y Cálculo", "Ficha: Integrales Definidas Fundamentales");
    html += `
    <div class="contexto-especial" style="margin-bottom: 18px;">
        <b>Instrucción:</b> Calcule el valor exacto o redondeado a 3 cifras significativas de cada una de las siguientes integrales definidas $\\int_a^b f(x)\\,dx$. Muestre su procedimiento y la antiderivada obtenida antes de evaluar los límites.
    </div>
    `;

    // 10 ejercicios distribuidos según el acomodo de 3.3.22 (4 en pág 1 y 6 en pág 2)
    // Cubriendo las 4 formas solicitadas:
    // 1: ax^n
    // 2: a / (b x^n)
    // 3: \sqrt[m]{x^n}
    // 4: a / (b \sqrt[m]{x^n})
    const ejerciciosTipos = [
        // PÁGINA 1 (4 ejercicios amplios)
        1, // ax^n
        2, // a / (b x^n)
        3, // \sqrt[m]{x^n}
        4, // a / (b \sqrt[m]{x^n})

        // PÁGINA 2 (6 ejercicios)
        1, // ax^n
        2, // a / (b x^n)
        3, // \sqrt[m]{x^n}
        4, // a / (b \sqrt[m]{x^n})
        1, // ax^n
        3  // \sqrt[m]{x^n}
    ];

    const cardsHtml = [];
    const solucionesList = [];

    for (let i = 0; i < ejerciciosTipos.length; i++) {
        const tipoEj = ejerciciosTipos[i];
        const isPagina1 = i < 4;
        let exprIntegral = '';
        let antiderivadaTex = '';
        let a = 0;
        let b = 0;
        let valorNumerico = 0;
        let solucionPaso = '';

        if (tipoEj === 1) {
            // Forma 1: ax^n (n >= 1 entero)
            const aCoeff = randInt(2, 9);
            const nExp = randInt(1, 4);
            a = randInt(0, 2);
            b = a + randInt(1, 3);

            const nPlus1 = nExp + 1;
            const F_b = (aCoeff * Math.pow(b, nPlus1)) / nPlus1;
            const F_a = (aCoeff * Math.pow(a, nPlus1)) / nPlus1;
            valorNumerico = F_b - F_a;

            const xTerm = nExp === 1 ? 'x' : `x^{${nExp}}`;
            exprIntegral = `\\int_{${a}}^{${b}} ${aCoeff}${xTerm}\\,dx`;

            const fracCoeff = frac(aCoeff, nPlus1);
            antiderivadaTex = fracCoeff.den === 1 
                ? (fracCoeff.num === 1 ? `x^{${nPlus1}}` : `${fracCoeff.num}x^{${nPlus1}}`)
                : `\\frac{${fracCoeff.num}x^{${nPlus1}}}{${fracCoeff.den}}`;

            // Fracción exacta
            const fbExact = frac(aCoeff * Math.pow(b, nPlus1), nPlus1);
            const faExact = frac(aCoeff * Math.pow(a, nPlus1), nPlus1);
            const valExact = subFrac(fbExact, faExact);

            solucionPaso = `\\left[ ${antiderivadaTex} \\right]_{${a}}^{${b}} = ${toLatexFrac(valExact)} \\approx ${roundTo3SF(valorNumerico)}`;

        } else if (tipoEj === 2) {
            // Forma 2: a / (b x^n) con n >= 2 (para evitar ln y mantener regla de potencias)
            const aCoeff = randInt(1, 8);
            const bCoeff = randInt(1, 4);
            const nExp = randInt(2, 4); // x^(-n)
            a = randInt(1, 2);
            b = a + randInt(1, 2); // límites positivos para evitar 0

            // \int a/(b x^n) dx = (a/b) * x^(-n+1) / (-n+1) = -a / (b*(n-1)*x^{n-1})
            const denomP = bCoeff * (nExp - 1);
            const F_val = (x) => -aCoeff / (denomP * Math.pow(x, nExp - 1));
            valorNumerico = F_val(b) - F_val(a);

            const denomIntegrando = bCoeff === 1 ? `x^{${nExp}}` : `${bCoeff}x^{${nExp}}`;
            exprIntegral = `\\int_{${a}}^{${b}} \\frac{${aCoeff}}{${denomIntegrando}}\\,dx`;

            const fracAntider = frac(aCoeff, denomP);
            const pExp = nExp - 1;
            const xDenom = pExp === 1 ? 'x' : `x^{${pExp}}`;
            antiderivadaTex = fracAntider.den === 1
                ? `-\\frac{${fracAntider.num}}{${xDenom}}`
                : `-\\frac{${fracAntider.num}}{${fracAntider.den}${xDenom}}`;

            // Cálculo fraccionario exacto
            const fbExact = frac(-aCoeff, denomP * Math.pow(b, pExp));
            const faExact = frac(-aCoeff, denomP * Math.pow(a, pExp));
            const valExact = subFrac(fbExact, faExact);

            solucionPaso = `\\left[ ${antiderivadaTex} \\right]_{${a}}^{${b}} = ${toLatexFrac(valExact)} \\approx ${roundTo3SF(valorNumerico)}`;

        } else if (tipoEj === 3) {
            // Forma 3: \sqrt[m]{x^n} -> x^{n/m}
            // Elegimos pares (m, n) sencillos
            const pares = [
                { m: 2, n: 1 }, // \sqrt{x} = x^(1/2)
                { m: 2, n: 3 }, // \sqrt{x^3} = x^(3/2)
                { m: 3, n: 1 }, // \sqrt[3]{x} = x^(1/3)
                { m: 3, n: 2 }, // \sqrt[3]{x^2} = x^(2/3)
                { m: 4, n: 1 }  // \sqrt[4]{x} = x^(1/4)
            ];
            const par = pares[randInt(0, pares.length - 1)];
            const m = par.m;
            const n = par.n;

            a = 0;
            // Si m=2, podemos usar b=1 o b=4; si m=3, b=1 o b=8, etc., o enteros pequeños
            b = m === 2 ? [1, 4][randInt(0, 1)] : (m === 3 ? [1, 8][randInt(0, 1)] : randInt(1, 4));

            // \int x^(n/m) dx = \frac{m}{m+n} x^{(m+n)/m}
            const pNum = m + n;
            const pDen = m;
            const F_val = (x) => (m / pNum) * Math.pow(x, pNum / pDen);
            valorNumerico = F_val(b) - F_val(a);

            const radStr = m === 2 
                ? (n === 1 ? `\\sqrt{x}` : `\\sqrt{x^{${n}}}`)
                : (n === 1 ? `\\sqrt[${m}]{x}` : `\\sqrt[${m}]{x^{${n}}}`);

            exprIntegral = `\\int_{${a}}^{${b}} ${radStr}\\,dx`;

            const fracCoeff = frac(m, pNum);
            antiderivadaTex = fracCoeff.den === 1 
                ? `${fracCoeff.num}x^{\\frac{${pNum}}{${pDen}}}`
                : `\\frac{${fracCoeff.num}}{${fracCoeff.den}}x^{\\frac{${pNum}}{${pDen}}}`;

            solucionPaso = `\\left[ ${antiderivadaTex} \\right]_{${a}}^{${b}} = \\left[ \\frac{${m}}{${pNum}}\\sqrt[${m}]{x^{${pNum}}} \\right]_{${a}}^{${b}} \\approx ${roundTo3SF(valorNumerico)}`;

        } else {
            // Forma 4: a / (b \sqrt[m]{x^n}) -> (a/b) * x^(-n/m) con n/m != 1 (para no ser 1/x)
            const pares = [
                { m: 2, n: 1 }, // 1/\sqrt{x} -> exponente -1/2, antiderivada x^(1/2)
                { m: 2, n: 3 }, // 1/\sqrt{x^3} -> exponente -3/2, antiderivada -2 x^(-1/2)
                { m: 3, n: 1 }, // 1/\sqrt[3]{x} -> exponente -1/3, antiderivada (3/2) x^(2/3)
                { m: 3, n: 2 }  // 1/\sqrt[3]{x^2} -> exponente -2/3, antiderivada 3 x^(1/3)
            ];
            const par = pares[randInt(0, pares.length - 1)];
            const m = par.m;
            const n = par.n;
            const aCoeff = randInt(1, 6);
            const bCoeff = randInt(1, 3);

            a = 1;
            b = m === 2 ? 4 : (m === 3 ? 8 : randInt(2, 4));

            // \int (a/b) x^(-n/m) dx = (a/b) * \frac{m}{m-n} x^{(m-n)/m}
            const pNum = m - n;
            const pDen = m;
            const multCoeff = (aCoeff / bCoeff) * (m / pNum);
            const F_val = (x) => multCoeff * Math.pow(x, pNum / pDen);
            valorNumerico = F_val(b) - F_val(a);

            const radStr = m === 2 
                ? (n === 1 ? `\\sqrt{x}` : `\\sqrt{x^{${n}}}`)
                : (n === 1 ? `\\sqrt[${m}]{x}` : `\\sqrt[${m}]{x^{${n}}}`);

            const denomIntegrando = bCoeff === 1 ? radStr : `${bCoeff}${radStr}`;
            exprIntegral = `\\int_{${a}}^{${b}} \\frac{${aCoeff}}{${denomIntegrando}}\\,dx`;

            const fracOverall = frac(aCoeff * m, bCoeff * pNum);
            antiderivadaTex = fracOverall.den === 1
                ? `${fracOverall.num}x^{\\frac{${pNum}}{${pDen}}}`
                : `${toLatexFrac(fracOverall)}x^{\\frac{${pNum}}{${pDen}}}`;

            solucionPaso = `\\left[ ${antiderivadaTex} \\right]_{${a}}^{${b}} \\approx ${roundTo3SF(valorNumerico)}`;
        }

        // Acomodo idéntico a 3.3.22: tarjetas con numeración, puntaje, caja de expresión y tlacuache-renglon
        const renglonAlto = isPagina1 ? 26 : 21;
        const numRenglones = isPagina1 ? 5 : 4;
        const fontTam = isPagina1 ? "1.45rem" : "1.25rem";
        const paddingCard = isPagina1 ? "14px 16px" : "10px 12px";

        const card = `
        <div style="border: 1px solid #c5d6e2; background: #fff; padding: ${paddingCard}; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); text-align: center; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #eef2f5; padding-bottom: 4px; margin-bottom: 8px;">
                <span style="font-weight: bold; color: #2c3e50; font-size: 1.05rem;">${i + 1}.</span>
                <span class="mark">3</span>
            </div>
            
            <div style="margin: 12px 0 16px 0; font-size: ${fontTam}; color: #1a365d; min-height: 48px; display: flex; align-items: center; justify-content: center;">
                $${exprIntegral}$
            </div>

            <div style="margin-top: auto;">
                <tlacuache-renglon n="${numRenglones}" color="#f9f9f9" alto="${renglonAlto}"></tlacuache-renglon>
            </div>
        </div>
        `;

        cardsHtml.push(card);
        solucionesList.push(`<b>${i + 1})</b> $${exprIntegral} = ${solucionPaso}$`);
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
    <div style="font-family: sans-serif; font-size: 0.85rem; line-height: 1.6;">
        <b>Solucionario - Integrales Definidas Fundamentales:</b><br><br>
        <b>Página 1:</b><br>
        ${solucionesList.slice(0, 4).join('<br>')}<br><br>
        <b>Página 2:</b><br>
        ${solucionesList.slice(4, 10).join('<br>')}
    </div>
    `;

    return [html, solucion];
}
