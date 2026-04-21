import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'D. Voronoi (3 coordenadas)';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

function simplify_frac(a) {
    function mcd_new(x, y) {
        if (y === 0) return x;
        return mcd_new(y, x % y);
    }
    let mcd = mcd_new(a[0], a[1]);
    mcd *= mcd * a[1] < 0 ? -1 : 1;
    return [a[0] / mcd, a[1] / mcd];
}

function fraccion(a, b, op = false) {
    if (b == 0) return `${a < 0 ? '-' : ''}\\infty`;
    else if (a == 0) return 0;
    let den = simplify_frac([a, b]);
    if (Math.abs(den[1]) == 1) return den[0] * den[1];
    if (!op) {
        const sig = den[1] < 0 ? -1 : 1;
        return `\\frac{${sig * den[0]}}{${sig * den[1]}}`;
    } else {
        const sig = den[0] * den[1] < 0 ? '-' : '';
        return `${sig}\\frac{${Math.abs(den[0])}}{${Math.abs(den[1])}}`;
    }
}

function createSVG(dim = [300, 200]) {
    let SVG = document.createElement('svg');
    // Emular el NS para toString literal
    SVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    SVG.setAttribute("width", dim[0] + "px");
    SVG.setAttribute("height", dim[1] + "px");
    SVG.setAttribute('fill', 'none');
    SVG.setAttribute('stroke', 'black');
    return SVG;
}

function createAxis(lim = [-1, 1, -1, 1, [0.5, 0.5]], dim = [300, 200]) {
    function coo2px(P, dim, lim) {
        const m = [(dim[0] - 40) / (lim[1] - lim[0]), -(dim[1] - 40) / (lim[3] - lim[2])];
        const b = [20 - m[0] * lim[0], 20 - m[1] * lim[3]];
        return [m[0] * P[0] + b[0], m[1] * P[1] + b[1]];
    }
    let SVG = createSVG(dim);
    let group = "";

    // Cuadricula principal
    if (lim.length > 4) {
        for (let k = Math.floor(lim[0] / lim[4][0]); k <= Math.ceil(lim[1] / lim[4][0]); ++k) {
            let p1 = coo2px([k * lim[4][0], lim[2]], dim, lim);
            let p2 = coo2px([k * lim[4][0], lim[3]], dim, lim);
            group += `<line x1="${p1[0]}" y1="${p1[1]}" x2="${p2[0]}" y2="${p2[1]}" stroke="#FE7200" stroke-width="1"></line>`;
        }
        for (let k = Math.floor(lim[2] / lim[4][1]); k <= Math.ceil(lim[3] / lim[4][1]); ++k) {
            let p1 = coo2px([lim[0], k * lim[4][1]], dim, lim);
            let p2 = coo2px([lim[1], k * lim[4][1]], dim, lim);
            group += `<line x1="${p1[0]}" y1="${p1[1]}" x2="${p2[0]}" y2="${p2[1]}" stroke="#FE7200" stroke-width="1"></line>`;
        }
    }
    // Ejes principales
    let xAxis1 = coo2px([lim[0], 0], dim, lim), xAxis2 = coo2px([lim[1], 0], dim, lim);
    group += `<line x1="${xAxis1[0]}" y1="${xAxis1[1]}" x2="${xAxis2[0]}" y2="${xAxis2[1]}" stroke="#FE7200" stroke-width="2"></line>`;

    let yAxis1 = coo2px([0, lim[2]], dim, lim), yAxis2 = coo2px([0, lim[3]], dim, lim);
    group += `<line x1="${yAxis1[0]}" y1="${yAxis1[1]}" x2="${yAxis2[0]}" y2="${yAxis2[1]}" stroke="#FE7200" stroke-width="2"></line>`;

    if (lim.length > 4) {
        for (let k = Math.floor(lim[0] / lim[4][0]); k <= Math.ceil(lim[1] / lim[4][0]); ++k) {
            if (k != 0) {
                let p = coo2px([k * lim[4][0], 0], dim, lim);
                group += `<text x="${p[0]}" y="${p[1] + 12}" fill="black" style="font: italic 12px sans-serif;" text-anchor="middle">${k * lim[4][0]}</text>`;
            }
        }
        for (let k = Math.floor(lim[2] / lim[4][1]); k <= Math.ceil(lim[3] / lim[4][1]); ++k) {
            if (k != 0) {
                let p = coo2px([0, k * lim[4][1]], dim, lim);
                group += `<text x="${p[0] + 4}" y="${p[1] + 4}" fill="black" style="font: italic 12px sans-serif;">${k * lim[4][1]}</text>`;
            }
        }
    }

    SVG.innerHTML = group;
    return SVG.outerHTML;
}

