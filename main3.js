var Nletras=67;

function SizeMatriz(A){
	const S=[A.length,A[0].length]
	return S
}
function Desencriptar(Txt){
				let N_cripr=Symbols2numbers(Txt)
				//Extraer Clave
				let Claver=N_cripr.slice(0,9)
				N_cripr=N_cripr.slice(9,N_cripr.length)
				aClaver=inversaA(Claver)
				let Nr=[]
				for (let k=0;k<(N_cripr.length/3);++k){
					Nr[k]=[N_cripr[3*k],N_cripr[3*k+1],N_cripr[3*k+2]]
				}
				let numbersr=Multiplica(Nr,aClaver)
				
				let Original = (numbersr) => {
					const n = numbersr.length
					let Num=[]
					for(let k=0;k<n;++k){
						if(numbersr[k][0]!=numbersr[k][2]) return false;
						Num[k]=numbersr[k][0]
					}
					return Num
				}
				
				if(!Original(numbersr)){
					alert("Código no válido")
					return false
				}
				const K=Original(numbersr)
				const NameNum=K.slice(11, K.length)
				// alert(NameNum)
				
				// alert("Recuperado "+K.length+": Fecha: "+K[2]+"/"+K[1]+"/20"+K[0]+"/\n Inicio: "+K[3]+":"+K[4]+"\n Cal: "+K[6]+"/"+K[5]+
			// "\n numero de tema "+K[7]+"\nMostrar "+K[8]+"\n Termina "+K[9]+":"+K[10]+"\n Nombre:"+numbers2Symbols(NameNum).replaceAll('?', ' '))
			}
function verificar(T){
				var a = T[0][2];
				for(var i=1;i<T.length;i++){
					if(a!=T[i][2]) return false;
				}
				return true;
			}
			function RecuperarNumEn(Txt){
				var Num2=[];
				for(var i=5;i<Txt.length;++i){
					Num2[i-5]=S2N(Txt.charCodeAt(i));
				}
				return Num2;
			}
			function S2N(N){//*
					if( "a".charCodeAt(0)<=N &&  N <= "z".charCodeAt(0)) return N-"a".charCodeAt(0);
					else if( "A".charCodeAt(0)<=N &&  N <= "Z".charCodeAt(0)) return N-"A".charCodeAt(0)+26;
					else if( "0".charCodeAt(0)<=N &&  N <= "9".charCodeAt(0)) return N-"0".charCodeAt(0)+52;
					else if("_".charCodeAt(0)==N) return 62;
					else if("-".charCodeAt(0)==N) return 63;
					else if("+".charCodeAt(0)==N) return 64;
					else if("*".charCodeAt(0)==N) return 65;
					else if("?".charCodeAt(0)==N) return 66;
					else 	return 66;
			}
			function inversodet(n){//*
				if(n==0){
					var e=0
					return 0;
				}
				for (var i=1;i<Nletras;++i){
					if(n*i%Nletras==1){
						e=i; break;
					}
				}
				return e;
			}
			function inversaA(A){//*
				if(A.length>4){
					A=[	[A[0],A[1],A[2]],
						[A[3],A[4],A[5]],
						[A[6],A[7],A[8]]]
				}
				var d=inversodet(det(A));
				var As=new Array();
				As=[	[(A[1][1]*A[2][2]-A[1][2]*A[2][1]),-(A[0][1]*A[2][2]-A[0][2]*A[2][1]) ,(A[0][1]*A[1][2]-A[0][2]*A[1][1])],
						[-(A[1][0]*A[2][2]-A[1][2]*A[2][0]), (A[0][0]*A[2][2]-A[0][2]*A[2][0]),-(A[0][0]*A[1][2]-A[0][2]*A[1][0]) ],
						[(A[1][0]*A[2][1]-A[1][1]*A[2][0]), -(A[0][0]*A[2][1]-A[0][1]*A[2][0]), (A[0][0]*A[1][1]-A[0][1]*A[1][0])]]
				for(var i=0;i<3;++i) for(var j=0;j<3;++j) As[i][j]=(As[i][j]*d)%Nletras;
				for(var i=0;i<3;++i) for(var j=0;j<3;++j) if(As[i][j]<0) As[i][j]=As[i][j]+Nletras; 
				return As;
			}
			function EncriptarInfo(numbers){
				let Clave=eval("["+document.getElementsByTagName('body')[0].getAttribute("key")+"]")
				const C=[	[Clave[0],Clave[1],Clave[2]],
							[Clave[3],Clave[4],Clave[5]],
							[Clave[6],Clave[7],Clave[8]]]
				let N_crip=Numbers2Array(numbers)
				N_crip=Multiplica(N_crip,C)
				// alert(N_crip+" : "+Array2Numbers(N_crip))
				N_crip=Array2Numbers(N_crip)
				
				// alert(Clave+":\n"+Symbols2numbers(numbers2Symbols(Clave)))
				const Scrip=numbers2Symbols(Clave)+numbers2Symbols(N_crip)
				
				document.getElementById("clave").innerHTML="<a target='_blank' href='https://math-ca5.pages.dev/Revisar?v="+Scrip+"'>https://math-ca5.pages.dev/Revisar?v="+Scrip+"</a>"
				document.getElementById("clave").style.visibility="visible";
				
				
				/*------ Proceso inverso -------*/
				Desencriptar(Scrip)
				
				
				return Scrip;
			}
			function Symbols2numbers(S){
				let N=[]
				const n=S.length
				for(let i=0;i<n;++i){
					N[i]=S2N(S[i].charCodeAt(0))
				}
				return N
			}
			function numbers2Symbols(N){
				let S="";
				for(let i=0;i<N.length;++i){
					S=S+N2S(N[i]);
				}	
			return S;
			}
			function N2S(L){		
				if(L<26){ 
				return String.fromCharCode("a".charCodeAt(0)+L); 
				}else if(L<52){
				return String.fromCharCode("A".charCodeAt(0)+L-26);
				}else if(L<62){
				return String.fromCharCode("0".charCodeAt(0)+L-52);
				}else{
					switch(L){
						case 62: 
							return "_";
						case 63: 
							return "-";
						case 64: 
							return "+";
						case 65: 
							return "*";
						default: 
							return "?";
					}
				}
			}
			function Array2Numbers(A){
			let B=[];
			for(let i=0;i<A.length;++i){
				B[3*i+0]=A[i][0];
				B[3*i+1]=A[i][1];
				B[3*i+2]=A[i][2];
			}
			return B;
			}
			function Multiplica(A,B){
				
				let C=[];
				const a=SizeMatriz(A);
				const b=SizeMatriz(B);
				if(a[1]!=b[0]){
					return
				}
				const n=a[1]
				
				for(let i=0;i<a[0];++i){
					C[i]=[]
					for(let j=0;j<b[1];++j){
						C[i][j]=0
						for(let k=0;k<n;++k){
							C[i][j]+=A[i][k]*B[k][j]
						}
						C[i][j]=C[i][j]%Nletras
					}
				}
				return C;
			}
