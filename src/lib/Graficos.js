function NormalGraph(Datos=[-1,1.5,1,2],Size=[400,200]){
	
	if(Datos[1]<Datos[0])	[Datos[0],Datos[1]] = [Datos[1],Datos[0]];
    
	SVG=createSVG(Size)
    esc=[   [ (Size[0]-20)/6,Size[0]/2],
            [-(Size[1]-35),Size[1]-30]]
			
	let l,txt
	z_lower=(Datos[0]-Datos[2])/Datos[3]
	z_upper=(Datos[1]-Datos[2])/Datos[3]
	let PointTem
	if(-3<z_lower && z_lower<3 ){
			txt = document.createElementNS('http://www.w3.org/2000/svg', 'text')
			txt.setAttribute("x",esc[0][0]*z_lower+esc[0][1] )
			txt.setAttribute("y",Size[1]-30 )
			txt.setAttribute("alignment-baseline","hanging")
			txt.setAttribute("text-anchor","end")
			txt.setAttribute("style","font: .7em Verdana, Helvetica, Arial, sans-serif;")
			txt.setAttribute("stroke","none")
			txt.setAttribute("fill","blue")
			txt.textContent=Datos[0].toPrecision(3)
			SVG.appendChild(txt)
		if( z_upper<3){
			txt = document.createElementNS('http://www.w3.org/2000/svg', 'text')
			txt.setAttribute("x",esc[0][0]*z_upper+esc[0][1] )
			txt.setAttribute("y",Size[1]-30 )
			txt.setAttribute("alignment-baseline","hanging")
			txt.setAttribute("style","font: .7em Verdana, Helvetica, Arial, sans-serif;")
			txt.setAttribute("stroke","none")
			txt.setAttribute("fill","blue")
			txt.textContent=Datos[1].toPrecision(3)
			SVG.appendChild(txt)
			
		}else{
			z_upper<3
		}
	}else{
		z_lower=-3
		if( z_upper<3){
			
		}else{
			z_upper<3
		}
	}
		
	PointTem=(esc[0][0]*z_lower+esc[0][1])+", "+(Size[1]-30)+" "
			
	const dummy=linspace(z_lower,z_upper,100)
	for(let k=0;k<dummy.length;++k){
		PointTem+=(esc[0][0]*dummy[k]+esc[0][1])+", "+(esc[1][0]*Math.exp(-dummy[k]*dummy[k])+esc[1][1])+" "
	}
	PointTem+=(esc[0][0]*z_upper+esc[0][1])+", "+(Size[1]-30)+" "
		
	l = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
	l.setAttribute("points",PointTem )
	l.setAttribute("stroke", "gray")
	l.setAttribute("fill", "#DB9BE5")
	l.setAttribute('stroke-width', 2)
	SVG.appendChild(l)
	
	
	l = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
    l.setAttribute("points", 5+","+(Size[1]-30)+" "+(Size[0]-5)+","+(Size[1]-30) )
    l.setAttribute("stroke", "RGB(100,100,100)")
    l.setAttribute('stroke-width', 2)
    SVG.appendChild(l)
	z_lower=(Datos[0]-Datos[2])/Datos[3]
	z_upper=(Datos[1]-Datos[2])/Datos[3]


	
	l = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
    let Point=""
    const x=linspace(-3,3,100)
    
    for(let k=0;k<x.length;++k){
        Point+=(esc[0][0]*x[k]+esc[0][1])+", "+(esc[1][0]*Math.exp(-x[k]*x[k])+esc[1][1])+" "
    } 
    l.setAttribute("points",Point )
    l.setAttribute("stroke", "RGB(100,100,200)")
    l.setAttribute('stroke-width', 2)
    SVG.appendChild(l)
	
	
    return SVG

}
function plot(P,dim=[300,200],lim=[-10,10,-10,10]){
    /***************** Ejemplo ******************************
    const Puntos=[	[[0,1,5,6,2,7],
                     [5,4,3,2,1,-5],'oRGB(255,100,155)'],
                     [[0,1,5,6,2,7],
                     [5,4,3,2,1,-5],'-RGB(100,155,255)']]
    ElemP=plot(Puntos,[600,400],[-10,10,-10,10,[2,2],[1,1]])
    *********************************************************/
    let o,l,Point
    function coo2px(P,dim,lim){
        const m=[(dim[0]-40)/(lim[1]-lim[0]),-(dim[1]-40)/(lim[3]-lim[2])]
        const b=[20-m[0]*lim[0],20-m[1]*lim[3]]
        return [m[0]*P[0]+b[0],m[1]*P[1]+b[1]]
    }
    let ax=createAxis(lim,dim)

    for(let k=0;k<P.length;++k){
        if(P[k][2].charAt(0)=='o'){
            for(let k1=0;k1<P[k][0].length;++k1){
                //alert([P[k][0][k1],P[k][1][k1]])
                Point=coo2px([P[k][0][k1],P[k][1][k1]],dim,lim)
                o = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
                o.setAttribute("cx",Point[0] )
                o.setAttribute("cy",Point[1] )
                o.setAttribute("r","5")
                o.setAttribute("stroke",P[k][2].substring(1))
                o.setAttribute('stroke-width', "3");
                ax.appendChild(o)
            }
        }else if(P[k][2].charAt(0)=='-'){
            l = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
            Point=""
            for(let k1=0;k1<P[k][0].length;++k1){
                if(lim[0]<=P[k][0][k1] && P[k][0][k1]<=lim[1] && lim[2]<=P[k][1][k1] && P[k][1][k1]<=lim[3]){
                    Point+=" "+coo2px([P[k][0][k1],P[k][1][k1]],dim,lim)
                }else{
                    l.setAttribute("points",Point )
                    l.setAttribute("stroke",P[k][2].substring(1))
                    l.setAttribute('stroke-width', "3");
                    ax.appendChild(l)
                    l = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
                    Point=""
                }
            }
            l.setAttribute("points",Point )
            l.setAttribute("stroke",P[k][2].substring(1))
            l.setAttribute('stroke-width', "3");
            ax.appendChild(l)
        }else if(P[k][2].charAt(0)=='t'){
            //<text x="20" y="35" class="small">My</text>
           /* txt = document.createElementNS('http://www.w3.org/2000/svg','text')
            txt.setAttribute('x',P[0])
            txt.setAttribute('y',P[1])
            txt.setAttribute("fill", "black")
            txt.setAttribute('style','font: italic 12px sans-serif;')
            txt.textContent=k*lim[4][1]
            if(k!=0){ SVG.appendChild(txt)}*/

            l = document.createElementNS('http://www.w3.org/2000/svg', 'text')
            let temp=coo2px([P[k][0],P[k][1]],dim,lim)
            l.setAttribute("x",temp[0])
            l.setAttribute("y",eval(temp[1])+15)
            l.setAttribute("fill",P[k][2].substring(1))
            l.setAttribute('style','font: italic 16px sans-serif;')
            l.textContent=P[k][3]
            ax.appendChild(l)
        }
            
    }
    return ax

}
function createSVG(dim=[300,200]){
    //ElemSVG=CreateSVG()
    let SVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    SVG.setAttribute("width", dim[0]+"px");
    SVG.setAttribute("height", dim[1]+"px");
    SVG.setAttribute('fill', 'none')
    SVG.setAttribute('stroke', 'black')
    return SVG
}
function createAxis(lim=[-1,1,-1,1,[0.5,0.5]],dim=[300,200]){
//ElemAxis=createAxis([-1,1,-1,1,[0.5,0.5],[0.1,0.1]],[600,400])
    function coo2px(P,dim,lim){
        const m=[(dim[0]-40)/(lim[1]-lim[0]),-(dim[1]-40)/(lim[3]-lim[2])]
        const b=[20-m[0]*lim[0],20-m[1]*lim[3]]
        return [m[0]*P[0]+b[0],m[1]*P[1]+b[1]]
    }
    let dummy
    let SVG=createSVG(dim)
    let group0 = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    //Cuadricula secundaria
    let Line
    if(lim.length>5){
        for(let k=Math.floor(lim[0]/lim[5][0]);k<=Math.ceil(lim[1]/lim[5][0]);++k) {
            Line = document.createElementNS('http://www.w3.org/2000/svg','line');
            dummy=coo2px([k*lim[5][0],lim[2]],dim,lim)
            Line.setAttribute('x1',dummy[0])
            Line.setAttribute('y1',dummy[1])
            dummy=coo2px([k*lim[5][0],lim[3]],dim,lim)
            Line.setAttribute('x2',dummy[0])
            Line.setAttribute('y2',dummy[1])
            Line.setAttribute("stroke-dasharray","5,5")
            Line.setAttribute("stroke", "RGB(254,114,0)")
            Line.setAttribute('stroke-width', 1);
            group0.appendChild(Line)
        }
        for(let k=Math.floor(lim[2]/lim[5][1]);k<=Math.ceil(lim[3]/lim[5][1]);++k) {
            Line = document.createElementNS('http://www.w3.org/2000/svg','line');

            dummy=coo2px([lim[0],k*lim[5][1]],dim,lim)
            Line.setAttribute('x1',dummy[0])
            Line.setAttribute('y1',dummy[1])
            dummy=coo2px([lim[1],k*lim[5][1]],dim,lim)
            Line.setAttribute('x2',dummy[0])
            Line.setAttribute('y2',dummy[1])
            Line.setAttribute("stroke-dasharray","5,5")
            Line.setAttribute("stroke", "RGB(254,114,0)")
            Line.setAttribute('stroke-width', 1);
            group0.appendChild(Line)
        }
    }
    // Cuadricula principal
    if(lim.length>4){
        for(let k=Math.floor(lim[0]/lim[4][0]);k<=Math.ceil(lim[1]/lim[4][0]);++k) {
            Line = document.createElementNS('http://www.w3.org/2000/svg','line')
            dummy=coo2px([k*lim[4][0],lim[2]],dim,lim)
            Line.setAttribute('x1',dummy[0])
            Line.setAttribute('y1',dummy[1])
            dummy=coo2px([k*lim[4][0],lim[3]],dim,lim)
            Line.setAttribute('x2',dummy[0])
            Line.setAttribute('y2',dummy[1])
            Line.setAttribute("stroke", "RGB(254,114,0)")
            Line.setAttribute('stroke-width', 1);
            group0.appendChild(Line)
        }
        for(let k=Math.floor(lim[2]/lim[4][1]);k<=Math.ceil(lim[3]/lim[4][1]);++k) {
            Line = document.createElementNS('http://www.w3.org/2000/svg','line');
            dummy=coo2px([lim[0],k*lim[4][1]],dim,lim)
            Line.setAttribute('x1',dummy[0])
            Line.setAttribute('y1',dummy[1])
            dummy=coo2px([lim[1],k*lim[4][1]],dim,lim)
            Line.setAttribute('x2',dummy[0])
            Line.setAttribute('y2',dummy[1])
            Line.setAttribute("stroke", "RGB(254,114,0)")
            Line.setAttribute('stroke-width', 1);
            group0.appendChild(Line)
        }
    }

    //Ejes principales
    Line = document.createElementNS('http://www.w3.org/2000/svg','line');
    dummy=coo2px([lim[0],0],dim,lim)
    Line.setAttribute('x1',dummy[0])
    Line.setAttribute('y1',dummy[1]);dummy=coo2px([lim[1],0],dim,lim)
    Line.setAttribute('x2',dummy[0])
    Line.setAttribute('y2',dummy[1])
    Line.setAttribute("stroke", "RGB(254,114,0)")
    Line.setAttribute('stroke-width', 2);
    group0.appendChild(Line)
    Line = document.createElementNS('http://www.w3.org/2000/svg','line');
    dummy=coo2px([0,lim[2]],dim,lim)
    Line.setAttribute('x1',dummy[0])
    Line.setAttribute('y1',dummy[1]);dummy=coo2px([0,lim[3]],dim,lim)
    Line.setAttribute('x2',dummy[0])
    Line.setAttribute('y2',dummy[1])
    Line.setAttribute("stroke", "RGB(254,114,0)")
    Line.setAttribute('stroke-width', 2);
    group0.appendChild(Line)

    SVG.appendChild(group0)
    //Etiquetas
    if(lim.length>4){
        let txt, txt2, P
        for(let k=Math.floor(lim[0]/lim[4][0]);k<=Math.ceil(lim[1]/lim[4][0]);++k) {
            P=coo2px([k*lim[4][0],0],dim,lim)
            txt = document.createElementNS('http://www.w3.org/2000/svg','text')
            txt2 = document.createElementNS('http://www.w3.org/2000/svg','tspan')
            txt2.setAttribute('x',P[0])
            txt2.setAttribute('y',P[1]+2)
            txt2.setAttribute("fill", "black")
            txt2.setAttribute('style','font: italic 12px sans-serif;')
            txt2.setAttribute("alignment-baseline","hanging")
            txt2.setAttribute("text-anchor","middle")
            txt2.textContent=k*lim[4][0]
            txt.appendChild(txt2)
            if(k!=0){ SVG.appendChild(txt)}

        }
        for(let k=Math.floor(lim[2]/lim[4][1]);k<=Math.ceil(lim[3]/lim[4][1]);++k) {
            P=coo2px([0,k*lim[4][1]],dim,lim)
            txt = document.createElementNS('http://www.w3.org/2000/svg','text')
            txt.setAttribute('x',P[0])
            txt.setAttribute('y',P[1])
            txt.setAttribute("fill", "black")
            txt.setAttribute('style','font: italic 12px sans-serif;')
            txt.textContent=k*lim[4][1]
            if(k!=0){ SVG.appendChild(txt)}
        }
    }
    return SVG

}
function PolyFrecAcum(P,lim=[0,100,0,100,[20,20],[5,5]],dim=[500,200]){
    /***************** sintaxis **********************
    *   PolyFrecAcum([[0,10,50,80,100],[0,1,70,95,100],'Tiempo (s)'],//data
                          [0,100,0,100,[20,20],[5,5]],//x,y limits
                          [300,300])//size
    **************************************************/
   const n=100
    let f = interpolate(P[0],P[1]);
	  let message = '';
    const D=(P[0][P[0].length-1]-P[0][0])/n
    let xp=[]
    let yp=[]
	  for (let x = P[0][0]; x <= P[0][P[0].length-1]; x += D) {
      xp.push(x)
      yp.push(f(x))
	  }
    let ax=createPlane(P[2],lim,dim,[xp,yp])
	  //return [xp,yp]
      let center = document.createElement('div')
    center.style.textAlign = "center";
    center.appendChild(ax)
    return center

  function createPlane(xlabel,lim,dim,Q){
    function coo2px(P,dim,lim){
        const m=[(dim[0]-60)/(lim[1]-lim[0]),-(dim[1]-60)/(lim[3]-lim[2])]
        const b=[40-m[0]*lim[0],20-m[1]*lim[3]]
        return [m[0]*P[0]+b[0],m[1]*P[1]+b[1]]
    }
    let dummy
    let SVG=createSVG(dim)
    let group0 = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    //Cuadricula secundaria
    let Line
    if(lim.length>5){
        for(let k=Math.floor(lim[0]/lim[5][0]);k<=Math.ceil(lim[1]/lim[5][0]);++k) {
            Line = document.createElementNS('http://www.w3.org/2000/svg','line');
            dummy=coo2px([k*lim[5][0],lim[2]],dim,lim)
            Line.setAttribute('x1',dummy[0])
            Line.setAttribute('y1',dummy[1])
            dummy=coo2px([k*lim[5][0],lim[3]],dim,lim)
            Line.setAttribute('x2',dummy[0])
            Line.setAttribute('y2',dummy[1])
            Line.setAttribute("stroke", "RGB(254,114,0)")
            Line.setAttribute('stroke-width', .5);
            group0.appendChild(Line)
        }
        for(let k=Math.floor(lim[2]/lim[5][1]);k<=Math.ceil(lim[3]/lim[5][1]);++k) {
            Line = document.createElementNS('http://www.w3.org/2000/svg','line');

            dummy=coo2px([lim[0],k*lim[5][1]],dim,lim)
            Line.setAttribute('x1',dummy[0])
            Line.setAttribute('y1',dummy[1])
            dummy=coo2px([lim[1],k*lim[5][1]],dim,lim)
            Line.setAttribute('x2',dummy[0])
            Line.setAttribute('y2',dummy[1])
            Line.setAttribute("stroke", "RGB(254,114,0)")
            Line.setAttribute('stroke-width', .5);
            group0.appendChild(Line)
        }
    }
    // Cuadricula principal
    if(lim.length>4){
        for(let k=Math.floor(lim[0]/lim[4][0]);k<=Math.ceil(lim[1]/lim[4][0]);++k) {
            Line = document.createElementNS('http://www.w3.org/2000/svg','line')
            dummy=coo2px([k*lim[4][0],lim[2]],dim,lim)
            Line.setAttribute('x1',dummy[0])
            Line.setAttribute('y1',dummy[1])
            dummy=coo2px([k*lim[4][0],lim[3]],dim,lim)
            Line.setAttribute('x2',dummy[0])
            Line.setAttribute('y2',dummy[1])
            Line.setAttribute("stroke", "RGB(254,114,0)")
            Line.setAttribute('stroke-width', 1);
            group0.appendChild(Line)
        }
        for(let k=Math.floor(lim[2]/lim[4][1]);k<=Math.ceil(lim[3]/lim[4][1]);++k) {
            Line = document.createElementNS('http://www.w3.org/2000/svg','line');
            dummy=coo2px([lim[0],k*lim[4][1]],dim,lim)
            Line.setAttribute('x1',dummy[0])
            Line.setAttribute('y1',dummy[1])
            dummy=coo2px([lim[1],k*lim[4][1]],dim,lim)
            Line.setAttribute('x2',dummy[0])
            Line.setAttribute('y2',dummy[1])
            Line.setAttribute("stroke", "RGB(254,114,0)")
            Line.setAttribute('stroke-width', 1);
            group0.appendChild(Line)
        }
    }

    //Ejes principales
    Line = document.createElementNS('http://www.w3.org/2000/svg','line');
    dummy=coo2px([lim[0],0],dim,lim)
    Line.setAttribute('x1',dummy[0])
    Line.setAttribute('y1',dummy[1]);dummy=coo2px([lim[1],0],dim,lim)
    Line.setAttribute('x2',dummy[0])
    Line.setAttribute('y2',dummy[1])
    Line.setAttribute("stroke", "RGB(254,114,0)")
    Line.setAttribute('stroke-width', 2);
    group0.appendChild(Line)
    Line = document.createElementNS('http://www.w3.org/2000/svg','line');
    dummy=coo2px([0,lim[2]],dim,lim)
    Line.setAttribute('x1',dummy[0])
    Line.setAttribute('y1',dummy[1]);dummy=coo2px([0,lim[3]],dim,lim)
    Line.setAttribute('x2',dummy[0])
    Line.setAttribute('y2',dummy[1])
    Line.setAttribute("stroke", "RGB(254,114,0)")
    Line.setAttribute('stroke-width', 2);
    group0.appendChild(Line)

    SVG.appendChild(group0)
    //Etiquetas
    if(lim.length>4){
        let txt, txt2, P
        for(let k=Math.floor(lim[0]/lim[4][0]);k<=Math.ceil(lim[1]/lim[4][0]);++k) {
            P=coo2px([k*lim[4][0],0],dim,lim)
            txt = document.createElementNS('http://www.w3.org/2000/svg','text')
            txt2 = document.createElementNS('http://www.w3.org/2000/svg','tspan')
            txt2.setAttribute('x',P[0])
            txt2.setAttribute('y',P[1]+2)
            txt2.setAttribute("fill", "black")
            txt2.setAttribute('style','font: italic 12px sans-serif;')
            txt2.setAttribute("alignment-baseline","hanging")
            txt2.setAttribute("text-anchor","middle")
            txt2.textContent=k*lim[4][0]
            txt.appendChild(txt2)
            if(k!=0){ SVG.appendChild(txt)}

        }
        for(let k=Math.floor(lim[2]/lim[4][1]);k<=Math.ceil(lim[3]/lim[4][1]);++k) {
            P=coo2px([0,k*lim[4][1]],dim,lim)
            txt = document.createElementNS('http://www.w3.org/2000/svg','text')
            txt.setAttribute('x',P[0])
            txt.setAttribute('y',P[1])
            txt.setAttribute("fill", "black")
            txt.setAttribute("text-anchor","end")
            txt.setAttribute('style','font: italic 12px sans-serif;')
            txt.textContent=k*lim[4][1]
            if(k!=0){ SVG.appendChild(txt)}
        }
        const theta=Math.PI/2
        txt = document.createElementNS('http://www.w3.org/2000/svg','text')
            txt.setAttribute('x',0)
            txt.setAttribute('y',0)
            txt.setAttribute("fill", "black")
            txt.setAttribute("text-anchor","middle")
            txt.setAttribute("alignment-baseline","hanging")
            txt.setAttribute("transform","matrix("+Math.cos(theta)+" "+Math.sin(-theta)+" "+Math.sin(theta)+" "+Math.cos(theta)+" 5 "+dim[1]/2+" )")
            txt.setAttribute('style','font: italic 12px sans-serif;')
            txt.textContent='Frecuencia Acumulada'
            SVG.appendChild(txt)
        txt = document.createElementNS('http://www.w3.org/2000/svg','text')
            txt.setAttribute('x',dim[0]/2)
            txt.setAttribute('y',dim[1]-5)
            txt.setAttribute("fill", "black")
            txt.setAttribute("text-anchor","middle")
            txt.setAttribute("alignment-baseline","baseline")
            txt.setAttribute('style','font: italic 12px sans-serif;')
            txt.textContent=xlabel
            SVG.appendChild(txt)
    }
    l = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
    let Point=""
    for(let k1=0;k1<Q[0].length;++k1){
                    Point+=" "+coo2px([Q[0][k1],Q[1][k1]],dim,lim)
    }

    l.setAttribute("points",Point )
    l.setAttribute("stroke","blue")
    l.setAttribute('stroke-width', "2");
    SVG.appendChild(l)
    return SVG

}

 function interpolate(xs, ys) {
	let i, length = xs.length;
	if (length != ys.length) { throw 'Need an equal count of xs and ys.'; }
	if (length === 0) { return function(x) { return 0; }; }
	if (length === 1) {
		let result = +ys[0];
		return function(x) { return result; };
	}
	let indexes = [];
	for (i = 0; i < length; i++) { indexes.push(i); }
	indexes.sort(function(a, b) { return xs[a] < xs[b] ? -1 : 1; });
	let oldXs = xs, oldYs = ys;
	xs = []; ys = [];
	for (i = 0; i < length; i++) { xs.push(+oldXs[indexes[i]]); ys.push(+oldYs[indexes[i]]); }
	let dys = [], dxs = [], ms = [];
	for (i = 0; i < length - 1; i++) {
		let dx = xs[i + 1] - xs[i], dy = ys[i + 1] - ys[i];
		dxs.push(dx); dys.push(dy); ms.push(dy/dx);
	}
	let c1s = [ms[0]];
	for (i = 0; i < dxs.length - 1; i++) {
		let m = ms[i], mNext = ms[i + 1];
		if (m*mNext <= 0) {
			c1s.push(0);
		} else {
			let dx = dxs[i], dxNext = dxs[i + 1], common = dx + dxNext;
			c1s.push(3*common/((common + dxNext)/m + (common + dx)/mNext));
		}
	}
	c1s.push(ms[ms.length - 1]);
	let c2s = [], c3s = [];
	for (i = 0; i < c1s.length - 1; i++) {
		let c1 = c1s[i], m = ms[i], invDx = 1/dxs[i], common = c1 + c1s[i + 1] - m - m;
		c2s.push((m - c1 - common)*invDx); c3s.push(common*invDx*invDx);
	}

	return function(x) {
		let i = xs.length - 1;
		if (x == xs[i]) { return ys[i]; }
		let low = 0, mid, high = c3s.length - 1;
		while (low <= high) {
			mid = Math.floor(0.5*(low + high));
			let xHere = xs[mid];
			if (xHere < x) { low = mid + 1; }
			else if (xHere > x) { high = mid - 1; }
			else { return ys[mid]; }
		}
		i = Math.max(0, high);
		const diff = x - xs[i], diffSq = diff*diff;
		return ys[i] + c1s[i]*diff + c2s[i]*diffSq + c3s[i]*diff*diffSq;
	};
};
}
function TipoRelacionesDiagAsig(tipo,DI=[[1,2,3,4,5],[1,2,3,4,5]],size=[240,150]){
    const n=[DI[0].length,DI[1].length]
    let Asignationx=[],Asignationy=[],Relation=[]

    switch(tipo){
        case 'RS':
            let noRepeat
            for(let k=0;k<n[0];++k){
                do{
                    Relation.push([k,Math.floor(Math.random()*n[1])])
                }while(Math.random()<0.2)
            }
            do{
                noRepeat=[Math.floor(Math.random()*n[0]),Math.floor(Math.random()*n[1])]
            }while(noRepeat[1]==Relation[noRepeat[0]][1])
            Relation.push(noRepeat)
            break
        case 'RNS':
            const ElEmpty=Math.floor(Math.random()*n[0])
            let ElRep, NoRepeat,dummy

            do{
                for(let k=0;k<n[0];++k){
                    if(k!=ElEmpty){
                        if( Math.random()<0.8 ){
                            Relation.push([ Math.floor(Math.random()*n[0]),
                                            Math.floor(Math.random()*n[1])])
                        }
                    }
                }
            }while(Relation.length==0)
            ElRep=Math.floor(Math.random()*Relation.length)
            do{
                dummy=Math.floor(Math.random()*n[1])
            }while(Relation[ElRep][1]==dummy)
            Relation.push([Relation[ElRep][0],dummy])
            break
        case 'FB':
            if(n[0]>n[1]){
                alert('No es posible hacer una función biyectiva con x='+DI[0]+' y='+DI[1])
            }
            
            for(let k=0;k<n[0];++k) Asignationy.push(k)
            Asignationy=unsortArray(Asignationy)
            for(let k=0;k<n[0];++k) Relation.push([k,Asignationy[k]])        
            break
        case 'FSNI':
            if(n[0]>n[1]){
                alert('Verifica las condiciones para hacer una FSNI con x='+DI[0]+' y='+DI[1])
            }
            for(let k=0;k<n[0];++k){
                Asignationy.push(k)
                Asignationx.push(k)
            }
            Asignationy=unsortArray(Asignationy)
            Asignationx=unsortArray(Asignationx)
            const dummyFSNI=Math.ceil(Math.random()*(n[0]-1))
            for(let k=0;k<n[0];++k){
                if(k<dummyFSNI) Relation.push([Asignationx[k],Asignationy[k]])
                else        Relation.push([Asignationx[k],Asignationy[Math.floor(Math.random()*(n[0]-dummyFSNI))]])        
            } 
            break
        case 'FNSNI':
            if(n[0]>n[1]){
                alert('Verifica las condiciones para FNSNI con x='+DI[0]+' y='+DI[1])
            }
            const dummyFNSNI=[Math.ceil(Math.random()*(n[0]-3))+2]
            do{
                dummyFNSNI[1]=Math.ceil(Math.random()*(dummyFNSNI[0]-1))
            }while(dummyFNSNI[1]<1)
            for(let k=0;k<n[0];++k){
                Asignationy.push(k)
                Asignationx.push(k)
            }
            
            Asignationy=unsortArray(Asignationy)
            Asignationx=unsortArray(Asignationx)
            Asignationx=Asignationx.slice(0, dummyFNSNI[0])
            Asignationy=Asignationy.slice(0, dummyFNSNI[0])
            for(let k=0;k<dummyFNSNI[0];++k){
                if(k<dummyFNSNI[1]) Relation.push([Asignationx[k],Asignationy[k]])
                else        Relation.push([ Asignationx[k],
                                            Asignationy[Math.floor(Math.random()*dummyFNSNI[1])]
                                        ])
            } 
            break
        case 'FNSI':
            if(n[0]>n[1]){
                alert('Verifica las condiciones para FNSI con x='+DI[0]+' y='+DI[1])
            }
            const dummyFNSI=Math.ceil(Math.random()*(n[0]-3))+2
            
            for(let k=0;k<n[0];++k){
                Asignationy.push(k)
                Asignationx.push(k)
            }
            
            Asignationy=unsortArray(Asignationy)
            Asignationx=unsortArray(Asignationx)
            Asignationx=Asignationx.slice(0, dummyFNSI)
            Asignationy=Asignationy.slice(0, dummyFNSI)
            for(let k=0;k<dummyFNSI;++k){
                Relation.push([Asignationx[k],Asignationy[k]])
            } 
            break
    }
    return diagramaAsignacion([DI[0],DI[1],Relation],size)
}
function diagramaAsignacion(txtElem,size=[480,300]){
	/*Ejemplo
	diagramaAsignacion([	[9,5,8,7,4,6],
							['a','e','w'],
							[[0,0],[0,1],[2,2]] ],
							[480,300])
	*/
	let svg=document.createElementNS("http://www.w3.org/2000/svg","svg")
		svg.setAttribute('width',size[0])
		svg.setAttribute('height',size[1])
		//Vamos a definir las flechas
		let def=document.createElementNS("http://www.w3.org/2000/svg","defs")
			let marker=document.createElementNS("http://www.w3.org/2000/svg","marker")
			marker.setAttribute('id','head')
			marker.setAttribute('orient','auto')
			marker.setAttribute('markerWidth',3)
			marker.setAttribute('markerHeight',4)
			marker.setAttribute('refX',0.1)
			marker.setAttribute('refY',2)
				let path=document.createElementNS("http://www.w3.org/2000/svg","path")
				path.setAttribute('d','M0,0 V4 L2,2 Z')
				path.setAttribute('fill','gray')
				marker.appendChild(path)
			def.appendChild(marker)
		svg.appendChild(def)

	
	let ellipse=document.createElementNS("http://www.w3.org/2000/svg","ellipse")
		ellipse.setAttribute('rx',(size[0]/4-5)*.8)
		ellipse.setAttribute('ry',size[1]/2-10)
		ellipse.setAttribute('cx',size[0]*0.20)
		ellipse.setAttribute('cy',size[1]*0.5)
		ellipse.setAttribute('fill','none')
		ellipse.setAttribute('stroke','blue')
		ellipse.setAttribute('stroke-width',3)
	svg.appendChild(ellipse)
	ellipse=document.createElementNS("http://www.w3.org/2000/svg","ellipse")
		ellipse.setAttribute('rx',(size[0]/4-5)*.8)
		ellipse.setAttribute('ry',size[1]/2-10)
		ellipse.setAttribute('cx',size[0]*0.80)
		ellipse.setAttribute('cy',size[1]*0.5)
		ellipse.setAttribute('fill','none')
		ellipse.setAttribute('stroke','blue')
		ellipse.setAttribute('stroke-width',3)
	svg.appendChild(ellipse)
	
	// Aqui van las flechas
	let a=size[0]*0.1
	let b=size[1]*0.9
	let D=[(b-a)/(txtElem[0].length-1),(b-a)/(txtElem[1].length-1)]
	for(let k=0;k<txtElem[2].length;++k){
	
		path=document.createElementNS("http://www.w3.org/2000/svg","path")
		path.setAttribute('stroke','gray')
		path.setAttribute('marker-end','url(#head)')
		path.setAttribute('stroke-width','3')
		path.setAttribute('fill','none')
		path.setAttribute('d','M'+(size[0]*0.20+10)+','+(a+txtElem[2][k][0]*D[0])+', '+(size[0]*0.80-10)+','+(a+txtElem[2][k][1]*D[1]) )
		svg.appendChild(path)
	}

	D=(b-a)/(txtElem[0].length-1)
	let txt
	for(let k=0;k<txtElem[0].length;++k){
		txt=document.createElementNS("http://www.w3.org/2000/svg","text")
		txt.setAttribute('stroke','black')
		txt.setAttribute('x',size[0]*0.20)
		txt.setAttribute('y',a+k*D)
		txt.setAttribute("text-anchor","middle")
		txt.setAttribute("alignment-baseline","middle")
		txt.textContent=txtElem[0][k]
		svg.appendChild(txt)		
	}

	D=(b-a)/(txtElem[1].length-1)
	for(let k=0;k<txtElem[1].length;++k){
		txt=document.createElementNS("http://www.w3.org/2000/svg","text")
		txt.setAttribute('stroke','black')
		txt.setAttribute('x',size[0]*0.80)
		txt.setAttribute('y',a+k*D)
		txt.setAttribute("text-anchor","middle")
		txt.setAttribute("alignment-baseline","middle")
		txt.textContent=txtElem[1][k]
		svg.appendChild(txt)		
	}
    let center = document.createElement('div')
    center.style.textAlign = "center";
    center.appendChild(svg)
	return center
}
function diagramaVenn2(legend,ancho = 300 ){
    /*
    Sintaxis:
        diagramaVenn2([['A','B'],['0','1','2','3']])
        diagramaVenn2([['A','B'],[]])
        diagramaVenn2([[],['0','1','2','3']])
        diagramaVenn2([[],[]])
        diagramaVenn2([['A','B'],['$$x_0$$','$$x_1$$','$$x_2$$','$$x_3$$']])
    */
    const alto = ancho/1.618
    let S = `<svg "http://www.w3.org/2000/svg" height="${alto}" width="${ancho}">
    <rect  width="${ancho-2}" height="${alto-2}" x="1" y="1" fill="none" stroke="black" stroke-width="2" />
    <circle cx="${0.35*ancho}" cy="${alto/2}" r="${0.5*alto/1.2}" fill="none" stroke="black" stroke-width="2" />
    <circle cx="${0.65*ancho}" cy="${alto/2}" r="${0.5*alto/1.2}" fill="none" stroke="black" stroke-width="2" />
    <text font-size="${ancho*0.09}" x="3" y="3" alignment-baseline="hanging">U</text>`
    
    if(legend[0].length>0){
        S += `<text font-size="${ancho*0.09}" text-anchor="end" x="${0.35*ancho-0.5*alto/(1.2*1.41)}" y="${alto/2-0.5*alto/(1.2*1.41)}" >${legend[0][0]}</text>`
        S += `<text font-size="${ancho*0.09}" text-anchor="start" x="${0.65*ancho+0.5*alto/(1.2*1.41)}" y="${alto/2-0.5*alto/(1.2*1.41)}" >${legend[0][1]}</text>`
    }
    if(legend[1].length>0){
        //Hacer la fuente más pequeña si es fraccion

        if(!(typeof legend[1][0] === 'string' && legend[1][0].includes("$$"))) S += `<text font-size="${ancho*0.09}" text-anchor="end" x="${ancho-4}" y="${alto-4}">${legend[1][0]}</text>`
        else S +=`<foreignObject x="${ancho*.85}" y="${alto-ancho*.2-4}" width="${ancho*.15}" height="${ancho*.20}" >    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${legend[1][0].includes('\\frac')?ancho*0.045:ancho*0.09};text-align: rigth;width: fit-content;">${legend[1][0]}</div></foreignObject>`
        
        if(!(typeof legend[1][1] === 'string' && legend[1][1].includes("$$"))) S += `<text font-size="${ancho*0.09}" text-anchor="end" x="${0.35*ancho}" y="${alto/2}" >${legend[1][1]}</text>`
        else S +=`<foreignObject x="${0.35*ancho-0.5*alto/(1.2*1.41)}" y="${0.35*alto}" width="${ancho*.15}" height="${ancho*.20}">
            <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${legend[1][1].includes('\\frac')?ancho*0.045:ancho*0.09};text-align: rigth;width: fit-content;">${legend[1][1]}</div></foreignObject>`
        
        if(!(typeof legend[1][2] === 'string' && legend[1][2].includes("$$"))) S += `<text font-size="${ancho*0.09}" text-anchor="middle" x="${ancho/2}" y="${alto/2}" >${legend[1][2]}</text>`
        else S +=`<foreignObject x="${0.41*ancho}" y="${0.35*alto}" width="${ancho*.18}" height="${ancho*.20}">
            <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${legend[1][2].includes('\\frac')?ancho*0.045:ancho*0.09};text-align: rigth;width: fit-content;">${legend[1][2]}</div></foreignObject>`

        
        if(!(typeof legend[1][3] === 'string' && legend[1][3].includes("$$"))) S += `<text font-size="${ancho*0.09}" text-anchor="start" x="${0.65*ancho}" y="${alto/2}" >${legend[1][3]}</text>`
        else S +=`<foreignObject x="${0.65*ancho}" y="${0.35*alto}" width="${ancho*.15}" height="${ancho*.20}">
            <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${legend[1][3].includes('\\frac')?ancho*0.045:ancho*0.09};text-align: rigth;width: fit-content;">${legend[1][3]}</div></foreignObject>`
        //S += `<circle cx="${ancho-4}" cy="${alto-4}" r="3">`
    }

    S += `</svg>`
    return S
}
function diagramaArbol(legend,a = 300 ){
    /*
    diagramaArbol([['A','B'],[0.33,0.123,0.123,0.369,0.852,0.789]],300)
    diagramaArbol([['A','B'],['$$x$$','$$x$$','$$x$$','$$x$$','$$x$$','$$\frac{x}{y}$$']],300)
    Solo expresiones cortas
    */
    
    let S = `<svg "http://www.w3.org/2000/svg" height="${a}" width="${a}">
    <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" 
            refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="black" />
    </marker>
  </defs>
  <line        x1="0" y1="${a/2}"   x2="${0.3*a}" y2="${0.3*a}" stroke="black" stroke-width="1" marker-end="url(#arrowhead)" />
  <line        x1="0" y1="${a/2}"   x2="${0.3*a}" y2="${0.7*a}" stroke="black" stroke-width="1" marker-end="url(#arrowhead)" />
  <line x1="${0.5*a}" y1="${0.3*a}" x2="${0.8*a}" y2="${0.15*a}" stroke="black" stroke-width="1" marker-end="url(#arrowhead)" />
  <line x1="${0.5*a}" y1="${0.3*a}" x2="${0.8*a}" y2="${0.45*a}" stroke="black" stroke-width="1" marker-end="url(#arrowhead)" />
  <line x1="${0.5*a}" y1="${0.7*a}" x2="${0.8*a}" y2="${0.55*a}" stroke="black" stroke-width="1" marker-end="url(#arrowhead)" />
  <line x1="${0.5*a}" y1="${0.7*a}" x2="${0.8*a}" y2="${0.85*a}" stroke="black" stroke-width="1" marker-end="url(#arrowhead)" />`

  if(legend[0].length>0){
    S += `  <text font-size="${0.09*a}" text-anchor="middle" alignment-baseline="middle"  x="${0.4*a}" y="${0.3*a}" >${legend[0][0]}</text>
            <text font-size="${0.09*a}" text-anchor="middle" alignment-baseline="middle"  x="${0.4*a}" y="${0.7*a}" >${legend[0][0]}<tspan dy ="-5">c</tspan></text>
            <text font-size="${0.09*a}" text-anchor="middle" alignment-baseline="middle"  x="${0.9*a}" y="${0.15*a}" >${legend[0][1]}</text>
            <text font-size="${0.09*a}" text-anchor="middle" alignment-baseline="middle"  x="${0.9*a}" y="${0.45*a}" >${legend[0][1]}<tspan dy ="-5">c</tspan></text>
            <text font-size="${0.09*a}" text-anchor="middle" alignment-baseline="middle"  x="${0.9*a}" y="${0.55*a}" >${legend[0][1]}</text>
            <text font-size="${0.09*a}" text-anchor="middle" alignment-baseline="middle"  x="${0.9*a}" y="${0.85*a}" >${legend[0][1]}<tspan dy ="-5">c</tspan></text>`
}
if(legend[1].length>0){
 
    if(!(typeof legend[1][0] === 'string' && legend[1][0].includes("$$"))) S += `<text alignment-baseline="baseline" font-size="${a*0.065}" text-anchor="end" x="${.15*a}" y="${.4*a}">${legend[1][0]}</text>`
    else S +=`<foreignObject x="${.05*a}" y="${.2*a}" width="${a*.15}" height="${a*.20}" style="border:solid green 2px">    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${legend[1][0].includes('\\frac')?a*0.045:a*0.09};text-align: rigth;width: fit-content;border: solid red 2px">${legend[1][0]}</div></foreignObject>`
    
    if(!(typeof legend[1][1] === 'string' && legend[1][1].includes("$$"))) S += `<text alignment-baseline="hanging" font-size="${a*0.065}" text-anchor="end" x="${.15*a}" y="${.6*a}">${legend[1][1]}</text>`
    else S +=`<foreignObject x="${.045*a}" y="${.55*a}" width="${a*.15}" height="${a*.20}" style="border:solid green 2px">    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${legend[1][1].includes('\\frac')?a*0.045:a*0.09};text-align: rigth;width: fit-content;border: solid red 2px">${legend[1][1]}</div></foreignObject>`

    if(!(typeof legend[1][2] === 'string' && legend[1][2].includes("$$"))) S += `<text alignment-baseline="baseline" font-size="${a*0.065}" text-anchor="end" x="${.65*a}" y="${.225*a}">${legend[1][2]}</text>`
    else S +=`<foreignObject x="${.5*a}" y="${.04*a}" width="${a*.15}" height="${a*.20}" style="border:solid green 2px">    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${legend[1][2].includes('\\frac')?a*0.045:a*0.09};text-align: rigth;width: fit-content;border: solid red 2px">${legend[1][2]}</div></foreignObject>`

    if(!(typeof legend[1][3] === 'string' && legend[1][3].includes("$$"))) S += `<text alignment-baseline="hanging" font-size="${a*0.065}" text-anchor="end" x="${.65*a}" y="${.375*a}">${legend[1][3]}</text>`
    else S +=`<foreignObject x="${.48*a}" y="${.29*a}" width="${a*.15}" height="${a*.20}" style="border:solid green 2px">    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${legend[1][3].includes('\\frac')?a*0.045:a*0.09};text-align: rigth;width: fit-content;border: solid red 2px">${legend[1][3]}</div></foreignObject>`

    if(!(typeof legend[1][4] === 'string' && legend[1][4].includes("$$"))) S += `<text alignment-baseline="baseline" font-size="${a*0.065}" text-anchor="end" x="${.65*a}" y="${.625*a}">${legend[1][4]}</text>`
    else S +=`<foreignObject x="${.48*a}" y="${.49*a}" width="${a*.15}" height="${a*.20}" style="border:solid green 2px">    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${legend[1][4].includes('\\frac')?a*0.045:a*0.09};text-align: rigth;width: fit-content;border: solid red 2px">${legend[1][4]}</div></foreignObject>`

    if(!(typeof legend[1][5] === 'string' && legend[1][5].includes("$$"))) S += `<text alignment-baseline="hanging" font-size="${a*0.065}" text-anchor="end" x="${.65*a}" y="${.775*a}">${legend[1][5]}</text>`
    else S +=`<foreignObject x="${.48*a}" y="${.7*a}" width="${a*.15}" height="${a*.20}" style="border:solid green 2px">    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${legend[1][5].includes('\\frac')?a*0.045:a*0.09};text-align: rigth;width: fit-content;border: solid red 2px">${legend[1][5]}</div></foreignObject>`
}
    
    

    S += `</svg>`
    return S
}