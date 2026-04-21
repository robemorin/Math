// Generado a partir de: 1.2.5.js (Original movido a src/temporal/)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return 'Sucesiones Aritméticas: Término General';
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    // --- DATOS ALEATORIOS ---
    const u1_1 = Math.floor(Math.random() * 8) + 3;
    const d_1 = Math.floor(Math.random() * 5) + 3;
    const n_1 = 15 + Math.floor(Math.random() * 10);
    const seq1 = [u1_1, u1_1 + d_1, u1_1 + 2 * d_1, u1_1 + 3 * d_1];

    const d_2 = Math.floor(Math.random() * 4) + 2;
    const u3_2 = 20 + Math.floor(Math.random() * 10);
    const u8_2 = u3_2 + 5 * d_2;
    const u1_2 = u3_2 - 2 * d_2;

    const inicial = 50 + Math.floor(Math.random() * 20);
    const incremento = 5 + Math.floor(Math.random() * 5);

    // --- CONSTRUCCIÓN DEL HTML ---
    html += ai.getHeader("1.2.5", "Sucesiones Aritméticas", "Matemáticas AI NM - Sucesiones");

    html += `
        <div class="seccion-title">I. Fundamentos y Término General</div>
        <div class="exercise-step">
            Considere la siguiente sucesión aritmética: $${seq1.join(', ')}, \\dots$
            <ol class="FT_ol_a">
                <li>Escriba el valor de la diferencia común, $d$. <span class="mark">1</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Halle una expresión para el término general $u_n$. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Calcule el valor de $u_{${n_1}}$. <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
            </ol>
        </div>

        <div class="seccion-title">II. Determinación de Parámetros</div>
        <div class="exercise-step">
            En una sucesión aritmética, se sabe que $u_3 = ${u3_2}$ y $u_8 = ${u8_2}$.
            <ol class="FT_ol_a">
                <li>Muestre que la diferencia común $d$ es $${d_2}$. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Halle el primer término de la sucesión, $u_1$. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            </ol>
        </div>

        ${ai.getTiTip("Puedes usar el modo <code>SEQ</code> en <code>MODE</code>. Define $u(n) = u(n-1) + d$ y revisa la tabla con <code>2nd + TABLE</code>.")}

        <div class="page-break"></div>

        <div class="seccion-title">III. Modelización Matemáticas</div>
        <div class="exercise-step">
            <div class="contexto-especial">
                <b>Situación: El Plan de Entrenamiento.</b><br>
                Marco corre $${inicial}$ km en la semana 1. Cada semana siguiente, aumenta su distancia en $${incremento}$ km adicionales.
            </div>
            <ol class="FT_ol_a">
                <li>Halle la distancia que correrá Marco en la semana 10. <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Determine en qué semana Marco correrá por primera vez una distancia superior a 150 km. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Explique si este modelo lineal es sostenible a largo plazo. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            </ol>
        </div>

        <div class="seccion-title">IV. Verificación Gráfica</div>
        <div style="text-align: center;">
            <tlacuache-ejes size="320, 300" xlim="0, 7" ylim="0, ${seq1[3] + d_1 * 2}" dx="1" dy="5" grid="true" xlabel="n" ylabel="u_n"></tlacuache-ejes>
        </div>
    </div>
    `;

    // --- SOLUCIONARIO ---
    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 1.2.5:</b><br>
        1a. $d = ${d_1}$ [A1] | 1b. $u_n = ${u1_1} + (n-1)\\cdot ${d_1}$ [M1 A1] | 1c. $u_{${n_1}} = ${u1_1 + (n_1 - 1) * d_1}$ [A2]<br>
        2a. $5d = ${u8_2 - u3_2} \\rightarrow d = ${d_2}$ [M1 A1] | 2b. $u_1 = ${u1_2}$ [M1 A1]<br>
        3a. $u_{10} = ${inicial + 9 * incremento}$ km [A2] | 3b. $n > ${(150 - inicial) / incremento + 1} \\rightarrow$ Semana ${Math.ceil((150 - inicial) / incremento + 1)}$ [M1 A2]
    </div>
    `;

    return [html, solucion];
}

export async function renderGeoGebra(container, totalElements) {}
