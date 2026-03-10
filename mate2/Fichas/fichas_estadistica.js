const f_estadistica = {
    Nombre: "Estadística y probabilidad",
    subtema: [
        {
            Nombre: "Correlación",
            topico: [{
                Nombre: "Línea de mejor ajuste",
                func: function () {
                    //Vamos a dar un conjunto de datos que se ajusten a un modelo lineal
                    function datos() {
                        const x = [], y = []
                        const n = Math.round(Math.random() * 5 + 5)
                        const m = (Math.random() * 10 + 1) * (Math.random() < 0.5 ? -1 : 1)
                        const b = (Math.random() * 10 - 10)

                        for (let k = 0; k < n; ++k) {
                            x.push(Math.round(Math.random() * 20))
                            y.push(Math.round((1 + Math.random() * .2) * (m * x[k] + b) + 5 * Math.random()))
                        }
                        return [x, y]
                    }
                    function tablaDatos(x, y) {
                        let S = `<center><table class="tablaEspaciada"><tr><td style="border-right:solid black 1px">$x$</td>`
                        let T = `</tr><tr><td style="border-right:solid black 1px">$y$</td>`
                        for (let k = 0; k < x.length; ++k) {
                            S += `<td>${x[k]}</td>`
                            T += `<td>${y[k]}</td>`
                        }
                        return `${S}${T}</tr></table></center>`
                    }
                    function media(x, y) {
                        let xs = 0, ys = 0
                        let n = x.length
                        for (let k = 0; k < n; ++k) {
                            xs += x[k]
                            ys += y[k]
                        }
                        return [(xs / n).toPrecision(3), (ys / n).toPrecision(3)]
                    }

                    let x, y
                    [x, y] = datos()
                    let Solucion = `<div class="ans">
                        <div>(1b) $M:(${media(x, y)})$</div>
                        <div>(1c)$ ${M_LinReg(x, y, 'ec')}$</div>
                        <div>(1d)$r = ${M_FacPearson(x, y).toPrecision(3)}$</div><br>`
                    let Pregunta = `<div class="Problema2">1.- Considere los siguientes datos:
                    <br>${tablaDatos(x, y)}
                    <ol class="FT_ol_a">
                    <li>Use el siguiente espacio para graficar los datos<div>2</div></li><br>${Milimetrado(600, [10, 20, .2])}
                    <li>Escriba y grafique $M:(\\overline{x},\\overline{y})$<div>1</div></li>
                    <li>Escriba y grafique la línea de mejor ajuste<div>2</div></li>
                    <li>Escriba el factor de correlación de Pearson<div>2</div></li>
                    </ol><div><div class="page"></div>
                    `
                    let x1, y1
                    [x1, y1] = datos()
                    Solucion += `<div class="ans">
                        <div>(2b) $M:(${media(x1, y1)})$</div>
                        <div>(2c)$ ${M_LinReg(x1, y1, 'ec')}$</div>
                        <div>(2c)$r = ${M_FacPearson(x1, y1).toPrecision(3)}$</div>
                                    </div>`
                    Pregunta += `<div class="Problema2">2.- Considere los siguientes datos:
                    <br>${tablaDatos(x1, y1)}
                    <ol class="FT_ol_a">
                    <li>Use el siguiente espacio para graficar los datos<div>2</div></li><br>${Milimetrado(600, [10, 20, .2])}
                    <li>Escriba y grafique $M:(\\overline{x},\\overline{y})$<div>1</div></li>
                    <li>Escriba y grafique la línea de mejor ajuste<div>2</div></li>
                    <li>Escriba el factor de correlación de Pearson<div>2</div></li>
                    </ol><div>
                    `



                    //VAmos a aqui ----------------------------------------------

                    return [Pregunta, Solucion]
                }
            }, {
                Nombre: "Pearson y Spearman",
                func: function () {
                    //Vamos a dar un conjunto de datos que se ajusten a un modelo lineal
                    function datos() {
                        const x = [], y = []
                        const n = Math.round(Math.random() * 5 + 5)
                        const m = (Math.random() * 10 + 1) * (Math.random() < 0.5 ? -1 : 1)
                        const b = (Math.random() * 10 - 10)

                        for (let k = 0; k < n; ++k) {
                            x.push(Math.round(Math.random() * 20))
                            y.push(Math.round(m * x[k] + b + 5 * Math.random()))
                        }
                        return [x, y]
                    }
                    function tablaDatos(x, y) {
                        let S = `<center><table class="tablaEspaciada"><tr><td style="border-right:solid black 1px">$x$</td>`
                        let T = `</tr><tr><td style="border-right:solid black 1px">$y$</td>`
                        for (let k = 0; k < x.length; ++k) {
                            S += `<td>${x[k]}</td>`
                            T += `<td>${y[k]}</td>`
                        }
                        return `${S}${T}</tr></table></center>`
                    }
                    function media(x, y) {
                        let xs = 0, ys = 0
                        let n = x.length
                        for (let k = 0; k < n; ++k) {
                            xs += x[k]
                            ys += y[k]
                        }
                        return [(xs / n).toPrecision(3), (ys / n).toPrecision(3)]
                    }

                    let x, y
                    [x, y] = datos()
                    let Solucion = `<div class="ans"><div>(1b) $M:(${media(x, y)})$</div> <div>(1c)$ ${M_LinReg(x, y, 'ec')}`//Algo anda mal $(1d)(i)${tlacu.stat.cuartil(x)}(ii)${tlacu.stat.cuartil(y)}(1e)${Spearman(x,y).toFixed(3)}</div>`
                    let Pregunta = `<div class="Problema2">1.- Considere los siguientes datos:
                    <br>${tablaDatos(x, y)}
                    <ol class="FT_ol_a">
                    <li>Use el siguiente espacio para graficar los datos<div>2</div></li><br>${Milimetrado(600, [10, 20, .2])}
                    <li>Escriba y grafique $M:(\\overline{x},\\overline{y})$<div>1</div></li>
                    <li>Escriba y grafique la línea de mejor ajuste<div>2</div></li>
                    <li>Dibuje en el siguiente espacio las cajas de bigotes para <br>eje $x$<br>
                    ${Milimetrado(600, [3, 20, .2])}<br>eje $y$<br>${Milimetrado(600, [3, 20, .2])}
                    <div>2</div></li><br>
                    <li>Calcule el valor del factor de correlación de Spearman<div>3</div></li>
                    </ol><div><!--div class="page"></div-->
                    `


                    Pregunta += `<div class="Problema2">2.- Obtenga los factores de correlación de Pearson de los siguientes datos.`

                    for (let it = 0; it < 3; ++it) {
                        let x1, y1
                        [x1, y1] = datos()
                        Solucion += `<div>(2-${it + 1})${Spearman(x1, y1).toFixed(3)}</div>`
                        Pregunta += `<br>${tablaDatos(x1, y1)}<br><div style="float: right">[3]</div>`
                    }
                    Solucion += `</div>`
                    Pregunta += `</div>`



                    //VAmos a aqui ----------------------------------------------

                    return [Pregunta, Solucion]
                }
            }
            ]

        }, {
            Nombre: "Chi cuadrada",
            topico: [{
                Nombre: "Chi cuadrada",
                func: function () {
                    let color = ['Verde', 'Rojo', 'Azul', 'Negro', 'Blanco']
                    const size = [Math.floor(Math.random() * 3.9 + 2), Math.floor(Math.random() * 4.9 + 2)]
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
        1. Se desea saber si existe una diferencia significativa entre los gustos de colores de entre salones. Para ello se aplica la prueba \\( \\chi^2 \\) con un nivel de significancia de 5%. Los valores observados se muestran a continuación
        
        <center><table border="1" cellpadding="8" cellspacing="0">`
                    Pregunta += `</tr><th>\\</th>`
                    for (let k1 = 0; k1 < size[0]; ++k1) {
                        Pregunta += ` <th>${color[k1]}</th>`
                    }
                    Pregunta += `<th>Total</th></tr>`
                    let O = []
                    for (let k = 0; k < size[1]; ++k) {
                        O[k] = []
                        Pregunta += ` <tr><td>Salón ${k + 1}</td>`
                        for (let k1 = 0; k1 < size[0]; ++k1) {
                            O[k].push(Math.ceil(Math.random() * 10))
                            Pregunta += `<td>${O[k][k1]}</td>`
                        }
                        Pregunta += `<td></td></tr>`
                    }
                    const [E, totalCols, totalRows, total] = chi_matriz_esperada(O)
                    console.log("O")
                    console.log(O)
                    console.log("E")
                    console.log(E)

                    Pregunta += `</tr><th>Total</th>`
                    for (let k1 = 0; k1 < size[0]; ++k1) {
                        Pregunta += ` <th></th>`
                    }
                    const Pos = [Math.floor(Math.random() * size[1]), Math.floor(Math.random() * size[0])]
                    console.log("P:" + Pos)

                    Pregunta += `<th></th></tr>`
                    Pregunta += `</table></center>

        <ol class="FT_ol_a">
            <li>Escriba las hipótesis nula y alternativa <div>1</div></li>${CR(2)}
            <li>Escriba los grados de libertad usando la fórmula  $GL = (\\text{Total de fila} \\times \\text{Total de columna})/\\text{Total general}$             <div>1<div></li> ${CR(1)}
            <li>Complete la tabla escribiendo los totales. <div>1</div></li>
            <li>Calcule el valor esperado del salón ${Pos[0] + 1} al elegir el color "${color[Pos[1]]}". <div>1</div></li>${CR(1)}<div class="page"></div>
            <li>Complete la tabla de datos esperados a continuación. <div>1</div></li>`

                    Pregunta += `<center><table border="1" cellpadding="8" cellspacing="0"></tr><th>\\</th>`
                    for (let k1 = 0; k1 < size[0]; ++k1) {
                        Pregunta += ` <th>${color[k1]}</th>`
                    }
                    Pregunta += `<th>Total</th></tr>`
                    for (let k = 0; k < size[1]; ++k) {
                        Pregunta += ` <tr><td>Salón ${k + 1}</td>`
                        for (let k1 = 0; k1 < size[0]; ++k1) {
                            Pregunta += `<td></td>`
                        }
                        Pregunta += `<td></td></tr>`
                    }
                    Pregunta += `</tr><th>Total</th>`
                    for (let k1 = 0; k1 < size[0]; ++k1) {
                        Pregunta += ` <th></th>`
                    }
                    Pregunta += `<th></th></tr>`
                    Pregunta += `</table></center>`


                    Pregunta += `<li>Calcule el valor de \\( \\chi_{\\text{Calc}}^2 \\).<div>2</div></li>${CR(3)}
            <li>Escriba, usando una tabla de $\\chi^2$, el valor de $\\chi^2_{\\text{Crít}}$<div>2</div></li>${CR(1)}
            <li>Usando sus respuestas anteriores, realice una conclusión, justifique su respuesta.<div>2</div></li>${CR(3)}
        </ol><div>`
                    let chical = chiCuadradaCal(O, E)
                    let chitabla = chitablas((size[0] - 1) * (size[1] - 1), 0.05)
                    let Solucion = `<div class="ans"><div>(b) GL = ${(size[0] - 1) * (size[1] - 1)}</div>
                                    <div>Total Col:${totalCols}, total col:${totalRows},total:${total}</div>    
                                    <div>(d) ${E[Pos[0]][Pos[1]].toPrecision(3)}</div><div>(f) $\\chi^2_{\\text{Calc}} \\approx${chical.toPrecision(3)}$</div>
                                    <div>(g) $\\chi^2_{\\text{crít}}=${chitabla}$</div>
                                    <div>(h)Acepta ${chitabla > chical ? "$H_0$" : "$H_1$"}</div></div>`
                    return [Pregunta, Solucion]
                }

            }]
        }, {
            Nombre: "t-Student",
            topico: [{
                Nombre: "prueba t student",
                func: function () {


                    /*let datos=[ [21,21,26,25,28,24],
                                [24,25,25,26,32,29]]*/
                    let datos = [[], []]
                    let n = [Math.round(Math.random() * 10 + 5), Math.round(Math.random() * 10 + 5)]
                    if (n[0] == n[1]) {
                        ++n[1]
                    }
                    let dummy = [Math.random() * 20, Math.random() * 2]

                    for (let k = 0; k < n[0]; ++k) datos[0].push(Math.round(dummy[0] + 1 / ((1 - Math.random()) * dummy[1])))
                    for (let k = 0; k < n[1]; ++k) datos[1].push(Math.round(dummy[0] + 1 / ((1 - Math.random()) * dummy[1])))


                    let Pregunta = `
        <h3>Fórmula</h3>
        <p>La estadística de t-student para muestras pequeñas con misma cantidad de muestras y con misma desviación estándar similar, se calcula usando la siguiente fórmula:</p>
        <p>
            \\[
            t_{calc} = \\frac{\\overline{x_1}-\\overline{x_2}}{\\sqrt{\\frac{S_1^2}{n_1}+\\frac{S_2^2}{n_2}}}
            \\]
        </p>
        
    
        <div class="problema2">

        1. Se desea aplicar la prueba de t-student para saber si existe uns diferencia significativa entre dos muestras con un nivel de significancia de 5%.
        las muestra son las siguientes<br> <center>${tablaDatos(datos, ['muestra 1', 'muestra 2'])}</center>
        
        
        <ol class="FT_ol_a">
            <li>Escriba las hipótesis nula y alternativa <div>1</div></li>
            <li>Escriba los grados de libertad. <div>1</div></li> 
            <li>Escriba las desviaciones estándar. <div>1</div></li>
            <li>Escriba el valor crítico de la prueba. <div>1</div></li>
            <li>Calcule el valor $t_{calc}$. <div>1</div></li>
            <li>Realice una conclusión basado en sus respuestas anteriores. <div>1</div></li>
            </ol><div class="page"></div>
            `
                    let resp = tcalc_1(datos, true)
                    let Solucion = `  (1b) gl = ${datos[0].length + datos[1].length - 2}
                            (1c) S_1=${Math.sqrt(resp[3]).toPrecision(4)}, S_2=${Math.sqrt(resp[4]).toPrecision(4)}
                            (1e) $t_{calc} = ${resp[0].toPrecision(4)}$
                            `

                    datos = [[], []]
                    n = [Math.round(Math.random() * 10 + 5), Math.round(Math.random() * 10 + 5)]
                    if (n[0] == n[1]) {
                        ++n[1]
                    }
                    dummy = [Math.random() * 20, Math.random() * 2]

                    for (let k = 0; k < n[0]; ++k) datos[0].push(Math.round(dummy[0] + 1 / ((1 - Math.random()) * dummy[1])))
                    for (let k = 0; k < n[1]; ++k) datos[1].push(Math.round(dummy[0] + 1 / ((1 - Math.random()) * dummy[1])))


                    resp = tcalc(datos, true)
                    Solucion += `  (2b) gl = ${datos[0].length + datos[1].length - 2}
                            (2c) S_1=${Math.sqrt(resp[3]).toPrecision(4)}, S_2=${Math.sqrt(resp[4]).toPrecision(4)}
                            (2e) $t_{calc} = ${resp[0].toPrecision(4)}$
                            `
                    //Solucion +=`(2e) ${tcalc(datos)}`

                    Pregunta += `
        <h3>Fórmula</h3>
        <p>La estadística de t-student para muestras con distinta desviación estándar, se calcula usando la siguiente fórmula:</p>
        <p>
            \\[
            t_{calc} = \\frac{\\overline{x_1}-\\overline{x_2}}{\\sqrt{\\left(\\frac{(n_1+1)S_1^2+(n_2+1)S_2^2}{n_1+n_2-2}\\right)\\left(\\frac{1}{n_1}+\\frac{1}{n_2}\\right)}}
            \\]
        </p>
        
    
        <div class="problema2">

        1. Se desea aplicar la prueba de t-student para saber si existe uns diferencia significativa entre dos muestras con un nivel de significancia de 5%.
        las muestra son las siguientes<br> <center>${tablaDatos(datos, ['muestra 1', 'muestra 2'])}</center>
        
        
        <ol class="FT_ol_a">
            <li>Escriba las hipótesis nula y alternativa <div>1</div></li>
            <li>Escriba los grados de libertad. <div>1</div></li>
            <li>Escriba las desviaciones estándar. <div>1</div></li>
            <li> 
                    <ol>
                    <li>Calcule el valor de $\\left(\\frac{(n_1+1)S_1^2+(n_2+1)S_2^2}{n_1+n_2-2}\\right)$</li>
                    <li>Calcule el valor de $\\left(\\frac{1}{n_1}+\\frac{1}{n_2}\\right)$</li>
                    <li>Calcule el valor de $t_{calc}$ sustituyendo<div>1</div></li>
                    </ol>
            </li>
            <li>Escriba el valor crítico de la prueba . <div>1</div></li>
            <li>Calcule el valor $t_{calc}$ usando su calculadora. <div>1</div></li>
            <li>Realice una conclusión basado en sus respuestas anteriores. <div>1</div></li>
            </ol>
            `
                    return [Pregunta, Solucion]
                }

            }, {
                Nombre: "Prueba t de una muestra (Contextual)",
                func: function () {
                    function generarProblema(num) {
                        let H1_type = 2;
                        let context = Math.floor(Math.random() * 14);

                        let n = Math.floor(Math.random() * 5) + 10; // 10 a 14 datos
                        let datos = [];
                        let suma = 0;
                        for (let i = 0; i < n; i++) {
                            let val = Math.floor(Math.random() * 50 + 100) + Math.floor((Math.random() - 0.5) * 20);
                            datos.push(val);
                            suma += val;
                        }

                        let promedio = suma / n;
                        let difCuadrados = [];
                        let sumaCuadrados = 0;

                        for (let i = 0; i < n; i++) {
                            let dif2 = Math.pow(datos[i] - promedio, 2);
                            difCuadrados.push(dif2);
                            sumaCuadrados += dif2;
                        }

                        let s = Math.sqrt(sumaCuadrados / (n - 1));

                        let mu0 = Math.round(promedio + 3 * (Math.random() < .5 ? 1 : -1) * Math.random() * s);
                        H1_type = Math.random() < .25 ? 2 : (promedio > mu0 ? 0 : 1);
                        let compText = H1_type === 0 ? "mayor a" : (H1_type === 1 ? "menor a" : "diferente a");
                        let P = "";
                        let baseText = "";
                        let unidad = "";

                        let res = "";
                        if (window.tlacu && window.tlacu.stat && window.tlacu.stat.t_test) {
                            res = window.tlacu.stat.t_test(mu0, datos, H1_type);
                        } else {
                            let t = (promedio - mu0) / (s / Math.sqrt(n));
                            res = [t, 0.05]; // fallback para test local si tlacu no ha cargado bien
                        }

                        let t_calc = res[0] || (promedio - mu0) / (s / Math.sqrt(n));
                        let p_value = res[1] || 0.05;

                        if (context === 0) {
                            unidad = "gramos"; baseText = "El peso promedio del producto";
                            P = `Se afirma que el peso promedio de un producto es de $\\mu = ${mu0}$ ${unidad}. Si el equipo de control de calidad desea probar la hipótesis de que el peso promedio real es ${compText} ${mu0} ${unidad}.`;
                        } else if (context === 1) {
                            unidad = "horas"; baseText = "El tiempo de vida de las baterías";
                            P = `Una empresa indica que el tiempo de vida de sus baterías es de $\\mu = ${mu0}$ ${unidad}. Se realizará un estudio para probar la hipótesis de que el tiempo de vida real es ${compText} ${mu0} ${unidad}.`;
                        } else if (context === 2) {
                            unidad = "km/l"; baseText = "El rendimiento promedio del automóvil";
                            P = `El rendimiento promedio reportado de un automóvil es de $\\mu = ${mu0}$ ${unidad}. En pruebas recientes se busca verificar la hipótesis de que el rendimiento real es ${compText} ${mu0} ${unidad}.`;
                        } else if (context === 3) {
                            unidad = "$^{\\circ}\\text{C}$"; baseText = "La temperatura promedio del proceso";
                            P = `Históricamente la temperatura promedio de un proceso químico es de $\\mu = ${mu0}$ ${unidad}. Se plantea la hipótesis de que la temperatura ha cambiado a ser ${compText} ${mu0} ${unidad}.`;
                        } else if (context === 4) {
                            unidad = "pesos"; baseText = "El gasto promedio diario de los estudiantes";
                            P = `Un análisis previo señala que el gasto promedio diario de los estudiantes en la cafetería es de $\\mu = ${mu0}$ ${unidad}. Si se desea evaluar la hipótesis de que el gasto promedio diario es ${compText} ${mu0} ${unidad}.`;
                        } else if (context === 5) {
                            unidad = "ml"; baseText = "El contenido promedio de la botella";
                            P = `La etiqueta de un refresco indica que el volumen promedio por botella es de $\\mu = ${mu0}$ ${unidad}. Un organismo evalúa la hipótesis de que el contenido promedio real es ${compText} ${mu0} ${unidad}.`;
                        } else if (context === 6) {
                            unidad = "minutos"; baseText = "El tiempo promedio de espera";
                            P = `Un banco afirma que el tiempo promedio de espera en fila para sus clientes es de $\\mu = ${mu0}$ ${unidad}. Se lleva a cabo una auditoría para comprobar la hipótesis de que el tiempo promedio de espera es ${compText} ${mu0} ${unidad}.`;
                        } else if (context === 7) {
                            unidad = "kg"; baseText = "La resistencia promedio del cable";
                            P = `El fabricante asegura que la resistencia a la tensión promedio de un cable es de $\\mu = ${mu0}$ ${unidad}. Para garantizar la seguridad del producto, se busca someter a prueba la hipótesis de que la resistencia promedio es ${compText} ${mu0} ${unidad}.`;
                        } else if (context === 8) {
                            unidad = "días"; baseText = "El tiempo de vida de los focos";
                            P = `El fabricante reporta que el tiempo de vida de sus focos LED es de $\\mu = ${mu0}$ ${unidad}. Si se analiza una muestra para investigar la hipótesis de que el tiempo de vida es ${compText} ${mu0} ${unidad}.`;
                        } else if (context === 9) {
                            unidad = "ml"; baseText = "La cantidad promedio de jugo";
                            P = `Se empacan botellas de jugo donde la cantidad promedio declarada es $\\mu = ${mu0}$ ${unidad}. Si se hace una auditoría para verificar la hipótesis de que la cantidad promedio es ${compText} ${mu0} ${unidad}.`;
                        } else if (context === 10) {
                            unidad = "cm"; baseText = "La longitud promedio de las piezas";
                            P = `Las especificaciones de una pieza de madera exigen que su longitud promedio sea de $\\mu = ${mu0}$ ${unidad}. Si se toma una muestra para someter a prueba la hipótesis de que la longitud promedio de las piezas es ${compText} ${mu0} ${unidad}.`;
                        } else if (context === 11) {
                            unidad = "puntos"; baseText = "El puntaje promedio del examen";
                            P = `Históricamente, el puntaje promedio de cierto examen estandarizado es de $\\mu = ${mu0}$ ${unidad}. Si se busca probar la hipótesis de que el puntaje promedio de la última generación de estudiantes es ${compText} ${mu0} ${unidad}.`;
                        } else if (context === 12) {
                            unidad = "meses"; baseText = "El tiempo promedio de uso de una computadora";
                            P = `Se afirma que el tiempo promedio que un usuario conserva su computadora antes de reemplazarla es de $\\mu = ${mu0}$ ${unidad}. Si un analista de mercado quiere comprobar la hipótesis de que el tiempo de uso es ${compText} ${mu0} ${unidad}.`;
                        } else {
                            unidad = "calorías"; baseText = "La cantidad promedio de calorías del platillo";
                            P = `Un menú dietético exhibe que la cantidad de calorías de cierto platillo es de $\\mu = ${mu0}$ ${unidad}. Si se evalúa la hipótesis de que la cantidad promedio de calorías real es ${compText} ${mu0} ${unidad}.`;
                        }

                        let tablaDifHtml = '<center><table style="border-collapse: collapse; margin: 25px 0; width: 90%; text-align: center;" border="1">';
                        tablaDifHtml += '<tr><th style="padding: 8px;">$x_i$</th>' + datos.map(d => `<td style="padding: 8px;">${d}</td>`).join('') + '</tr>';
                        tablaDifHtml += '<tr><th style="padding: 8px;">$(x_i - \\bar{x})^2$</th>' + datos.map(d => `<td style="padding: 8px; height: 40px;"></td>`).join('') + '</tr>';
                        tablaDifHtml += `<tr><th style="padding: 8px;">$\\sum$</th><td colspan="${n}" style="height: 40px;"></td></tr></table></center>`;

                        let Pregunta = `
                        <div class="problema2">
                            <p>${num}.- ${P}</p>
                            <!-- Mas adelante se despliegan los datos -->
                            <ol class="FT_ol_a">
                                <li>Escriba la hipótesis nula ($H_0$) y la hipótesis alternativa ($H_1$).<div>2</div></li>
                                <tlacuache-renglon n="2" color="gray" alto="30"></tlacuache-renglon>
                                <li>A continuación aparecen los datos recolectados. Calcule la media muestral ($\\bar{x}$) y la desviación estándar de la muestra ($S_x$). Puede apoyarse completando la siguiente tabla para sumar sus diferencias.<div>4</div></li>
                                ${tablaDifHtml}
                                <li>Calcule el estadístico de prueba. $$t_{calc} = \\frac{\\bar{x} - \\mu_0}{\\frac{S_x}{\\sqrt{n}}} $$.<div>2</div></li>
                                <tlacuache-renglon n="2" color="gray" alto="30"></tlacuache-renglon>
                                <li>Escriba el valor p (p-value). Con un nivel de significancia de $\\alpha = 0.05$, redacte la conclusión de su estudio.<div>2</div></li>
                                <tlacuache-renglon n="2" color="gray" alto="30"></tlacuache-renglon>
                            </ol>
                        </div>`;

                        let correctH1_sign = H1_type === 0 ? ">" : (H1_type === 1 ? "<" : "\\neq");
                        let correctH0_sign = H1_type === 0 ? "\\leq" : (H1_type === 1 ? "\\geq" : "=");
                        let correctH1_text = H1_type === 0 ? "es mayor a" : (H1_type === 1 ? "es menor a" : "es diferente a");

                        let Solucion = `<div class="ans">
                            <div style="font-weight: bold; width: 100%;">Pregunta ${num}</div>
                            <div>(1) $H_0: \\mu ${correctH0_sign} ${mu0}$, $H_1: \\mu ${correctH1_sign} ${mu0}$. Textual: ${baseText} ${correctH1_text} ${mu0} ${unidad}.</div>
                            <div>(2) $\\bar{x} = ${promedio.toFixed(4)}$ y $S_x = ${s.toFixed(4)}$</div>
                            <div>(3) $t_{calc} = ${t_calc.toFixed(4)}$</div>
                            <div>(4) $p\\text{-value} = ${p_value.toFixed(4)}$. ${p_value < 0.05 ? "Se rechaza $H_0$" : "No se rechaza $H_0$"}.</div>
                        </div><br>`;

                        return [Pregunta, Solucion];
                    }

                    let p1 = generarProblema(1);
                    let p2 = generarProblema(2);

                    return [p1[0] + '<div class="page"></div>' + p2[0], p1[1] + p2[1]];
                }
            }]
        }
    ]

};
