import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Estadística descriptiva: Cuartiles y Rango';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

// Fuente original: [119].pdf (Ejercicios sobre cuartiles, mediana y rango)
export async function pregunta() {
    // Generador de datos aleatorios para el problema
    const generarDatos = () => {
        let datos = [];
        for(let i=0; i<10; i++) datos.push(Math.floor(Math.random() * 50) + 5);
        return datos.sort((a,b) => a - b);
    };

    let datos = generarDatos();
    
    // Cálculos para la solución
    const mediana = (datos[4] + datos[5]) / 2;
    const lowerHalf = datos.slice(0, 5);
    const upperHalf = datos.slice(5, 10);
    const Q1 = lowerHalf[2];
    const Q3 = upperHalf[2];
    const IQR = Q3 - Q1;
    const range = datos[9] - datos[0];

    let Pregunta = `<div class="problema">
    <h3>Práctica: Análisis de Datos Estadísticos</h3>
    <p>Considere el siguiente conjunto de datos: <b>${datos.join(', ')}</b>.</p>
    <p>Realice las siguientes actividades en el espacio provisto:</p>
    <ol class="FT_ol_a">
        <li>Ordene el conjunto de datos de menor a mayor y halle la mediana. <div>2</div></li>${CR(2)}
        <li>Identifique los cuartiles $Q_1$ y $Q_3$. <div>2</div></li>${CR(2)}
        <li>Calcule el rango y el rango intercuartílico (IQR). <div>2</div></li>${CR(2)}
        <li>Represente los datos en un diagrama de caja (box plot) esquemático. <div>3</div></li>${CR(4)}
    </ol>
    </div>
    <div class="page"></div>`;

    let Solucion = `<div class="ans">
    <b>Solución:</b><br>
    Datos ordenados: ${datos.join(', ')}<br>
    Mediana: $\\frac{${datos[4]} + ${datos[5]}}{2} = ${mediana}$<br>
    $Q_1 = ${Q1}, \\quad Q_3 = ${Q3}$<br>
    Rango: ${datos[9]} - ${datos[0]} = ${range}<br>
    IQR: ${Q3} - ${Q1} = ${IQR}
    </div>`;

    return [Pregunta, Solucion];
}

/* 
Nota para el profesor: 
Esta ficha genera datos aleatorios para cada sesión.
Se recomienda imprimir utilizando el estilo de hoja A4.
Los elementos <tlacuache-cuartil> pueden insertarse para ejercicios adicionales de representación gráfica.
*/