import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Módulo de práctica: Aplicaciones Financieras (Interés Compuesto y Depreciación)
 * Fuente original: [16].pdf
 * Tiempo estimado: 40 minutos.
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export function name() {
    return 'Aplicaciones Financieras: Interés Compuesto';
}

export async function pregunta() {
    // Problema 1: Interés Compuesto (Variación del Ejercicio 6)
    let p1_pv = (Math.floor(Math.random() * 5) + 8) * 1000;
    let p1_r = 5 + Math.floor(Math.random() * 5);
    let p1_t = 3 + Math.floor(Math.random() * 3);
    let p1_comp = 4; // trimestral
    let p1_fv = p1_pv * Math.pow(1 + (p1_r / 100) / p1_comp, p1_comp * p1_t);

    // Problema 2: Depreciación (Variación del Ejercicio 9/12)
    let p2_val = (Math.floor(Math.random() * 10) + 5) * 100;
    let p2_rate = 15 + Math.floor(Math.random() * 10);
    let p2_t = 4;
    let p2_dep = p2_val * Math.pow(1 - p2_rate / 100, p2_t);

    // Problema 3: Tiempo para duplicar (Variación del Ejercicio 10)
    let p3_pv = 20000;
    let p3_r = 4.5;
    // Log(2) / (n * ln(1 + r/n*100))
    let p3_ans = Math.log(2) / (Math.log(1 + (p3_r / 100) / 12));
    let p3_years = (p3_ans / 12).toFixed(2);

    let Pregunta = `<div class="problema">
    <h3>Práctica: Aplicaciones Financieras</h3>
    <p>Utilice la calculadora financiera (TVM Solver) cuando sea necesario. Muestre sus procedimientos.</p>
    
    <ol>
        <li>Una inversión de £${p1_pv} se deposita a una tasa del ${p1_r}\\% p.a. compuesta trimestralmente.
            <ol type="a">
                <li>Calcule el valor de la inversión después de ${p1_t} años. <div>4</div></li>${CR(2)}
            </ol>
        </li>
        <li>Un equipo electrónico tiene un valor de £${p2_val} y se deprecia un ${p2_rate}\\% cada año.
            <ol type="a">
                <li>Determine el valor del equipo después de ${p2_t} años. <div>3</div></li>${CR(2)}
            </ol>
        </li>
        <li>¿Cuánto tiempo, en años, le tomará a una inversión de £${p3_pv} duplicar su valor si la tasa de interés es del ${p3_r}\\% p.a. compuesta mensualmente? <div>4</div></li>${CR(3)}
    </ol>
    </div>`;

    let Solucion = `<div class="ans">
    <b>Soluciones:</b><br>
    1a) $FV = ${p1_pv}(1 + \\frac{${p1_r}/100}{4})^{4 \\times ${p1_t}} \\approx £${p1_fv.toFixed(2)}$<br>
    2a) $V = ${p2_val}(1 - ${p2_rate}/100)^{${p2_t}} \\approx £${p2_dep.toFixed(2)}$<br>
    3) Usando TVM Solver: $N \\approx ${Math.ceil(p3_ans)}$, lo que equivale a ${p3_years} años.
    </div>`;

    return [Pregunta, Solucion];
}