import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
    return 'Tabla de frecuencias, Histograma y Diagrama de Bigotes';
}

export function tipo() {
    return 2; // GeoGebra / Interactivo
}

export async function pregunta(i, code, esImprimible = false) {
    try {
        let n = Math.floor(Math.random() * 11) + 15; // De 15 a 25 datos
        let data = [];
        let frecuencias = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        for (let j = 0; j < n; j++) {
            let val = Math.floor(Math.random() * 5) + 1; // Valores nominales del 1 al 5
            data.push(val);
            frecuencias[val]++;
        }

        let dataStr = data.join(', ');

        let Pregunta = `
            <div class="pregunta-geogebra" data-datos="${data.join(',')}" style="display: none;">
                <p><b>${i + 1}.-</b> Considere la siguiente muestra de tamaño $n = ${n}$ extraída de una población: <br><br> <b>${dataStr}</b>.</p>
                
                <p><b>a)</b> Llene la siguiente <b>tabla de frecuencias absolutas</b> para los datos presentados:</p>
                <center>
                <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; text-align: center;">
                    <tr>
                        <td style="background-color: #EEE;"><b>Valor ($x$)</b></td>
                        <td><b>1</b></td>
                        <td><b>2</b></td>
                        <td><b>3</b></td>
                        <td><b>4</b></td>
                        <td><b>5</b></td>
                    </tr>
                    <tr>
                        <td style="background-color: #EEE;"><b>Frecuencia ($f$)</b></td>
                        <td><math-field id="math-field-${i}-1"></math-field></td>
                        <td><math-field id="math-field-${i}-2"></math-field></td>
                        <td><math-field id="math-field-${i}-3"></math-field></td>
                        <td><math-field id="math-field-${i}-4"></math-field></td>
                        <td><math-field id="math-field-${i}-5"></math-field></td>
                    </tr>
                </table>
                </center>
                <br>
                <p><b>b)</b> En el siguiente interactivo de GeoGebra, utilice los comandos adecuados para crear un <b>Histograma</b> de las frecuencias.</p>
                <p><b>c)</b> En el mismo plano interactivo, construya el <b>Diagrama de Caja y Bigotes</b> (Boxplot) de los datos.</p>
                <p><i>Nota: Los datos ya han sido ingresados automáticamente en la vista algebraica como la lista <b>L_1</b>.</i></p>
                <br>
                <div id="applet_container_${i}" class="ggb-container"></div>
            </div>`;

        if (esImprimible) {
            let resp = `<div class="ans">Frecuencias: f(1)=${frecuencias[1]}, f(2)=${frecuencias[2]}, f(3)=${frecuencias[3]}, f(4)=${frecuencias[4]}, f(5)=${frecuencias[5]}. El histograma y el diagrama de caja deben dibujarse utilizando la lista de valores.</div>`;
            return [Pregunta, resp];
        }

        return Pregunta;
    } catch (e) {
        console.error(e);
    }
}

export async function renderGeoGebra(container, n_preguntas, code) {
    window.ggbApps = window.ggbApps || [];

    for (let i = 0; i < n_preguntas; i++) {
        const params = {
            appName: 'classic',
            width: 800,
            height: 500,
            showToolBar: true,
            showAlgebraInput: true,
            showMenuBar: true,
            id: `ggbApplet_${i}`,

            appletOnLoad(api) {
                window.ggbApps[i] = api;

                // Obtener los datos generados específicamente en esta pregunta
                let preguntaDiv = document.getElementsByClassName('pregunta-geogebra')[i];
                let rawData = preguntaDiv.dataset.datos;

                // Inyectamos la muestra de forma automatizada en GeoGebra bajo el identificador "L_1"
                api.evalCommand(`L_1 = {${rawData}}`);
            }
        };
        new GGBApplet(params, true).inject(`applet_container_${i}`);
    }

    // Rutina de evaluación
    window.accionGeoGebra = function (i) {
        let totalPuntos = 5; // Temporalmente los 5 puntos de la tabla
        let puntos = 0;
        const api = window.ggbApps[i];

        let preguntaDiv = document.getElementsByClassName('pregunta-geogebra')[i];
        let rawData = preguntaDiv.dataset.datos.split(',').map(Number);

        // Computar frecuencias correctas
        let freq = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        rawData.forEach(v => freq[v]++);

        // Trazar y validar entradas del math-field
        for (let val = 1; val <= 5; val++) {
            let mf = document.getElementById(`math-field-${i}-${val}`);
            if (parseInt(mf.value) === freq[val]) {
                mf.style.border = "solid 3px #4CAF50";
                mf.style.backgroundColor = "transparent";
                puntos++;
            } else {
                mf.style.border = "none";
                mf.style.backgroundColor = "#ffcdd2";
            }
        }

        // TODO: Agregar validador algorítmico de los objetos de GeoGebra (diagrama de barras e histograma)

        return [puntos, totalPuntos];
    };
}
