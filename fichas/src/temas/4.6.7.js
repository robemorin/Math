import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Ley de la Adición y Sucesos Mutuamente Excluyentes";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("4.6.7", "4. Estadística y probabilidad", "Ficha: Ley de la Adición y Sucesos Mutuamente Excluyentes");

    // ==========================================
    // EJERCICIO 1 (CUARTILLA 1): LEY DE LA ADICIÓN Y CONDICIÓN DE EXCLUSIVIDAD
    // ==========================================
    const pA = parseFloat((Math.floor(Math.random() * 4) * 0.1 + 0.3).toFixed(2));
    const pB = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.2).toFixed(2));
    const pInt = parseFloat((Math.floor(Math.random() * 3) * 0.05 + 0.05).toFixed(2));
    const pUnion = parseFloat((pA + pB - pInt).toFixed(2));

    const sonExcluyentes = Math.random() > 0.5;
    const pX = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.3).toFixed(2));
    const pY = parseFloat((Math.floor(Math.random() * 3) * 0.1 + 0.2).toFixed(2));
    
    let pInt2, pUnion2;
    if (sonExcluyentes) {
        pInt2 = 0.0;
        pUnion2 = parseFloat((pX + pY).toFixed(2));
    } else {
        pInt2 = parseFloat((Math.floor(Math.random() * 2) * 0.05 + 0.1).toFixed(2));
        pUnion2 = parseFloat((pX + pY - pInt2).toFixed(2));
    }

    html += `
    <div class="seccion-title">I. Ley General de la Adición y Análisis de Intersecciones</div>
    <div class="exercise-step">
        <p><strong>1.</strong> Sean $A$ y $B$ dos eventos pertenecientes al mismo espacio muestral tales que:</p>
        <p style="text-align:center; font-size:1.05em;">
            $$P(A) = ${pA}, \\quad P(B) = ${pB}, \\quad P(A \\cap B) = ${pInt}$$
        </p>
        <ol class="FT_ol_a">
            <li>Calcule el valor exacto de la probabilidad de la unión $P(A \\cup B)$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>Indique, justificando con base en los datos dados, si los eventos $A$ y $B$ son mutuamente excluyentes. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>

        <p style="margin-top: 25px;"><strong>2.</strong> Para dos eventos $X$ e $Y$, se conoce que $P(X) = ${pX}$, $P(Y) = ${pY}$ y $P(X \\cup Y) = ${pUnion2}$.</p>
        <ol class="FT_ol_a">
            <li>Halle el valor de la probabilidad conjunta $P(X \\cap Y)$. <span class="mark">3</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>Determine si los eventos $X$ e $Y$ son mutuamente excluyentes (disjuntos). <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>
    `;

    // ==========================================
    // EJERCICIO 2 (CUARTILLA 2): CONTEXTO APLICADO EN EL AULA
    // ==========================================
    const totalClase = 30;
    const cantA = Math.floor(Math.random() * 4) + 6;  // 6 a 9 alumnos con A
    const cantB = Math.floor(Math.random() * 5) + 10; // 10 a 14 alumnos con B

    const probA_val = (cantA / totalClase).toFixed(3);
    const probB_val = (cantB / totalClase).toFixed(3);
    const probUnion3 = ((cantA + cantB) / totalClase).toFixed(3);
    const resto = totalClase - (cantA + cantB);
    const probNiANiB = (resto / totalClase).toFixed(3);

    html += `
    <div class="seccion-title">II. Eventos Disjuntos en Contextos Educativos</div>
    <div class="exercise-step">
        <p><strong>3.</strong> En un grupo de ${totalClase} estudiantes de una clase de Matemáticas del IB, al finalizar el semestre exactamente ${cantA} estudiantes obtuvieron una calificación de 7 y ${cantB} estudiantes obtuvieron una calificación de 6. Cada estudiante recibe una única calificación final.</p>

        <p>Sea $A$ el suceso "obtener calificación de 7" y $B$ el suceso "obtener calificación de 6". Se elige un estudiante al azar.</p>
        <ol class="FT_ol_a">
            <li>Explique por qué los sucesos $A$ y $B$ son estrictamente mutuamente excluyentes en este contexto. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>Calcule $P(A)$ y $P(B)$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>Halle la probabilidad de que el estudiante seleccionado haya obtenido un 7 o un 6, es decir, $P(A \\cup B)$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>Determine la probabilidad de que el estudiante no haya obtenido ni un 7 ni un 6: $P((A \\cup B)')$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 4.6.7 (Ley de la Adición y Sucesos Mutuamente Excluyentes):</b><br><br>

        <b>1. Eventos $A$ y $B$:</b><br>
        * a) $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = ${pA} + ${pB} - ${pInt} = $ <b>${pUnion}</b>.<br>
        * b) No son mutuamente excluyentes porque $P(A \\cap B) = ${pInt} \\neq 0$.<br><br>

        <b>2. Eventos $X$ e $Y$:</b><br>
        * a) $P(X \\cap Y) = P(X) + P(Y) - P(X \\cup Y) = ${pX} + ${pY} - ${pUnion2} = $ <b>${pInt2.toFixed(2)}</b>.<br>
        * b) ${sonExcluyentes ? "<b>Sí son mutuamente excluyentes</b> porque $P(X \\cap Y) = 0$." : "<b>No son mutuamente excluyentes</b> porque $P(X \\cap Y) = " + pInt2.toFixed(2) + " > 0$."}<br><br>

        <b>3. Calificaciones en el Aula:</b><br>
        * a) Son mutuamente excluyentes porque un mismo alumno no puede recibir dos calificaciones finales distintas simultáneamente ($A \\cap B = \\emptyset$).<br>
        * b) $P(A) = \\frac{${cantA}}{${totalClase}} \\approx $ <b>${probA_val}</b>; $P(B) = \\frac{${cantB}}{${totalClase}} \\approx $ <b>${probB_val}</b>.<br>
        * c) $P(A \\cup B) = P(A) + P(B) = \\frac{${cantA} + ${cantB}}{${totalClase}} \\approx $ <b>${probUnion3}</b>.<br>
        * d) $P((A \\cup B)') = 1 - P(A \\cup B) = 1 - \\frac{${cantA + cantB}}{${totalClase}} = \\frac{${resto}}{${totalClase}} \\approx $ <b>${probNiANiB}</b>.
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
