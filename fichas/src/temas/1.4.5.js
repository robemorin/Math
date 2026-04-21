import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/* 
   Fuente original: [14].pdf
   Subtema: 1.4 Aplicaciones financieras (interés y amortización)
   Tiempo estimado: 40 minutos
*/

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export function name() {
    return 'Aplicaciones Financieras: Depreciación';
}

export async function pregunta() {
    // Problema 1: Depreciación simple
    let val1 = 2000 + Math.floor(Math.random() * 20) * 100;
    let dep1 = 15 + Math.floor(Math.random() * 10);
    let n1 = 3;
    let res1 = val1 * Math.pow(1 - dep1 / 100, n1);

    // Problema 2: Tractor
    let val2 = 80000 + Math.floor(Math.random() * 40) * 1000;
    let dep2 = 20 + Math.floor(Math.random() * 5);
    let n2 = 5;
    let res2 = val2 * Math.pow(1 - dep2 / 100, n2);
    let perd2 = val2 - res2;

    // Problema 3: Laptop
    let val3 = 60000 + Math.floor(Math.random() * 50) * 500;
    let dep3 = 25 + Math.floor(Math.random() * 10);
    let n3 = 3;
    let res3 = val3 * Math.pow(1 - dep3 / 100, n3);
    let perd3 = val3 - res3;

    // Problema 4: Tasa anual (Inversa)
    let p_inicial = 200000 + Math.floor(Math.random() * 50) * 1000;
    let p_final = 50000 + Math.floor(Math.random() * 30) * 1000;
    let t = 4;
    // FV = PV(1 - r)^n => (1 - r) = (FV/PV)^(1/n) => r = 1 - (FV/PV)^(1/n)
    let r_calc = (1 - Math.pow(p_final / p_inicial, 1 / t)) * 100;

    let Pregunta = `<div class="problema">
    <h3>Ejercicios de Aplicaciones Financieras (Depreciación)</h3>
    <ol>
        <li>Un taller adquiere una máquina por €${val1}. Si el valor se deprecia un ${dep1}\\% cada año, calcule el valor de la máquina al cabo de ${n1} años. <div>4</div></li>${CR(2)}
        
        <li>Una maquinaria pesada se compró por €${val2} y se deprecia a una tasa anual del ${dep2}\\%.
        <ol type="a">
            <li>Encuentre su valor al finalizar ${n2} años. <div>3</div></li>${CR(1)}
            <li>¿Cuál fue la depreciación total (pérdida de valor) en ese periodo? <div>2</div></li>${CR(1)}
        </ol></li>

        <li>Una computadora portátil comprada por ¥${val3} pierde su valor a un ritmo del ${dep3}\\% anual.
        <ol type="a">
            <li>Determine el valor residual tras ${n3} años. <div>3</div></li>${CR(1)}
            <li>Calcule cuánto dinero ha perdido su valor en dicho periodo. <div>2</div></li>${CR(1)}
        </ol></li>

        <li>Una imprenta valorada en $${p_inicial} se vendió después de ${t} años por $${p_final}. Determine la tasa de depreciación anual constante aplicada durante ese periodo. <div>4</div></li>${CR(2)}
    </ol>
    </div>`;

    let Solucion = `<div class="ans">
    <b>Soluciones:</b><br>
    1. Valor = $${val1} \\times (1 - 0.${dep1})^{${n1}} \\approx €${res1.toFixed(2)}<br>
    2. (a) $${val2} \\times (1 - 0.${dep2})^{${n2}} \\approx €${res2.toFixed(2)} (b) $${val2} - ${res2.toFixed(2)} = €${perd2.toFixed(2)}<br>
    3. (a) $${val3} \\times (1 - 0.${dep3})^{${n3}} \\approx ¥${res3.toFixed(2)} (b) $${val3} - ${res3.toFixed(2)} = ¥${perd3.toFixed(2)}<br>
    4. $${p_final} = ${p_inicial}(1 - r)^${t} \\Rightarrow r = 1 - \\sqrt[${t}]{\\frac{${p_final}}{${p_inicial}}} \\approx ${r_calc.toFixed(2)}\\%$
    </div>`;

    return [Pregunta, Solucion];
}