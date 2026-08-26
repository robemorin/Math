import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Ficha: Chi cuadrada (Independencia)
 * Importada de mate2/Fichas/fichas_estadistica.js
 * Tema 4.10 del temario.
 */

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

function chi_matriz_esperada(fo) {
    const totalRows = [], totalCols = [];
    const dataEsperada = [];
    let nRows = fo.length;
    let nCols = fo[0].length;
    let total = 0;
    
    for (let row = 0; row < nRows; ++row) {
        totalRows.push(0);
        for (let col = 0; col < nCols; ++col) totalRows[row] += fo[row][col];
    }
    
    for (let col = 0; col < nCols; ++col) {
        totalCols.push(0);
        for (let row = 0; row < nRows; ++row) totalCols[col] += fo[row][col];
        total += totalCols[col];
    }
    
    for (let row = 0; row < nRows; ++row) {
        dataEsperada[row] = [];
        for (let col = 0; col < nCols; ++col) {
            dataEsperada[row][col] = (totalRows[row] * totalCols[col]) / total;
        }
    }
    return [dataEsperada, totalCols, totalRows, total];
}

function chiCuadradaCal(fo, fe) {
    let x2 = 0;
    for (let i = 0; i < fo.length; i++) {
        for (let j = 0; j < fo[0].length; j++) {
            let diff = fo[i][j] - fe[i][j];
            x2 += (diff * diff) / fe[i][j];
        }
    }
    return x2;
}

function chitablas(dof, alpha) {
    const q = (alpha == 0.01 ? 0 : (alpha == 0.05 ? 1 : 2));
    const chit = [
        [6.635, 3.842, 2.706], [9.210, 5.992, 4.605], [11.345, 7.815, 6.251], [13.277, 9.488, 7.779],
        [15.086, 11.071, 9.236], [16.812, 12.592, 10.645], [18.475, 14.067, 12.017], [20.09, 15.507, 13.362],
        [21.666, 16.919, 14.684], [23.209, 18.307, 15.987], [24.725, 19.675, 17.275], [26.217, 21.026, 18.549],
        [27.688, 22.362, 19.812], [29.141, 23.685, 21.064], [30.578, 24.996, 22.307], [32.000, 26.296, 23.542],
        [33.409, 27.587, 24.769], [34.805, 28.869, 25.989], [36.191, 30.144, 27.204], [37.566, 31.41, 28.412],
        [38.932, 32.671, 29.615], [40.289, 33.925, 30.813], [41.638, 35.173, 32.007], [42.98, 36.415, 33.196],
        [44.314, 37.653, 34.382], [45.642, 38.885, 35.563], [46.963, 40.113, 36.741], [48.278, 41.337, 37.916],
        [49.588, 42.557, 39.088]
    ];
    return chit[Math.min(dof - 1, 28)][q];
}

export function name() {
    return "Ficha: Prueba de Independencia (Chi cuadrada)";
}

export function tipo() {
    return 1; // Ficha imprimible
}

