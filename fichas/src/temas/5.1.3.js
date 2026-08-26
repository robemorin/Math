import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Módulo de práctica: Límites racionales factorizables.
 * Ficha generada a partir de los temas 10.4.1, 10.4.2 y 10.4.3.
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

// Función auxiliar para convertir array de coeficientes a texto LaTeX
function polyToLatex(c) {
    let str = "";
    let n = c.length - 1;
    for (let i = 0; i <= n; i++) {
        let coef = c[i];
        if (coef === 0) continue;
        
        let power = n - i;
        let term = "";
        
        if (coef > 0 && str !== "") term += "+";
        else if (coef < 0) term += "-";
        
        let absCoef = Math.abs(coef);
        
        if (absCoef !== 1 || power === 0) term += absCoef;
        
        if (power === 1) term += "x";
        else if (power > 1) term += `x^{${power}}`;
        
        str += term;
    }
    return str === "" ? "0" : str;
}

export function name() {
  return "Ficha: Límites Racionales Factorizables";
}

export function tipo() {
  return 1; // Abierta / Imprimible
}

export async function pregunta(np, code) {
    // ---------------------------------------------------------
    // GENERACIÓN DE PROBLEMAS
    // ---------------------------------------------------------
    
    // Problemas Tipo 1: Cuadrático sobre lineal
    let probs1 = [];
    for(let i=0; i<3; i++) {
        let a = Math.floor(Math.random() * 3) + 1;
        let k = Math.floor(Math.random() * 7) - 3;
        if (k === 0) k = 2;
        let b = -a * k;
        let D = [a, b];
        
        let q1 = 1;
        let q0 = Math.floor(Math.random() * 9) - 4;
        if (q0 === -k) q0 += 1; 
        let Q = [q1, q0];
        let P_poly = tlacu.conv(D, Q);
        
        let ans = q1 * k + q0;
        probs1.push({k, P_poly, D, Q, ans});
    }

    // Problemas Tipo 2: Cúbico sobre lineal
    let probs2 = [];
    for(let i=0; i<3; i++) {
        let a = Math.floor(Math.random() * 2) + 1; 
        let k = Math.floor(Math.random() * 5) - 2; 
        if (k === 0) k = -3;
        let b = -a * k;
        let D = [a, b];
        
        let q2 = Math.floor(Math.random() * 2) + 1;
        let q1 = Math.floor(Math.random() * 7) - 3;
        let q0 = Math.floor(Math.random() * 7) - 3;
        let Q = [q2, q1, q0];
        let P_poly = tlacu.conv(D, Q);
        
        let ans = q2 * (k * k) + q1 * k + q0;
        probs2.push({k, P_poly, D, Q, ans});
    }

    // Problemas Tipo 3: Factor común y diferencia de cuadrados
    let probs3 = [];
    for(let i=0; i<3; i++) {
        let k = Math.floor(Math.random() * 6) + 2; 
        probs3.push({k, ans: 1/2}); // ans is always 1/2 for this structure
    }

    // ---------------------------------------------------------
    // CONSTRUCCIÓN DEL HTML
    // ---------------------------------------------------------
    let htmlPreguntas = "";
    let htmlSoluciones = "";
    let qNum = 1;

    // Sección Tipo 1
    htmlPreguntas += `<p><b>Límites con polinomio cuadrático:</b></p>`;
    htmlSoluciones += `<h4>Límites con polinomio cuadrático:</h4><ul>`;
    for(let p of probs1) {
        htmlPreguntas += `
        <div style="font-size: 1.2em; margin: 10px 20px;">
            ${qNum}. $\\lim_{x \\to ${p.k}} \\frac{${polyToLatex(p.P_poly)}}{${polyToLatex(p.D)}} = \\lim_{x \\to ${p.k}} $ ___________________ = ________________
        </div>`;
        htmlSoluciones += `<li>${qNum}. Simplificado: $${polyToLatex(p.Q)}$. Límite: $${p.ans}$.</li>`;
        qNum++;
    }
    htmlSoluciones += `</ul>`;

    // Sección Tipo 2
    htmlPreguntas += `<p><b>Límites con polinomio cúbico:</b></p>`;
    htmlSoluciones += `<h4>Límites con polinomio cúbico:</h4><ul>`;
    for(let p of probs2) {
        htmlPreguntas += `
        <div style="font-size: 1.2em; margin: 10px 20px;">
            ${qNum}. $\\lim_{x \\to ${p.k}} \\frac{${polyToLatex(p.P_poly)}}{${polyToLatex(p.D)}} = \\lim_{x \\to ${p.k}} $ ___________________ = ________________
        </div>`;
        htmlSoluciones += `<li>${qNum}. Simplificado: $${polyToLatex(p.Q)}$. Límite: $${p.ans}$.</li>`;
        qNum++;
    }
    htmlSoluciones += `</ul>`;

    // Sección Tipo 3
    htmlPreguntas += `<p><b>Factor común y diferencia de cuadrados:</b></p>`;
    htmlSoluciones += `<h4>Factor común y dif. de cuadrados:</h4><ul>`;
    for(let p of probs3) {
        htmlPreguntas += `
        <div style="font-size: 1.2em; margin: 10px 20px;">
            ${qNum}. $\\lim_{x \\to ${p.k}} \\frac{x^2 - ${p.k}x}{x^2 - ${p.k * p.k}} = \\lim_{x \\to ${p.k}} $ ___________________ = ________________
        </div>`;
        htmlSoluciones += `<li>${qNum}. Simplificado: $\\frac{x}{x + ${p.k}}$. Límite: $1/2$.</li>`;
        qNum++;
    }
    htmlSoluciones += `</ul>`;

    // Sección Tipo 4 (Análisis de error)
    htmlPreguntas += `<p><b>Análisis de un error común:</b></p>
        <p style="margin: 5px 20px;">${qNum}. Un estudiante evaluó $\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}$ concluyendo que el resultado es $0$ porque el numerador es $0$.</p>
        <p style="margin: 5px 20px;">Explique brevemente el error y escriba el valor correcto: _________________________________________________</p>
        <p style="margin: 5px 20px;">________________________________________________________________________________________________</p>`;
    htmlSoluciones += `<h4>Análisis de error:</h4><ul><li>${qNum}. $\\frac{0}{0}$ es una forma indeterminada, no significa que el valor sea $0$. El valor real del límite es $4$.</li></ul>`;

    let Pregunta = `
    <div class="problema2" style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="text-align:center;">Ficha de Trabajo: Límites Racionales Factorizables</h2>
        <p><b>Instrucciones:</b> Para cada límite, escriba la expresión equivalente simplificada en la primera línea y el valor final del límite en la segunda línea. Muestre su procedimiento en hojas adicionales.</p>
        <hr>
        ${htmlPreguntas}
    </div>
    <div class="page"></div>
    `;

    // ---------------------------------------------------------
    // SOLUCIONARIO (Oculto en impresión, útil para el profesor)
    // ---------------------------------------------------------
    let Solucion = `
    <div class="ans"><b>Solucionario Sugerido:</b>
        ${htmlSoluciones}
    </div>`;

    return [Pregunta, Solucion];
}

export async function render(container, n, code) {
    // No requiere render interactivo si es solo para impresión.
}
