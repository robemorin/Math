// ft.js
function start() {
	let contenedor = document.getElementById('menu')
	contenedor.innerHTML = ""
	let n0 = Ficha.length
	for (let k0 = 0; k0 < n0; ++k0) {
		let D0 = document.createElement('details')
		D0.setAttribute("name", "D0")
		let M0 = document.createElement('main')
		let T0 = document.createElement('summary')
		T0.textContent = Ficha[k0].Nombre
		D0.appendChild(T0)
		let n1 = Ficha[k0].subtema.length
		for (let k1 = 0; k1 < n1; ++k1) {
			let D1 = document.createElement('details')
			D1.setAttribute("name", "D1")
			let M1 = document.createElement('main')
			let T1 = document.createElement('summary')
			T1.textContent = Ficha[k0].subtema[k1].Nombre
			D1.appendChild(T1)
			let n2 = Ficha[k0].subtema[k1].topico.length
			for (let k2 = 0; k2 < n2; ++k2) {
				let ficha = document.createElement('div')
				ficha.innerHTML = `<a onclick="generar(${k0},${k1},${k2})">${Ficha[k0].subtema[k1].topico[k2].Nombre}</a>`

				M1.appendChild(ficha)
			}
			D1.appendChild(M1)
			M0.appendChild(D1)
		}
		D0.appendChild(M0)
		contenedor.appendChild(D0)
	}
}
function generar(k0, k1, k2, profesor = "MC Roberto Morin Romero") {
	function encabezado(profesor, k, K) {
		let date = new Date()
		return `<div class="header">
        <table class="info" width="100%">
        <tr><td><div class="logo">
            <img src="../../src/icon2.png" alt="raiz2pi.cc"><br>https://raiz2pi.cc
        </div></td>
        <td style="width:80%">
            <div><strong>Nombre del Alumno:</strong> ______________________</div>
            <div><strong>Nombre del Profesor:</strong><u>${profesor}</u></div>
            <div><strong>Tema:</strong>${Ficha[K[0]].Nombre} > ${Ficha[k0].subtema[K[1]].Nombre} > ${Ficha[k0].subtema[K[1]].topico[K[2]].Nombre} </div>
        </td><td style="width:20%">
            <div><strong>Fecha: <u>${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}</u> <br>id: <u>${k}</u></strong> 
            </div>
        </td>
        </tr>
        </table>
        
    </div>`
	}

	const nFichas = document.getElementById("NCopias").value
	const contenedor = document.getElementById("Fichas")
	contenedor.innerHTML = ''
	const Soluciones = document.getElementById("Respuestas")
	Soluciones.innerHTML = '<div class="page"></div>'

	let ficha, respuesta
	for (let k = 0; k < nFichas; ++k) {
		//console.log(`Generando examen ${k}`)
		[ficha, respuesta] = Ficha[k0].subtema[k1].topico[k2].func()
		let div0 = document.createElement('div')
		div0.innerHTML = encabezado(profesor, k + 1, [k0, k1, k2]) + ficha + `${k != (nFichas - 1) ? '<div class="page"></div>' : ''}`
		contenedor.appendChild(div0)

		div0 = document.createElement('div')
		div0.innerHTML = `<span>[${k + 1}]</span>` + respuesta + `<br>`
		Soluciones.appendChild(div0)

	}
	MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}
function CR(n = 1) {
	let S = ''
	let s = `<tr><td></td><td ></td><td></td></tr>`
	for (let k = 0; k < n; ++k) {
		S += s
	}
	return `<table width="100%" class="cuadroRespuesta"> ${S}</table>`
}

