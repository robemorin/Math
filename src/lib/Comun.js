function NotacionCientifica(num){
		var numInSciNot = {};
		[numInSciNot.coefficient, numInSciNot.exponent] =num.toExponential().split('e').map(item => Number(item));
		return (numInSciNot.coefficient).toFixed(2)+"&times;10<sup>"+numInSciNot.exponent+'</sup>';
}
function mcd_new(a, b) {
	if (b === 0) return a;
	return mcd_new(b, a % b);
  }
function polinomio(v,x='x'){
	//Se debe modificar para que imprima con fracciones en caso de ser
	while(v[0]==0){
		if(v.length==1) return '0'
		v.shift();
	}
	const n=v.length;
	let S
	if(n==1){ S=`${v[0]<0?"-":""} ${Math.abs(v[0])}`
	}else if(n==2){ S=(v[0]<0?"-":"")+(Math.abs(v[0])==1?'':Math.abs(v[0]))+x
	}else S=(v[0]<0?"-":"")+(Math.abs(v[0])==1?'':Math.abs(v[0]))+x+"^{"+(n-1)+"}"
	
	
	for(var k=1;k<n;++k){
		if(v[k]!=0){

		if(k==n-1){ S+=(v[k]<0?"-":"+")+Math.abs(v[k])
		}else if(k==n-2){ S+=(v[k]<0?"-":"+")+(Math.abs(v[k])==1?'':Math.abs(v[k]))+x
		}else S+=(v[k]<0?"-":"+")+(Math.abs(v[k])==1?'':Math.abs(v[k]))+x+"^"+(n-k-1)

		}
	}
	return S
}
function multiply(a1, a2) {
	//para polinomios
	var result = [];
	a1.forEach(function (a, i) {
		a2.forEach(function (b, j) {
			result[i + j] = (result[i + j] || 0) + a * b;
		});
	});
	return result;
}
  function mcm_new(numeros) {
	let mcm = numeros[0];
	for (let i = 1; i < numeros.length; i++) {
	  mcm = (mcm * numeros[i]) / mcd_new(mcm, numeros[i]);
	}
	return mcm;
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
function Max(x){
	var m=Math.min.apply(Math, x);
	var M=Math.max.apply(Math, x)
	
	if(M>(-m)){
		return M
	}else{
		return -m
	}
}
function MCMHelp(x,a){
	for(var k=0;k<x.length;++k){
		if((x[k]%a)!=0) return false;
	}
	return true;
}
function simplify_frac(a){
	/* [5,3] <- simplify_frac([10,6]) solo dos valores*/
	let mcd = mcd_new(a[0],a[1])
	mcd *= mcd*a[1]<0?-1:1
	return [a[0]/mcd,a[1]/mcd]
}
/* Estas ya no deben aparecer */
function Exp2fun(xp,yp){
		var a=yp[1]-yp[0]
		var c=yp[0]
		var b=Math.pow((yp[2]-yp[0])/(yp[1]-yp[0]),1/xp[1])
		return [a,b,c]
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
}
function linspace(x_min,x_max,n=100){
	const x=[]
	const h=(x_max-x_min)/(n-1)
	for(let k=0;k<n;++k) x.push(x_min+k*h)
	return x
}
function fraccion(a,b,op=false){
	
		if(b==0){
			return `${a<0?'-':''}\\infty`
		}else if(a == 0){
			return 0
		}
		let den = simplify_frac([a,b])
		if( Math.abs(den[1]) == 1 ){
			return den[0]*den[1]
		}
		
		if(!op){
			const sig = den[1]<0?-1:1
			return `\\frac{${sig*den[0]}}{${sig*den[1]}}`
		}else{
			const sig = den[0]*den[1]<0?'-':''
			return `${sig}\\frac{${Math.abs(den[0])}}{${Math.abs(den[1])}}`
		}
		
}
function evaluar(expresion,X){
	const y = []
	X.forEach((x) => {
		y.push(eval(expresion));
	  });
	  return y
}
function convertirANotacionCientificaFormal(numeroEnNotacionCientifica) {
	// Dividir el número en la parte decimal y el exponente
	const partes = numeroEnNotacionCientifica.split('E');
	const decimal = parseFloat(partes[0]);
	const exponente = parseInt(partes[1]);
  
	// Formatear la salida
	return `${decimal} x 10^${exponente}`;
  }
