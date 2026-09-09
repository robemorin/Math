import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Series y Sucesiones aritméticas";
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    // ======================================================
    // EJERCICIO 1: NOTACIÓN SIGMA (3 INCISOS)
    // ======================================================
    const sigmas = [];
    for (let k = 0; k < 3; k++) {
        const n = Math.floor(Math.random() * 3) + 4;
        const tipo = k;
        let expr = "", val = 0;
        const a = Math.floor(Math.random() * 4) + 2;
        const b = Math.floor(Math.random() * 4) + 1;

        if (tipo === 0) {
            expr = `${a}k + ${b}`;
            for (let j = 1; j <= n; j++) val += (a * j + b);
        } else if (tipo === 1) {
            expr = `k^2 + ${b}`;
            for (let j = 1; j <= n; j++) val += (j * j + b);
        } else {
            expr = `${a} \\cdot 2^{k-1}`;
            for (let j = 1; j <= n; j++) val += (a * Math.pow(2, j - 1));
        }
        sigmas.push({ n, expr, val });
    }

    html += ai.getHeader("1.2.16", "1. Número y álgebra", "Ficha: Series y Sucesiones aritméticas");
    
    html += `
    <div class="seccion-title">I. Notación Sigma</div>
    <div class="exercise-step">
        Calcule el valor de las siguientes sumas:
        <ol class="FT_ol_a">
            <li>$\\sum_{k=1}^{${sigmas[0].n}} (${sigmas[0].expr})$ <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
            <li>$\\sum_{k=1}^{${sigmas[1].n}} (${sigmas[1].expr})$ <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
            <li>$\\sum_{k=1}^{${sigmas[2].n}} (${sigmas[2].expr})$ <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 1.2.1.2:</b><br>
        <b>I.</b> 1a. ${sigmas[0].val} | 1b. ${sigmas[1].val} | 1c. ${sigmas[2].val}<br>
    `;

    // ======================================================
    // EJERCICIO 2: TÉRMINO GENERAL (3 INCISOS ARITMÉTICOS)
    // ======================================================
    const seqs2 = [];
    for (let k = 0; k < 3; k++) {
        const u1 = Math.floor(Math.random() * 20) + 5;
        let d = Math.floor(Math.random() * 10) - 5;
        if (d === 0) d = 3;
        const terms = [];
        for (let j = 0; j < 4; j++) terms.push(u1 + j * d);
        const c = u1 - d;
        const sign = c >= 0 ? "+" : "";
        const formula = `u_n = ${d}n ${sign} ${c}`;
        seqs2.push({ terms, formula });
    }

    html += `
    <div class="seccion-title">II. Término General</div>
    <div class="exercise-step">
        Considere las siguientes sucesiones aritméticas y obtenga el término general $u_n$:
        <ol class="FT_ol_a">
            <li>$${seqs2[0].terms.join(", \\; ")}, \\; ...$ <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
            <li>$${seqs2[1].terms.join(", \\; ")}, \\; ...$ <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
            <li>$${seqs2[2].terms.join(", \\; ")}, \\; ...$ <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    `;

    solucion += `<b>II.</b> 2a. $${seqs2[0].formula}$ | 2b. $${seqs2[1].formula}$ | 2c. $${seqs2[2].formula}$<br>`;

    // ======================================================
    // EJERCICIO 3: TÉRMINO ESPECÍFICO (3 INCISOS)
    // ======================================================
    const seqs3 = [];
    for (let k = 0; k < 3; k++) {
        const u1 = Math.floor(Math.random() * 50) + 10;
        let d = Math.floor(Math.random() * 8) + 2; 
        if (Math.random() > 0.5) d = -d;

        const terms = [];
        for (let j = 0; j < 4; j++) terms.push(u1 + j * d);

        const targetN = (k + 1) * 20 + Math.floor(Math.random() * 5); 
        const result = u1 + (targetN - 1) * d;

        seqs3.push({ terms, targetN, result });
    }

    html += `
    <div class="seccion-title">III. Término Específico</div>
    <div class="exercise-step">
        Para las siguientes sucesiones aritméticas, calcule el término indicado:
        <ol class="FT_ol_a">
            <li>$${seqs3[0].terms.join(", \\; ")}, \\; ...$ Halle $u_{${seqs3[0].targetN}}$. <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
            <li>$${seqs3[1].terms.join(", \\; ")}, \\; ...$ Halle $u_{${seqs3[1].targetN}}$. <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
            <li>$${seqs3[2].terms.join(", \\; ")}, \\; ...$ Halle $u_{${seqs3[2].targetN}}$. <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `<b>III.</b> 3a. $u_{${seqs3[0].targetN}} = ${seqs3[0].result}$ | 3b. $u_{${seqs3[1].targetN}} = ${seqs3[1].result}$ | 3c. $u_{${seqs3[2].targetN}} = ${seqs3[2].result}$<br>`;

    // ======================================================
    // EJERCICIO 4: SUMA PARCIAL Sn (3 INCISOS)
    // ======================================================
    const seqs4 = [];
    for (let k = 0; k < 3; k++) {
        const u1 = Math.floor(Math.random() * 20) + 1;
        let d = Math.floor(Math.random() * 5) + 2;

        const terms = [];
        for (let j = 0; j < 4; j++) terms.push(u1 + j * d);

        const targetN = (k + 1) * 10 + 10; 
        const sum = (targetN / 2) * (2 * u1 + (targetN - 1) * d);

        seqs4.push({ terms, targetN, sum });
    }

    html += `
    <div class="seccion-title">IV. Suma Parcial $S_n$</div>
    <div class="exercise-step">
        Calcule la suma de los primeros $n$ términos ($S_n$) para las siguientes sucesiones:
        <ol class="FT_ol_a">
            <li>$${seqs4[0].terms.join(", \\; ")}, \\; ...$ Halle $S_{${seqs4[0].targetN}}$. <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
            <li>$${seqs4[1].terms.join(", \\; ")}, \\; ...$ Halle $S_{${seqs4[1].targetN}}$. <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
            <li>$${seqs4[2].terms.join(", \\; ")}, \\; ...$ Halle $S_{${seqs4[2].targetN}}$. <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    `;

    solucion += `<b>IV.</b> 4a. $S_{${seqs4[0].targetN}} = ${seqs4[0].sum}$ | 4b. $S_{${seqs4[1].targetN}} = ${seqs4[1].sum}$ | 4c. $S_{${seqs4[2].targetN}} = ${seqs4[2].sum}$<br>`;

    // ======================================================
    // EJERCICIO 5: RAZONAMIENTO (LATAS)
    // ======================================================
    const latasTope = Math.floor(Math.random() * 5) + 3;
    const diferencia = Math.floor(Math.random() * 3) + 1;
    const u10 = latasTope + (10 - 1) * diferencia;
    const s10 = (10 / 2) * (2 * latasTope + (10 - 1) * diferencia);

    html += `
    <div class="seccion-title">V. Aplicación: Pirámide de Latas</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            En un supermercado, se apilan latas de sopa formando una pirámide triangular. La fila superior (fila 1) tiene ${latasTope} latas. Cada fila subsiguiente tiene ${diferencia} latas más que la fila anterior.
        </div>
        <ol class="FT_ol_a">
            <li>Escriba una expresión para el número de latas en la fila $n$. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule el número de latas en la fila 10. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule el número <strong>total</strong> de latas si la pila tiene 10 filas. <span class="mark">3</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    `;

    solucion += `<b>V.</b> 5a. $u_n = ${diferencia}n + ${latasTope - diferencia}$ | 5b. $u_{10} = ${u10}$ | 5c. $S_{10} = ${s10}$<br>`;

    // ======================================================
    // EJERCICIO 6: RAZONAMIENTO (SALARIO)
    // ======================================================
    const salarioBase = (Math.floor(Math.random() * 5) + 15) * 1000;
    const aumento = (Math.floor(Math.random() * 5) + 5) * 100;
    const u10_sal = salarioBase + (10 - 1) * aumento;
    const s10_sal = (10 / 2) * (2 * salarioBase + (10 - 1) * aumento);

    html += `
    <div class="seccion-title">VI. Aplicación: Salario</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            Un empleado comienza a trabajar con un salario anual de $${salarioBase.toLocaleString('en-US')}. Cada año recibe un aumento fijo de \\$${aumento.toLocaleString('en-US')}.
        </div>
        <ol class="FT_ol_a">
            <li>Escriba una expresión para el salario en el año $n$. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule el salario en el año 10. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule el monto <strong>total</strong> ganado después de 10 años. <span class="mark">3</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    `;

    solucion += `<b>VI.</b> 6a. $u_n = ${aumento}n + ${salarioBase - aumento}$ | 6b. $u_{10} = \\$${u10_sal.toLocaleString('en-US')}$ | 6c. $S_{10} = \\$${s10_sal.toLocaleString('en-US')}$</div>`;

    html += `\n    <div class="page-break"></div>\n`;

    return [html, solucion];
}
