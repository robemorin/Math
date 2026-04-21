import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/* 
 * Fuente original: [17].pdf
 * Módulo para práctica de Aplicaciones Financieras (Interés Compuesto)
 * Tiempo estimado: 40 minutos
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // --- Problema 1: Inversión inicial y objetivo (Similar ej 13) ---
    let pv1 = 10000;
    let fv1 = 15000;
    let n1 = 3;
    let r1 = (Math.pow(fv1 / pv1, 1 / n1) - 1) * 100;

    let Pregunta = `<div class="problema2"><h3>Práctica: Aplicaciones Financieras</h3>
    1.- Un inversor adquiere activos por $${pv1} y espera venderlos dentro de ${n1} años por $${fv1}.
    <ol class="FT_ol_a">
        <li>¿Cuál debe ser el porcentaje de aumento anual necesario para alcanzar su objetivo? <div>4</div></li>${CR(3)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> $r = ((${fv1}/${pv1})^{1/${n1}} - 1) \\times 100 \\approx ${r1.toFixed(2)}\\%$</div><br>`;

    // --- Problema 2: Interés Compuesto Mensual (Similar ej 14) ---
    let principal2 = 5000;
    let final2 = 6165;
    let years2 = 3.5;
    let months2 = years2 * 12;
    // FV = PV(1 + r/1200)^n -> r = 1200 * ((FV/PV)^(1/n) - 1)
    let rate2 = 1200 * (Math.pow(final2 / principal2, 1 / months2) - 1);

    Pregunta += `<div class="problema2">2.- Se depositan $${principal2} en una cuenta que capitaliza intereses mensualmente. Tras ${years2} años, el saldo es de $${final2}.
    <ol class="FT_ol_a">
        <li>Determine el tipo de interés anual nominal. <div>5</div></li>${CR(4)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> $r = 1200 \\times ((${final2}/${principal2})^{1/${months2}} - 1) \\approx ${rate2.toFixed(2)}\\%$</div><br>`;

    // --- Problema 3: Interés Compuesto Trimestral (Similar ej 15) ---
    let principal3 = 9000;
    let final3 = 10493;
    let years3 = 3;
    let quarters3 = years3 * 4;
    let rate3 = 400 * (Math.pow(final3 / principal3, 1 / quarters3) - 1);

    Pregunta += `<div class="problema2">3.- Una pareja invierte $${principal3} a una tasa que capitaliza trimestralmente. Al cabo de ${years3} años, el saldo es $${final3}.
    <ol class="FT_ol_a">
        <li>¿Qué tipo de interés anual se ha aplicado? <div>5</div></li>${CR(4)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P3:</b> $r = 400 \\times ((${final3}/${principal3})^{1/${quarters3}} - 1) \\approx ${rate3.toFixed(2)}\\%$</div><br>`;

    // --- Problema 4: Depreciación (Similar ej 16) ---
    let price4 = 68500;
    let final4 = 26380;
    let years4 = 4;
    // Formula depreciación: FV = PV(1 - r)^n
    let rate4 = (1 - Math.pow(final4 / price4, 1 / years4)) * 100;

    Pregunta += `<div class="problema2">4.- Un vehículo deportivo se devalúa desde £${price4} hasta £${final4} en ${years4} años.
    <ol class="FT_ol_a">
        <li>Calcule la tasa anual de depreciación. <div>4</div></li>${CR(4)}
    </ol></div><div class="page"></div>`;

    Solucion += `<div class="ans"><b>P4:</b> $r = (1 - (${final4}/${price4})^{1/${years4}}) \\times 100 \\approx ${rate4.toFixed(2)}\\%$</div>`;

    return [Pregunta, Solucion];
}