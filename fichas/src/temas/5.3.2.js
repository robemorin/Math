// Generado a partir de: mate2/src/temas/12.3.1.js, mate2/src/temas/12.3.2.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Bosquejo de Curvas y Derivadas (Propiedades de f y f')";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

function roundTo3SF(num) {
    if (num === 0) return '0';
    let d = Math.ceil(Math.log10(Math.abs(num)));
    let power = 3 - d;
    let magnitude = Math.pow(10, power);
    let shifted = Math.round(num * magnitude);
    let res = shifted / magnitude;
    return res.toPrecision(3);
}

// Generador de plano cartesiano SVG
function dibujarPlano({
    w = 210,
    h = 120,
    xMin = -4,
    xMax = 4,
    yMin = -4,
    yMax = 4,
    stepX = 1,
    stepY = 1,
    labelX = 'x',
    labelY = 'y',
    curvas = [],
    puntos = [],
    mostrarGrid = true,
    fontSizeTicks = 7.5
}) {
    const toSvgX = (x) => ((x - xMin) / (xMax - xMin)) * w;
    const toSvgY = (y) => h - ((y - yMin) / (yMax - yMin)) * h;

    const origX = Math.max(6, Math.min(w - 6, toSvgX(0)));
    const origY = Math.max(6, Math.min(h - 6, toSvgY(0)));

    let gridLines = '';
    let marks = '';
    let labels = '';

    if (mostrarGrid) {
        for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x += stepX) {
            if (x === 0) continue;
            const sx = toSvgX(x).toFixed(1);
            gridLines += `<line x1="${sx}" y1="0" x2="${sx}" y2="${h}" stroke="#edf2f7" stroke-width="1" />`;
            marks += `<line x1="${sx}" y1="${origY - 2.5}" x2="${sx}" y2="${origY + 2.5}" stroke="#94a3b8" stroke-width="1" />`;
            labels += `<text x="${sx}" y="${origY + 9}" font-size="${fontSizeTicks}" fill="#64748b" text-anchor="middle" font-family="sans-serif">${x}</text>`;
        }

        for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y += stepY) {
            if (y === 0) continue;
            const sy = toSvgY(y).toFixed(1);
            gridLines += `<line x1="0" y1="${sy}" x2="${w}" y2="${sy}" stroke="#edf2f7" stroke-width="1" />`;
            marks += `<line x1="${origX - 2.5}" y1="${sy}" x2="${origX + 2.5}" y2="${sy}" stroke="#94a3b8" stroke-width="1" />`;
            labels += `<text x="${origX - 3.5}" y="${Number(sy) + 2.5}" font-size="${fontSizeTicks - 0.5}" fill="#64748b" text-anchor="end" font-family="sans-serif">${y}</text>`;
        }
    }

    const ejes = `
        <line x1="0" y1="${origY}" x2="${w}" y2="${origY}" stroke="#334155" stroke-width="1.3" />
        <line x1="${origX}" y1="0" x2="${origX}" y2="${h}" stroke="#334155" stroke-width="1.3" />
        <polygon points="${w},${origY} ${w-4},${origY-2.5} ${w-4},${origY+2.5}" fill="#334155" />
        <polygon points="${origX},0 ${origX-2.5},4 ${origX+2.5},4" fill="#334155" />
        <text x="${w - 6}" y="${origY - 4}" font-size="8.5" font-style="italic" fill="#334155" font-family="serif">${labelX}</text>
        <text x="${origX + 4}" y="8.5" font-size="8.5" font-style="italic" fill="#334155" font-family="serif">${labelY}</text>
    `;

    let pathsHtml = '';
    for (const c of curvas) {
        const pasos = 90;
        let d = '';
        let start = true;
        for (let i = 0; i <= pasos; i++) {
            const x = xMin + (i / pasos) * (xMax - xMin);
            const y = c.fn(x);
            if (isNaN(y) || !isFinite(y)) {
                start = true;
                continue;
            }
            const cy = Math.max(yMin - 3, Math.min(yMax + 3, y));
            const sx = toSvgX(x).toFixed(1);
            const sy = toSvgY(cy).toFixed(1);
            if (start) {
                d += `M ${sx} ${sy} `;
                start = false;
            } else {
                d += `L ${sx} ${sy} `;
            }
        }
        const dashAttr = c.dash ? `stroke-dasharray="${c.dash}"` : '';
        pathsHtml += `<path d="${d}" fill="none" stroke="${c.color || '#2980b9'}" stroke-width="${c.width || 2}" ${dashAttr} stroke-linecap="round" stroke-linejoin="round" />`;
    }

    let puntosHtml = '';
    for (const p of puntos) {
        const px = toSvgX(p.x).toFixed(1);
        const py = toSvgY(p.y).toFixed(1);
        if (p.dashed) {
            puntosHtml += `
                <line x1="${px}" y1="${py}" x2="${px}" y2="${origY}" stroke="#94a3b8" stroke-width="0.9" stroke-dasharray="2,2" />
                <line x1="${px}" y1="${py}" x2="${origX}" y2="${py}" stroke="#94a3b8" stroke-width="0.9" stroke-dasharray="2,2" />
            `;
        }
        puntosHtml += `<circle cx="${px}" cy="${py}" r="${p.r || 3}" fill="${p.color || '#e74c3c'}" stroke="#ffffff" stroke-width="1.2" />`;
        if (p.label) {
            puntosHtml += `<text x="${Number(px) + (p.dx || 4)}" y="${Number(py) + (p.dy || -4)}" font-size="${fontSizeTicks + 0.5}" font-weight="bold" fill="${p.color || '#e74c3c'}" font-family="sans-serif">${p.label}</text>`;
        }
    }

    return `
    <svg width="${w}" height="${h}" style="display: block; margin: 3px auto; background: #fafbfc; border: 1px solid #cbd5e1; border-radius: 6px;">
        ${gridLines}
        ${ejes}
        ${marks}
        ${labels}
        ${pathsHtml}
        ${puntosHtml}
    </svg>`;
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("5.3.2", "5. Cálculo", "Ficha: Bosquejo de Curvas y Derivadas");
    html += `
    <div class="contexto-especial" style="margin-bottom: 12px; font-size: 0.86rem; line-height: 1.4;">
        <b>Instrucción general:</b> Esta ficha consta de dos bloques de trabajo de aproximadamente 1 hora:
        <br><b>Bloque 1 (Página 1):</b> A partir de las propiedades analíticas y signos de las derivadas ($f'$ y $f''$), <b>bosqueje la curva $y = f(x)$</b> en el plano cartesiano provisto.
        <br><b>Bloque 2 (Página 2):</b> A partir de la gráfica de una función $y = f(x)$, <b>bosqueje su función derivada $y = f'(x)$</b>, marcando ceros, signos y extremos.
    </div>
    `;

    // 10 ejercicios: 4 en la página 1 (Bloque 1) y 6 en la página 2 (Bloque 2)
    const ejercicios = [
        // Página 1 (4 ejercicios más amplios - Bloque 1: Condiciones -> Bosquejar f(x))
        { bloque: 1, orden: 3, tipoExtremos: 'max_min' },   // Cúbica clásica: Máx en a, Mín en b
        { bloque: 1, orden: 3, tipoExtremos: 'min_max' },   // Cúbica invertida: Mín en a, Máx en b
        { bloque: 1, orden: 4, tipoExtremos: 'w_shape' },   // Cuártica: dos mínimos y un máximo
        { bloque: 1, orden: 3, tipoExtremos: 'inflexion' }, // Con punto de inflexión horizontal f'(c)=0

        // Página 2 (6 ejercicios - Bloque 2: Gráfica de f(x) -> Bosquejar f'(x))
        { bloque: 2, tipo: 'cubica_pos' },   // Cúbica creciente: f'(x) es parábola cóncava arriba
        { bloque: 2, tipo: 'cubica_neg' },   // Cúbica decreciente: f'(x) es parábola cóncava abajo
        { bloque: 2, tipo: 'cuadratica_min' }, // Parábola mín: f'(x) es recta pendiente positiva
        { bloque: 2, tipo: 'cuadratica_max' }, // Parábola máx: f'(x) es recta pendiente negativa
        { bloque: 2, tipo: 'cuartica_w' },   // Cuártica W: f'(x) es cúbica con 3 raíces
        { bloque: 2, tipo: 'silla_cubica' }  // f(x) = (x-c)^3: f'(x) es parábola tangente al eje x
    ];

    const cardsHtml = [];
    const solucionesList = [];

    for (let i = 0; i < ejercicios.length; i++) {
        const ej = ejercicios[i];
        let card = '';
        let solItem = '';

        if (ej.bloque === 1) {
            // =================================================================
            // BLOQUE 1 (PÁGINA 1): DADAS LAS CONDICIONES -> BOSQUEJAR f(x)
            // =================================================================
            let condicionesHtml = '';
            let fSol;
            let solTexto = '';

            const paresA = [[-2, 2], [-3, 1], [-1, 3], [-2, 1]][Math.floor(Math.random() * 4)];
            const [a, b] = paresA;
            const c = (a + b) / 2;
            const cStr = Number.isInteger(c) ? `${c}` : `${a+b}/2`;

            if (ej.tipoExtremos === 'max_min') {
                condicionesHtml = `
                    • $f'(${a}) = 0$ y $f'(${b}) = 0$.<br>
                    • $f'(x) > 0$ en $(-\\infty, ${a}) \\cup (${b}, \\infty)$ (creciente).<br>
                    • $f'(x) < 0$ en $(${a}, ${b})$ (decreciente).<br>
                    • $f''(x) < 0$ en $(-\\infty, ${cStr})$ (cóncava abajo).<br>
                    • $f''(x) > 0$ en $(${cStr}, \\infty)$ (cóncava arriba).
                `;
                const k = 0.35;
                fSol = (x) => k * ((Math.pow(x, 3)/3) - (c * Math.pow(x, 2)) + (a * b * x)) - (k * ((Math.pow(c, 3)/3) - (c * Math.pow(c, 2)) + (a * b * c)));
                solTexto = `Curva cúbica que sube hasta un máximo local en $x = ${a}$, baja hasta un mínimo local en $x = ${b}$ y vuelve a subir. Punto de inflexión en $x = ${cStr}$ donde cambia de cóncava hacia abajo a cóncava hacia arriba.`;

            } else if (ej.tipoExtremos === 'min_max') {
                condicionesHtml = `
                    • $f'(${a}) = 0$ y $f'(${b}) = 0$.<br>
                    • $f'(x) < 0$ en $(-\\infty, ${a}) \\cup (${b}, \\infty)$ (decreciente).<br>
                    • $f'(x) > 0$ en $(${a}, ${b})$ (creciente).<br>
                    • $f''(x) > 0$ en $(-\\infty, ${cStr})$ (cóncava arriba).<br>
                    • $f''(x) < 0$ en $(${cStr}, \\infty)$ (cóncava abajo).
                `;
                const k = -0.35;
                fSol = (x) => k * ((Math.pow(x, 3)/3) - (c * Math.pow(x, 2)) + (a * b * x)) - (k * ((Math.pow(c, 3)/3) - (c * Math.pow(c, 2)) + (a * b * c)));
                solTexto = `Curva cúbica invertida que baja hasta un mínimo local en $x = ${a}$, sube hasta un máximo local en $x = ${b}$ y vuelve a bajar. Punto de inflexión en $x = ${cStr}$ con cambio de concavidad hacia abajo.`;

            } else if (ej.tipoExtremos === 'w_shape') {
                // Cuártica simétrica con mínimos en -2 y 2, máximo en 0
                condicionesHtml = `
                    • $f'(-2) = 0$, $f'(0) = 0$ y $f'(2) = 0$.<br>
                    • $f'(x) < 0$ en $(-\\infty, -2) \\cup (0, 2)$.<br>
                    • $f'(x) > 0$ en $(-2, 0) \\cup (2, \\infty)$.<br>
                    • $f''(x) < 0$ en $(-1.15, 1.15)$ y $f''(x) > 0$ fuera.
                `;
                fSol = (x) => 0.18 * (Math.pow(x, 4) - 8 * Math.pow(x, 2)) + 1.2;
                solTexto = `Curva en forma de 'W' con mínimos locales en $x = -2$ y $x = 2$, máximo local en $x = 0$, y concavidad hacia abajo en el intervalo central $(-1.15, 1.15)$.`;

            } else {
                // Punto de inflexión horizontal f'(c) = 0
                const cHoriz = [-1, 0, 1][Math.floor(Math.random() * 3)];
                condicionesHtml = `
                    • $f'(${cHoriz}) = 0$, pero $f'(x) > 0$ para todo $x \\neq ${cHoriz}$.<br>
                    • $f(x)$ es estrictamente creciente en todo $\\mathbb{R}$.<br>
                    • $f''(x) < 0$ en $(-\\infty, ${cHoriz})$ (cóncava abajo).<br>
                    • $f''(x) > 0$ en $(${cHoriz}, \\infty)$ (cóncava arriba).
                `;
                fSol = (x) => 0.25 * Math.pow(x - cHoriz, 3);
                solTexto = `Curva cúbica creciente continua con tangente horizontal (punto de inflexión de silla) en $x = ${cHoriz}$. No tiene máximos ni mínimos locales.`;
            }

            // Plano vacío con cuadrícula para que el alumno dibuje f(x)
            const svgVacio = dibujarPlano({
                w: 220,
                h: 125,
                xMin: -4,
                xMax: 4,
                yMin: -4,
                yMax: 4,
                stepX: 1,
                stepY: 2,
                mostrarGrid: true
            });

            card = `
            <div style="border: 1px solid #c5d6e2; background: #fff; padding: 7px 9px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); text-align: left;">
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #eef2f5; padding-bottom: 2px; margin-bottom: 3px;">
                    <span style="font-weight: bold; color: #1e3a8a; font-size: 0.88rem;">${i + 1}. Bosquejar $y = f(x)$ a partir de $f'$ y $f''$</span>
                    <span class="mark">3</span>
                </div>
                <div style="font-size: 0.73rem; color: #334155; line-height: 1.3; background: #f8fafc; border-left: 3px solid #2563eb; padding: 4px 6px; border-radius: 3px; margin-bottom: 3px;">
                    ${condicionesHtml}
                </div>
                <div style="font-size: 0.72rem; color: #64748b; margin-bottom: 2px;">
                    <b>Trace la curva $y = f(x)$</b> en el plano que cumpla todas las condiciones anteriores:
                </div>
                ${svgVacio}
                <div style="margin-top: 3px;">
                    <tlacuache-renglon n="1" color="#f9f9f9" alto="20"></tlacuache-renglon>
                </div>
            </div>
            `;
            solItem = `<b>${i + 1})</b> ${solTexto}`;

        } else {
            // =================================================================
            // BLOQUE 2 (PÁGINA 2): DADA LA GRÁFICA DE f(x) -> BOSQUEJAR f'(x)
            // =================================================================
            let fnF;
            let solTexto = '';
            let pMax = null, pMin = null;

            if (ej.tipo === 'cubica_pos') {
                const r1 = -2, r2 = 2;
                fnF = (x) => 0.3 * ((Math.pow(x, 3)/3) - 4 * x);
                pMax = { x: r1, y: fnF(r1), label: 'Máx', color: '#27ae60', dy: -5, dashed: true };
                pMin = { x: r2, y: fnF(r2), label: 'Mín', color: '#c0392b', dy: 9, dashed: true };
                solTexto = `$f'(x)$ es una parábola cóncava hacia arriba que corta al eje $x$ en $x = -2$ y $x = 2$, con vértice en $(0, -4)$ por debajo del eje horizontal ($f'(x) < 0$ en $(-2, 2)$).`;

            } else if (ej.tipo === 'cubica_neg') {
                const r1 = -2, r2 = 1;
                const c = (r1 + r2) / 2;
                fnF = (x) => -0.4 * ((Math.pow(x, 3)/3) - (c * Math.pow(x, 2)) + (r1 * r2 * x)) + 0.3;
                pMin = { x: r1, y: fnF(r1), label: 'Mín', color: '#c0392b', dy: 9, dashed: true };
                pMax = { x: r2, y: fnF(r2), label: 'Máx', color: '#27ae60', dy: -5, dashed: true };
                solTexto = `$f'(x)$ es una parábola cóncava hacia abajo que corta al eje $x$ en $x = -2$ y $x = 1$, con vértice en $x = -0.5$ por encima del eje horizontal ($f'(x) > 0$ en $(-2, 1)$).`;

            } else if (ej.tipo === 'cuadratica_min') {
                const hVal = [-1, 0, 1][Math.floor(Math.random() * 3)];
                fnF = (x) => 0.5 * Math.pow(x - hVal, 2) - 2.5;
                pMin = { x: hVal, y: -2.5, label: `Mín(${hVal})`, color: '#c0392b', dy: 9, dashed: true };
                solTexto = `$f'(x)$ es una línea recta con pendiente positiva que corta al eje horizontal en $x = ${hVal}$. Es negativa para $x < ${hVal}$ y positiva para $x > ${hVal}$.`;

            } else if (ej.tipo === 'cuadratica_max') {
                const hVal = [-1, 0, 1][Math.floor(Math.random() * 3)];
                fnF = (x) => -0.5 * Math.pow(x - hVal, 2) + 2.5;
                pMax = { x: hVal, y: 2.5, label: `Máx(${hVal})`, color: '#27ae60', dy: -5, dashed: true };
                solTexto = `$f'(x)$ es una línea recta con pendiente negativa que cruza el eje $x$ en $x = ${hVal}$. Es positiva para $x < ${hVal}$ y negativa para $x > ${hVal}$.`;

            } else if (ej.tipo === 'cuartica_w') {
                fnF = (x) => 0.18 * (Math.pow(x, 4) - 8 * Math.pow(x, 2)) + 1.2;
                pMin = { x: -2, y: fnF(-2), label: 'Mín', color: '#c0392b', dy: 9 };
                pMax = { x: 0, y: fnF(0), label: 'Máx', color: '#27ae60', dy: -5 };
                solTexto = `$f'(x)$ es una curva cúbica con raíces en $x = -2, 0, 2$. Pasa de negativa a positiva en $x = -2$ y $x = 2$, y de positiva a negativa en $x = 0$.`;

            } else {
                // Silla cúbica
                const sVal = 0;
                fnF = (x) => 0.15 * Math.pow(x, 3);
                solTexto = `$f'(x)$ es una parábola cóncava hacia arriba que tiene su vértice y es tangente al eje horizontal en $x = 0$ ($f'(x) \\ge 0$ para todo $x$, nunca negativa).`;
            }

            const puntosGraf = [];
            if (pMax) puntosGraf.push(pMax);
            if (pMin) puntosGraf.push(pMin);

            // Gráfica dada de f(x)
            const svgDado = dibujarPlano({
                w: 110,
                h: 70,
                xMin: -3.5,
                xMax: 3.5,
                yMin: -3.5,
                yMax: 3.5,
                stepX: 2,
                stepY: 2,
                curvas: [{ fn: fnF, color: '#2563eb', width: 2 }],
                puntos: puntosGraf,
                fontSizeTicks: 6.5
            });

            // Plano vacío para bosquejar f'(x)
            const svgVacioDer = dibujarPlano({
                w: 110,
                h: 70,
                xMin: -3.5,
                xMax: 3.5,
                yMin: -3.5,
                yMax: 3.5,
                stepX: 2,
                stepY: 2,
                mostrarGrid: true,
                fontSizeTicks: 6.5
            });

            card = `
            <div style="border: 1px solid #c5d6e2; background: #fff; padding: 5px 7px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); text-align: left;">
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #eef2f5; padding-bottom: 2px; margin-bottom: 2px;">
                    <span style="font-weight: bold; color: #1e3a8a; font-size: 0.8rem;">${i + 1}. Bosquejo de la derivada $y = f'(x)$</span>
                    <span class="mark">2</span>
                </div>
                <div style="font-size: 0.7rem; color: #334155; margin-bottom: 2px;">
                    Dada la curva azul $y = f(x)$, trace en la cuadrícula derecha su <b>derivada $y = f'(x)$</b>:
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 4px;">
                    <div style="text-align: center; flex: 1;">
                        <span style="font-size: 0.68rem; font-weight: bold; color: #2563eb;">Dada: $y = f(x)$</span>
                        ${svgDado}
                    </div>
                    <div style="text-align: center; flex: 1;">
                        <span style="font-size: 0.68rem; font-weight: bold; color: #dc2626;">Trace: $y = f'(x)$</span>
                        ${svgVacioDer}
                    </div>
                </div>
                <div style="margin-top: 2px;">
                    <tlacuache-renglon n="1" color="#f9f9f9" alto="16"></tlacuache-renglon>
                </div>
            </div>
            `;
            solItem = `<b>${i + 1})</b> ${solTexto}`;
        }

        cardsHtml.push(card);
        solucionesList.push(solItem);
    }

    // PÁGINA 1: 4 ejercicios (Grid 2x2) - BLOQUE 1
    html += `
    <div class="exercise-step">
        <div style="font-weight: bold; color: #1e3a8a; margin-bottom: 6px; font-size: 0.95rem; border-bottom: 2px solid #2563eb; padding-bottom: 2px;">
            Bloque 1: De las propiedades analíticas y derivadas hacia la gráfica de $f(x)$
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 4px;">
            ${cardsHtml[0]}
            ${cardsHtml[1]}
            ${cardsHtml[2]}
            ${cardsHtml[3]}
        </div>
    </div>
    <div class="page-break"></div>
    `;

    // PÁGINA 2: 6 ejercicios (Grid 2x3) - BLOQUE 2
    html += `
    <div class="header-ficha" style="margin-top: 8px;">
        <span class="tema-tag">5. Cálculo — Bloque 2: Gráfica de f(x) hacia su derivada f'(x)</span>
        <span class="tema-tag">ID: 5.3.2 (Pág. 2/2)</span>
    </div>
    <div class="exercise-step">
        <div style="font-weight: bold; color: #1e3a8a; margin-bottom: 6px; font-size: 0.95rem; border-bottom: 2px solid #2563eb; padding-bottom: 2px;">
            Bloque 2: De la gráfica de $f(x)$ hacia el bosquejo de su función derivada $f'(x)$
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 4px;">
            ${cardsHtml[4]}
            ${cardsHtml[5]}
            ${cardsHtml[6]}
            ${cardsHtml[7]}
            ${cardsHtml[8]}
            ${cardsHtml[9]}
        </div>
    </div>
    <div class="page-break"></div>
    `;

    // SOLUCIONARIO
    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem; line-height: 1.55; color: #1e293b;">
        <div style="border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-bottom: 8px;">
            <b style="font-size: 1rem; color: #1e3a8a;">Solucionario Ficha 5.3.2 - Bosquejo de Curvas y Derivadas:</b>
        </div>
        <div style="margin-bottom: 10px;">
            <b style="color: #2563eb; text-transform: uppercase; font-size: 0.82rem;">Página 1 (Bloque 1: Condiciones analíticas → Gráfica de f(x))</b><br>
            ${solucionesList.slice(0, 4).join('<br>')}
        </div>
        <div>
            <b style="color: #2563eb; text-transform: uppercase; font-size: 0.82rem;">Página 2 (Bloque 2: Gráfica de f(x) → Bosquejo de la derivada f'(x))</b><br>
            ${solucionesList.slice(4, 10).join('<br>')}
        </div>
    </div>
    `;

    return [html, solucion];
}
