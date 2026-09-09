import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Operaciones de Conjuntos y Probabilidad Condicional";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("4.6.5", "4. Estadística y probabilidad", "Ficha: Operaciones de Conjuntos y Probabilidad Condicional");

    // ==========================================
    // EJERCICIO 1 (CUARTILLA 1): CONSTRUCCIÓN Y CONDICIONAL
    // ==========================================
    const totalInst = 50;
    const piano = Math.floor(Math.random() * 5) + 25; // 25 a 29
    const violin = Math.floor(Math.random() * 5) + 20; // 20 a 24
    const ambosInst = Math.floor(Math.random() * 3) + 8; // 8 a 10

    const soloPiano = piano - ambosInst;
    const soloViolin = violin - ambosInst;
    const niPianoNiViolin = totalInst - (soloPiano + soloViolin + ambosInst);
    const exactamenteUno = soloPiano + soloViolin;

    const cond_violin_dado_piano = (ambosInst / piano).toFixed(3);
    const cond_piano_dado_uno = (soloPiano / exactamenteUno).toFixed(3);

    html += `
    <div class="seccion-title">I. Construcción de Diagrama de Venn y Probabilidad Condicional</div>
    <div class="exercise-step">
        <p><strong>1.</strong> En una escuela de música de ${totalInst} alumnos, se sabe que ${piano} estudian piano ($P$), ${violin} estudian violín ($V$) y ${ambosInst} cursan ambos instrumentos simultáneamente.</p>

        <ol class="FT_ol_a">
            <li>
                Complete el diagrama de Venn determinando el número exacto de alumnos en cada una de las cuatro regiones: <span class="mark">3</span>
                <div style="display: flex; justify-content: center; margin: 15px 0;">
                    <tlacuache-venn ancho="300" conjuntos="'Piano','Violín'" s1=" " s2=" " s3=" " s4=" "></tlacuache-venn>
                </div>
            </li>
            <li>
                Si se elige un estudiante al azar, calcule la probabilidad de que:
                <ol class="FT_ol_i">
                    <li>Estudie violín dado que ya estudia piano, es decir, $P(V \\mid P)$. <span class="mark">2</span>
                        <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
                    </li>
                    <li>Estudie piano, sabiendo que estudia exactamente uno de los dos instrumentos. <span class="mark">2</span>
                        <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
                    </li>
                </ol>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>
    `;

    // ==========================================
    // EJERCICIO 2 (CUARTILLA 2): DIAGRAMA DE TRES CONJUNTOS E IDIOMAS
    // ==========================================
    const s2_esp = Math.floor(Math.random() * 5) + 15;  // Solo Español
    const s3_esp_ing = Math.floor(Math.random() * 3) + 8; // Español e Inglés únicamente
    const s4_ing = Math.floor(Math.random() * 5) + 12;  // Solo Inglés
    const s5_esp_fra = Math.floor(Math.random() * 3) + 4; // Español y Francés únicamente
    const s6_todos = Math.floor(Math.random() * 2) + 3;   // Todos
    const s7_ing_fra = Math.floor(Math.random() * 3) + 5; // Inglés y Francés únicamente
    const s8_fra = Math.floor(Math.random() * 4) + 6;   // Solo Francés
    const s1_fuera = Math.floor(Math.random() * 5) + 8;  // Ninguno

    const totalIdiomas = s2_esp + s3_esp_ing + s4_ing + s5_esp_fra + s6_todos + s7_ing_fra + s8_fra + s1_fuera;

    const probEspFraNoIng = (s5_esp_fra / totalIdiomas).toFixed(3);
    const probEspIngNoFra = ((s2_esp + s3_esp_ing + s4_ing) / totalIdiomas).toFixed(3);
    const probAlMenosDos = ((s3_esp_ing + s5_esp_fra + s7_ing_fra + s6_todos) / totalIdiomas).toFixed(3);

    html += `
    <div class="seccion-title">II. Operaciones Compuestas con Tres Conjuntos</div>
    <div class="exercise-step">
        <p><strong>2.</strong> En un instituto internacional de idiomas con ${totalIdiomas} matriculados, se analizan los estudiantes de Español ($E$), Inglés ($I$) y Francés ($F$):</p>

        <div style="display: flex; justify-content: center; margin: 15px 0;">
            <tlacuache-venn ancho="320" n="3" conjuntos="'E','I','F'" s1="${s1_fuera}" s2="${s2_esp}" s3="${s3_esp_ing}" s4="${s4_ing}" s5="${s5_esp_fra}" s6="${s6_todos}" s7="${s7_ing_fra}" s8="${s8_fra}"></tlacuache-venn>
        </div>

        <p>Halle la probabilidad de que un estudiante elegido al azar:</p>
        <ol class="FT_ol_a">
            <li>Hable español y francés, pero <strong>no</strong> inglés: $P(E \\cap F \\cap I')$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>Hable español o inglés, pero <strong>no</strong> francés: $P((E \\cup I) \\cap F')$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>Hable al menos dos de los tres idiomas ofrecidos. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 4.6.5 (Operaciones de Conjuntos y Probabilidad Condicional):</b><br><br>

        <b>1. Música: Total = ${totalInst}</b><br>
        * a) Regiones: Solo Piano = ${soloPiano}, Solo Violín = ${soloViolin}, Ambos = ${ambosInst}, Ninguno = ${niPianoNiViolin}.<br>
        * b) Probabilidades Condicionales:<br>
        &nbsp;&nbsp;i. $P(V \\mid P) = \\frac{P(V \\cap P)}{P(P)} = \\frac{${ambosInst}}{${piano}} \\approx $ <b>${cond_violin_dado_piano}</b><br>
        &nbsp;&nbsp;ii. $P(P \\mid \\text{Exactamente uno}) = \\frac{${soloPiano}}{${exactamenteUno}} \\approx $ <b>${cond_piano_dado_uno}</b><br><br>

        <b>2. Idiomas: Total = ${totalIdiomas}</b><br>
        * a) $P(E \\cap F \\cap I') = \\frac{${s5_esp_fra}}{${totalIdiomas}} \\approx $ <b>${probEspFraNoIng}</b><br>
        * b) $P((E \\cup I) \\cap F') = \\frac{${s2_esp} + ${s3_esp_ing} + ${s4_ing}}{${totalIdiomas}} = \\frac{${s2_esp + s3_esp_ing + s4_ing}}{${totalIdiomas}} \\approx $ <b>${probEspIngNoFra}</b><br>
        * c) $P(\\text{Al menos dos}) = \\frac{${s3_esp_ing} + ${s5_esp_fra} + ${s7_ing_fra} + ${s6_todos}}{${totalIdiomas}} = \\frac{${s3_esp_ing + s5_esp_fra + s7_ing_fra + s6_todos}}{${totalIdiomas}} \\approx $ <b>${probAlMenosDos}</b>
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
