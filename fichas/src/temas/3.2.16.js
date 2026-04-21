import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Trigonometría: El Círculo Unitario y Razones';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta(globalIndex = 0) {
    // Generación dinámica de un punto en el círculo unitario
    const angleDeg = Math.floor(Math.random() * 90) + 10;
    const angleRad = (angleDeg * Math.PI) / 180;
    const x = Math.cos(angleRad).toFixed(3);
    const y = Math.sin(angleRad).toFixed(3);

    let Pregunta = `<div class="problema2">
        <h3>Práctica: Razones Trigonométricas y el Círculo Unitario</h3>
        <p>El punto $P(x, y)$ se encuentra sobre el círculo unitario ($x^2 + y^2 = 1$). A continuación, se presenta la representación geométrica de un ángulo $\\theta$ en posición normal.</p>
        
        <center>
          <div class="pregunta-geogebra noprint_border" data-n="5">
            <div id="applet_container_${globalIndex}" class="ggb-container" style="border: 1px solid #ccc; width: 400px; height: 350px; margin: 0 auto;"></div>
          </div>
        </center>
        
        <ol class="FT_ol_a">
        <li><b>Coordenadas:</b> Si el ángulo $\\theta = ${angleDeg}^\\circ$, determine los valores de $x$ y $y$ correspondientes al punto $P$. <div>2</div></li>${CR(2)}
        <li><b>Definición:</b> Explique por qué, en el círculo unitario, $\\cos(\\theta) = x$ y $\\sin(\\theta) = y$. <div>2</div></li>${CR(3)}
        <li><b>Identidad:</b> Utilizando el teorema de Pitágoras y la ecuación del círculo unitario ($x^2 + y^2 = 1$), demuestre la identidad pitagórica fundamental $\\cos^2(\\theta) + \\sin^2(\\theta) = 1$. <div>3</div></li>${CR(4)}
        <li><b>Aplicación:</b> Si un punto $Q$ tiene coordenadas $(0.6, y)$ en el primer cuadrante y pertenece al círculo unitario, halle el valor exacto de $y$ y el ángulo $\\theta$ asociado. <div>3</div></li>${CR(4)}
        </ol>
        </div><div class="page"></div>`;

    let Solucion = `<div class="ans">
    <b>Soluciones:</b><br>
    1) $x = ${x}, y = ${y}$<br>
    2) Por definición de razones trigonométricas en triángulo rectángulo (op/hip y ady/hip) donde hipotenusa = 1.<br>
    3) Sustituyendo $x=\\cos(\\theta)$ y $y=\\sin(\\theta)$ en $x^2+y^2=1$.<br>
    4) $0.6^2 + y^2 = 1 \\Rightarrow y^2 = 0.64 \\Rightarrow y = 0.8$. Ángulo $\\theta = \\arcsin(0.8) \\approx 53.1^\\circ$.
    </div>`;

    return [Pregunta, Solucion];
}

export async function renderGeoGebra(container, totalElements) {
    window.ggbApps = window.ggbApps || [];
    const material_id = "uaxkzmpb"; // ID genérico para referencia de visualización
    const params = {
        appName: 'classic',
        width: 400,
        height: 350,
        showToolBar: false,
        showAlgebraInput: false,
        showMenuBar: false,
        appletOnLoad(api) {
            api.setCoordSystem(-1.5, 1.5, -1.5, 1.5);
            api.evalCommand("C = Circle((0,0), 1)");
            api.evalCommand("A = (1,0)");
            api.evalCommand("P = (cos(30*pi/180), sin(30*pi/180))");
            api.evalCommand("Segment((0,0), P)");
            api.evalCommand("Segment(P, (x(P),0))");
            api.evalCommand("SetColor(C, 'Black')");
            api.evalCommand("SetColor(P, 'Red')");
        }
    };
    new GGBApplet(params, true).inject(container.querySelector('.ggb-container').id);
}