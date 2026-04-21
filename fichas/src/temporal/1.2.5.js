import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Sucesiones Aritméticas';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // --- Problema 1: Identificación y término general ---
    let u1_1 = Math.floor(Math.random() * 5) + 2;
    let d_1 = Math.floor(Math.random() * 4) + 2;
    let n_1 = 10 + Math.floor(Math.random() * 10);
    let seq1 = [u1_1, u1_1 + d_1, u1_1 + 2 * d_1, u1_1 + 3 * d_1];

    let Pregunta = `<div class="problema2">1.- Considere la sucesión aritmética: $${seq1.join(', ')}, \\dots$
    <ol class="FT_ol_a">
        <li>Indique el primer término $u_1$ y la diferencia común $d$. <div>2</div></li>${CR(1)}
        <li>Halle una expresión para el término general $u_n$. <div>2</div></li>${CR(1)}
        <li>Calcule el valor del término $u_{${n_1}}$. <div>2</div></li>${CR(1)}
    </ol></div>`;

    let un_1 = u1_1 + (n_1 - 1) * d_1;
    let Solucion = `<div class="ans"><b>P1:</b> (1a) $u_1 = ${u1_1}, d = ${d_1}$ (1b) $u_n = ${u1_1} + (n-1)${d_1}$ (1c) $u_{${n_1}} = ${un_1}$</div><br>`;

    // --- Problema 2: Propiedad de la media aritmética ---
    let x = Math.floor(Math.random() * 10) + 5;
    let u1_2 = x - 2;
    let u2_2 = x + 3;
    let u3_2 = 2 * u2_2 - u1_2;

    Pregunta += `<div class="problema2">2.- En una sucesión aritmética, tres términos consecutivos son $${u1_2}, ${u2_2}$ y $y$.
    <ol class="FT_ol_a">
        <li>Halle el valor de $y$ utilizando la propiedad de la media aritmética. <div>2</div></li>${CR(1)}
        <li>Si $u_1 = ${u1_2}$, determine la posición $n$ en la que el término alcanza el valor $${u1_2 + 5 * (u2_2 - u1_2)}$. <div>3</div></li>${CR(1)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> (2a) $y = ${u3_2}$ (2b) $n = 6$</div><br>`;

    // --- Problema 3: Uso de la fórmula general ---
    let u1_3 = Math.floor(Math.random() * 10) + 10;
    let d_3 = -2;
    let term_val = u1_3 + 15 * d_3;

    Pregunta += `<div class="problema2">3.- Dada una sucesión aritmética donde $u_1 = ${u1_3}$ y $d = ${d_3}$:
    <ol class="FT_ol_a">
        <li>¿Es posible que un término de esta sucesión sea igual a $${term_val}$? Justifique su respuesta. <div>3</div></li>${CR(2)}
        <li>Halle el término $u_{20}$. <div>2</div></li>${CR(1)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P3:</b> (3a) Sí, es el término $n=16$ (3b) $u_{20} = ${u1_3 + 19 * d_3}$</div><br>`;

    // --- Problema 4: Sistema de ecuaciones ---
    let d_4 = Math.floor(Math.random() * 3) + 2;
    let u3_4 = 10 + Math.floor(Math.random() * 5);
    let u1_4 = u3_4 - 2 * d_4;

    Pregunta += `<div class="problema2">4.- En una sucesión aritmética, se sabe que $u_3 = ${u3_4}$ y $u_5 = ${u3_4 + 2 * d_4}$.
    <ol class="FT_ol_a">
        <li>Halle la diferencia común $d$ y el primer término $u_1$. <div>4</div></li>${CR(2)}
        <li>Escriba el término general $u_n$. <div>2</div></li>${CR(1)}
    </ol></div><div class="page"></div>`;

    Solucion += `<div class="ans"><b>P4:</b> (4a) $d = ${d_4}, u_1 = ${u1_4}$ (4b) $u_n = ${u1_4} + (n-1)${d_4}$</div>`;

    return [Pregunta, Solucion];
}