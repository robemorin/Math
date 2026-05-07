// Generado a partir de: temporal.pdf (Refactorizado para deducción de expresiones y GeoGebra)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return 'Modelización con Funciones Trigonométricas (GeoGebra)';
}

export async function pregunta(numFicha) {
    let html = '';
    let solucion = '';

    // --- DATOS ALEATORIOS ---

    // Problema 1: La Noria (Ferris Wheel)
    const h_min = 2 + Math.floor(Math.random() * 3);
    const h_max = 20 + Math.floor(Math.random() * 10);
    const amp1 = (h_max - h_min) / 2;
    const offset1 = (h_max + h_min) / 2;
    const period1 = 40 + Math.floor(Math.random() * 20); // segundos por vuelta
    const b1 = 360 / period1;
    const ggbExpr1 = `f(x) = ${-amp1} * cos(${b1} * x * pi / 180) + ${offset1}`;

    // Problema 2: Mareas
    const d_mean = 10 + Math.random() * 2;
    const d_amp = 1.5 + Math.random();
    const b2 = 30; // 12 horas de periodo
    const t_table = [0, 3, 6, 9, 12];
    const depths = t_table.map(t => (d_mean + d_amp * Math.sin(b2 * t * Math.PI / 180)).toFixed(1));
    const ggbExpr2 = `g(x) = ${d_amp} * sin(${b2} * x * pi / 180) + ${d_mean}`;

    // --- CONSTRUCCIÓN DEL HTML ---
    html += ai.getHeader("2.7.1", "Funciones Sinusoidales", "Funciones");

    html += `
        <div class="seccion-title">I. Activación: La Noria de Londres</div>
        <div class="exercise-step">
            <div class="contexto-especial">
                La altura de una cabina en una noria gigante tiene un comportamiento periódico que puede modelarse como una función del sinusoidal como se muestra en la siguiente gráfica.
            </div>
            <center>
                <div id="ggb_ex1_${numFicha}" class="ggb-container" data-f="${ggbExpr1}" data-xmin="-5" data-xmax="${period1 + 5}" data-ymin="-2" data-ymax="${h_max + 5}" data-xstep="5,1" data-ystep="5,1"></div>
            </center>
            <ol class="FT_ol_a">
                <li>Marque la cresta, valle y altura del nodo en la gráfica. <span class="mark">2</span></li>
                <li>Identifique el valor del periodo, amplitud y eje central de la función sinusoidal. <span class="mark">3</span> <tlacuache-renglon n="2"></tlacuache-renglon></li>
                <li>Halle una expresión para la altura $h(t)$ de la forma $h(t) = a \\cos(bt^\\circ) + d$. <span class="mark">4</span> <tlacuache-renglon n="3"></tlacuache-renglon></li>
            </ol>
        </div>

        <div class="seccion-title">II. Desarrollo: Análisis de Mareas</div>
        <div class="exercise-step">
            La siguiente tabla y gráfica muestran la profundidad del agua, $d$ metros, en un puerto durante un periodo de 12 horas.
            <table style="width:100%; text-align:center; border-collapse: collapse; margin: 10px 0;" border="1">
                <tr style="background:#f2f2f2;"><td width="30%">Tiempo $t$ (h)</td><td>0</td><td>3</td><td>6</td><td>9</td><td>12</td></tr>
                <tr><td>Profundidad $d$ (m)</td><td></td><td></td><td></td><td></td><td></td></tr>
            </table>
            <div id="ggb_ex2_${numFicha}" class="ggb-container" data-f="${ggbExpr2}" data-xmin="-1" data-xmax="13" data-ymin="5" data-ymax="16" data-xstep="3,1" data-ystep="2,1"></div>
            <ol class="FT_ol_a">
                <li>Deduzca los valores de $a$, $b$ y $k$ para el modelo $d(t) = a \\sin(bt^\\circ) + k$. <span class="mark">4</span> <tlacuache-renglon n="3"></tlacuache-renglon></li>
                <li>Halle a qué hora(s) la profundidad es exactamente de $${(parseFloat(d_mean)).toFixed(1)}$ metros. <span class="mark">2</span> <tlacuache-renglon n="2"></tlacuache-renglon></li>
            </ol>
        </div>

        ${ai.getTiTip("En GeoGebra, puedes usar la herramienta de inspección para identificar puntos máximos y mínimos si el diagrama lo permite.")}

    </div>
    `;

    // --- SOLUCIONARIO ---
    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 2.7.1:</b><br>
        1a. $d = ${offset1}$, $a = -${amp1}$, $b = 360/${period1} = ${b1.toFixed(1)}$. $h(t) = -${amp1}\\cos(${b1.toFixed(1)}t^\\circ) + ${offset1}$ [M1 A3]<br><br>
        2a. $k = ${d_mean.toFixed(1)}$, $a = ${d_amp.toFixed(1)}$, $b = 30$. $d(t) = ${d_amp.toFixed(1)}\\sin(30t^\\circ) + ${d_mean.toFixed(1)}$ [M1 A3]<br>
        2b. $d(t) = ${d_mean.toFixed(1)} \\rightarrow \\sin(30t) = 0 \\rightarrow t = 0, 6, 12$ h. [M1 A1]<br><br>
        3ai. $1$ Litro. 3aii. $4$ s. [A1 A1]<br>
        3b. $V(t) = -0.5\\cos(90t^\\circ) + 0.5$. [M1 A3]<br>
        3c. $\\Delta t = 1.18$ s. [M1 A3]
    </div>
    `;

    return [html, solucion];
}

export async function renderGeoGebra(container, totalElements) {
    const containers = container.querySelectorAll('.ggb-container');

    containers.forEach((el, index) => {
        const id = el.id;
        const expr = el.getAttribute('data-f');
        const xmin = el.getAttribute('data-xmin') || -10;
        const xmax = el.getAttribute('data-xmax') || 10;
        const ymin = el.getAttribute('data-ymin') || -10;
        const ymax = el.getAttribute('data-ymax') || 10;
        const xstep = eval(`[${el.getAttribute('data-xstep')}]`) || [5, 1];
        const ystep = eval(`[${el.getAttribute('data-ystep')}]`) || [5, 1];

        const params = {
            "appName": "classic",
            "material_id": "uaxkzmpb",
            "width": 600,
            "height": 400,
            "showToolBar": false,
            "showAlgebraInput": false,
            "showMenuBar": false,
            "id": id,
            "appletOnLoad": function (api) {
                //api.setAxisSteps(1, 45, 1, 1)
                api.setGraphicsOptions(1, {
                    gridType: 0,                    // 0 = cuadrícula cartesiana
                    gridDistance: { "x": xstep[1], "y": ystep[1] },     //  funciona
                    gridIsAutomatic: false,         // si funciona
                });
                api.setAxisSteps(xstep[0], ystep[0], 1);
                api.setCoordSystem(parseFloat(xmin), parseFloat(xmax), parseFloat(ymin), parseFloat(ymax));
                api.evalCommand(expr);
                api.setFixed(id, true, false);
                // Asegurar que la función sea visible pero sin etiqueta
                const label = expr.split('=')[0].trim();
                api.setVisible(label, true);
                api.setLabelVisible(label, false);
            }
        };

        const applet = new GGBApplet(params, true);
        applet.inject(id);
    });
}
