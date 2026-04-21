// Generado a partir de: temporal/3.3.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return 'Trigonometría: Regla del seno y coseno';
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    // --- DATOS ALEATORIOS ---
    let a = Math.floor(Math.random() * 5) + 6;
    let b = Math.floor(Math.random() * 5) + 8;
    let C_deg = 60 + Math.floor(Math.random() * 30);
    let C_rad = C_deg * Math.PI / 180;
    let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2) - 2 * a * b * Math.cos(C_rad));

    let A_deg = 45 + Math.floor(Math.random() * 20);
    let B_deg = 30 + Math.floor(Math.random() * 15);
    let a_side = 10 + Math.floor(Math.random() * 10);
    let b_side = (a_side * Math.sin(B_deg * Math.PI / 180)) / Math.sin(A_deg * Math.PI / 180);

    let side1 = 5 + Math.floor(Math.random() * 5);
    let side2 = 6 + Math.floor(Math.random() * 5);
    let angle_deg = 120;
    let area = 0.5 * side1 * side2 * Math.sin(angle_deg * Math.PI / 180);

    // --- CONSTRUCCIÓN DEL HTML ---
    html += ai.getHeader("3.3.1", "Trigonometría: Regla del seno y coseno", "Matemáticas AI NM - Geometría");

    html += `
        <div class="seccion-title">I. Activación / Fluidez</div>
        <div class="exercise-step">
            Aplique la regla del seno o del coseno según corresponda:
            <ol class="FT_ol">
                <li>En un triángulo $\\triangle ABC$, $\\hat{A} = 35^{\\circ}$, $\\hat{B} = 65^{\\circ}$ y $a = 12$ cm.
                    <ol class="FT_ol_a">
                        <li>Calcule $\\hat{C}$. <span class="mark">1</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
                        <li>Halle el lado $b$. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                    </ol>
                </li>
                <li>Dados $a = 7$, $b = 9$ y $\\hat{C} = 55^{\\circ}$, halle el lado $c$. <span class="mark">2</span>
                    <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
                </li>
                <li>Calcule el área de un triángulo con lados $8$ m y $11$ m que forman un ángulo de $100^{\\circ}$. <span class="mark">2</span>
                    <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
                </li>
            </ol>
        </div>

        <div class="seccion-title">II. Desarrollo (Uso de Calculadora)</div>
        <div class="exercise-step">
            <div class="contexto-especial">
                <b>Problema de navegación:</b> Dos barcos parten de un puerto al mismo tiempo. El barco A viaja $${a}$ km hacia el Norte y el barco B viaja $${b}$ km en una dirección de $${C_deg}^{\\circ}$ respecto al rumbo del barco A.
            </div>
            <ol class="FT_ol_a">
                <li>Halle la distancia entre los dos barcos al cabo de ese tiempo. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Si el barco A es más lento, ¿qué ángulo debe formar el barco B para que la distancia sea menor? (Discusión teórica). <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            </ol>
        </div>

        ${ai.getTiTip("Para la regla del coseno, use <code>Y1=√(A²+B²-2AB·cos(C))</code>. En MODE, seleccione DEGREE.")}

        <div class="exercise-step">
            En un triángulo $\\triangle ABC$, se sabe que $\\hat{A} = ${A_deg}^{\\circ}$, $\\hat{B} = ${B_deg}^{\\circ}$ y el lado $a = ${a_side}$ cm.
            <ol class="FT_ol_a">
                <li>Calcule la medida del ángulo $\\hat{C}$. <span class="mark">1</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Halle la longitud del lado $b$. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            </ol>
        </div>

        ${ai.getTiTip("Para la regla del seno, use ALPHA+Y= para fracción y la función seno.")}

        <div class="page-break"></div>

        <div class="seccion-title">III. Modelización (Contexto Real)</div>
        <div class="exercise-step">
            <div class="contexto-especial">
                <b>Problema de triangulación marítima: Dos estaciones de monitoreo.</b><br>
                Una empresa de monitoreo marítimo coloca dos estaciones de radar en puntos A y B en la costa, separados por $d = 15$ km. Un barco de investigación navega frente a la costa, y las estaciones registran los ángulos de visualización desde cada estación.
            </div>
            <ol class="FT_ol_ramificado">
                <li>Desde la estación A, el ángulo medido es $\\hat{A} = 42^{\\circ}$. Desde la estación B, el ángulo es $\\hat{B} = 58^{\\circ}$. Trace un diagrama que muestre la situación. <span class="mark">2</span> <tlacuache-renglon n="4" color="#f9f9f9"></tlacuache-renglon><tlacuache-ejes size="200, 200" type="triangulo"></tlacuache-ejes></li>
                <li>Calcule la distancia del barco desde cada estación (lados $b$ y $c$). Exprese su respuesta con <b>3 cifras significativas</b>. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Si el barco navega directamente hacia la costa (perpendicularmente a la línea AB), ¿en qué ángulo debería cambiar el ángulo observado desde A? Justifique su respuesta. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
                <li>Una tercera estación C se coloca $8$ km mar adentro desde el punto medio de AB. Calcule el área del triángulo formado por las tres estaciones. <span class="mark">4</span> <tlacuache-renglon n="4" color="#f9f9f9"></tlacuache-renglon></li>
            </ol>
        </div>
    </div><div class="page-break"></div>
    `;

    // --- SOLUCIONARIO ---
    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 3.3.1:</b><br>
        <b>Nivel 1:</b><br>
        (1a) $\\hat{C} = 180^{\\circ} - 35^{\\circ} - 65^{\\circ} = 80^{\\circ}$ [A1]<br>
        (1b) $\\frac{12}{\\sin(35^{\\circ})} = \\frac{b}{\\sin(65^{\\circ})} \\Rightarrow b \\approx 17.3$ cm [M1 A1]<br>
        (2) Por regla del coseno: $c^2 = 7^2 + 9^2 - 2(7)(9)\\cos(55^{\\circ}) \\Rightarrow c \\approx 7.54$ [M1 A1]<br>
        (3) $\\text{Área} = \\frac{1}{2} \\cdot 8 \\cdot 11 \\cdot \\sin(100^{\\circ}) \\approx 43.4$ m$^2$ [M1 A1]<br>
        <br>
        <b>Nivel 2:</b><br>
        (P1: 1a) Por regla del coseno: $c^2 = ${a}^2 + ${b}^2 - 2(${a})(${b})\\cos(${C_deg}^{\\circ}) \\Rightarrow c \\approx ${Number(c.toPrecision(3))}$ km [M1 A2]<br>
        (P2: 2a) $\\hat{C} = 180^{\\circ} - (${A_deg}^{\\circ} + ${B_deg}^{\\circ}) = ${180 - A_deg - B_deg}^{\\circ}$ [A1]<br>
        (P2: 2b) $\\frac{${a_side}}{\\sin(${A_deg}^{\\circ})} = \\frac{b}{\\sin(${B_deg}^{\\circ})} \\Rightarrow b \\approx ${Number(b_side.toPrecision(3))}$ cm [M1 A1]<br>
        <br>
        <b>Nivel 3:</b><br>
        (a) Diagrama con triángulo donde $AB = 15$ km, ángulos en A y B [A1 A1]<br>
        (b) Usando regla del seno: $b \\approx 21.7$ km, $c \\approx 18.4$ km [M1 A1 A1]<br>
        (c) El ángulo debería disminuir porque el barco se acerca a la línea AB, formando un triángulo más isósceles [R1 M1 A1]<br>
        (d) Área $= \\frac{1}{2} \\cdot 15 \\cdot 8 = 60.0$ km$^2$ [M1 A1 A2]<br>
    </div>
    `;

    return [html, solucion];
}

export async function renderGeoGebra(container, totalElements) { }