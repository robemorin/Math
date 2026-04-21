import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Fuente original de los ejercicios: [20].pdf
 * Módulo para práctica de Sucesiones y Series Aritméticas (IB Math AI)
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export function name() {
    return 'Práctica: Sucesiones y Series Aritméticas';
}

export async function pregunta() {
    // --- Problema 1: Cálculo básico de serie ---
    let a1 = Math.floor(Math.random() * 5) + 2;
    let d = Math.floor(Math.random() * 4) + 3;
    let n = 10;
    let seq = [a1, a1 + d, a1 + 2 * d, a1 + 3 * d];
    
    // --- Problema 2: Series con notación Sigma ---
    let k_start = 1;
    let k_end = 12;
    let m = Math.floor(Math.random() * 3) + 2;
    let b = Math.floor(Math.random() * 10) + 1;

    // --- Problema 3: Aplicación aritmética ---
    let u_last = 50 + Math.floor(Math.random() * 20);
    let n_terms = 15;
    let u_first = u_last - (n_terms - 1) * d;

    let Pregunta = `<div class="problema">
    <h3>Práctica: Sucesiones y Series Aritméticas</h3>
    <p>Tiempo estimado: 40 minutos. Resuelva los siguientes ejercicios mostrando su procedimiento.</p>
    
    <div class="problema2">1.- Dada la sucesión aritmética: $${seq.join(', ')}, \\dots$
    <ol class="FT_ol_a">
        <li>Halle la diferencia común $d$. <div>1</div></li>${CR(1)}
        <li>Calcule la suma de los primeros ${n} términos de la serie. <div>3</div></li>${CR(3)}
    </ol></div>

    <div class="problema2">2.- Evalúe la siguiente suma de notación sigma:
    <br>$$\\sum_{k=1}^{${k_end}} (${m}k + ${b})$$
    <div>3</div></div>${CR(4)}

    <div class="problema2">3.- Una serie aritmética tiene ${n_terms} términos. El último término es $${u_last}$ y el primer término es $${u_first}$.
    <ol class="FT_ol_a">
        <li>Encuentre la diferencia común $d$. <div>2</div></li>${CR(2)}
        <li>Calcule la suma de la serie. <div>2</div></li>${CR(3)}
    </ol></div>

    <div class="problema2">4.- Considere la sucesión $u_n = ${m}n - ${b}$.
    <ol class="FT_ol_a">
        <li>Escriba los primeros tres términos de la sucesión. <div>2</div></li>${CR(2)}
        <li>¿Qué valor toma $n$ cuando $u_n = ${u_last + (m*2)}$? <div>2</div></li>${CR(2)}
    </ol></div>
    </div><div class="page"></div>`;

    // Cálculos para soluciones
    let s_n = (n / 2) * (2 * a1 + (n - 1) * d);
    let sum_sigma = (k_end / 2) * ((m * k_start + b) + (m * k_end + b));
    let d_3 = (u_last - u_first) / (n_terms - 1);
    let sum_3 = (n_terms / 2) * (u_first + u_last);

    let Solucion = `<div class="ans">
    <b>P1:</b> (a) $d = ${d}$ (b) $S_{${n}} = ${s_n}$ <br>
    <b>P2:</b> $u_1 = ${m*1 + b}$, $u_{${k_end}} = ${m*k_end + b}$. Suma = ${sum_sigma} <br>
    <b>P3:</b> (a) $d = ${d_3}$ (b) $S = ${sum_3}$ <br>
    <b>P4:</b> (a) ${m-b}, ${2*m-b}, ${3*m-b}$ (b) $n = ${(u_last + (m*2) + b) / m}$
    </div>`;

    return [Pregunta, Solucion];
}