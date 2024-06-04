const tema = [{
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
			Nombre:"Notación científica",
			test:[
				{
					Nombre:"Ejercicios de notación científica",
					Nota:"",
					fun:function(){
	
	function P1(){
	do{
		var a=Math.round(Math.random()*9998+2)

	}while((Math.sqrt(a)-Math.round(Math.sqrt(a)))==0)
	var cs=Math.round(Math.random()*2+1)
	
	var P="Calcule el porcentaje de error de $\\sqrt{"+a+"}$ y "+Math.sqrt(a).toFixed(cs)+"."
	
	ve=Math.sqrt(a)
	va=eval(Math.sqrt(a).toFixed(cs))
	
	
	var R=[];
	R[0]=NotacionCientifica(Math.abs(ve-va)/ve*100)+" %"
	var dummy=0;
	for(var i=1;i<6;++i){
		do{
			a=Math.round(Math.random()*9998+2)
			ve=Math.sqrt(a)
			va=eval(Math.sqrt(a).toFixed(cs))
			R[i]=NotacionCientifica(Math.abs(ve-va)/ve*100)+" %"
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
					Nombre:"División de polinomios",
					Nota:"",
					fun:function(){
						/*Inicio*/
						function multiply(a1, a2) {
							var result = [];
							a1.forEach(function (a, i) {
								a2.forEach(function (b, j) {
									result[i + j] = (result[i + j] || 0) + a * b;
								});
							});
							return result;
						}
						function polinomio(v){
							const n=v.length;
							let S
							if(n==1){ S=(v[0]<0?"-":"")+" "+Math.abs(v[0])
							}else if(n==2){ S=(v[0]<0?"-":"")+" "+Math.abs(v[0])+" x"
							}else S=(v[0]<0?"-":"")+" "+Math.abs(v[0])+" x^{"+(n-1)+"}"

							for(var k=1;k<n;++k){
								if(k==n-1){ S+=(v[k]<0?"-":"+")+" "+Math.abs(v[k])
								}else if(k==n-2){ S+=(v[k]<0?"-":"+")+" "+Math.abs(v[k])+" x"
								}else S+=(v[k]<0?"-":"+")+" "+Math.abs(v[k])+" x^"+(n-k-1)
							}
							return S
						}
						function P1(x){
							var a=[Math.round(Math.random()*19-9),Math.round(Math.random()*19-9)]
							var b=[Math.round(Math.random()*19-9),Math.round(Math.random()*19-9),Math.round(Math.random()*19-9)]
								
							
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
						/*Inicio*/
						function multiply(a1, a2) {
							var result = [];
							a1.forEach(function (a, i) {
								a2.forEach(function (b, j) {
									result[i + j] = (result[i + j] || 0) + a * b;
								});
							});
							return result;
						}
						function polinomio(v){
							const n=v.length;
							let S
							if(n==1){ S=(v[0]<0?"-":"")+" "+Math.abs(v[0])
							}else if(n==2){ S=(v[0]<0?"-":"")+" "+Math.abs(v[0])+" x"
							}else S=(v[0]<0?"-":"")+" "+Math.abs(v[0])+" x^{"+(n-1)+"}"
							//=(v[0]<0?"-":"")+" "+Math.abs(v[0])+" x";
							
							for(var k=1;k<n;++k){
								if(k==n-1){ S+=(v[k]<0?"-":"+")+" "+Math.abs(v[k])
								}else if(k==n-2){ S+=(v[k]<0?"-":"+")+" "+Math.abs(v[k])+" x"
								}else S+=(v[k]<0?"-":"+")+" "+Math.abs(v[k])+" x^"+(n-k-1)
							}
							return S
						}
						function P1(x){
							var a=[Math.round(Math.random()*19-9),Math.round(Math.random()*19-9)]
							var b=[Math.round(Math.random()*19-9),Math.round(Math.random()*19-9),Math.round(Math.random()*19-9)]
								
							
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
						function multiply(a1, a2) {
							var result = [];
							a1.forEach(function (a, i) {
								a2.forEach(function (b, j) {
									result[i + j] = (result[i + j] || 0) + a * b;
								});
							});
							return result;
						}
						function polinomio(v){
							const n=v.length;
							let S
							if(n==1){ S=(v[0]<0?"-":"")+" "+Math.abs(v[0])
							}else if(n==2){ S=(v[0]<0?"-":"")+" "+Math.abs(v[0])+" x"
							}else S=(v[0]<0?"-":"")+" "+Math.abs(v[0])+" x^{"+(n-1)+"}"
							//=(v[0]<0?"-":"")+" "+Math.abs(v[0])+" x";
							
							for(var k=1;k<n;++k){
								if(k==n-1){ S+=(v[k]<0?"-":"+")+" "+Math.abs(v[k])
								}else if(k==n-2){ S+=(v[k]<0?"-":"+")+" "+Math.abs(v[k])+" x"
								}else S+=(v[k]<0?"-":"+")+" "+Math.abs(v[k])+" x^"+(n-k-1)
							}
							return S
						}
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
				}
			]
		},
		{
			Nombre:"Diferentes formas de expresar la ecuación de una recta",
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
				},
				{
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
					const x = linspaceMorin(-10,10,200)
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
					const x = linspaceMorin(-10,10,200)
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

					const x = linspaceMorin(-10,10,200)
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
					
function P1(x){
	var axis=[-6, 6, -10, 10, 2, 2, 1, 1]
	var dim=[500, 300]
	do{
		var x=[0, Math.round(Math.random()*10-5)]
		var y=(Math.random()<0.5?[Math.round(Math.random()*3-10)]:[Math.round(10-Math.random()*3)])
		if(y[0]<0){
			y[1]=y[0]+Math.round(Math.random()*5+1)
			y[2]=y[0]+Math.round(Math.random()*5+1)
		}else{
			y[1]=y[0]-Math.round(Math.random()*5+1)
			y[2]=y[0]-Math.round(Math.random()*5+1)
		}
	}while(x[1]==0 || y[1]==y[2])
	
	var Lienzo=plotExpPo(axis,dim,x,y,'#ffa200','#222')
	
	
	
	var P="Determine la función exponencial que aparece a continuación<br><center>"+Lienzo+"</center>"
		var E=Exp2fun(x,y)
	var R=[];
	
	R[0]="<b><i>f</i> (<i>x</i>)="+E[0]+" · "+E[1].toFixed(3)+"<sup><i>x</i></sup> "+(E[2]<0?"-":"+")+Math.abs(E[2])+"</b></i>"
	for(var i=1;i<6;++i){
		do{
			var qq=Math.random()
			if(qq<0.5)
				R[i]="<b><i>f</i> (<i>x</i>)="+E[0]+" · "+E[1].toFixed(3)+"<sup><i>x</i></sup> "+(E[2]<0?"-":"+")+Math.abs(Math.round(E[2]+Math.random()*10-5))+"</b></i>"
			else
				R[i]="<b><i>f</i> (<i>x</i>)="+Math.round(E[0]+Math.random()*10-5)+" · "+E[1].toFixed(3)+"<sup><i>x</i></sup> "+(E[2]<0?"-":"+")+Math.abs(E[2])+"</b></i>"
				
		}while(repetido(R))
	
	}
	return [P,R]
}
function P2(x){
	var axis=[-6, 6, -10, 10, 2, 2, 1, 1]
	var dim=[500, 300]
	do{
		var x=[0, Math.round(Math.random()*10-5)]
		var y=(Math.random()<0.5?[Math.round(Math.random()*3-10)]:[Math.round(10-Math.random()*3)])
		if(y[0]<0){
			y[1]=y[0]+Math.round(Math.random()*5+1)
			y[2]=y[0]+Math.round(Math.random()*5+1)
		}else{
			y[1]=y[0]-Math.round(Math.random()*5+1)
			y[2]=y[0]-Math.round(Math.random()*5+1)
		}
	}while(x[1]==0 || y[1]==y[2])
	
	var Lienzo=plotExpPo(axis,dim,x,y,'#ffa200','#222')
	
	
	
	var P="Determine la función exponencial que aparece a continuación<br><center>"+Lienzo+"</center>"
		var E=Exp2fun(x,y)
	var R=[];
	
	R[0]="<b><i>f</i> (<i>x</i>)="+E[0]+" · "+E[1].toFixed(3)+"<sup><i>x</i></sup> "+(E[2]<0?"-":"+")+Math.abs(E[2])+"</b></i>"
	for(var i=1;i<6;++i){
		do{
			R[i]="<b><i>f</i> (<i>x</i>)="+E[0]+" · "+(E[1]+Math.random()*1.5-.75).toFixed(3)+"<sup><i>x</i></sup> "+(E[2]<0?"-":"+")+Math.abs(E[2])+"</b></i>"
		}while(repetido(R))
	
	}
	return [P,R]
}
function Exp2fun(xp,yp){
		var a=yp[1]-yp[0]
		var c=yp[0]
		var b=Math.pow((yp[2]-yp[0])/(yp[1]-yp[0]),1/xp[1])
		return [a,b,c]
	}
function plotExpPo(axis,dim,xp,yp,color,color2){
	/*
	*
	* axis([xmin xmax ymin ymax xscal yscal])
	* dim([height width])
	* 
	*/
	function Exp2points(x,xp,yp){
		var a=yp[1]-yp[0]
		var c=yp[0]
		var b=Math.pow((yp[2]-yp[0])/(yp[1]-yp[0]),1/xp[1])
		var y=[]
		for(var k=0;k<x.length;++k) y[k]=a*Math.pow(b,x[k])+c
		return y
	}
	var h=10
	var my=-dim[0]/(axis[3]-axis[2])
	var by=h-my*axis[3]
	var mx=dim[1]/(axis[1]-axis[0])
	var bx=h-mx*axis[0]
	var csx=Math.log10(axis[4])<0?Math.ceil(-Math.log10(axis[4])):0
	var csy=Math.log10(axis[5])<0?Math.ceil(-Math.log10(axis[4])):0
	//alert(csx)
	
	
	var S="<svg width="+(dim[1]+2*h)+" height="+(dim[0]+2*h)+">"
	for( var k=Math.floor(axis[0]/axis[6])*axis[6];k<=Math.ceil(axis[1]/axis[6])*axis[6];k+=axis[6])
		S+='<line x1="'+(mx*k+bx)+'" y1="'+(my*axis[2]+by)+'" x2="'+(mx*k+bx)+'" y2="'+(my*axis[3]+by)+'" stroke="'+(color==null?'#fccf03':color)+'" style="stroke-width: 0.3"/>'
	
	for( var k=Math.floor(axis[2]/axis[7])*axis[7];k<=Math.ceil(axis[3]/axis[7])*axis[7];k+=axis[7])
		S+='<line x1="'+(mx*axis[0]+bx)+'" y1="'+(my*k+by)+'" x2="'+(mx*axis[1]+bx)+'" y2="'+(my*k+by)+'" stroke="'+(color==null?'#fccf03':color)+'" style="stroke-width: 0.3"/>'
	
	for( var k=Math.floor(axis[0]/axis[4])*axis[4];k<=Math.ceil(axis[1]/axis[4])*axis[4];k+=axis[4]){
		S+='<line x1="'+(mx*k+bx)+'" y1="'+(my*axis[2]+by)+'" x2="'+(mx*k+bx)+'" y2="'+(my*axis[3]+by)+'" stroke="'+(color==null?'#fccf03':color)+'" style="stroke-width: 0.5"/>'
		if(Math.abs(k)>0.5*axis[4])
		S+='<text x="'+(mx*k+bx)+'" y="'+(by+1)+'" dominant-baseline="hanging" text-anchor="middle">'+k.toFixed(csx)+'</text> '
	}
	for( var k=Math.floor(axis[2]/axis[5])*axis[5];k<=Math.ceil(axis[3]/axis[5])*axis[5];k+=axis[5]){
		S+='<line x1="'+(mx*axis[0]+bx)+'" y1="'+(my*k+by)+'" x2="'+(mx*axis[1]+bx)+'" y2="'+(my*k+by)+'" stroke="'+(color==null?'#fccf03':color)+'" style="stroke-width: 0.5"/>'
		if(Math.abs(k)>0.5*axis[5])
		S+='<text x="'+(bx+1)+'" y="'+(my*k+by+1)+'" dominant-baseline="middle" text-anchor="start">'+k.toFixed(csy)+'</text> '
	}
	
	S+='<line x1="'+(mx*axis[0]+bx)+'" y1="'+(my*0+by)+'" x2="'+(mx*axis[1]+bx)+'" y2="'+(my*0+by)+'" stroke="'+(color==null?'#fccf03':color)+'" style="stroke-width: 2.5"/>'
	S+='<line x1="'+(mx*0+bx)+'" y1="'+(my*axis[2]+by)+'" x2="'+(mx*0+bx)+'" y2="'+(my*axis[3]+by)+'" stroke="'+(color==null?'#fccf03':color)+'" style="stroke-width: 2.5"/>'
	S+='<line x1="'+(mx*axis[0]+bx)+'" y1="'+(my*yp[0]+by)+'" x2="'+(mx*axis[1]+bx)+'" y2="'+(my*yp[0]+by)+'" stroke="#D00" style="stroke-width: 3.5" stroke-dasharray="20 9"/>'
	x=linspace(-10,10,100)
	y=Exp2points(x,xp,yp)
	let P=coor2px(x,y,mx,bx,my,by)
	S+='<polyline points="'+P+'" fill="none" stroke="'+(color2==null?'#000':color2)+'" style="stroke-width: 2.5" />'
	S+='<circle cx="'+(bx)+'" cy="'+(my*yp[1]+by)+'" r="5" />'
	S+='<circle cx="'+(mx*xp[1]+bx)+'" cy="'+(my*yp[2]+by)+'" r="5" />'
	
	S+="</svg>"
	return S
	
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
						function P1(x){
							var r=Math.round(Math.random()*20+2)
							var a=Math.round(Math.random()*350+5)
							
							
							var P="Determine el área del sector circular que tiene como radio "+r+" y ángulo $\\theta="+a+"°$"
							
							var R=[];
							
							R[0]=(Math.PI*a*r*r/360).toFixed(2)
							for(var i=1;i<6;++i){
							do{
							R[i]=(Math.PI*a*r*r/360+(Math.random()-0.5)*10).toFixed(2)
							}while(repetido(R))
							
							}
							return [P,R]
							}
							function P2(x){
							var r=Math.round(Math.random()*20+2)
							var a=(Math.random()*5+0.5).toFixed(2)
							
							
							var P="Determine el área del sector circular que tiene como radio "+r+" y ángulo $\\theta="+a+"$ rad"
							
							var R=[];
							
							R[0]=(a*r*r/2).toFixed(2)
							for(var i=1;i<6;++i){
							do{
							R[i]=(a*r*r/2+(Math.random()-0.5)*10).toFixed(2)
							}while(repetido(R))
							
							}
							return [P,R]
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
				}
			]
		},
		{
			Nombre:"Distribución Binomial",
			test:[
				{
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

function P1(x){
	var n=Math.ceil(Math.random()*3+8)
	var p=eval((Math.random()).toFixed(2))
	var x=Math.round(Math.random()*n)
	
	var P="Sea $X\\sim B("+n+","+p.toFixed(2)+")$ calcule $P(X = "+x+")$ "
	
	
	var R=[];
	R[0]=M_binomialpdf(n,p,x).toPrecision(3)
	var dummy=0;
	for(var i=1;i<6;++i){
		do{
			var n=Math.ceil(Math.random()*3+8)
			var p=eval((Math.random()).toFixed(2))
			var x=Math.round(Math.random()*n)
			R[i]=M_binomialpdf(n,p,x).toPrecision(3)
			
		}while(repetido(R))
	}
	return [P,R]
}
function P2(x){
	
	do{
		var n=Math.ceil(Math.random()*3+8)
		var p=eval((Math.random()).toFixed(2))
		var xm=Math.floor(Math.random()*n)
		var xM=Math.ceil(Math.random()*n)
	}while((xm+1)>=xM || xm<1 )
	
	
	var P="Sea $X\\sim B("+n+","+p.toFixed(2)+")$ calcule $P("+(Math.random()<0.5?(xm)+"\\le":(xm-1)+"<")+" X "+(Math.random()<0.5?"\\le"+(xM):"<"+(xM+1))+")$ "
	
	
	var R=[];
	R[0]=M_binomialcdf_R(n,p,xm,xM).toPrecision(3)
	var dummy=0;
	for(var i=1;i<6;++i){
		do{
			do{
				var n=Math.ceil(Math.random()*3+8)
				var p=eval((Math.random()).toFixed(2))
				var xm=Math.floor(Math.random()*n)
				var xM=Math.ceil(Math.random()*n)
			}while((xm+1)>=xM || xm<1 )
			R[i]=M_binomialcdf_R(n,p,xm,xM).toPrecision(3)
			
		}while(repetido(R))
	}
	return [P,R]
}
function P4(x){
	var n=Math.ceil(Math.random()*3+8)
	var p=eval((Math.random()).toFixed(2))
	var x=Math.ceil(Math.random()*n)
	
	var P="Sea $X\\sim B("+n+","+p.toFixed(2)+")$ calcule $P(X "+(Math.random()<0.5?"\\ge"+(x+1):">"+(x))+")$ "
	
	
	var R=[];
	R[0]=(1-M_binomialcdf(n,p,x)).toPrecision(3)
	var dummy=0;
	for(var i=1;i<6;++i){
		do{
			var n=Math.ceil(Math.random()*3+8)
			var p=eval((Math.random()).toFixed(2))
			var x=Math.round(Math.random()*n)
			R[i]=(1-M_binomialcdf(n,p,x)).toPrecision(3)
			
		}while(repetido(R))
	}
	return [P,R]
}
function P3(x){
	var n=Math.ceil(Math.random()*3+8)
	var p=eval((Math.random()).toFixed(2))
	var x=Math.floor(Math.random()*n)
	
	var P="Sea $X\\sim B("+n+","+p.toFixed(2)+")$ calcule $P(X "+(Math.random()<0.5?"\\le"+x:"<"+(x+1))+")$ "
	
	
	var R=[];
	R[0]=M_binomialcdf(n,p,x).toPrecision(3)
	var dummy=0;
	for(var i=1;i<6;++i){
		do{
			var n=Math.ceil(Math.random()*3+8)
			var p=eval((Math.random()).toFixed(2))
			var x=Math.round(Math.random()*n)
			R[i]=M_binomialcdf(n,p,x).toPrecision(3)
			
		}while(repetido(R))
	}
	return [P,R]
}
function PreguntaTema(){
	if(Math.random()>0.25){
		return P1(1)
	}else if(Math.random()>0.5){
		return P2(1)
	}else if(Math.random()>0.75){
		return P3(1)
	}else{
		return P4(1)
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
					Nota:"Basarse en el siguiente link:<br>https://estdg.blogs.upv.es/files/2018/04/Tabla-Chi2_cola-derecha.pdf",
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
						
						
						var P="Bajo la suposición que no existe independencia entre los datos, determine el valor esperado de la columna $y_"+(i_n[1]+1)+"$"+(n==1?"": "y la fila $x_"+(i_n[0]+1)+"$")
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
									R[i]=(eval(mu)-Math.abs(dummy)).toPrecision(3)+","+(eval(mu)+Math.abs(dummy)).toPrecision(3)
								else
									R[i]=(eval(mu)+dummy).toPrecision(3)
								//console.log(R)
							}while(repetido(R))
						}

						for(let k=0;k<6;++k)	spanContenido(R[k],C[k])
							
					}
				}
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