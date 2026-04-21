// Generado a partir de: 3.3.14.js (Original movido a src/temporal/)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return 'Trigonometría: Reglas del Seno y Coseno';
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    // --- DATOS ALEATORIOS ---
    // Problema 1: Regla del Seno (Lado desconocido)
    const angA = 35 + Math.floor(Math.random() * 20);
    const angB = 65 + Math.floor(Math.random() * 20);
    const ladoA = 10 + Math.floor(Math.random() * 10);
    const ladoB = (ladoA * Math.sin(angB * Math.PI / 180) / Math.sin(angA * Math.PI / 180));

    // Problema 2: Regla del Coseno (Lado lateral)
    const b_2 = 12 + Math.floor(Math.random() * 5);
    const c_2 = 18 + Math.floor(Math.random() * 5);
    const angC_2 = 40 + Math.floor(Math.random() * 20);
    const a_2 = Math.sqrt(b_2 ** 2 + c_2 ** 2 - 2 * b_2 * c_2 * Math.cos(angC_2 * Math.PI / 180));

    // Problema 3: Aplicación - Barcos (Bearing / Rumbos)
    const d1 = 6 + Math.floor(Math.random() * 4); // Velocidad o distancia
    const d2 = 8 + Math.floor(Math.random() * 4);
    const angulo_puerto = 110; // Ángulo entre rutas
    const dist_barcos = Math.sqrt(d1 ** 2 + d2 ** 2 - 2 * d1 * d2 * Math.cos(angulo_puerto * Math.PI / 180));

    // --- CONSTRUCCIÓN DEL HTML ---
    html += ai.getHeader("3.3.14", "Trigonometría No Rectángulo", "Geometría y Trigonometría");

    html += `
        <div class="seccion-title">I. Regla del Seno</div>
        <div class="exercise-step">
            En un triángulo $ABC$, el ángulo $\\hat{A} = ${angA}^\\circ$, el ángulo $\\hat{B} = ${angB}^\\circ$ y el lado $a = ${ladoA}$ cm.
            <ol class="FT_ol_a">
                <li>Calcule el ángulo $\\hat{C}$. <span class="mark">1</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Halle el valor del lado $b$, dando su respuesta con 3 cifras significativas. <span class="mark">3</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            </ol>
        </div>

        <div class="seccion-title">II. Regla del Coseno</div>
        <div class="exercise-step">
            Sea un triángulo con lados $b = ${b_2}$ m, $c = ${c_2}$ m y un ángulo comprendido $\\hat{A} = ${angC_2}^\\circ$.
            <ol class="FT_ol_a">
                <li>Halle la longitud del lado $a$. <span class="mark">3</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Calcule el área del triángulo. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            </ol>
        </div>

        ${ai.getTiTip("Asegúrate de que tu calculadora esté en modo <b>DEGREE</b>. Para el área, usa la fórmula $\\frac{1}{2}ab\\sin(C)$.")}

        <div class="page-break"></div>

        <div class="seccion-title">III. Modelización: Navegación Marítima</div>
        <div class="exercise-step">
            <div class="contexto-especial">
                <b>Situación:</b> Dos patrullas guardacostas salen del mismo puerto $P$ al mediodía. La patrulla A navega $${d1}$ km en una dirección y la patrulla B navega $${d2}$ km en otra dirección. El ángulo formado entre sus trayectorias es de $110^\\circ$.
            </div>
            <ol class="FT_ol_a">
                <li>Dibuje un diagrama que represente la situación, etiquetando los puntos y ángulos conocidos. <span class="mark">2</span>
                    
                </li>
                <div style="text-align:center; margin:10px 0;">
                        <tlacuache-milimetrado size="300,720" cuadricula="5,12"  n="5" color = 'RGB(200, 64, 64)'  stroke = ".7" stroke2 = ".2"/>
                    </div>
                <li>Halle la distancia entre las dos patrullas en ese momento. <span class="mark">3</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Una tercera patrulla $C$ se encuentra a $15$ km de la patrulla A y a $20$ km de la patrulla B. Halle el ángulo $\\hat{ACB}$ que forma esta patrulla. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
            </ol>
        </div>

        <div class="seccion-title">IV. Formulario de Apoyo</div>
        <div style="font-size: 0.85rem; background: #fdfdfd; border: 1px solid #ddd; padding: 10px;">
            $\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} \\quad | \\quad a^2 = b^2 + c^2 - 2bc \\cos A \\quad | \\quad \\text{Área} = \\frac{1}{2}ab \\sin C$
        </div>
    </div> <div class="page-break"></div>
    `;

    // --- SOLUCIONARIO ---
    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 3.3.14:</b><br>
        1a. $\\hat{C} = 180 - ${angA} - ${angB} = ${180 - angA - angB}^\\circ$ [A1]<br>
        1b. $b = \\frac{${ladoA} \\cdot \\sin(${angB}^\\circ)}{\\sin(${angA}^\\circ)} = ${ladoB.toPrecision(3)}$ cm [M1 A2]<br>
        2a. $a = \\sqrt{${b_2}^2 + ${c_2}^2 - 2\\cdot ${b_2}\\cdot ${c_2} \\cos(${angC_2})} = ${a_2.toPrecision(3)}$ m [M1 A2]<br>
        2b. $Área = 0.5\\cdot ${b_2}\\cdot ${c_2} \\sin(${angC_2}) = ${(0.5 * b_2 * c_2 * Math.sin(angC_2 * Math.PI / 180)).toPrecision(3)}$ m² [M1 A1]<br>
        3b. $d = \\sqrt{${d1}^2 + ${d2}^2 - 2\\cdot ${d1}\\cdot ${d2} \\cos(110^\\circ)} = ${dist_barcos.toPrecision(3)}$ km [M1 A2]<br>
        3c. Usar regla del coseno para despejar el ángulo: $\\cos C = \\frac{15^2 + 20^2 - (${dist_barcos.toFixed(2)})^2}{2\\cdot 15\\cdot 20}$. [M1 A2]
    </div>
    `;

    return [html, solucion];
}

export async function renderGeoGebra(container, totalElements) { }
