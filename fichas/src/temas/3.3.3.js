import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Regla del Coseno: Aplicaciones Geométricas';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Generar parámetros aleatorios para el problema (triángulo ABC)
    let b = Math.floor(Math.random() * 5) + 6; // Lado b
    let c = Math.floor(Math.random() * 5) + 6; // Lado c
    let A = Math.floor(Math.random() * 40) + 30; // Ángulo A entre 30 y 70
    
    // Calcular lado a (opuesto al ángulo A)
    let a = Math.sqrt(Math.pow(b, 2) + Math.pow(c, 2) - 2 * b * c * Math.cos(A * Math.PI / 180));

    let Pregunta = `<div class="problema2">
    <h3>Práctica: La Regla del Coseno (Fuente original: [60].pdf)</h3>
    <p>Considere el triángulo ABC donde el ángulo comprendido entre los lados conocidos es $\\hat{A} = ${A}^\\circ$, $AC = ${b}$ cm y $AB = ${c}$ cm.</p>
    
    <ol class="FT_ol_a">
        <li>Enuncie la fórmula de la regla del coseno para hallar el lado $a$ (opuesto al ángulo $\\hat{A}$). <div>2</div></li>${CR(2)}
        <li>Calcule la longitud del lado $a$. Muestre su procedimiento. <div>3</div></li>${CR(4)}
        <li>Si el triángulo tuviera un ángulo $\\hat{A} = 90^\\circ$, ¿cómo se simplifica la regla del coseno? Nombre el teorema resultante. <div>2</div></li>${CR(2)}
        <li><b>Reto de aplicación:</b> Un topógrafo necesita calcular la distancia entre dos puntos $B$ y $C$ separados por un obstáculo. Si desde un punto $A$ mide las distancias $AB = 12$ m, $AC = 15$ m y el ángulo $\\hat{A} = 55^\\circ$, ¿cuál es la distancia entre $B$ y $C$? <div>3</div></li>${CR(4)}
    </ol>
    </div>
    <div class="page"></div>`;

    let Solucion = `<div class="ans">
    <b>Solución Esperada:</b><br>
    P1: $a^2 = b^2 + c^2 - 2bc \\cos(A)$<br>
    P2: $a = \\sqrt{${b}^2 + ${c}^2 - 2(${b})(${c}) \\cos(${A}^\\circ)} \\approx ${a.toFixed(2)}$ cm.<br>
    P3: La regla se convierte en el Teorema de Pitágoras: $a^2 = b^2 + c^2$ (ya que $\\cos(90^\\circ) = 0$).<br>
    P4: $BC = \\sqrt{12^2 + 15^2 - 2(12)(15) \\cos(55^\\circ)} \\approx \\sqrt{144 + 225 - 360(0.5736)} \\approx \\sqrt{162.5} \\approx 12.75$ m.
    </div>`;

    return [Pregunta, Solucion];
}