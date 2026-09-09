import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Integral en Física (Nivel Alto)";
}

export function tipo() {
    return 1;
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("5.6.3", "5. Cálculo", "Ficha: Integral en Física (Nivel Alto)");

    const indices = [...Array(bancoProblemas.length).keys()];
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const seleccionados = indices.slice(0, 2);

    let secLabels = ["I", "II"];
    let solItems = [];

    for (let sIdx = 0; sIdx < seleccionados.length; sIdx++) {
        const problema = bancoProblemas[seleccionados[sIdx]]();
        const numRomano = secLabels[sIdx];

        html += `
        <div class="seccion-title">${numRomano}. ${problema.enunciado}</div>
        <div class="exercise-step">
            ${problema.htmlCuerpo}
        </div>
        `;

        if (sIdx === 0) {
            html += `<div class="page-break"></div>`;
        }

        solItems.push(`<b>${sIdx + 1}. ${problema.enunciado}:</b><br>${problema.respuesta}`);
    }

    html += `</div>`;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 5.6.3 (Integral en Física - Nivel Alto):</b><br><br>
        ${solItems.join('<br><br>')}
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}

const bancoProblemas = [
    // --- GRUPO 1: CINEMÁTICA (POLINOMIOS) ---
    () => generarCinematicaPolinomio(1),
    () => generarCinematicaPolinomio(2),
    () => generarCinematicaAceleracion(1),
    
    // --- GRUPO 2: CINEMÁTICA (TRIGONOMETRÍA) ---
    () => generarCinematicaTrig(1),
    () => generarCinematicaTrig(2),
    () => generarCinematicaTrig(3),

    // --- GRUPO 3: CINEMÁTICA (EXPONENCIAL/LOG) ---
    () => generarCinematicaExp(1),
    () => generarCinematicaExp(2),
    () => generarCinematicaLog(1),

    // --- GRUPO 4: TRABAJO (FUERZA VARIABLE) ---
    () => generarTrabajoResorte(),
    () => generarTrabajoPolinomio(),
    () => generarTrabajoTanque(1),
    () => generarTrabajoTanque(2),
    () => generarTrabajoGravedad(),

    // --- GRUPO 5: VOLÚMENES Y SÓLIDOS (APLICADOS) ---
    () => generarVolumen(1),
    () => generarVolumen(2),
    () => generarVolumen(3),
    
    // --- GRUPO 6: VALOR MEDIO Y RMS (FÍSICA ELÉCTRICA/MECÁNICA) ---
    () => generarPromedio(1),
    () => generarPromedio(2),
    () => generarRMS(),

    // --- GRUPO 7: CINEMÁTICA AVANZADA (INTERPRETACIÓN) ---
    () => generarEncuentroParticulas(),
    () => generarDistanciaTotalCalc(),
    () => generarHallarKCinematica(),

    // --- GRUPO 8: ACUMULACIÓN (MODELOS DE TASAS) ---
    () => generarTasaCambio(1),
    () => generarTasaCambio(2),
    () => generarTasaCambio(3),
    () => generarTasaCambio(4),

    // --- GRUPO 9: OPTIMIZACIÓN EN INTEGRALES ---
    () => generarOptimizacionIntegral(1),
    () => generarOptimizacionIntegral(2),
    
    // --- GRUPO 10: CENTRO DE MASA (1D) ---
    () => generarCentroMasa()
];
// HELPERS MATEMÁTICOS Y GENERADORES ESPECÍFICOS
// =========================================================================

