import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Ficha: Bondad de ajuste (1 renglón)
 * Importada de mate2/Fichas/fichas_estadistica.js
 * Tema 4.10 del temario.
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

function chitablas(dof, alpha) {
    const q = (alpha == 0.01 ? 0 : (alpha == 0.05 ? 1 : 2));
    const chit = [
        [6.635, 3.842, 2.706], [9.210, 5.992, 4.605], [11.345, 7.815, 6.251], [13.277, 9.488, 7.779],
        [15.086, 11.071, 9.236], [16.812, 12.592, 10.645], [18.475, 14.067, 12.017], [20.09, 15.507, 13.362],
        [21.666, 16.919, 14.684], [23.209, 18.307, 15.987], [24.725, 19.675, 17.275], [26.217, 21.026, 18.549],
        [27.688, 22.362, 19.812], [29.141, 23.685, 21.064], [30.578, 24.996, 22.307], [32.000, 26.296, 23.542],
        [33.409, 27.587, 24.769], [34.805, 28.869, 25.989], [36.191, 30.144, 27.204], [37.566, 31.41, 28.412],
        [38.932, 32.671, 29.615], [40.289, 33.925, 30.813], [41.638, 35.173, 32.007], [42.98, 36.415, 33.196],
        [44.314, 37.653, 34.382], [45.642, 38.885, 35.563], [46.963, 40.113, 36.741], [48.278, 41.337, 37.916],
        [49.588, 42.557, 39.088]
    ];
    return chit[Math.min(dof - 1, 28)][q];
}

export function name() {
    return "Ficha: Prueba de Bondad de Ajuste";
}

export function tipo() {
    return 1; // Ficha imprimible
}

