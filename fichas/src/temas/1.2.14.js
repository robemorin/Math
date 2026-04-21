import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Fuente original: [25].pdf
 * Módulo diseñado para práctica de Sucesiones (Aritméticas y Geométricas)
 * Tiempo estimado: 40 minutos
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export function name() {
    return 'Práctica: Sucesiones y Series (IB Matemáticas)';
}

export async function pregunta() {
    // --- Problema 1: Sucesión Aritmética ---
    let a1 = Math.floor(Math.random() * 5) + 3;
    let d = Math.floor(Math.random() * 4) + 2;
    let term3 = a1 + 2 * d;
    let term4 = a1 + 3 * d;
    let n1 = 10;
    
    let Pregunta = `<div class="problema2">
    <h3>1. Sucesiones Aritméticas</h3>
    <p>Dada la sucesión aritmética: ${a1}, ${a1 + d}, ${term3}, ${term4}, \\dots</p>
    <ol class="FT_ol_a">
        <li>Determine el término general $u_n$. <div>2</div></li>${CR(1)}
        <li>Halle el valor del término número ${n1}. <div>2</div></li>${CR(1)}
        <li>Calcule la suma de los primeros ${n1} términos ($S_{${n1}}$). <div>3</div></li>${CR(3)}
    </ol></div><hr>`;

    let Solucion = `<div class="ans"><b>P1:</b> (1a) $u_n = ${a1} + (n-1)${d} = ${a1-d} + ${d}n$ (1b) $u_{${n1}} = ${a1 + (n1-1)*d}$ (1c) $S_{${n1}} = \\frac{${n1}}{2}(2(${a1}) + (${n1}-1)${d}) = ${(n1/2)*(2*a1 + (n1-1)*d)}$</div><br>`;

    // --- Problema 2: Sucesión Geométrica ---
    let g1 = 2;
    let r = (Math.random() > 0.5) ? 3 : -2;
    let n2 = 6;
    let g_n = g1 * Math.pow(r, n2 - 1);

    Pregunta += `<div class="problema2">
    <h3>2. Sucesiones Geométricas</h3>
    <p>Sea una sucesión geométrica donde $u_1 = ${g1}$ y la razón común es $r = ${r}$.</p>
    <ol class="FT_ol_a">
        <li>Escriba los primeros 4 términos de la sucesión. <div>2</div></li>${CR(1)}
        <li>Encuentre el término $u_{${n2}}$. <div>2</div></li>${CR(1)}
        <li>Si la serie fuera infinita, ¿podría calcular su suma? Justifique brevemente basándose en el valor de $r$. <div>2</div></li>${CR(3)}
    </ol></div><hr>`;

    Solucion += `<div class="ans"><b>P2:</b> (2a) ${g1}, ${g1*r}, ${g1*r*r}, ${g1*r*r*r} (2b) $u_{${n2}} = ${g_n}$ (2c) No, porque $|r| \\geq 1$ y la serie diverge.</div><br>`;

    // --- Problema 3: Aplicación / Intuición ---
    Pregunta += `<div class="problema2">
    <h3>3. Pensamiento Crítico</h3>
    <p>Considerando la paradoja del infinito y la teoría de los números:</p>
    <ol class="FT_ol_a">
        <li>Si tenemos la serie infinita $S = 1 - 1 + 1 - 1 + \\dots$, ¿cuáles serían las sumas parciales $S_1, S_2, S_3, S_4$? <div>3</div></li>${CR(2)}
        <li>Explique con sus palabras si este tipo de serie converge o diverge. <div>2</div></li>${CR(3)}
    </ol></div><div class="page"></div>`;

    Solucion += `<div class="ans"><b>P3:</b> (3a) $1, 0, 1, 0$ (3b) Diverge, no se aproxima a un valor único.</div>`;

    return [Pregunta, Solucion];
}