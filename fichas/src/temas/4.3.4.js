import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Detección de Valores Atípicos (Outliers)";
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("4.3.4", "4. Estadística y probabilidad", "Ficha: Detección de Valores Atípicos (Outliers)");

    const n1 = 14;
    let datos = [];
    const base = Math.floor(Math.random() * 20) + 40;

    for (let k = 0; k < n1 - 2; k++) {
        datos.push(base + Math.floor(Math.random() * 15) - 7);
    }
    const outlierSup = base + 25 + Math.floor(Math.random() * 10);
    datos.push(outlierSup);
    if (Math.random() > 0.5) {
        datos.push(base - 20 - Math.floor(Math.random() * 5));
    } else {
        datos.push(base + Math.floor(Math.random() * 5));
    }

    datos.sort((a, b) => a - b);

    const mid = Math.floor(datos.length / 2);
    const lowerHalf = datos.slice(0, mid);
    const upperHalf = datos.length % 2 === 0 ? datos.slice(mid) : datos.slice(mid + 1);

    const getMedian = (arr) => {
        const m = Math.floor(arr.length / 2);
        return arr.length % 2 === 0 ? (arr[m - 1] + arr[m]) / 2 : arr[m];
    };

    const q1 = getMedian(lowerHalf);
    const q3 = getMedian(upperHalf);
    const iqr = q3 - q1;
    const limSup = q3 + 1.5 * iqr;
    const limInf = q1 - 1.5 * iqr;

    const outliers = datos.filter(d => d < limInf || d > limSup);
    const datosStr = datos.join(", ");

    html += `
    <div class="seccion-title">I. Control de Calidad: Valores Atípicos</div>
    <div class="exercise-step">
        <p><strong>1.</strong> Se mide el peso en gramos de una muestra de ${datos.length} componentes electrónicos. Los resultados ordenados son:</p>
        <div style="background-color: #f0f0f0; padding: 12px; border-radius: 4px; font-family: monospace; text-align: center; margin-bottom: 20px; font-size: 1.1em;">
            ${datosStr}
        </div>
        <div class="contexto-especial" style="margin-bottom: 10px;">
            <strong>Nota:</strong> Se considera que un valor es atípico (outlier) si es menor que $Q_1 - 1.5 \\times RIC$ o mayor que $Q_3 + 1.5 \\times RIC$.
        </div>
        <ol class="FT_ol_a">
            <li>
                Calcule los siguientes estadísticos para estos datos:
                <table width="100%" style="margin-top:10px; margin-bottom:10px;">
                    <tr>
                        <td>$Q_1$: <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></td>
                        <td>$Q_3$: <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></td>
                        <td>$RIC$: <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></td>
                    </tr>
                </table>
                <span class="mark">3</span>
            </li>
            <li>
                Determine los límites (fronteras) para los valores atípicos. <span class="mark">4</span>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 10px;">
                    <div>Límite Inferior: <tlacuache-renglon n="1" color="#f9f9f9" alto="25" style="display:block; width:100%;"></tlacuache-renglon></div>
                    <div>Límite Superior: <tlacuache-renglon n="1" color="#f9f9f9" alto="25" style="display:block; width:100%;"></tlacuache-renglon></div>
                </div>
            </li>
            <li style="margin-top:15px;">
                Enumere los valores atípicos encontrados en la muestra, si los hay. <span class="mark">2</span>
                <tlacuache-renglon n="1" color="#f9f9f9" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    <div class="page-break"></div>
    `;

    const outlier2 = 5;
    const q1_new = 30;
    const q3_new = 45;
    const med_new = 38;
    const max_new = 60;
    const iqr_new = q3_new - q1_new;
    const limInf_new = q1_new - 1.5 * iqr_new;

    html += `
    <div class="seccion-title">II. Rendimiento Académico</div>
    <div class="exercise-step">
        <p><strong>2.</strong> Las calificaciones (sobre 60 puntos) de un examen parcial se resumen así:</p>
        <ul style="display: flex; list-style: none; gap: 20px; padding: 0; justify-content: center; background: #fafafa; padding: 10px; border: 1px solid #ddd;">
            <li><strong>Mín:</strong> ${outlier2}</li>
            <li><strong>$Q_1$:</strong> ${q1_new}</li>
            <li><strong>Mediana:</strong> ${med_new}</li>
            <li><strong>$Q_3$:</strong> ${q3_new}</li>
            <li><strong>Máx:</strong> ${max_new}</li>
        </ul>
        <ol class="FT_ol_a" style="margin-top: 20px;">
            <li>
                Justifique matemáticamente si la calificación mínima (${outlier2}) es un valor atípico. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>
            </li>
            <li>
                Sabiendo que la siguiente calificación más baja después de ${outlier2} es ${limInf_new}, dibuje un diagrama de caja y bigotes preciso en la cuadrícula. Indique claramente cualquier valor atípico. <span class="mark">5</span>
                <div style="display: flex; justify-content: center; margin-top: 15px;">
                    <tlacuache-milimetrado size="200,720" cuadricula="5,20" n="7" color='RGB(200, 64, 64)' stroke=".7" stroke2=".2" rango="0,70"/>
                </div>
            </li>
            <li>
                Explique por qué la mediana suele ser una medida de tendencia central más robusta que la media en presencia de valores atípicos. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9" alto="25" style="display:block; width:100%; margin-top:5px;"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 4.3.4 (Detección de Valores Atípicos):</b><br><br>
        <b>1. Control de Calidad</b><br>
        * $Q_1$: ${q1}, $Q_3$: ${q3}, $RIC$: ${iqr}<br>
        * Límites: [${limInf}, ${limSup}]<br>
        * Outliers encontrados en los datos: ${outliers.length > 0 ? outliers.join(", ") : "Ninguno"}<br><br>

        <b>2. Rendimiento Académico</b><br>
        * $RIC$ = ${iqr_new}<br>
        * Límite Inf = $Q_1 - 1.5(RIC) = ${q1_new} - 1.5(${iqr_new}) = ${limInf_new}$<br>
        * Justificación: Como el valor mínimo (${outlier2}) es menor estricto que el límite inferior (${limInf_new}), matemáticamente se clasifica como valor atípico.<br>
        * En el diagrama, el bigote izquierdo debe detenerse en ${limInf_new} (el siguiente valor no atípico), y el ${outlier2} debe marcarse con un asterisco o punto aislado.<br>
        * Robustez de la mediana: La media suma todos los valores, por lo que un valor atípico extremo sesga el promedio fuertemente hacia él. La mediana solo depende de la posición central, siendo inalterada por cuán extremos sean los valores en las colas.
    </div>
    `;

    return [html, solucion];
}