export async function pregunta(np, code) {
    let color = ['Verde', 'Rojo', 'Azul', 'Negro', 'Blanco'];
    const size = [Math.floor(Math.random() * 3.9 + 2), Math.floor(Math.random() * 4.9 + 2)];
    
    let Pregunta = `<div class="problema2" style="font-family: Arial, sans-serif; line-height: 1.6;">
    
    <h3>Problema 1</h3>
    <p>Se desea saber si existe una dependencia significativa entre los gustos de colores y el salón de clases de los alumnos encuestados. Para ello se aplicará la prueba $\\chi^2$ con un nivel de significancia del 5% ($\\alpha=0.05$).</p>
    <p>Las frecuencias observadas se muestran a continuación:</p>
    
    <center><table border="1" cellpadding="4" cellspacing="0" style="margin-top: 10px; margin-bottom: 10px; text-align:center; border-collapse: collapse; width: 90%;">
    <tr style="background-color: #f2f2f2; font-weight: bold;"><td>\\</td>`;
    
    for (let k1 = 0; k1 < size[0]; ++k1) {
        Pregunta += `<td>${color[k1]}</td>`;
    }
    Pregunta += `<td>Total</td></tr>`;
    
    let O = [];
    for (let k = 0; k < size[1]; ++k) {
        O[k] = [];
        Pregunta += `<tr><td>Salón ${k + 1}</td>`;
        for (let k1 = 0; k1 < size[0]; ++k1) {
            let val = Math.ceil(Math.random() * 10);
            O[k].push(val);
            Pregunta += `<td>${val}</td>`;
        }
        Pregunta += `<td></td></tr>`;
    }
    
    const [E, totalCols, totalRows, total] = chi_matriz_esperada(O);
    
    Pregunta += `<tr style="font-weight: bold;"><td>Total</td>`;
    for (let k1 = 0; k1 < size[0]; ++k1) Pregunta += `<td></td>`;
    Pregunta += `<td></td></tr></table></center>`;
    
    const Pos = [Math.floor(Math.random() * size[1]), Math.floor(Math.random() * size[0])];
    
    Pregunta += `<ol class="FT_ol_a">
        <li>Escriba la hipótesis nula ($H_0$) y alternativa ($H_1$). <div>1</div></li>${CR(1)}
        <li>Escriba los grados de libertad usando la fórmula $GL = (\\text{Filas} - 1) \\times (\\text{Columnas} - 1)$. <div>1</div></li>
        <li>Complete la tabla anterior escribiendo todos los totales de fila y columna. <div>1</div></li>
        <li>Calcule el valor esperado $f_e$ del salón ${Pos[0] + 1} al elegir el color "${color[Pos[1]]}". <div>1</div></li>${CR(1)}
        <div class="page"></div>
        <li>Complete la tabla de frecuencias esperadas ($f_e$) a continuación. <div>2</div></li>`;
        
    Pregunta += `<center><table border="1" cellpadding="8" cellspacing="0" style="margin-top: 10px; margin-bottom: 20px; text-align:center; border-collapse: collapse; width: 90%;">
    <tr style="background-color: #f2f2f2; font-weight: bold;"><td>\\</td>`;
    
    for (let k1 = 0; k1 < size[0]; ++k1) Pregunta += `<td>${color[k1]}</td>`;
    Pregunta += `<td>Total</td></tr>`;
    
    for (let k = 0; k < size[1]; ++k) {
        Pregunta += `<tr><td>Salón ${k + 1}</td>`;
        for (let k1 = 0; k1 < size[0]; ++k1) Pregunta += `<td></td>`;
        Pregunta += `<td></td></tr>`;
    }
    Pregunta += `<tr style="font-weight: bold;"><td>Total</td>`;
    for (let k1 = 0; k1 < size[0]; ++k1) Pregunta += `<td></td>`;
    Pregunta += `<td></td></tr></table></center>`;
    
    Pregunta += `<li>Calcule el valor estadístico de prueba $\\chi_{\\text{Calc}}^2$. <div>2</div></li>${CR(3)}
        <li>Escriba, usando una tabla de distribución, el valor crítico $\\chi^2_{\\text{Crít}}$ para $\\alpha=0.05$.<div>1</div></li>${CR(1)}
        <li>Con base en la comparación de valores, redacte una conclusión en el contexto del problema justificando si se rechaza o no $H_0$.<div>2</div></li>${CR(3)}
    </ol></div><div class="page"></div>`;
    
    let chical = chiCuadradaCal(O, E);
    let dof = (size[0] - 1) * (size[1] - 1);
    let chitabla = chitablas(dof, 0.05);
    
    let Solucion = `<div class="ans"><b>Solucionario Sugerido:</b><br>
    <div>(1a) $H_0$: Las variables (color y salón) son independientes. $H_1$: Las variables no son independientes.</div>
    <div>(1b) Grados de libertad: $GL = ${dof}$</div>
    <div>(1c) Total fila 1: ${totalRows[0]} ... Total col 1: ${totalCols[0]} ... Gran Total: ${total}</div>
    <div>(1d) Valor esperado Salón ${Pos[0] + 1} / Color ${color[Pos[1]]}: $f_e = ${E[Pos[0]][Pos[1]].toPrecision(4)}$</div>
    <div>(1e) (Tabla de esperados completada proporcionalmente)</div>
    <div>(1f) Valor calculado: $\\chi^2_{\\text{Calc}} \\approx ${chical.toPrecision(4)}$</div>
    <div>(1g) Valor crítico de tabla: $\\chi^2_{\\text{Crít}} = ${chitabla}$</div>
    <div>(1h) Conclusión: ${chical > chitabla ? "Se rechaza $H_0$ dado que $\\chi^2_{Calc} > \\chi^2_{Crit}$. Existe evidencia de dependencia entre el salón y el color preferido." : "No se rechaza $H_0$ dado que $\\chi^2_{Calc} \\le \\chi^2_{Crit}$. No hay evidencia suficiente para afirmar una dependencia."}</div>
    </div>`;
    
    return [Pregunta, Solucion];
}

export async function render(container, n, code) {}
