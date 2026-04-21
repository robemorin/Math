import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Práctica de Sucesiones Geométricas (IB NM)';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Problema 1: Término general y valores
    let u1 = Math.floor(Math.random() * 5) + 2;
    let r = (Math.random() > 0.5 ? 2 : 3);
    let u4 = u1 * Math.pow(r, 3);
    let u7 = u1 * Math.pow(r, 6);

    // Problema 2: Encontrar r y u1 dados dos términos
    let r2 = (Math.random() > 0.5 ? 2 : -2);
    let a1 = Math.floor(Math.random() * 3) + 1;
    let term3 = a1 * Math.pow(r2, 2);
    let term6 = a1 * Math.pow(r2, 5);

    // Problema 3: Aplicación (Crecimiento exponencial)
    let p0 = 500 * (Math.floor(Math.random() * 5) + 1);
    let tasa = 1.05 + (Math.floor(Math.random() * 5) / 100);
    
    let Pregunta = `
    <div class="problema2"><h3>Ejercicios de Sucesiones Geométricas</h3>
    
    <p><b>1.-</b> Dada una progresión geométrica donde $u_1 = ${u1}$ y $u_4 = ${u4}$.</p>
    <ol class="FT_ol_a">
        <li>Halle la razón común $r$ y el término $u_7$. <div>3</div></li>${CR(2)}
        <li>Escriba la fórmula del término general $u_n$. <div>1</div></li>${CR(1)}
    </ol>

    <p><b>2.-</b> En una sucesión geométrica, $u_3 = ${term3}$ y $u_6 = ${term6}$.</p>
    <ol class="FT_ol_a">
        <li>Determine el valor de la razón común $r$. <div>2</div></li>${CR(2)}
        <li>Calcule el valor del primer término $u_1$. <div>2</div></li>${CR(2)}
    </ol>

    <p><b>3.-</b> Una población de bacterias comienza con ${p0}$ individuos y se multiplica por un factor de $${tasa.toFixed(2)}$ cada hora.</p>
    <ol class="FT_ol_a">
        <li>Escriba el número de bacterias presentes al cabo de 6 horas. <div>2</div></li>${CR(2)}
        <li>Determine cuántas horas deben transcurrir para que la población supere los ${p0 * 10}$ individuos. <div>3</div></li>${CR(3)}
    </ol>
    </div>`;

    let Solucion = `<div class="ans"><b>Clave de respuestas:</b><br>
    P1: (a) $r = ${r}, u_7 = ${u7}$ (b) $u_n = ${u1} \\times (${r})^{n-1}$ <br>
    P2: (a) $r = ${r2}$ (b) $u_1 = ${a1} <br>
    P3: (a) $${(p0 * Math.pow(tasa, 6)).toFixed(0)}$ bacterias (b) Usar calculadora: $u_n = ${p0} \\times (${tasa.toFixed(2)})^{n-1} > ${p0 * 10} \\Rightarrow n \\approx 47$ horas.
    </div>`;

    return [Pregunta, Solucion];
}