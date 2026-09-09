import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Volumen de Prismas y Sólidos de Sección Uniforme";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("3.1.27", "3. Geometría y trigonometría", "Ficha: Volumen de Prismas y Sólidos de Sección Uniforme");

    // ==========================================
    // EJERCICIO 1 (CUARTILLA 1): PRISMAS TRAPEZOIDALES Y SECCIÓN UNIFORME
    // ==========================================
    // Prisma trapezoidal: lingote de oro o bloque de hormigón
    // Base menor b1, base mayor b2, altura h_trap, longitud L_lingote
    const b_menor = Math.floor(Math.random() * 3) + 4; // 4, 5, 6 cm
    const b_mayor = b_menor + Math.floor(Math.random() * 3) + 3; // 7 a 11 cm
    const h_trap = Math.floor(Math.random() * 3) + 3; // 3, 4, 5 cm
    const L_lingote = (Math.floor(Math.random() * 5) + 12); // 12 a 16 cm

    const areaTrapecio = ((b_menor + b_mayor) / 2) * h_trap;
    const volLingote = areaTrapecio * L_lingote;

    // Prisma triangular: piscina con rampa inclinada
    // Longitud 20 m, ancho W, profundidad shallow d1, deep d2
    const anchoPiscina = Math.floor(Math.random() * 3) + 6; // 6, 7, 8 m
    const d1 = 1.0; // 1.0 m
    const d2 = 2.2; // 2.2 m
    const L_piscina = 25; // 25 m
    const areaSeccionPiscina = ((d1 + d2) / 2) * L_piscina;
    const volPiscina = areaSeccionPiscina * anchoPiscina;

    html += `
    <div class="seccion-title">I. Sólidos con Sección Transversal Uniforme: $V = A_{\\text{sección}} \\times h$</div>
    <div class="exercise-step">
        <p><strong>1.</strong> Un lingote macizo de metal tiene una sección transversal con forma de trapecio isósceles de bases $b_1 = ${b_menor}\\text{ cm}$, $b_2 = ${b_mayor}\\text{ cm}$ y altura $h = ${h_trap}\\text{ cm}$. La longitud total del lingote es $L = ${L_lingote}\\text{ cm}$.</p>

        <div style="display:flex; justify-content:center; margin: 4px 0;">
            <svg width="220" height="95" viewBox="0 0 220 95" style="background:#fff;">
                <!-- Trapezoid front face -->
                <polygon points="50,75 110,75 95,35 65,35" fill="#fef08a" stroke="#ca8a04" stroke-width="1.8"/>
                <!-- 3D extrusion lines -->
                <polygon points="65,35 95,35 155,15 125,15" fill="#fef9c3" stroke="#ca8a04" stroke-width="1.8"/>
                <polygon points="95,35 110,75 170,55 155,15" fill="#fde047" stroke="#ca8a04" stroke-width="1.8"/>
                <line x1="50" y1="75" x2="110" y2="55" stroke="#ca8a04" stroke-width="1.4" stroke-dasharray="3"/>
                <!-- Labels -->
                <text x="80" y="87" font-family="sans-serif" font-size="10" text-anchor="middle">${b_mayor} cm</text>
                <text x="80" y="30" font-family="sans-serif" font-size="10" text-anchor="middle">${b_menor} cm</text>
                <text x="50" y="55" font-family="sans-serif" font-size="10" fill="#dc2626">${h_trap} cm</text>
                <text x="140" y="27" font-family="sans-serif" font-size="10">${L_lingote} cm</text>
            </svg>
        </div>

        <ol class="FT_ol_a">
            <li>
                Calcule el área de la sección transversal trapezoidal del lingote. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Determine el volumen total del lingote en centímetros cúbicos ($\\text{cm}^3$). <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>

        <p style="margin-top: 14px;"><strong>2.</strong> Una piscina tiene $L = ${L_piscina}\\text{ m}$ de longitud y $a = ${anchoPiscina}\\text{ m}$ de ancho. Su fondo presenta una pendiente uniforme, con una profundidad de $${d1}\\text{ m}$ en el extremo poco profundo y de $${d2}\\text{ m}$ en el extremo profundo.</p>

        <div style="display:flex; justify-content:center; margin: 4px 0;">
            <svg width="220" height="90" viewBox="0 0 220 90" style="background:#fff;">
                <!-- Profile trapezoid -->
                <polygon points="30,25 170,25 170,75 30,50" fill="#bae6fd" stroke="#0284c7" stroke-width="1.8"/>
                <line x1="30" y1="25" x2="170" y2="25" stroke="#0369a1" stroke-width="2"/>
                <!-- Labels -->
                <text x="100" y="20" font-family="sans-serif" font-size="10" text-anchor="middle">${L_piscina} m (longitud)</text>
                <text x="15" y="40" font-family="sans-serif" font-size="9">${d1} m</text>
                <text x="175" y="55" font-family="sans-serif" font-size="9">${d2} m</text>
                <text x="100" y="65" font-family="sans-serif" font-size="10" fill="#0369a1" text-anchor="middle">ancho = ${anchoPiscina} m</text>
            </svg>
        </div>

        <ol class="FT_ol_a">
            <li>
                Halle el volumen total de agua requerido para llenar completamente la piscina en metros cúbicos ($\\text{m}^3$). <span class="mark">3</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>
    `;

    // ==========================================
    // EJERCICIO 2 (CUARTILLA 2): TUBERÍA CILÍNDRICA HUECA Y PROBLEMA INVERSO
    // ==========================================
    // Tubo cilíndrico de hormigón/plástico: R_ext, R_int, longitud L_tubo
    const R_ext = (Math.floor(Math.random() * 3) + 4) * 0.1; // 0.4, 0.5, 0.6 m
    const grosor = 0.05; // 5 cm = 0.05 m
    const R_int = parseFloat((R_ext - grosor).toFixed(2));
    const L_tubo = Math.floor(Math.random() * 3) + 4; // 4, 5, 6 m

    const volCilExt = Math.PI * R_ext * R_ext * L_tubo;
    const volCilInt = Math.PI * R_int * R_int * L_tubo;
    const volMaterialTubo = volCilExt - volCilInt;

    // Problema 4: Problema inverso (despejar altura o radio)
    const radioTanque = (Math.floor(Math.random() * 3) + 2); // 2, 3, 4 m
    const volDado = (Math.floor(Math.random() * 4) + 6) * 10; // 60, 70, 80, 90 m^3
    const hRequerida = volDado / (Math.PI * radioTanque * radioTanque);

    html += `
    <div class="seccion-title">II. Cilindros Huecos (Tuberías) y Problemas Inversos de Volumen</div>
    <div class="exercise-step">
        <p><strong>3.</strong> Para una obra de drenaje pluvial se fabrican tuberías cilíndricas de hormigón de $L = ${L_tubo}\\text{ m}$ de longitud. Cada tubo tiene un radio exterior de $R = ${R_ext}\\text{ m}$ y un grosor de pared de $${Math.round(grosor * 100)}\\text{ cm}$ ($r = ${R_int}\\text{ m}$).</p>

        <div style="display:flex; justify-content:center; margin: 4px 0;">
            <svg width="220" height="95" viewBox="0 0 220 95" style="background:#fff;">
                <!-- Outer cylinder -->
                <ellipse cx="60" cy="47" rx="35" ry="35" fill="#cbd5e1" stroke="#475569" stroke-width="1.8"/>
                <ellipse cx="60" cy="47" rx="28" ry="28" fill="#fff" stroke="#475569" stroke-width="1.8"/>
                <path d="M 60 12 L 170 25 A 35 35 0 0 1 170 70 L 60 82" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>
                <!-- Labels -->
                <text x="60" y="52" font-family="sans-serif" font-size="9" text-anchor="middle">r=${R_int}m</text>
                <text x="60" y="8" font-family="sans-serif" font-size="9" text-anchor="middle">R=${R_ext}m</text>
                <text x="130" y="18" font-family="sans-serif" font-size="10">${L_tubo} m</text>
            </svg>
        </div>

        <ol class="FT_ol_a">
            <li>
                Escriba la fórmula del área de la corona circular de la base y calcule su valor numérico. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Demuestre que el volumen de hormigón necesario para moldear un tubo completo es aproximadamente $${volMaterialTubo.toFixed(3)}\\text{ m}^3$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>

        <p style="margin-top: 14px;"><strong>4.</strong> Un depósito cilíndrico de combustible tiene una base circular de radio $r = ${radioTanque}\\text{ m}$ y debe almacenar una capacidad de volumen de $${volDado}\\text{ m}^3$.</p>
        <ol class="FT_ol_a">
            <li>
                Plantee una ecuación para el volumen del cilindro y determine la altura mínima $h$ que debe tener el depósito. Redondee su respuesta a tres cifras significativas. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 3.1.27 (Volumen de Prismas y Sólidos de Sección Uniforme):</b><br><br>

        <b>1. Lingote de Sección Trapezoidal:</b><br>
        * a) $A_{\\text{sección}} = \\frac{b_1 + b_2}{2} \\cdot h = \\frac{${b_menor} + ${b_mayor}}{2} \\cdot ${h_trap} = \\frac{${b_menor + b_mayor}}{2} \\cdot ${h_trap} = $ <b>${areaTrapecio.toFixed(1)}\\text{ cm}^2$</b>.<br>
        * b) $V = A_{\\text{sección}} \\cdot L = ${areaTrapecio.toFixed(1)} \\cdot ${L_lingote} = $ <b>${volLingote.toFixed(1)}\\text{ cm}^3$</b>.<br><br>

        <b>2. Piscina con Pendiente Uniforme:</b><br>
        * a) Sección longitudinal (trapecio): $A = \\frac{${d1} + ${d2}}{2} \\cdot ${L_piscina} = \\frac{${d1 + d2}}{2} \\cdot ${L_piscina} = ${areaSeccionPiscina}\\text{ m}^2$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Volumen total: $V = A \\cdot \\text{ancho} = ${areaSeccionPiscina} \\cdot ${anchoPiscina} = $ <b>${volPiscina.toFixed(1)}\\text{ m}^3$</b>.<br><br>

        <b>3. Tubería Cilíndrica Hueca:</b><br>
        * a) Área de la corona circular: $A_{\\text{corona}} = \\pi(R^2 - r^2) = \\pi(${R_ext}^2 - ${R_int}^2) = \\pi(${parseFloat((R_ext*R_ext).toFixed(4))} - ${parseFloat((R_int*R_int).toFixed(4))}) \\approx $ <b>${(Math.PI * (R_ext*R_ext - R_int*R_int)).toFixed(4)}\\text{ m}^2$</b>.<br>
        * b) Volumen de material: $V = A_{\\text{corona}} \\cdot L = \\pi(${R_ext}^2 - ${R_int}^2) \\cdot ${L_tubo} \\approx $ <b>${volMaterialTubo.toFixed(3)}\\text{ m}^3$</b> (o <b>${parseFloat(volMaterialTubo.toPrecision(3))}\\text{ m}^3$</b>).<br><br>

        <b>4. Problema Inverso en Depósito Cilíndrico:</b><br>
        * a) Ecuación: $V = \\pi r^2 h \\implies ${volDado} = \\pi (${radioTanque}^2) h = ${radioTanque*radioTanque}\\pi h$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Despeje de $h$: $h = \\frac{${volDado}}{${radioTanque*radioTanque}\\pi} \\approx $ <b>${hRequerida.toFixed(2)}\\text{ m}</b> (o <b>${parseFloat(hRequerida.toPrecision(3))}\\text{ m}</b> a 3 c.s.).
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
