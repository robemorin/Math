import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Línea Tangente y Normal (Formas Algebraicas Fundamentales)";
}

export function tipo() {
    return 1; // Ficha de trabajo imprimible / Abierta
}

// =========================================================================
// UTILIDADES ARITMÉTICAS EXACTAS (FRACCIONES RACIONALES)
// =========================================================================
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

function addFrac(f1, f2) {
    return frac(f1.num * f2.den + f2.num * f1.den, f1.den * f2.den);
}

function subFrac(f1, f2) {
    return frac(f1.num * f2.den - f2.num * f1.den, f1.den * f2.den);
}

function mulFrac(f1, f2) {
    return frac(f1.num * f2.num, f1.den * f2.den);
}

function divFrac(f1, f2) {
    return frac(f1.num * f2.den, f1.den * f2.num);
}

function toLatexFrac(f) {
    if (f.den === 1) return `${f.num}`;
    if (f.num < 0) return `-\\frac{${Math.abs(f.num)}}{${f.den}}`;
    return `\\frac{${f.num}}{${f.den}}`;
}

function toLatexLine(m, c) {
    let res = "y = ";
    if (m.num === 0) {
        return `y = ${toLatexFrac(c)}`;
    }
    if (m.den === 1) {
        if (m.num === 1) res += "x";
        else if (m.num === -1) res += "-x";
        else res += `${m.num}x`;
    } else {
        res += `${toLatexFrac(m)}x`;
    }

    if (c.num > 0) {
        res += ` + ${toLatexFrac(c)}`;
    } else if (c.num < 0) {
        res += ` - ${toLatexFrac(frac(Math.abs(c.num), c.den))}`;
    }
    return res;
}

