import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Estadística Descriptiva: Diagramas de Caja';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

// Fuente original: [123].pdf (Ejercicio 12H)
export async function pregunta() {
    // Generar datos aleatorios para un boxplot comparativo
    // Q1, Mediana, Q3, Min, Max
    const q1 = Math.floor(Math.random() * 20) + 20;
    const med = q1 + Math.floor(Math.random() * 20) + 5;
    const q3 = med + Math.floor(Math.random() * 20) + 5;
    const min = q1 - Math.floor(Math.random() * 10) - 5;
    const max = q3 + Math.floor(Math.random() * 10) + 5;

    const q1_2 = q1 + 10;
    const med_2 = med + 15;
    const q3_2 = q3 + 10;
    const min_2 = min + 5;
    const max_2 = max + 15;

    let Pregunta = `<div class="problema2">
    <h3>Análisis de datos: Tiempos de estudio</h3>
    <p>La siguiente gráfica muestra los tiempos (en minutos) que dedican dos grupos de estudiantes a sus tareas semanales.</p>
    <center>
        <tlacuache-cuartil q="[${min}, ${q1}, ${med}, ${q3}, ${max}],[${min_2}, ${q1_2}, ${med_2}, ${q3_2}, ${max_2}]" lim="${Math.min(min, min_2)-5},${Math.max(max, max_2)+5},10" dim="400,200" xlabel='Tiempo (min)' />
    </center>
    
    <ol class="FT_ol_a">
        <li>Complete la tabla de resumen estadístico para ambos grupos: <div>4</div></li>
        <table border="1" style="width:100%; border-collapse: collapse; text-align: center; margin-top: 10px;">
            <tr><th>Estadístico</th><th>Grupo 1</th><th>Grupo 2</th></tr>
            <tr><td>Mínimo</td><td>${CR(0.5)}</td><td>${CR(0.5)}</td></tr>
            <tr><td>$Q_1$</td><td>${CR(0.5)}</td><td>${CR(0.5)}</td></tr>
            <tr><td>Mediana</td><td>${CR(0.5)}</td><td>${CR(0.5)}</td></tr>
            <tr><td>$Q_3$</td><td>${CR(0.5)}</td><td>${CR(0.5)}</td></tr>
            <tr><td>Máximo</td><td>${CR(0.5)}</td><td>${CR(0.5)}</td></tr>
        </table>
        
        <li>Determine el rango y el rango intercuartílico (RIC) para el Grupo 1. <div>3</div></li>${CR(3)}
        
        <li>¿Qué grupo presenta una mayor dispersión en su 50% central? Justifique su respuesta basándose en el diagrama. <div>3</div></li>${CR(3)}
        
        <li>Comente sobre la simetría de los datos del Grupo 2 observando la posición de la mediana dentro de la caja. <div>2</div></li>${CR(3)}
    </ol></div>`;

    let Solucion = `<div class="ans">
    <b>P1:</b> Grupo 1: [${min}, ${q1}, ${med}, ${q3}, ${max}]. Grupo 2: [${min_2}, ${q1_2}, ${med_2}, ${q3_2}, ${max_2}].<br>
    <b>P2:</b> Rango G1 = ${max - min}. RIC G1 = ${q3 - q1}.<br>
    <b>P3:</b> Se compara el RIC del grupo 1 (${q3 - q1}) contra el del grupo 2 (${q3_2 - q1_2}). El mayor RIC indica mayor dispersión central.<br>
    <b>P4:</b> Si la mediana está centrada la distribución es simétrica; si está desplazada, hay sesgo (positivo si está a la izquierda, negativo si a la derecha).
    </div>`;

    return [Pregunta, Solucion];
}