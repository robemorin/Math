import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

/* 
 * Fuente original: [87].pdf
 * Módulo para práctica de Probabilidad y Diagramas de Venn
 * Tiempo estimado: 40 minutos
 */

export function name() {
    return 'Probabilidad y Diagramas de Venn';
}

function CR(n) {
    return "<br>".repeat(n);
}

export async function pregunta() {
    // Generación de datos aleatorios para los problemas
    const n1 = Math.floor(Math.random() * 20) + 30; // Total de ovejas
    const B = Math.floor(Math.random() * 10) + 5;   // Con lana negra
    const U = n1;
    
    const s1 = Math.floor(Math.random() * 30) + 20; // Solo esquían
    const s2 = Math.floor(Math.random() * 30) + 20; // Solo snowboard
    const both = Math.floor(Math.random() * 10) + 5; // Ambos
    const neither = Math.floor(Math.random() * 10) + 2; // Ninguno
    const total_survey = s1 + s2 + both + neither;

    let Pregunta = `
    <div class="problema2">
        <h3>Ejercicios de Probabilidad y Diagramas de Venn</h3>
        <p><i>Instrucciones: Resuelva los siguientes problemas mostrando su procedimiento.</i></p>
        
        <div class="problema2">
            <strong>1. (Ovejas)</strong> En un corral hay ${U} ovejas. El evento $B$ representa ovejas con lana negra, donde hay ${B} ovejas con esta característica.
            <ol class="FT_ol_a">
                <li>Calcule la probabilidad de que una oveja seleccionada al azar tenga lana negra. <div>2</div></li>${CR(2)}
                <li>Calcule la probabilidad de que la oveja seleccionada <b>no</b> tenga lana negra. <div>2</div></li>${CR(2)}
            </ol>
        </div>

        <div class="problema2">
            <strong>2. (Deportes de invierno)</strong> En una encuesta a ${total_survey} personas sobre si les gusta esquiar ($S$) o hacer snowboard ($B$), los resultados se muestran a continuación:
            <br><br>
            <center><tlacuache-venn ancho="300" n="2" s1="${s1}" s2="${s2}" s3="${both}" s4="${neither}"></tlacuache-venn></center>
            <ol class="FT_ol_a">
                <li>Determine la probabilidad de que una persona elegida al azar le gusten ambas actividades. <div>2</div></li>${CR(2)}
                <li>Determine la probabilidad de que no le guste ninguna de las dos actividades. <div>2</div></li>${CR(2)}
                <li>Determine la probabilidad de que le guste exactamente una actividad. <div>2</div></li>${CR(2)}
            </ol>
        </div>
        
        <div class="page"></div>

        <div class="problema2">
            <strong>3. (Geografía e Historia)</strong> En una clase, ${s1+s2+both} estudiantes estudian Geografía ($G$) o Historia ($H$).
            <br>
            <ol class="FT_ol_a">
                <li>Si ${both} estudiantes cursan ambas, ${s1} solo Geografía y ${s2} solo Historia, ¿cuántos estudiantes hay en total en la clase (incluyendo a ${neither} que no cursan ninguna)? <div>2</div></li>${CR(2)}
                <li>Halle $P(G \\cap H)$. <div>2</div></li>${CR(2)}
                <li>Halle $P(G \\cup H)'$. <div>2</div></li>${CR(2)}
            </ol>
        </div>
    </div>`;

    let Solucion = `<div class="ans">
        <b>Soluciones:</b><br>
        <b>P1:</b> (a) $${B}/${U} = ${(B/U).toFixed(3)}$ (b) $${U-B}/${U} = ${((U-B)/U).toFixed(3)}$<br>
        <b>P2:</b> (a) $${both}/${total_survey}$ (b) $${neither}/${total_survey}$ (c) $${s1+s2}/${total_survey}$<br>
        <b>P3:</b> (a) $${s1+s2+both+neither}$ (b) $${both}/${s1+s2+both+neither}$ (c) $${neither}/${s1+s2+both+neither}$
    </div>`;

    return [Pregunta, Solucion];
}