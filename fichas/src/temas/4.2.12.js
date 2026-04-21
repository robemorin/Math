import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Estadística Descriptiva: Medidas de Centro';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Generación de datos aleatorios para el problema 1
    const freqs1 = [12 + Math.floor(Math.random() * 5), 7 + Math.floor(Math.random() * 5), 3 + Math.floor(Math.random() * 4), 4 + Math.floor(Math.random() * 3)];
    const total1 = freqs1.reduce((a, b) => a + b, 0);
    
    // Problema 2: Distribución de llamadas (Contexto nuevo pero mismo tipo)
    const freqs2 = [4, 7, 12, 9, 5, 4, 3, 2, 1, 1]; // frecuencias para 0 a 9 llamadas
    
    let Pregunta = `<div class="problema2"><h3>Práctica de Estadística Descriptiva (Tiempo estimado: 40 min)</h3>
    <p><b>1.-</b> Una encuesta sobre el número de mascotas por hogar en un vecindario arrojó los siguientes resultados:</p>
    <table border="1" cellpadding="5">
        <tr><th>Mascotas</th><th>${freqs1[0]}</th><th>${freqs1[1]}</th><th>${freqs1[2]}</th><th>${freqs1[3]}</th></tr>
        <tr><th>Frecuencia</th><td>1</td><td>2</td><td>3</td><td>4</td></tr>
    </table>
    <ol class="FT_ol_a">
        <li>Calcule la media de mascotas por hogar. <div>2</div></li>${CR(2)}
        <li>Determine la mediana y la moda de este conjunto de datos. <div>2</div></li>${CR(2)}
    </ol></div><br>`;

    Pregunta += `<div class="problema2">
    <p><b>2.-</b> La siguiente tabla muestra la cantidad de mensajes de texto enviados por un grupo de 50 estudiantes durante el recreo:</p>
    <table border="1" cellpadding="5">
        <tr><td>Mensajes</td><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>
        <tr><td>Frecuencia</td><td>5</td><td>8</td><td>15</td><td>12</td><td>7</td><td>3</td></tr>
    </table>
    <ol class="FT_ol_a">
        <li>Para este conjunto de datos, halle la media, mediana y moda. <div>3</div></li>${CR(4)}
        <li>Si añadimos un estudiante que envió 10 mensajes, ¿cómo afectaría esto a la media y a la mediana? Justifique. <div>3</div></li>${CR(3)}
    </ol></div><br>`;

    Pregunta += `<div class="problema2">
    <p><b>3.-</b> Una fábrica de componentes electrónicos afirma que el promedio de piezas defectuosas por lote es 5. Se inspeccionaron 30 lotes:</p>
    <table border="1" cellpadding="5">
        <tr><td>Piezas</td><td>4</td><td>5</td><td>6</td><td>7</td></tr>
        <tr><td>Frecuencia</td><td>8</td><td>14</td><td>6</td><td>2</td></tr>
    </table>
    <ol class="FT_ol_a">
        <li>Calcule la media muestral. <div>2</div></li>${CR(2)}
        <li>¿Apoyan estos datos la afirmación de la fábrica? Explique. <div>2</div></li>${CR(2)}
    </ol></div>`;

    // Lógica para las soluciones
    const media1 = (1*freqs1[0] + 2*freqs1[1] + 3*freqs1[2] + 4*freqs1[3])/total1;
    
    let Solucion = `<div class="ans"><b>P1:</b> Media $\\approx ${media1.toFixed(2)}$. Mediana: posición ${(total1+1)/2} $\\rightarrow$ valor 2. Moda: 1.</div><br>`;
    Solucion += `<div class="ans"><b>P2:</b> Media $\\approx 2.2$. Mediana: 2. Moda: 2. Al añadir un valor extremo, la media aumenta significativamente, la mediana es más robusta.</div><br>`;
    Solucion += `<div class="ans"><b>P3:</b> Media $= \\frac{4(8)+5(14)+6(6)+7(2)}{30} = \\frac{156}{30} = 5.2$. La media es mayor que 5, por lo que la afirmación podría ser cuestionable.</div>`;

    return [Pregunta, Solucion];
}

/* Nota: Ejercicios basados en el PDF [116].pdf de Estadística descriptiva IB */