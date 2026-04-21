<ref_base>
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Ficha de Práctica: Geometría y Trigonometría';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Ejercicios basados en el PDF [55].pdf
    
    // Problema 1: Triángulo rectángulo
    let adj = Math.floor(Math.random() * 15) + 5;
    let opp = Math.floor(Math.random() * 15) + 5;
    let hyp = Math.sqrt(adj**2 + opp**2).toFixed(1);
    let angK = (Math.atan(opp / adj) * 180 / Math.PI).toFixed(1);
    let angM = (90 - angK).toFixed(1);

    let Pregunta = `<div class="problema2">1.- En el triángulo rectángulo KLM, se conocen los catetos $KL = ${adj} \\text{ cm}$ y $LM = ${opp} \\text{ cm}$.
    <ol class="FT_ol_a">
        <li>Determine la longitud de la hipotenusa $KM$. <div>2</div></li>${CR(1)}
        <li>Calcule las medidas de los ángulos $\\alpha$ (en K) y $\\theta$ (en M). <div>3</div></li>${CR(2)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (1a) $KM = \\sqrt{${adj}^2 + ${opp}^2} \\approx ${hyp} \\text{ cm}$. (1b) $\\alpha = \\arctan(${opp}/${adj}) \\approx ${angK}^\\circ, \\theta = 90^\\circ - ${angK}^\\circ = ${angM}^\\circ$.</div><br>`;

    // Problema 2: Elevación (Contextualizado)
    let d1 = 80;
    let ang1 = 20;
    let ang2 = 23;
    let h = (d1 * Math.tan(ang1 * Math.PI/180) * Math.tan(ang2 * Math.PI/180)) / (Math.tan(ang2 * Math.PI/180) - Math.tan(ang1 * Math.PI/180));
    
    Pregunta += `<div class="problema2">2.- Desde un punto $A$, el ángulo de elevación a la cima de un edificio es $20^\\circ$. Tras caminar $80 \\text{ m}$ hacia el edificio, el ángulo de elevación es $23^\\circ$. Calcule la altura del edificio. <div>4</div></div>${CR(4)}`;
    
    Solucion += `<div class="ans"><b>P2:</b> Usando el sistema de ecuaciones: $h = x \\tan(20^\\circ)$ y $h = (x-80) \\tan(23^\\circ)$. $h \\approx ${h.toFixed(1)} \\text{ m}$.</div><br>`;

    // Problema 3: Rodamientos (Bearing)
    let dist1 = 3;
    let dist2 = 2.5;
    // 213 grados y 303 grados. Diferencia angular = 303 - 213 = 90 grados.
    let distFinal = Math.sqrt(dist1**2 + dist2**2).toFixed(2);
    
    Pregunta += `<div class="problema2">3.- Un atleta corre $3 \\text{ km}$ con rumbo $213^\\circ$, y luego $2.5 \\text{ km}$ con rumbo $303^\\circ$.
    <ol class="FT_ol_a">
        <li>Dibuje un diagrama vectorial del recorrido. <div>2</div></li>${CR(3)}
        <li>¿Qué distancia hay desde su posición final al punto de partida? <div>3</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P3:</b> El cambio de rumbo implica un ángulo de $90^\\circ$ entre trayectos. Distancia = $\\sqrt{3^2 + 2.5^2} \\approx ${distFinal} \\text{ km}$.</div><br>`;

    // Problema 4: Pirámide
    let base = 12;
    let angP = 80;
    let altura_cara = (base / 2) / Math.tan(angP/2 * Math.PI/180);

    Pregunta += `<div class="problema2">4.- Una pirámide de base cuadrada tiene una arista de base de $12 \\text{ m}$. El ángulo en la cima de una de las caras triangulares es de $80^\\circ$. Determine la altura de dicha cara triangular (apotema lateral). <div>3</div></div>${CR(3)}`;

    Solucion += `<div class="ans"><b>P4:</b> $\\tan(40^\\circ) = \\frac{6}{h_{cara}} \\Rightarrow h_{cara} = \\frac{6}{\\tan(40^\\circ)} \\approx ${altura_cara.toFixed(2)} \\text{ m}$.</div>`;

    return [Pregunta, Solucion];
}
</ref_base>