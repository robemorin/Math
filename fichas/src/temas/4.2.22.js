import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/* 
 * Fuente original: [126].pdf
 * Módulo de práctica: Estadística Descriptiva (Varianza y Desviación estándar)
 * IB Math AA/AI NM
 */

export function name() {
    return 'Estadística: Medidas de Dispersión';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

// Helper para calcular varianza poblacional
function getStats(data) {
    const n = data.length;
    const mean = data.reduce((a, b) => a + b, 0) / n;
    const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
    return { mean, variance: variance.toFixed(2), stdDev: Math.sqrt(variance).toFixed(2) };
}

export async function pregunta() {
    // Generar conjunto de datos aleatorio
    let data1 = Array.from({length: 5}, () => Math.floor(Math.random() * 20) + 5);
    let stats1 = getStats(data1);

    let Pregunta = `<div class="problema2">
    <h3>Práctica: Varianza y Desviación Estándar</h3>
    <p>Nombre: _________________________________________________ Fecha: ___________</p>
    
    <p>1.- Dado el conjunto de datos poblacionales: <b>${data1.join(', ')}</b></p>
    <ol class="FT_ol_a">
        <li>Complete la siguiente tabla de frecuencias para calcular la varianza manualmente: <div>3</div></li>
        <table border="1" style="width: 80%; text-align: center; margin: 10px auto;">
            <tr><th>$x$</th><th>$x - \\mu$</th><th>$(x - \\mu)^2$</th></tr>
            ${data1.map(x => `<tr><td>${x}</td><td><br></td><td><br></td></tr>`).join('')}
            <tr><td><b>Total</b></td><td></td><td><br></td></tr>
        </table>${CR(1)}
        <li>Calcule la media ($\mu$), la varianza poblacional ($\\sigma^2$) y la desviación estándar ($\\sigma$). <div>4</div></li>${CR(3)}
    </ol>
    </div>
    
    <div class="problema2">
    <p>2.- Una empresa mide el tiempo (en minutos) que tardan ${data1.length} empleados en completar una tarea: <b>${data1.join(', ')}</b>.</p>
    <ol class="FT_ol_a">
        <li>Utilizando su calculadora de pantalla gráfica (GDC), verifique los resultados obtenidos en el ejercicio anterior.</li>
        <li>Si cada empleado recibe un bono extra de 5 minutos de tiempo adicional, ¿cómo afecta esto a la desviación estándar? Justifique su respuesta. <div>3</div></li>${CR(4)}
    </ol>
    </div>`;

    let Solucion = `<div class="ans">
    <b>Soluciones:</b><br>
    P1: Media $\\mu = ${stats1.mean}$. Varianza $\\sigma^2 = ${stats1.variance}$. Desviación estándar $\\sigma \\approx ${stats1.stdDev}$.<br>
    P2: (b) La desviación estándar no cambia, ya que sumar una constante a todos los datos desplaza la media pero no altera la dispersión entre los valores.
    </div>`;

    return [Pregunta, Solucion];
}