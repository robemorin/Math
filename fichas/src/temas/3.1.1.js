import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Geometría: Superficie y Volumen de Cuerpos Sólidos';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Parámetros dinámicos para un contenedor tipo caja (Jewellery box)
    // Fuente original: [29].pdf
    let ancho = 120 + Math.floor(Math.random() * 4) * 10;
    let largo = 160 + Math.floor(Math.random() * 4) * 10;
    let alto = 80 + Math.floor(Math.random() * 8);
    let espesor = 4;

    let Pregunta = `<div class="problema2"><h3>Práctica: Geometría de Contenedores</h3>
    <p>Una caja de madera tiene un grosor de $${espesor} \\text{ mm}$. Sus dimensiones externas son: ancho $${ancho} \\text{ mm}$, largo $${largo} \\text{ mm}$ y altura $${alto} \\text{ mm}$.</p>
    <ol class="FT_ol_a">
        <li>Determine el área de la superficie externa total de la caja (asumiendo que está cerrada). <div>3</div></li>${CR(3)}
        <li>Justifique por qué en aplicaciones industriales se especifica el área "externa" en lugar de la interna para el almacenamiento. <div>2</div></li>${CR(2)}
        <li>Calcule el volumen de madera necesario para fabricar la caja (considere que el grosor afecta a todas las paredes). <div>4</div></li>${CR(4)}
        <li>Si el interior de la caja se utiliza para almacenar joyería, ¿cuál es la capacidad (volumen interno) real disponible? <div>3</div></li>${CR(3)}
    </ol></div><div class="page"></div>`;

    // Cálculos
    let supExt = 2 * (ancho * largo + ancho * alto + largo * alto);
    let anchoInt = ancho - 2 * espesor;
    let largoInt = largo - 2 * espesor;
    let altoInt = alto - espesor; // Asumiendo tapa de igual grosor, pero solo base y 4 lados
    let volExt = ancho * largo * alto;
    let volInt = anchoInt * largoInt * altoInt;
    let volMadera = volExt - volInt;

    let Solucion = `<div class="ans"><b>Soluciones:</b><br>
    (1) Área Ext = $${supExt} \\text{ mm}^2$<br>
    (2) Explicación: El área externa determina el material de acabado (barniz/pintura) y el espacio que ocupa en un estante.<br>
    (3) Vol. Madera = $${volMadera} \\text{ mm}^3$<br>
    (4) Capacidad (Vol. Interno) = $${volInt} \\text{ mm}^3$</div>`;

    // Problema de círculos (Base del temario 3.1)
    let radio = 5 + Math.floor(Math.random() * 10);
    let angulo = 60 + Math.floor(Math.random() * 120);

    Pregunta += `<div class="problema2">5.- Considere un sector circular con radio $r = ${radio} \\text{ cm}$ y ángulo central $\\theta = ${angulo}^\\circ$.
    <ol class="FT_ol_a">
        <li>Halle la longitud de arco. <div>2</div></li>${CR(2)}
        <li>Halle el perímetro del sector. <div>2</div></li>${CR(2)}
        <li>Halle el área del sector. <div>2</div></li>${CR(2)}
    </ol></div>`;

    let arco = (angulo / 360) * 2 * Math.PI * radio;
    let perim = 2 * radio + arco;
    let area = (angulo / 360) * Math.PI * Math.pow(radio, 2);

    Solucion += `<div class="ans"><b>Soluciones P5:</b><br>
    (5a) Arco $\\approx ${arco.toFixed(2)} \\text{ cm}$<br>
    (5b) Perímetro $\\approx ${perim.toFixed(2)} \\text{ cm}$<br>
    (5c) Área $\\approx ${area.toFixed(2)} \\text{ cm}^2$</div>`;

    return [Pregunta, Solucion];
}