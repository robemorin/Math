import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Trigonometría y Geometría en el Espacio';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Problema 1: Orientación (Rumbos)
    let d1 = Math.floor(Math.random() * 500) + 500;
    let d2 = Math.floor(Math.random() * 300) + 200;
    let ang1 = 236;
    let ang2 = 146;
    
    // Problema 2: Barco (Triángulo oblicuángulo básico)
    let dist1 = 13.6;
    let dist2 = 72;
    let angle_diff = Math.abs(202 - 112); // 90 grados, resulta en Pitágoras directo

    // Problema 3: Geometría 3D (Ángulo entre línea y plano)
    let boxW = 8;
    let boxH = 5;
    let boxD = 6;

    let Pregunta = `<div class="problema2"><h3>Ejercicios de Práctica: Trigonometría y Espacio</h3>
    <p><i>Tiempo estimado: 40 minutos. Muestre todos sus procedimientos.</i></p>
    
    <ol>
        <li>Un orientador corre ${d1} m en dirección ${ang1}^{\\circ} hacia un punto de control y, posteriormente, ${d2} m en dirección ${ang2}^{\\circ} hasta la meta.
        <br>a) Determine la distancia directa desde el inicio hasta el punto final. <div>3</div>${CR(2)}
        b) Calcule el rumbo (bearing) del punto final respecto al punto de inicio. <div>3</div>${CR(3)}</li>

        <li>Un crucero sale del puerto P navegando en dirección ${112}^{\\circ} durante ${dist1} km y luego cambia a la dirección ${202}^{\\circ} navegando ${dist2} km. 
        <br>Halle la distancia final del crucero respecto al puerto P. <div>4</div>${CR(4)}</li>

        <li>Considere un prisma rectangular con base TUVW y caras laterales verticales. Sean los vértices superiores P, Q, R, S tal que PT, QU, RV, SW son las aristas verticales.
        <br>a) Si el segmento [PU] une un vértice superior con uno inferior opuesto, identifique la proyección de [PU] sobre el plano base TUVW. <div>2</div>${CR(2)}
        b) Explique cómo se calcula el ángulo entre [PU] y el plano base TUVW si se conocen las dimensiones del prisma. <div>3</div>${CR(3)}
        </li>
    </ol>
    </div>`;

    // Fuente original: [51].pdf
    let Solucion = `<div class="ans"><b>Soluciones Sugeridas:</b><br>
    P1: (a) Usar ley de cosenos con ángulo incluido de $90^{\\circ}$ (ya que $236-146 = 90$). $d = \\sqrt{${d1}^2 + ${d2}^2} \\approx ${Math.hypot(d1, d2).toFixed(1)}$ m.<br>
    P2: Ángulo de giro = $90^{\\circ}$. $d = \\sqrt{${dist1}^2 + ${dist2}^2} \\approx ${(Math.hypot(dist1, dist2)).toFixed(2)}$ km.<br>
    P3: (a) La proyección es la diagonal de la base [TU]. (b) El ángulo es $\\theta = \\arctan(\\text{altura} / \\text{diagonal base})$.</div>`;

    return [Pregunta, Solucion];
}