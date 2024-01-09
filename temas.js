function InfoTemas(){
	return "<h1>Preparatoria</h1><span>Docente:Roberto A. Morin Romero</span>"
}
function tema0(op){
	if(op=='tema') return ["Esta es una nota","Tema de prueba"]
	
	C=abrirPregunta()
	texto(" Mi pregunta",C[6])
	texto("Respuesta 1",C[0])
	texto("Respuesta 2",C[1])
	texto("Respuesta 3",C[2])
	texto("Respuesta 4",C[3])
	texto("Respuesta 5",C[4])
	texto("Respuesta 6",C[5])
}
function tema1(op){
	if(op=='tema') return ["Tema 1.1 Errores, porcentaje de Error y notación científica","1.1.A Errores"]
	
	function P1(){
	do{
		var a=Math.round(Math.random()*9998+2)

	}while((Math.sqrt(a)-Math.round(Math.sqrt(a)))==0)
	var cs=Math.round(Math.random()*2+1)
	
	var P="Calcule el porcentaje de error de $\\sqrt{"+a+"}$ y "+Math.sqrt(a).toFixed(cs)+"."
	
	ve=Math.sqrt(a)
	va=eval(Math.sqrt(a).toFixed(cs))
	
	
	var R=[];
	R[0]=NotacionCientifica(Math.abs(ve-va)/ve*100)
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
}
function tema2(op){
	if(op=='tema') return ["$u_n=u_1+(n-1)d$","1.2 Progresiones  aritméticas"]
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
function tema3(op){////----------------------Me quedé en este tema
	if(op=='tema') return ["Tema 1.3","1.3 Progresiones  geométricas"]
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
	const r=Math.round(Math.random()*50+1)*(Math.random()<0.5?1:-1)
	const n=Math.round(Math.random()*100+20)
	
	const P="Obtenga el término $u_{"+n+"}$ de la secuencia "+u1+", "+(u1+d)+", "+(u1+2*d)+", "+(u1+3*d)+" ... "
		
		
	let R=[];
	
	R[0]=u1+n*d

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
	
	const P="Una serie aritmetica tiene a $u_{"+n1+"} = "+(u1+n1*d)+"$ y $u_{"+n2+"} = "+(u1+n2*d)+"$, por lo tanto la diferencia en común es: "
		
		
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
	
	const P="Una serie aritmetica tiene a $u_{"+n1+"} = "+(u1+n1*d)+"$ y $u_{"+n2+"} = "+(u1+n2*d)+"$, por lo tanto $u_{"+n3+"}$ es: "
		
		
	let R=[];
	
	R[0]=u1+n3*d

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
	
	const P="Calcule el valor de $u_{"+n2+"}$ de una serie aritmetica tal que $u_{"+n1+"} = "+(u1+n1*d)+"$ y  su tasa en común de $d = "+d+"$: "
		
		
	let R=[];
	
	R[0]=u1+n2*d

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
	// for(let k=0;k<6;++k) spanContenido(R[k],C[k])
	for(let k=0;k<6;++k) spanContenido(R[k],C[k])
}
function tema4(op){
	if(op=='tema') return ["Tema 1.4","1.4 Aplicaciones de las progresiones y series geométricas al ámbito financiero: Interés compuesto y depreciación anua"]
	
	/*No realizado*/
}
function tema5(op){
	if(op=='tema') return ["Tema 1.5","1.5 Propiedades de las potencias que tienen exponentes enteros"]
	
	/*No realizado*/
}
function tema6(op){
	if(op=='tema') return ["Tema 1.5","1.5 Propiedades de las potencias que tienen exponentes enteros"]
	
	/*No realizado*/
}
function tema7(op){
	if(op=='tema') return ["Tema 1.7","1.7 Amortización y anualidades utilizando medios tecnológicos."]
	
	/*No realizado*/
}
function tema8(op){
	if(op=='tema') return ["Tema 1.8","1.8.A Sistemas de ecuaciones lineales con hasta tres incógnitas."]
	
	/*No realizado*/
}
function tema9(op){
	if(op=='tema') return ["Tema 1.8","1.8.B Ecuaciones polinómicas."]
	
	/*No realizado*/
}
function tema10(op){
	if(op=='tema') return ["Tema 2.1 \\(y = mx + c\\) (forma pendiente-ordenada al origen)","Línea recta "]
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
}
function tema11(op){
	if(op=='tema') return ["Tema 2.1 \\(ax + by + d = 0\\) (forma general).","Linea recta."]
	
	/*No realizado*/
}
function tema12(op){
	if(op=='tema') return ["Tema 2.1 \\(y-y_1 = m(x-x_1)\\) (forma punto-pendiente).","Linea recta."]
	
	/*No realizado*/
}
function tema13(op){
	if(op=='tema') return ["Tema 2.1 Pendiente","Cálculo de pendientes"]
	
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
function tema14(op){
	if(op=='tema') return ["Tema 2.1 Línea recta","Líneas perpendiculares"]
	function PreguntaTema(){
		const p=Math.random()
		if(p<1/4){
			return P1(1)
		}else if(p<2/4){
			return P2(1)
		}else if(p<3/4){
			return P3(1)
		}else{
			return P4(1)
		}
		
	}
function P1(x){
	var M=[ '\\frac{1}{5}','\\frac{2}{5}','\\frac{3}{5}','\\frac{4}{5}','\\frac{1}{4}','\\frac{3}{4}','\\frac{5}{4}',
					'\\frac{1}{3}','\\frac{2}{3}','\\frac{4}{3}','\\frac{5}{3}','\\frac{1}{2}',
					'-\\frac{1}{5}','-\\frac{2}{5}','-\\frac{3}{5}','-\\frac{4}{5}','-\\frac{1}{4}','-\\frac{3}{4}','-\\frac{5}{4}',
					'-\\frac{1}{3}','-\\frac{2}{3}','-\\frac{4}{3}','-\\frac{5}{3}','-\\frac{1}{2}',]
			var Mp=[ 0.2,0.4,.6,0.8,0.25,.75,5/4,
					1/3,2/3,4/3,5/3,1/2,
					-0.2,-0.4,-.6,-0.8,-0.25,-.75,-5/4,
					-1/3,-2/3,-4/3,-5/3,-1/2]
				var k1=Math.floor(Math.random()*M.length)
				var m=M[k1]
				M=Mp[k1]
				
				var b=Math.round(10*(Math.random()))
				var Pp=[Math.round(10*(Math.random()-0.5)),Math.round(10*(Math.random()-0.5))]
			var axis=[-10, 10, -10, 10, 2, 2, 1, 1]
			var dim=[500, 500]
			var x=[-10,10]
			var y=[M*x[0]+b,M*x[1]+b]
			
	
	var P='Calcule la ecuación de la línea perpendicular a \\( y ='+m+ ' x + ' +b+ '\\)  que pase por el punto ('+Pp+')<br>'//+plot(axis,dim,x,y,'#ffa200','#222')		
	var R=[];
	R[0]='\\(y = '+(-1/M).toFixed(3)+" x"+((Pp[0]/M+Pp[1])<0?"-"+(-(Pp[0]/M+Pp[1])).toFixed(3):"+"+(Pp[0]/M+Pp[1]).toFixed(3))+"\\)"
	for(var i=1;i<6;++i){
		var b=Math.ceil(Math.random()*10-5)	
		do{
			var Pp=[Math.round(10*(Math.random()-0.5)),Math.round(10*(Math.random()-0.5))]
			R[i]='\\(y = '+(-1/M).toFixed(3)+" x"+((Pp[0]/M+Pp[1])<0?"-"+(-(Pp[0]/M+Pp[1])).toFixed(3):"+"+(Pp[0]/M+Pp[1]).toFixed(3))+"\\)"
		}while(repetido(R))
	}
	return [P,R]
}
function P2(x){var M=[ '\\frac{1}{5}','\\frac{2}{5}','\\frac{3}{5}','\\frac{4}{5}','\\frac{1}{4}','\\frac{3}{4}','\\frac{5}{4}',
					'\\frac{1}{3}','\\frac{2}{3}','\\frac{4}{3}','\\frac{5}{3}','\\frac{1}{2}',
					'-\\frac{1}{5}','-\\frac{2}{5}','-\\frac{3}{5}','-\\frac{4}{5}','-\\frac{1}{4}','-\\frac{3}{4}','-\\frac{5}{4}',
					'-\\frac{1}{3}','-\\frac{2}{3}','-\\frac{4}{3}','-\\frac{5}{3}','-\\frac{1}{2}',]
			var Mp=[ 0.2,0.4,.6,0.8,0.25,.75,5/4,
					1/3,2/3,4/3,5/3,1/2,
					-0.2,-0.4,-.6,-0.8,-0.25,-.75,-5/4,
					-1/3,-2/3,-4/3,-5/3,-1/2]
				var k1=Math.floor(Math.random()*M.length)
				var m=M[k1]
				M=Mp[k1]
				
				var b=Math.round(10*(Math.random()))
				var Pp=[Math.round(10*(Math.random()-0.5)),Math.round(10*(Math.random()-0.5))]
			var axis=[-10, 10, -10, 10, 2, 2, 1, 1]
			var dim=[500, 500]
			var x=[-10,10]
			var y=[M*x[0]+b,M*x[1]+b]
			
	
	var P='Calcule la ecuación de la línea perpendicular a la linea que aparece en los ejes y que pase por el punto ('+Pp+')<br><center>'+plot(axis,dim,x,y,'#ffa200','#222')+"</center>"
	var R=[];
	R[0]='\\(y = '+(-1/M).toFixed(3)+" x"+((Pp[0]/M+Pp[1])<0?"-"+(-(Pp[0]/M+Pp[1])).toFixed(3):"+"+(Pp[0]/M+Pp[1]).toFixed(3))+"\\)"
	for(var i=1;i<6;++i){
		var b=Math.ceil(Math.random()*10-5)	
		do{
			var Pp=[Math.round(10*(Math.random()-0.5)),Math.round(10*(Math.random()-0.5))]
			R[i]='\\(y = '+(-1/M).toFixed(3)+" x"+((Pp[0]/M+Pp[1])<0?"-"+(-(Pp[0]/M+Pp[1])).toFixed(3):"+"+(Pp[0]/M+Pp[1]).toFixed(3))+"\\)"
		}while(repetido(R))
	}
	return [P,R]
}
function P3(x){
	var M=[ '\\frac{1}{5}','\\frac{2}{5}','\\frac{3}{5}','\\frac{4}{5}','\\frac{1}{4}','\\frac{3}{4}','\\frac{5}{4}',
					'\\frac{1}{3}','\\frac{2}{3}','\\frac{4}{3}','\\frac{5}{3}','\\frac{1}{2}',
					'-\\frac{1}{5}','-\\frac{2}{5}','-\\frac{3}{5}','-\\frac{4}{5}','-\\frac{1}{4}','-\\frac{3}{4}','-\\frac{5}{4}',
					'-\\frac{1}{3}','-\\frac{2}{3}','-\\frac{4}{3}','-\\frac{5}{3}','-\\frac{1}{2}',]
			var Mp=[ 0.2,0.4,.6,0.8,0.25,.75,5/4,
					1/3,2/3,4/3,5/3,1/2,
					-0.2,-0.4,-.6,-0.8,-0.25,-.75,-5/4,
					-1/3,-2/3,-4/3,-5/3,-1/2]
				var k1=Math.floor(Math.random()*M.length)
				var m=M[k1]
				M=Mp[k1]
				
				var b=Math.round(10*(Math.random()))
				var Pp=[Math.round(10*(Math.random()-0.5)),Math.round(10*(Math.random()-0.5))]
			var axis=[-10, 10, -10, 10, 2, 2, 1, 1]
			var dim=[500, 500]
			var x=[-10,10]
			var y=[M*x[0]+b,M*x[1]+b]
			
	
	var P='Calcule la ecuación de la línea perpendicular a \\( y ='+m+ ' x + ' +b+ '\\)  que pase por el punto ('+Pp+')<br>'//+plot(axis,dim,x,y,'#ffa200','#222')		
	var R=[];
	R[0]='\\(y = '+(-1/M).toFixed(3)+" x"+((Pp[0]/M+Pp[1])<0?"-"+(-(Pp[0]/M+Pp[1])).toFixed(3):"+"+(Pp[0]/M+Pp[1]).toFixed(3))+"\\)"
	for(var i=1;i<6;++i){
		do{
			var M=Mp[Math.floor(Math.random()*Mp.length)]
			R[i]='\\(y = '+(-1/M).toFixed(3)+" x"+((Pp[0]/M+Pp[1])<0?"-"+(-(Pp[0]/M+Pp[1])).toFixed(3):"+"+(Pp[0]/M+Pp[1]).toFixed(3))+"\\)"
		}while(repetido(R))
	}
	return [P,R]
}
function P4(x){var M=[ '\\frac{1}{5}','\\frac{2}{5}','\\frac{3}{5}','\\frac{4}{5}','\\frac{1}{4}','\\frac{3}{4}','\\frac{5}{4}',
					'\\frac{1}{3}','\\frac{2}{3}','\\frac{4}{3}','\\frac{5}{3}','\\frac{1}{2}',
					'-\\frac{1}{5}','-\\frac{2}{5}','-\\frac{3}{5}','-\\frac{4}{5}','-\\frac{1}{4}','-\\frac{3}{4}','-\\frac{5}{4}',
					'-\\frac{1}{3}','-\\frac{2}{3}','-\\frac{4}{3}','-\\frac{5}{3}','-\\frac{1}{2}',]
			var Mp=[ 0.2,0.4,.6,0.8,0.25,.75,5/4,
					1/3,2/3,4/3,5/3,1/2,
					-0.2,-0.4,-.6,-0.8,-0.25,-.75,-5/4,
					-1/3,-2/3,-4/3,-5/3,-1/2]
				var k1=Math.floor(Math.random()*M.length)
				var m=M[k1]
				M=Mp[k1]
				
				var b=Math.round(10*(Math.random()))
				var Pp=[Math.round(10*(Math.random()-0.5)),Math.round(10*(Math.random()-0.5))]
			var axis=[-10, 10, -10, 10, 2, 2, 1, 1]
			var dim=[500, 500]
			var x=[-10,10]
			var y=[M*x[0]+b,M*x[1]+b]
			
	
	var P='Calcule la ecuación de la línea perpendicular a la linea que aparece en los ejes y que pase por el punto ('+Pp+')<br><center>'+plot(axis,dim,x,y,'#ffa200','#222')+"</center>"
	var R=[];
	R[0]='\\(y = '+(-1/M).toFixed(3)+" x"+((Pp[0]/M+Pp[1])<0?"-"+(-(Pp[0]/M+Pp[1])).toFixed(3):"+"+(Pp[0]/M+Pp[1]).toFixed(3))+"\\)"
	for(var i=1;i<6;++i){
		var b=Math.ceil(Math.random()*10-5)	
		do{
			var M=Mp[Math.floor(Math.random()*Mp.length)]
			R[i]='\\(y = '+(-1/M).toFixed(3)+" x"+((Pp[0]/M+Pp[1])<0?"-"+(-(Pp[0]/M+Pp[1])).toFixed(3):"+"+(Pp[0]/M+Pp[1]).toFixed(3))+"\\)"
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
function tema15(op){
	if(op=='tema') return ["Tema 2.1 Línea recta.","Rectas paralelas."]
	
	/*No realizado*/
}
function tema16(op){
	if(op=='tema') return ["Tema 2.2 Funciones.","Van varios temas"]
	
	/*No realizado*/
}
function tema17(op){
	if(op=='tema') return ["Tema 2.3 Gráfico de funciones.","Van varios temas"]
	
	/*No realizado*/
}
function tema18(op){
	if(op=='tema') return ["Tema 2.4 Puntos de interés en las funciones.","Van varios temas"]
	
	/*No realizado*/
}
function tema19(op){
	if(op=='tema') return ["Tema 2.5 Modelos cuadráticos.","Raices y eje de simetría"]
	
	/*No realizado*/
}
function tema20(op){
	if(op=='tema') return ["Tema 2.5 Modelos cuadráticos.","Raices y eje de simetría (Gráfico)"]
	
	/*No realizado*/
}
function tema21(op){
	if(op=='tema') return ["Tema 2.5 Modelos de crecimiento y decrecimiento exponencial.","Función exponencial"]
	/*Inicio de preguntas*/
	function PreguntaTema(){
		const p=Math.random()
		if(p<1/4){
			return P1(1)
		}else{
			return P2(1)
		}
		
	}
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
	/*No realizado*/
	let C=abrirPregunta()
	let [P,R]=P1()
	spanContenido(P,C[6])
	// C[6].innerHTML=P
	for(let k=0;k<6;++k) spanContenido(R[k],C[k])
}
function tema22(op){
	if(op=='tema') return ["Tema 2.5 Funciones","Variación directa o inversa"]
	
	/*No realizado*/
}
function tema23(op){
	if(op=='tema') return ["Tema 2.5 Funciones","Modelos cúbicos"]
	/*No realizado*/
}
function tema24(op){
	if(op=='tema') return ["Tema 2.5 Funciones","Función seno y coseno"]
	function PreguntaTema(){
		const p=Math.random()
		if(p<1/4){
			return P1(1)
		}else if(p<2/4){
			return P2(1)
		}else if(p<3/4){
			return P3(1)
		}else{
			return P4(1)
		}
		
	}
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
	/*Fin de la sección de preguntas*/
	let C=abrirPregunta()
	let [P,R]=P1()
	spanContenido(P,C[6])
	// C[6].innerHTML=P
	for(let k=0;k<6;++k) spanContenido(R[k],C[k])
}
function tema25(op){
	if(op=='tema') return ["Tema 2.6 Regresión lineal","Línea de mejor ajuste"]
	/*No realizado*/
}
function tema26(op){
	if(op=='tema') return ["Tema 2.6 Funciones, composición de funciones","Composición de funciones"]
	/*No realizado*/
}
function tema27(op){
	if(op=='tema') return ["Tema 3.1 Geometría","Distancia entre dos puntos"]
	/*No realizado*/
}
function tema28(op){
	if(op=='tema') return ["Tema 3.1 Geometría","Volumen de sólidos"]
	/*No realizado*/
}
function tema29(op){
	if(op=='tema') return ["Tema 3.1 Geometría","Superficie de sólidos"]
	/*No realizado*/
}
function tema30(op){
	if(op=='tema') return ["Tema 3.1 Geometría","Sectores circulares"]
	/*-------------*/
	function PreguntaTema(){
		const p=Math.random()
		if(p<1/4){
			return P1(1)
		}else{
			return P2(1)
		}
	}
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
	/*-------------*/
	let C=abrirPregunta()
	let [P,R]=P1()
	spanContenido(P,C[6])
	// C[6].innerHTML=P
	for(let k=0;k<6;++k) spanContenido(R[k],C[k])
}
function tema31(op){
	if(op=='tema') return ["Tema 3.2 Geometría - Prerrequisitos","Teorema de Pitágoras"]
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
	
	/*Fin de la sección de preguntas*/
	let C=abrirPregunta()
	let [P,R]=P1()
	spanContenido(P,C[6])
	// C[6].innerHTML=P
	for(let k=0;k<6;++k) spanContenido(R[k],C[k])
}
function tema32(op){//Ejemplo de recuperar los anteriores
	if(op=='tema') return ["Tema 3.2 Geometría - Prerrequisito","Funciones trigonométricas básicas"]

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
}
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
}
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
	/*Fin de la sección de preguntas*/
	let C=abrirPregunta()
	let [P,R]=P1()
	spanContenido(P,C[6])
	// C[6].innerHTML=P
	for(let k=0;k<6;++k) spanContenido(R[k],C[k])
}
function tema33(op){//Ejemplo de recuperar los anteriores
	if(op=='tema') return ["Tema 3.2 Geometría - Prerrequisito","Trigonométria básica II"]


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
	
	var P="Obtenga el valor de \\(x\\) <br>"+(Math.random()<0.5?pitagorasSVG(a,b,c,angulo):pitagorasSVG2(a,b,c,angulo))
		
	var R=[];
	
	R[0]=q.toFixed(2)
	for(var i=1;i<6;++i){
		do{
			R[i]=(q+Math.random()*2-1).toFixed(2)
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
function tema34(op){//Ejemplo de recuperar los anteriores
	if(op=='tema') return ["Tema 3.2 Trigonometría<br>$$\\frac{\\sin(A)}{a}=\\frac{\\sin(B)}{b}=\\frac{\\sin(C)}{c}$$","Ley de senos"]
	function PreguntaTema(){
		const p=Math.random()
		if(p<1/2){
			return P1()
		}else{
			return P2()
		}
	}
function P1(){
			let a=Math.round(Math.random()*10+10)
			let b=Math.round(Math.random()*20+5)
			let C=Math.round(Math.random()*80+30)
			let c=Math.sqrt(a*a+b*b-2*a*b*Math.cos(C*Math.PI/180)).toFixed(2)
			let B=Math.asin(b*Math.sin(C*Math.PI/180)/eval(c))
			let escala=10
			let Sdiv="	<center><svg width='400px' height='"+((50+escala*b*Math.sin(C/180*Math.PI))+5)+"px'>"
			Sdiv+="	<polyline points='170,50 "+(170+escala*a)+",50 "+(170+escala*b*Math.cos(C/180*Math.PI))+","+(50+escala*b*Math.sin(C/180*Math.PI))+" 170,50' stroke='black' fill='none' />"
			+"	<path d='M "+(170+10*Math.cos(C/180*Math.PI))+" "+(50+10*Math.sin(C/180*Math.PI))
			+"	A 10 10, 0, 0, 0, 180 50 "
			+"	L 170 50 Z' stroke='red' fill='none'/>"
			+" <text text-anchor='start' alignment-baseline='hanging' x='"+(180+10*Math.cos(C/360*Math.PI))+"' y='"+(45+10*Math.sin(C/180*Math.PI))+"' class='small'>"+C+"°</text>"
			+" <text text-anchor='start' alignment-baseline='hanging' x='"+(170+escala*(b*Math.cos(C/180*Math.PI)+a)/2)+"' y='"+(50+escala*b*Math.sin(C/180*Math.PI)/2)+"' class='small'>"+c+"</text>"
			+" <text text-anchor='middle' alignment-baseline='hanging' x='"+(175+escala*a/2)+"' y='30' class='small'></text>"
			+" <text text-anchor='end' alignment-baseline='hanging' x='"+(160+escala*b*Math.cos(C/180*Math.PI)/2)+"' y='"+(50+escala*b*Math.sin(C/180*Math.PI)/2)+"' class='small'>"+b+"</text>"
			
			+"	<path d='M "+(170+escala*a-10)+" 50"
			+"	A 10 10, 0, 0, 0, "+(170+escala*a+10*Math.cos(B+Math.PI) )+" "+(50-10*Math.sin(B+Math.PI) )
			+"	L "+(170+escala*a )+" "+(50 )+" Z' stroke='red' fill='none' stroke-width='4'/>"
			
			c=eval(c)
			C*=Math.PI/180
	
	var P="Calcule el ángulo señalado "+Sdiv
		
	var R=[];
	
	R[0]=(B*180/Math.PI).toFixed(1)
	for(var i=1;i<6;++i){
		do{
			R[i]=(eval(R[0])+10*(Math.random()-0.5)).toFixed(1)+"°"
		}while(repetido(R))
	}
	R[0]+="°"
	return [P,R]
}
function P2(){
			let a=Math.round(Math.random()*25+10)
			let b=Math.round(Math.random()*20+5)
			let C=Math.round(Math.random()*80+30)
			let c=Math.sqrt(a*a+b*b-2*a*b*Math.cos(C*Math.PI/180))
			let B=Math.asin(b*Math.sin(C*Math.PI/180)/eval(c))
			let escala=10
			let Sdiv="	<center><svg width='550px' height='"+((50+escala*b*Math.sin(C/180*Math.PI))+5)+"px'>"
			Sdiv+="	<polyline points='170,50 "+(170+escala*a)+",50 "+(170+escala*b*Math.cos(C/180*Math.PI))+","+(50+escala*b*Math.sin(C/180*Math.PI))+" 170,50' stroke='black' fill='none' />"
			+"	<path d='M "+(170+10*Math.cos(C/180*Math.PI))+" "+(50+10*Math.sin(C/180*Math.PI))
			+"	A 10 10, 0, 0, 0, 180 50 "
			+"	L 170 50 Z' stroke='red' fill='none'/>"
			+" <text text-anchor='start' alignment-baseline='hanging' x='"+(180+10*Math.cos(C/360*Math.PI))+"' y='"+(45+10*Math.sin(C/180*Math.PI))+"' class='small'>"+C+"°</text>"
			+" <text text-anchor='end' alignment-baseline='hanging' x='"+(160+escala*a)+"' y='"+(45+10*Math.sin(C/180*Math.PI))+"' class='small'>"+(B*180/Math.PI).toFixed(1)+"°</text>"
			+" <text text-anchor='start' alignment-baseline='hanging' x='"+(170+escala*(b*Math.cos(C/180*Math.PI)+a)/2)+"' y='"+(50+escala*b*Math.sin(C/180*Math.PI)/2)+"' class='small'>c</text>"
			+" <text text-anchor='middle' alignment-baseline='hanging' x='"+(175+escala*a/2)+"' y='30' class='small'></text>"
			+" <text text-anchor='end' alignment-baseline='hanging' x='"+(160+escala*b*Math.cos(C/180*Math.PI)/2)+"' y='"+(50+escala*b*Math.sin(C/180*Math.PI)/2)+"' class='small'>"+b+"</text>"
			
			+"	<path d='M "+(170+escala*a-10)+" 50"
			+"	A 10 10, 0, 0, 0, "+(170+escala*a+10*Math.cos(B+Math.PI) )+" "+(50-10*Math.sin(B+Math.PI) )
			+"	L "+(170+escala*a )+" "+(50 )+" Z' stroke='red' fill='none' stroke-width='4'/>"
			
			
	
	var P="Calcule el ángulo señalado "+Sdiv
		
	var R=[];
	
	R[0]=c.toFixed(2)
	for(var i=1;i<6;++i){
		do{
			R[i]=(c+10*(Math.random()-0.5)).toFixed(2)
		}while(repetido(R))
	}
	return [P,R]
}
	/*Fin de la sección de preguntas*/
	let C=abrirPregunta()
	let [P,R]=P2()
	spanContenido(P,C[6])
	// C[6].innerHTML=P
	for(let k=0;k<6;++k) spanContenido(R[k],C[k])
}
function tema35(op){//Ejemplo de recuperar los anteriores
	if(op=='tema') return ["Tema 3.2 Trigonometría<br>$$c=\\sqrt{a^2+b^2-2ab\\cdot cos(C)}$$<br>$$C=\\cos^{-1}\\left(\\frac{a^2+b^2-c^2}{2ab}\\right)$$","Ley de cosenos"]
	function PreguntaTema(){
		const p=Math.random()
		if(p<1/2){
			return P1()
		}else{
			return P2()
		}
	}
function P1(){
			let a=Math.round(Math.random()*20+5)
			let b=Math.round(Math.random()*20+5)
			let C=Math.round(Math.random()*80+30)
			let c=Math.sqrt(a*a+b*b-2*a*b*Math.cos(C*Math.PI/180)).toFixed(2)
			let escala=10
			let Sdiv=""			
			
			
			Sdiv+="	<center><svg width='400px' height='"+((50+escala*b*Math.sin(C/180*Math.PI))+5)+"'>"
			+"	<polyline points='70,50 "+(70+escala*a)+",50 "+(70+escala*b*Math.cos(C/180*Math.PI))+","+(50+escala*b*Math.sin(C/180*Math.PI))+" 70,50' stroke='black' fill='none' />"
			+"	<path d='M "+(70+10*Math.cos(C/180*Math.PI))+" "+(50+10*Math.sin(C/180*Math.PI))
			+"	A 10 10, 0, 0, 0, 80 50 "
			+"	L 70 50 Z' stroke='red' fill='none'/>"
			+" <text text-anchor='start' alignment-baseline='hanging' x='"+(80+10*Math.cos(C/360*Math.PI))+"' y='"+(45+10*Math.sin(C/180*Math.PI))+"' class='small'>C°</text>"
			+" <text text-anchor='start' alignment-baseline='hanging' x='"+(70+escala*(b*Math.cos(C/180*Math.PI)+a)/2)+"' y='"+(50+escala*b*Math.sin(C/180*Math.PI)/2)+"' class='small'>"+c+"</text>"
			+" <text text-anchor='middle' alignment-baseline='hanging' x='"+(75+escala*a/2)+"' y='30' class='small'>"+a+"</text>"
			+" <text text-anchor='end' alignment-baseline='hanging' x='"+(60+escala*b*Math.cos(C/180*Math.PI)/2)+"' y='"+(50+escala*b*Math.sin(C/180*Math.PI)/2)+"' class='small'>"+b+"</text>"
			+"</svg></center>"
				
	var P="Calcule el valor de $C$ "+Sdiv
		
	var R=[];
	
	R[0]=C+"°"
	for(var i=1;i<6;++i){
		do{
			R[i]=Math.round(Math.random()*80+30)+"°"
		}while(repetido(R))
	
	}
	return [P,R]
}
function P2(){
			let a=Math.round(Math.random()*20+5)
			let b=Math.round(Math.random()*20+5)
			let C=Math.round(Math.random()*80+30)
			let c=Math.sqrt(a*a+b*b-2*a*b*Math.cos(C*Math.PI/180))
			let escala=10
			let Sdiv=""			
			
			
			Sdiv+="	<center><svg width='400px' height='"+((50+escala*b*Math.sin(C/180*Math.PI))+5)+"'>"
			+"	<polyline points='70,50 "+(70+escala*a)+",50 "+(70+escala*b*Math.cos(C/180*Math.PI))+","+(50+escala*b*Math.sin(C/180*Math.PI))+" 70,50' stroke='black' fill='none' />"
			+"	<path d='M "+(70+10*Math.cos(C/180*Math.PI))+" "+(50+10*Math.sin(C/180*Math.PI))
			+"	A 10 10, 0, 0, 0, 80 50 "
			+"	L 70 50 Z' stroke='red' fill='none'/>"
			+" <text text-anchor='start' alignment-baseline='hanging' x='"+(80+10*Math.cos(C/360*Math.PI))+"' y='"+(45+10*Math.sin(C/180*Math.PI))+"' class='small'>"+C+"°</text>"
			+" <text text-anchor='start' alignment-baseline='hanging' x='"+(70+escala*(b*Math.cos(C/180*Math.PI)+a)/2)+"' y='"+(50+escala*b*Math.sin(C/180*Math.PI)/2)+"' class='small'>c</text>"
			+" <text text-anchor='middle' alignment-baseline='hanging' x='"+(75+escala*a/2)+"' y='30' class='small'>"+a+"</text>"
			+" <text text-anchor='end' alignment-baseline='hanging' x='"+(60+escala*b*Math.cos(C/180*Math.PI)/2)+"' y='"+(50+escala*b*Math.sin(C/180*Math.PI)/2)+"' class='small'>"+b+"</text>"
			+"</svg></center>"
				
	var P="Calcule el valor de $c$ "+Sdiv
		
	var R=[];
	
	R[0]=c.toFixed(2)
	for(var i=1;i<6;++i){
		do{
			R[i]=((Math.random()-0.5)*10+c).toFixed(2)
		}while(repetido(R))
	
	}
	return [P,R]
}
	/*Fin de la sección de preguntas*/
	let C=abrirPregunta()
	let [P,R]=PreguntaTema()
	spanContenido(P,C[6])
	// C[6].innerHTML=P
	for(let k=0;k<6;++k) spanContenido(R[k],C[k])
}
function tema36(op){//Ejemplo de recuperar los anteriores
	if(op=='tema') return ["Tema 3.2 Trigonometría","Ley de senos y cosenos"]
	function PreguntaTema(){
		const p=Math.random()
		if(p<1/2){
			return P1()
		}else{
			return P2()
		}
	}
function P1(){
			let a=Math.round(Math.random()*20+5)
			let b=Math.round(Math.random()*20+5)
			let C=Math.round(Math.random()*80+30)
			let c=Math.sqrt(a*a+b*b-2*a*b*Math.cos(C*Math.PI/180)).toFixed(2)
			let escala=10
			let Sdiv=""			
			
			
			Sdiv+="	<center><svg width='400px' height='"+((50+escala*b*Math.sin(C/180*Math.PI))+5)+"'>"
			+"	<polyline points='70,50 "+(70+escala*a)+",50 "+(70+escala*b*Math.cos(C/180*Math.PI))+","+(50+escala*b*Math.sin(C/180*Math.PI))+" 70,50' stroke='black' fill='none' />"
			+"	<path d='M "+(70+10*Math.cos(C/180*Math.PI))+" "+(50+10*Math.sin(C/180*Math.PI))
			+"	A 10 10, 0, 0, 0, 80 50 "
			+"	L 70 50 Z' stroke='red' fill='none'/>"
			+" <text text-anchor='start' alignment-baseline='hanging' x='"+(80+10*Math.cos(C/360*Math.PI))+"' y='"+(45+10*Math.sin(C/180*Math.PI))+"' class='small'>"+C+"°</text>"
			+" <text text-anchor='start' alignment-baseline='hanging' x='"+(70+escala*(b*Math.cos(C/180*Math.PI)+a)/2)+"' y='"+(50+escala*b*Math.sin(C/180*Math.PI)/2)+"' class='small'>"+c+"</text>"
			+" <text text-anchor='middle' alignment-baseline='hanging' x='"+(75+escala*a/2)+"' y='30' class='small'>"+a+"</text>"
			+" <text text-anchor='end' alignment-baseline='hanging' x='"+(60+escala*b*Math.cos(C/180*Math.PI)/2)+"' y='"+(50+escala*b*Math.sin(C/180*Math.PI)/2)+"' class='small'>x</text>"
			//+"	<circle cx='"+170+"' cy='"+50+"' r='3' fill='green' />"
			//+"	<circle cx='"+(170+escala*a)+"' cy='50' r='3' fill='blue' />"
			//+" <circle cx='"+(170+escala*b*Math.cos(C/180*Math.PI))+"' cy='"+(50+escala*b*Math.sin(C/180*Math.PI))+"' r='3' />"
			+"</svg></center>"
			c=eval(c)
			C*=Math.PI/180
	
	var P="Calcule el valor de $x$ "+Sdiv
		
	var R=[];
	
	R[0]=b
	for(var i=1;i<6;++i){
		do{
			R[i]=Math.round(Math.random()*20+5)
		}while(repetido(R))
	
	}
	return [P,R]
}
function P2(){
			let a=Math.round(Math.random()*10+10)
			let b=Math.round(Math.random()*20+5)
			let C=Math.round(Math.random()*80+30)
			let c=Math.sqrt(a*a+b*b-2*a*b*Math.cos(C*Math.PI/180)).toFixed(2)
			let B=Math.asin(b*Math.sin(C*Math.PI/180)/eval(c))
			let escala=10
			let Sdiv="	<center><svg width='400px' height='"+((50+escala*b*Math.sin(C/180*Math.PI))+5)+"px'>"
			Sdiv+="	<polyline points='170,50 "+(170+escala*a)+",50 "+(170+escala*b*Math.cos(C/180*Math.PI))+","+(50+escala*b*Math.sin(C/180*Math.PI))+" 170,50' stroke='black' fill='none' />"
			+"	<path d='M "+(170+10*Math.cos(C/180*Math.PI))+" "+(50+10*Math.sin(C/180*Math.PI))
			+"	A 10 10, 0, 0, 0, 180 50 "
			+"	L 170 50 Z' stroke='red' fill='none'/>"
			+" <text text-anchor='start' alignment-baseline='hanging' x='"+(180+10*Math.cos(C/360*Math.PI))+"' y='"+(45+10*Math.sin(C/180*Math.PI))+"' class='small'>"+C+"°</text>"
			+" <text text-anchor='start' alignment-baseline='hanging' x='"+(170+escala*(b*Math.cos(C/180*Math.PI)+a)/2)+"' y='"+(50+escala*b*Math.sin(C/180*Math.PI)/2)+"' class='small'>"+c+"</text>"
			+" <text text-anchor='middle' alignment-baseline='hanging' x='"+(175+escala*a/2)+"' y='30' class='small'>"+a+"</text>"
			//+" <text text-anchor='end' alignment-baseline='hanging' x='"+(160+escala*b*Math.cos(C/180*Math.PI)/2)+"' y='"+(350+escala*b*Math.sin(C/180*Math.PI)/2)+"' class='small'>x</text>"
			
			+"	<path d='M "+(170+escala*a-10)+" 50"
			+"	A 10 10, 0, 0, 0, "+(170+escala*a+10*Math.cos(B+Math.PI) )+" "+(50-10*Math.sin(B+Math.PI) )
			+"	L "+(170+escala*a )+" "+(50 )+" Z' stroke='red' fill='none' stroke-width='4'/>"
			
			c=eval(c)
			C*=Math.PI/180
	
	var P="Calcule el ángulo señalado "+Sdiv
		
	var R=[];
	
	R[0]=(B*180/Math.PI).toFixed(1)
	for(var i=1;i<6;++i){
		do{
			R[i]=(eval(R[0])+10*(Math.random()-0.5)).toFixed(1)+"°"
		}while(repetido(R))
	}
	R[0]+="°"
	return [P,R]
}
	/*Fin de la sección de preguntas*/
	let C=abrirPregunta()
	let [P,R]=PreguntaTema()
	spanContenido(P,C[6])
	// C[6].innerHTML=P
	for(let k=0;k<6;++k) spanContenido(R[k],C[k])
}
function tema1f(op){//Ejemplo de recuperar los anteriores
	if(op=='tema') return ["Tema 2.1 Línea recta","Líneas perpendiculares"]
	function PreguntaTema(){
		const p=Math.random()
		if(p<1/4){
			return P1(1)
		}else if(p<2/4){
			return P2(1)
		}else if(p<3/4){
			return P3(1)
		}else{
			return P4(1)
		}
		
	}
function P1(x){
	var M=[ '\\frac{1}{5}','\\frac{2}{5}','\\frac{3}{5}','\\frac{4}{5}','\\frac{1}{4}','\\frac{3}{4}','\\frac{5}{4}',
					'\\frac{1}{3}','\\frac{2}{3}','\\frac{4}{3}','\\frac{5}{3}','\\frac{1}{2}',
					'-\\frac{1}{5}','-\\frac{2}{5}','-\\frac{3}{5}','-\\frac{4}{5}','-\\frac{1}{4}','-\\frac{3}{4}','-\\frac{5}{4}',
					'-\\frac{1}{3}','-\\frac{2}{3}','-\\frac{4}{3}','-\\frac{5}{3}','-\\frac{1}{2}',]
			var Mp=[ 0.2,0.4,.6,0.8,0.25,.75,5/4,
					1/3,2/3,4/3,5/3,1/2,
					-0.2,-0.4,-.6,-0.8,-0.25,-.75,-5/4,
					-1/3,-2/3,-4/3,-5/3,-1/2]
				var k1=Math.floor(Math.random()*M.length)
				var m=M[k1]
				M=Mp[k1]
				
				var b=Math.round(10*(Math.random()))
				var Pp=[Math.round(10*(Math.random()-0.5)),Math.round(10*(Math.random()-0.5))]
			var axis=[-10, 10, -10, 10, 2, 2, 1, 1]
			var dim=[500, 500]
			var x=[-10,10]
			var y=[M*x[0]+b,M*x[1]+b]
			
	
	var P='Calcule la ecuación de la línea perpendicular a \\( y ='+m+ ' x + ' +b+ '\\)  que pase por el punto ('+Pp+')<br>'//+plot(axis,dim,x,y,'#ffa200','#222')		
	var R=[];
	R[0]='\\(y = '+(-1/M).toFixed(3)+" x"+((Pp[0]/M+Pp[1])<0?"-"+(-(Pp[0]/M+Pp[1])).toFixed(3):"+"+(Pp[0]/M+Pp[1]).toFixed(3))+"\\)"
	for(var i=1;i<6;++i){
		var b=Math.ceil(Math.random()*10-5)	
		do{
			var Pp=[Math.round(10*(Math.random()-0.5)),Math.round(10*(Math.random()-0.5))]
			R[i]='\\(y = '+(-1/M).toFixed(3)+" x"+((Pp[0]/M+Pp[1])<0?"-"+(-(Pp[0]/M+Pp[1])).toFixed(3):"+"+(Pp[0]/M+Pp[1]).toFixed(3))+"\\)"
		}while(repetido(R))
	}
	return [P,R]
}
function P2(x){var M=[ '\\frac{1}{5}','\\frac{2}{5}','\\frac{3}{5}','\\frac{4}{5}','\\frac{1}{4}','\\frac{3}{4}','\\frac{5}{4}',
					'\\frac{1}{3}','\\frac{2}{3}','\\frac{4}{3}','\\frac{5}{3}','\\frac{1}{2}',
					'-\\frac{1}{5}','-\\frac{2}{5}','-\\frac{3}{5}','-\\frac{4}{5}','-\\frac{1}{4}','-\\frac{3}{4}','-\\frac{5}{4}',
					'-\\frac{1}{3}','-\\frac{2}{3}','-\\frac{4}{3}','-\\frac{5}{3}','-\\frac{1}{2}',]
			var Mp=[ 0.2,0.4,.6,0.8,0.25,.75,5/4,
					1/3,2/3,4/3,5/3,1/2,
					-0.2,-0.4,-.6,-0.8,-0.25,-.75,-5/4,
					-1/3,-2/3,-4/3,-5/3,-1/2]
				var k1=Math.floor(Math.random()*M.length)
				var m=M[k1]
				M=Mp[k1]
				
				var b=Math.round(10*(Math.random()))
				var Pp=[Math.round(10*(Math.random()-0.5)),Math.round(10*(Math.random()-0.5))]
			var axis=[-10, 10, -10, 10, 2, 2, 1, 1]
			var dim=[500, 500]
			var x=[-10,10]
			var y=[M*x[0]+b,M*x[1]+b]
			
	
	var P='Calcule la ecuación de la línea perpendicular a la linea que aparece en los ejes y que pase por el punto ('+Pp+')<br><center>'+plot(axis,dim,x,y,'#ffa200','#222')+"</center>"
	var R=[];
	R[0]='\\(y = '+(-1/M).toFixed(3)+" x"+((Pp[0]/M+Pp[1])<0?"-"+(-(Pp[0]/M+Pp[1])).toFixed(3):"+"+(Pp[0]/M+Pp[1]).toFixed(3))+"\\)"
	for(var i=1;i<6;++i){
		var b=Math.ceil(Math.random()*10-5)	
		do{
			var Pp=[Math.round(10*(Math.random()-0.5)),Math.round(10*(Math.random()-0.5))]
			R[i]='\\(y = '+(-1/M).toFixed(3)+" x"+((Pp[0]/M+Pp[1])<0?"-"+(-(Pp[0]/M+Pp[1])).toFixed(3):"+"+(Pp[0]/M+Pp[1]).toFixed(3))+"\\)"
		}while(repetido(R))
	}
	return [P,R]
}
function P3(x){
	var M=[ '\\frac{1}{5}','\\frac{2}{5}','\\frac{3}{5}','\\frac{4}{5}','\\frac{1}{4}','\\frac{3}{4}','\\frac{5}{4}',
					'\\frac{1}{3}','\\frac{2}{3}','\\frac{4}{3}','\\frac{5}{3}','\\frac{1}{2}',
					'-\\frac{1}{5}','-\\frac{2}{5}','-\\frac{3}{5}','-\\frac{4}{5}','-\\frac{1}{4}','-\\frac{3}{4}','-\\frac{5}{4}',
					'-\\frac{1}{3}','-\\frac{2}{3}','-\\frac{4}{3}','-\\frac{5}{3}','-\\frac{1}{2}',]
			var Mp=[ 0.2,0.4,.6,0.8,0.25,.75,5/4,
					1/3,2/3,4/3,5/3,1/2,
					-0.2,-0.4,-.6,-0.8,-0.25,-.75,-5/4,
					-1/3,-2/3,-4/3,-5/3,-1/2]
				var k1=Math.floor(Math.random()*M.length)
				var m=M[k1]
				M=Mp[k1]
				
				var b=Math.round(10*(Math.random()))
				var Pp=[Math.round(10*(Math.random()-0.5)),Math.round(10*(Math.random()-0.5))]
			var axis=[-10, 10, -10, 10, 2, 2, 1, 1]
			var dim=[500, 500]
			var x=[-10,10]
			var y=[M*x[0]+b,M*x[1]+b]
			
	
	var P='Calcule la ecuación de la línea perpendicular a \\( y ='+m+ ' x + ' +b+ '\\)  que pase por el punto ('+Pp+')<br>'//+plot(axis,dim,x,y,'#ffa200','#222')		
	var R=[];
	R[0]='\\(y = '+(-1/M).toFixed(3)+" x"+((Pp[0]/M+Pp[1])<0?"-"+(-(Pp[0]/M+Pp[1])).toFixed(3):"+"+(Pp[0]/M+Pp[1]).toFixed(3))+"\\)"
	for(var i=1;i<6;++i){
		do{
			var M=Mp[Math.floor(Math.random()*Mp.length)]
			R[i]='\\(y = '+(-1/M).toFixed(3)+" x"+((Pp[0]/M+Pp[1])<0?"-"+(-(Pp[0]/M+Pp[1])).toFixed(3):"+"+(Pp[0]/M+Pp[1]).toFixed(3))+"\\)"
		}while(repetido(R))
	}
	return [P,R]
}
function P4(x){var M=[ '\\frac{1}{5}','\\frac{2}{5}','\\frac{3}{5}','\\frac{4}{5}','\\frac{1}{4}','\\frac{3}{4}','\\frac{5}{4}',
					'\\frac{1}{3}','\\frac{2}{3}','\\frac{4}{3}','\\frac{5}{3}','\\frac{1}{2}',
					'-\\frac{1}{5}','-\\frac{2}{5}','-\\frac{3}{5}','-\\frac{4}{5}','-\\frac{1}{4}','-\\frac{3}{4}','-\\frac{5}{4}',
					'-\\frac{1}{3}','-\\frac{2}{3}','-\\frac{4}{3}','-\\frac{5}{3}','-\\frac{1}{2}',]
			var Mp=[ 0.2,0.4,.6,0.8,0.25,.75,5/4,
					1/3,2/3,4/3,5/3,1/2,
					-0.2,-0.4,-.6,-0.8,-0.25,-.75,-5/4,
					-1/3,-2/3,-4/3,-5/3,-1/2]
				var k1=Math.floor(Math.random()*M.length)
				var m=M[k1]
				M=Mp[k1]
				
				var b=Math.round(10*(Math.random()))
				var Pp=[Math.round(10*(Math.random()-0.5)),Math.round(10*(Math.random()-0.5))]
			var axis=[-10, 10, -10, 10, 2, 2, 1, 1]
			var dim=[500, 500]
			var x=[-10,10]
			var y=[M*x[0]+b,M*x[1]+b]
			
	
	var P='Calcule la ecuación de la línea perpendicular a la linea que aparece en los ejes y que pase por el punto ('+Pp+')<br><center>'+plot(axis,dim,x,y,'#ffa200','#222')+"</center>"
	var R=[];
	R[0]='\\(y = '+(-1/M).toFixed(3)+" x"+((Pp[0]/M+Pp[1])<0?"-"+(-(Pp[0]/M+Pp[1])).toFixed(3):"+"+(Pp[0]/M+Pp[1]).toFixed(3))+"\\)"
	for(var i=1;i<6;++i){
		var b=Math.ceil(Math.random()*10-5)	
		do{
			var M=Mp[Math.floor(Math.random()*Mp.length)]
			R[i]='\\(y = '+(-1/M).toFixed(3)+" x"+((Pp[0]/M+Pp[1])<0?"-"+(-(Pp[0]/M+Pp[1])).toFixed(3):"+"+(Pp[0]/M+Pp[1]).toFixed(3))+"\\)"
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

function tema80(op){
	if(op=='tema') return ["Esta es una nota","Tema de prueba"]
	
	C=abrirPregunta()
	const aleatio=Math.round(Math.random()*1000)
	texto(" Mi pregunta"+aleatio,C[6])
	texto("R "+aleatio,C[0])
	texto("R "+(aleatio+1),C[1])
	texto("R "+(aleatio+2),C[2])
	texto("R "+(aleatio+3),C[3])
	texto("R "+(aleatio+4),C[4])
	texto("R "+(aleatio+5),C[5])
}
