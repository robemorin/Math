/* 
 * Ficha de práctica: Sucesiones y series geométricas (Fractales)
 * Fuente original: [24].pdf (Actividad 3: Von Koch's Snowflake Curve)
 * IB Math AA/AI - Nivel Medio
 */

import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'La Curva de Von Koch y Series Geométricas';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    let p_inicial = 3; // Perímetro inicial C1
    let a_inicial = 1; // Área inicial C1
    
    // Problema 1: Perímetro
    let Pregunta = `<div class="problema">
    <h3>1.- El Copo de Nieve de Koch (Perímetro)</h3>
    <p>Considerando que en cada paso $n$, cada segmento de recta se divide en 3 partes y se sustituye la sección central por dos lados de un triángulo equilátero, de modo que 1 segmento se convierte en 4.</p>
    <ol class="FT_ol_a">
        <li>Si el perímetro de $C_1$ es ${p_inicial}$ unidades, halle el perímetro de $C_2, C_3$ y $C_4$. <div>3</div></li>${CR(3)}
        <li>Escriba una expresión para el perímetro de $C_n$. ¿Qué sucede con el perímetro cuando $n \\to \\infty$? <div>3</div></li>${CR(3)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (1a) $P_2 = 3(\\frac{4}{3}) = 4, P_3 = 3(\\frac{16}{9}) = \\frac{16}{3}, P_4 = 3(\\frac{64}{27}) = \\frac{64}{9}$. (1b) $P_n = 3(\\frac{4}{3})^{n-1}$. El perímetro tiende a infinito.</div><br>`;

    // Problema 2: Área
    Pregunta += `<div class="problema">
    <h3>2.- El Copo de Nieve de Koch (Área)</h3>
    <p>Si el área de $C_1$ es $1$ unidad$^2$. El área de $C_n$ sigue la fórmula: $A_n = 1 + \\frac{1}{3} \\sum_{k=0}^{n-2} (\\frac{4}{9})^k$.</p>
    <ol class="FT_ol_a">
        <li>Calcule el área de $C_2$ y $C_3$. <div>2</div></li>${CR(3)}
        <li>Utilizando la fórmula de la suma de una serie geométrica infinita, halle el área límite del copo de nieve cuando $n \\to \\infty$. <div>4</div></li>${CR(5)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> (2a) $A_2 = 1.333, A_3 = 1 + \\frac{1}{3}(1 + \\frac{4}{9}) = 1.481$. (2b) $A_{\\infty} = 1 + \\frac{1/3}{1 - 4/9} = 1 + \\frac{1/3}{5/9} = 1 + 0.6 = 1.6$ unidades$^2$.</div><br>`;

    // Problema 3: Reflexión conceptual
    Pregunta += `<div class="problema">
    <h3>3.- Análisis crítico</h3>
    <p>¿Qué es notable respecto a los resultados obtenidos en las preguntas 1 y 2? Explique cómo una figura puede tener perímetro infinito pero área finita. <div>4</div></p>${CR(6)}
    </div><div class="page"></div>`;

    Solucion += `<div class="ans"><b>P3:</b> La paradoja del fractal: aunque la frontera se vuelve infinitamente larga, esta se "pliega" sobre un área acotada, resultando en un valor finito.</div>`;

    return [Pregunta, Solucion];
}