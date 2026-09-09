import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Sucesiones, Series y Finanzas (Tipo Prueba 1)";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("1.4.9", "1. Número y álgebra", "Ficha: Sucesiones, Series y Finanzas (Tipo Prueba 1)");

    html += `
    <style>
        .FT_ol_i { counter-reset: subitem; padding-left: 20px; margin-top: 5px; }
        .FT_ol_i li { list-style: none; counter-increment: subitem; margin-bottom: 5px; }
        .FT_ol_i li::before { content: '(' counter(subitem, lower-roman) ') '; font-weight: bold; margin-right: 5px; }
    </style>
    `;

    // ==========================================================
    // EJERCICIO 1 (CUARTILLA 1): FINANZAS E INTERÉS COMPUESTO (IB)
    // Depósito inicial P con capitalización trimestral vs semestral
    // ==========================================================
    const P = Math.floor(Math.random() * 4 + 5) * 1000; // 5000, 6000, 7000, 8000
    const r_nominal = (Math.floor(Math.random() * 5) * 0.4 + 4.8).toFixed(1); // ej. 4.8, 5.2, 5.6, 6.0, 6.4
    const t_anios = Math.floor(Math.random() * 3) + 4; // 4, 5, 6 años
    const k_capitalizaciones = 4; // trimestral

    // FV = P * (1 + r / (100 * k))^(k * t)
    const i_periodo = (parseFloat(r_nominal) / 100) / k_capitalizaciones;
    const n_periodos = k_capitalizaciones * t_anios;
    const FV_trim = P * Math.pow(1 + i_periodo, n_periodos);
    const intereses_ganados = FV_trim - P;

    // Objetivo futuro para duplicar
    const anios_duplicar = Math.log(2) / (k_capitalizaciones * Math.log(1 + i_periodo));

    html += `
    <div class="seccion-title">I. Modelización Financiera: Interés Compuesto y Proyecciones</div>
    <div class="exercise-step">
        <p><strong>1.</strong> Elena invierte una suma inicial de $${P}$ USD en una cuenta de ahorros que devenga un interés nominal anual del $${r_nominal}\\%$, capitalizable <strong>trimestralmente</strong>.</p>

        <ol class="FT_ol_a">
            <li>
                Escriba una expresión para calcular el valor total de la inversión tras $t$ años. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Calcule el saldo total en la cuenta al cabo de $${t_anios}$ años. Dé su respuesta redondeada al centavo más cercano. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Determine la cantidad total generada exclusivamente por intereses durante este período de $${t_anios}$ años. <span class="mark">1</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Elena desea saber con exactitud cuánto tiempo tardará su inversión inicial en duplicarse con estas mismas condiciones financieras.
                <ol class="FT_ol_i">
                    <li>Escriba una ecuación que modele la condición para duplicar su dinero. <span class="mark">1</span>
                        <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
                    </li>
                    <li>Utilizando su calculadora de pantalla gráfica o logaritmos, halle el número mínimo de años completos requeridos para que el monto acumulado sea al menos el doble del inicial. <span class="mark">3</span>
                        <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
                    </li>
                </ol>
            </li>
        </ol>
        ${ai.getTiTip("En la TI-84 puede utilizar el menú financiero en <code>[APPS] -> 1:Finance -> 1:TVM Solver...</code> fijando <code>C/Y = 4</code> y <code>P/Y = 4</code>.")}
    </div>

    <div class="page-break"></div>

    <div class="seccion-title">II. Progresiones Aritméticas y Geométricas en Contexto</div>
    <div class="exercise-step">
    `;

    // ==========================================================
    // EJERCICIO 2 (CUARTILLA 2): PROGRESIÓN ARITMÉTICA Y GEOMÉTRICA
    // ==========================================================
    const u1_arit = Math.floor(Math.random() * 4 + 8); // 8, 9, 10, 11
    const d_arit = Math.floor(Math.random() * 3 + 3); // 3, 4, 5
    const u4_arit = u1_arit + 3 * d_arit;
    const u7_arit = u1_arit + 6 * d_arit;
    const n_suma = 20;
    const S20 = (n_suma / 2) * (2 * u1_arit + (n_suma - 1) * d_arit);

    // Contexto geométrico con términos algebraicos:
    // Sean x, x+3, 4x consecutivos de una geométrica
    // (x+3)^2 = x * 4x => x^2 + 6x + 9 = 4x^2 => 3x^2 - 6x - 9 = 0 => x^2 - 2x - 3 = 0 => (x-3)(x+1)=0
    // x = 3 (positivo)
    // terminos: 3, 6, 12 (r = 2)
    const m_geom = Math.floor(Math.random() * 3) + 2; // multiplicador
    // (x + m)^2 = x * 4x => 3x^2 - 2mx - m^2 = 0 => (3x + m)(x - m) = 0 => x = m
    const x_sol = m_geom;
    const r_sol = 2;
    const g1 = x_sol;
    const g2 = x_sol + m_geom; // 2m
    const g3 = 4 * x_sol; // 4m

    html += `
        <p><strong>2.</strong> En una progresión aritmética, el cuarto término es $u_4 = ${u4_arit}$ y el séptimo término es $u_7 = ${u7_arit}$.</p>
        <ol class="FT_ol_a">
            <li>
                Demuestre que la diferencia común de la progresión es $d = ${d_arit}$ y halle el primer término $u_1$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Halle el valor de la suma de los primeros $20$ términos, $S_{20}$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>

        <p style="margin-top: 25px;"><strong>3.</strong> Los primeros tres términos consecutivos de una progresión geométrica de términos positivos son $x$, $x + ${m_geom}$ y $4x$.</p>
        <ol class="FT_ol_a">
            <li>
                Plantee una ecuación cuadrática en términos de $x$ y demuestre que $x = ${x_sol}$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Escriba el valor exacto de la razón común $r$ y calcule el décimo término $u_{10}$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    </div>
    <div class="page-break"></div>
    `;

    // CÁLCULOS DEL SOLUCIONARIO
    const anios_enteros = Math.ceil(anios_duplicar);
    const u10_geom = g1 * Math.pow(r_sol, 9);

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 1.4.9 (Sucesiones, Series y Finanzas - Tipo Prueba 1):</b><br><br>

        <b>1. Modelo Financiero:</b><br>
        * a) Fórmula del monto compuesto: $FV = ${P}\\left(1 + \\frac{${r_nominal}}{400}\\right)^{4t}$ o $FV = ${P}(${(1 + i_periodo).toFixed(5)})^{4t}$.<br>
        * b) Para $t = ${t_anios}$: $FV = ${P}\\left(1 + \\frac{${r_nominal}}{400}\\right)^{${n_periodos}} \\approx $ <b>$${FV_trim.toFixed(2)} USD</b>.<br>
        * c) Intereses totales: $I = FV - P = ${FV_trim.toFixed(2)} - ${P} =$ <b>$${intereses_ganados.toFixed(2)} USD</b>.<br>
        * d) i. Ecuación para duplicar: $${2*P} = ${P}\\left(1 + \\frac{${r_nominal}}{400}\\right)^{4t} \\implies 2 = \\left(1 + \\frac{${r_nominal}}{400}\\right)^{4t}$.<br>
        &nbsp;&nbsp;&nbsp;ii. $4t = \\frac{\\ln(2)}{\\ln(1 + ${i_periodo.toFixed(5)})} \\implies t = ${(anios_duplicar).toFixed(2)}$ años. Por lo tanto, se requieren <b>${anios_enteros} años completos</b> (o ${Math.ceil(anios_duplicar * 4)} trimestres).<br><br>

        <b>2. Progresión Aritmética:</b><br>
        * a) $u_7 - u_4 = (u_1 + 6d) - (u_1 + 3d) = 3d \\implies 3d = ${u7_arit} - ${u4_arit} = ${u7_arit - u4_arit} \\implies d = ${d_arit}$.<br>
        &nbsp;&nbsp;&nbsp;Primer término: $u_1 = u_4 - 3d = ${u4_arit} - 3(${d_arit}) = ${u1_arit}$.<br>
        * b) Suma $S_{20} = \\frac{20}{2}[2(${u1_arit}) + 19(${d_arit})] = 10[${2*u1_arit} + ${19*d_arit}] = 10(${2*u1_arit + 19*d_arit}) =$ <b>${S20}</b>.<br><br>

        <b>3. Progresión Geométrica:</b><br>
        * a) Por definición de razón común: $\\frac{x + ${m_geom}}{x} = \\frac{4x}{x + ${m_geom}} \\implies (x + ${m_geom})^2 = 4x^2$.<br>
        &nbsp;&nbsp;&nbsp;$x^2 + ${2*m_geom}x + ${m_geom * m_geom} = 4x^2 \\implies 3x^2 - ${2*m_geom}x - ${m_geom * m_geom} = 0$.<br>
        &nbsp;&nbsp;&nbsp;Factorizando: $(3x + ${m_geom})(x - ${m_geom}) = 0$. Dado que los términos son positivos, <b>$x = ${x_sol}</b>$.<br>
        * b) Términos: $u_1 = ${g1}$, $u_2 = ${g2}$, $u_3 = ${g3} \\implies r = \\frac{${g2}}{${g1}} = ${r_sol}$.<br>
        &nbsp;&nbsp;&nbsp;Décimo término: $u_{10} = u_1 r^9 = ${g1} \\cdot (${r_sol})^9 = ${g1} \\cdot 512 =$ <b>${u10_geom}</b>.
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
