const f_geometria = {
    Nombre: "Geometría y trigonometría",
    subtema: [
        {
            Nombre: "Diagrama de Voronoi",
            topico: [{
                Nombre: "Introducción a D. Voronoi",
                func: function () {
                    let Pregunta = `<div class="problema2">
                        <h3>Introducción al Diagrama de Voronoi</h3>
                        <p>El diagrama de Voronoi es una construcción geométrica que divide el plano en regiones (celdas) basadas en la distancia a un conjunto de puntos específicos llamados <b>semillas</b> (o sitios). Cada región contiene todos los puntos que están más cerca de su semilla correspondiente que de cualquier otra semilla.</p>
                        <p>Observe el siguiente diagrama de Voronoi generado en GeoGebra y responda o identifique lo que se le pide.</p>
                        <br>
                        <center>
                        <img src="Voronoi.svg" width="650" alt="Diagrama de Voronoi" style="border: 1px solid #ccc;"/>
                        </center>
                        
                        <ol class="FT_ol_a">
                        <li><b>Semillas (sitios):</b> Utilice un pluma o color para resaltar claramente las semillas en la gráfica. Defina con sus propias palabras qué representa una "semilla" en este contexto. <div>2</div></li>${CR(3)}
                        <li><b>Regiones (Celdas):</b> Pinte o sombree cada región de Voronoi con un color diferente. Explique brevemente cómo se define el área que abarca la celda de una semilla en particular. <div>2</div></li>${CR(3)}
                        <li><b>Fronteras (Aristas):</b> Remarque con color rojo las líneas que dividen las regiones. Conceptualmente, ¿qué propiedad cumplen todos los puntos que están sobre la frontera que divide exactamente a dos semillas?. <div>2</div></li>${CR(3)}
                        <li><b>Vértices:</b> Encierre en un círculo de color verde los vértices donde chocan las fronteras. Defina con sus propias palabras qué es un vértice geométricamente y qué relación de distancia mantiene con las semillas adyacentes. <div>2</div></li>${CR(4)}
                        <li><b>Aplicación:</b> Describa de forma creativa un ejemplo en el que usted utilizaría un diagrama de Voronoi en la vida real (ej. cobertura, localización). <div>2</div></li>${CR(4)}
                        </ol>
                        </div>`;

                    let Solucion = ``;
                    return [Pregunta, Solucion];
                }
            }, {
                Nombre: "D. Voronoi (3 coordenadas)",
                func: function () {
                    let A = [], B = [], C = []
                    let angle = 0, Dangle

                    do {
                        Dangle = Math.random() * .2 + 1.8
                        let r = Math.random() * 10 + 2
                        A = [Math.round((r + 1) * Math.cos(angle + Dangle)), Math.round((r + 1) * Math.sin(angle + Dangle))]
                    } while (!(-10 < A[0] && A[0] < 10 && -10 < A[1] && A[1] < 10))
                    angle += Dangle

                    do {
                        Dangle = Math.random() * .2 + 1.8
                        r = Math.random() * 10 + 2
                        B = [Math.round((r + 1) * Math.cos(angle + Dangle)), Math.round((r + 1) * Math.sin(angle + Dangle))]
                    } while (!(-10 < B[0] && B[0] < 10 && -10 < B[1] && B[1] < 10))
                    angle += Dangle

                    do {
                        Dangle = Math.random() * .2 + 1.8
                        r = Math.random() * 10 + 2
                        C = [Math.round((r + 1) * Math.cos(angle + Dangle)), Math.round((r + 1) * Math.sin(angle + Dangle))]
                    } while (!(-10 < C[0] && C[0] < 10 && -10 < C[1] && C[1] < 10))

                    let Pregunta = `<div class="problema2">1.- Considere que $A:(${A})$, $B:(${B})$ y $C:(${C})$.
                        <br><center>${createAxis([-10, 10, -10, 10, [2, 2], [1, 1]], [400, 400]).outerHTML}</center>
                        <ol class="FT_ol_a">
                        <li>Ubique los puntos $A$, $B$ y $C$ en el plano cartesiano <div>3</div></li>
                        <li>Calcule el punto medio del segmento $\\overline{AB}$<div>1</div></li>  ${CR(2)}  
                        <li>Calcule la pendiente del segmento $\\overline{AB}$ <div>1</div></li>${CR(2)}
                        <li>Calcule la pendiente de la mediatriz del segmento $\\overline{AB}$<div>1</div></li>${CR(2)}
                        <li>Coloque los puntos medios de los segmentos $\\overline{AB}$, $\\overline{AC}$ y $\\overline{BC}$ <div>1</div> </li>
                        <li>Trace las mediatrices de los segmentos $\\overline{AB}$, $\\overline{AC}$ y $\\overline{BC}$ con una línea poco remarcada <div>3</div> </li>
                        <li>Usando las mediatrices dibujadas. Grafique el diagrama de Voronoi correspondiente<div>5</div></li>
                        </ol><div><div class="page"></div>`
                    let pm = [simplify_frac([A[0] + B[0], 2]), simplify_frac([A[1] + B[1], 2])]

                    let Solucion = `<div class="ans">(1b)$P_{AB}=(${fraccion(pm[0][0], pm[0][1])},${fraccion(pm[1][0], pm[1][1])}) $</div>`

                    let mab = simplify_frac([A[1] - B[1], A[0] - B[0]])
                    Solucion += `<div class="ans">(1c) $m_{AB}=${fraccion(mab[0], mab[1])}$</div>`
                    let mpab = simplify_frac([-mab[1], mab[0]])
                    Solucion += `<div class="ans">(1d) $m^p_{AB}=${fraccion(mpab[0], mpab[1], true)}$</div>`




                    do {
                        Dangle = Math.random() * .2 + 1.8
                        let r = Math.random() * 10 + 2
                        A = [Math.round((r + 1) * Math.cos(angle + Dangle)), Math.round((r + 1) * Math.sin(angle + Dangle))]
                    } while (!(-10 < A[0] && A[0] < 10 && -10 < A[1] && A[1] < 10))
                    angle += Dangle

                    do {
                        Dangle = Math.random() * .2 + 1.8
                        r = Math.random() * 10 + 2
                        B = [Math.round((r + 1) * Math.cos(angle + Dangle)), Math.round((r + 1) * Math.sin(angle + Dangle))]
                    } while (!(-10 < B[0] && B[0] < 10 && -10 < B[1] && B[1] < 10))
                    angle += Dangle

                    do {
                        Dangle = Math.random() * .2 + 1.8
                        r = Math.random() * 10 + 2
                        C = [Math.round((r + 1) * Math.cos(angle + Dangle)), Math.round((r + 1) * Math.sin(angle + Dangle))]
                    } while (!(-10 < C[0] && C[0] < 10 && -10 < C[1] && C[1] < 10))

                    Pregunta += `<div class="problema2">2.- En el siguiente plano realice el diagrama de Voronoi cuyas semillas (sitios) son $A:(${A})$, $B:(${B})$ y $C:(${C})$    <br><center>${createAxis([-10, 10, -10, 10, [2, 2], [1, 1]], [400, 400]).outerHTML}<center><div class="mark">5</div></div>`
                    return [Pregunta, Solucion]
                }
            }, {
                Nombre: "D. Voronoi (+3 coordenadas)",
                func: function () {
                    function manyCoordinates(n) {
                        function arrayRepetido(P) {
                            let n = P.length - 1
                            for (let k = 0; k < n; ++k) {
                                if ((P[k][0] == P[n][0]) && (P[k][1] == P[n][1])) {
                                    return true
                                }
                            }
                            return false
                        }
                        const xlim = [-10, 10]
                        const ylim = [-9, 9]
                        const P = []
                        for (let k = 0; k < n; ++k) {
                            do {
                                P[k] = [Math.round(Math.random() * (xlim[1] - xlim[0]) + xlim[0]), Math.round(Math.random() * (ylim[1] - ylim[0]) + ylim[0])]
                            } while (arrayRepetido(P))
                        }
                        return P
                    }
                    function displayP(P) {
                        const n = P.length
                        let S = ""
                        for (let k = 0; k < n; ++k) {
                            S += (k != n - 1 ? (k == 0 ? '' : ', ') : ' y ')
                            S += `$${String.fromCharCode('A'.charCodeAt(0) + k)} = (${P[k]})$`
                        }
                        return S
                    }
                    let P = manyCoordinates(4)
                    let Pregunta = `<div class="problema2">1.- Realice el diagrama de Voronoi con los puntos ${displayP(P)}.<div class="mark">5</div>
                        <br><center>${createAxis([-15, 15, -10, 10, [5, 5], [1, 1]], [600, 400]).outerHTML}</center>`
                    P = manyCoordinates(4)
                    Pregunta += `<div class="problema2">2.- Realice el diagrama de Voronoi con los puntos ${displayP(P)}.<div class="mark">5</div>
                        <br><center>${createAxis([-15, 15, -10, 10, [5, 5], [1, 1]], [600, 400]).outerHTML}</center><div class="page"></div>`
                    P = manyCoordinates(4)
                    Pregunta += `<div class="problema2">3.- Realice el diagrama de Voronoi con los puntos ${displayP(P)}.<div class="mark">5</div>
                        <br><center>${createAxis([-15, 15, -10, 10, [5, 5], [1, 1]], [600, 400]).outerHTML}</center>
                        `
                    P = manyCoordinates(5)
                    Pregunta += `<div class="problema2">4.- Realice el diagrama de Voronoi con los puntos ${displayP(P)}.<div class="mark">5</div>
                        <br><center>${createAxis([-15, 15, -10, 10, [5, 5], [1, 1]], [600, 400]).outerHTML}</center>`

                    let Solucion = ``
                    return [Pregunta, Solucion]
                }
            }
            ]

        },
        {
            Nombre: "Línea Recta",
            topico: [
                {
                    Nombre: "Mediatriz",
                    func: function () {
                        function gcd(a, b) {
                            a = Math.abs(a);
                            b = Math.abs(b);
                            if (b > a) { var temp = a; a = b; b = temp; }
                            while (true) {
                                if (b === 0) return a;
                                a %= b;
                                if (a === 0) return b;
                                b %= a;
                            }
                        }
                        function tempEcLine(m, b) {
                            let ms = simplify_frac([m[0], m[1]]);
                            let bs = simplify_frac([b[0], b[1]]);
                            let cadena = `y =`;
                            if (ms[0] != 0) {
                                if (ms[0] < 0) cadena += "-";
                                if (Math.abs(ms[0]) == 1 && ms[1] == 1) {
                                    cadena += "x";
                                } else {
                                    cadena += fraccion(Math.abs(ms[0]), ms[1]) + "x";
                                }
                            }
                            if (bs[0] != 0) {
                                if (ms[0] != 0 && bs[0] > 0) cadena += "+";
                                else if (bs[0] < 0) cadena += "-";
                                cadena += fraccion(Math.abs(bs[0]), bs[1]);
                            } else if (ms[0] == 0) {
                                cadena += "0";
                            }
                            return cadena;
                        }
                        function tempEcLineGen(D, c) {
                            let A = D[0], B = D[1];
                            if (A < 0 || (A === 0 && B < 0)) { A = -A; B = -B; c = -c; }
                            let cadena = "";
                            let terms = 0;
                            if (A !== 0) {
                                if (A === 1) cadena += "x";
                                else if (A === -1) cadena += "-x";
                                else cadena += `${A}x`;
                                terms++;
                            }
                            if (B !== 0) {
                                if (terms > 0 && B > 0) cadena += "+";
                                if (Math.abs(B) === 1) {
                                    cadena += (B < 0 ? "-" : "") + "y";
                                } else {
                                    cadena += `${B}y`;
                                }
                                terms++;
                            }
                            if (c !== 0) {
                                if (terms > 0 && c > 0) cadena += "+";
                                cadena += `${c}`;
                            } else if (terms === 0) {
                                cadena += "0";
                            }
                            cadena += `=0`;
                            return cadena;
                        }
                        function getValidPoints(op = false) {
                            let A, B;
                            do {
                                A = [Math.ceil(Math.random() * 10 - 5), Math.ceil(Math.random() * 10 - 5)];
                                B = [Math.ceil(Math.random() * 10 - 5), Math.ceil(Math.random() * 10 - 5)];
                            } while (A[0] === B[0] && A[1] === B[1]);
                            while (op && (A[0] === B[0] || A[1] === B[1])) {
                                A = [Math.ceil(Math.random() * 10 - 5), Math.ceil(Math.random() * 10 - 5)];
                                B = [Math.ceil(Math.random() * 10 - 5), Math.ceil(Math.random() * 10 - 5)];
                            }
                            return { A, B };
                        }

                        let Pregunta = ``;
                        let Solucion = ``;
                        let num = 0;

                        // Cuartilla 1
                        for (let i = 0; i < 4; i++) {
                            let { A, B } = getValidPoints();
                            num++;
                            // Pregunta += `<div class="problema2">${num}.- Trace gráficamente la mediatriz del segmento que une los puntos $A:(${A[0]}, ${A[1]})$ y $B:(${B[0]}, ${B[1]})$<div class="mark">5</div><br><center>${createAxis([-10, 10, -10, 10, [2, 2], [1, 1]], [300, 350]).outerHTML}</center></div>${i == 1 ? `<br><div class="page"> </div>` : ``}`;
                            Pregunta += `<div class="problema2">${num}.- Trace gráficamente la mediatriz del segmento que une los puntos $A:(${A[0]}, ${A[1]})$ y $B:(${B[0]}, ${B[1]})$<div class="mark">10</div><br><center><img src="PlanoCartesiano10.svg" width="300" height="300" style="border: 1px solid #ccc;"/></center></div>${i == 1 ? `<br><div class="page"> </div>` : ``}`;
                            Solucion += ``//`<div class="ans">(${num}) Solución gráfica</div> `;
                        }
                        Pregunta += `<div class="page"></div>`;

                        // Cuartilla 2
                        for (let i = 0; i < 3; i++) {
                            let { A, B } = getValidPoints(true);
                            num++;

                            let pm = [simplify_frac([A[0] + B[0], 2]), simplify_frac([A[1] + B[1], 2])];
                            let pm_str = `(${fraccion(pm[0][0], pm[0][1])}, ${fraccion(pm[1][0], pm[1][1])})`;

                            let mab = simplify_frac([B[1] - A[1], B[0] - A[0]]);
                            let mpab = simplify_frac([-mab[1], mab[0]]);

                            let m = [mpab[0], mpab[1]];
                            let b = [(A[1] + B[1]) * m[1] - m[0] * (A[0] + B[0]), 2 * m[1]];
                            b = simplify_frac(b);
                            let ord = tempEcLine(m, b);

                            Pregunta += `<div class="problema2">${num}.- Considere $A:(${A[0]}, ${A[1]})$ y $B:(${B[0]}, ${B[1]})$.<div class="mark">10</div>
                                <ol class="FT_ol_a">
                                <li>Calcule el punto medio $M$.</li>
                                <li>Calcule la pendiente del segmento $\\overline{AB}$ ($m$) y su pendiente perpendicular ($m_{p}$). </li>${CR(1)}
                                <li>Determine de la mediatriz del segmento $\\overline{AB}$ en la forma $y=mx+b$.</li>${CR(2)}
                                </ol>
                                </div>`;
                            Solucion += `<div class="ans">(${num}) $M=${pm_str}, m=${fraccion(mab[0], mab[1])}, m_{\\bot}=${fraccion(mpab[0], mpab[1])} \\rightarrow ${ord}$</div>`;
                        }
                        Pregunta += `<div class="page"></div>`;

                        // Cuartilla 3
                        for (let i = 0; i < 3; i++) {
                            let { A, B } = getValidPoints(true);
                            num++;
                            let Ap = 2 * (B[0] - A[0]);
                            let Bp = 2 * (B[1] - A[1]);
                            let Cp = A[0] * A[0] - B[0] * B[0] + A[1] * A[1] - B[1] * B[1];
                            let g = gcd(Ap, gcd(Bp, Cp));
                            if (g !== 0 && !isNaN(g)) { Ap /= g; Bp /= g; Cp /= g; }
                            let gen = tempEcLineGen([Ap, Bp], Cp);

                            Pregunta += `<div class="problema2">${num}.- Considere $A:(${A[0]}, ${A[1]})$ y $B:(${B[0]}, ${B[1]})$.<div class="mark">10</div>
                            <ol class="FT_ol_a">
                                <li>Calcule el punto medio $M$ </li>
                                <li>Calcule la pendiente del segmento $\\overline{AB}$ ($m$) y la pendiente perpendicular ($m_{p}$) </li>${CR(1)}
                                <li>Determine la ecuación general ($Ax+By+C=0$) de la mediatriz del segmento $\\overline{AB}$. Recuerde que $A \\ge 0$ y que los coeficientes deben ser enteros primos relativos. </li>${CR(2)}
                                </ol>
                            </div>`;
                            Solucion += `<div class="ans">(${num}) $${gen}$</div>`;
                        }


                        return [Pregunta, Solucion];
                    }
                }
            ]
        }
    ]

};
