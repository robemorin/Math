import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Optimización y Trayectorias";
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("2.4.2", "2. Funciones", "Ficha: Optimización y Trayectorias");

    // ======================================================
    // EJERCICIO 1: OPTIMIZACIÓN GEOMÉTRICA (GRANJERO)
    // ======================================================
    const perimetro = (Math.floor(Math.random() * 5) + 4) * 20; 
    const ancho_optimo = perimetro / 4;
    const largo_optimo = perimetro - 2 * ancho_optimo; 
    const area_maxima = ancho_optimo * largo_optimo;

    html += `
    <div class="seccion-title">I. Optimización Geométrica: Cerco del Granjero</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            Un granjero desea cercar un terreno rectangular para sus animales a lo largo de la orilla recta de un río. No necesita cercar el lado que da al río. Dispone de un total de ${perimetro} metros de material para la cerca.<br>
            Sea $x$ la anchura del terreno (los dos lados perpendiculares al río).
        </div>
        <ol class="FT_ol_a">
            <li>Muestre que el área del terreno, $A(x)$, se puede modelar mediante la función $A(x) = -2x^2 + ${perimetro}x$. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Determine las dimensiones (ancho y largo) que debe tener el terreno para que la superficie cercada sea la mayor posible. <span class="mark">4</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule dicha área máxima. <span class="mark">1</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 2.4.2:</b><br>
        <b>I.</b> 1a. Largo $L = ${perimetro} - 2x$. Área $A = x(${perimetro} - 2x) = -2x^2 + ${perimetro}x$ | 1b. Ancho = $${ancho_optimo}$ m, Largo = $${largo_optimo}$ m | 1c. $A_{max} = ${area_maxima}$ m$^2$<br>
    `;

    // ======================================================
    // EJERCICIO 2: INGRESOS (PRECIO VS VENTAS)
    // ======================================================
    const precio_base = 20;
    const ventas_base = Math.floor(Math.random() * 5) * 100 + 400; 
    const perdida_por_dolar = Math.floor(Math.random() * 3) * 5 + 10; 
    
    const x_opt = (ventas_base - precio_base * perdida_por_dolar) / (2 * perdida_por_dolar);
    const mejor_precio = precio_base + x_opt;
    const mejores_ventas = ventas_base - perdida_por_dolar * x_opt;
    const ingreso_max = mejor_precio * mejores_ventas;

    html += `
    <div class="seccion-title">II. Economía: Precio vs Ventas</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            Una sala de cine vende actualmente entradas a $${precio_base}$ dólares y atrae a un promedio de ${ventas_base} clientes por función.<br>
            Un estudio de mercado indica que por cada $1$ dólar que se aumente el precio, se perderán ${perdida_por_dolar} clientes.<br>
            Sea $x$ el aumento en el precio (en dólares) sobre el precio base.
        </div>
        <ol class="FT_ol_a">
            <li>Escriba una expresión para el Ingreso Total, $I(x)$, en función del aumento $x$. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Determine qué precio de entrada genera los mayores ingresos para el cine. <span class="mark">3</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            <li>¿Cuál sería el ingreso esperado con ese nuevo precio? <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    `;

    solucion += `<b>II.</b> 2a. $I(x) = (${precio_base} + x)(${ventas_base} - ${perdida_por_dolar}x)$ | 2b. Precio óptimo = $\\$${mejor_precio.toFixed(2)}$ ($x = ${x_opt.toFixed(2)}$) | 2c. $I_{max} = \\$${ingreso_max.toFixed(2)}$<br>`;

    // ======================================================
    // EJERCICIO 3: TRAYECTORIA
    // ======================================================
    const distancia = (Math.floor(Math.random() * 4) + 4) * 10; 
    const altura_max = Math.floor(Math.random() * 5) + 10; 
    const a_traj = (-4 * altura_max) / (distancia * distancia);
    const x_obs = distancia - 5; 
    const h_obs = 3; 
    const altura_en_obs = a_traj * x_obs * (x_obs - distancia);
    const pasa = altura_en_obs > h_obs ? "Sí" : "No";

    html += `
    <div class="seccion-title">III. Física: Trayectoria de un Balón</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            Se patea un balón de fútbol desde el suelo. La trayectoria del balón es parabólica. El balón alcanza una altura máxima de ${altura_max} metros y toca el suelo nuevamente a ${distancia} metros de distancia del punto de lanzamiento.
        </div>
        <ol class="FT_ol_a">
            <li>Utilizando la forma factorizada $y = ax(x-p)$ o la forma canónica, halle la ecuación de la trayectoria del balón. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
            <li>A una distancia horizontal de ${x_obs} metros del lanzamiento hay un muro de ${h_obs} metros de altura. Determine matemáticamente si el balón pasará por encima del muro. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Interprete qué representa el dominio de esta función en el contexto del problema. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `<b>III.</b> 3a. $y = ${a_traj.toFixed(4)}x(x - ${distancia})$ | 3b. Altura en $x=${x_obs}$ es $y \\approx ${altura_en_obs.toFixed(2)}$ m. ¿Mayor a ${h_obs} m? <strong>${pasa}</strong> | 3c. El dominio $[0, ${distancia}]$ es la distancia horizontal recorrida por el balón en el aire.</div>`;

    return [html, solucion];
}
