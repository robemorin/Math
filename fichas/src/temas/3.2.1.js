import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Módulo de práctica: Razones trigonométricas en triángulos rectángulos.
 * Fuente original: [42].pdf
 * Tiempo estimado: 40 minutos.
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export function name() {
    return 'Razones Trigonométricas - Ejercicios de Práctica';
}

export async function pregunta() {
    // Generación de variables aleatorias para problemas dinámicos
    const angulo1 = 20 + Math.floor(Math.random() * 50);
    const lado1 = 5 + Math.floor(Math.random() * 10);
    const angulo2 = 25 + Math.floor(Math.random() * 40);
    const hipotenusa = 10 + Math.floor(Math.random() * 15);
    
    let Pregunta = `<div class="problema">
    <h3>Parte 1: Construcción de Ecuaciones Trigonométricas</h3>
    <p>Para cada triángulo rectángulo dado, construya una ecuación trigonométrica (usando sin, cos o tan) que conecte el ángulo dado con los lados especificados.</p>
    <ol class="FT_ol_a">
        <li>Un triángulo tiene un ángulo de $${angulo1}^\\circ$, un cateto adyacente de longitud $${lado1}$ cm y una hipotenusa $x$. <div>3</div></li>${CR(2)}
        <li>Un triángulo tiene un ángulo de $${angulo2}^\\circ$, un cateto opuesto $x$ y una hipotenusa de $${hipotenusa}$ m. <div>3</div></li>${CR(2)}
    </ol></div>`;

    Pregunta += `<div class="problema">
    <h3>Parte 2: Resolución de Triángulos</h3>
    <p>Calcule la longitud $x$ en los siguientes casos. Asegúrese de dar su respuesta con 3 cifras significativas.</p>
    <div style="display:flex; justify-content:space-around;">
        <div style="width:45%;">
            <li>Triángulo con cateto opuesto $x$, cateto adyacente $12$ cm y ángulo de $42^\\circ$. <div>3</div>${CR(2)}</li>
        </div>
        <div style="width:45%;">
            <li>Triángulo con hipotenusa $x$, cateto opuesto $8$ m y ángulo de $55^\\circ$. <div>3</div>${CR(2)}</li>
        </div>
    </div></div>`;

    // Problema de contexto: Cálculo de altura
    const dist = 15 + Math.floor(Math.random() * 10);
    const ang_el = 35 + Math.floor(Math.random() * 10);

    Pregunta += `<div class="problema">
    <h3>Parte 3: Aplicación - Topografía</h3>
    <p>Usted está midiendo la altura de un edificio. Se encuentra a una distancia horizontal de $${dist}$ metros de la base y observa la parte superior con un ángulo de elevación de $${ang_el}^\\circ$.</p>
    <ol class="FT_ol_a">
        <li>Dibuje un diagrama simple de la situación. <div>2</div></li>${CR(4)}
        <li>Calcule la altura del edificio. <div>3</div></li>${CR(2)}
    </ol></div>`;

    let sol1 = `\\cos(${angulo1}^\\circ) = \\frac{${lado1}}{x}`;
    let sol2 = `\\sin(${angulo2}^\\circ) = \\frac{x}{${hipotenusa}}`;
    let sol3 = `\\tan(42^\\circ) = \\frac{x}{12} \\Rightarrow x \\approx ${(12 * Math.tan(42 * Math.PI / 180)).toFixed(3)}`;
    let sol4 = `\\sin(55^\\circ) = \\frac{8}{x} \\Rightarrow x \\approx ${(8 / Math.sin(55 * Math.PI / 180)).toFixed(3)}`;
    let sol5 = `${dist} \\times \\tan(${ang_el}^\\circ) \\approx ${(dist * Math.tan(ang_el * Math.PI / 180)).toFixed(2)} \\text{ m}`;

    let Solucion = `<div class="ans">
        <b>Soluciones:</b><br>
        1. ${sol1}, ${sol2}<br>
        2. ${sol3}, ${sol4}<br>
        3. Altura = ${sol5}
    </div>`;

    return [Pregunta, Solucion];
}