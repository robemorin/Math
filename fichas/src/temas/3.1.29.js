import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Capacidad, Masa y Densidad en Contextos Reales";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("3.1.29", "3. Geometría y trigonometría", "Ficha: Capacidad, Masa y Densidad en Contextos Reales");

    // ==========================================
    // EJERCICIO 1 (CUARTILLA 1): CAPACIDAD DE TANQUES Y CONVERSIÓN DE UNIDADES
    // ==========================================
    // Depósito cilíndrico de agua o tanque de almacenamiento
    const d_tanque = (Math.floor(Math.random() * 3) + 2); // 2, 3, 4 m de diámetro
    const r_tanque = d_tanque / 2;
    const h_tanque = (Math.floor(Math.random() * 3) + 3); // 3, 4, 5 m de altura
    const vol_m3 = Math.PI * r_tanque * r_tanque * h_tanque;
    const cap_litros = vol_m3 * 1000;
    const cap_kL = vol_m3;

    // Tasa de llenado/vaciado con bomba
    const caudal_L_min = (Math.floor(Math.random() * 4) + 5) * 20; // 100, 120, 140, 160 L/min
    const tiempo_min = cap_litros / caudal_L_min;
    const tiempo_horas = tiempo_min / 60;

    html += `
    <div class="seccion-title">I. Capacidad de Recipientes y Conversión de Unidades de Volumen</div>
    <div class="exercise-step">
        <p><strong>1.</strong> Un depósito cilíndrico vertical para almacenar agua de riego tiene un diámetro interior de base $d = ${d_tanque}\\text{ m}$ y una altura de $h = ${h_tanque}\\text{ m}$.</p>

        <div style="display:flex; justify-content:center; margin: 4px 0;">
            <svg width="180" height="100" viewBox="0 0 180 100" style="background:#fff;">
                <ellipse cx="90" cy="20" rx="45" ry="12" fill="#bae6fd" stroke="#0284c7" stroke-width="1.8"/>
                <path d="M 45 20 L 45 80 A 45 12 0 0 0 135 80 L 135 20" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.8"/>
                <path d="M 45 80 A 45 12 0 0 1 135 80" fill="none" stroke="#7dd3fc" stroke-dasharray="3"/>
                <line x1="45" y1="20" x2="135" y2="20" stroke="#0369a1" stroke-width="1.4"/>
                <text x="90" y="16" font-family="sans-serif" font-size="10" fill="#0369a1" text-anchor="middle">d=${d_tanque} m</text>
                <line x1="145" y1="20" x2="145" y2="80" stroke="#555" stroke-width="1.2"/>
                <text x="150" y="55" font-family="sans-serif" font-size="10">h=${h_tanque} m</text>
            </svg>
        </div>

        <ol class="FT_ol_a">
            <li>
                Calcule el volumen del tanque en metros cúbicos ($\\text{m}^3$) y determine su capacidad total en <strong>litros (L)</strong>. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Escriba la capacidad máxima del depósito en <strong>kilolitros (kL)</strong>. <span class="mark">1</span>
                <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Si el tanque está completamente vacío y se llena mediante una bomba hidráulica con un caudal constante de $${caudal_L_min}\\text{ L/min}$, determine el tiempo total en <strong>horas</strong> necesario para llenarlo al $100\\%$. Dé su respuesta a tres cifras significativas. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>
    `;

    // ==========================================
    // EJERCICIO 2 (CUARTILLA 2): DENSIDAD, MASA Y FLOTABILIDAD EN CONTEXTO REAL
    // ==========================================
    // Lingote / bloque prismático de metal
    // Masa = Densidad * Volumen
    const l_bloque = Math.floor(Math.random() * 3) + 8; // 8, 9, 10 cm
    const w_bloque = Math.floor(Math.random() * 2) + 4; // 4 o 5 cm
    const h_bloque = 3; // 3 cm
    const vol_bloque_cm3 = l_bloque * w_bloque * h_bloque;
    
    // Densidad del bronce / latón: ~8.4 g/cm^3
    const densidad_g_cm3 = parseFloat((Math.floor(Math.random() * 4) * 0.2 + 7.8).toFixed(1)); // 7.8, 8.0, 8.2, 8.4 g/cm3
    const masa_gramos = vol_bloque_cm3 * densidad_g_cm3;
    const masa_kg = masa_gramos / 1000;

    // Problema 3: Recipiente con grosor de pared y capacidad neta
    const L_ext = 60; // cm
    const W_ext = 40; // cm
    const H_ext = 30; // cm
    const grosor_cm = 2; // 2 cm
    const L_int = L_ext - 2 * grosor_cm; // 56 cm
    const W_int = W_ext - 2 * grosor_cm; // 36 cm
    const H_int = H_ext - grosor_cm; // 28 cm (abierta arriba)
    const vol_madera_cm3 = (L_ext * W_ext * H_ext) - (L_int * W_int * H_int);
    const cap_interior_L = (L_int * W_int * H_int) / 1000;

    html += `
    <div class="seccion-title">II. Relación Masa-Densidad ($\\text{Masa} = \\text{Densidad} \\times \\text{Volumen}$) y Cuerpos Huecos</div>
    <div class="exercise-step">
        <p><strong>2.</strong> Un lingote de aleación metálica tiene la forma de un prisma rectangular recto de dimensiones $${l_bloque}\\text{ cm} \\times ${w_bloque}\\text{ cm} \\times ${h_bloque}\\text{ cm}$. La densidad de la aleación es de $\\rho = ${densidad_g_cm3}\\text{ g/cm}^3$.</p>

        <ol class="FT_ol_a">
            <li>
                Calcule el volumen total del lingote metálico. <span class="mark">1</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Halle la masa del lingote en <strong>gramos (g)</strong> y exprese su resultado final en <strong>kilogramos (kg)</strong>. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>

        <p style="margin-top: 14px;"><strong>3.</strong> Una jardinera de madera maciza (abierta por su cara superior) tiene dimensiones exteriores de $${L_ext}\\text{ cm}$ de largo, $${W_ext}\\text{ cm}$ de ancho y $${H_ext}\\text{ cm}$ de altura. La madera utilizada tiene un grosor uniforme de $${grosor_cm}\\text{ cm}$ en la base y en todas sus cuatro paredes laterales.</p>

        <div style="display:flex; justify-content:center; margin: 4px 0;">
            <svg width="220" height="95" viewBox="0 0 220 95" style="background:#fff;">
                <!-- Outer box -->
                <rect x="25" y="35" width="120" height="50" fill="#fef3c7" stroke="#b45309" stroke-width="1.8"/>
                <polygon points="25,35 65,15 185,15 145,35" fill="#fde68a" stroke="#b45309" stroke-width="1.8"/>
                <polygon points="145,35 185,15 185,65 145,85" fill="#d97706" stroke="#b45309" stroke-width="1.8"/>
                <!-- Inner opening -->
                <polygon points="35,35 69,19 175,19 141,35" fill="#78350f" stroke="#b45309" stroke-width="1.2"/>
                <!-- Labels -->
                <text x="85" y="96" font-family="sans-serif" font-size="9" text-anchor="middle">${L_ext} cm</text>
                <text x="175" y="78" font-family="sans-serif" font-size="9">${W_ext} cm</text>
                <text x="15" y="60" font-family="sans-serif" font-size="9">${H_ext} cm</text>
            </svg>
        </div>

        <ol class="FT_ol_a">
            <li>
                Escriba las dimensiones interiores (longitud, anchura y profundidad) del espacio disponible en la jardinera. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Calcule la capacidad máxima de tierra vegetal que puede contener la jardinera en <strong>litros (L)</strong>. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Determine el volumen total de madera maciza utilizado para fabricar la estructura de la jardinera en $\\text{cm}^3$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 3.1.29 (Capacidad, Masa y Densidad en Contextos Reales):</b><br><br>

        <b>1. Depósito Cilíndrico de Agua:</b><br>
        * a) Radio $r = \\frac{${d_tanque}}{2} = ${r_tanque}\\text{ m}$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Volumen: $V = \\pi r^2 h = \\pi (${r_tanque}^2)(${h_tanque}) = ${r_tanque*r_tanque*h_tanque}\\pi \\approx $ <b>${vol_m3.toFixed(2)}\\text{ m}^3$</b>.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Capacidad en Litros: $V \\times 1000 = ${vol_m3.toFixed(2)} \\times 1000 \\approx $ <b>${cap_litros.toFixed(0)}\\text{ L}$</b> (o <b>${parseFloat(cap_litros.toPrecision(3))}\\text{ L}$</b> a 3 c.s.).<br>
        * b) En kilolitros: como $1\\text{ m}^3 = 1\\text{ kL}$, Capacidad = <b>${cap_kL.toFixed(2)}\\text{ kL}$</b>.<br>
        * c) Tiempo en minutos: $t_{\\text{min}} = \\frac{${cap_litros.toFixed(1)}}{${caudal_L_min}} \\approx ${tiempo_min.toFixed(1)}\\text{ min}$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Tiempo en horas: $t_{\\text{horas}} = \\frac{${tiempo_min.toFixed(1)}}{60} \\approx $ <b>${tiempo_horas.toFixed(2)}\\text{ horas}$</b> (o <b>${parseFloat(tiempo_horas.toPrecision(3))}\\text{ h}$</b>).<br><br>

        <b>2. Lingote Metálico y Densidad:</b><br>
        * a) Volumen: $V = L \\times W \\times H = ${l_bloque} \\times ${w_bloque} \\times ${h_bloque} = $ <b>${vol_bloque_cm3}\\text{ cm}^3$</b>.<br>
        * b) Masa: $M = V \\times \\rho = ${vol_bloque_cm3} \\times ${densidad_g_cm3} = $ <b>${masa_gramos.toFixed(1)}\\text{ g}$</b> = <b>${masa_kg.toFixed(3)}\\text{ kg}$</b>.<br><br>

        <b>3. Jardinera con Grosor de Paredes:</b><br>
        * a) Dimensiones interiores (abierta arriba):<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Largo interior: $L_{\\text{int}} = ${L_ext} - 2(${grosor_cm}) = $ <b>${L_int}\\text{ cm}</b>.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Ancho interior: $W_{\\text{int}} = ${W_ext} - 2(${grosor_cm}) = $ <b>${W_int}\\text{ cm}</b>.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Profundidad interior: $H_{\\text{int}} = ${H_ext} - ${grosor_cm} = $ <b>${H_int}\\text{ cm}</b>.<br>
        * b) Capacidad interior: $V_{\\text{int}} = ${L_int} \\times ${W_int} \\times ${H_int} = ${L_int * W_int * H_int}\\text{ cm}^3$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;En litros: $\\frac{${L_int * W_int * H_int}}{1000} = $ <b>${cap_interior_L.toFixed(2)}\\text{ L}$</b>.<br>
        * c) Volumen de madera maciza: $V_{\\text{madera}} = V_{\\text{exterior}} - V_{\\text{interior}} = (${L_ext} \\times ${W_ext} \\times ${H_ext}) - ${L_int * W_int * H_int} = ${L_ext * W_ext * H_ext} - ${L_int * W_int * H_int} = $ <b>${vol_madera_cm3}\\text{ cm}^3$</b>.
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
