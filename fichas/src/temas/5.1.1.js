import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Estimación de la derivada mediante tablas';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

function generarFuncion(tipo) {
    let a, b, c;
    switch(tipo) {
        case 0: // Cuadratica ax^2 + bx + c
            a = (Math.floor(Math.random() * 5) + 1) * (Math.random() < 0.5 ? 1 : -1);
            b = (Math.floor(Math.random() * 5) + 1) * (Math.random() < 0.5 ? 1 : -1);
            c = (Math.floor(Math.random() * 10) - 5);
            return {
                str: `${a}x^2 ${b > 0 ? '+' : ''}${b}x ${c !== 0 ? (c > 0 ? '+' : '') + c : ''}`,
                f: (x) => a * x * x + b * x + c,
                x0: Math.floor(Math.random() * 5) * (Math.random() < 0.5 ? 1 : -1),
                df: (x) => 2 * a * x + b
            };
        case 1: // Cubica ax^3 + bx
            a = (Math.floor(Math.random() * 3) + 1) * (Math.random() < 0.5 ? 1 : -1);
            b = (Math.floor(Math.random() * 5) + 1) * (Math.random() < 0.5 ? 1 : -1);
            return {
                str: `${a}x^3 ${b > 0 ? '+' : ''}${b}x`,
                f: (x) => a * x * x * x + b * x,
                x0: Math.floor(Math.random() * 3) * (Math.random() < 0.5 ? 1 : -1),
                df: (x) => 3 * a * x * x + b
            };
        case 2: // Exponencial a e^{bx}
            a = (Math.floor(Math.random() * 4) + 1);
            b = (Math.random() * 0.4 + 0.1).toFixed(1) * (Math.random() < 0.5 ? 1 : -1);
            return {
                str: `${a}e^{${b}x}`,
                f: (x) => a * Math.exp(b * x),
                x0: Math.floor(Math.random() * 4) * (Math.random() < 0.5 ? 1 : -1),
                df: (x) => a * b * Math.exp(b * x)
            };
        case 3: // Logaritmo natural a ln(x)
            a = (Math.floor(Math.random() * 5) + 1) * (Math.random() < 0.5 ? 1 : -1);
            let x0_log = Math.floor(Math.random() * 5) + 2; // > 0
            return {
                str: `${a}\\ln(x)`,
                f: (x) => a * Math.log(x),
                x0: x0_log,
                df: (x) => a / x
            };
        case 4: // Racional a / x
            a = (Math.floor(Math.random() * 10) + 1) * (Math.random() < 0.5 ? 1 : -1);
            let x0_rat = Math.floor(Math.random() * 4) + 1; // avoid 0
            if (Math.random() < 0.5) x0_rat *= -1;
            return {
                str: `\\frac{${a}}{x}`,
                f: (x) => a / x,
                x0: x0_rat,
                df: (x) => -a / (x * x)
            };
    }
}

export async function pregunta() {
    let Pregunta = "";
    let Solucion = "";
    
    let tipos = [0, 1, 2, 3, 4]; // Shuffle or just pick 5
    // Shuffle tipos
    for (let i = tipos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tipos[i], tipos[j]] = [tipos[j], tipos[i]];
    }

    for (let i = 0; i < 4; i++) {
        let fun = generarFuncion(tipos[i]);
        
        let dxs = [-0.1, -0.01, -0.001, 0, 0.001, 0.01, 0.1];
        
        Pregunta += `<div class="problema2">${i+1}.- Considere la función $f(x) = ${fun.str}$. Se desea estimar el valor de la derivada en $x = ${fun.x0}$.
        <ol class="FT_ol_a">
            <li>Complete la siguiente tabla para aproximar la pendiente de la recta tangente. Use al menos 4 cifras decimales.<div>4</div></li>
            <div style="display: flex; justify-content: center; margin-top: 10px;">
            <table style="width: 100%; text-align: center; border-collapse: collapse; margin-bottom: 20px;" border="1" cellpadding="5">`;
                
        let solTable = `<div class="ans"><div style="font-weight: bold;">Problema ${i+1}</div>
        <table style="width: 100%; text-align: center; border-collapse: collapse; font-size: 0.9em;" border="1" cellpadding="2">`;
        
        let fx0 = fun.f(fun.x0);

        let tr_x = `<tr><th>$x$</th>`;
        let tr_fx = `<tr><th>$f(x)$</th>`;
        let tr_m = `<tr><th>$m$</th>`;
        
        let tr_sol_x = `<tr><th>$x$</th>`;
        let tr_sol_fx = `<tr><th>$f(x)$</th>`;
        let tr_sol_m = `<tr><th>$m$</th>`;

        for (let dx of dxs) {
            let x_val = fun.x0 + dx;
            let x_str = x_val.toFixed(3);
            tr_x += `<td>$${x_str}$</td>`;
            tr_sol_x += `<td>$${x_str}$</td>`;
            
            if (dx === 0) {
                tr_fx += `<td></td>`;
                tr_m += `<td>-</td>`;
                tr_sol_fx += `<td>$${fx0.toFixed(4)}$</td>`;
                tr_sol_m += `<td>-</td>`;
            } else {
                tr_fx += `<td><br></td>`;
                tr_m += `<td><br></td>`;
                let fx = fun.f(x_val);
                let m = (fx - fx0) / dx;
                tr_sol_fx += `<td>$${fx.toFixed(4)}$</td>`;
                tr_sol_m += `<td>$${m.toFixed(4)}$</td>`;
            }
        }
        
        tr_x += `</tr>`;
        tr_fx += `</tr>`;
        tr_m += `</tr>`;
        
        tr_sol_x += `</tr>`;
        tr_sol_fx += `</tr>`;
        tr_sol_m += `</tr>`;

        let derivada_real = fun.df(fun.x0);

        Pregunta += tr_x + tr_fx + tr_m + `</table></div>
            <li>Con base en los valores de la tabla, ¿cuál es su mejor estimación para $f'(${fun.x0})$? <div>1</div></li>${CR(2)}
        </ol></div>`;
        
        solTable += tr_sol_x + tr_sol_fx + tr_sol_m + `</table>`;
        Solucion += solTable;
        Solucion += `<div>Estimación para $f'(${fun.x0}) \\approx ${derivada_real.toFixed(4)}$</div></div><br>`;
    }

    Pregunta += `<div class="page"></div>`;
    return [Pregunta, Solucion];
}
