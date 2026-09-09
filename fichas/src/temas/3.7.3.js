import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'D. Voronoi (+3 coordenadas)';
}

function createSVG(dim = [300, 200]) {
    let SVG = document.createElement('svg');
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
                group += `<text x="${p[0]}" y="${p[1]+12}" fill="black" style="font: italic 12px sans-serif;" text-anchor="middle">${k * lim[4][0]}</text>`;
            }
        }
        for (let k = Math.floor(lim[2] / lim[4][1]); k <= Math.ceil(lim[3] / lim[4][1]); ++k) {
            if (k != 0) {
                let p = coo2px([0, k * lim[4][1]], dim, lim);
                group += `<text x="${p[0]+4}" y="${p[1]+4}" fill="black" style="font: italic 12px sans-serif;">${k * lim[4][1]}</text>`;
            }
        }
    }
    
    SVG.innerHTML = group;
    return SVG.outerHTML;
}

export async function pregunta() {
    function manyCoordinates(n) {
        function arrayRepetido(P) {
            let n = P.length - 1;
            for (let k = 0; k < n; ++k) {
                if ((P[k][0] == P[n][0]) && (P[k][1] == P[n][1])) {
                    return true;
                }
            }
            return false;
        }
        const xlim = [-10, 10];
        const ylim = [-9, 9];
        const P = [];
        for (let k = 0; k < n; ++k) {
            do {
                P[k] = [Math.round(Math.random() * (xlim[1] - xlim[0]) + xlim[0]), Math.round(Math.random() * (ylim[1] - ylim[0]) + ylim[0])];
            } while (arrayRepetido(P));
        }
        return P;
    }

    function displayP(P) {
        const n = P.length;
        let S = "";
        for (let k = 0; k < n; ++k) {
            S += (k != n - 1 ? (k == 0 ? '' : ', ') : ' y ');
            S += `$${String.fromCharCode('A'.charCodeAt(0) + k)} = (${P[k]})$`;
        }
        return S;
    }

    let Pregunta = "";
    
    let P1 = manyCoordinates(4);
    Pregunta += `<div class="problema2">1.- Realice el diagrama de Voronoi con los puntos ${displayP(P1)}.<div class="mark">5</div>
        <br><center><tlacuache-ejes size="320,320" xlabel="" ylabel="" xlim="-10,10" ylim="-10,10" dx="2" dy="2" ddx="1" ddy="1">
 </tlacuache-ejes></center></div>`;
        
    let P2 = manyCoordinates(4);
    Pregunta += `<div class="problema2">2.- Realice el diagrama de Voronoi con los puntos ${displayP(P2)}.<div class="mark">5</div>
        <br><center><center><tlacuache-ejes size="320,320" xlabel="" ylabel="" xlim="-10,10" ylim="-10,10" dx="2" dy="2" ddx="1" ddy="1">
 </tlacuache-ejes></center></center></div><div class="page"></div>`;
        
    let P3 = manyCoordinates(4);
    Pregunta += `<div class="problema2">3.- Realice el diagrama de Voronoi con los puntos ${displayP(P3)}.<div class="mark">5</div>
        <br><center><center><tlacuache-ejes size="380,380" xlabel="" ylabel="" xlim="-10,10" ylim="-10,10" dx="2" dy="2" ddx="1" ddy="1">
 </tlacuache-ejes></center></center></div>`;
        
    let P4 = manyCoordinates(5);
    Pregunta += `<div class="problema2">4.- Realice el diagrama de Voronoi con los puntos ${displayP(P4)}.<div class="mark">5</div>
        <br><center><tlacuache-ejes size="380,380" xlabel="" ylabel="" xlim="-10,10" ylim="-10,10" dx="2" dy="2" ddx="1" ddy="1">
 </tlacuache-ejes></center></div>`;

    let Solucion = `<div class="ans">Resolución geométrica directa visual esperada. No hay texto para respuesta.</div>`;
    return [Pregunta, Solucion];
}
