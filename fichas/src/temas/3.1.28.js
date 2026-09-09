import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Volumen de Pirámides, Conos y Esferas";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("3.1.28", "3. Geometría y trigonometría", "Ficha: Volumen de Pirámides, Conos y Esferas");

    // ==========================================
    // EJERCICIO 1 (CUARTILLA 1): CONOS Y PIRÁMIDES REGULARES
    // ==========================================
    // Cono circular recto: radio r_cono, altura h_cono
    const r_cono = Math.floor(Math.random() * 3) + 4; // 4, 5, 6 cm
    const h_cono = Math.floor(Math.random() * 4) + 9; // 9, 10, 11, 12 cm
    const vol_cono = (1 / 3) * Math.PI * r_cono * r_cono * h_cono;

    // Pirámide regular de base cuadrada: lado base b_pir, apotema o altura inclinada s_pir
    const b_pir = (Math.floor(Math.random() * 3) + 3) * 2; // 6, 8, 10 cm
    const semi_b = b_pir / 2;
    const h_pir = Math.floor(Math.random() * 3) + 8; // 8, 9, 10 cm
    const s_pir = Math.sqrt(h_pir * h_pir + semi_b * semi_b);
    const vol_pir = (1 / 3) * b_pir * b_pir * h_pir;

    html += `
    <div class="seccion-title">I. Sólidos Ahusados (Tapered Solids): $V = \\frac{1}{3} A_{\\text{base}} \\times h$</div>
    <div class="exercise-step">
        <p><strong>1.</strong> Un cono circular recto tiene un radio de base $r = ${r_cono}\\text{ cm}$ y una altura vertical perpendicular $h = ${h_cono}\\text{ cm}$.</p>

        <div style="display:flex; justify-content:center; margin: 4px 0;">
            <svg width="180" height="95" viewBox="0 0 180 95" style="background:#fff;">
                <ellipse cx="90" cy="75" rx="45" ry="12" fill="#f1f5f9" stroke="#334155" stroke-width="1.8"/>
                <line x1="45" y1="75" x2="90" y2="15" stroke="#334155" stroke-width="1.8"/>
                <line x1="135" y1="75" x2="90" y2="15" stroke="#334155" stroke-width="1.8"/>
                <line x1="90" y1="15" x2="90" y2="75" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="3"/>
                <line x1="90" y1="75" x2="135" y2="75" stroke="#2563eb" stroke-width="1.5"/>
                <text x="110" y="70" font-family="sans-serif" font-size="10" fill="#2563eb">r=${r_cono} cm</text>
                <text x="85" y="45" font-family="sans-serif" font-size="10" fill="#dc2626" text-anchor="end">h=${h_cono} cm</text>
            </svg>
        </div>

        <ol class="FT_ol_a">
            <li>
                Escriba la fórmula del volumen de un cono y calcule su volumen exacto en términos de $\\pi$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Aproxime el volumen numérico a tres cifras significativas. <span class="mark">1</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>

        <p style="margin-top: 14px;"><strong>2.</strong> Una pirámide de base cuadrada tiene lados de base $b = ${b_pir}\\text{ cm}$ y una altura vertical central $h = ${h_pir}\\text{ cm}$.</p>

        <div style="display:flex; justify-content:center; margin: 4px 0;">
            <svg width="190" height="95" viewBox="0 0 200 100" style="background:#fff;">
                <polygon points="30,80 120,80 165,60 75,60" fill="#f8fafc" stroke="#475569" stroke-width="1.5"/>
                <line x1="95" y1="15" x2="95" y2="70" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="3"/>
                <line x1="95" y1="15" x2="30" y2="80" stroke="#1e293b" stroke-width="1.6"/>
                <line x1="95" y1="15" x2="120" y2="80" stroke="#1e293b" stroke-width="1.6"/>
                <line x1="95" y1="15" x2="165" y2="60" stroke="#1e293b" stroke-width="1.6"/>
                <line x1="95" y1="15" x2="75" y2="60" stroke="#94a3b8" stroke-dasharray="3"/>
                <text x="75" y="93" font-family="sans-serif" font-size="10" text-anchor="middle">${b_pir} cm</text>
                <text x="102" y="45" font-family="sans-serif" font-size="10" fill="#dc2626">h=${h_pir} cm</text>
            </svg>
        </div>

        <ol class="FT_ol_a">
            <li>
                Calcule el volumen de la pirámide. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Halle la longitud de la altura inclinada ($s$) de cada cara triangular lateral. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>
    `;

    // ==========================================
    // EJERCICIO 2 (CUARTILLA 2): ESFERAS Y SÓLIDOS COMPUESTOS EN CONTEXTO
    // ==========================================
    // Esfera / Helado o bola de demolición
    const r_esfera = Math.floor(Math.random() * 3) + 3; // 3, 4, 5 cm
    const vol_esfera = (4 / 3) * Math.PI * Math.pow(r_esfera, 3);

    // Sólido compuesto: Barquillo de helado (cono coronado por una semiesfera superior)
    const r_helado = Math.floor(Math.random() * 2) + 3; // 3 o 4 cm
    const h_barquillo = Math.floor(Math.random() * 3) + 8; // 8, 9, 10 cm
    const vol_cono_helado = (1 / 3) * Math.PI * r_helado * r_helado * h_barquillo;
    const vol_semi_helado = (2 / 3) * Math.PI * Math.pow(r_helado, 3);
    const vol_total_helado = vol_cono_helado + vol_semi_helado;

    // Problema inverso / fusión de esferas
    const n_canicas = 8;
    const r_peq = 1.5;
    const vol_total_canicas = n_canicas * (4 / 3) * Math.PI * Math.pow(r_peq, 3);
    const r_gran_esfera = Math.cbrt((3 * vol_total_canicas) / (4 * Math.PI));

    html += `
    <div class="seccion-title">II. Volumen de Esferas y Modelización de Cuerpos Compuestos</div>
    <div class="exercise-step">
        <p><strong>3.</strong> Un postre artesanal está formado por un barquillo cónico de galleta de radio de apertura $r = ${r_helado}\\text{ cm}$ y profundidad $h = ${h_barquillo}\\text{ cm}$, completamente relleno de helado y coronado en la parte superior por una porción de helado en forma de <strong>semiesfera</strong> perfecta del mismo radio $r$.</p>

        <div style="display:flex; justify-content:center; margin: 4px 0;">
            <svg width="180" height="110" viewBox="0 0 180 110" style="background:#fff;">
                <!-- Semisphere on top -->
                <path d="M 45 40 A 45 45 0 0 1 135 40 Z" fill="#fed7aa" stroke="#ea580c" stroke-width="1.8"/>
                <ellipse cx="90" cy="40" rx="45" ry="10" fill="#ffedd5" stroke="#ea580c" stroke-width="1.5"/>
                <!-- Cone bottom -->
                <line x1="45" y1="40" x2="90" y2="100" stroke="#ca8a04" stroke-width="1.8"/>
                <line x1="135" y1="40" x2="90" y2="100" stroke="#ca8a04" stroke-width="1.8"/>
                <line x1="90" y1="40" x2="90" y2="100" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="3"/>
                <line x1="90" y1="40" x2="135" y2="40" stroke="#2563eb" stroke-width="1.5"/>
                <!-- Labels -->
                <text x="115" y="35" font-family="sans-serif" font-size="10" fill="#2563eb">r=${r_helado} cm</text>
                <text x="85" y="70" font-family="sans-serif" font-size="10" fill="#dc2626" text-anchor="end">h=${h_barquillo}</text>
            </svg>
        </div>

        <ol class="FT_ol_a">
            <li>
                Calcule el volumen de helado contenido en el interior del cono. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Calcule el volumen de la porción semiesférica superior. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Halle el volumen total de helado en el postre. Dé su respuesta redondeada a tres cifras significativas. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>

        <p style="margin-top: 14px;"><strong>4.</strong> Se funden $${n_canicas}$ esferas metálicas idénticas, cada una de radio $r = ${r_peq}\\text{ cm}$, para moldear una única esfera grande sin desperdicio de material.</p>
        <ol class="FT_ol_a">
            <li>
                Demuestre que el radio de la nueva esfera fundida es exactamente $R = ${r_gran_esfera.toFixed(1)}\\text{ cm}$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 3.1.28 (Volumen de Pirámides, Conos y Esferas):</b><br><br>

        <b>1. Cono Circular Recto:</b><br>
        * a) $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi (${r_cono}^2)(${h_cono}) = \\frac{${r_cono*r_cono*h_cono}}{3}\\pi = $ <b>${parseFloat(((r_cono*r_cono*h_cono)/3).toFixed(2))}\\pi\\text{ cm}^3$</b>.<br>
        * b) $V \\approx $ <b>${vol_cono.toFixed(1)}\\text{ cm}^3$</b> (o <b>${parseFloat(vol_cono.toPrecision(3))}\\text{ cm}^3$</b> a 3 c.s.).<br><br>

        <b>2. Pirámide de Base Cuadrada:</b><br>
        * a) $V = \\frac{1}{3} A_{\\text{base}} h = \\frac{1}{3} (${b_pir}^2) (${h_pir}) = \\frac{${b_pir*b_pir*h_pir}}{3} = $ <b>${vol_pir.toFixed(1)}\\text{ cm}^3$</b>.<br>
        * b) Altura inclinada: $s = \\sqrt{h^2 + (b/2)^2} = \\sqrt{${h_pir}^2 + ${semi_b}^2} = \\sqrt{${h_pir*h_pir + semi_b*semi_b}} \\approx $ <b>${s_pir.toFixed(2)}\\text{ cm}</b>.<br><br>

        <b>3. Postre Compuesto (Cono + Semiesfera):</b><br>
        * a) Volumen del cono: $V_{\\text{cono}} = \\frac{1}{3}\\pi (${r_helado}^2)(${h_barquillo}) \\approx $ <b>${vol_cono_helado.toFixed(1)}\\text{ cm}^3$</b>.<br>
        * b) Volumen semiesfera: $V_{\\text{semi}} = \\frac{2}{3}\\pi (${r_helado}^3) \\approx $ <b>${vol_semi_helado.toFixed(1)}\\text{ cm}^3$</b>.<br>
        * c) Volumen total: $V_{\\text{total}} = V_{\\text{cono}} + V_{\\text{semi}} = ${vol_cono_helado.toFixed(2)} + ${vol_semi_helado.toFixed(2)} \\approx $ <b>${vol_total_helado.toFixed(1)}\\text{ cm}^3$</b> (o <b>${parseFloat(vol_total_helado.toPrecision(3))}\\text{ cm}^3$</b> a 3 c.s.).<br><br>

        <b>4. Fusión de Esferas:</b><br>
        * a) Volumen de una esfera pequeña: $V_1 = \\frac{4}{3}\\pi (${r_peq})^3 = \\frac{4}{3}\\pi (3.375) = 4.5\\pi\\text{ cm}^3$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Volumen total de las ${n_canicas}$ esferas: $V_{\\text{total}} = ${n_canicas} \\times 4.5\\pi = 36\\pi\\text{ cm}^3$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Radio de la nueva esfera: $\\frac{4}{3}\\pi R^3 = 36\\pi \\implies R^3 = 36 \\times \\frac{3}{4} = 27 \\implies R = \\sqrt[3]{27} = $ <b>${r_gran_esfera.toFixed(1)}\\text{ cm}</b>.
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