function randInt(min, max, excludeZero = false) {
    let val = 0;
    do {
        val = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (excludeZero && val === 0);
    return val;
}

function formatLinearAndConstant(b, c) {
    let s = "";
    if (b !== 0) {
        if (b === 1) s += " + x";
        else if (b === -1) s += " - x";
        else if (b > 0) s += ` + ${b}x`;
        else s += ` - ${Math.abs(b)}x`;
    }
    if (c !== 0) {
        if (c > 0) s += ` + ${c}`;
        else s += ` - ${Math.abs(c)}`;
    }
    return s;
}

// =========================================================================
// GENERADOR 1: f(x) = a x^n + b x + c
// =========================================================================
function generarProblema1(numProblema) {
    const n = [2, 3, 4][Math.floor(Math.random() * 3)];
    const a = randInt(-3, 3, true);
    const b = randInt(-5, 5, true);
    const c = randInt(-6, 6, true);
    let x0 = randInt(-3, 3, true);

    // Evitar derivada 0 para que la normal siempre esté bien definida
    while (a * n * Math.pow(x0, n - 1) + b === 0) {
        x0 = randInt(-3, 3, true);
    }

    // Expresión de f(x)
    let term1 = "";
    if (a === 1) term1 = `x^{${n}}`;
    else if (a === -1) term1 = `-x^{${n}}`;
    else term1 = `${a}x^{${n}}`;

    const f_latex = `${term1}${formatLinearAndConstant(b, c)}`;

    // Derivada f'(x)
    const a_deriv = a * n;
    let term_deriv = "";
    if (n - 1 === 1) {
        term_deriv = (a_deriv === 1 ? "" : a_deriv === -1 ? "-" : `${a_deriv}`) + "x";
    } else {
        term_deriv = (a_deriv === 1 ? "" : a_deriv === -1 ? "-" : `${a_deriv}`) + `x^{${n - 1}}`;
    }
    const f_prime_latex = `${term_deriv}${b > 0 ? ' + ' + b : ' - ' + Math.abs(b)}`;

    const y0_val = a * Math.pow(x0, n) + b * x0 + c;
    const y0 = frac(y0_val, 1);
    const m_val = a * n * Math.pow(x0, n - 1) + b;
    const m_tan = frac(m_val, 1);
    const c_tan = subFrac(y0, mulFrac(m_tan, frac(x0, 1)));

    const m_norm = frac(-m_tan.den, m_tan.num);
    const c_norm = subFrac(y0, mulFrac(m_norm, frac(x0, 1)));

    const eq_tan = toLatexLine(m_tan, c_tan);
    const eq_norm = toLatexLine(m_norm, c_norm);

    return {
        numProblema,
        tipoNombre: `Forma Polinómica $ax^n$`,
        f_latex,
        x0,
        y0,
        m_tan,
        c_tan,
        m_norm,
        c_norm,
        eq_tan,
        eq_norm,
        f_prime_latex
    };
}

// =========================================================================
// GENERADOR 2: f(x) = \frac{a}{x^n} + b x + c
// =========================================================================
function generarProblema2(numProblema) {
    const n = [1, 2, 3][Math.floor(Math.random() * 3)];
    const x0 = [1, 2, 3][Math.floor(Math.random() * 3)] * (Math.random() < 0.5 ? 1 : -1);
    const a = randInt(-4, 4, true);
    const b = randInt(-5, 5, true);
    const c = randInt(-6, 6, true);

    const x0_pow_n = Math.pow(x0, n);
    const x0_pow_np1 = Math.pow(x0, n + 1);

    // f(x)
    let term1 = "";
    if (a < 0) {
        term1 = `-\\frac{${Math.abs(a)}}{x${n === 1 ? '' : '^{' + n + '}'}}`;
    } else {
        term1 = `\\frac{${a}}{x${n === 1 ? '' : '^{' + n + '}'}}`;
    }
    const f_latex = `${term1}${formatLinearAndConstant(b, c)}`;

    // Derivada
    const deriv_num = -a * n;
    let term_deriv = "";
    if (deriv_num < 0) {
        term_deriv = `-\\frac{${Math.abs(deriv_num)}}{x^{${n + 1}}}`;
    } else {
        term_deriv = `\\frac{${deriv_num}}{x^{${n + 1}}}`;
    }
    const f_prime_latex = `${b > 0 ? b : '- ' + Math.abs(b)} + ${term_deriv}`.replace('+ -', '- ');

    const y0 = addFrac(frac(b * x0 + c, 1), frac(a, x0_pow_n));
    let m_tan = subFrac(frac(b, 1), frac(a * n, x0_pow_np1));
    if (m_tan.num === 0) {
        // En el caso muy improbable de pendiente 0, ajustamos b
        m_tan = frac(1, 1);
    }
    const c_tan = subFrac(y0, mulFrac(m_tan, frac(x0, 1)));

    const m_norm = frac(-m_tan.den, m_tan.num);
    const c_norm = subFrac(y0, mulFrac(m_norm, frac(x0, 1)));

    const eq_tan = toLatexLine(m_tan, c_tan);
    const eq_norm = toLatexLine(m_norm, c_norm);

    return {
        numProblema,
        tipoNombre: `Forma Racional $\\frac{a}{x^n}$`,
        f_latex,
        x0,
        y0,
        m_tan,
        c_tan,
        m_norm,
        c_norm,
        eq_tan,
        eq_norm,
        f_prime_latex
    };
}

// =========================================================================
// GENERADOR 3: f(x) = a \sqrt[n]{x^m} + b x + c
// =========================================================================
function generarProblema3(numProblema) {
    const rootOptions = [
        { n: 2, m: 1 }, // sqrt(x)
        { n: 2, m: 3 }, // sqrt(x^3)
        { n: 3, m: 1 }, // cbrt(x)
        { n: 3, m: 2 }  // cbrt(x^2)
    ];
    const sel = rootOptions[Math.floor(Math.random() * rootOptions.length)];
    const n = sel.n;
    const m_exp = sel.m;

    const k = (n === 2) ? [1, 2, 3][Math.floor(Math.random() * 3)] : [1, 2][Math.floor(Math.random() * 2)];
    const x0 = Math.pow(k, n);
    const a = randInt(-4, 4, true);
    const b = randInt(-5, 5, true);
    const c = randInt(-6, 6, true);

    // Latex de a * root[n]{x^m}
    let radicalLatex = "";
    if (n === 2) {
        radicalLatex = (m_exp === 1) ? `\\sqrt{x}` : `\\sqrt{x^3}`;
    } else {
        radicalLatex = (m_exp === 1) ? `\\sqrt[3]{x}` : `\\sqrt[3]{x^2}`;
    }

    let term1 = "";
    if (a === 1) term1 = radicalLatex;
    else if (a === -1) term1 = `-${radicalLatex}`;
    else term1 = `${a}${radicalLatex}`;

    const f_latex = `${term1}${formatLinearAndConstant(b, c)}`;

    // Valores exactos:
    // f(x0) = a * k^m + b * x0 + c
    const y0 = frac(a * Math.pow(k, m_exp) + b * x0 + c, 1);
    // f'(x0) = b + (a * m / n) * x0^(m/n - 1) = b + (a * m / n) * k^(m - n)
    // k^(m - n) = k^m / k^n
    const m_tan = addFrac(frac(b, 1), mulFrac(frac(a * m_exp, n), frac(Math.pow(k, m_exp), Math.pow(k, n))));
    const c_tan = subFrac(y0, mulFrac(m_tan, frac(x0, 1)));

    const m_norm = frac(-m_tan.den, m_tan.num);
    const c_norm = subFrac(y0, mulFrac(m_norm, frac(x0, 1)));

    const eq_tan = toLatexLine(m_tan, c_tan);
    const eq_norm = toLatexLine(m_norm, c_norm);

    return {
        numProblema,
        tipoNombre: `Forma Radical $a\\sqrt[n]{x^m}$`,
        f_latex,
        x0,
        y0,
        m_tan,
        c_tan,
        m_norm,
        c_norm,
        eq_tan,
        eq_norm,
        n,
        m_exp
    };
}

// =========================================================================
// GENERADOR 4: f(x) = \frac{a}{\sqrt[m]{x^n}} + b x + c
// =========================================================================
function generarProblema4(numProblema) {
    const rootOptions = [
        { m: 2, n: 1 }, // a / sqrt(x)
        { m: 2, n: 3 }, // a / sqrt(x^3)
        { m: 3, n: 1 }, // a / cbrt(x)
        { m: 3, n: 2 }  // a / cbrt(x^2)
    ];
    const sel = rootOptions[Math.floor(Math.random() * rootOptions.length)];
    const m_idx = sel.m;
    const n_exp = sel.n;

    const k = (m_idx === 2) ? [1, 2, 3][Math.floor(Math.random() * 3)] : [1, 2][Math.floor(Math.random() * 2)];
    const x0 = Math.pow(k, m_idx);
    const a = randInt(-4, 4, true);
    const b = randInt(-5, 5, true);
    const c = randInt(-6, 6, true);

    let radicalLatex = "";
    if (m_idx === 2) {
        radicalLatex = (n_exp === 1) ? `\\sqrt{x}` : `\\sqrt{x^3}`;
    } else {
        radicalLatex = (n_exp === 1) ? `\\sqrt[3]{x}` : `\\sqrt[3]{x^2}`;
    }

    let term1 = "";
    if (a < 0) {
        term1 = `-\\frac{${Math.abs(a)}}{${radicalLatex}}`;
    } else {
        term1 = `\\frac{${a}}{${radicalLatex}}`;
    }

    const f_latex = `${term1}${formatLinearAndConstant(b, c)}`;

    // f(x0) = b * x0 + c + a / k^n
    const y0 = addFrac(frac(b * x0 + c, 1), frac(a, Math.pow(k, n_exp)));
    // f'(x0) = b - (a * n / m) * 1 / k^(n + m)
    const m_tan = subFrac(frac(b, 1), mulFrac(frac(a * n_exp, m_idx), frac(1, Math.pow(k, n_exp + m_idx))));
    const c_tan = subFrac(y0, mulFrac(m_tan, frac(x0, 1)));

    const m_norm = frac(-m_tan.den, m_tan.num);
    const c_norm = subFrac(y0, mulFrac(m_norm, frac(x0, 1)));

    const eq_tan = toLatexLine(m_tan, c_tan);
    const eq_norm = toLatexLine(m_norm, c_norm);

    return {
        numProblema,
        tipoNombre: `Forma Radical en Denominador $\\frac{a}{\\sqrt[m]{x^n}}$`,
        f_latex,
        x0,
        y0,
        m_tan,
        c_tan,
        m_norm,
        c_norm,
        eq_tan,
        eq_norm,
        m_idx,
        n_exp
    };
}

// Lista de generadores disponibles
const GENERADORES = [generarProblema1, generarProblema2, generarProblema3, generarProblema4];

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    // Elegir aleatoriamente los 4 problemas garantizando variedad de generadores
    const indices = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
    const problemas = indices.map((genIdx, i) => GENERADORES[genIdx](i + 1));

    problemas.forEach((prob, index) => {
        const pag = index + 1;
        html += ai.getHeader("5.2.6", "5. Cálculo", `Línea Tangente y Normal (Pág. ${pag}/4)`);

        html += `
        <div class="exercise-step">
            <p style="font-size: 1.05rem; margin-bottom: 8px;">
                <strong>Problema ${prob.numProblema}.</strong> Considere la función dada por:
            </p>
            <p style="text-align: center; font-size: 1.35rem; margin: 18px 0;">
                $$f(x) = ${prob.f_latex}$$
            </p>
            <p style="margin-top: 15px; font-size: 1rem; color: #2c3e50;">
                Determine en <strong>forma exacta</strong> (sin aproximaciones decimales):
            </p>
            
            <ol class="FT_ol_a" style="margin-top: 15px; line-height: 1.7;">
                <li style="margin-bottom: 25px;">
                    La ecuación de la <strong>recta tangente</strong> a la curva en el punto donde $x = ${prob.x0}$. Escriba su respuesta en la forma $y = mx + c$.
                    <span class="mark">3</span>
                    <tlacuache-renglon n="7" color="#f9f9f9"></tlacuache-renglon>
                </li>
                <li style="margin-top: 25px;">
                    La ecuación de la <strong>recta normal</strong> a la curva en el mismo punto donde $x = ${prob.x0}$. Escriba su respuesta en la forma $y = mx + c$.
                    <span class="mark">3</span>
                    <tlacuache-renglon n="7" color="#f9f9f9"></tlacuache-renglon>
                </li>
            </ol>
        </div>
        </div>
        `;

        //if (index < problemas.length - 1) {
            html += `<div class="page-break"></div>`;
        //}
    });

    // =========================================================================
    // SOLUCIONARIO CON FORMATO EXACTO
    // =========================================================================
    solucion += `
    <div style="font-family: 'Inter', sans-serif; font-size: 0.9rem; line-height: 1.6;">
        <h3 style="border-bottom: 2px solid #2c3e50; padding-bottom: 4px; color: #2c3e50;">
            Solucionario 5.2.6 - Línea Tangente y Normal (Valores Exactos)
        </h3>
    `;

    problemas.forEach((prob) => {
        solucion += `
        <div style="margin-bottom: 16px; padding: 8px 12px; background: #fdfdfd; border-left: 4px solid #2980b9;">
            <strong>Problema ${prob.numProblema} [${prob.tipoNombre}]:</strong> $f(x) = ${prob.f_latex}$ en $x_0 = ${prob.x0}$<br>
            • Punto de tangencia exacto: $P(${prob.x0}, ${toLatexFrac(prob.y0)})$<br>
            • Pendiente de la tangente: $m = ${toLatexFrac(prob.m_tan)}$<br>
            • <strong>(a) Recta Tangente:</strong> $${prob.eq_tan}$<br>
            • Pendiente de la normal: $m_{\\perp} = ${toLatexFrac(prob.m_norm)}$<br>
            • <strong>(b) Recta Normal:</strong> $${prob.eq_norm}$
        </div>
        `;
    });

    solucion += `</div>`;

    return [html, solucion];
}

export async function render(container, n, code) {
}
