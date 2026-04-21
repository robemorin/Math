import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/* 
   Fuente original: [104].pdf
   Subtema: 4.2 - Estadística descriptiva y representación de datos
   Tiempo estimado: 40 minutos
*/

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export function name() {
    return 'Distribuciones de Datos y Análisis de Frecuencias';
}

export async function pregunta() {
    // Generación de datos aleatorios para el problema
    // Simulando calificaciones de 30 estudiantes (Años 6 a 11)
    let datos = [];
    let freq = [0, 0, 0, 0, 0, 0]; // para años 6, 7, 8, 9, 10, 11
    for (let i = 0; i < 30; i++) {
        let val = Math.floor(Math.random() * 6) + 6;
        datos.push(val);
        freq[val - 6]++;
    }

    let Pregunta = `<div class="problema2">
    <h3>Análisis de Distribución de Datos</h3>
    <p>Se ha realizado una encuesta a 30 estudiantes sobre su nivel escolar. Los datos obtenidos son los siguientes:</p>
    <div style="font-family: monospace; background: #f4f4f4; padding: 10px; border: 1px solid #ccc;">
        ${datos.join(', ')}
    </div>
    
    <ol class="FT_ol_a">
        <li>Complete la siguiente tabla de frecuencias y frecuencias relativas (redondee a 3 decimales). <div>4</div></li>
        <table border="1" style="width:100%; text-align:center; margin-top:10px;">
            <tr><th>Año</th><th>Frecuencia</th><th>Frecuencia Relativa</th></tr>
            ${[6,7,8,9,10,11].map(y => `<tr><td>${y}</td><td><br></td><td><br></td></tr>`).join('')}
        </table>${CR(2)}
        
        <li>Construya un gráfico de columnas para representar esta distribución. <div>4</div></li>
        <div style="width: 100%; height: 300px; border: 1px dashed #999; margin: 10px 0;"></div>${CR(2)}
        
        <li>¿Cuál es el año modal de los estudiantes? <div>1</div></li>${CR(1)}
        
        <li>Describe la forma de la distribución (¿Es simétrica, sesgada a la izquierda o a la derecha?). Justifique su respuesta. <div>2</div></li>${CR(3)}
        
        <li>Si un estudiante se encuentra en "Año 9 o superior", ¿qué porcentaje representa del total? <div>2</div></li>${CR(2)}
        
        <li>¿Qué es un valor atípico (outlier) y cómo afectaría visualmente a un gráfico de columnas si apareciera un valor muy alejado del cuerpo principal de datos? <div>2</div></li>${CR(3)}
    </ol>
    </div>`;

    // Lógica para solución
    let total = 30;
    let rel = freq.map(f => (f / total).toFixed(3));
    let modal = 6 + freq.indexOf(Math.max(...freq));
    let فوق9 = ((freq[3] + freq[4] + freq[5]) / total * 100).toFixed(1);

    let Solucion = `<div class="ans"><b>Solucionario:</b>
    <br>1) Frecuencias: Años 6:${freq[0]}, 7:${freq[1]}, 8:${freq[2]}, 9:${freq[3]}, 10:${freq[4]}, 11:${freq[5]}.
    <br>Relativas: ${rel.join(', ')}
    <br>3) Moda: Año ${modal}.
    <br>5) Porcentaje año 9+: ${فوق9}%.
    <br>6) Un outlier es un dato significativamente alejado. Se vería como una barra aislada, distorsionando la percepción de la tendencia central o sesgo.</div>`;

    return [Pregunta, Solucion];
}