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

                        let x, y, L=[(Math.random()<0.5?1:-1)*(Math.random()*3+.5),Math.random()*20-10],Sx='$x$ = ',Sy='$y$ ='
                        for(let k=0; k<n; ++k){
                            x=Math.random()*(xlim[1]-xlim[0])+xlim[0]
                            y=L[0]*x+L[1]+Math.round(Math.random()*5-2.5)
                            Sx += `${x.toPrecision(2)}, `
                            Sy += `${y.toPrecision(2)}, `
                        }
                        return `<center>${Sx}<br>${Sy}`
                    }
                    
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
                    <li>Se proporcionan los siguientes datos:<br>${getCoordinates()}</li>
                    <li>Representar estos puntos en un gráfico de dispersión con <code>matplotlib</code>.</li>
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
            <li>Código fuente en Python en un archivo <code>.py</code> o <code>.ipynb</code>.</li>
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
                Nombre:"Circunferencia",
                func:function(){
                    function getCoordinates(){
                        const xlim=[-10,10]
                        const n=Math.round(Math.random()*10)+6

                        let x, y, L=[(Math.random()<0.5?1:-1)*(Math.random()*3+.5),(Math.random()<0.5?1:-1)*(Math.random()*3+.5),Math.random()*20-10],Sx='$x$ = ',Sy='$y$ ='
                        for(let k=0; k<n; ++k){
                            x=Math.random()*(xlim[1]-xlim[0])+xlim[0]
                            y=L[0]*x*x+L[1]*x+L[2]+Math.round(Math.random()*5-2.5)
                            Sx += `${x.toPrecision(2)}, `
                            Sy += `${y.toPrecision(2)}, `
                        }
                        return `<center>${Sx}<br>${Sy}`
                    }
                    
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
            <li><strong>Ecuación de la recta ajustada:</strong> \\( y = ax^2+bx+c \\)</li>
        </ul>

        <h3>Instrucciones</h3>
        <ol>
            <li><strong>Gráfica de los puntos:</strong>
                <ul>
                    <li>Se proporcionan los siguientes datos:<br>${getCoordinates()}</li>
                    <li>Representar estos puntos en un gráfico de dispersión con <code>matplotlib</code>.</li>
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
            <li>Código fuente en Python en un archivo <code>.py</code> o <code>.ipynb</code>.</li>
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
                        const n = Math.round(Math.random() * 10) + 6;
                        const r = Math.random() * 5 + 3; // Radio aleatorio entre 3 y 8
                        const cx = Math.random() * 10 - 5; // Centro x entre -5 y 5
                        const cy = Math.random() * 10 - 5; // Centro y entre -5 y 5
                        
                        let x, y, Sx = '$x$ = ', Sy = '$y$ =';
                        for (let k = 0; k < n; ++k) {
                            const theta = Math.random() * 2 * Math.PI; // Ángulo aleatorio
                            x = cx + r * Math.cos(theta) + (Math.random() * 2 - 1); // Ruido aleatorio
                            y = cy + r * Math.sin(theta) + (Math.random() * 2 - 1);
                            Sx += `${x.toPrecision(2)}, `;
                            Sy += `${y.toPrecision(2)}, `;
                        }
                        return `<center>${Sx}<br>${Sy}`;
                    }
                    
                    let Pregunta = `<div class="problema2">
                        <h1>Ficha de Trabajo</h1>
                        <h2>Ajuste por Mínimos Cuadrados de una Circunferencia</h2>
                    
                        <h3>Objetivo</h3>
                        <p>Aplicar el método de mínimos cuadrados para ajustar una circunferencia a un conjunto de puntos dados y representar gráficamente los resultados usando Python.</p>
                    
                        <h3>Materiales y Herramientas</h3>
                        <ul>
                            <li>Computadora con Python instalado</li>
                            <li>Librerías necesarias: <code>numpy</code>, <code>matplotlib</code>, <code>scipy</code></li>
                            <li>Entorno de programación: Jupyter Notebook, Google Colab, VS Code u otro</li>
                        </ul>
                    
                        <h3>Conceptos Clave</h3>
                        <ul>
                            <li><strong>Mínimos cuadrados:</strong> Método para encontrar la mejor circunferencia que se ajusta a un conjunto de datos minimizando la suma de los cuadrados de los errores.</li>
                            <li><strong>Ecuación de la circunferencia ajustada:</strong> \\( x^2 + y^2 + Dx + Ey + F = 0 \\)</li>
                        </ul>
                    
                        <h3>Instrucciones</h3>
                        <ol>
                            <li><strong>Gráfica de los puntos:</strong>
                                <ul>
                                    <li>Se proporcionan los siguientes datos:<br>${getCoordinates()}</li>
                                    <li>Representar estos puntos en un gráfico de dispersión con <code>matplotlib</code>.</li>
                                </ul>
                            </li>
                            <li><strong>Cálculo de la circunferencia por mínimos cuadrados:</strong>
                                <ul>
                                    <li>Implementar código en Python para calcular los parámetros \(D, E, F\) de la ecuación de la circunferencia.</li>
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