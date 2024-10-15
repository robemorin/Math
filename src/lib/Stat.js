function Spearman(arr1, arr2) {
    // Verificar si las longitudes de los arreglos son iguales
    if (arr1.length !== arr2.length) {
        throw new Error('Los arreglos tienen longitudes diferentes');
    }

    // Crear copias de los arreglos originales
    const arr1Copy = arr1.slice();
    const arr2Copy = arr2.slice();

    // Función de clasificación para obtener los rangos
    function compare(a, b) {
        return a - b;
    }

    // Clasificar los arreglos y obtener los rangos
    arr1Copy.sort(compare);
    arr2Copy.sort(compare);

    // Función para obtener los rangos de los elementos en el arreglo
    function obtenerRangos(arr) {
        const ranks = {};
        for (let i = 0; i < arr.length; i++) {
            const val = arr[i];
            if (ranks[val] === undefined) {
                ranks[val] = [i + 1];
            } else {
                ranks[val].push(i + 1);
            }
        }
        return ranks;
    }

    // Obtener los rangos de los arreglos
    const ranks1 = obtenerRangos(arr1Copy);
    const ranks2 = obtenerRangos(arr2Copy);

    // Calcular la diferencia de rangos al cuadrado
    let dSquared = 0;
    for (let i = 0; i < arr1Copy.length; i++) {
        const diff = ranks1[arr1[i]].reduce((acc, val) => acc + val, 0) / ranks1[arr1[i]].length -
            ranks2[arr2[i]].reduce((acc, val) => acc + val, 0) / ranks2[arr2[i]].length;
        dSquared += diff * diff;
    }

    // Calcular la correlación de Spearman
    const n = arr1Copy.length;
    const spearmanCorrelation = 1 - (6 * dSquared) / (n * (n * n - 1));
    return spearmanCorrelation;
}
function Milimetrado(Dim,Cuadricula ){
	/*Ejemplo
	Milimetrado(600,[10, 20,.2] )
	*/
	Dim=[Dim*Cuadricula[0]/Cuadricula[1],	Dim]
	
	
	var salida="<center><svg width='"+(Dim[1]+10)+"px' height='"+(Dim[0]+10)+"px'><g transform='translate(5 5) scale("+(Dim[1]/Cuadricula[1])+")'>"
	//salida+='<path      id="heart"      d="M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z" />'
	if(Cuadricula.length>2){	
		for(var k=0;k<=Cuadricula[0];k+=Cuadricula[2])	salida+='<line x1="0" y1="'+k+'" x2="'+Cuadricula[1]+'" y2="'+k+'" stroke="RGB(256,200,100)"  stroke-width="'+(0.5*Cuadricula[1]/Dim[1])+'"/>'
		for(var k=0;k<=Cuadricula[1];k+=Cuadricula[2])  salida+='<line x1="'+k+'" y1="0" x2="'+k+'" y2="'+Cuadricula[0]+'" stroke="RGB(256,200,100)"  stroke-width="'+(0.5*Cuadricula[1]/Dim[1])+'"/>'
	}
	
	for(var k=0;k<=Cuadricula[0];++k) salida+='<line x1="0" y1="'+k+'" x2="'+Cuadricula[1]+'" y2="'+k+'" stroke="RGB(256,200,100)"  stroke-width="'+(2*Cuadricula[1]/Dim[1])+'"/>'
	for(var k=0;k<=Cuadricula[1];++k) salida+='<line x1="'+k+'" y1="0" x2="'+k+'" y2="'+Cuadricula[0]+'" stroke="RGB(256,200,100)"  stroke-width="'+(2*Cuadricula[1]/Dim[1])+'"/>'
	
	
	salida+='</g></svg></center>'
	
	return salida
}
function Cuartiles(datos){
	var d=datos.sort(function (a, b) { return a - b });
	n=d.length
	
	
	var Q=[	d[0], 
		(d[Math.floor(n/4)]+d[Math.ceil(n/4)])/2,
		(d[Math.floor(n/2)]+d[Math.ceil(n/2)])/2,
		(d[Math.floor(3*n/4)]+d[Math.ceil(3*n/4)])/2,
		d[n-1]]
	
	return Q
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
function mulAtor(min,Max){
	if(Max==0){
		return 1;
	}
	var M=1
	for(var k=min;k<=Max;++k){
		M*=k
	}
	return M
}
function comb(n,r){
	var m=n-r;
	if(m>r){
		q=m
		m=r
		r=q
	}
	return mulAtor(r+1,n)/mulAtor(1,m)
}
function M_binomialpdf(n,p,x){
	
	var C=comb(n,x)
	return C*Math.pow(p,x)*Math.pow(1-p,n-x)
}
function M_binomialcdf(n,p,x){
	var S=0
	for(var k=0; k<=x;++k){
		S+= M_binomialpdf(n,p,k)
	}
	return S
}
function M_binomialcdf_R(n,p,xL,xU){
	var S=0
	for(var k=xL; k<=xU;++k){
		S+= M_binomialpdf(n,p,k)
	}
	return S
}
function M_range_count(x,h){
	/*provee un arreglo del mínimo al máximo de h en h*/
	var c=M_range(x)
	var q=[c[0]]
	var k=0
	while(q[k]<c[1]){
		q[++k]=q[k-1]+h
	}
	return q
}
function M_range(x){
	/*Provee el mínimo y maximo*/
	var m_min=x[0]+1
	var m_max=x[0]-1
	for(k=0;k<x.length;++k){
		if(x[k]>m_max){
			m_max=x[k]
		}
		if(x[k]<m_min){
			m_min=x[k]
		}
	}
	return [m_min, m_max]
}
function M_2_var_stat(x,y){
	/*Emula la función 2 Var Stats de la calculadora*/
	/*var x=[-21,-17,-15,-14,-13]
	var y=[0,1,2,4,5]*/
	
	var n=x.length
	var xm=M_mean(x)
	var ym=M_mean(y)
	var Sumx=0
	var Sumy=0
	var Sumx2=0
	var Sumy2=0
	var Sumxy=0
	var Sx=0
	var Sy=0;
	for(var k=0;k<n;++k){
		Sumx+=x[k]
		Sumy+=y[k]
		Sumx2+=x[k]*x[k]
		Sumy2+=y[k]*y[k]
		Sumxy+=x[k]*y[k]
		Sx+=Math.pow(x[k]-xm,2)
		Sy+=Math.pow(y[k]-ym,2)
	}
	var S="<center><table><tr><td style='background-color:#333;color:white'> <b>2 Var Stats</b></td></tr>"
	S+="<tr><td align='left'>$\\overline x = "+Sumx/n+"$</td></tr>"
	S+="<tr><td align='left'>$\\sum x = "+Sumx+"$</td></tr>"
	S+="<tr><td align='left'>$\\sum x^2 = "+Sumx2+"$</td></tr>"
	S+="<tr><td align='left'>$S_x= "+Math.sqrt(Sx/(n-1))+"$</td></tr>"
	S+="<tr><td align='left'>$\\sigma_x="+Math.sqrt(Sx/n)+"$</td></tr>"
	S+="<tr><td align='left'>$n="+n+"$</td></tr>"
	S+="<tr><td align='left'>$\\overline y = "+Sumy/n+"$</td></tr>"
	S+="<tr><td align='left'>$\\sum y = "+Sumy+"$</td></tr>"
	S+="<tr><td align='left'>$\\sum y^2 = "+Sumy2+"$</td></tr>"
	S+="<tr><td align='left'>$S_y= "+Math.sqrt(Sy/(n-1))+"$</td></tr>"
	S+="<tr><td align='left'>$\\sigma_y="+Math.sqrt(Sy/n)+"$</td></tr>"
	S+="<tr><td align='left'>$\\sum xy="+Sumxy+"$</td></tr>"
	return S
}
function M_LinReg(x,y,op=null){
	/*Emula la función LinReg dela calculadora*/
	/*var x=[-21,-17,-15,-14,-13]
	var y=[0,1,2,4,5]*/
	
	var n=x.length
	var xm=M_mean(x)
	var ym=M_mean(y)
	var Sumxy=0
	var Sx=0
	for(var k=0;k<n;++k){
		Sumxy+=x[k]*y[k]
		Sx+=Math.pow(x[k]-xm,2)
	}
	var m=(Sumxy-n*xm*ym)/(Sx)
	var b=ym-m*xm
	if(op=='ec'){
		return `y = ${polinomio([eval(m.toPrecision(3)),eval(b.toPrecision(3))])}`
	}
	return [m,b]
}
function M_FacPearson(x,y){
	/*Emula la función LinReg dela calculadora*/
	/*var x=[-21,-17,-15,-14,-13]
	var y=[0,1,2,4,5]*/
	
	const n=x.length
	let Sumxy=0
	let Sumx=0
	let Sumx2=0
	let Sumy=0
	let Sumy2=0
	for(let k=0;k<n;++k){
		Sumx+=x[k]
		Sumx2+=x[k]*x[k]
		Sumy+=y[k]
		Sumy2+=y[k]*y[k]
		Sumxy+=x[k]*y[k]
	}
	return (n*Sumxy-Sumx*Sumy)/Math.sqrt((n*Sumx2-Sumx*Sumx)*(n*Sumy2-Sumy*Sumy))
}
function M_Sumxy(x,y){
	var S=0;
	var n=x.length
	for(var k=0;k<n;++k) S+=x[k]*y[k]
	return S
}
function M_mean(x){
	/*Promedio de un arreglo de números*/
	
	var mean=0;
	var n=x.length
	for(var k=0;k<n;++k) mean+=x[k]
	return mean/n
}
function M_covarianza(x,y){
	/*Obtiene la covarianza Sxy*/
	var xm=M_mean(x)
	var ym=M_mean(y)
	var n=x.length
	return (M_Sumxy(x,y)/n-xm*ym)
}
function M_AS2N(x){
	/*Array String to Number*/
	var v=[]
	var n=x.length
	for(var k=0;k<n;++k){
		v[k]=eval(x[k])
	}
	return v
}

function chiCuadradaCal(fo,fe=[[0]]) {
	const filas = fo.length;
	const columnas = fo[0].length;
	if(fe=='default'){
		const totalRows=[], totalCols=[]
		const dataEsperada=[]
		let nRows = fo.length
		let nCols = fo[0].length
		let total = 0
		for(let row=0;row<nRows;++row){
			totalRows.push(0)
			for(let col=0;col<nCols;++col)	 totalRows[row] += fo[row][col]
		}
		for(let col=0;col<nCols;++col){
			totalCols.push(0)
			for(let row=0;row<nRows;++row)	 totalCols[col] += fo[row][col]
			total += totalCols[col]
		}
		for(let row=0;row<nRows;++row){
			dataEsperada[row]=[]
			for(let col=0;col<nCols;++col)	 dataEsperada[row][col] = totalRows[row]*totalCols[col]/total
		}
		return chiCuadradaCal(fo,dataEsperada)
	}
	
	if(fe[0].length==1){
	  if(filas>1){
		  const Tx=[], Ty=[]
		  let T=0
		  for (let i = 0; i < filas; i++) {
			  Ty[i]=0
			  for (let j = 0; j < columnas; j++) 	Ty[i]+=fo[i][j]
			  T+=Ty[i]
		  }
		  for (let i = 0; i < columnas; i++) {
			  Tx[i]=0
			  for (let j = 0; j < filas; j++) 	Tx[i]+=fo[j][i]
		  }
		  for (let i = 0; i < filas; i++) {
			  fe[i]=[]
			  for (let j = 0; j < columnas; j++) 	fe[i][j]=Ty[i]*Tx[j]/T
		  }
	  }else{
		  let T=0
		  for (let j = 0; j < columnas; j++) 	T+=fo[0][j]
		  for (let j = 0; j < columnas; j++) 	fe[0][j]=T/columnas
	  }
	}
	  let x2 = 0;
	  let diferencia
	  
	for (let i = 0; i < filas; i++) {
	  for (let j = 0; j < columnas; j++) {
		diferencia = fo[i][j] - fe[i][j]
		x2 += diferencia * diferencia/fe[i][j]
	  }
	}
	return x2;
  }
  function chi_matriz_esperada(fo){
	const totalRows=[], totalCols=[]
		const dataEsperada=[]
		let nRows = fo.length
		let nCols = fo[0].length
		let total = 0
		for(let row=0;row<nRows;++row){
			totalRows.push(0)
			for(let col=0;col<nCols;++col)	 totalRows[row] += fo[row][col]
		}
		for(let col=0;col<nCols;++col){
			totalCols.push(0)
			for(let row=0;row<nRows;++row)	 totalCols[col] += fo[row][col]
			total += totalCols[col]
		}
		for(let row=0;row<nRows;++row){
			dataEsperada[row]=[]
			for(let col=0;col<nCols;++col)	 dataEsperada[row][col] = totalRows[row]*totalCols[col]/total
		}
		return [dataEsperada,totalCols,totalRows,total]
  }
  function chitablas(dof,alpha) {
	// 0.01, 0.05, 0.01
	const q=(alpha==0.01?0:(alpha==0.05?1:2))
		const chit=[[6.635,	3.842,	2.706],
	[9.210,	5.992,	4.605],
	[11.345,	7.815,	6.251],
	[13.277,	9.488,	7.779],
	[15.086,	11.071,	9.236],
	[16.812,	12.592,	10.645],
	[18.475,	14.067,	12.017],
	[20.09 ,	15.507,	13.362],
	[21.666,	16.919,	14.684],
	[23.209,	18.307,	15.987],
	[24.725,	19.675,	17.275],
	[26.217,	21.026,	18.549],
	[27.688,	22.362,	19.812],
	[29.141,	23.685,	21.064],
	[30.578,	24.996,	22.307],
	[32.000,	26.296,	23.542],
	[33.409,	27.587,	24.769],
	[34.805,	28.869,	25.989],
	[36.191,	30.144,	27.204],
	[37.566,	31.41,	28.412],
	[38.932,	32.671,	29.615],
	[40.289,	33.925,	30.813],
	[41.638,	35.173,	32.007],
	[42.98 ,	36.415,	33.196],
	[44.314,	37.653,	34.382],
	[45.642,	38.885,	35.563],
	[46.963,	40.113,	36.741],
	[48.278,	41.337,	37.916],
	[49.588,	42.557,	39.088]]
	  return chit[dof-1][q]
	}/*
function normalcdf(a,b,mu,sigma){
	function RS38(a,b,mu,sx){
		function f(x,mu,sx){ return Math.exp(-Math.pow(x-mu,2)/(2*sx*sx) ) }
		n=3*Math.round((b-a)/0.01)
		h = (b-a)/n
		let S=f(a,mu,sx)+f(b,mu,sx)
		for (let i = 1 ; i < n ; i++)
		{
			if (i % 3 == 0)
				S += 2 * f(a + i * h, mu, sx);
			else
				S += 3 * f(a + i * h, mu, sx);
		}
		return ( 3 * h / 8 ) * S ;
	}
	

	a=eval(a)
	b=eval(b)
	mu=eval(mu)
	sigma=eval(sigma)
	//alert("f(x)= exp(-(x-"+mu+")^2/(2*"+sigma+"^2))/("+sigma+"*sqrt(2*pi))\nintegral(f,"+a+","+b+") = "+RS38(a,b,mu,sigma)/(sigma*Math.sqrt(2*Math.PI)))
	return RS38(a,b,mu,sigma)/(sigma*Math.sqrt(2*Math.PI))
}*/
function normalcdf(a,b,mu,sigma){
	function RS38(a,b,mu,sx){
		function f(x){ return Math.exp(-Math.pow(x,2)/(2) ) }
		n=3*Math.round((b-a)/0.01)
		h = (b-a)/n
		let S=f(a)+f(b)
		for (let i = 1 ; i < n ; i++)
		{
			if (i % 3 == 0)
				S += 2 * f( a + i*h );
			else
				S += 3 * f( a + i*h );
		}
		return ( 3 * h / 8 ) * S ;
	}
	a=eval(a)
	b=eval(b)
	mu=eval(mu)
	sigma=eval(sigma)
	a=(a-mu)/sigma
	b=(b-mu)/sigma
	return RS38(a,b)/(Math.sqrt(2*Math.PI))
}
function invNorm(A,mu,sigma,opcion='LEFT'){
	function invNorm2(Area){
		function normalpdf(x){ return Math.exp(-x*x/(2) ) }
		let A= 0
		let x = 0
		let h=0.00005/3
		for (let i = 1 ; true ; i++)
		{
			if (i % 3 == 0){
				x= i * h
				let dummy = normalpdf( x )
				A += dummy
				if((3*h*A/(8*Math.sqrt(2*Math.PI)))>Area){ return x }
				/*if(Math.abs(10*x-Math.round(10*x))<0.000001){
					console.log("x:"+x.toFixed(1)+";  A = "+(3*h*A/(8*Math.sqrt(2*Math.PI))).toFixed(4))
				}*/
				A += dummy
			}else{
				A += 3 * normalpdf( i*h )		
			}
		}
	}
	A=eval(A)
	mu=eval(mu)
	sigma=eval(sigma)
	let z
	switch(opcion){
		case 'LEFT':
			z = sigma*invNorm2(  Math.abs(A-0.5) )
			return A>=0.5 ? mu+z : mu-z
		case 'RIGHT':
			A = 1 - A
			z = sigma*invNorm2(  Math.abs(A-0.5) )
			return A>=0.5 ? mu+z : mu-z
		case 'CENTER':
			z = sigma*invNorm2(  Math.abs(A/2) )
			return [ mu-z,mu+z]
	}
}
function tcrit(alpha,dof,tails){
	let col
	if(tails==2) alpha/=2;
		col=1
	if(alpha==0.1){
		col=2
	}else if(alpha==0.05){
		col=3
	}else if(alpha==0.025){
		col=4
	}else if(alpha==0.01){
		col=5
	}else if(alpha==0.005){
		col=6
	}
	if(dof>30) dof=30
	if(dof<1) dof=1
	if(tails!=1 && tails!=2) tails=1
	
	t=[
	[1, 1.0000, 3.0777, 6.3137, 12.7062, 31.8210, 63.6559],
	[2, 0.8165, 1.8856, 2.9200, 4.3027, 6.9645, 9.9250],
	[3, 0.7649, 1.6377, 2.3534, 3.1824, 4.5407, 5.8408],
	[4, 0.7407, 1.5332, 2.1318, 2.7765, 3.7469, 4.6041],
	[5, 0.7267, 1.4759, 2.0150, 2.5706, 3.3649, 4.0321],
	[6, 0.7176, 1.4398, 1.9432, 2.4469, 3.1427, 3.7074],
	[7, 0.7111, 1.4149, 1.8946, 2.3646, 2.9979, 3.4995],
	[8, 0.7064, 1.3968, 1.8595, 2.3060, 2.8965, 3.3554],
	[9, 0.7027, 1.3830, 1.8331, 2.2622, 2.8214, 3.2498],
	[10, 0.6998, 1.3722, 1.8125, 2.2281, 2.7638, 3.1693],
	[11, 0.6974, 1.3634, 1.7959, 2.2010, 2.7181, 3.1058],
	[12, 0.6955, 1.3562, 1.7823, 2.1788, 2.6810, 3.0545],
	[13, 0.6938, 1.3502, 1.7709, 2.1604, 2.6503, 3.0123],
	[14, 0.6924, 1.3450, 1.7613, 2.1448, 2.6245, 2.9768],
	[15, 0.6912, 1.3406, 1.7531, 2.1315, 2.6025, 2.9467],
	[16, 0.6901, 1.3368, 1.7459, 2.1199, 2.5835, 2.9208],
	[17, 0.6892, 1.3334, 1.7396, 2.1098, 2.5669, 2.8982],
	[18, 0.6884, 1.3304, 1.7341, 2.1009, 2.5524, 2.8784],
	[19, 0.6876, 1.3277, 1.7291, 2.0930, 2.5395, 2.8609],
	[20, 0.6870, 1.3253, 1.7247, 2.0860, 2.5280, 2.8453],
	[21, 0.6864, 1.3232, 1.7207, 2.0796, 2.5176, 2.8314],
	[22, 0.6858, 1.3212, 1.7171, 2.0739, 2.5083, 2.8188],
	[23, 0.6853, 1.3195, 1.7139, 2.0687, 2.4999, 2.8073],
	[24, 0.6848, 1.3178, 1.7109, 2.0639, 2.4922, 2.7970],
	[25, 0.6844, 1.3163, 1.7081, 2.0595, 2.4851, 2.7874],
	[26, 0.6840, 1.3150, 1.7056, 2.0555, 2.4786, 2.7787],
	[27, 0.6837, 1.3137, 1.7033, 2.0518, 2.4727, 2.7707],
	[28, 0.6834, 1.3125, 1.7011, 2.0484, 2.4671, 2.7633],
	[29, 0.6830, 1.3114, 1.6991, 2.0452, 2.4620, 2.7564],
	[30, 0.6828, 1.3104, 1.6973, 2.0423, 2.4573, 2.7500]]
	return t[dof-1][col]
	}