import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Estadísticas Sumarias en Datos Bivariados";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("4.4.20", "4. Estadística y probabilidad", "Ficha: Estadísticas Sumarias en Datos Bivariados");

    // ==========================================
    // EJERCICIO 1 (CUARTILLA 1): DATOS CRUDOS Y ESTADÍSTICOS
    // ==========================================
    const n1 = Math.floor(Math.random() * 3) + 8; // 8 a 10
    const x1 = [];
    const y1 = [];

    for (let j = 0; j < n1; j++) {
        const valX = Math.floor(Math.random() * 20) + 1;
        const valY = Math.floor(valX * (0.6 + Math.random() * 0.8) + Math.random() * 8 + 2);
        x1.push(valX);
        y1.push(valY);
    }

    const sumX1 = x1.reduce((a, b) => a + b, 0);
    const sumY1 = y1.reduce((a, b) => a + b, 0);
    const meanX1 = sumX1 / n1;
    const meanY1 = sumY1 / n1;

    const sumSqDiffX1 = x1.reduce((a, b) => a + Math.pow(b - meanX1, 2), 0);
    const sumSqDiffY1 = y1.reduce((a, b) => a + Math.pow(b - meanY1, 2), 0);

    const sx1 = Math.sqrt(sumSqDiffX1 / (n1 - 1));
    const sy1 = Math.sqrt(sumSqDiffY1 / (n1 - 1));

    const sumX2_1 = x1.reduce((a, b) => a + b * b, 0);
    const sumY2_1 = y1.reduce((a, b) => a + b * b, 0);
    const sumXY_1 = x1.reduce((a, b, idx) => a + b * y1[idx], 0);

    const tableCols = x1.map((val, idx) => `
        <td style="border: 1px solid #ccc; padding: 6px; text-align: center;">${val}</td>
    `).join('');
    const tableColsY = y1.map((val) => `
        <td style="border: 1px solid #ccc; padding: 6px; text-align: center;">${val}</td>
    `).join('');

    html += `
    <div class="seccion-title">I. Cálculo de Estadísticos Sumarios a partir de Datos Crudos</div>
    <div class="exercise-step">
        <p><strong>1.</strong> Se ha registrado el desempeño de ${n1} participantes en dos pruebas continuas ($x$ e $y$):</p>
        <div style="display: flex; justify-content: center; margin: 15px 0; overflow-x: auto;">
            <table style="border-collapse: collapse; border: 1px solid #999; font-size: 0.9em;">
                <tr style="background-color: #f2f2f2;">
                    <th style="border: 1px solid #ccc; padding: 6px 10px;">$x$</th>
                    ${tableCols}
                </tr>
                <tr>
                    <th style="border: 1px solid #ccc; padding: 6px 10px; background-color: #f2f2f2;">$y$</th>
                    ${tableColsY}
                </tr>
            </table>
        </div>

        <p>Utilizando su calculadora de pantalla gráfica (CPG), determine:</p>
        <ol class="FT_ol_a">
            <li>
                Las medias aritméticas $\\bar{x}$ y $\\bar{y}$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Las desviaciones estándar muestrales $s_x$ y $s_y$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Las sumas fundamentales: $\\sum x$, $\\sum y$, $\\sum x^2$, $\\sum y^2$ y $\\sum xy$. <span class="mark">2</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
        ${ai.getTiTip("Ingrese los pares en <code>[STAT] -> 1:Edit...</code> en L1 y L2, luego ejecute <code>[STAT] -> CALC -> 2:2-Var Stats</code>.")}
    </div>

    <div class="page-break"></div>
    `;

    // ==========================================
    // EJERCICIO 2 (CUARTILLA 2): ESTADÍSTICOS DADOS, PEARSON Y REGRESIÓN
    // ==========================================
    const n2 = 12;
    const meanX2 = Math.floor(Math.random() * 15) + 12;
    const meanY2 = Math.floor(Math.random() * 30) + 40;
    const sx2 = Math.random() * 2.5 + 2.5; 
    const sy2 = Math.random() * 6 + 7; 
    const r2 = parseFloat(((Math.random() * 0.2 + 0.75) * (Math.random() > 0.5 ? 1 : -1)).toFixed(3));

    const m2 = r2 * (sy2 / sx2);
    const c2 = meanY2 - m2 * meanX2;

    const sumX_2 = (meanX2 * n2).toFixed(1);
    const sumY_2 = (meanY2 * n2).toFixed(1);
    const sumXY_2 = (r2 * (n2 - 1) * sx2 * sy2 + n2 * meanX2 * meanY2).toFixed(1);

    const xPred2 = Math.round(meanX2 + 1.2 * sx2);
    const yPred2 = (m2 * xPred2 + c2).toFixed(2);

    html += `
    <div class="seccion-title">II. Correlación de Pearson y Línea de Regresión de $y$ sobre $x$</div>
    <div class="exercise-step">
        <p><strong>2.</strong> En una investigación de mercado con $n = ${n2}$ productos bivariados $(x, y)$, se obtuvieron los siguientes estadísticos sumarios:</p>

        <div style="display: flex; justify-content: space-around; background: #fafafa; padding: 12px; border: 1px solid #ddd; border-radius: 5px; margin: 15px 0;">
            <div>
                $\\bar{x} = ${meanX2.toFixed(2)}$<br>
                $\\bar{y} = ${meanY2.toFixed(2)}$
            </div>
            <div>
                $s_x = ${sx2.toFixed(3)}$<br>
                $s_y = ${sy2.toFixed(3)}$
            </div>
            <div>
                $\\sum xy = ${sumXY_2}$<br>
                $r = ${r2}$
            </div>
        </div>

        <ol class="FT_ol_a">
            <li>
                Interprete el significado del coeficiente de correlación momento-producto de Pearson ($r = ${r2}$) en cuanto a la fuerza y sentido de la relación lineal. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Halle la ecuación de la recta de regresión de $y$ sobre $x$, escribiéndola en la forma $y = mx + c$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Estime el valor de $y$ cuando $x = ${xPred2}$ y comente razonadamente sobre la fiabilidad de dicha estimación considerando si se trata de una interpolación o extrapolación. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 4.4.20 (Estadísticas Sumarias en Datos Bivariados):</b><br><br>

        <b>1. Datos Crudos:</b><br>
        * a) Medias: $\\bar{x} = ${meanX1.toFixed(2)}$, $\\bar{y} = ${meanY1.toFixed(2)}$.<br>
        * b) Desviaciones muestrales: $s_x = ${sx1.toFixed(3)}$, $s_y = ${sy1.toFixed(3)}$.<br>
        * c) Sumas: $\\sum x = ${sumX1}$, $\\sum y = ${sumY1}$, $\\sum x^2 = ${sumX2_1}$, $\\sum y^2 = ${sumY2_1}$, $\\sum xy = ${sumXY_1}$.<br><br>

        <b>2. Estadísticos Sumarios y Regresión:</b><br>
        * a) Interpretación de $r = ${r2}$: Correlación lineal <b>${Math.abs(r2) >= 0.8 ? "fuerte" : "moderada"}</b> y <b>${r2 > 0 ? "positiva" : "negativa"}</b>.<br>
        * b) Pendiente: $m = r\\frac{s_y}{s_x} = (${r2})\\left(\\frac{${sy2.toFixed(3)}}{${sx2.toFixed(3)}}\\right) = ${m2.toFixed(3)}$.<br>
        &nbsp;&nbsp;Ordenada al origen: $c = \\bar{y} - m\\bar{x} = ${meanY2.toFixed(2)} - (${m2.toFixed(3)})(${meanX2.toFixed(2)}) = ${c2.toFixed(2)}$.<br>
        &nbsp;&nbsp;Ecuación: $y = ${m2.toFixed(3)}x ${c2 >= 0 ? '+' : ''}${c2.toFixed(2)}$.<br>
        * c) Estimación para $x = ${xPred2}$: $y = ${m2.toFixed(3)}(${xPred2}) ${c2 >= 0 ? '+' : ''}${c2.toFixed(2)} \\approx $ <b>${yPred2}</b>.<br>
        &nbsp;&nbsp;Fiabilidad: Es ${xPred2 <= meanX2 + 2*sx2 ? "fiable al tratarse de una interpolación cercana a la media con un coeficiente |r| significativo" : "menos fiable por acercarse a los extremos de la muestra (posible extrapolación)"}.
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
