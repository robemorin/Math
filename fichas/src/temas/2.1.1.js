// Generado a partir de: 1.1.1.js (Original movido a src/temporal/)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Línea Recta: Pendiente, Punto Medio y Mediatriz';
}

function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { a %= b;[a, b] = [b, a]; }
    return a;
}

function gcd_list(list) {
    return list.reduce((a, b) => gcd(a, b));
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    // Datos aleatorios
    const range = 7;
    const A = [Math.floor(Math.random() * (2 * range + 1)) - range, Math.floor(Math.random() * (2 * range + 1)) - range];
    let B;
    do {
        B = [Math.floor(Math.random() * (2 * range + 1)) - range, Math.floor(Math.random() * (2 * range + 1)) - range];
    } while (A[0] === B[0] || A[1] === B[1] || (Math.abs(A[0] - B[0]) < 2) || (Math.abs(A[1] - B[1]) < 2));

    // Cálculos
    const Mx = tlacu.simplify_frac([A[0] + B[0], 2]);
    const My = tlacu.simplify_frac([A[1] + B[1], 2]);
    const M_str = `\\left( ${tlacu.fraccion(Mx[0], Mx[1])}, ${tlacu.fraccion(My[0], My[1])} \\right)`;

    const dy = B[1] - A[1];
    const dx = B[0] - A[0];
    const mab = tlacu.simplify_frac([dy, dx]);
    const mp = tlacu.simplify_frac([-dx, dy]);

    let cA = 2 * dx, cB = 2 * dy, cC = -(dx * (A[0] + B[0]) + dy * (A[1] + B[1]));
    const common = gcd_list([cA, cB, cC]);
    cA /= common; cB /= common; cC /= common;
    if (cA < 0 || (cA === 0 && cB < 0)) { cA *= -1; cB *= -1; cC *= -1; }

    const eq_gen = `${cA !== 0 ? (cA === 1 ? 'x' : (cA === -1 ? '-x' : cA + 'x')) : ''}${cB > 0 && cA !== 0 ? '+' : ''}${cB !== 0 ? (cB === 1 ? 'y' : (cB === -1 ? '-y' : cB + 'y')) : ''}${cC > 0 ? '+' : ''}${cC !== 0 ? cC : ''} = 0`;

    // Estilos embebidos para la ficha
    html += `
    <style>
        .ficha-container { font-family: 'Inter', sans-serif; background: white; padding: 1.5cm; border: 1px solid #eee; position: relative; }
        .header-ficha { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #fdad00; margin-bottom: 1rem; padding-bottom: 0.5rem; }
        .tema-tag { font-weight: 700; color: #fdad00; text-transform: uppercase; font-size: 0.9rem; }
        .enunciado { font-size: 1.1rem; margin-bottom: 1.5rem; color: #333; }
        .mark { float: right; font-weight: bold; font-family: 'Courier New', Courier, monospace; border: 1px solid #777; padding: 2px 5px; font-size: 0.8rem; border-radius: 3px; background: #f9f9f9; }
        .seccion-title { background: #f0f0f0; padding: 5px 10px; font-weight: bold; display: block; margin: 15px 0 10px; border-radius: 4px; border-left: 4px solid #fdad00; }
        .ti-84-tip { background: #fff8e6; border: 1px dashed #fdad00; padding: 10px; margin: 1.5rem 0; font-style: italic; font-size: 0.9rem; border-radius: 8px; }
        .exercise-step { margin-bottom: 1.5rem; clear: both; }
        @media print { .ficha-container { border: none; padding: 0; } }
    </style>

    <div class="ficha-container">
        <div class="header-ficha">
            <span class="tema-tag">Matemáticas AI NM - Geometría Coordenada</span>
            <span class="tema-tag">ID: 1.1.1</span>
        </div>

        <div class="enunciado">
            Considere los puntos coordenados $A(${A[0]}, ${A[1]})$ y $B(${B[0]}, ${B[1]})$.
        </div>

        <div class="seccion-title">I. Análisis del Segmento</div>
        
        <div class="exercise-step">
            <span class="mark">2</span>
            a. Halle las coordenadas del punto medio $M$ del segmento $[AB]$.
            <tlacuache-renglon n="1" color="#f0f0f0"></tlacuache-renglon>
        </div>

        <div class="exercise-step">
            <span class="mark">2</span>
            b. Calcule la pendiente ($m$) del segmento $[AB]$.
            <tlacuache-renglon n="1" color="#f0f0f0"></tlacuache-renglon>
        </div>

        <div class="seccion-title">II. La Mediatriz</div>

        <div class="exercise-step">
            <span class="mark">1</span>
            c. Escriba la pendiente de la mediatriz del segmento $[AB]$.
            <tlacuache-renglon n="1" color="#f0f0f0"></tlacuache-renglon>
        </div>

        <div class="exercise-step">
            <span class="mark">3</span>
            d. Determine la ecuación de la mediatriz en la forma $Ax + By + D = 0$.
            <tlacuache-renglon n="3" color="#f0f0f0"></tlacuache-renglon>
        </div>

        <div class="ti-84-tip">
            💡 <b>TI-84 Hint:</b> Puedes usar la función <code>LinReg (ax+b)</code> en el menú <code>STAT > CALC</code> para obtener la pendiente de la recta $AB$, pero recuerda que para la mediatriz debes usar la relación $m_1 \cdot m_2 = -1$.
        </div>

        <div class="seccion-title">III. Modelización y Verificación</div>

        <div class="exercise-step">
            <span class="mark">2</span>
            e. Una estación de radio $P$ se ubica en el eje de las abscisas y es equidistante a los puntos $A$ y $B$. Halle las coordenadas de $P$.
            <tlacuache-renglon n="2" color="#f0f0f0"></tlacuache-renglon>
        </div>

        <div style="text-align: center; margin-top: 2cm;">
            <p style="font-size: 0.8rem; color: #888;">Utilice el siguiente espacio para esbozar los puntos y la mediatriz:</p>
            <tlacuache-ejes size="320, 320" xlim="-10, 10" ylim="-10, 10" dx="2" dy="2" grid="true"></tlacuache-ejes>
        </div>
    </div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.9rem;">
        <b>${numeroPregunta + 1}:</b> 
        (a) $M = ${M_str}$ [A2] 
        (b) $m = ${tlacu.fraccion(mab[0], mab[1])}$ [M1 A1]
        (c) $m_p = ${tlacu.fraccion(mp[0], mp[1])}$ [A1]
        (d) $y - (${tlacu.fraccion(My[0], My[1])}) = ${tlacu.fraccion(mp[0], mp[1])}(x - (${tlacu.fraccion(Mx[0], Mx[1])})) \rightarrow ${eq_gen}$ [M1 A2]
        (e) $y=0 \rightarrow ${cA}x + ${cC} = 0 \rightarrow P(${tlacu.fraccion(-cC, cA)}, 0)$ [M1 A1]
    </div>
    `;

    return [html, solucion];
}

export async function renderGeoGebra(container, totalElements) { }