export async function pregunta() {
    let A = [], B = [], C = [];
    let angle = 0, Dangle;

    do {
        Dangle = Math.random() * .2 + 1.8;
        let r = Math.random() * 10 + 2;
        A = [Math.round((r + 1) * Math.cos(angle + Dangle)), Math.round((r + 1) * Math.sin(angle + Dangle))];
    } while (!(-10 < A[0] && A[0] < 10 && -10 < A[1] && A[1] < 10));
    angle += Dangle;

    do {
        Dangle = Math.random() * .2 + 1.8;
        let r = Math.random() * 10 + 2;
        B = [Math.round((r + 1) * Math.cos(angle + Dangle)), Math.round((r + 1) * Math.sin(angle + Dangle))];
    } while (!(-10 < B[0] && B[0] < 10 && -10 < B[1] && B[1] < 10));
    angle += Dangle;

    do {
        Dangle = Math.random() * .2 + 1.8;
        let r = Math.random() * 10 + 2;
        C = [Math.round((r + 1) * Math.cos(angle + Dangle)), Math.round((r + 1) * Math.sin(angle + Dangle))];
    } while (!(-10 < C[0] && C[0] < 10 && -10 < C[1] && C[1] < 10));

    let Pregunta = `<div class="problema2">1.- Considere que $A:(${A})$, $B:(${B})$ y $C:(${C})$.
        <br><center><tlacuache-ejes size="430,430" xlabel="" ylabel="" xlim="-10,10" ylim="-10,10" dx="2" dy="2" ddx="1" ddy="1">
 </tlacuache-ejes></center>
        <ol class="FT_ol_a">
        <li>Ubique los puntos $A$, $B$ y $C$ en el plano cartesiano <div>3</div></li>
        <li>Calcule el punto medio del segmento $\\overline{AB}$<div>1</div></li>   
        <li>Calcule la pendiente del segmento $\\overline{AB}$ <div>1</div></li>
        <li>Calcule la pendiente de la mediatriz del segmento $\\overline{AB}$<div>1</div></li>
        <li>Coloque los puntos medios de los segmentos $\\overline{AB}$, $\\overline{AC}$ y $\\overline{BC}$ en la gráfica <div>1</div> </li>
        <li>Trace las mediatrices de los segmentos $\\overline{AB}$, $\\overline{AC}$ y $\\overline{BC}$ con una línea poco remarcada <div>3</div> </li>
        <li>Usando las mediatrices dibujadas. Grafique el diagrama de Voronoi correspondiente. Resáltelo claramente.<div>5</div></li>
        </ol></div><div class="page"></div>`;

    let pm = [simplify_frac([A[0] + B[0], 2]), simplify_frac([A[1] + B[1], 2])];
    let mab = simplify_frac([A[1] - B[1], A[0] - B[0]]);
    let mpab = simplify_frac([-mab[1], mab[0]]);

    let Solucion = `<div class="ans">
        <div style="font-weight: bold;">Problema 1</div>
        <div>(1b) $P_{AB}=(${fraccion(pm[0][0], pm[0][1])},${fraccion(pm[1][0], pm[1][1])}) $</div>
        <div>(1c) $m_{AB}=${fraccion(mab[0], mab[1])}$</div>
        <div>(1d) $m^p_{AB}=${fraccion(mpab[0], mpab[1], true)}$</div>
    </div><br>`;

    // --- Problema 2 ---
    angle = 0;
    do {
        Dangle = Math.random() * .2 + 1.8;
        let r = Math.random() * 10 + 2;
        A = [Math.round((r + 1) * Math.cos(angle + Dangle)), Math.round((r + 1) * Math.sin(angle + Dangle))];
    } while (!(-10 < A[0] && A[0] < 10 && -10 < A[1] && A[1] < 10));
    angle += Dangle;

    do {
        Dangle = Math.random() * .2 + 1.8;
        let r = Math.random() * 10 + 2;
        B = [Math.round((r + 1) * Math.cos(angle + Dangle)), Math.round((r + 1) * Math.sin(angle + Dangle))];
    } while (!(-10 < B[0] && B[0] < 10 && -10 < B[1] && B[1] < 10));
    angle += Dangle;

    do {
        Dangle = Math.random() * .2 + 1.8;
        let r = Math.random() * 10 + 2;
        C = [Math.round((r + 1) * Math.cos(angle + Dangle)), Math.round((r + 1) * Math.sin(angle + Dangle))];
    } while (!(-10 < C[0] && C[0] < 10 && -10 < C[1] && C[1] < 10));

    Pregunta += `<div class="problema2">2.- En el siguiente plano realice el diagrama de Voronoi cuyas semillas (sitios) son $A:(${A})$, $B:(${B})$ y $C:(${C})$    <br><center>
    <tlacuache-ejes size="430,430" xlabel="" ylabel="" xlim="-10,10" ylim="-10,10" dx="2" dy="2" ddx="1" ddy="1">
 </tlacuache-ejes>
    <center><div class="mark">5</div></div>`;

    Solucion += `<div class="ans">
    <div style="font-weight: bold;">Problema 2</div>
    <div>(Gráfico visual unicamente, unir mediatrices trazadas).</div>
    </div>`;

    return [Pregunta, Solucion];
}
