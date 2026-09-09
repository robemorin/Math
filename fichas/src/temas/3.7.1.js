import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Introducción a D. Voronoi';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta(globalIndex = 0) {
    let Pregunta = `<div class="problema2">
        <h3>Introducción al Diagrama de Voronoi</h3>
        <p>El diagrama de Voronoi es una construcción geométrica que divide el plano en regiones (celdas) basadas en la distancia a un conjunto de puntos específicos llamados <b>semillas</b> (o sitios). Cada región contiene todos los puntos que están más cerca de su semilla correspondiente que de cualquier otra semilla.</p>
        <p>Observe el siguiente diagrama de Voronoi generado en GeoGebra y responda o identifique lo que se le pide.</p>
        <br>
        <center>
          <div class="pregunta-geogebra noprint_border" data-n="5">
            <div id="applet_container_${globalIndex}" class="ggb-container" style="border: 1px solid #ccc; width: 500px; height: 350px; margin: 0 auto; pointer-events: none;"></div>
          </div>
        </center>
        <div class="page"></div>
        
        <ol class="FT_ol_a">
        <li><b>Semillas (sitios):</b> Utilice una pluma o color para resaltar claramente las semillas en la gráfica. Defina con sus propias palabras qué representa una "semilla" en este contexto. <div>2</div></li>${CR(3)}
        <li><b>Regiones (Celdas):</b> Pinte o sombree cada región de Voronoi con un color diferente. Explique brevemente cómo se define el área que abarca la celda de una semilla en particular. <div>2</div></li>${CR(3)}
        <li><b>Fronteras (Aristas):</b> Remarque con color rojo las líneas que dividen las regiones. Conceptualmente, ¿qué propiedad cumplen todos los puntos que están sobre la frontera que divide exactamente a dos semillas?. <div>2</div></li>${CR(3)}
        <li><b>Vértices:</b> Encierre en un círculo de color verde los vértices donde chocan las fronteras. Defina con sus propias palabras qué es un vértice geométricamente y qué relación de distancia mantiene con las semillas adyacentes. <div>2</div></li>${CR(4)}
        <li><b>Aplicación:</b> Describa de forma creativa un ejemplo en el que usted utilizaría un diagrama de Voronoi en la vida real (ej. cobertura, localización). <div>2</div></li>${CR(4)}
        </ol>
        </div><div class="page"></div>`;

    let Solucion = `<div class="ans">
    <div><b>Introducción Conceptual (Sin solución estructurada por ser teórica)</b></div>
    </div>`;

    return [Pregunta, Solucion];
}

export async function renderGeoGebra(container, totalElements) {
    window.ggbApps = window.ggbApps || [];

    for (let i = 0; i < totalElements; i++) {
        const material_id = "uaxkzmpb";
        const params = {
            appName: 'classic',
            width: 500,
            height: 350,
            material_id: material_id,
            showToolBar: false,
            showAlgebraInput: false,
            showMenuBar: false,
            id: `ggbApplet_${i}`,

            appletOnLoad(api) {
                window.ggbApps[i] = api;

                api.setCoordSystem(-10, 10, -7, 7);
                api.setGraphicsOptions(1, { gridType: 0, gridDistance: { "x": 1, "y": 1 }, gridIsAutomatic: false });

                // Generar 5 a 6 puntos aleatorios dispersos
                let pts = [];
                for (let j = 0; j < 5; j++) {
                    let rx = Math.round((Math.random() * 16) - 8);
                    let ry = Math.round((Math.random() * 10) - 5);
                    let nombre = String.fromCharCode(65 + j); // A, B, C...
                    api.evalCommand(`${nombre} = (${rx}, ${ry})`);
                    //api.setFixed(nombre, true);
                    api.evalCommand(`SetColor(${nombre}, "Black")`);
                    api.evalCommand(`SetPointSize(${nombre}, 5)`);
                    pts.push(nombre);
                }

                // Traza el diagrama general
                api.evalCommand(`V = Voronoi({${pts.join(',')}})`);
                api.evalCommand(`SetColor(V, "Black")`);
                api.evalCommand(`SetLineThickness(V, 5)`);
            }
        };
        new GGBApplet(params, true).inject(`applet_container_${i}`);
    }
}
