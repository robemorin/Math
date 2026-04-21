import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Probabilidad y Tablas de Contingencia';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Fuente original: [81].pdf
    // Problema 1: Tabla de quejas (Probabilidad básica)
    const data = {
        "2016/17": { "CS": 1181, "Total": 8085 },
        "2017/18": { "Billing": 3582, "Faults": 384, "Total": 9109 }
    };
    
    let prob1a = (data["2016/17"].CS / data["2016/17"].Total).toFixed(4);
    let total2017 = data["2017/18"].Total;
    let notBillOrFault = total2017 - (data["2017/18"].Billing + data["2017/18"].Faults);
    let prob1c = (notBillOrFault / total2017).toFixed(4);

    let Pregunta = `<div class="problema2">1.- La siguiente tabla muestra quejas recibidas en un periodo de 4 años:
    <table border="1" style="border-collapse: collapse; width: 100%; text-align: center;">
        <tr><th>Razón</th><th>2016/17</th><th>2017/18</th></tr>
        <tr><td>Facturación</td><td>3136</td><td>3582</td></tr>
        <tr><td>Atención al cliente</td><td>1181</td><td>1940</td></tr>
        <tr><td>Fallos</td><td>120</td><td>384</td></tr>
        <tr><td><b>Total</b></td><td><b>8085</b></td><td><b>9109</b></td></tr>
    </table>
    <ol class="FT_ol_a">
        <li>Halle la probabilidad de que una queja de 2016/17 fuera sobre "Atención al cliente". <div>2</div></li>${CR(2)}
        <li>Halle la probabilidad de que una queja de 2017/18 <i>no</i> fuera ni de "Facturación" ni de "Fallos". <div>3</div></li>${CR(3)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (a) $P = \\frac{1181}{8085} \\approx ${prob1a}$ (b) $P = \\frac{${notBillOrFault}}{9109} \\approx ${prob1c}$</div><br>`;

    // Problema 2: Temperaturas (Probabilidad condicional/frecuencia relativa)
    let june_gt30 = 9.4;
    let july_gt30 = 12.3;
    let aug_gt30 = 12.0;
    let total_gt30 = june_gt30 + july_gt30 + aug_gt30;
    let prob_c = (july_gt30 / total_gt30).toFixed(3);

    Pregunta += `<div class="problema2">2.- Temperaturas máximas diarias en Barcelona ($\\%$: días con temp $\\ge 30^{\\circ}C$):
    <table border="1" style="border-collapse: collapse; width: 60%; text-align: center;">
        <tr><th>Mes</th><th>Junio</th><th>Julio</th><th>Agosto</th></tr>
        <tr><td>$\\ge 30^{\\circ}C$</td><td>${june_gt30}</td><td>${july_gt30}</td><td>${aug_gt30}</td></tr>
    </table>
    <ol class="FT_ol_a">
        <li>Si elegimos un día de agosto al azar, estime la probabilidad de que la temperatura sea $\\ge 30^{\\circ}C$. <div>2</div></li>${CR(2)}
        <li>Sabiendo que un día de verano la temperatura fue $\\ge 30^{\\circ}C$, ¿cuál es la probabilidad de que dicho día fuera en julio? <div>3</div></li>${CR(3)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> (a) $P = \\frac{${aug_gt30}}{100} = 0.${aug_gt30*10}$ (b) $P = \\frac{${july_gt30}}{${total_gt30}} \\approx ${prob_c}$</div><br>`;

    // Problema 3: Tabla de contingencia
    let car = 30 + Math.floor(Math.random()*10);
    let bike = 5 + Math.floor(Math.random()*5);
    let bus = 13;
    let total = car + bike + bus;

    Pregunta += `<div class="problema2">3.- Una encuesta sobre el transporte de ${total} profesores:
    <table border="1" style="border-collapse: collapse; width: 50%; text-align: center;">
        <tr><td>Auto</td><td>Bicicleta</td><td>Bus</td></tr>
        <tr><td>${car}</td><td>${bike}</td><td>${bus}</td></tr>
    </table>
    <ol class="FT_ol_a">
        <li>Complete la tabla si el total de profesores es ${total}. Calcule la probabilidad de que un profesor elegido al azar use bicicleta. <div>3</div></li>${CR(3)}
        <li>Si elegimos un profesor que no usa auto, ¿cuál es la probabilidad de que use bus? <div>3</div></li>${CR(3)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P3:</b> (a) $P = \\frac{${bike}}{${total}} \\approx ${(bike/total).toFixed(3)}$ (b) $P = \\frac{${bus}}{${bike+bus}} \\approx ${(bus/(bike+bus)).toFixed(3)}$</div>`;

    return [Pregunta, Solucion];
}