import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Evaluación de Sucesiones y Series Geométricas';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br><br>";
    return s;
}

export async function pregunta() {
    // Problema: Ejercicio 11/12 del PDF (Suma de términos)
    let a1 = 6;
    let r = 1.5;
    let n = 10;
    
    // Problema: Ejercicio 14 del PDF (Contexto Financiero)
    let inv1_a = 40000;
    let inc1_a = 0.05;
    let inv1_b = 60000;
    let inc1_b = 1000;

    let Pregunta = `<div class="problema">
    <h3>Parte A: Sucesiones y Series (Tiempo: 20 min)</h3>
    <ol>
        <li>Una sucesión geométrica tiene un primer término $u_1 = ${a1}$ y una razón común $r = ${r}$. Halle la suma de los primeros $n = ${n}$ términos. <div>(4 puntos)</div> ${CR(1)}</li>
        <li>Halle el valor de $n$ que satisface la igualdad: $\\sum_{k=1}^{n} 2 \\cdot 3^{k-1} = 177146$. <div>(5 puntos)</div> ${CR(2)}</li>
    </ol>
    
    <h3>Parte B: Modelización Financiera (Tiempo: 20 min)</h3>
    <p>Felicity recibe dos ofertas de trabajo por un periodo de $n$ años:</p>
    <ul>
        <li><b>Opción A:</b> $${inv1_a}$$ USD el primer año, con un aumento anual del $${inc1_a*100}\\%$.</li>
        <li><b>Opción B:</b> $${inv1_b}$$ USD el primer año, con un aumento fijo de $${inv1_b}$$ USD anuales.</li>
    </ul>
    <ol start="3">
        <li>Si Felicity planea trabajar 3 años, ¿qué opción le conviene más? Justifique su respuesta mostrando los cálculos del total acumulado para cada opción. <div>(4 puntos)</div> ${CR(3)}</li>
        <li>Escriba la expresión para el ingreso total acumulado en $n$ años para la Opción A ($T_A$) y la Opción B ($T_B$). <div>(3 puntos)</div> ${CR(3)}</li>
        <li>¿A partir de qué año el ingreso anual de la Opción A supera al de la Opción B? <div>(4 puntos)</div> ${CR(2)}</li>
    </ol>
    </div>`;

    let solA1 = (a1 * (Math.pow(r, n) - 1) / (r - 1)).toFixed(2);
    let solA2 = 11; // 2(3^n - 1)/(3-1) = 177146 => 3^n = 177147
    let solB3 = "Opción A: 40000(1.05^0 + 1.05^1 + 1.05^2) = 132405. Opción B: 60000+61000+62000 = 183000. Conviene B.";

    let Solucion = `<div class="ans">
    <b>Soluciones:</b><br>
    1. $S_{10} = \\frac{6(1.5^{10} - 1)}{1.5 - 1} \\approx ${solA1}$<br>
    2. $3^{n-1} = 88573$ no es entero exacto, verificar planteamiento: $3^n - 1 = 177146 \\Rightarrow 3^n = 177147 \\Rightarrow n = ${solA2}$<br>
    3. ${solB3}<br>
    4. $T_A = 800000(1.05^n - 1)$; $T_B = \\frac{n}{2}(2(60000) + (n-1)1000)$<br>
    5. Resolver $40000(1.05)^{n-1} > 60000 + (n-1)1000$ usando calculadora gráfica.
    </div>`;

    return [Pregunta, Solucion];
}