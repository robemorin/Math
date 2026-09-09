import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Modelos Cuadráticos en Contexto";
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    // ======================================================
    // EJERCICIO 1: PROYECTIL (DEPORTES)
    // ======================================================
    const r2 = Math.floor(Math.random() * 2) + 3; 
    const r1 = -1; 
    const a = -5; 
    const b = -a * (r1 + r2); 
    const c = a * r1 * r2;    
    const t_vertex = -b / (2 * a);
    const h_max = a * t_vertex * t_vertex + b * t_vertex + c;

    html += ai.getHeader("2.4.1", "2. Funciones", "Ficha: Modelos Cuadráticos en Contexto");

    html += `
    <div class="seccion-title">I. Física: Trayectoria de un clavadista</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            Un clavadista salta desde una plataforma hacia una piscina. Su altura $h$ (en metros) sobre el nivel del agua a los $t$ segundos del salto se modela mediante la función:
            <p style="text-align:center;">$$h(t) = ${a}t^2 + ${b}t + ${c}, \\quad t \\geq 0$$</p>
        </div>
        <ol class="FT_ol_a">
            <li>Determine la altura de la plataforma desde la cual se realizó el salto. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Determine cuánto tiempo transcurre hasta que el clavadista alcanza su altura máxima sobre el agua. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Halle dicha altura máxima. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule cuánto tiempo permanece el clavadista en el aire antes de entrar al agua. <span class="mark">3</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 2.4.1:</b><br>
        <b>I.</b> 1a. $h(0) = ${c}$ metros | 1b. $t = ${t_vertex}$ s | 1c. $h(${t_vertex}) = ${h_max}$ m | 1d. $t = ${r2}$ s<br>
    `;

    // ======================================================
    // EJERCICIO 2: ECONOMÍA (BENEFICIOS)
    // ======================================================
    const x1 = (Math.floor(Math.random() * 3) + 2) * 10; 
    const amplitud = (Math.floor(Math.random() * 4) + 4) * 10; 
    const x2 = x1 + amplitud;
    const coefB = x1 + x2;
    const coefC = x1 * x2; 
    const x_optimo = (x1 + x2) / 2;
    const ganancia_max = -(x_optimo*x_optimo) + coefB*x_optimo - coefC;

    html += `
    <div class="seccion-title">II. Economía: Maximización de Beneficios</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            El beneficio semanal $B(x)$ (en dólares) de una empresa que fabrica componentes electrónicos depende del número de unidades vendidas $x$, según la función:
            <p style="text-align:center;">$B(x) = -x^2 + ${coefB}x - ${coefC}$</p>
        </div>
        <ol class="FT_ol_a">
            <li>Determine cuántas unidades debe vender la empresa para obtener el <strong>máximo</strong> beneficio posible. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Halle el valor de dicho beneficio máximo. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Determine el intervalo de ventas para el cual la empresa obtiene ganancias (es decir, $B(x) > 0$). <span class="mark">3</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    `;

    solucion += `<b>II.</b> 2a. $x = ${x_optimo}$ unidades | 2b. $B(${x_optimo}) = \\$${ganancia_max}$ | 2c. Intervalo: $]${x1}, ${x2}[$<br>`;

    // ======================================================
    // EJERCICIO 3: ARQUITECTURA (TÚNEL)
    // ======================================================
    const altura_tunel = Math.floor(Math.random() * 3) + 4; 
    const a_tunel = -altura_tunel / 25;
    const termA = a_tunel;
    const termB = -10 * a_tunel; 
    const ancho_camion = 4;
    const alto_camion = altura_tunel - 0.5 - (Math.random() * 1.5); 
    const x_check = 5 - (ancho_camion / 2); 
    const altura_en_3 = termA * (x_check * x_check) + termB * x_check;
    const pasa = altura_en_3 > alto_camion ? "Sí pasa" : "No pasa";

    html += `
    <div class="seccion-title">III. Arquitectura: Arco Parabólico</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            La entrada a un túnel tiene forma de arco parabólico. Si consideramos el nivel del suelo como el eje $x$, la altura $y$ (en metros) del arco en función de la distancia horizontal $x$ desde el borde izquierdo viene dada por:
            <p style="text-align:center;">$$y = ${termA.toFixed(2)}x^2 + ${termB.toFixed(2)}x$$</p>
        </div>
        <ol class="FT_ol_a">
            <li>Calcule el ancho de la base del túnel a nivel del suelo. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Determine la altura máxima del arco del túnel. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Un camión de carga tiene ${ancho_camion} metros de ancho y ${alto_camion.toFixed(2)} metros de altura. Si el camión intenta pasar exactamente por el centro del túnel, determine matemáticamente si podrá hacerlo sin chocar con el arco. Justifique su respuesta. <span class="mark">4</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `<b>III.</b> 3a. Ancho = 10 m | 3b. Altura máx = ${altura_tunel} m | 3c. Altura en $x=3$ es ${altura_en_3.toFixed(2)} m. Altura camión = ${alto_camion.toFixed(2)} m. Conclusión: <strong>${pasa}</strong>.</div>`;

    return [html, solucion];
}
