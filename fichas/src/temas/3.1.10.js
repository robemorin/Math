import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Geometría: Volumen y Capacidad';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Parámetros dinámicos para los problemas
    let areaBase = Math.floor(Math.random() * 50) + 80; // Área casa en m2
    let lluvia = Math.floor(Math.random() * 10) + 5;    // mm de lluvia
    let radioTanque = 2; // m
    
    let diametroCopa = Math.floor(Math.random() * 3) + 6; // cm
    let alturaCopa = Math.floor(Math.random() * 4) + 10;   // cm
    
    // Problema 1: Volumen de agua
    let volumen_m3 = (areaBase * (lluvia / 1000)).toFixed(3);
    let volumen_kL = volumen_m3; // 1m3 = 1kL

    let Pregunta = `<div class="problema2"><h3>Ejercicios de Aplicación: Volumen y Capacidad</h3>
    <p>1.- El techo de una casa tiene una superficie de $${areaBase} \\text{ m}^2$. Durante una tormenta, caen $${lluvia} \\text{ mm}$ de lluvia que se recolectan en un tanque cilíndrico de radio $${radioTanque} \\text{ m}$.</p>
    <ol class="FT_ol_a">
        <li>Determine el volumen de agua (en $\\text{m}^3$) que cayó sobre el techo. <div>2</div></li>${CR(2)}
        <li>¿Cuántos kL de agua entraron al tanque? <div>2</div></li>${CR(2)}
        <li>Calcule cuánto subió el nivel del agua en el tanque (en mm). <div>3</div></li>${CR(3)}
    </ol></div><div class="page"></div>`;

    let altura_nivel = ( (areaBase * (lluvia / 1000)) / (Math.PI * Math.pow(radioTanque, 2)) * 1000 ).toFixed(1);
    let Solucion = `<div class="ans"><b>P1:</b> (1a) $${volumen_m3} \\text{ m}^3$ (1b) $${volumen_kL} \\text{ kL}$ (1c) $h = \\frac{${volumen_m3}}{\\pi \\cdot ${radioTanque}^2} \\approx ${altura_nivel} \\text{ mm}$</div><br>`;

    // Problema 2: Cono
    let radioC = diametroCopa / 2;
    let capacidad = ( (1/3) * Math.PI * Math.pow(radioC, 2) * alturaCopa ).toFixed(1);
    
    Pregunta += `<div class="problema2">2.- Una copa de vino tiene forma cónica con una altura de $${alturaCopa} \\text{ cm}$ y un diámetro de boca de $${diametroCopa} \\text{ cm}$.
    <ol class="FT_ol_a">
        <li>Halle la capacidad total de la copa en $\\text{cm}^3$ (equivalente a mL). <div>3</div></li>${CR(3)}
        <li>Si la copa contiene vino hasta el $75\\%$ de su altura total, ¿qué volumen de vino contiene? (Nota: el volumen es proporcional al cubo de la altura). <div>4</div></li>${CR(4)}
    </ol></div>`;

    let vol75 = (capacidad * Math.pow(0.75, 3)).toFixed(1);
    Solucion += `<div class="ans"><b>P2:</b> (2a) $V = \\frac{1}{3}\\pi(${radioC})^2(${alturaCopa}) \\approx ${capacidad} \\text{ mL}$ (2b) $V_{75\\%} = ${capacidad} \\times 0.75^3 \\approx ${vol75} \\text{ mL}$</div><br>`;

    return [Pregunta, Solucion];
}