import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Área Superficial de Prismas y Pirámides";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("3.1.25", "3. Geometría y trigonometría", "Ficha: Área Superficial de Prismas y Pirámides");

    // ==========================================
    // EJERCICIO 1 (CUARTILLA 1): PRISMAS RECTANGULARES Y TRIANGULARES
    // ==========================================
    const a1 = Math.floor(Math.random() * 3) + 3; // 3, 4, 5 cm
    const b1 = Math.floor(Math.random() * 3) + 4; // 4, 5, 6 cm
    const c1 = Math.sqrt(a1 * a1 + b1 * b1); // hipotenusa
    const L1 = (Math.floor(Math.random() * 5) + 8); // 8 a 12 cm de longitud

    const areaBases = a1 * b1;
    const perimTriang = a1 + b1 + c1;
    const areaLateralTriang = perimTriang * L1;
    const areaTotalTriang = areaBases + areaLateralTriang;

    const largo1 = (Math.floor(Math.random() * 4) + 6); // 6 a 9 cm
    const ancho1 = (Math.floor(Math.random() * 3) + 4); // 4 a 6 cm
    const alto1 = (Math.floor(Math.random() * 3) + 2); // 2 a 4 cm
    const areaCaja = 2 * (largo1 * ancho1 + largo1 * alto1 + ancho1 * alto1);

    html += `
    <div class="seccion-title">I. Área Superficial de Prismas Rectos (Rectangulares y Triangulares)</div>
    <div class="exercise-step">
        <p><strong>1.</strong> Una caja cerrada de embalaje tiene la forma de un prisma rectangular recto con longitud de $${largo1}\\text{ cm}$, ancho de $${ancho1}\\text{ cm}$ y altura de $${alto1}\\text{ cm}$.</p>

        <div style="display:flex; justify-content:center; margin: 6px 0;">
            <svg width="200" height="95" viewBox="0 0 220 110" style="background:#fff;">
                <rect x="30" y="45" width="110" height="50" fill="#f1f5f9" stroke="#334155" stroke-width="1.8"/>
                <polygon points="30,45 75,15 185,15 140,45" fill="#e2e8f0" stroke="#334155" stroke-width="1.8"/>
                <polygon points="140,45 185,15 185,65 140,95" fill="#cbd5e1" stroke="#334155" stroke-width="1.8"/>
                <text x="85" y="108" font-family="sans-serif" font-size="11" text-anchor="middle">${largo1} cm</text>
                <text x="170" y="90" font-family="sans-serif" font-size="11">${ancho1} cm</text>
                <text x="15" y="73" font-family="sans-serif" font-size="11">${alto1} cm</text>
            </svg>
        </div>

        <ol class="FT_ol_a">
            <li>
                Dibuje un diagrama de la red geométrica (desarrollo plano) de la caja indicando las dimensiones de sus caras. <span class="mark">2</span>
                <div style="border: 1px dashed #bbb; height: 95px; margin: 4px 0; background-color: #fafafa; border-radius: 4px;"></div>
            </li>
            <li>
                Calcule el área superficial total del prisma rectangular. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>

        <p style="margin-top: 14px;"><strong>2.</strong> La siguiente figura muestra un prisma triangular recto cuya base es un triángulo rectángulo de catetos $a = ${a1}\\text{ cm}$ y $b = ${b1}\\text{ cm}$, con una longitud de prisma $L = ${L1}\\text{ cm}$.</p>

        <div style="display:flex; justify-content:center; margin: 6px 0;">
            <svg width="200" height="95" viewBox="0 0 220 110" style="background:#fff;">
                <polygon points="40,85 110,85 40,30" fill="#f8fafc" stroke="#0f172a" stroke-width="1.8"/>
                <rect x="40" y="75" width="10" height="10" fill="none" stroke="#0f172a" stroke-width="1.2"/>
                <polygon points="40,30 110,85 180,55 110,0" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.8"/>
                <line x1="40" y1="30" x2="110" y2="0" stroke="#0f172a" stroke-width="1.8"/>
                <line x1="110" y1="85" x2="180" y2="55" stroke="#0f172a" stroke-width="1.8"/>
                <line x1="110" y1="0" x2="180" y2="55" stroke="#0f172a" stroke-width="1.8"/>
                <text x="25" y="60" font-family="sans-serif" font-size="11">${a1} cm</text>
                <text x="75" y="98" font-family="sans-serif" font-size="11" text-anchor="middle">${b1} cm</text>
                <text x="145" y="25" font-family="sans-serif" font-size="11">${L1} cm</text>
            </svg>
        </div>

        <ol class="FT_ol_a">
            <li>
                Halle la longitud de la hipotenusa de la cara triangular. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Demuestre que el área superficial total del prisma triangular es aproximadamente $${areaTotalTriang.toFixed(1)}\\text{ cm}^2$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>
    `;

    // ==========================================
    // EJERCICIO 2 (CUARTILLA 2): PIRÁMIDES REGULARES Y APLICACIÓN DE COSTOS
    // ==========================================
    const L_base = (Math.floor(Math.random() * 4) + 5) * 2; // 10, 12, 14, 16 m
    const H_pir = Math.floor(Math.random() * 5) + 8; // 8 a 12 m
    const semiL = L_base / 2;
    const apotema = Math.sqrt(H_pir * H_pir + semiL * semiL);

    const areaBasePir = L_base * L_base;
    const areaTriangCara = 0.5 * L_base * apotema;
    const areaLatPir = 4 * areaTriangCara;
    const areaTotalPir = areaBasePir + areaLatPir;

    const costoM2 = (Math.floor(Math.random() * 4) + 12);
    const costoTotalLona = areaLatPir * costoM2;

    const largoH = (Math.floor(Math.random() * 3) + 4);
    const anchoH = (Math.floor(Math.random() * 2) + 3);
    const altoH = 2.5;
    const areaParedes = 2 * (largoH + anchoH) * altoH;
    const areaTecho = largoH * anchoH;
    const areaAberturas = 4.2;
    const areaPintar = (areaParedes + areaTecho) - areaAberturas;

    html += `
    <div class="seccion-title">II. Pirámides Regulares, Apotema y Aplicaciones en Contexto</div>
    <div class="exercise-step">
        <p><strong>3.</strong> Una carpa piramidal para eventos tiene una base cuadrada de lado $b = ${L_base}\\text{ m}$ y una altura vertical en el centro de $h = ${H_pir}\\text{ m}$.</p>

        <div style="display:flex; justify-content:center; margin: 4px 0;">
            <svg width="200" height="105" viewBox="0 0 240 130" style="background:#fff;">
                <polygon points="40,105 150,105 200,80 90,80" fill="#f8fafc" stroke="#475569" stroke-width="1.5"/>
                <line x1="120" y1="20" x2="120" y2="92" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3"/>
                <line x1="120" y1="20" x2="95" y2="105" stroke="#2563eb" stroke-width="1.8"/>
                <line x1="120" y1="20" x2="40" y2="105" stroke="#1e293b" stroke-width="1.8"/>
                <line x1="120" y1="20" x2="150" y2="105" stroke="#1e293b" stroke-width="1.8"/>
                <line x1="120" y1="20" x2="200" y2="80" stroke="#1e293b" stroke-width="1.8"/>
                <line x1="120" y1="20" x2="90" y2="80" stroke="#94a3b8" stroke-dasharray="3"/>
                <text x="95" y="120" font-family="sans-serif" font-size="11" text-anchor="middle">${L_base} m</text>
                <text x="125" y="60" font-family="sans-serif" font-size="11" fill="#dc2626">h = ${H_pir} m</text>
                <text x="100" y="55" font-family="sans-serif" font-size="11" fill="#2563eb" text-anchor="end">s</text>
            </svg>
        </div>

        <ol class="FT_ol_a">
            <li>
                Utilizando el teorema de Pitágoras, calcule la altura inclinada (apotema de la cara lateral, $s$) de la carpa. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Halle el área total de la lona impermeable requerida para cubrir únicamente las cuatro caras laterales del techo de la carpa y, sabiendo que el $\\text{m}^2$ de lona cuesta $\\$${costoM2}$, determine el coste total de fabricación. <span class="mark">3</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>

        <p style="margin-top: 14px;"><strong>4.</strong> Una habitación rectangular tiene dimensiones de $${largoH}\\text{ m}$ de largo, $${anchoH}\\text{ m}$ de ancho y $${altoH}\\text{ m}$ de altura. Se desea pintar las cuatro paredes laterales y el techo (excluyendo $4.2\\text{ m}^2$ por puertas y ventanas).</p>
        <ol class="FT_ol_a">
            <li>
                Calcule el área total neta de superficie que requiere ser pintada. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 3.1.25 (Área Superficial de Prismas y Pirámides):</b><br><br>

        <b>1. Prisma Rectangular:</b><br>
        * a) Red compuesta por 6 rectángulos emparejados (2 de ${largo1}x${ancho1}, 2 de ${largo1}x${alto1}, 2 de ${ancho1}x${alto1}).<br>
        * b) $A = 2(L \\cdot W + L \\cdot H + W \\cdot H) = 2((${largo1})(${ancho1}) + (${largo1})(${alto1}) + (${ancho1})(${alto1})) = $ <b>${areaCaja}\\text{ cm}^2$</b>.<br><br>

        <b>2. Prisma Triangular Recto:</b><br>
        * a) Hipotenusa $c = \\sqrt{a^2 + b^2} = \\sqrt{${a1}^2 + ${b1}^2} = \\sqrt{${a1*a1 + b1*b1}} \\approx $ <b>${c1.toFixed(2)}\\text{ cm}</b>.<br>
        * b) Área bases: $2 \\times \\left(\\frac{1}{2} \\cdot ${a1} \\cdot ${b1}\\right) = ${a1*b1}\\text{ cm}^2$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Área lateral: $(a + b + c) \\cdot L = (${a1} + ${b1} + ${c1.toFixed(2)}) \\cdot ${L1} \\approx ${areaLateralTriang.toFixed(2)}\\text{ cm}^2$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Área total: $A_{\\text{total}} = ${a1*b1} + ${areaLateralTriang.toFixed(2)} \\approx $ <b>${areaTotalTriang.toFixed(1)}\\text{ cm}^2$</b>.<br><br>

        <b>3. Carpa Piramidal de Base Cuadrada:</b><br>
        * a) Semilado de la base: $\\frac{${L_base}}{2} = ${semiL}\\text{ m}$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Apotema $s = \\sqrt{h^2 + (b/2)^2} = \\sqrt{${H_pir}^2 + ${semiL}^2} = \\sqrt{${H_pir*H_pir + semiL*semiL}} \\approx $ <b>${apotema.toFixed(2)}\\text{ m}</b>.<br>
        * b) Área lateral: $4 \\times \\left(\\frac{1}{2} \\cdot ${L_base} \\cdot ${apotema.toFixed(2)}\\right) \\approx $ <b>${areaLatPir.toFixed(1)}\\text{ m}^2$</b>.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Coste total: $A_{\\text{lat}} \\times \\$${costoM2} = ${areaLatPir.toFixed(1)} \\times ${costoM2} \\approx $ <b>\\$${costoTotalLona.toFixed(2)}</b>.<br><br>

        <b>4. Pintura de Habitación:</b><br>
        * a) Área lateral de las paredes: $2(L + W)H = 2(${largoH} + ${anchoH})(${altoH}) = ${areaParedes}\\text{ m}^2$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Área del techo: $L \\times W = ${largoH} \\times ${anchoH} = ${areaTecho}\\text{ m}^2$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Área neta a pintar: $(${areaParedes} + ${areaTecho}) - 4.2 = $ <b>${areaPintar.toFixed(1)}\\text{ m}^2$</b>.
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
