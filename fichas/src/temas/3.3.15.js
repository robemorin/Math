import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Geometría y Trigonometría: Áreas y Triángulos';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Problema 1: Regla del seno (Cálculo de ángulo)
    let q_angle = Math.floor(Math.random() * 40) + 30; // Ángulo Q
    let side_pr = (Math.random() * 5 + 5).toFixed(1); // lado PR
    let side_qr = (Math.random() * 5 + 8).toFixed(1); // lado QR
    
    // Problema 2: Área de triángulo (Contextualizado)
    let base = Math.floor(Math.random() * 50) + 100;
    let lado = Math.floor(Math.random() * 40) + 80;
    let angulo = 75;

    // Problema 3: Hexágono (Geometría)
    let lado_hex = Math.floor(Math.random() * 10) + 5;

    let Pregunta = `<div class="problema2"><h3>Práctica de Geometría y Trigonometría</h3>
    <ol class="FT_ol_a">
        <li>En el triángulo PQR, se sabe que $\\widehat{QPR} = ${q_angle}^\\circ$, $QR = ${side_qr} \\text{ m}$ y $PR = ${side_pr} \\text{ m}$. Halle la medida del ángulo $\\widehat{Q}$ (considere el caso agudo). <div>4</div></li>${CR(4)}
        
        <li>Anke y Lucas desean calcular el área de un terreno triangular. En su croquis, un lado mide $${base} \\text{ m}$, otro lado mide $${lado} \\text{ m}$ y el ángulo comprendido entre ellos es de $${angulo}^\\circ$.
            <ol>
                <li>Halle el área del terreno en $\\text{m}^2$. <div>3</div></li>${CR(3)}
                <li>Si $1 \\text{ hectárea} = 10,000 \\text{ m}^2$, calcule el área en hectáreas. <div>2</div></li>${CR(2)}
            </ol>
        </li>
        
        <li>Considere un hexágono regular con lado de longitud $${lado_hex} \\text{ mm}$.
            <ol>
                <li>Halle la longitud de la apotema (distancia del centro al punto medio de un lado). <div>3</div></li>${CR(3)}
                <li>Halle el área total del hexágono. <div>3</div></li>${CR(4)}
            </ol>
        </li>
    </ol></div>`;

    // Cálculos para soluciones
    // P1: Sen Q / PR = Sen P / QR => Sen Q = (PR * Sen P) / QR
    let sol_q = Math.asin((parseFloat(side_pr) * Math.sin(q_angle * Math.PI / 180)) / parseFloat(side_qr)) * 180 / Math.PI;
    
    // P2: Área = 0.5 * a * b * sen(C)
    let area_m2 = 0.5 * base * lado * Math.sin(angulo * Math.PI / 180);
    let area_ha = area_m2 / 10000;

    // P3: Hexágono (Área = 3 * sqrt(3) / 2 * s^2)
    let area_hex = (3 * Math.sqrt(3) / 2) * Math.pow(lado_hex, 2);
    let apotema = (lado_hex / 2) / Math.tan(Math.PI / 6);

    let Solucion = `<div class="ans"><b>Soluciones:</b><br>
    P1: $\\widehat{Q} \\approx ${sol_q.toFixed(2)}^\\circ$<br>
    P2a: $A = \\frac{1}{2}(${base})(${lado})\\sin(${angulo}^\\circ) \\approx ${area_m2.toFixed(2)} \\text{ m}^2$<br>
    P2b: $A \\approx ${area_ha.toFixed(4)} \\text{ hectáreas}$<br>
    P3a: Apotema $\\approx ${apotema.toFixed(2)} \\text{ mm}$<br>
    P3b: Área $\\approx ${area_hex.toFixed(2)} \\text{ mm}^2$</div>`;

    return [Pregunta, Solucion];
}