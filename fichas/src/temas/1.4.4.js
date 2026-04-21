import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Módulo de Práctica: Aplicaciones Financieras (Interés Compuesto y Depreciación)
 * Fuente original: [13].pdf
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export function name() {
    return 'Aplicaciones Financieras e Inflación';
}

export async function pregunta() {
    // Problema 1: Interés Compuesto e Inflación
    let P1 = 5000 + Math.floor(Math.random() * 5) * 1000;
    let r1 = 3.6;
    let n1 = 3;
    let inf1 = 2.0;
    let FV1 = P1 * Math.pow(1 + (r1 / 100 / 4), 4 * n1);
    let realVal1 = FV1 / Math.pow(1 + (inf1 / 100), n1);

    // Problema 2: Depreciación
    let P2 = 12000 + Math.floor(Math.random() * 8) * 1000;
    let d2 = 12 + Math.floor(Math.random() * 5);
    let t2 = 5;
    let valFinal2 = P2 * Math.pow(1 - (d2 / 100), t2);

    let Pregunta = `<div class="problema2">
    <h3>Parte 1: Interés Compuesto e Inflación</h3>
    <p>Ernie invierte $${P1} en una cuenta por ${n1} años a una tasa del ${r1}\\% anual, capitalizable trimestralmente. La inflación durante este periodo promedió un ${inf1}\\%$ anual.</p>
    <ol class="FT_ol_a">
        <li>Calcule el valor de la inversión después de ${n1} años. <div>2</div></li>${CR(2)}
        <li>Determine el valor real de la inversión ajustado por la inflación. <div>3</div></li>${CR(2)}
    </ol></div>

    <div class="problema2">
    <h3>Parte 2: Depreciación de Activos</h3>
    <p>Una empresa adquiere maquinaria por valor de €${P2}. Se estima que el activo se deprecia a una tasa fija del ${d2}\\%$ anual.</p>
    <ol class="FT_ol_a">
        <li>Escriba la fórmula para el valor del activo después de $n$ años. <div>1</div></li>${CR(1)}
        <li>Calcule el valor del activo después de ${t2} años. <div>2</div></li>${CR(2)}
        <li>¿Cuál ha sido la depreciación total en euros tras este periodo? <div>2</div></li>${CR(2)}
    </ol></div>`;

    let Solucion = `<div class="ans">
    <b>Soluciones:</b><br>
    <b>P1:</b> (a) $V = ${P1}(1 + \\frac{0.036}{4})^{4 \\times 3} \\approx ${FV1.toFixed(2)}$. 
    (b) $Valor_{real} = \\frac{${FV1.toFixed(2)}}{(1.02)^3} \\approx ${realVal1.toFixed(2)}$.<br>
    <b>P2:</b> (a) $u_n = ${P2}(1 - \\frac{${d2}}{100})^n$. 
    (b) $u_{${t2}} = ${P2}(0.${(100 - d2)})^{${t2}} \\approx ${valFinal2.toFixed(2)}$. 
    (c) $Depreciación = ${P2} - ${valFinal2.toFixed(2)} = ${(P2 - valFinal2).toFixed(2)}$.
    </div>`;

    return [Pregunta, Solucion];
}