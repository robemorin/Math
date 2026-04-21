import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Fuente original: [18].pdf
 * Módulo para práctica de Sucesiones y Notación Sigma (IB Math AA/AI).
 * Tiempo estimado: 40 minutos.
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Generación dinámica de datos
    let a1 = Math.floor(Math.random() * 5) + 2;
    let d = Math.floor(Math.random() * 4) + 2;
    let n_val = 6;
    
    // Ejercicio 1: Sumatoria básica
    let k_start = Math.floor(Math.random() * 3) + 1;
    let k_end = k_start + 4;
    let sum_val = 0;
    for(let k = k_start; k <= k_end; k++) sum_val += (k + a1);

    let Pregunta = `<div class="problema2"><h3>Práctica de Sucesiones y Series</h3>
    1.- Evalúe la siguiente sumatoria expandiendo sus términos:
    <br><br>
    <center>$\\sum_{k=${k_start}}^{${k_end}} (k + ${a1})$</center>
    <div style="height: 100px; border: 1px dashed #ccc;"></div>
    </div>${CR(1)}`;

    // Ejercicio 2: Sucesión definida por término general
    let u_expr = `u_n = \\frac{1}{n + ${a1}}`;
    
    Pregunta += `<div class="problema2">2.- Considere la sucesión definida por $${u_expr}$.
    <ol class="FT_ol_a">
        <li>Escriba los primeros 4 términos de la sucesión. <div>2</div></li>${CR(2)}
        <li>Halle el valor de $S_4$. <div>2</div></li>${CR(2)}
    </ol></div>${CR(1)}`;

    // Ejercicio 3: Problema contextualizado (Modelización)
    let inicio = 200 + Math.floor(Math.random() * 50);
    let incremento = 15 + Math.floor(Math.random() * 10);
    
    Pregunta += `<div class="problema2">3.- Un auditorio tiene ${inicio} asientos en la primera fila y cada fila subsiguiente tiene ${incremento} asientos más que la anterior.
    <ol class="FT_ol_a">
        <li>Escriba una expresión para el número de asientos en la fila $n$. <div>2</div></li>${CR(1)}
        <li>Si el auditorio tiene 12 filas, ¿cuántos asientos hay en total? <div>3</div></li>${CR(2)}
    </ol></div>${CR(1)}`;

    // Ejercicio 4: Propiedades de la notación Sigma
    Pregunta += `<div class="problema2">4.- Utilizando las propiedades de la notación sigma, calcule:
    <br><br>
    <center>$\\sum_{k=1}^{5} (3k + 2)$</center>
    <div style="height: 120px; border: 1px dashed #ccc;"></div>
    </div><div class="page"></div>`;

    // Soluciones
    let Solucion = `<div class="ans"><b>Soluciones:</b><br>
    P1: La suma es $${sum_val}$.<br>
    P2: (a) $u_1 = 1/${1+a1}, u_2 = 1/${2+a1}, \\dots$ (b) $S_4$ es la suma de los 4 términos.<br>
    P3: (a) $u_n = ${inicio} + (n-1)${incremento} (b) $S_{12} = \\frac{12}{2}(2(${inicio}) + 11(${incremento}))$.<br>
    P4: $3\\sum k + \\sum 2 = 3(15) + 10 = 55$.</div>`;

    return [Pregunta, Solucion];
}

export function name() {
    return 'Sucesiones y Series (IB)';
}