// Comun.js
function NotacionCientifica(num) {
	var numInSciNot = {};
	[numInSciNot.coefficient, numInSciNot.exponent] = num.toExponential().split('e').map(item => Number(item));
	return (numInSciNot.coefficient).toFixed(2) + "&times;10<sup>" + numInSciNot.exponent + '</sup>';
}
function mcd_new(a, b) {
	if (b === 0) return a;
	return mcd_new(b, a % b);
}
function polinomio(v, x = 'x') {
	//Se debe modificar para que imprima con fracciones en caso de ser
	while (v[0] == 0) {
		if (v.length == 1) return '0'
		v.shift();
	}
	const n = v.length;
	let S
	if (n == 1) {
		S = `${v[0] < 0 ? "-" : ""} ${Math.abs(v[0])}`
	} else if (n == 2) {
		S = (v[0] < 0 ? "-" : "") + (Math.abs(v[0]) == 1 ? '' : Math.abs(v[0])) + x
	} else S = (v[0] < 0 ? "-" : "") + (Math.abs(v[0]) == 1 ? '' : Math.abs(v[0])) + x + "^{" + (n - 1) + "}"


	for (var k = 1; k < n; ++k) {
		if (v[k] != 0) {

			if (k == n - 1) {
				S += (v[k] < 0 ? "-" : "+") + Math.abs(v[k])
			} else if (k == n - 2) {
				S += (v[k] < 0 ? "-" : "+") + (Math.abs(v[k]) == 1 ? '' : Math.abs(v[k])) + x
			} else S += (v[k] < 0 ? "-" : "+") + (Math.abs(v[k]) == 1 ? '' : Math.abs(v[k])) + x + "^" + (n - k - 1)

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
function MCM(x) {
	var N = x.length;
	for (var k = 2; k <= Max(x) / 2; ++k) {
		if (MCMHelp(x, k)) {
			for (var i = 0; i < x.length; ++i) {
				x[i] = x[i] / k;
			}
			--k;
		}
	}
	return x
}
function Max(x) {
	var m = Math.min.apply(Math, x);
	var M = Math.max.apply(Math, x)

	if (M > (-m)) {
		return M
	} else {
		return -m
	}
}
function MCMHelp(x, a) {
	for (var k = 0; k < x.length; ++k) {
		if ((x[k] % a) != 0) return false;
	}
	return true;
}
function simplify_frac(a) {
	/* [5,3] <- simplify_frac([10,6]) solo dos valores*/
	let mcd = mcd_new(a[0], a[1])
	mcd *= mcd * a[1] < 0 ? -1 : 1
	return [a[0] / mcd, a[1] / mcd]
}
/* Estas ya no deben aparecer */
function Exp2fun(xp, yp) {
	var a = yp[1] - yp[0]
	var c = yp[0]
	var b = Math.pow((yp[2] - yp[0]) / (yp[1] - yp[0]), 1 / xp[1])
	return [a, b, c]
}

function Sinoidal(a, b, c, Tipo, x) {
	var y = []
	if (Tipo == 0) {
		for (var k = 0; k < x.length; ++k) y[k] = a * Math.cos(b * x[k]) + c
	} else {
		for (var k = 0; k < x.length; ++k) y[k] = a * Math.sin(b * x[k]) + c
	}
	return y
}
function texto(S, C) {//*
	let Ct = document.createElement('span');
	Ct.textContent = S
	C.appendChild(Ct)
}
function divContenido(S, C) {//*
	let Ct = document.createElement('div');
	Ct.innerHTML = S
	C.appendChild(Ct)
}
function spanContenido(S, C) {//*
	let Ct = document.createElement('span');
	Ct.innerHTML = S
	C.appendChild(Ct)
}
function linspace(x_min, x_max, n = 100) {
	const x = []
	const h = (x_max - x_min) / (n - 1)
	for (let k = 0; k < n; ++k) x.push(x_min + k * h)
	return x
}
function fraccion(a, b, op = false) {

	if (b == 0) {
		return `${a < 0 ? '-' : ''}\\infty`
	} else if (a == 0) {
		return 0
	}
	let den = simplify_frac([a, b])
	if (Math.abs(den[1]) == 1) {
		return den[0] * den[1]
	}

	if (!op) {
		const sig = den[1] < 0 ? -1 : 1
		return `\\frac{${sig * den[0]}}{${sig * den[1]}}`
	} else {
		const sig = den[0] * den[1] < 0 ? '-' : ''
		return `${sig}\\frac{${Math.abs(den[0])}}{${Math.abs(den[1])}}`
	}

}
function evaluar(expresion, X) {
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


// Graficos.js
function NormalGraph(Datos = [-1, 1.5, 1, 2], Size = [400, 200]) {

	if (Datos[1] < Datos[0]) [Datos[0], Datos[1]] = [Datos[1], Datos[0]];

	SVG = createSVG(Size)
	esc = [[(Size[0] - 20) / 6, Size[0] / 2],
	[-(Size[1] - 35), Size[1] - 30]]

	let l, txt
	z_lower = (Datos[0] - Datos[2]) / Datos[3]
	z_upper = (Datos[1] - Datos[2]) / Datos[3]
	let PointTem
	if (-3 < z_lower && z_lower < 3) {
		txt = document.createElementNS('http://www.w3.org/2000/svg', 'text')
		txt.setAttribute("x", esc[0][0] * z_lower + esc[0][1])
		txt.setAttribute("y", Size[1] - 30)
		txt.setAttribute("alignment-baseline", "hanging")
		txt.setAttribute("text-anchor", "end")
		txt.setAttribute("style", "font: .7em Verdana, Helvetica, Arial, sans-serif;")
		txt.setAttribute("stroke", "none")
		txt.setAttribute("fill", "blue")
		txt.textContent = Datos[0].toPrecision(3)
		SVG.appendChild(txt)
		if (z_upper < 3) {
			txt = document.createElementNS('http://www.w3.org/2000/svg', 'text')
			txt.setAttribute("x", esc[0][0] * z_upper + esc[0][1])
			txt.setAttribute("y", Size[1] - 30)
			txt.setAttribute("alignment-baseline", "hanging")
			txt.setAttribute("style", "font: .7em Verdana, Helvetica, Arial, sans-serif;")
			txt.setAttribute("stroke", "none")
			txt.setAttribute("fill", "blue")
			txt.textContent = Datos[1].toPrecision(3)
			SVG.appendChild(txt)

		} else {
			z_upper < 3
		}
	} else {
		z_lower = -3
		if (z_upper < 3) {

		} else {
			z_upper < 3
		}
	}

	PointTem = (esc[0][0] * z_lower + esc[0][1]) + ", " + (Size[1] - 30) + " "

	const dummy = linspace(z_lower, z_upper, 100)
	for (let k = 0; k < dummy.length; ++k) {
		PointTem += (esc[0][0] * dummy[k] + esc[0][1]) + ", " + (esc[1][0] * Math.exp(-dummy[k] * dummy[k]) + esc[1][1]) + " "
	}
	PointTem += (esc[0][0] * z_upper + esc[0][1]) + ", " + (Size[1] - 30) + " "

	l = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
	l.setAttribute("points", PointTem)
	l.setAttribute("stroke", "gray")
	l.setAttribute("fill", "#DB9BE5")
	l.setAttribute('stroke-width', 2)
	SVG.appendChild(l)


	l = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
	l.setAttribute("points", 5 + "," + (Size[1] - 30) + " " + (Size[0] - 5) + "," + (Size[1] - 30))
	l.setAttribute("stroke", "RGB(100,100,100)")
	l.setAttribute('stroke-width', 2)
	SVG.appendChild(l)
	z_lower = (Datos[0] - Datos[2]) / Datos[3]
	z_upper = (Datos[1] - Datos[2]) / Datos[3]



	l = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
	let Point = ""
	const x = linspace(-3, 3, 100)

	for (let k = 0; k < x.length; ++k) {
		Point += (esc[0][0] * x[k] + esc[0][1]) + ", " + (esc[1][0] * Math.exp(-x[k] * x[k]) + esc[1][1]) + " "
	}
	l.setAttribute("points", Point)
	l.setAttribute("stroke", "RGB(100,100,200)")
	l.setAttribute('stroke-width', 2)
	SVG.appendChild(l)


	return SVG

}
function plot(P, dim = [300, 200], lim = [-10, 10, -10, 10], label = []) {
	/***************** Ejemplo ******************************
	const Puntos=[	[[0,1,5,6,2,7],
					 [5,4,3,2,1,-5],'oRGB(255,100,155)'],
					 [[0,1,5,6,2,7],
					 [5,4,3,2,1,-5],'-RGB(100,155,255)']]
	ElemP=plot(Puntos,[600,400],[-10,10,-10,10,[2,2],[1,1]])
	*********************************************************/
	let o, l, Point
	function coo2px(P, dim, lim) {
		const m = [(dim[0] - 40) / (lim[1] - lim[0]), -(dim[1] - 40) / (lim[3] - lim[2])]
		const b = [20 - m[0] * lim[0], 20 - m[1] * lim[3]]
		return [m[0] * P[0] + b[0], m[1] * P[1] + b[1]]
	}
	let ax = createAxis(lim, dim)

	for (let k = 0; k < P.length; ++k) {
		if (P[k][2].charAt(0) == 'o') {
			for (let k1 = 0; k1 < P[k][0].length; ++k1) {
				//alert([P[k][0][k1],P[k][1][k1]])
				Point = coo2px([P[k][0][k1], P[k][1][k1]], dim, lim)
				o = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
				o.setAttribute("cx", Point[0])
				o.setAttribute("cy", Point[1])
				o.setAttribute("r", "5")
				o.setAttribute("stroke", P[k][2].substring(1))
				o.setAttribute('stroke-width', "3");
				ax.appendChild(o)
			}
		} if (P[k][2].charAt(0) == 'x') {
			for (let k1 = 0; k1 < P[k][0].length; ++k1) {
				console.log(`k1:${k1}`)
				Point = coo2px([P[k][0][k1], P[k][1][k1]], dim, lim)
				l = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')

				l.setAttribute("points", `${Point[0] - 3},${Point[1] - 3} ${Point[0] + 3},${Point[1] + 3} ${Point[0]},${Point[1]} ${Point[0] - 3},${Point[1] + 3} ${Point[0] + 3},${Point[1] - 3}`)
				l.setAttribute("stroke", P[k][2].substring(1))
				l.setAttribute('stroke-width', "3");
				ax.appendChild(l)
				/*
			o = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
			o.setAttribute("cx",Point[0] )
			o.setAttribute("cy",Point[1] )
			o.setAttribute("r","5")
			o.setAttribute("stroke",P[k][2].substring(1))
			o.setAttribute('stroke-width', "3");
			ax.appendChild(o)*/
			}
		} else if (P[k][2].charAt(0) == '-') {
			l = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
			Point = ""
			for (let k1 = 0; k1 < P[k][0].length; ++k1) {
				if (lim[0] <= P[k][0][k1] && P[k][0][k1] <= lim[1] && lim[2] <= P[k][1][k1] && P[k][1][k1] <= lim[3]) {
					Point += " " + coo2px([P[k][0][k1], P[k][1][k1]], dim, lim)
				} else {
					l.setAttribute("points", Point)
					l.setAttribute("stroke", P[k][2].substring(1))
					l.setAttribute('stroke-width', "3");
					ax.appendChild(l)
					l = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
					Point = ""
				}
			}
			l.setAttribute("points", Point)
			l.setAttribute("stroke", P[k][2].substring(1))
			l.setAttribute('stroke-width', "3");
			ax.appendChild(l)
		} else if (P[k][2].charAt(0) == 't') {
			//<text x="20" y="35" class="small">My</text>
			/* txt = document.createElementNS('http://www.w3.org/2000/svg','text')
			 txt.setAttribute('x',P[0])
			 txt.setAttribute('y',P[1])
			 txt.setAttribute("fill", "black")
			 txt.setAttribute('style','font: italic 12px sans-serif;')
			 txt.textContent=k*lim[4][1]
			 if(k!=0){ SVG.appendChild(txt)}*/
			l = document.createElementNS('http://www.w3.org/2000/svg', 'text')
			let temp = coo2px([P[k][0], P[k][1]], dim, lim)
			l.setAttribute("x", temp[0])
			l.setAttribute("y", eval(temp[1]) + 15)
			l.setAttribute("fill", P[k][2].substring(1))
			l.setAttribute('style', 'font: italic 16px sans-serif;')
			l.textContent = P[k][3]
			ax.appendChild(l)
		}

	}
	return ax

}

function createSVG(dim = [300, 200]) {
	//ElemSVG=CreateSVG()
	let SVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	SVG.setAttribute("width", dim[0] + "px");
	SVG.setAttribute("height", dim[1] + "px");
	SVG.setAttribute('fill', 'none')
	SVG.setAttribute('stroke', 'black')
	return SVG
}
function createAxis(lim = [-1, 1, -1, 1, [0.5, 0.5]], dim = [300, 200]) {
	//ElemAxis=createAxis([-1,1,-1,1,[0.5,0.5],[0.1,0.1]],[600,400])
	function coo2px(P, dim, lim) {
		const m = [(dim[0] - 40) / (lim[1] - lim[0]), -(dim[1] - 40) / (lim[3] - lim[2])]
		const b = [20 - m[0] * lim[0], 20 - m[1] * lim[3]]
		return [m[0] * P[0] + b[0], m[1] * P[1] + b[1]]
	}
	let dummy
	let SVG = createSVG(dim)
	let group0 = document.createElementNS('http://www.w3.org/2000/svg', 'g')
	//Cuadricula secundaria
	let Line
	if (lim.length > 5) {
		for (let k = Math.floor(lim[0] / lim[5][0]); k <= Math.ceil(lim[1] / lim[5][0]); ++k) {
			Line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
			dummy = coo2px([k * lim[5][0], lim[2]], dim, lim)
			Line.setAttribute('x1', dummy[0])
			Line.setAttribute('y1', dummy[1])
			dummy = coo2px([k * lim[5][0], lim[3]], dim, lim)
			Line.setAttribute('x2', dummy[0])
			Line.setAttribute('y2', dummy[1])
			Line.setAttribute("stroke-dasharray", "5,5")
			Line.setAttribute("stroke", "RGB(254,114,0)")
			Line.setAttribute('stroke-width', 1);
			group0.appendChild(Line)
		}
		for (let k = Math.floor(lim[2] / lim[5][1]); k <= Math.ceil(lim[3] / lim[5][1]); ++k) {
			Line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

			dummy = coo2px([lim[0], k * lim[5][1]], dim, lim)
			Line.setAttribute('x1', dummy[0])
			Line.setAttribute('y1', dummy[1])
			dummy = coo2px([lim[1], k * lim[5][1]], dim, lim)
			Line.setAttribute('x2', dummy[0])
			Line.setAttribute('y2', dummy[1])
			Line.setAttribute("stroke-dasharray", "5,5")
			Line.setAttribute("stroke", "RGB(254,114,0)")
			Line.setAttribute('stroke-width', 1);
			group0.appendChild(Line)
		}
	}
	// Cuadricula principal
	if (lim.length > 4) {
		for (let k = Math.floor(lim[0] / lim[4][0]); k <= Math.ceil(lim[1] / lim[4][0]); ++k) {
			Line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
			dummy = coo2px([k * lim[4][0], lim[2]], dim, lim)
			Line.setAttribute('x1', dummy[0])
			Line.setAttribute('y1', dummy[1])
			dummy = coo2px([k * lim[4][0], lim[3]], dim, lim)
			Line.setAttribute('x2', dummy[0])
			Line.setAttribute('y2', dummy[1])
			Line.setAttribute("stroke", "RGB(254,114,0)")
			Line.setAttribute('stroke-width', 1);
			group0.appendChild(Line)
		}
		for (let k = Math.floor(lim[2] / lim[4][1]); k <= Math.ceil(lim[3] / lim[4][1]); ++k) {
			Line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
			dummy = coo2px([lim[0], k * lim[4][1]], dim, lim)
			Line.setAttribute('x1', dummy[0])
			Line.setAttribute('y1', dummy[1])
			dummy = coo2px([lim[1], k * lim[4][1]], dim, lim)
			Line.setAttribute('x2', dummy[0])
			Line.setAttribute('y2', dummy[1])
			Line.setAttribute("stroke", "RGB(254,114,0)")
			Line.setAttribute('stroke-width', 1);
			group0.appendChild(Line)
		}
	}

	//Ejes principales
	Line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	dummy = coo2px([lim[0], 0], dim, lim)
	Line.setAttribute('x1', dummy[0])
	Line.setAttribute('y1', dummy[1]); dummy = coo2px([lim[1], 0], dim, lim)
	Line.setAttribute('x2', dummy[0])
	Line.setAttribute('y2', dummy[1])
	Line.setAttribute("stroke", "RGB(254,114,0)")
	Line.setAttribute('stroke-width', 2);
	group0.appendChild(Line)
	Line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	dummy = coo2px([0, lim[2]], dim, lim)
	Line.setAttribute('x1', dummy[0])
	Line.setAttribute('y1', dummy[1]); dummy = coo2px([0, lim[3]], dim, lim)
	Line.setAttribute('x2', dummy[0])
	Line.setAttribute('y2', dummy[1])
	Line.setAttribute("stroke", "RGB(254,114,0)")
	Line.setAttribute('stroke-width', 2);
	group0.appendChild(Line)

	SVG.appendChild(group0)
	//Etiquetas
	if (lim.length > 4) {
		let txt, txt2, P
		for (let k = Math.floor(lim[0] / lim[4][0]); k <= Math.ceil(lim[1] / lim[4][0]); ++k) {
			P = coo2px([k * lim[4][0], 0], dim, lim)
			txt = document.createElementNS('http://www.w3.org/2000/svg', 'text')
			txt2 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan')
			txt2.setAttribute('x', P[0])
			txt2.setAttribute('y', P[1] + 2)
			txt2.setAttribute("fill", "black")
			txt2.setAttribute('style', 'font: italic 12px sans-serif;')
			txt2.setAttribute("alignment-baseline", "hanging")
			txt2.setAttribute("text-anchor", "middle")
			txt2.textContent = k * lim[4][0]
			txt.appendChild(txt2)
			if (k != 0) { SVG.appendChild(txt) }

		}
		for (let k = Math.floor(lim[2] / lim[4][1]); k <= Math.ceil(lim[3] / lim[4][1]); ++k) {
			P = coo2px([0, k * lim[4][1]], dim, lim)
			txt = document.createElementNS('http://www.w3.org/2000/svg', 'text')
			txt.setAttribute('x', P[0])
			txt.setAttribute('y', P[1])
			txt.setAttribute("fill", "black")
			txt.setAttribute('style', 'font: italic 12px sans-serif;')
			txt.textContent = k * lim[4][1]
			if (k != 0) { SVG.appendChild(txt) }
		}
	}
	return SVG

}
function PolyFrecAcum(P, lim = [0, 100, 0, 100, [20, 20], [5, 5]], dim = [500, 200]) {
	/***************** sintaxis **********************
	*   PolyFrecAcum([[0,10,50,80,100],[0,1,70,95,100],'Tiempo (s)'],//data
						  [0,100,0,100,[20,20],[5,5]],//x,y limits
						  [300,300])//size
	**************************************************/
	const n = 100
	let f = interpolate(P[0], P[1]);
	let message = '';
	const D = (P[0][P[0].length - 1] - P[0][0]) / n
	let xp = []
	let yp = []
	for (let x = P[0][0]; x <= P[0][P[0].length - 1]; x += D) {
		xp.push(x)
		yp.push(f(x))
	}
	let ax = createPlane(P[2], lim, dim, [xp, yp])
	//return [xp,yp]
	let center = document.createElement('div')
	center.style.textAlign = "center";
	center.appendChild(ax)
	return center

	function createPlane(xlabel, lim, dim, Q) {
		function coo2px(P, dim, lim) {
			const m = [(dim[0] - 60) / (lim[1] - lim[0]), -(dim[1] - 60) / (lim[3] - lim[2])]
			const b = [40 - m[0] * lim[0], 20 - m[1] * lim[3]]
			return [m[0] * P[0] + b[0], m[1] * P[1] + b[1]]
		}
		let dummy
		let SVG = createSVG(dim)
		let group0 = document.createElementNS('http://www.w3.org/2000/svg', 'g')
		//Cuadricula secundaria
		let Line
		if (lim.length > 5) {
			for (let k = Math.floor(lim[0] / lim[5][0]); k <= Math.ceil(lim[1] / lim[5][0]); ++k) {
				Line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
				dummy = coo2px([k * lim[5][0], lim[2]], dim, lim)
				Line.setAttribute('x1', dummy[0])
				Line.setAttribute('y1', dummy[1])
				dummy = coo2px([k * lim[5][0], lim[3]], dim, lim)
				Line.setAttribute('x2', dummy[0])
				Line.setAttribute('y2', dummy[1])
				Line.setAttribute("stroke", "RGB(254,114,0)")
				Line.setAttribute('stroke-width', .5);
				group0.appendChild(Line)
			}
			for (let k = Math.floor(lim[2] / lim[5][1]); k <= Math.ceil(lim[3] / lim[5][1]); ++k) {
				Line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

				dummy = coo2px([lim[0], k * lim[5][1]], dim, lim)
				Line.setAttribute('x1', dummy[0])
				Line.setAttribute('y1', dummy[1])
				dummy = coo2px([lim[1], k * lim[5][1]], dim, lim)
				Line.setAttribute('x2', dummy[0])
				Line.setAttribute('y2', dummy[1])
				Line.setAttribute("stroke", "RGB(254,114,0)")
				Line.setAttribute('stroke-width', .5);
				group0.appendChild(Line)
			}
		}
		// Cuadricula principal
		if (lim.length > 4) {
			for (let k = Math.floor(lim[0] / lim[4][0]); k <= Math.ceil(lim[1] / lim[4][0]); ++k) {
				Line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
				dummy = coo2px([k * lim[4][0], lim[2]], dim, lim)
				Line.setAttribute('x1', dummy[0])
				Line.setAttribute('y1', dummy[1])
				dummy = coo2px([k * lim[4][0], lim[3]], dim, lim)
				Line.setAttribute('x2', dummy[0])
				Line.setAttribute('y2', dummy[1])
				Line.setAttribute("stroke", "RGB(254,114,0)")
				Line.setAttribute('stroke-width', 1);
				group0.appendChild(Line)
			}
			for (let k = Math.floor(lim[2] / lim[4][1]); k <= Math.ceil(lim[3] / lim[4][1]); ++k) {
				Line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
				dummy = coo2px([lim[0], k * lim[4][1]], dim, lim)
				Line.setAttribute('x1', dummy[0])
				Line.setAttribute('y1', dummy[1])
				dummy = coo2px([lim[1], k * lim[4][1]], dim, lim)
				Line.setAttribute('x2', dummy[0])
				Line.setAttribute('y2', dummy[1])
				Line.setAttribute("stroke", "RGB(254,114,0)")
				Line.setAttribute('stroke-width', 1);
				group0.appendChild(Line)
			}
		}

		//Ejes principales
		Line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		dummy = coo2px([lim[0], 0], dim, lim)
		Line.setAttribute('x1', dummy[0])
		Line.setAttribute('y1', dummy[1]); dummy = coo2px([lim[1], 0], dim, lim)
		Line.setAttribute('x2', dummy[0])
		Line.setAttribute('y2', dummy[1])
		Line.setAttribute("stroke", "RGB(254,114,0)")
		Line.setAttribute('stroke-width', 2);
		group0.appendChild(Line)
		Line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		dummy = coo2px([0, lim[2]], dim, lim)
		Line.setAttribute('x1', dummy[0])
		Line.setAttribute('y1', dummy[1]); dummy = coo2px([0, lim[3]], dim, lim)
		Line.setAttribute('x2', dummy[0])
		Line.setAttribute('y2', dummy[1])
		Line.setAttribute("stroke", "RGB(254,114,0)")
		Line.setAttribute('stroke-width', 2);
		group0.appendChild(Line)

		SVG.appendChild(group0)
		//Etiquetas
		if (lim.length > 4) {
			let txt, txt2, P
			for (let k = Math.floor(lim[0] / lim[4][0]); k <= Math.ceil(lim[1] / lim[4][0]); ++k) {
				P = coo2px([k * lim[4][0], 0], dim, lim)
				txt = document.createElementNS('http://www.w3.org/2000/svg', 'text')
				txt2 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan')
				txt2.setAttribute('x', P[0])
				txt2.setAttribute('y', P[1] + 2)
				txt2.setAttribute("fill", "black")
				txt2.setAttribute('style', 'font: italic 12px sans-serif;')
				txt2.setAttribute("alignment-baseline", "hanging")
				txt2.setAttribute("text-anchor", "middle")
				txt2.textContent = k * lim[4][0]
				txt.appendChild(txt2)
				if (k != 0) { SVG.appendChild(txt) }

			}
			for (let k = Math.floor(lim[2] / lim[4][1]); k <= Math.ceil(lim[3] / lim[4][1]); ++k) {
				P = coo2px([0, k * lim[4][1]], dim, lim)
				txt = document.createElementNS('http://www.w3.org/2000/svg', 'text')
				txt.setAttribute('x', P[0])
				txt.setAttribute('y', P[1])
				txt.setAttribute("fill", "black")
				txt.setAttribute("text-anchor", "end")
				txt.setAttribute('style', 'font: italic 12px sans-serif;')
				txt.textContent = k * lim[4][1]
				if (k != 0) { SVG.appendChild(txt) }
			}
			const theta = Math.PI / 2
			txt = document.createElementNS('http://www.w3.org/2000/svg', 'text')
			txt.setAttribute('x', 0)
			txt.setAttribute('y', 0)
			txt.setAttribute("fill", "black")
			txt.setAttribute("text-anchor", "middle")
			txt.setAttribute("alignment-baseline", "hanging")
			txt.setAttribute("transform", "matrix(" + Math.cos(theta) + " " + Math.sin(-theta) + " " + Math.sin(theta) + " " + Math.cos(theta) + " 5 " + dim[1] / 2 + " )")
			txt.setAttribute('style', 'font: italic 12px sans-serif;')
			txt.textContent = 'Frecuencia Acumulada'
			SVG.appendChild(txt)
			txt = document.createElementNS('http://www.w3.org/2000/svg', 'text')
			txt.setAttribute('x', dim[0] / 2)
			txt.setAttribute('y', dim[1] - 5)
			txt.setAttribute("fill", "black")
			txt.setAttribute("text-anchor", "middle")
			txt.setAttribute("alignment-baseline", "baseline")
			txt.setAttribute('style', 'font: italic 12px sans-serif;')
			txt.textContent = xlabel
			SVG.appendChild(txt)
		}
		l = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
		let Point = ""
		for (let k1 = 0; k1 < Q[0].length; ++k1) {
			Point += " " + coo2px([Q[0][k1], Q[1][k1]], dim, lim)
		}

		l.setAttribute("points", Point)
		l.setAttribute("stroke", "blue")
		l.setAttribute('stroke-width', "2");
		SVG.appendChild(l)
		return SVG

	}

	function interpolate(xs, ys) {
		let i, length = xs.length;
		if (length != ys.length) { throw 'Need an equal count of xs and ys.'; }
		if (length === 0) { return function (x) { return 0; }; }
		if (length === 1) {
			let result = +ys[0];
			return function (x) { return result; };
		}
		let indexes = [];
		for (i = 0; i < length; i++) { indexes.push(i); }
		indexes.sort(function (a, b) { return xs[a] < xs[b] ? -1 : 1; });
		let oldXs = xs, oldYs = ys;
		xs = []; ys = [];
		for (i = 0; i < length; i++) { xs.push(+oldXs[indexes[i]]); ys.push(+oldYs[indexes[i]]); }
		let dys = [], dxs = [], ms = [];
		for (i = 0; i < length - 1; i++) {
			let dx = xs[i + 1] - xs[i], dy = ys[i + 1] - ys[i];
			dxs.push(dx); dys.push(dy); ms.push(dy / dx);
		}
		let c1s = [ms[0]];
		for (i = 0; i < dxs.length - 1; i++) {
			let m = ms[i], mNext = ms[i + 1];
			if (m * mNext <= 0) {
				c1s.push(0);
			} else {
				let dx = dxs[i], dxNext = dxs[i + 1], common = dx + dxNext;
				c1s.push(3 * common / ((common + dxNext) / m + (common + dx) / mNext));
			}
		}
		c1s.push(ms[ms.length - 1]);
		let c2s = [], c3s = [];
		for (i = 0; i < c1s.length - 1; i++) {
			let c1 = c1s[i], m = ms[i], invDx = 1 / dxs[i], common = c1 + c1s[i + 1] - m - m;
			c2s.push((m - c1 - common) * invDx); c3s.push(common * invDx * invDx);
		}

		return function (x) {
			let i = xs.length - 1;
			if (x == xs[i]) { return ys[i]; }
			let low = 0, mid, high = c3s.length - 1;
			while (low <= high) {
				mid = Math.floor(0.5 * (low + high));
				let xHere = xs[mid];
				if (xHere < x) { low = mid + 1; }
				else if (xHere > x) { high = mid - 1; }
				else { return ys[mid]; }
			}
			i = Math.max(0, high);
			const diff = x - xs[i], diffSq = diff * diff;
			return ys[i] + c1s[i] * diff + c2s[i] * diffSq + c3s[i] * diff * diffSq;
		};
	};
}
function TipoRelacionesDiagAsig(tipo, DI = [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]], size = [240, 150]) {
	const n = [DI[0].length, DI[1].length]
	let Asignationx = [], Asignationy = [], Relation = []

	switch (tipo) {
		case 'RS':
			let noRepeat
			for (let k = 0; k < n[0]; ++k) {
				do {
					Relation.push([k, Math.floor(Math.random() * n[1])])
				} while (Math.random() < 0.2)
			}
			do {
				noRepeat = [Math.floor(Math.random() * n[0]), Math.floor(Math.random() * n[1])]
			} while (noRepeat[1] == Relation[noRepeat[0]][1])
			Relation.push(noRepeat)
			break
		case 'RNS':
			const ElEmpty = Math.floor(Math.random() * n[0])
			let ElRep, NoRepeat, dummy

			do {
				for (let k = 0; k < n[0]; ++k) {
					if (k != ElEmpty) {
						if (Math.random() < 0.8) {
							Relation.push([Math.floor(Math.random() * n[0]),
							Math.floor(Math.random() * n[1])])
						}
					}
				}
			} while (Relation.length == 0)
			ElRep = Math.floor(Math.random() * Relation.length)
			do {
				dummy = Math.floor(Math.random() * n[1])
			} while (Relation[ElRep][1] == dummy)
			Relation.push([Relation[ElRep][0], dummy])
			break
		case 'FB':
			if (n[0] > n[1]) {
				alert('No es posible hacer una función biyectiva con x=' + DI[0] + ' y=' + DI[1])
			}

			for (let k = 0; k < n[0]; ++k) Asignationy.push(k)
			Asignationy = unsortArray(Asignationy)
			for (let k = 0; k < n[0]; ++k) Relation.push([k, Asignationy[k]])
			break
		case 'FSNI':
			if (n[0] > n[1]) {
				alert('Verifica las condiciones para hacer una FSNI con x=' + DI[0] + ' y=' + DI[1])
			}
			for (let k = 0; k < n[0]; ++k) {
				Asignationy.push(k)
				Asignationx.push(k)
			}
			Asignationy = unsortArray(Asignationy)
			Asignationx = unsortArray(Asignationx)
			const dummyFSNI = Math.ceil(Math.random() * (n[0] - 1))
			for (let k = 0; k < n[0]; ++k) {
				if (k < dummyFSNI) Relation.push([Asignationx[k], Asignationy[k]])
				else Relation.push([Asignationx[k], Asignationy[Math.floor(Math.random() * (n[0] - dummyFSNI))]])
			}
			break
		case 'FNSNI':
			if (n[0] > n[1]) {
				alert('Verifica las condiciones para FNSNI con x=' + DI[0] + ' y=' + DI[1])
			}
			const dummyFNSNI = [Math.ceil(Math.random() * (n[0] - 3)) + 2]
			do {
				dummyFNSNI[1] = Math.ceil(Math.random() * (dummyFNSNI[0] - 1))
			} while (dummyFNSNI[1] < 1)
			for (let k = 0; k < n[0]; ++k) {
				Asignationy.push(k)
				Asignationx.push(k)
			}

			Asignationy = unsortArray(Asignationy)
			Asignationx = unsortArray(Asignationx)
			Asignationx = Asignationx.slice(0, dummyFNSNI[0])
			Asignationy = Asignationy.slice(0, dummyFNSNI[0])
			for (let k = 0; k < dummyFNSNI[0]; ++k) {
				if (k < dummyFNSNI[1]) Relation.push([Asignationx[k], Asignationy[k]])
				else Relation.push([Asignationx[k],
				Asignationy[Math.floor(Math.random() * dummyFNSNI[1])]
				])
			}
			break
		case 'FNSI':
			if (n[0] > n[1]) {
				alert('Verifica las condiciones para FNSI con x=' + DI[0] + ' y=' + DI[1])
			}
			const dummyFNSI = Math.ceil(Math.random() * (n[0] - 3)) + 2

			for (let k = 0; k < n[0]; ++k) {
				Asignationy.push(k)
				Asignationx.push(k)
			}

			Asignationy = unsortArray(Asignationy)
			Asignationx = unsortArray(Asignationx)
			Asignationx = Asignationx.slice(0, dummyFNSI)
			Asignationy = Asignationy.slice(0, dummyFNSI)
			for (let k = 0; k < dummyFNSI; ++k) {
				Relation.push([Asignationx[k], Asignationy[k]])
			}
			break
	}
	return diagramaAsignacion([DI[0], DI[1], Relation], size)
}
function diagramaAsignacion(txtElem, size = [480, 300]) {
	/*Ejemplo
	diagramaAsignacion([	[9,5,8,7,4,6],
							['a','e','w'],
							[[0,0],[0,1],[2,2]] ],
							[480,300])
	*/
	let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
	svg.setAttribute('width', size[0])
	svg.setAttribute('height', size[1])
	//Vamos a definir las flechas
	let def = document.createElementNS("http://www.w3.org/2000/svg", "defs")
	let marker = document.createElementNS("http://www.w3.org/2000/svg", "marker")
	marker.setAttribute('id', 'head')
	marker.setAttribute('orient', 'auto')
	marker.setAttribute('markerWidth', 3)
	marker.setAttribute('markerHeight', 4)
	marker.setAttribute('refX', 0.1)
	marker.setAttribute('refY', 2)
	let path = document.createElementNS("http://www.w3.org/2000/svg", "path")
	path.setAttribute('d', 'M0,0 V4 L2,2 Z')
	path.setAttribute('fill', 'gray')
	marker.appendChild(path)
	def.appendChild(marker)
	svg.appendChild(def)


	let ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse")
	ellipse.setAttribute('rx', (size[0] / 4 - 5) * .8)
	ellipse.setAttribute('ry', size[1] / 2 - 10)
	ellipse.setAttribute('cx', size[0] * 0.20)
	ellipse.setAttribute('cy', size[1] * 0.5)
	ellipse.setAttribute('fill', 'none')
	ellipse.setAttribute('stroke', 'blue')
	ellipse.setAttribute('stroke-width', 3)
	svg.appendChild(ellipse)
	ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse")
	ellipse.setAttribute('rx', (size[0] / 4 - 5) * .8)
	ellipse.setAttribute('ry', size[1] / 2 - 10)
	ellipse.setAttribute('cx', size[0] * 0.80)
	ellipse.setAttribute('cy', size[1] * 0.5)
	ellipse.setAttribute('fill', 'none')
	ellipse.setAttribute('stroke', 'blue')
	ellipse.setAttribute('stroke-width', 3)
	svg.appendChild(ellipse)

	// Aqui van las flechas
	let a = size[0] * 0.1
	let b = size[1] * 0.9
	let D = [(b - a) / (txtElem[0].length - 1), (b - a) / (txtElem[1].length - 1)]
	for (let k = 0; k < txtElem[2].length; ++k) {

		path = document.createElementNS("http://www.w3.org/2000/svg", "path")
		path.setAttribute('stroke', 'gray')
		path.setAttribute('marker-end', 'url(#head)')
		path.setAttribute('stroke-width', '3')
		path.setAttribute('fill', 'none')
		path.setAttribute('d', 'M' + (size[0] * 0.20 + 10) + ',' + (a + txtElem[2][k][0] * D[0]) + ', ' + (size[0] * 0.80 - 10) + ',' + (a + txtElem[2][k][1] * D[1]))
		svg.appendChild(path)
	}

	D = (b - a) / (txtElem[0].length - 1)
	let txt
	for (let k = 0; k < txtElem[0].length; ++k) {
		txt = document.createElementNS("http://www.w3.org/2000/svg", "text")
		txt.setAttribute('stroke', 'black')
		txt.setAttribute('x', size[0] * 0.20)
		txt.setAttribute('y', a + k * D)
		txt.setAttribute("text-anchor", "middle")
		txt.setAttribute("alignment-baseline", "middle")
		txt.textContent = txtElem[0][k]
		svg.appendChild(txt)
	}

	D = (b - a) / (txtElem[1].length - 1)
	for (let k = 0; k < txtElem[1].length; ++k) {
		txt = document.createElementNS("http://www.w3.org/2000/svg", "text")
		txt.setAttribute('stroke', 'black')
		txt.setAttribute('x', size[0] * 0.80)
		txt.setAttribute('y', a + k * D)
		txt.setAttribute("text-anchor", "middle")
		txt.setAttribute("alignment-baseline", "middle")
		txt.textContent = txtElem[1][k]
		svg.appendChild(txt)
	}
	let center = document.createElement('div')
	center.style.textAlign = "center";
	center.appendChild(svg)
	return center
}
function diagramaVenn2(legend, ancho = 300) {
	/*
	Sintaxis:
		diagramaVenn2([['A','B'],['0','1','2','3']])
		diagramaVenn2([['A','B'],[]])
		diagramaVenn2([[],['0','1','2','3']])
		diagramaVenn2([[],[]])
		diagramaVenn2([['A','B'],['$$x_0$$','$$x_1$$','$$x_2$$','$$x_3$$']])
	*/
	const alto = ancho / 1.618
	let S = `<svg "http://www.w3.org/2000/svg" height="${alto}" width="${ancho}">
    <rect  width="${ancho - 2}" height="${alto - 2}" x="1" y="1" fill="none" stroke="black" stroke-width="2" />
    <circle cx="${0.35 * ancho}" cy="${alto / 2}" r="${0.5 * alto / 1.2}" fill="none" stroke="black" stroke-width="2" />
    <circle cx="${0.65 * ancho}" cy="${alto / 2}" r="${0.5 * alto / 1.2}" fill="none" stroke="black" stroke-width="2" />
    <text font-size="${ancho * 0.09}" x="3" y="3" alignment-baseline="hanging">U</text>`

	if (legend[0].length > 0) {
		S += `<text font-size="${ancho * 0.09}" text-anchor="end" x="${0.35 * ancho - 0.5 * alto / (1.2 * 1.41)}" y="${alto / 2 - 0.5 * alto / (1.2 * 1.41)}" >${legend[0][0]}</text>`
		S += `<text font-size="${ancho * 0.09}" text-anchor="start" x="${0.65 * ancho + 0.5 * alto / (1.2 * 1.41)}" y="${alto / 2 - 0.5 * alto / (1.2 * 1.41)}" >${legend[0][1]}</text>`
	}
	if (legend[1].length > 0) {
		//Hacer la fuente más pequeña si es fraccion

		if (!(typeof legend[1][0] === 'string' && legend[1][0].includes("$$"))) S += `<text font-size="${ancho * 0.09}" text-anchor="end" x="${ancho - 4}" y="${alto - 4}">${legend[1][0]}</text>`
		else S += `<foreignObject x="${ancho * .85}" y="${alto - ancho * .2 - 4}" width="${ancho * .15}" height="${ancho * .20}" >    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${legend[1][0].includes('\\frac') ? ancho * 0.045 : ancho * 0.09};text-align: rigth;width: fit-content;">${legend[1][0]}</div></foreignObject>`

		if (!(typeof legend[1][1] === 'string' && legend[1][1].includes("$$"))) S += `<text font-size="${ancho * 0.09}" text-anchor="end" x="${0.35 * ancho}" y="${alto / 2}" >${legend[1][1]}</text>`
		else S += `<foreignObject x="${0.35 * ancho - 0.5 * alto / (1.2 * 1.41)}" y="${0.35 * alto}" width="${ancho * .15}" height="${ancho * .20}">
            <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${legend[1][1].includes('\\frac') ? ancho * 0.045 : ancho * 0.09};text-align: rigth;width: fit-content;">${legend[1][1]}</div></foreignObject>`

		if (!(typeof legend[1][2] === 'string' && legend[1][2].includes("$$"))) S += `<text font-size="${ancho * 0.09}" text-anchor="middle" x="${ancho / 2}" y="${alto / 2}" >${legend[1][2]}</text>`
		else S += `<foreignObject x="${0.41 * ancho}" y="${0.35 * alto}" width="${ancho * .18}" height="${ancho * .20}">
            <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${legend[1][2].includes('\\frac') ? ancho * 0.045 : ancho * 0.09};text-align: rigth;width: fit-content;">${legend[1][2]}</div></foreignObject>`


		if (!(typeof legend[1][3] === 'string' && legend[1][3].includes("$$"))) S += `<text font-size="${ancho * 0.09}" text-anchor="start" x="${0.65 * ancho}" y="${alto / 2}" >${legend[1][3]}</text>`
		else S += `<foreignObject x="${0.65 * ancho}" y="${0.35 * alto}" width="${ancho * .15}" height="${ancho * .20}">
            <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${legend[1][3].includes('\\frac') ? ancho * 0.045 : ancho * 0.09};text-align: rigth;width: fit-content;">${legend[1][3]}</div></foreignObject>`
		//S += `<circle cx="${ancho-4}" cy="${alto-4}" r="3">`
	}

	S += `</svg>`
	return S
}
function diagramaArbol(legend, a = 300) {
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
  <line        x1="0" y1="${a / 2}"   x2="${0.3 * a}" y2="${0.3 * a}" stroke="black" stroke-width="1" marker-end="url(#arrowhead)" />
  <line        x1="0" y1="${a / 2}"   x2="${0.3 * a}" y2="${0.7 * a}" stroke="black" stroke-width="1" marker-end="url(#arrowhead)" />
  <line x1="${0.5 * a}" y1="${0.3 * a}" x2="${0.8 * a}" y2="${0.15 * a}" stroke="black" stroke-width="1" marker-end="url(#arrowhead)" />
  <line x1="${0.5 * a}" y1="${0.3 * a}" x2="${0.8 * a}" y2="${0.45 * a}" stroke="black" stroke-width="1" marker-end="url(#arrowhead)" />
  <line x1="${0.5 * a}" y1="${0.7 * a}" x2="${0.8 * a}" y2="${0.55 * a}" stroke="black" stroke-width="1" marker-end="url(#arrowhead)" />
  <line x1="${0.5 * a}" y1="${0.7 * a}" x2="${0.8 * a}" y2="${0.85 * a}" stroke="black" stroke-width="1" marker-end="url(#arrowhead)" />`

	if (legend[0].length > 0) {
		S += `  <text font-size="${0.09 * a}" text-anchor="middle" alignment-baseline="middle"  x="${0.4 * a}" y="${0.3 * a}" >${legend[0][0]}</text>
            <text font-size="${0.09 * a}" text-anchor="middle" alignment-baseline="middle"  x="${0.4 * a}" y="${0.7 * a}" >${legend[0][0]}<tspan dy ="-5">c</tspan></text>
            <text font-size="${0.09 * a}" text-anchor="middle" alignment-baseline="middle"  x="${0.9 * a}" y="${0.15 * a}" >${legend[0][1]}</text>
            <text font-size="${0.09 * a}" text-anchor="middle" alignment-baseline="middle"  x="${0.9 * a}" y="${0.45 * a}" >${legend[0][1]}<tspan dy ="-5">c</tspan></text>
            <text font-size="${0.09 * a}" text-anchor="middle" alignment-baseline="middle"  x="${0.9 * a}" y="${0.55 * a}" >${legend[0][1]}</text>
            <text font-size="${0.09 * a}" text-anchor="middle" alignment-baseline="middle"  x="${0.9 * a}" y="${0.85 * a}" >${legend[0][1]}<tspan dy ="-5">c</tspan></text>`
	}
	if (legend[1].length > 0) {

		if (!(typeof legend[1][0] === 'string' && legend[1][0].includes("$$"))) S += `<text alignment-baseline="baseline" font-size="${a * 0.065}" text-anchor="end" x="${.15 * a}" y="${.4 * a}">${legend[1][0]}</text>`
		else S += `<foreignObject x="${.05 * a}" y="${.2 * a}" width="${a * .15}" height="${a * .20}" style="border:solid green 2px">    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${legend[1][0].includes('\\frac') ? a * 0.045 : a * 0.09};text-align: rigth;width: fit-content;border: solid red 2px">${legend[1][0]}</div></foreignObject>`

		if (!(typeof legend[1][1] === 'string' && legend[1][1].includes("$$"))) S += `<text alignment-baseline="hanging" font-size="${a * 0.065}" text-anchor="end" x="${.15 * a}" y="${.6 * a}">${legend[1][1]}</text>`
		else S += `<foreignObject x="${.045 * a}" y="${.55 * a}" width="${a * .15}" height="${a * .20}" style="border:solid green 2px">    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${legend[1][1].includes('\\frac') ? a * 0.045 : a * 0.09};text-align: rigth;width: fit-content;border: solid red 2px">${legend[1][1]}</div></foreignObject>`

		if (!(typeof legend[1][2] === 'string' && legend[1][2].includes("$$"))) S += `<text alignment-baseline="baseline" font-size="${a * 0.065}" text-anchor="end" x="${.65 * a}" y="${.225 * a}">${legend[1][2]}</text>`
		else S += `<foreignObject x="${.5 * a}" y="${.04 * a}" width="${a * .15}" height="${a * .20}" style="border:solid green 2px">    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${legend[1][2].includes('\\frac') ? a * 0.045 : a * 0.09};text-align: rigth;width: fit-content;border: solid red 2px">${legend[1][2]}</div></foreignObject>`

		if (!(typeof legend[1][3] === 'string' && legend[1][3].includes("$$"))) S += `<text alignment-baseline="hanging" font-size="${a * 0.065}" text-anchor="end" x="${.65 * a}" y="${.375 * a}">${legend[1][3]}</text>`
		else S += `<foreignObject x="${.48 * a}" y="${.29 * a}" width="${a * .15}" height="${a * .20}" style="border:solid green 2px">    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${legend[1][3].includes('\\frac') ? a * 0.045 : a * 0.09};text-align: rigth;width: fit-content;border: solid red 2px">${legend[1][3]}</div></foreignObject>`

		if (!(typeof legend[1][4] === 'string' && legend[1][4].includes("$$"))) S += `<text alignment-baseline="baseline" font-size="${a * 0.065}" text-anchor="end" x="${.65 * a}" y="${.625 * a}">${legend[1][4]}</text>`
		else S += `<foreignObject x="${.48 * a}" y="${.49 * a}" width="${a * .15}" height="${a * .20}" style="border:solid green 2px">    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${legend[1][4].includes('\\frac') ? a * 0.045 : a * 0.09};text-align: rigth;width: fit-content;border: solid red 2px">${legend[1][4]}</div></foreignObject>`

		if (!(typeof legend[1][5] === 'string' && legend[1][5].includes("$$"))) S += `<text alignment-baseline="hanging" font-size="${a * 0.065}" text-anchor="end" x="${.65 * a}" y="${.775 * a}">${legend[1][5]}</text>`
		else S += `<foreignObject x="${.48 * a}" y="${.7 * a}" width="${a * .15}" height="${a * .20}" style="border:solid green 2px">    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:${legend[1][5].includes('\\frac') ? a * 0.045 : a * 0.09};text-align: rigth;width: fit-content;border: solid red 2px">${legend[1][5]}</div></foreignObject>`
	}



	S += `</svg>`
	return S
}
function plotCuartiles(Q, lim, dim, xlabel) {
	/*
	plotCuartiles([min,q1,med,q3,max],[xmin,xmax,Dx,dx,decimales],[400,280],'eje x')
	plotCuartiles(data,[xmin,xmax,Dx],[280,400],'eje x')
	*/
	const xmin = lim[0], xmax = lim[1], Dx = lim[2], minSpace = dim[1] * .05
	const ancho = dim[1] - 2 * minSpace, alto = 0.8 * dim[0] - minSpace, xtick = [Math.ceil(xmin / Dx) * Dx]
	// Vamos a calcular cuanto vale en pixeles
	/*
   ( xmin, minSpace), (xmax,ancho+minSpace)
	*/
	const L = [ancho / (xmax - xmin)]
	L.push(minSpace - L[0] * xmin)
	const Dpx = L[0] * Dx

	while (xtick[xtick.length - 1] <= xmax) {
		xtick.push(xtick[xtick.length - 1] + Dx)
	}
	console.log(xtick)
	let Slabelx = "", temporalx = 0
	for (let k = 1; (alto + minSpace - Dpx * k) >= minSpace; ++k) {
		Slabelx += `<line x1="${minSpace}" y1="${alto + minSpace - Dpx * k}" x2="${ancho + minSpace}" y2="${alto + minSpace - Dpx * k}" stroke="gray" stroke-width="2.5" />`
		temporalx = alto + minSpace - Dpx * k
	}
	for (let k = 0; k < xtick.length - 1; ++k) {
		Slabelx += `<line x1="${L[0] * xtick[k] + L[1]}" y1="${alto + minSpace}" x2="${L[0] * xtick[k] + L[1]}" y2="${temporalx}" stroke="gray" stroke-width="2.5" />
                <line x1="${L[0] * xtick[k] + L[1]}" y1="${alto + 0.5 * minSpace}" x2="${L[0] * xtick[k] + L[1]}" y2="${alto + 1.5 * minSpace}" stroke="black" stroke-width="3" />
                <text font-size="${0.075 * alto}" text-anchor="middle" alignment-baseline="hanging"  x="${L[0] * xtick[k] + L[1]}" y="${alto + 1.5 * minSpace + 3}" >${xtick[k]}</text>`
	}

	let S = `<svg width="${dim[1]}" height="${dim[0]}" style="border:solid red 2px">${Slabelx}
              <line x1="${minSpace}" y1="${alto + minSpace}" x2="${ancho + minSpace}" y2="${alto + minSpace}" stroke="black" stroke-width="3" />
              <text font-size="${0.09 * alto}" text-anchor="middle" alignment-baseline="text-top"  x="${0.5 * dim[1]}" y="${dim[0] - 0.2 * minSpace}" >${xlabel}</text>
            </svg>`
	return S
}

// Stat.js
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

function Milimetrado(Dim, Cuadricula) {
	/*Ejemplo
	Milimetrado(600,[10, 20,.2] )
	*/
	Dim = [Dim * Cuadricula[0] / Cuadricula[1], Dim]


	var salida = "<center><svg width='" + (Dim[1] + 10) + "px' height='" + (Dim[0] + 10) + "px'><g transform='translate(5 5) scale(" + (Dim[1] / Cuadricula[1]) + ")'>"
	//salida+='<path      id="heart"      d="M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z" />'
	if (Cuadricula.length > 2) {
		for (var k = 0; k <= Cuadricula[0]; k += Cuadricula[2])	salida += '<line x1="0" y1="' + k + '" x2="' + Cuadricula[1] + '" y2="' + k + '" stroke="RGB(256,200,100)"  stroke-width="' + (0.5 * Cuadricula[1] / Dim[1]) + '"/>'
		for (var k = 0; k <= Cuadricula[1]; k += Cuadricula[2])  salida += '<line x1="' + k + '" y1="0" x2="' + k + '" y2="' + Cuadricula[0] + '" stroke="RGB(256,200,100)"  stroke-width="' + (0.5 * Cuadricula[1] / Dim[1]) + '"/>'
	}

	for (var k = 0; k <= Cuadricula[0]; ++k) salida += '<line x1="0" y1="' + k + '" x2="' + Cuadricula[1] + '" y2="' + k + '" stroke="RGB(256,200,100)"  stroke-width="' + (2 * Cuadricula[1] / Dim[1]) + '"/>'
	for (var k = 0; k <= Cuadricula[1]; ++k) salida += '<line x1="' + k + '" y1="0" x2="' + k + '" y2="' + Cuadricula[0] + '" stroke="RGB(256,200,100)"  stroke-width="' + (2 * Cuadricula[1] / Dim[1]) + '"/>'


	salida += '</g></svg></center>'

	return salida
}
function Cuartiles(ar) {
	let arr = [...ar]
	arr.sort((a, b) => a - b)
	const n = arr.length
	const q2 = (n + 1) / 2
	const q1 = (n + 1) / 4
	const q3 = 3 * (n + 1) / 4
	const getQuartile = (index) => {
		const pos = Math.floor(index);
		if (index === pos) {
			return arr[pos - 1];
		} else {
			return (arr[pos - 1] + arr[pos]) / 2;
		}
	};
	return [getQuartile(1), getQuartile(q1), getQuartile(q2), getQuartile(q3), getQuartile(n)]

}
function Max(x) {

	var m = Math.min.apply(Math, x);
	var M = Math.max.apply(Math, x)

	if (M > (-m)) {
		return M
	} else {
		return -m
	}
}
function MCM(x) {
	var N = x.length;
	for (var k = 2; k <= Max(x) / 2; ++k) {
		if (MCMHelp(x, k)) {
			for (var i = 0; i < x.length; ++i) {
				x[i] = x[i] / k;
			}
			--k;
		}
	}
	return x
}
function mulAtor(min, Max) {
	if (Max == 0) {
		return 1;
	}
	var M = 1
	for (var k = min; k <= Max; ++k) {
		M *= k
	}
	return M
}
function comb(n, r) {
	var m = n - r;
	if (m > r) {
		q = m
		m = r
		r = q
	}
	return mulAtor(r + 1, n) / mulAtor(1, m)
}
function M_binomialpdf(n, p, x) {

	var C = comb(n, x)
	return C * Math.pow(p, x) * Math.pow(1 - p, n - x)
}
function M_binomialcdf(n, p, x) {
	var S = 0
	for (var k = 0; k <= x; ++k) {
		S += M_binomialpdf(n, p, k)
	}
	return S
}
function M_binomialcdf_R(n, p, xL, xU) {
	var S = 0
	for (var k = xL; k <= xU; ++k) {
		S += M_binomialpdf(n, p, k)
	}
	return S
}
function M_range_count(x, h) {
	/*provee un arreglo del mínimo al máximo de h en h*/
	var c = M_range(x)
	var q = [c[0]]
	var k = 0
	while (q[k] < c[1]) {
		q[++k] = q[k - 1] + h
	}
	return q
}
function M_range(x) {
	/*Provee el mínimo y maximo*/
	var m_min = x[0] + 1
	var m_max = x[0] - 1
	for (k = 0; k < x.length; ++k) {
		if (x[k] > m_max) {
			m_max = x[k]
		}
		if (x[k] < m_min) {
			m_min = x[k]
		}
	}
	return [m_min, m_max]
}
function M_2_var_stat(x, y) {
	/*Emula la función 2 Var Stats de la calculadora*/
	/*var x=[-21,-17,-15,-14,-13]
	var y=[0,1,2,4,5]*/

	var n = x.length
	var xm = M_mean(x)
	var ym = M_mean(y)
	var Sumx = 0
	var Sumy = 0
	var Sumx2 = 0
	var Sumy2 = 0
	var Sumxy = 0
	var Sx = 0
	var Sy = 0;
	for (var k = 0; k < n; ++k) {
		Sumx += x[k]
		Sumy += y[k]
		Sumx2 += x[k] * x[k]
		Sumy2 += y[k] * y[k]
		Sumxy += x[k] * y[k]
		Sx += Math.pow(x[k] - xm, 2)
		Sy += Math.pow(y[k] - ym, 2)
	}
	var S = "<center><table><tr><td style='background-color:#333;color:white'> <b>2 Var Stats</b></td></tr>"
	S += "<tr><td align='left'>$\\overline x = " + Sumx / n + "$</td></tr>"
	S += "<tr><td align='left'>$\\sum x = " + Sumx + "$</td></tr>"
	S += "<tr><td align='left'>$\\sum x^2 = " + Sumx2 + "$</td></tr>"
	S += "<tr><td align='left'>$S_x= " + Math.sqrt(Sx / (n - 1)) + "$</td></tr>"
	S += "<tr><td align='left'>$\\sigma_x=" + Math.sqrt(Sx / n) + "$</td></tr>"
	S += "<tr><td align='left'>$n=" + n + "$</td></tr>"
	S += "<tr><td align='left'>$\\overline y = " + Sumy / n + "$</td></tr>"
	S += "<tr><td align='left'>$\\sum y = " + Sumy + "$</td></tr>"
	S += "<tr><td align='left'>$\\sum y^2 = " + Sumy2 + "$</td></tr>"
	S += "<tr><td align='left'>$S_y= " + Math.sqrt(Sy / (n - 1)) + "$</td></tr>"
	S += "<tr><td align='left'>$\\sigma_y=" + Math.sqrt(Sy / n) + "$</td></tr>"
	S += "<tr><td align='left'>$\\sum xy=" + Sumxy + "$</td></tr>"
	return S
}
function M_LinReg(x, y, op = null) {
	/*Emula la función LinReg dela calculadora*/
	/*var x=[-21,-17,-15,-14,-13]
	var y=[0,1,2,4,5]*/

	var n = x.length
	var xm = M_mean(x)
	var ym = M_mean(y)
	var Sumxy = 0
	var Sx = 0
	for (var k = 0; k < n; ++k) {
		Sumxy += x[k] * y[k]
		Sx += Math.pow(x[k] - xm, 2)
	}
	var m = (Sumxy - n * xm * ym) / (Sx)
	var b = ym - m * xm
	if (op == 'ec') {
		return `y = ${polinomio([eval(m.toPrecision(3)), eval(b.toPrecision(3))])}`
	}
	return [m, b]
}
function M_FacPearson(x, y) {
	/*Emula la función LinReg dela calculadora*/
	/*var x=[-21,-17,-15,-14,-13]
	var y=[0,1,2,4,5]*/

	const n = x.length
	let Sumxy = 0
	let Sumx = 0
	let Sumx2 = 0
	let Sumy = 0
	let Sumy2 = 0
	for (let k = 0; k < n; ++k) {
		Sumx += x[k]
		Sumx2 += x[k] * x[k]
		Sumy += y[k]
		Sumy2 += y[k] * y[k]
		Sumxy += x[k] * y[k]
	}
	return (n * Sumxy - Sumx * Sumy) / Math.sqrt((n * Sumx2 - Sumx * Sumx) * (n * Sumy2 - Sumy * Sumy))
}
function M_Sumxy(x, y) {
	var S = 0;
	var n = x.length
	for (var k = 0; k < n; ++k) S += x[k] * y[k]
	return S
}
function M_mean(x) {
	/*Promedio de un arreglo de números*/

	var mean = 0;
	var n = x.length
	for (var k = 0; k < n; ++k) mean += x[k]
	return mean / n
}
function M_covarianza(x, y) {
	/*Obtiene la covarianza Sxy*/
	var xm = M_mean(x)
	var ym = M_mean(y)
	var n = x.length
	return (M_Sumxy(x, y) / n - xm * ym)
}
function M_AS2N(x) {
	/*Array String to Number*/
	var v = []
	var n = x.length
	for (var k = 0; k < n; ++k) {
		v[k] = eval(x[k])
	}
	return v
}

function chiCuadradaCal(fo, fe = [[0]]) {
	const filas = fo.length;
	const columnas = fo[0].length;
	if (fe == 'default') {
		const totalRows = [], totalCols = []
		const dataEsperada = []
		let nRows = fo.length
		let nCols = fo[0].length
		let total = 0
		for (let row = 0; row < nRows; ++row) {
			totalRows.push(0)
			for (let col = 0; col < nCols; ++col)	 totalRows[row] += fo[row][col]
		}
		for (let col = 0; col < nCols; ++col) {
			totalCols.push(0)
			for (let row = 0; row < nRows; ++row)	 totalCols[col] += fo[row][col]
			total += totalCols[col]
		}
		for (let row = 0; row < nRows; ++row) {
			dataEsperada[row] = []
			for (let col = 0; col < nCols; ++col)	 dataEsperada[row][col] = totalRows[row] * totalCols[col] / total
		}
		return chiCuadradaCal(fo, dataEsperada)
	}

	if (fe[0].length == 1) {
		if (filas > 1) {
			const Tx = [], Ty = []
			let T = 0
			for (let i = 0; i < filas; i++) {
				Ty[i] = 0
				for (let j = 0; j < columnas; j++) 	Ty[i] += fo[i][j]
				T += Ty[i]
			}
			for (let i = 0; i < columnas; i++) {
				Tx[i] = 0
				for (let j = 0; j < filas; j++) 	Tx[i] += fo[j][i]
			}
			for (let i = 0; i < filas; i++) {
				fe[i] = []
				for (let j = 0; j < columnas; j++) 	fe[i][j] = Ty[i] * Tx[j] / T
			}
		} else {
			let T = 0
			for (let j = 0; j < columnas; j++) 	T += fo[0][j]
			for (let j = 0; j < columnas; j++) 	fe[0][j] = T / columnas
		}
	}
	let x2 = 0;
	let diferencia

	for (let i = 0; i < filas; i++) {
		for (let j = 0; j < columnas; j++) {
			diferencia = fo[i][j] - fe[i][j]
			x2 += diferencia * diferencia / fe[i][j]
		}
	}
	return x2;
}
function chi_matriz_esperada(fo) {
	const totalRows = [], totalCols = []
	const dataEsperada = []
	let nRows = fo.length
	let nCols = fo[0].length
	let total = 0
	for (let row = 0; row < nRows; ++row) {
		totalRows.push(0)
		for (let col = 0; col < nCols; ++col)	 totalRows[row] += fo[row][col]
	}
	for (let col = 0; col < nCols; ++col) {
		totalCols.push(0)
		for (let row = 0; row < nRows; ++row)	 totalCols[col] += fo[row][col]
		total += totalCols[col]
	}
	for (let row = 0; row < nRows; ++row) {
		dataEsperada[row] = []
		for (let col = 0; col < nCols; ++col)	 dataEsperada[row][col] = totalRows[row] * totalCols[col] / total
	}
	return [dataEsperada, totalCols, totalRows, total]
}
function chitablas(dof, alpha) {
	// 0.01, 0.05, 0.01
	const q = (alpha == 0.01 ? 0 : (alpha == 0.05 ? 1 : 2))
	const chit = [[6.635, 3.842, 2.706],
	[9.210, 5.992, 4.605],
	[11.345, 7.815, 6.251],
	[13.277, 9.488, 7.779],
	[15.086, 11.071, 9.236],
	[16.812, 12.592, 10.645],
	[18.475, 14.067, 12.017],
	[20.09, 15.507, 13.362],
	[21.666, 16.919, 14.684],
	[23.209, 18.307, 15.987],
	[24.725, 19.675, 17.275],
	[26.217, 21.026, 18.549],
	[27.688, 22.362, 19.812],
	[29.141, 23.685, 21.064],
	[30.578, 24.996, 22.307],
	[32.000, 26.296, 23.542],
	[33.409, 27.587, 24.769],
	[34.805, 28.869, 25.989],
	[36.191, 30.144, 27.204],
	[37.566, 31.41, 28.412],
	[38.932, 32.671, 29.615],
	[40.289, 33.925, 30.813],
	[41.638, 35.173, 32.007],
	[42.98, 36.415, 33.196],
	[44.314, 37.653, 34.382],
	[45.642, 38.885, 35.563],
	[46.963, 40.113, 36.741],
	[48.278, 41.337, 37.916],
	[49.588, 42.557, 39.088]]
	return chit[dof - 1][q]
}
function normalcdf(a, b, mu, sigma) {
	function RS38(a, b, mu, sx) {
		function f(x) { return Math.exp(-Math.pow(x, 2) / (2)) }
		n = 3 * Math.round((b - a) / 0.01)
		h = (b - a) / n
		let S = f(a) + f(b)
		for (let i = 1; i < n; i++) {
			if (i % 3 == 0)
				S += 2 * f(a + i * h);
			else
				S += 3 * f(a + i * h);
		}
		return (3 * h / 8) * S;
	}
	a = eval(a)
	b = eval(b)
	mu = eval(mu)
	sigma = eval(sigma)
	a = (a - mu) / sigma
	b = (b - mu) / sigma
	return RS38(a, b) / (Math.sqrt(2 * Math.PI))
}
function invNorm(A, mu, sigma, opcion = 'LEFT') {
	function invNorm2(Area) {
		function normalpdf(x) { return Math.exp(-x * x / (2)) }
		let A = 0
		let x = 0
		let h = 0.00005 / 3
		for (let i = 1; true; i++) {
			if (i % 3 == 0) {
				x = i * h
				let dummy = normalpdf(x)
				A += dummy
				if ((3 * h * A / (8 * Math.sqrt(2 * Math.PI))) > Area) { return x }
				/*if(Math.abs(10*x-Math.round(10*x))<0.000001){
					console.log("x:"+x.toFixed(1)+";  A = "+(3*h*A/(8*Math.sqrt(2*Math.PI))).toFixed(4))
				}*/
				A += dummy
			} else {
				A += 3 * normalpdf(i * h)
			}
		}
	}
	A = eval(A)
	mu = eval(mu)
	sigma = eval(sigma)
	let z
	switch (opcion) {
		case 'LEFT':
			z = sigma * invNorm2(Math.abs(A - 0.5))
			return A >= 0.5 ? mu + z : mu - z
		case 'RIGHT':
			A = 1 - A
			z = sigma * invNorm2(Math.abs(A - 0.5))
			return A >= 0.5 ? mu + z : mu - z
		case 'CENTER':
			z = sigma * invNorm2(Math.abs(A / 2))
			return [mu - z, mu + z]
	}
}
function tcrit(alpha, dof, tails) {
	let col
	if (tails == 2) alpha /= 2;
	col = 1
	if (alpha == 0.1) {
		col = 2
	} else if (alpha == 0.05) {
		col = 3
	} else if (alpha == 0.025) {
		col = 4
	} else if (alpha == 0.01) {
		col = 5
	} else if (alpha == 0.005) {
		col = 6
	}
	if (dof > 30) dof = 30
	if (dof < 1) dof = 1
	if (tails != 1 && tails != 2) tails = 1

	t = [
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
	return t[dof - 1][col]
}
function tablaDatos(P, label = []) {
	/*
	Esta función muestra los datos en una tabla
	sintaxis:
		tablaDatos([[1,2,3],[8,5,6,8]],['$x$','$y$'])
	*/
	if (label.length == 0) {
		for (let k = 0; k < P.length; ++k) {
			label.push(`$x_{${k + 1}}$`)
		}
	}
	let ncol = 0
	for (let k = 0; k < P.length; ++k) {
		ncol = (ncol < P[k].length) ? P[k].length : ncol
	}
	let S = `<table CELLSPACING="10">`
	for (let k = 0; k < P.length; ++k) {
		S += `<tr><td style="border-right:solid black 2px;">${label[k]}</td>`
		for (let k1 = 0; k1 < P[k].length; ++k1) {
			S += `<td >${P[k][k1]}</td>`
		}
		S += `</tr>`
	}
	S += `</table>`
	return S
}
function tcalc_1(P, op = false) {
	/*
	t-calculada 
	t=(x1-x2)/raiz(s1^2/n1+s2^2/n2)
	*/
	function media(x) {
		let S = 0
		for (let k = 0; k < x.length; ++k) S += x[k]
		return S / x.length
	}
	function varianza(x) {
		/*con corrección de Pearson */
		let S = 0
		const xm = media(x)
		for (let k = 0; k < x.length; ++k) S += (x[k] - xm) ** 2
		return S / (x.length - 1)
	}
	const x1 = media(P[0])
	const x2 = media(P[1])
	const n1 = P[0].length
	const n2 = P[1].length
	const s21 = varianza(P[0])
	const s22 = varianza(P[1])
	if (op) return [(x1 - x2) / Math.sqrt(s21 / n1 + s22 / n2), x1, x2, n1, n2, s21, s22]
	return (x1 - x2) / Math.sqrt(s21 / n1 + s22 / n2)
}
function tcalc(P, op = false) {
	/*
	t-calculada simple
	t=(x1-x2)/raiz(E*A)
	E=((n1-1)S21+(n2-1)*s22)/(n1+n2-2)
	A=(1/n1+1/n2)
	*/
	function media(x) {
		let S = 0
		for (let k = 0; k < x.length; ++k) S += x[k]
		return S / x.length
	}
	function varianza(x) {
		/*con corrección de Pearson */
		let S = 0
		const xm = media(x)
		for (let k = 0; k < x.length; ++k) S += (x[k] - xm) ** 2
		return S / (x.length - 1)
	}
	const x1 = media(P[0])
	const x2 = media(P[1])
	const n1 = P[0].length
	const n2 = P[1].length
	const s21 = varianza(P[0])
	const s22 = varianza(P[1])
	const E = ((n1 - 1) * s21 + (n2 - 1) * s22) / (n1 + n2 - 2)
	const A = 1 / n1 + 1 / n2
	if (op) return [(x1 - x2) / Math.sqrt(E * A), x1, x2, n1, n2, s21, s22, E, A]
	return (x1 - x2) / Math.sqrt(E * A)
}
function sum(numeros) {
	let S = 0
	for (let k = 0; k < numeros.length; ++k) S += numeros[k]
	return S
}
function E(x) {
	//	x[0]: probabilidad
	//  x[1]: peso
	let P = 0
	for (let k = 0; k < x[0].length; ++k) P += x[0][k] * x[1][k]
	return P
}


// complejos.js
class Complejo {
	constructor(re, im, red = 1, imd = 1) {
		this.re = simplify_frac([re, red])
		this.im = simplify_frac([im, imd])
	}

	// Suma de números complejos
	sumar(otro) {
		let dummy = [simplify_frac([this.re[0] * otro.re[1] + this.re[1] * otro.re[0], this.re[1] * otro.re[1]]),
		simplify_frac([this.im[0] * otro.im[1] + this.im[1] * otro.im[0], this.im[1] * otro.im[1]])]
		return new Complejo(
			dummy[0][0], dummy[1][0],
			dummy[0][1], dummy[1][1]
		);
	}

	// Resta de números complejos
	restar(otro) {
		let dummy = [simplify_frac([this.re[0] * otro.re[1] - this.re[1] * otro.re[0], this.re[1] * otro.re[1]]),
		simplify_frac([this.im[0] * otro.im[1] - this.im[1] * otro.im[0], this.im[1] * otro.im[1]])]
		return new Complejo(
			dummy[0][0], dummy[1][0],
			dummy[0][1], dummy[1][1]
		);
	}

	// Multiplicación de números complejos
	multiplicar(otro) {
		let dummy = [simplify_frac([this.re[0] * otro.re[0] * this.im[1] * otro.im[1] - this.im[0] * otro.im[0] * this.re[1] * otro.re[1], this.re[1] * otro.re[1] * this.im[1] * otro.im[1]]),
		simplify_frac([this.re[0] * otro.im[0] * this.im[1] * otro.re[1] + this.im[0] * otro.re[0] * this.re[1] * otro.im[1], this.re[1] * otro.re[1] * this.im[1] * otro.im[1]])]
		return new Complejo(
			dummy[0][0], dummy[1][0],
			dummy[0][1], dummy[1][1]
		);
	}

	// División de números complejos
	dividir(otro) {
		let c = this.multiplicar(otro.conjugado())
		const div = otro.modulo2()
		c.re[1] *= div
		c.im[1] *= div
		let dummy = [simplify_frac([c.re[0], c.re[1]]),
		simplify_frac([c.im[0], c.im[1]])]
		return new Complejo(
			dummy[0][0], dummy[1][0],
			dummy[0][1], dummy[1][1]
		);
	}

	// Módulo (magnitud) de un número complejo
	modulo2() {
		return ((this.re[0] / this.re[1]) ** 2 + (this.im[0] / this.im[1]) ** 2);
	}

	// Conjugado de un número complejo
	conjugado() {
		return new Complejo(this.re[0], -this.im[0], this.re[1], this.im[1]);
	}

	// Representación en forma de cadena
	toString() {
		let stringReal, stringImg
		if (this.re == 0 && this.im == 0) {
			return '0'
		}

		if (this.re[0] == 0) {
			stringReal = ''
			stringImg = `${(this.im[0] > 0 ? '' : '-')} ${this.im[1] == 1 ? (Math.abs(this.im[0]) == 1 ? '' : Math.abs(this.im[0])) + 'j' : `\\frac{${Math.abs(this.im[0])}}{${this.im[1]}}j`}`
			return stringReal + stringImg
		} else {
			stringReal = `${(this.re[0] > 0 ? '' : '-')} ${this.re[1] == 1 ? Math.abs(this.re[0]) : `\\frac{${Math.abs(this.re[0])}}{${this.re[1]}}`}`
		}

		if (this.im[0] == 0) {
			stringImg = ''
		} else {
			stringImg = `${(this.im[0] > 0 ? '+' : '-')} ${this.im[1] == 1 ? (Math.abs(this.im[0]) == 1 ? '' : Math.abs(this.im[0])) + 'j' : `\\frac{${Math.abs(this.im[0])}}{${this.im[1]}}j`}`
		}
		return stringReal + stringImg

		//return `${this.real[1]==1?this.real[0]:`\\frac{${Math.abs(this.real[0])}}{${this.real[0]}}`} ${this.imaginario >= 0 ? '+' : '-'} ${Math.abs(this.imaginario)}i`;
	}
}



