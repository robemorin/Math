import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Línea tangente y normal';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    const Milimetrado = window.Milimetrado || tlacu.Milimetrado || function(w, arr){return `<div style="width: ${w}px; height: 300px; border: 1px solid #ccc; background-image: linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px); background-size: 20px 20px;"></div>`;};

    // --- Problema 1: Tangente ---
    let dummy1 = Math.round(Math.random() * 3 - 3);
    let a1 = Math.ceil(Math.random() * 4) * Math.pow(10, dummy1) * (Math.random() < 0.5 ? 1 : -1);
    let q1 = Math.ceil((Math.random() * 6 + 2)) * (Math.random() < 0.5 ? 1 : -1);
    let x0_1 = Math.round((q1 < 0 ? -1 : 1) * (Math.random() * (Math.abs(q1) - 1) + 0.5));

    let Pregunta = `<div class="problema2">1.- Considere a $f(x) = ${a1.toFixed(-dummy1)}x^2${(a1 * q1 < 0 ? '+' : '-') + Math.abs(2 * a1 * q1).toPrecision(2)}x$
    <ol class="FT_ol_a">
        <li>Escriba las raíces de $f(x)$ <div>1</div></li>
        <li>Grafique la función en el siguiente espacio de tal manera que aparezcan las dos raices en la gráfica<div>2</div></li><br>${Milimetrado(500, [10, 20, .2])}
        <li>Escriba la derivada de $f(x)$<div>2</div></li>${CR(1)}
        <li>Escriba el valor de $f(${x0_1}).$<div>1</div></li>${CR(1)}
        <li>Escriba el valor de $f'(${x0_1}).$<div>1</div></li>${CR(1)}
        <li>Calcule y dibuje la ecuación de la línea tangente para $x=${x0_1}$.<div>3</div></li>${CR(5)}
    </ol></div><div class="page"></div>`;
    
    let m1 = 2 * a1 * x0_1 - 2 * a1 * q1;
    let y0_1 = a1 * Math.pow(x0_1, 2) - 2 * a1 * q1 * x0_1;
    let Solucion = `<div class="ans">
        <div style="font-weight: bold;">Problema 1</div>
        <div>(1a) $x=0,${2 * q1}$</div>
        <div>(1c) $f'(x) = ${(2 * a1).toFixed(-dummy1)}x${(a1 * q1 < 0 ? '+' : '-') + Math.abs(2 * a1 * q1).toPrecision(2)}$</div>
        <div>(1d) $f(${x0_1}) = ${(y0_1.toFixed(-dummy1))}$</div>
        <div>(1e) $f'(${x0_1}) = ${(m1).toFixed(-dummy1)}$</div>
        <div>(1f) $y = ${m1.toFixed(-2 * dummy1)}x+${(y0_1 - m1 * x0_1).toFixed(-2 * dummy1)}$</div>
    </div><br>`;

    // --- Problema 2: Normal ---
    let dummy2 = Math.round(Math.random() * 3 - 3);
    let a2 = Math.ceil(Math.random() * 4) * Math.pow(10, dummy2) * (Math.random() < 0.5 ? 1 : -1);
    let q2 = Math.ceil((Math.random() * 6 + 2)) * (Math.random() < 0.5 ? 1 : -1);
    let x0_2 = Math.round((q2 < 0 ? -1 : 1) * (Math.random() * (Math.abs(q2) - 1) + 0.5));

    Pregunta += `<div class="problema2">2.- Considere a $f(x) = ${a2.toFixed(-dummy2)}x^2${(a2 * q2 < 0 ? '+' : '-') + Math.abs(2 * a2 * q2).toPrecision(2)}x$
    <ol class="FT_ol_a">
        <li>Escriba las raíces de $f(x)$ <div>1</div></li>
        <li>Grafique la función en el siguiente espacio de tal manera que aparezcan las dos raices en la gráfica<div>2</div></li><br>${Milimetrado(500, [10, 20, .2])}
        <li>Escriba la derivada de $f(x)$<div>2</div></li>${CR(1)}
        <li>Calcule y dibuje la ecuación de la línea tangente para $x=${x0_2}$.<div>1</div></li>${CR(5)}
        <li>Calcule la ecuación de la línea normal para $x=${x0_2}$.<div>2</div></li>${CR(5)}
        <li>Dibuje la línea normal a $f(x)$ en el punto $(${x0_2},f(${x0_2}))$<div>2</div></li>
    </ol></div>`;
    
    let m2 = 2 * a2 * x0_2 - 2 * a2 * q2;
    let mp2 = -1 / m2;
    let y0_2 = a2 * Math.pow(x0_2, 2) - 2 * a2 * q2 * x0_2;
    Solucion += `<div class="ans">
        <div style="font-weight: bold;">Problema 2</div>
        <div>(2a) $x=0,${2 * q2}$</div>
        <div>(2c) $f'(x) = ${(2 * a2).toFixed(-dummy2)}x${(a2 * q2 < 0 ? '+' : '-') + Math.abs(2 * a2 * q2).toPrecision(2)}$</div>
        <div>(2d) $y = ${m2.toFixed(-2 * dummy2)}x+${(y0_2 - m2 * x0_2).toFixed(-2 * dummy2)}$</div>
        <div>(2e) $y = ${mp2.toFixed(-2 * dummy2)}x+${(y0_2 - mp2 * x0_2).toFixed(-2 * dummy2)}$</div>
    </div>`;

    return [Pregunta, Solucion];
}
