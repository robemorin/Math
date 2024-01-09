function NotacionCientifica(num){
		var numInSciNot = {};
		[numInSciNot.coefficient, numInSciNot.exponent] =num.toExponential().split('e').map(item => Number(item));
		return (numInSciNot.coefficient).toFixed(2)+"&times;10<sup>"+numInSciNot.exponent+'</sup>';
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
/* Estas ya no deben aparecer */
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
	P=coor2px(x,y,mx,bx,my,by)
	S+='<polyline points="'+P+'" fill="none" stroke="'+(color2==null?'#000':color2)+'" style="stroke-width: 2.5" />'
	S+='<circle cx="'+(bx)+'" cy="'+(my*yp[1]+by)+'" r="5" />'
	S+='<circle cx="'+(mx*xp[1]+bx)+'" cy="'+(my*yp[2]+by)+'" r="5" />'
	
	S+="</svg>"
	return S
	
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