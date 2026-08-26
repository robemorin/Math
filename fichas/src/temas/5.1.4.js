import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Módulo de práctica: Derivada por definición.
 * Ficha generada a partir de los temas 10.5.1, 10.5.2, 10.5.3 y 10.5.4.
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

// Función auxiliar para convertir array a LaTeX con una variable específica (ej. 'x' o 'h')
function polyToLatexVar(c, variable='x') {
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
        
        if (power === 1) term += variable;
        else if (power > 1) term += `${variable}^{${power}}`;
        
        str += term;
    }
    return str === "" ? "0" : str;
}

// Algoritmo iterativo de Horner para expandir/desplazar P(x) a P(x+a)
function shiftPolynomial(coefs, a) {
    let res = [...coefs];
    let n = res.length;
    for (let i = 0; i < n; i++) {
        for (let j = 1; j < n - i; j++) {
            res[j] = res[j] + a * res[j - 1];
        }
    }
    return res;
}

export function name() {
  return "Ficha: Derivada por Definición";
}

export function tipo() {
  return 1; // Abierta / Imprimible
}

export async function pregunta(np, code) {
    // ---------------------------------------------------------
    // GENERACIÓN DE PROBLEMAS
    // ---------------------------------------------------------
    
    let problemas = [];
    
    // Generar 5 ejercicios: 3 cuadráticos y 2 cúbicos
    for(let i = 0; i < 5; i++) {
        let degree = i < 3 ? 2 : 3;
        let Q = [];
        if (degree === 2) {
            Q = [
                Math.floor(Math.random() * 5) + 1, // x^2
                Math.floor(Math.random() * 9) - 4, // x
                Math.floor(Math.random() * 9) - 4  // c
            ];
            if (Math.random() > 0.5) Q[0] = -Q[0];
        } else {
            Q = [
                Math.floor(Math.random() * 3) + 1, // x^3
                Math.floor(Math.random() * 7) - 3, // x^2
                Math.floor(Math.random() * 7) - 3, // x
                Math.floor(Math.random() * 7) - 3  // c
            ];
            if (Math.random() > 0.5) Q[0] = -Q[0];
        }
        
        let a = Math.floor(Math.random() * 7) - 3; 
        
        let shifted = shiftPolynomial(Q, a);
        let simplified = [...shifted];
        let fa = shifted[shifted.length - 1];
        simplified[simplified.length - 1] = 0; 
        
        let f_prima_a = simplified[simplified.length - 2];
        
        problemas.push({ Q, a, fa, shifted, simplified, f_prima_a, degree });
    }

    // ---------------------------------------------------------
    // CONSTRUCCIÓN DEL HTML
    // ---------------------------------------------------------
    let htmlPreguntas = "";
    let htmlSoluciones = "";
    
    htmlSoluciones += `<ul>`;
    for(let i = 0; i < 5; i++) {
        let p = problemas[i];
        let a_str = p.a < 0 ? `(${p.a})` : `${p.a}`;
        let a_mas_h = p.a < 0 ? `${p.a}+h` : `${p.a}+h`;
        
        if (i === 0) htmlPreguntas += `<p><b>Polinomios Cuadráticos:</b></p>`;
        if (i === 3) htmlPreguntas += `<p><b>Polinomios Cúbicos:</b></p>`;
        
        htmlPreguntas += `
        <div style="margin: 10px 20px;">
            <b>${i + 1}.</b> $f(x) = ${polyToLatexVar(p.Q, 'x')}$, en $a = ${p.a}$.<br>
            <div style="font-size: 1.1em; margin-top: 5px;">
                a) Límite inicial: $\\lim_{h \\to 0}$ _________________________ <br>
                b) Numerador simplificado: _________________________ <br>
                c) Valor $f'(${p.a}) = $ _________
            </div>
        </div><br>`;
        
        if (i === 1) {
            htmlPreguntas += `<div class="page"></div>`;
        }
        
        let exprInicial = `\\frac{f(${a_mas_h}) - (${p.fa})}{h}`;
        htmlSoluciones += `<li>${i + 1}. Inicial: $${exprInicial}$. Simplificado: $${polyToLatexVar(p.simplified, 'h')}$. $f'(${p.a}) = ${p.f_prima_a}$.</li>`;
    }
    htmlSoluciones += `</ul>`;

    let Pregunta = `
    <div class="problema2" style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="text-align:center;">Ficha de Trabajo: Derivada por Definición</h2>
        <p><b>Instrucciones:</b> Para cada función y punto dado, escriba:</p>
        <ul style="margin-top: 0;">
            <li>a) La expresión inicial del límite sin desarrollar.</li>
            <li>b) El numerador desarrollado y simplificado (después de cancelar $f(a)$).</li>
            <li>c) El valor final de la derivada.</li>
        </ul>
        <p>Realice todo el desarrollo algebraico en hojas adicionales.</p>
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
