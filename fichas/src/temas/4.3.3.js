import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Diagramas de Caja y Bigotes";
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("4.3.3", "4. Estadística y probabilidad", "Ficha: Diagramas de Caja y Bigotes");

    // EJERCICIO 1
    const n1 = 15;
    let rawData = [];
    for (let k = 0; k < n1; k++) {
        rawData.push(Math.floor(Math.random() * 40) + 5);
    }
    rawData.sort((a, b) => a - b);
    
    const min1 = rawData[0];
    const max1 = rawData[n1 - 1];
    const med1 = rawData[7]; 
    const q1_1 = rawData[3];
    const q3_1 = rawData[11];
    const iqr1 = q3_1 - q1_1;
    const rawDataStr = rawData.join(", ");

    html += `
    <div class="seccion-title">I. Datos Crudos: Tiempos de Espera</div>
    <div class="exercise-step">
        <p><strong>1.</strong> Un consultorio médico registró el tiempo de espera (en minutos) de ${n1} pacientes aleatorios durante una mañana. Los datos obtenidos son:</p>
        <div style="background-color: #f4f4f4; padding: 10px; border-radius: 5px; font-family: monospace; text-align: center; margin-bottom: 15px;">${rawDataStr}</div>
        
        <ol class="FT_ol_a">
            <li>
                Utilizando su calculadora de pantalla gráfica, determine:
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; margin-bottom: 10px;">
                    <div>El primer cuartil ($Q_1$): <tlacuache-renglon n="1" color="#f9f9f9" alto="20"></tlacuache-renglon></div>
                    <div>La mediana: <tlacuache-renglon n="1" color="#f9f9f9" alto="20"></tlacuache-renglon></div>
                    <div>El tercer cuartil ($Q_3$): <tlacuache-renglon n="1" color="#f9f9f9" alto="20"></tlacuache-renglon></div>
                    <div>El rango intercuartil ($RIC$): <tlacuache-renglon n="1" color="#f9f9f9" alto="20"></tlacuache-renglon></div>
                </div>
                <span class="mark">4</span>
            </li>
            <li>
                Determine si existe algún valor atípico (outlier). Muestre su procedimiento. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                En la siguiente cuadrícula, dibuje un diagrama de caja y bigotes preciso para estos datos. Asegúrese de usar una escala adecuada y marcar claramente los valores atípicos si los hubiera. <span class="mark">4</span>
                <div style="display: flex; justify-content: center; margin-top: 15px;">
                </div>
            </li>
                    <tlacuache-milimetrado size="200,720" cuadricula="5,20" n="5" color='RGB(200, 64, 64)' stroke=".7" stroke2=".2" rango="0,50"/>
        </ol>
    </div>
    <div class="page-break"></div>
    `;

    // EJERCICIO 2
    const valores = [10, 11, 12, 13, 14, 15];
    const freqs = [];
    let totalFreq = 0;
    for (let k = 0; k < 6; k++) {
        let f = Math.floor(Math.random() * 8) + 3;
        freqs.push(f);
        totalFreq += f;
    }

    let expandedData = [];
    valores.forEach((val, idx) => {
        for(let k = 0; k < freqs[idx]; k++) expandedData.push(val);
    });
    
    const min2 = expandedData[0];
    const max2 = expandedData[expandedData.length - 1];
    let med2;
    const mid = Math.floor(expandedData.length / 2);
    if (expandedData.length % 2 === 0) med2 = (expandedData[mid-1] + expandedData[mid])/2;
    else med2 = expandedData[mid];
    
    const q1_2 = expandedData[Math.floor(expandedData.length * 0.25)];
    const q3_2 = expandedData[Math.floor(expandedData.length * 0.75)];

    let tableRows = "";
    valores.forEach((val, idx) => {
        tableRows += `
        <tr>
            <td style="border: 1px solid black; padding: 5px; text-align: center;">${val}</td>
            <td style="border: 1px solid black; padding: 5px; text-align: center;">${freqs[idx]}</td>
            <td style="border: 1px solid black; padding: 5px;"></td>
        </tr>`;
    });

    html += `
    <div class="seccion-title">II. Datos Agrupados: Botánica</div>
    <div class="exercise-step">
        <p><strong>2.</strong> Un grupo de estudiantes de biología mide la altura (en cm) de ${totalFreq} plántulas genéticamente modificadas después de 2 semanas. Los resultados se agrupan en la siguiente tabla:</p>
        <div style="display: flex; gap: 30px; margin-bottom: 20px;">
            <div style="flex: 0 0 auto;">
                <table style="border-collapse: collapse; width: 250px;">
                    <thead>
                        <tr style="background-color: #eee;">
                            <th style="border: 1px solid black; padding: 5px;">Altura (cm)</th>
                            <th style="border: 1px solid black; padding: 5px;">Frecuencia</th>
                            <th style="border: 1px solid black; padding: 5px;">Frec. Acum.</th>
                        </tr>
                    </thead>
                    <tbody>${tableRows}</tbody>
                </table>
            </div>
            <div style="flex: 1;">
                <ol class="FT_ol_a">
                    <li>Complete la columna de "Frecuencia Acumulada" en la tabla. <span class="mark">2</span></li>
                    <li>
                        Halle los siguientes estadísticos:
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 5px;">
                            <div>Mediana: <tlacuache-renglon n="1" color="#f9f9f9" alto="20"></tlacuache-renglon></div>
                            <div>Rango Intercuartil: <tlacuache-renglon n="1" color="#f9f9f9" alto="20"></tlacuache-renglon></div>
                        </div>
                        <span class="mark">3</span>
                    </li>
                    <li style="margin-top:10px;">El 75% de las plantas tiene una altura menor o igual a $k$ cm. Halle el valor de $k$. <span class="mark">2</span><tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
                </ol>
            </div>
        </div>
        
        <ol class="FT_ol_a" start="4">
            <li>
                Dibuje el diagrama de caja correspondiente en la cuadrícula inferior (Eje comienza en 9cm). <span class="mark">3</span>
                <div style="display: flex; justify-content: center; margin-top: 15px;">
                </div>
                    <tlacuache-milimetrado size="200,720" cuadricula="5,20" n="5" color='RGB(200, 64, 64)' stroke=".7" stroke2=".2" rango="0,50"/>
            </li>
            <li>Se considera que las plantas con altura superior a 14.5 cm tienen un crecimiento "acelerado". Estime el porcentaje de plantas con crecimiento acelerado basándose en sus datos. <span class="mark">2</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div><div class="page-break"></div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 4.3.3 (Diagramas de Caja y Bigotes):</b><br><br>
        <b>1. Datos Crudos: Tiempos de Espera</b><br>
        * Ordenados: ${rawData.join(", ")}<br>
        * Min: ${min1}, Q1: ${q1_1}, Med: ${med1}, Q3: ${q3_1}, Max: ${max1}<br>
        * IQR: ${iqr1}<br>
        * Outliers: Cualquier valor menor que ${q1_1 - 1.5*iqr1} o mayor que ${q3_1 + 1.5*iqr1}.<br><br>

        <b>2. Datos Agrupados: Botánica</b><br>
        * Total datos: ${totalFreq}<br>
        * Min: ${min2}, Q1: ${q1_2}, Med: ${med2}, Q3: ${q3_2}, Max: ${max2}<br>
        * $k$ (que representa $Q_3$) = ${q3_2}<br>
    </div>
    `;

    return [html, solucion];
}
