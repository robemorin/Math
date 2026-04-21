import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Estadística: Representación de Datos';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Generación de datos simulados para longitud de langostas (referencia PDF [107].pdf)
    const data = [4.9, 5.6, 7.2, 6.7, 3.1, 4.6, 6.0, 5.0, 3.7, 7.3, 6.0, 5.4, 4.2, 6.6, 4.7, 5.8, 4.4, 3.6, 4.2, 5.4];
    
    // Preparación para tabla de frecuencias
    // Intervalos: [3, 4), [4, 5), [5, 6), [6, 7), [7, 8)
    const freqs = [3, 7, 5, 3, 2]; // Conteo basado en los datos proporcionados
    
    let Pregunta = `<div class="problema2">
    <h3>Ejercicio: Análisis de longitud de especímenes</h3>
    <p>Se ha seleccionado una muestra de 20 langostas juveniles de un tanque de cría para medir su longitud (en cm). Los resultados obtenidos son los siguientes:</p>
    <p style="font-family: monospace; background: #f0f0f0; padding: 10px;">${data.join(', ')}</p>
    
    <ol class="FT_ol_a">
        <li>Organice los datos en una tabla de frecuencias utilizando intervalos de clase de ancho 1 cm (ej. $3 \\le L < 4$): <div>4</div></li>
        ${CR(5)}
        
        <li>Construya un histograma de frecuencias para los datos obtenidos: <div>4</div></li>
        <center>
            <tlacuache-ejes size="400,300" xlabel="Longitud (cm)" ylabel="Frecuencia" xlim="2,9" dx="1" ylim="0,10" dy="1">
                <tlacuache-histograma inicio="3" paso="1" frecuencias="${freqs.join(',')}"></tlacuache-histograma>
            </tlacuache-ejes>
        </center>
        ${CR(2)}
        
        <li>Identifique la <b>clase modal</b> e indique qué representa en este contexto: <div>2</div></li>
        ${CR(2)}
        
        <li>Describa la distribución de los datos (simetría, sesgo, valores atípicos): <div>2</div></li>
        ${CR(2)}
    </ol>
    </div>`;

    let Solucion = `<div class="ans"><b>Solución:</b><br>
    (1) Tabla de frecuencias:<br>
    3-4: 3 | 4-5: 7 | 5-6: 5 | 6-7: 3 | 7-8: 2<br>
    (3) Clase modal: 4 $\\le L < 5$. Representa el rango de longitud más frecuente en la muestra.<br>
    (4) La distribución presenta un ligero sesgo positivo (hacia la derecha).
    </div>`;

    return [Pregunta, Solucion];
}