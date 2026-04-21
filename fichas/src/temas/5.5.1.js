import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

/**
 * Fuente original: [38].pdf
 * Actividad: Estimación de volumen de una montaña mediante métodos de integración numérica.
 * Tiempo estimado: 40 minutos.
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export function name() {
    return 'Cálculo de Volumen: Regla de Simpson';
}

export async function pregunta() {
    let montaña = "Monte Fitz Roy";
    let h1 = 500, h2 = 800, h3 = 1200, h4 = 1500, h5 = 1100;
    
    let Pregunta = `<div class="problema2">
    <h3>Proyecto: ¿Qué tan grande es la montaña?</h3>
    <p>El objetivo es estimar el volumen de una región montañosa utilizando técnicas de integración numérica (Regla de Simpson). La Regla de Simpson para áreas se define como: 
    $$A \\approx \\frac{h}{3} [f(x_0) + 4f(x_1) + f(x_2)]$$</p>
    
    <p>Se ha topografiado el <b>${montaña}</b> obteniendo las siguientes áreas transversales (en km$^2$) a diferentes niveles de altura, espaciadas cada $h=200$ metros:</p>
    
    <table class="table table-bordered" style="width: 60%; margin: auto; text-align: center;">
        <tr><th>Nivel</th><td>Nivel 0</td><td>Nivel 1</td><td>Nivel 2</td><td>Nivel 3</td><td>Nivel 4</td></tr>
        <tr><th>Área (km$^2$)</th><td>${h1}</td><td>${h2}</td><td>${h3}</td><td>${h4}</td><td>${h5}</td></tr>
    </table>
    
    <ol class="FT_ol_a">
        <li>Aplique la Regla de Simpson compuesta para estimar el volumen total de la montaña desde el Nivel 0 al Nivel 4. Recuerde que el volumen es la integral del área respecto a la altura. <div>6</div></li>${CR(8)}
        <li>Si se decide utilizar un método de "rebanadas" (prismas) con un intervalo mayor, ¿esperaría una mayor o menor precisión? Justifique su respuesta basándose en el concepto de error de truncamiento. <div>4</div></li>${CR(6)}
        <li>Mencione dos supuestos matemáticos necesarios para aplicar la regla de Simpson en este modelo topográfico. <div>3</div></li>${CR(5)}
    </ol>
    </div><div class="page"></div>`;

    // Cálculo lógico para la solución
    // V = (h/3) * (A0 + 4A1 + 2A2 + 4A3 + A4)
    // h = 0.2 km (200m)
    let h = 0.2;
    let v_est = (h / 3) * (h1 + 4 * h2 + 2 * h3 + 4 * h4 + h5);

    let Solucion = `<div class="ans"><b>Solución sugerida:</b>
    <br>1. Aplicando la Regla de Simpson compuesta: 
    $$V \\approx \\frac{0.2}{3} [${h1} + 4(${h2}) + 2(${h3}) + 4(${h4}) + ${h5}]$$
    $$V \\approx \\frac{0.2}{3} [${h1 + 4*h2 + 2*h3 + 4*h4 + h5}] \\approx ${v_est.toFixed(2)} \\text{ km}^3$$
    <br>2. A mayor intervalo, menor precisión, ya que el error de la regla de Simpson es proporcional a $h^4$.
    <br>3. Supuestos: La montaña puede ser modelada como una superficie suave (continua) y las secciones transversales están orientadas paralelamente.</div>`;

    return [Pregunta, Solucion];
}