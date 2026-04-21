import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

// Fuente original: [127].pdf (Ejercicios sobre Varianza y Desviación Estándar)

export function name() {
    return 'Estadística: Varianza y Desviación Estándar';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

// Función auxiliar para calcular desviación estándar poblacional
function getStats(data) {
    const n = data.length;
    const mean = data.reduce((a, b) => a + b) / n;
    const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
    return { mean: mean.toFixed(2), std: Math.sqrt(variance).toFixed(2), variance: variance.toFixed(2) };
}

export async function pregunta() {
    // Problema 1: Conjuntos de datos
    let dataA = [10, 7, 5, 8, 10];
    let dataB = [4, 12, 11, 14, 1, 6];
    let statsA = getStats(dataA);
    let statsB = getStats(dataB);

    let Pregunta = `<div class="problema2"><h3>1.- Análisis de dispersión</h3>
    Considere los siguientes conjuntos de datos:<br>
    Conjunto A: $${dataA.join(', ')}$<br>
    Conjunto B: $${dataB.join(', ')}$
    <ol class="FT_ol_a">
        <li>Demuestre que la media de ambos conjuntos es 8. <div>2</div></li>${CR(2)}
        <li>¿Qué conjunto presenta mayor dispersión? Justifique su respuesta observando los valores. <div>2</div></li>${CR(2)}
        <li>Calcule la varianza poblacional ($\\sigma^2$) y la desviación estándar poblacional ($\\sigma$) para ambos. <div>4</div></li>${CR(3)}
    </ol></div>`;

    // Problema 2: Contextualizado (Mascotas)
    let mascotas = Array.from({length: 20}, () => Math.floor(Math.random() * 6));
    let statsPets = getStats(mascotas);
    
    Pregunta += `<div class="problema2"><h3>2.- Contexto: Mascotas en clase</h3>
    Se registró el número de mascotas de ${mascotas.length} estudiantes: <br> $${mascotas.join(', ')}$
    <ol class="FT_ol_a">
        <li>Calcule la media y la desviación estándar poblacional. <div>3</div></li>${CR(3)}
        <li>Si cada estudiante rescatara una mascota extra, ¿cómo cambiaría la varianza? Justifique. <div>2</div></li>${CR(2)}
    </ol></div>`;

    // Problema 3: Edades (Traslación de datos)
    let edades = [22, 25, 23, 28, 29, 21, 20, 26];
    let statsEdades = getStats(edades);
    let statsFuturo = getStats(edades.map(x => x + 4));

    Pregunta += `<div class="problema2"><h3>3.- Análisis de edades</h3>
    Las edades de un equipo son: $${edades.join(', ')}$.
    <ol class="FT_ol_a">
        <li>Calcule la media y la desviación estándar actuales. <div>3</div></li>${CR(3)}
        <li>El equipo jugará un torneo en 4 años. Calcule la media y la desviación estándar en ese momento. <div>3</div></li>${CR(3)}
        <li>Compare los resultados y comente qué ocurre con la desviación estándar cuando se suma una constante a todos los datos. <div>2</div></li>${CR(3)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>Soluciones resumidas:</b><br>
    P1: Media A=${statsA.mean}, B=${statsB.mean}. B tiene mayor dispersión (rango mayor). <br>
    P2: $\\mu = ${statsPets.mean}, \\sigma = ${statsPets.std}$. (La varianza no cambia al sumar constante).<br>
    P3: Edad actual $\\mu=${statsEdades.mean}, \\sigma=${statsEdades.std}$. Edad futuro $\\mu=${statsFuturo.mean}, \\sigma=${statsFuturo.std}$. La desviación no cambia.</div>`;

    return [Pregunta, Solucion];
}