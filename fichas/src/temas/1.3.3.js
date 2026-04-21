import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Práctica: Sucesiones Geométricas y Modelización';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Fuente original: [9].pdf (Ejercicios sobre crecimientos y sucesiones geométricas)
    
    // Problema 1: Población de insectos (Contextualizado)
    let p0 = Math.floor(Math.random() * 200) + 300; // 300-500
    let r_perc = Math.floor(Math.random() * 10) + 5; // 5-15%
    let r = 1 + r_perc / 100;
    let t1 = 5 + Math.floor(Math.random() * 5); // 5-10
    let t2 = 15 + Math.floor(Math.random() * 5); // 15-20
    let target = Math.floor(p0 * Math.pow(r, 10)) + Math.floor(Math.random() * 100);

    let Pregunta = `<div class="problema2"><h3>1. Modelización de poblaciones</h3>
    Una población de insectos sigue un modelo de crecimiento geométrico. Inicialmente (t=0) hay $${p0}$ individuos y la población aumenta un $${r_perc}\\%$ cada semana.
    <ol class="FT_ol_a">
        <li>Escriba la expresión para $u_n$, donde $n$ representa el número de semanas transcurridas. <div>2</div></li>${CR(2)}
        <li>Determine el número de individuos tras ${t1} semanas y ${t2} semanas (redondee al entero más cercano). <div>3</div></li>${CR(3)}
        <li>¿Cuántas semanas tardará la población en superar los ${target}$ individuos? Justifique su respuesta mediante una ecuación. <div>3</div></li>${CR(3)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (1a) $u_n = ${p0} \\times (${r.toFixed(2)})^n$ (1b) $u_{${t1}} \\approx ${Math.round(p0 * Math.pow(r, t1))}$, $u_{${t2}} \\approx ${Math.round(p0 * Math.pow(r, t2))}$ (1c) $${p0}(${r.toFixed(2)})^n = ${target} \\Rightarrow n \\approx ${Math.log(target/p0)/Math.log(r)}$ semanas.</div><br>`;

    // Problema 2: Decaimiento (Enfermedad/Eraticus)
    let p0_2 = Math.floor(Math.random() * 500) + 500;
    let dec_perc = Math.floor(Math.random() * 4) + 2; // 2-6%
    let r2 = 1 - dec_perc / 100;
    let years = Math.floor(Math.random() * 10) + 5;

    Pregunta += `<div class="problema2"><h3>2. Decaimiento de especies</h3>
    Una colonia de animales, inicialmente de $${p0_2}$ individuos, disminuye a un ritmo constante del $${dec_perc}\\%$ anual.
    <ol class="FT_ol_a">
        <li>Escriba el valor de la razón común $r$ para esta sucesión. <div>1</div></li>${CR(1)}
        <li>Estime la población después de ${years} años. <div>2</div></li>${CR(2)}
        <li>En qué año la población será inferior a ${Math.round(p0_2 * 0.5)}$ individuos. <div>3</div></li>${CR(3)}
    </ol></div><div class="page"></div>`;

    Solucion += `<div class="ans"><b>P2:</b> (2a) $r = ${r2.toFixed(2)}$ (2b) $u_{${years}} \\approx ${Math.round(p0_2 * Math.pow(r2, years))}$ (2c) Resuelve $${p0_2}(${r2.toFixed(2)})^n < ${Math.round(p0_2 * 0.5)}$</div><br>`;

    // Problema 3: Análisis teórico
    let a = Math.floor(Math.random() * 5) + 2;
    let b = a * 3;
    let c = a * 9;

    Pregunta += `<div class="problema2"><h3>3. Propiedades algebraicas</h3>
    Tres términos consecutivos de una sucesión geométrica son $${a}, ${b}, ${c}$.
    <ol class="FT_ol_a">
        <li>Demuestre que la razón $r$ es constante. <div>2</div></li>${CR(2)}
        <li>Si el primer término fuera $u_1 = ${a}$, halle el término general $u_n$ y el valor de $u_{10}$. <div>3</div></li>${CR(3)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P3:</b> (3a) $r = \\frac{${b}}{${a}} = 3$ (3b) $u_n = ${a} \\times 3^{n-1}, u_{10} = ${a * Math.pow(3, 9)}$</div>`;

    return [Pregunta, Solucion];
}