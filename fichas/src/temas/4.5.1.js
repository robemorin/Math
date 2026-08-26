import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Ficha: Pearson y Spearman
 * Importada de mate2/Fichas/fichas_estadistica.js
 * Tema 4.5 del temario.
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

function Milimetrado(Dim, Cuadricula) {
    Dim = [Dim * Cuadricula[0] / Cuadricula[1], Dim];
    var salida = "<center><svg width='" + (Dim[1] + 10) + "px' height='" + (Dim[0] + 10) + "px'><g transform='translate(5 5) scale(" + (Dim[1] / Cuadricula[1]) + ")'>";
    
    if (Cuadricula.length > 2) {
        for (var k = 0; k <= Cuadricula[0]; k += Cuadricula[2]) {
            salida += '<line x1="0" y1="' + k + '" x2="' + Cuadricula[1] + '" y2="' + k + '" stroke="RGB(256,200,100)"  stroke-width="' + (0.5 * Cuadricula[1] / Dim[1]) + '"/>';
        }
        for (var k = 0; k <= Cuadricula[1]; k += Cuadricula[2]) {
            salida += '<line x1="' + k + '" y1="0" x2="' + k + '" y2="' + Cuadricula[0] + '" stroke="RGB(256,200,100)"  stroke-width="' + (0.5 * Cuadricula[1] / Dim[1]) + '"/>';
        }
    }

    for (var k = 0; k <= Cuadricula[0]; ++k) {
        salida += '<line x1="0" y1="' + k + '" x2="' + Cuadricula[1] + '" y2="' + k + '" stroke="RGB(256,200,100)"  stroke-width="' + (2 * Cuadricula[1] / Dim[1]) + '"/>';
    }
    for (var k = 0; k <= Cuadricula[1]; ++k) {
        salida += '<line x1="' + k + '" y1="0" x2="' + k + '" y2="' + Cuadricula[0] + '" stroke="RGB(256,200,100)"  stroke-width="' + (2 * Cuadricula[1] / Dim[1]) + '"/>';
    }

    salida += '</g></svg></center>';
    return salida;
}

function M_mean(x) {
    var S = 0;
    for (var k = 0; k < x.length; ++k) S += x[k];
    return S / x.length;
}

function M_LinReg(x, y, op = null) {
    var n = x.length;
    var xm = M_mean(x);
    var ym = M_mean(y);
    var Sumxy = 0;
    var Sx = 0;
    for (var k = 0; k < n; ++k) {
        Sumxy += x[k] * y[k];
        Sx += Math.pow(x[k] - xm, 2);
    }
    var m = (Sumxy - n * xm * ym) / Sx;
    var b = ym - m * xm;
    if (op == 'ec') {
        let sign = b >= 0 ? '+' : '';
        return `y = ${m.toPrecision(3)}x ${sign} ${b.toPrecision(3)}`;
    }
    return [m, b];
}

function M_FacPearson(x, y) {
    const n = x.length;
    let Sumxy = 0;
    let Sumx = 0;
    let Sumx2 = 0;
    let Sumy = 0;
    let Sumy2 = 0;
    for (let k = 0; k < n; ++k) {
        Sumx += x[k];
        Sumx2 += x[k] * x[k];
        Sumy += y[k];
        Sumy2 += y[k] * y[k];
        Sumxy += x[k] * y[k];
    }
    return (n * Sumxy - Sumx * Sumy) / Math.sqrt((n * Sumx2 - Sumx * Sumx) * (n * Sumy2 - Sumy * Sumy));
}

function Spearman(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        throw new Error('Los arreglos tienen longitudes diferentes');
    }

    const arr1Copy = arr1.slice();
    const arr2Copy = arr2.slice();

    function compare(a, b) {
        return a - b;
    }

    arr1Copy.sort(compare);
    arr2Copy.sort(compare);

    function obtenerRangos(arr) {
        const ranks = {};
        for (let i = 0; i < arr.length; i++) {
            const val = arr[i];
            if (ranks[val] === undefined) {
                ranks[val] = [i + 1];
            } else {
                ranks[val].push(i + 1);
            }
        }
        return ranks;
    }

    const ranks1 = obtenerRangos(arr1Copy);
    const ranks2 = obtenerRangos(arr2Copy);

    let dSquared = 0;
    for (let i = 0; i < arr1Copy.length; i++) {
        const diff = ranks1[arr1[i]].reduce((acc, val) => acc + val, 0) / ranks1[arr1[i]].length -
            ranks2[arr2[i]].reduce((acc, val) => acc + val, 0) / ranks2[arr2[i]].length;
        dSquared += diff * diff;
    }

    const n = arr1Copy.length;
    return 1 - (6 * dSquared) / (n * (n * n - 1));
}

