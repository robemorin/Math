import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

// Fuente original: [80].pdf (Ejercicio 8)
export function name() {
    return 'Geometría Analítica en el Espacio: Conos';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Parámetros aleatorios para un cono en R^3
    // C = (x0, y0, 0), A = (x0, y0, h), B = (x0+r, y0, 0)
    let x0 = 2, y0 = 3;
    let r = Math.floor(Math.random() * 2) + 2; // radio
    let h = Math.floor(Math.random() * 3) + 4; // altura
    
    let C = [x0, y0, 0];
    let A = [x0, y0, h];
    let B = [x0 + r, y0, 0];

    // Cálculos para soluciones
    let slant_height = Math.sqrt(r * r + h * h);
    let surface_area = Math.PI * r * (r + slant_height);
    
    // Vectores para AB y AC para calcular ángulo
    // AB = (r, 0, -h), AC = (0, 0, -h)
    // cos(theta) = (AB . AC) / (|AB| * |AC|)
    let dot_prod = (r * 0) + (0 * 0) + (-h * -h);
    let mag_AB = Math.sqrt(r * r + h * h);
    let mag_AC = h;
    let angle = Math.acos(dot_prod / (mag_AB * mag_AC)) * (180 / Math.PI);

    let Pregunta = `<div class="problema2">
    <h3>Ejercicio: Propiedades de un cono en el espacio 3D</h3>
    <p>El siguiente ejercicio analiza un cono cuyo centro de la base $C$ se encuentra en el plano $X-Y$ en el punto $C(${C[0]}, ${C[1]}, ${C[2]})$. El vértice (apex) del cono es $A(${A[0]}, ${A[1]}, ${A[2]})$ y el punto $B(${B[0]}, ${B[1]}, ${C[2]})$ se encuentra en el borde de la base.</p>
    
    <div class="pregunta-geogebra noprint_border" data-n="1">
        <div id="applet_container" class="ggb-container" style="border: 1px solid #ccc; width: 500px; height: 350px; margin: 0 auto; pointer-events: none;"></div>
    </div>

    <ol class="FT_ol_a">
        <li>Determine la longitud del radio de la base y la altura del cono, y utilice estos valores para hallar el área total de la superficie del cono. <div>4</div></li>${CR(4)}
        <li>Halle la medida del ángulo $A\\widehat{B}C$. <div>3</div></li>${CR(4)}
    </ol>
    </div><div class="page"></div>`;

    let Solucion = `<div class="ans"><b>Solución:</b>
    <br>a) Radio $r = ${r}$, Altura $h = ${h}$. Área $= \\pi r(r + \\sqrt{r^2+h^2}) \\approx ${surface_area.toFixed(2)}$.
    <br>b) $\\tan(A\\widehat{B}C) = \\frac{h}{r} \\Rightarrow A\\widehat{B}C = \\arctan(\\frac{${h}}{${r}}) \\approx ${angle.toFixed(2)}^\\circ$.</div>`;

    return [Pregunta, Solucion];
}

export async function renderGeoGebra(container) {
    const material_id = "w7z9v5p2"; // ID referencial para un cono básico en GGB
    const params = {
        appName: '3d',
        width: 500,
        height: 350,
        material_id: material_id,
        showToolBar: false,
        showAlgebraInput: false,
        appletOnLoad(api) {
            api.evalCommand(`C = (2, 3, 0)`);
            api.evalCommand(`A = (2, 3, 5)`);
            api.evalCommand(`B = (4, 3, 0)`);
            api.evalCommand(`Cono = Cone(C, A, 2)`);
            api.setCameraPosition([10, 10, 10]);
        }
    };
    new GGBApplet(params, true).inject('applet_container');
}