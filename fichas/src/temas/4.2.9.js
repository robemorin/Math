import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Estadística Descriptiva y Efecto de Outliers';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Ejercicio 1: Media simple (Contextualizado)
    let total_meses = 12;
    let media_ventas = 15467;
    let total_ventas = total_meses * media_ventas;

    // Ejercicio 2: Media con incógnita (netball)
    let n_partidos = 14;
    let media_actual = 16.5;
    let puntos_previos = n_partidos * media_actual;
    let extra1 = 21;
    let extra2 = 24;
    let media_nueva = (puntos_previos + extra1 + extra2) / (n_partidos + 2);

    // Ejercicio 3: Outliers (Investigación 1)
    let base_data = [4, 5, 6, 6, 6, 7, 7, 8, 9, 10];
    let media_base = (base_data.reduce((a,b) => a+b, 0) / base_data.length).toFixed(2);
    let moda_base = 6;
    let median_base = 6.5;
    let outlier = 100;
    let data_outlier = [...base_data, outlier].sort((a,b) => a-b);
    let media_out = (data_outlier.reduce((a,b) => a+b, 0) / data_outlier.length).toFixed(2);
    let moda_out = 6;
    let median_out = 6.5;

    let Pregunta = `<div class="problema2">
    <h3>Práctica: Medidas de Tendencia Central y Efectos de Valores Extremos</h3>
    <p><i>Nota: Desarrolle todos los procedimientos en el espacio asignado. (Fuente original: [113].pdf)</i></p>
    
    <ol class="FT_ol_a">
        <li><b>Contexto:</b> Las ventas mensuales promedio de una tienda durante el año fueron de €${media_ventas}. Calcule el total de ventas anuales. <div>2</div></li>${CR(2)}
        
        <li><b>Contexto:</b> Una jugadora de netball tiene un promedio de ${media_actual} goles en ${n_partidos} partidos. En los dos últimos partidos anota ${extra1} y ${extra2} goles. Calcule su nuevo promedio para toda la temporada. <div>3</div></li>${CR(3)}
        
        <li><b>Investigación:</b> Considere el conjunto de datos: $4, 5, 6, 6, 6, 7, 7, 8, 9, 10$.
        <ol type="a">
            <li>Halle la media, la moda y la mediana. <div>3</div></li>${CR(3)}
            <li>Si añadimos el valor extremo $100$, calcule las nuevas medidas de tendencia central. <div>3</div></li>${CR(3)}
            <li>¿Cuál de las tres medidas se vio más afectada por el valor atípico? Justifique. <div>2</div></li>${CR(2)}
        </ol></li>
    </ol></div>
    <div class="page"></div>`;

    let Solucion = `<div class="ans"><b>Solucionario:</b><br>
    <b>P1:</b> Total = $12 \\times ${media_ventas} = ${total_ventas}$ €.<br>
    <b>P2:</b> Nuevo total = ${puntos_previos} + ${extra1} + ${extra2} = ${puntos_previos + extra1 + extra2}. Nuevo promedio = ${media_nueva.toFixed(2)} goles.<br>
    <b>P3:</b> (a) Media = ${media_base}, Moda = ${moda_base}, Mediana = ${median_base}.<br>
    (b) Nueva Media = ${media_out}, Moda = ${moda_out}, Mediana = ${median_out}.<br>
    (c) La media es la más afectada, ya que el valor ${outlier} eleva drásticamente la suma total, mientras que la mediana y la moda son resistentes a valores extremos.</div>`;

    return [Pregunta, Solucion];
}