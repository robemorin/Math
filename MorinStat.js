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