import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

/* 
 * Fuente original: [84].pdf
 * Módulo de práctica: Probabilidad básica - Experimentos con monedas
 */

export function name() {
    return 'Probabilidad y Experimentos Aleatorios';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Parámetros dinámicos
    const numMonedas = 3;
    const trials = 80;

    let Pregunta = `<div class="problema2"><h3>Probabilidad y Coin Tossing (Experimentos)</h3>
    <p>Un estudiante realiza un experimento lanzando 3 monedas al aire simultáneamente ${trials} veces.</p>
    
    <ol class="FT_ol_a">
        <li><b>Espacio muestral:</b> Escriba todos los resultados posibles del experimento (ej: CCC, CCX...). ¿Cuántos elementos tiene el espacio muestral? <div>3</div></li>${CR(4)}
        
        <li><b>Probabilidad teórica:</b> Calcule la probabilidad teórica de obtener:
            <ul>
                <li>i) Exactamente 2 caras: </li>
                <li>ii) Al menos 2 caras: </li>
            </ul><div>4</div></li>${CR(3)}

        <li><b>Simulación y Frecuencia:</b> Imagine que al realizar los ${trials} lanzamientos, usted obtuvo los siguientes resultados:
        <br><br>
        <table border="1" style="width:80%; text-align:center; margin:auto;">
            <tr><th>Resultado</th><th>Frecuencia observada</th></tr>
            <tr><td>3 caras</td><td>${Math.floor(trials * 0.125) + 2}</td></tr>
            <tr><td>2 caras</td><td>${Math.floor(trials * 0.375) + 3}</td></tr>
            <tr><td>1 cara</td><td>${Math.floor(trials * 0.375) - 3}</td></tr>
            <tr><td>0 caras</td><td>${Math.floor(trials * 0.125) - 2}</td></tr>
        </table>
        <br>
        Calcule la frecuencia relativa de obtener "2 caras" y compare con la probabilidad teórica calculada en el inciso anterior. ¿Por qué difieren?<div>4</div></li>${CR(6)}
    </ol>
    </div>`;

    let Solucion = `<div class="ans"><b>Solución:</b><br>
    (1) Espacio muestral: {CCC, CCX, CXC, XCC, CXX, XCX, XXC, XXX}. Total = 8.<br>
    (2) i) $P(2\\text{ caras}) = 3/8 = 0.375$. ii) $P(\\text{al menos 2}) = 4/8 = 0.5$.<br>
    (3) La frecuencia relativa observada se obtiene dividiendo la frecuencia entre ${trials}. La diferencia se debe a la variabilidad natural de los experimentos aleatorios (Ley de los grandes números).</div><br>`;

    // --- Problema adicional de probabilidad geométrica simple ---
    Pregunta += `<div class="problema2">4.- Considere un spinner (ruleta) con secciones numeradas del 1 al 8.
    <ol class="FT_ol_a">
        <li>Si el spinner es simétrico, ¿cuál es la probabilidad de obtener un número primo? <div>2</div></li>${CR(2)}
        <li>Si se gira el spinner 160 veces, ¿cuántas veces esperaría usted obtener un número mayor a 5? <div>2</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P4:</b> (4a) Números primos: {2, 3, 5, 7} $\\Rightarrow P = 4/8 = 0.5$. (4b) $P(x > 5) = 3/8$. Esperanza = $160 \\times 0.375 = 60$ veces.</div>`;

    return [Pregunta, Solucion];
}