function Numbers2Array(x){
	return Sarray2Darray(x);
}
function Sarray2Darray(x){
	let B=[[0,0,0]]
	for(let i=0;i<x.length;++i){
		B[i]=[x[i],Math.floor(Math.random()*Nletras),x[i]];//Cada número es una terna
	}
	return B
}
			function hacerLlave(){// *
			f=new Date();
			var A=[[0,0,0],[0,0,0],[0,0,0]];
			while(det(A)==0){
				var A=[ [Math.floor(Math.random()*Nletras),Math.floor(Math.random()*Nletras),Math.floor(Math.random()*Nletras)],
						[Math.floor(Math.random()*Nletras),Math.floor(Math.random()*Nletras),Math.floor(Math.random()*Nletras)],
						[Math.floor(Math.random()*Nletras),Math.floor(Math.random()*Nletras),Math.floor(Math.random()*Nletras)]];
				}
				document.getElementsByTagName('body')[0].setAttribute("key",A)
				return A
			}
			function det(A){//*
				var f=A[0][0]*(A[1][1]*A[2][2]-A[2][1]*A[1][2])
					f=f-A[0][1]*(A[1][0]*A[2][2]-A[2][0]*A[1][2])
					f=f+A[0][2]*(A[1][0]*A[2][1]-A[2][0]*A[1][1])
					f=f%Nletras;
					f=(f<0)?f+Nletras:f;
				return f;
			}
