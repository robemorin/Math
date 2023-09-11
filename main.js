var Nletras=67;


			function Desencriptar(Txt){
				var Ai=MatrizI(Txt);
				var Txt2=RecuperarNumEn(Txt);
				
				var ArrayRec=[];
				for(var i=0;i<Txt2.length;i=i+3){
					ArrayRec[i/3]=[Txt2[i],Txt2[i+1],Txt2[i+2]];
				}
				B2=Multiplica(Ai,ArrayRec);
				//alert(B2+" length "+B2.length)
				ok=verificar(B2);
				if(ok||true){
					body=document.getElementsByTagName("body").item(0);
					var L = document.createElement('div');
					s="Fecha: "+B2[0][1]+"/"+B2[1][1]+"/2020		"+B2[2][1]+":"+B2[3][1]
					L.innerHTML=s;
					body.appendChild(L);
					B=[];
					for(var i=4;i<B2.length;++i) B[i-4]=B2[i][1];
					
					return B;
				}
				return [];
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
			function S2N(N){
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
			function MatrizI(Txt){
				f=new Date();
				//d=eval(document.getElementById("d").value);
				//m=eval(document.getElementById("m").value);
				//alert(Txt)
				d=S2N(Txt.charCodeAt(3))
				m=S2N(Txt.charCodeAt(4));//alert("m: "+m+"; d: "+d)
				A=[ [d,m,0],
					[d,0,m],
					[0,d,m]];
				for(var i=0;i<3;++i) A[i][2-i]=S2N(Txt.charCodeAt(i));
				Ai=inversaA(A);
			return Ai;
			}
			function inversodet(n){
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
			function inversaA(A){
				var d=inversodet(det(A));
				var As=new Array();
				As=[	[(A[1][1]*A[2][2]-A[1][2]*A[2][1]),-(A[0][1]*A[2][2]-A[0][2]*A[2][1]) ,(A[0][1]*A[1][2]-A[0][2]*A[1][1])],
						[-(A[1][0]*A[2][2]-A[1][2]*A[2][0]), (A[0][0]*A[2][2]-A[0][2]*A[2][0]),-(A[0][0]*A[1][2]-A[0][2]*A[1][0]) ],
						[(A[1][0]*A[2][1]-A[1][1]*A[2][0]), -(A[0][0]*A[2][1]-A[0][1]*A[2][0]), (A[0][0]*A[1][1]-A[0][1]*A[1][0])]]
				for(var i=0;i<3;++i) for(var j=0;j<3;++j) As[i][j]=(As[i][j]*d)%Nletras;
				for(var i=0;i<3;++i) for(var j=0;j<3;++j) if(As[i][j]<0) As[i][j]=As[i][j]+Nletras; 
				return As;
			}
			function EncriptarInfo(numbers,Clave){
				var today = new Date();
				var B=Numbers2Array(numbers,Clave);
				var B2=Multiplica(Clave,B);
				var N2=Array2Numbers(B2);
				var Txt2=N2S(Clave[2])+N2S(Clave[4])+N2S(Clave[6])+N2S(Clave[0])+N2S(Clave[1])+numbers2Symbols(N2);
				document.getElementById("clave").innerHTML="Clave: "+Txt2+"<br/>Fecha:"+today.toLocaleDateString('pt-PT');;
				document.getElementById("clave").style.visibility="visible";
				return Txt2;
			}
			function numbers2Symbols(N){
				
				var S="";
				for(var i=0;i<N.length;++i){
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
			var B=[];
			for(var i=0;i<A.length;++i){
				B[3*i+0]=A[i][0];
				B[3*i+1]=A[i][1];
				B[3*i+2]=A[i][2];
			}
			return B;
			}
			function Multiplica(A,B){
				var C=[[0,0,0]];
				if(A.length>4)	A=[[A[0],A[1],A[2]],[A[3],A[4],A[5]],[A[6],A[7],A[8]]];
				
				var n=B.length;
				for(var i=0;i<n;++i){
					C[i]=[  (A[0][0]*B[i][0]+A[0][1]*B[i][1]+A[0][2]*B[i][2])%Nletras,
							(A[1][0]*B[i][0]+A[1][1]*B[i][1]+A[1][2]*B[i][2])%Nletras,
							(A[2][0]*B[i][0]+A[2][1]*B[i][1]+A[2][2]*B[i][2])%Nletras];
							
				}
				return C;
			}
			function Numbers2Array(x,Clave){
				return Sarray2Darray(x,Clave);
			}
			function Sarray2Darray(x,c){
				var n=x.length;
				var m=Math.round(Math.random()*Nletras);
				B=[[Math.round(Math.random()*Nletras),f.getDate(),m],
				   [Math.round(Math.random()*Nletras),(f.getMonth() +1),m],
				   [Math.round(Math.random()*Nletras),f.getHours(),m],
				   [Math.round(Math.random()*Nletras),f.getMinutes(),m]]
				var gap=B.length;
				for(var i=0;i<n;++i){
					B[i+gap]=[Math.round(Math.random()*Nletras),x[i],m];
				}
				return B
			}
			function ObtenerClave(){
			document.getElementById("lienzo").innerHTML=""
			f=new Date();
			var A=[[0,0,0],[0,0,0],[0,0,0]];
			while(det(A)==0){
				var A=[ [f.getDate(),f.getMonth(),Math.floor(Math.random()*Nletras)],
						[f.getDate(),Math.floor(Math.random()*Nletras),f.getMonth()],
						[Math.floor(Math.random()*Nletras),f.getDate(),f.getMonth()]];
			}
			return A
			}
			function det(A){
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
function misnumeros(){
x=[];
for(var i=0;i<10;++i) x[i]=Math.floor(Math.random()*67);
return x
}
function revuelve(){
	a=[0,1,2,3,4,5];
	b=[Math.floor(Math.random()*5.99),0];
		
		b[1]=a[0];
		a[0]=a[b[0]];
		a[b[0]]=b[1];
	return a;
}
function ajja(a){
	var TagN=document.getElementById("reloj");
	TagN.innerHTML=a[0]+"h "+a[1]+" min "+a[2]+" s";
	if(a[0]==0 && a[1]==0 && a[2]==0){
		document.getElementById("Alumnos").disabled=true;
		TagN.innerHTML="Tiempo terminado"
		Inputs=document.getElementsByTagName("input");
		for(var k=0; k<Inputs.length;++k){
			Inputs[k].disabled=true;
		}
		LetsPlay();
		return;

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
	
	setTimeout(function (){ ajja(a)},1000)
}
function WhoSelected(names) { 
            var ele = document.getElementsByName(names); 
              
            for(i = 0; i < ele.length; i++) { 
                if(ele[i].checked) return i
            } 
			return 6;
}
function LetsPlay(){
	var K=eval("[ "+document.getElementById("reloj").getAttribute("txt2")+"];");
	var S=[];
	K[4]=document.getElementById("Alumnos").selectedIndex;
	for(var k=0;k<K[3];++k){
		S[k]=WhoSelected('R'+(k+1))
		K[k+6]=S[k]*6+K[k+6];
	}

	document.getElementById("reloj").setAttribute("txt3",K)
	C=eval("["+document.getElementById("reloj").getAttribute("txt")+"];");
	calificar(K)
	Cadena=EncriptarInfo(K,C);
	
	generateQRCode(Cadena)
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
function calificar(x){
	var N=x[3];
	var I=[],C=0;
	for(var k=0;k<N;++k){
		I[2*k]=x[k+6]%6;
		I[2*k+1]=(x[k+6]-I[2*k])/6;
		if (I[2*k+1]==I[2*k]) ++C;
	}
	document.getElementById("calificacion").innerHTML="</br>Calificacion: "+C+"/"+N+": "+Math.round(100*C/N);
	return I;
}
function NotacionCientifica(num){
		var numInSciNot = {};
		[numInSciNot.coefficient, numInSciNot.exponent] =num.toExponential().split('e').map(item => Number(item));
		return (numInSciNot.coefficient).toFixed(2)+"&times;10<sup>"+numInSciNot.exponent+'</sup>';
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
