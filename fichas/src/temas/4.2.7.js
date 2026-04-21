import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

// Fuente original: [111].pdf
export function name() {
    return 'Estadística Descriptiva: Media y Mediana';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Generar datos aleatorios para la práctica
    let n = 9; 
    let datos = [];
    for(let i=0; i<n; i++) datos.push(Math.floor(Math.random() * 20) + 10);
    let datosOrdenados = [...datos].sort((a, b) => a - b);
    let suma = datos.reduce((a, b) => a + b, 0);
    let media = (suma / n).toFixed(2);
    let mediana = datosOrdenados[Math.floor(n / 2)];

    let Pregunta = `<div class="problema2">
    <h3>Práctica: Medidas de Tendencia Central</h3>
    <p>Considere el siguiente conjunto de datos que representa las puntuaciones de un grupo de estudiantes: </p>
    <div style="padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9; text-align: center; font-size: 1.2em;">
        ${datos.join(', ')}
    </div>
    <br>
    <ol class="FT_ol_a">
        <li>Ordene los datos de menor a mayor. <div>2</div></li>${CR(2)}
        <li>Calcule la media aritmética ($\\bar{x}$) del conjunto de datos. Muestre el procedimiento. <div>3</div></li>${CR(3)}
        <li>Identifique la mediana. Explique por qué en este caso particular es más sencillo encontrarla. <div>2</div></li>${CR(3)}
        <li>Si añadimos un estudiante que obtuvo un 100, ¿cómo afectaría esto principalmente a la media? ¿Y a la mediana? Justifique. <div>3</div></li>${CR(4)}
    </ol></div>
    <div class="page"></div>`;

    let Solucion = `<div class="ans"><b>Solucionario:</b><br>
    (1) Datos ordenados: ${datosOrdenados.join(', ')}<br>
    (2) $\\bar{x} = \\frac{\\sum x_i}{n} = \\frac{${suma}}{${n}} \\approx ${media}$<br>
    (3) Mediana = ${mediana}. Es sencilla porque $n=9$ es impar, por lo que es el valor central exacto.<br>
    (4) La media aumentará significativamente debido a que el 100 es un valor atípico (outlier), mientras que la mediana cambiará muy poco ya que es una medida robusta.</div>`;

    // Segundo problema: Interpretación de fórmulas
    let n2 = 14; 
    Pregunta += `<div class="problema2">
    2.- Un conjunto de datos tiene ${n2} elementos.
    <ol class="FT_ol_a">
        <li>Utilizando la fórmula $\\left(\\frac{n+1}{2}\\right)$, ¿en qué posición se encuentra la mediana? <div>2</div></li>${CR(2)}
        <li>Si los datos ordenados son $x_1, x_2, \\dots, x_{14}$, ¿entre qué dos posiciones debe calcularse el promedio para obtener la mediana? <div>2</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> (2a) $\\frac{14+1}{2} = 7.5$. (2b) Entre la 7ma y 8va posición.</div>`;

    return [Pregunta, Solucion];
}