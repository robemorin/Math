import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Línea de mejor ajuste';
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
    let S = `<center><table class="tablaEspaciada"><tr><td style="border-right:solid black 1px">$x$</td>`;
    let T = `</tr><tr><td style="border-right:solid black 1px">$y$</td>`;
    for (let k = 0; k < x.length; ++k) {
        S += `<td>${x[k]}</td>`;
        T += `<td>${y[k]}</td>`;
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

export async function pregunta() {
    const M_LinReg = window.M_LinReg || tlacu.stat?.M_LinReg || function(){return "y=mx+b";};
    const M_FacPearson = window.M_FacPearson || tlacu.stat?.M_FacPearson || function(){return 1.0;};
    const Milimetrado = window.Milimetrado || tlacu.Milimetrado || function(w, arr){return `<div style="width: ${w}px; height: 300px; border: 1px solid #ccc; background-image: linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px); background-size: 20px 20px;"></div>`;};

    let x, y;
    [x, y] = datos();
    let Solucion = `<div class="ans">
        <div>(1b) $M:(${media(x, y)})$</div>
        <div>(1c) $ ${M_LinReg(x, y, 'ec')}$</div>
        <div>(1d) $r = ${typeof M_FacPearson(x,y) === 'number' ? M_FacPearson(x, y).toPrecision(3) : 'N/A'}$</div><br>`;
    
    let Pregunta = `<div class="problema2">1.- Considere los siguientes datos:
        <br>${tablaDatos(x, y)}
        <ol class="FT_ol_a">
        <li>Use el siguiente espacio para graficar los datos<div>2</div></li><br>${Milimetrado(600, [10, 20, .2])}
        <li>Escriba y grafique $M:(\\overline{x},\\overline{y})$<div>1</div></li>
        <li>Escriba y grafique la línea de mejor ajuste<div>2</div></li>
        <li>Escriba el factor de correlación de Pearson<div>2</div></li>
        </ol></div><div class="page"></div>`;

    // Generar la segunda pregunta exactamente como la ficha original
    let x1, y1;
    [x1, y1] = datos();
    Solucion += `
        <div>(2b) $M:(${media(x1, y1)})$</div>
        <div>(2c) $ ${M_LinReg(x1, y1, 'ec')}$</div>
        <div>(2d) $r = ${typeof M_FacPearson(x1,y1) === 'number' ? M_FacPearson(x1, y1).toPrecision(3) : 'N/A'}$</div>
    </div>`;

    Pregunta += `<div class="problema2">2.- Considere los siguientes datos:
        <br>${tablaDatos(x1, y1)}
        <ol class="FT_ol_a">
        <li>Use el siguiente espacio para graficar los datos<div>2</div></li><br>${Milimetrado(600, [10, 20, .2])}
        <li>Escriba y grafique $M:(\\overline{x},\\overline{y})$<div>1</div></li>
        <li>Escriba y grafique la línea de mejor ajuste<div>2</div></li>
        <li>Escriba el factor de correlación de Pearson<div>2</div></li>
        </ol></div>`;

    return [Pregunta, Solucion];
}
