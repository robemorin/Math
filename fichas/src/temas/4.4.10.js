import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Probabilidad y Diagramas de Árbol';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Contexto: Bolas en bolsas (basado en ejercicio 11 del PDF)
    let rojas_x = 5, verdes_x = 2; // total 7
    let rojas_y = 4, verdes_y = 3; // total 7
    let rojas_z = 3, verdes_z = 2, azules_z = 3; // total 8

    let Pregunta = `<div class="problema2">
    <h3>Probabilidad: Extracción de bolas</h3>
    <p>Se tienen tres bolsas con la siguiente composición:</p>
    <ul>
        <li><b>Bolsa X:</b> ${rojas_x} rojas, ${verdes_x} verdes.</li>
        <li><b>Bolsa Y:</b> ${rojas_y} rojas, ${verdes_y} verdes.</li>
        <li><b>Bolsa Z:</b> ${rojas_z} rojas, ${verdes_z} verdes, ${azules_z} azules.</li>
    </ul>
    <p>Se extrae una bola al azar de cada una de las bolsas.</p>
    <ol class="FT_ol_a">
        <li>Dibuje un diagrama de árbol que ilustre los posibles resultados de extraer una bola de cada bolsa. <div>4</div></li>${CR(6)}
        <li>Calcule la probabilidad de que se extraigan 3 bolas azules. <div>2</div></li>${CR(2)}
        <li>Calcule la probabilidad de que se extraigan bolas de colores distintos de las bolsas X y Y (una roja y una verde, en cualquier orden). <div>3</div></li>${CR(3)}
        <li>Calcule la probabilidad de que al menos una de las bolas extraídas sea verde. <div>4</div></li>${CR(4)}
    </ol>
    </div>
    <div class="page"></div>`;

    let p_azul_z = azules_z / (rojas_z + verdes_z + azules_z);
    let p_3_azules = 0 * 0 * p_azul_z; // Imposible en X e Y
    
    // Prob X y Y distintas: (5/7 * 3/7) + (2/7 * 4/7) = 15/49 + 8/49 = 23/49
    let p_distintas = (rojas_x/7 * verdes_y/7) + (verdes_x/7 * rojas_y/7);
    
    // Al menos una verde: 1 - P(ninguna verde)
    // P(no verde X) = 5/7, P(no verde Y) = 4/7, P(no verde Z) = (3+3)/8 = 6/8
    let p_no_verde = (5/7) * (4/7) * (6/8);
    let p_al_menos_una_verde = 1 - p_no_verde;

    let Solucion = `<div class="ans"><b>Soluciones:</b><br>
    (2) $P(\\text{3 azules}) = 0$ (La bolsa X y Y no tienen azules).<br>
    (3) $P(\\text{X,Y distintas}) = \\frac{${rojas_x}}{7} \\cdot \\frac{${verdes_y}}{7} + \\frac{${verdes_x}}{7} \\cdot \\frac{${rojas_y}}{7} = \\frac{${(rojas_x * verdes_y) + (verdes_x * rojas_y)}}{49} \\approx ${p_distintas.toFixed(3)}$.<br>
    (4) $P(\\text{al menos una verde}) = 1 - P(\\text{ninguna verde}) = 1 - (\\frac{5}{7} \\cdot \\frac{4}{7} \\cdot \\frac{6}{8}) = 1 - \\frac{120}{392} = \\frac{272}{392} \\approx ${p_al_menos_una_verde.toFixed(3)}$.
    </div>`;

    return [Pregunta, Solucion];
}