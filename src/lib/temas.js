const tema2 = [{
	Nombre:"Aritmética y álgebra",
	subtema:[
		{
			Nombre:"vacía",
			test:[
			]
		}
	]
},
{
	Nombre:"Funciones",
	subtema:[
		{
			Nombre:"Polinomios",
			test:[{
						Nombre:"Parábola puntos importantes",
						Nota:"",
						fun:function(){
							/*inicio*/
							function P1(){
								let a,b,c
								do{
									a=Math.round(Math.random()*4+1)*(Math.random() < 0.5 ? 1:-1)
									b=Math.round(Math.random()*12+1)*(Math.random() < 0.5 ? 1:-1)
									c=Math.round(Math.random()*12+1)*(Math.random() < 0.5 ? 1:-1)

								}while((b*b-4*a*c)<0)
								
								
								spanContenido("Determine la intersección con los ejes y el vértice de la parábola $y= "+
								a+"x^2 "+(b<0?"-":"+")+" "+Math.abs(b)+" x "+(c<0?"-":"+")+" "+Math.abs(c)+"$",C[6])
								
								const x=[(-b+Math.sqrt(b*b-4*a*c))/(2*a), (-b-Math.sqrt(b*b-4*a*c))/(2*a)]
								const v=[-b/(2*a)]
								v[1]=a*v[0]*v[0]+b*v[0]+c
								
								spanContenido("Ex: ("+x[0].toPrecision(3)+", 0), ("+x[1].toPrecision(3)+", 0), Ey: (0, "+c+"), V:("+v[0].toPrecision(3)+", "+v[1].toPrecision(3)+")",C[0])
								
							}
							let C=abrirPregunta()
							P1()
							

						}
					
			}
			]
		},
		{
			Nombre:"Exponenciales",
			test:[{
						Nombre:"Gráfica de funciones exponenciales",
						Nota:"",
						fun:function(){
							function P1(){
								const M = Math.round(Math.random()*90+1)*Math.round(Math.random()*5+1)
								const a = eval((Math.random()*.78+.2).toPrecision(3))
								const xlim = eval((Math.log(Math.random()*0.1+0.01)/Math.log(a)).toPrecision(2)) 

								x=linspaceMorin(0,xlim,100)
								y=[]
								for(let k=0;k<x.length;++k){
									y[k]=M*Math.pow(a,x[k])
								}


								
								//spanContenido(`Bosqueje la función $f(t) = ${M}  \\cdot ${a}^{t}$ para  $x\\in\\left[0, ${xlim}\\right]$ ${plot([[x,y,'-RGB(100,155,255)']],[600,400],[0,xlim,0,M,[xlim/10,M/10],[xlim/10,M/10]]).outerHTML}`,C[6])
								spanContenido(`Bosqueje la función $f(t) = ${M}  \\cdot ${a}^{t}$ para  $t\\in\\left[0, ${xlim}\\right]$ en un área de 10x20 cm, incluya al lado la tabla de evaluación`,C[6])
							
								
								spanContenido("",C[0])
								
							}
							let C=abrirPregunta()
							P1()
						}
					}
				]
		},
		{
			Nombre:"Sinusoides",
			test:[
					{
						Nombre:"Obtención de las funciones sinoidales",
						Nota:"",
						fun:function(){
							function P1(){
								const a = Math.round(Math.random()*6+1)*(Math.random()<0.5?1:-1)
								const P = Math.round(Math.random()*8+2)
								const ty= Math.round(Math.random()*18-9)
								const tx= Math.round(Math.random()*18-9)
								const x = linspaceMorin(-10,10,500)
								const y = []
								const w = 2*Math.PI/P
								const op= Math.random()<0.5?true:false
								for(let k=0; k<x.length;++k){
									y[k]=a*(op? Math.sin(w*(x[k]-tx)) : Math.cos(w*(x[k]-tx)) )+ty
								}
								const Puntos=[		[x,y,'-RGB(100,155,255)'],
                     								[[tx],[(op? 0 : a )+ty],'oRGB(0,0,0)']]
    							ElemP=plot(Puntos,[600,300],[-10,10,Math.min(-1,-Math.abs(a)+ty-1),Math.max(1,Math.abs(a)+ty+1),[2,2],[1,1]])
								//spanContenido(`Bosqueje la función $f(t) = ${M}  \\cdot ${a}^{t}$ para  $x\\in\\left[0, ${xlim}\\right]$ ${plot([[x,y,'-RGB(100,155,255)']],[600,400],[0,xlim,0,M,[xlim/10,M/10],[xlim/10,M/10]]).outerHTML}`,C[6])
								spanContenido(`La siguiente función tiene la forma $a \\cdot [sin|cos](\\omega x°+c°)+d$, determine la expresión correspondiente a la grafica considerando el punto como el desplazamiento<center>${ElemP.outerHTML}</center>`,C[6])
							
								
								spanContenido("$"+a+""+(op? `\\sin(${(w*180/Math.PI).toFixed(1)}x°+${(-w*180/Math.PI*tx).toFixed(1)})` : `\\cos(${(w*180/Math.PI).toFixed(1)}x°+${(-w*180/Math.PI*tx).toFixed(1)})`)+ty+"$",C[0])
								
							}
							let C=abrirPregunta()
							P1()
						}
					},
					{
						Nombre:"Dibujar funciones trigonométricas",
						Nota:"",
						fun:function(){
							function P1(){
								const a = Math.round(Math.random()*6+1)*(Math.random()<0.5?1:-1)
								const P = Math.round(Math.random()*8+2)
								const ty= Math.round(Math.random()*10-5)
								const tx= Math.round(Math.random()*18-9)
								const op= Math.random()<0.5?true:false
								spanContenido(`Realice un bosquejo de $f(x) =  ${a} \\${op?'sin':"cos"}  (${(P==7?`\\frac{360}{7}`:360/P)}(x${tx>0?-tx:'-'+(-tx)})°)${ty<0?ty:'+'+ty} $ para $-5\\leq x \\leq 5$.`,C[6])
								spanContenido("",C[0])
								
							}
							let C=abrirPregunta()
							P1()
						}
					}
				]
		}
	]
},
{
	Nombre:"Geometría y trigonometría",
	subtema:[{
			Nombre:"vacía",
			test:[
				
			]
		}
	]

},

{
	Nombre:"Estadística y probabilidad",
	subtema:[{
		Nombre:"Medidas de tendencia central",
		test:[
			{
				Nombre:"Polígono de frecuencias acumuladas",
				fun:function(){
					function P1(){
						const xdata=[0,0,35,45,50], fdata=[0,0,0,0,Math.random()*80+80]
						xdata[0]=Math.random()*10+10
						xdata[1]=xdata[0]+5
						fdata[1]=(fdata[4]*.1*Math.random())
						fdata[2]=((.5+.2*Math.random())*fdata[4])
						fdata[3]=((.9+.1*Math.random())*fdata[4])

						
						divContenido("La siguiente gráfica muestra el tiempo que tardaron los alumnos de "
						+"cierta generación en terminar un examen",C[6])
						C[6].appendChild(PolyFrecAcum([	xdata,fdata,'Tiempo (min)'],
														[0,50,0,Math.ceil(fdata[4]/20)*20,[10,20],[5,5]],
														[600,300]))
						divContenido("a) Determina los valores de los cuartiles y dibújalos en el mismo polígono de frecuencias acumuladas",C[6])
						divContenido("b) Usando tu respuesta anterior estima el promedio del tiempo que tardaron los alumnos en terminar un examen",C[6])
						divContenido("c) Dibuje una tabla de frecuencias acumuladas de 0 &leq; t < 10, 10 &leq; t < 20, etc, que corresponda con la tabla y vuela a estimar el promedio usando esta tabla.",C[6])

						
						
						spanContenido("***",C[0])
						
					}
					let C=abrirPregunta()
					P1()
				}
			}
			
		]
	}
		
	]

},
{
	Nombre:"Análisis",
	subtema:[{
		Nombre:"vacía",
		test:[
			
		]
	}

	]

}
]
/*
						fun:function(){
						}
						function PreguntaTema(){
							if(Math.random()>0.5){
								return P1(1)
							}else {
								return P2(1)
							}
						}
						//Final
						let C=abrirPregunta()
						let [P,R]=PreguntaTema()
						spanContenido(P,C[6])
						// C[6].innerHTML=P
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
*/