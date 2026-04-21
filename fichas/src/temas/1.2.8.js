import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

// Fuente original: [6].pdf
export function name() {
    return 'Sucesiones y Series Aritméticas';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br><br><br>";
    return s;
}

export async function pregunta() {
    // Generación dinámica de datos para evitar casos imposibles
    // Caso 1: u7 y u13 conocidos
    let u7 = Math.floor(Math.random() * 20) + 30;
    let u13 = u7 + (Math.floor(Math.random() * 5) + 2) * 6;
    let d = (u13 - u7) / 6;
    let u1 = u7 - 6 * d;

    // Caso 2: Contexto tipo Ryan (Crecimiento semanal)
    let base = Math.floor(Math.random() * 10) + 10;
    let inc = Math.floor(Math.random() * 5) + 2;
    let n_semanas = 10 + Math.floor(Math.random() * 5);
    let total_n = base + (n_semanas - 1) * inc;

    let Pregunta = `<div class="problema">
    <h3>Práctica: Sucesiones Aritméticas</h3>
    <ol>
        <li>Dada una sucesión aritmética donde el 7º término es $u_7 = ${u7}$ y el 13º término es $u_{13} = ${u13}$:
        <ol type="a">
            <li>Halle la diferencia común $d$. <div></div></li>${CR(1)}
            <li>Determine el primer término $u_1$. <div></div></li>${CR(1)}
            <li>Encuentre una expresión para el término general $u_n$. <div></div></li>${CR(1)}
        </ol>
        </li>
        <li>Un diseñador gráfico crea ${base} logotipos la primera semana y aumenta su producción en ${inc} logotipos cada semana.
        <ol type="a">
            <li>Demuestre que esto representa una sucesión aritmética. <div></div></li>${CR(1)}
            <li>Calcule cuántos logotipos producirá en la semana ${n_semanas}. <div></div></li>${CR(1)}
            <li>¿En qué semana alcanzará una producción de exactamente ${base + (20-1)*inc} logotipos? <div></div></li>${CR(1)}
        </ol>
        </li>
        <li>Inserte 4 números entre ${Math.floor(Math.random()*5)+2} y ${Math.floor(Math.random()*10)+20} para que los 6 números formen una sucesión aritmética.
        <div></div></li>${CR(2)}
    </ol>
    </div>`;

    let Solucion = `<div class="ans">
    <b>Soluciones sugeridas:</b><br>
    P1: (a) $d = ${d}$ (b) $u_1 = ${u1}$ (c) $u_n = ${u1} + (n-1)${d} = ${u1-d} + ${d}n$<br>
    P2: (b) $u_{${n_semanas}} = ${total_n}$ (c) $n = 20$<br>
    P3: Calcular $d = \\frac{u_{final} - u_{inicio}}{5}$ y sumar sucesivamente.
    </div>`;

    return [Pregunta, Solucion];
}