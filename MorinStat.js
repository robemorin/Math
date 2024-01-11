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
	
	
	var salida="<br><center><svg style='border:solid red 2px;' width='"+(Dim[1]+10)+"px' height='"+(Dim[0]+10)+"px'><g transform='translate(5 5) scale("+(Dim[1]/Cuadricula[1])+")'>"
	//salida+='<path      id="heart"      d="M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z" />'
	if(Cuadricula.length>2){	
		for(var k=0;k<=Cuadricula[0];k+=Cuadricula[2])	salida+='<line x1="0" y1="'+k+'" x2="'+Cuadricula[1]+'" y2="'+k+'" stroke="blue"  stroke-width="'+(0.5*Cuadricula[1]/Dim[1])+'"/>'
		for(var k=0;k<=Cuadricula[1];k+=Cuadricula[2])  salida+='<line x1="'+k+'" y1="0" x2="'+k+'" y2="'+Cuadricula[0]+'" stroke="blue"  stroke-width="'+(0.5*Cuadricula[1]/Dim[1])+'"/>'
	}
	
	for(var k=0;k<=Cuadricula[0];++k) salida+='<line x1="0" y1="'+k+'" x2="'+Cuadricula[1]+'" y2="'+k+'" stroke="black"  stroke-width="'+(2*Cuadricula[1]/Dim[1])+'"/>'
	for(var k=0;k<=Cuadricula[1];++k) salida+='<line x1="'+k+'" y1="0" x2="'+k+'" y2="'+Cuadricula[0]+'" stroke="black"  stroke-width="'+(2*Cuadricula[1]/Dim[1])+'"/>'
	
	
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
function M_LinReg(x,y){
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
	return [m,b]
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