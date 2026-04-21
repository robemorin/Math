/* Fuente original: [56].pdf */
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Trigonometría en Triángulos Rectángulos y Prismas';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Parámetros dinámicos
    let h = 20 + Math.floor(Math.random() * 15); // Altura del triángulo
    let angle = 65; 
    let base_lado = (h / Math.tan(angle * Math.PI / 180)).toFixed(2);
    let AC = (2 * base_lado).toFixed(2);
    
    // Dimensiones para el prisma (se basa en el triángulo)
    let ancho_prisma = parseFloat(base_lado) * 2;
    let prof_prisma = (parseFloat(base_lado) * 0.8).toFixed(1);
    let vol = (ancho_prisma * prof_prisma * h).toFixed(2);

    let Pregunta = `<div class="problema2">
    <h3>Ejercicio de Aplicación: Trigonometría en 3D</h3>
    <p>El triángulo ACH es isósceles con una altura de $${h}$ cm y ángulos de base $\\widehat{HAC} = \\widehat{HCA} = ${angle}^\\circ$.</p>
    <div style="text-align: center; margin: 20px;">
        <!-- Espacio reservado para dibujo del estudiante -->
        <div style="border: 2px dashed #999; width: 300px; height: 200px; margin: auto; display: flex; align-items: center; justify-content: center;">
            <p style="color: #666;">(Dibujar esquema del prisma aquí)</p>
        </div>
    </div>
    
    <ol class="FT_ol_a">
        <li><b>Cálculos en el triángulo:</b>
            <ol style="list-style-type: lower-roman;">
                <li>Halle la longitud de $AH$. <div>2</div></li>${CR(1)}
                <li>Halle la longitud de $AC$. <div>2</div></li>${CR(1)}
            </ol>
        </li>
        <li><b>Geometría del prisma:</b>
            El triángulo $ACH$ está contenido dentro de un prisma rectangular de base cuadrada de lado $${ancho_prisma}$ cm y profundidad $${prof_prisma}$ cm. Calcule el volumen de este prisma. <div>3</div></li>${CR(2)}
    </ol>
    </div>
    <div class="page"></div>`;

    let AH_calc = (h / Math.sin(angle * Math.PI / 180)).toFixed(2);
    
    let Solucion = `<div class="ans"><b>Solucionario:</b><br>
    (1.i) $AH = \\frac{${h}}{\\sin(${angle}^\\circ)} \\approx ${AH_calc}$ cm<br>
    (1.ii) $AC = 2 \\times \\frac{${h}}{\\tan(${angle}^\\circ)} \\approx ${AC}$ cm<br>
    (2) $V = \\text{Área base} \\times \\text{altura} = (${ancho_prisma} \\times ${prof_prisma}) \\times ${h} = ${vol}$ cm$^3$
    </div>`;

    return [Pregunta, Solucion];
}