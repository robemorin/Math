import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Evaluación: Aplicaciones Financieras (Interés Compuesto)';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br><br><br>";
    return s;
}

export async function pregunta() {
    // Problema 1: Interés compuesto simple
    let p1_cap = Math.floor(Math.random() * 5000 + 3000);
    let p1_rate = (Math.random() * 4 + 3).toFixed(1);
    let p1_years = Math.floor(Math.random() * 4 + 3);

    // Problema 2: Compuesto con capitalización diferente a anual
    let p2_cap = Math.floor(Math.random() * 8000 + 5000);
    let p2_rate = (Math.random() * 3 + 2).toFixed(1);
    let p2_n = 4; // trimestral
    let p2_years = 3;

    // Problema 3: Comparación bancaria
    let p3_cap = 10000;
    
    let Pregunta = `<div class="problema">
    <h3>Evaluación de Aplicaciones Financieras (Tiempo estimado: 40 min)</h3>
    <p><i>Nota: En todos los ejercicios, los resultados deben redondearse a dos cifras decimales.</i></p>
    
    <div class="problema2">1.- Lucía invierte $${p1_cap} a un $${p1_rate}\\%$ anual compuesto anualmente.
    <ol class="FT_ol_a">
        <li>Determine el valor de la inversión después de ${p1_years} años. <div>3</div></li>${CR(1)}
    </ol></div>

    <div class="problema2">2.- Se invierten $${p2_cap} a una tasa nominal anual del $${p2_rate}\\%$ capitalizable trimestralmente.
    <ol class="FT_ol_a">
        <li>Calcule el valor de la inversión al finalizar el tercer año. <div>3</div></li>${CR(1)}
        <li>¿Cuál es el interés total ganado en este periodo? <div>2</div></li>${CR(1)}
    </ol></div>

    <div class="problema2">3.- Jai tiene $${p3_cap} para invertir durante 5 años. Tiene tres opciones:
    <ul>
        <li>Banco A: $5.5\\%$ anual compuesto anualmente.</li>
        <li>Banco B: $5.2\\%$ anual compuesto trimestralmente.</li>
        <li>Banco C: $5.0\\%$ anual compuesto mensualmente.</li>
    </ul>
    <ol class="FT_ol_a">
        <li>Determine cuánto dinero tendrá al final de los 5 años en cada banco. <div>6</div></li>${CR(2)}
        <li>¿Qué opción le conviene más? Justifique con los cálculos realizados. <div>2</div></li>${CR(1)}
    </ol></div>
    <div class="page"></div>
    </div>`;

    let sol1 = (p1_cap * Math.pow(1 + p1_rate/100, p1_years)).toFixed(2);
    let sol2_val = (p2_cap * Math.pow(1 + (p2_rate/100)/p2_n, p2_n * p2_years)).toFixed(2);
    let sol2_int = (sol2_val - p2_cap).toFixed(2);
    
    let sol3a_A = (p3_cap * Math.pow(1 + 0.055, 5)).toFixed(2);
    let sol3a_B = (p3_cap * Math.pow(1 + 0.052/4, 4*5)).toFixed(2);
    let sol3a_C = (p3_cap * Math.pow(1 + 0.050/12, 12*5)).toFixed(2);

    let Solucion = `<div class="ans"><b>Solucionario:</b><br>
    P1: $${p1_cap} \\times (1 + ${p1_rate/100})^{${p1_years}} = ${sol1}$<br>
    P2: (a) $${p2_cap} \\times (1 + ${p2_rate/400})^{12} = ${sol2_val}$ (b) $${sol2_int}$<br>
    P3: Banco A: ${sol3a_A}, Banco B: ${sol3a_B}, Banco C: ${sol3a_C}. Conviene el Banco A.</div>`;

    return [Pregunta, Solucion];
}