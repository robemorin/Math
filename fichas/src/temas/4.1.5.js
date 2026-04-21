import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/* 
 * Fuente original: [103].pdf
 * Módulo: Estadística y probabilidad - Recolección de datos y muestreo
 */

export function name() {
    return 'Tipos de variables y recolección de datos';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    const variables = [
        { desc: "El número de estudiantes en cada clase de una escuela.", tipo: "Cuantitativa discreta" },
        { desc: "La marca de teléfono celular que utilizan los empleados de una empresa.", tipo: "Categórica" },
        { desc: "La estatura de un grupo de atletas (en metros).", tipo: "Cuantitativa continua" },
        { desc: "El tiempo (en segundos) que tarda un atleta en completar 100 metros.", tipo: "Cuantitativa continua" },
        { desc: "El color de ojos de un grupo de estudiantes.", tipo: "Categórica" },
        { desc: "La cantidad de granos de arena en un puñado.", tipo: "Cuantitativa discreta" }
    ];

    // Selección aleatoria de 4 problemas
    let selected = variables.sort(() => 0.5 - Math.random()).slice(0, 4);

    let Pregunta = `<div class="problema2"><h3>Ejercicios de clasificación de variables</h3>
    <p>Para cada una de las siguientes variables, identifique si es <b>categórica</b>, <b>cuantitativa discreta</b> o <b>cuantitativa continua</b>.</p>
    <ol class="FT_ol_a">`;

    let Solucion = `<div class="ans"><b>Soluciones:</b><br>`;

    selected.forEach((item, index) => {
        Pregunta += `<li>${item.desc} <div>2</div></li>${CR(2)}`;
        Solucion += `${index + 1}. ${item.tipo}<br>`;
    });

    Pregunta += `</ol></div><div class="page"></div>`;

    Pregunta += `<div class="problema2"><h3>Análisis de tipos de datos</h3>
    <p>5.- Usted está realizando una encuesta sobre el uso de transporte público en su ciudad. Escriba un ejemplo de:</p>
    <ol class="FT_ol_a">
        <li>Una variable <b>categórica</b> que podría preguntar a los usuarios: <div>2</div></li>${CR(3)}
        <li>Una variable <b>cuantitativa discreta</b> que podría preguntar a los usuarios: <div>2</div></li>${CR(3)}
        <li>Una variable <b>cuantitativa continua</b> que podría preguntar a los usuarios: <div>2</div></li>${CR(3)}
    </ol></div>`;

    Solucion += `<br><b>P5 (Ejemplos sugeridos):</b><br>
    5a. Medio de transporte favorito (Bus, Tren, Metro).<br>
    5b. Número de veces que usa el bus a la semana.<br>
    5c. Tiempo promedio de espera en la parada (en minutos).</div>`;

    return [Pregunta, Solucion];
}