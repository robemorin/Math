import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Probabilidad y Estadística (IB Aplicaciones)';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

// Fuente original: [96].pdf
export async function pregunta() {
    // Problema 1: Probabilidad simple
    let p_snow = 3 / 7;
    let weeks = 5;
    let days = weeks * 7;
    let expected = Math.round(days * p_snow);

    let Pregunta = `<div class="problema2">1. Durante la temporada de nieve, la probabilidad de que caiga nieve en cualquier día dado es de $${p_snow.toFixed(3)}$ (aproximadamente). Si Udo esquía durante ${weeks} semanas, ¿cuántos días puede esperar ver caer nieve? <div>3</div></div>${CR(3)}`;

    let Solucion = `<div class="ans"><b>P1:</b> Esperanza = $${days} \\times \\frac{3}{7} = ${expected}$ días.</div><br>`;

    // Problema 2: Tablas de frecuencia (Muestreo)
    let A = 160 + Math.floor(Math.random() * 20);
    let B = 80 + Math.floor(Math.random() * 20);
    let C = 40 + Math.floor(Math.random() * 20);
    let total = A + B + C;
    let muestra = 7500;

    Pregunta += `<div class="problema2">2. En una encuesta, los votantes prefieren candidatos según la tabla:
    <center><table border="1" style="border-collapse: collapse; text-align: center; width: 50%;">
    <tr><th>Candidato</th><th>A</th><th>B</th><th>C</th></tr>
    <tr><td>Votos</td><td>${A}</td><td>${B}</td><td>${C}</td></tr>
    </table></center>
    <ol class="FT_ol_a">
        <li>Estime la probabilidad de que un votante elija a A, B o C. <div>3</div></li>${CR(2)}
        <li>Si ${muestra} personas votan, ¿cuántos espera que voten por A? <div>2</div></li>${CR(2)}
    </ol></div>${CR(1)}`;

    Solucion += `<div class="ans"><b>P2:</b> (a) $P(A)=${(A/total).toFixed(3)}, P(B)=${(B/total).toFixed(3)}, P(C)=${(C/total).toFixed(3)}$. (b) $${muestra} \\times \\frac{${A}}{${total}} \\approx ${Math.round(muestra * A / total)}$.</div><br>`;

    // Problema 3: Probabilidad condicional (Cáncer)
    // P(Pos|C) = 0.95, P(Pos|noC) = 0.03, P(C) = 0.02
    let prob_pos_C = 0.95;
    let prob_pos_noC = 0.03;
    let prob_C = 0.02;
    let pop = 5000;
    
    // Bayes: P(C|Pos) = (P(Pos|C)*P(C)) / (P(Pos|C)*P(C) + P(Pos|noC)*P(noC))
    let numerator = prob_pos_C * prob_C;
    let denominator = (prob_pos_C * prob_C) + (prob_pos_noC * (1 - prob_C));
    let result_a = (numerator / denominator).toFixed(4);

    Pregunta += `<div class="problema2">3. Un test de cáncer tiene una probabilidad de positivo de ${prob_pos_C * 100}\\% si tiene cáncer y ${prob_pos_noC * 100}\\% si no lo tiene. La incidencia es del ${prob_C * 100}\\% de la población.
    <ol class="FT_ol_a">
        <li>Si un test da positivo, ¿cuál es la probabilidad de que la persona tenga cáncer? <div>4</div></li>${CR(3)}
        <li>De ${pop} personas, ¿cuántos casos positivos se esperan (correctos o falsos)? <div>3</div></li>${CR(2)}
    </ol></div><div class="page"></div>`;

    Solucion += `<div class="ans"><b>P3:</b> (a) $P(C|+) = \\frac{${numerator}}{${numerator} + ${prob_pos_noC * (1 - prob_C)}} = ${result_a}$. (b) Total positivos = ${Math.round(pop * (numerator + prob_pos_noC * (1 - prob_C)))}.</div>`;

    return [Pregunta, Solucion];
}