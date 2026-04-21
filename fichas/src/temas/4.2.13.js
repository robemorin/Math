import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

// Fuente original: [117].pdf
export function name() {
    return 'Estadística descriptiva: Media de datos agrupados';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Generación de datos dinámicos (Edades de trabajadores/estudiantes)
    const inicio = 20 + Math.floor(Math.random() * 5) * 5;
    const paso = 5;
    const numIntervalos = 6;
    let frecuencias = [];
    let sumF = 0;
    let sumXf = 0;
    let tablaRows = "";

    for (let i = 0; i < numIntervalos; i++) {
        let f = 10 + Math.floor(Math.random() * 20);
        let li = inicio + i * paso;
        let ls = li + paso - 1;
        let x = (li + ls) / 2;
        frecuencias.push(f);
        sumF += f;
        sumXf += (x * f);
        tablaRows += `<tr><td>${li} - ${ls}</td><td>${f}</td></tr>`;
    }

    const media = (sumXf / sumF).toFixed(2);

    let Pregunta = `<div class="problema2">
    <h3>Estimación de la media con datos agrupados</h3>
    <p>La siguiente tabla muestra la distribución de edades de un grupo de empleados en una empresa local:</p>
    <center>
    <table border="1" style="border-collapse: collapse; width: 60%; text-align: center;">
        <tr><th>Edad (años)</th><th>Frecuencia ($f$)</th></tr>
        ${tablaRows}
    </table>
    </center>
    <ol class="FT_ol_a">
        <li>Complete la tabla añadiendo columnas para el punto medio ($x$) de cada intervalo y el producto $x \\cdot f$. <div>3</div></li>${CR(4)}
        <li>Utilizando la fórmula $\\bar{x} = \\frac{\\sum xf}{\\sum f}$, calcule una estimación de la media de edad de los empleados. <div>3</div></li>${CR(2)}
        <li>Si se supiera que todos los empleados tienen una edad exacta coincidente con el límite superior de cada intervalo, ¿cómo cambiaría el valor de la media? Explique brevemente. <div>2</div></li>${CR(3)}
        <li>A continuación, genere un histograma de los datos proporcionados utilizando el espacio inferior. <div>4</div></li>
    </ol>
    <br>
    <center>
    <tlacuache-ejes size="300,400" xlabel="Edad (años)" ylabel="Frecuencia" xlim="${inicio},${inicio + numIntervalos * paso}" dx="${paso}" ylim="0,${Math.max(...frecuencias) + 10}" dy="5">
        <!-- El estudiante dibujará aquí -->
    </tlacuache-ejes>
    </center>
    </div><div class="page"></div>`;

    let Solucion = `<div class="ans"><b>Solución:</b>
    <br>(1 y 2) Media estimada $\\bar{x} \\approx ${media}$.
    <br>(3) La media sería mayor, ya que al usar los límites superiores en lugar de los puntos medios, estamos sesgando el valor hacia el extremo derecho de cada intervalo.
    </div>`;

    return [Pregunta, Solucion];
}