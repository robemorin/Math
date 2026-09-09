import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Modelos Financieros y Sucesiones Contextualizadas (IB AI NM)";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("1.4.10", "1. Número y álgebra", "Ficha: Modelos Financieros y Sucesiones Contextualizadas (IB AI NM)");

    html += `
    <style>
        .FT_ol_i { counter-reset: subitem; padding-left: 20px; margin-top: 5px; }
        .FT_ol_i li { list-style: none; counter-increment: subitem; margin-bottom: 5px; }
        .FT_ol_i li::before { content: '(' counter(subitem, lower-roman) ') '; font-weight: bold; margin-right: 5px; }
    </style>
    `;

    // ==========================================================
    // EJERCICIO 1 (CUARTILLA 1): FINANZAS E INTERÉS COMPUESTO (IB AI NM)
    // Variación aleatoria de periodos: mensual, bimestral, trimestral, cuatrimestral, semestral
    // ==========================================================
    const capitalizaciones = [
        { nombre: "mensual", nombre_adv: "mensualmente", k: 12, adjetivo: "meses" },
        { nombre: "bimestral", nombre_adv: "bimestralmente", k: 6, adjetivo: "bimestres" },
        { nombre: "trimestral", nombre_adv: "trimestralmente", k: 4, adjetivo: "trimestres" },
        { nombre: "cuatrimestral", nombre_adv: "cuatrimestralmente", k: 3, adjetivo: "cuatrimestres" },
        { nombre: "semestral", nombre_adv: "semestralmente", k: 2, adjetivo: "semestres" }
    ];

    const sel_cap = capitalizaciones[Math.floor(Math.random() * capitalizaciones.length)];
    const k_capitalizaciones = sel_cap.k;
    const nombre_cap = sel_cap.nombre;
    const nombre_adv = sel_cap.nombre_adv;

    const P = (Math.floor(Math.random() * 6) + 4) * 1000; // 4000, 5000, 6000, 7000, 8000, 9000 USD
    const r_nominal = (Math.floor(Math.random() * 6) * 0.3 + 4.2).toFixed(1); // 4.2, 4.5, 4.8, 5.1, 5.4, 5.7
    const t_anios = Math.floor(Math.random() * 3) + 5; // 5, 6, 7 años
    const total_periodos = k_capitalizaciones * t_anios;

    // Cálculo usando tlacu.financiera(N, I, PV, PMT, FV, PY, CY)
    // En tlacu.financiera: para calcular FV pasamos FV=null, N=total_periodos, I=r_nominal, PV=P, PMT=0, PY=k, CY=k
    const FV_calc = tlacu.financiera(total_periodos, parseFloat(r_nominal), P, 0, null, k_capitalizaciones, k_capitalizaciones);
    const FV = typeof FV_calc === 'number' ? FV_calc : P * Math.pow(1 + (parseFloat(r_nominal) / 100) / k_capitalizaciones, total_periodos);
    const intereses_ganados = FV - P;

    // Años para duplicar usando tlacu.financiera(null, I, PV, PMT, FV, PY, CY)
    const n_duplicar_calc = tlacu.financiera(null, parseFloat(r_nominal), P, 0, 2 * P, k_capitalizaciones, k_capitalizaciones);
    const n_periodos_duplicar = typeof n_duplicar_calc === 'number' ? n_duplicar_calc : (Math.log(2) / Math.log(1 + (parseFloat(r_nominal) / 100) / k_capitalizaciones));
    const anios_duplicar = n_periodos_duplicar / k_capitalizaciones;
    const anios_enteros = Math.ceil(anios_duplicar);

    html += `
    <div class="seccion-title">I. Modelización Financiera: Interés Compuesto y Calculadora de Pantalla Gráfica</div>
    <div class="exercise-step">
        <p><strong>1.</strong> Carlos deposita un capital inicial de $${P}$ USD en una cuenta bancaria que devenga un interés nominal anual del $${r_nominal}\\%$, con capitalización <strong>${nombre_cap}</strong> (${nombre_adv}).</p>

        <ol class="FT_ol_a">
            <li>
                Escriba el número de periodos de capitalización por año ($k$) y calcule la tasa de interés periódica efectiva correspondiente a cada período de capitalización. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Calcule el valor futuro acumulado ($FV$) en la cuenta al cabo de $${t_anios}$ años. Dé su respuesta redondeada a $2$ cifras decimales. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Determine la cantidad total generada exclusivamente por concepto de intereses al finalizar los $${t_anios}$ años. <span class="mark">1</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Carlos tiene como meta financiera que el saldo total alcance al menos el doble del depósito inicial.
                <ol class="FT_ol_i">
                    <li>Indique claramente el método o los valores de las variables financieras que utilizará para resolver esta situación (ya sea planteando una ecuación exponencial o indicando los parámetros $N$, $I\\%$, $PV$, $PMT$, $FV$, $P/Y$, $C/Y$ de su calculadora de pantalla gráfica). <span class="mark">2</span>
                        <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
                    </li>
                    <li>Calcule el número mínimo de <strong>años completos</strong> que deben transcurrir para alcanzar o superar dicha meta. <span class="mark">2</span>
                        <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
                    </li>
                </ol>
            </li>
        </ol>
        ${ai.getTiTip(`Puede resolver mediante la fórmula de interés compuesto del cuadernillo o utilizando la aplicación financiera (<code>TVM Solver</code>) de su calculadora gráfica.`)}
    </div>

    <div class="page-break"></div>

    <div class="seccion-title">II. Progresiones Aritméticas y Geométricas en Contextos Reales</div>
    <div class="exercise-step">
    `;

    // ==========================================================
    // EJERCICIO 2 (CUARTILLA 2): SUCESIÓN ARITMÉTICA CONTEXTUALIZADA
    // Contexto: Un plan de entrenamiento progresivo
    // ==========================================================
    const u1_arit = (Math.floor(Math.random() * 4) + 3) * 5; // 15, 20, 25, 30 km
    const d_arit = (Math.floor(Math.random() * 3) + 2) * 2; // 4, 6, 8 km
    const semana_target = Math.floor(Math.random() * 3) + 10; // semana 10, 11, 12
    const u_target = u1_arit + (semana_target - 1) * d_arit;
    const semanas_totales = 16;
    const S_total_arit = (semanas_totales / 2) * (2 * u1_arit + (semanas_totales - 1) * d_arit);

    // ==========================================================
    // EJERCICIO 3 (CUARTILLA 2): SUCESIÓN GEOMÉTRICA CONTEXTUALIZADA
    // Contexto: Crecimiento de suscriptores en plataforma
    // ==========================================================
    const anio_inicio = 2024;
    const u1_geom = (Math.floor(Math.random() * 4) + 5) * 500; // 2500, 3000, 3500, 4000
    const tasa_crec = Math.floor(Math.random() * 4) + 6; // 6%, 7%, 8%, 9%
    const r_geom = 1 + tasa_crec / 100;
    const n_anios_geom = 6; // Año 6
    const un_geom = u1_geom * Math.pow(r_geom, n_anios_geom - 1);
    const S_geom = u1_geom * (Math.pow(r_geom, n_anios_geom) - 1) / (r_geom - 1);

    html += `
        <p><strong>2.</strong> Sofía diseña un plan de entrenamiento para una maratón. Durante la primera semana corre $${u1_arit}\\text{ km}$, y cada semana sucesiva incrementa la distancia recorrida en una cantidad constante de $${d_arit}\\text{ km}$.</p>
        <ol class="FT_ol_a">
            <li>
                Escriba una expresión para la distancia $u_n$ recorrida en la semana $n$. <span class="mark">1</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Halle la distancia que recorrerá Sofía durante la <strong>semana ${semana_target}</strong>. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Calcule la distancia total acumulada que Sofía habrá corrido al cabo de las primeras $${semanas_totales}$ semanas del programa. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>

        <p style="margin-top: 20px;"><strong>3.</strong> Una empresa de tecnología registró $${u1_geom}$ suscriptores activos durante su primer año de operación (${anio_inicio}). La directiva proyecta que el número de suscriptores aumentará a una tasa constante del $${tasa_crec}\\%$ cada año.</p>
        <ol class="FT_ol_a">
            <li>
                Indique el valor de la razón común $r$ del modelo geométrico. <span class="mark">1</span>
                <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Estime el número de suscriptores que se registrarán durante el <strong>${n_anios_geom}.º año</strong> de operación (${anio_inicio + n_anios_geom - 1}). Dé su respuesta con una precisión de 3 cifras significativas. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Calcule el número total acumulado de suscripciones durante los primeros $${n_anios_geom}$ años de funcionamiento de la empresa. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    </div>
    <div class="page-break"></div>
    `;

    // ==========================================================
    // CÁLCULOS DEL SOLUCIONARIO
    // ==========================================================
    const un_geom_3cs = Number(un_geom.toPrecision(3));
    const S_geom_3cs = Number(S_geom.toPrecision(3));

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem; line-height: 1.4;">
        <b>Solucionario 1.4.10 (Modelos Financieros y Sucesiones Contextualizadas - IB AI NM):</b><br><br>

        <b>1. Interés Compuesto (${nombre_cap}, $k = ${k_capitalizaciones}$):</b><br>
        * a) Periodos por año: <b>$k = ${k_capitalizaciones}$</b>.<br>
        &nbsp;&nbsp;&nbsp;Tasa periódica efectiva: $i = \\frac{r}{k} = \\frac{${r_nominal}\\%}{${k_capitalizaciones}} = $ <b>${(parseFloat(r_nominal)/k_capitalizaciones).toFixed(4)}\\%$ por período</b> (o ${(parseFloat(r_nominal)/(100*k_capitalizaciones)).toFixed(6)} en decimal).<br>
        * b) Para $t = ${t_anios}$ años ($N = ${total_periodos}$ periodos):<br>
        &nbsp;&nbsp;&nbsp;• <i>Fórmula:</i> $FV = PV\\left(1 + \\frac{r}{100k}\\right)^{kn} = ${P}\\left(1 + \\frac{${r_nominal}}{${k_capitalizaciones * 100}}\\right)^{${total_periodos}} \\approx $ <b>$${FV.toFixed(2)} USD</b>.<br>
        &nbsp;&nbsp;&nbsp;• <i>Calculadora (TVM Solver):</i> $N = ${total_periodos}$, $I\\% = ${r_nominal}$, $PV = -${P}$, $PMT = 0$, $P/Y = ${k_capitalizaciones}$, $C/Y = ${k_capitalizaciones} \\implies FV =$ <b>$${FV.toFixed(2)} USD</b>.<br>
        * c) Intereses generados: $I = FV - PV = ${FV.toFixed(2)} - ${P} = $ <b>$${intereses_ganados.toFixed(2)} USD</b>.<br>
        * d) i. Método de resolución para duplicar ($FV = ${2*P}$ USD):<br>
        &nbsp;&nbsp;&nbsp;• <i>Opción Algebraica/Ecuación:</i> ${2*P} = ${P}\\left(1 + \\frac{${r_nominal}}{${k_capitalizaciones * 100}}\\right)^{${k_capitalizaciones}t} \\implies 2 = \\left(1 + \\frac{${r_nominal}}{${k_capitalizaciones * 100}}\\right)^{${k_capitalizaciones}t}$.<br>
        &nbsp;&nbsp;&nbsp;• <i>Opción Calculadora (TVM Solver):</i> $I\\% = ${r_nominal}$, $PV = -${P}$, $PMT = 0$, $FV = ${2 * P}$, $P/Y = ${k_capitalizaciones}$, $C/Y = ${k_capitalizaciones} \\implies N = ${(n_periodos_duplicar).toFixed(2)}$ ${sel_cap.adjetivo}.<br>
        &nbsp;&nbsp;&nbsp;ii. Tiempo en años: $t = \\frac{N}{k} = \\frac{${(n_periodos_duplicar).toFixed(2)}}{${k_capitalizaciones}} \\approx ${(anios_duplicar).toFixed(2)}$ años. Se requieren <b>${anios_enteros} años completos</b> (o ${Math.ceil(n_periodos_duplicar)} ${sel_cap.adjetivo}) para duplicar el capital.<br><br>

        <b>2. Progresión Aritmética (Entrenamiento):</b><br>
        * a) Término general: $u_n = u_1 + (n - 1)d = ${u1_arit} + (n - 1)(${d_arit}) = ${d_arit}n + ${u1_arit - d_arit}$.<br>
        * b) Para $n = ${semana_target}$: $u_{${semana_target}} = ${u1_arit} + (${semana_target - 1})(${d_arit}) = ${u1_arit} + ${(semana_target - 1) * d_arit} = $ <b>${u_target} km</b>.<br>
        * c) Suma de las primeras ${semanas_totales} semanas:<br>
        &nbsp;&nbsp;&nbsp;$S_{${semanas_totales}} = \\frac{${semanas_totales}}{2}[2(${u1_arit}) + (${semanas_totales} - 1)(${d_arit})] = ${semanas_totales / 2}[${2 * u1_arit} + ${(semanas_totales - 1) * d_arit}] = ${semanas_totales / 2}(${2 * u1_arit + (semanas_totales - 1) * d_arit}) = $ <b>${S_total_arit} km</b>.<br><br>

        <b>3. Progresión Geométrica (Crecimiento de Suscriptores):</b><br>
        * a) Razón común: $r = 1 + \\frac{${tasa_crec}}{100} = $ <b>${r_geom}</b>.<br>
        * b) Suscriptores en el ${n_anios_geom}.º año ($u_{${n_anios_geom}}$):<br>
        &nbsp;&nbsp;&nbsp;$u_{${n_anios_geom}} = u_1 r^{${n_anios_geom - 1}} = ${u1_geom} \\times (${r_geom})^{${n_anios_geom - 1}} \\approx ${(un_geom).toFixed(2)} \\approx $ <b>${un_geom_3cs} suscriptores</b> (3 c.s.).<br>
        * c) Total acumulado ($S_{${n_anios_geom}}$):<br>
        &nbsp;&nbsp;&nbsp;$S_{${n_anios_geom}} = \\frac{${u1_geom}((${r_geom})^{${n_anios_geom}} - 1)}{${r_geom} - 1} \\approx ${(S_geom).toFixed(2)} \\approx $ <b>${S_geom_3cs} suscriptores</b> (3 c.s.).
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