function vamos(){
var Txt=document.getElementById("cadena_respuesta").value;
var X=Desencriptar(Txt);

cargar(X,false,X[3])
}
document.addEventListener('keyup', event => {
  if (event.ctrlKey && event.keyCode ===77 ) {
	var input = document.createElement('input')
	input.setAttribute("id","cadena_respuesta")
	document.getElementsByTagName("BODY")[0].appendChild(input);
	
	button = document.createElement('button');
	button.innerHTML="Cargar";
	button.setAttribute("onClick", "vamos()");
	document.getElementsByTagName("BODY")[0].appendChild(button);
	
	document.getElementById("lienzo").innerHTML="";	
  }
}, false)

function revuelve(){//*
	a=[0,1,2,3,4,5];
	b=[Math.floor(Math.random()*5.99),0];
		
		b[1]=a[0];
		a[0]=a[b[0]];
		a[b[0]]=b[1];
	return a;
}
function ajja(a){//*
	const TagN=document.getElementById("reloj");
	if(TagN.textContent=="Tiempo terminado"){
		LetsPlay();
		return
	}
	
	TagN.innerHTML=a[0]+"h "+a[1]+" min "+a[2]+" s";
	if(a[0]==0 && a[1]==0 && a[2]==0){
		document.getElementById("nombreAl").disabled=true;
		TagN.innerHTML="Tiempo terminado"
		Inputs=document.getElementsByTagName("input");
		for(var k=0; k<Inputs.length;++k){
			Inputs[k].disabled=true;
		}
		//

	}
	--a[2];
	if(a[2]<0){
		a[2]=59;
		--a[1];
	}
	if(a[1]<0){
		a[1]=59;
		--a[0];
	}
	if(TagN.textContent!="Tiempo terminado")	setTimeout(function (){ ajja(a)},1000)
}
function RevisaPregunta(NPreg,op,C) { //*
/*op:0, no mostrar nada; 1, solo si esta bien;2, mostar seleccionada y la correcta */
            const ele = document.getElementsByName(NPreg); 
			let a
			let punto=0
            for(let i = 0; i < ele.length; i++) {
				if(op==2){
					a=DesencriptarRespuesta(ele[i].getAttribute('v'),C)
					// alert('a:'+a)
					if(a[0]==0 && ele[i].checked && a[2]==0){
						ele[i].setAttribute("class","correcta")
						++punto
					}else if(ele[i].checked){
						ele[i].setAttribute("class","Incorrecta")
					}else if(a[0]==0 &&  a[2]==0){
						ele[i].setAttribute("class","correcta")
					}
				}else if(op==1){
					a=DesencriptarRespuesta(ele[i].getAttribute('v'),C)
					// alert('a:'+a)
					if(a[0]==0 && ele[i].checked && a[2]==0){
						ele[i].setAttribute("class","correcta")
						++punto
					}
				}else{
					a=DesencriptarRespuesta(ele[i].getAttribute('v'),C)
					// alert('a:'+a)
					if(a[0]==0 && ele[i].checked && a[2]==0){
						++punto
					}
				}
				
            }
			return punto;
}
function LetsPlay(){//*
	let Clave=eval("["+document.getElementsByTagName('body')[0].getAttribute("key")+"]")
	const C=[	[Clave[0],Clave[1],Clave[2]],
				[Clave[3],Clave[4],Clave[5]],
				[Clave[6],Clave[7],Clave[8]]]
	let K=eval("[ "+document.getElementById("reloj").getAttribute("txt2")+"]")/*Datos*/
	/*
	Datos
		0:año
		1:mes
		2:dia 
		3:hora
		4:Minutos
		5:Número de preguntas
		6:Aciertos
		7-8:numero de tema
		9:Mostrar/ocultar respuestas
		10:hora de terminación
		11:Minutos de terminacion
		12+:Nombre
	*/
	
	var aciertos=0
	for(let k=0;k<K[5];++k){
		aciertos+=RevisaPregunta("R"+k,K[10],C)
	}
	K[6]=aciertos
	calificar(K[6],K[5])
	let rnow = new Date();
	
	K[10]=eval(rnow.getHours())
	K[11]=eval(rnow.getMinutes())

	let S=Symbols2numbers(document.getElementById('nombreAl').value)
	K= K.concat(S);//Lista la cadena a mandar
	// alert("Original "+K.length+": Fecha: "+K[2]+"/"+K[1]+"/20"+K[0]+"/\n Inicio: "+K[3]+":"+K[4]+"\n Cal: "+K[6]+"/"+K[5]+
			// "\n numero de tema "+K[7]+"\nMostrar "+K[8]+"\n Termina "+K[9]+":"+K[10])
	K=EncriptarInfo(K)
	
	generateQRCode(K)
	window.scrollTo(0, 300)
}
function Pregunta(n,Text,Res,hey){
	var Contenedor=document.createElement('div');
	Contenedor.innerHTML=n+" - "+Text;
	k=revuelve();
	var where=6;
	for(var i=0;i<6;++i){
		if(k[i]==0)	where=i;
		var tableC=document.createElement("table");
		var trC=document.createElement("tr");
		var td1=document.createElement("td");
		var td2=document.createElement("td");
		var opt=document.createElement("input");
		if(hey){
		opt.type="radio"
		opt.name="R"+n
		opt.id="R"+n+"S"+i;
		td1.appendChild(opt);}
		td2.innerHTML=Res[k[i]];
		trC.appendChild(td1);
		trC.appendChild(td2);
		tableC.appendChild(trC)
		Contenedor.appendChild(tableC);
	}
	document.getElementById("lienzo").appendChild(Contenedor);
	
	return where;
}
function Pregunta2(n,Text,Res,Correcta,Seleccionada){
//alert("Res"+Correcta+" sel:"+Seleccionada)
	var Contenedor=document.createElement('div');
	Contenedor.innerHTML=n+" - "+Text;
	
	dummy=Res[0];
	Res[0]=Res[Correcta];
	Res[Correcta]=dummy;
	
	
	for(var i=0;i<6;++i){
		
		var tableC=document.createElement("table");
		var trC=document.createElement("tr");
		var td1=document.createElement("td");
		var td2=document.createElement("td");
		if(i==Correcta && i==Seleccionada) td2.style="border: 5px solid green;";
		else if(i==Correcta) td2.style="border: 5px dotted green;";
		else if(i==Seleccionada) td2.style="border: 5px solid red;";
		var opt=document.createElement("input");
		td2.innerHTML=Res[i];
		trC.appendChild(td1);
		trC.appendChild(td2);
		tableC.appendChild(trC)
		Contenedor.appendChild(tableC);
	}
	document.getElementById("lienzo").appendChild(Contenedor);
}
function calificar(k,K){
	document.getElementById("calificacion").innerHTML="</br>Calificacion: "+k+"/"+K+": "+Math.round(100*k/K);
}
function repetido(cadena){
	var N=cadena.length-1;
	
	for(var k=0;k<N;++k){
		if(cadena[N]===cadena[k]){
			return true;
		}
	}
	return false;
}
function LeerGet(){
	/*
	tema
	subtema
	test
	# preguntas
	tiempo
	modo
	*/
	const G=window.location.search
	return Symbols2numbers(G.slice(1, -1))
	
}
function N(){//*
	const code=LeerGet()
	alert(code)
	const Clave=hacerLlave()
	const d = new Date();
	const Npreguntas=code[3];
	const nota=tema[code[0]].subtema[code[1]].test[code[2]].Nota
	const title=tema[code[0]].subtema[code[1]].test[code[2]].Nombre
	
	const Ntest=(code[0]+1)+"."+(code[1]+1)+"."+(code[2]+1)
	
	document.getElementById("NamePlace").innerHTML="<h1>Preparatoria</h1><span>Docente:Roberto A. Morin Romero</span>"
	document.getElementById("NameTitle").innerHTML="Tarea "+Ntest+": "+title
	document.getElementById('Pestanna').innerHTML="Tarea "+Ntest+": "+title
	document.getElementById('Nota').innerHTML=nota
	let Data=[d.getFullYear().toString().substr(-2),d.getMonth()+1,d.getDate(), d.getHours(), d.getMinutes(),
	Npreguntas, 0,code[0],code[1],code[2],code[5]];
	/* También se debe modificar
	Datos
		0:año
		1:mes
		2:dia 
		3:hora
		4:Minutos
		5:Número de preguntas
		6:Aciertos
		7-9:numero de tema
		10:Mostrar/ocultar respuestas
		11:hora de terminación
		12:Minutos de terminacion
		13+:Nombre
	*/
	cargar(true,code)	
	document.getElementById("reloj").setAttribute("Txt",Clave);
	document.getElementById("reloj").setAttribute("Txt2",Data);
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	ajja([0, code[4], 0])
}
function cargar(hey,code){//*
if(!hey){
	//Aquí se va a revisar
	calificar()
}		
	if(hey){
		ContenidoTema(code)
	}else{
		//Aquí podemos resaltar las respuestas correctas una vez revisado
	}
}
function ContenidoTema(code){//*

	let CL=document.getElementById('lienzo')
	/*vamos a crear los espacios de las preguntas */
	const np=code[3]
	for (let k=0; k<np;++k){
		let C= document.createElement('div')
		C.setAttribute('name','ContenedorPregunta')
			let Cp= document.createElement('div')
			Cp.setAttribute('id','Preg'+k)
			Cp.setAttribute('name','Pregunta')
			C.appendChild(Cp)
			for (let kr=0; kr<6;++kr){
				let Ct= document.createElement('table')
					let Ctr=document.createElement('tr')
						let Ctd=document.createElement('td')
							let Cinput=document.createElement('input')
							Cinput.setAttribute("v","a")
							Cinput.type="radio"
							Cinput.name="R"+k
							Cinput.id="R"+k+"S"+kr;
						Ctd.appendChild(Cinput)
					Ctr.appendChild(Ctd)
						Ctd=document.createElement('td')
						Ctd.setAttribute('name','Respuesta')
						Ctd.id="L"+k+"S"+kr;
					Ctr.appendChild(Ctd)
				Ct.appendChild(Ctr)
				C.appendChild(Ct)
			}
		CL.appendChild(C)
	}
	/*Vamos a llenar las preguntas*/
	while(!HayPreguntasSinllenar()){
		// eval("tema"+ntema+"()")
		tema[code[0]].subtema[code[1]].test[code[2]].fun()
		cerrarPregunta()
	}
}
function HayPreguntasSinllenar(){//*
	C0=document.getElementsByName('ContenedorPregunta')
	return C0.length==0
}
function abrirPregunta(){//*
	const n=document.getElementsByName('PLlena').length
	document.getElementsByName('Pregunta')[0].innerHTML=(n+1)+".- "
	const a=revuelve()
	// Se debe trabajar en esta parte para ocultar el valor de v que dice quién es la respuesta correcta
	let S=document.getElementsByName('Respuesta')[a[0]].getAttribute("id")
	S=S.replace("L","R")
	document.getElementById(S).setAttribute("v",ocularResp(0))
	
	for(let k=1;k<6;++k){
		S=document.getElementsByName('Respuesta')[a[k]].getAttribute("id")
		S=S.replace("L","R")
		document.getElementById(S).setAttribute("v",ocularResp(Math.floor(Math.random()*60+1)))
	}
	const C = [	document.getElementsByName('Respuesta')[a[0]],
				document.getElementsByName('Respuesta')[a[1]],
				document.getElementsByName('Respuesta')[a[2]],
				document.getElementsByName('Respuesta')[a[3]],
				document.getElementsByName('Respuesta')[a[4]],
				document.getElementsByName('Respuesta')[a[5]],
				document.getElementsByName('Pregunta')[0]]
	return C
}
function cerrarPregunta(){//*
	document.getElementsByName('ContenedorPregunta')[0].setAttribute("name","PLlena")
	document.getElementsByName('Pregunta')[0].setAttribute("name","")
	for(let k=0;k<6;++k)	document.getElementsByName('Respuesta')[0].setAttribute("name","")
}/*
function texto(S,C){//*
	let Ct = document.createElement('span');
	Ct.textContent=S
	C.appendChild(Ct)
}
function divContenido(S,C){//*
	let Ct = document.createElement('div');
	Ct.innerHTML=S
	C.appendChild(Ct)
}
function spanContenido(S,C){//*
	let Ct = document.createElement('span');
	Ct.innerHTML=S
	C.appendChild(Ct)
}*/
function ocularResp(n){//*
	const numeros=[n]
	let Clave=eval("["+document.getElementsByTagName('body')[0].getAttribute("key")+"]")
	Clave=[	[Clave[0],Clave[1],Clave[2]],
			[Clave[3],Clave[4],Clave[5]],
			[Clave[6],Clave[7],Clave[8]]]
	const Oculto=EncriptarRespuesta(numeros,Clave)
	return Oculto
}
function EncriptarRespuesta(numbers,Clave){//*
	const B=Numbers2Array(numbers);
	const B2=Multiplica(B,Clave);
	const N2=Array2Numbers(B2);
	const Txt2=numbers2Symbols(N2);
	return Txt2;
}
function DesencriptarRespuesta(txt,Clave){//*
	const N=[Symbols2numbers(txt)]
	const Clave2=inversaA(Clave)
	const q=Multiplica(N,Clave2)
	return q[0]
}
