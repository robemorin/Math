import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

// Fuente original: [112].pdf (Estadística - Medidas de centro)

export function name() {
    return 'Estadística Descriptiva: Medidas de Centro';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Generación de datos aleatorios para el problema principal
    // Simulando una serie de productos defectuosos diarios
    let n = 15;
    let datos = Array.from({length: n}, () => Math.floor(Math.random() * 10));
    let datosOrdenados = [...datos].sort((a, b) => a - b);
    
    // Cálculos
    let suma = datos.reduce((a, b) => a + b, 0);
    let media = (suma / n).toFixed(2);
    let mediana = datosOrdenados[Math.floor(n / 2)];
    let frecuencias = {};
    datos.forEach(d => frecuencias[d] = (frecuencias[d] || 0) + 1);
    let maxFreq = Math.max(...Object.values(frecuencias));
    let modas = Object.keys(frecuencias).filter(k => frecuencias[k] === maxFreq);

    let Pregunta = `<div class="problema2"><h3>Análisis de Datos: Control de Calidad</h3>
    <p>Una fábrica registró el número de artículos defectuosos encontrados diariamente durante un periodo de ${n} días:</p>
    <p style="text-align:center; font-family: monospace; font-size: 1.2em;">${datos.join(', ')}</p>
    <ol class="FT_ol_a">
        <li>Determine la media, la mediana y la moda de este conjunto de datos. <div>3</div></li>${CR(3)}
        <li>Si en el día ${n+1} se detectaron ${Math.floor(Math.random() * 5) + 8} artículos defectuosos, ¿cómo afectaría este nuevo dato a la media del conjunto? Justifique matemáticamente. <div>3</div></li>${CR(4)}
    </ol></div><div class="page"></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> Media $\\approx ${media}$, Mediana $= ${mediana}$, Moda $= ${modas.join(', ')}$.</div><br>`;

    // --- Problema 2: Interpretación de gráficos ---
    let lista2 = [2, 3, 1, 1, 0, 0, 4, 3, 0, 1, 2, 3, 2, 1, 4];
    
    Pregunta += `<div class="problema2"><h3>Interpretación de Frecuencias</h3>
    <p>Phil registró el número de tazas de café que bebió durante 15 días: ${lista2.join(', ')}.</p>
    <ol class="FT_ol_a">
        <li>Ordene los datos y halle la mediana. <div>2</div></li>${CR(2)}
        <li>¿Cuál es el valor que más se repite (moda)? <div>1</div></li>${CR(1)}
        <li>Calcule la media de tazas de café diarias. <div>2</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> Datos ordenados: 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4. Mediana $= 2$, Moda $= 1$, Media $= 1.93$.</div>`;

    return [Pregunta, Solucion];
}