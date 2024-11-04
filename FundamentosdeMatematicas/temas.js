const nombre_proy="Fundamentos de Matemáticas"
const tema = [{
	Nombre:"Álgebra y Aritmética",
	subtema:[
		{
			Nombre:"Algebra básica",
			test:[
				{
					Nombre:"Ecuaciones de primer grado",
					Nota:"",
					fun:function(){
						let C=abrirPregunta()
						let cadena="$"
						let den=0, num=0
						
						do{
							cadena="$"
							den=0
							num=0
							let n1=Math.round(Math.random()*3+1)
							let n2=Math.round(Math.random()*3+1)
							
							for(let k1=0;k1<n1;++k1){
								a=(Math.ceil(Math.random()*8+1)*(Math.random()<.5?1:-1))
								cadena+=(k1==0?(a<0?" - ":" "):(a<0?" - ":" + "))+Math.abs(a)+"x"
								den+=a
								a=(Math.ceil(Math.random()*6)*(Math.random()<.5?1:-1))
								cadena+=(a<0?" - ":" + ")+Math.abs(a)
								num+=a
							}
							cadena+=" = "
							for(let k1=0;k1<n2;++k1){
								a=(Math.ceil(Math.random()*8+1)*(Math.random()<.5?1:-1))
								cadena+=(k1==0?(a<0?" - ":" "):(a<0?" - ":" + "))+Math.abs(a)+" x"
								den-=a
								a=(Math.ceil(Math.random()*6)*(Math.random()<.5?1:-1))
								cadena+=(a<0?" - ":" + ")+Math.abs(a)
								num-=a
							}
							
						}while(den==0)
						cadena+="$"
						
						spanContenido("Resuelva a "+cadena,C[6])
						const R=[];
						R[0]=(-num/den).toPrecision(3)
						for(let i=1;i<6;++i){
							do{
								R[i]=(-(num+2.5-Math.random()*5)/(den+2.5-Math.random()*5)).toPrecision(3)
							}while(repetido(R))
						}
						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
					}
				},
				{
					Nombre:"División de polinomios",
					Nota:"",
					fun:function(){
						function P1(x){
							var a=[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
							var b=[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),Math.round(Math.random()*19-9),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
														
							var P="El valor de la división de $$\\frac{"+polinomio(multiply(a,b))+"}{"+polinomio(a)+"}$$ es:"
							
							
							var R=[];
							R[0]="$"+polinomio(b)+"$"
							var dummy=0;
							for(var i=1;i<6;++i){
								do{
								
									var b=[Math.round(Math.random()*19-9),Math.round(Math.random()*19-9),Math.round(Math.random()*19-9)]
									R[i]="$"+polinomio(b)+"$"
								}while(repetido(R))
							}
							return [P,R]
						}
						/*fin*/
						let C=abrirPregunta()
						let [P,R]=P1()
						spanContenido(P,C[6])
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
						
					}
				},
				{
					Nombre:"Multiplicación de polinomios",
					Nota:"",
					fun:function(){
						function P1(x){
							var a=[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
							var b=[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),Math.round(Math.random()*19-9),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
								
							
							var P="Desarrolle el siguiente producto $("+polinomio(b)+")("+polinomio(a)+")$ es:"
							
							
							var R=[];
							let c = multiply(a,b)
							R[0]="$"+polinomio(c)+"$"
							Coef=Math.floor(Math.random()*(c.length-2)+1)
							var dummy=0;
							for(var i=1;i<6;++i){
								do{
									
									c[Coef]+=Math.round(6*Math.random())
									R[i]="$"+polinomio(c)+"$"
								}while(repetido(R))
							}
							return [P,R]
						}
						/*fin*/
						let C=abrirPregunta()
						let [P,R]=P1()
						spanContenido(P,C[6])
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
						
					}
				},
				{
					Nombre:"Expansión de binomios al cuadrado y al cubo",
					Nota:"",
					fun:function(){
						
						function P1(x){
							const a=[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]

							const P="La expansión de $("+polinomio(a)+")^2$ es:"
							
							const R=[];
							const c = multiply(a,a)
							R[0]="$"+polinomio(c)+"$"
							let dummy=c
							for(let i=1;i<6;++i){
								do{
									c[1]+=Math.round(6*Math.random())
									R[i]="$"+polinomio(c)+"$"
								}while(repetido(R))
							}
							return [P,R]
						}
						function P2(x){
							const a=[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]

							const P="La expansión de $("+polinomio(a)+")^3$ es:"
							
							const R=[];
							const coef=(Math.random()<0.5?1:2)
							const c = multiply(multiply(a,a),a)
							R[0]="$"+polinomio(c)+"$"
							let dummy=c
							for(let i=1;i<6;++i){
								do{
									c[coef]+=Math.round(6*Math.random())
									R[i]="$"+polinomio(c)+"$"
								}while(repetido(R))
							}
							return [P,R]
						}
						let C=abrirPregunta()
						let [P,R]=(Math.random()<0.5? P1() : P2())
						spanContenido(P,C[6])
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
						
					}
				},
				{
					Nombre:"Fórmula general",
					Nota:"$x_{1,2}=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}$",
					fun:function(){
						function P1(x){
							do{
							var a=Math.round(Math.random()*20-11)
							var b=Math.round(Math.random()*20-11)
							var c=Math.round(Math.random()*20-11)
							}while((b*b-4*a*c)<=0 || a==0)
							var x=[(-b-Math.sqrt(b*b-4*a*c))/(2*a),(-b+Math.sqrt(b*b-4*a*c))/(2*a)]
							if(x[0]>x[1]){
								var dummy=x[0]
								x[0]=x[1]
								x[1]=dummy;
							}	
								
							
							var P="La solución de "+a+"<i>x</i><sup>2</sup> "+(b<0?"-":"+")+" "+Math.abs(b)+"<i>x</i> "+(c<0?"-":"+")+" "+Math.abs(c)+" = 0 es"
							
							
							var R=[];
							R[0]="<i>x</i> = "+x[0].toFixed(3)+", "+x[1].toFixed(3)
							var dummy=0;
							for(var i=1;i<6;++i){
								do{
								
								do{
									var a=Math.round(Math.random()*20-11)
									var b=Math.round(Math.random()*20-11)
									var c=Math.round(Math.random()*20-11)
								}while((b*b-4*a*c)<=0 || a==0)
								var x=[(-b-Math.sqrt(b*b-4*a*c))/(2*a),(-b+Math.sqrt(b*b-4*a*c))/(2*a)]
								if(x[0]>x[1]){
									var dummy=x[0]
									x[0]=x[1]
									x[1]=dummy;
								}
								
									R[i]="<i>x</i> = "+x[0].toFixed(3)+", "+x[1].toFixed(3)
								}while(repetido(R))
							}
							return [P,R]
						}
						let C=abrirPregunta()
						let [P,R]=P1()
						spanContenido(P,C[6])
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
					}
				},
				{
					Nombre:"Trinomio cuadrado perfecto I",
					Nota:"",
					fun:function(){
						function P1(x){
							let a=[	1,
									(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),
									(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
							
								
							
							var P=`Exprese a $${polinomio([a[0]**2,2*a[0]*a[1],a[1]**2+a[2]])}$ en la forma $(ax+b)^2+c$`
							
							
							var R=[];
							
							R[0]=`$(${polinomio([a[0],a[1]])})^2${(a[2]>0?'+':'')+a[2]}$`
							Coef=Math.floor(Math.random()*2+1)
							var dummy=0;
							for(var i=1;i<6;++i){
								do{
									a[Coef]=(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)
									
									R[i]=`$(${polinomio([a[0],a[1]])})^2${(a[2]>0?'+':'')+a[2]}$`
								}while(repetido(R))
							}
							return [P,R]
						}
						/*fin*/
						let C=abrirPregunta()
						let [P,R]=P1()
						spanContenido(P,C[6])
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
						
					}
				},
				{
					Nombre:"Trinomio cuadrado perfecto II",
					Nota:"",
					fun:function(){
						function P1(x){
							let a=[	Math.round(Math.random()*9+1),
									(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),
									(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
							
								
							
							var P=`Exprese a $${polinomio([a[0]**2,2*a[0]*a[1],a[1]**2+a[2]])}$ en la forma $(ax+b)^2+c$`
							
							
							var R=[];
							
							R[0]=`$(${polinomio([a[0],a[1]])})^2${(a[2]>0?'+':'')+a[2]}$`
							Coef=Math.floor(Math.random()*3)
							var dummy=0;
							for(var i=1;i<6;++i){
								do{
									a[Coef]=(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)
									
									R[i]=`$(${polinomio([a[0],a[1]])})^2${(a[2]>0?'+':'')+a[2]}$`
								}while(repetido(R))
							}
							return [P,R]
						}
						/*fin*/
						let C=abrirPregunta()
						let [P,R]=P1()
						spanContenido(P,C[6])
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
						
					}
				},{
					Nombre:"Sistema de ecuaciones",
					Nota:"",
					fun:function(){
						let C=abrirPregunta()

						const a=[	[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),	(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)],
									[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),	(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]]
						let D = a[0][0]*a[1][1]-a[0][1]*a[1][0]
						if(D == 0){
							a[0][0]++
							D = a[0][0]*a[1][1]-a[0][1]*a[1][0]
						}
						let num
						const q=Math.round(Math.random())
						const b=[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),	(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
						if(q==0){
							num = b[0]*a[1][1]-b[1]*a[0][1]
						}else{
							num = b[1]*a[0][0]-b[0]*a[1][0]
						}

						spanContenido(`Determine el valor de $${q==0?'x':'y'}$ <br><center> $\\begin{array}{rcl} ${a[0][0]}x ${(a[0][1]>0?'+':'-')+Math.abs(a[0][1])}y & = & ${b[0]} \\\\ ${a[1][0]}x ${(a[1][1]>0?'+':'-')+Math.abs(a[1][1])}y & = & ${b[1]} \\end{array} $</center>`,C[6])
						const R=[];
						R[0]=`$${fraccion(num,D)}$`
						for(let i=1;i<6;++i){
							do{
								R[i]=`$${fraccion(num+Math.round(Math.random()*12-5),D)}$`
							}while(repetido(R))
						}
						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
					}
				},{
					Nombre:" Línea recta.- forma pendiente-ordenada al origen (Gráfica)",
					Nota:"\\(y = mx + c\\)<br>\\(m=\\frac{y_2-y_1}{x_2-x_1}\\)",
					fun:function(){
					//Inicio
					function PLine(m,b){
						const x=linspace(-6,6)
						const y=[]
						for(let k=0; k<x.length;++k) y[k] = m[0]*x[k]/m[1]+b
						return [x,y,'-RGB(255,100,155)']
					}
					function tempEcLine(m,b){
						return `$y=${fraccion(m[0],m[1])}x${(b==0?'':
							((b<0?b:'+'+b))
						)}$ `
					}
					/*Inicio de preguntas*/
					let C=abrirPregunta()
					let m=[(Math.random()<0.5?1:-1)*Math.ceil(Math.random()*5),Math.ceil(Math.random()*5)]
					m=simplify_frac(m)
					let b=(Math.random()<0.5?1:-1)*Math.ceil(Math.random()*5)

					const Puntos = [PLine(m,b)]
					/*const Puntos=[	[[0,1,5,6,2,7],
                     [5,4,3,2,1,-5],'oRGB(255,100,155)'],
                     [[0,1,5,6,2,7],
                     [5,4,3,2,1,-5],'-RGB(100,155,255)']]*/
    				ElemP=plot(Puntos,[400,400],[-6,6,-6,6,[1,1],[1,1]])

					const P=`Determine la ecuación de la siguiente gráfica <br> <center>${ElemP.outerHTML}</center>`

					spanContenido(P,C[6])
					const dummy=Math.round(Math.random())
					const R=[tempEcLine(m,b)]
					for(let i=1;i<6;++i){
						do{
							if(dummy==1){
								m=[(Math.random()<0.5?1:-1)*Math.ceil(Math.random()*5),Math.ceil(Math.random()*5)]
								m=simplify_frac(m)
							}else{
								b=(Math.random()<0.5?1:-1)*Math.ceil(Math.random()*5)
							}
							R[i]=tempEcLine(m,b)
						}while(repetido(R))
					
					}
					for(let k=0;k<6;++k) spanContenido(R[k],C[k])
					//Final



						}
				},{
					Nombre:" Línea recta.- forma pendiente-ordenada al origen (Gráfica) II",
					Nota:"",
					fun:function(){
						//Inicio
						function PLine(m,b){
							const x=linspace(-6,6)
							const y=[]
							for(let k=0; k<x.length;++k) y[k] = m*x[k]+b
							return [x,y,'-RGB(255,100,155)']
						}
						function tempEcLine(m,b){
							let cadena = `$y =`
							if(m[0]!=0){
								cadena += (m[1]==1 && Math.abs(m[0])==1?(m[0]<0?"-":"")+'x':(m[0]<0?"-":"")+fraccion(Math.abs(m[0]),m[1])+'x') 
							}
							cadena += (b[0]==0?'':(b[0]<0?"-":"+")+fraccion(Math.abs(b[0]),b[1]))+"$"
							return cadena
						}
						/*Inicio de preguntas*/
						let C=abrirPregunta()
						let A=[Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)], B
						do{
							B = [Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)]
							console.log(`A:${A}, B:${B}`)
						}while( (A[0] == B[0]) || (A[1] == B[1]) )
						const dummy=Math.round(Math.random())
						
						let m=[ B[1]-A[1], B[0]-A[0] ]
						m=simplify_frac(m)

						let b=[m[1]*A[1]-m[0]*A[0],m[1]]
						b=simplify_frac(b)
	
						const Puntos = [PLine(m[0]/m[1],b[0]/b[1])]
						ElemP=plot(Puntos,[400,400],[-6,6,-6,6,[1,1],[1,1]])
	
						const P=`Determine la ecuación de la siguiente gráfica <br> <center>${ElemP.outerHTML}</center>`
	
						spanContenido(P,C[6])
						
						const R=[tempEcLine(m,b)]
						for(let i=1;i<6;++i){
							do{
								if(dummy==1){
									m[0] += Math.round(Math.random()*4-2)
								}else{
									b[0] += Math.round(Math.random()*4-2)
								}
								R[i]= tempEcLine(m,b)
							}while(repetido(R))
						
						}
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
						//Final
	
	
	
							}
				},{
					Nombre:"Pendiente a partir de dos puntos",
					Nota:"$m=\\frac{y_2-y_1}{x_2-x_1}$",
					fun:function(){
						/*inicio*/
						function P1(x){
							do{
										var a=[Math.round(10*(Math.random()-.5)),Math.round(10*(Math.random()-.5))]
										var b=[Math.round(10*(Math.random()-.5)),Math.round(10*(Math.random()-.5))]
									}while(a[0]==b[0] || a[1]==b[1])
									var m=(a[1]-b[1])/(a[0]-b[0])
							
							
							var P='Calcule la pendiente del segmento que une los puntos A:('+a+') y B:('+b+').'
								
							var R=[];
							
							R[0]=m.toPrecision(3)
							for(var i=1;i<6;++i){
								do{
									R[i]=(m+(Math.random()-0.5)*2).toPrecision(3)
								}while(repetido(R))
							
							}
							return [P,R]
						}
						/*final*/
						let C=abrirPregunta()
						let [P,R]=P1()
						spanContenido(P,C[6])
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
					}
				},
				{
					Nombre:" Línea recta a partir de dos puntos",
					Nota:"",
					fun:function(){
						//Inicio
						function tempEcLine(m,b){
							let cadena = `$y =`
							if(m[0]!=0){
								cadena += (m[1]==1 && Math.abs(m[0])==1?(m[0]<0?"-":"")+'x':(m[0]<0?"-":"")+fraccion(Math.abs(m[0]),m[1])+'x') 
							}
							cadena += (b[0]==0?'':(b[0]<0?"-":"+")+fraccion(Math.abs(b[0]),b[1]))+"$"
							return cadena
						}
						/*Inicio de preguntas*/
						let C=abrirPregunta()
						let A=[Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)], B
						do{
							B = [Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)]
							console.log(`A:${A}, B:${B}`)
						}while( (A[0] == B[0]) || (A[1] == B[1]) )
						const dummy=Math.round(Math.random())
						
						let m=[ B[1]-A[1], B[0]-A[0] ]
						m=simplify_frac(m)

						let b=[m[1]*A[1]-m[0]*A[0],m[1]]
						b=simplify_frac(b)
	
						
						const P=`Determine la ecuación de la línea recta que pasa por los puntos $A:(${A[0]}, ${A[1]})$ y $B:(${B[0]}, ${B[1]})$`
	
						spanContenido(P,C[6])
						
						const R=[tempEcLine(m,b)]
						for(let i=1;i<6;++i){
							do{
								if(dummy==1){
									m[0] += Math.round(Math.random()*4-2)
								}else{
									b[0] += Math.round(Math.random()*4-2)
								}
								R[i]= tempEcLine(m,b)
							}while(repetido(R))
						
						}
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
						//Final
	
	
	
							}
				}
			]
		},
		{
			Nombre:"Números complejos",
			test:[{
				Nombre:"Operaciones básicas con números complejos",
				Nota:"",
				fun:function(){
					
					function P1(x){
						const a = new Complejo(Math.round(Math.random()*19-9.5),Math.round(Math.random()*19-9.5))
						const b = new Complejo(Math.round(Math.random()*19-9.5),Math.round(Math.random()*19-9.5))

						const P=`Sea $a=${a.toString()}$ y $b=${b.toString()}$, calcule $a+b$`
						
						const R=[];
						R[0]=`$${a.sumar(b).toString()}$`
						for(let i=1;i<6;++i){
							do{
								let c=new Complejo(Math.round(Math.random()*19-9.5),Math.round(Math.random()*19-9.5))
								R[i]=`$${a.sumar(c).toString()}$`
							}while(repetido(R))
						}
						return [P,R]
					}
					function P2(x){
						const a = new Complejo(Math.round(Math.random()*19-9.5),Math.round(Math.random()*19-9.5))
						const b = new Complejo(Math.round(Math.random()*19-9.5),Math.round(Math.random()*19-9.5))

						const P=`Sea $a=${a.toString()}$ y $b=${b.toString()}$, calcule $a-b$`
						
						const R=[];
						R[0]=`$${a.restar(b).toString()}$`
						for(let i=1;i<6;++i){
							do{
								let c=new Complejo(Math.round(Math.random()*19-9.5),Math.round(Math.random()*19-9.5))
								R[i]=`$${a.sumar(c).toString()}$`
							}while(repetido(R))
						}
						return [P,R]
					}
					function P3(x){
						const a = new Complejo(Math.round(Math.random()*19-9.5),Math.round(Math.random()*19-9.5))
						const b = new Complejo(Math.round(Math.random()*19-9.5),Math.round(Math.random()*19-9.5))

						const P=`Sea $a=${a.toString()}$ y $b=${b.toString()}$, calcule $a\\cdot b$`
						
						const R=[];
						R[0]=`$${a.multiplicar(b).toString()}$`//`$|${b.toString()}|^2 =(${b.toString()})(${b.conjugado().toString()}) = ${b.multiplicar(b.conjugado()).toString()}$`
						for(let i=1;i<6;++i){
							do{
								let c=new Complejo(Math.round(Math.random()*19-9.5),Math.round(Math.random()*19-9.5))
								R[i]=`$${a.multiplicar(c).toString()}$`
							}while(repetido(R))
						}
						return [P,R]
					}
					function P4(x){
						const a = new Complejo(Math.round(Math.random()*19-9.5),Math.round(Math.random()*19-9.5))
						const b = new Complejo(Math.round(Math.random()*19-9.5),Math.round(Math.random()*19-9.5))

						const P=`Sea $a=${a.toString()}$ y $b=${b.toString()}$, calcule $a\\div b$`
						
						const R=[];
						R[0]=`$${a.dividir(b).toString()}$`//`$|${b.toString()}|^2 =(${b.toString()})(${b.conjugado().toString()}) = ${b.multiplicar(b.conjugado()).toString()}$`
						for(let i=1;i<6;++i){
							do{
								let c=new Complejo(Math.round(Math.random()*19-9.5),Math.round(Math.random()*19-9.5))
								R[i]=`$${a.dividir(c).toString()}$`
							}while(repetido(R))
						}
						return [P,R]
					}
					let C=abrirPregunta()
					let [P,R]=Math.random()<0.3?(Math.random()<0.3?P1():P2()):(Math.random()<0.5?P3():P4())
					spanContenido(P,C[6])
					for(let k=0;k<6;++k) spanContenido(R[k],C[k])
				}
			},{
				Nombre:"Fórmula general (raices complejas)",
				Nota:"$x_{1,2}=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}$",
				fun:function(){
					function P1(x){
						
						let a=(Math.random()<0.5?1:-1)*Math.round(Math.random()*8+1)
						let b=(Math.random()<0.5?1:-1)*Math.round(Math.random()*18+1)
						let c= ( Math.round(0.25*b**2/a+(a>0?1:-1)*Math.random()*10) )

						let P=`Resuelva la ecuación $${polinomio([a,b,c])}=0$`
						
						
						const R=[];
						R[0]=`$x=\\frac{${-b}\\pm\\sqrt{${4*a*c-b**2}} j}{${2*a}}$`
						for(var i=1;i<6;++i){
							do{
								R[i]=`$x=\\frac{${-b}\\pm\\sqrt{${4*a*c-b**2+Math.round(Math.random()*20-11)}} j}{${2*a}}$`
							}while(repetido(R))
						}
						return [P,R]
					}
					let C=abrirPregunta()

					let [P,R]=P1()
					spanContenido(P,C[6])
					for(let k=0;k<6;++k) spanContenido(R[k],C[k])
				}
			},{
				Nombre:"Conversión de números complejos en forma cartesiana a exponencial",
				Nota:"",
				fun:function(){
					
					let C=abrirPregunta()
					let dummy
					do{
						dummy= [Math.round(Math.random()*19-9.5),Math.round(Math.random()*19-9.5)]
					}while(dummy[0]==0 && dummy[1]==0)

					const a = new Complejo(dummy[0],dummy[1])
					let magAng=[Math.sqrt(dummy[0]**2+dummy[1]**2),Math.atan2(dummy[1],dummy[0])]

					spanContenido(`Convierta $${a.toString()}$ a forma exponencial`,C[6])
					const temp = Math.random()<0.5	
					const op = Math.random()<0.5?0:1	
					
						const R=[`$${magAng[0].toPrecision(3)}e^{${temp?(magAng[1]).toPrecision(3):(magAng[1]*180/Math.PI).toPrecision(3)+"°"}j}$`]
						
						for(let i=1;i<6;++i){
							do{
								magAng[op] += (magAng[op]+2)*(Math.random()-0.5)
								R[i]=`$${magAng[0].toPrecision(3)}e^{${temp?(magAng[1]).toPrecision(3):(magAng[1]*180/Math.PI).toPrecision(3)+"°"}j}$`
							}while(repetido(R))
						}

					for(let k=0;k<6;++k) spanContenido(R[k],C[k])
				}
			},]
		},
		{
			Nombre:"Fracciones parciales",
			test:[{
				Nombre:"Fracciones parciales: caso 1",
				Nota:"",
				fun:function(){
					let C=abrirPregunta()
					let a=[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
					if(a[1]<a[3]){
						[a[1],a[3]] = [a[3],a[1]]
					}else if(a[1] == a[3]){
						a[1] += 1
					}
					spanContenido(`Separe la siguiente expresión $\\frac{${polinomio([a[0]+a[2],a[0]*a[3]+a[1]*a[2]])}}{${polinomio([1,a[1]+a[3],a[1]*a[3]])}}$`,C[6])
					const R=[];
					R[0]=`$\\frac{${polinomio([a[0]])}}{${polinomio([1,a[1]])}}+\\frac{${polinomio([a[2]])}}{${polinomio([1,a[3]])}}$`
					for(let i=1;i<6;++i){
						do{
							[a[0],a[2]] = [(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
							R[i]=`$\\frac{${polinomio([a[0]])}}{${polinomio([1,a[1]])}}+\\frac{${polinomio([a[2]])}}{${polinomio([1,a[3]])}}$`
						}while(repetido(R))
					}
					for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
				}
			},{
				Nombre:"Fracciones parciales: caso 1 B",
				Nota:"",
				fun:function(){
					function construye_a(){
						function asegura_desigual(a,n,m){
							if(a[n]>a[m]){
								[a[n],a[m]]=[a[m],a[n]]
							}else if(a[n]==a[m]){
								a[m]+=1
							}
							
							return a
						}
						let a=[]
						for(let k=0;k<6;++k){ a[k] = (Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1) }

						a = asegura_desigual(a,1,3)
						a = asegura_desigual(a,1,5)
						a = asegura_desigual(a,3,5)
						return a
					}
					let C=abrirPregunta()
					let a=construye_a()
					spanContenido(`Separe la siguiente expresión $\\frac{${polinomio([a[0]+a[2]+a[4], a[0]*(a[3]+a[5]) + a[2]*(a[1]+a[5]) + a[4]*(a[1]+a[3]),a[0]*a[3]*a[5]+a[2]*a[1]*a[5]+a[4]*a[1]*a[3]])}}{(${polinomio([1,a[1]])})(${polinomio([1,a[3]])})(${polinomio([1,a[5]])})}$`,C[6])
					const R=[];
					R[0]=`$\\frac{${polinomio([a[0]])}}{${polinomio([1,a[1]])}}+\\frac{${polinomio([a[2]])}}{${polinomio([1,a[3]])}}+\\frac{${polinomio([a[4]])}}{${polinomio([1,a[5]])}}$`
					const index=Math.floor(Math.random()*3)*2
					for(let i=1;i<6;++i){
						do{
							a[index] = (Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)
							R[i]=`$\\frac{${polinomio([a[0]])}}{${polinomio([1,a[1]])}}+\\frac{${polinomio([a[2]])}}{${polinomio([1,a[3]])}}+\\frac{${polinomio([a[4]])}}{${polinomio([1,a[5]])}}$`
						}while(repetido(R))
					}
					for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
				}
			},{
				Nombre:"Fracciones parciales: caso 2",
				Nota:"",
				fun:function(){
					function construye_a(){
						let a=[]
						for(let k=0;k<5;++k){ a[k] = (Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1) }
						if(a[1]==a[4]){a[4]++}
						return a
					}
					let C=abrirPregunta()
					let a=construye_a()
					spanContenido(`Separe la siguiente expresión $\\frac{${polinomio([a[0]+a[3], a[0]*(a[1]+a[4])+a[2]+2*a[1]*a[3],a[0]*a[1]*a[4]+a[2]*a[4]+a[1]**2*a[3]])}}{(${polinomio([1,a[1]])})^2(${polinomio([1,a[4]])})}$`,C[6])
					const R=[];
					R[0]=`$\\frac{${polinomio([a[0]])}}{${polinomio([1,a[1]])}}+\\frac{${polinomio([a[2]])}}{(${polinomio([1,a[1]])})^2}+\\frac{${polinomio([a[3]])}}{${polinomio([1,a[4]])}}$`
					let index=Math.floor(Math.random()*3)
					index += index==0?0:1
					console.log('---')
					for(let i=1;i<6;++i){
						do{
							a[index] = (Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)
							console.log(index)
							R[i]=`$\\frac{${polinomio([a[0]])}}{${polinomio([1,a[1]])}}+\\frac{${polinomio([a[2]])}}{(${polinomio([1,a[1]])})^2}+\\frac{${polinomio([a[3]])}}{${polinomio([1,a[4]])}}$`
						}while(repetido(R))
					}
					for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
				}
			},{
				Nombre:"Fracciones parciales: caso 3",
				Nota:"",
				fun:function(){
					const b = [	Math.round(Math.random()*20-10),
								Math.round(Math.random()*8+1),
								Math.round(Math.random()*20-10)]
					let a=[]
					do{
						a=[	Math.round(Math.random()*20-10),
								Math.round(Math.random()*20-10),
								Math.round(Math.random()*8+1)*(Math.random()<0.5?1:-1)]
					}while(a[0]==0 && a[1]==0)
					let C=abrirPregunta()
					const num = [a[0]+a[2],2*a[2]*b[0]+a[0]*b[2]+a[1],a[1]*b[2]+a[2]*(b[0]**2+b[1])]
					spanContenido(`Separe la siguiente expresión $\\frac{${polinomio(num)}}{(${polinomio([1,2*b[0],b[0]**2+b[1]])})(${polinomio([1,b[2]])})}$`,C[6])
					const R=[];
					R[0]=`$ \\frac{${polinomio([a[0],a[1]])}}{(${polinomio([1,b[0]])})^2+${b[1]}}+\\frac{${polinomio([a[2]])}}{(${polinomio([1,b[2]])})}$`
					index=Math.floor(Math.random()*2.4)
					
					
					for(let i=1;i<6;++i){
						do{
							a[index] = Math.round(Math.random()*8+1)*(Math.random()<0.5?1:-1)
							//console.log(index)
							R[i]=`$ \\frac{${polinomio([a[0],a[1]])}}{(${polinomio([1,b[0]])})^2+${b[1]}}+\\frac{${polinomio([a[2]])}}{(${polinomio([1,b[2]])})}$`
						}while(repetido(R))
					}
					for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
				}
			}]
		}		
	]
},{
	Nombre:"Trigonometría",
	subtema:[
		{
			Nombre:"Trigonometría básica",
			test:[{
				Nombre:"Teorema de Pitágoras",
				Nota:"$c^2 = a^2 + b^2$",
				fun:function(){
					function pitagorasSVG(a,b,c){
						var P='<center><svg width="340" height="200"  fill="none" xmlns="http://www.w3.org/2000/svg">'
							P+='<polyline points="20,20 20,150 300,150 20,20"'
							P+='style="fill:none;stroke:black;stroke-width:3" />'
							P+='<polyline points="20,140 30,140 30, 150"'
							P+='style="fill:none;stroke:black;stroke-width:3" />'
							P+='<text x="180" y="75" fill="blue">'+c+'</text>'
							P+='<text x="25" y="90" fill="blue">'+a+'</text>'
							P+='<text x="140" y="170" fill="blue">'+b+'</text></svg></center>'
						return P
					}
					function P1(x){
						if(Math.random()<1/3){
							var a=Math.round(Math.random()*20+1)
							var c=a+Math.round(Math.random()*20+1)
							var b='b'
							var q=Math.sqrt(c*c-a*a)
						}else if(Math.random()<1/2){
							var a='a'
							
							var b=Math.round(Math.random()*20+1)
							var c=b+Math.round(Math.random()*20+1)
							var q=Math.sqrt(c*c-b*b)
						}else{
							var a=Math.round(Math.random()*20+1)
							var c='c'
							var b=Math.round(Math.random()*20+1)
							var q=Math.sqrt(a*a+b*b)
						}
						
						var P="Obtenga el valor del lado faltante del siguiente  triángulo<br>"+pitagorasSVG(a,b,c)
							
						var R=[];
						
						R[0]=q.toFixed(2)
						for(var i=1;i<6;++i){
							do{
								R[i]=(q+Math.random()*8-4).toFixed(2)
							}while(repetido(R))
						
						}
						return [P,R]
					}
					let C=abrirPregunta()
					let [P,R]=P1()
					spanContenido(P,C[6])
					for(let k=0;k<6;++k) spanContenido(R[k],C[k])	
				}
			},
			{
				Nombre:"Funciones trigonométricas básicas",
				Nota:"",
				fun:function(){
					function pitagorasSVG(a,b,c){
						var P='<center><svg width="340" height="200"  fill="none" xmlns="http://www.w3.org/2000/svg">'
							P+='<polyline points="20,20 20,150 300,150 20,20"'
							P+='style="fill:none;stroke:black;stroke-width:3" />'
							P+='<polyline points="20,140 30,140 30, 150"'
							P+='style="fill:none;stroke:black;stroke-width:3" />'
							
							P+='<text x="25" y="90" fill="blue">'+a+'</text>'
							P+='<text x="180" y="75" fill="blue">'+c+'</text>'
							P+='<foreignObject x="200" y="125" width="50" height="50">    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:15px">   $\\theta$    </div></foreignObject>'
							P+='<text x="140" y="170" fill="blue">'+b+'</text></svg></center>'
							
						return P
					}/*
					function pitagorasSVG2(a,b,c){
						var P='<center><svg width="340" height="200"  fill="none" xmlns="http://www.w3.org/2000/svg">'
							P+='<polyline points="20,20 20,150 300,150 20,20"'
							P+='style="fill:none;stroke:black;stroke-width:3" />'
							P+='<polyline points="20,140 30,140 30, 150"'
							P+='style="fill:none;stroke:black;stroke-width:3" />'
							
							P+='<text x="25" y="90" fill="blue">'+b+'</text>'
							P+='<text x="180" y="75" fill="blue">'+c+'</text>'
							P+='<foreignObject x="15" y="40" width="50" height="50">    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:15px">   $\\theta$    </div></foreignObject>'
							P+='<text x="140" y="170" fill="blue">'+a+'</text></svg></center>'
							
						return P
					}*/
					function P1(x){
						if(Math.random()<1/3){
							var a=Math.round(Math.random()*20+1)
							var c=a+Math.round(Math.random()*20+1)
							var b=''
							var at=a
							var bt="\\sqrt{"+(c*c-a*a)+"}"
							var ct=c
							var x=[at, bt, ct, "\\sqrt{"+(c*c+a*a)+"}"]
						}else if(Math.random()<1/2){
							var a=''
							var b=Math.round(Math.random()*20+1)
							var c=b+Math.round(Math.random()*20+1)
							var at="\\sqrt{"+(c*c-b*b)+"}"
							var bt=b
							var ct=c
							var x=[at, bt, ct, "\\sqrt{"+(c*c+b*b)+"}"]
						}else{
							var a=Math.round(Math.random()*20+1)
							var c=''
							var b=Math.round(Math.random()*20+1)
							var at=a
							var bt=b
							var ct="\\sqrt{"+(b*b+a*a)+"}"
							var x=[at, bt, ct, "\\sqrt{"+(b*b-a*a)+"}"]
						}
						var op=Math.random()
						if(op<1/6){
							var ftrig="$\\sin(\\theta)$"
							var q="$\\frac{"+at+"}{"+ct+"}$"
						}else if(op<2/6){
							var ftrig="$\\cos(\\theta)$"
							var q="$\\frac{"+bt+"}{"+ct+"}$"
						}else if(op<3/6){
							var ftrig="$\\tan(\\theta)$"
							var q="$\\frac{"+at+"}{"+bt+"}$"
						}else if(op<4/6){
							var ftrig="$\\cot(\\theta)$"
							var q="$\\frac{"+bt+"}{"+at+"}$"
						}else if(op<5/6){
							var ftrig="$\\sec(\\theta)$"
							var q="$\\frac{"+ct+"}{"+bt+"}$"
						}else{
							var ftrig="$\\csc(\\theta)$"
							var q="$\\frac{"+ct+"}{"+at+"}$"
						}
						
						var P="Obtenga el valor "+ftrig+" según el siguiente triángulo<br>"+pitagorasSVG(a,b,c)
							
						var R=[];
						
						R[0]=q
						for(var i=1;i<6;++i){
							do{
								R[i]="$\\frac{"+x[Math.floor(Math.random()*4)]+"}{"+x[Math.floor(Math.random()*4)]+"}$"
							}while(repetido(R))
						
						}
						return [P,R]
					}
					let C=abrirPregunta()
					let [P,R]=P1()
					spanContenido(P,C[6])
					for(let k=0;k<6;++k) spanContenido(R[k],C[k])	
				}
			},
			{
				Nombre:"Relaciones trigonométricas",
				Nota:"",
				fun:function(){
					function pitagorasSVG(a,b,c,angulo){
						var P='<center><svg width="340" height="200"  fill="none" xmlns="http://www.w3.org/2000/svg">'
							P+='<polyline points="20,20 20,150 300,150 20,20"'
							P+='style="fill:none;stroke:black;stroke-width:3" />'
							P+='<polyline points="20,140 30,140 30, 150"'
							P+='style="fill:none;stroke:black;stroke-width:3" />'
							
							P+='<text x="25" y="90" fill="blue">'+a+'</text>'
							P+='<text x="180" y="75" fill="blue">'+c+'</text>'
							P+='<text x="180" y="140" fill="blue">'+angulo+'°</text>'
							P+='<text x="140" y="170" fill="blue">'+b+'</text></svg></center>'
							
						return P
					}
					function pitagorasSVG2(a,b,c,angulo){
						var P='<center><svg width="340" height="200"  fill="none" xmlns="http://www.w3.org/2000/svg">'
							P+='<polyline points="20,20 20,150 300,150 20,20"'
							P+='style="fill:none;stroke:black;stroke-width:3" />'
							P+='<polyline points="20,140 30,140 30, 150"'
							P+='style="fill:none;stroke:black;stroke-width:3" />'
							
							P+='<text x="25" y="90" fill="blue">'+b+'</text>'
							P+='<text x="180" y="75" fill="blue">'+c+'</text>'
							P+='<text x="50" y="30" fill="blue">'+angulo+'°</text>'
							P+='<text x="140" y="170" fill="blue">'+a+'</text></svg></center>'
							
						return P
					}
					function P1(x){
						var op=Math.random()
						if(op<1/6){
							var angulo=(Math.random()*70+10).toFixed(2)
							var a=Math.round(Math.random()*20+1)
							var c='x'
							var b=''
							var q=eval(a)/Math.sin(eval(angulo)*Math.PI/180)
						}else if(op<2/6){
							var angulo=(Math.random()*70+10).toFixed(2)
							var a=Math.round(Math.random()*20+1)
							var c=''
							var b='x'
							var q=eval(a)/Math.tan(eval(angulo)*Math.PI/180)
						}else if(op<3/6){
							var angulo=(Math.random()*70+10).toFixed(2)
							var a=''
							var c='x'
							var b=Math.round(Math.random()*20+1)
							var q=eval(b)/Math.cos(eval(angulo)*Math.PI/180)
						}else if(op<4/6){
							var angulo=(Math.random()*70+10).toFixed(2)
							var a='x'
							var c=''
							var b=Math.round(Math.random()*20+1)
							var q=eval(b)*Math.tan(eval(angulo)*Math.PI/180)
						}else if(op<5/6){
							var angulo=(Math.random()*70+10).toFixed(2)
							var a='x'
							var c=Math.round(Math.random()*20+1)
							var b=''
							var q=eval(c)*Math.sin(eval(angulo)*Math.PI/180)
						}else{
							var angulo=(Math.random()*70+10).toFixed(2)
							var a=''
							var c=Math.round(Math.random()*20+1)
							var b='x'
							var q=eval(c)*Math.cos(eval(angulo)*Math.PI/180)
						}
						
						var P="Obtenga el valor de $x$ <br>"+(Math.random()<0.5?pitagorasSVG(a,b,c,angulo):pitagorasSVG2(a,b,c,angulo))
							
						var R=[];
						
						R[0]=q.toFixed(2)
						for(var i=1;i<6;++i){
							do{
								R[i]=(q+Math.random()*2-1).toFixed(2)
							}while(repetido(R))
						
						}
						return [P,R]
					}
					let C=abrirPregunta()
					let [P,R]=P1()
					spanContenido(P,C[6])
					for(let k=0;k<6;++k) spanContenido(R[k],C[k])	
				}
			}]
		},
		{
			Nombre:"Trigonometría con triangulos no rectángulos",
			test:[{
				Nombre:"Ley de Cosenos",
				Nota:"$c^2=a^2+b^2-2ab\\cos(C)$<br> $C=\\cos^{-1}\\left(\\frac{a^2+b^2-c^2}{2ab}\\right)$",
				fun:function(){
					function P1(){
						
						const R=[],side=[],angle=[]
						side[0]=Math.round(Math.random()*20+1)
						side[1]=Math.round(Math.random()*20+1)
						angle[2]=Math.round(Math.random()*70+10)
						const dummy=(Math.sqrt(side[0]*side[0]+side[1]*side[1]-2*side[0]*side[1]*Math.cos(angle[2]*Math.PI/180))).toFixed(2)
						side[2]=eval(dummy)

						angle[0]=(Math.acos((side[1]*side[1]+side[2]*side[2]-side[0]*side[0])/(2*side[1]*side[2]))*180/Math.PI)
						angle[1]=(Math.acos((side[0]*side[0]+side[2]*side[2]-side[1]*side[1])/(2*side[0]*side[2]))*180/Math.PI)
						angle[2]=(Math.acos((side[0]*side[0]+side[1]*side[1]-side[2]*side[2])/(2*side[0]*side[1]))*180/Math.PI)
						op=Math.floor(Math.random()*2.99)
						
						
						const Angle=['A','B','C']
						
						
						/*R[6]="Considere un triángulo con lados a="+side[0]+"b="+side[1]+"c="+side[2].toFixed(2)+
						". Calcule ángulo "+Angle[op]*/
						spanContenido("Considere un triángulo con lados $a="+side[0]+"$, $b="+side[1]+"$ y $c="+side[2].toFixed(2)+
						"$. Calcule ángulo $"+Angle[op]+"$.",C[6])
						
						

						
						R[0]=angle[op].toFixed(2)+"°"
						for(let i=1;i<6;++i){
							do{
								R[i]=(angle[op]+30*(Math.random()-.5)).toFixed(2)+"°"
							}while(repetido(R))
						
						}
						for(let i=0;i<6;++i) spanContenido(R[i],C[i])
						return R
					}
					function P2(){
						
						const R=[],side=[],angle=[]
						side[0]=Math.round(Math.random()*20+1)
						side[1]=Math.round(Math.random()*20+1)
						angle[2]=Math.round(Math.random()*70+10)
						const dummy=(Math.sqrt(side[0]*side[0]+side[1]*side[1]-2*side[0]*side[1]*Math.cos(angle[2]*Math.PI/180))).toFixed(2)
						side[2]=eval(dummy)
						
						/*R[6]="Considere un triángulo con lados a="+side[0]+"b="+side[1]+"c="+side[2].toFixed(2)+
						". Calcule ángulo "+Angle[op]*/
						spanContenido("Considere un triángulo con lados $a="+side[0]+"$, $b="+side[1]+"$ y un ángulo entre ellos de $C="+angle[2]+
						"°$. Calcule el lado faltante.",C[6])
						
						

						
						R[0]=dummy
						for(let i=1;i<6;++i){
							do{
								R[i]=(side[2]+10*(Math.random()-.5)).toFixed(2)
							}while(repetido(R))
						
						}
						for(let i=0;i<6;++i) spanContenido(R[i],C[i])
						return R
					}
					let C=abrirPregunta()
					if(Math.random()<0.5) P1()
					else P2()




				}
			},
			{
				Nombre:"Ley de Senos",
				Nota:"$\\frac{a}{\\sin(A)}=\\frac{b}{\\sin(B)}=\\frac{c}{\\sin(C)}$",
				fun:function(){
					function P1(){
						
						let R=[],side=[],angle=[]
						side[0]=Math.round(Math.random()*20+1)
						
						do{
							side[1]=Math.round(Math.random()*20+1)
							angle[0]=Math.round(Math.random()*70+10)
							angle[1] = side[1]*Math.sin(angle[0]*Math.PI/180)/side[0]
						}while(angle[1]>.95 || angle[1]<-0.95)
							angle[1]=180*Math.asin(angle[1])/Math.PI
						
						const label=[	['a','b','A','B'],
										['a','c','A','C'],
										['b','a','B','A'],
										['b','c','B','C'],
										['c','a','C','A'],
										['c','b','C','B']]
						const op=Math.floor(Math.random()*label.length-.01)
						spanContenido("Considere un triángulo con lados $"+label[op][0]+"="+side[0]+"$, $"+label[op][1]+"="+side[1]+"$ y angulo $"+label[op][2]+"="+angle[0]+
						"$. Calcule ángulo $"+label[op][3]+"$.",C[6])
						console.log(angle)
						

						
						R[0]=angle[1].toPrecision(3)+"°"
						for(let i=1;i<6;++i){
							do{
								R[i]=(angle[1]+30*(Math.random()-.5)).toPrecision(3)+"°"
							}while(repetido(R))
						
						}
						for(let i=0;i<6;++i) spanContenido(R[i],C[i])
						return R
					}
					function P2(){
						
						const R=[],side=[],angle=[]
						side[0]  = Math.round(Math.random()*20+1)
						angle[0] = Math.round(Math.random()*70+10)
						angle[1] = Math.round(Math.random()*70+10)
						side[1]  = side[0]*Math.sin(angle[1]*Math.PI/180)/Math.sin(angle[0]*Math.PI/180)
							
							
						
						
						
						const label=[	['A','B','a','b'],
										['A','C','a','c'],
										['B','A','b','a'],
										['B','C','b','c'],
										['C','A','c','a'],
										['C','B','c','b']]
						const op=Math.floor(Math.random()*label.length-.01)
						
						
						spanContenido("Considere un triángulo con ángulos de $"+label[op][0]+" = "+angle[0]+"°$, $"+label[op][1]+"="+angle[1]+
						"°$ y un lado $"+label[op][2]+"="+side[0]+"$. Calcule el lado "+label[op][3]+".",C[6])
						
						

						R[0]=side[1].toPrecision(3)
						for(let i=1;i<6;++i){
							do{
								R[i]=(side[1]+10*(Math.random()-.5)).toPrecision(3)
							}while(repetido(R))
						
						}
						for(let i=0;i<6;++i) spanContenido(R[i],C[i])
					}
					let C=abrirPregunta()
					if(Math.random()<0.5) P1()
					else P2()
				}
			}]
		},
		{
			Nombre:"Funciones trigonométricas básicas",
			test:[{
				Nombre:"Funciones trigonométricas (frecuencia y periodo)",
				Nota:"",
				fun:function(){
				//Inicio
				let P = Math.round(Math.random()*8+2)
				let C=abrirPregunta()
				const op = [Math.random()<0.5,Math.random()<0.5,Math.random()<0.5]
				const tx = Math.round(Math.random()*P)
				const x = linspace(-10,10,200)
				const y=[]
				for(let k=0;k<x.length;++k){
					y.push(op[2]?Math.sin(2*Math.PI*(x[k]-tx)/P):Math.cos(2*Math.PI*(x[k]-tx)/P))
				}
				const Puntos=[	[x,
				 y,'-RGB(255,50,50)']]
				 
				const ax = plot(Puntos,[600,400],[-10,10,-2,2,[2,1],[1,1]])
					
				spanContenido(`Determine el valor de${op[0]?'l periodo':'la frecuencia.'} de la siguiente función. <br/><center>${ax.outerHTML}</center>` ,C[6])
				const R=[];

				R[0]=op[0] ? `$P = ${P} $`:(op[1] ? `$ f = \\frac{2\\pi}{${P}} $`:`$f = \\frac{360°}{${P}} $`)
				for(let i=1;i<6;++i){
					do{
						P = Math.round(Math.random()*8+2)
						R[i]=op[0] ? `$P = ${P} $`:(op[1] ? `$ f = \\frac{2\\pi}{${P}} $`:`$f = \\frac{360°}{${P}} $`)
					}while(repetido(R))
				}
				for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
			}
			},
			{
				Nombre:"Funciones trigonométricas (Traslaciones)",
				Nota:"",
				fun:function(){
				//Inicio
				let P = Math.round(Math.random()*8+2)
				let C=abrirPregunta()
				const op = [Math.random()<0.5,Math.random()<0.5,Math.random()<0.5]
				const tx = Math.round(Math.random()*2*P-P)
				const ty = Math.round(Math.random()*11-5.5)
				let Tx=tx, Ty=ty
				const x = linspace(-10,10,200)
				const y=[]
				for(let k=0;k<x.length;++k){
					y.push(op[2]?Math.sin(2*Math.PI*(x[k]-tx)/P)+ty:Math.cos(2*Math.PI*(x[k]-tx)/P)+ty)
				}
				const Puntos=[	[x,
				 y,'-RGB(255,50,50)']]
				 
				const ax = plot(Puntos,[600,400],[-10,10,(ty<-1?ty-2:-2),(ty>1?ty+2:2),[2,1],[1,1]])
					
				spanContenido(`La siguiente función tiene la forma $ f(x) = ${op[2]?`\\sin(\\frac{2\\pi}{${P}} (x-T_x))+Ty`:`\\cos(\\frac{2\\pi}{${P}} (x-T_x))+T_y`} $. Determine la ecuación de la misma.<br/><center>${ax.outerHTML}</center>` ,C[6])
				const R=[];

				R[0]=op[2]?
						`$ \\sin(\\frac{2\\pi}{${P}} ${tx == 0 ? 'x':  `(x  ${tx>0? `- ${Math.abs(tx)}` : `+ ${Math.abs(tx)}`})` }) ${ty<0?ty:`+ ${ty}`} $`:
						`$ \\cos(\\frac{2\\pi}{${P}} ${tx == 0 ? 'x':  `(x  ${tx>0? `- ${Math.abs(tx)}` : `+ ${Math.abs(tx)}`})` }) ${ty<0?ty:`+ ${ty}`} $`

				for(let i=1;i<6;++i){
					do{
						if(op[0])
							Tx = Math.round(Math.random()*18-9)
						else
							Ty = Math.round(Math.random()*11-5.5)

						R[i]=op[2]?	`$ \\sin(\\frac{2\\pi}{${P}} ${Tx == 0 ? 'x':  `(x  ${Tx>0? `- ${Math.abs(Tx)}` : `+ ${Math.abs(Tx)}`})` }) ${Ty<0?Ty:`+ ${Ty}`} $`:
									`$ \\cos(\\frac{2\\pi}{${P}} ${Tx == 0 ? 'x':  `(x  ${Tx>0? `- ${Math.abs(Tx)}` : `+ ${Math.abs(Tx)}`})` }) ${Ty<0?Ty:`+ ${Ty}`} $`
					}while(repetido(R) || (op[0] && (Tx-tx)%P==0))
				}
				for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
			}//				R=unsortArray(R)
			},{
				Nombre:"Funciones trigonométricas (identificar función)",
				Nota:"",
				fun:function(){
				//Inicio
				let P = Math.round(Math.random()*8+2)
				let C=abrirPregunta()
				const op = [Math.random()<0.5,Math.random()<0.5,Math.random()<0.5]
				
				const A = Math.round(Math.random()*3.5+1)*(Math.random()<0.5?1:-1)
				const posibleAns = [`$ ${A} \\sin(\\omega x)$`,
									`$ ${A} \\cos(\\omega x)$`,
									`$ ${-A} \\sin(\\omega x)$`,
									`$ ${-A} \\cos(\\omega x)$`,
									`$ ${A} \\tan(\\omega x)$`,
									`$ ${-A} \\tan(\\omega x)$`]

				const x = linspace(-10,10,200)
				const y=[]
				for(let k=0;k<x.length;++k){
					y.push(op[2]? A*Math.sin(2*Math.PI*x[k]/P):A*Math.cos(2*Math.PI*x[k]/P))
				}
				const Puntos=[	[x,
				 y,'-RGB(255,50,50)']]
				 
				const ax = plot(Puntos,[600,400],[-10,10,-5,5,[2,1],[1,1]])
					
				spanContenido(`Determine la ecuación de función que aparece a continuación.<br/><center>${ax.outerHTML}</center>` ,C[6])
				let R=[];
				let Raux=[]

				R[0]=posibleAns[op[2]?0:1]
				Raux[0]=posibleAns[op[2]?1:0]

				for(let i=1;i<5;++i){
					Raux[i]=posibleAns[1+i]
				}
				Raux=unsortArray(Raux)
				for(let i=0;i<5;++i){
					R[i+1]=Raux[i]
				}
				
				for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
			}//				R=unsortArray(R)
			}]
		}		
	]
},{
	Nombre:"Geometría analítica",
	subtema:[
		{
			Nombre:"Línea recta",
			test:[
				{
					Nombre:"Pendiente a partir de dos puntos",
					Nota:"$m=\\frac{y_2-y_1}{x_2-x_1}$",
					fun:function(){
						/*inicio*/
						function P1(x){
							do{
										var a=[Math.round(10*(Math.random()-.5)),Math.round(10*(Math.random()-.5))]
										var b=[Math.round(10*(Math.random()-.5)),Math.round(10*(Math.random()-.5))]
									}while(a[0]==b[0] || a[1]==b[1])
									var m=(a[1]-b[1])/(a[0]-b[0])
							
							
							var P='Calcule la pendiente del segmento que une los puntos A:('+a+') y B:('+b+').'
								
							var R=[];
							
							R[0]=m.toFixed(2)
							for(var i=1;i<6;++i){
								do{
									R[i]=(m+(Math.random()-0.5)*2).toFixed(2)
								}while(repetido(R))
							
							}
							return [P,R]
						}
						/*final*/
						let C=abrirPregunta()
						let [P,R]=P1()
						spanContenido(P,C[6])
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
					}
				},{
					Nombre:" Línea recta.- forma pendiente-ordenada al origen (Gráfica)",
					Nota:"\\(y = mx + c\\)<br>\\(m=\\frac{y_2-y_1}{x_2-x_1}\\)",
					fun:function(){
					//Inicio
					/*Inicio de preguntas*/
function PreguntaTema(){
	if(Math.random()>0.5){
		return P1(1)
	}else{
		return P2(1)
	}
}
function P1(x){
	var m=[Math.ceil(Math.random()*10-5),Math.round(Math.random()*4.49+0.5)]
	do{
		var m=[Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*4.49+0.5)]

	}while(m[0]==0)
	m=MCM(m)
	if(Math.abs(m[0])==m[1]){m[0]/=m[1];m[1]=1}
	var b=Math.ceil(Math.random()*10-5)	
	var mx=20
	var bx=110
	
	var P="Obtenga la ecuación de la línea recta que aparece a continuación:"
		P+='<center><svg width="'+(mx*21)+'px" height="'+(mx*11)+'">'
		for(var i=-10;i<6;++i){
			P+='<line x1="'+(mx*i+bx)+'" y1="0" x2="'+(mx*i+bx)+'" y2="'+(mx*11)+'" style="stroke:gray;stroke-width:2"> </line>'
			P+='<line y1="'+(mx*i+bx)+'" x1="0" y2="'+(mx*i+bx)+'" x2="'+(mx*11)+'" style="stroke:gray;stroke-width:2"> </line>'
		}
		P+='<line x1="'+(bx)+'" y1="0" x2="'+(bx)+'" y2="'+(mx*11)+'" style="stroke:black;stroke-width:2"> </line>'
		P+='<line y1="'+(bx)+'" x1="0" y2="'+(bx)+'" x2="'+(mx*11)+'" style="stroke:black;stroke-width:2"> </line>'
		
			P+='<text y="'+(-mx*5+bx)+'" x="'+bx+'" text-anchor="end"  style="stroke:red;stroke-width:1;font: italic 13px sans-serif;">5 </text>'
			P+='<text x="'+(mx*5+bx)+'" y="'+bx+'" text-anchor="middle" alignment-baseline="text-before-edge" style="stroke:red;stroke-width:1;font: italic 13px sans-serif;">5</text>'
		
		P+='<line x1="'+(-mx*5+bx)+'" y1="'+(-mx*(-m[0]/m[1]*5+b)+bx)+'" x2="'+(mx*5+bx)+'" y2="'+(-mx*(m[0]/m[1]*5+b)+bx)+'" style="stroke:blue;stroke-width:2"> </line>'
		
		P+='</svg></center>'
		
	var R=[];
	
	if(m[1]==1)	R[0]="y = "+m[0]+"x + ("+(b)+")"
	else 		R[0]="y = "+m[0]+"x/"+m[1]+" + ("+(b)+")"
	var dummy=0;
	for(var i=1;i<6;++i){
		var m=[Math.ceil(Math.random()*10-5),Math.round(Math.random()*4.49+0.5)]
		do{
			var m=[Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*4.49+0.5)]
		}while(m[0]==0)
		
		m=MCM(m)
	if(Math.abs(m[0])==m[1]){m[0]/=m[1];m[1]=1}
		var b=Math.ceil(Math.random()*10-5)	
		
		if(m[1]==1)	R[i]="y = "+m[0]+"x + ("+(b)+")"
		else 		R[i]="y = "+m[0]+"x/"+m[1]+" + ("+(b)+")"
			
		while(repetido(R)){
			var m=[Math.ceil(Math.random()*10-5),Math.round(Math.random()*4.49+0.5)]
			do{
				var m=[Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*4.49+0.5)]
			}while(m[0]==0)
			m=MCM(m)
	if(Math.abs(m[0])==m[1]){m[0]/=m[1];m[1]=1}
			if(m[1]==1)	R[i]="y = "+m[0]+"x + ("+(b)+")"
			else 		R[i]="y = "+m[0]+"x/"+m[1]+" + ("+(b)+")"
		}
	}
	return [P,R]
}
function P2(x){
	var m=[Math.ceil(Math.random()*10-5),Math.round(Math.random()*4.49+0.5)]
	do{
		var m=[Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*4.49+0.5)]

	}while(m[0]==0)
	m=MCM(m)
	if(Math.abs(m[0])==m[1]){m[0]/=m[1];m[1]=1}
	
	var b=Math.ceil(Math.random()*10-5)	
	var mx=20
	var bx=110
	
	var P="Obtenga la ecuación de la línea recta que aparece a continuación:"
		P+='<center><svg width="'+(mx*21)+'px" height="'+(mx*11)+'">'
		for(var i=-10;i<6;++i){
			P+='<line x1="'+(mx*i+bx)+'" y1="0" x2="'+(mx*i+bx)+'" y2="'+(mx*11)+'" style="stroke:gray;stroke-width:2"> </line>'
			P+='<line y1="'+(mx*i+bx)+'" x1="0" y2="'+(mx*i+bx)+'" x2="'+(mx*11)+'" style="stroke:gray;stroke-width:2"> </line>'
		}
		P+='<line x1="'+(bx)+'" y1="0" x2="'+(bx)+'" y2="'+(mx*11)+'" style="stroke:black;stroke-width:2"> </line>'
		P+='<line y1="'+(bx)+'" x1="0" y2="'+(bx)+'" x2="'+(mx*11)+'" style="stroke:black;stroke-width:2"> </line>'
		
			P+='<text y="'+(-mx*5+bx)+'" x="'+bx+'" text-anchor="end"  style="stroke:red;stroke-width:1;font: italic 13px sans-serif;">5 </text>'
			P+='<text x="'+(mx*5+bx)+'" y="'+bx+'" text-anchor="middle" alignment-baseline="text-before-edge" style="stroke:red;stroke-width:1;font: italic 13px sans-serif;">5</text>'
		
		P+='<line x1="'+(-mx*5+bx)+'" y1="'+(-mx*(-m[0]/m[1]*5+b)+bx)+'" x2="'+(mx*5+bx)+'" y2="'+(-mx*(m[0]/m[1]*5+b)+bx)+'" style="stroke:blue;stroke-width:2"> </line>'
		
		P+='</svg></center>'
		
	var R=[];
	
	if(m[1]==1)	R[0]="y = "+m[0]+"x + ("+(b)+")"
	else 		R[0]="y = "+m[0]+"x/"+m[1]+" + ("+(b)+")"
	var dummy=0;
	for(var i=1;i<6;++i){
		var m=[Math.ceil(Math.random()*10-5),Math.round(Math.random()*4.49+0.5)]
		do{
			var m=[Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*4.49+0.5)]
		}while(m[0]==0)
		
		m=MCM(m)
	if(Math.abs(m[0])==m[1]){m[0]/=m[1];m[1]=1}
		
		if(m[1]==1)	R[i]="y = "+m[0]+"x + ("+(b)+")"
		else 		R[i]="y = "+m[0]+"x/"+m[1]+" + ("+(b)+")"
			
		while(repetido(R)){
		var m=[Math.ceil(Math.random()*10-5),Math.round(Math.random()*4.49+0.5)]
			do{
				var m=[Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*4.49+0.5)]
			}while(m[0]==0)
		
			m=MCM(m)
	if(Math.abs(m[0])==m[1]){m[0]/=m[1];m[1]=1}
			if(m[1]==1)	R[i]="y = "+m[0]+"x + ("+(b)+")"
			else 		R[i]="y = "+m[0]+"x/"+m[1]+" + ("+(b)+")"
		}
	}
	return [P,R]
}
	/*Fin de la sección de preguntas*/
	let C=abrirPregunta()
	let [P,R]=PreguntaTema()
	spanContenido(P,C[6])
	// C[6].innerHTML=P
	for(let k=0;k<6;++k) spanContenido(R[k],C[k])
					//Final
						}
				},
				{
					Nombre:"Línea recta, pendientes",
					Nota:"\\(m=\\frac{y_2-y_1}{x_2-x_1}\\)",
					fun:function(){
						function P1(x){
							do{
										var a=[Math.round(10*(Math.random()-.5)),Math.round(10*(Math.random()-.5))]
										var b=[Math.round(10*(Math.random()-.5)),Math.round(10*(Math.random()-.5))]
									}while(a[0]==b[0] || a[1]==b[1])
									var m=(a[1]-b[1])/(a[0]-b[0])
							
							
							var P='Calcule la pendiente del segmento que une los puntos A:('+a+') y B:('+b+').'
								
							var R=[];
							
							R[0]=m.toFixed(2)
							for(var i=1;i<6;++i){
								do{
									R[i]=(m+(Math.random()-0.5)*2).toFixed(2)
								}while(repetido(R))
							
							}
							return [P,R]
						}
							/*Fin de la sección de preguntas*/
							let C=abrirPregunta()
							let [P,R]=P1()
							spanContenido(P,C[6])
							// C[6].innerHTML=P
							for(let k=0;k<6;++k) spanContenido(R[k],C[k])
						}
				},{
					Nombre:" Línea recta.- forma pendiente-ordenada al origen (Gráfica) II",
					Nota:"",
					fun:function(){
						/*inicio*/
						function MCMHelp(x,a){
							for(var k=0;k<x.length;++k){
								if((x[k]%a)!=0) return false;
							}
							return true;
						}
						function Max(x){
						
							var m=Math.min.apply(Math, x);
							var M=Math.max.apply(Math, x)
							
							if(M>(-m)){
								return M
							}else{
								return -m
							}
						}
						function MCM(x){
							var N=x.length;
							for(var k=2;k<=Max(x)/2;++k){
								if(MCMHelp(x,k)){
									for(var i=0;i<x.length;++i){
										x[i]=x[i]/k;
									}
									--k;
								}
							}
							return x
						}
						function P1(x){
							var m=[Math.ceil(Math.random()*10-5),Math.round(Math.random()*4.49+0.5)]
							do{
								var m=[Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*4.49+0.5)]
						
							}while(m[0]==0)
							m=MCM(m)
							if(Math.abs(m[0])==m[1]){m[0]/=m[1];m[1]=1}
							var b=Math.ceil(Math.random()*10-5)	
							var mx=20
							var bx=110
							
							var P="Obtenga la ecuación de la línea recta que aparece a continuación:"
								P+='<center><svg width="'+(mx*21)+'px" height="'+(mx*11)+'">'
								for(var i=-10;i<6;++i){
									P+='<line x1="'+(mx*i+bx)+'" y1="0" x2="'+(mx*i+bx)+'" y2="'+(mx*11)+'" style="stroke:gray;stroke-width:2"> </line>'
									P+='<line y1="'+(mx*i+bx)+'" x1="0" y2="'+(mx*i+bx)+'" x2="'+(mx*11)+'" style="stroke:gray;stroke-width:2"> </line>'
								}
								P+='<line x1="'+(bx)+'" y1="0" x2="'+(bx)+'" y2="'+(mx*11)+'" style="stroke:black;stroke-width:2"> </line>'
								P+='<line y1="'+(bx)+'" x1="0" y2="'+(bx)+'" x2="'+(mx*11)+'" style="stroke:black;stroke-width:2"> </line>'
								
									P+='<text y="'+(-mx*5+bx)+'" x="'+bx+'" text-anchor="end"  style="stroke:red;stroke-width:1;font: italic 13px sans-serif;">5 </text>'
									P+='<text x="'+(mx*5+bx)+'" y="'+bx+'" text-anchor="middle" alignment-baseline="text-before-edge" style="stroke:red;stroke-width:1;font: italic 13px sans-serif;">5</text>'
								
								P+='<line x1="'+(-mx*5+bx)+'" y1="'+(-mx*(-m[0]/m[1]*5+b)+bx)+'" x2="'+(mx*5+bx)+'" y2="'+(-mx*(m[0]/m[1]*5+b)+bx)+'" style="stroke:blue;stroke-width:2"> </line>'
								
								P+='</svg></center>'
								
							var R=[];
							
							if(m[1]==1)	R[0]="y = "+m[0]+"x + ("+(b)+")"
							else 		R[0]="y = "+m[0]+"x/"+m[1]+" + ("+(b)+")"
							var dummy=0;
							for(var i=1;i<6;++i){
								var m=[Math.ceil(Math.random()*10-5),Math.round(Math.random()*4.49+0.5)]
								do{
									var m=[Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*4.49+0.5)]
								}while(m[0]==0)
								
								m=MCM(m)
							if(Math.abs(m[0])==m[1]){m[0]/=m[1];m[1]=1}
								var b=Math.ceil(Math.random()*10-5)	
								
								if(m[1]==1)	R[i]="y = "+m[0]+"x + ("+(b)+")"
								else 		R[i]="y = "+m[0]+"x/"+m[1]+" + ("+(b)+")"
									
								while(repetido(R)){
									var m=[Math.ceil(Math.random()*10-5),Math.round(Math.random()*4.49+0.5)]
									do{
										var m=[Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*4.49+0.5)]
									}while(m[0]==0)
									m=MCM(m)
							if(Math.abs(m[0])==m[1]){m[0]/=m[1];m[1]=1}
									if(m[1]==1)	R[i]="y = "+m[0]+"x + ("+(b)+")"
									else 		R[i]="y = "+m[0]+"x/"+m[1]+" + ("+(b)+")"
								}
							}
							return [P,R]
						}
						function P2(x){
							var m=[Math.ceil(Math.random()*10-5),Math.round(Math.random()*4.49+0.5)]
							do{
								var m=[Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*4.49+0.5)]
						
							}while(m[0]==0)
							m=MCM(m)
							if(Math.abs(m[0])==m[1]){m[0]/=m[1];m[1]=1}
							
							var b=Math.ceil(Math.random()*10-5)	
							var mx=20
							var bx=110
							
							var P="Obtenga la ecuación de la línea recta que aparece a continuación:"
								P+='<center><svg width="'+(mx*21)+'px" height="'+(mx*11)+'">'
								for(var i=-10;i<6;++i){
									P+='<line x1="'+(mx*i+bx)+'" y1="0" x2="'+(mx*i+bx)+'" y2="'+(mx*11)+'" style="stroke:gray;stroke-width:2"> </line>'
									P+='<line y1="'+(mx*i+bx)+'" x1="0" y2="'+(mx*i+bx)+'" x2="'+(mx*11)+'" style="stroke:gray;stroke-width:2"> </line>'
								}
								P+='<line x1="'+(bx)+'" y1="0" x2="'+(bx)+'" y2="'+(mx*11)+'" style="stroke:black;stroke-width:2"> </line>'
								P+='<line y1="'+(bx)+'" x1="0" y2="'+(bx)+'" x2="'+(mx*11)+'" style="stroke:black;stroke-width:2"> </line>'
								
									P+='<text y="'+(-mx*5+bx)+'" x="'+bx+'" text-anchor="end"  style="stroke:red;stroke-width:1;font: italic 13px sans-serif;">5 </text>'
									P+='<text x="'+(mx*5+bx)+'" y="'+bx+'" text-anchor="middle" alignment-baseline="text-before-edge" style="stroke:red;stroke-width:1;font: italic 13px sans-serif;">5</text>'
								
								P+='<line x1="'+(-mx*5+bx)+'" y1="'+(-mx*(-m[0]/m[1]*5+b)+bx)+'" x2="'+(mx*5+bx)+'" y2="'+(-mx*(m[0]/m[1]*5+b)+bx)+'" style="stroke:blue;stroke-width:2"> </line>'
								
								P+='</svg></center>'
								
							var R=[];
							
							if(m[1]==1)	R[0]="y = "+m[0]+"x + ("+(b)+")"
							else 		R[0]="y = "+m[0]+"x/"+m[1]+" + ("+(b)+")"
							var dummy=0;
							for(var i=1;i<6;++i){
								var m=[Math.ceil(Math.random()*10-5),Math.round(Math.random()*4.49+0.5)]
								do{
									var m=[Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*4.49+0.5)]
								}while(m[0]==0)
								
								m=MCM(m)
							if(Math.abs(m[0])==m[1]){m[0]/=m[1];m[1]=1}
								
								if(m[1]==1)	R[i]="y = "+m[0]+"x + ("+(b)+")"
								else 		R[i]="y = "+m[0]+"x/"+m[1]+" + ("+(b)+")"
									
								while(repetido(R)){
								var m=[Math.ceil(Math.random()*10-5),Math.round(Math.random()*4.49+0.5)]
									do{
										var m=[Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*4.49+0.5)]
									}while(m[0]==0)
								
									m=MCM(m)
							if(Math.abs(m[0])==m[1]){m[0]/=m[1];m[1]=1}
									if(m[1]==1)	R[i]="y = "+m[0]+"x + ("+(b)+")"
									else 		R[i]="y = "+m[0]+"x/"+m[1]+" + ("+(b)+")"
								}
							}
							return [P,R]
						}
						/*fin*/
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
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
					}
				}
			]
		},
		{
			Nombre:"Parábola",
			test:[
				{
					Nombre:"Factorización",
					Nota:"",
					fun:function(){
						let c= [Math.ceil(Math.random()*9),
								Math.ceil(Math.random()*9)*(Math.random()<0.5?1:-1),
								Math.ceil(Math.random()*9)*(Math.random()<0.5?1:-1),
								Math.ceil(Math.random()*9)*(Math.random()<0.5?1:-1)]
						MCM(c)
						if(c[0]<c[2]) [c[0],c[2]] = [c[2],c[0]]
						let C=abrirPregunta()
    					
						spanContenido(`Factorice la siguiente expresión $${polinomio(multiply([c[0],c[1]], [c[2],c[3]]))}$.`,C[6])
						const R = [];
						R[0] = `$(${polinomio([c[0],c[1]])})(${polinomio([c[2],c[3]])})$`
						for(let i=1;i<6;++i){
							do{		
								c= [Math.ceil(Math.random()*9),
									Math.ceil(Math.random()*9)*(Math.random()<0.5?1:-1),
									Math.ceil(Math.random()*9)*(Math.random()<0.5?1:-1),
									Math.ceil(Math.random()*9)*(Math.random()<0.5?1:-1)]
							MCM(c)
							if(c[0]<c[2]) [c[0],c[2]] = [c[2],c[0]]
								R[i] = `$(${polinomio([c[0],c[1]])})(${polinomio([c[2],c[3]])})$`
							}while(repetido(R))
						}
						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
					}
				},{
					Nombre:"Parábola a partir de tres puntos I",
					Nota:"",
					fun:function(){
						let P= [[Math.ceil(Math.random()*9)*(Math.random()<0.5?1:-1),Math.ceil(Math.random()*9)*(Math.random()<0.5?1:-1),0],
								[Math.ceil(Math.random()*9)*(Math.random()<0.5?1:-1),Math.ceil(Math.random()*9)*(Math.random()<0.5?1:-1),Math.ceil(Math.random()*9)*(Math.random()<0.5?1:-1)]]
							if(P[0][0]==P[0][1]){
								P[0][0]++
							}
							if(P[1][0]==P[1][1] && P[1][0]==P[1][2]){
								P[1][0]++
							}

						
						let a = [(P[1][0]-P[1][2])*P[0][1]-(P[1][1]-P[1][2])*P[0][0], P[0][0]**2*P[0][1]-P[0][1]**2*P[0][0]]
						let b = [(P[1][1]-P[1][2])*P[0][0]**2-(P[1][0]-P[1][2])*P[0][1]**2, P[0][0]**2*P[0][1]-P[0][1]**2*P[0][0]]
						const op =Math.random()<0.5?['a',a]:['b',b]
						
						let C=abrirPregunta()
						spanContenido(`La parabola $y= ax^2+bx+c$ para por lo puntos que me muestran a continuación, por lo tanto el valor de $${op[0]}$ es: <b>
							${plot([[linspace(-10,10),evaluar(`${a[0]/a[1]}*x**2+(${b[0]/b[1]})*x+(${P[1][2]})`,linspace(-10,10)),'-orange'],[P[0],P[1],'oblack']],[600,400],[-10,10,-10,10,[2,2],[1,1]]).outerHTML}
							.`,C[6])
							let frac = op[1]
							frac = simplify_frac(frac)
						const R = [`$${op[0]} = ${fraccion(frac[0],frac[1],true)}$`];
						
						for(let i=1;i<6;++i){
							do{
								frac = op[1]
								frac[0] += Math.round(Math.random()*16-8)
									
								frac=simplify_frac(frac)
								R[i] = `$${op[0]} = ${fraccion(frac[0],frac[1],true)}$`
							}while(repetido(R))
						}
						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
					}
				},{
					Nombre:"Representación de la parábola en la forma $y = a(x-h)^2+k$",
					Nota:"",
					fun:function(){
						function parabola(a,h,k){
							const x = linspace(-10,10)
							const y = []
							for(let i =0; i<x.length; ++i){
								y[i] = a*(x[i]-h)**2+k
							}
							return [x,y,'-RGB(100,155,255)']
						}
						let h = Math.round(Math.random()*18-9), k=Math.round(Math.random()*18-9)
						const a=(k<0?1:-1)*(Math.random()*2.7+.3)
						let C=abrirPregunta()
    					const svg=plot([parabola(a,h,k)],[600,400],[-10,10,-10,10,[2,2],[1,1]])
						spanContenido(`Encuentre la representación la siguiente parábola en la forma $y=a(x-h)^2+k$<br>${svg.outerHTML}`,C[6])
						const R = [];
						R[0] = `$y=${a.toPrecision(3)}(${polinomio([1,-h])})^2${(k>=0?'+':'')+k}$`
						for(let i=1;i<6;++i){
							do{		
								h = Math.round(Math.random()*18-9), k=Math.round(Math.random()*18-9)
								R[i] = `$y=${a.toPrecision(3)}(${polinomio([1,-h])})^2${(k>=0?'+':'')+k}$`
							}while(repetido(R))
						}
						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
					}
				},{
					Nombre:"Representación de la parábola en la forma $y = a(x-x_1)(x-x_2)$",
					Nota:"",
					fun:function(){
						function parabola(a,x1,x2){
							const x = linspace(-10,10)
							const y = []
							for(let i =0; i<x.length; ++i){
								y[i] = a*(x[i]-x1)*(x[i]-x2)
							}
							return [x,y,'-RGB(100,155,255)']
						}
						let x1 = Math.round(Math.random()*18-9), x2=Math.round(Math.random()*18-9)
						if(x1>x2){
							[x1,x2] = [x2,x1]
						}
						const a=[(Math.random()<0.5?1:-1)*Math.round(Math.random()*(Math.min(x2-x1,9))+1)*4,-1*(x1-x2)**2]
						if(a[1]==0){
							a[0] = Math.ceil(Math.random()*5)
							a[1] = Math.ceil(Math.random()*5)
						}
						let C=abrirPregunta()
    					const svg=plot([parabola(a[0]/a[1],x1,x2)],[600,400],[-10,10,-10,10,[2,2],[1,1]])
						spanContenido(`Encuentre la representación la siguiente parábola en la forma $y=a(x-x_1)(x-x_2)$<br>${svg.outerHTML}`,C[6])
						const R = [];
						R[0] = `$y=${fraccion(a[0],a[1])}(${polinomio([1,-x1])})(${polinomio([1,-x2])})$`
						for(let i=1;i<6;++i){
							do{		
								x1 = Math.round(Math.random()*18-9), x2=Math.round(Math.random()*18-9)
								if(x1>x2){
									[x1,x2] = [x2,x1]
								}
								R[i] = `$y=${fraccion(a[0],a[1])}(${polinomio([1,-x1])})(${polinomio([1,-x2])})$`
							}while(repetido(R))
						}
						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
					}
				},{
					Nombre:"Representación de la parábola en la forma $y = ax^2+bx+c$",
					Nota:"",
					fun:function(){
						function parabola(a,b,c){
							const x = linspace(-10,10)
							const y = []
							for(let i =0; i<x.length; ++i){
								y[i] = a*x[i]**2+b*x[i]+c
							}
							return [x,y,'-RGB(100,155,255)']
						}

						const c = Math.round(Math.random()*18-9)
						let x=[0,0],y=[0,0]
						do{
							x = [	(Math.random()<0.5?1:-1)*Math.round(Math.random()*8+1),
										(Math.random()<0.5?1:-1)*Math.round(Math.random()*8+1)]
							y = [	(Math.random()<0.5?1:-1)*Math.round(Math.random()*8+1),
											(Math.random()<0.5?1:-1)*Math.round(Math.random()*8+1)]
						}while(x[0]==x[1] || y[0]==y[1])
						const D = x[0]**2*x[1]-x[1]**2*x[0]
						let a = [(y[0]-c)*x[1]-(y[1]-c)*x[0],D]
						let b = [x[0]**2*(y[1]-c)-x[1]**2*(y[0]-c),D]

						let C=abrirPregunta()
    					const svg=plot([parabola(a[0]/a[1],b[0]/b[1],c),
										[[0,x[0],x[1]],[c,y[0],y[1]],'oRGB(100,155,255)']]
										,[600,400],[-10,10,-10,10,[2,2],[1,1]])
						spanContenido(`Encuentre la representación la siguiente parábola en la forma $y=ax^2+bx+c$<br>${svg.outerHTML}`,C[6])
						const R = [];
						R[0] = `$y=${fraccion(a[0],a[1])}x^2+${fraccion(b[0],b[1])}x${(c>0?'+':'-')+Math.abs(c)}$`
						for(let i=1;i<6;++i){
							do{		
								a[0] += Math.round(a[0]+Math.random()*10-5)
								b[0] += Math.round(b[0]+Math.random()*10-5)
								R[i] = `$y=${fraccion(a[0],a[1])}x^2+${fraccion(b[0],b[1])}x${(c>0?'+':'-')+Math.abs(c)}$`
							}while(repetido(R))
						}
						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
					}
				}
				
			]
		},
		{
			Nombre:"Circunferencia",
			test:[]
		},
		{
			Nombre:"Elipse",
			test:[]
		},
		{
			Nombre:"Hipérbola",
			test:[]
		},
		{
			Nombre:"Introducción a funciones",
			test:[]
		},
	]
}
]
/*
fun:function(){
						let C=abrirPregunta()

						spanContenido(`Separe la siguiente expresión $\\frac{${polinomio([a[0]+a[2],a[0]*a[3]+a[1]*a[2]])}}{${polinomio([1,a[1]+a[3],a[1]*a[3]])}}$`,C[6])
						const R=[];
						R[0]=
						for(let i=1;i<6;++i){
							do{
								
								R[i]=
							}while(repetido(R))
						}
						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
					}
*/
