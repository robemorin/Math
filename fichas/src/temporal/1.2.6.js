import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Práctica de Sucesiones Aritméticas';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Generación de variables aleatorias para parametrización
    let u1 = Math.floor(Math.random() * 10) + 5; // u1 entre 5 y 14
    let d = Math.floor(Math.random() * 7) + 2;   // d entre 2 y 8
    if (Math.random() < 0.3) d = -d;             // A veces negativo

    // Problema 1: Identificación y término general
    let seq = [u1, u1 + d, u1 + 2 * d, u1 + 3 * d];
    let n_calc = 15 + Math.floor(Math.random() * 10);
    let term_n = u1 + (n_calc - 1) * d;

    // Problema 2: Contexto (Ahorros)
    let ahorro_inicial = (Math.floor(Math.random() * 5) + 2) * 50;
    let ahorro_mensual = Math.floor(Math.random() * 5) * 10 + 20;

    let Pregunta = `<div class="problema2">
    <h3>Práctica: Sucesiones Aritméticas (Fuente: [5].pdf)</h3>
    <p><i>Tiempo estimado: 40 minutos. Muestre todo su procedimiento.</i></p>
    
    <div class="problema2"><b>1.- Análisis de progresiones:</b> Dada la sucesión: $${seq.join(', ')}, \\dots$
    <ol class="FT_ol_a">
        <li>Determine el primer término $u_1$ y la diferencia común $d$. <div>2</div></li>${CR(1)}
        <li>Escriba el término general $u_n$ en la forma $u_n = dn + b$. <div>2</div></li>${CR(1)}
        <li>Halle el valor del término $u_{${n_calc}}$. <div>2</div></li>${CR(2)}
    </ol></div>

    <div class="problema2"><b>2.- Contexto (Finanzas personales):</b> Usted comienza un plan de ahorro donde deposita $${ahorro_inicial}$ en la primera semana y aumenta su depósito en $${ahorro_mensual}$ cada semana.
    <ol class="FT_ol_a">
        <li>Escriba una fórmula para el ahorro total en la semana $n$. <div>2</div></li>${CR(1)}
        <li>¿Cuánto dinero habrá depositado en la semana 12? <div>2</div></li>${CR(1)}
        <li>¿En qué semana su depósito será mayor a 500? (Justifique). <div>3</div></li>${CR(2)}
    </ol></div>

    <div class="problema2"><b>3.- Verificación de propiedades:</b> Sea una sucesión definida por $u_n = ${d}n + ${u1 - d}$.
    <ol class="FT_ol_a">
        <li>Demuestre que la sucesión es aritmética calculando $u_{n+1} - u_n$. <div>3</div></li>${CR(2)}
        <li>¿Es 100 un término de esta sucesión? Justifique su respuesta. <div>3</div></li>${CR(2)}
    </ol></div>
    </div><div class="page"></div>`;

    let Solucion = `<div class="ans">
    <b>P1:</b> (a) $u_1 = ${u1}, d = ${d}$. (b) $u_n = ${d}n + ${u1 - d}$. (c) $u_{${n_calc}} = ${term_n}$.<br>
    <b>P2:</b> (a) $u_n = ${ahorro_mensual}n + ${ahorro_inicial - ahorro_mensual}$. (b) $u_{12} = ${ahorro_mensual * 12 + (ahorro_inicial - ahorro_mensual)}$. (c) ${Math.ceil((500 - (ahorro_inicial - ahorro_mensual)) / ahorro_mensual)}ª semana.<br>
    <b>P3:</b> (a) La diferencia es constante e igual a ${d}. (b) Debe verificar si $n = (100 - ${u1 - d}) / ${d}$ resulta en un número entero.
    </div>`;

    return [Pregunta, Solucion];
}