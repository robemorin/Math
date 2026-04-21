import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Ficha de practica: Sucesiones y Series Geometricas
 * Fuente original: [22].pdf
 * Tiempo estimado: 40 minutos
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export function name() {
    return 'Sucesiones y Series Geométricas - Práctica de Examen';
}

export async function pregunta() {
    // --- Problema 1: Series Geométricas ---
    let u1 = Math.floor(Math.random() * 5) + 2;
    let r = Math.floor(Math.random() * 3) + 2;
    let n = 6;
    let suma_n = u1 * (Math.pow(r, n) - 1) / (r - 1);

    let Pregunta = `<div class="problema2">1.- Dada la serie geométrica $${u1} + ${u1 * r} + ${u1 * r * r} + \\dots$
    <ol class="FT_ol_a">
        <li>Determine el valor de la razón común $r$ y el primer término $u_1$. <div>2</div></li>${CR(1)}
        <li>Utilizando la fórmula de la serie finita, halle la suma de los primeros $${n}$ términos. <div>3</div></li>${CR(2)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (1a) $u_1 = ${u1}, r = ${r}$ (1b) $S_{${n}} = ${suma_n}$</div><br>`;

    // --- Problema 2: Aplicación financiera (Modelización) ---
    let capital = (Math.floor(Math.random() * 5) + 2) * 1000;
    let interes = 5;
    let factor = 1 + (interes / 100);
    let años = 4;
    let final = (capital * Math.pow(factor, años)).toFixed(0);

    Pregunta += `<div class="problema2">2.- Un inversor deposita $${capital} USD en una cuenta que paga un interés compuesto anual del ${interes}\\%$. El capital al final de cada año forma una sucesión geométrica.
    <ol class="FT_ol_a">
        <li>Escriba la razón común $r$ que permite calcular el capital al año siguiente. <div>1</div></li>${CR(1)}
        <li>Calcule el capital total acumulado al finalizar el año $${años}$. <div>3</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> (2a) $r = ${factor}$ (2b) $V = ${capital} \\times (${factor})^4 \\approx ${final}$ USD</div><br>`;

    // --- Problema 3: Propiedades de la serie ---
    let val_k = Math.floor(Math.random() * 4) + 2;
    
    Pregunta += `<div class="problema2">3.- Tres términos consecutivos de una sucesión geométrica son $${val_k - 1}, ${val_k * 2}, ${val_k * 4}$.
    <ol class="FT_ol_a">
        <li>¿Es esta una sucesión geométrica? Justifique su respuesta mostrando la razón $r$ entre los términos. <div>2</div></li>${CR(2)}
        <li>Si añadimos un cuarto término para que la razón se mantenga constante, ¿cuál sería el valor de dicho término? <div>2</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P3:</b> (3a) Sí, $r = 2$. (3b) El cuarto término es $${val_k * 4 * 2} = ${val_k * 8}$.</div><br>`;

    // --- Problema 4: Teoría y Razonamiento (Basado en el PDF) ---
    Pregunta += `<div class="problema2">4.- Un matemático observa que para un número de puntos $n$ en un círculo, se forman regiones según la fórmula $R = 2^{n-1}$.
    <ol class="FT_ol_a">
        <li>Para $n = 6$, ¿cuántas regiones se formarían según la conjetura? <div>2</div></li>${CR(1)}
        <li>¿Es siempre seguro asumir que una conjetura es cierta solo por haber comprobado los primeros casos? Justifique brevemente. <div>2</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P4:</b> (4a) $2^{6-1} = 2^5 = 32$. (4b) No, una conjetura requiere una demostración formal para ser considerada verdadera matemáticamente.</div><div class="page"></div>`;

    return [Pregunta, Solucion];
}