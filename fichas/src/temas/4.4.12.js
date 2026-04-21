import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Probabilidad y Diagramas de Árbol';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Problema basado en el ejercicio 7 del PDF [92].pdf
    let pct_f = 60;
    let pct_m = 40;
    let v_f = 20;
    let v_m = 30;

    let Pregunta = `<div class="problema2"><h3>Ejercicios de Probabilidad (Fuente: [92].pdf)</h3>
    1.- En una clase, el ${pct_f}\\% de los estudiantes son mujeres y el ${pct_m}\\% son hombres. El ${v_f}\\% de las mujeres y el ${v_m}\\% de los hombres tocan el violín.
    <ol class="FT_ol_a">
        <li>Complete el diagrama de árbol (dibújelo en el recuadro). ${CR(4)}</li>
        <li>Halle la probabilidad de que un estudiante elegido al azar:
            <ol type="i">
                <li>Sea hombre y no toque el violín. <div>2</div>${CR(2)}</li>
                <li>Toque el violín. <div>2</div>${CR(2)}</li>
            </ol>
        </li>
    </ol></div><hr>`;

    let prob_m_no_v = (pct_m / 100) * ((100 - v_m) / 100);
    let prob_v = (pct_f / 100) * (v_f / 100) + (pct_m / 100) * (v_m / 100);

    let Solucion = `<div class="ans"><b>P1:</b> (b.i) $P(M \\cap \\text{no violín}) = 0.4 \\times 0.7 = ${prob_m_no_v.toFixed(3)}$ (b.ii) $P(V) = 0.6 \\times 0.2 + 0.4 \\times 0.3 = ${prob_v.toFixed(2)}$</div><br>`;

    // Problema basado en el ejercicio 10 del PDF
    let ma_pct = 40;
    let mb_pct = 60;
    let s_a = 5;
    let s_b = 2;

    Pregunta += `<div class="problema2">2.- La máquina A produce el ${ma_pct}\\% de las botellas y la máquina B el resto. La máquina A tiene un ${s_a}\\% de tasa de productos estropeados y la máquina B un ${s_b}\\% de tasa de productos estropeados.
    <ol class="FT_ol_a">
        <li>Dibuje un diagrama de árbol para representar esta situación. ${CR(4)}</li>
        <li>Halle la probabilidad de que la siguiente botella inspeccionada esté estropeada. <div>3</div>${CR(3)}</li>
    </ol></div><hr>`;

    let prob_st = (ma_pct/100)*(s_a/100) + (mb_pct/100)*(s_b/100);
    Solucion += `<div class="ans"><b>P2:</b> $P(\\text{Estropeada}) = 0.4 \\times 0.05 + 0.6 \\times 0.02 = ${prob_st.toFixed(4)}$</div><br>`;

    // Problema basado en el ejercicio 11 del PDF
    let jA_w = 2, jA_r = 3; // total 5
    let jB_w = 3, jB_r = 1; // total 4

    Pregunta += `<div class="problema2">3.- El Jarro A contiene ${jA_w} discos blancos y ${jA_r} rojos. El Jarro B contiene ${jB_w} blancos y ${jB_r} rojos. Se elige un jarro al azar (con una moneda) y se extrae un disco.
    <ol class="FT_ol_a">
        <li>Determine la probabilidad de que el disco extraído sea rojo. <div>4</div>${CR(5)}</li>
    </ol></div><div class="page"></div>`;

    let p_r = 0.5 * (jA_r / (jA_w + jA_r)) + 0.5 * (jB_r / (jB_w + jB_r));
    Solucion += `<div class="ans"><b>P3:</b> $P(R) = 0.5 \\times \\frac{${jA_r}}{${jA_w + jA_r}} + 0.5 \\times \\frac{${jB_r}}{${jB_w + jB_r}} = ${p_r.toFixed(3)}$</div>`;

    return [Pregunta, Solucion];
}