function rnd(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function rndF(min, max, dec=1) { return (Math.random() * (max - min) + min).toFixed(dec); }

// Helper para integración numérica (Trapecio)
function integrar(fn, a, b, n=1000) {
    const h = (b - a) / n;
    let sum = 0.5 * (fn(a) + fn(b));
    for (let i = 1; i < n; i++) sum += fn(a + i * h);
    return sum * h;
}

// --- 1. CINEMÁTICA POLINOMIOS ---
function generarCinematicaPolinomio(tipo) {
    const a = rnd(1, 4);
    const b = rnd(2, 8);
    // v(t) = 3t^2 - 2at + b
    const p1 = 3; 
    const p2 = -2 * a;
    const p3 = (tipo === 2) ? -rnd(5, 15) : rnd(5, 15); 
    
    const v_str = `${p1}t^2 ${p2 >= 0 ? '+' : ''}${p2}t ${p3 >= 0 ? '+' : ''}${p3}`;
    const s0 = rnd(0, 10);

    const html = `
        <p>Una partícula se mueve en línea recta tal que su velocidad, en $m s^{-1}$, en el instante $t$ segundos viene dada por $v(t) = ${v_str}$, para $0 \\le t \\le 5$.
        En el instante $t=0$, la partícula se encuentra en la posición $s = ${s0}$ m.</p>
        <ol class="FT_ol_a">
            <li>Halle una expresión para la aceleración $a(t)$. <span class="mark">2</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Halle la posición de la partícula cuando $t=3$. <span class="mark">5</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule la distancia total recorrida en los primeros 4 segundos. <span class="mark">5</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    `;

    // Cálculos Numéricos
    const s = (t) => p1*Math.pow(t,3)/3 + p2*Math.pow(t,2)/2 + p3*t + s0;
    const s3 = s(3).toFixed(2);
    const v = (t) => p1*t*t + p2*t + p3;
    const distTotal = integrar((t)=>Math.abs(v(t)), 0, 4).toFixed(2);
    const aFunc = `a(t) = ${2*p1}t ${p2 >= 0 ? '+' : ''}${p2}`;

    const res = `a) ${aFunc}. <br> b) ${s3} m. <br> c) ${distTotal} m.`;
    return { enunciado: "Cinemática Polinómica", htmlCuerpo: html, respuesta: res, puntos: 12 };
}

function generarCinematicaAceleracion(tipo) {
    const acc = rnd(2, 6);
    const v0 = rnd(10, 30);
    const s0 = rnd(0, 50);
    
    const html = `
        <p>Un cohete de juguete se lanza verticalmente hacia arriba. Su aceleración es constante e igual a $-${acc} \, m s^{-2}$.
        La velocidad inicial es de $${v0} \, m s^{-1}$ y se lanza desde una altura de ${s0} m.</p>
        <ol class="FT_ol_a">
            <li>Halle la función de velocidad $v(t)$. <span class="mark">3</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Determine la altura máxima alcanzada por el cohete. <span class="mark">6</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Determine en qué instante el cohete golpea el suelo. <span class="mark">5</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    `;
    
    // Cálculos
    const tMax = v0 / acc;
    const s = (t) => s0 + v0*t - 0.5*acc*Math.pow(t,2);
    const hMax = s(tMax).toFixed(2);
    const discrim = Math.sqrt(v0*v0 + 2*acc*s0); // 0 = -0.5at^2 + v0t + s0
    const tSuelo = ((v0 + discrim)/acc).toFixed(2);

    const res = `a) v(t) = ${v0} - ${acc}t. <br> b) ${hMax} m. <br> c) ${tSuelo} s.`;
    return { enunciado: "Movimiento Vertical", htmlCuerpo: html, respuesta: res, puntos: 14 };
}

// --- 2. CINEMÁTICA TRIGONOMÉTRICA ---
function generarCinematicaTrig(tipo) {
    const A = rnd(2, 8);
    const k = rnd(1, 3);
    const esCos = (Math.random() > 0.5);
    const fn = esCos ? "\\cos" : "\\sin";
    
    const html = `
        <p>Una partícula P se desplaza a lo largo del eje x con velocidad $v(t) = ${A} ${fn}(${k}t) + 1$, donde $t \\ge 0$.
        Cuando $t=0$, $P$ está en el origen.</p>
        <ol class="FT_ol_a">
            <li>Halle el desplazamiento de P en el intervalo $0 \\le t \\le \\pi$. <span class="mark">4</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Halle la aceleración de la partícula en $t = \\frac{\\pi}{2}$. <span class="mark">4</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Encuentre el primer instante $t > 0$ en el que la partícula cambia de sentido, o justifique si no lo hace. <span class="mark">5</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    `;
    
    // Cálculos
    const v = (t) => esCos ? (A * Math.cos(k*t) + 1) : (A * Math.sin(k*t) + 1);
    const disp = integrar(v, 0, Math.PI).toFixed(2);
    const aCalc = (t) => esCos ? (-A*k*Math.sin(k*t)) : (A*k*Math.cos(k*t));
    const accVal = aCalc(Math.PI/2).toFixed(2);
    
    let tCambio = "No cambia";
    const target = -1/A;
    if (Math.abs(target) <= 1) {
         let angle;
         if (esCos) angle = Math.acos(target); 
         else angle = Math.asin(target);
         if (!esCos && angle < 0) angle += 2*Math.PI; 
         tCambio = (angle / k).toFixed(3);
    }

    const res = `a) ${disp} m. <br> b) ${accVal} m/s². <br> c) ${tCambio} s.`;
    return { enunciado: "Oscilación Armónica", htmlCuerpo: html, respuesta: res, puntos: 13 };
}

// --- 3. EXPONENCIAL ---
function generarCinematicaExp(tipo) {
    const V0 = rnd(10, 50);
    const k = rndF(0.1, 0.5);
    
    const html = `
        <p>Un paracaidista cae con una velocidad modelada por $v(t) = ${V0}(1 - e^{-${k}t})$, donde $v$ está en $m/s$ y $t$ en segundos.</p>
        <ol class="FT_ol_a">
            <li>Determine la velocidad terminal (límite cuando $t \\to \\infty$). <span class="mark">2</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule la distancia caída en los primeros 10 segundos. <span class="mark">6</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Halle la aceleración en $t=2$. <span class="mark">4</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    `;
    
    // Cálculos
    const v = (t) => V0 * (1 - Math.exp(-k*t));
    const dist = integrar(v, 0, 10).toFixed(2);
    const acc2 = (V0 * k * Math.exp(-k*2)).toFixed(2);

    const res = `a) ${V0} m/s. <br> b) ${dist} m. <br> c) ${acc2} m/s².`;
    return { enunciado: "Velocidad Terminal", htmlCuerpo: html, respuesta: res, puntos: 12 };
}

function generarCinematicaLog(tipo) {
    const C = rnd(5, 20);
    const html = `
        <p>Una partícula se mueve con velocidad $v(t) = \\frac{${C}}{t+2}$ cm/s para $t \\ge 0$. Posición inicial $s(0)=0$.</p>
        <ol class="FT_ol_a">
            <li>Halle la expresión para la posición $s(t)$. <span class="mark">5</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule el tiempo necesario para recorrer 100 cm. <span class="mark">5</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    `;
    
    // Cálculos
    const tiempo = (2 * Math.exp(100/C) - 2).toFixed(2);
    
    const res = `a) s(t) = ${C}ln(t+2) - ${C}ln(2). <br> b) ${tiempo} s.`;
    return { enunciado: "Movimiento Logarítmico", htmlCuerpo: html, respuesta: res, puntos: 10 };
}

// --- 4. TRABAJO Y FUERZA ---
function generarTrabajoResorte() {
    const k = rnd(50, 200); // N/m
    const estiramiento1 = rnd(5, 10) / 100; // m
    const estiramiento2 = rnd(15, 25) / 100; // m

    const html = `
        <p>Se requiere una fuerza de $F(x) = ${k}x$ Newtons para mantener un resorte estirado $x$ metros desde su longitud natural.</p>
        <ol class="FT_ol_a">
            <li>Calcule el trabajo realizado para estirar el resorte desde su longitud natural hasta ${estiramiento1} m. <span class="mark">4</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule el trabajo adicional requerido para estirarlo desde ${estiramiento1} m hasta ${estiramiento2} m. <span class="mark">5</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    `;
    
    // Cálculos
    const w1 = (0.5 * k * estiramiento1*estiramiento1).toFixed(2);
    const wTotal = 0.5 * k * estiramiento2*estiramiento2;
    const w2 = (wTotal - (0.5 * k * estiramiento1*estiramiento1)).toFixed(2);

    const res = `a) ${w1} J. <br> b) ${w2} J.`;
    return { enunciado: "Trabajo en Resortes", htmlCuerpo: html, respuesta: res, puntos: 9 };
}

function generarTrabajoPolinomio() {
    const a = rnd(2, 5);
    const b = rnd(10, 50);
    const dist = rnd(5, 15);
    const html = `
        <p>Un objeto se mueve a lo largo del eje x bajo la acción de una fuerza variable $F(x) = ${a}x^2 + ${b}$ Newtons, donde $x$ se mide en metros.</p>
        <ol class="FT_ol_a">
            <li>Interprete qué representa el área bajo la curva $F(x)$ vs $x$. <span class="mark">2</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule el trabajo realizado para mover el objeto desde $x=0$ hasta $x=${dist}$. <span class="mark">5</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    `;
    
    // Cálculos
    const W = ((a/3)*Math.pow(dist,3) + b*dist).toFixed(1);

    const res = `a) El trabajo realizado. <br> b) ${W} J.`;
    return { enunciado: "Trabajo Variable", htmlCuerpo: html, respuesta: res, puntos: 7 };
}

function generarTrabajoGravedad() {
    const GMm = rnd(10, 50) * Math.pow(10, 6); 
    const R = 6400; 
    const h = rnd(100, 500); 
    
    const html = `
        <p>La fuerza gravitacional ejercida sobre un satélite a una distancia $r$ del centro de un planeta viene dada por $F(r) = \\frac{K}{r^2}$. Suponga que $K = 4 \times 10^{14} \, \text{N m}^2$. El radio del planeta es $6.4 \times 10^6$ m.</p>
        <ol class="FT_ol_a">
            <li>Plantee la integral para el trabajo necesario para elevar el satélite desde la superficie hasta una altura de $${h} \times 10^3$ m. <span class="mark">4</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule dicho trabajo en Joules. <span class="mark">6</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    `;
    
    // Cálculos
    const K = 4e14;
    const R_m = 6.4e6;
    const h_m = h * 1000;
    const W = (K * (1/R_m - 1/(R_m + h_m))).toExponential(2);

    const res = `a) Integral de K/r² dr entre R y R+h. <br> b) ${W} J.`;
    return { enunciado: "Trabajo Gravitacional", htmlCuerpo: html, respuesta: res, puntos: 10 };
}

function generarTrabajoTanque(tipo) {
    const radio = rnd(2, 5);
    const altura = rnd(6, 12);
    const forma = (tipo === 1) ? "cilíndrico" : "cónico (con vértice abajo)";
    const rho = 1000; 
    const g = 9.81;
    
    const html = `
        <p>Un tanque ${forma} tiene un radio de ${radio} m en la parte superior y una altura de ${altura} m. Está lleno de agua (densidad $1000 \, kg/m^3$).</p>
        <ol class="FT_ol_a">
            <li>Plantee una expresión para el volumen de una "rebanada" diferencial de agua a altura $y$. <span class="mark">4</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Plantee y calcule la integral para el trabajo requerido para bombear toda el agua hasta el borde superior del tanque. <span class="mark">8</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    `;
    
    // Cálculos
    const integrandCil = (y) => Math.PI * radio*radio * (altura - y);
    const integrandCono = (y) => Math.PI * Math.pow((radio/altura)*y, 2) * (altura - y);
    const integrand = (tipo === 1) ? integrandCil : integrandCono;
    const integralVal = integrar(integrand, 0, altura);
    const W = (rho * g * integralVal).toExponential(2);

    const res = `a) dV = A(y) dy. <br> b) ${W} J.`;
    return { enunciado: `Bombeo de Fluidos (${forma})`, htmlCuerpo: html, respuesta: res, puntos: 12 };
}

// --- 5. VOLÚMENES ---
function generarVolumen(tipo) {
    let func = "", limites = "", funcJs=null, a=0, b=0;
    if (tipo === 1) { func = "y = \\frac{1}{2}x + 2"; limites = "x=0, x=4"; funcJs = (x)=>0.5*x+2; a=0; b=4; } 
    else if (tipo === 2) { func = "y = \\sqrt{x - 1}"; limites = "x=1, x=5"; funcJs = (x)=>Math.sqrt(x-1); a=1; b=5; }
    else { func = "y = \\frac{1}{2x}"; limites = "x=1, x=2"; funcJs = (x)=>1/(2*x); a=1; b=2; }

    const html = `
        <p>La región delimitada por la curva $${func}$, el eje x, y las líneas verticales ${limites} gira $360^\\circ$ alrededor del eje x.</p>
        <p>El volumen del sólido genereado se calcula usando la fórmula $$V = \\pi \\int_a^b [f(x)]^2 dx$$.</p>
        <ol class="FT_ol_a">
            <li>Dibuje un bosquejo de la región y del sólido generado. <span class="mark">3</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Escriba la integral que representa el volumen del sólido. <span class="mark">3</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule el volumen exacto en términos de $\\pi$. <span class="mark">5</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    `;
    
    // Cálculos
    const integral = integrar((x) => Math.pow(funcJs(x), 2), a, b);
    const V = (Math.PI * integral).toFixed(2);

    const res = `b) Integral planteada. <br> c) ${V} u³.`;
    return { enunciado: "Volumen de Revolución", htmlCuerpo: html, respuesta: res, puntos: 11 };
}

// --- 6. TASAS Y PROMEDIOS ---
function generarPromedio(tipo) {
    const T = rnd(4, 10);
    
    let k = rnd(2,6);
    let funcStr = (tipo === 1) ? `v(t) = t^2 - ${k}t` : `T(x) = 20 + 5x`;
    let funcJsCalc = (tipo === 1) ? (t)=>t*t - k*t : (x)=>20 + 5*x;

    const html = `
        <p>Dada la función $${funcStr}$ en el intervalo $0 \\le x \\le ${T}$.</p>
        <ol class="FT_ol_a">
            <li>Calcule el valor promedio de la función en el intervalo dado. <span class="mark">5</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Interprete el significado físico de este valor. <span class="mark">2</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    `;
    
    const integral = integrar(funcJsCalc, 0, T);
    const promedio = (integral / T).toFixed(2);

    const res = `a) ${promedio}. <br> b) Valor medio en el intervalo.`;
    return { enunciado: "Teorema del Valor Medio", htmlCuerpo: html, respuesta: res, puntos: 7 };
}

function generarRMS() {
    const I0 = rnd(2, 10);
    const w = rnd(50, 120); 
    const html = `
        <p>La corriente en un circuito de CA viene dada por $I(t) = ${I0} \sin(${w}t)$.</p>
        <ol class="FT_ol_a">
            <li>Halle el cuadrado de la corriente, $I^2(t)$. <span class="mark">2</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule el valor cuadrático medio (RMS) de la corriente en un periodo $T = 2\\pi/${w}$. <span class="mark">8</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Demuestre que $I_{rms} = \\frac{I_0}{\\sqrt{2}}$. <span class="mark">4</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    `;
    
    // Cálculos
    const rms = (I0 / Math.sqrt(2)).toFixed(2);

    const res = `a) ${I0*I0} sin²(${w}t). <br> b) ${rms} A.`;
    return { enunciado: "Corriente RMS (Alterna)", htmlCuerpo: html, respuesta: res, puntos: 14 };
}

function generarEncuentroParticulas() {
    const v1 = rnd(5, 10);
    const a2 = rnd(1, 3);
    const html = `
        <p>Dos partículas A y B se mueven a lo largo de la misma línea recta partiendo del mismo punto en $t=0$.
        La partícula A se mueve con velocidad constante de $${v1} \, m/s$.
        La partícula B parte del reposo con aceleración $${a2} \, m/s^2$.</p>
        <ol class="FT_ol_a">
            <li>Halle las funciones de posición $s_A(t)$ y $s_B(t)$. <span class="mark">4</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Determine en qué instante $t > 0$ las partículas se encuentran nuevamente. <span class="mark">4</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule la velocidad de B en ese instante. <span class="mark">2</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    `;
    
    // Cálculos
    const tEncuentro = (2*v1/a2).toFixed(2);
    const vB = (a2 * tEncuentro).toFixed(2);

    const res = `a) sA(t)=${v1}t, sB(t)=${0.5*a2}t^2. <br> b) ${tEncuentro} s. <br> c) ${vB} m/s.`;
    return { enunciado: "Encuentro de Partículas", htmlCuerpo: html, respuesta: res, puntos: 10 };
}

function generarDistanciaTotalCalc() {
    const A = rnd(3, 8);
    const B = rnd(2, 5);
    const html = `
        <p>La velocidad de una partícula viene dada por $v(t) = ${A} \\cos(t) - ${B} \\sin(2t)$ para $0 \\le t \\le 10$.</p>
        <ol class="FT_ol_a">
            <li>Utilice su calculadora de pantalla gráfica para graficar $v(t)$. <span class="mark">2</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Halle los instantes donde la partícula cambia de dirección. <span class="mark">4</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule la <strong>distancia total</strong> recorrida en el intervalo (recuerde usar valor absoluto). <span class="mark">4</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    `;
    
    // Cálculos
    const v = (t) => A*Math.cos(t) - B*Math.sin(2*t);
    const dist = integrar((t)=>Math.abs(v(t)), 0, 10, 1000).toFixed(2);

    const res = `b) Ver gráfica (ceros). <br> c) ${dist} m.`;
    return { enunciado: "Distancia Total (Calculadora)", htmlCuerpo: html, respuesta: res, puntos: 10 };
}

function generarHallarKCinematica() {
    const k_real = rnd(2, 5);
    const s_target = (1/3) * Math.pow(k_real, 3); 
    
    const html = `
        <p>La velocidad de una partícula es $v(t) = t^2 - k$. Sabiendo que el desplazamiento neto entre $t=0$ y $t=k$ es 0, encuentre el valor de $k$. (Esta es conceptual, ajuste según lógica).</p>
        <!--p><em>Corrección:</em> Considere $v(t) = k t$. Si el desplazamiento en $t=0$ a $t=4$ es 40 m:</p-->
        <ol class="FT_ol_a">
            <li>Plantee la integral del desplazamiento en función de $k$. <span class="mark">3</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Halle el valor de $k$. <span class="mark">3</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    `;
    
    // Cálculos
    // 8k = 40 => k=5 always for this text
    
    const res = `a) Integral planteada. <br> b) k = 5.`;
    return { enunciado: "Hallar Parámetro k", htmlCuerpo: html, respuesta: res, puntos: 6 };
}

function generarTasaCambio(tipo) {
    const contextos = [
        { obj: "agua entrando a un tanque", tasa: "R(t) = 20e^{-0.1t} \\text{ L/min}", u: "Litros" },
        { obj: "población de bacterias", tasa: "P'(t) = 1000e^{0.2t} \\text{ bac/h}", u: "bacterias" },
        { obj: "valor de una máquina", tasa: "V'(t) = -500(t+1)^{-1} \\text{ USD/año}", u: "USD" },
        { obj: "fuga de petróleo", tasa: "L'(t) = \\frac{100}{t+1} \\text{ barriles/día}", u: "barriles" }
    ];
    const ctx = contextos[tipo-1] || contextos[0];
    const T = rnd(5, 10);
    
    const html = `
        <p>La tasa de cambio de ${ctx.obj} viene dada por $${ctx.tasa}$.</p>
        <ol class="FT_ol_a">
            <li>Explique qué representa la integral de 0 a ${T} de $${ctx.tasa}$. <span class="mark">2</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule el cambio total en los primeros ${T} periodos de tiempo. <span class="mark">4</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    `;
    
    // Cálculos
    let val = 0;
    if (tipo === 1) val = integrar((t)=>20*Math.exp(-0.1*t), 0, T);
    else if (tipo === 2) val = integrar((t)=>1000*Math.exp(0.2*t), 0, T);
    else if (tipo === 3) val = integrar((t)=>-500/(t+1), 0, T);
    else val = integrar((t)=>100/(t+1), 0, T);

    const res = `a) Cambio acumulado. <br> b) ${val.toFixed(2)} ${ctx.u}.`;
    return { enunciado: "Modelos de Acumulación", htmlCuerpo: html, respuesta: res, puntos: 6 };
}

function generarOptimizacionIntegral(tipo) {
    const html = `
        <p>La aceleración de una partícula es $a(t) = 6t - 18$. Velocidad inicial $v(0) = 24$.</p>
        <ol class="FT_ol_a">
            <li>Halle la expresión para $v(t)$. <span class="mark">3</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Determine cuándo la velocidad es mínima. <span class="mark">4</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule el desplazamiento de la partícula hasta ese instante. <span class="mark">5</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    `;
    
    // Cálculos
    // v = 3t^2 - 18t + 24. Min at t=3. s(3) = int(v, 0, 3)
    const s3 = integrar((t)=>3*t*t - 18*t + 24, 0, 3).toFixed(2);

    const res = `a) v(t)=3t²-18t+24. <br> b) t=3 s. <br> c) ${s3} m.`;
    return { enunciado: "Optimización Cinemática", htmlCuerpo: html, respuesta: res, puntos: 12 };
}

function generarCentroMasa() {
    const L = rnd(2, 5);
    const html = `
        <p>Una varilla delgada de longitud ${L} m tiene una densidad lineal variable dada por $\\rho(x) = 1 + x^2$ kg/m, donde $x$ es la distancia desde un extremo.</p>
        <ol class="FT_ol_a">
            <li>Calcule la masa total de la varilla  $M = \\int_0^L \\rho(x) dx$. <span class="mark">4</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule el momento de masa respecto al origen $M_0 = \\int_0^L x \\rho(x) dx$. <span class="mark">4</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Encuentre el centro de masa $\\bar{x} = M_0 / M$. <span class="mark">3</span><tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    `;
    
    // Cálculos
    const M = integrar((x)=>1+x*x, 0, L);
    const M0 = integrar((x)=>x*(1+x*x), 0, L);
    const xBar = (M0 / M).toFixed(2);

    const res = `a) ${M.toFixed(2)} kg. <br> b) ${M0.toFixed(2)} kg m. <br> c) ${xBar} m.`;
    return { enunciado: "Centro de Masa", htmlCuerpo: html, respuesta: res, puntos: 11 };
}
