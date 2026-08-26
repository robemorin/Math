import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Ficha: Línea tangente y normal
 * Importada de mate2/Fichas/fichas_analisis.js
 * Tema 5.2 del temario.
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

export function name() {
    return "Ficha: Línea tangente y normal";
}

export function tipo() {
    return 1; // Ficha imprimible
}

export async function pregunta(np, code) {
    let dummy = Math.round(Math.random() * 3 - 3);
    let a = Math.ceil(Math.random() * 4) * Math.pow(10, dummy) * (Math.random() < 0.5 ? 1 : -1);
    let q = Math.ceil((Math.random() * 6 + 2)) * (Math.random() < 0.5 ? 1 : -1);
    let x0 = Math.round((q < 0 ? -1 : 1) * (Math.random() * (Math.abs(q) - 1) + 0.5));

    let Pregunta = `<div class="problema2" style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2 style="text-align:center;">Ficha de Trabajo: Línea tangente y normal</h2>
    <hr>
    <h3>1. Análisis y recta tangente</h3>
    <p>Considere a $f(x) = ${a.toFixed(-dummy)}x^2${(a * q < 0 ? '+' : '-') + Math.abs(2 * a * q).toPrecision(2)}x$</p>
    <ol class="FT_ol_a">
        <li>Escriba las raíces de $f(x)$ <div>1</div></li>
        <li>Grafique la función en el siguiente espacio de tal manera que aparezcan las dos raices en la gráfica<div>2</div></li>
        ${Milimetrado(400, [10, 20, .2])}
        <li>Escriba la derivada de $f(x)$<div>2</div></li>${CR(1)}
        <li>Escriba el valor de $f(${x0}).$<div>1</div></li>${CR(1)}
        <li>Escriba el valor de $f'(${x0}).$<div>1</div></li>${CR(1)}
        <li>Calcule y dibuje la ecuación de la línea tangente para $x=${x0}$.<div>3</div></li>${CR(3)}
    </ol>
    </div>`;

    let m = 2 * a * x0 - 2 * a * q;
    let y0 = a * x0 ** 2 - 2 * a * q * x0;
    
    let Solucion = `<div class="ans"><b>Solucionario Sugerido:</b><br>
    <b>Problema 1:</b><br>
    <div>(1a) Raíces: $x=0,\\, ${2 * q}$</div>
    <div>(1c) Derivada: $f'(x) = ${(2 * a).toFixed(-dummy)}x${(a * q < 0 ? '+' : '-') + Math.abs(2 * a * q).toPrecision(2)}$</div>
    <div>(1d) Valor función: $f(${x0}) = ${(y0.toFixed(-dummy))}$</div>
    <div>(1e) Pendiente tangente: $f'(${x0}) = ${(m).toFixed(-dummy)}$</div>
    <div>(1f) Ecuación tangente: $y = ${m.toFixed(-2 * dummy)}x+(${(y0 - m * x0).toFixed(-2 * dummy)})$</div><br>`;


    // Problema 2
    dummy = Math.round(Math.random() * 3 - 3);
    a = Math.ceil(Math.random() * 4) * Math.pow(10, dummy) * (Math.random() < 0.5 ? 1 : -1);
    q = Math.ceil((Math.random() * 6 + 2)) * (Math.random() < 0.5 ? 1 : -1);
    x0 = Math.round((q < 0 ? -1 : 1) * (Math.random() * (Math.abs(q) - 1) + 0.5));

    Pregunta += `<div class="page"></div><div class="problema2" style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h3>2. Análisis y recta normal</h3>
    <p>Considere a $f(x) = ${a.toFixed(-dummy)}x^2${(a * q < 0 ? '+' : '-') + Math.abs(2 * a * q).toPrecision(2)}x$</p>
    <ol class="FT_ol_a">
        <li>Escriba las raíces de $f(x)$ <div>1</div></li>
        <li>Grafique la función en el siguiente espacio de tal manera que aparezcan las dos raices en la gráfica<div>2</div></li>
        ${Milimetrado(400, [10, 20, .2])}
        <li>Escriba la derivada de $f(x)$<div>2</div></li>${CR(1)}
        <li>Calcule y dibuje la ecuación de la línea tangente para $x=${x0}$.<div>1</div></li>${CR(3)}
        <li>Calcule la ecuación de la línea normal para $x=${x0}$.<div>2</div></li>${CR(3)}
        <li>Dibuje la línea normal a $f(x)$ en el punto $(${x0},f(${x0}))$<div>2</div></li>
    </ol>
    </div>
    <div class="page"></div>`;

    m = 2 * a * x0 - 2 * a * q;
    let mp = -1 / m;
    y0 = a * x0 ** 2 - 2 * a * q * x0;
    
    Solucion += `<b>Problema 2:</b><br>
    <div>(2a) Raíces: $x=0,\\, ${2 * q}$</div>
    <div>(2c) Derivada: $f'(x) = ${(2 * a).toFixed(-dummy)}x${(a * q < 0 ? '+' : '-') + Math.abs(2 * a * q).toPrecision(2)}$</div>
    <div>(2d) Ecuación tangente: $y = ${m.toFixed(-2 * dummy)}x+(${(y0 - m * x0).toFixed(-2 * dummy)})$</div>
    <div>(2e) Ecuación normal: $y = ${mp.toFixed(-2 * dummy)}x+(${(y0 - mp * x0).toFixed(-2 * dummy)})$</div>
    </div>`;

    return [Pregunta, Solucion];
}

export async function render(container, n, code) {
    // No requiere interacción adicional, es imprimible
}
