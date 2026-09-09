import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Teorema del Seno";
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("3.4.2", "3. Geometría y trigonometría", "Ficha: Teorema del Seno");
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
        const tipo = k % 2; // 0: Hallar lado, 1: Hallar ángulo

        let pText = '';
        let rText = '';

        if (tipo === 0) {
            const A_deg = Math.floor(Math.random() * 50) + 35; // 35 a 84
            const B_deg = Math.floor(Math.random() * 50) + 35; // 35 a 84
            const b = Math.floor(Math.random() * 12) + 6;      // 6 a 17

            const A_rad = A_deg * Math.PI / 180;
            const B_rad = B_deg * Math.PI / 180;
            const a_exact = b * Math.sin(A_rad) / Math.sin(B_rad);
            const a = parseFloat(a_exact.toFixed(1));

            pText = `En el triángulo $${lt.v1}${lt.v2}${lt.v3}$, se sabe que el ángulo en $${lt.v1}$ mide $${A_deg}^\\circ$, el ángulo en $${lt.v2}$ mide $${B_deg}^\\circ$ y el lado $${lt.s2} = ${b}\\text{ ${u}}$. Halle la longitud del lado $${lt.s1}$.`;
            rText = `$${lt.s1} = \\frac{${b} \\cdot \\sin(${A_deg}^\\circ)}{\\sin(${B_deg}^\\circ)} = \\mathbf{${a.toFixed(1)}\\text{ ${u}}}$`;
        } else {
            const A_deg = Math.floor(Math.random() * 30) + 30; // 30 a 59 (A menor que B)
            const B_deg = Math.floor(Math.random() * 30) + 65; // 65 a 94 (B mayor que A)
            const b = Math.floor(Math.random() * 12) + 8;      // 8 a 19

            const A_rad = A_deg * Math.PI / 180;
            const B_rad = B_deg * Math.PI / 180;
            
            const a_exact = b * Math.sin(A_rad) / Math.sin(B_rad);
            const a = parseFloat(a_exact.toFixed(1));

            const sinA = (a * Math.sin(B_rad)) / b;
            const A_calc_deg = Math.asin(sinA) * 180 / Math.PI;

            pText = `En el triángulo $${lt.v1}${lt.v2}${lt.v3}$, se sabe que el lado $${lt.s1} = ${a}\\text{ ${u}}$, el lado $${lt.s2} = ${b}\\text{ ${u}}$ y el ángulo en $${lt.v2}$ mide $${B_deg}^\\circ$. Halle la medida del ángulo en el vértice $${lt.v1}$.`;
            rText = `$\\sin(${lt.v1}) = \\frac{${a} \\cdot \\sin(${B_deg}^\\circ)}{${b}} \\implies \\mathbf{${lt.v1} = ${A_calc_deg.toFixed(1)}^\\circ}$`;
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
    solucion += `<b>Solucionario 3.4.2 (Teorema del Seno):</b><br><ol>`;
    for (let k = 0; k < 10; k++) {
        solucion += `<li style="margin-bottom: 8px;">${respuestasVal[k]}</li>`;
    }
    solucion += `</ol></div>`;

    return [html, solucion];
}
