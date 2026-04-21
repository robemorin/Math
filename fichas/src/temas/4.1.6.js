import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Ficha de practica: Estimación de la varianza y desviación estándar
 * Fuente original: [129].pdf - Investigation 4
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export function name() {
    return 'Estadística: Estimación de Población vs Muestra';
}

export async function pregunta() {
    // Generar datos aleatorios para la "población" (simulada)
    // Usamos tiempos de viaje como en el PDF
    let data = Array.from({ length: 10 }, () => Math.floor(Math.random() * 20) + 10);
    
    // Cálculos para la población
    let n = data.length;
    let mean = data.reduce((a, b) => a + b, 0) / n;
    let variancePop = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
    let stdPop = Math.sqrt(variancePop);
    
    // Cálculos para la muestra (sesgado vs insesgado)
    let varianceSample = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (n - 1);
    let stdSample = Math.sqrt(varianceSample);

    let Pregunta = `<div class="problema2">
    <h3>Investigación: Estimación de Parámetros Poblacionales</h3>
    <p>Se ha realizado un estudio sobre el tiempo (en minutos) que tardan los estudiantes en llegar a la escuela. Los datos recogidos para una muestra pequeña de 10 estudiantes son: <b>${data.join(', ')}</b>.</p>
    
    <ol class="FT_ol_a">
        <li>Calcule la media poblacional (o de la muestra dada) $\\bar{x}$. <div>2</div></li>${CR(1)}
        <li>Calcule la varianza poblacional ($\\sigma^2$) usando la fórmula $\\frac{\\sum (x_i - \\bar{x})^2}{n}$. <div>3</div></li>${CR(2)}
        <li>Calcule la varianza muestral ($s^2$) usando la fórmula $\\frac{\\sum (x_i - \\bar{x})^2}{n-1}$. <div>3</div></li>${CR(2)}
        <li>Compare los resultados obtenidos en (2) y (3). ¿Por qué el divisor es $n-1$ al calcular la varianza de una muestra? <div>3</div></li>${CR(3)}
        <li>Si tuviéramos una población total de 150 estudiantes, explique brevemente por qué el valor de $s^2$ es generalmente un mejor estimador que $\\sigma^2$ cuando trabajamos con una submuestra. <div>3</div></li>${CR(3)}
    </ol>
    </div><div class="page"></div>`;

    let Solucion = `<div class="ans">
    <b>Soluciones:</b><br>
    (1) $\\bar{x} = ${mean.toFixed(2)}$<br>
    (2) $\\sigma^2 = ${variancePop.toFixed(3)}$<br>
    (3) $s^2 = ${varianceSample.toFixed(3)}$<br>
    (4) El uso de $n-1$ (corrección de Bessel) compensa el sesgo de subestimación de la varianza poblacional al usar una muestra.<br>
    (5) La varianza muestral corrige el sesgo introducido al usar la media de la muestra en lugar de la media poblacional real.
    </div>`;

    return [Pregunta, Solucion];
}