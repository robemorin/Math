import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Teorema del Coseno (10 Ejercicios)";
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("3.4.1", "3. Geometría y trigonometría", "Ficha: Teorema del Coseno (10 Ejercicios)");
    html += `<div class="contexto-especial" style="margin-bottom: 20px;"><b>Instrucción:</b> Para cada ejercicio, dibuje el triángulo correspondiente y calcule lo solicitado (3 puntos cada uno).</div>`;

    const problemas = [];
    const respuestasVal = [];
    const letrasTriangulos = [
        { v1: "A", v2: "B", v3: "C", s1: "a", s2: "b", s3: "c" },
        { v1: "P", v2: "Q", v3: "R", s1: "p", s2: "q", s3: "r" },
        { v1: "X", v2: "Y", v3: "Z", s1: "x", s2: "y", s3: "z" },
        { v1: "D", v2: "E", v3: "F", s1: "d", s2: "e", s3: "f" },
        { v1: "H", v2: "J", v3: "K", s1: "h", s2: "j", s3: "k" },
        { v1: "A", v2: "B", v3: "C", s1: "a", s2: "b", s3: "c" },
        { v1: "P", v2: "Q", v3: "R", s1: "p", s2: "q", s3: "r" },
        { v1: "X", v2: "Y", v3: "Z", s1: "x", s2: "y", s3: "z" },
        { v1: "D", v2: "E", v3: "F", s1: "d", s2: "e", s3: "f" },
        { v1: "H", v2: "J", v3: "K", s1: "h", s2: "j", s3: "k" }
    ];

    const unidades = ["cm", "m", "cm", "mm", "m", "cm", "m", "cm", "mm", "m"];

    for (let k = 0; k < 10; k++) {
        const u = unidades[k];
        const lt = letrasTriangulos[k];
        const tipo = k % 2; // 0: SAS, 1: SSS

        const b = Math.floor(Math.random() * 12) + 6;
        const c = Math.floor(Math.random() * 12) + 6;
        const A_deg = Math.floor(Math.random() * 90) + 40;
        const A_rad = A_deg * Math.PI / 180;
        
        const a_exact = Math.sqrt(b*b + c*c - 2*b*c*Math.cos(A_rad));
        const a = parseFloat(a_exact.toFixed(1));

        let pText = '';
        let rText = '';

        if (tipo === 0) {
            pText = `En el triángulo $${lt.v1}${lt.v2}${lt.v3}$, se sabe que el lado $${lt.s2} = ${b}\\text{ ${u}}$, el lado $${lt.s3} = ${c}\\text{ ${u}}$ y el ángulo en el vértice $${lt.v1}$ mide $${A_deg}^\\circ$. Halle la longitud del lado $${lt.s1}$.`;
            rText = `$${lt.s1} = \\sqrt{${b}^2 + ${c}^2 - 2(${b})(${c})\\cos(${A_deg}^\\circ)} = \\mathbf{${a.toFixed(1)}\\text{ ${u}}}$`;
        } else {
            const cosA = (b*b + c*c - a*a) / (2*b*c);
            const A_deg_calc = Math.acos(cosA) * 180 / Math.PI;
            pText = `En el triángulo $${lt.v1}${lt.v2}${lt.v3}$, se conocen las longitudes de sus tres lados: $${lt.s1} = ${a}\\text{ ${u}}$, $${lt.s2} = ${b}\\text{ ${u}}$ y $${lt.s3} = ${c}\\text{ ${u}}$. Halle la medida del ángulo del vértice $${lt.v1}$.`;
            rText = `$\\cos(${lt.v1}) = \\frac{${b}^2 + ${c}^2 - ${a}^2}{2(${b})(${c})} \\implies \\mathbf{${lt.v1} = ${A_deg_calc.toFixed(1)}^\\circ}$`;
        }

        problemas.push(pText);
        respuestasVal.push(rText);
    }

    html += `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">`;
    for (let k = 0; k < 10; k++) {
        if (k === 6) { 
            html += `</div><div class="page-break"></div><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">`;
        }
        html += `
        <div class="exercise-step" style="margin: 0; min-height: 200px; display: flex; flex-direction: column; justify-content: space-between;">
            <div><span style="font-weight: bold;">Ejercicio ${k + 1}.</span> <span style="font-size: 0.95em;">${problemas[k]}</span> <span class="mark">3</span></div>
            <div style="margin-top: 10px;"><tlacuache-renglon n="4" color="#f9f9f9"></tlacuache-renglon></div>
        </div>`;
    }
    html += `</div><div class="page-break"></div>`;

    solucion += `<div style="font-family: sans-serif; font-size: 0.85rem;">`;
    solucion += `<b>Solucionario 3.4.1 (Teorema del Coseno):</b><br><ol>`;
    for (let k = 0; k < 10; k++) {
        solucion += `<li style="margin-bottom: 8px;">${respuestasVal[k]}</li>`;
    }
    solucion += `</ol></div>`;

    return [html, solucion];
}
