import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import { desencriptar, encriptar, generarCodigo } from '../r2p_core.js'

export function name() {
    return 'Conociendo el Diagrama de Voronoi';
}

export function tipo() {
    return 3;
}

export async function pregunta(i, totalPreguntas, esImprimible = false) {
    try {
        // Generar 3 puntos (Restaurantes) y un punto extra (Casa)
        let A = [Math.round(Math.random() * 8 - 4), Math.round(Math.random() * 8 - 4)];
        let B = [Math.round(Math.random() * 8 - 4), Math.round(Math.random() * 8 - 4)];
        let C = [Math.round(Math.random() * 8 - 4), Math.round(Math.random() * 8 - 4)];
        let H = [Math.round(Math.random() * 8 - 4), Math.round(Math.random() * 8 - 4)];

        // Asegurar que no sean el mismo
        // (Simplificado para la prueba)

        // Calculamos el más cercano para tener la respuesta
        const distA = Math.hypot(A[0] - H[0], A[1] - H[1]);
        const distB = Math.hypot(B[0] - H[0], B[1] - H[1]);
        const distC = Math.hypot(C[0] - H[0], C[1] - H[1]);

        let minDist = Math.min(distA, distB, distC);
        let restCercano = "A";
        if (minDist === distB) restCercano = "B";
        if (minDist === distC) restCercano = "C";

        const Pregunta = `
      <div class="pregunta-abierta" data-a="${A}" data-b="${B}" data-c="${C}" data-h="${H}" data-ans="${restCercano}" style="display: none;">
        <p><b>Paso 1:</b> Observa los puntos A, B y C que representan restaurantes. El punto H representa tu casa.</p>
        <p><b>Paso 2:</b> En la aplicación de GeoGebra, utiliza la barra de entrada para trazar el diagrama de Voronoi escribiendo el comando: <code>Voronoi(A, B, C)</code>.</p>
        <p><b>Paso 3:</b> Observa en qué región cae el punto H.</p>
        <p>${i + 1}.- ¿Cuál es el restaurante más cercano a la casa H? (Escribe A, B o C)<span id="resultado_${i}" name="question"></span></p>
        <div id="applet_container_${i}" class="ggb-container" style="margin-bottom: 20px;"></div>
        
        <table>
          <tr><td>Restaurante más cercano: </td><td><math-field></math-field></td></tr>
        </table>
      </div>
    `;
        if (esImprimible) {
            const respuesta = `$${restCercano}$`
            return [Pregunta, respuesta]
        }

        if (totalPreguntas - 1 == i) render(null, totalPreguntas)
        return Pregunta

    } catch (error) {
        console.error('Error al carga la pregunta:', error);
    }
}

export async function render(container, n, code) {
    console.log('Ejecutar render')
    // Usamos un applet clásico limpio (sin id específico de material, o uno vacío si hay)
    window.ggbApps = [];

    for (let i = 0; i < n; i++) {
        const params = {
            appName: 'classic',
            width: 600,
            height: 400,
            showToolBar: true,
            showAlgebraInput: true,
            showMenuBar: false,
            id: `ggbApplet_${i}`,
            appletOnLoad(api) {
                let pregunta = document.getElementsByClassName('pregunta-abierta');
                const A = pregunta[i].dataset.a.split(',').map(Number);
                const B = pregunta[i].dataset.b.split(',').map(Number);
                const C = pregunta[i].dataset.c.split(',').map(Number);
                const H = pregunta[i].dataset.h.split(',').map(Number);

                window.ggbApps[i] = api;

                // Poner los puntos en GeoGebra
                api.evalCommand(`A = (${A[0]}, ${A[1]})`);
                api.evalCommand(`B = (${B[0]}, ${B[1]})`);
                api.evalCommand(`C = (${C[0]}, ${C[1]})`);
                api.evalCommand(`SetPointStyle(A, 4)`);
                api.evalCommand(`SetPointStyle(B, 4)`);
                api.evalCommand(`SetPointStyle(C, 4)`);

                api.evalCommand(`H = (${H[0]}, ${H[1]})`);
                api.evalCommand(`SetColor(H, 1, 0, 0)`); // Rojo para la casa
                api.evalCommand(`SetPointStyle(H, 3)`);

                // Fijar puntos para que el alumno no los mueva por error mientras hace la prueba,
                // o podemos dejarlos libres para que experimenten.
                api.setFixed('A', false);
                api.setFixed('B', false);
                api.setFixed('C', false);
                api.setFixed('H', true);
            }
        };
        new GGBApplet(params, true).inject(`applet_container_${i}`);
    }

    console.log('vamos a publicar la revisión')
    window.accionR2P = function (i) {
        const api = window.ggbApps[i];
        if (!api) return alert("Applet no listo");

        let totalPuntos = 1
        let puntos = 0
        let pregunta = document.getElementsByClassName('pregunta-abierta')
        const mathFields = pregunta[i].getElementsByTagName('math-field')
        const ans = mathFields[0].value.trim().toUpperCase()

        const correcta = pregunta[i].dataset.ans;

        if (ans != correcta) {
            mathFields[0].style.backgroundColor = "rgba(255, 0, 0, 0.2)"; // Soft red
            document.getElementById(`resultado_${i}`).innerHTML = `'La respuesta correcta era: ${correcta}' != '${ans}'`
        } else {
            ++puntos
            mathFields[0].style.border = "solid 5px green";
            document.getElementById(`resultado_${i}`).innerHTML = "¡Correcto!"
        }
        return [puntos, totalPuntos]
    };
}
