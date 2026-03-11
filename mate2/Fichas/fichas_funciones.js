const f_funciones = {
    Nombre: "Funciones",
    subtema: [{
        Nombre: "Transformaciones",
        topico: [{
            Nombre: "Funciones a Trozos y Transformaciones (Fijo)",
            func: function () {
                let Pregunta = "";
                let Solucion = "";

                // --- Problema 1 ---
                const f1_latex = `\\begin{cases} 2x + 5 & \\text{si } x \\le -1 \\\\ 3 & \\text{si } -1 < x \\le 2 \\\\ -x + 1 & \\text{si } x > 2 \\end{cases}`;

                Pregunta += `<div class="Problema2">1.- Dada la siguiente función $f(x)$:
            <div>$f(x) = ${f1_latex}$</div>
            <ol class="FT_ol_a">
                <li>Calcula los siguientes valores: $f(-3), f(-1), f(2), f(2.001)$<div>3</div></li>
                <li>Dibuja la gráfica de $y = f(x)$ en el siguiente espacio.<div>3</div></li><br>${Milimetrado(400, [10, 20, .5])}
                <li>Dibuja la gráfica de $g(x) = f(x-1)$ en el espacio anterior, diferencialos apropiadamente.<div>2</div></li>
                <li>En un eje separado, dibuja la gráfica de la relación inversa.<div>2</div></li><br>${Milimetrado(400, [10, 20, .5])}
            </ol></div><div class="page"></div>`;

                Solucion += `<div class="ans">
            <div>(1a) $f(-3) = -1$, $f(-1) = 3$, $f(2) = 3$, $f(2.001) = -1.001$</div>
            <div>(1b) (Ver gráfica)</div>
            <div>(1c) (Ver gráfica - Es f(x) trasladada 1 unidad a la derecha)</div>
            <div>(1d) (Ver gráfica - Es la gráfica de f(x) reflejada sobre y=x)</div>
            </div>`;

                // --- Problema 2 ---
                const f2_latex = `\\begin{cases} -x + 2 & \\text{si } x < 1 \\\\ (x-1)^2 + 1 & \\text{si } x \\ge 1 \\end{cases}`;

                Pregunta += `<div class="Problema2">2.- Dada la función $g(x)$:
            <div>$g(x) = ${f2_latex}$</div>
            <ol class="FT_ol_a">
                <li>Calcula los valores de $g(0)$, $g(1)$ y $g(3)$.<div>2</div></li>
                <li>Dibuja la gráfica de $g(x)$ y $0.5g(x+1)$ en el siguiente espacio.<div>3</div></li><br>${Milimetrado(400, [10, 20, .5])}
            </ol></div>`;

                Solucion += `<div class="ans">
            <div>(2a) $g(0) = 2$, $g(1) = 1$, $g(3) = 5$</div>
            <div>(2b) (Ver gráfica)</div>
            </div>`;

                // --- Problema 3 ---
                const f3_latex = `\\begin{cases} 4 & \\text{si } x \\le -2 \\\\ x^2 & \\text{si } -2 < x < 2 \\\\ 5-x & \\text{si } x \\ge 2 \\end{cases}`;

                Pregunta += `<div class="Problema2">3.- Dada la función $h(x)$:
            <div>$h(x) = ${f3_latex}$</div>
            <ol class="FT_ol_a">
                <li>Calcula los valores de $h(-5)$, $h(0)$, $h(2)$ y $h(5)$.<div>2</div></li>
                <li>Dibuja la gráfica de $h(x)$ y su relación inversa en el siguiente espacio.<div>3</div></li><br>${Milimetrado(400, [10, 20, .5])}
            </ol></div>`;

                Solucion += `<div class="ans">
            <div>(3a) $h(-5) = 4$, $h(0) = 0$, $h(2) = 3$, $h(5) = 0$</div>
            <div>(3b) (Ver gráfica)</div>
            </div>`;


                // --- Fin ---
                return [Pregunta, Solucion];
            }
        },
        {
            Nombre: "Funciones a Trozos y Transformaciones",
            func: function () {
                let Pregunta = "";
                let Solucion = "";

                // --- Funciones Auxiliares ---

                /**
                 * Genera un entero aleatorio en un rango, opcionalmente excluyendo un valor.
                 * @param {number} min - Mínimo inclusivo
                 * @param {number} max - Máximo inclusivo
                 * @param {number[]} [exclude=[]] - Array de números a excluir
                 */
                function randomInt(min, max, exclude = []) {
                    let num;
                    do {
                        num = Math.floor(Math.random() * (max - min + 1)) + min;
                    } while (exclude.includes(num));
                    return num;
                }

                /**
                 * Genera una pieza de función aleatoria (lineal, cuadrática o constante).
                 * @returns {[string, function]} - [cadena LaTeX, función JS callable]
                 */
                function generarTrozos() {
                    const tipo = randomInt(1, 3);
                    let a, b, c, h, k;

                    switch (tipo) {
                        case 1: // Lineal: ax + b
                            a = randomInt(-3, 3, [0]);
                            b = randomInt(-5, 5);
                            return [`${a}x ${b < 0 ? '-' : '+'} ${Math.abs(b)}`, (x) => a * x + b];

                        case 2: // Constante: c
                            c = randomInt(-5, 5);
                            return [`${c}`, (x) => c];

                        case 3: // Cuadrática: a(x-h)^2 + k
                            a = randomInt(-2, 2, [0]);
                            h = randomInt(-3, 3);
                            k = randomInt(-4, 4);
                            // Simplificar la cadena si h o k son 0
                            let str = `${a}(x ${h > 0 ? '-' : '+'} ${Math.abs(h)})^2 ${k > 0 ? '+' : ''} ${k === 0 ? '' : k}`;
                            if (h === 0) str = `${a}x^2 ${k > 0 ? '+' : ''} ${k === 0 ? '' : k}`;
                            return [str, (x) => a * Math.pow(x - h, 2) + k];
                    }
                }

                /**
                 * Genera una función a trozos de 3 partes para el Problema 1.
                 */
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

                /**
                 * Genera una función a trozos de 2 partes para los Problemas 2-4.
                 */
                function generarFuncion_Prob2_4() {
                    let bp = randomInt(-2, 2);
                    let [f1_str, f1_call] = generarTrozos();
                    let [f2_str, f2_call] = generarTrozos();

                    let latex = `\\begin{cases} ${f1_str} & \\text{si } x < ${bp} \\\\ ${f2_str} & \\text{si } x \\ge ${bp} \\end{cases}`;
                    let callable = (x) => (x < bp) ? f1_call(x) : f2_call(x);

                    return { latex, callable, bp };
                }

                /**
                 * Genera una transformación aleatoria para el Problema 1(c).
                 */
                function generarTransformacion_Prob1(maximo = 5) {
                    const tipo = randomInt(1, maximo);
                    let h = randomInt(-3, 3, [0]);
                    let k = randomInt(-3, 3, [0]);
                    let a = randomInt(2, 3);
                    let b = randomInt(2, 3);

                    switch (tipo) {
                        case 1: return { q_latex: `$f(x) ${k < 0 ? '-' : '+'} ${Math.abs(k)}$` }; // Traslación vertical
                        case 2: return { q_latex: `$f(x ${h < 0 ? '-' : '+'} ${Math.abs(h)})$` }; // Traslación horizontal
                        case 3: return { q_latex: `$${a}f(x)$` }; // Escalamiento vertical
                        case 4: return { q_latex: `$f(${b}x)$` }; // Escalamiento horizontal
                        default: return { q_latex: `relación inversa` }; // Escalamiento horizontal
                    }
                }

                // --- Generación de Problemas ---

                // --- Problema 1 ---
                let f1 = generarFuncion_Prob1();
                const trans1 = generarTransformacion_Prob1(4);
                let v = [
                    f1.bp1 - randomInt(1, 2), // Un valor en el primer trozo
                    f1.bp1,                    // El primer breakpoint
                    Math.round((f1.bp1 + f1.bp2) / 2), // Un valor en el segundo trozo
                    f1.bp2,                    // El segundo breakpoint
                    f1.bp2 + randomInt(1, 2)   // Un valor en el tercer trozo
                ];

                Pregunta += `<div class="Problema2">1.- Dada la siguiente función $f(x)$:
            <div>$f(x) = ${f1.latex}$</div>
            <ol class="FT_ol_a">
                <li>Calcula los siguientes valores:
				
				<ol>
					<table>
						<td><li>$f(${v[0]})$</li></td><td><li>$f(${v[1]})$</li></td><td><li>$f(${v[2]})$</li></td><td> <li>$f(${v[3]})$</li></td><td> <li>$f(${v[4]})$</li></td>
					</table>
				</ol>
				 <div>3</div></li><br>
                <li>Dibuja la gráfica de $f(x)$, en rojo y a ${trans1.q_latex}, en azul, en el siguiente espacio.<div>3</div></li><br>${Milimetrado(250, [10, 10, .2])}
                
                <li>Dibuja la gráfica de $f(x)$, en rojo y la relación inversa, en azul.<div>2</div></li><br>${Milimetrado(250, [10, 10, .2])}
            </ol></div>`;

                Solucion += `<div class="ans">
            <div>(1a) $f(${v[0]}) = ${f1.callable(v[0]).toPrecision(3)}$, $f(${v[1]}) = ${f1.callable(v[1]).toPrecision(3)}$, $f(${v[2]}) = ${f1.callable(v[2]).toPrecision(3)}$, $f(${v[3]}) = ${f1.callable(v[3]).toPrecision(3)}$, $f(${v[4]}) = ${f1.callable(v[4]).toPrecision(3)}$</div>
            <div>(1b) (Ver gráfica)</div>
            <div>(1c) (Ver gráfica)</div>
            <div>(1d) (Ver gráfica)</div>
            </div>`;


                // --- Problemas 2, 3, 4 ---
                for (let i = 2; i <= 3; i++) {
                    const fn = generarFuncion_Prob2_4();
                    //f1 = generarFuncion_Prob1();
                    let vals = [fn.bp - 1, fn.bp, fn.bp + 2];

                    Pregunta += `<div class="Problema2">${i}.- Dada la función $f(x)$:
                <div>$f(x) = ${fn.latex}$</div>
                <ol class="FT_ol_a">
                    <li>Calcula $f(${vals[0]}), f(${vals[1]}), f(${vals[2]})$<div>2</div></li>
                    <li>Dibuja la gráfica de $y = f(x)$, en rojo, y ${generarTransformacion_Prob1().q_latex}, en azul, en el siguiente espacio.<div>3</div></li><br>${Milimetrado(250, [10, 10, .2])}
                </ol></div>`;

                    Solucion += `<div class="ans">
                <div>(${i}a) $h_{${i - 1}}(${vals[0]}) = ${fn.callable(vals[0]).toPrecision(3)}$, $h_{${i - 1}}(${vals[1]}) = ${fn.callable(vals[1]).toPrecision(3)}$, $h_{${i - 1}}(${vals[2]}) = ${fn.callable(vals[2]).toPrecision(3)}$</div>
                <div>(${i}b) (Ver gráfica)</div>
                </div>`;
                }
                /*        
                        Pregunta += `<div class="page"></div>`;
                
                        // --- Problema 5 (Obtener Ecuación desde Gráfica) ---
                        // Generamos una función, la respuesta es la función, la pregunta es el espacio para dibujarla.
                        // El sistema que renderiza esto necesitaría dibujar la gráfica de 'f5' en el Milimetrado.
                        const f5 = generarFuncion_Prob2_4();
                        Pregunta += `<div class="Problema2">5.- Escribe la ecuación de la función a trozos $m(x)$ representada en la siguiente gráfica.<div>4</div>
                            <br>${Milimetrado(400, [10, 10, .5])} 
                            <div>(Sugerencia: La gráfica consta de dos trozos unidos en $x=${f5.bp}$)</div>
                            </div>`;
                            
                        Solucion += `<div class="ans">
                            <div>(5) $m(x) = ${f5.latex}$</div>
                            </div>`;
                
                        // --- Problema 6 (Descripción de Transformaciones) ---
                        // Este es estático como en la V2, ya que son preguntas conceptuales.
                        Pregunta += `<div class="Problema2">6.- Sea $y = f(x)$ la función original. Describe la secuencia de transformaciones (traslaciones y/o escalamientos) que se aplican a $f(x)$ para obtener $g(x)$.
                            <ol class="FT_ol_a">
                                <li>$g(x) = f(x+3) - 5$<div>2</div></li>
                                <li>$g(x) = 2f(x) + 1$<div>2</div></li>
                                <li>$g(x) = f(3x) - 4$<div>2</div></li>
                                <li>$g(x) = \\frac{1}{2}f(x-1)$<div>2</div></li>
                            </ol></div>`;
                
                        Solucion += `<div class="ans">
                            <div>(6a) Traslación horizontal 3 unidades a la izquierda. Traslación vertical 5 unidades hacia abajo.</div>
                            <div>(6b) Escalamiento vertical por factor 2. Traslación vertical 1 unidad hacia arriba.</div>
                            <div>(6c) Escalamiento horizontal por factor 1/3. Traslación vertical 4 unidades hacia abajo.</div>
                            <div>(6d) Escalamiento vertical por factor 1/2. Traslación horizontal 1 unidad a la derecha.</div>
                            </div>`;
                            
                        // --- Problema 7 (Aplicación a un Punto) ---
                        // Este lo podemos hacer dinámico
                        let p_orig = {x: randomInt(2, 6), y: randomInt(5, 10)};
                        let p7 = {
                            a: {k: randomInt(1, 5) * (Math.random() < 0.5 ? 1 : -1)},
                            b: {h: randomInt(1, 5) * (Math.random() < 0.5 ? 1 : -1)},
                            c: {a: Math.random() < 0.5 ? 2 : 0.5},
                            d: {h: randomInt(-3, 3, [0]), k: randomInt(-3, 3, [0])},
                            e: {b: randomInt(2, 4), k: randomInt(-5, 5, [0])}
                        };
                
                        Pregunta += `<div class="Problema2">7.- El punto $P(${p_orig.x}, ${p_orig.y})$ se encuentra en la gráfica de $y = f(x)$. Encuentra las coordenadas del punto $P'$ correspondiente en la gráfica de la función transformada $y = g(x)$.
                            <ol class="FT_ol_a">
                                <li>$g(x) = f(x) ${p7.a.k > 0 ? '+' : ''} ${p7.a.k}$<div>1</div></li>
                                <li>$g(x) = f(x ${p7.b.h > 0 ? '-' : '+'} ${Math.abs(p7.b.h)})$<div>1</div></li>
                                <li>$g(x) = ${p7.c.a}f(x)$<div>1</div></li>
                                <li>$g(x) = f(x ${p7.d.h > 0 ? '-' : '+'} ${Math.abs(p7.d.h)}) ${p7.d.k > 0 ? '+' : ''} ${p7.d.k}$<div>2</div></li>
                                <li>$g(x) = f(${p7.e.b}x) ${p7.e.k > 0 ? '+' : ''} ${p7.e.k}$<div>2</div></li>
                            </ol></div>`;
                            
                        Solucion += `<div class="ans">
                            <div>(7a) $P' = (${p_orig.x}, ${p_orig.y + p7.a.k})$</div>
                            <div>(7b) $P' = (${p_orig.x + p7.b.h}, ${p_orig.y})$</div>
                            <div>(7c) $P' = (${p_orig.x}, ${p_orig.y * p7.c.a})$</div>
                            <div>(7d) $P' = (${p_orig.x + p7.d.h}, ${p_orig.y + p7.d.k})$</div>
                            <div>(7e) $P' = (${(p_orig.x / p7.e.b).toPrecision(3)}, ${p_orig.y + p7.e.k})$</div>
                            </div>`;
                
                        // --- Problema 8 (Escribir Ecuación) ---
                        let f_base = Math.random() < 0.5 ? "x^2" : "x^3";
                        let f_base_call = (x) => (f_base === "x^2") ? Math.pow(x, 2) : Math.pow(x, 3);
                        let h = randomInt(-5, 5, [0]);
                        let a = randomInt(-3, 3, [0, 1]);
                        let k = randomInt(-5, 5, [0]);
                        
                        Pregunta += `<div class="Problema2">8.- La función $f(x) = ${f_base}$ se transforma para crear $g(x)$ mediante la siguiente secuencia:
                            <ol style="list-style-type: decimal;">
                                <li>Una traslación de ${Math.abs(h)} unidades hacia la ${h > 0 ? 'derecha' : 'izquierda'}.</li>
                                <li>Un escalamiento vertical por un factor de ${a}.</li>
                                <li>Una traslación de ${Math.abs(k)} unidades hacia ${k > 0 ? 'arriba' : 'abajo'}.</li>
                            </ol>
                            <div>Escribe la ecuación final de $g(x)$.<div>3</div></div></div>`;
                
                        let g_final = `${a}(x ${h > 0 ? '-' : '+'} ${Math.abs(h)})^${f_base === "x^2" ? 2 : 3} ${k > 0 ? '+' : ''} ${k}`;
                
                        Solucion += `<div class="ans">
                            <div>(8) $g(x) = ${g_final}$</div>
                            </div>`;
                */

                // --- Fin ---
                return [Pregunta, Solucion];
            }
        }
        ]

    }],

};
