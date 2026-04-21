import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

// Fuente original: [114].pdf
export function name() {
    return 'Estadística: Medidas de Centro y Selección de Datos';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Generar 10 precios aleatorios base de una propiedad inmobiliaria
    // Se asegura que sean valores realistas en miles
    let base = 300 + Math.floor(Math.random() * 200);
    let data = [];
    for(let i = 0; i < 10; i++) {
        data.push((base + Math.floor(Math.random() * 150)) * 1000);
    }
    // Ordenar para facilitar mediana
    data.sort((a, b) => a - b);
    
    let sum = data.reduce((a, b) => a + b, 0);
    let mean = (sum / 10).toFixed(0);
    let median = (data[4] + data[5]) / 2;

    let Pregunta = `<div class="problema2"><h3>Práctica: Medidas de tendencia central y toma de decisiones</h3>
    <p>La siguiente lista representa los precios de venta (en dólares) de las últimas 10 casas vendidas en un distrito:</p>
    <div style="background: #f8f9fa; padding: 10px; border-radius: 5px; font-family: monospace;">
        ${data.join(', ')}
    </div>
    <ol class="FT_ol_a">
        <li>Calcule la media y la mediana de estos precios. Muestre sus procedimientos. <div>3</div></li>${CR(4)}
        <li>Un vendedor desea destacar el valor de las casas para atraer clientes. ¿Qué medida (media o mediana) le recomendaría usar y por qué? <div>2</div></li>${CR(3)}
        <li>Si una casa de lujo con valor de $${(base + 500) * 1000}$ se incluye en la lista, ¿qué medida de centro se vería más afectada? Explique su razonamiento basándose en las propiedades de la media y la mediana. <div>3</div></li>${CR(3)}
        <li>Defina brevemente cuándo es más apropiado utilizar la moda en lugar de la media o la mediana en un conjunto de datos real. <div>2</div></li>${CR(3)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>Solución sugerida:</b><br>
    (1) Media: $${mean}$, Mediana: $${median}$.<br>
    (2) Se recomienda la media si el valor es alto, o mediana si hay valores atípicos.<br>
    (3) La media se ve más afectada porque toma en cuenta todos los valores, incluidos los extremos (outliers).<br>
    (4) La moda es útil para datos categóricos o cuando se busca el valor más frecuente (ej. tallas de ropa, modelos de autos).</div>`;

    return [Pregunta, Solucion];
}