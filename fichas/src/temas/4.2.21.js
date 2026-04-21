// Source: [125].pdf
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'; // Para tlacuache-renglon

export function name() {
    return 'Estadística Descriptiva: Gráficos de Frecuencia Acumulada';
}

function AnswerSpace(marks) {
    // Proporciona espacio para escribir, asumiendo 2 líneas por cada punto de la pregunta
    let num_lines = marks * 2;
    if (num_lines < 2) num_lines = 2; // Asegura al menos 2 líneas para cualquier respuesta
    return `<tlacuache-renglon n="${num_lines}" color="lightgray" alto="20"/>`;
}

export async function pregunta() {
    // --- Problema de Análisis de Puntuaciones de Examen ---
    // Generación de datos
    let N_total = Math.floor(Math.random() * 50) + 100; // Número total de estudiantes: 100-149
    const num_classes = 10;
    const class_width = 10;
    const lower_bound_start = 0; // Puntuaciones de 0 a 100

    let score_intervals = []; // Array de strings como "0 <= x < 10"
    let frequencies = [];
    let cumulative_frequencies_table = []; // Para la tabla
    let cumulative_frequencies_graph_y = [0]; // Punto de inicio (0,0) para el gráfico
    let x_coords_graph = [lower_bound_start]; // Coordenadas X para el gráfico de Tlacuache (límites superiores)

    let current_cumulative_freq = 0;

    // Distribución de estudiantes: comienza con una base, luego añade aleatoriedad
    let base_freq = Math.floor(N_total / num_classes);
    let remainder = N_total % num_classes;
    let temp_freqs = Array(num_classes).fill(base_freq);

    for (let i = 0; i < remainder; i++) {
        temp_freqs[i]++; // Distribuye el resto
    }

    // Ajusta la distribución para añadir más variabilidad, asegurando que ninguna frecuencia sea cero
    for (let i = 0; i < num_classes; i++) {
        let adjustment = Math.floor(Math.random() * 5) - 2; // -2, -1, 0, 1, o 2
        temp_freqs[i] = Math.max(1, temp_freqs[i] + adjustment); // Asegura que la frecuencia sea >= 1
    }

    // Re-ajusta la suma total si los ajustes aleatorios la desviaron de N_total
    let current_sum_freqs = temp_freqs.reduce((a, b) => a + b, 0);
    while (current_sum_freqs !== N_total) {
        let diff = N_total - current_sum_freqs;
        let idx = Math.floor(Math.random() * num_classes);
        if (diff > 0) { // Necesita añadir
            temp_freqs[idx]++;
        } else { // Necesita restar
            if (temp_freqs[idx] > 1) { // Solo resta si es > 1 para mantenerlo positivo
                temp_freqs[idx]--;
            }
        }
        current_sum_freqs = temp_freqs.reduce((a, b) => a + b, 0);
    }
    frequencies = temp_freqs;

    // Construye las frecuencias acumuladas para la tabla y el gráfico
    for (let i = 0; i < num_classes; i++) {
        let lower = lower_bound_start + i * class_width;
        let upper = lower_bound_start + (i + 1) * class_width;
        score_intervals.push(`${lower} \\le x < ${upper}`);
        
        current_cumulative_freq += frequencies[i];
        cumulative_frequencies_table.push(current_cumulative_freq);
        cumulative_frequencies_graph_y.push(current_cumulative_freq);
        x_coords_graph.push(upper);
    }

    // --- Funciones auxiliares para interpolación lineal ---
    function interpolate_score_from_cf(cf_value, x_coords, y_coords) {
        if (cf_value <= y_coords[0]) return x_coords[0];
        if (cf_value >= y_coords[y_coords.length - 1]) return x_coords[x_coords.length - 1];

        for (let i = 0; i < y_coords.length - 1; i++) {
            if (cf_value >= y_coords[i] && cf_value < y_coords[i + 1]) {
                const x0 = x_coords[i];
                const y0 = y_coords[i];
                const x1 = x_coords[i + 1];
                const y1 = y_coords[i + 1];

                if (y1 - y0 === 0) return x0; // Si la CF no cambia, devuelve el límite inferior de la puntuación para esa CF
                return x0 + (cf_value - y0) * (x1 - x0) / (y1 - y0);
            }
        }
        return x_coords[x_coords.length - 1]; // No debería ser alcanzado
    }

    function interpolate_cf_from_score(score, x_coords, y_coords) {
        if (score <= x_coords[0]) return y_coords[0];
        if (score >= x_coords[x_coords.length - 1]) return y_coords[y_coords.length - 1];

        for (let i = 0; i < x_coords.length - 1; i++) {
            if (score >= x_coords[i] && score < x_coords[i + 1]) {
                const x0 = x_coords[i];
                const y0 = y_coords[i];
                const x1 = x_coords[i + 1];
                const y1 = y_coords[i + 1];

                if (x1 - x0 === 0) return y0; // No debería ocurrir con un ancho de clase constante y > 0
                return y0 + (score - x0) * (y1 - y0) / (x1 - x0);
            }
        }
        return y_coords[y_coords.length - 1]; // No debería ser alcanzado
    }

    // --- Cálculos para las soluciones ---
    const median_freq = N_total / 2;
    const median_score = interpolate_score_from_cf(median_freq, x_coords_graph, cumulative_frequencies_graph_y);

    const q1_freq = N_total / 4;
    const q1_score = interpolate_score_from_cf(q1_freq, x_coords_graph, cumulative_frequencies_graph_y);

    const q3_freq = 3 * N_total / 4;
    const q3_score = interpolate_score_from_cf(q3_freq, x_coords_graph, cumulative_frequencies_graph_y);

    const iqr = q3_score - q1_score;

    // Valores parametrizados para preguntas específicas
    const q_score_limit_a = Math.floor(Math.random() * 20) + 35; // Rango: 35-54
    const students_less_than_qa = Math.round(interpolate_cf_from_score(q_score_limit_a, x_coords_graph, cumulative_frequencies_graph_y));

    let q_score_range_lower = Math.floor(Math.random() * 20) + 40; // Rango: 40-59
    let q_score_range_upper = q_score_range_lower + Math.floor(Math.random() * 20) + 10; // Rango: +10 a +29 de la inferior.
    if (q_score_range_upper > 90) q_score_range_upper = 90; // Límite superior para evitar >= 100 para un intervalo abierto

    const cf_lower_range = interpolate_cf_from_score(q_score_range_lower, x_coords_graph, cumulative_frequencies_graph_y);
    const cf_upper_range = interpolate_cf_from_score(q_score_range_upper, x_coords_graph, cumulative_frequencies_graph_y);
    const students_in_range = Math.round(cf_upper_range - cf_lower_range);

    const pass_mark = Math.floor(Math.random() * 10) + 40; // Rango: 40-49
    const students_failed = Math.round(interpolate_cf_from_score(pass_mark, x_coords_graph, cumulative_frequencies_graph_y));

    const credit_percentage = (Math.floor(Math.random() * 8) + 12); // Rango: 12-19%
    const cf_for_credit = N_total * (100 - credit_percentage) / 100; // Esto representa el percentil (100-credit_percentage)
    const credit_mark = interpolate_score_from_cf(cf_for_credit, x_coords_graph, cumulative_frequencies_graph_y);

    const percentile_value = (Math.floor(Math.random() * 20) + 70); // Rango: percentil 70-89
    const cf_for_percentile = N_total * percentile_value / 100;
    const score_at_percentile = interpolate_score_from_cf(cf_for_percentile, x_coords_graph, cumulative_frequencies_graph_y);

    // Parámetros del gráfico de Tlacuache
    const max_y_axis_graph = Math.ceil(N_total / 25) * 25; // Asegura que el máximo del eje Y sea un múltiplo de 25
    const dy_val_graph = max_y_axis_graph / 5; // Ticks principales del eje Y
    const dpy_val_graph = dy_val_graph / 5; // Ticks secundarios del eje Y

    let Pregunta = `<div class="problema2">
        <p>Un instructor de matemáticas ha evaluado las puntuaciones de un examen final para un grupo de estudiantes. La tabla de distribución de frecuencias y el gráfico de frecuencias acumuladas se muestran a continuación.</p>

        <h3>Tabla de Frecuencia y Frecuencia Acumulada de Puntuaciones de Examen</h3>
        <table class="FT_table_border" style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="border: 1px solid black; padding: 8px;">Puntuación (x)</th>
                    <th style="border: 1px solid black; padding: 8px;">Frecuencia (f)</th>
                    <th style="border: 1px solid black; padding: 8px;">Frecuencia Acumulada (CF)</th>
                </tr>
            </thead>
            <tbody>
                ${score_intervals.map((interval, i) => `
                    <tr>
                        <td style="border: 1px solid black; padding: 8px; text-align: center;">$${interval}$</td>
                        <td style="border: 1px solid black; padding: 8px; text-align: center;">${frequencies[i]}</td>
                        <td style="border: 1px solid black; padding: 8px; text-align: center;">${cumulative_frequencies_table[i]}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <br>
        <center>
            <tlacuache-ejes size="350,550" xlabel="Puntuación del examen" ylabel="Frecuencia Acumulada" xlim="0,100" dx="10" dpx="2" ylim="0,${max_y_axis_graph}" dy="${dy_val_graph}" dpy="${dpy_val_graph}">
                <tlacuache-poli_fa x="${x_coords_graph.join(',')}" y="${cumulative_frequencies_graph_y.join(',')}"></tlacuache-poli_fa>
            </tlacuache-ejes>
            <p><b>Figura 1:</b> Gráfico de Frecuencia Acumulada de Puntuaciones de Examen</p>
        </center>
        <br>
        <p>Utilice la tabla y el gráfico de frecuencias acumuladas para responder las siguientes preguntas:</p>
        <ol class="FT_ol_a">
            <li>Determine el número total de estudiantes en el grupo. <div>1</div></li>${AnswerSpace(1)}
            <li>Estime la puntuación mediana del examen. <div>2</div></li>${AnswerSpace(2)}
            <li>Estime el rango intercuartílico (IQR) de las puntuaciones del examen. <div>3</div></li>${AnswerSpace(3)}
            <li>¿Cuántos estudiantes obtuvieron ${q_score_limit_a} puntos o menos? <div>2</div></li>${AnswerSpace(2)}
            <li>¿Cuántos estudiantes obtuvieron al menos ${q_score_range_lower} puntos pero menos de ${q_score_range_upper} puntos? <div>3</div></li>${AnswerSpace(3)}
            <li>Si la calificación mínima para aprobar fue de ${pass_mark} puntos, ¿cuántos estudiantes no aprobaron el examen? <div>3</div></li>${AnswerSpace(3)}
            <li>El profesor decidió otorgar una mención de honor al ${credit_percentage}\\% superior de los estudiantes. Estime la puntuación mínima requerida para recibir una mención de honor. <div>3</div></li>${AnswerSpace(3)}
            <li>Estime la puntuación del examen que corresponde al percentil ${percentile_value}. <div>2</div></li>${AnswerSpace(2)}
        </ol>
    </div>`;

    let Solucion = `<div class="ans">
        <b>Puntuaciones del examen:</b><br>
        <ol class="FT_ol_a">
            <li>El número total de estudiantes es ${N_total}.</li>
            <li>La puntuación mediana (Q2) se encuentra en la frecuencia acumulada de ${median_freq}. Se estima que es ${median_score.toFixed(1)} puntos.</li>
            <li>El primer cuartil (Q1) se encuentra en ${q1_freq.toFixed(0)} de CF, con una puntuación aproximada de ${q1_score.toFixed(1)} puntos.<br>
                El tercer cuartil (Q3) se encuentra en ${q3_freq.toFixed(0)} de CF, con una puntuación aproximada de ${q3_score.toFixed(1)} puntos.<br>
                El rango intercuartílico (IQR) = Q3 - Q1 = ${q3_score.toFixed(1)} - ${q1_score.toFixed(1)} = ${iqr.toFixed(1)} puntos.</li>
            <li>Número de estudiantes con ${q_score_limit_a} puntos o menos: ${students_less_than_qa}.</li>
            <li>Número de estudiantes con al menos ${q_score_range_lower} pero menos de ${q_score_range_upper} puntos: ${students_in_range}.</li>
            <li>Estudiantes que no aprobaron (puntuación menor a ${pass_mark} puntos): ${students_failed}.</li>
            <li>El ${credit_percentage}\\% superior de ${N_total} estudiantes es aproximadamente ${Math.round(N_total * credit_percentage / 100)}. Esto corresponde a la frecuencia acumulada de ${cf_for_credit.toFixed(0)} estudiantes. La puntuación mínima requerida es aproximadamente ${credit_mark.toFixed(1)} puntos.</li>
            <li>La puntuación del examen que corresponde al percentil ${percentile_value} se encuentra en una frecuencia acumulada de ${cf_for_percentile.toFixed(0)}. Esto es aproximadamente ${score_at_percentile.toFixed(1)} puntos.</li>
        </ol>
    </div>`;

    return [Pregunta, Solucion];
}