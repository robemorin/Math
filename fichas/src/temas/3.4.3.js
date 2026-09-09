import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Aplicaciones del Teorema del Seno y Coseno y Trigonometría Algebraica";
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("3.4.3", "3. Geometría y trigonometría", "Ficha: Aplicaciones del Teorema del Seno y Coseno y Trigonometría Algebraica");
    
    const respuestasVal = [];

    // ==========================================
    // PARTE 1: PROBLEMAS COMBINADOS (SENO Y COSENO)
    // ==========================================
    html += `<div class="seccion-title">I. Problemas Combinados (Seno y Coseno)</div>`;
    html += `<div class="contexto-especial" style="margin-bottom: 20px;"><b>Instrucción:</b> Resuelva cada una de las situaciones reales planteadas utilizando de manera secuencial los teoremas del seno y del coseno.</div>`;

    const contextos = [
        {
            intro: "Dos estaciones de monitoreo forestal, $A$ y $B$, detectan un foco de incendio en el punto $C$. Un equipo de bomberos se ubica en el campamento $D$ para preparar el combate al fuego.",
            pregunta: "Halle la distancia desde el campamento de bomberos ($D$) hasta el foco de incendio ($C$)."
        },
        {
            intro: "Un topógrafo está delimitando dos parcelas triangulares adyacentes, $ABC$ y $ACD$, separadas por un sendero recto $AC$. Se quiere colocar una valla protectora en el lindero $CD$.",
            pregunta: "Calcule la longitud necesaria de valla para cubrir el lindero $CD$."
        },
        {
            intro: "Dos barcos de rescate, $A$ y $B$, reciben una señal de auxilio de un velero en el punto $C$. Un helicóptero de la guardia costera se encuentra en la base $D$ listo para despegar hacia la emergencia.",
            pregunta: "Determine la distancia de vuelo que debe recorrer el helicóptero desde la base $D$ hasta el velero $C$."
        }
    ];

    // Para evitar que salgan siempre los mismos 2, barajamos
    const orderCtx = [0, 1, 2].sort(() => Math.random() - 0.5);

    for (let k = 0; k < 2; k++) {
        const ctx = contextos[orderCtx[k]];
        
        const theta1_opts = [30, 45];
        const theta1 = theta1_opts[Math.floor(Math.random() * theta1_opts.length)];
        const theta2 = Math.floor(Math.random() * 20) + 105; 
        const s1 = (Math.floor(Math.random() * 6) + 4) * 5; 

        const theta1_rad = theta1 * Math.PI / 180;
        const theta2_rad = theta2 * Math.PI / 180;

        const d = s1 * Math.sin(theta2_rad) / Math.sin(theta1_rad);

        const s2 = s1 + (Math.floor(Math.random() * 5) - 2) * 5; 
        const theta3 = Math.floor(Math.random() * 30) + 50; 
        const theta3_rad = theta3 * Math.PI / 180;

        const y2 = d*d + s2*s2 - 2*d*s2*Math.cos(theta3_rad);
        const y = Math.sqrt(y2);

        const svg = `
        <svg width="260" height="170" style="display: block; margin: 10px auto; overflow: visible;">
            <polygon points="30,80 110,150 220,80 130,20" fill="none" stroke="black" stroke-width="2" />
            <line x1="30" y1="80" x2="220" y2="80" stroke="black" stroke-dasharray="4,4" stroke-width="1.5" />
            
            <text x="15" y="85" font-family="Cambria Math, serif" font-size="14" font-weight="bold">A</text>
            <text x="110" y="168" font-family="Cambria Math, serif" font-size="14" font-weight="bold">B</text>
            <text x="230" y="85" font-family="Cambria Math, serif" font-size="14" font-weight="bold">C</text>
            <text x="130" y="15" font-family="Cambria Math, serif" font-size="14" font-weight="bold">D</text>
            
            <text x="55" y="100" font-family="Arial" font-size="11">${theta1}°</text>
            <text x="105" y="138" font-family="Arial" font-size="11">${theta2}°</text>
            <text x="55" y="70" font-family="Arial" font-size="11">${theta3}°</text>
            
            <text x="175" y="130" font-family="Arial" font-size="12" text-anchor="middle" font-weight="bold">${s1} m</text>
            <text x="75" y="45" font-family="Arial" font-size="12" text-anchor="middle" font-weight="bold">${s2} m</text>
            <text x="185" y="45" font-family="Arial" font-size="12" text-anchor="middle" font-style="italic">y</text>
        </svg>
        `;

        html += `
        <div class="exercise-step">
            <p><strong>${k + 1}.</strong> ${ctx.intro} De acuerdo con las mediciones mostradas en la siguiente figura, ${ctx.pregunta.toLowerCase()}</p>
            <div style="display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center; gap: 10px;">
                <div>${svg}</div>
                <div style="flex: 1; min-width: 280px; text-align: center;">
                    <tlacuache-renglon n="5" color="#f9f9f9"></tlacuache-renglon>
                </div>
            </div>
        </div>`;

        respuestasVal.push(`
            <b>${k + 1}.</b><br>
            1) Ley del Seno en $\\triangle ABC$:<br>
            $\\frac{AC}{\\sin(${theta2}^\\circ)} = \\frac{${s1}}{\\sin(${theta1}^\\circ)} \\implies AC \\approx \\mathbf{${d.toFixed(2)}\\text{ m}}$<br>
            2) Ley del Coseno en $\\triangle ACD$ para hallar $y$ ($CD$):<br>
            $y^2 = (${d.toFixed(2)})^2 + ${s2}^2 - 2(${d.toFixed(2)})(${s2})\\cos(${theta3}^\\circ) \\approx ${y2.toFixed(2)}$<br>
            $y \\approx \\mathbf{${y.toFixed(2)}\\text{ m}}$
        `);
    }

    html += ``;

    // ==========================================
    // PARTE 2: PROBLEMAS ALGEBRAICOS
    // ==========================================
    html += `<div class="seccion-title">II. Trigonometría Algebraica</div>`;
    html += `<div class="contexto-especial" style="margin-bottom: 20px;"><b>Instrucción:</b> Resuelva los siguientes ejercicios utilizando valores exactos (fracciones y radicales simplificados, sin decimales).</div>`;

    const configAlgebraicas = [
        { ang1: 45, ang2: 30, raiz: 2, c: 2, d: 11, form: "a + b\\sqrt{2}", ans_a: 11, ans_b: 5.5 },
        { ang1: 45, ang2: 30, raiz: 2, c: 3, d: 7, form: "a + b\\sqrt{2}", ans_a: 3, ans_b: 1 },
        { ang1: 60, ang2: 30, raiz: 3, c: 2, d: 4, form: "a + b\\sqrt{3}", ans_a: 8, ans_b: 4 }
    ];

    const orderAlg = [0, 1, 2].sort(() => Math.random() - 0.5);

    for (let k = 0; k < 2; k++) {
        const cfg = configAlgebraicas[orderAlg[k]];

        const svg = `
        <svg width="220" height="130" style="display: block; margin: 10px auto; overflow: visible;">
            <polygon points="40,30 75,110 190,80" fill="none" stroke="black" stroke-width="2" />
            <text x="52" y="47" font-family="Arial" font-size="11">${cfg.ang1}°</text>
            <text x="160" y="80" font-family="Arial" font-size="11">${cfg.ang2}°</text>
            <text x="45" y="75" font-family="Arial" font-size="12" text-anchor="middle" font-weight="bold">x</text>
            <text x="135" y="110" font-family="Arial" font-size="12" text-anchor="middle" font-weight="bold">${cfg.c}x - ${cfg.d}</text>
        </svg>
        `;

        html += `
        <div class="exercise-step">
            <p><strong>${k + 3}.</strong> A partir del triángulo que se muestra a continuación, halle el valor exacto de $x$, expresando su respuesta en la forma $${cfg.form}$, donde $a, b \\in \\mathbb{Q}$.</p>
            <div style="display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center; gap: 10px;">
                <div>${svg}</div>
                <div style="flex: 1; min-width: 280px; text-align: center;">
                    <tlacuache-renglon n="5" color="#f9f9f9"></tlacuache-renglon>
                </div>
            </div>
        </div>${k==1?'<div class="page-break"></div>':''}`;

        let paso_resolucion = "";
        if (cfg.raiz === 2) {
            paso_resolucion = `
            $\\frac{${cfg.c}x - ${cfg.d}}{\\sin(45^\\circ)} = \\frac{x}{\\sin(30^\\circ)} \\implies \\frac{${cfg.c}x - ${cfg.d}}{\\frac{\\sqrt{2}}{2}} = \\frac{x}{\\frac{1}{2}}$<br>
            $2(${cfg.c}x - ${cfg.d}) = 2x\\sqrt{2} \\implies ${cfg.c}x - ${cfg.d} = x\\sqrt{2}$<br>
            $${cfg.c}x - x\\sqrt{2} = ${cfg.d} \\implies x(${cfg.c} - \\sqrt{2}) = ${cfg.d}$<br>
            $x = \\frac{${cfg.d}}{${cfg.c} - \\sqrt{2}} = \\frac{${cfg.d}(${cfg.c} + \\sqrt{2})}{${cfg.c}^2 - 2}$<br>
            `;
        } else {
            paso_resolucion = `
            $\\frac{${cfg.c}x - ${cfg.d}}{\\sin(60^\\circ)} = \\frac{x}{\\sin(30^\\circ)} \\implies \\frac{${cfg.c}x - ${cfg.d}}{\\frac{\\sqrt{3}}{2}} = \\frac{x}{\\frac{1}{2}}$<br>
            $2(${cfg.c}x - ${cfg.d}) = 2x\\sqrt{3} \\implies ${cfg.c}x - ${cfg.d} = x\\sqrt{3}$<br>
            $${cfg.c}x - x\\sqrt{3} = ${cfg.d} \\implies x(${cfg.c} - \\sqrt{3}) = ${cfg.d}$<br>
            $x = \\frac{${cfg.d}}{${cfg.c} - \\sqrt{3}} = \\frac{${cfg.d}(${cfg.c} + \\sqrt{3})}{${cfg.c}^2 - 3}$<br>
            `;
        }

        respuestasVal.push(`
            <b>${k + 3}.</b><br>
            ${paso_resolucion}
            $\\mathbf{x = ${cfg.ans_a === Math.floor(cfg.ans_a) ? cfg.ans_a : cfg.ans_a.toFixed(1)} + ${cfg.ans_b === Math.floor(cfg.ans_b) ? cfg.ans_b : cfg.ans_b.toFixed(1)}\\sqrt{${cfg.raiz}}}$
        `);
    }

    solucion += `<div style="font-family: sans-serif; font-size: 0.85rem;">`;
    solucion += `<b>Solucionario 3.4.3:</b><br><br>`;
    respuestasVal.forEach(resp => {
        solucion += `<div style="margin-bottom: 15px;">${resp}</div>`;
    });
    solucion += `</div>`;

    return [html, solucion];
}
