import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Distribución Normal: Propiedades, Gráfica y Cálculo";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("4.9.1", "4. Estadística y probabilidad", "Ficha: Distribución Normal: Propiedades, Gráfica y Cálculo");

    // ==========================================
    // EJERCICIO 1 (CUARTILLA 1): REPRESENTACIÓN GRÁFICA Y CÁLCULO DIRECTO
    // ==========================================
    let mu1 = Math.floor(Math.random() * 30) + 140; // 140 a 170 cm o g
    let sigma1 = Math.floor(Math.random() * 8) + 8; // 8 a 15
    let deltaA = Math.floor(sigma1 * (0.8 + Math.random() * 0.7));
    let deltaB = Math.floor(sigma1 * (0.9 + Math.random() * 0.8));

    let valA = mu1 - deltaA;
    let valB = mu1 + deltaB;

    let pMenorA = tlacu.stat.normalcdf(-1e99, valA, mu1, sigma1);
    let pEntre = tlacu.stat.normalcdf(valA, valB, mu1, sigma1);

    html += `
    <div class="seccion-title">I. Propiedades de Simetría, Curva Normal y Probabilidades Directas</div>
    <div class="exercise-step">
        <p><strong>1.</strong> Una variable aleatoria continua $X$ sigue una distribución normal con parámetros $\\mu = ${mu1}$ y $\\sigma = ${sigma1}$, denotada como $X \\sim N(${mu1}, ${sigma1}^2)$.</p>

        <ol class="FT_ol_a">
            <li>
                En la curva de distribución normal dada a continuación, ubique en el eje horizontal la media $\\mu$ y el valor $x = ${valA}$, y <strong>sombree</strong> la región que representa $P(X < ${valA})$. <span class="mark">2</span>
                <div style="display:flex; justify-content:center; margin: 10px 0;">
                    <tlacuache-dist-normal mean="${mu1}" s="${sigma1}"></tlacuache-dist-normal>
                </div>
            </li>
            <li>
                Utilizando su calculadora de pantalla gráfica (GDC), halle el valor de la probabilidad $P(X < ${valA})$. Escriba su respuesta con una precisión de cuatro cifras decimales o tres cifras significativas. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Halle la probabilidad de que la variable aleatoria $X$ tome un valor comprendido entre $${valA}$ y $${valB}$, es decir, $P(${valA} < X < ${valB})$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>
    `;

    // ==========================================
    // EJERCICIO 2 (CUARTILLA 2): APLICACIÓN CONTEXTUAL Y NORMAL INVERSA (invNorm)
    // ==========================================
    let mu2 = Math.floor(Math.random() * 20) + 65; // tiempo de espera, ej. 65 a 85 min
    let sigma2 = Math.floor(Math.random() * 4) + 6; // 6 a 9 min
    let limit2 = mu2 + Math.floor(sigma2 * 1.3);
    let pExcede = tlacu.stat.normalcdf(limit2, 1e99, mu2, sigma2);

    let mu3 = Math.floor(Math.random() * 50) + 250; // volumen en ml, 250 a 300 ml
    let sigma3 = Math.floor(Math.random() * 6) + 8; // 8 a 13 ml
    let topPct = Math.floor(Math.random() * 6) + 5; // 5% a 10%
    let kInversa = tlacu.stat.invNorm(1 - (topPct / 100), mu3, sigma3);

    html += `
    <div class="seccion-title">II. Aplicación en Contexto Real y Distribución Normal Inversa</div>
    <div class="exercise-step">
        <p><strong>2.</strong> El tiempo de duración, en minutos, que tardan los clientes en un trámite bancario se distribuye normalmente con media $\\mu = ${mu2}$ minutos y desviación típica $\\sigma = ${sigma2}$ minutos.</p>

        <ol class="FT_ol_a">
            <li>
                Calcule la probabilidad de que un cliente seleccionado al azar tarde más de $${limit2}$ minutos en completar el trámite. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                En una muestra aleatoria de $200$ clientes, determine el número esperado de clientes que tardarán más de $${limit2}$ minutos. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>

        <p style="margin-top: 25px;"><strong>3.</strong> Una máquina envasadora llena botellas de jugo cuyo volumen en mililitros sigue una distribución normal $V \\sim N(${mu3}, ${sigma3}^2)$.</p>
        <p>Por control de calidad, el $${topPct}\\%$ de las botellas con mayor contenido se consideran sobrellenadas y deben ser reajustadas.</p>

        <ol class="FT_ol_a">
            <li>
                En la curva siguiente, ubique el valor de corte $k$ a partir del cual una botella se considera sobrellenada y sombree el área correspondiente. <span class="mark">2</span>
                <div style="display:flex; justify-content:center; margin: 10px 0;">
                    <tlacuache-dist-normal mean="${mu3}" s="${sigma3}"></tlacuache-dist-normal>
                </div>
            </li>
            <li>
                Plantee la ecuación de probabilidad correspondiente y halle el volumen mínimo $k$ de líquido que debe tener una botella para ser clasificada como sobrellenada. Redondee su respuesta a tres cifras significativas. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 4.9.1 (Distribución Normal: Propiedades, Gráfica y Cálculo):</b><br><br>

        <b>1. Curva Normal y Probabilidades Directas:</b><br>
        * a) Trazo de línea en $x = ${valA}$ (a la izquierda de la media $\\mu = ${mu1}$) y sombreado de la cola izquierda.<br>
        * b) $P(X < ${valA}) = \\text{normalcdf}(-\\infty, ${valA}, ${mu1}, ${sigma1}) \\approx $ <b>${pMenorA.toFixed(4)}</b> (o <b>${(pMenorA * 100).toFixed(2)}\\%</b>)<br>
        * c) $P(${valA} < X < ${valB}) = \\text{normalcdf}(${valA}, ${valB}, ${mu1}, ${sigma1}) \\approx $ <b>${pEntre.toFixed(4)}</b><br><br>

        <b>2. Tiempo en Trámite Bancario:</b><br>
        * a) $P(T > ${limit2}) = \\text{normalcdf}(${limit2}, \\infty, ${mu2}, ${sigma2}) \\approx $ <b>${pExcede.toFixed(4)}</b><br>
        * b) Valor esperado: $E = n \\times p = 200 \\times ${pExcede.toFixed(4)} \\approx $ <b>${(200 * pExcede).toFixed(1)}</b> clientes (o $\\approx ${Math.round(200 * pExcede)}$).<br><br>

        <b>3. Envasado y Normal Inversa:</b><br>
        * a) Trazo del umbral $k$ en la cola superior derecha y sombreado del área del extremo derecho ($${topPct}\\%$).<br>
        * b) Ecuación: $P(V > k) = ${topPct / 100} \\iff P(V \\le k) = ${(1 - topPct / 100).toFixed(2)}$.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;Aplicando $\\text{invNorm}$: $k = \\text{invNorm}(${(1 - topPct / 100).toFixed(2)}, ${mu3}, ${sigma3}) \\approx $ <b>${kInversa.toFixed(2)}</b> ml (o <b>${parseFloat(kInversa.toPrecision(3))}</b> ml a 3 c.s.).
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
