const Ficha = [{
	Nombre:"Conocimientos previos",
	subtema:[]
},{
	Nombre:"Aritmética y álgebra",
	subtema:[]
},
{
	Nombre:"Funciones",
	subtema:[]
},
{
	Nombre:"Geometría y trigonometría",
	subtema:[
        {
            Nombre:"Diagrama de Voronoi",
            topico:[{
                Nombre:"D. Voronoi (3 coordenadas)",
                func:function(){
                    let A=[],B=[],C=[]
                    let angle = 0, Dangle

                    do{
                        Dangle = Math.random()*.2+1.8
                        let r = Math.random()*10+2
                        A=[Math.round((r+1)*Math.cos(angle+Dangle)),Math.round((r+1)*Math.sin(angle+Dangle))]
                    }while(!(-10<A[0] && A[0]<10 && -10<A[1] && A[1]<10))
                    angle += Dangle
                    
                    do{
                        Dangle = Math.random()*.2+1.8
                        r=Math.random()*10+2
                        B=[Math.round((r+1)*Math.cos(angle+Dangle)),Math.round((r+1)*Math.sin(angle+Dangle))]
                    }while(!(-10<B[0] && B[0]<10 && -10<B[1] && B[1]<10))
                    angle += Dangle
                    
                    do{
                        Dangle = Math.random()*.2+1.8
                        r=Math.random()*10+2
                        C=[Math.round((r+1)*Math.cos(angle+Dangle)),Math.round((r+1)*Math.sin(angle+Dangle))]
                    }while(!(-10<C[0] && C[0]<10 && -10<C[1] && C[1]<10))
                    
                    let Pregunta = `<div class="problema2">1.- Considere que $A:(${A})$, $B:(${B})$ y $C:(${C})$.
                        <br><center>${createAxis([-10,10,-10,10,[2,2],[1,1]],[400,400]).outerHTML}</center>
                        <ol class="FT_ol_a">
                        <li>Ubique los puntos $A$, $B$ y $C$ en el plano cartesiano <div>3</div></li>
                        <li>Calcule el punto medio del segmento $\\overline{AB}$<div>1</div></li>  ${CR(2)}  
                        <li>Calcule la pendiente del segmento $\\overline{AB}$ <div>1</div></li>${CR(2)}
                        <li>Calcule la pendiente de la mediatriz del segmento $\\overline{AB}$<div>1</div></li>${CR(2)}
                        <li>Coloque los puntos medios de los segmentos $\\overline{AB}$, $\\overline{AC}$ y $\\overline{BC}$ <div>1</div> </li>
                        <li>Trace las mediatrices de los segmentos $\\overline{AB}$, $\\overline{AC}$ y $\\overline{BC}$ con una línea poco remarcada <div>3<div> </li>
                        <li>Usando las mediatrices dibujadas. Grafique el diagrama de Voronoi correspondiente<div>5</div></li>
                        </ol><div><div class="page"></div>`
                    let pm = [simplify_frac([A[0]+B[0],2]),simplify_frac([A[1]+B[1],2])]

                    let Solucion = `<div class="ans">(1b)$P_{AB}=(${ fraccion(pm[0][0],pm[0][1])},${ fraccion(pm[1][0],pm[1][1])}) $</div>`

                    mab=simplify_frac([A[1]-B[1],A[0]-B[0]])
                    Solucion += `<div class="ans">(1c) $m_{AB}=${fraccion(mab[0],mab[1])}$</div>`
                    mpab=simplify_frac([-mab[1],mab[0]])
                    Solucion += `<div class="ans">(1d) $m^p_{AB}=${fraccion(mpab[0],mpab[1],true)}$</div>`

                    


                    do{
                        Dangle = Math.random()*.2+1.8
                        let r = Math.random()*10+2
                        A=[Math.round((r+1)*Math.cos(angle+Dangle)),Math.round((r+1)*Math.sin(angle+Dangle))]
                    }while(!(-10<A[0] && A[0]<10 && -10<A[1] && A[1]<10))
                    angle += Dangle
                    
                    do{
                        Dangle = Math.random()*.2+1.8
                        r=Math.random()*10+2
                        B=[Math.round((r+1)*Math.cos(angle+Dangle)),Math.round((r+1)*Math.sin(angle+Dangle))]
                    }while(!(-10<B[0] && B[0]<10 && -10<B[1] && B[1]<10))
                    angle += Dangle
                    
                    do{
                        Dangle = Math.random()*.2+1.8
                        r=Math.random()*10+2
                        C=[Math.round((r+1)*Math.cos(angle+Dangle)),Math.round((r+1)*Math.sin(angle+Dangle))]
                    }while(!(-10<C[0] && C[0]<10 && -10<C[1] && C[1]<10))

                    Pregunta += `<div class="problema2">2.- En el siguiente plano realice el diagrama de Voronoi cuyas semillas (sitios) son $A:(${A})$, $B:(${B})$ y $C:(${C})$    <br><center>${createAxis([-10,10,-10,10,[2,2],[1,1]],[400,400]).outerHTML}<center><div class="mark">5</div></div>`
                    return [Pregunta,Solucion]
                }
            },{
                Nombre:"D. Voronoi (+3 coordenadas)",
                func:function(){
                    function manyCoordinates(n){
                        function arrayRepetido(P){
                            let n = P.length-1
                            for(let k=0; k<n; ++k){
                                if((P[k][0]==P[n][0]) && (P[k][1]==P[n][1])){
                                    return true
                                }
                            }
                            return false
                        }
                        const xlim=[-10,10]
                        const ylim=[-9,9]
                        const P=[]
                        for(let k=0; k<n; ++k){
                            do{
                                P[k]=[Math.round(Math.random()*(xlim[1]-xlim[0])+xlim[0]),Math.round(Math.random()*(ylim[1]-ylim[0])+ylim[0])]
                            }while(arrayRepetido(P))
                        }
                        return P
                    }
                    function displayP(P){
                        const n = P.length
                        let S=""
                        for(let k=0; k<n;++k){
                            S += (k != n-1?(k==0?'':', '):' y ')
                            S += `$${String.fromCharCode('A'.charCodeAt(0)+k)} = (${P[k]})$`
                        }
                        return S
                    }
                    let P = manyCoordinates(4)
                    let Pregunta = `<div class="problema2">1.- Realice el diagrama de Voronoi con los puntos ${displayP(P)}.<div class="mark">5</div>
                        <br><center>${createAxis([-15,15,-10,10,[5,5],[1,1]],[600,400]).outerHTML}</center>`
                    P = manyCoordinates(4)
                    Pregunta += `<div class="problema2">2.- Realice el diagrama de Voronoi con los puntos ${displayP(P)}.<div class="mark">5</div>
                        <br><center>${createAxis([-15,15,-10,10,[5,5],[1,1]],[600,400]).outerHTML}</center><div class="page"></div>`
                    P = manyCoordinates(4)
                    Pregunta += `<div class="problema2">3.- Realice el diagrama de Voronoi con los puntos ${displayP(P)}.<div class="mark">5</div>
                        <br><center>${createAxis([-15,15,-10,10,[5,5],[1,1]],[600,400]).outerHTML}</center>
                        `
                    P = manyCoordinates(5)
                    Pregunta += `<div class="problema2">4.- Realice el diagrama de Voronoi con los puntos ${displayP(P)}.<div class="mark">5</div>
                        <br><center>${createAxis([-15,15,-10,10,[5,5],[1,1]],[600,400]).outerHTML}</center>`

                    let Solucion = ``
                    return [Pregunta,Solucion]
                }
            }
            ]
            
        }
    ]

},{
	Nombre:"Estadística y probabilidad",
	subtema:[
        {
            Nombre:"Correlación",
            topico:[{
                Nombre:"Línea de mejor ajuste",
                func:function(){
                    //Vamos a dar un conjunto de datos que se ajusten a un modelo lineal
                    function datos(){
                        const x=[],y=[]
                        const n=Math.round(Math.random()*5+5)
                        const m=(Math.random()*10+1)*(Math.random()<0.5?-1:1)
                        const b=(Math.random()*10-10)
                        
                        for(let k=0;k<n;++k){
                            x.push(Math.round(Math.random()*20))
                            y.push(Math.round(m*x[k]+b+5*Math.random()))
                        }
                        return [x,y]
                    }
                    function tablaDatos(x,y){
                        let S=`<center><table class="tablaEspaciada"><tr><td style="border-rigth:solid black 1px">$x$</td>`
                        let T=`</tr><tr><td style="border-rigth:solid black 1px">$y$</td>`
                        for(let k=0;k<x.length;++k){
                            S += `<td>${x[k]}</td>`
                            T += `<td>${y[k]}</td>`
                        }
                        return `${S}${T}</tr></table></center>`
                    }
                    function media(x,y){
                        let xs=0, ys=0
                        n=x.length
                        for(let k=0;k<n;++k){
                            xs +=x[k]
                            ys +=y[k]
                        }
                        return [(xs/n).toPrecision(3),(ys/n).toPrecision(3)]
                    }
                    
                    let x,y
                    [x,y]=datos()
                    let Solucion = `<div class="ans"><div>(1b) $M:(${media(x,y)})$</div> <div>(1c)$ ${M_LinReg(x,y,'ec')}$</div>`
                    let Pregunta=`<div class="Problema2">1.- Considere los siguientes datos:
                    <br>${tablaDatos(x,y)}
                    <ol class="FT_ol_a">
                    <li>Use el siguiente espacio para graficar los datos<div>2</div></li><br>${Milimetrado(600,[10, 20,.2] )}
                    <li>Escriba y grafique $M:(\\overline{x},\\overline{y})$<div>1</div></li>
                    <li>Escriba y grafique la línea de mejor ajuste<div>2</div></li>
                    </ol><div><div class="page"></div>
                    `
                    let x1,y1
                    [x1,y1]=datos()
                    Solucion += `<div>(1b) $M:(${media(x1,y1)})$</div> <div>(1c) $${M_LinReg(x1,y1,'ec')}$</div></div>`
                    Pregunta+=`<div class="Problema2">2.- Considere los siguientes datos:
                    <br>${tablaDatos(x1,y1)}
                    <ol class="FT_ol_a">
                    <li>Use el siguiente espacio para graficar los datos<div>2</div></li><br>${Milimetrado(600,[10, 20,.2] )}
                    <li>Escriba y grafique $M:(\\overline{x},\\overline{y})$<div>1</div></li>
                    <li>Escriba y grafique la línea de mejor ajuste<div>2</div></li>
                    </ol><div>
                    `
                    

                    
//VAmos a aqui ----------------------------------------------

                    return [Pregunta,Solucion]
                }
            },{
                Nombre:"Pearson y Spearman",
                func:function(){
                    //Vamos a dar un conjunto de datos que se ajusten a un modelo lineal
                    function datos(){
                        const x=[],y=[]
                        const n=Math.round(Math.random()*5+5)
                        const m=(Math.random()*10+1)*(Math.random()<0.5?-1:1)
                        const b=(Math.random()*10-10)
                        
                        for(let k=0;k<n;++k){
                            x.push(Math.round(Math.random()*20))
                            y.push(Math.round(m*x[k]+b+5*Math.random()))
                        }
                        return [x,y]
                    }
                    function tablaDatos(x,y){
                        let S=`<center><table class="tablaEspaciada"><tr><td style="border-rigth:solid black 1px">$x$</td>`
                        let T=`</tr><tr><td style="border-rigth:solid black 1px">$y$</td>`
                        for(let k=0;k<x.length;++k){
                            S += `<td>${x[k]}</td>`
                            T += `<td>${y[k]}</td>`
                        }
                        return `${S}${T}</tr></table></center>`
                    }
                    function media(x,y){
                        let xs=0, ys=0
                        n=x.length
                        for(let k=0;k<n;++k){
                            xs +=x[k]
                            ys +=y[k]
                        }
                        return [(xs/n).toPrecision(3),(ys/n).toPrecision(3)]
                    }
                    
                    let x,y
                    [x,y]=datos()
                    let Solucion = `<div class="ans"><div>(1b) $M:(${media(x,y)})$</div> <div>(1c)$ ${M_LinReg(x,y,'ec')}$(1d)(i)${tlacu.stat.cuartil(x)}(ii)${tlacu.stat.cuartil(y)}(1e)${Spearman(x,y).toFixed(3)}</div>`
                    let Pregunta=`<div class="Problema2">1.- Considere los siguientes datos:
                    <br>${tablaDatos(x,y)}
                    <ol class="FT_ol_a">
                    <li>Use el siguiente espacio para graficar los datos<div>2</div></li><br>${Milimetrado(600,[10, 20,.2] )}
                    <li>Escriba y grafique $M:(\\overline{x},\\overline{y})$<div>1</div></li>
                    <li>Escriba y grafique la línea de mejor ajuste<div>2</div></li>
                    <li>Dibuje en el siguiente espacio las cajas de bigotes para <br>eje $x$<br>
                    ${Milimetrado(600,[3, 20,.2] )}<br>eje $y$<br>${Milimetrado(600,[3, 20,.2] )}
                    <div>2</div></li><br>
                    <li>Calcule el valor del factor de correlación de Spearman<div>3</div></li>
                    </ol><div><!--div class="page"></div-->
                    `
                    
                    
                    Pregunta+=`<div class="Problema2">2.- Obtenga los factores de correlación de Pearson de los siguientes datos.`
                    
                    for(let it=0;it<3;++it){
                    let x1,y1
                    [x1,y1]=datos()
                    Solucion += `<div>(2-${it+1})${Spearman(x1,y1).toFixed(3)}</div>`
                    Pregunta+=`<br>${tablaDatos(x1,y1)}<br><div style="float: right">[3]</div>`
                    }
                    Solucion += `</div>`
                    Pregunta+=`</div>`
                    

                    
//VAmos a aqui ----------------------------------------------

                    return [Pregunta,Solucion]
                }
            }
            ]
            
        },{
            Nombre: "Chi cuadrada",
            topico:[{
                Nombre:"Chi cuadrada",
                func:function(){
                    let color=['Verde','Rojo','Azul','Negro','Blanco']
                    const size=[Math.floor(Math.random()*3.9+2),Math.floor(Math.random()*4.9+2)]
                    let Pregunta =`
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
            Pregunta +=`</tr><th>\\</th>`
            for(let k1=0;k1<size[0];++k1){
                Pregunta +=` <th>${color[k1]}</th>`
            }
            Pregunta +=`<th>Total</th></tr>`
            let O=[]
            for (let k=0;k<size[1];++k){
                O[k]=[]
                Pregunta +=` <tr><td>Salón ${k+1}</td>`
                for(let k1=0;k1<size[0];++k1){
                    O[k].push(Math.ceil(Math.random()*10))
                    Pregunta +=`<td>${O[k][k1]}</td>`
                }
                Pregunta +=`<td></td></tr>`
            }
            const [E,totalCols,totalRows,total]=chi_matriz_esperada(O)
            console.log("O")
            console.log(O)
            console.log("E")
            console.log(E)

            Pregunta +=`</tr><th>Total</th>`
            for(let k1=0;k1<size[0];++k1){
                Pregunta +=` <th></th>`
            }
            const Pos=[Math.floor(Math.random()*size[1]),Math.floor(Math.random()*size[0])]
            console.log("P:"+Pos)

            Pregunta +=`<th></th></tr>`
            Pregunta +=`</table></center>

        <ol class="FT_ol_a">
            <li>Escriba las hipótesis nula y alternativa <div>1</div></li>${CR(2)}
            <li>Escriba los grados de libertad usando la fórmula  $GL = (\\text{Total de fila} \\times \\text{Total de columna})/\\text{Total general}$             <div>1<div></li> ${CR(1)}
            <li>Complete la tabla escribiendo los totales. <div>1</div></li>
            <li>Calcule el valor esperado del salón ${Pos[0]+1} al elegir el color "${color[Pos[1]]}". <div>1</div></li>${CR(1)}<div class="page"></div>
            <li>Complete la tabla de datos esperados a continuación. <div>1</div></li>`

            Pregunta +=`<center><table border="1" cellpadding="8" cellspacing="0"></tr><th>\\</th>`
            for(let k1=0;k1<size[0];++k1){
                Pregunta +=` <th>${color[k1]}</th>`
            }
            Pregunta +=`<th>Total</th></tr>`
            for (let k=0;k<size[1];++k){
                Pregunta +=` <tr><td>Salón ${k+1}</td>`
                for(let k1=0;k1<size[0];++k1){
                    Pregunta +=`<td></td>`
                }
                Pregunta +=`<td></td></tr>`
            }
            Pregunta +=`</tr><th>Total</th>`
            for(let k1=0;k1<size[0];++k1){
                Pregunta +=` <th></th>`
            }
            Pregunta +=`<th></th></tr>`
            Pregunta +=`</table></center>`


            Pregunta += `<li>Calcule el valor de \\( \\chi_{\\text{Calc}}^2 \\).<div>2</div></li>${CR(3)}
            <li>Escriba, usando una tabla de $\\chi^2$, el valor de $\\chi^2_{\\text{Crít}}$<div>2</div></li>${CR(1)}
            <li>Usando sus respuestas anteriores, realice una conclusión, justifique su respuesta.<div>2</div></li>${CR(3)}
        </ol><div>`
        let chical =chiCuadradaCal(O,E)
        let chitabla =chitablas((size[0]-1)*(size[1]-1),0.05)
                 let Solucion = `<div class="ans"><div>(b) GL = ${(size[0]-1)*(size[1]-1)}</div>
                                    <div>Total Col:${totalCols}, total col:${totalRows},total:${total}</div>    
                                    <div>(d) ${E[Pos[0]][Pos[1]].toPrecision(3)}</div><div>(f) $\\chi^2_{\\text{Calc}} \\approx${chical.toPrecision(3)}$</div>
                                    <div>(g) $\\chi^2_{\\text{crít}}=${chitabla}$</div>
                                    <div>(h)Acepta ${chitabla>chical?"$H_0$":"$H_1$"}</div></div>`       
                    return [Pregunta,Solucion]
                }

            }]
        },{
            Nombre: "t-Student",
            topico:[{
                Nombre:"prueba t student",
                func:function(){
                    

                    /*let datos=[ [21,21,26,25,28,24],
                                [24,25,25,26,32,29]]*/
                    let datos=[[],[]]
                    let n = [Math.round(Math.random()*10+5),Math.round(Math.random()*10+5)]
                    if(n[0] == n[1]){
                        ++n[1]
                    }
                    let dummy = [Math.random()*20, Math.random()*2]
                    
                    for (let k=0;k<n[0];++k) datos[0].push( Math.round(dummy[0]+1/((1-Math.random())*dummy[1])) )
                    for (let k=0;k<n[1];++k) datos[1].push( Math.round(dummy[0]+1/((1-Math.random())*dummy[1])) )


                    let Pregunta =`
        <h3>Fórmula</h3>
        <p>La estadística de t-student para muestras pequeñas con misma cantidad de muestras y con misma desviación estándar similar, se calcula usando la siguiente fórmula:</p>
        <p>
            \\[
            t_{calc} = \\frac{\\overline{x_1}-\\overline{x_2}}{\\sqrt{\\frac{S_1^2}{n_1}+\\frac{S_2^2}{n_2}}}
            \\]
        </p>
        
    
        <div class="problema2">

        1. Se desea aplicar la prueba de t-student para saber si existe uns diferencia significativa entre dos muestras con un nivel de significancia de 5%.
        las muestra son las siguientes<br> <center>${tablaDatos(datos,['muestra 1','muestra 2'])}</center>
        
        
        <ol class="FT_ol_a">
            <li>Escriba las hipótesis nula y alternativa <div>1</div></li>
            <li>Escriba los grados de libertad. <div>1</div></li> 
            <li>Escriba las desviaciones estándar. <div>1</div></li>
            <li>Escriba el valor crítico de la prueba. <div>1</div></li>
            <li>Calcule el valor $t_{calc}$. <div>1</div></li>
            <li>Realice una conclusión basado en sus respuestas anteriores. <div>1</div></li>
            <ol><div class="page"></div>
            `
            let resp =tcalc_1(datos,true)
            let Solucion=`  (1b) gl = ${datos[0].length+datos[1].length-2}
                            (1c) S_1=${Math.sqrt(resp[3]).toPrecision(4)}, S_2=${Math.sqrt(resp[4]).toPrecision(4)}
                            (1e) $t_{calc} = ${resp[0].toPrecision(4)}$
                            `

            datos=[[],[]]
            n = [Math.round(Math.random()*10+5),Math.round(Math.random()*10+5)]
            if(n[0] == n[1]){
                ++n[1]
            }
            dummy = [Math.random()*20, Math.random()*2]
                    
            for (let k=0;k<n[0];++k) datos[0].push( Math.round(dummy[0]+1/((1-Math.random())*dummy[1])) )
            for (let k=0;k<n[1];++k) datos[1].push( Math.round(dummy[0]+1/((1-Math.random())*dummy[1])) )


            resp =tcalc(datos,true)
            Solucion +=`  (2b) gl = ${datos[0].length+datos[1].length-2}
                            (2c) S_1=${Math.sqrt(resp[3]).toPrecision(4)}, S_2=${Math.sqrt(resp[4]).toPrecision(4)}
                            (2e) $t_{calc} = ${resp[0].toPrecision(4)}$
                            `
            //Solucion +=`(2e) ${tcalc(datos)}`

            Pregunta +=`
        <h3>Fórmula</h3>
        <p>La estadística de t-student para muestras con distinta desviación estándar, se calcula usando la siguiente fórmula:</p>
        <p>
            \\[
            t_{calc} = \\frac{\\overline{x_1}-\\overline{x_2}}{\\sqrt{\\left(\\frac{(n_1+1)S_1^2+(n_2+1)S_2^2}{n_1+n_2-2}\\right)\\left(\\frac{1}{n_1}+\\frac{1}{n_2}\\right)}}
            \\]
        </p>
        
    
        <div class="problema2">

        1. Se desea aplicar la prueba de t-student para saber si existe uns diferencia significativa entre dos muestras con un nivel de significancia de 5%.
        las muestra son las siguientes<br> <center>${tablaDatos(datos,['muestra 1','muestra 2'])}</center>
        
        
        <ol class="FT_ol_a">
            <li>Escriba las hipótesis nula y alternativa <div>1</div></li>
            <li>Escriba los grados de libertad. <div>1</div></li>
            <li>Escriba las desviaciones estándar. <div>1</div></li>
            <li>Escriba las desviaciones estándar. 
                    <ol>
                    <li>Calcule el valor de $\\left(\\frac{(n_1+1)S_1^2+(n_2+1)S_2^2}{n_1+n_2-2}\\right)$</li>
                    <li>Calcule el valor de $\\left(\\frac{1}{n_1}+\\frac{1}{n_2}\\right)$</li>
                    <li>Calcule el valor de $t_{calc}$<div>1</div></li>
                    </ol>
            </li>
            <li>Escriba el valor crítico de la prueba. <div>1</div></li>
            <li>Calcule el valor $t_{calc}$. <div>1</div></li>
            <li>Realice una conclusión basado en sus respuestas anteriores. <div>1</div></li>
            <ol>
            `
                    return [Pregunta,Solucion]
                }

            }]
        }
    ]

},{
	Nombre:"Análisis",
	subtema:[
        {
            Nombre:"Cálculo diferencial",
            topico:[{
                Nombre:"Línea tangente y normal",
                func:function(){
                    let dummy = Math.round(Math.random()*3-3)
                    let a = Math.ceil(Math.random()*4)*Math.pow(10,dummy)*(Math.random()<0.5?1:-1)
                    let q = Math.ceil((Math.random()*6+2))*(Math.random()<0.5?1:-1)
                    let x0 = Math.round((q<0?-1:1)*(Math.random()*(Math.abs(q)-1)+0.5))
                    
                    let Pregunta=`<div class="problema2">1.- Considere a $f(x) = ${a.toFixed(-dummy)}x^2${(a*q<0?'+':'-')+Math.abs(2*a*q).toPrecision(2)}x$
                    <ol class="FT_ol_a">
                    <li>Escriba las raíces de $f(x)$ <div>1</div></li>
                    <li>Grafique la función en el siguiente espacio de tal manera que aparezcan las dos raices en la gráfica<div>2</div></li>${Milimetrado(600,[10, 20,.2] )}
                    <li>Escriba la derivada de $f(x)$<div>2</div></li>${CR(1)}
                    <li>Escriba el valor de $f(${x0}).$<div>1</div></li>${CR(1)}
                    <li>Escriba el valor de $f'(${x0}).$<div>1</div></li>${CR(1)}
                    <li>Calcule y dibuje la ecuación de la línea tangente para $x=${x0}$.<div>3</div></li>${CR(5)}
                     </ol></div>`
                     let m = 2*a*x0-2*a*q
                     let y0 = a*x0**2-2*a*q*x0
                     let Solucion = `<div class="ans"><div>(1a) $x=0,${2*q}$</div><div>(1c)$f'(x) = ${(2*a).toFixed(-dummy)}x${(a*q<0?'+':'-')+Math.abs(2*a*q).toPrecision(2)}$</div><div>(1d)$f(${x0}) = ${(y0.toFixed(-dummy))}$</div><div>(1e)$f'(${x0}) = ${(m).toFixed(-dummy)}$</div><div>$y = ${m.toFixed(-2*dummy)}x+(${(y0-m*x0).toFixed(-2*dummy)})$</div>`


                    dummy = Math.round(Math.random()*3-3)
                    a = Math.ceil(Math.random()*4)*Math.pow(10,dummy)*(Math.random()<0.5?1:-1)
                    q = Math.ceil((Math.random()*6+2))*(Math.random()<0.5?1:-1)
                    x0 = Math.round((q<0?-1:1)*(Math.random()*(Math.abs(q)-1)+0.5))

                    Pregunta += `<div class="page"></div><div class="problema2">2.- Considere a $f(x) = ${a.toFixed(-dummy)}x^2${(a*q<0?'+':'-')+Math.abs(2*a*q).toPrecision(2)}x$
                    <ol class="FT_ol_a">
                    <li>Escriba las raíces de $f(x)$ <div>1</div></li>
                    <li>Grafique la función en el siguiente espacio de tal manera que aparezcan las dos raices en la gráfica<div>2</div></li>${Milimetrado(600,[10, 20,.2] )}
                    <li>Escriba la derivada de $f(x)$<div>2</div></li>${CR(1)}
                    <li>Calcule y dibuje la ecuación de la línea tangente para $x=${x0}$.<div>1</div></li>${CR(5)}
                    <li>Calcule la ecuación de la línea normal para $x=${x0}$.<div>2</div></li>${CR(5)}
                    <li>Dibuje la línea normal a $f(x)$ en el punto $(${x0},f(${x0}))$<div>2</div></li>
                    </ol></div>`
                    m = 2*a*x0-2*a*q
                    let mp = -1/m
                    y0 = a*x0**2-2*a*q*x0
                    Solucion += `<div>(2a) $x=0,${2*q}$</div><div>(2c)$f'(x) = ${(2*a).toFixed(-dummy)}x${(a*q<0?'+':'-')+Math.abs(2*a*q).toPrecision(2)}$</div><div>(1d)$y = ${m.toFixed(-2*dummy)}x+(${(y0-m*x0).toFixed(-2*dummy)})$</div><div>(1e)$y = ${mp.toFixed(-2*dummy)}x+(${(y0-mp*x0).toFixed(-2*dummy)})$</div></div>`

                    return [Pregunta,Solucion]
                }
            }
            ]
            
        }
    ]

}
]
/*

La ficha de trabajo se llama por ejercicios, los cuales son preguntas de varios reactivos

*/