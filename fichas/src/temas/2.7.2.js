import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Funciones Sinusoidales';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta(globalIndex = 0) {
    let Pregunta = `<div class="problema2">
        <h3>Análisis de Funciones Sinusoidales</h3>
        <p>Observe la siguiente función sinusoidal en la gráfica generada y determine sus características principales (amplitud, período, desplazamientos).</p>
        <br>
        <center>
          <div class="pregunta-geogebra noprint_border" data-n="5">
            <div id="applet_container_${globalIndex}" class="ggb-container" style="border: 1px solid #ccc; width: 500px; height: 350px; margin: 0 auto; pointer-events: none;"></div>
          </div>
        </center>
        <div class="page"></div>
        
        <ol class="FT_ol_a">
        <li><b>Amplitud:</b> Defina y calcule la amplitud de la función mostrada. <div>2</div></li>${CR(3)}
        <li><b>Período:</b> Determine el período de la función. <div>2</div></li>${CR(3)}
        <li><b>Desplazamiento de fase:</b> Identifique si existe un desplazamiento horizontal (de fase). <div>2</div></li>${CR(3)}
        <li><b>Desplazamiento vertical:</b> Identifique si existe un desplazamiento vertical. <div>2</div></li>${CR(4)}
        <li><b>Ecuación:</b> Escriba la ecuación de la función en la forma $f(x) = a \\cdot \\sin(b(x - h)) + k$ o usando la función coseno. <div>2</div></li>${CR(4)}
        </ol>
        </div><div class="page"></div>`;

    let Solucion = `<div class="ans">
    <div><b>Solución de la Función Sinusoidal</b> (En construcción)</div>
    </div>`;

    return [Pregunta, Solucion];
}

export async function renderGeoGebra(container, totalElements) {
    window.ggbApps = window.ggbApps || [];

    for (let i = 0; i < totalElements; i++) {
        const params = {
            appName: 'classic',
            width: 500,
            height: 350,
            showToolBar: false,
            showAlgebraInput: false,
            showMenuBar: false,
            id: `ggbApplet_${i}`,

            appletOnLoad(api) {
                window.ggbApps[i] = api;

                api.setCoordSystem(-2, 12, -6, 6);
                api.setGraphicsOptions(1, { gridType: 0, gridDistance: { "x": 1, "y": 1 }, gridIsAutomatic: false });

                // Generar una función sinusoidal aleatoria
                let a = Math.round(Math.random() * 2) + 1; // 1 a 3
                let b = Math.round(Math.random() * 2) + 1; // 1 a 3
                let c = Math.round(Math.random() * 4) - 2; // -2 a 2
                let d = Math.round(Math.random() * 4) - 2; // -2 a 2

                let funcion = `${a}*sin(${b}*(x - ${c})) + ${d}`;

                api.evalCommand(`f(x) = ${funcion}`);
                api.evalCommand(`SetColor(f, "Blue")`);
                api.evalCommand(`SetLineThickness(f, 5)`);
            }
        };
        new GGBApplet(params, true).inject(`applet_container_${i}`);
    }
}