function cuartiles(arr) {
    let sorted = arr.slice().sort((a, b) => a - b);
    let n = sorted.length;
    let q2 = n % 2 === 0 ? (sorted[n/2 - 1] + sorted[n/2]) / 2 : sorted[Math.floor(n/2)];
    
    let lowerHalf = sorted.slice(0, Math.floor(n/2));
    let upperHalf = sorted.slice(Math.ceil(n/2));
    
    let n1 = lowerHalf.length;
    let q1 = n1 % 2 === 0 ? (lowerHalf[n1/2 - 1] + lowerHalf[n1/2]) / 2 : lowerHalf[Math.floor(n1/2)];
    
    let n2 = upperHalf.length;
    let q3 = n2 % 2 === 0 ? (upperHalf[n2/2 - 1] + upperHalf[n2/2]) / 2 : upperHalf[Math.floor(n2/2)];
    
    return `Mín: ${sorted[0]}, Q1: ${q1}, Med: ${q2}, Q3: ${q3}, Máx: ${sorted[n-1]}`;
}

function datos() {
    const x = [], y = [];
    const n = Math.round(Math.random() * 5 + 5);
    const m = (Math.random() * 10 + 1) * (Math.random() < 0.5 ? -1 : 1);
    const b = (Math.random() * 10 - 10);

    for (let k = 0; k < n; ++k) {
        x.push(Math.round(Math.random() * 20));
        y.push(Math.round((1 + Math.random() * .2) * (m * x[k] + b) + 5 * Math.random()));
    }
    return [x, y];
}

function tablaDatos(x, y) {
    let S = `<center><table class="tablaEspaciada" border="1" style="border-collapse: collapse; margin-bottom: 10px; width: 80%; text-align: center;"><tr><td style="border-right:solid black 1px; font-weight: bold; background-color: #f2f2f2;">$x$</td>`;
    let T = `</tr><tr><td style="border-right:solid black 1px; font-weight: bold; background-color: #f2f2f2;">$y$</td>`;
    for (let k = 0; k < x.length; ++k) {
        S += `<td style="padding: 5px;">${x[k]}</td>`;
        T += `<td style="padding: 5px;">${y[k]}</td>`;
    }
    return `${S}${T}</tr></table></center>`;
}

function media(x, y) {
    let xs = 0, ys = 0;
    let n = x.length;
    for (let k = 0; k < n; ++k) {
        xs += x[k];
        ys += y[k];
    }
    return [(xs / n).toPrecision(3), (ys / n).toPrecision(3)];
}

export function name() {
    return "Ficha: Pearson y Spearman";
}

export function tipo() {
    return 1;
}

export async function pregunta(np, code) {
    let Pregunta = `<div class="problema2" style="font-family: Arial, sans-serif; line-height: 1.6;">
    <hr>`;
    
    let [x, y] = datos();
    let Solucion = `<div class="ans"><b>Solucionario Sugerido:</b><br>
    <b>Problema 1:</b><br>
    <div>(1b) $M:(${media(x, y)[0]}, ${media(x, y)[1]})$</div> 
    <div>(1c) $${M_LinReg(x, y, 'ec')}$</div>
    <div>(1d) (i) X: ${cuartiles(x)}</div>
    <div>(1d) (ii) Y: ${cuartiles(y)}</div>
    <div>(1e) Pearson $r = ${M_FacPearson(x, y).toPrecision(3)}$, Spearman $r_s = ${Spearman(x,y).toFixed(3)}$</div><br>`;
    
    Pregunta += `
    <p>1. Considere los siguientes datos:</p>
    ${tablaDatos(x, y)}
    <ol class="FT_ol_a">
        <li>Use el siguiente espacio para graficar los datos<div>2</div></li>
        ${Milimetrado(400, [10, 20, .2])}
        <li>Escriba y grafique $M:(\\overline{x},\\overline{y})$<div>1</div></li>${CR(1)}
        <li>Escriba y grafique la línea de mejor ajuste<div>2</div> </li>${CR(1)}
        <li>Dibuje en el siguiente espacio las cajas de bigotes para:<br>
            eje $x$<br>
            ${Milimetrado(400, [3, 20, .2])}<br>
            eje $y$<br>
            ${Milimetrado(400, [3, 20, .2])}
        <div>2</div></li><div class="page"></div>
        <li>Calcule el valor de los factores de correlación de Pearson y Spearman<div>3</div></li>${CR(2)}
    </ol></div>`;

    Pregunta += `<div class="problema2" style="font-family: Arial, sans-serif; line-height: 1.6;">
    
    <p>2. Obtenga los factores de correlación de Pearson ($r$) y Spearman ($r_s$) para cada uno de los siguientes conjuntos de datos.</p>`;
    
    Solucion += `<b>Problema 2:</b><br>`;
    
    for (let it = 0; it < 3; ++it) {
        let [x1, y1] = datos();
        Solucion += `<div>(2-${it + 1}) Pearson: $r = ${M_FacPearson(x1, y1).toPrecision(3)}$, Spearman: $r_s = ${Spearman(x1, y1).toFixed(3)}$</div>`;
        Pregunta += `
        <div style="margin-top: 20px;">
            <b>Conjunto ${it + 1}</b>
            ${tablaDatos(x1, y1)}
            <div style="font-size: 1.1em;">
                Pearson $r$: ____________________ <br><br>
                Spearman $r_s$: ____________________ 
            </div>
            <div style="float: right; margin-top:-30px;">[3]</div>
        </div>${CR(2)}`;
    }
    
    Pregunta += `</div><div class="page"></div>`;
    Solucion += `</div>`;

    return [Pregunta, Solucion];
}

export async function render(container, n, code) {}
