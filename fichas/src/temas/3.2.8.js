import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Fuente original: [49].pdf
 * Ejercicios de trigonometría en triángulos rectángulos (3.2)
 * Tiempo estimado: 40 minutos
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export function name() {
    return 'Práctica de Trigonometría: Triángulos Rectángulos';
}

export async function pregunta() {
    // --- Problema 1: Ángulos de elevación ---
    let dist = 100 + Math.floor(Math.random() * 300);
    let ang1 = 25 + Math.floor(Math.random() * 10);
    let ang2 = 40 + Math.floor(Math.random() * 15);
    
    let h1 = dist * Math.tan(ang1 * Math.PI / 180);
    let h2 = dist * Math.tan(ang2 * Math.PI / 180);
    let altFlag = (h2 - h1).toFixed(2);

    let Pregunta = `<div class="problema2"><h3>1. Trigonometría en el terreno</h3>
    Un observador situado a $${dist}$ m de la base de un edificio mide los ángulos de elevación hacia la parte inferior y superior de un mástil de bandera situado en la azotea. Los ángulos son $${ang1}^\\circ$ y $${ang2}^\\circ$ respectivamente.
    <ol class="FT_ol_a">
        <li>Dibuje un diagrama que represente la situación. <div>2</div></li>${CR(3)}
        <li>Calcule la altura del mástil de la bandera. <div>3</div></li>${CR(4)}
    </ol></div><div class="page"></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> Altura = $${dist}(\\tan(${ang2}^\\circ) - \\tan(${ang1}^\\circ)) \\approx ${altFlag}$ m</div><br>`;

    // --- Problema 2: Ángulo de depresión ---
    let h_cliff = 10 + Math.floor(Math.random() * 20);
    let ang_dep = 2 + Math.random() * 3;
    let dist1 = h_cliff / Math.tan(ang_dep * Math.PI / 180);
    let ang_final = ang_dep + 2 + Math.floor(Math.random() * 2);
    let dist2 = h_cliff / Math.tan(ang_final * Math.PI / 180);

    Pregunta += `<div class="problema2"><h3>2. Navegación y ángulos de depresión</h3>
    El ángulo de depresión desde un acantilado de $${h_cliff}$ m de altura hacia una embarcación es de $${ang_dep.toFixed(1)}^\\circ$.
    <ol class="FT_ol_a">
        <li>¿A qué distancia de la base del acantilado se encuentra el barco? <div>2</div></li>${CR(3)}
        <li>Si el barco se mueve hacia el acantilado hasta que el ángulo de depresión sea de $${ang_final}^\\circ$, ¿cuánto se ha acercado? <div>3</div></li>${CR(4)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> (2a) $${dist1.toFixed(2)}$ m (2b) $${(dist1 - dist2).toFixed(2)}$ m</div><br>`;

    // --- Problema 3: Cinemática ---
    let vel_kmh = 90 + Math.floor(Math.random() * 40);
    let vel_ms = (vel_kmh * 1000 / 3600).toFixed(2);
    let t = 20 + Math.floor(Math.random() * 20);
    let dist_recorrida = (vel_ms * t).toFixed(1);
    let ang_el = 60;
    let h_heli = (dist_recorrida * Math.tan(ang_el * Math.PI / 180)).toFixed(2);

    Pregunta += `<div class="problema2"><h3>3. Altura de un helicóptero</h3>
    Un helicóptero vuela horizontalmente a una velocidad de $${vel_kmh}$ km/h. Tras $${t}$ segundos, el ángulo de elevación desde un punto en tierra cambia desde $90^\\circ$ (directamente arriba) a $${ang_el}^\\circ$.
    <ol class="FT_ol_a">
        <li>Determine la distancia horizontal recorrida en metros. <div>2</div></li>${CR(2)}
        <li>Calcule la altura del helicóptero sobre el suelo. <div>3</div></li>${CR(3)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P3:</b> Distancia = $${dist_recorrida}$ m, Altura = $${h_heli}$ m</div>`;

    return [Pregunta, Solucion];
}