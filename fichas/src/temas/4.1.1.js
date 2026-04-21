import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Fuente original: [99].pdf
 * Módulo de práctica: Recolección de datos, muestreo y errores en estadística.
 * Tiempo estimado: 40 minutos.
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Generación de valores aleatorios para el contexto
    const productos = ["bolsas de arroz de 500g", "cajas de cereal de 750g", "botellas de jugo de 1L"];
    const producto = productos[Math.floor(Math.random() * productos.length)];
    const muestra = 40 + Math.floor(Math.random() * 20);

    let Pregunta = `<div class="problema2"><h3>Práctica de Estadística: Muestreo y Errores</h3>
    <p>Una empresa de alimentos desea verificar si sus ${producto} cumplen con el peso etiquetado. Un inspector selecciona al azar ${muestra} unidades de la línea de producción al final del día.</p>
    
    <ol class="FT_ol_a">
        <li><b>Definiciones básicas:</b> Identifique en este contexto:
            <ul style="list-style-type: lower-roman;">
                <li>Población: ${CR(1)}</li>
                <li>Muestra: ${CR(1)}</li>
                <li>Variable: ${CR(1)}</li>
            </ul>
        </li>
        <li><b>Representatividad:</b> Si el inspector solo toma las muestras de la primera hora de la mañana, ¿sería esta muestra representativa? Justifique su respuesta basándose en el concepto de sesgo. ${CR(3)}</li>
        
        <li><b>Errores de muestreo:</b> Explique brevemente la diferencia entre un <i>error de muestreo</i> y un <i>error de medición</i> en este experimento. ${CR(3)}</li>
        
        <li><b>Representación:</b> Si el inspector registra los pesos, ¿qué tipo de gráfico recomendaría para visualizar la distribución de los datos? Dibuje un bosquejo de cómo se vería si el proceso está bajo control (distribución normal). ${CR(6)}</li>
    </ol>
    </div>
    <div class="page"></div>`;

    // Solución para el profesor
    let Solucion = `<div class="ans"><b>Solución sugerida:</b>
    <ol>
        <li>(i) Población: Todos los ${producto} producidos. (ii) Muestra: Las ${muestra} unidades seleccionadas. (iii) Variable: Peso (cuantitativa continua).</li>
        <li>No sería representativa. Existe un sesgo temporal; si la maquinaria necesita tiempo para calentarse o hay variaciones térmicas durante el día, la muestra no refleja la producción total.</li>
        <li>Error de muestreo: Diferencia natural entre el estadístico de la muestra y el parámetro poblacional. Error de medición: Imprecisión en la balanza o error humano al registrar el peso.</li>
        <li>Se recomienda un histograma o una gráfica de caja (box-plot). El bosquejo debe mostrar una campana simétrica centrada en el peso nominal.</li>
    </ol>
    </div>`;

    return [Pregunta, Solucion];
}

/* 
Nota para el usuario:
- Este módulo genera un ejercicio de reflexión teórica sobre el muestreo, esencial para el temario 4.1.
- No requiere cálculos numéricos complejos, sino comprensión conceptual del IB.
- El estudiante debe completar los espacios en blanco de forma manuscrita.
*/