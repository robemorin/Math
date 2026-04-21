import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Probabilidad y Diagramas de Venn';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Contexto: Clase de estudiantes con diferentes características
    let total = 25;
    let tieneA = 12; // Conjunto A
    let tieneB = 10; // Conjunto B
    let interseccion = 4;
    let soloA = tieneA - interseccion;
    let soloB = tieneB - interseccion;
    let ninguno = total - (soloA + soloB + interseccion);

    let Pregunta = `<div class="problema2">
    <h3>Práctica de Probabilidad: Estudiantes y Conjuntos</h3>
    <p>En una clase de $${total}$ estudiantes, se ha realizado una encuesta sobre dos actividades extraescolares: Arte (A) y Baloncesto (B).
    Se sabe que $${tieneA}$ estudiantes practican Arte, $${tieneB}$ practican Baloncesto, y $${interseccion}$ practican ambas actividades.</p>
    
    <div class="row">
        <div class="col-6">
            <ol class="FT_ol_a">
                <li>Complete el siguiente diagrama de Venn con el número de estudiantes en cada región. <div>3</div></li>${CR(6)}
                <li>Halle la probabilidad de que un estudiante elegido al azar:
                    <ul style="list-style-type: lower-roman;">
                        <li>No practique ninguna de las dos actividades. <div>2</div></li>${CR(1)}
                        <li>Practique solo Arte. <div>2</div></li>${CR(1)}
                        <li>Practique Arte dado que practica Baloncesto. <div>3</div></li>${CR(1)}
                    </ul>
                </li>
            </ol>
        </div>
        <div class="col-6">
            <center><tlacuache-venn ancho="300" s1="${soloA}" s2="${soloB}" s3="${interseccion}" s4="${ninguno}"></tlacuache-venn></center>
        </div>
    </div>
    </div>
    <div class="page"></div>`;

    let Solucion = `<div class="ans"><b>Soluciones:</b><br>
    (1) Venn: Solo A=${soloA}, Solo B=${soloB}, Intersección=${interseccion}, Ninguno=${ninguno}.<br>
    (2i) $P(\\text{Ninguna}) = \\frac{${ninguno}}{${total}}$<br>
    (2ii) $P(\\text{Solo A}) = \\frac{${soloA}}{${total}}$<br>
    (2iii) $P(A|B) = \\frac{n(A \\cap B)}{n(B)} = \\frac{${interseccion}}{${tieneB}} = \\frac{${interseccion/2}/${tieneB/2}}$</div><br>`;

    // Problema 2: Lanzamiento de dos dados (Dinamizado)
    let dado1 = Math.floor(Math.random() * 6) + 1;
    let dado2 = Math.floor(Math.random() * 6) + 1;
    
    Pregunta += `<div class="problema2">
    <h3>Probabilidad: Lanzamiento de dos dados</h3>
    <p>Se lanzan dos dados justos de seis caras y se suma el resultado obtenido.</p>
    <ol class="FT_ol_a">
        <li>Construya una tabla de doble entrada para mostrar todos los resultados posibles (espacio muestral). <div>3</div></li>${CR(8)}
        <li>¿Cuál es la probabilidad de que la suma sea un número primo? <div>3</div></li>${CR(2)}
        <li>Si la suma fue mayor a $${dado1 + dado2 - 2}$, ¿cuál es la probabilidad de que la suma sea exactamente $${dado1 + dado2}$? <div>3</div></li>${CR(2)}
    </ol>
    </div>`;

    Solucion += `<div class="ans"><b>P2:</b> Resultados posibles: 36.<br>
    (2b) Primos posibles (2, 3, 5, 7, 11): Hay 1+2+4+6+2 = 15 casos. Probabilidad: $\\frac{15}{36} = \\frac{5}{12}$.</div>`;

    return [Pregunta, Solucion];
}