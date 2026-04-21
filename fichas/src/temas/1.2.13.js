import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

// Fuente original: [21].pdf - Sucesiones y series aritméticas
export function name() {
    return 'Práctica de Sucesiones y Series Aritméticas';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<div style='height: 30px; border-bottom: 1px dashed #ccc;'></div>";
    return s;
}

export async function pregunta() {
    // Variables aleatorias para dinamismo
    let a1 = Math.floor(Math.random() * 5) + 3; // u1
    let d = Math.floor(Math.random() * 4) + 2;  // diferencia
    let n = 15;
    let Sn = (n / 2) * (2 * a1 + (n - 1) * d);

    let Pregunta = `<div class="problema2">
    <h3>Evaluación de Sucesiones Aritméticas (Tiempo estimado: 40 min)</h3>
    
    <div class="problema2">1.- Dada una sucesión aritmética con primer término $u_1 = ${a1}$ y diferencia común $d = ${d}$.
    <ol class="FT_ol_a">
        <li>Determine el décimo término de la sucesión ($u_{10}$). <div>2</div></li>${CR(1)}
        <li>Halle la suma de los primeros ${n} términos ($S_{${n}}$). <div>3</div></li>${CR(1)}
    </ol></div>

    <div class="problema2">2.- Considere la sucesión $u_n = ${a1 + d} + ${d}(n-1)$.
    <ol class="FT_ol_a">
        <li>Identifique el primer término y la diferencia común. <div>2</div></li>${CR(1)}
        <li>¿Cuántos términos son necesarios para que la suma supere los 1000? <div>4</div></li>${CR(2)}
    </ol></div>

    <div class="problema2">3.- Tres términos consecutivos de una sucesión aritmética suman 24 y su producto es 440. 
    <br><i>Sugerencia: Use los términos $(x-d), x, (x+d)$.</i>
    <ol class="FT_ol_a">
        <li>Planteé el sistema de ecuaciones y halle los términos. <div>6</div></li>${CR(4)}
    </ol></div>

    <div class="problema2">4.- Modelización: El diseño de un estadio sigue una progresión aritmética en sus filas. Si la fila 1 tiene 20 asientos y la diferencia entre filas consecutivas es de 4 asientos:
    <ol class="FT_ol_a">
        <li>¿Cuántos asientos hay en la fila 15? <div>2</div></li>${CR(1)}
        <li>Si el estadio tiene 20 filas, ¿cuál es la capacidad total? <div>3</div></li>${CR(1)}
    </ol></div>
    
    <div class="page"></div>
    <div class="problema2">5.- Análisis gráfico de una progresión:
    <br>A continuación se representa la relación entre el número de término ($n$) y el valor ($u_n$):
    <br><center><tlacuache-ejes size="300,300" xlim="0,10" ylim="0,30" dx="1" dy="5">
        <tlacuache-plot x="1,2,3,4,5" y="${a1}, ${a1+d}, ${a1+2*d}, ${a1+3*d}, ${a1+4*d}" mark="o" color="blue"></tlacuache-plot>
    </tlacuache-ejes></center>
    <ol class="FT_ol_a">
        <li>Explique por qué los puntos están alineados. <div>2</div></li>${CR(2)}
        <li>Determine la pendiente de la recta que une estos puntos y relaciónela con $d$. <div>3</div></li>${CR(2)}
    </ol></div>
    </div>`;

    let Solucion = `<div class="ans">
    <b>Solucionario:</b><br>
    P1: (a) $u_{10} = ${a1 + 9 * d}$ (b) $S_{${n}} = ${Sn}<br>
    P2: (a) $u_1 = ${a1 + d}, d = ${d} (b) n \\approx 20.3 \\Rightarrow 21$ términos.<br>
    P3: Términos: 5, 8, 11 (suma 24, prod 440).<br>
    P4: (a) 76 asientos. (b) $S_{20} = 1160$ asientos.<br>
    P5: (a) Es una función lineal. (b) Pendiente = $d$.
    </div>`;

    return [Pregunta, Solucion];
}