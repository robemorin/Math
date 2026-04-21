import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Sucesiones Geométricas';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // --- Problema 1: Identificación y término general ---
    let u1_1 = Math.floor(Math.random() * 10) + 2;
    let r_1 = Math.floor(Math.random() * 4) + 2;
    if (Math.random() < 0.5) r_1 = -r_1;
    let n_1 = 8 + Math.floor(Math.random() * 5);
    let seq1 = [u1_1, u1_1 * r_1, u1_1 * r_1 * r_1, u1_1 * r_1 * r_1 * r_1];

    let Pregunta = `<div class="problema2">1.- Considere la sucesión geométrica: $${seq1.join(', ')}, \\dots$
    <ol class="FT_ol_a">
        <li>Indique $u_1$ y $r$. <div>1</div></li>${CR(1)}
        <li>Halle una expresión para el término general $u_n$. <div>2</div></li>${CR(1)}
        <li>Calcule el valor del término $u_{${n_1}}$. <div>2</div></li>${CR(1)}
    </ol></div>`;

    let un_1 = u1_1 * Math.pow(r_1, n_1 - 1);
    let Solucion = `<div class="ans"><b>P1:</b> (1a) $u_1 = ${u1_1}, r = ${r_1}$ (1b) $u_n = ${u1_1}(${r_1})^{n-1}$ (1c) $u_{${n_1}} = ${un_1}$</div><br>`;

    // --- Problema 2: Hallar términos faltantes y constante k ---
    let u1_2 = Math.floor(Math.random() * 20) + 5;
    let r_2 = (Math.random() < 0.5 ? 2 : 3);
    let r_k = Math.floor(Math.random() * 3) + 2;
    let k_sol = (Math.floor(Math.random() * 5) + 2);
    let term2_k = r_k * k_sol;
    let val_3 = Math.pow(r_k, 2) * k_sol;

    Pregunta += `<div class="problema2">2.- Resuelva los siguientes apartados:
    <ol class="FT_ol_a">
        <li>Dada la sucesión geométrica $${u1_2}, ${u1_2 * r_2}, b, c, \\dots$, halle $b$ y $c$. <div>2</div></li>${CR(1)}
        <li>Halle $k$ sabiendo que $k, ${term2_k}, ${val_3}$ son términos consecutivos. <div>2</div></li>${CR(1)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> (2a) $b = ${u1_2 * r_2 * r_2}, c = ${u1_2 * Math.pow(r_2, 3)}$ (2b) $k = ${k_sol}$</div><br>`;

    // --- Problema 3: Mostrar que es geométrica ---
    let u1_3 = (Math.random() < 0.5 ? 12 : 18);
    let r_3 = -0.5;
    let n_3 = 8;

    Pregunta += `<div class="problema2">3.- Considere la sucesión $${u1_3}, ${u1_3 * r_3}, ${u1_3 * r_3 * r_3}, ${u1_3 * r_3 * r_3 * r_3}, \\dots$
    <ol class="FT_ol_a">
        <li>Muestre que la sucesión es geométrica. <div>2</div></li>${CR(1)}
        <li>Halle el término $u_{${n_3}}$ como una fracción o decimal exacto. <div>3</div></li>${CR(1)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P3:</b> (3a) $r = ${r_3}$ (constante) (3b) $u_{${n_3}} = ${u1_3 * Math.pow(r_3, n_3 - 1)}$</div><br>`;

    // --- Problema 4: Ecuación con k (Ej 10 PDF) ---
    Pregunta += `<div class="problema2">4.- Los tres primeros términos de una sucesión geométrica son $k-1, 6$ y $3k$.
    <ol class="FT_ol_a">
        <li>Halle los posibles valores de $k$. <div>3</div></li>${CR(2)}
        <li>Para el valor positivo de $k$, escriba los tres primeros términos. <div>2</div></li>${CR(1)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P4:</b> (4a) $k = 4, -3$ (4b) $3, 6, 12$</div><br>`;

    // --- Problema 5: Contexto (Crecimiento) ---
    let initial = (Math.floor(Math.random() * 5) + 2) * 100;
    let rate = 1 + (Math.floor(Math.random() * 10) + 5) / 100;
    let years = 5;

    Pregunta += `<div class="problema2">5.- Una población comienza con $${initial}$ individuos y aumenta un $${Math.round((rate - 1) * 100)}\\%$ cada hora.
    <ol class="FT_ol_a">
        <li>Escriba la razón común $r$. <div>1</div></li>${CR(1)}
        <li>Halle la población al cabo de $${years}$ horas. <div>2</div></li>${CR(1)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P5:</b> (5a) $r = ${rate}$ (5b) $\\approx ${(initial * Math.pow(rate, years)).toFixed(2)}$</div><br>`;

    // --- Problema 6: Dos términos no consecutivos ---
    let r_6 = (Math.random() < 0.5 ? 2 : 3);
    let u1_6 = Math.floor(Math.random() * 5) + 2;
    let u2_6 = u1_6 * r_6;
    let u5_6 = u1_6 * Math.pow(r_6, 4);

    Pregunta += `<div class="problema2">6.- En una progresión geométrica, $u_2 = ${u2_6}$ y $u_5 = ${u5_6}$.
    <ol class="FT_ol_a">
        <li>Halle la razón común $r$. <div>2</div></li>${CR(1)}
        <li>Halle el primer término $u_1$. <div>2</div></li>${CR(1)}
    </ol></div><div class="page"></div>`;

    Solucion += `<div class="ans"><b>P6:</b> (6a) $r^3 = ${Math.pow(r_6, 3)} \\Rightarrow r = ${r_6}$ (6b) $u_1 = ${u1_6}$</div>`;

    return [Pregunta, Solucion];
}
