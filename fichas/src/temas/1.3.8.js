import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Sucesiones Geométricas";
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    // ======================================================
    // EJERCICIO 1: NOTACIÓN SIGMA (GEOMÉTRICA)
    // ======================================================
    const sigmas = [];
    for (let k = 0; k < 3; k++) {
        const n = Math.floor(Math.random() * 3) + 4; // 4, 5, 6
        let a = Math.floor(Math.random() * 5) + 2;
        let r = Math.floor(Math.random() * 2) + 2; // 2 or 3
        if (k === 2) r = 0.5; // One fractional case

        let expr = "";
        let val = 0;

        if (r === 0.5) {
            a = Math.pow(2, n + 1); // Ensure integers mostly
            expr = `${a} \\cdot (0.5)^{k-1}`;
        } else {
            expr = `${a} \\cdot ${r}^{k-1}`;
        }

        for (let j = 1; j <= n; j++) {
            val += a * Math.pow(r, j - 1);
        }

        if (!Number.isInteger(val)) val = val.toFixed(4).replace(/\.?0+$/, "");

        sigmas.push({ n, expr, val });
    }

    html += ai.getHeader("1.3.8", "1. Número y álgebra", "Ficha: Sucesiones Geométricas");

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
        <b>Solucionario 1.3.8:</b><br>
        <b>I.</b> 1a. ${sigmas[0].val} | 1b. ${sigmas[1].val} | 1c. ${sigmas[2].val}<br>
    `;

    // ======================================================
    // EJERCICIO 2: TÉRMINO GENERAL (GEOMÉTRICO)
    // ======================================================
    const seqs2 = [];
    for (let k = 0; k < 3; k++) {
        let u1 = Math.floor(Math.random() * 10) + 2;
        let r = Math.floor(Math.random() * 3) + 2; 
        if (k === 2) { 
            u1 = 1000;
            r = 0.5;
        }

        const terms = [];
        for (let j = 0; j < 4; j++) terms.push(u1 * Math.pow(r, j));

        const formula = `u_n = ${u1} \\cdot (${r})^{n-1}`;
        seqs2.push({ terms, formula });
    }

    html += `
    <div class="seccion-title">II. Término General</div>
    <div class="exercise-step">
        Considere las siguientes sucesiones geométricas y obtenga el término general $u_n$:
        <ol class="FT_ol_a">
            <li>$${seqs2[0].terms.join(", \\; ")}, \\; ...$ <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
            <li>$${seqs2[1].terms.join(", \\; ")}, \\; ...$ <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
            <li>$${seqs2[2].terms.join(", \\; ")}, \\; ...$ <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    `;

    solucion += `<b>II.</b> 2a. $${seqs2[0].formula}$ | 2b. $${seqs2[1].formula}$ | 2c. $${seqs2[2].formula}$<br>`;

    // ======================================================
    // EJERCICIO 3: TÉRMINO ESPECÍFICO (GEOMÉTRICO)
    // ======================================================
    const seqs3 = [];
    for (let k = 0; k < 3; k++) {
        let u1 = Math.floor(Math.random() * 5) + 1;
        let r = Math.floor(Math.random() * 2) + 2; 

        const terms = [];
        for (let j = 0; j < 3; j++) terms.push(u1 * Math.pow(r, j));

        const targetN = Math.floor(Math.random() * 4) + 7; 
        const result = u1 * Math.pow(r, targetN - 1);

        seqs3.push({ terms, targetN, result });
    }

    html += `
    <div class="seccion-title">III. Término Específico</div>
    <div class="exercise-step">
        Para las siguientes sucesiones geométricas, calcule el término indicado:
        <ol class="FT_ol_a">
            <li>$${seqs3[0].terms.join(", \\; ")}, \\; ...$ Halle $u_{${seqs3[0].targetN}}$. <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
            <li>$${seqs3[1].terms.join(", \\; ")}, \\; ...$ Halle $u_{${seqs3[1].targetN}}$. <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
            <li>$${seqs3[2].terms.join(", \\; ")}, \\; ...$ Halle $u_{${seqs3[2].targetN}}$. <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `<b>III.</b> 3a. $u_{${seqs3[0].targetN}} = ${seqs3[0].result.toLocaleString('en-US')}$ | 3b. $u_{${seqs3[1].targetN}} = ${seqs3[1].result.toLocaleString('en-US')}$ | 3c. $u_{${seqs3[2].targetN}} = ${seqs3[2].result.toLocaleString('en-US')}$<br>`;

    // ======================================================
    // EJERCICIO 4: SUMA PARCIAL Sn (GEOMÉTRICA)
    // ======================================================
    const seqs4 = [];
    for (let k = 0; k < 3; k++) {
        let u1 = Math.floor(Math.random() * 5) + 1;
        let r = Math.floor(Math.random() * 2) + 2;

        const terms = [];
        for (let j = 0; j < 3; j++) terms.push(u1 * Math.pow(r, j));

        const targetN = Math.floor(Math.random() * 3) + 6; 
        const sum = u1 * (Math.pow(r, targetN) - 1) / (r - 1);

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

    solucion += `<b>IV.</b> 4a. $S_{${seqs4[0].targetN}} = ${seqs4[0].sum.toLocaleString('en-US')}$ | 4b. $S_{${seqs4[1].targetN}} = ${seqs4[1].sum.toLocaleString('en-US')}$ | 4c. $S_{${seqs4[2].targetN}} = ${seqs4[2].sum.toLocaleString('en-US')}$<br>`;

    // ======================================================
    // EJERCICIO 5: RAZONAMIENTO (CRECIMIENTO POBLACIONAL)
    // ======================================================
    const pobInicial = (Math.floor(Math.random() * 5) + 1) * 100;
    const tasaCrecimiento = Math.floor(Math.random() * 20) + 10; 
    const r_pob = 1 + tasaCrecimiento / 100;

    const u6_pob = Math.round(pobInicial * Math.pow(r_pob, 5)); 

    html += `
    <div class="seccion-title">V. Aplicación: Crecimiento Poblacional</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            Una colonia comienza con ${pobInicial} bacterias. La población aumenta un ${tasaCrecimiento}% cada hora.
        </div>
        <ol class="FT_ol_a">
            <li>Escriba una expresión para la población en la hora $n$ (donde $n=1$ es el inicio). <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule la población después de 5 horas (en $n=6$). <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>¿En qué hora la población superará los ${pobInicial * 10} individuos? <span class="mark">3</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    `;

    const n_supera = Math.ceil(1 / Math.log10(r_pob) + 1);

    solucion += `<b>V.</b> 5a. $u_n = ${pobInicial} \\cdot (${r_pob})^{n-1}$ | 5b. $u_6 \\approx ${u6_pob}$ bacterias | 5c. En la hora $n = ${n_supera}$<br>`;

    // ======================================================
    // EJERCICIO 6: RAZONAMIENTO (DEPRECIACIÓN)
    // ======================================================
    const valorAuto = (Math.floor(Math.random() * 10) + 20) * 1000; 
    const tasaDep = Math.floor(Math.random() * 10) + 5; 
    const r_dep = 1 - tasaDep / 100;
    const u5_dep = valorAuto * Math.pow(r_dep, 4); 

    html += `
    <div class="seccion-title">VI. Aplicación: Depreciación</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            Un automóvil nuevo cuesta $${valorAuto.toLocaleString('en-US')}. Se deprecia a una tasa del ${tasaDep}% anual.
        </div>
        <ol class="FT_ol_a">
            <li>Escriba una fórmula para el valor del auto en el año $n$. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule el valor del auto en el año 5. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule la pérdida total de valor después de 10 años. <span class="mark">3</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    `;

    const val10 = valorAuto * Math.pow(r_dep, 9); 
    const perdida = valorAuto - val10;

    solucion += `<b>VI.</b> 6a. $u_n = ${valorAuto} \\cdot (${r_dep.toFixed(2)})^{n-1}$ | 6b. $u_5 \\approx \\$${u5_dep.toLocaleString('en-US', { maximumFractionDigits: 2 })}$ | 6c. Pérdida $\\approx \\$${perdida.toLocaleString('en-US', { maximumFractionDigits: 2 })}$</div>`;

    html += `\n    <div class="page-break"></div>\n`;

    return [html, solucion];
}
