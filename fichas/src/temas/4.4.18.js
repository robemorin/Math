import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Práctica de Probabilidad y Diagramas';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Ejercicio 10 adaptado: Problema de conjuntos de estudiantes
    let total = 40;
    let econ = 22;
    let law = 25;
    let neither = 3;
    let both = (econ + law) - (total - neither);
    let onlyEcon = econ - both;
    let onlyLaw = law - both;

    let Pregunta = `<div class="problema2"><h3>Práctica de Probabilidad (Tiempo estimado: 40 min)</h3>
    <p>1.- En un grupo de ${total} estudiantes, ${econ} estudian Economía, ${law} estudian Derecho, y ${neither} no cursan ninguna de estas asignaturas.</p>
    <ol class="FT_ol_a">
        <li>Represente esta información en un diagrama de Venn. <div>3</div></li>${CR(6)}
        <li>Determine la probabilidad de que un estudiante elegido al azar:
            <ol style="list-style-type: lower-roman;">
                <li>Estudie ambas asignaturas. <div>2</div></li>${CR(2)}
                <li>Estudie al menos una de estas asignaturas. <div>2</div></li>${CR(2)}
                <li>Estudie Economía dado que estudia Derecho. <div>3</div></li>${CR(2)}
            </ol>
        </li>
    </ol></div>`;

    let pBoth = both / total;
    let pAtLeast = (total - neither) / total;
    let pEconGivenLaw = both / law;

    let Solucion = `<div class="ans"><b>P1:</b> (1a) Venn con intersección ${both}, solo Econ ${onlyEcon}, solo Derecho ${onlyLaw}. (1b-i) $${both}/${total} = ${(pBoth).toFixed(3)}$. (1b-ii) $${total - neither}/${total} = ${(pAtLeast).toFixed(3)}$. (1b-iii) $${both}/${law} = ${(pEconGivenLaw).toFixed(3)}$.</div><br>`;

    // Ejercicio 13 adaptado: Tabla de contingencia
    let totalP = 200;
    let mujeres = 90;
    let hombres = 110;
    let fumadores = 60;
    let fFumadores = 20; // Supuesto: 20 mujeres fuman
    let mFumadores = fumadores - fFumadores;
    
    Pregunta += `<div class="problema2">2.- Una encuesta a ${totalP} personas indicó que ${mujeres} eran mujeres. Se encontró que ${fumadores} personas fumaban, de las cuales ${hombres - (hombres - 40)} (ajustado: 40) eran hombres. 
    <ol class="FT_ol_a">
        <li>Complete la siguiente tabla de contingencia: <div>4</div></li>
        <table border="1" style="margin-top:10px; width:60%; text-align:center;">
            <tr><td></td><td>Mujer</td><td>Hombre</td><td>Total</td></tr>
            <tr><td>Fuma</td><td>${CR(1)}</td><td>40</td><td>${fumadores}</td></tr>
            <tr><td>No fuma</td><td>${CR(1)}</td><td>${CR(1)}</td><td>${CR(1)}</td></tr>
            <tr><td>Total</td><td>${mujeres}</td><td>${hombres}</td><td>${totalP}</td></tr>
        </table>${CR(2)}
        <li>Si se elige una persona al azar, calcule:
            <ol style="list-style-type: lower-roman;">
                <li>La probabilidad de que sea mujer no fumadora. <div>2</div></li>${CR(1)}
                <li>La probabilidad de que sea hombre, dado que es no fumador. <div>3</div></li>${CR(1)}
            </ol>
        </li>
    </ol></div><div class="page"></div>`;

    let mNoFuma = hombres - 40;
    let fNoFuma = mujeres - (fumadores - 40);
    let totalNoFuma = totalP - fumadores;

    Solucion += `<div class="ans"><b>P2:</b> Tabla: Fuma-M:${fumadores-40}, NoFuma-M:${fNoFuma}, NoFuma-H:${mNoFuma}. (2b-i) $${fNoFuma}/${totalP}$. (2b-ii) $${mNoFuma}/${totalNoFuma}$.</div><br>`;

    // Ejercicio 14 adaptado: Independencia
    let pA = 0.4;
    let pB = 0.3;
    let pBA = 0.5;

    Pregunta += `<div class="problema2">3.- Para dos eventos A y B, se sabe que $P(A) = ${pA}$, $P(B) = ${pB}$ y $P(B | A) = ${pBA}$.
    <ol class="FT_ol_a">
        <li>Calcule $P(A \\cap B)$. <div>2</div></li>${CR(2)}
        <li>Muestre si los eventos A y B son independientes o no. Justifique su respuesta. <div>3</div></li>${CR(3)}
    </ol></div>`;

    let pAnB = pBA * pA;
    let indep = (pAnB === pA * pB);

    Solucion += `<div class="ans"><b>P3:</b> (3a) $P(A \\cap B) = P(B|A) \\cdot P(A) = ${pBA} \\cdot ${pA} = ${pAnB}$. (3b) $P(A) \\cdot P(B) = ${pA * pB}$. Como ${pAnB} \\neq ${pA * pB}$, los eventos ${indep ? "son" : "no son"} independientes.</div>`;

    return [Pregunta, Solucion];
}