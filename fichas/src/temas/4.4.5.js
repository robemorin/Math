import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Probabilidad Básica y Complementos';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Fuente original: [85].pdf
    
    // Problema 1: Canasta de frutas (Basado en Ejemplo 6)
    let n1 = Math.floor(Math.random() * 3) + 2; // Rojas
    let n2 = Math.floor(Math.random() * 3) + 2; // Verdes
    let n3 = Math.floor(Math.random() * 3) + 2; // Amarillas
    let total = n1 + n2 + n3;

    let Pregunta = `<div class="problema2"><h3>1.- Selección aleatoria en una canasta</h3>
    <p>Una canasta contiene ${n1} manzanas rojas, ${n2} verdes y ${n3} amarillas. Si se selecciona una al azar:</p>
    <ol class="FT_ol_a">
        <li>Determine la probabilidad de que sea roja. <div>2</div></li>${CR(1)}
        <li>Determine la probabilidad de que sea roja o amarilla. <div>2</div></li>${CR(1)}
        <li>Determine la probabilidad de que sea morada. <div>1</div></li>${CR(1)}
    </ol></div>`;

    let solP1_a = `${n1}/${total}`;
    let solP1_b = `${n1 + n3}/${total}`;
    let Solucion = `<div class="ans"><b>P1:</b> (a) $P(R) = ${solP1_a}$ (b) $P(R \\cup A) = ${solP1_b}$ (c) $P(M) = 0$</div><br>`;

    // Problema 2: Dado y eventos complementarios (Basado en Ejemplo 7)
    let dado_n = 6;
    let num_evitar = Math.floor(Math.random() * 3) + 2; // número de caras a evitar
    
    Pregunta += `<div class="problema2"><h3>2.- Lanzamiento de un dado</h3>
    <p>Se lanza un dado ordinario de 6 caras.</p>
    <ol class="FT_ol_a">
        <li>Halle la probabilidad de obtener un número mayor a ${dado_n - num_evitar}. <div>2</div></li>${CR(1)}
        <li>Utilizando el concepto de evento complementario, halle la probabilidad de NO obtener un número menor o igual a ${dado_n - num_evitar}. <div>2</div></li>${CR(1)}
    </ol></div>`;

    let solP2_a = `${num_evitar}/6`;
    Solucion += `<div class="ans"><b>P2:</b> (a) $${solP2_a} = ${ (num_evitar/6).toFixed(2) }$ (b) $1 - P(\\text{menor o igual}) = 1 - ${1 - (num_evitar/6).toFixed(2)} = ${ (num_evitar/6).toFixed(2) }$</div><br>`;

    // Problema 3: Teoría general
    Pregunta += `<div class="problema2"><h3>3.- Conceptos de Probabilidad</h3>
    <ol class="FT_ol_a">
        <li>Si $P(A) = 0.35$, ¿cuál es la probabilidad del evento complementario $P(A')$? <div>2</div></li>${CR(1)}
        <li>¿Por qué la suma de todas las probabilidades en un espacio muestral debe ser igual a 1? Justifique. <div>2</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P3:</b> (a) $1 - 0.35 = 0.65$ (b) Los eventos cubren todo el espacio muestral y son mutuamente excluyentes.</div><br>`;

    // Problema 4: Urna con bolas de colores
    let b1 = Math.floor(Math.random() * 5) + 5;
    let b2 = Math.floor(Math.random() * 5) + 5;
    
    Pregunta += `<div class="problema2"><h3>4.- Extracción de bolas</h3>
    <p>Una urna tiene ${b1} bolas blancas y ${b2} bolas negras. Se extrae una bola.</p>
    <ol class="FT_ol_a">
        <li>Si la probabilidad de extraer una bola blanca es $P(B) = \\frac{${b1}}{${b1+b2}}$, ¿cuántas bolas habría en la urna si agregamos 5 blancas más? <div>3</div></li>${CR(1)}
        <li>¿Cuál sería la nueva probabilidad de extraer una bola negra? <div>2</div></li>${CR(1)}
    </ol></div><div class="page"></div>`;

    let total2 = b1 + b2 + 5;
    Solucion += `<div class="ans"><b>P4:</b> (a) ${total2} bolas en total. (b) $P(N) = ${b2}/${total2}$</div>`;

    return [Pregunta, Solucion];
}