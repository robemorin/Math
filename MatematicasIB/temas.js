const tema = [{
	Nombre:"Conocimientos previos",
	subtema:[
		{
			Nombre:"Aritmética",
			test:[
				{
					Nombre: "Notación científica",
					Nota:"$a\\times 10^{k}$",
					fun: function(){
						function P1(x){
							let k=Math.round(Math.random()*20-5)
							const cs=eval((Math.round(Math.random()*9+1)+Math.random()).toFixed(2))
							
							var P=`Convierta ${parseFloat((Math.pow(10,k)*cs).toPrecision(3))} a notación científica`
							
							var R=[];
							R[0]=NotacionCientifica(Math.pow(10,k)*cs)
							for(var i=1;i<6;++i){
								do{
									k=Math.round(Math.random()*20-5)
									R[i]=NotacionCientifica(Math.pow(10,k)*cs)
								}while(repetido(R))
							}
							return [P,R]
						}
						function P2(x){
							var k=Math.round(Math.random()*20-5)
							var cs=eval((Math.round(Math.random()*9+1)+Math.random()).toFixed(2))
							
							var P=`Convierta ${NotacionCientifica(Math.pow(10,k)*cs)} a expresión regular.`
							
							
							
							
							var R=[];
							R[0]=parseFloat((Math.pow(10,k)*cs).toPrecision(3))
							var dummy=0;
							for(var i=1;i<6;++i){
								do{
									k=Math.round(Math.random()*20-5)
									R[i]=parseFloat((Math.pow(10,k)*cs).toPrecision(3))
								}while(repetido(R))
							}
							return [P,R]
						}
						let C=abrirPregunta()
						let [P,R] = Math.random()<0.5?P1():P2()
						
						spanContenido(P,C[6])
						
						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
					}
				},
				{
					Nombre:"Suma de fracciones",
					Nota:"El alumno debe ser capaz de realizarlos sin calculadora",
					fun:function(){
						let C=abrirPregunta()
						let a=[Math.round(0.51+Math.random()*10),Math.round(0.51+Math.random()*10)]
						let b=[Math.round(0.51+Math.random()*10),Math.round(0.51+Math.random()*10)]
						let c=simplify_frac([a[0]*b[1]+a[1]*b[0],a[1]*b[1]])
						
						spanContenido(`Halle el valor de $ \\frac{${a[0]}}{${a[1]}}+\\frac{${b[0]}}{${b[1]}} $`,C[6])
						const R=[];
						R[0]=c[1]==1?`$${c[0]}$`:`$\\frac{${c[0]}}{${c[1]}}$`
						for(let i=1;i<6;++i){
							do{
								R[i]=i
							}while(repetido(R))
						}
						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
					}
				},{
					Nombre:"Resta de fracciones",
					Nota:"El alumno debe ser capaz de realizarlos sin calculadora",
					fun:function(){
						let C=abrirPregunta()
						let a=[Math.round(0.51+Math.random()*10),Math.round(0.51+Math.random()*10)]
						let b=[Math.round(0.51+Math.random()*10),Math.round(0.51+Math.random()*10)]
						let c=simplify_frac([a[0]*b[1]-a[1]*b[0],a[1]*b[1]])
						
						spanContenido(`Halle el valor de $ \\frac{${a[0]}}{${a[1]}}-\\frac{${b[0]}}{${b[1]}} $`,C[6])
						const R=[];
						R[0]=c[1]==1?`$${c[0]}$`:`$\\frac{${c[0]}}{${c[1]}}$`
						for(let i=1;i<6;++i){
							do{
								a[0]=Math.round(0.51+Math.random()*10)
								b[0]=Math.round(0.51+Math.random()*10)
								let c=simplify_frac([a[0]*b[1]-a[1]*b[0],a[1]*b[1]])
								R[i]=c[1]==1?`$${c[0]}$`:`$\\frac{${c[0]}}{${c[1]}}$`
							}while(repetido(R))
						}
						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
					}
				},{
					Nombre:"Multiplicación de fracciones",
					Nota:"El alumno debe ser capaz de realizarlos sin calculadora",
					fun:function(){
						let C=abrirPregunta()
						let a=[Math.round(0.51+Math.random()*10),Math.round(0.51+Math.random()*10)]
						let b=[Math.round(0.51+Math.random()*10),Math.round(0.51+Math.random()*10)]
						let c=simplify_frac([a[0]*b[0],a[1]*b[1]])
						
						spanContenido(`Halle el valor de $ \\frac{${a[0]}}{${a[1]}}\\times\\frac{${b[0]}}{${b[1]}} $`,C[6])
						const R=[];
						R[0]=c[1]==1?`$${c[0]}$`:`$\\frac{${c[0]}}{${c[1]}}$`
						for(let i=1;i<6;++i){
							do{
								a[0]=Math.round(0.51+Math.random()*10)
								b[0]=Math.round(0.51+Math.random()*10)
								c=simplify_frac([a[0]*b[0],a[1]*b[1]])
								R[i]=c[1]==1?`$${c[0]}$`:`$\\frac{${c[0]}}{${c[1]}}$`
							}while(repetido(R))
						}
						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
					}
				},{
					Nombre:"Fracciones con más de dos operaciones",
					Nota:"El alumno debe ser capaz de realizarlos sin calculadora",
					fun:function(){
						let C=abrirPregunta()
						function P1(){
							let d=[c[1]*(a[0]*b[1]+a[1]*b[0]),a[1]*b[1]*c[0]]
							spanContenido(`Halle el valor de $ \\frac{ \\frac{${a[0]}}{${a[1]}} + \\frac{${b[0]}}{${b[1]}}} {\\frac{${c[0]}}{${c[1]}}} $`,C[6])
							d=simplify_frac(d)
							R[0]=d[1]==1?`$${d[0]}$`:`$\\frac{${d[0]}}{${d[1]}}$`

							for(let i=1;i<6;++i){
								do{
									a[0]=Math.round(0.51+Math.random()*10)
									b[0]=Math.round(0.51+Math.random()*10)
									c[0]=Math.round(0.51+Math.random()*10)

									d=[c[1]*(a[0]*b[1]+a[1]*b[0]),a[1]*b[1]*c[0]]
									d=simplify_frac(d)
									R[i]=d[1]==1?`$${d[0]}$`:`$\\frac{${d[0]}}{${d[1]}}$`
								}while(repetido(R))
							}
						}
						function P2(){
							let d=[c[0]*(a[0]*b[1]+a[1]*b[0]),a[1]*b[1]*c[1]]
							spanContenido(`Halle el valor de $  \\left(\\frac{${a[0]}}{${a[1]}} + \\frac{${b[0]}}{${b[1]}} \\right) \\times \\frac{${c[0]}}{${c[1]}} $`,C[6])
							d=simplify_frac(d)
							R[0]=d[1]==1?`$${d[0]}$`:`$\\frac{${d[0]}}{${d[1]}}$`

							for(let i=1;i<6;++i){
								do{
									a[0]=Math.round(0.51+Math.random()*10)
									b[0]=Math.round(0.51+Math.random()*10)
									c[0]=Math.round(0.51+Math.random()*10)

									d=[c[0]*(a[0]*b[1]+a[1]*b[0]),a[1]*b[1]*c[1]]
									d=simplify_frac(d)
									R[i]=d[1]==1?`$${d[0]}$`:`$\\frac{${d[0]}}{${d[1]}}$`
								}while(repetido(R))
							}
						}
						function P3(){
							let d=[a[0]*b[1]*c[1],a[1]*(b[0]*c[1]+c[0]*b[1])]
							spanContenido(`Halle el valor de $  \\frac{\\frac{${a[0]}}{${a[1]}}} { \\frac{${b[0]}}{${b[1]}} + \\frac{${c[0]}}{${c[1]}}} $`,C[6])
							d=simplify_frac(d)
							R[0]=d[1]==1?`$${d[0]}$`:`$\\frac{${d[0]}}{${d[1]}}$`

							for(let i=1;i<6;++i){
								do{
									a[0]=Math.round(0.51+Math.random()*10)
									b[0]=Math.round(0.51+Math.random()*10)
									c[0]=Math.round(0.51+Math.random()*10)

									d=[c[0]*(a[0]*b[1]+a[1]*b[0]),a[1]*b[1]*c[1]]
									d=simplify_frac(d)
									R[i]=d[1]==1?`$${d[0]}$`:`$\\frac{${d[0]}}{${d[1]}}$`
								}while(repetido(R))
							}
						}
						let a=[Math.round(0.51+Math.random()*10),Math.round(0.51+Math.random()*10)]
						let b=[Math.round(0.51+Math.random()*10),Math.round(0.51+Math.random()*10)]
						let c=[Math.round(0.51+Math.random()*10),Math.round(0.51+Math.random()*10)]
						const R=[];
						const op=Math.random()
						if(op<1/3) P1()
						else if(op<2/3) P2()
						else P3()
						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
					}
				}
			]
		},
		{
			Nombre:"Álgebra",
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
				},{
					Nombre:"División de polinomios",
					Nota:"",
					fun:function(){
						/*Inicio*/
						function P1(x){
							let a=[	(Math.random()<0.5?1:-1)*Math.round(Math.random()*9),
									(Math.random()<0.5?1:-1)*Math.round(Math.random()*9)]
							let b=[	(Math.random()<0.5?1:-1)*Math.round(Math.random()*9),
									Math.round(Math.random()*19-9),
									(Math.random()<0.5?1:-1)*Math.round(Math.random()*9)]
								
							
							var P="El valor de la división de $$\\frac{"+polinomio(multiply(a,b))+"}{"+polinomio(a)+"}$$ es:"
							
							
							var R=[];
							R[0]="$"+polinomio(b)+"$"
							var dummy=0;
							for(var i=1;i<6;++i){
								do{
								
									b=[	(Math.random()<0.5?1:-1)*Math.round(Math.random()*9),Math.round(Math.random()*19-9),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9)]
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
						/*Inicio*/
						function P1(x){
							let a=[	(Math.random()<0.5?1:-1)*Math.round(Math.random()*9),
								(Math.random()<0.5?1:-1)*Math.round(Math.random()*9)]
						let b=[	(Math.random()<0.5?1:-1)*Math.round(Math.random()*9),
								Math.round(Math.random()*19-9),
								(Math.random()<0.5?1:-1)*Math.round(Math.random()*9)]
								
							
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
						/*Inicio*/
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
								
							
							var P="La solución de $"+polinomio([a,b,c])+"$ = 0 es"
							
							
							var R=[];
							R[0]="<i>x</i> = "+x[0].toPrecision(3)+", "+x[1].toPrecision(3)
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
								
									R[i]="<i>x</i> = "+x[0].toPrecision(3)+", "+x[1].toPrecision(3)
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
					Nombre:"Factorización de ecuaciones cuadráticas",
					Nota:"*",
					fun:function(){
						function P1(x){
							
							let a=[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
							let b=[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
							
								
							const dummy=polinomio([a[0]*b[0],a[1]*b[0]+a[0]*b[1],a[1]*b[1]])

							let P=`Factorice la siguiente expresión $${polinomio([a[0]*b[0],a[1]*b[0]+a[0]*b[1],a[1]*b[1]])}$`
							
							
							const R=[];
							R[0]=`$(${polinomio(a)})(${polinomio(b)})$`
							
							for(let i=1;i<6;++i){
								do{
									do{
										a=[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
										b=[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
									}while(dummy==polinomio([a[0]*b[0],a[1]*b[0]+a[0]*b[1],a[1]*b[1]]))
									
									R[i]=`$(${polinomio(a)})(${polinomio(b)})$`
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
					Nombre:"Completar trinomio cuadrado perfecto",
					Nota:"",
					fun:function(){
						/*Inicio*/
						function P1(x){
							let a=(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)
							let alpha= (Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)
							let beta = (Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)
								
							
							var P=`Exprese a $${polinomio([a,2*alpha*a,a*alpha**2+beta])}$ en la forma $a (x-\\alpha)^2+\\beta$:`
							
							
							var R=[];
							
							R[0]=`$${a}(${polinomio([1,alpha])})^2${(beta<0?'-':'+')+Math.abs(beta)}$`
							for(var i=1;i<6;++i){
								do{
									let alpha= (Math.random()<0.5?1:-1)*Math.round(Math.random()*9)
									R[i]=`$${a}(${polinomio([1,alpha])})^2${(beta<0?'-':'+')+Math.abs(beta)}$`
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
				}
			]
		},
		{
			Nombre:"Geometría",
			test:[
				{
					Nombre:"Progresiones  aritméticas",
					Nota:"$u_n=u_1+(n-1)d$",
					fun:function(){
						function PreguntaTema(){
		const a=Math.random()
		if(a<1/4){
			return P1()
		}else if(a<2/4){
			return P2()
		}else if(a<3/4){
			return P3()
		}else{
			return P4()
		}
	}

function P1(){
	const u1=Math.round(Math.random()*100-50)
	const d=Math.round(Math.random()*50+1)*(Math.random()<0.5?1:-1)
	const n=Math.round(Math.random()*100+20)
	
	const P="Obtenga el término $u_{"+n+"}$ de la secuencia "+u1+", "+(u1+d)+", "+(u1+2*d)+", "+(u1+3*d)+" ... "
		
		
	let R=[];
	
	R[0]=u1+(n-1)*d
	for(let k=1;k<6;++k){
		do{
			 R[k]=u1+(n+Math.round(Math.random()*10-5))*d
		}while(repetido(R))
	}
	return [P,R]
}
function P2(){
	const u1=Math.round(Math.random()*100-50)
	const d=Math.round(Math.random()*50+1)*(Math.random()<0.5?1:-1)
	const n1=Math.round(Math.random()*100+20)
	let n2
	do{
		n2=Math.round(Math.random()*100+20)
	}while(n1==n2)
	
	const P="Una serie aritmetica tiene a $u_{"+n1+"} = "+(u1+(n1-1)*d)+"$ y $u_{"+n2+"} = "+(u1+(n2-1)*d)+"$, por lo tanto la diferencia en común es: "
		
		
	let R=[];
	
	R[0]=d
	for(let k=1;k<6;++k){
	do{
		R[k]=Math.round(Math.random()*100-50)
	}while(repetido(R))
	}
	return [P,R]
}
function P3(){
	const u1=Math.round(Math.random()*100-50)
	const d=Math.round(Math.random()*50+1)*(Math.random()<0.5?1:-1)
	const n1=Math.round(Math.random()*100+20)
	let n2, n3
	do{
		n2=Math.round(Math.random()*100+20)
		n3=Math.round(Math.random()*100+20)
	}while(n1==n2 || n1==n3  || n3==n2 )
	
	const P="Una serie aritmetica tiene a $u_{"+n1+"} = "+(u1+(n1-1)*d)+"$ y $u_{"+n2+"} = "+(u1+(n2-1)*d)+"$, por lo tanto $u_{"+n3+"}$ es: "
		
		
	let R=[];
	
	R[0]=u1+(n3-1)*d
	for(let k=1;k<6;++k){
	do{
		 R[k]=u1+(n3+Math.round(Math.random()*10-5))*d
	}while(repetido(R))
	}
	return [P,R]
}
function P4(){
	const u1=Math.round(Math.random()*100-50)
	const d=Math.round(Math.random()*50+1)*(Math.random()<0.5?1:-1)
	const n1=Math.round(Math.random()*100+20)
	let n2, n3
	do{
		n2=Math.round(Math.random()*100+20)
		n3=Math.round(Math.random()*100+20)
	}while(n1==n2 || n1==n3  || n3==n2 )
	
	const P="Calcule el valor de $u_{"+n2+"}$ de una serie aritmetica tal que $u_{"+n1+"} = "+(u1+(n1-1)*d)+"$ y  su tasa en común de $d = "+d+"$: "
		
		
	let R=[];
	
	R[0]=u1+(n2-1)*d
	for(let k=1;k<6;++k){
	do{
		 R[k]=u1+(n2+Math.round(Math.random()*10-5))*d
	}while(repetido(R))
	}
	return [P,R]
}
	/*No realizado*/
	let C=abrirPregunta()
	let [P,R]=PreguntaTema()
	spanContenido(P,C[6])
	for(let k=0;k<6;++k) spanContenido(R[k],C[k])
						}
				}
			]
		},{
			Nombre:"Financieras",
			test:[]
		}
	]
},{
	Nombre:"Aritmética y álgebra",
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
				}
			]
		},
		{
			Nombre:"Errores",
			test:[
				{
					Nombre:"Porcentaje de error",
					Nota:"",
					fun:function(){
	
	function P1(){
	do{
		var a=Math.round(Math.random()*9998+2)

	}while((Math.sqrt(a)-Math.round(Math.sqrt(a)))==0)
	var cs=Math.round(Math.random()*2+1)
	
	var P="Calcule el porcentaje de error al aproximar $\\sqrt{"+a+"}$ usando "+eval(Math.sqrt(a).toPrecision(cs))+"."
	
	ve=Math.sqrt(a)
	va=eval(Math.sqrt(a).toPrecision(cs))
	
	
	var R=[];
	R[0]=(Math.abs(ve-va)/ve*100).toPrecision(3)+" %"
	var dummy=0;
	for(var i=1;i<6;++i){
		do{
			a=Math.round(Math.random()*9998+2)
			ve=Math.sqrt(a)
			va=eval(Math.sqrt(a).toPrecision(cs))
			R[i]=(Math.abs(ve-va)/ve*100).toPrecision(3)+" %"
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
					//Final
						}
				},
				{
					Nombre:"Errores",
					Nota:"",
					fun:function(){
						/***/
						function P1(){
							do{
								var a=Math.round(Math.random()*9998+2)
							}while((Math.sqrt(a)-Math.round(Math.sqrt(a)))==0)
							const cs=Math.round(Math.random()*2+1)
							const P="Calcule el porcentaje de error de $\\sqrt{"+a+"}$ y "+Math.sqrt(a).toFixed(cs)+"."
	
							let ve=Math.sqrt(a)
							let va=eval(Math.sqrt(a).toFixed(cs))
							let R=[];
							R[0]=NotacionCientifica(Math.abs(ve-va)/ve*100)+" %"
							let dummy=0;
							for(let i=1;i<6;++i){
								do{
									let a=Math.round(Math.random()*9998+2)
									ve=Math.sqrt(a)
									va=eval(Math.sqrt(a).toFixed(cs))
									R[i]=NotacionCientifica(Math.abs(ve-va)/ve*100)+" %"
								}while(repetido(R))
							}
							return [P,R]
						}
						function P2(){
	
		var a=2*eval((Math.random()*8.6+.6).toFixed(1))
		
	var P="La báscula de baño tiene una precisión de 0.2 Kg, calcule el porcentaje de error si ésta marca "+a.toFixed(1)+" Kg para la mascota."
	
	var error =0.2/a*100
	var R=[];
	R[0]=error.toFixed(1)+"%"
	var dummy=0;
	for(var i=1;i<6;++i){
		do{
			R[i]=(error*2*Math.random()).toFixed(1)+"%"
		}while(repetido(R))
	}
	return [P,R]
}
						function P3(){
	a=eval((Math.random()*6+1).toFixed(2))
	b=eval((Math.random()*5+1).toFixed(2))
	c=eval((Math.random()*3+1).toFixed(2))
		
	
	var P="Si a="+a+" , b="+b+" y c="+c+" , calcule a(c-b)(c+b), redondeado a dos cifras significativas "
	
	
	var R=[];
	R[0]=(a*(c-b)*(c+b)).toFixed(2)
	var dummy=0;
	for(var i=1;i<6;++i){
		do{
			R[i]=(a*(c-b)*(c+b)+(Math.random()-0.5)).toFixed(2)
		}while(repetido(R))
	}
	return [P,R]
}
						function P4(){
	x=[Math.round(Math.random()*80+10),Math.round(Math.random()*80+10),Math.round(Math.random()*80+10)]
	
	var P="Exprese $\\frac{\\sqrt{"+x[0]+"} + \\sqrt{"+x[1]+"}}{"+x[2]+"}$ a tres decimales."
	
	var R=[];
	R[0]=((Math.sqrt(x[0])+Math.sqrt(x[1]))/x[2]).toFixed(3)
	var dummy=0;
	for(var i=1;i<6;++i){
		do{
			R[i]=((Math.sqrt(x[0])+Math.sqrt(x[1]))/x[2]+20*(Math.random()-0.5)).toFixed(3)
		}while(repetido(R))
	}
	return [P,R]
}	
						
						function PP(){
							const op=Math.random()
							if(op<0.7) return P1()
							else if(op<0.8) return P2()
							else if(op<0.9) return P3()
							else return P4()
						}
						let C=abrirPregunta()
						let [P,R]=PP()
						spanContenido(P,C[6])
	// C[6].innerHTML=P
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
						/***/
						}
				}
			]
		},
		{
			Nombre:"Progresiones y series aritméticas",
			test:[
				{
					Nombre:"Progresiones  aritméticas",
					Nota:"$u_n=u_1+(n-1)d$",
					fun:function(){
						function PreguntaTema(){
		const a=Math.random()
		if(a<1/4){
			return P1()
		}else if(a<2/4){
			return P2()
		}else if(a<3/4){
			return P3()
		}else{
			return P4()
		}
	}

function P1(){
	const u1=Math.round(Math.random()*100-50)
	const d=Math.round(Math.random()*50+1)*(Math.random()<0.5?1:-1)
	const n=Math.round(Math.random()*100+20)
	
	const P="Obtenga el término $u_{"+n+"}$ de la secuencia "+u1+", "+(u1+d)+", "+(u1+2*d)+", "+(u1+3*d)+" ... "
		
		
	let R=[];
	
	R[0]=u1+(n-1)*d
	for(let k=1;k<6;++k){
		do{
			 R[k]=u1+(n+Math.round(Math.random()*10-5))*d
		}while(repetido(R))
	}
	return [P,R]
}
function P2(){
	const u1=Math.round(Math.random()*100-50)
	const d=Math.round(Math.random()*50+1)*(Math.random()<0.5?1:-1)
	const n1=Math.round(Math.random()*100+20)
	let n2
	do{
		n2=Math.round(Math.random()*100+20)
	}while(n1==n2)
	
	const P="Una serie aritmetica tiene a $u_{"+n1+"} = "+(u1+(n1-1)*d)+"$ y $u_{"+n2+"} = "+(u1+(n2-1)*d)+"$, por lo tanto la diferencia en común es: "
		
		
	let R=[];
	
	R[0]=d
	for(let k=1;k<6;++k){
	do{
		R[k]=Math.round(Math.random()*100-50)
	}while(repetido(R))
	}
	return [P,R]
}
function P3(){
	const u1=Math.round(Math.random()*100-50)
	const d=Math.round(Math.random()*50+1)*(Math.random()<0.5?1:-1)
	const n1=Math.round(Math.random()*100+20)
	let n2, n3
	do{
		n2=Math.round(Math.random()*100+20)
		n3=Math.round(Math.random()*100+20)
	}while(n1==n2 || n1==n3  || n3==n2 )
	
	const P="Una serie aritmetica tiene a $u_{"+n1+"} = "+(u1+(n1-1)*d)+"$ y $u_{"+n2+"} = "+(u1+(n2-1)*d)+"$, por lo tanto $u_{"+n3+"}$ es: "
		
		
	let R=[];
	
	R[0]=u1+(n3-1)*d
	for(let k=1;k<6;++k){
	do{
		 R[k]=u1+(n3+Math.round(Math.random()*10-5))*d
	}while(repetido(R))
	}
	return [P,R]
}
function P4(){
	const u1=Math.round(Math.random()*100-50)
	const d=Math.round(Math.random()*50+1)*(Math.random()<0.5?1:-1)
	const n1=Math.round(Math.random()*100+20)
	let n2, n3
	do{
		n2=Math.round(Math.random()*100+20)
		n3=Math.round(Math.random()*100+20)
	}while(n1==n2 || n1==n3  || n3==n2 )
	
	const P="Calcule el valor de $u_{"+n2+"}$ de una serie aritmetica tal que $u_{"+n1+"} = "+(u1+(n1-1)*d)+"$ y  su tasa en común de $d = "+d+"$: "
		
		
	let R=[];
	
	R[0]=u1+(n2-1)*d
	for(let k=1;k<6;++k){
	do{
		 R[k]=u1+(n2+Math.round(Math.random()*10-5))*d
	}while(repetido(R))
	}
	return [P,R]
}
	/*No realizado*/
	let C=abrirPregunta()
	let [P,R]=PreguntaTema()
	spanContenido(P,C[6])
	for(let k=0;k<6;++k) spanContenido(R[k],C[k])
						}
				}
			]
		},{
			Nombre:"Matemáticas Financieras",
			test:[
				{
					Nombre:"Interés compuesto",
					Nota:"$FV = PV(1+\\frac{r}{100\\cdot k})^{n\\cdot k}$",
					fun:function(){
						function PreguntaTema(){
							const a=Math.random()
							if(a<1/4){
								return P1()
							}else if(a<2/4){
								return P2()
							}else if(a<3/4){
								return P3()
							}else{
								return P4()
							}
						}

function P1(){
	const cortes = [1,2,3,4,6,12]
	const Cortes = ['anual', 'semestral', 'cuatrimestral', 'trimestral', 'bimestral', 'mensual']

	const PV = Math.round(Math.random() * 10000 + 1000); // Valor del préstamo
	//const FV = Math.round(PV*(1.2+0.25*Math.random()) ); // Valor del préstamo
	const I = Math.round(Math.random() * 10 + 1); // Tasa de interés anual en %
	const PMT = 0
	const dummy= Math.floor(cortes.length * Math.random()); // Corte de pago
	const CY = cortes[dummy]; // Corte de pago
	const PY = CY
	let N = (Math.random() * 10 + 3)*CY; // Número de años (1 a 10)
	const FV = tlacu.financiera(N, I, PV, 0, null, CY, PY); // Valor Futuro a calcular
	N = tlacu.financiera(null,I, PV,PMT,eval(FV.toFixed(2)),CY,PY); // Número de meses


    const P = `Se invierte \\$${PV} a una tasa de interés anual del ${I}% compuesto anualmente ${Cortes[dummy]}. 
    ¿Cuántos periodos se necesitarán para que la inversión crezca a $${FV.toFixed(2)}?`;

    let R = [Math.ceil(N)];
    for (let k = 1; k < 6; ++k) {
        do {
            R[k] = Math.floor(N +Math.random()*10-5); // Valores cercanos a N
        } while (repetido(R));
    }
    return [P, R];
}
function P2(){
	const cortes = [1, 2, 3, 4, 6, 12];
const Cortes = ['anual', 'semestral', 'cuatrimestral', 'trimestral', 'bimestral', 'mensual'];
const PV = Math.round(Math.random() * 10000 + 1000); // Valor presente (inversión inicial)
const FV = Math.round(PV * (1 + Math.random() * 2)); // Valor futuro (meta)
const dummy = Math.floor(cortes.length * Math.random()); // Frecuencia de capitalización
const CY = cortes[dummy]; // Capitalizaciones por año
const PY = CY; // Pagos por año (igual a CY)
const N = Math.round(Math.random() * 10 + 1); // Número de años (aleatorio entre 1 y 10)
const I = tlacu.financiera(N*CY, null, PV, 0, FV, CY, PY); // Tasa de interés a calcular

const P = `Se invierte \\$${PV} MXN durante ${N} años con un interés compuesto ${Cortes[dummy]}, y se espera obtener $${FV}. 
¿Qué tasa de interés anual se requiere?`;

let R = [I.toFixed(2)];
for (let k = 1; k < 6; ++k) {
    do {
        R[k] = (I*(0.8+.2*Math.random())).toFixed(2); // Opciones cercanas a I
    } while (repetido(R));
}
return [P, R];
}
function P3(){const cortes = [1, 2, 3, 4, 6, 12];
const Cortes = ['anual', 'semestral', 'cuatrimestral', 'trimestral', 'bimestral', 'mensual'];
const FV = Math.round(Math.random() * 20000 + 1000); // Valor futuro deseado
const I = Math.round(Math.random() * 10 + 1); // Tasa de interés anual (%)
const dummy = Math.floor(cortes.length * Math.random()); // Frecuencia de capitalización
const CY = cortes[dummy]; // Capitalizaciones por año
const PY = CY; // Pagos por año (igual a CY)
const N = Math.round(Math.random() * 10 + 1); // Número de años (1 a 10)
const PV = tlacu.financiera(N*CY, I, null, 0, FV, CY, PY); // Valor Presente a calcular

const P = `Se desea acumular $${FV} en ${N} años con una tasa de interés anual del ${I}% compuesto ${Cortes[dummy]}. 
¿Cuánto se debe invertir hoy?`;

let R = [PV.toFixed(2)];
for (let k = 1; k < 6; ++k) {
    do {
        R[k] = (PV*(0.9+0.2*Math.random())).toFixed(2) // Opciones cercanas a PV
    } while (repetido(R));
}
return [P, R];
}
function P4(){
	const cortes = [1, 2, 3, 4, 6, 12];
const Cortes = ['anual', 'semestral', 'cuatrimestral', 'trimestral', 'bimestral', 'mensual'];
const PV = Math.round(Math.random() * 10000 + 1000); // Inversión inicial
const I = Math.round(Math.random() * 10 + 1); // Tasa de interés anual (%)
const dummy = Math.floor(cortes.length * Math.random()); // Frecuencia de capitalización
const CY = cortes[dummy]; // Capitalizaciones por año
const PY = CY; // Pagos por año (igual a CY)
const N = Math.round(Math.random() * 10 + 1); // Número de años (1 a 10)
const FV = tlacu.financiera(N*CY, I, PV, 0, null, CY, PY); // Valor Futuro a calcular

const P = `Se invierte $${PV} a una tasa de interés ${I}% compuesto  anual ${Cortes[dummy]} durante ${N} años. 
¿Cuál será el valor futuro de la inversión?`;

let R = [FV.toFixed(2)];
for (let k = 1; k < 6; ++k) {
    do {
        R[k] = (PV * (1 + Math.random() * 2)).toFixed(2); // Opciones cercanas a FV
    } while (repetido(R));
}
return [P, R];
}
	/*No realizado*/
	let C=abrirPregunta()
	let [P,R]=PreguntaTema()
	spanContenido(P,C[6])
	for(let k=0;k<6;++k) spanContenido(R[k],C[k])
						}
				},{
					Nombre:"Depreciación de activos",
					Nota:"$FV = PV(1+\\frac{r}{100\\cdot k})^{n\\cdot k}$",
					fun:function(){
						function PreguntaTema(){
							const a=Math.random()
							if(a<1/3){
								return P1()
							}else if(a<2/3){
								return P2()
							}else{
								return P3()
							}
						}

function P1(){
	const PV = Math.round(Math.random() * 100000 + 10000); // Valor inicial del activo
	const I = Math.round(Math.random() * 10 + 5); // Tasa de depreciación anual (5% a 15%)
	
	const annos =Math.round(Math.random() * 15 + 5)
	const N = annos// Periodos totales (1 a 5 años)
	const FV = tlacu.financiera(N, -I, PV, 0, null, 1, 1); // Valor final (depreciado)

	const P = `Un activo con valor inicial de \\$${PV} MXN se deprecia a una tasa anual del ${I}% anual. 
	¿Cuál será su valor al final de ${annos} años?`;

	let R = [FV.toFixed(2)];
	for (let k = 1; k < 6; ++k) {
		do {
			const variacion = (Math.random() * 0.30 + 0.85); // Entre 85% y 100% del valor real
			R[k] = (FV * variacion).toFixed(2);
		} while (repetido(R));
	}
	return [P, R];
}
function P2(){
	const FV = Math.round(Math.random() * 50000 + 5000); // Valor final del activo (depreciado)
	const I = Math.round(Math.random() * 10 + 5); // Tasa de depreciación anual (5% a 15%)
	const annos = Math.round(Math.random() * 15 + 5); // Años de depreciación (5 a 20 años)
	const CY = 1; // Depreciación compuesta anual (frecuencia = 1)
	const N = annos * CY; // Total de periodos (igual a los años)
	const PV = tlacu.financiera(N, -I, null, 0, FV, 1, 1); // Valor inicial a calcular

	const P = `Un activo se deprecia a una tasa anual del ${I}% anual durante ${annos} años, y su valor final es de $${FV.toFixed(2)} MXN. 
	¿Cuál era su valor inicial?`;

	let R = [PV.toFixed(2)];
	for (let k = 1; k < 6; ++k) {
		do {
			const variacion = (Math.random() * 0.6 + 0.7); // Opciones entre 70% y 100% del valor real
			R[k] = (PV * variacion).toFixed(2);
		} while (repetido(R));
	}
	return [P, R];
}
function P3(){
	const PV = Math.round(Math.random() * 100000 + 10000); // Valor inicial del activo ($10,000 a $110,000 MXN)
	const FV = Math.round(PV * (0.1 + Math.random() * 0.3)); // Valor final (10% a 40% del valor inicial)
	const annos = Math.round(Math.random() * 15 + 5); // Años de depreciación (5 a 20 años)
	const CY = 1; // Depreciación compuesta anual
	const N = annos * CY; // Total de periodos
	const I = -tlacu.financiera(N, null, PV, 0, FV, 1, 1); // Tasa de depreciación anual a calcular

	const P = `Un activo con valor inicial de \\$${PV.toFixed(2)} MXN se deprecia a un valor final de $${FV.toFixed(2)} MXN después de ${annos} años. 
	¿Cuál es la tasa de depreciación anual?`;

	let R = [I.toPrecision(3)];
	for (let k = 1; k < 6; ++k) {
		do {
			const variacion = (Math.random() * 0.4 + 0.8); // Opciones entre 80% y 120% del valor real
			R[k] = (I * variacion).toPrecision(3);
		} while (repetido(R));
	}
	return [P, R];
}

	/*No realizado*/
	let C=abrirPregunta()
	let [P,R]=PreguntaTema()
	spanContenido(P,C[6])
	for(let k=0;k<6;++k) spanContenido(R[k],C[k])
						}
				}
			]
		}
	]
},
{
	Nombre:"Funciones",
	subtema:[
		{
			Nombre:"Relaciones y funciones y sus representaciones",
			test:[
				{
					Nombre:"Tipos de relaciones",
					Nota:"",
					fun:function(){
						function P1(){
							
							const tipo=[['RS', 	'relación no funcional sobreyectiva'],
										['RNS', 'relacion no funcional no sobreyectiva'],
										['FB',	'funcion biyectiva'],
										['FSNI','funcion sobreyectiva no inyectiva'],
										['FNSNI','funcion no sobreyectiva no inyectiva'],
										['FNSI','funcion inyectiva no sobreyectiva'],]
							const dummy=Math.floor(Math.random()*tipo.length)
							let dummy2
							spanContenido('Una representación gráfica de una '+tipo[dummy][1]+" es:",C[6])
							const DI=[[1,2,3,4,5],['\u03B1','\u03B2','\u03B3','\u03B4','\u03B5','\u03B6']]
							C[0].append(TipoRelacionesDiagAsig(tipo[dummy][0],DI))
							for(let k=1;k<6;++k){
								do{
									dummy2=Math.floor(Math.random()*tipo.length)
								}while(dummy==dummy2)
								
								C[k].append(TipoRelacionesDiagAsig(tipo[dummy2][0],DI))	
							}
						}
						let C=abrirPregunta()
						P1()
					}
				},
				{
					Nombre:"Tipos de relaciones II",
					Nota:"",
					fun:function(){
						function P1(){
							
							let tipo=[['RS', 	'Relación no funcional sobreyectiva'],
										['RNS', 'Relacion no funcional no sobreyectiva'],
										['FB',	'Funcion biyectiva'],
										['FSNI','Funcion sobreyectiva no inyectiva'],
										['FNSNI','Funcion no sobreyectiva no inyectiva'],
										['FNSI','Funcion inyectiva no sobreyectiva'],]
							const dummy=Math.floor(Math.random()*tipo.length)
							
							spanContenido('Determine que tipo de relación es el siguiente diagrama: <br>',C[6])
							const DI=[[1,2,3,4,5],['\u03B1','\u03B2','\u03B3','\u03B4','\u03B5','\u03B6']]
							C[6].append(TipoRelacionesDiagAsig(tipo[dummy][0],DI))
							spanContenido(tipo[dummy][1],C[0])
							tipo.splice(dummy,1)
							tipo=unsortArray(tipo)
							for(let k=1;k<6;++k){
								spanContenido(tipo[k-1][1],C[k])
								
								//C[k].append(TipoRelacionesDiagAsig(tipo[dummy2][0],DI))	
							}
						}
						let C=abrirPregunta()
						P1()
					}
				}
			]
		},
		{
			Nombre:"Polinomios",
			test:[
				{
					Nombre:"Parábola > Eje de simetría",
					Nota:"$x_s = -\\frac{b}{2a}$",
					fun:function(){
						/*inicio*/
						function P1(x){
							let CC
							do{
								CC=[Math.ceil(5*Math.random())*(Math.random()<0.5?1:-1),
										Math.round(20*(Math.random()-.5)),Math.round(20*(Math.random()-.5))]
							}while(CC[1]==0 & CC[2]==0)

							const P=`Calcule el eje de simetría de $y = ${polinomio(CC)}$`
							
							let xs=[-CC[1],2*CC[0]]
							xs = simplify_frac(xs)

							const R=[`$x_s = ${fraccion(xs[0],xs[1],true)} $`]
							
							for(let i=1;i<6;++i){
								do{
									CC=[Math.ceil(5*Math.random())*(Math.random()<0.5?1:-1),
										Math.round(20*(Math.random()-.5)),Math.round(20*(Math.random()-.5))]
										xs=[-CC[1],2*CC[0]]
										xs = simplify_frac(xs)
									R[i]=`$x_s = ${fraccion(xs[0],xs[1],true)} $`
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
					Nombre:"Parábola > Vértice",
					Nota:"$x_s = -\\frac{b}{2a}$",
					fun:function(){
						/*inicio*/
						function P1(x){
							let CC
							do{
								CC=[Math.ceil(5*Math.random())*(Math.random()<0.5?1:-1),
										Math.round(20*(Math.random()-.5)),Math.round(20*(Math.random()-.5))]
							}while(CC[1]==0 & CC[2]==0)

							const P=`Calcule la coordenada del vértice de $y = ${polinomio(CC)}$`
							
							let xs=[-CC[1],2*CC[0]]
							xs = simplify_frac(xs)
							dummy = [CC[0]*xs[0]**2+CC[1]*xs[0]*xs[1]+CC[2]*xs[1]**2,xs[1]**2]
							ys = simplify_frac(dummy)

							const R=[`$(${fraccion(xs[0],xs[1],true)}, ${fraccion(ys[0],ys[1],true)}) $`]
							
							for(let i=1;i<6;++i){
								do{
									dummy[0] += Math.round(Math.random()*4-2)
									ys = simplify_frac(dummy)
									R[i]=`$(${fraccion(xs[0],xs[1],true)}, ${fraccion(ys[0],ys[1],true)}) $`
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
					Nombre:"Parábola: Calcular los coeficientes a partir de puntos dados I",
					Nota:"$ y = ax^2+bx+c$",
					fun:function(){
						/*inicio*/
						function P1(x){
							let A
							do{
								A=[[0,Math.ceil(Math.random()*50)*(Math.random()<0.5?1:-1)],
								   [Math.ceil(Math.random()*10)*(Math.random()<0.5?1:-1),0],
								   [Math.ceil(Math.random()*10)*(Math.random()<0.5?1:-1),0]]
							}while(A[1][0]==A[2][0] )
							const coef=['a','b','c']
							const CC=[	[-A[0][1]*A[2][0]+A[0][1]*A[1][0],			(A[1][0]**2)*A[2][0]-(A[2][0]**2)*A[1][0]],
										[-(A[1][0]**2)*A[0][1]+(A[2][0]**2)*A[0][1],(A[1][0]**2)*A[2][0]-(A[2][0]**2)*A[1][0]],
										[A[0][1],1]]
							console.log(`len: ${CC[0]} * ${CC[1]} * ${CC[2]} `)
							
							const op=Math.floor(Math.random()*2.5)
							const P=`Una parábola de la forma $y=ax^2+bx+c$, pasa por los puntos $(${A[0][0]}, ${A[0][1]})$, $(${A[1][0]}, ${A[1][1]})$ y $(${A[2][0]}, ${A[2][1]})$. Determine el valor del coeficiente $${coef[op]}$`
							
							let ans = CC[op]
							
							dummy = simplify_frac(ans)
							const R=[`$${coef[op]} = ${fraccion(dummy[0],dummy[1],true)}$`]
							
							for(let i=1;i<6;++i){
								do{
									ans[0] += Math.round(Math.random()*6-3)
									dummy = simplify_frac(ans)
									R[i]=`$${coef[op]} = ${fraccion(dummy[0],dummy[1],true)}$`
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
								
							
							var P=`La solución de $${polinomio([a,b,c])} = 0$ es`
							
							
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
				},{
					Nombre:"Parábola: Forma vértice",
					Nota:"$ y = a(x-h)^2+k$",
					fun:function(){
						/*inicio*/
						function P1(x){
							//
							function parabolaVertice(dummy){
								const h = dummy[0]
								const k = dummy[1]
								const p = [dummy[2], dummy[3]]
								let a = [p[1]-k,(p[0]-h)**2]
								//a=simplify_frac(a)
								console.log(a)
								return `$y = ${fraccion(a[0],a[1],true)}(${polinomio([1,-h])})^2 ${(k>=0?'+'+k:k)} $`
							}
							let h = Math.round(Math.random()*8-4)
							let k = Math.round(Math.random()*8-4)
							let p
							do{
								p = [Math.round((Math.random()*3+1)*(Math.random()<0.5?1:-1)+h),
									Math.round((Math.random()*3+1)*(Math.random()<0.5?1:-1)+k)]
							} while(p[1]>5 || p[1]<-5)
							
							const xp = linspace(-6,6,500)
							const yp = evaluar(`${(p[1]-k)/((p[0]-h)**2)}*(x-(${h}))**2+(${k})`,xp)
							Puntos=[[xp,yp,'-RGB(200,50,50)']]
							ElemP=plot(Puntos,[400,400],[-6,6,-6,6,[1,1],[1,1]])
							
							const P=`Determine la ecuación de la parábola que aparece a continuación en la forma de vértice.<center>${ElemP.outerHTML}</center>`
							op=Math.floor(Math.random()*4)
							dummy = [h,k,p[0],p[1]]
							const R=[parabolaVertice(dummy)]
							
							for(let i=1;i<6;++i){
								do{
									dummy[op] += Math.round((Math.random()*3+1)*(Math.random()<0.5?1:-1))
									R[i]=parabolaVertice(dummy)
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
			]
		},
		{
			Nombre:"Ecuación de una recta",
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
				},
				{
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
				},
				{
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
				},
				{
					Nombre:" Línea recta.- Forma General (Gráfica) II",
					Nota:"$Ax+By+C=0$",
					fun:function(){
						//Inicio
						function PLine(A,B){
							
							let V = [ A[0]-B[0], A[1]-B[1] ]
							V = simplify_frac(V)
							//console.log( `V:${V}`)
							let u1 = (5.99-A[1])/V[1]
							let a=[A[0]+u1*V[0],A[1]+u1*V[1]]
							if(a[0]>5.99){
								u1 = (5.99-A[0])/V[0]
							}else if(a[0]<-5.99){
								u1 = (-5.99-A[0])/V[0]
							}

							let u2 = (-5.99-A[1])/V[1]
							a=[A[0]+u2*V[0],A[1]+u2*V[1]]
							if(a[0]>5.99){
								u2 = (5.99-A[0])/V[0]
								//console.log(`Se pasó + ${a}`)
								a=[A[0]+u2*V[0],A[1]+u2*V[1]]
								//console.log(`Se pasó + ${a}`)
							}else if(a[0]<-5.99){
								u2 = (-5.99-A[0])/V[0]
								//console.log(`Se pasó - ${a}`)
								a=[A[0]+u2*V[0],A[1]+u2*V[1]]
								//console.log(`Se pasó - ${a}`)
							}

							return [[[A[0]+u2*V[0],A[0],A[0]+u1*V[0]],[A[1]+u2*V[1],A[1],A[1]+u1*V[1]],'-RGB(122,58,186)']]
						}
						function tempEcLine(A,D){
							if(D[0]<0){
								D=[-D[0],-D[1]]
							}
							let cadena = `$ ${D[0]==0?'':(D[0]==1?'':D[0])+'x'}`
							cadena += `${D[1]==0?'':(Math.abs(D[1])==1?
														(D[1]<0?'-y':'+y'):
														(D[1]<0?D[1]+'y':`+${D[1]}y`))
							}`
							const c = -(D[0]*A[0]+D[1]*A[1])
							cadena += `${(c==0?'':(c<0?'-':'+')+Math.abs(c))}`
							cadena += `=0$`
							
							return cadena
						}
						/*Inicio de preguntas*/
						let C=abrirPregunta()
						let A=[Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)], B
						do{
							B = [Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)]
						}while( (A[0] == B[0]) && (A[1] == B[1]) )
						
						const dummy=Math.round(Math.random())
						
						let Delta=[ B[1]-A[1],A[0]-B[0] ]
						Delta=simplify_frac(Delta)

						const c = -(Delta[0]*A[0]+Delta[1]*A[1])
	
						const Puntos = PLine(A,B)
						ElemP=plot(Puntos,[400,400],[-6,6,-6,6,[1,1],[1,1]])
	
						const P=`Determine la ecuación de la siguiente gráfica en la forma general<br> <center>${ElemP.outerHTML}</center>`
	
						spanContenido(P,C[6])
						
						const R=[tempEcLine(A,Delta)]
						for(let i=1;i<6;++i){
							do{
								do{
								Delta[dummy]+=Math.round(Math.random()*6-3)
								}while(Delta[dummy]==0)
								R[i]= tempEcLine(A,Delta)
							}while(repetido(R))
						
						}
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
						//Final
	
	
	
							}
				},
				{
					Nombre:" Línea recta.- Equivalencia forma general",
					Nota:"$Ax+By+C=0$",
					fun:function(){
						//Inicio
						function EcGeneral(L){
							const A=L[0]
							const B=L[1]
							const C=L[2]

							let S = `$${(A[0]<0?'-':'')+
								(A[1]==1?(Math.abs(A[0])==1?'':Math.abs(A[0])):
								fraccion(Math.abs(A[0]),A[1]))}x`
								S += `${(B[0]<0?'-':'+')+
									(B[1]==1?(Math.abs(B[0])==1?'':Math.abs(B[0])):
									fraccion(Math.abs(B[0]),B[1]))}y`
								S += `${(C[0]<0?'-':'+')+
									(C[1]==1?Math.abs(C[0]):fraccion(Math.abs(C[0]),C[1]))} = 0$`
							return S
						}
						/*Inicio de preguntas*/
						let C=abrirPregunta()
						let L=[	Math.ceil(Math.random()*10),
								Math.ceil(Math.random()*10)*(Math.random()<0.5?1:-1),
								Math.ceil(Math.random()*10)*(Math.random()<0.5?1:-1)]
						let MCD = Math.abs(mcd_new(L[0],mcd_new(L[1],L[2])))

						L = [[L[0]/MCD,1],[L[1]/MCD,1],[L[2]/MCD,1]]
						
						let f = [Math.ceil(Math.random()*9+1)*(Math.random()<0.5?1:-1),
										Math.ceil(Math.random()*10)]
						
						let L2=[[L[0][0]*f[0],L[0][1]*f[1]],[L[1][0]*f[0],L[1][1]*f[1]],[L[2][0]*f[0],L[2][1]*f[1]]]
	
						const P=`Determine la forma general mínima de la siguiente expresión ${EcGeneral(L2)}  `
	
						spanContenido(P,C[6])
						
						const R=[EcGeneral(L)]
						for(let i=1;i<6;++i){
							do{
								L=[	Math.ceil(Math.random()*10),
									Math.ceil(Math.random()*10)*(Math.random()<0.5?1:-1),
									Math.ceil(Math.random()*10)*(Math.random()<0.5?1:-1)]
								MCD = Math.abs(mcd_new(L[0],mcd_new(L[1],L[2])))
								L = [[L[0]/MCD,1],[L[1]/MCD,1],[L[2]/MCD,1]]
								R[i]= EcGeneral(L)
							}while(repetido(R))
						}
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
						//Final
	
	
	
							}
				},
				{
					Nombre:" Mediatriz",
					Nota:"",
					fun:function(){
						//Inicio

						/*Inicio de preguntas*/
						let C=abrirPregunta()
						let p
						do{ p=[	[Math.ceil(Math.random()*10)-5,Math.ceil(Math.random()*10)-5],
								[Math.ceil(Math.random()*10)-5,Math.ceil(Math.random()*10)-5]]
						}while( (p[0][0] == p[1][0]) && (p[0][1] == p[1][1]) )
	
						const P=`Determine la mediatriz del $\\overline{AB}$, donde $A:(${p[0]})$ y $B:(${p[1]})$ `
						op=Math.round(Math.random())
						spanContenido(P,C[6])
						let linea = tlacu.mediatriz(p[0],p[1])
						const R=[`$${op==0?linea.PO:linea.general}$`]
						for(let i=1;i<6;++i){
							do{
								do{ p=[	[Math.ceil(Math.random()*10)-5,Math.ceil(Math.random()*10)-5],
										[Math.ceil(Math.random()*10)-5,Math.ceil(Math.random()*10)-5]]
								}while( (p[0][0] == p[1][0]) && (p[0][1] == p[1][1]) )
									let linea = tlacu.mediatriz(p[0],p[1])
								R[i]= `$${op==0?linea.PO:linea.general}$`
							}while(repetido(R))
						}
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
					}
				}
			]
		},
		{
			Nombre:"Distintos tipos de funciones",
			test:[
				{
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
				},
				
				{
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
				},
				{
					Nombre:"Funciones exponenciales",
					Nota:"",
					fun:function(){
					//Inicio
					
function P1(){
	let a= (Math.random()<0.5?1:-1)*Math.ceil(Math.random()*4+1), c=(Math.random()<0.5?1:-1)*Math.ceil(Math.random()*6+1)
	let p=[(Math.random()<0?1:-1)*Math.ceil(Math.random()*3+1),(a<0?1:-1)*Math.ceil(Math.random()*6)+c], b=0
	do{
		p[1]=(a>0?1:-1)*Math.ceil(Math.random()*6)+c
		b=Math.pow((p[1]-c)/a,1/p[0])
	}while(p[1]==c || Math.abs(b-1)<0.1)

	var P=`Determine la función exponencial que aparece a continuación<br><center>
	<tlacuache-ejes size="320,480" xlabel="" ylabel="" xlim="-6,6" ylim="${c-6+(a<0?-2:2)},${c+6+(a<0?-2:2)}"  dx="1" dy="2" ddy="1" >
    <tlacuache-plot f='${a}*Math.pow(${b},x)+(${c})' color="green"/></tlacuache-plot>
	<tlacuache-plot f='${c}' color="black" mark='--'/></tlacuache-plot>
	<tlacuache-plot x="${p[0]}" y="${p[1]}" mark="o" color="red"></tlacuache-plot >
  </tlacuache-ejes ></center>`
	const op = Math.floor(Math.random()*3)
	const R=[];
	
	R[0]=`$f(x) = ${a}\\cdot${b.toPrecision(3)}^x${c<0?"":"+"}${c}$`
	for(var i=1;i<6;++i){
		do{
			R[i]=`$f(x) = ${op==0?(Math.random()<0.5?1:-1)*Math.ceil(Math.random()*4+1):a}\\cdot${(op==1?b+(Math.random()*1.5-.75):b).toPrecision(3)}^x${op==2?(Math.random<0?"-":"+")+Math.ceil(Math.random()*6+1):(c<0?"":"+")+c}$`				
		}while(repetido(R))
	
	}
	return [P,R]
}

					
					//Final
					let C=abrirPregunta()
					let [P,R]=P1()
					spanContenido(P,C[6])
					// C[6].innerHTML=P
					for(let k=0;k<6;++k) spanContenido(R[k],C[k])
						}
				},
				{
					Nombre:"Funciones exponenciales (Álgebra)",
					Nota:"",
					fun:function(){
						let C=abrirPregunta()
						function P1(){
							const a=Math.round(Math.random()*200+10)*(Math.random()<0.5?1:-1)/10
							const b=Math.round(Math.random()*15+5)/10
							const x=Math.round(Math.random()*80+5)/10*(Math.random()<0.5?1:-1)
							const fx=(a*Math.pow(b,x)).toPrecision(3)
							spanContenido("Se tiene que $f(x)=a\\cdot "+b+"^x$ la la cual pasa por el punto ("+x.toFixed(1)+","+fx+"), determine el valor de $a$",C[6])
							let Res=eval(fx)/Math.pow(b,x)
							const R=[];
							R[0]=Res.toPrecision(3)
							for(let i=1;i<6;++i){
								do{
									R[i]=(Res+2*(Math.random()-0.5)).toPrecision(3)
								}while(repetido(R))
							}
							for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
						}
						function P2(){
							const a=Math.round(Math.random()*200+10)*(Math.random()<0.5?1:-1)/10
							let b
							do{
								b=Math.round(Math.random()*150+50)/100
							}while(b==1)
							
							const x=Math.round(Math.random()*80+5)/10*(Math.random()<0.5?1:-1)
							const fx=(a*Math.pow(b,x)).toPrecision(3)
							spanContenido("Se tiene que $f(x)="+a.toFixed(1)+"\\cdot b^x$ la la cual pasa por el punto ("+x.toFixed(1)+","+fx+"), determine el valor de $b$",C[6])
							let Res=Math.pow(eval(fx)/a,1/x)
							const R=[];
							R[0]=Res.toPrecision(3)
							for(let i=1;i<6;++i){
								do{
									R[i]=(Res+2*(Math.random()-0.5)).toPrecision(3)
								}while(repetido(R))
							}
							for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
						}
						function P3(){
							const a=Math.round(Math.random()*200+10)*(Math.random()<0.5?1:-1)/10
							const k=Math.round(Math.random()*98+1)*(Math.random()<0.5?1:-1)/100
							const x=Math.round(Math.random()*80+5)/10*(Math.random()<0.5?1:-1)

							const fx=(a*Math.exp(k*x)).toPrecision(3)
							spanContenido("Se tiene que $f(x)="+a.toFixed(1)+"\\cdot e^{k x}$ la la cual pasa por el punto ("+x.toFixed(1)+","+(fx.indexOf('e')!=-1?NotacionCientifica(eval(fx)):fx)+"), determine el valor de $k$",C[6])
							let Res=Math.log(eval(fx)/a)/x
							const R=[];
							R[0]=Res.toPrecision(3)
							for(let i=1;i<6;++i){
								do{
									R[i]=(Math.round(Math.random()*98+1)*(Math.random()<0.5?1:-1)/100).toPrecision(3)
								}while(repetido(R))
							}
							for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
						}
						(Math.random()<1/3?P1():( Math.random()<0.5?P2():P3() ))
						
					}
				},
				{
					Nombre:"Funciones exponenciales (evaluación y despeje)",
					Nota:"",
					fun:function(){
						let C=abrirPregunta()
						const R=[]
						function P1(){//a*b^x
							const a=Math.round(Math.random()*200+10)*(Math.random()<0.5?1:-1)/10
							let b
							do{
								b=Math.round(Math.random()*15+5)/10
							}while(b==1)
							function Q1(){
								let x
								do{
									x=Math.round(Math.random()*15+5)/10
								}while(x==0)
								spanContenido("Sea $f(x) = "+a.toFixed(1)+"\\cdot "+b.toFixed(1)+"^x$, calcule $f("+x.toFixed(1)+")$.",C[6])
								let Res=a*Math.pow(b,x)
								R[0]=Res.toPrecision(3)
								for(let i=1;i<6;++i){
									do{
										Res*=(1+.2*(Math.random()-0.5))
										R[i]=Res.toPrecision(3)
									}while(repetido(R))
								}
							}
							function Q2(){
								let x
								do{
									x=Math.round(Math.random()*150+50)/100
								}while(x==0)
								
								const fx=(a*Math.pow(b,x)).toPrecision(3)
								spanContenido("Sea $f(x) = "+a.toFixed(1)+"\\cdot "+b.toFixed(1)+"^x$, calcule $x_a$ tal que $f(x_a) = "+fx+" $.",C[6])
								let Res=Math.log(eval(fx)/a)/Math.log(b)

								R[0]=Res.toFixed(2)

								for(let i=1;i<6;++i){
									do{
										Res=Math.round(Math.random()*150+50)/100
										R[i]=Res.toFixed(2)
									}while(repetido(R))
								}
							}
							Math.random()<0.5?Q1():Q2()
						}
						function P2(){//a*e^{kx}
							const a=Math.round(Math.random()*200+10)*(Math.random()<0.5?1:-1)/10
							let k
							do{
								k=(Math.random()?-1:1)*Math.round(Math.random()*200)/100
							}while(k==0)
							function Q1(){
								let x
								do{
									x=Math.round(Math.random()*150+50)/100
								}while(x==0)
								spanContenido("Sea $f(x) = "+a.toFixed(1)+"\\cdot e^{"+k.toFixed(2)+"x}$, calcule $f("+x.toFixed(2)+")$.",C[6])
								let Res=a*Math.exp(k*x)
								R[0]=Res.toPrecision(3)
								for(let i=1;i<6;++i){
									do{
										Res*=(1+.2*(Math.random()-0.5))
										R[i]=Res.toPrecision(3)
									}while(repetido(R))
								}
							}
							function Q2(){
								let x
								do{
									x=Math.round(Math.random()*150+50)/100
								}while(x==0)
								const fx=(a*Math.exp(k*x)).toPrecision(3)
								spanContenido("Sea $f(x) = "+a.toFixed(1)+"\\cdot e^{"+k.toFixed(2)+"x}$, calcule $x_a$ tal que $f(x_a) = "+fx+"$.",C[6])
								let Res=Math.log(eval(fx)/a)/k
								R[0]=Res.toPrecision(3)
								for(let i=1;i<6;++i){
									do{
										Res*=(1+.2*(Math.random()-0.5))
										R[i]=Res.toPrecision(3)
									}while(repetido(R))
								}
							}
							Math.random()<0.5?Q1():Q2()
						}
						Math.random()<0.5?P1():P2()
						
						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
					}
				}
			]
		}
	]
},
{
	Nombre:"Geometría y trigonometría",
	subtema:[
		{
			Nombre:"Geometría plana",
			test:[
				{
					Nombre:"Sectores circulares",
					Nota:"$A_c=\\frac{\\pi r^2 \\alpha°}{360°}$<br/><br/> $A_c=\\frac{r^2 \\alpha}{2}$",
					fun:function(){
						/*inicio*/
						function calculateSectorPath(angle, radius,r=70) {
							// Convertir el ángulo a radianes
							const angleRad = (angle * Math.PI) / 180;
						
							// Coordenadas del punto final del arco en el sistema de coordenadas cartesianas
							const x = radius + radius * Math.sin(angleRad);
							const y = radius - radius * Math.cos(angleRad);
						
							// Determinar si el arco es mayor de 180 grados (grande = 1 o pequeño = 0)
							const largeArcFlag = angle <= 180 ? 0 : 1;
						
							// Crear el valor del parámetro d para el path
							const d = [
								`M ${radius},${radius}`,           // Moverse al centro del círculo
								`L ${radius},0`,                   // Línea desde el centro hacia el borde superior (ángulo 0°)
								`A ${radius},${radius} 0 ${largeArcFlag},1 ${x},${y}`,  // Dibujar el arco
								`Z`                                // Cerrar el camino (vuelve al centro)
							].join(" ");
						
							return d;
						}
						function P1(x){
							var r=Math.round(Math.random()*20+2)
							var a=Math.round(Math.random()*350+5)
							
							
							var P="Determine el área del sector circular que tiene como radio "+r+" y ángulo $\\theta="+a+"°$"
							P+=`<br><center><svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
							<path d="${calculateSectorPath(a,50)}" fill="none" stroke="black" stroke-width="2" />
							<path d="${calculateSectorPath(a,10)}" fill="none" stroke="black" stroke-width="2" />
							</svg></center>`
							
							var R=[];
							
							R[0]=(Math.PI*a*r*r/360).toFixed(2)
							for(var i=1;i<6;++i){
							do{
							R[i]=(Math.PI*a*r*r/360+(Math.random()-0.5)*10).toFixed(2)
							}while(repetido(R))
							
							}
							return [P,R]
							}
						//Final
						let C=abrirPregunta()
						let [P,R]=P1()
						spanContenido(P,C[6])
						// C[6].innerHTML=P
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
					}
				},{
					Nombre:"Distancia entre puntos I",
					Nota:"$d_{A,B}=\\sqrt{(x_b-x_a)^2+(y_b-y_a)^2}$",
					fun:function(){
						/*inicio*/
						function repDist(A,B,dummy){
							const d2=(A[0]-B[0])**2+(A[1]-B[1])**2
							if(dummy==0){
								return `$${Math.sqrt(d2).toPrecision(3)}$`
							}else{
								if( Math.sqrt(d2) == Math.round(Math.sqrt(d2)) ){
									return `$${Math.round(Math.sqrt(d2))}$`
								}else{
									return `$\\sqrt{${d2}}$`
								}
							}
						}
						let A=[Math.round(Math.random()*10-5),Math.round(Math.random()*10-5)],B
						do{
							B = [Math.round(Math.random()*10-5),Math.round(Math.random()*10-5)]
						}while(A[0] == B[0] && A[1] == B[1])
						const dummy=Math.round(Math.random())

						let C=abrirPregunta()
						const P = `Calcule la distancia entre $A:(${A[0]}, ${A[1]})$ y $B:(${B[0]}, ${B[1]})$.`
						const R=[]
						R[0]=repDist(A,B,dummy)

						for(let i=1;i<6;++i){
							do{
								B = [Math.round(Math.random()*10-5),Math.round(Math.random()*10-5)]
								R[i]=repDist(A,B,dummy)
							}while(repetido(R))
						}

						spanContenido(P,C[6])
						// C[6].innerHTML=P
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
					}
				},{
					Nombre:"Distancia entre puntos II",
					Nota:"$d_{A,B}=\\sqrt{(x_b-x_a)^2+(y_b-y_a)^2}$",
					fun:function(){
						/*inicio*/
						function repDist(A,B,dummy){
							const d2=(A[0]-B[0])**2+(A[1]-B[1])**2
							if(dummy==0){
								return `$${Math.sqrt(d2).toPrecision(3)}$`
							}else{
								if( Math.sqrt(d2) == Math.round(Math.sqrt(d2)) ){
									return `$${Math.round(Math.sqrt(d2))}$`
								}else{
									return `$\\sqrt{${d2}}$`
								}
							}
						}
						let A=[Math.round(Math.random()*10-5),Math.round(Math.random()*10-5)],B
						do{
							B = [Math.round(Math.random()*10-5),Math.round(Math.random()*10-5)]
						}while(A[0] == B[0] && A[1] == B[1])
						const dummy=Math.round(Math.random())

						let C=abrirPregunta()
						const Puntos = [	[[A[0],B[0]],
											 [A[1],B[1]],
											 'oRGB(100,20,5)']]
						const P = `Calcule la distancia entre los siguientes puntos.
						<br><center>${plot(Puntos,[400,400],[-6,6,-6,6,[1,1],[1,1]]).outerHTML}</center>`
						const R=[]
						R[0]=repDist(A,B,dummy)

						for(let i=1;i<6;++i){
							do{
								B = [Math.round(Math.random()*10-5),Math.round(Math.random()*10-5)]
								R[i]=repDist(A,B,dummy)
							}while(repetido(R))
						}

						spanContenido(P,C[6])
						// C[6].innerHTML=P
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
					}
				},
				{
					Nombre:"Figuras regulares",
					Nota:"",
					fun:function(){
						function P1(x){
							var n=Math.round(Math.random()*8+4)
							var A=Math.round(Math.random()*250+10)
							var a=Math.sqrt(A/(n*Math.tan(Math.PI/n)))
							var L=Math.sqrt(4*A*Math.tan(Math.PI/n)/n)
								
							
							var P='Una figura regular de '+n+' lados tiene como área '+A+', calcule el lado de la figura'
							
							
							var R=[];
							R[0]=L.toFixed(2)
							var dummy=0;
							for(var i=1;i<6;++i){
								do{
									R[i]=(L+2*(Math.random()-0.5)).toFixed(2)
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
					Nombre:"Punto medio I",
					Nota:"$P_{AB}=\\left( \\frac{x_a+x_b}{2},\\frac{y_a+y_b}{2} \\right)$",
					fun:function(){
						let A=[Math.round(Math.random()*10-5),Math.round(Math.random()*10-5)],B
						do{
							B = [Math.round(Math.random()*10-5),Math.round(Math.random()*10-5)]
						}while(A[0] == B[0] && A[1] == B[1])
						const dummy=Math.round(Math.random())

						let C=abrirPregunta()
						const Puntos = [	[[A[0],B[0]],
											 [A[1],B[1]],
											 'oRGB(100,20,5)']]
						const P = `Determine la coordenada $${dummy==1?"x":"y"}$ del punto medio de $A:(${A[0]}, ${A[1]})$ y $B:(${B[0]}, ${B[1]})$.`
						const R=[]
						R[0]=dummy==1?`$x = ${fraccion(A[0]+B[0],2)}$`:`$y = ${fraccion(A[1]+B[1],2)}$`

						for(let i=1;i<6;++i){
							do{
								R[i]=dummy==1?`$x = ${fraccion(A[0]+B[0]+Math.round(Math.random()*20-10),2)}$`:`$y = ${fraccion(A[1]+B[1]+Math.round(Math.random()*20-10),2)}$`
							}while(repetido(R))
						}

						spanContenido(P,C[6])
						// C[6].innerHTML=P
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
					}
				},{
					Nombre:"Punto medio II",
					Nota:"$P_{AB}=\\left( \\frac{x_a+x_b}{2},\\frac{y_a+y_b}{2} \\right)$",
					fun:function(){
						let A=[Math.round(Math.random()*10-5),Math.round(Math.random()*10-5)],B
						do{
							B = [Math.round(Math.random()*10-5),Math.round(Math.random()*10-5)]
						}while(A[0] == B[0] && A[1] == B[1])
						const dummy=Math.round(Math.random())
						
						let C=abrirPregunta()
						const Puntos = [	[[A[0],B[0]],
											 [A[1],B[1]],
											 'oRGB(100,20,5)']]
						const P = `Determine la coordenada $${dummy==1?"x":"y"}$ del punto medio de los siguientes puntos.
						<br><center>${plot(Puntos,[400,400],[-6,6,-6,6,[1,1],[1,1]]).outerHTML}</center>`
						const R=[]
						R[0]=dummy==1?`$x = ${fraccion(A[0]+B[0],2)}$`:`$y = ${fraccion(A[1]+B[1],2)}$`

						for(let i=1;i<6;++i){
							do{
								R[i]=dummy==1?`$x = ${fraccion(A[0]+B[0]+Math.round(Math.random()*20-10),2)}$`:`$y = ${fraccion(A[1]+B[1]+Math.round(Math.random()*20-10),2)}$`
							}while(repetido(R))
						}

						spanContenido(P,C[6])
						// C[6].innerHTML=P
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
					}
				},{
					Nombre:" Líneas paralelas I",
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
						let A=[Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)], B, c
						do{
							B = [Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)]
							c = [Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)]
		
						}while( (A[0] == B[0]) || (A[1] == B[1]) || (A[0] == c[0]) || (c[0] == B[0]) )
						const dummy=Math.round(Math.random())
						
						let m=[ B[1]-A[1], B[0]-A[0] ]
						m=simplify_frac(m)

						let b=[m[1]*c[1]-m[0]*c[0],m[1]]
						b=simplify_frac(b)
	
						
	
						const P=`Sea $A:(${A[0]},${A[1]})$ y $B:(${B[0]},${B[1]})$. Determine la ecuación paralela al segmento $\\overline{AB}$ que pase por $C:(${c[0]},${c[1]})$.`
	
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
					Nombre:" Líneas perpendiculares I",
					Nota:"",
					fun:function(){
						//Inicio
						function tempEcLine(m,c){
							function mp(m){
								return [m[0]<0?m[1]:-m[1],m[0]<0?-m[0]:m[0]]
							}
							let cadena = `$y =`
							m=mp(m)
							if(m[0]!=0){
								cadena += (m[1]==1 && Math.abs(m[0])==1?(m[0]<0?"-":"")+' x':(m[0]<0?"-":"")+fraccion(Math.abs(m[0]),m[1])+' x') 
							}
							const b=[m[1]*c[1]-m[0]*c[0],m[1]]
							cadena += (b[0]==0?'':(b[0]<0?"-":"+")+fraccion(Math.abs(b[0]),b[1]))+"$"
							return cadena
						}
						/*Inicio de preguntas*/
						let C=abrirPregunta()
						let A=[Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)], B, c
						do{
							B = [Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)]
							c = [Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)]
		
						}while( (A[0] == B[0]) || (A[1] == B[1]) || (A[0] == c[0]) || (c[0] == B[0]) )
						const dummy=Math.round(Math.random())
						
						let m=[ B[1]-A[1], B[0]-A[0] ]
						m=simplify_frac(m)

	
						
	
						const P=`Sea $A:(${A[0]},${A[1]})$ y $B:(${B[0]},${B[1]})$. Determine la ecuación perpendicular al segmento $\\overline{AB}$ que pase por $C:(${c[0]},${c[1]})$.`
	
						spanContenido(P,C[6])
						
						const R=[tempEcLine(m,c)]
						for(let i=1;i<6;++i){
							do{
								if(dummy==1){
									m[0] += Math.round(Math.random()*4-2)
								}else{
									c[0] += Math.round(Math.random()*4-2)
								}
								R[i]= tempEcLine(m,c)
							}while(repetido(R))
						
						}
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
						//Final
	
	
	
							}
				},{
					Nombre:" Líneas paralelas II",
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
						let A=[Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)], B, c
						do{
							B = [Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)]
							c = [Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)]
		
						}while( (A[0] == B[0]) || (A[1] == B[1]) || (A[0] == c[0]) || (c[0] == B[0]) )
						const dummy=Math.round(Math.random())
						
						let m=[ B[1]-A[1], B[0]-A[0] ]
						m=simplify_frac(m)

						let b=[m[1]*A[1]-m[0]*A[0],m[1]]
						b=simplify_frac(b)

						ElemP=plot([PLine(m[0]/m[1],b[0]/b[1]),[[c[0]],[c[1]],'oRGB(255,100,155)']],[400,400],[-6,6,-6,6,[1,1],[1,1]])

						const P=`Determine la ecuación a línea paralela a la recta que se muestra y pase por el punto mostrados.<br><center>${ElemP.outerHTML}</center>`
	
						spanContenido(P,C[6])
						b=[m[1]*c[1]-m[0]*c[0],m[1]]
						b=simplify_frac(b)
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
					Nombre:" Líneas perpendiculares II",
					Nota:"",
					fun:function(){
						//Inicio
						function PLine(m,b){
							//console.log(`m=${m}; b=${b}`)
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
						let A=[Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)], B, c
						do{
							B = [Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)]
							c = [Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)]
		
						}while( (A[0] == B[0]) || (A[1] == B[1]) || (A[0] == c[0]) || (c[0] == B[0]) )
						const dummy=Math.round(Math.random())
						
						let m=[ B[1]-A[1], B[0]-A[0] ]
						m=simplify_frac(m)

						let b=[m[1]*A[1]-m[0]*A[0],m[1]]
						b=simplify_frac(b)

						ElemP=plot([PLine(m[0]/m[1],b[0]/b[1]),[[c[0]],[c[1]],'oRGB(255,100,155)']],[400,400],[-6,6,-6,6,[1,1],[1,1]])

						const P=`Determine la ecuación a línea perpendicular a la recta que se muestra y pase por el punto mostrados.<br><center>${ElemP.outerHTML}</center>`
						spanContenido(P,C[6])

						m=m[0]<0?[m[1],-m[0]]:[-m[1],m[0]]
						b=[m[1]*c[1]-m[0]*c[0],m[1]]
						b=simplify_frac(b)
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
			Nombre:"Trigonometría",
			test:[
				{
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
				},
				{
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
							
							const R=[],side=[],angle=[]
							side[0]=Math.round(Math.random()*20+1)
							side[1]=Math.round(Math.random()*20+1)
							angle[2]=Math.round(Math.random()*70+10)
							const dummy=(Math.sqrt(side[0]*side[0]+side[1]*side[1]-2*side[0]*side[1]*Math.cos(angle[2]*Math.PI/180))).toFixed(2)
							side[2]=eval(dummy)

							angle[0]=(Math.acos((side[1]*side[1]+side[2]*side[2]-side[0]*side[0])/(2*side[1]*side[2]))*180/Math.PI)
							angle[1]=(Math.acos((side[0]*side[0]+side[2]*side[2]-side[1]*side[1])/(2*side[0]*side[2]))*180/Math.PI)
							//angle[2]=(Math.acos((side[0]*side[0]+side[1]*side[1]-side[2]*side[2])/(2*side[0]*side[1]))*180/Math.PI)
							
							
							
							const label=[	['a','b','A','B'],
											['a','c','A','C'],
											['b','a','B','A'],
											['b','c','B','C'],
											['c','a','C','A'],
											['c','b','C','B']]
							const op=Math.floor(Math.random()*label.length-.01)

							spanContenido("Considere un triángulo con lados $"+label[op][0]+"="+side[0]+"$, $"+label[op][1]+"="+side[1]+"$ y angulo $"+label[op][2]+"="+angle[0].toFixed(2)+
							"$. Calcule ángulo $"+label[op][3]+"$.",C[6])
							
							

							
							R[0]=angle[1].toFixed(2)+"°"
							for(let i=1;i<6;++i){
								do{
									R[i]=(angle[1]+30*(Math.random()-.5)).toFixed(2)+"°"
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

							angle[0]=(Math.acos((side[1]*side[1]+side[2]*side[2]-side[0]*side[0])/(2*side[1]*side[2]))*180/Math.PI)
							angle[1]=(Math.acos((side[0]*side[0]+side[2]*side[2]-side[1]*side[1])/(2*side[0]*side[2]))*180/Math.PI)
							//angle[2]=(Math.acos((side[0]*side[0]+side[1]*side[1]-side[2]*side[2])/(2*side[0]*side[1]))*180/Math.PI)
							
							const label=[	['A','B','a','b'],
											['A','C','a','c'],
											['B','A','b','a'],
											['B','C','b','c'],
											['C','A','c','a'],
											['C','B','c','b']]
							const op=Math.floor(Math.random()*label.length-.01)
							
							
							spanContenido("Considere un triángulo con ángulos de $"+label[op][0]+" = "+angle[0].toFixed(2)+"°$, $"+label[op][1]+"="+angle[1].toFixed(2)+
							"°$ y un lado $"+label[op][2]+"="+side[0]+"$. Calcule el lado "+label[op][3]+".",C[6])
							
							

							R[0]=side[1].toFixed(0)
							for(let i=1;i<6;++i){
								do{
									R[i]=(side[1]+10*(Math.random()-.5)).toFixed(0)
								}while(repetido(R))
							
							}
							for(let i=0;i<6;++i) spanContenido(R[i],C[i])
						}
						let C=abrirPregunta()/////Aquí me quedé, mejorar P1+
						if(Math.random()<0.5) P1()
						else P2()




					}
				}
			]

		},
		{
			Nombre:"Diagrama de Voronoi",
			test:[
				{
					Nombre:"Mediatriz",
					Nota:"",
					fun:function(){
						/*Inicio*/
						function P1(x){
							do{
								var A=[Math.round(Math.random()*18-9),Math.round(Math.random()*18-9)]
								var B=[Math.round(Math.random()*18-9),Math.round(Math.random()*18-9)]
							}while(A[0]==B[0] || A[1]==B[1])
							var P="Calcule la mediatriz de los siguientes puntos"+puntos(A,B)
							m=-(B[0]-A[0])/(B[1]-A[1])
							b=-m*(A[0]+B[0])/2+(A[1]+B[1])/2
								
							var R=[];
							
							R[0]="$y="+m.toFixed(3)+" x "+(b<0? "- "+(-b).toFixed(3):"+ "+b.toFixed(3))+"$"
							for(var i=1;i<6;++i){
								do{
									do{
										var A=[Math.round(Math.random()*21-11),Math.round(Math.random()*21-11)]
										var B=[Math.round(Math.random()*21-11),Math.round(Math.random()*21-11)]
									}while(A[0]==B[0] || A[1]==B[1])
									m=-(B[0]-A[0])/(B[1]-A[1])
							b=-m*(A[0]+B[0])/2+(A[1]+B[1])/2
									R[i]="$y="+m.toFixed(3)+" x "+(b<0? "- "+(-b).toFixed(3):"+ "+b.toFixed(3))+"$"
								}while(repetido(R))
							
							}
							return [P,R]
						}
						function P2(x){
								do{
								var A=[Math.round(Math.random()*18-9),Math.round(Math.random()*18-9)]
								var B=[Math.round(Math.random()*18-9),Math.round(Math.random()*18-9)]
							}while(A[0]==B[0] || A[1]==B[1])
							var P="Calcule la mediatriz de los siguientes puntos"+puntos(A,B)
							m=-(B[0]-A[0])/(B[1]-A[1])
							b=-m*(A[0]+B[0])/2+(A[1]+B[1])/2
								
							var R=[];
							
							R[0]="$y="+m.toFixed(3)+" x "+(b<0? "- "+(-b).toFixed(3):"+ "+b.toFixed(3))+"$"
							for(var i=1;i<6;++i){
								do{
									do{
										var A=[Math.round(Math.random()*21-11),Math.round(Math.random()*21-11)]
										var B=[Math.round(Math.random()*21-11),Math.round(Math.random()*21-11)]
									}while(A[0]==B[0] || A[1]==B[1])
									
							b=-m*(A[0]+B[0])/2+(A[1]+B[1])/2
									R[i]="$y="+m.toFixed(3)+" x "+(b<0? "- "+(-b).toFixed(3):"+ "+b.toFixed(3))+"$"
								}while(repetido(R))
							
							}
							return [P,R]
						}
						function puntos(a,b){
							var mx=30
							var bx=10.5*mx
							var Sdiv='<center><svg width="'+(mx*21)+'px" height="'+(mx*21)+'">'
							for(var i=-10;i<11;++i){
							Sdiv+='<line x1="'+(mx*i+bx)+'" y1="0" x2="'+(mx*i+bx)+'" y2="'+(mx*21)+'" style="stroke:gray;stroke-width:1"> </line>'
							Sdiv+='<line y1="'+(mx*i+bx)+'" x1="0" y2="'+(mx*i+bx)+'" x2="'+(mx*21)+'" style="stroke:gray;stroke-width:1"> </line>'
							}
							Sdiv+='<line x1="'+(bx)+'" y1="0" x2="'+(bx)+'" y2="'+(mx*21)+'" style="stroke:black;stroke-width:3"> </line>'
							Sdiv+='<line y1="'+(bx)+'" x1="0" y2="'+(bx)+'" x2="'+(mx*21)+'" style="stroke:black;stroke-width:3"> </line>'
							Sdiv+='<text y="'+(-mx*5+bx)+'" x="'+bx+'" text-anchor="end"  style="stroke:red;stroke-width:1;font: italic 13px sans-serif;">5 </text>'
							Sdiv+='<text y="'+bx+'" x="'+(mx*5+bx)+'" text-anchor="end"  style="stroke:red;stroke-width:1;font: italic 13px sans-serif;">5 </text>'
							
							Sdiv+='<circle cx="'+(mx*a[0]+bx)+'" cy="'+(-mx*a[1]+bx)+'" r="8" />'
							Sdiv+='<circle cx="'+(mx*b[0]+bx)+'" cy="'+(-mx*b[1]+bx)+'" r="8"/>'
							Sdiv+='<text x="'+(mx*a[0]+bx+20)+'" y="'+(-mx*a[1]+bx)+'" text-anchor="end"  style="stroke:red;stroke-width:1;font: italic 13px sans-serif;">A</text>'
							Sdiv+='<text x="'+(mx*b[0]+bx+20)+'" y="'+(-mx*b[1]+bx)+'" text-anchor="end"  style="stroke:red;stroke-width:1;font: italic 13px sans-serif;">B </text>'
							
								
							Sdiv+='</svg></center><br/>'
							//alert(Sdiv)
							return Sdiv
						}
						/*Final*/
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
					}
				}
			]
		},
	]

},

{
	Nombre:"Estadística y probabilidad",
	subtema:[
		{
			Nombre: "Probabilidad",
			test:[
				{
					Nombre: "Probabilidad simple con diagramas de Venn",
					Nota:"",
					fun:function(){
						let C=abrirPregunta()
						
						const ndatos=[Math.ceil(0.123+0*Math.random()*20),Math.ceil(Math.random()*20),Math.ceil(Math.random()*20),Math.ceil(Math.random()*20)]
						let total = 0
						for(let k=0;k<ndatos.length;++k) total += ndatos[k]

						const suma =[	["A",ndatos[1]+ndatos[2]],
										["B",ndatos[2]+ndatos[3]],
										["A\\cap B",ndatos[2]],
										["A\\cup B",ndatos[1]+ndatos[2]+ndatos[3]],
										["A^c",ndatos[0]+ndatos[3]],
										["B^c",ndatos[0]+ndatos[1]],
										["(A\\cap B)^c",ndatos[0]+ndatos[1]+ndatos[3]],
										["(A\\cup B)^c",ndatos[0]]]
						let op = Math.floor(Math.random()*suma.length)
						
						spanContenido(`Considerando el siguiente diagrama, determine $P(${suma[op][0]})$ <br><center>${diagramaVenn2([['A','B'],ndatos],250)}</center>`,C[6])
						//spanContenido(`Considerando el siguiente diagrama, determine $P(${suma[op][0]})$ <br><center>${diagramaVenn2([['A','B'],['$$x_0$$','$$x_1$$','$$x_2$$','$$\\frac{x_3}{2}$$']],Math.random()*450+150)}</center>`,C[6])

						let temp = simplify_frac([suma[op][1],total])
						
						const R=[`$P(${suma[op][0]}) = \\frac{${temp[0]}}{${temp[1]}}$`]
						for(let i=1;i<6;++i){
							do{
								temp = Math.random()<0.5?simplify_frac([suma[op][1]+Math.round(Math.random()*20-5),total]):simplify_frac([suma[Math.floor(Math.random()*suma.length)][1],total])
								temp[0] = Math.abs(temp[0])

								R[i]=`$P(${suma[op][0]}) = \\frac{${temp[0]}}{${temp[1]}}$`
							}while(repetido(R))
						}
						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
					}
				},{
					Nombre: "Probabilidad simple con diagramas de Venn II",
					Nota:"$P(A|B) = \\frac{P(A\\cap B)}{P(B)}$",
					fun:function(){
						function num2prob(num){
							let total = 0
							let prob=[]
							for(let k=0;k<ndatos.length;++k) total += num[k]
							for(let k=0;k<ndatos.length;++k){
								let p = simplify_frac([num[k],total])
								prob.push(`$$\\frac{${p[0]}}{${p[1]}}$$`)
							} 
							return prob
						}
						let C=abrirPregunta()
						
						const ndatos=[Math.ceil(0.123+0*Math.random()*20),Math.ceil(Math.random()*20),Math.ceil(Math.random()*20),Math.ceil(Math.random()*20)]
						let total = 0
						for(let k=0;k<ndatos.length;++k) total += ndatos[k]

						const suma =[	["A",ndatos[1]+ndatos[2]],
										["B",ndatos[2]+ndatos[3]],
										["A\\cap B",ndatos[2]],
										["A\\cup B",ndatos[1]+ndatos[2]+ndatos[3]],
										["A^c",ndatos[0]+ndatos[3]],
										["B^c",ndatos[0]+ndatos[1]],
										["(A\\cap B)^c",ndatos[0]+ndatos[1]+ndatos[3]],
										["(A\\cup B)^c",ndatos[0]]]
						let op = Math.floor(Math.random()*suma.length)
						
						spanContenido(`Considerando el siguiente diagrama, determine $P(${suma[op][0]})$ <br><center>${diagramaVenn2([['A','B'],num2prob(ndatos)],250)}</center>`,C[6])
						//spanContenido(`Considerando el siguiente diagrama, determine $P(${suma[op][0]})$ <br><center>${diagramaVenn2([['A','B'],['$$x_0$$','$$x_1$$','$$x_2$$','$$\\frac{x_3}{2}$$']],Math.random()*450+150)}</center>`,C[6])

						let temp = simplify_frac([suma[op][1],total])
						
						const R=[`$P(${suma[op][0]}) = \\frac{${temp[0]}}{${temp[1]}}$`]
						for(let i=1;i<6;++i){
							do{
								temp = Math.random()<0.5?simplify_frac([suma[op][1]+Math.round(Math.random()*20-5),total]):simplify_frac([suma[Math.floor(Math.random()*suma.length)][1],total])
								temp[0] = Math.abs(temp[0])

								R[i]=`$P(${suma[op][0]}) = \\frac{${temp[0]}}{${temp[1]}}$`
							}while(repetido(R))
						}
						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
					}
				},{
					Nombre: "Probabilidad condicional con diagramas de Venn",
					Nota:"$P(A|B) = \\frac{P(A\\cap B)}{P(B)}$",
					fun:function(){
						function num2prob(num){
							let total = 0
							let prob=[]
							for(let k=0;k<ndatos.length;++k) total += num[k]
							for(let k=0;k<ndatos.length;++k){
								let p = simplify_frac([num[k],total])
								prob.push(`$$\\frac{${p[0]}}{${p[1]}}$$`)
							} 
							return prob
						}
						let C=abrirPregunta()
						
						const ndatos=[Math.ceil(0.123+0*Math.random()*20),Math.ceil(Math.random()*20),Math.ceil(Math.random()*20),Math.ceil(Math.random()*20)]
						let total = 0
						for(let k=0;k<ndatos.length;++k) total += ndatos[k]

						const suma =[	["A|B",		simplify_frac([ndatos[2],ndatos[2]+ndatos[3]])],
										["A|B^c",	simplify_frac([ndatos[1],ndatos[1]+ndatos[0]])],
										["A^c|B",	simplify_frac([ndatos[3],ndatos[2]+ndatos[3]])],
										["A^c|B^c",	simplify_frac([ndatos[0],ndatos[1]+ndatos[0]])],
										["B|A",		simplify_frac([ndatos[2],ndatos[1]+ndatos[2]])],
										["B|A^c",	simplify_frac([ndatos[3],ndatos[0]+ndatos[3]])],
										["B^c|A",	simplify_frac([ndatos[1],ndatos[1]+ndatos[0]])],
										["B^c|A^c",	simplify_frac([ndatos[0],ndatos[0]+ndatos[3]])]
										]
						let op = Math.floor(Math.random()*suma.length)
						
						spanContenido(`Considerando el siguiente diagrama, determine $P(${suma[op][0]})$ <br><center>${diagramaVenn2([['A','B'],num2prob(ndatos)],250)}</center>`,C[6])
						//spanContenido(`Considerando el siguiente diagrama, determine $P(${suma[op][0]})$ <br><center>${diagramaVenn2([['A','B'],['0','1','2','3']],Math.random()*450+150)}</center>`,C[6])

						const R=[`$P(${suma[op][0]}) = \\frac{${suma[op][1][0]}}{${suma[op][1][1]}}$`]
						for(let i=1;i<6;++i){
							do{
								temp = Math.random()<0.5?simplify_frac([suma[op][1][0]+Math.round(Math.random()*20-5),suma[op][1][1]]):simplify_frac([suma[Math.floor(Math.random()*suma.length)][1][0],suma[op][1][1]])
								temp[0] = Math.abs(temp[0])

								R[i]=`$P(${suma[op][0]}) = \\frac{${temp[0]}}{${temp[1]}}$`
							}while(repetido(R))
						}
						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
					}
				},{
					Nombre: "Diagrama de árbol y probabilidad condicionada",
					Nota:" $P(A|B) = \\frac{P(B|A) P(A)}{P(B)}$",
					fun:function(){
						class DA {
							constructor(A, BA,BAc) {
							  this.A = A
							  this.BA = BA
							  this.BAc =BAc
							  this.Ac = 1-A
							  this.BcA = 1-BA
							  this.BcAc = 1-BAc
							  this.B = this.A*this.BA + this.Ac*this.BAc
							  this.Bc = 1-this.B
							}
							opcion(op){
								switch(op){
									case 1:
										return ['B',(this.BA*this.A+this.BAc*this.Ac).toPrecision(3)]
									case 2:
										return ['B^c',(this.BcA*this.A+this.BcAc*this.Ac).toPrecision(3)]
									case 3:
										return ['A|B',(this.BA*this.A/this.B).toPrecision(3)]
									case 4:
										return ['A|B^c',(this.BcA*this.A/this.Bc).toPrecision(3)]
									case 5:
										return ['A^c|B',(this.BAc*this.Ac/this.B).toPrecision(3)]
									default:
										return ['A^c|B^c',(this.BcAc*this.Ac/this.Bc).toPrecision(3)]
								}
							}
							diagArbol() {
							  return [this.A.toFixed(3),this.Ac.toFixed(3),this.BA.toPrecision(3),this.BcA.toPrecision(3),this.BAc.toPrecision(3),this.BcAc.toPrecision(3)]
							}
						}
						let C=abrirPregunta()
						let op = Math.ceil(Math.random()*6)
						const q = new DA(Math.round(Math.random()*1000)/1000,Math.round(Math.random()*1000)/1000,Math.round(Math.random()*1000)/1000)
						let ans=q.opcion(op)
						spanContenido(`Considerando el siguiente diagrama, determine $P(${ans[0]})$ <br><center>${diagramaArbol([['A','B'],q.diagArbol()],300)}</center>`,C[6])
						//spanContenido(`Considerando el siguiente diagrama, determine $P(${suma[op][0]})$ <br><center>${diagramaVenn2([['A','B'],['$$x_0$$','$$x_1$$','$$x_2$$','$$\\frac{x_3}{2}$$']],Math.random()*450+150)}</center>`,C[6])

						const R=[`$P(${ans[0]}) = ${ans[1]}$`]
						for(let i=1;i<6;++i){
							do{
								
								let fakeans=q.opcion(op)
								R[i]=`$P(${ans[0]}) = ${Math.random()<0.5?(Math.random()).toPrecision(3):fakeans[1]}$`
							}while(repetido(R))
						}
						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
					}
				}
			]
		},
		{
			Nombre:"Representación de la información",
			test:[
				{
					Nombre:"Histograma y promedios",
					Nota:"$\\overline x=\\frac{\\sum x_i w_i}{\\sum w_i}$",
					fun:function(){
						function P1(x){
							var n=Math.round(Math.random()*6+3)
							var start=Math.round(Math.random()*10)
							var d=Math.round(Math.random()*10+1)
							var x=[[],[]]
							var mean=0
							var N=0
							for(var k=0;k<n;++k){
								x[0][k]=start+k*d 
								x[1][k]=Math.round(Math.random()*12)
								mean+=x[0][k]*x[1][k]
								N+=x[1][k]
							}
							mean=mean/N
							var P="Calcule el promedio de los datos que aparecen en el histograma<center>"
								P+=Histograma(x,M_range_count(x[1],1),[300,450],"#03B",50,"Datos")+"</center>"
							var R=[];
							
							R[0]=mean.toFixed(2)
							for(var i=1;i<6;++i){
								do{
									R[i]=(mean+2*Math.random()-1).toFixed(2)
										
								}while(repetido(R))
							
							}
							return [P,R]
						}
					//*** */
					let C=abrirPregunta()
						let [P,R]=P1()
						spanContenido(P,C[6])
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])			
					}
				},
				{
					Nombre:"Polígono de frecuencias acumuladas",
					Nota:"",
					fun:function(){
						function aleatorio_local(n_source){
							let n = Math.round(n_source-4)
							let x = Math.random()*n*(n-1)/2
							let aleatorio = 2
							while(x < n){
								x += n
								--n
								++aleatorio
							}
							return aleatorio
						}
						let C=abrirPregunta()
						const base=[[50,10,2],
									[100,20,5],
									[200,50,10],
									[500,100,20]]
						let Frec=[	[10,2,1],
										[20,5,1],
										[50,10,2],
										[100,20,5],
										[150,50,10],
										[200,20,5],
										[300,50,10],
										[500,100,20],
										[800,100,20]]
						let kf=Math.floor(Math.random()*Frec.length)
						const k = Math.floor(Math.random()*base.length)
						let cuartiles=[base[k][2]*Math.round(Math.random()*30),0,0,0,0]//min
						cuartiles[4] = cuartiles[0]+base[k][2]*Math.floor(base[k][0]/base[k][2]+2*Math.random()+3)//max
						cuartiles[2] = cuartiles[0]+base[k][2]*(4+Math.floor(Math.random()*((cuartiles[4]-cuartiles[0])/base[k][2] - 8)))//med
						
						cuartiles[1] = cuartiles[2]-base[k][2]*aleatorio_local((cuartiles[2]-cuartiles[0])/base[k][2])//q1
						cuartiles[3] = cuartiles[2]+base[k][2]*aleatorio_local((cuartiles[4]-cuartiles[2])/base[k][2])//q3
						// let rango=[cuartiles[4]-cuartiles[0],cuartiles[4]-cuartiles[0]]
						//Vamos a poner un punto extra para percentil
						let f = tlacu.interpolate_mono(cuartiles,[0,Frec[kf][0]/4,Frec[kf][0]/2,Frec[kf][0]*3/4,Frec[kf][0]])
						//console.log(` tlacu.interpolate_mono([${cuartiles}],[${[0,Frec[kf][0]/4,Frec[kf][0]/2,Frec[kf][0]*3/4,Frec[kf][0]]}])`)
						//console.log(`Vamos a evaluar ${cuartiles[2]}-->${f(cuartiles[2])}`)

						let percentil
						do{
							percentil = [Math.round(Math.random()*8+1)/10,0]
						}while(percentil[0]==0.5)
						

						let error_per=1e10
						for(let it = cuartiles[0]; it<cuartiles[4];it += base[k][2]){
							if(error_per>Math.abs(percentil[0]*Frec[kf][0]-f(it))){
								percentil[1] = it
								error_per = Math.abs(percentil[0]*Frec[kf][0]-f(it))
							}
							
							//console.log(`${error_per}>Math.abs(${percentil[0]}*${Frec[kf][0]}-${f(it)}):${error_per>Math.abs(percentil[0]*Frec[kf][0]-f(it))}`)
							//console.log(`----it:${percentil}`)

						}
						//Que no coincida el percenti con q1 ni q3
						percentil[1]+=percentil[1]==cuartiles[0]?base[k][2]:0
						percentil[1]+=percentil[1]==cuartiles[4]?-base[k][2]:0
						if(percentil[1]==cuartiles[1]){
							if(percentil[0]>0.25){
								percentil[1] += base[k][2]
							}else{
								percentil[1] -= base[k][2]
							}

						}else if(percentil[1]==cuartiles[3]){
							if(percentil[0]>0.75){
								percentil[1] += base[k][2]
							}else{
								percentil[1] -= base[k][2]
							}
						}
						const Q=[...cuartiles]//Solo para referencia

						let frecuencia = [0,Frec[kf][0]/4,Frec[kf][0]/2,Frec[kf][0]*3/4,Frec[kf][0]]
						
						cuartiles.push(percentil[1])
						frecuencia.push(percentil[0]*Frec[kf][0])

						frecuencia = frecuencia.sort(function (a, b) {return a - b;})
						cuartiles = cuartiles.sort(function (a, b) {return a - b;})
						
						let pr=[['$q_1$',Q[1]],
								["mediana",Q[2]],
								['$q_3$',Q[3]],
								[`el percentil ${Math.round(percentil[0]*100)}`,percentil[1]],
								Math.floor(Math.random()*4)]
						

						spanContenido(`Encuentre ${pr[pr[4]][0]} en el siguiente gráfico: <center>
							<tlacuache-ejes size="320,480" xlabel="" ylabel="Frecuencias acumuladas" xlim="${base[k][1]*(Math.floor(cuartiles[0]/base[k][1])<2?0:Math.floor(cuartiles[0]/base[k][1]))},${base[k][1]*Math.ceil(cuartiles[cuartiles.length-1]/base[k][1])}" ylim="0,${Frec[kf][0]}"  dx="${base[k][1]}" dy="${Frec[kf][1]}" ddx="${base[k][2]}" ddy="${Frec[kf][2]}" >
							
    <tlacuache-poligono-frecuencias-acumuladas x="${cuartiles}" y="${frecuencia}" ></tlacuache-poligono-frecuencias-acumuladas>
  </tlacuache-ejes ><center>`,C[6])
						const R=[pr[pr[4]][1]];
						for(let i=1;i<6;++i){
							do{
								R[i]=pr[pr[4]][1]+Math.round(Math.random()*6-12)*base[k][2]
							}while(repetido(R))
						}
						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])			
					}
				},
				{
					Nombre:"Caja de bigotes",
					Nota:"",
					fun:function(){
						function aleatorio_local(seed, s, n,it=3){
							const datos=[]
							const p = 0.8*Math.random()+.1
							for(let k=0; k<n; ++k){
								datos.push(seed)
								for(let k_it=0;k_it<it;++k_it){
									datos[k] += Math.round(	Math.random()*s*(Math.random()<0.5?1:-1)	)
								}
							}
							return datos
						}
						let C=abrirPregunta()
						const datos = aleatorio_local(Math.round(20*Math.random()+5),10,Math.round(10+Math.random()*5))
						/*
						let pr=[['$q_1$',Q[1]],
								["mediana",Q[2]],
								['$q_3$',Q[3]],
								[`el percentil ${Math.round(percentil[0]*100)}`,percentil[1]],
								Math.floor(Math.random()*4)]
						*/
						let Q = tlacu.stat.cuartil(datos)

						spanContenido(`Bosqueje la caja de bigotes correspondiente a los siguientes datos.<br><center>${tablaDatos([datos],['Datos '])}<br></center>`,C[6])
						const R=[`<tlacuache-cuartil q="[${Q}]" lim="${5*Math.floor(Q[0]/5)},${5*Math.ceil(Q[4]/5)}" dim="200,300" ></tlacuache-cuartil>`];
						const op=1+Math.floor(Math.random()*3)
						for(let i=1;i<6;++i){
							do{
								let Qa=[...Q]
								Qa[op]=Math.round(Math.random()*12-6)+Q[op]
								Qa.sort(function (a, b) {return a - b;})

								R[i]=`<tlacuache-cuartil q="[${Qa}]" lim="${5*Math.floor(Qa[0]/5)},${5*Math.ceil(Qa[4]/5)}" dim="200,300" ></tlacuache-cuartil>`
							}while(repetido(R))
						}
						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])			
					}
				}
			]
		},
		{
			Nombre:"Distribución Binomial",
			test:[{
				Nombre: "Combinaciones",
				Nota:"Use su calculadora",
				fun:function(){

					let n = Math.ceil(Math.random()*3+14)
					let r = Math.ceil(Math.random()*n)
					
					let C=abrirPregunta()
					
					spanContenido(`Determine el valor de $C^{${n}}_{${r}}$`,C[6])
					

					const R=[`$${comb(n,r)}$`]
					for(let i=1;i<6;++i){
						do{
							n = Math.ceil(Math.random()*3+14)
							r = Math.ceil(Math.random()*n)
							R[i]=`$${comb(n,r)}$`
						}while(repetido(R))
					}
					for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
				}
			},{
					Nombre:"Distribución Binomial I",
					Nota:"",
					fun:function(){

						function P1(x){
							var n=Math.ceil(Math.random()*5+20)
							var r=Math.ceil(Math.random()*(n-2))
							
							var P="Usando tu calculadora calcula "+n+"C"+r+"."
							
							
							var R=[];
							R[0]=comb(n,r)
							var dummy=0;
							for(var i=1;i<6;++i){
								do{
									var n=Math.ceil(Math.random()*5+20)
									var r=Math.ceil(Math.random()*(n-2))
									R[i]=comb(n,r)
									
								}while(repetido(R))
							}
							return [P,R]
						}
						function P2(x){
							var n=Math.ceil(Math.random()*5+20)
							var r=Math.ceil(Math.random()*(n-4)+2)
							
							var P="Calcula la probabilidad de obtener exactamente "+r+" caras al lanzar "+n+" monedas (suponga que es justa la moneda)."
							
							
							var R=[];
							S=comb(n,r)*Math.pow(0.5,n)
							R[0]=S.toFixed(3);
							if (S<1e-3) R[0]=NotacionCientifica(S)
							var dummy=0;
							for(var i=1;i<6;++i){
								do{
									var p=Math.random()*.4;
									R[i]=Math.random()
									if (22*R[i]<1) R[i]=NotacionCientifica(comb(25,1)*Math.pow(p,n))
									else if (22*R[i]>21) R[i]=(1).toFixed(3)
									else R[i]=R[i].toFixed(3)
								}while(repetido(R))
							}
							return [P,R]
						}
						function P3(x){
							var n=Math.ceil(Math.random()*5+20)
							var p=Math.random().toFixed(3)
							var r=Math.ceil(Math.random()*(n-2))
							
							var P="La probabilidad de que un auto vaya a exceso de velocidad por una autopista en particular es de "
								P+=p+", si han pasado "+n+" autos, cuál es la probabilidad de que al menos "+r+" autos iban a exceso de velocidad.";
							S=0
							for(var k=r;k<=n;++k) S+=comb(n,k)*Math.pow(p,k)*Math.pow(1-p,n-k)
							
							var R=[];
							R[0]=S.toFixed(3);
							if (S<1e-3) R[0]=NotacionCientifica(S)
							var dummy=0;
							for(var i=1;i<6;++i){
								do{
									
									R[i]=Math.random().toFixed(3)
									if (22*R[i]<1) R[i]=NotacionCientifica(comb(25,1)*Math.pow(p,k)*Math.pow(1-p,n-k))
									else if (22*R[i]>21) R[i]=(1).toFixed(3)
									
									
								}while(repetido(R))
							}
							return [P,R]
						}
						function P4(x){
							var n=Math.ceil(Math.random()*5+20)
							var p=Math.random().toFixed(3)
							var r=Math.ceil(Math.random()*(n-2))
							
							var P="La probabilidad de que una persona compre refresco de la marca X en vez de la competencia es de "
								P+=p+", si "+n+" personas compraron refresco, cuál es la probabilidad de que a lo más "+r+" personas hayan preferido la marca X.";
							S=0
							for(var k=0;k<=r;++k) S+=comb(n,k)*Math.pow(p,k)*Math.pow(1-p,n-k)
							
							var R=[];
							
							
							R[0]=S.toFixed(3);
							if (S<1e-3) R[0]=NotacionCientifica(S)
							var dummy=0;
							for(var i=1;i<6;++i){
								do{
									
									R[i]=Math.random().toFixed(3)
									if (22*R[i]<1) R[i]=NotacionCientifica(comb(25,1)*Math.pow(p,k)*Math.pow(1-p,n-k))
									else if (22*R[i]>21) R[i]=(1).toFixed(3)
									
									
								}while(repetido(R))
							}
							return [P,R]
						}
						function P5(x){
							
							
							var p=[Math.random(), Math.random(), Math.random(), Math.random(),Math.random(),Math.random()];
							var S=0
							
							for(var k=0;k<6;++k) S+=p[k];
							for(var k=0;k<5;++k) p[k]=(100*p[k]/S).toFixed(1)
							p[5]=(100-(
									eval(p[0])+
									eval(p[1])+
									eval(p[2])+
									eval(p[3])+
									eval(p[4]))).toFixed(1)
							var P="La siguiente tabla muestra el porcentaje de las familias y la cantidad de hijos";
							P+="<center><table><tr><td>porcentaje</td><td>Hijos</td></tr>"
							for(var k=0;k<6;++k) P+="<tr><td>"+p[k]+"%</td><td>"+k+"</td></tr>"
							P+="</table></center> Calcule la esperanza de número de hijo por familia."
							S=0
							
							for(var k=0;k<6;++k) S+=k*p[k]/100
							var R=[];
							
							
							R[0]=S.toFixed(2);
							
							var dummy=0;
							var n=Math.ceil(Math.random()*5+20)
							for(var i=1;i<6;++i){
								do{
									
									R[i]=(Math.random()*5).toFixed(2)
									
								}while(repetido(R))
							}
							
							return [P,R]
						}
						function P6(x){
							var n=Math.ceil(Math.random()*5+20)
							var p=Math.random().toFixed(3)
							var r=Math.ceil(Math.random()*(n-10)+5)
							var R=Math.ceil(Math.random()*(n-r-1)+r+1)
							
							var P="La probabilidad de que un árbol sobreviva más de un año es de "
								P+=p+", si  se toma una muestra de "+n+" árboles calcula la probabilidad de que hayan sobrevivido entre "+r+" a "+R+" árboles.";
							S=0
							for(var k=r;k<=R;++k) S+=comb(n,k)*Math.pow(p,k)*Math.pow(1-p,n-k)
							
							var R=[];
							
							
							R[0]=S.toFixed(3);
							if (S<1e-3) R[0]=NotacionCientifica(S)
							var dummy=0;
							for(var i=1;i<6;++i){
								do{
									
									R[i]=Math.random().toFixed(3)
									if (22*R[i]<1) R[i]=NotacionCientifica(comb(25,1)*Math.pow(p,k)*Math.pow(1-p,n-k))
									if (22*R[i]>21) R[i]=(1).toFixed(3)
									
								}while(repetido(R))
							}
							return [P,R]
						}
function PreguntaTema(){
	const a=Math.random()
	if(a<1/5){
		return P1(1)
	}else if(a<2/5){
		return P2(1)
	}else if(a<3/5){
		return P3(1)
	}else if(a<4/5){
		return P4(1)
	}else if(a<9/10){
		return P5(1)
	}else{
		return P6(1)
	}
}
//Final
let C=abrirPregunta()
let [P,R]=PreguntaTema()
spanContenido(P,C[6])
// C[6].innerHTML=P
for(let k=0;k<6;++k) spanContenido(R[k],C[k])
					}
				},
				{
					Nombre:"Distribución Binomial II",
					Nota:"",
					fun:function(){
						let n = Math.round( Math.random()*17+3 )
						let r = Math.round( Math.random()*n )
						let p = Math.round( Math.random()*950+50)/1000

						
						let C=abrirPregunta()
						
						spanContenido(`Considere $X\\sim B(${n},${p.toPrecision(3)})$, calcule $P(X = ${r})$.`,C[6])
						const R=[`$${M_binomialpdf(n,p,r).toPrecision(3)}$`]
					for(let i=1;i<6;++i){
						do{
							p = Math.round( Math.random()*950+50)/1000
							r = Math.round( Math.random()*n )
							R[i]=`$${M_binomialpdf(n,p,r).toPrecision(3)}$`
						}while(repetido(R))
					}

						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
					}
				},{
					Nombre:"Distribución Binomial Acumulada",
					Nota:"",
					/*
					M_binomialcdf_R(n,p,xL,xU)

					*/
					fun:function(){
						let n = Math.round( Math.random()*17+6 )
						let li = Math.round( Math.random()*n )
						let lu = Math.round( Math.random()*n )
						let p = Math.round( Math.random()*950+50)/1000
						let legenda=`Error!`
						if(li>lu){
							[li,lu]=[lu,li]
						}

						if(li==lu){
							legenda = `X=${li}`
						}else if(li==0){
							legenda = `X&gt;${lu}`
						}else if(li==n){
							legenda = `X&lt;${li}`
						}else{
							legenda = `${Math.random()<0.5?`${li}\\leq `:`${li-1}&lt;`} X 
							${Math.random()<0.5?`\\leq ${lu} `:`&lt; ${lu+1}`}`
						}
						let C=abrirPregunta()
						
						spanContenido(`Considere $X\\sim B(${n},${p.toPrecision(3)})$, calcule $P(${legenda} )$.`,C[6])
						const R=[`$${M_binomialcdf_R(n,p,li,lu).toPrecision(3)}$`]
					for(let i=1;i<6;++i){
						do{
							li = Math.round( Math.random()*n )
							lu = Math.round( Math.random()*n )
							if(li>lu){
								[li,lu]=[lu,li]
							}
							R[i]=`$${M_binomialcdf_R(n,p,li,lu).toPrecision(3)}$`
						}while(repetido(R))
					}

						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
					}
				},{
					Nombre:"Esperanza matemática (General)",
					Nota:"$E(X)=\\sum_\\limits{i\\in I} P(X=x_i)\\cdot W_i$",
					/*
					M_binomialcdf_R(n,p,xL,xU)

					*/
					fun:function(){
						function crearTablas(){
							let W = [Math.round(Math.random()*300)]
							let P = [Math.round(Math.random()*10-5)] 
							let d =Math.round(Math.random()*3+1)
							while(sum(W)<1000){
								W.push(Math.round(Math.random()*300))
								P.push(P.length-1+d)
								if(sum(W)>1000){
									d=sum(W)-1000
									W[W.length-1] += -d
								}
							}
							for(let k=0;k<W.length;++k) W[k] /= 1000
							return[W,P]
						}
						let C=abrirPregunta()
						let T=crearTablas()

						
						spanContenido(`Calcule $E(X)$ de la siguiente tabla<br><center>${tablaDatos(T,['$P(X=x)$','$x$'])}</center>.`,C[6])
						//vamos a calcular la esperanza matemática como una función
						const R=[`$${E(T).toPrecision(3)}$`]
					for(let i=1;i<6;++i){
						do{
							T=crearTablas()
							R[i]=`$${E(T).toPrecision(3)}$`
						}while(repetido(R))
					}

						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
					}
				}
				
			]
		},
		{
			Nombre:"Línea de mejor ajuste",
			test:[
				{
					Nombre:"Covarianza",
					Nota:"$S_{xy}=\\frac{\\sum xy}{n}-\\overline{x}\\cdot\\overline{y}$",
					fun:function(){
						function P1(x){
							do{
								var a=Math.random()*10-5
							}while(Math.abs(a)<0.5)
							var b=Math.random()*10-5
							var e=Math.random()+0.5;
							
						
							var x=[(Math.random()*10-5).toFixed(1)]
							var y=[(a*eval(x[0])+b+e*(Math.random()-0.5)).toFixed(1)]
							var tablex='<table style="border-spacing: 15px;"><tr><td style="border-right:solid black 2px">x</td><td>'+x[0]+"</td>"
							var tabley='</tr><tr><td style="border-right:solid black 2px">y</td><td>'+y[0]+"</td>"
							
							
							
							
							
							var n=Math.round(Math.random()*5+5)
							for(var k=1;k<n;++k){
								x[k]=(eval(x[k-1])+Math.random()*3).toFixed(1)
								y[k]=(a*eval(x[k])+b+e*(Math.random()-0.5)).toFixed(1)
								tablex+="<td>"+x[k]+"</td>"
								tabley+="<td>"+y[k]+"</td>"
							}
							var Sxy=M_covarianza(M_AS2N(x),M_AS2N(y))
							
							
							var P="Obtenga la covarianza de los siguientes datos <br><center>"+tablex+tabley+"</tr></table></center>"
							var R=[];
							
							R[0]=Sxy.toFixed(2)
							for(var i=1;i<6;++i){
								do{
									R[i]=((1+.3*(Math.random()-0.5))*Sxy).toFixed(2)
										
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
					Nombre:"Línea de regresión parte I",
					Nota:"$$S_{xy}=\\frac{\\sum xy}{n}-\\overline{x}\\cdot\\overline{y}$$ $$ m=\\frac{S_{xy}}{S_x^2} $$					$$ b=\\overline{y}-m\\cdot \\overline{x} $$					Nota: recuerde que en fórmula de la pendiente no se usa $S_x$ sino $\\sigma_x$",
					fun:function(){
						function P1(x){
							do{
								var a=Math.random()*10-5
							}while(Math.abs(a)<0.5)
							var b=Math.random()*10-5
							var e=Math.random()+0.5;
							
						
							var x=[(Math.random()*10-5).toFixed(1)]
							var y=[(a*eval(x[0])+b+e*(Math.random()-0.5)).toFixed(1)]
							//var tablex='<table style="border-spacing: 15px;"><tr><td style="border-right:solid black 2px">x</td><td>'+x[0]+"</td>"
							//var tabley='</tr><tr><td style="border-right:solid black 2px">y</td><td>'+y[0]+"</td>"
							
							
							var n=Math.round(Math.random()*5+5)
							for(var k=1;k<n;++k){
								x[k]=(eval(x[k-1])+Math.random()*3).toFixed(1)
								y[k]=(a*eval(x[k])+b+e*(Math.random()-0.5)).toFixed(1)
								//tablex+="<td>"+x[k]+"</td>"
								//tabley+="<td>"+y[k]+"</td>"
							}
							var Sxy=M_covarianza(M_AS2N(x),M_AS2N(y))
							var L=M_LinReg(M_AS2N(x),M_AS2N(y))
							
							
							var P="Obtenga la pendiente de la línea de mejor ajuste a partir de los siguientes datos <br>"+M_2_var_stat(M_AS2N(x),M_AS2N(y))
							var R=[];
							
							R[0]=L[0].toFixed(2)
							for(var i=1;i<6;++i){
								do{
									R[i]=((1+.3*(Math.random()-0.5))*L[0]).toFixed(2)
										
								}while(repetido(R))
							
							}
							return [P,R]
						}
						function P2(x){
								do{
								var a=Math.random()*10-5
							}while(Math.abs(a)<0.5)
							var b=Math.random()*10-5
							var e=Math.random()+0.5;
							
						
							var x=[(Math.random()*10-5).toFixed(1)]
							var y=[(a*eval(x[0])+b+e*(Math.random()-0.5)).toFixed(1)]
							//var tablex='<table style="border-spacing: 15px;"><tr><td style="border-right:solid black 2px">x</td><td>'+x[0]+"</td>"
							//var tabley='</tr><tr><td style="border-right:solid black 2px">y</td><td>'+y[0]+"</td>"
							
							
							var n=Math.round(Math.random()*5+5)
							for(var k=1;k<n;++k){
								x[k]=(eval(x[k-1])+Math.random()*3).toFixed(1)
								y[k]=(a*eval(x[k])+b+e*(Math.random()-0.5)).toFixed(1)
								//tablex+="<td>"+x[k]+"</td>"
								//tabley+="<td>"+y[k]+"</td>"
							}
							var Sxy=M_covarianza(M_AS2N(x),M_AS2N(y))
							var L=M_LinReg(M_AS2N(x),M_AS2N(y))
							
							
							var P="Obtenga la ordenada al origen de la línea de mejor ajuste a partir de los siguientes datos <br>"+M_2_var_stat(M_AS2N(x),M_AS2N(y))
							var R=[];
							
							R[0]=L[1].toFixed(2)
							for(var i=1;i<6;++i){
								do{
									R[i]=(L[1]-0.5+Math.random()).toFixed(2)
										
								}while(repetido(R))
							
							}
							return [P,R]
						}
						function PreguntaTema(){
							const a=Math.random()
							if(a<0.5){
								return P1(1)
							}else {
								return P2(1)
							}
						}
						let C=abrirPregunta()
						let [P,R]=PreguntaTema()
						spanContenido(P,C[6])
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
					}
				},
				{
					Nombre:"Línea de regresión parte II",
					Nota:"$$S_{xy}=\\frac{\\sum xy}{n}-\\overline{x}\\cdot\\overline{y}$$ $$ m=\\frac{S_{xy}}{S_x^2} $$					$$ b=\\overline{y}-m\\cdot \\overline{x} $$					Nota: recuerde que en fórmula de la pendiente no se usa $S_x$ sino $\\sigma_x$",
					fun:function(){
						function P1(x){
							do{
								var a=Math.random()*10-5
							}while(Math.abs(a)<0.5)
							var b=Math.random()*10-5
							var e=Math.random()+0.5;
							
						
							var x=[(Math.random()*10-5).toFixed(1)]
							var y=[(a*eval(x[0])+b+e*(Math.random()-0.5)).toFixed(1)]
							var tablex='<table style="border-spacing: 15px;"><tr><td style="border-right:solid black 2px">x</td><td>'+x[0]+"</td>"
							var tabley='</tr><tr><td style="border-right:solid black 2px">y</td><td>'+y[0]+"</td>"
							
							
							var n=Math.round(Math.random()*10+5)
							for(var k=1;k<n;++k){
								x[k]=(eval(x[k-1])+Math.random()*3).toFixed(1)
								y[k]=(a*eval(x[k])+b+e*(Math.random()-0.5)).toFixed(1)
								tablex+="<td>"+x[k]+"</td>"
								tabley+="<td>"+y[k]+"</td>"
							}
							//var Sxy=M_covarianza(M_AS2N(x),M_AS2N(y))
							var L=M_LinReg(M_AS2N(x),M_AS2N(y))
							
							
							var P="Obtenga la pendiente de la línea de mejor ajuste a partir de los siguientes datos <br><center>"+tablex+tabley+"</tr></table>"
							var R=[];
							
							R[0]=L[0].toFixed(2)
							for(var i=1;i<6;++i){
								do{
									R[i]=((1+.3*(Math.random()-0.5))*L[0]).toFixed(2)
										
								}while(repetido(R))
							
							}
							return [P,R]
						}
						function P2(x){
								do{
								var a=Math.random()*10-5
							}while(Math.abs(a)<0.5)
							var b=Math.random()*10-5
							var e=Math.random()+0.5;
							
						
							var x=[(Math.random()*10-5).toFixed(1)]
							var y=[(a*eval(x[0])+b+e*(Math.random()-0.5)).toFixed(1)]
							var tablex='<table style="border-spacing: 15px;"><tr><td style="border-right:solid black 2px">x</td><td>'+x[0]+"</td>"
							var tabley='</tr><tr><td style="border-right:solid black 2px">y</td><td>'+y[0]+"</td>"
							
							
							var n=Math.round(Math.random()*10+5)
							for(var k=1;k<n;++k){
								x[k]=(eval(x[k-1])+Math.random()*3).toFixed(1)
								y[k]=(a*eval(x[k])+b+e*(Math.random()-0.5)).toFixed(1)
								tablex+="<td>"+x[k]+"</td>"
								tabley+="<td>"+y[k]+"</td>"
							}
							//var Sxy=M_covarianza(M_AS2N(x),M_AS2N(y))
							var L=M_LinReg(M_AS2N(x),M_AS2N(y))
							
							
							var P="Obtenga la ordenada al origen de la línea de mejor ajuste a partir de los siguientes datos <br><center>"+tablex+tabley+"</tr></table>"
							var R=[];
							
							R[0]=L[1].toFixed(2)
							for(var i=1;i<6;++i){
								do{
									R[i]=((1+.3*(Math.random()-0.5))*L[1]).toFixed(2)
										
								}while(repetido(R))
							
							}
							return [P,R]
						}
						function PreguntaTema(){
							const a=Math.random()
							if(a<0.5){
								return P1(1)
							}else {
								return P2(1)
							}
						}
						let C=abrirPregunta()
						let [P,R]=PreguntaTema()
						spanContenido(P,C[6])
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
					}
				},
				{
					Nombre:"Factor de correlación de Pearson",
					Nota:"$S_{xy}=\\frac{\\sum xy}{n}-\\overline{x}\\cdot\\overline{y}$",
					fun:function(){
						function P1(x){
							do{
								var a=Math.random()*10-5
							}while(Math.abs(a)<0.5)
							var b=Math.random()*10-5
							var e=30*(Math.random()+0.5);
							
						
							var x=[(Math.random()*10-5).toFixed(1)]
							var y=[(a*eval(x[0])+b+e*(Math.random()-0.5)).toFixed(1)]
							var tablex='<table style="border-spacing: 15px;"><tr><td style="border-right:solid black 2px">x</td><td>'+x[0]+"</td>"
							var tabley='</tr><tr><td style="border-right:solid black 2px">y</td><td>'+y[0]+"</td>"
							
							
							
							
							
							var n=Math.round(Math.random()*5+5)
							for(var k=1;k<n;++k){
								x[k]=(eval(x[k-1])+Math.random()*3).toFixed(1)
								y[k]=(a*eval(x[k])+b+e*(Math.random()-0.5)).toFixed(1)
								tablex+="<td>"+x[k]+"</td>"
								tabley+="<td>"+y[k]+"</td>"
							}
							const ans=M_FacPearson(M_AS2N(x),M_AS2N(y))
							
							
							var P="Obtenga el valor del factor de correlación de Pearson de los siguientes datos <br><center>"+tablex+tabley+"</tr></table></center>"
							var R=[];
							
							R[0]=ans.toFixed(5)
							for(var i=1;i<6;++i){
								do{
									R[i]=(ans+0.4*(Math.random()-0.5)).toFixed(5)
										
								}while(repetido(R))
							
							}
							return [P,R]
						}
						let C=abrirPregunta()
						let [P,R]=P1()
						spanContenido(P,C[6])
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
					}
				}
			]
		},
		{
			Nombre:"Factor de correlación de Spearman",
			test:[
				{
					Nombre:"Factor de Correlación de Spearman",
					Nota:"$\\rho=1-\\frac{6\\sum d_i^2}{n(n^2-1)}$",
					fun:function(){
						function P1(){
							const a=[], b=[], n=Math.round(Math.random()*5+4)
							const ml=Math.random()*5-2.5
							const bl=Math.random()*20-10
							let Sx="<center><table style='border-spacing: 20px 20px;'><tr><td>$x$</td>"
							let Sy="</tr><tr><td>$y$</td>"
							for(let k=0;k<n;++k){
								a[k]=Math.round(Math.random()*100+3)
								b[k]=Math.round((ml*a[k]+bl)*(0.6+Math.random()*0.8))
								Sx+="<td>"+a[k]+"</td>"
								Sy+="<td>"+b[k]+"</td>"
							}

							const P='Calcule el factor de correlación de Spearman de la siguiente tabla'+Sx+Sy+"</table></center>"
							
						
					var R=[];
					
					R[0]=Spearman(a,b).toFixed(3)
					for(var i=1;i<6;++i){
						do{
							let dummy=R[0]*(.8+Math.random()*.4)
							R[i]=(dummy<-1?-1:(dummy>1?1:dummy)).toFixed(3)
						}while(repetido(R))
					
					}
					return [P,R]
						}
						let C=abrirPregunta()
						let [P,R]=P1()
						spanContenido(P,C[6])
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
					}
				}
			]
		},
		{
			Nombre:"Prueba $\\chi^2$",
			test:[
				{
					Nombre:"Chi cuadrada calculada I",
					Nota:"",
					fun:function(){
						function P1(){
							const F=[]
							const n=Math.ceil(Math.random()*3)
							const m=Math.ceil(Math.random()*4+1)
							let Tdata, data=""
							for(let k=0;k<n;k++){
								F[k]=[]
								Tdata="<tr><td style='border-right:solid black 2px'>$x_"+(k+1)+"$<td>"
								for(let k1=0;k1<m;k1++){ 
									F[k][k1]=Math.ceil(Math.random()*10)
									Tdata+="<td>"+F[k][k1]+"</td>"
								}
								data+=Tdata+"</tr>"
							}
							
							var P="Determina el valor de $\\chi^2_{calc}$ donde los datos observados son:"
								P+="<center><table width='50%' style='padding: 10px;'>"+data+"</table></center>"
							
							
							var R=[];
							const sol=chiCuadradaCal(F)
							R[0]=sol.toFixed(3)
							var dummy=0;
							for(var i=1;i<6;++i){
								do{
									R[i]=(sol+2*Math.random()-1).toFixed(3)
									
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
					Nombre:"Chi cuadrada (tablas)",
					Nota:"",
					fun:function(){
						function P1(){
							const alpha=[0.01,0.05,0.1]
							const dof=Math.ceil(Math.random()*28+1)
							const n=Math.floor(Math.random()*3)
							
							var P="El valor de $\\chi^2_{crít}$ para $\\alpha = "+alpha[n]+"$ con DOF="+dof+" es:"
							
							
							var R=[];
							R[0]=chitablas(dof,alpha[n])
							var dummy=0;
							for(var i=1;i<6;++i){
								do{
									R[i]=chitablas(Math.ceil(Math.random()*28+1),alpha[Math.floor(Math.random()*3)])
									
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
					Nombre:"Chi cuadrada calculada II",
					Nota:"",
					fun:function(){
						function P1(){
							const F=[],Fo=[]
							const n=Math.ceil(Math.random()*3)
							const m=Math.ceil(Math.random()*4+1)
							let Tdata, data=""
							let Tdata2, data2=""
							for(let k=0;k<n;k++){
								F[k]=[]
								Fo[k]=[]
								Tdata="<tr><td style='border-right:solid black 2px'>$x_"+(k+1)+"$<td>"
								Tdata2="<tr><td style='border-right:solid black 2px'>$x_"+(k+1)+"$<td>"
								for(let k1=0;k1<m;k1++){ 
									F[k][k1]=Math.ceil(Math.random()*10)
									Fo[k][k1]=Math.ceil(Math.random()*10)
									Tdata+="<td>"+F[k][k1]+"</td>"
									Tdata2+="<td>"+Fo[k][k1]+"</td>"
								}
								data+=Tdata+"</tr>"
								data2+=Tdata2+"</tr>"
							}
							
							var P="Determina el valor de $\\chi^2_{calc}$ donde los datos observados son:"
								P+="<center><table width='50%' style='padding: 10px;'>"+data+"</table></center>"
								P+="y los datos esperados son:"
								P+="<center><table width='50%' style='padding: 10px;'>"+data2+"</table></center>"
							
							
							var R=[];
							const sol=chiCuadradaCal(F,Fo)
							R[0]=sol.toFixed(3)
							var dummy=0;
							for(var i=1;i<6;++i){
								do{
									R[i]=(sol+2*Math.random()-1).toFixed(3)
									
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
					Nombre:"Chi cuadrada calculada (datos esperados)",
					Nota:"",
					fun:function(){function P1(){
						const F=[]
						const n=Math.ceil(Math.random()*3)
						const m=Math.ceil(Math.random()*4+1)
						let Tdata, data="", total=[], total2=[]
						
						Tdata="<tr><td style='border-right:solid black 2px'><td>"
						for(let k1=0;k1<m;k1++){
							Tdata+="<td>$y_"+(k1+1)+"$</td>"
							total2[k1]=0
						}
						Tdata+="<td>Total</td>"
						data+=Tdata+"</tr>"

						for(let k=0;k<n;k++){
							F[k]=[]
							total[k]=0
							Tdata="<tr><td style='border-right:solid black 2px'>$x_"+(k+1)+"$<td>"
							for(let k1=0;k1<m;k1++){ 
								F[k][k1]=Math.ceil(Math.random()*10)
								total[k]+=F[k][k1]
								total2[k1]+=F[k][k1]
								Tdata+="<td>"+F[k][k1]+"</td>"
							}
							data+=Tdata+"<td>"+total[k]+"</td></tr>"
						}
						const i_n=[Math.floor(Math.random()*n),Math.floor(Math.random()*m)]
						let den, num
						if(n!=1){
						Tdata="<tr><td style='border-right:solid black 2px'>Total<td>"
						total[m]=0
						for(let k1=0;k1<m;k1++){ 
							total[m]+=total2[k1]
							Tdata+="<td>"+total2[k1]+"</td>"
						}
						data+=Tdata+"<td>"+total[m]+"</td></tr>"
						num=total[i_n[0]]*total2[i_n[1]]
						den=total[m]
						}else{
							num=total[0]
							den=m
						}
						
						
						var P="Bajo la suposición que no existe dependencia entre los datos, determine el valor esperado de la columna $y_"+(i_n[1]+1)+"$"+(n==1?"": "y la fila $x_"+(i_n[0]+1)+"$")
							P+="<center><table width='50%' style='padding: 10px;'>"+data+"</table></center>"
						
						var R=[];
						R[0]=(num/den).toFixed(2)
						var dummy=0;
						for(var i=1;i<6;++i){
							do{
								R[i]=(Math.round(num+Math.random()*20-10)/den).toFixed(2)
								
							}while(repetido(R))
						}
						return [P,R]
					}
					let C=abrirPregunta()
					let [P,R]=P1()
					spanContenido(P,C[6])
					for(let k=0;k<6;++k) spanContenido(R[k],C[k])
					}
				}
			]
		},
		{
			Nombre:"Distribución normal",
			test:[
				{
					Nombre: "Distribución normal: Áreas",
					Nota: "Función a usar: normalcdf",
					fun:function(){
						
						
						let C=abrirPregunta()
						let mu=eval((Math.random()*100).toPrecision(3))
						let sx=eval((Math.random()*5+1).toPrecision(3))
						let xu, xl
						do{
							xu=mu+4*(Math.random()-.5)*sx
							xl=mu+4*(Math.random()-.5)*sx
						}while(Math.abs(xu-xl)<.5*sx)
							
						if(xl>xu) [xl,xu]=[xu,xl]
						spanContenido("Calcule el área de la siguiente distribución normal ($X\\sim\\mathcal{N}("+mu.toFixed(1)+", "+sx.toFixed(1)+"^2)$) <br>",C[6])
						C[6].appendChild(NormalGraph([xl,xu,mu,sx]))
						const Res=normalcdf(xl.toPrecision(3),xu.toPrecision(3),mu.toFixed(1),sx.toFixed(1))

						R=[Res.toPrecision(3)]
						for(let i=1;i<6;++i){
							do{
								R[i]=(0.4*(Math.random()-0.5)+Res).toPrecision(3)
							}while(repetido(R))
						}
						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
					}
				},
				{
					Nombre: "Distribución normal: límites (notación)",
					Nota: "Función a usar: invNorm",
					fun:function(){
						let C=abrirPregunta()
						let mu=(Math.random()*100).toFixed(1)
						let sx=(Math.random()*5+1).toFixed(1)
						const label=["LEFT","RIGHT","CENTER"]
						const nl=Math.floor(Math.random()*3)
						let A=(Math.random()*.8+.1).toFixed(2)

						const labelP=["$P(X\\le x_u) = "+A+"$","$P(X\\ge x_l) = "+A+"$","$P(x_l\\le X \\le x_u) = "+A+"$"]
						spanContenido("Calcule "+(nl==0?"$x_u$":(nl==1?"$x_l$":"$x_l$ y $x_u$ (equidistantes con la media)"))
							+" que satisfagan  "+labelP[nl]+" de una $X\\sim\\mathcal{N}("+mu+", "+sx+"^2)$.",C[6])
						const Res=invNorm( A,mu,sx,label[nl])

						const R=[];
							
						R[0]=(nl==2?Res[0].toPrecision(3)+", "+Res[1].toPrecision(3):Res.toPrecision(3))
						let dif=Math.max(1.5*((nl==2?Res[0]:Res)-eval(mu))/eval(sx),6)
						
						
						for(let i=1;i<6;++i){
							do{
								let dummy=dif*(Math.random()-.5)
								//console.log("dummy: "+dummy+", dif: "+dif)
								if(nl==2)
									R[i]=(eval(mu)-Math.abs(dummy)).toPrecision(3)+", "+(eval(mu)+Math.abs(dummy)).toPrecision(3)
								else
									R[i]=(eval(mu)+dummy).toPrecision(3)
								//console.log(R)
							}while(repetido(R))
						}

						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
							
					}
				}
			]
		},{
			Nombre:"T-Student",
			test:[
				{
					Nombre: "Introducción",
					Nota: "",
					fun:function(){
							function P1(x){
								var n=Math.ceil(Math.random()*28+1)
								var r=Math.ceil(Math.random()*(n-2))
								var alpha=[0.1, 0.05, 0.025, 0.01, 0.05]
								var an=2;
								while(an==2)	an=Math.round(Math.random()*3.49)
								var dof=(Math.random()<0.5)?1:2
								var P="Selecciona la <i>t<sub>crit</sub></i> para <i>&alpha;</i>="+(alpha[an])+" con "+n+
										" grados de libertad de "+((dof==1)?"una cola.":"dos colas.")
								
								
								var R=[];
								R[0]=tcrit(alpha[an],n,dof)
								var dummy=0;
								for(var i=1;i<6;++i){
									do{
										do{
											an=Math.round(Math.random()*3.49)
											var n1=Math.round(4*Math.random()-2+n)
											var tail2=Math.round(Math.random()+1)
										}while(an==2)	
										R[i]=tcrit(alpha[an],n1,tail2)
										
									}while(repetido(R))
								}
								return [P,R]
							}
							function P2(x){
							var n=Math.round(Math.random()*10+10);
								var x=[]
								var y=[]
								var M=[0,0];
								
								var p="Calcule el valor de <i>t<sub>calc</sub></i> al realizar la prueba <i>t</i> usando los siguientes"
								p+=" datos<br/> <center><table width='30%'>"
								
								p+="<tr><td><i>n</i></td><td><i>x</i><sub>1</sub></td><td><i>x</i><sub>2</sub></td></tr>";
								for(var i=0;i<n;++i){
									x[i]=Math.round(Math.random()*20+65);
									y[i]=Math.round(Math.random()*20+64);
									p+="<tr><td>"+(i+1)+"</td><td>"+x[i]+"</td><td>"+y[i]+"</td></tr>";
									M[0]+=x[i]
									M[1]+=y[i]
								}
								p+="</table></center>"
								M[0]/=n
								M[1]/=n
								
								
								var s=[0,0]
								for(var i=0;i<n;++i){
									
									s[0]+=(x[i]-M[0])*(x[i]-M[0]);
									s[1]+=(y[i]-M[1])*(y[i]-M[1]);
								}
								s[0]/=(n-1);
								s[1]/=(n-1);
								var t=(M[0]-M[1])/Math.sqrt((s[0]+s[1])/n)
							
								var P=p
								
								var R=[];
								R[0]=t.toFixed(5);
								for(var i=1;i<6;++i){
									do{
										R[i]=(0.5-Math.random()*2+t).toFixed(5)
									}while(repetido(R))
								}
								return [P,R]
							}
							function P3(x){
							var n=Math.round(Math.random()*10+10);
							var n2=Math.round(Math.random()*(n-5)+5);
								var x=[]
								var y=[]
								var M=[0,0];
								
								var p="Calcule el valor de <i>t<sub>calc</sub></i> al realizar la prueba <i>t</i> usando los siguientes"
								p+=" datos<br/> <center><table width='30%'>"
								
								p+="<tr><td><i>n</i></td><td><i>x</i><sub>1</sub></td><td><i>x</i><sub>2</sub></td></tr>";
								for(var i=0;i<n;++i){
									x[i]=Math.round(Math.random()*20+65);
									
									
									M[0]+=x[i]
									if(i<n2){
										y[i]=Math.round(Math.random()*20+64);
										M[1]+=y[i]
									}
									
									p+="<tr><td>"+(i+1)+"</td><td>"+x[i]+"</td><td>"+(i<n2?y[i]:"")+"</td></tr>";
								}
								p+="</table></center>"
								M[0]/=n
								M[1]/=n2
								
								
								var s=[0,0]
								for(var i=0;i<n;++i){
									
									s[0]+=(x[i]-M[0])*(x[i]-M[0]);
									if(i<n2)	s[1]+=(y[i]-M[1])*(y[i]-M[1]);
								}
								s[0]/=(n-1);
								s[1]/=(n2-1);
								var t=(M[0]-M[1])/Math.sqrt(s[0]/n+s[1]/n2)
							
								var P=p
								var R=[];
								R[0]=t.toFixed(5);
								for(var i=1;i<6;++i){
									do{
										R[i]=(0.5-Math.random()*2+t).toFixed(5)
									}while(repetido(R))
								}
								return [P,R]
							}
							function P4(x){
							var n=Math.round(Math.random()*10+10);
							var n2=Math.round(Math.random()*(n-5)+5);
								var x=[]
								var y=[]
								var M=[0,0];
								
								var p="Calcule los grados de libertad al realizar la prueba <i>t</i> usando los siguientes"
								p+=" datos<br/> <center><table width='30%'>"
								
								p+="<tr><td><i>n</i></td><td><i>x</i><sub>1</sub></td><td><i>x</i><sub>2</sub></td></tr>";
								for(var i=0;i<n;++i){
									x[i]=Math.round(Math.random()*20+65);
									
									
									M[0]+=x[i]
									if(i<n2){
										y[i]=Math.round(Math.random()*20+64);
										M[1]+=y[i]
									}
									
									p+="<tr><td>"+(i+1)+"</td><td>"+x[i]+"</td><td>"+(i<n2?y[i]:"")+"</td></tr>";
								}
								p+="</table></center>"
								M[0]/=n
								M[1]/=n2
								
								
								var s=[0,0]
								for(var i=0;i<n;++i){
									
									s[0]+=(x[i]-M[0])*(x[i]-M[0]);
									if(i<n2)	s[1]+=(y[i]-M[1])*(y[i]-M[1]);
								}
								s[0]/=(n-1);
								s[1]/=(n2-1);
								var t=(M[0]-M[1])/Math.sqrt(s[0]/n+s[1]/n2)
							
								var P=p
								var R=[];
								R[0]=n+n2-2;
								for(var i=1;i<6;++i){
									do{
										R[i]=Math.round(n+n2-2+(1-Math.random())*10)
									}while(repetido(R))
								}
								return [P,R]
							}
							
							let C=abrirPregunta()
							let [P,R] =eval(`P${Math.ceil(Math.random()*4)}()`)


							spanContenido(P,C[6])
							for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
						}
				}
				/*
				

				*/
			]
		}
	]

},
{
	Nombre:"Análisis",
	subtema:[
		{
			Nombre:"Introducción al cálculo diferencial",
			test:[
				{
					Nombre:"Máximos y mínimos",
					Nota:"",
					fun:function(){

function P1(x){
	do{
		var a=[	Math.round(10*(Math.random()-.5)),
				Math.round(10*(Math.random()-.5)),
				Math.round(10*(Math.random()-.5)),
				Math.round(10*(Math.random()-.5))]
	}while(a[0]==0 || (4*a[1]*a[1]-12*a[0]*a[2])<0 )
	
	
	var P='Seleccione la fórmula general que permite calcular los máximo y mínimos de la función $f(x)='+a[0]+'x^3 '+(a[1]<0?'-':'+')+Math.abs(a[1])+'x^2 '+(a[2]<0?'-':'+')+Math.abs(a[2])+'x '+(a[3]<0?'-':'+')+Math.abs(a[3])+'$'
		
	var R=[];
	
	R[0]='$\\frac{'+(-2*a[1])+'\\pm\\sqrt{'+(4*a[1]*a[1]-12*a[0]*a[2])+'}}{'+(6*a[0])+'}$'
	for(var i=1;i<6;++i){
		do{
			R[i]='$\\frac{'+(-2*a[1])+'\\pm\\sqrt{'+(4*a[1]*a[1]-12*a[0]*a[2]+Math.round(10*(Math.random()-.5)))+'}}{'+(6*a[0])+'}$'
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
					Nombre:"Aproximación de la derivada",
					Nota:"",
					fun:function(){
						function P1(x){
							do{
								var a=[	Math.round(10*(Math.random()-.5)),
										Math.round(10*(Math.random()-.5)),
										Math.round(10*(Math.random()-.5))]
							}while(a[0]==0)
							var c=Math.round(10*(Math.random()-.5))
							var nh=Math.round(-Math.random()*3)
							var bh=Math.round(Math.random()*8+1)
							var h=bh*Math.pow(10,nh)
							
							var P='Calcule aproximación de la derivada de $f(x)='+a[0]+'x^2 '+(a[1]<0?'-':'+')+' '+Math.abs(a[1])+'x '+(a[2]<0?'-':'+')+' '+Math.abs(a[2])
								+'$ en $x='+c+'$ con un incremento de $h='+bh+'\\times 10^{'+nh+'}$'
								
							var R=[];
							var ans=((a[0]*(c+h)*(c+h)+a[1]*(c+h)+a[2])-(a[0]*c*c+a[1]*c+a[2]))/h
							R[0]=ans.toFixed(3)
							for(var i=1;i<6;++i){
								do{
									var nh=Math.round(-Math.random()*3)
									var bh=Math.round(Math.random()*8+1)
									var h=bh*Math.pow(10,nh)
									var ans=((a[0]*(c+h)*(c+h)+a[1]*(c+h)+a[2])-(a[0]*c*c+a[1]*c+a[2]))/h
									R[i]=ans.toFixed(3)
										
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
					Nombre:"Derivadas directas I",
					Nota:"",
					fun:function(){
						function P1(x){
							let a,b,p,q, dummy
							a=Math.ceil(Math.random()*10)*(Math.random() > 0.5 ? 1 : -1)
							b=Math.ceil(Math.random()*10)
							dummy = tlacu.mcm([a,b])
							a=Math.round(dummy/a)
							b=Math.round(dummy/b)
							
							do{
								p=Math.ceil(Math.random()*5+1)*(Math.random() > 0.5 ? 1 : -1)
								q=Math.ceil(Math.random()*6+1)	
								dummy = tlacu.mcm([Math.round(p),Math.round(q)])
								p=Math.round(dummy/p)
								q=Math.round(dummy/q)
								console.log("p: "+p+", q: "+q)
							}while(q==1)
							
							let P=`Determine la derivada de ${tlacu.poli.raiz(a, b, "x", p, q)}.`
								
							const R=[];
							let ans=[a*p,b*q,p-q,q]
							const op=Math.floor(Math.random()*4)
							
							R[0]=tlacu.poli.raiz(ans[0], ans[1], "x", ans[2], ans[3])
							
							for(let k=1;k<6;++k){
								do{
									ans[op]+=Math.ceil(Math.random()*4)*(Math.random() > 0.5 ? 1 : -1)
								R[k]=tlacu.poli.raiz(ans[0], ans[1], "x", ans[2], ans[3])
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
					Nombre:"Derivadas directas II",
					Nota:"",
					fun:function(){
						function P1(x){
							let a=1,b=1,p, dummy
							while(b==1 || a==1){
								a=Math.ceil(Math.random()*10)*(Math.random() > 0.5 ? 1 : -1)
								b=Math.ceil(Math.random()*10+1)
								dummy = tlacu.mcm([a,b])
								a=Math.round(dummy/a)
								b=Math.round(dummy/b)
							}

							p=Math.ceil(Math.random()*5+1)*(Math.random() > 0.5 ? 1 : -1)
							dummy = (p>0)?`${a<0?'-':''} \\frac{ ${Math.abs(a)} x${p==1?'':`^{${p}}`}}{${b}}`:`${a<0?'-':''}\\frac{ ${Math.abs(a)} }{${b} x${p==-1?'':`^{${-p}}`} }`
							

							let P=`Determine la derivada de $ ${dummy} $.`
							
							
							a *= p
							p -= 1
							dummy = (p>0)?`${a<0?'-':''} \\frac{ ${Math.abs(a)} x${p==1?'':`^{${p}}`}}{${b}}`:`${a<0?'-':''}\\frac{ ${Math.abs(a)} }{${b} x${p==-1?'':`^{${-p}}`} }`
							const R=[];
							//let ans=[a*p,b*q,p-q,q]
							const op=Math.floor(Math.random()*3)
							
							R[0]=`$ ${dummy} $`
							
							for(let k=1;k<6;++k){
								do{
									switch(op){
										case 0:
											a += Math.ceil(Math.random()*4)*(Math.random() > 0.5 ? 1 : -1)
											break;
										case 1:
											b +=Math.abs( Math.ceil(Math.random()*4)*(Math.random() > 0.5 ? 1 : -1))
											break;
										case 2:
											p += Math.ceil(Math.random()*4)*(Math.random() > 0.5 ? 1 : -1)
											break;
									}
								dummy = (p>0)?`${a<0?'-':''} \\frac{ ${Math.abs(a)} x${p==1?'':`^{${p}}`}}{${b}}`:`${a<0?'-':''}\\frac{ ${Math.abs(a)} }{${b} x${p==-1?'':`^{${-p}}`} }`
								R[k]=`$ ${dummy} $`
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
					Nombre:"Comportamiento de la derivada",
					Nota:"",
					fun:function(){
						function P1(x){
							function poly(y0,yp0,ya,ypa,mx,bx,h){
								let a=5;
								let omega=[(ya-yp0*a-y0)/(a*a), (ypa-yp0)/a]
							
								
								var alfa=[(omega[1]-2*omega[0])/a, 3*omega[0]-omega[1],yp0, y0]
								var n=100;
								var x=[]
								var y=[]
								var sr=''
								for(var k=0;k<n;++k){//Horner evaluation
									x[k]=a*k/n;
									y[k]=alfa[0];
									for(var j=1;j<4;++j) y[k]=y[k]*x[k]+alfa[j];
									sr+=(mx*(x[k]-h)+bx)+', '+(-mx*2*y[k]+bx)+' '
								}
								return [sr,6*alfa[0]*a+2*alfa[1]]
							}
							function polyII(y0,yp0,ya,ypa,mx,bx,ypp0){
								var a=5;
							
								var alfa=[(ya-(ypp0*a*a/2+yp0*a+y0))/(a*a*a), ypp0/2,yp0, y0]
								var n=100;
								var x=[]
								var y=[]
								var sr=''
								for(var k=0;k<n;++k){//Horner evaluation
									x[k]=a*k/n;
									y[k]=alfa[0];
									for(var j=1;j<4;++j) y[k]=y[k]*x[k]+alfa[j];
									sr+=(mx*x[k]+bx)+', '+(-mx*2*y[k]+bx)+' '
								}
								return sr
							}
							function polyII2(y0,yp0,ya,ypa,mx,bx,ypp0){
								var a=5;
							
								var alfa=[3*(ya-(ypp0*a*a/2+yp0*a+y0))/(a*a*a), ypp0,yp0]
								var n=100;
								var x=[]
								var y=[]
								var sr=''
								for(var k=0;k<n;++k){//Horner evaluation
									x[k]=a*k/n;
									y[k]=alfa[0];
									for(var j=1;j<3;++j) y[k]=y[k]*x[k]+alfa[j];
									sr+=(mx*x[k]+bx)+', '+(-mx*2*y[k]+bx)+' '
								}
								return sr
							}
							function poly2(y0,yp0,ya,ypa,mx,bx,h){
								var a=5;
								var omega=[(ya-yp0*a-y0)/(a*a), (ypa-yp0)/a]
							
								
								var alfa=[3*((omega[1]-2*omega[0])/a), 2*(3*omega[0]-omega[1]),yp0]
								var n=100;
								var x=[]
								var y=[]
								var sr=''
								for(var k=0;k<n;++k){//Horner evaluation
									x[k]=a*k/n;
									y[k]=alfa[0];
									for(var j=1;j<3;++j) y[k]=y[k]*x[k]+alfa[j];
									sr+=(mx*(x[k]-h)+bx)+', '+(-mx*2*y[k]+bx)+' '
								}
								return sr
							}
							var mx=20
							var bx=110
							var y0=2*(0.5-Math.random())
							var yp0=2*(0.5-Math.random())
							var ya=2*(0.5-Math.random())
							var ypa=2*(0.5-Math.random())
							var yb=2*(0.5-Math.random())
							var ypb=2*(0.5-Math.random())
							dummy =poly(y0,yp0,ya,ypa,mx,bx,5)
							q=dummy[1]
							sr=dummy[0]
							sr+=polyII(ya,ypa,yb,ypb,mx,bx,q)
							sr2 =poly2(y0,yp0,ya,ypa,mx,bx,5)
							sr2+=polyII2(ya,ypa,yb,ypb,mx,bx,q)
							
							
						
						
							
							var P="Determine un bosquejo de la derivada de la siguiente función"
								P+='<center><svg width="'+(mx*11)+'px" height="'+(mx*11)+'">'
								//for(var i=-5;i<6;++i)	P+='<line x1="'+(mx*i+bx)+'" y1="0" x2="'+(mx*i+bx)+'" y2="'+(mx*11)+'" style="stroke:gray;stroke-width:2"> </line><line y1="'+(mx*i+bx)+'" x1="0" y2="'+(mx*i+bx)+'" x2="'+(mx*11)+'" style="stroke:gray;stroke-width:2"> </line>'
								P+='<line y1="'+(bx)+'" x1="0" y2="'+(bx)+'" x2="'+(mx*11)+'" style="stroke:black;stroke-width:2"> </line><polyline points="'+sr+'" style="fill:none;stroke:blue;stroke-width:3" /></svg></center>'
								
							var R=[];
							
							R[0]='<center><svg style="border: solid gray 1px" width="'+(mx*11)+'px" height="'+(mx*11)+'">'
							//for(var i=-5;i<6;++i) R[0]+='<line x1="'+(mx*i+bx)+'" y1="0" x2="'+(mx*i+bx)+'" y2="'+(mx*11)+'" style="stroke:gray;stroke-width:2"> </line><line y1="'+(mx*i+bx)+'" x1="0" y2="'+(mx*i+bx)+'" x2="'+(mx*11)+'" style="stroke:gray;stroke-width:2"> </line>'
							R[0]+='<line y1="'+(bx)+'" x1="0" y2="'+(bx)+'" x2="'+(mx*11)+'" style="stroke:black;stroke-width:2"> </line><polyline points="'+sr+'" style="fill:none;stroke:blue;stroke-width:3" /><polyline points="'+sr2+'" style="fill:none;stroke:red;stroke-width:3" /></svg></center>'
							
							for(var ii=1;ii<6;++ii){
								
								do{
									
										var y0=2*(0.5-Math.random())
							var yp0=2*(0.5-Math.random())
							var ya=2*(0.5-Math.random())
							var ypa=2*(0.5-Math.random())
							var yb=2*(0.5-Math.random())
							var ypb=2*(0.5-Math.random())
							dummy =poly(y0,yp0,ya,ypa,mx,bx,5)
							q=dummy[1]
							sr2 =poly2(y0,yp0,ya,ypa,mx,bx,5)
							sr2+=polyII2(ya,ypa,yb,ypb,mx,bx,q)
								
								
								
								
								//
								R[ii]='<center><svg style="border: solid gray 1px" width="'+(mx*11)+'px" height="'+(mx*11)+'">'
							//for(var i=-5;i<6;++i) R[ii]+='<line x1="'+(mx*i+bx)+'" y1="0" x2="'+(mx*i+bx)+'" y2="'+(mx*11)+'" style="stroke:gray;stroke-width:2"> </line><line y1="'+(mx*i+bx)+'" x1="0" y2="'+(mx*i+bx)+'" x2="'+(mx*11)+'" style="stroke:gray;stroke-width:2"> </line>'
							R[ii]+='<line y1="'+(bx)+'" x1="0" y2="'+(bx)+'" x2="'+(mx*11)+'" style="stroke:black;stroke-width:2"> </line><polyline points="'+sr+'" style="fill:none;stroke:blue;stroke-width:3" /><polyline points="'+sr2+'" style="fill:none;stroke:red;stroke-width:3" /></svg></center>'
									
								}while(repetido(R))
							}
							return [P,R]
						}
						

					let C=abrirPregunta()
					let [P,R]=P1()
					spanContenido(P,C[6])
					for(let k=0;k<6;++k) spanContenido(R[k],C[k])
					}
				}
			]
		},
		{
			Nombre:"Introducción al cálculo integral",
			test:[
				{
					Nombre:"Método del trapecio",
					Nota:"$\\int_a^bf(x)dx\\approx \\frac{1}{2}h \\left( f(a)+f(b)+2(f(a+h)+f(a+2h)+\\dots f(a+(n-1)h)) \\right)$<br>Alternativa<br>$\\int_a^bf(x)dx\\approx h\\left( \\frac{f(a)+f(b)}{2}+\\sum_{k=1}^{n-1}f(a+k\\cdot h)\\right) $",
					fun:function(){
						function P1(){
							const a=Math.round(Math.random()*10-5)
							const b=a+Math.round(Math.random()*5+1)
							const poly=[	Math.round(Math.random()*5+2),
											Math.round(Math.random()*5+2),
											Math.round(Math.random()*5+2),
											Math.round(Math.random()*5+2)]
							const dummy=[1,2,4,5]
							let n
							do{
								n=dummy[Math.floor(Math.random()*4.9)]*(b-a)
							}while(n>10 || isNaN(n))

							const P='Usando el método del trapecio, estime el área bajo la curva de $f(x) = '+poly[0]+'x^3+'+poly[1]+'x^2+'+poly[2]+'x+'+poly[3]+'$ para $x\\in('+a+', '+b+')$ con $n = '+n+'$'
							let h=(b-a)/n
							let S=(poly[0]*a*a*a+poly[1]*a*a+poly[2]*a+poly[3])
							S+=(poly[0]*b*b*b+poly[1]*b*b+poly[2]*b+poly[3])
							S/=2
							for(let k=1;k<n;++k) S+=(poly[0]*(a+k*h)*(a+k*h)*(a+k*h)+poly[1]*(a+k*h)*(a+k*h)+poly[2]*(a+k*h)+poly[3])
						
					var R=[];
					
					R[0]=(h*S).toFixed(3)
					for(var i=1;i<6;++i){
						do{
							
							R[i]=(h*S+Math.round(Math.random()*10-5)).toFixed(3)
						}while(repetido(R))
					
					}
					
					return [P,R]
						}
						let C=abrirPregunta()
						let [P,R]=P1()
						spanContenido(P,C[6])
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
					}
				}
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

/*
function(){
						let C=abrirPregunta()
						
						spanContenido("Pregunta",C[6])
						const R=[];
						for(let i=1;i<6;++i){
							do{

							}while(repetido(R))
						}
						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
					}
*/