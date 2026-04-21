import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Aplicaciones Financieras: Interés Compuesto';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Problema 1: Inversión básica
    let P1 = Math.floor(Math.random() * 5 + 2) * 1000;
    let r1 = Math.floor(Math.random() * 4 + 3); // 3-6%
    let t1 = Math.floor(Math.random() * 3 + 3); // 3-5 años
    let multiplier1 = Math.pow(1 + r1 / 100, t1);
    let final1 = P1 * multiplier1;

    // Problema 2: Comparativa de crecimiento
    let P2 = 2000;
    let r2 = 5;
    let t2 = 10;
    let final2 = P2 * Math.pow(1 + r2 / 100, t2);

    // Problema 3: Cálculo inverso/conceptos
    let target = 10000;
    let r3 = 4;
    let t3 = 10;
    let P3 = target / Math.pow(1 + r3 / 100, t3);

    let Pregunta = `<div class="problema">
    <h3>Práctica: Aplicaciones Financieras (Interés Compuesto)</h3>
    <p><b>Instrucciones:</b> Resuelva los siguientes ejercicios. Muestre todos sus procedimientos. Se permite el uso de calculadora.</p>
    
    <ol>
        <li><b>Inversión inicial:</b> Usted invierte $${P1} en una cuenta bancaria que ofrece una tasa de interés anual compuesto de $${r1}\\%$.
            <ol type="a">
                <li>Escriba la fórmula para el valor de la inversión después de $n$ años. <div>2</div></li>${CR(1)}
                <li>Calcule el valor total de la inversión al finalizar el año ${t1}. <div>2</div></li>${CR(2)}
            </ol>
        </li>
        <li><b>Proyección a largo plazo:</b> Una cuenta de ahorros tiene un saldo inicial de $${P2} y crece a una tasa del ${r2}\\%$ anual compuesto.
            <ol type="a">
                <li>Calcule el monto acumulado después de ${t2} años. <div>3</div></li>${CR(2)}
                <li>¿Cuántos intereses totales se han generado en ese periodo? <div>2</div></li>${CR(2)}
            </ol>
        </li>
        <li><b>Planificación financiera:</b> Usted desea tener $${target} en su cuenta dentro de ${t3} años. Si el banco ofrece un ${r3}\\%$ de interés compuesto anual, ¿cuál es la cantidad mínima que debe depositar hoy? <div>4</div></li>${CR(3)}
    </ol>
    </div>`;

    let Solucion = `<div class="ans">
    <b>Soluciones:</b><br>
    P1: (a) $u_n = ${P1}(1 + 0.0${r1})^n$; (b) $${final1.toFixed(2)}<br>
    P2: (a) $${P2}(1.05)^{10} \\approx ${final2.toFixed(2)}$; (b) $${(final2 - P2).toFixed(2)}<br>
    P3: $P = \\frac{10000}{(1.04)^{10}} \\approx ${P3.toFixed(2)}
    </div>`;

    return [Pregunta, Solucion];
}