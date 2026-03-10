const f_geometria = {
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
                        <li>Trace las mediatrices de los segmentos $\\overline{AB}$, $\\overline{AC}$ y $\\overline{BC}$ con una línea poco remarcada <div>3</div> </li>
                        <li>Usando las mediatrices dibujadas. Grafique el diagrama de Voronoi correspondiente<div>5</div></li>
                        </ol><div><div class="page"></div>`
                    let pm = [simplify_frac([A[0]+B[0],2]),simplify_frac([A[1]+B[1],2])]

                    let Solucion = `<div class="ans">(1b)$P_{AB}=(${ fraccion(pm[0][0],pm[0][1])},${ fraccion(pm[1][0],pm[1][1])}) $</div>`

                    let mab=simplify_frac([A[1]-B[1],A[0]-B[0]])
                    Solucion += `<div class="ans">(1c) $m_{AB}=${fraccion(mab[0],mab[1])}$</div>`
                    let mpab=simplify_frac([-mab[1],mab[0]])
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

};
