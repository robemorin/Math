<ref_base>
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Geometría: Superficie y Volumen';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Parámetros dinámicos para los problemas
    let ladoCubo = (Math.random() * 2 + 2).toFixed(1);
    let ancho = Math.floor(Math.random() * 5) + 10;
    let profundo = Math.floor(Math.random() * 5) + 5;
    let alto = Math.floor(Math.random() * 2) + 2;
    
    let baseRect = (Math.random() * 10 + 10).toFixed(1);
    let alturaPyramid = (Math.random() * 5 + 15).toFixed(1);

    let Pregunta = `<div class="problema2"><h3>Práctica de Geometría (Tiempo estimado: 40 min)</h3>
    <p><i>Nota: Muestre todo su procedimiento. Utilice espacio en blanco para cálculos.</i></p>
    
    <div class="problema2">1.- <b>Cubo:</b> Un cubo tiene una longitud de lado de $${ladoCubo} \\text{ cm}$.
    <ol class="FT_ol_a">
        <li>Calcule el área de la superficie total del cubo. <div>2</div></li>${CR(2)}
        <li>Si se duplica la longitud del lado, ¿cuántas veces aumenta el área de la superficie? Justifique. <div>3</div></li>${CR(2)}
    </ol></div>

    <div class="problema2">2.- <b>Caja:</b> Una caja de madera tiene dimensiones de $${ancho} \\text{ cm}$ de largo, $${profundo} \\text{ cm}$ de ancho y $${alto} \\text{ cm}$ de alto.
    <ol class="FT_ol_a">
        <li>Determine el área de las caras superior e inferior. <div>2</div></li>${CR(2)}
        <li>Calcule el área total de las 4 paredes laterales. <div>2</div></li>${CR(2)}
    </ol></div>

    <div class="problema2">3.- <b>Pirámide:</b> Considere una pirámide de base cuadrada de lado $${baseRect} \\text{ cm}$ y altura inclinada de $${alturaPyramid} \\text{ cm}$.
    <ol class="FT_ol_a">
        <li>Dibuje un esquema de la pirámide y marque las dimensiones dadas. <div>2</div></li>${CR(4)}
        <li>Calcule el área lateral (área de los 4 triángulos). <div>3</div></li>${CR(3)}
        <li>Calcule el área total de la pirámide (incluyendo la base). <div>3</div></li>${CR(3)}
    </ol></div></div>`;

    let areaCubo = (6 * Math.pow(ladoCubo, 2)).toFixed(2);
    let areaBaseCaja = (ancho * profundo).toFixed(2);
    let areaLateralesCaja = (2 * (ancho * alto) + 2 * (profundo * alto)).toFixed(2);
    let areaLatPyramid = (4 * (0.5 * baseRect * alturaPyramid)).toFixed(2);
    let areaTotalPyramid = (parseFloat(areaLatPyramid) + Math.pow(baseRect, 2)).toFixed(2);

    let Solucion = `<div class="ans"><b>Solucionario:</b><br>
    <b>P1:</b> (a) $6 \\times ${ladoCubo}^2 = ${areaCubo} \\text{ cm}^2$ (b) Aumenta 4 veces (factor $2^2$).<br>
    <b>P2:</b> (a) $2 \\times (${ancho} \\times ${profundo}) = ${2 * ancho * profundo} \\text{ cm}^2$ (b) $2(${ancho} \\times ${alto}) + 2(${profundo} \\times ${alto}) = ${areaLateralesCaja} \\text{ cm}^2$.<br>
    <b>P3:</b> (b) $2 \\times ${baseRect} \\times ${alturaPyramid} = ${areaLatPyramid} \\text{ cm}^2$ (c) ${areaTotalPyramid} \\text{ cm}^2$.</div>`;

    return [Pregunta, Solucion];
}
</ref_base>