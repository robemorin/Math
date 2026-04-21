import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

// Fuente original: [83].pdf - Probabilidad básica y diagramas de Venn

export function name() {
    return 'Probabilidad Básica y Diagramas de Venn';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Problema 1: Notación de conjuntos y Venn
    let dadoMax = 8; 
    let primos = [2, 3, 5, 7];
    let muestra = Array.from({length: dadoMax}, (_, i) => i + 1);
    let A = muestra.filter(x => primos.includes(x));
    let A_comp = muestra.filter(x => !primos.includes(x));

    let Pregunta = `<div class="problema2"><h3>1. Experimento: Dado de $${dadoMax}$ caras</h3>
    <p>Se lanza un dado de ${dadoMax} caras una vez. Sea $A$ el evento de obtener un número primo.</p>
    <ol class="FT_ol_a">
        <li>Liste el espacio muestral $U$ y los conjuntos $A$ y $A'$ (complemento de A). <div>3</div></li>${CR(3)}
        <li>Dibuje un diagrama de Venn que represente este experimento. <div>3</div></li>${CR(8)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> $U=\\{${muestra.join(',')}\\}$, $A=\\{${A.join(',')}\\}$, $A'=\\{${A_comp.join(',')}\\}$</div><br>`;

    // Problema 2: Contexto nombres y letras
    let nombres = ["Elena", "Quentin", "Ronan", "Sam", "Thomas", "Lucia", "Hector"];
    let muestra2 = nombres.sort(() => 0.5 - Math.random()).slice(0, 5);
    let conE = muestra2.filter(n => n.toLowerCase().includes('e'));
    let sinE = muestra2.filter(n => !n.toLowerCase().includes('e'));

    Pregunta += `<div class="problema2"><h3>2. Selección de Capitán</h3>
    <p>El grupo de candidatos es: $S = \\{${muestra2.join(', ')}\\}$. Se elige uno al azar. Sea $E$ el evento de que el nombre contenga la letra 'e'.</p>
    <ol class="FT_ol_a">
        <li>Describa con palabras el evento complementario $E'$. <div>1</div></li>${CR(2)}
        <li>Liste los elementos de $U$, $E$ y $E'$. <div>3</div></li>${CR(3)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> $E'=$ el nombre NO contiene la letra 'e'. $E=\\{${conE.join(',')}\\}$, $E'=\\{${sinE.join(',')}\\}$</div><br>`;

    // Problema 3: Diagrama de árbol
    Pregunta += `<div class="problema2"><h3>3. Diagrama de árbol</h3>
    <p>Se lanza una moneda y luego se hace girar una ruleta con 3 sectores numerados 1, 2, 3.</p>
    <ol class="FT_ol_a">
        <li>Construya un diagrama de árbol para este experimento. <div>3</div></li>${CR(10)}
        <li>¿Cuántos resultados posibles hay en el espacio muestral? <div>1</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P3:</b> Hay $2 \\times 3 = 6$ resultados posibles.</div><br>`;

    return [Pregunta, Solucion];
}