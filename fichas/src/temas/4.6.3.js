import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Probabilidad Experimental e Histogramas";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("4.6.3", "4. Estadística y probabilidad", "Ficha: Probabilidad Experimental e Histogramas");

    html += `
    <style>
        .FT_ol_i { counter-reset: subitem; padding-left: 20px; margin-top: 5px; }
        .FT_ol_i li { list-style: none; counter-increment: subitem; margin-bottom: 5px; }
        .FT_ol_i li::before { content: '(' counter(subitem, lower-roman) ') '; font-weight: bold; margin-right: 5px; }
    </style>
    `;

    // ==========================================
    // EJERCICIO 1: TABLA DE FRECUENCIAS Y PROBABILIDADES
    // ==========================================
    const f1 = Math.floor(Math.random() * 8) + 12; // 12 a 19
    const f2 = Math.floor(Math.random() * 15) + 30; // 30 a 44
    const f3 = Math.floor(Math.random() * 10) + 15; // 15 a 24
    const f4 = Math.floor(Math.random() * 5) + 3;  // 3 a 7
    const total1 = f1 + f2 + f3 + f4;

    const probA = (f2 / total1).toFixed(3);
    const probB = (f4 / total1).toFixed(3);
    const probC = ((f2 + f3) / total1).toFixed(3);

    // ==========================================
    // EJERCICIO 2: HISTOGRAMA DE LLAMADAS DIARIAS
    // ==========================================
    const f_calls = [
        Math.floor(Math.random() * 3) + 1,  // 0
        Math.floor(Math.random() * 4) + 5,  // 1
        Math.floor(Math.random() * 4) + 9,  // 2
        Math.floor(Math.random() * 4) + 6,  // 3
        Math.floor(Math.random() * 4) + 5,  // 4
        Math.floor(Math.random() * 3) + 3,  // 5
        Math.floor(Math.random() * 3) + 1,  // 6
        0,                                 // 7
        1                                  // 8
    ];
    const total2 = f_calls.reduce((a, b) => a + b, 0);

    const f_c_0 = f_calls[0];
    const f_c_ge5 = f_calls[5] + f_calls[6] + f_calls[7] + f_calls[8];
    const f_c_lt3 = f_calls[0] + f_calls[1] + f_calls[2];

    const prob2_i = (f_c_0 / total2).toFixed(3);
    const prob2_ii = (f_c_ge5 / total2).toFixed(3);
    const prob2_iii = (f_c_lt3 / total2).toFixed(3);

    const max_f = Math.max(...f_calls);
    const ylim_max = Math.ceil((max_f + 1) / 2) * 2;

    html += `
    <div class="seccion-title">I. Tabla de Frecuencias y Probabilidad Empírica</div>
    <div class="exercise-step">
        <p><strong>1.</strong> Un estudio de medios registró la duración de una muestra aleatoria de comerciales de televisión durante el horario estelar, obteniendo los siguientes resultados:</p>
        
        <div style="display: flex; justify-content: center; margin: 15px 0;">
            <table style="border-collapse: collapse; border: 1px solid #999; font-size: 0.9em; min-width: 400px; text-align: center;">
                <thead>
                    <tr style="background-color: #f2f2f2;">
                        <th style="border: 1px solid #ccc; padding: 6px;">Duración (segundos)</th>
                        <th style="border: 1px solid #ccc; padding: 6px;">Frecuencia absoluta</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border: 1px solid #ccc; padding: 6px;">$0$ a $19$</td>
                        <td style="border: 1px solid #ccc; padding: 6px;">${f1}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ccc; padding: 6px;">$20$ a $39$</td>
                        <td style="border: 1px solid #ccc; padding: 6px;">${f2}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ccc; padding: 6px;">$40$ a $59$</td>
                        <td style="border: 1px solid #ccc; padding: 6px;">${f3}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ccc; padding: 6px;">$60$ o más</td>
                        <td style="border: 1px solid #ccc; padding: 6px;">${f4}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p>A partir de estos datos, determine la probabilidad experimental de que un comercial elegido al azar:</p>
        <ol class="FT_ol_a">
            <li>Tenga una duración de entre $20$ y $39$ segundos. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>Dure al menos un minuto ($60$ segundos o más). <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>Dure entre $20$ y $59$ segundos inclusive. <span class="mark">3</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="page-break"></div>

    <div class="seccion-title">II. Histogramas y Distribuciones de Frecuencia</div>
    <div class="exercise-step">
        <p><strong>2.</strong> Se registró el número de llamadas telefónicas recibidas en una oficina durante un período de días consecutivos. El siguiente histograma resume los resultados:</p>

        <div style="display: flex; justify-content: center; margin: 20px 0;">
            <tlacuache-ejes size="240,420" xlim="-1, 9" ylim="0, ${ylim_max}" dx="1" dy="2" xlabel="Número de llamadas recibidas" ylabel="Frecuencia (días)" grid="true">
                <tlacuache-histograma inicio="0" paso="1" frecuencias="${f_calls.join(',')}" fill="#b2f2bb" stroke="#2b8a3e" lineWidth="1.5"></tlacuache-histograma>
            </tlacuache-ejes>
        </div>

        <ol class="FT_ol_a">
            <li>Determine el número total de días que duró el registro. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>Calcule la probabilidad de que en un día seleccionado al azar:
                <ol class="FT_ol_i">
                    <li>No se reciba ninguna llamada telefónica. <span class="mark">2</span>
                        <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
                    </li>
                    <li>Se reciban $5$ o más llamadas telefónicas. <span class="mark">2</span>
                        <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
                    </li>
                    <li>Se reciban menos de $3$ llamadas telefónicas. <span class="mark">2</span>
                        <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
                    </li>
                </ol>
            </li>
        </ol>
    </div>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 4.6.3 (Probabilidad Experimental e Histogramas):</b><br><br>

        <b>1. Comerciales: Total = ${total1}</b><br>
        * a) $P(20-39) = \\frac{${f2}}{${total1}} \\approx $ <b>${probA}</b><br>
        * b) $P(\\geq 60) = \\frac{${f4}}{${total1}} \\approx $ <b>${probB}</b><br>
        * c) $P(20-59) = \\frac{${f2} + ${f3}}{${total1}} = \\frac{${f2 + f3}}{${total1}} \\approx $ <b>${probC}</b><br><br>

        <b>2. Histograma de Llamadas: Total de días = ${total2}</b><br>
        * a) Total de días $= ${f_calls.filter(x => x > 0).join(' + ')} = $ <b>${total2} días</b><br>
        * b) Probabilidades:<br>
        &nbsp;&nbsp;i. $P(X = 0) = \\frac{${f_c_0}}{${total2}} \\approx $ <b>${prob2_i}</b><br>
        &nbsp;&nbsp;ii. $P(X \\geq 5) = \\frac{${f_calls[5]} + ${f_calls[6]} + ${f_calls[7]} + ${f_calls[8]}}{${total2}} = \\frac{${f_c_ge5}}{${total2}} \\approx $ <b>${prob2_ii}</b><br>
        &nbsp;&nbsp;iii. $P(X < 3) = \\frac{${f_calls[0]} + ${f_calls[1]} + ${f_calls[2]}}{${total2}} = \\frac{${f_c_lt3}}{${total2}} \\approx $ <b>${prob2_iii}</b>
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
