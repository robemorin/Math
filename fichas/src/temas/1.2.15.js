import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Evaluación: Sucesiones y Series (IB Matemáticas NM)';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br><br>";
    return s;
}

export async function pregunta() {
    // Parámetros dinámicos para los problemas
    let a1 = Math.floor(Math.random() * 5) + 3; // primer término
    let d = Math.floor(Math.random() * 4) + 2;   // diferencia
    let n_val = 20;

    // Problema 1: Sucesión Aritmética básica
    let Pregunta = `<div class="problema2">
    <h3>1. Sucesiones Aritméticas</h3>
    <p>Una sucesión aritmética tiene como primer término $u_1 = ${a1}$ y diferencia común $d = ${d}$.</p>
    <ol class="FT_ol_a">
        <li>Determine el término general $u_n$. <div>2</div></li>${CR(1)}
        <li>Calcule el valor del término $u_{${n_val}}$. <div>2</div></li>${CR(1)}
        <li>Halle la suma de los primeros ${n_val} términos ($S_{${n_val}}$). <div>3</div></li>${CR(1)}
    </ol></div>`;

    // Problema 2: Contexto (modelo lineal)
    let p_inicial = 500 + Math.floor(Math.random() * 5) * 100;
    let incremento = 50 + Math.floor(Math.random() * 5) * 10;
    
    Pregunta += `<div class="problema2">
    <h3>2. Modelización (Aplicación)</h3>
    <p>Un gimnasio registra un aumento constante de sus membresías. En el primer mes se inscribieron ${p_inicial} personas y cada mes siguiente se inscriben ${incremento} personas más que el anterior.</p>
    <ol class="FT_ol_a">
        <li>¿Cuántas personas se inscribirán en el mes 12? <div>3</div></li>${CR(2)}
        <li>¿Cuál es el número total de inscripciones acumuladas al finalizar el primer año (12 meses)? <div>3</div></li>${CR(2)}
    </ol></div>`;

    // Problema 3: Propiedades de la sucesión
    let u_n = 60 + Math.floor(Math.random() * 10) * 2;
    let u_m = 100 + Math.floor(Math.random() * 5) * 4;
    
    Pregunta += `<div class="problema2">
    <h3>3. Análisis de términos</h3>
    <p>En una progresión aritmética, se sabe que el 5º término es ${u_n} y el 10º término es ${u_m}.</p>
    <ol class="FT_ol_a">
        <li>Halle el primer término $u_1$ y la diferencia común $d$. <div>4</div></li>${CR(3)}
        <li>Determine el valor de $n$ tal que $u_n = 200$. <div>3</div></li>${CR(3)}
    </ol></div>`;

    // Soluciones
    let Solucion = `<div class="ans"><b>Soluciones:</b>
    <br><b>P1:</b> (1a) $u_n = ${a1} + (n-1)${d} = ${d}n + ${a1 - d}$ (1b) $u_{20} = ${a1 + 19 * d}$ (1c) $S_{20} = 10(${2 * a1 + 19 * d}) = ${10 * (2 * a1 + 19 * d)}$
    <br><b>P2:</b> (2a) $u_{12} = ${p_inicial} + 11(${incremento}) = ${p_inicial + 11 * incremento}$ (2b) $S_{12} = 6(2*${p_inicial} + 11*${incremento}) = ${6 * (2 * p_inicial + 11 * incremento)}$
    <br><b>P3:</b> (3a) $d = (${u_m} - ${u_n})/5 = ${(u_m - u_n) / 5}$, $u_1 = ${u_n} - 4d = ${u_n - 4 * (u_m - u_n) / 5}$ (3b) $200 = u_1 + (n-1)d$
    </div>`;

    return [Pregunta, Solucion];
}