function Histograma(Datos,tick,dim,color,h,Etiqueta){
	/*
	* axis([xmin xmax ymin ymax xscal yscal])
	* dim([height width])
	********Mejorar esta función*******************
	Ejemplo
	Histograma(		[[4,6,8,10,12,14],[12,18,14,12,22,20]],//Datos
					[10,12,14,16,18,20,22,24],//tick eje y
					[300,450],//Dimensiones
					"#03B",//Color de las barras
					50,// Espacio para las etiquetas
					"Eje x")//Etiqueta eje x
	*/
	
		var hy=tick[0]==0?0:h
		var h2=h/2
		
		var p= h+","+h2+" "+(h+","+(dim[0]+h2))+" "
			p+=(tick[0]==0?"": (h+","+(dim[0]+h2+0.25*h)+" "+0.75*h+","+(dim[0]+h2+0.5*h)+" "+1.25*h+","+(dim[0]+h2+0.5*h)+" "+h+","+(dim[0]+h2+0.75*h)+" "+h+","+(dim[0]+h2+h)))
			p+=Datos[0][0]==0?" ": " "+(1.25*h)+", "+(dim[0]+h2+hy)+" "+(1.5*h)+", "+(dim[0]+h2+hy-0.25*h)+" "+(1.5*h)+", "+(dim[0]+h2+hy+0.25*h)+" "+(1.75*h)+", "+(dim[0]+h2+hy)
			p+=" "+(dim[1]+h2)+", "+(dim[0]+hy+h2)
		

		var S1="<polyline points='"+p+"' fill='none' stroke='black' style='stroke-width: 1'/>"
	
	
	
	var my=-dim[0]/(tick[tick.length-1]-tick[0])
	var by=dim[0]+h2-my*tick[0]
	var xpm=h2+Datos[0][0]==0?h:2*h
	var xpM=dim[1]+h
	var nx=Datos[0].length
	
	var S="<svg width="+(dim[1]+(Datos[0][0]==0?h:2*h)+h2)+" height="+(dim[0]+(tick[0]==0?h:2*h)+h2)+" style='border:solid red 2px'>"
	for(var k=0;k<tick.length;++k){
		S+='<line x1="'+h+'" y1="'+(my*tick[k]+by)+'" x2="'+(dim[1]+h)+'" y2="'+(my*tick[k]+by)+'" stroke="gray" style="stroke-width: 1"/>'
	}
	for(var k=0;k<Datos[0].length;++k){
		S+='<rect width="'+(xpM-xpm)/nx+'" height="'+(dim[0]+hy+h2-my*Datos[1][k]-by)+'" x="'+(k*(xpM-xpm)/nx+xpm)+'" y="'+(my*Datos[1][k]+by)+'" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />'
	}
		
	S+=S1
	
	/*Construir ejes*/
	for(var k=0;k<tick.length;++k){
		S+='<line x1="'+(.8*h)+'" y1="'+(my*tick[k]+by)+'" x2="'+(h)+'" y2="'+(my*tick[k]+by)+'" stroke="black" style="stroke-width: 2"/>'
		S+='<text font-size="'+(h*.01)+'em" x="'+(.8*h)+'" y="'+(my*tick[k]+by)+'" dominant-baseline="middle" text-anchor="end">'+tick[k]+'</text> '
	}
	
	
	
	for(var k=0;k<Datos[0].length;++k){
		S+='<line x1="'+((k+1)*(xpM-xpm)/nx+xpm)+'" y1="'+(dim[0]+hy+h2)+'" x2="'+((k+1)*(xpM-xpm)/nx+xpm)+'" y2="'+(dim[0]+hy+h2+4)+'" stroke="black" style="stroke-width: 2"/>'
		S+='<text font-size="'+(h*.01)+'em" x="'+((k+0.5)*(xpM-xpm)/nx+xpm)+'" y="'+(dim[0]+hy+h2+4)+'" dominant-baseline="hanging" text-anchor="end">'+Datos[0][k]+'</text> '
	}
	 
	S+='<defs><path id="Ejey" d="M '+(h/4+2)+' '+(dim[0]+hy+h2)+' L '+(h/4+2)+' 5 Z" /></defs><text font-size="'+(h*.02)+'em" dominant-baseline="middle" text-anchor="start"><textPath startOffset="25%" text-anchor="middle" xlink:href="#Ejey">Frecuencia</textPath></text>'
	S+='<text font-size="'+(h*.02)+'em" x="'+(dim[1]/2+h2)+'" y="'+(dim[0]+hy+h+4)+'" dominant-baseline="auto" text-anchor="middle">'+Etiqueta+'</text> '
	
	S+="</svg>"
	return S
}
function ejes(axis,dim,color){
	/*
	* axis([xmin xmax ymin ymax xscal yscal])
	* dim([height width])
	*/
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
	S+="</svg>"
	return S
}
function linspace(min,max,n){
	var h=(max-min)/n;
	var x=[]
	for (var k=0;k<n;++k) x[k]=k*h+min
	return x
	
}
function plot(axis,dim,x,y,color,color2){
	/*
	*
	* axis([xmin xmax ymin ymax xscal yscal])
	* dim([height width])
	* 
	*/
	
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
	P=coor2px(x,y,mx,bx,my,by)
	S+='<polyline points="'+P+'" fill="none" stroke="'+(color2==null?'#000':color2)+'" style="stroke-width: 2.5" />'
	S+="</svg>"
	return S
}
function coor2px(x,y,mx,bx,my,by){
	var P=''
	for(var k=0;k<x.length;++k){
		P+=" "+(mx*x[k]+bx)+","+(my*y[k]+by)
	}
	return P
	
}