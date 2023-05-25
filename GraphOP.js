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