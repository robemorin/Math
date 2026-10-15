// Generado a partir de: 5.8.1.js (Adaptado para Fichas de Integración Numérica - Regla del Trapecio)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Integración Numérica (Regla del Trapecio)";
}

export function tipo() {
    return 1;
}

// Redondeo a 4 decimales para cálculos intermedios y 3 cifras significativas al final (estándar IB)
function roundTo3SF(num) {
    if (num === 0) return '0';
    let d = Math.ceil(Math.log10(Math.abs(num)));
    let power = 3 - d;
    let magnitude = Math.pow(10, power);
    let shifted = Math.round(num * magnitude);
    let res = shifted / magnitude;
    return res.toPrecision(3);
}

function generarProblemaTrapecio(numProblema, tipoFuncion) {
    let a, b, n, h;
    let f_latex = '';
    let f_eval = null;

    // Los valores de n van de 4 a 6
    const n_options = [4, 5, 6];
    n = n_options[Math.floor(Math.random() * n_options.length)];

    // Asegurar que h NUNCA sea 1: opciones como 0.5, 2, 0.25, 1.5
    const h_options = [0.5, 2, 0.25, 1.5];
    h = h_options[Math.floor(Math.random() * h_options.length)];

    if (tipoFuncion === 0) {
        // Polinomio cuadrático: f(x) = p*x^2 + q*x + r
        const p = Math.floor(Math.random() * 2) + 1; // 1 o 2
        const q = Math.floor(Math.random() * 3) + 1;
        const r = Math.floor(Math.random() * 5) + 2;
        a = (h === 2) ? (Math.floor(Math.random() * 2)) : (Math.floor(Math.random() * 3) + 1);
        b = parseFloat((a + n * h).toFixed(4));

        f_latex = `${p === 1 ? '' : p}x^2 + ${q}x + ${r}`;
        f_eval = (x) => p * x * x + q * x + r;

    } else if (tipoFuncion === 1) {
        // Expresión fraccionaria racional: \frac{k}{x} o \frac{k}{2x} + cx
        const k = Math.floor(Math.random() * 8) + 4; // 4 a 12
        const c = Math.floor(Math.random() * 3) + 1;
        a = 1; // Para evitar división entre 0
        b = parseFloat((a + n * h).toFixed(4));

        f_latex = `2x + \\frac{${k}}{x} + ${c}`;
        f_eval = (x) => 2 * x + (k / x) + c;

    } else if (tipoFuncion === 2) {
        // Polinomio con término radical: \sqrt{x} o k*\sqrt{x}
        const k = Math.floor(Math.random() * 3) + 2;
        const c = Math.floor(Math.random() * 4) + 1;
        a = (h === 0.25 || h === 0.5) ? 1 : 0;
        b = parseFloat((a + n * h).toFixed(4));

        f_latex = `x^2 + ${k}\\sqrt{x} + ${c}`;
        f_eval = (x) => x * x + k * Math.sqrt(x) + c;

    } else {
        // Cúbica / combinada: x^3 - kx + c o similar
        const c = Math.floor(Math.random() * 5) + 3;
        a = 0;
        b = parseFloat((a + n * h).toFixed(4));

        f_latex = `x^3 - x + ${c}`;
        f_eval = (x) => Math.pow(x, 3) - x + c;
    }

    // Puntos evaluados para la Regla del Trapecio: x_0, x_1, ..., x_n
    const x_vals = [];
    const fx_vals = [];

    for (let i = 0; i <= n; i++) {
        const xi = parseFloat((a + i * h).toFixed(4));
        x_vals.push(xi);
        const fxi = parseFloat(f_eval(xi).toFixed(4));
        fx_vals.push(fxi);
    }

    // Fórmula del trapecio: h/2 * [ (f(x_0) + f(x_n)) + 2 * sum_{i=1}^{n-1} f(x_i) ]
    const y0 = fx_vals[0];
    const yn = fx_vals[n];
    const y_extremos = y0 + yn;

    let suma_medios = 0;
    for (let i = 1; i < n; i++) {
        suma_medios += fx_vals[i];
    }

    const suma_total_ponderada = y_extremos + 2 * suma_medios;
    const aprox_integral = (h / 2) * suma_total_ponderada;

    // Construcción de la tabla horizontal
    // Fila 1: i (índice 0, 1, ..., n)
    // Fila 2: x_i
    // Fila 3: f(x_i)
    let cabecera_i = `<th style="padding: 6px; border: 1px solid #bdc3c7; background: #eaeded; width: 80px;">$i$</th>`;
    let fila_x = `<th style="padding: 6px; border: 1px solid #bdc3c7; background: #f4f6f6;">$x_i$</th>`;
    let fila_fx = `<th style="padding: 6px; border: 1px solid #bdc3c7; background: #f4f6f6;">$f(x_i)$</th>`;

    for (let i = 0; i <= n; i++) {
        cabecera_i += `<th style="padding: 6px; border: 1px solid #bdc3c7; background: #eaeded;">${i}</th>`;
        fila_x += `<td style="padding: 6px; border: 1px solid #bdc3c7; height: 32px;"></td>`;
        fila_fx += `<td style="padding: 6px; border: 1px solid #bdc3c7; height: 32px;"></td>`;
    }

    const tablaHtml = `
    <table style="width: 100%; border-collapse: collapse; text-align: center; margin: 12px 0; font-size: 0.88rem;">
        <tr>${cabecera_i}</tr>
        <tr>${fila_x}</tr>
        <tr>${fila_fx}</tr>
    </table>
    `;

    // Cadenas formateadas para solución
    const terminos_medios = fx_vals.slice(1, n).map(v => v.toFixed(3)).join(' + ');

    const htmlCard = `
    <div style="border: 1px solid #c5d6e2; background: #fff; padding: 12px 14px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #eef2f5; padding-bottom: 4px; margin-bottom: 8px;">
            <span style="font-weight: bold; color: #2c3e50; font-size: 0.95rem;">Ejercicio ${numProblema}.</span>
            <span class="mark">6</span>
        </div>
        <p style="margin: 0 0 8px 0; font-size: 0.92rem;">
            Aproxime la integral $\\displaystyle \\int_{${a}}^{${b}} \\left( ${f_latex} \\right) \\, dx$ mediante la <b>regla del trapecio</b> con $n = ${n}$ subintervalos.
        </p>

        <!-- Definición de parámetros iniciales -->
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10px; background: #fdfefe; border: 1px dashed #cbd5e1; padding: 6px 12px; border-radius: 6px; margin-bottom: 10px; font-size: 0.85rem;">
            <div>$a = $ ________________</div>
            <div>$b = $ ________________</div>
            <div>$n = $ ________________</div>
            <div>$h = \\frac{b - a}{n} = $ ____________</div>
        </div>

        <!-- Tabla horizontal -->
        <span style="font-size: 0.82rem; font-weight: bold; color: #34495e;">Tabla de valores:</span>
        ${tablaHtml}

        <!-- Cálculo final de la aproximación -->
        <div style="margin-top: 8px;">
            <span style="font-size: 0.84rem; font-weight: bold; color: #2c3e50;">
                Aproximación de la integral: $\\displaystyle \\int_{a}^{b} f(x) \\, dx \\approx \\frac{h}{2} \\left[ f(x_0) + f(x_n) + 2 \\sum_{i=1}^{n-1} f(x_i) \\right] =$
            </span>
            <tlacuache-renglon n="2" color="#f9f9f9" alto="26"></tlacuache-renglon>
        </div>
    </div>
    `;

    const solTexto = `
    <b>Ejercicio ${numProblema}:</b><br>
    * Parámetros: $a = ${a}, \\; b = ${b}, \\; n = ${n}, \\; h = \\frac{${b} - ${a}}{${n}} = ${h}$<br>
    * Puntos evaluados ($x_0$ a $x_{${n}}$): $[${x_vals.join(', ')}]$<br>
    * Valores $f(x_i)$: $[${fx_vals.map(v => v.toFixed(3)).join(', ')}]$<br>
    * Extremos: $f(x_0) + f(x_{${n}}) = ${y0.toFixed(3)} + ${yn.toFixed(3)} = ${y_extremos.toFixed(3)}$<br>
    * Términos interiores: $2 \\times (${terminos_medios}) = 2 \\times ${suma_medios.toFixed(3)} = ${(2 * suma_medios).toFixed(3)}$<br>
    * Regla del Trapecio: $I \\approx \\frac{${h}}{2} \\left[ ${y_extremos.toFixed(3)} + ${(2 * suma_medios).toFixed(3)} \\right] = ${(h / 2).toFixed(4)} \\cdot (${suma_total_ponderada.toFixed(3)}) \\approx \\mathbf{${roundTo3SF(aprox_integral)}}$ [A1 M1 A1]<br>
    `;

    return { htmlCard, solTexto };
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("5.8.2", "5. Cálculo", "Ficha: Integración Numérica (Regla del Trapecio)");

    // Problemas para la ficha
    const p1 = generarProblemaTrapecio(1, 0); // Polinómica directa
    const p2 = generarProblemaTrapecio(2, 1); // Fraccionaria tipo a/(b x^n)
    const p3 = generarProblemaTrapecio(3, 2); // Expresión radical

    // PÁGINA 1
    html += `
    <div class="seccion-title">I. Integración Numérica: Regla del Trapecio</div>
    <div class="exercise-step">
        ${p1.htmlCard}
        <div class="page-break"></div>
        ${p2.htmlCard}
        ${p3.htmlCard}
    </div>
    <div class="page-break"></div>
    `;

    // SOLUCIONARIO
    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem; line-height: 1.5;">
        <b>Solucionario 5.8.2 - Regla del Trapecio:</b><br><br>
        <b>Página 1:</b><br>
        ${p1.solTexto}<br>
        ${p2.solTexto}<br>
        ${p3.solTexto}
    </div>
    `;

    return [html, solucion];
}
