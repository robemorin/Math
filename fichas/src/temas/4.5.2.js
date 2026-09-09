import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Correlación de Rangos de Spearman";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("4.5.2", "4. Estadística y probabilidad", "Ficha: Correlación de Rangos de Spearman");

    // ==========================================
    // EJERCICIO 1 (CUARTILLA 1): ELECCIÓN DE COEFICIENTE (PEARSON VS SPEARMAN)
    // ==========================================
    const tipoCaso = Math.random() > 0.5 ? 0 : 1;
    let descripcion = "";
    let justificacion = "";

    if (tipoCaso === 0) {
        descripcion = "Un investigador analiza la relación entre dos variables. Al graficar los datos en un diagrama de dispersión, observa una tendencia lineal clara en la mayoría de las observaciones; sin embargo, se identifican dos valores atípicos (outliers) extremos muy distantes del conjunto principal.";
        justificacion = "El coeficiente de correlación de rangos de Spearman ($r_s$) es más adecuado porque se basa en el orden de los rangos y es mucho menos sensible a valores atípicos que el coeficiente de Pearson ($r$), el cual se distorsiona severamente con datos extremos.";
    } else {
        descripcion = "Un biólogo estudia el crecimiento poblacional de un cultivo bacteriano en función de la temperatura. El diagrama de dispersión muestra una relación estrictamente monótona creciente pero marcadamente curvilínea (no lineal).";
        justificacion = "El coeficiente de correlación de rangos de Spearman ($r_s$) es más apropiado porque evalúa cualquier relación monótona (creciente o decreciente) sin exigir linealidad, mientras que Pearson solo mide relaciones estrictamente lineales.";
    }

    html += `
    <div class="seccion-title">I. Análisis Conceptual: Selección del Coeficiente de Correlación</div>
    <div class="exercise-step">
        <p><strong>1.</strong> Considere la siguiente situación experimental:</p>
        <div class="contexto-especial">
            ${descripcion}
        </div>
        <ol class="FT_ol_a">
            <li>
                Indique razonadamente cuál coeficiente de correlación (Pearson o Spearman) es el más adecuado para analizar la fuerza de la asociación entre estas dos variables. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Explique con detalle dos diferencias teóricas fundamentales entre el coeficiente de Pearson ($r$) y el coeficiente de Spearman ($r_s$). <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>
    `;

    // ==========================================
    // EJERCICIO 2 (CUARTILLA 2): CÁLCULO MANUAL Y DE TABLA DE SPEARMAN
    // ==========================================
    const n = Math.floor(Math.random() * 2) + 6; // 6 o 7 participantes
    const items = ["A", "B", "C", "D", "E", "F", "G"].slice(0, n);

    const ranks1 = Array.from({ length: n }, (_, k) => k + 1);
    const ranks2 = Array.from({ length: n }, (_, k) => k + 1);

    for (let k = n - 1; k > 0; k--) {
        const j = Math.floor(Math.random() * (k + 1));
        [ranks2[k], ranks2[j]] = [ranks2[j], ranks2[k]];
    }

    const d = [];
    const d2 = [];
    let sumD2 = 0;

    for (let k = 0; k < n; k++) {
        const diff = ranks1[k] - ranks2[k];
        d.push(diff);
        d2.push(diff * diff);
        sumD2 += diff * diff;
    }

    const rs = 1 - (6 * sumD2) / (n * (n * n - 1));

    let tableRows = "";
    for (let k = 0; k < n; k++) {
        tableRows += `
        <tr>
            <td style="border: 1px solid #ccc; padding: 6px; text-align: center; font-weight: bold;">${items[k]}</td>
            <td style="border: 1px solid #ccc; padding: 6px; text-align: center;">${ranks1[k]}</td>
            <td style="border: 1px solid #ccc; padding: 6px; text-align: center;">${ranks2[k]}</td>
            <td style="border: 1px solid #ccc; padding: 6px; text-align: center;"></td>
            <td style="border: 1px solid #ccc; padding: 6px; text-align: center;"></td>
        </tr>`;
    }

    html += `
    <div class="seccion-title">II. Cálculo Formal del Coeficiente de Rangos de Spearman ($r_s$)</div>
    <div class="exercise-step">
        <p><strong>2.</strong> Dos jueces calificaron a ${n} concursantes otorgando los siguientes órdenes de mérito (rangos):</p>
        <div style="display: flex; justify-content: center; margin: 15px 0;">
            <table style="border-collapse: collapse; border: 1px solid #999; font-size: 0.9em; min-width: 420px;">
                <thead>
                    <tr style="background-color: #f2f2f2;">
                        <th style="border: 1px solid #ccc; padding: 6px;">Candidato</th>
                        <th style="border: 1px solid #ccc; padding: 6px;">Rango Juez 1 ($R_x$)</th>
                        <th style="border: 1px solid #ccc; padding: 6px;">Rango Juez 2 ($R_y$)</th>
                        <th style="border: 1px solid #ccc; padding: 6px;">$d = R_x - R_y$</th>
                        <th style="border: 1px solid #ccc; padding: 6px;">$d^2$</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </div>

        <ol class="FT_ol_a">
            <li>
                Complete la tabla calculando las diferencias $d$ y sus cuadrados $d^2$, y determine el valor de la sumatoria $\\sum d^2$. <span class="mark">3</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Utilice la fórmula $r_s = 1 - \\frac{6\\sum d^2}{n(n^2 - 1)}$ para calcular el coeficiente de correlación de Spearman exacto. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Interprete el acuerdo entre ambos jueces de acuerdo con el valor numérico obtenido para $r_s$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 4.5.2 (Correlación de Rangos de Spearman):</b><br><br>

        <b>1. Selección de Coeficiente:</b><br>
        * a) Coeficiente más adecuado: <b>Spearman ($r_s$)</b>.<br>
        * b) Justificación: ${justificacion}<br><br>

        <b>2. Cálculo de $r_s$:</b><br>
        * a) Diferencias $d$: [${d.join(', ')}]. Cuadrados $d^2$: [${d2.join(', ')}].<br>
        &nbsp;&nbsp;Sumatoria $\\sum d^2 = ${sumD2}$.<br>
        * b) Para $n = ${n}$:<br>
        &nbsp;&nbsp;$r_s = 1 - \\frac{6(${sumD2})}{${n}(${n * n - 1})} = 1 - \\frac{${6 * sumD2}}{${n * (n * n - 1)}} = 1 - ${( (6 * sumD2) / (n * (n * n - 1)) ).toFixed(4)} =$ <b>${rs.toFixed(3)}</b>.<br>
        * c) Interpretación: Existe una concordancia/acuerdo <b>${Math.abs(rs) >= 0.7 ? "fuerte" : (Math.abs(rs) >= 0.4 ? "moderada" : "débil")}</b> y <b>${rs >= 0 ? "positiva" : "negativa"}</b> entre el criterio de ambos evaluadores.
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
