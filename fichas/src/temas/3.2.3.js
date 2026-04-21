import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Razones Trigonométricas en Triángulos Rectángulos';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br><br><br>";
    return s;
}

export async function pregunta() {
    // Problemas basados en el PDF [44].pdf (Página 180)
    
    // Problema 1: Cálculo de ángulos
    let catA = Math.floor(Math.random() * 5) + 5;
    let catB = Math.floor(Math.random() * 5) + 8;
    let hip = Math.sqrt(catA**2 + catB**2).toFixed(1);
    
    // Problema 2: Altura en triángulos (Contexto de construcción)
    let base = (Math.floor(Math.random() * 4) + 3) * 2;
    let lado = (Math.floor(Math.random() * 3) + 6);
    let altura = Math.sqrt(lado**2 - (base/2)**2).toFixed(2);

    let Pregunta = `<div class="problema">
    <h3>Práctica de Trigonometría (Aplicaciones e Interpretaciones)</h3>
    <p><b>Instrucciones:</b> Resuelva los siguientes ejercicios mostrando sus procedimientos. Tiempo estimado: 40 minutos.</p>
    
    <div class="problema2">1.- En un triángulo rectángulo, los catetos miden $${catA}\\text{ m}$ y $${catB}\\text{ m}$.
    <ol class="FT_ol_a">
        <li>Calcule la medida de la hipotenusa. <div>2</div></li>${CR(0.5)}
        <li>Halle el valor de los dos ángulos agudos del triángulo (utilice funciones trigonométricas inversas). <div>3</div></li>${CR(1)}
    </ol></div>

    <div class="problema2">2.- Un arquitecto diseña un techo triangular isósceles con una base de $${base}\\text{ m}$ y dos lados iguales de $${lado}\\text{ m}$.
    <ol class="FT_ol_a">
        <li>Dibuje un esquema del triángulo y trace la altura correspondiente a la base. <div>1</div></li>${CR(2)}
        <li>Calcule la altura ($x$) del techo. <div>3</div></li>${CR(1)}
        <li>Determine el ángulo de inclinación del techo respecto a la base. <div>2</div></li>${CR(1)}
    </ol></div>

    <div class="problema2">3.- Un cable de seguridad sujeta una antena desde un punto en el suelo. El cable mide $12\\text{ m}$ y forma un ángulo de $42^\\circ$ con el suelo.
    <ol class="FT_ol_a">
        <li>¿A qué altura de la antena se encuentra sujeto el cable? <div>3</div></li>${CR(1)}
        <li>¿A qué distancia de la base de la antena se encuentra el punto de anclaje? <div>3</div></li>${CR(1)}
    </ol></div>
    
    <div class="page"></div>
    
    <div class="problema2">4.- Reflexión conceptual:
    <ol class="FT_ol_a">
        <li>Si en un triángulo rectángulo, el seno de un ángulo es igual a $1$, ¿qué se puede concluir sobre dicho ángulo? <div>2</div></li>${CR(1)}
        <li>Explique brevemente por qué las razones trigonométricas solo dependen del ángulo y no del tamaño del triángulo. <div>3</div></li>${CR(2)}
    </ol></div>
    </div>`;

    let sol1_hip = Math.sqrt(catA**2 + catB**2);
    let sol1_ang = (Math.atan(catA/catB) * 180 / Math.PI).toFixed(1);

    let Solucion = `<div class="ans"><b>Soluciones:</b><br>
    P1: (a) $\\sqrt{${catA}^2 + ${catB}^2} = ${sol1_hip.toFixed(1)} \\text{ m}$. (b) $\\tan^{-1}(${catA}/${catB}) \\approx ${sol1_ang}^\\circ$ y $90 - ${sol1_ang} = ${90 - sol1_ang}^\\circ$.<br>
    P2: (b) $x = \\sqrt{${lado}^2 - ${base/2}^2} = ${altura} \\text{ m}$. (c) $\\sin^{-1}(${altura}/${lado}) \\approx ${(Math.asin(altura/lado) * 180 / Math.PI).toFixed(1)}^\\circ$.<br>
    P3: (a) $12 \\cdot \\sin(42^\\circ) \\approx 8.03 \\text{ m}$. (b) $12 \\cdot \\cos(42^\\circ) \\approx 8.92 \\text{ m}$.<br>
    P4: (a) El ángulo debe ser $90^\\circ$ (triángulo degenerado). (b) Por semejanza de triángulos.</div>`;

    return [Pregunta, Solucion];
}