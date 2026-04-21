import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Funciones a Trozos y Transformaciones';
}

export async function pregunta() {
    const Milimetrado = window.Milimetrado || tlacu.Milimetrado || function(w, arr){return `<div style="width: ${w}px; height: 300px; border: 1px solid #ccc; background-image: linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px); background-size: 20px 20px;"></div>`;};
    let Pregunta = "";
    let Solucion = "";

    function randomInt(min, max, exclude = []) {
        let num;
        do {
            num = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (exclude.includes(num));
        return num;
    }

    function generarTrozos() {
        const tipo = randomInt(1, 3);
        let a, b, c, h, k;

        switch (tipo) {
            case 1:
                a = randomInt(-3, 3, [0]);
                b = randomInt(-5, 5);
                return [`${a}x ${b < 0 ? '-' : '+'} ${Math.abs(b)}`, (x) => a * x + b];

            case 2:
                c = randomInt(-5, 5);
                return [`${c}`, (x) => c];

            case 3:
                a = randomInt(-2, 2, [0]);
                h = randomInt(-3, 3);
                k = randomInt(-4, 4);
                let str = `${a}(x ${h > 0 ? '-' : '+'} ${Math.abs(h)})^2 ${k > 0 ? '+' : ''} ${k === 0 ? '' : k}`;
                if (h === 0) str = `${a}x^2 ${k > 0 ? '+' : ''} ${k === 0 ? '' : k}`;
                return [str, (x) => a * Math.pow(x - h, 2) + k];
        }
    }

    function generarFuncion_Prob1() {
        let bp1 = randomInt(-3, 0);
        let bp2 = randomInt(1, 4);

        let [f1_str, f1_call] = generarTrozos();
        let [f2_str, f2_call] = generarTrozos();
        let [f3_str, f3_call] = generarTrozos();

        let latex = `\\begin{cases} ${f1_str} & \\text{si } x \\le ${bp1} \\\\ ${f2_str} & \\text{si } ${bp1} < x \\le ${bp2} \\\\ ${f3_str} & \\text{si } x > ${bp2} \\end{cases}`;

        let callable = (x) => {
            if (x <= bp1) return f1_call(x);
            if (x > bp1 && x <= bp2) return f2_call(x);
            if (x > bp2) return f3_call(x);
        };

        return { latex, callable, bp1, bp2 };
    }

    function generarFuncion_Prob2_4() {
        let bp = randomInt(-2, 2);
        let [f1_str, f1_call] = generarTrozos();
        let [f2_str, f2_call] = generarTrozos();

        let latex = `\\begin{cases} ${f1_str} & \\text{si } x < ${bp} \\\\ ${f2_str} & \\text{si } x \\ge ${bp} \\end{cases}`;
        let callable = (x) => (x < bp) ? f1_call(x) : f2_call(x);

        return { latex, callable, bp };
    }

    function generarTransformacion_Prob1(maximo = 5) {
        const tipo = randomInt(1, maximo);
        let h = randomInt(-3, 3, [0]);
        let k = randomInt(-3, 3, [0]);
        let a = randomInt(2, 3);
        let b = randomInt(2, 3);

        switch (tipo) {
            case 1: return { q_latex: `$f(x) ${k < 0 ? '-' : '+'} ${Math.abs(k)}$` };
            case 2: return { q_latex: `$f(x ${h < 0 ? '-' : '+'} ${Math.abs(h)})$` };
            case 3: return { q_latex: `$${a}f(x)$` };
            case 4: return { q_latex: `$f(${b}x)$` };
            default: return { q_latex: `relación inversa` };
        }
    }

    // --- Problema 1 ---
    let f1 = generarFuncion_Prob1();
    const trans1 = generarTransformacion_Prob1(4);
    let v = [
        f1.bp1 - randomInt(1, 2),
        f1.bp1,
        Math.round((f1.bp1 + f1.bp2) / 2),
        f1.bp2,
        f1.bp2 + randomInt(1, 2)
    ];

    Pregunta += `<div class="problema2">1.- Dada la siguiente función $f(x)$:
    <div>$f(x) = ${f1.latex}$</div>
    <ol class="FT_ol_a">
        <li>Calcula los siguientes valores:
        <ol>
            <table>
                <tr>
                    <td style="padding: 10px;">(i) $f(${v[0]})$</td>
                    <td style="padding: 10px;">(ii) $f(${v[1]})$</td>
                    <td style="padding: 10px;">(iii) $f(${v[2]})$</td>
                    <td style="padding: 10px;">(iv) $f(${v[3]})$</td>
                    <td style="padding: 10px;">(v) $f(${v[4]})$</td>
                </tr>
            </table>
        </ol>
            <div>3</div></li><br>
        <li>Dibuja la gráfica de $f(x)$, en rojo, y ${trans1.q_latex}, en azul, en el siguiente espacio.<div>3</div></li><br>${Milimetrado(400, [10, 10, .5])}
        <li>Dibuja la gráfica de $f(x)$, en rojo, y la relación inversa, en azul.<div>2</div></li><br>${Milimetrado(400, [10, 10, .5])}
    </ol></div><div class="page"></div>`;

    Solucion += `<div class="ans">
        <div style="font-weight: bold;">Problema 1</div>
        <div>(1a) $f(${v[0]}) = ${f1.callable(v[0]).toPrecision(3)}$, $f(${v[1]}) = ${f1.callable(v[1]).toPrecision(3)}$, $f(${v[2]}) = ${f1.callable(v[2]).toPrecision(3)}$, $f(${v[3]}) = ${f1.callable(v[3]).toPrecision(3)}$, $f(${v[4]}) = ${f1.callable(v[4]).toPrecision(3)}$</div>
        <div>(1b) (Ver gráfica)</div>
        <div>(1c) (Ver gráfica)</div>
    </div>`;

    // --- Problemas 2, 3 ---
    for (let i = 2; i <= 3; i++) {
        const fn = generarFuncion_Prob2_4();
        let vals = [fn.bp - 1, fn.bp, fn.bp + 2];

        Pregunta += `<div class="problema2">${i}.- Dada la función $f(x)$:
        <div>$f(x) = ${fn.latex}$</div>
        <ol class="FT_ol_a">
            <li>Calcula $f(${vals[0]}), f(${vals[1]}), f(${vals[2]})$<div>2</div></li>
            <li>Dibuja la gráfica de $y = f(x)$, en rojo, y ${generarTransformacion_Prob1().q_latex}, en azul, en el siguiente espacio.<div>3</div></li><br>${Milimetrado(400, [10, 10, .5])}
        </ol></div><div class="page"></div>`;

        Solucion += `<div class="ans">
        <div style="font-weight: bold;">Problema ${i}</div>
        <div>(${i}a) $f(${vals[0]}) = ${fn.callable(vals[0]).toPrecision(3)}$, $f(${vals[1]}) = ${fn.callable(vals[1]).toPrecision(3)}$, $f(${vals[2]}) = ${fn.callable(vals[2]).toPrecision(3)}$</div>
        <div>(${i}b) (Ver gráfica)</div>
        </div>`;
    }

    // --- Problema 5 (Obtener Ecuación) - lo llamamos 4 ---
    const f5 = generarFuncion_Prob2_4();
    Pregunta += `<div class="problema2">4.- Escribe la ecuación de la función a trozos $m(x)$ que pudiera estar representada por la respuesta en la clave. (Invierta su examen para responder)<div>4</div>
        <br>${Milimetrado(400, [10, 10, .5])} 
        <div>(Sugerencia: La gráfica consta de dos trozos unidos en $x=${f5.bp}$)</div>
        </div>`;
        
    Solucion += `<div class="ans">
        <div style="font-weight: bold;">Problema 4</div>
        <div>(4) $m(x) = ${f5.latex}$</div>
        </div><div class="page"></div>`;

    // --- Problema 6 (Descripción) - lo llamamos 5 ---
    Pregunta += `<div class="problema2">5.- Sea $y = f(x)$ la función original. Describe la secuencia de transformaciones (traslaciones y/o escalamientos) que se aplican a $f(x)$ para obtener $g(x)$.
        <ol class="FT_ol_a">
            <li>$g(x) = f(x+3) - 5$<div>2</div></li>
            ${CR(1)}
            <li>$g(x) = 2f(x) + 1$<div>2</div></li>
            ${CR(1)}
            <li>$g(x) = f(3x) - 4$<div>2</div></li>
            ${CR(1)}
            <li>$g(x) = \\frac{1}{2}f(x-1)$<div>2</div></li>
            ${CR(1)}
        </ol></div>`;

    Solucion += `<div class="ans">
        <div style="font-weight: bold;">Problema 5</div>
        <div>(5a) Traslación horizontal 3 unidades a la izquierda, luego traslación vertical 5 unidades hacia abajo.</div>
        <div>(5b) Estiramiento vertical factor 2, luego traslación vertical 1 unidad hacia arriba.</div>
        <div>(5c) Compresión horizontal factor 1/3, luego traslación vertical 4 unidades hacia abajo.</div>
        <div>(5d) Traslación horizontal 1 unidad a la derecha, compresion vertical a la mitad.</div>
    </div>`;

    return [Pregunta, Solucion];
}
