import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Ficha: Línea de mejor ajuste
 * Importada de mate2/Fichas/fichas_estadistica.js
 * Tema 4.4 del temario.
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
    return "Ficha: Línea de mejor ajuste";
}

export function tipo() {
    return 1; // Ficha imprimible
}

export async function pregunta(np, code) {
    let Pregunta = `<div class="problema2" style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2 style="text-align:center;">Ficha de Trabajo: Línea de Mejor Ajuste</h2>
    <hr>`;
    let Solucion = `<div class="ans"><b>Solucionario Sugerido:</b><br>`;

    // --- Problema 1 ---
    let [x, y] = datos();
    Pregunta += `<h3>1. Análisis de dispersión I</h3>
    <p>Considere los siguientes datos bivariados:</p>
    ${tablaDatos(x, y)}
    <ol class="FT_ol_a">
        <li>Use el siguiente espacio para graficar los datos<div>2</div></li>
        ${Milimetrado(400, [10, 20, .2])}
        <li>Escriba y grafique $M:(\\overline{x},\\overline{y})$<div>1</div></li>${CR(1)}
        <li>Escriba y grafique la línea de mejor ajuste<div>2</div></li>${CR(1)}
        <li>Escriba el factor de correlación de Pearson $r$<div>2</div></li>${CR(1)}
    </ol></div><div class="page"></div>`;
    
    Solucion += `<b>Problema 1:</b><br>
    <div>(1b) Centro medio: $M(${media(x, y)[0]}, ${media(x, y)[1]})$</div>
    <div>(1c) Ecuación regresión: $ ${M_LinReg(x, y, 'ec')}$</div>
    <div>(1d) Pearson: $r = ${M_FacPearson(x, y).toPrecision(3)}$</div><br>`;

    // --- Problema 2 ---
    let [x1, y1] = datos();
    Pregunta += `<div class="problema2" style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h3>2. Análisis de dispersión II</h3>
    <p>Considere un segundo conjunto de datos:</p>
    ${tablaDatos(x1, y1)}
    <ol class="FT_ol_a">
        <li>Use el siguiente espacio para graficar los datos<div>2</div></li>
        ${Milimetrado(400, [10, 20, .2])}
        <li>Escriba y grafique $M:(\\overline{x},\\overline{y})$<div>1</div></li>${CR(1)}
        <li>Escriba y grafique la línea de mejor ajuste<div>2</div></li>${CR(1)}
        <li>Escriba el factor de correlación de Pearson $r$<div>2</div></li>${CR(1)}
    </ol></div><div class="page"></div>`;
    
    Solucion += `<b>Problema 2:</b><br>
    <div>(2b) Centro medio: $M(${media(x1, y1)[0]}, ${media(x1, y1)[1]})$</div>
    <div>(2c) Ecuación regresión: $ ${M_LinReg(x1, y1, 'ec')}$</div>
    <div>(2d) Pearson: $r = ${M_FacPearson(x1, y1).toPrecision(3)}$</div>
    </div>`;

    return [Pregunta, Solucion];
}

export async function render(container, n, code) {
    // No requiere renderizado interactivo, ficha imprimible
}
