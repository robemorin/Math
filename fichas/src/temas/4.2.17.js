import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Estadística Descriptiva: Medidas de Posición';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

// Fuente original: [121].pdf
export async function pregunta() {
    // Generación de datos aleatorios para el problema (Conjunto A)
    let datosA = [3, 4, 5, 5, 6, 6, 6, 7, 7, 8, 8, 9, 10]; 
    // Ordenar y calcular estadísticos
    const getQuartiles = (arr) => {
        const sorted = [...arr].sort((a, b) => a - b);
        const q1 = sorted[Math.floor(sorted.length * 0.25)];
        const median = sorted[Math.floor(sorted.length * 0.5)];
        const q3 = sorted[Math.floor(sorted.length * 0.75)];
        return [sorted[0], q1, median, q3, sorted[sorted.length - 1]];
    };
    let qA = getQuartiles(datosA);

    let Pregunta = `<div class="problema2">
    <h3>Práctica: Resumen estadístico y Diagramas de caja</h3>
    <p><b>1. Análisis de conjuntos de datos:</b> Considere el conjunto de datos $A = \{${datosA.join(', ')}\}$.</p>
    <ol class="FT_ol_a">
        <li>Construya el resumen de cinco números (mínimo, $Q_1$, mediana, $Q_3$, máximo). <div>2</div></li>${CR(2)}
        <li>Dibuje el diagrama de caja correspondiente. <div>2</div></li>${CR(6)}
        <li>Halle el rango y el rango intercuartílico (RIC). <div>2</div></li>${CR(2)}
    </ol>
    </div>`;

    // Problema 2: Contexto (Enfocado en conteo/frecuencia)
    let n_beans = 20;
    let beans = Array.from({length: n_beans}, () => Math.floor(Math.random() * 10) + 1);
    beans.sort((a,b) => a-b);
    let qB = getQuartiles(beans);

    Pregunta += `<div class="problema2">
    <p><b>2. Contexto: Conteo de elementos.</b> Un estudiante cuenta el número de semillas en ${n_beans} vainas: $${beans.join(', ')}$.</p>
    <ol class="FT_ol_a">
        <li>Determine el rango y la mediana de estos datos. <div>2</div></li>${CR(2)}
        <li>Calcule el RIC (rango intercuartílico). <div>2</div></li>${CR(2)}
        <li>Utilizando el criterio de los límites ($Q_1 - 1.5 \\times RIC$ y $Q_3 + 1.5 \\times RIC$), identifique si existen valores atípicos (outliers). <div>3</div></li>${CR(3)}
    </ol>
    </div><div class="page"></div>`;

    // Problema 3: Tabla de frecuencias
    let vals = [33, 34, 35, 36, 37, 38, 39, 40];
    let freqs = [1, 5, 7, 13, 12, 8, 0, 1];
    
    Pregunta += `<div class="problema2">
    <p><b>3. Datos tabulados:</b> Se ha registrado la cantidad de tornillos en cajas:</p>
    <table border="1" style="width:100%; text-align:center;">
        <tr><td>Número de tornillos</td><td>${vals.join('</td><td>')}</td></tr>
        <tr><td>Frecuencia</td><td>${freqs.join('</td><td>')}</td></tr>
    </table>
    <ol class="FT_ol_a">
        <li>Calcule el primer cuartil ($Q_1$) y el tercer cuartil ($Q_3$). <div>3</div></li>${CR(3)}
        <li>Dibuje un diagrama de caja para estos datos utilizando una escala adecuada. <div>3</div></li>${CR(8)}
    </ol>
    </div>`;

    let Solucion = `<div class="ans"><b>Soluciones Sugeridas:</b><br>
    P1: Resumen: [${qA.join(', ')}]. Rango: ${qA[4]-qA[0]}. RIC: ${qA[3]-qA[1]}.<br>
    P2: Mediana: ${qB[2]}. RIC: ${qB[3]-qB[1]}. Outliers calculados según fórmula de límites.<br>
    P3: $Q_1$ corresponde al valor acumulado en el 25% de la frecuencia total, $Q_3$ al 75%.</div>`;

    return [Pregunta, Solucion];
}