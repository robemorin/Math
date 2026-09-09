import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Interpretación y Modelación Trigonométrica (Rumbos)";
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("3.4.4", "3. Geometría y trigonometría", "Ficha: Interpretación y Modelación Trigonométrica (Rumbos)");

    const d1 = Math.floor(Math.random() * 3) + 3; // 3, 4, 5 km
    const d2 = d1 + Math.floor(Math.random() * 3) + 1; // e.g. 5 a 8 km
    
    const beta1 = 40; 
    const beta2 = 150; 
    const alpha = 70; 
    const alpha_rad = alpha * Math.PI / 180;
    
    const dE2 = d1*d1 + d2*d2 - 2*d1*d2*Math.cos(alpha_rad);
    const dE = Math.sqrt(dE2);
    
    const sin_gamma = d2 * Math.sin(alpha_rad) / dE;
    const gamma_rad = Math.asin(sin_gamma);
    const gamma = gamma_rad * 180 / Math.PI;
    
    const rumboE = beta1 + gamma;
    
    const v_ritva = 5; 
    const v_esko = 3; 
    
    const dist_ritva = d1 + d2;
    const t_ritva = dist_ritva / v_ritva; 
    const t_esko = dE / v_esko; 
    
    const ritva_first = t_ritva < t_esko;
    const primer_llegar = ritva_first ? "Ritva" : "Esko";
    const segundo_llegar = ritva_first ? "Esko" : "Ritva";
    const t_espera = Math.abs(t_ritva - t_esko) * 60; 

    html += `
    <div class="seccion-title">I. Excursión y Rumbos</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            <strong>Contexto:</strong> Dos excursionistas, Ritva y Esko, parten del mismo punto de origen $P$ al mismo tiempo. 
            Ritva camina $${d1}\\text{ km}$ con un rumbo de $040^\\circ$ (respecto al norte), y luego camina otros $${d2}\\text{ km}$ con un rumbo de $150^\\circ$ para llegar al campamento. 
            Esko camina hacia el campamento en línea recta directamente desde el punto de origen $P$.
        </div>

        <ol class="FT_ol_a">
            <li>
                Dibuje un diagrama claro y rotulado que represente la situación descrita, indicando los puntos $P$, el punto de giro de Ritva, el campamento, las distancias y los ángulos de rumbo correspondientes. <span class="mark">2</span>
                <div style="border: 2px dashed #999; height: 280px; border-radius: 6px; background-color: #fafafa; margin-top: 10px; margin-bottom: 20px;"></div>
            </li>
            <li>
                Calcule la distancia total que camina Esko directamente desde $P$ hasta el campamento. <span class="mark">3</span>
                <tlacuache-renglon n="8" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    <div class="page-break"></div>
    <div class="seccion-title">I. Excursión y Rumbos (Continuación)</div>
    <div class="exercise-step">
        <ol class="FT_ol_a" start="3">
            <li>
                Determine el rumbo exacto (en grados) en el que camina Esko desde el punto $P$. <span class="mark">3</span>
                <tlacuache-renglon n="8" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Ritva camina a una velocidad promedio de $5\\text{ km h}^{-1}$ y Esko camina a una velocidad promedio de $3\\text{ km h}^{-1}$.
                <ol class="FT_ol_i">
                    <li>Halle cuál de los dos excursionistas llegará primero al campamento. <span class="mark">1</span><tlacuache-renglon n="4" color="#f9f9f9"></tlacuache-renglon></li>
                    <li>Calcule la cantidad de minutos que la primera persona en llegar debe esperar a la segunda. <span class="mark">1</span><tlacuache-renglon n="4" color="#f9f9f9"></tlacuache-renglon></li>
                </ol>
            </li>
        </ol>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 3.4.4:</b><br><br>
        <b>a) Diagrama de vectores y rumbos [2 puntos]:</b><br>
        * Dibujo correcto de la trayectoria con el origen en $P$. [1 punto]<br>
        * Indicación correcta de los rumbos $040^\\circ$ y $150^\\circ$ y las longitudes correspondientes ($${d1}\\text{ km}$ y $${d2}\\text{ km}$). [1 punto]<br><br>

        <b>b) Distancia de Esko ($d_E$) [3 puntos]:</b><br>
        * Ángulo interior en el vértice de giro ($Q$): El ángulo exterior es $150^\\circ - 40^\\circ = 110^\\circ$. El ángulo interior es $180^\\circ - 110^\\circ = 70^\\circ$. [1 punto]<br>
        * Ley del Coseno: $d_E^2 = ${d1}^2 + ${d2}^2 - 2(${d1})(${d2})\\cos(70^\\circ)$<br>
        $d_E^2 = ${d1*d1 + d2*d2} - ${2*d1*d2} \\cdot \\cos(70^\\circ) = ${dE2.toFixed(2)}$ [1 punto]<br>
        $d_E = \\mathbf{${dE.toFixed(2)}\\text{ km}}$ [1 punto]<br><br>

        <b>c) Rumbo de Esko [3 puntos]:</b><br>
        * Ley del Seno para hallar el ángulo interior en $P$ ($\\theta$):<br>
        $\\frac{\\sin \\theta}{${d2}} = \\frac{\\sin(70^\\circ)}{${dE.toFixed(2)}} \\implies \\sin \\theta = \\frac{${d2} \\cdot \\sin(70^\\circ)}{${dE.toFixed(2)}} \\approx ${sin_gamma.toFixed(4)}$ [1 punto]<br>
        $\\theta = \\arcsin(${sin_gamma.toFixed(4)}) \\approx ${gamma.toFixed(1)}^\\circ$ [1 punto]<br>
        * Rumbo final = $40^\\circ + ${gamma.toFixed(1)}^\\circ = \\mathbf{${rumboE.toFixed(1)}^\\circ}$ [1 punto]<br><br>

        <b>d) Tiempos y velocidades [2 puntos]:</b><br>
        * <b>i.</b> Tiempo Ritva = $\\frac{${dist_ritva}}{5} = ${t_ritva.toFixed(2)}\\text{ horas}$.<br>
        Tiempo Esko = $\\frac{${dE.toFixed(2)}}{3} = ${t_esko.toFixed(2)}\\text{ horas}$.<br>
        Llega primero **${primer_llegar}**. [1 punto]<br>
        * <b>ii.</b> Diferencia en minutos: $|${t_esko.toFixed(2)} - ${t_ritva.toFixed(2)}| \\times 60 \\approx \\mathbf{${t_espera.toFixed(1)}\\text{ minutos}}$. [1 punto]
    </div>
    `;

    return [html, solucion];
}
