import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Ficha de Práctica: Sucesiones Aritméticas';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Generación de parámetros dinámicos
    const u1 = Math.floor(Math.random() * 5) + 3;
    const d = Math.floor(Math.random() * 6) + 2;
    const n_target = 15;
    
    // Problema 1: Contexto de Ahorro
    const Pregunta = `<div class="problema">
    <h3>Práctica: Sucesiones Aritméticas (Tiempo estimado: 40 min)</h3>
    <p><b>Contexto:</b> Un estudiante comienza a ahorrar dinero en su alcancía. La primera semana ahorra $${u1} y cada semana posterior ahorra $${d} más que la semana anterior.</p>
    <ol class="FT_ol_a">
        <li>Escriba el primer término $u_1$ y la diferencia común $d$ de esta sucesión. <div>2</div></li>${CR(1)}
        <li>Determine la fórmula del término general $u_n$ para el ahorro en la semana $n$. <div>2</div></li>${CR(1)}
        <li>¿Cuánto dinero habrá ahorrado en la semana ${n_target}? <div>2</div></li>${CR(2)}
    </ol>
    
    <div class="problema">
    <p><b>Problema 2:</b> Una sucesión aritmética está definida por $u_n = ${d}n - ${Math.abs(u1-d)}$.</p>
    <ol class="FT_ol_a" start="4">
        <li>Demuestre que la sucesión es aritmética calculando $u_{n+1} - u_n$. <div>3</div></li>${CR(2)}
        <li>¿Es ${u1 + (20 * d)} un término de esta sucesión? Justifique su respuesta. <div>3</div></li>${CR(2)}
    </ol>
    </div>

    <div class="problema">
    <p><b>Problema 3:</b> Dada la sucesión $${u1 + 2*d}, ${u1 + d}, ${u1}, \dots$</p>
    <ol class="FT_ol_a" start="6">
        <li>Halle el término número 40 de la sucesión. <div>3</div></li>${CR(2)}
        <li>¿Cuál es el primer término negativo de esta sucesión? <div>3</div></li>${CR(2)}
    </ol>
    </div>
    </div>`;

    const un_target = u1 + (n_target - 1) * d;
    const Solucion = `<div class="ans">
    <b>Soluciones:</b><br>
    1. $u_1 = ${u1}, d = ${d}$<br>
    2. $u_n = ${u1} + (n-1)${d} = ${d}n + ${u1 - d}$<br>
    3. $u_{${n_target}} = ${un_target}$<br>
    4. $u_{n+1} - u_n = [${d}(n+1) + ${u1 - d}] - [${d}n + ${u1 - d}] = ${d}$ (constante)<br>
    5. $${d}n + ${u1 - d} = ${u1 + (20 * d)} \\Rightarrow n = 21$. Sí es el término 21.<br>
    6. $u_{40} = ${u1 + 2*d} + 39(-${d}) = ${u1 + 2*d - 39*d}$<br>
    7. $${u1 + 2*d} - ${d}(n-1) < 0 \\Rightarrow n > ${(u1 + 2*d)/d + 1}$. Primer negativo en $n = ${Math.floor((u1 + 2*d)/d + 2)}$.
    </div>`;

    return [Pregunta, Solucion];
}

/* Fuente original de ejercicios: [5].pdf */