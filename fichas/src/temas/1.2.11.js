import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Ficha de Práctica: Series Aritméticas';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Problema 1: Cálculo de suma básica
    let u1_1 = Math.floor(Math.random() * 5) + 3;
    let d_1 = Math.floor(Math.random() * 4) + 2;
    let n_1 = 20 + Math.floor(Math.random() * 10);
    let last_term = u1_1 + (n_1 - 1) * d_1;
    let sum_1 = (n_1 / 2) * (u1_1 + last_term);

    let Pregunta = `<div class="problema2"><h3>1. Suma de una serie aritmética (40 min)</h3>
    <p>Una serie aritmética tiene ${n_1} términos. El primer término es ${u1_1} y el último término es ${last_term}.</p>
    <ol class="FT_ol_a">
        <li>Halle la diferencia común $d$. <div>2</div></li>${CR(1)}
        <li>Calcule la suma total de la serie utilizando la fórmula $S_n = \\frac{n}{2}(u_1 + u_n)$. <div>2</div></li>${CR(2)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (1a) $d = \\frac{${last_term} - ${u1_1}}{${n_1-1}} = ${d_1}$ (1b) $S_{${n_1}} = ${sum_1}$</div><br>`;

    // Problema 2: Contexto financiero
    let ahorro_inicial = (Math.floor(Math.random() * 10) + 5) * 10;
    let incremento = (Math.floor(Math.random() * 5) + 2) * 5;
    let semanas = 12;
    let total_ahorrado = (semanas / 2) * (2 * ahorro_inicial + (semanas - 1) * incremento);

    Pregunta += `<div class="problema2">2. Un estudiante decide ahorrar dinero cada semana. La primera semana ahorra $${ahorro_inicial} y cada semana siguiente aumenta su ahorro en $${incremento}.
    <ol class="FT_ol_a">
        <li>Determine el monto ahorrado en la semana ${semanas}. <div>2</div></li>${CR(1)}
        <li>¿Cuánto dinero habrá ahorrado en total al finalizar las ${semanas} semanas? <div>3</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> (2a) $u_{${semanas}} = ${ahorro_inicial + (semanas - 1) * incremento}$ (2b) $S_{${semanas}} = ${total_ahorrado}$</div><br>`;

    // Problema 3: Álgebra de series
    let n_3 = 50;
    let sum_3 = 2500; 
    let u1_3 = 1;
    // S_n = n/2 * (2u1 + (n-1)d) -> 2500 = 25 * (2 + 49d) -> 100 = 2 + 49d -> 98 = 49d -> d=2
    
    Pregunta += `<div class="problema2">3. La suma de los primeros ${n_3} términos de una serie aritmética es ${sum_3}. Si el primer término es ${u1_3}:
    <ol class="FT_ol_a">
        <li>Halle la diferencia común $d$. <div>3</div></li>${CR(2)}
        <li>Escriba el valor del término número ${n_3}. <div>2</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P3:</b> (3a) $d=2$ (3b) $u_{${n_3}} = ${u1_3 + (n_3-1)*2}$</div><br>`;

    // Nota: fuente original [19].pdf
    return [Pregunta, Solucion];
}