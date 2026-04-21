import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Regla del seno y casos ambiguos';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br><br>";
    return s;
}

export async function pregunta() {
    // Problema 1: Aplicación directa de la Regla del Seno (Triángulo simple)
    let angA = 45 + Math.floor(Math.random() * 30);
    let ladoA = 10 + Math.floor(Math.random() * 10);
    let ladoB = 8 + Math.floor(Math.random() * 5);
    
    let Pregunta = `<div class="problema2">1.- En el triángulo ABC, se tiene que $\\hat{A} = ${angA}^\\circ$, $a = ${ladoA}\\text{ cm}$ y $b = ${ladoB}\\text{ cm}$.
    <ol class="FT_ol_a">
        <li>Halle la medida del ángulo $\\hat{B}$. <div>3</div></li>${CR(1)}
        <li>Halle la medida del lado $c$ y el área del triángulo. <div>4</div></li>${CR(2)}
    </ol></div><div class="page"></div>`;

    // Problema 2: Caso ambiguo (Similar a los ejercicios del PDF)
    let p = 10 + Math.floor(Math.random() * 5); // lado fijo
    let q = 12 + Math.floor(Math.random() * 5); // lado opuesto al ángulo
    let angleP = 35 + Math.floor(Math.random() * 10);
    
    Pregunta += `<div class="problema2">2.- En el triángulo PQR, $\\hat{P} = ${angleP}^\\circ$, $p = ${p}\\text{ cm}$ y $q = ${q}\\text{ cm}$.
    <ol class="FT_ol_a">
        <li>Muestre que existen dos posibles triángulos que cumplen estas condiciones mediante el cálculo de $\\hat{Q}$. <div>4</div></li>${CR(2)}
        <li>Para ambos casos, halle la longitud del lado $r$. <div>4</div></li>${CR(3)}
    </ol></div>`;

    // Problema 3: Contexto de navegación
    let dist1 = 15 + Math.floor(Math.random() * 10);
    let dist2 = 20 + Math.floor(Math.random() * 10);
    let angNav = 50 + Math.floor(Math.random() * 20);

    Pregunta += `<div class="problema2">3.- Un barco sale de un puerto y navega ${dist1} km en dirección N${angNav}^\\circ\\text{E}. Luego cambia de rumbo y navega ${dist2} km en línea recta hasta llegar a un faro.
    <ol class="FT_ol_a">
        <li>Si la distancia final al puerto es de ${Math.floor(dist1*0.8 + dist2*0.8)} km, ¿cuál es el ángulo de desviación realizado? <div>5</div></li>${CR(3)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>Soluciones Sugeridas:</b><br>
    <b>P1:</b> (a) Usando $\\frac{\\sin A}{a} = \\frac{\\sin B}{b} \\Rightarrow B \\approx ${((Math.asin(ladoB * Math.sin(angA * Math.PI / 180) / ladoA)) * 180 / Math.PI).toFixed(2)}^\\circ$. 
    (b) $C = 180 - A - B$, luego $c = \\frac{a \\sin C}{\\sin A}$.<br><br>
    <b>P2:</b> (a) $\\sin Q = \\frac{q \\sin P}{p}$. Dado que $q > p$, hay dos ángulos posibles para $Q$ (agudo y obtuso) que suman 180$\\Rightarrow$ verificando $P+Q < 180$.
    (b) Aplicar regla del coseno o seno nuevamente para hallar $r$ en ambos casos.<br><br>
    <b>P3:</b> (a) Utilizar la Regla del Coseno para hallar el ángulo opuesto al lado conocido.</div>`;

    return [Pregunta, Solucion];
}

// Nota: Fuente original de los ejercicios: [68].pdf (Capítulo 8, Trigonometría)