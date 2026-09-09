import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Probabilidad Condicional y Teorema de Bayes";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("4.7.2", "4. Estadística y probabilidad", "Ficha: Probabilidad Condicional y Teorema de Bayes");

    // ==========================================
    // EJERCICIO 1 (CUARTILLA 1): CONDICIONAL BÁSICA Y TABLA DE FRECUENCIAS
    // ==========================================
    const pA = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.5).toFixed(2)); // 0.5, 0.6, 0.7
    const pB = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.3).toFixed(2)); // 0.3, 0.4, 0.5
    const pInt = parseFloat((Math.floor(Math.random() * 2) * 0.05 + 0.15).toFixed(2)); // 0.15, 0.20
    const pUnion = parseFloat((pA + pB - pInt).toFixed(2));

    const cond_A_dado_B = (pInt / pB).toFixed(3);
    const cond_B_dado_A = (pInt / pA).toFixed(3);

    // Contexto de idiomas
    const totalEstudiantes = 100;
    const esp = Math.floor(Math.random() * 10) + 55; // 55 a 64
    const fra = Math.floor(Math.random() * 10) + 35; // 35 a 44
    const ambos = Math.floor(Math.random() * 5) + 15; // 15 a 19

    const soloEsp = esp - ambos;
    const soloFra = fra - ambos;
    const exactUno = soloEsp + soloFra;

    const cond_fra_dado_esp = (ambos / esp).toFixed(3);
    const cond_esp_dado_uno = (soloEsp / exactUno).toFixed(3);

    html += `
    <div class="seccion-title">I. Definición de Probabilidad Condicional y Espacios Muestrales Reducidos</div>
    <div class="exercise-step">
        <p><strong>1.</strong> Sean $A$ y $B$ dos eventos de un mismo espacio muestral tales que $P(A) = ${pA}$, $P(B) = ${pB}$ y $P(A \\cup B) = ${pUnion}$.</p>
        <ol class="FT_ol_a">
            <li>
                Halle el valor exacto de la probabilidad de la intersección $P(A \\cap B)$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Calcule el valor de las probabilidades condicionales:
                <ol class="FT_ol_i">
                    <li>$P(A \\mid B)$ <span class="mark">2</span>
                        <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
                    </li>
                    <li>$P(B \\mid A)$ <span class="mark">2</span>
                        <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
                    </li>
                </ol>
            </li>
        </ol>

        <p style="margin-top: 25px;"><strong>2.</strong> En una escuela que cuenta con un grupo de $${totalEstudiantes}$ estudiantes, $${esp}$ estudian Español ($S$), $${fra}$ estudian Francés ($F$) y $${ambos}$ estudian ambos idiomas simultáneamente. Se elige un estudiante al azar.</p>
        <ol class="FT_ol_a">
            <li>
                Calcule la probabilidad de que el estudiante curse Francés sabiendo que ya cursa Español: $P(F \\mid S)$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Halle la probabilidad de que el estudiante curse únicamente Español, dado que se sabe que estudia exactamente uno solo de los dos idiomas. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>
    `;

    // ==========================================
    // EJERCICIO 2 (CUARTILLA 2): PROBABILIDAD CONDICIONAL INVERSA (TEOREMA DE BAYES)
    // ==========================================
    const pLluvia = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.2).toFixed(2)); // 0.2, 0.3, 0.4
    const pNoLluvia = parseFloat((1 - pLluvia).toFixed(2));
    const pCine_dado_L = parseFloat((Math.floor(Math.random() * 2) * 0.1 + 0.7).toFixed(2)); // 0.7, 0.8
    const pCine_dado_noL = parseFloat((Math.floor(Math.random() * 2) * 0.1 + 0.3).toFixed(2)); // 0.3, 0.4

    const pCine_total = parseFloat((pLluvia * pCine_dado_L + pNoLluvia * pCine_dado_noL).toFixed(4));
    const pLluvia_dado_Cine = ((pLluvia * pCine_dado_L) / pCine_total).toFixed(4);

    html += `
    <div class="seccion-title">II. Probabilidad Total y Probabilidad A Posteriori (Teorema de Bayes)</div>
    <div class="exercise-step">
        <p><strong>3.</strong> La probabilidad de que mañana llueva ($L$) en una ciudad es de $${pLluvia}$. Si llueve, la probabilidad de que Juan asista al cine ($C$) es de $${pCine_dado_L}$. Si no llueve ($L'$), la probabilidad de que asista al cine es de $${pCine_dado_noL}$.</p>

        <ol class="FT_ol_a">
            <li>
                Construya un diagrama de árbol o esquema que represente las distintas combinaciones de sucesos y sus respectivas probabilidades. <span class="mark">2</span>
                <div style="border: 1px dashed #bbb; height: 130px; margin: 8px 0; background-color: #fafafa; border-radius: 4px;"></div>
            </li>
            <li>
                Demuestre que la probabilidad total de que Juan vaya al cine mañana es $P(C) = ${pCine_total}$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Sabiendo que Juan fue al cine esa tarde, halle la probabilidad de que haya llovido: $P(L \\mid C)$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 4.7.2 (Probabilidad Condicional y Teorema de Bayes):</b><br><br>

        <b>1. Eventos Abstractos:</b><br>
        * a) $P(A \\cap B) = P(A) + P(B) - P(A \\cup B) = ${pA} + ${pB} - ${pUnion} = $ <b>${pInt}</b><br>
        * b) (i) $P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{${pInt}}{${pB}} \\approx $ <b>${cond_A_dado_B}</b><br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(ii) $P(B \\mid A) = \\frac{P(A \\cap B)}{P(A)} = \\frac{${pInt}}{${pA}} \\approx $ <b>${cond_B_dado_A}</b><br><br>

        <b>2. Estudiantes de Idiomas:</b><br>
        * a) $P(F \\mid S) = \\frac{n(F \\cap S)}{n(S)} = \\frac{${ambos}}{${esp}} \\approx $ <b>${cond_fra_dado_esp}</b><br>
        * b) Solo Español = $${esp} - ${ambos} = ${soloEsp}$. Solo Francés = $${fra} - ${ambos} = ${soloFra}$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Exactamente un idioma = $${soloEsp} + ${soloFra} = ${exactUno}$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;$P(S \\mid \\text{Exacto 1}) = \\frac{${soloEsp}}{${exactUno}} \\approx $ <b>${cond_esp_dado_uno}</b><br><br>

        <b>3. Lluvia y Cine (Bayes):</b><br>
        * a) Diagrama de árbol con ramas $L$ (${pLluvia}) y $L'$ (${pNoLluvia}); desde $L$: $C$ (${pCine_dado_L}) y $C'$ (${(1-pCine_dado_L).toFixed(2)}); desde $L'$: $C$ (${pCine_dado_noL}) y $C'$ (${(1-pCine_dado_noL).toFixed(2)}).<br>
        * b) $P(C) = P(L)P(C \\mid L) + P(L')P(C \\mid L') = (${pLluvia})(${pCine_dado_L}) + (${pNoLluvia})(${pCine_dado_noL}) = $ <b>${pCine_total}</b><br>
        * c) $P(L \\mid C) = \\frac{P(L \\cap C)}{P(C)} = \\frac{(${pLluvia})(${pCine_dado_L})}{${pCine_total}} = \\frac{${(pLluvia*pCine_dado_L).toFixed(3)}}{${pCine_total}} \\approx $ <b>${pLluvia_dado_Cine}</b>
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
