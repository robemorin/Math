import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Volumen de Sólidos Taperados';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Parámetros aleatorios para dinamismo
    let ladoBase = Math.floor(Math.random() * 5) + 8; // cm
    let altura = Math.floor(Math.random() * 5) + 12;  // cm
    let n = 10; 

    let Pregunta = `<div class="problema2">
    <h3>Investigación: Volumen de Sólidos Taperados</h3>
    <p>Considere una pirámide de base cuadrada de lado $L = ${ladoBase} \\text{ cm}$ y altura $H = ${altura} \\text{ cm}$.</p>
    
    <ol class="FT_ol_a">
        <li><b>Prisma inicial:</b> Calcule el volumen $V_p$ de un prisma con la misma base y altura. <div>2</div></li>${CR(2)}
        
        <li><b>Aproximación por prismas:</b> Si aproximamos la pirámide mediante $n = ${n}$ prismas de igual espesor apilados:
            <ol style="list-style-type: lower-roman;">
                <li>Explique por qué el espesor de cada prisma es $h = \\frac{H}{n}$. <div>2</div></li>${CR(2)}
                <li>Si $x_k$ es el lado del $k$-ésimo prisma (contando desde el ápice), justifique mediante semejanza de triángulos por qué $x_k = \\frac{L \\cdot k}{n}$. <div>3</div></li>${CR(3)}
                <li>El volumen del $k$-ésimo prisma es $V_k = (x_k)^2 \\cdot h$. Sustituya las expresiones anteriores para demostrar que $V_k = \\frac{L^2 \\cdot H}{n^3} \\cdot k^2$. <div>3</div></li>${CR(3)}
            </ol>
        </li>
        
        <li><b>Cálculo del volumen total:</b> La suma de los volúmenes de los $n$ prismas es $V_{total} = \\sum_{k=1}^{n} V_k$.
            <br>Calcule manualmente esta suma para $n = 5$ utilizando los valores $L=${ladoBase} y $H=${altura}.
            <br>Recuerde que $\\sum_{k=1}^{n} k^2 = \\frac{n(n+1)(2n+1)}{6}$. <div>4</div></li>${CR(5)}
            
        <li><b>Reflexión:</b> ¿Cómo se relaciona el resultado obtenido con la fórmula general del volumen de una pirámide $V = \\frac{1}{3} \\cdot \\text{Base} \\cdot \\text{Altura}$? <div>2</div></li>${CR(3)}
    </ol>
    </div>
    <div class="page"></div>`;

    // Cálculos para la solución
    let V_prisma = ladoBase * ladoBase * altura;
    let n_calc = 5;
    let factor = (ladoBase * ladoBase * altura) / Math.pow(n_calc, 3);
    let suma_k2 = (n_calc * (n_calc + 1) * (2 * n_calc + 1)) / 6;
    let V_aprox = factor * suma_k2;

    let Solucion = `<div class="ans">
        <b>Soluciones:</b><br>
        (1) $V_p = ${ladoBase}^2 \\cdot ${altura} = ${V_prisma} \\text{ cm}^3$.<br>
        (2i) La altura total se divide en $n$ partes iguales: $\\frac{${altura}}{n}$.<br>
        (2ii) Por semejanza de triángulos, el lado es proporcional a la distancia desde el ápice: $\\frac{x_k}{L} = \\frac{k \\cdot (H/n)}{H} = \\frac{k}{n} \\Rightarrow x_k = \\frac{L \\cdot k}{n}$.<br>
        (2iii) $V_k = (\\frac{L \\cdot k}{n})^2 \\cdot \\frac{H}{n} = \\frac{L^2 \\cdot H}{n^3} \\cdot k^2$.<br>
        (3) Para $n=${n_calc}: $V_{total} = \\frac{${ladoBase}^2 \\cdot ${altura}}{${n_calc}^3} \\cdot \\frac{${n_calc}(${n_calc}+1)(2\\cdot ${n_calc}+1)}{6} = ${factor.toFixed(2)} \\cdot ${suma_k2} = ${V_aprox.toFixed(2)} \\text{ cm}^3$.<br>
        (4) A medida que $n \\to \\infty$, la suma tiende a $\\frac{1}{3}L^2H$, coincidiendo con el volumen exacto de la pirámide.
    </div>`;

    return [Pregunta, Solucion];
}