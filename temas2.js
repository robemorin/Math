function A(){
	return "Vale madre"
}
const tema = [{
	Nombre:"Aritmética y álgebra",
	subtema:[
		{
			Nombre:"Notación científica",
			test:[
				{
					Nombre:"Ejercicios de notación científica",
					Nota:"",
					fun:function(){
					//Inicio
	
	function P1(){
	do{
		var a=Math.round(Math.random()*9998+2)

	}while((Math.sqrt(a)-Math.round(Math.sqrt(a)))==0)
	var cs=Math.round(Math.random()*2+1)
	
	var P="Calcule el porcentaje de error de $\\sqrt{"+a+"}$ y "+Math.sqrt(a).toFixed(cs)+"."
	
	ve=Math.sqrt(a)
	va=eval(Math.sqrt(a).toFixed(cs))
	
	
	var R=[];
	R[0]=NotacionCientifica(Math.abs(ve-va)/ve*100)+"*"
	var dummy=0;
	for(var i=1;i<6;++i){
		do{
			a=Math.round(Math.random()*9998+2)
			ve=Math.sqrt(a)
			va=eval(Math.sqrt(a).toFixed(cs))
			R[i]=NotacionCientifica(Math.abs(ve-va)/ve*100)
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
							R[0]=NotacionCientifica(Math.abs(ve-va)/ve*100)
							let dummy=0;
							for(let i=1;i<6;++i){
								do{
									let a=Math.round(Math.random()*9998+2)
									ve=Math.sqrt(a)
									va=eval(Math.sqrt(a).toFixed(cs))
									R[i]=NotacionCientifica(Math.abs(ve-va)/ve*100)
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
		}else{
			return P3()
		}
	}

function P1(){
	const u1=Math.round(Math.random()*100-50)
	const d=Math.round(Math.random()*50+1)*(Math.random()<0.5?1:-1)
	const n=Math.round(Math.random()*100+20)
	
	const P="Obtenga el término $u_{"+n+"}$ de la secuencia "+u1+", "+(u1+d)+", "+(u1+2*d)+", "+(u1+3*d)+" ... "
		
		
	let R=[];
	
	R[0]=u1+(n-1)*d

	do{
		for(let k=1;k<6;++k) R[k]=u1+(n+Math.round(Math.random()*10-5))*d
	}while(repetido(R))
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

	do{
		for(let k=1;k<6;++k) R[k]=Math.round(Math.random()*100-50)
	}while(repetido(R))
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

	do{
		for(let k=1;k<6;++k) R[k]=u1+(n3+Math.round(Math.random()*10-5))*d
	}while(repetido(R))
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

	do{
		for(let k=1;k<6;++k) R[k]=u1+(n2+Math.round(Math.random()*10-5))*d
	}while(repetido(R))
	return [P,R]
}
	/*No realizado*/
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
			Nombre:"Progresiones y series geométricas",
			test:[
			]
		},
		{
			Nombre:"Aplicaciones de las progresiones y series geométricas al ámbito financiero",
			test:[
			]
		},
		{
			Nombre:"Propiedades de las potencias que tienen exponentes enteros",
			test:[
			]
		},
		{
			Nombre:"Aproximación: cifras decimales, cifras significativas",
			test:[
			]
		},
		{
			Nombre:"Amortización y anualidades utilizando medios tecnológicos",
			test:[
			]
		}
		
	]
},
{
	Nombre:"Funciones",
	subtema:[
		{
			Nombre:"Diferentes formas de expresar la ecuación de una recta",
			test:[
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
				}
			]
		},
		{
			Nombre:"Concepto de función, dominio, recorrido y gráfico",
			test:[
			]
		},
		{
			Nombre:"Función inversa",
			test:[
			]
		},
		{
			Nombre:"El gráfico de una función",
			test:[
			]
		},
		{
			Nombre:"Distintos tipos de funciones",
			test:[
				{
					Nombre:"Senos y cosenos",
					Nota:"",
					fun:function(){
					//Inicio
					function P1(x){
						do{
							var a=Math.round(Math.random()*10-5)
						}while(a==0)
						var b=2*Math.PI/Math.round(Math.random()*8+1)
						var c=Math.round(Math.random()*10-5)
						var Tipo=Math.random()<0.5?0:1
						var Funcion=['Cos(','Sin(']
						var dummy=Math.round(Math.random())
						
						var axis=[-10, 10, Math.min(-5,c-Math.abs(a)-1), Math.max(5,c+Math.abs(a)+1), 2, 2, 1, 1]
						var dim=[500, 800]
						var x=linspace(-10,10,500)
						var y=Sinoidal(a,b,c,Tipo,x)
						
						
						//plot(axis,dim,x,y,'#ffa200','#222')
						
						
						
						var P="Determine la función que aparece a continuación<br><center>"+plot(axis,dim,x,y,'#ffa200','#222')+"</center>"
						
						var R=[];
						
						R[0]=a+Funcion[Tipo]+(dummy==1?(b).toFixed(2):(180*b/Math.PI).toFixed(1)+"°")+"<i>x</i>) + ("+c+")"
						for(var i=1;i<6;++i){
							do{
								R[i]=a+Funcion[Math.round(Math.random())]+(dummy==1?(b).toFixed(2):(180*b/Math.PI).toFixed(1)+"°")+"<i>x</i>) + ("+Math.round(Math.random()*10-5)+")"
									
							}while(repetido(R))
						
						}
						return [P,R]
					}
					function P2(x){
						do{
							var a=Math.round(Math.random()*10-5)
						}while(a==0)
						var b=2*Math.PI/Math.round(Math.random()*8+1)
						var c=Math.round(Math.random()*10-5)
						var Tipo=Math.random()<0.5?0:1
						var Funcion=['Cos(','Sin(']
						var dummy=Math.round(Math.random())
						
						var axis=[-10, 10, Math.min(-5,c-Math.abs(a)-1), Math.max(5,c+Math.abs(a)+1), 2, 2, 1, 1]
						var dim=[500, 800]
						var x=linspace(-10,10,500)
						var y=Sinoidal(a,b,c,Tipo,x)
						
						
						//plot(axis,dim,x,y,'#ffa200','#222')
						
						
						
						var P="Determine la función que aparece a continuación<br><center>"+plot(axis,dim,x,y,'#ffa200','#222')+"</center>"
						
						var R=[];
						
						R[0]=a+Funcion[Tipo]+(dummy==1?(b).toFixed(2):(180*b/Math.PI).toFixed(1)+"°")+"<i>x</i>) + ("+c+")"
						for(var i=1;i<6;++i){
							do{
								R[i]=Math.round(Math.random()*10-5)+Funcion[Math.round(Math.random())]+(dummy==1?(b).toFixed(2):(180*b/Math.PI).toFixed(1)+"°")+"<i>x</i>) + ("+c+")"
									
							}while(repetido(R))
						
						}
						return [P,R]
					}
					function P3(x){
						do{
							var a=Math.round(Math.random()*10-5)
						}while(a==0)
						var b=2*Math.PI/Math.round(Math.random()*8+1)
						var c=Math.round(Math.random()*10-5)
						var Tipo=Math.random()<0.5?0:1
						var Funcion=['Cos(','Sin(']
						var dummy=Math.round(Math.random())
						
						var axis=[-10, 10, Math.min(-5,c-Math.abs(a)-1), Math.max(5,c+Math.abs(a)+1), 2, 2, 1, 1]
						var dim=[500, 800]
						var x=linspace(-10,10,500)
						var y=Sinoidal(a,b,c,Tipo,x)
						
						
						//plot(axis,dim,x,y,'#ffa200','#222')
						
						
						
						var P="Determine la función que aparece a continuación<br><center>"+plot(axis,dim,x,y,'#ffa200','#222')+"</center>"
						
						var R=[];
						
						R[0]=a+Funcion[Tipo]+(b.toFixed(3))+"<i>x</i>) + ("+c+")"
						for(var i=1;i<6;++i){
							do{
								R[i]=a+Funcion[Tipo]+((2*Math.PI/Math.round(Math.random()*8+1)).toFixed(3))+"<i>x</i>) + ("+c+")"
									
							}while(repetido(R))
						
						}
						return [P,R]
					}
					function P4(x){
						do{
							var a=Math.round(Math.random()*10-5)
						}while(a==0)
						var b=2*Math.PI/Math.round(Math.random()*8+1)
						var c=Math.round(Math.random()*10-5)
						var Tipo=Math.random()<0.5?0:1
						var Funcion=['Cos(','Sin(']
						var dummy=Math.round(Math.random())
						
						var axis=[-10, 10, Math.min(-5,c-Math.abs(a)-1), Math.max(5,c+Math.abs(a)+1), 2, 2, 1, 1]
						var dim=[500, 800]
						var x=linspace(-10,10,500)
						var y=Sinoidal(a,b,c,Tipo,x)
						
						
						//plot(axis,dim,x,y,'#ffa200','#222')
						
						
						
						var P="Determine la función que aparece a continuación<br><center>"+plot(axis,dim,x,y,'#ffa200','#222')+"</center>"
						
						var R=[];
						
						R[0]=a+Funcion[Tipo]+(180*b/Math.PI).toFixed(1)+"°)"+"<i>x</i>) + ("+c+")"
						for(var i=1;i<6;++i){
							do{
								R[i]=a+Funcion[Tipo]+(360/Math.round(Math.random()*8+1)).toFixed(1)+"°)"+"<i>x</i>) + ("+c+")"
									
							}while(repetido(R))
						
						}
						return [P,R]
					}
					function Sinoidal(a,b,c,Tipo,x){
						var y=[]
						if(Tipo==0){
							for(var k=0;k<x.length;++k) y[k]=a*Math.cos(b*x[k])+c
						}else{
							for(var k=0;k<x.length;++k) y[k]=a*Math.sin(b*x[k])+c
						}
						return y
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
	S+='<line x1="'+(mx*axis[0]+bx)+'" y1="'+(my*yp[0]+by)+'" x2="'+(mx*axis[1]+bx)+'" y2="'+(my*yp[0]+by)+'" stroke="#D00" style="stroke-width: 2.5" stroke-dasharray="20 9"/>'
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
				}
			]
		},
		{
			Nombre:"Modelización",
			test:[
			]
		},
		{
			Nombre:"Desarrollo y ajuste del modelo",
			test:[
			]
		}
	]
},
{
	Nombre:"Geometría y trigonometría",
	subtema:[
		{
			Nombre:"La distancia que hay entre dos puntos",
			test:[
			]
		},
		{
			Nombre:"Volumen y área de la superficie de sólidos tridimensionales",
			test:[
			]
		},
		{
			Nombre:"Tamaño del ángulo que forman dos rectas que se cortan o del ángulo que forma una recta con un plano",
			test:[
			]
		},
		{
			Nombre:"Uso de las razones trigonométricas",
			test:[
			]
		},
		{
			Nombre:"El teorema del seno y coseno",
			test:[
			]
		},
		{
			Nombre:"Área de un triángulo mediante la fórmula $\\frac{1}{2} ab\\sin(C)$",
			test:[
			]
		}
	]

},

{
	Nombre:"Estadística y probabilidad",
	subtema:[
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
*/