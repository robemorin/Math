<ref_base>
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

// Fuente original: [110].pdf

export function name() {
    return 'Estadística Descriptiva y Muestreo';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // --- Problema 1: Muestreo ---
    let poblacion = ["estudiantes de un club de lectura", "empleados de una cafetería", "jugadores de un equipo de fútbol"];
    let contexto = poblacion[Math.floor(Math.random() * poblacion.length)];

    let Pregunta = `<div class="problema2">1.- Un investigador desea estudiar las preferencias de ${contexto} respecto a un nuevo reglamento.
    <ol class="FT_ol_a">
        <li>Explique por qué si el investigador solo pregunta a las personas que asisten a la primera sesión del día, la muestra podría estar sesgada. <div>2</div></li>${CR(2)}
        <li>Sugiera un método de muestreo más adecuado para asegurar que la muestra sea representativa de toda la población. <div>2</div></li>${CR(2)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (a) Sesgo de selección: las personas de la primera sesión pueden tener hábitos o perfiles distintos al resto. (b) Muestreo aleatorio estratificado o simple.</div><br>`;

    // --- Problema 2: Muestreo proporcional ---
    let total = 2000;
    let grupos = ["A", "B", "C", "D"];
    let distribucion = [400, 600, 700, 300];
    let muestra = 400;

    Pregunta += `<div class="problema2">2.- Una empresa tiene ${total} empleados distribuidos en cuatro departamentos: ${grupos[0]} (${distribucion[0]}), ${grupos[1]} (${distribucion[1]}), ${grupos[2]} (${distribucion[2]}) y ${grupos[3]} (${distribucion[3]}). Se desea seleccionar una muestra estratificada de ${muestra} empleados.
    <ol class="FT_ol_a">
        <li>Calcule cuántos empleados deben seleccionarse de cada departamento. <div>3</div></li>${CR(2)}
    </ol></div>`;

    let calculos = distribucion.map(d => Math.round((d / total) * muestra));
    Solucion += `<div class="ans"><b>P2:</b> ${calculos.join(', ')} empleados respectivamente.</div><br>`;

    // --- Problema 3: Histogramas ---
    // Generación de datos simulados para histograma
    let freqs = [3, 8, 12, 6, 2];
    let inicio = 10;
    let ancho = 5;

    Pregunta += `<div class="problema2">3.- Se han medido los tiempos de espera (en minutos) de ${freqs.reduce((a,b)=>a+b)} clientes:
    <br><br>
    <center>
    <tlacuache-ejes size="300,300" xlabel="Tiempo (min)" ylabel="Frecuencia" xlim="10,35" dx="5" ylim="0,15" dy="3">
        <tlacuache-histograma inicio="${inicio}" paso="${ancho}" frecuencias="${freqs.join(',')}"></tlacuache-histograma>
    </tlacuache-ejes>
    </center>
    <ol class="FT_ol_a">
        <li>Identifique el intervalo modal. <div>1</div></li>${CR(1)}
        <li>Calcule el porcentaje de clientes que esperaron menos de ${inicio + 2*ancho} minutos. <div>2</div></li>${CR(1)}
    </ol></div><div class="page"></div>`;

    let sumMenor = freqs[0] + freqs[1];
    let totalC = freqs.reduce((a,b)=>a+b);
    Solucion += `<div class="ans"><b>P3:</b> (a) ${inicio + 2*ancho} - ${inicio + 3*ancho} min. (b) ${(sumMenor/totalC*100).toFixed(1)}%</div>`;

    return [Pregunta, Solucion];
}
</ref_base>