export async function pregunta(np, code) {
    // Página 1: Apuntes
    let Pregunta = `<div class="problema2" style="font-family: Arial, sans-serif; line-height: 1.6;">
    `;

    // Problema 1
    let P1_n = Math.floor(Math.random() * 5 + 10) * 12; // Múltiplo de 4
    let E_val = P1_n / 4;
    let O1 = [
        E_val + Math.floor(Math.random() * 8) - 4,
        E_val + Math.floor(Math.random() * 8) - 4,
        E_val + Math.floor(Math.random() * 8) - 4
    ];
    O1.push(P1_n - O1[0] - O1[1] - O1[2]);

    Pregunta += `<div class="problema2" style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h3>Problema 1: Distribución Uniforme</h3>
    <p>Se desea probar si la preferencia por cuatro marcas de jugos (A, B, C, D) se distribuye de manera uniforme entre los consumidores. Se toma una muestra de ${P1_n} personas y se obtienen las siguientes frecuencias observadas ($f_o$):</p>
    <center><table border="1" cellpadding="8" cellspacing="0" style="margin-top: 10px; margin-bottom: 10px; width:90%; text-align:center; border-collapse: collapse;">
    <tr style="background-color: #f2f2f2;"><th>Marca</th><th>A</th><th>B</th><th>C</th><th>D</th><th>Total</th></tr>
    <tr><td>Frecuencia Observada ($f_o$)</td><td>${O1[0]}</td><td>${O1[1]}</td><td>${O1[2]}</td><td>${O1[3]}</td><td>${P1_n}</td></tr>
    </table></center>
    <p>Realice una prueba de hipótesis de bondad de ajuste con un nivel de significancia de $\\alpha = 0.05$.</p>
    
    <ol class="FT_ol_a">
        <li>Escriba la hipótesis nula ($H_0$) y la hipótesis alternativa ($H_1$).<div>1</div></li>${CR(2)}
        <li>Determine y escriba la tabla de datos esperados ($f_e$). Muestre su procedimiento.<div>2</div></li>
        <center><table border="1" cellpadding="8" cellspacing="0" style="margin-top: 10px; margin-bottom: 20px; width:90%; text-align:center; border-collapse: collapse;">
        <tr style="background-color: #f2f2f2;"><th>Marca</th><th>A</th><th>B</th><th>C</th><th>D</th><th>Total</th></tr>
        <tr><td>Frecuencia Esperada ($f_e$)</td><td></td><td></td><td></td><td></td><td></td></tr>
        </table></center>${CR(1)}
        <li>Determine los grados de libertad.<div>1</div></li>${CR(1)}
        <li>Calcule el valor de la $\\chi^2$ calculada ($\\chi^2_{Calc}$). Muestre su procedimiento manual.<div>2</div></li>${CR(4)}
        <div class="page"></div>
        <li value="5">Determine el valor de la $\\chi^2$ crítica usando la tabla de distribución $\\chi^2$ para $\\alpha=0.05$.<div>1</div></li>${CR(2)}
        <li>Compare la $\\chi^2_{Calc}$ con la $\\chi^2_{Crit}$ y determine si se rechaza $H_0$.<div>1</div></li>${CR(2)}
        <li>Use la calculadora ($\\chi^2$ GOF-Test) para obtener el valor $p$. Apunte los comandos.<div>1</div></li>${CR(2)}
        <li>Redacte una conclusión general contextualizada al problema.<div>2</div></li>${CR(3)}
    </ol></div><div class="page"></div>`;

    // Problema 2
    let P2_n = Math.floor(Math.random() * 200 + 400); // 400 a 600
    let p1 = Math.floor(Math.random() * 5 + 20); // 20-25%
    let p2 = Math.floor(Math.random() * 5 + 15); // 15-20%
    let p3 = Math.floor(Math.random() * 5 + 10); // 10-15%
    let p4 = 100 - p1 - p2 - p3; // Resto ~40%

    let p_E = [p1 / 100, p2 / 100, p3 / 100, p4 / 100];
    let O2 = [
        Math.floor(P2_n * p_E[0]) + Math.floor((Math.random() - 0.5) * 15),
        Math.floor(P2_n * p_E[1]) + Math.floor((Math.random() - 0.5) * 15),
        Math.floor(P2_n * p_E[2]) + Math.floor((Math.random() - 0.5) * 15)
    ];
    O2.push(P2_n - O2[0] - O2[1] - O2[2]);

    Pregunta += `<div class="problema2" style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h3>Problema 2: Distribución Histórica</h3>
    <p>De los fumadores de cierta región se sabe históricamente que el ${p1}% desarrolla cáncer a largo plazo, un ${p2}% desarrolla enfisema, un ${p3}% desarrolla alguna complicación pulmonar leve, mientras que el resto no tiene padecimiento alguno derivado.</p> 
    <p>Un equipo de salud pública cree que, con los nuevos hábitos, las proporciones actuales son diferentes. Examinan una muestra aleatoria de ${P2_n} fumadores, encontrando que:</p>
    <ul>
    <li>${O2[0]} desarrollaron cáncer.</li>
    <li>${O2[1]} desarrollaron enfisema.</li>
    <li>${O2[2]} desarrollaron complicaciones pulmonares leves.</li>
    <li>${O2[3]} no desarrollaron ningún cuadro clínico aparente.</li>
    </ul>
    <p>Realice una prueba de bondad de ajuste con un nivel de significancia del 5% para evaluar la creencia del equipo.</p>
    <ol class="FT_ol_a">
        <li>Escriba las hipótesis nula y alternativa.<div>1</div></li>${CR(2)}
        <li>Deduzca la tabla de datos esperados ($f_e$) a partir del porcentaje histórico. Muestre su procedimiento de cálculo para cada categoría.<div>3</div></li>
        <center><table border="1" cellpadding="8" cellspacing="0" style="margin-top: 10px; margin-bottom: 20px; width:90%; text-align:center; border-collapse: collapse;">
        <tr style="background-color: #f2f2f2;"><th>Condición</th><th>Cáncer</th><th>Enfisema</th><th>Complicaciones</th><th>Nada</th><th>Total</th></tr>
        <tr><td>Frecuencia Esperada ($f_e$)</td><td></td><td></td><td></td><td></td><td></td></tr>
        </table></center>${CR(1)}
        <li>Determine el valor de los grados de libertad y calcule $\\chi^2_{Calc}$.<div>2</div></li>${CR(3)}
        <div class="page"></div>
        <li>Obtenga el valor $p$ usando su calculadora TI-84. Anote el procedimiento de la calculadora.<div>1</div></li>${CR(3)}
        <li>Obtenga $\\chi^2_{Crit}$ de las tablas, compárela con $\\chi^2_{Calc}$ y redacte una conclusión en contexto para el equipo de salud pública.<div>1</div></li>${CR(3)}
        <li>Compare el valor de $p$ con $\\alpha$ y verifique que coincide con la conclusión anterior.<div>2</div></li>${CR(3)}
    </ol>
    </div><div class="page"></div>`;

    // Solución
    let chiCal1 = 0;
    for (let i = 0; i < 4; i++) chiCal1 += Math.pow(O1[i] - E_val, 2) / E_val;
    let chiCrit1 = chitablas(3, 0.05);

    let E2 = [P2_n * p_E[0], P2_n * p_E[1], P2_n * p_E[2], P2_n * p_E[3]];
    let chiCal2 = 0;
    for (let i = 0; i < 4; i++) chiCal2 += Math.pow(O2[i] - E2[i], 2) / E2[i];
    let chiCrit2 = chitablas(3, 0.05);

    let Solucion = `<div class="ans">
        <div style="font-weight: bold;">Problema 1</div>
        <div>(a) $H_0$: La preferencia de marca se distribuye uniformemente. $H_1$: La preferencia no es uniforme.</div>
        <div>(b) Todos los datos esperados son $f_e = \\frac{${P1_n}}{4} = ${E_val}$.</div>
        <div>(c) Grados de libertad $gl = 4 - 1 = 3$.</div>
        <div>(d) $\\chi^2_{Calc} = \\sum \\frac{(f_o - f_e)^2}{f_e} \\approx ${chiCal1.toFixed(3)}$.</div>
        <div>(e) Para $\\alpha=0.05$ y $gl=3$, $\\chi^2_{Crit} = ${chiCrit1}$.</div>
        <div>(f) Si $\\chi^2_{Calc} > \\chi^2_{Crit}$, se rechaza $H_0$; de lo contrario, no se rechaza $H_0$.</div>
        <br>
        <div style="font-weight: bold;">Problema 2</div>
        <div>(a) $H_0$: Las proporciones se mantienen en ${p1}\\%, ${p2}\\%, ${p3}\\%, y ${p4}\\%. $H_1$: Al menos una proporción difiere.</div>
        <div>(b) Datos esperados $f_e$: Cáncer=${E2[0].toFixed(1)}, Enfisema=${E2[1].toFixed(1)}, Leve=${E2[2].toFixed(1)}, Nada=${E2[3].toFixed(1)}.</div>
        <div>(c) Grados de libertad $gl = 3$. $\\chi^2_{Calc} \\approx ${chiCal2.toFixed(3)}$.</div>
        <div>(d)-(f) $\\chi^2_{Crit} = ${chiCrit2}$. Se compara y se concluye basandose en p-value o $\\chi^2_{Calc}$.</div>
        </div>`;

    return [Pregunta, Solucion];
}

export async function render(container, n, code) {}
