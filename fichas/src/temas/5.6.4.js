import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Integrales Indefinidas Fundamentales";
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

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("5.6.4", "5. Análisis y Cálculo", "Ficha: Integrales Indefinidas Fundamentales");
    html += `
    <div class="contexto-especial" style="margin-bottom: 18px;">
        <b>Instrucción:</b> Halle la integral indefinida $\\int f(x)\\,dx$ para cada una de las siguientes expresiones. Exprese el resultado en su forma más simplificada y no olvide incluir la constante de integración $+ C$.
    </div>
    `;

    // 10 ejercicios distribuidos según el acomodo de 3.3.22 (4 en pág 1 y 6 en pág 2)
    // Mismas 4 formas que 5.5.2 pero sin límites de integración:
    // 1: ax^n
    // 2: a / (b x^n)
    // 3: \sqrt[m]{x^n}
    // 4: a / (b \sqrt[m]{x^n})
    const ejerciciosTipos = [
        // PÁGINA 1 (4 ejercicios más amplios)
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
        let formaEquivalente = '';

        if (tipoEj === 1) {
            // Forma 1: ax^n
            const aCoeff = randInt(2, 9);
            const nExp = randInt(1, 4);
            const xTerm = nExp === 1 ? 'x' : `x^{${nExp}}`;
            exprIntegral = `\\int ${aCoeff}${xTerm}\\,dx`;

            const nPlus1 = nExp + 1;
            const fracCoeff = frac(aCoeff, nPlus1);
            if (fracCoeff.den === 1) {
                antiderivadaTex = fracCoeff.num === 1 ? `x^{${nPlus1}}` : `${fracCoeff.num}x^{${nPlus1}}`;
            } else {
                antiderivadaTex = `\\frac{${fracCoeff.num}x^{${nPlus1}}}{${fracCoeff.den}}`;
            }
            antiderivadaTex += ` + C`;

        } else if (tipoEj === 2) {
            // Forma 2: a / (b x^n) con n >= 2
            const aCoeff = randInt(1, 8);
            const bCoeff = randInt(1, 4);
            const nExp = randInt(2, 4);

            const denomIntegrando = bCoeff === 1 ? `x^{${nExp}}` : `${bCoeff}x^{${nExp}}`;
            exprIntegral = `\\int \\frac{${aCoeff}}{${denomIntegrando}}\\,dx`;

            // \int (a/b) x^(-n) dx = (a/b) * (x^(-n+1) / (-n+1)) = -a / (b*(n-1)*x^{n-1})
            const denomP = bCoeff * (nExp - 1);
            const fracAntider = frac(aCoeff, denomP);
            const pExp = nExp - 1;
            const xDenom = pExp === 1 ? 'x' : `x^{${pExp}}`;

            if (fracAntider.den === 1) {
                antiderivadaTex = `-\\frac{${fracAntider.num}}{${xDenom}} + C`;
            } else {
                antiderivadaTex = `-\\frac{${fracAntider.num}}{${fracAntider.den}${xDenom}} + C`;
            }

            formaEquivalente = (pExp === 1) 
                ? (fracAntider.den === 1 ? `-${fracAntider.num}x^{-1} + C` : `-\\frac{${fracAntider.num}}{${fracAntider.den}}x^{-1} + C`)
                : (fracAntider.den === 1 ? `-${fracAntider.num}x^{-${pExp}} + C` : `-\\frac{${fracAntider.num}}{${fracAntider.den}}x^{-${pExp}} + C`);

        } else if (tipoEj === 3) {
            // Forma 3: \sqrt[m]{x^n} -> x^{n/m}
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

            const radStr = m === 2 
                ? (n === 1 ? `\\sqrt{x}` : `\\sqrt{x^{${n}}}`)
                : (n === 1 ? `\\sqrt[${m}]{x}` : `\\sqrt[${m}]{x^{${n}}}`);

            exprIntegral = `\\int ${radStr}\\,dx`;

            // \int x^(n/m) dx = \frac{m}{m+n} x^{(m+n)/m}
            const pNum = m + n;
            const pDen = m;
            const fracCoeff = frac(m, pNum);

            const coeffStr = fracCoeff.den === 1 
                ? `${fracCoeff.num}` 
                : `\\frac{${fracCoeff.num}}{${fracCoeff.den}}`;

            antiderivadaTex = `${coeffStr}x^{\\frac{${pNum}}{${pDen}}} + C`;
            
            const radResult = m === 2
                ? `\\sqrt{x^{${pNum}}}`
                : `\\sqrt[${m}]{x^{${pNum}}}`;
            formaEquivalente = `${coeffStr}${radResult} + C`;

        } else {
            // Forma 4: a / (b \sqrt[m]{x^n}) -> (a/b) * x^(-n/m)
            const pares = [
                { m: 2, n: 1 }, // 1/\sqrt{x}
                { m: 2, n: 3 }, // 1/\sqrt{x^3}
                { m: 3, n: 1 }, // 1/\sqrt[3]{x}
                { m: 3, n: 2 }  // 1/\sqrt[3]{x^2}
            ];
            const par = pares[randInt(0, pares.length - 1)];
            const m = par.m;
            const n = par.n;
            const aCoeff = randInt(1, 6);
            const bCoeff = randInt(1, 3);

            const radStr = m === 2 
                ? (n === 1 ? `\\sqrt{x}` : `\\sqrt{x^{${n}}}`)
                : (n === 1 ? `\\sqrt[${m}]{x}` : `\\sqrt[${m}]{x^{${n}}}`);

            const denomIntegrando = bCoeff === 1 ? radStr : `${bCoeff}${radStr}`;
            exprIntegral = `\\int \\frac{${aCoeff}}{${denomIntegrando}}\\,dx`;

            // \int (a/b) x^(-n/m) dx = (a/b) * \frac{m}{m-n} x^{(m-n)/m}
            const pNum = m - n;
            const pDen = m;
            const fracOverall = frac(aCoeff * m, bCoeff * pNum);

            const coeffStr = fracOverall.den === 1 
                ? `${fracOverall.num}` 
                : `${toLatexFrac(fracOverall)}`;

            antiderivadaTex = `${coeffStr}x^{\\frac{${pNum}}{${pDen}}} + C`;

            if (pNum > 0) {
                const radResult = m === 2
                    ? (pNum === 1 ? `\\sqrt{x}` : `\\sqrt{x^{${pNum}}}`)
                    : (pNum === 1 ? `\\sqrt[${m}]{x}` : `\\sqrt[${m}]{x^{${pNum}}}`);
                formaEquivalente = `${coeffStr}${radResult} + C`;
            } else {
                const posP = Math.abs(pNum);
                const radResult = m === 2
                    ? (posP === 1 ? `\\sqrt{x}` : `\\sqrt{x^{${posP}}}`)
                    : (posP === 1 ? `\\sqrt[${m}]{x}` : `\\sqrt[${m}]{x^{${posP}}}`);
                const posFrac = frac(Math.abs(fracOverall.num), fracOverall.den);
                const denomStr = posFrac.den === 1 ? radResult : `${posFrac.den}${radResult}`;
                formaEquivalente = `-\\frac{${posFrac.num}}{${denomStr}} + C`;
            }
        }

        // Acomodo idéntico a 5.5.2: tarjetas con numeración, puntaje, caja de expresión y tlacuache-renglon
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
        const solExtra = formaEquivalente && formaEquivalente !== antiderivadaTex ? ` \\quad \\text{o} \\quad ${formaEquivalente}` : '';
        solucionesList.push(`<b>${i + 1})</b> $${exprIntegral} = ${antiderivadaTex}${solExtra}$`);
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
        <b>Solucionario - Integrales Indefinidas Fundamentales:</b><br><br>
        <b>Página 1:</b><br>
        ${solucionesList.slice(0, 4).join('<br>')}<br><br>
        <b>Página 2:</b><br>
        ${solucionesList.slice(4, 10).join('<br>')}
    </div>
    `;

    return [html, solucion];
}
