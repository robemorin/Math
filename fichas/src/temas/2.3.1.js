import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Funciones a Trozos y Transformaciones (Fijo)';
}

export async function pregunta() {
    const Milimetrado = window.Milimetrado || tlacu.Milimetrado || function(w, arr){return `<div style="width: ${w}px; height: 300px; border: 1px solid #ccc; background-image: linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px); background-size: 20px 20px;"></div>`;};
    let Pregunta = "";
    let Solucion = "";

    // --- Problema 1 ---
    const f1_latex = `\\begin{cases} 2x + 5 & \\text{si } x \\le -1 \\\\ 3 & \\text{si } -1 < x \\le 2 \\\\ -x + 1 & \\text{si } x > 2 \\end{cases}`;

    Pregunta += `<div class="problema2">1.- Dada la siguiente función $f(x)$:
    <div>$f(x) = ${f1_latex}$</div>
    <ol class="FT_ol_a">
        <li>Calcula los siguientes valores: $f(-3), f(-1), f(2), f(2.001)$<div>3</div></li>
        <li>Dibuja la gráfica de $y = f(x)$ en el siguiente espacio.<div>3</div></li><br>${Milimetrado(400, [10, 20, .5])}
        <li>Dibuja la gráfica de $g(x) = f(x-1)$ en el espacio anterior, diferencialos apropiadamente.<div>2</div></li>
        <li>En un eje separado, dibuja la gráfica de la relación inversa.<div>2</div></li><br>${Milimetrado(400, [10, 20, .5])}
    </ol></div><div class="page"></div>`;

    Solucion += `<div class="ans">
    <div style="font-weight: bold;">Problema 1</div>
    <div>(1a) $f(-3) = -1$, $f(-1) = 3$, $f(2) = 3$, $f(2.001) = -1.001$</div>
    <div>(1b) (Ver gráfica)</div>
    <div>(1c) (Ver gráfica - Es f(x) trasladada 1 unidad a la derecha)</div>
    <div>(1d) (Ver gráfica - Es la gráfica de f(x) reflejada sobre y=x)</div>
    </div><br>`;

    // --- Problema 2 ---
    const f2_latex = `\\begin{cases} -x + 2 & \\text{si } x < 1 \\\\ (x-1)^2 + 1 & \\text{si } x \\ge 1 \\end{cases}`;

    Pregunta += `<div class="problema2">2.- Dada la función $g(x)$:
    <div>$g(x) = ${f2_latex}$</div>
    <ol class="FT_ol_a">
        <li>Calcula los valores de $g(0)$, $g(1)$ y $g(3)$.<div>2</div></li>
        <li>Dibuja la gráfica de $g(x)$ y $0.5g(x+1)$ en el siguiente espacio.<div>3</div></li><br>${Milimetrado(400, [10, 20, .5])}
    </ol></div><div class="page"></div>`;

    Solucion += `<div class="ans">
    <div style="font-weight: bold;">Problema 2</div>
    <div>(2a) $g(0) = 2$, $g(1) = 1$, $g(3) = 5$</div>
    <div>(2b) (Ver gráfica)</div>
    </div><br>`;

    // --- Problema 3 ---
    const f3_latex = `\\begin{cases} 4 & \\text{si } x \\le -2 \\\\ x^2 & \\text{si } -2 < x < 2 \\\\ 5-x & \\text{si } x \\ge 2 \\end{cases}`;

    Pregunta += `<div class="problema2">3.- Dada la función $h(x)$:
    <div>$h(x) = ${f3_latex}$</div>
    <ol class="FT_ol_a">
        <li>Calcula los valores de $h(-5)$, $h(0)$, $h(2)$ y $h(5)$.<div>2</div></li>
        <li>Dibuja la gráfica de $h(x)$ y su relación inversa en el siguiente espacio.<div>3</div></li><br>${Milimetrado(400, [10, 20, .5])}
    </ol></div>`;

    Solucion += `<div class="ans">
    <div style="font-weight: bold;">Problema 3</div>
    <div>(3a) $h(-5) = 4$, $h(0) = 0$, $h(2) = 3$, $h(5) = 0$</div>
    <div>(3b) (Ver gráfica)</div>
    </div>`;

    return [Pregunta, Solucion];
}
