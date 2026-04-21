import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Geometría: Volumen y Área';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Problema 1: Jardin (Prisma rectangular)
    let largo = (Math.random() * 2 + 7).toFixed(1);
    let ancho = (Math.random() * 1 + 2).toFixed(1);
    let profundidad = 0.15; // 15 cm
    let vol_total = (largo * ancho * profundidad).toFixed(2);
    let carga = 2.5; 
    let costo_carga = 87.30;
    
    // Problema 2: Carpa (Triangulo)
    let ancho_base = 150;
    let largo_base = 200;
    let altura_triangulo = 125;
    let lado_inclinado = Math.sqrt((ancho_base/2)**2 + altura_triangulo**2).toFixed(1);

    let Pregunta = `<div class="problema">
    <h3>Parte 1: Planificación de Jardín</h3>
    <p>Se construye un jardín rectangular de <b>${largo} m</b> de largo por <b>${ancho} m</b> de ancho, con una profundidad de <b>15 cm</b>. El suelo se vende por "cargas" de <b>${carga} m$^3$</b>.</p>
    <ol class="FT_ol_a">
        <li>Calcule el volumen total de tierra necesaria en m$^3$. <div>2</div></li>${CR(1)}
        <li>Si cada carga cuesta $${costo_carga}, ¿cuánto costará cubrir el jardín? <div>2</div></li>${CR(2)}
    </ol>
    </div>
    
    <div class="problema">
    <h3>Parte 2: Geometría de una Carpa</h3>
    <p>Una carpa tiene una sección transversal triangular isósceles con base <b>${ancho_base} cm</b> y altura <b>${altura_triangulo} cm</b>. El largo de la carpa es <b>${largo_base} cm</b>.</p>
    <ol class="FT_ol_a">
        <li>Calcule el volumen de la carpa en cm$^3$. <div>3</div></li>${CR(2)}
        <li>Calcule el área total de la lona necesaria (incluyendo suelo y extremos). <div>4</div></li>${CR(3)}
    </ol>
    </div>
    <div class="page"></div>`;

    let sol_vol = (largo * ancho * 0.15).toFixed(3);
    let sol_cargas = Math.ceil(sol_vol / carga);
    let sol_precio = (sol_cargas * costo_carga).toFixed(2);
    
    let vol_carpa = (0.5 * ancho_base * altura_triangulo * largo_base).toFixed(0);
    let area_triangulos = (ancho_base * altura_triangulo).toFixed(0); // 2 * (0.5 * b * h)
    let area_lados = (2 * lado_inclinado * largo_base).toFixed(0);
    let area_suelo = (ancho_base * largo_base).toFixed(0);
    let area_total = (Number(area_triangulos) + Number(area_lados) + Number(area_suelo)).toFixed(0);

    let Solucion = `<div class="ans">
    <b>P1:</b> (1a) $V = ${largo} \\times ${ancho} \\times 0.15 = ${sol_vol} \\text{ m}^3$. Necesita $${sol_cargas}$ cargas. <br>
    (1b) $Costo = ${sol_cargas} \\times ${costo_carga} = $${sol_precio}$.<br><br>
    <b>P2:</b> (2a) $V = \\text{Área base} \\times L = (0.5 \\times ${ancho_base} \\times ${altura_triangulo}) \\times ${largo_base} = ${vol_carpa} \\text{ cm}^3$.<br>
    (2b) Área total = $2(\\text{triángulos}) + 2(\\text{rectángulos laterales}) + \\text{suelo} = ${area_triangulos} + ${area_lados} + ${area_suelo} = ${area_total} \\text{ cm}^2$.
    </div>`;

    return [Pregunta, Solucion];
}