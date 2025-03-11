const Ficha = [{
	Nombre:"Parcial 1",
	subtema:[]
},{
	Nombre:"Parcial 2",
	subtema:[
        {
            Nombre:"Mínimos cuadrados",
            topico:[{
                Nombre:"Línea recta",
                func:function(){
                    function getCoordinates(){
                        const xlim=[-10,10]
                        const n=Math.round(Math.random()*10)+6

                        let x, y, L=[(Math.random()<0.5?1:-1)*(Math.random()*3+.5),Math.random()*20-10]
                        P=[[],[],[]]
                        for(let k=0; k<n; ++k){
                            x=Math.random()*(xlim[1]-xlim[0])+xlim[0]
                            y=L[0]*x+L[1]+Math.round(Math.random()*5-2.5)
                            P[0].push(x.toPrecision(2))
                            P[1].push(y.toPrecision(2))
                        }
                        P[2] = [Math.ceil(Math.min(...P[1])/5)*5,Math.floor((Math.max(...P[1])/5)+1)*5]
                        console.log(P[2])
                        return P
                    }
                    P = getCoordinates()
                    let Pregunta = `<div class="problema2">
        <h1>Ficha de Trabajo</h1>
        <h2>Ajuste por Mínimos Cuadrados de una Línea Recta</h2>

        <h3>Objetivo</h3>
        <p>Aplicar el método de mínimos cuadrados para ajustar una línea recta a un conjunto de puntos dados y representar gráficamente los resultados usando Python.</p>

        <h3>Materiales y Herramientas</h3>
        <ul>
            <li>Computadora con Python instalado</li>
            <li>Librerías necesarias: <code>numpy</code>, <code>matplotlib</code></li>
            <li>Entorno de programación: Jupyter Notebook, Google Colab, VS Code u otro</li>
        </ul>

        <h3>Conceptos Clave</h3>
        <ul>
            <li><strong>Mínimos cuadrados:</strong> Método para encontrar la mejor línea que se ajusta a un conjunto de datos minimizando la suma de los cuadrados de los errores.</li>
            <li><strong>Ecuación de la recta ajustada:</strong> \\( y = mx + b \\)</li>
        </ul>

        <h3>Instrucciones</h3>
        <ol>
            <li><strong>Gráfica de los puntos:</strong>
                <ul>
                    <li>Se proporcionan los siguientes datos:<br><center><tlacuache-tabla estilo="dato" nombre="$x$,$y$", row1="${P[0]}" row2="${P[1]}" ></tlacuache-tabla></center></li>
                    <li>Representar estos puntos en un gráfico de dispersión con <code>matplotlib</code> como aparece a continuación.<br>
                    <center><tlacuache-ejes size="320,480" xlabel="Eje x" ylabel="Eje y" xlim="-10,10" ylim="${P[2]}" dx="2" dy="5"  >
                        <tlacuache-plot x="${P[0]}" y="${P[1]}"  mark="o" color="red"></tlacuache-plot >
                    </tlacuache-plot></center>

  </tlacuache-ejes >
  </li>
                </ul>
            </li>
            <li><strong>Cálculo de la recta de mínimos cuadrados:</strong>
                <ul>
                    <li>Implementar código en Python para calcular <code>m</code> y <code>b</code> con las fórmulas matemáticas.</li>
                </ul>
            </li>
            <li><strong>Gráfico de la recta ajustada:</strong>
                <ul>
                    <li>Graficar la recta sobre los puntos.</li>
                </ul>
            </li>
        </ol>

        <h3>Formato de Entrega</h3>
        <ul>
            <li>Captura de pantalla del gráfico final con los puntos y la línea ajustada.</li>
            <li>Código fuente en Python en un archivo <code>.py</code>.</li>
        </ul>

        <h3>Criterios de Evaluación</h3>
        <ul>
            <li>✅ Representación correcta de los puntos en la gráfica.</li>
            <li>✅ Implementación correcta del método de mínimos cuadrados.</li>
            <li>✅ Gráfico final con la recta ajustada correctamente sobre los puntos.</li>
            <li>✅ Claridad y organización del código.</li>
        </ul>
                    
                    </div>`
                    return Pregunta
                }
            },{
                Nombre:"Parábola",
                func:function(){
                    function getCoordinates(){
                        const xlim=[-10,10]
                        const n=Math.round(Math.random()*10)+6

                        let x, y, p=[(Math.random()<0.5?1:-1)*(Math.random()*3+.5),(Math.random()<0.5?1:-1)*(Math.random()*3+.5),Math.random()*20-10,(Math.random()<0.5?1:-1)*(Math.random()*3+.5)]
                        const P=[[],[],[]]
                        for(let k=0; k<n; ++k){
                            x=Math.random()*(xlim[1]-xlim[0])+xlim[0]
                            y=p[0]*x*x+p[1]*x+p[2]
                            P[0].push(x.toPrecision(2))
                            P[1].push(y.toPrecision(2))
                        }
                        P[2] = [Math.ceil(Math.min(...P[1])/5)*5,Math.floor((Math.max(...P[1])/5)+1)*5]
                        return P
                    }
                    const P = getCoordinates()
                    let Pregunta = `<div class="problema2">
        <h1>Ficha de Trabajo</h1>
        <h2>Ajuste por Mínimos Cuadrados de una Parábola</h2>

        <h3>Objetivo</h3>
        <p>Aplicar el método de mínimos cuadrados para ajustar una parábola a un conjunto de puntos dados y representar gráficamente los resultados usando Python.</p>

        <h3>Materiales y Herramientas</h3>
        <ul>
            <li>Computadora con Python instalado</li>
            <li>Librerías necesarias: <code>numpy</code>, <code>matplotlib</code></li>
            <li>Entorno de programación: Jupyter Notebook, Google Colab, VS Code u otro</li>
        </ul>

        <h3>Conceptos Clave</h3>
        <ul>
            <li><strong>Mínimos cuadrados:</strong> Método para encontrar la mejor parábola que se ajusta a un conjunto de datos minimizando la suma de los cuadrados de los errores.</li>
            <li><strong>Ecuación de la parábola ajustada:</strong> \\( y = ax^2+bx+c \\)</li>.
        </ul>

        <h3>Instrucciones</h3>
        <ol>
            <li><strong>Gráfica de los puntos:</strong>
                <ul>
                    <li>Se proporcionan los siguientes datos:<br><br><center><tlacuache-tabla estilo="dato" nombre="$x$,$y$", row1="${P[0]}" row2="${P[1]}" ></tlacuache-tabla></center></li>
                    <li>Representar estos puntos en un gráfico de dispersión con <code>matplotlib</code> como se muestra continuación
                    <br><center><tlacuache-ejes size="320,480" xlabel="Eje x" ylabel="Eje y" xlim="-10,10" ylim="${P[2]}" dx="2" dy="5"  >
                        <tlacuache-plot x="${P[0]}" y="${P[1]}"  mark="o" color="red"></tlacuache-plot >
                    </tlacuache-plot></center></li>
                </ul>
            </li>
            <li><strong>Cálculo de la parábola con mínimos cuadrados:</strong>
                <ul>
                    <li>Implementar código en Python para calcular la parábola de mejor ajuste.</li>
                </ul>
            </li>
            <li><strong>Gráfico de la parábola ajustada:</strong>
                <ul>
                    <li>Graficar la parábola sobre los puntos.</li>
                </ul>
            </li>
        </ol>

        <h3>Formato de Entrega</h3>
        <ul>
            <li>Captura de pantalla del gráfico final con los puntos y la parábola ajustada.</li>
            <li>Código fuente en Python en un archivo <code>.py</code> o <code>.ipynb</code>.</li>
        </ul>

        <h3>Criterios de Evaluación</h3>
        <ul>
            <li>✅ Representación correcta de los puntos en la gráfica.</li>
            <li>✅ Implementación correcta del método de mínimos cuadrados.</li>
            <li>✅ Gráfico final con la parábola ajustada correctamente sobre los puntos.</li>
            <li>✅ Claridad y organización del código.</li>
        </ul>
                    
                    </div>`
                    return Pregunta
                }
            },{
                Nombre:"Circunferencia",
                func:function(){
                    function getCoordinates(){
                        const P=[[],[],[],[]]
                        const n=Math.round(Math.random()*15)+10

                        const h=(Math.random()<0.5?1:-1)*(Math.random()*3+.5)
                        const k=(Math.random()<0.5?1:-1)*(Math.random()*3+.5)
                        const r=Math.random()*5+2
                        let t, x, y
                        P[2]=[Math.floor((h-r)/5)*5,Math.ceil((h+r)/5)*5]
                        P[3]=[Math.floor((k-r)/5)*5,Math.ceil((k+r)/5)*5]
                        console.log(`h=${h}, k=${k}, r=${r}; Xlim=${P[2]}, Ylim=${P[3]}`)
                        for(let k1=0; k1<n; ++k1){
                            t = 2*Math.PI*Math.random()
                            x=h+r*Math.cos(t)
                            y=k+r*Math.sin(t)

                            P[0].push(x.toPrecision(2))
                            P[1].push(y.toPrecision(2))
                        }
                        return P
                    }
                    const P = getCoordinates()
                    let Pregunta = `<div class="problema2">
        <h1>Ficha de Trabajo</h1>
        <h2>Ajuste por Mínimos Cuadrados de una Circunferencia</h2>

        <h3>Objetivo</h3>
        <p>Aplicar el método de mínimos cuadrados para ajustar una circunferencia a un conjunto de puntos dados y representar gráficamente los resultados usando Python.</p>

        <h3>Materiales y Herramientas</h3>
        <ul>
            <li>Computadora con Python instalado</li>
            <li>Librerías necesarias: <code>numpy</code>, <code>matplotlib</code></li>
            <li>Entorno de programación: Jupyter Notebook, Google Colab, VS Code u otro</li>
        </ul>

        <h3>Conceptos Clave</h3>
        <ul>
            <li><strong>Mínimos cuadrados:</strong> Método para encontrar la mejor circunferencia que se ajusta a un conjunto de datos minimizando la suma de los cuadrados de los errores.</li>
            <li><strong>Ecuación de la recta ajustada:</strong> \\( (x-k)^2 +(y-k)^2=r^2 \\)</li>.
        </ul>

        <h3>Instrucciones</h3>
        <ol>
            <li><strong>Gráfica de los puntos:</strong>
                <ul>
                    <li>Se proporcionan los siguientes datos:<br><br><center><tlacuache-tabla estilo="dato" nombre="$x$,$y$", row1="${P[0]}" row2="${P[1]}" ></tlacuache-tabla></center></li>
                    <li>Representar estos puntos en un gráfico de dispersión con <code>matplotlib</code> como se muestra continuación
                    <br><center><tlacuache-ejes size="480,480" xlabel="Eje x" ylabel="Eje y" xlim="${P[2]}" ylim="${P[3]}" dx="2" dy="2"  >
                        <tlacuache-plot x="${P[0]}" y="${P[1]}"  mark="o" color="red"></tlacuache-plot >
                    </tlacuache-plot></center></li>
                </ul>
            </li>
            <li><strong>Cálculo de la circunferencia de mínimos cuadrados:</strong>
                <ul>
                    <li>Implementar código en Python para calcular el modelo de circunferencia que mejor se ajuste.</li>
                </ul>
            </li>
            <li><strong>Gráfico de la circunferencia ajustada:</strong>
                <ul>
                    <li>Graficar la circunferencia sobre los puntos.</li>
                </ul>
            </li>
        </ol>

        <h3>Formato de Entrega</h3>
        <ul>
            <li>Captura de pantalla del gráfico final con los puntos y la circunferencia ajustada.</li>
            <li>Código fuente en Python en un archivo <code>.py</code> o <code>.ipynb</code>.</li>
        </ul>

        <h3>Criterios de Evaluación</h3>
        <ul>
            <li>✅ Representación correcta de los puntos en la gráfica.</li>
            <li>✅ Implementación correcta del método de mínimos cuadrados.</li>
            <li>✅ Gráfico final con la circunferencia ajustada correctamente sobre los puntos.</li>
            <li>✅ Claridad y organización del código.</li>
        </ul>
                    
                    </div>`
                    return Pregunta
                }
            },{
                Nombre:"Elipse",
                func:function(){
                    function getCoordinates(){
                        const P=[[],[],[],[]]
                        const n=Math.round(Math.random()*15)+10
                
                        const h=(Math.random()<0.5?1:-1)*(Math.random()*3+.5) // Centro x
                        const k=(Math.random()<0.5?1:-1)*(Math.random()*3+.5) // Centro y
                        const a=Math.random()*5+3  // Semieje mayor
                        const b=Math.random()*3+1  // Semieje menor (más pequeño que a)
                        
                        
                        let t, x, y
                        P[2]=[Math.floor((h-a)/5)*5,Math.ceil((h+a)/5)*5] // Límites en X
                        P[3]=[Math.floor((k-a)/5)*5,Math.ceil((k+a)/5)*5] // Límites en Y
                        
                        for(let k1=0; k1<n; ++k1){
                            t = 2*Math.PI*Math.random()
                            
                            // Generar punto en una elipse sin rotar
                            x = h + a*Math.cos(t)
                            y = k + b*Math.sin(t)
                             + (Math.random() - 0.5) * 0.2
                
                            P[0].push(x.toPrecision(2))
                            P[1].push(y.toPrecision(2))
                        }
                        return P
                    }
                    
                    const P = getCoordinates()
                    
                    let Pregunta = `<div class="problema2">
                        <h1>Ficha de Trabajo</h1>
                        <h2>Ajuste por Mínimos Cuadrados de una Elipse</h2>
                
                        <h3>Objetivo</h3>
                        <p>Aplicar el método de mínimos cuadrados para ajustar una elipse a un conjunto de puntos dados y representar gráficamente los resultados usando Python.</p>
                
                        <h3>Materiales y Herramientas</h3>
                        <ul>
                            <li>Computadora con Python instalado</li>
                            <li>Librerías necesarias: <code>numpy</code>, <code>matplotlib</code>, <code>scipy</code></li>
                            <li>Entorno de programación: Jupyter Notebook, Google Colab, VS Code u otro</li>
                        </ul>
                
                        <h3>Conceptos Clave</h3>
                        <ul>
                            <li><strong>Mínimos cuadrados:</strong> Método para encontrar la mejor elipse que se ajusta a un conjunto de datos minimizando la suma de los cuadrados de los errores.</li>
                            <li><strong>Ecuación general de la elipse:</strong> \\( \\frac{(x-h)^2}{a^2} + \\frac{(x-h)^2}{b^2} = 1 \\)</li>
                            <li><strong>Parámetros a encontrar:</strong> Centro (h,k), semiejes  $a$ y $b$</li>
                        </ul>
                
                        <h3>Instrucciones</h3>
                        <ol>
                            <li><strong>Gráfica de los puntos:</strong>
                                <ul>
                                    <li>Se proporcionan los siguientes datos:<br><br><center><tlacuache-tabla estilo="dato" nombre="$x$,$y$", row1="${P[0]}" row2="${P[1]}" ></tlacuache-tabla></center></li>
                                    <li>Representar estos puntos en un gráfico de dispersión con <code>matplotlib</code> como se muestra continuación
                                    <br><center><tlacuache-ejes size="480,480" xlabel="Eje x" ylabel="Eje y" xlim="${P[2]}" ylim="${P[3]}" dx="2" dy="2"  >
                                        <tlacuache-plot x="${P[0]}" y="${P[1]}"  mark="o" color="red"></tlacuache-plot >
                                    </tlacuache-ejes></center></li>
                                </ul>
                            </li>
                            <li><strong>Cálculo de la elipse de mínimos cuadrados:</strong>
                                <ul>
                                    <li>Implementar código en Python para calcular el modelo de elipse que mejor se ajuste a los puntos dados.</li>
                                    <li>Determinar el centro (h,k), los semiejes (a,b).</li>
                                </ul>
                            </li>
                            <li><strong>Gráfico de la elipse ajustada:</strong>
                                <ul>
                                    <li>Graficar la elipse sobre los puntos.</li>
                                    <li>Mostrar los valores calculados de los parámetros de la elipse (centro y semiejes).</li>
                                </ul>
                            </li>
                        </ol>
                
                        <h3>Formato de Entrega</h3>
                        <ul>
                            <li>Captura de pantalla del gráfico final con los puntos y la elipse ajustada.</li>
                            <li>Código fuente en Python en un archivo <code>.py</code> o <code>.ipynb</code>.</li>
                            <li>Breve explicación del enfoque utilizado para el ajuste de la elipse.</li>
                        </ul>
                
                        <h3>Criterios de Evaluación</h3>
                        <ul>
                            <li>✅ Representación correcta de los puntos en la gráfica.</li>
                            <li>✅ Implementación correcta del método de mínimos cuadrados para elipses.</li>
                            <li>✅ Gráfico final con la elipse ajustada correctamente sobre los puntos.</li>
                            <li>✅ Determinación precisa de los parámetros de la elipse (centro, semiejes).</li>
                            <li>✅ Claridad y organización del código.</li>
                        </ul>
                                    
                    </div>`
                    return Pregunta
                }
            }
            ]
            
        }
    ]
},
{
	Nombre:"Parcial 3",
	subtema:[]
}
]
/*

La ficha de trabajo se llama por ejercicios, los cuales son preguntas de varios reactivos

*/
function start(){
    let contenedor = document.getElementById('menu')
    contenedor.innerHTML=""
    let n0 = Ficha.length
    for (let k0 = 0; k0<n0 ; ++k0){
        let D0 = document.createElement('details')
        D0.setAttribute("name","D0")
        let M0 =  document.createElement('main')
        let T0 =  document.createElement('summary')
        T0.textContent = Ficha[k0].Nombre
        D0.appendChild(T0)
        let n1 = Ficha[k0].subtema.length
        for(let k1=0; k1<n1; ++k1){
            let D1 = document.createElement('details')
            D1.setAttribute("name","D1")
            let M1 =  document.createElement('main')
            let T1 =  document.createElement('summary')
            T1.textContent = Ficha[k0].subtema[k1].Nombre
            D1.appendChild(T1)
            let n2 = Ficha[k0].subtema[k1].topico.length
            for(let k2=0; k2<n2; ++k2){
                let ficha = document.createElement('div')
                ficha.innerHTML = `<a onclick="generar(${k0},${k1},${k2})">${Ficha[k0].subtema[k1].topico[k2].Nombre}</a>`
                
                M1.appendChild(ficha)
            }
            D1.appendChild(M1)
            M0.appendChild(D1)
        }
        D0.appendChild(M0)
        contenedor.appendChild(D0)
    }
    
}
function generar(k0,k1,k2,profesor = "MC Roberto Morin Romero"){
    function encabezado(profesor,K){
        
        return `<div class="header">
        <table class="info" width="100%">
        <tr><td><div class="logo">
            <img src="./FIME-UN.png" alt="raiz2pi.cc"><br><center>UAdeC <br>FIME Monclova</center>
        </div></td>
        <td style="width:80%">
            
            
            <div><strong>Nombre del Profesor:</strong><u>${profesor}</u></div>
            <div><center><strong><h3>${Ficha[k0].subtema[K[1]].topico[K[2]].Nombre} </h3></strong></center></div>
        </td><td style="width:20%">
            </div>
        </td>
        </tr>
        </table>
        
    </div>`
    }
    
    const contenedor = document.getElementById("Fichas")
    contenedor.innerHTML=''
    

    
    let ficha
    //for(let k=0; k<nFichas; ++k ){
        
        console.log(`${Ficha[k0].Nombre} ${Ficha[k0].subtema[k1].Nombre} ${Ficha[k0].subtema[k1].topico[k2].Nombre}`)
        ficha = Ficha[k0].subtema[k1].topico[k2].func()
        
        let div0 = document.createElement('div')
        div0.innerHTML = encabezado(profesor,[k0,k1,k2])+ficha
        contenedor.appendChild(div0)


    
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}