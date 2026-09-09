import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Área Superficial de Cilindros, Conos y Esferas";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("3.1.26", "3. Geometría y trigonometría", "Ficha: Área Superficial de Cilindros, Conos y Esferas");

    // ==========================================
    // EJERCICIO 1 (CUARTILLA 1): CILINDRO Y CONO (DESARROLLO Y APOTEMA)
    // ==========================================
    // Cilindro: radio r_cil, altura h_cil
    const r_cil = Math.floor(Math.random() * 3) + 4; // 4, 5, 6 cm
    const h_cil = (Math.floor(Math.random() * 4) + 8); // 8, 9, 10, 11 cm
    const areaLatCil = 2 * Math.PI * r_cil * h_cil;
    const areaBasesCil = 2 * Math.PI * r_cil * r_cil;
    const areaTotalCil = areaLatCil + areaBasesCil;

    // Cono: radio r_cono, altura vertical h_cono
    const r_cono = (Math.floor(Math.random() * 3) + 3) * 2; // 6, 8, 10 cm
    const h_cono = Math.floor(Math.random() * 3) + 8; // 8, 9, 10 cm
    const s_cono = Math.sqrt(r_cono * r_cono + h_cono * h_cono); // slant height
    const areaLatCono = Math.PI * r_cono * s_cono;
    const areaTotalCono = areaLatCono + Math.PI * r_cono * r_cono;

    html += `
    <div class="seccion-title">I. Superficie Curva y Total de Cilindros y Conos Rectos</div>
    <div class="exercise-step">
        <p><strong>1.</strong> Un recipiente metálico cilíndrico cerrado tiene un radio de base $r = ${r_cil}\\text{ cm}$ y una altura de $h = ${h_cil}\\text{ cm}$.</p>

        <div style="display:flex; justify-content:center; margin: 6px 0;">
            <svg width="180" height="95" viewBox="0 0 180 95" style="background:#fff;">
                <!-- Cylinder body -->
                <ellipse cx="90" cy="20" rx="45" ry="12" fill="#e2e8f0" stroke="#334155" stroke-width="1.8"/>
                <path d="M 45 20 L 45 75 A 45 12 0 0 0 135 75 L 135 20" fill="#f1f5f9" stroke="#334155" stroke-width="1.8"/>
                <path d="M 45 75 A 45 12 0 0 1 135 75" fill="none" stroke="#94a3b8" stroke-dasharray="3"/>
                <!-- Dimension lines -->
                <line x1="90" y1="20" x2="135" y2="20" stroke="#2563eb" stroke-width="1.5"/>
                <text x="110" y="16" font-family="sans-serif" font-size="10" fill="#2563eb">${r_cil} cm</text>
                <line x1="145" y1="20" x2="145" y2="75" stroke="#334155" stroke-width="1.2"/>
                <text x="150" y="52" font-family="sans-serif" font-size="10">${h_cil} cm</text>
            </svg>
        </div>

        <ol class="FT_ol_a">
            <li>
                Escriba la fórmula del área total de un cilindro cerrado y calcule el área superficial exacta en términos de $\\pi$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Halle el valor numérico del área superficial total redondeado a tres cifras significativas. <span class="mark">1</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>

        <p style="margin-top: 14px;"><strong>2.</strong> Un embudo tiene forma de cono recto invertido y abierto por su base superior. El radio de su abertura circular es $r = ${r_cono}\\text{ cm}$ y su altura vertical es $h = ${h_cono}\\text{ cm}$.</p>

        <div style="display:flex; justify-content:center; margin: 6px 0;">
            <svg width="180" height="95" viewBox="0 0 180 95" style="background:#fff;">
                <ellipse cx="90" cy="20" rx="45" ry="11" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>
                <line x1="45" y1="20" x2="90" y2="85" stroke="#d97706" stroke-width="1.8"/>
                <line x1="135" y1="20" x2="90" y2="85" stroke="#d97706" stroke-width="1.8"/>
                <line x1="90" y1="20" x2="90" y2="85" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="3"/>
                <line x1="90" y1="20" x2="135" y2="20" stroke="#2563eb" stroke-width="1.4"/>
                <text x="110" y="16" font-family="sans-serif" font-size="10" fill="#2563eb">${r_cono} cm</text>
                <text x="94" y="55" font-family="sans-serif" font-size="10" fill="#dc2626">${h_cono} cm</text>
                <text x="120" y="60" font-family="sans-serif" font-size="10" fill="#d97706">s</text>
            </svg>
        </div>

        <ol class="FT_ol_a">
            <li>
                Determine la generatriz o altura inclinada ($s$) del cono. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Calcule el área de la superficie lateral curva exterior del embudo. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>
    `;

    // ==========================================
    // EJERCICIO 2 (CUARTILLA 2): ESFERAS, SEMIESFERAS Y SÓLIDOS COMPUESTOS
    // ==========================================
    // Semiesfera sólida de radio r_semi
    const r_semi = Math.floor(Math.random() * 3) + 5; // 5, 6, 7 cm
    const areaCurvaSemi = 2 * Math.PI * r_semi * r_semi;
    const areaBaseSemi = Math.PI * r_semi * r_semi;
    const areaTotalSemi = 3 * Math.PI * r_semi * r_semi;

    // Sólido compuesto: Boya náutica o cápsula (cilindro central con domo semiesférico en la parte superior)
    const r_boya = Math.floor(Math.random() * 2) + 2; // 2 o 3 m
    const h_cil_boya = Math.floor(Math.random() * 3) + 4; // 4, 5, 6 m
    const areaBaseInferior = Math.PI * r_boya * r_boya;
    const areaLateralCilBoya = 2 * Math.PI * r_boya * h_cil_boya;
    const areaDomoSemi = 2 * Math.PI * r_boya * r_boya;
    const areaTotalBoya = areaBaseInferior + areaLateralCilBoya + areaDomoSemi;

    html += `
    <div class="seccion-title">II. Esferas, Semiesferas y Sólidos Compuestos de Revolución</div>
    <div class="exercise-step">
        <p><strong>3.</strong> Un objeto decorativo sólido de madera maciza tiene la forma de una <strong>semiesfera</strong> de radio $r = ${r_semi}\\text{ cm}$.</p>

        <div style="display:flex; justify-content:center; margin: 4px 0;">
            <svg width="180" height="120" viewBox="0 0 180 95" style="background:#fff;">
                <path d="M 30 45 A 60 60 0 0 0 150 45 Z" fill="#fed7aa" stroke="#c2410c" stroke-width="1.8"/>
                <ellipse cx="90" cy="45" rx="60" ry="14" fill="#ffedd5" stroke="#c2410c" stroke-width="1.8"/>
                <line x1="90" y1="45" x2="150" y2="45" stroke="#2563eb" stroke-width="1.5"/>
                <text x="115" y="40" font-family="sans-serif" font-size="10" fill="#2563eb">${r_semi} cm</text>
            </svg>
        </div>

        <ol class="FT_ol_a">
            <li>
                Explique por qué el área superficial total de una semiesfera <em>sólida</em> se calcula mediante la fórmula $A = 3\\pi r^2$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Halle el área superficial total del objeto en términos de $\\pi$ y aproxime su resultado a una cifra decimal. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>

        <p style="margin-top: 14px;"><strong>4.</strong> Una boya marina de señalización está formada por un cilindro recto cerrado en su base inferior por una tapa circular plana de radio $r = ${r_boya}\\text{ m}$, y coronado en su parte superior por una cúpula semiesférica del mismo radio. La altura del cuerpo cilíndrico es $h = ${h_cil_boya}\\text{ m}$.</p>
        <ol class="FT_ol_a">
            <li>
                Escriba una expresión analítica para el área superficial exterior total de la boya y demuestre que el área a recubrir con pintura impermeable es aproximadamente $${areaTotalBoya.toFixed(1)}\\text{ m}^2$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 3.1.26 (Área Superficial de Cilindros, Conos y Esferas):</b><br><br>

        <b>1. Cilindro Recto Cerrado:</b><br>
        * a) $A = 2\\pi r h + 2\\pi r^2 = 2\\pi(${r_cil})(${h_cil}) + 2\\pi(${r_cil}^2) = ${2*r_cil*h_cil}\\pi + ${2*r_cil*r_cil}\\pi = $ <b>${2*r_cil*h_cil + 2*r_cil*r_cil}\\pi\\text{ cm}^2$</b>.<br>
        * b) $A \\approx $ <b>${areaTotalCil.toFixed(1)}\\text{ cm}^2$</b> (o <b>${parseFloat(areaTotalCil.toPrecision(3))}\\text{ cm}^2$</b> a 3 c.s.).<br><br>

        <b>2. Embudo Cónico Abierto:</b><br>
        * a) Generatriz: $s = \\sqrt{r^2 + h^2} = \\sqrt{${r_cono}^2 + ${h_cono}^2} = \\sqrt{${r_cono*r_cono + h_cono*h_cono}} \\approx $ <b>${s_cono.toFixed(2)}\\text{ cm}</b>.<br>
        * b) Superficie lateral: $A_{\\text{lat}} = \\pi r s = \\pi(${r_cono})(${s_cono.toFixed(2)}) \\approx $ <b>${areaLatCono.toFixed(1)}\\text{ cm}^2$</b>.<br><br>

        <b>3. Semiesfera Sólida:</b><br>
        * a) La semiesfera posee una superficie curva ($2\\pi r^2$, mitad de la esfera) más una base plana circular ($\\pi r^2$). La suma es $2\\pi r^2 + \\pi r^2 = 3\\pi r^2$.<br>
        * b) $A = 3\\pi(${r_semi}^2) = 3\\pi(${r_semi*r_semi}) = $ <b>${3*r_semi*r_semi}\\pi\\text{ cm}^2$</b> $\\approx $ <b>${areaTotalSemi.toFixed(1)}\\text{ cm}^2$</b>.<br><br>

        <b>4. Boya Náutica Compuesta:</b><br>
        * a) Partes exteriores de la superficie:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;1. Base inferior circular plana: $A_1 = \\pi r^2 = \\pi(${r_boya}^2) = ${r_boya*r_boya}\\pi$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;2. Pared lateral cilíndrica: $A_2 = 2\\pi r h = 2\\pi(${r_boya})(${h_cil_boya}) = ${2*r_boya*h_cil_boya}\\pi$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;3. Cúpula semiesférica superior: $A_3 = 2\\pi r^2 = 2\\pi(${r_boya}^2) = ${2*r_boya*r_boya}\\pi$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;$A_{\\text{total}} = \\pi r^2 + 2\\pi r h + 2\\pi r^2 = 3\\pi r^2 + 2\\pi r h = ${3*r_boya*r_boya + 2*r_boya*h_cil_boya}\\pi \\approx $ <b>${areaTotalBoya.toFixed(1)}\\text{ m}^2$</b>.
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
