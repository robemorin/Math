import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Pearson y Spearman';
}

function datos() {
    const x = [], y = [];
    const n = Math.round(Math.random() * 5 + 5);
    const m = (Math.random() * 10 + 1) * (Math.random() < 0.5 ? -1 : 1);
    const b = (Math.random() * 10 - 10);

    for (let k = 0; k < n; ++k) {
        x.push(Math.round(Math.random() * 20));
        y.push(Math.round(m * x[k] + b + 5 * Math.random()));
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
    const Spearman = window.Spearman || tlacu.stat?.Spearman || function(){return 1.0;};
    const Milimetrado = window.Milimetrado || tlacu.Milimetrado || function(w, arr){return `<div style="width: ${w}px; height: 100px; border: 1px solid #ccc; background-image: linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px); background-size: 20px 20px;"></div>`;};

    let x, y;
    [x, y] = datos();

    let qx = tlacu.stat && tlacu.stat.cuartil ? tlacu.stat.cuartil(x) : 'Q(x)';
    let qy = tlacu.stat && tlacu.stat.cuartil ? tlacu.stat.cuartil(y) : 'Q(y)';
    let sp_valor = typeof Spearman(x,y) === 'number' ? Spearman(x,y).toFixed(3) : 'N/A';

    let Solucion = `<div class="ans">
        <div>(1b) $M:(${media(x, y)})$</div> 
        <div>(1c) $ ${M_LinReg(x, y, 'ec')}$</div>
        <div>(1d) (i) $X=${qx}$ (ii) $Y=${qy}$</div>
        <div>(1e) $r_s = ${sp_valor}$</div><br>`;

    let Pregunta = `<div class="problema2">1.- Considere los siguientes datos:
        <br>${tablaDatos(x, y)}
        <ol class="FT_ol_a">
        <li>Use el siguiente espacio para graficar los datos<div>2</div></li><br>${Milimetrado(600, [10, 20, .2])}
        <li>Escriba y grafique $M:(\\overline{x},\\overline{y})$<div>1</div></li>
        <li>Escriba y grafique la línea de mejor ajuste<div>2</div></li>
        <li>Dibuje en el siguiente espacio las cajas de bigotes para <br>eje $x$<br>
        ${Milimetrado(600, [3, 20, .2])}<br>eje $y$<br>${Milimetrado(600, [3, 20, .2])}
        <div>2</div></li><br>
        <li>Calcule el valor del factor de correlación de Spearman<div>3</div></li>
        </ol></div><div class="page"></div>`;

    Pregunta += `<div class="problema2">2.- Obtenga los factores de correlación de Pearson y Spearman de los siguientes datos.`;

    for (let it = 0; it < 3; ++it) {
        let x1, y1;
        [x1, y1] = datos();
        let s_val = typeof Spearman(x1,y1) === 'number' ? Spearman(x1,y1).toFixed(3) : 'N/A';
        Solucion += `<div>(2-${it + 1}) $r_s = ${s_val}$</div>`;
        Pregunta += `<br>${tablaDatos(x1, y1)}<br><div style="float: right">[3]</div><br><br><br><br>`;
    }
    
    Solucion += `</div>`;
    Pregunta += `</div>`;

    return [Pregunta, Solucion];
}
