import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Prueba de Chi Cuadrada (Independencia)';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    let color = ['Verde', 'Rojo', 'Azul', 'Negro', 'Blanco'];
    const size = [Math.floor(Math.random() * 3.9 + 2), Math.floor(Math.random() * 4.9 + 2)];

    let Pregunta = `
        <h3>Fórmula</h3>
        <p>La estadística de chi-cuadrada se calcula usando la siguiente fórmula:</p>
        <p>
            \\[
            \\chi^2_{Calc} = \\sum \\frac{(f_o - f_e)^2}{f_e}
            \\]
        </p>
        <p>donde \\( f_o \\) son los valores observados y \\( f_e \\) son los valores esperados.</p>
    <div class="problema2">
        1.- Se desea saber si existe una diferencia significativa entre los gustos de colores de entre salones. Para ello se aplica la prueba \\( \\chi^2 \\) con un nivel de significancia de 5%. Los valores observados se muestran a continuación
        <center><table border="1" cellpadding="8" cellspacing="0" style="margin-top: 10px; margin-bottom: 10px;">
        <tr><th>\\</th>`;
        
    for (let k1 = 0; k1 < size[0]; ++k1) {
        Pregunta += ` <th>${color[k1]}</th>`;
    }
    Pregunta += `<th>Total</th></tr>`;
    
    let O = [];
    for (let k = 0; k < size[1]; ++k) {
        O[k] = [];
        Pregunta += ` <tr><td>Salón ${k + 1}</td>`;
        for (let k1 = 0; k1 < size[0]; ++k1) {
            O[k].push(Math.ceil(Math.random() * 10) + 2);
            Pregunta += `<td>${O[k][k1]}</td>`;
        }
        Pregunta += `<td></td></tr>`;
    }

    // Polyfill funciones de Chi Cuadrado
    const getExpected = (O) => {
        let rows = O.length, cols = O[0].length;
        let totalRows = new Array(rows).fill(0);
        let totalCols = new Array(cols).fill(0);
        let total = 0;
        for (let i=0; i<rows; i++) {
            for (let j=0; j<cols; j++) {
                totalRows[i] += O[i][j];
                totalCols[j] += O[i][j];
                total += O[i][j];
            }
        }
        let E = [];
        for (let i=0; i<rows; i++) {
            E[i] = [];
            for (let j=0; j<cols; j++) {
                E[i][j] = (totalRows[i] * totalCols[j]) / total;
            }
        }
        return [E, totalCols, totalRows, total];
    };
    
    const chiCalc = (O, E) => {
        let val = 0;
        for (let i=0; i<O.length; i++) {
            for (let j=0; j<O[0].length; j++) {
                val += Math.pow(O[i][j] - E[i][j], 2) / E[i][j];
            }
        }
        return val;
    };

    const chi_matriz_esperada = window.chi_matriz_esperada || getExpected;
    const chiCuadradaCal = window.chiCuadradaCal || chiCalc;
    const chitablas = window.chitablas || function(gl, alpha) { return 9.488; };

    const [E, totalCols, totalRows, total] = chi_matriz_esperada(O);

    Pregunta += `<tr><th>Total</th>`;
    for (let k1 = 0; k1 < size[0]; ++k1) {
        Pregunta += ` <th></th>`;
    }
    const Pos = [Math.floor(Math.random() * size[1]), Math.floor(Math.random() * size[0])];

    Pregunta += `<th></th></tr></table></center>
        <ol class="FT_ol_a">
            <li>Escriba las hipótesis nula y alternativa <div>1</div></li>${CR(2)}
            <li>Escriba los grados de libertad usando la fórmula  $GL = (\\text{Total de fila} - 1) \\times (\\text{Total de columna} - 1)$ <div>1</div></li> ${CR(1)}
            <li>Complete la tabla escribiendo los totales. <div>1</div></li>
            <li>Calcule el valor esperado del salón ${Pos[0] + 1} al elegir el color "${color[Pos[1]]}". <div>1</div></li>${CR(1)}<div class="page"></div>
            <li>Complete la tabla de datos esperados a continuación. <div>1</div></li>`;

    // Tabla vacía esperados
    Pregunta += `<center><table border="1" cellpadding="8" cellspacing="0" style="margin-top: 10px; margin-bottom: 10px;"><tr><th>\\</th>`;
    for (let k1 = 0; k1 < size[0]; ++k1) {
        Pregunta += ` <th>${color[k1]}</th>`;
    }
    Pregunta += `<th>Total</th></tr>`;
    for (let k = 0; k < size[1]; ++k) {
        Pregunta += ` <tr><td>Salón ${k + 1}</td>`;
        for (let k1 = 0; k1 < size[0]; ++k1) {
            Pregunta += `<td></td>`;
        }
        Pregunta += `<td></td></tr>`;
    }
    Pregunta += `<tr><th>Total</th>`;
    for (let k1 = 0; k1 < size[0]; ++k1) {
        Pregunta += ` <th></th>`;
    }
    Pregunta += `<th></th></tr></table></center>`;


    Pregunta += `<li>Calcule el valor de \\( \\chi_{\\text{Calc}}^2 \\).<div>2</div></li>${CR(3)}
            <li>Escriba, usando una tabla de $\\chi^2$, el valor de $\\chi^2_{\\text{Crít}}$<div>2</div></li>${CR(1)}
            <li>Usando sus respuestas anteriores, realice una conclusión, justifique su respuesta.<div>2</div></li>${CR(3)}
        </ol></div>`;

    let chical = chiCuadradaCal(O, E);
    let chitabla = chitablas((size[0] - 1) * (size[1] - 1), 0.05);
    
    let gl = (size[0] - 1) * (size[1] - 1);
    let comparacion = typeof chitabla === 'number' && typeof chical === 'number' ? (chitabla > chical ? "$H_0$" : "$H_1$") : "$H_0/H_1$";

    let Solucion = `<div class="ans">
        <div>(1b) GL = ${gl}</div>
        <div>(1c) Total Gen: ${total}</div>    
        <div>(1d) Esperado Salón ${Pos[0]+1}, color ${color[Pos[1]]}: ${Number(E[Pos[0]][Pos[1]]).toPrecision(4)}</div>
        <div>(1f) $\\chi^2_{\\text{Calc}} \\approx ${Number(chical).toPrecision(4)}$</div>
        <div>(1g) $\\chi^2_{\\text{crít}} = ${chitabla}$</div>
        <div>(1h) Acepta ${comparacion}</div>
    </div>`;
    
    return [Pregunta, Solucion];
}
