
let DBP
function inicia(){
	startButtons()

	fetch('https://math-ca5.pages.dev/function/indice_drive.JSON').then(function (response) {
	
	  return response.text()
	}).then(function (data) {
		
		
		load_prob(JSON.parse(data))
	}).catch(console.error)

	//load_prob(data)
}
function load_prob(P){
	DBP = P
	const n = P.length
	const contenedor = [], png_img =[]
	let tb
	const w_png = window.innerWidth*0.8;
	for(let k=0;k<5;++k){
		tb = document.createElement("table")
		tb.setAttribute( 'id' , `T_${k}` )
		document.getElementById(`C${k+1}`).appendChild(tb)
		contenedor.push(document.getElementById(`T_${k}`))

	}
	for(let k=0;k<n;++k){
		/*png_img[k] = new Image();
		png_img[k].src = `https://drive.google.com/thumbnail?id='+P[k].prob1+'&sz=1500`;
		png_img[k].onload = function(){*/
			try{
				const esc=w_png/(P[k].x1-P[k].x0)
				const Dy=esc*(P[k].y1-P[k].y0)
				const x0=esc*P[k].x0
				const y0=esc*P[k].y0
				const ubicacion = 'https://drive.google.com/thumbnail?id='+P[k].prob1+'&sz=w'+Math.round(P[k].w*esc)
				console.log(`Ubicación: ${ubicacion}`)
				let rowProb=`<tr  class="pronTS${P[k].tema+'_'+P[k].subtema}"><td>
						<input class="select_prob" type="checkbox" k="${k}" w="${this.width}" h="${this.height}" onchange="update()" puntos="${P[k].puntos}" id="S${k}" />
						</td><td>
						<label for="S${k}">
						<img  style="height:${Dy}px; width:${w_png};background: url('${ubicacion}');background-repeat: no-repeat;background-position:-${x0}px -${y0}px ;background-size: ${this.width*esc}px ${this.height*esc}px;" /></br>
						<!--img  style="height:${Dy}px; width:${w_png};background: url('https://drive.google.com/thumbnail?id=1S0vVFEwBneFfUPgaAeUenlD1gwoUV5XC&sz=w1000');background-repeat: no-repeat;background-position:-${x0}px -${y0}px ;background-size: ${this.width*esc}px ${this.height*esc}px;" /></br-->
						<div class="info">ID: ${P[k].id}</div><div class="info">Autor: ${P[k].autor}</div><div class="info">Año: ${P[k].anno}</div><div class="info">Puntos: ${P[k].puntos}</div><div class="info"> ${P[k].tema+"."+P[k].subtema+" "+varTemas(P[k].tema-1,P[k].subtema-1)}</div></label>
					</td><td></td></tr>`
				contenedor[P[k].tema-1].innerHTML += rowProb
			}catch(error){
				console.error(error)
			}
		//}
		
	}
}
function load_prob_is_a_backup(P){
	DBP = P
	const n = P.length
	const contenedor = [], png_img =[]
	let tb
	const w_png = window.innerWidth*0.8;
	for(let k=0;k<5;++k){
		tb = document.createElement("table")
		tb.setAttribute( 'id' , `T_${k}` )
		document.getElementById(`C${k+1}`).appendChild(tb)
		contenedor.push(document.getElementById(`T_${k}`))

	}
	for(let k=0;k<n;++k){
		png_img[k] = new Image();
		png_img[k].src = `https://drive.google.com/thumbnail?id='+P[k].prob1+'&sz=1500`;
		png_img[k].onload = function(){
			try{
				const esc=w_png/(P[k].x1-P[k].x0)
				const Dy=esc*(P[k].y1-P[k].y0)
				const x0=esc*P[k].x0
				const y0=esc*P[k].y0
				const ubicacion = 'https://drive.google.com/thumbnail?id='+P[k].prob1+'&sz=1500'
				console.log(`Ubicación: ${ubicacion}`)
				let rowProb=`<tr  class="pronTS${P[k].tema+'_'+P[k].subtema}"><td>
						<input class="select_prob" type="checkbox" k="${k}" w="${this.width}" h="${this.height}" onchange="update()" checked puntos="${P[k].puntos}" id="S${k}" />
						</td><td>
						<label for="S${k}">
						<!--img  style="height:${Dy}px; width:${w_png};background: url('./img/${P[k].prob1}.png');background-repeat: no-repeat;background-position:-${x0}px -${y0}px ;background-size: ${this.width*esc}px ${this.height*esc}px;" /></br
						https://drive.google.com/file/d/1S0vVFEwBneFfUPgaAeUenlD1gwoUV5XC/view?usp=drive_link
						-->
						<img  style="height:${Dy}px; width:${w_png};background: url('${ubicacion}&sz=500');background-repeat: no-repeat;background-position:-${x0}px -${y0}px ;background-size: ${this.width*esc}px ${this.height*esc}px;" /></br>
						<!--img  style="height:${Dy}px; width:${w_png};background: url('https://drive.google.com/thumbnail?id=1S0vVFEwBneFfUPgaAeUenlD1gwoUV5XC');background-repeat: no-repeat;background-position:-${x0}px -${y0}px ;background-size: ${this.width*esc}px ${this.height*esc}px;" /></br-->
						<div class="info">Autor: ${P[k].autor}</div><div class="info">Año: ${P[k].anno}</div><div class="info">Puntos: ${P[k].puntos}</div><div class="info"> ${P[k].tema+"."+P[k].subtema+" "+varTemas(P[k].tema-1,P[k].subtema-1)}</div></label>
					</td><td></td></tr>`
				contenedor[P[k].tema-1].innerHTML += rowProb
			}catch(error){
				console.error(error)
			}
		}
		
	}
}
function startButtons(){
	temas=varTemas(-1)
	let contenedor
	for(let k=0;k<temas.length;++k){
		contenedor = document.getElementById(`C${k+1}`)
		for(let k1=0;k1<temas[k].length;++k1){
			boton = ` <label for="${k}_${k1}"><div class="button-item">
						<input class="tema1" type="checkbox" id="${k}_${k1}" name="subtema" onclick="IO_problema(${k+1},${k1+1})" checked />
						${temas[k][k1]}</div></label>`
			contenedor.innerHTML += boton
			
		}
	}
}
function varTemas(t0=-1,t1){
	const q = [
		[
		'Notación científica',
		'Progresiones y series aritméticas',
        'Progresiones y series geométricas',
        'Aplicaciones de las progresiones y series geométricas al ámbito financiero',
        'Propiedades de las potencias que tienen exponentes enteros',
        'Aproximación: cifras decimales, cifras significativas',
        'Amortización y anualidades utilizando medios tecnológicos',
        'Sistemas de ecuaciones lineales y  Ecuaciones polinómicas'
		],
		[	
		'Línea recta y parábola',
		'Domnio y Rango',
		'Graficos',
		'Puntos importantes',
		'Modelos',
		'Habilidades de modelos',
		'F. exponenciales',
		'F. sinosoidales'
		],
		[
		'Distancia',
		'F. trigonométricas',
		'Aplicaciones trigonometría',
		'Círculo',
		'Mediatrices',
		'Diagramas de Voronoi'
		],
		[
		'Conceptos básicos',
		'Rep. Gráfica',
		'Medidas de tendencia central',
		'Correlacion lineal',
		'Prob. simple',
		'Diagramas de Venn',
		'$E(x)$  y variable aleatorio discreta',
		'Distribución binomial',
		'Distribución normal',
		'CC Spearman',
		'Corr. lineal',
		'Prueba  <i>t</i>-student y  $\\chi^2$'
		],
		[
		'Límite',
		'F. crecientes y decrecientes',
		'Derivade polinomios',
		'Tangente y normal',
		'Integración de polinomios',
		'P. min, máx y de inflexión',
		'Optimización',
		'Cálculo de áreas'
		]
	]
	if(t0==-1)
		return q 
	else
		return q[t0][t1]

}
function IO_problema(t0,t1){
		const name = `${t0-1}_${t1-1}`
		console.log(name)
		const button = document.getElementById(name)
		const clase = "pronTS"+t0+'_'+t1
		console.log(`Tema a cambiar ${t0-1}_${t1-1}, boton: ${button.checked}`)
		const problemasIO = document.getElementsByClassName(clase)
		if(!button.checked){
			for( let k=0; k<problemasIO.length; ++k) problemasIO[k].classList.add('noSeeProblem')
		}
		if(button.checked){
			for( let k=0; k<problemasIO.length; ++k) problemasIO[k].classList.remove('noSeeProblem')
		}
		
	
}
function update(){
	const botones = document.getElementsByClassName("select_prob")
	let n=0
	let s=0
	for(let k = 0; k<botones.length; ++k){
		if(botones[k].checked){ 
			s += eval(botones[k].getAttribute('puntos'))
			++n
		}
	}
	document.getElementById("label_info").innerHTML = `Seleccionados ${n}<br>${s} puntos`
}

function LetsPlay(){

	const Todos=document.getElementsByClassName('select_prob')
	let N=Todos.length
	
	let n=0
	const indice=[]
	const sizeImg=[]
	for(let K=0; K<N; ++K){
      if(Todos[K].checked){
		indice.push(Todos[K].getAttribute('k'))
		sizeImg.push([Todos[K].getAttribute('w'),Todos[K].getAttribute('h')])
		
      }
	}
	console.log(indice)
	let Ans=""
	const linePage='――――――――――――――――――――――――――――――――――――――――――――――――――'

	let Examen=`<div class="examen_completo"><div class="page">
				<table width="100%"><tr>
					<td><svg width="100" height="100" id="Capa_1" style="enable-background:new 0 0 511.998 511.998;" version="1.1" viewBox="0 0 511.998 511.998" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><polygon points="256,69.998 296,54.999 336,39.999 296,24.999 256,9.999 256,39.999  " style="fill:#54BA9D;"/><g><polygon points="216,141.995 10,141.995 10,221.995 135.998,221.995 196,161.996   " style="fill:#FF5A5A;"/><polygon points="315.997,161.996 375.998,221.995 501.998,221.995 501.998,141.995 295.998,141.995   " style="fill:#FF5A5A;"/></g><path d="M375.998,221.995l-60.001-59.999l-19.999-20.001L256,101.997l-40,39.998l-20,20.001l-60.002,59.999   H10v280.003h186V462v-60.002c0-11.003,8.996-19.999,20-19.999h40h40c11,0,19.997,8.996,19.997,19.999V462v39.998h186.001V221.995   H375.998L375.998,221.995z M315.997,281.997H356v40h-40.003V281.997L315.997,281.997z M155.998,281.997H196v40h-40.002V281.997   L155.998,281.997z M256,187.308c16.566,0,29.998,13.432,29.998,30c0,16.567-13.432,29.999-29.998,29.999   c-16.569,0-30.001-13.432-30.001-29.999C225.999,200.739,239.431,187.308,256,187.308L256,187.308z M421.996,391.999h40.003v40   h-40.003V391.999L421.996,391.999z M421.996,281.997h40.003v40h-40.003V281.997L421.996,281.997z M49.998,391.999H90v40H49.998   V391.999L49.998,391.999z M49.998,281.997H90v40H49.998V281.997z" style="fill:#FFDAAE;"/><circle cx="256" cy="217.31" r="30" style="fill:#FF9D21;"/><g><rect height="40" style="fill:#96C8EB;" width="40" x="49.998" y="282"/><rect height="40" style="fill:#96C8EB;" width="40" x="156" y="282"/><rect height="40" style="fill:#96C8EB;" width="40" x="316" y="282"/><rect height="40" style="fill:#96C8EB;" width="40" x="422" y="282"/><rect height="40" style="fill:#96C8EB;" width="40" x="422" y="392"/></g><g><path d="M315.997,462v-60.002c0-11.003-8.997-19.999-19.997-19.999h-40v119.999h59.997V462z" style="fill:#986E62;"/><path d="M256,501.998V381.999h-40c-11.004,0-20,8.996-20,19.999V462v39.998H256z" style="fill:#986E62;"/></g><rect height="40" style="fill:#96C8EB;" width="40" x="49.998" y="392"/></g><g><path d="M501.998,131.995H300.141L266,97.854V76.928l73.512-27.565C343.415,47.899,346,44.168,346,40   s-2.586-7.899-6.488-9.363L259.51,0.638c-3.07-1.152-6.512-0.726-9.207,1.144C247.607,3.649,246,6.721,246,10.001v59.997v27.856   l-34.143,34.141H10c-5.523,0-10,4.477-10,10v80v280.003c0,5.522,4.477,10,10,10h186h119.997h186.001c5.523,0,10-4.478,10-10   V221.995v-80C511.998,136.472,507.521,131.995,501.998,131.995z M491.998,151.995v20h-17.017c-5.522,0-10,4.478-10,10   c0,5.523,4.478,10,10,10h17.017v20H380.141l-60-60H491.998z M266,24.43l41.521,15.569L266,55.569V24.43z M191.857,151.995   l-60.001,60H20v-20h17.016c5.523,0,10-4.477,10-10c0-5.522-4.477-10-10-10H20v-20H191.857z M206,401.998   c0-5.514,4.486-9.999,10-9.999h30v99.999h-40V401.998z M266,491.998v-99.999h30c5.512,0,9.997,4.485,9.997,9.999v90H266z    M491.998,491.998H325.997V472h17.017c5.522,0,10-4.478,10-10s-4.478-10-10-10h-17.017v-50.002   c0-16.542-13.456-29.999-29.997-29.999h-80c-16.543,0-30,13.457-30,29.999V452h-17.016c-5.523,0-10,4.478-10,10s4.477,10,10,10H186   v19.998H20V231.995h115.998c2.652,0,5.196-1.054,7.071-2.929L256,116.139l32.924,32.925c0.002,0.002,0.004,0.004,0.006,0.006   l79.998,79.997c1.875,1.875,4.419,2.929,7.07,2.929h116L491.998,491.998L491.998,491.998z" style="fill:#000001;"/><path d="M256,177.308c-22.056,0-39.999,17.944-39.999,40s17.943,39.999,39.999,39.999   c22.057,0,40-17.943,40-39.999S278.057,177.308,256,177.308z M256,237.307c-11.027,0-19.999-8.972-19.999-19.999   c0-11.028,8.972-20,19.999-20c11.028,0,20,8.972,20,20C276,228.335,267.028,237.307,256,237.307z" style="fill:#000001;"/><path d="M90,271.997H49.998c-5.523,0-10,4.478-10,10v40c0,5.522,4.477,10,10,10H90c5.523,0,10-4.478,10-10   v-40C100,276.475,95.523,271.997,90,271.997z M80,311.997H59.998v-20H80V311.997z" style="fill:#000001;"/><path d="M196,271.997h-40.002c-5.523,0-10,4.478-10,10v40c0,5.522,4.477,10,10,10H196   c5.523,0,10-4.478,10-10v-40C206,276.475,201.523,271.997,196,271.997z M186,311.997h-20.002v-20H186V311.997z" style="fill:#000001;"/><path d="M90,381.999H49.998c-5.523,0-10,4.478-10,10v40c0,5.523,4.477,10,10,10H90c5.523,0,10-4.477,10-10   v-40C100,386.477,95.523,381.999,90,381.999z M80,421.999H59.998v-20H80V421.999z" style="fill:#000001;"/><path d="M421.996,331.997h40.003c5.522,0,10-4.478,10-10v-40c0-5.522-4.478-10-10-10h-40.003   c-5.522,0-10,4.478-10,10v40C411.996,327.519,416.474,331.997,421.996,331.997z M431.996,291.997h20.003v20h-20.003V291.997z" style="fill:#000001;"/><path d="M366,321.997v-40c0-5.522-4.478-10-10-10h-40.003c-5.522,0-10,4.478-10,10v40   c0,5.522,4.478,10,10,10H356C361.522,331.997,366,327.519,366,321.997z M346,311.997h-20.003v-20H346V311.997z" style="fill:#000001;"/><path d="M421.996,441.999h40.003c5.522,0,10-4.477,10-10v-40c0-5.522-4.478-10-10-10h-40.003   c-5.522,0-10,4.478-10,10v40C411.996,437.521,416.474,441.999,421.996,441.999z M431.996,401.999h20.003v20h-20.003V401.999z" style="fill:#000001;"/><path d="M371.744,452c-5.522,0-10,4.478-10,10s4.478,10,10,10h0.236c5.523,0,10-4.478,10-10s-4.477-10-10-10   H371.744z" style="fill:#000001;"/><path d="M140.252,452h-0.235c-5.523,0-10,4.478-10,10s4.477,10,10,10h0.235c5.523,0,10-4.478,10-10   S145.775,452,140.252,452z" style="fill:#000001;"/><path d="M65.745,191.995h0.237c5.523,0,10-4.477,10-10c0-5.522-4.477-10-10-10h-0.237   c-5.523,0-10,4.478-10,10C55.745,187.518,60.223,191.995,65.745,191.995z" style="fill:#000001;"/><path d="M446.016,191.995h0.236c5.523,0,10-4.477,10-10c0-5.522-4.477-10-10-10h-0.236   c-5.522,0-10,4.478-10,10C436.016,187.518,440.493,191.995,446.016,191.995z" style="fill:#000001;"/></g><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg></td>
					<td style='border-bottom:solid 1px red'><center><h2><i>Nombre de la escuela</i></h2><h3>Docente: Roberto Alejandro Morin Romero</h3></center>	
					<h3>Alumno:</h3></td><tr></table>
			
			<h3><b>Instrucciones</b></h3> <hr style='border-top: 3px solid black;'>
			<ul><li>No abra esta prueba hasta que se le autorice</li>
				<li>En esta prueba es necesario usar una calculadora gráfica</li>
				<li>Conteste todas las preguntas en el cuadernillo</li>
				<li>Salvo se indique lo contrario en la pregunta, todas las respuestas numéricas deberán ser exactas o aproximadas a tres cifras significativas</li>
				<li>Use tinta negra o azul, excepto en diagramas que debe usarse lápiz </li>
				<li>Se necesita una copia sin anotaciones del cuadernillo de fórmulas de Matemáticas Aplicaciones e Interpretaciones NM para la prueba</li>
				<li>La puntación máxima en esta prueba es de <b><span id="total_puntos">??</span> puntos</b></li></ul>
			<div style="font-size:0.7em;text-align: justify;font-size:medium"><i>Se otorgará la máxima puntuación a las respuestas correctas. Cuando la respuesta sea incorrecta se otorgarán algunos puntos siempre que aparezca el método empleado y éste sea correcto. Donde sea necesario, puede utilizar para sus cálculos el espacio que queda debajo del cuadro. Para los resultados obtenidos con calculadora de pantalla gráfica, deberá reflejarse por escrito el proceso seguido hasta su obtención. Por ejemplo, cuando deba utilizar gráficas de una calculadora de pantalla gráfica para hallar soluciones, deberá dibujar esas gráficas en su respuesta.</i></div>
			</div>`
		
	N = indice.length
	let S=0
	let numberPage=0
	for( let k=0 ; k<N ; ++k){
		let xe = DBP[indice[eval(k)]].xn/DBP[indice[eval(k)]].w*100
		let ye = DBP[indice[eval(k)]].yn/DBP[indice[eval(k)]].w*100
		let ubicacion = 'https://drive.google.com/thumbnail?id='+DBP[indice[eval(k)]].prob1+"&sz=w"+DBP[indice[eval(k)]].w
		S += DBP[indice[eval(k)]].puntos
		let divProb = `	<div class="page" style="position: relative;">
							
							<img width="100%" style="" src="${ubicacion}">
							<div style="background-color:#000; position: absolute;  top: ${ye}%;  left: ${xe}%;size-font:x-large;transform: translate(-50%, -50%);">${k+1}.-</div>								
							<div style="background-color:#000; size-font:medium;position: absolute;  top:0%;  left:50%;transform: translate(-50%, 0%);" ><center> ${linePage+(++numberPage)+linePage} <br>
							<i>Aquí va el nombre de la escuela</i> </center></div>								
							<div style="background-color:#000; size-font:medium;position: absolute;  bottom:0%;  left:50%;transform: translate(-50%, 0%);" ><center> Docente: Roberto Alejandro Morin Romero <br> Obtén más material en: https://math-ca5.pages.dev/VerTemas</center></div>								
						</div>`
		if(DBP[indice[eval(k)]].prob2 != ''){
			ubicacion = 'https://drive.google.com/thumbnail?id='+DBP[indice[eval(k)]].prob2+"&sz=w"+DBP[indice[eval(k)]].w
			divProb += `	<div class="page" style="position: relative;">
							<--img width="100%" style="" src="./img/${DBP[indice[eval(k)]].prob2}.png"-->
							<img width="100%" style="" src="${ubicacion}">
							<div style="background-color:#000;font-size: 1.2rem;position: absolute;  top:0%;  left:50%;transform: translate(-50%, 0%);" > ${linePage+(++numberPage)+linePage} </div>								
							<div style="background-color:#000;size-font:medium;position: absolute;  bottom:0%;  left:50%;transform: translate(-50%, 0%);" > ${" Obtén más material en: https://math-ca5.pages.dev/VerTemas"} </div>								
						</div>`
		}
		Examen += divProb
	
	}
	Examen+=`<div class="page"><center><h2>Fin del examen</h2></center></div></div>

	<center><div class="just_screen"><h1>Impresión de examen</h1> <h2>Examen</h2> <label class="switch">	<input type="checkbox" checked onchange="alert('Desactivado: versión de prueba')">	<span class="slider"></span>  </label>
	<h2>Soluciones</h2><label class="switch">	<input type="checkbox" checked onchange="alert('Desactivado: versión de prueba')">	<span class="slider"></span>  </label><div class="nota"><br>
	<button onclick="window.print()">
	<svg height="80px" class="printer_svg" width="80px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 	 viewBox="0 0 64 64" xml:space="preserve"><g id="Printer">	<path class="highlight_printer" d="M57.7881012,14.03125H52.5v-8.0625c0-2.2091999-1.7909012-4-4-4h-33c-2.2091999,0-4,1.7908001-4,4v8.0625H6.2119002		C2.7871001,14.03125,0,16.8183498,0,20.2431507V46.513649c0,3.4248009,2.7871001,6.2119026,6.2119002,6.2119026h2.3798995		c0.5527,0,1-0.4472008,1-1c0-0.5527-0.4473-1-1-1H6.2119002C3.8896,50.7255516,2,48.8359489,2,46.513649V20.2431507		c0-2.3223,1.8896-4.2119007,4.2119002-4.2119007h51.5762024C60.1102982,16.03125,62,17.9208508,62,20.2431507V46.513649		c0,2.3223-1.8897018,4.2119026-4.2118988,4.2119026H56c-0.5527992,0-1,0.4473-1,1c0,0.5527992,0.4472008,1,1,1h1.7881012		C61.2128983,52.7255516,64,49.9384499,64,46.513649V20.2431507C64,16.8183498,61.2128983,14.03125,57.7881012,14.03125z		 M13.5,5.96875c0-1.1027999,0.8971996-2,2-2h33c1.1027985,0,2,0.8972001,2,2v8h-37V5.96875z"/>	<path class="highlight_printer" d="M44,45.0322495H20c-0.5517998,0-0.9990005,0.4472008-0.9990005,0.9990005S19.4482002,47.0302505,20,47.0302505h24		c0.5517006,0,0.9990005-0.4472008,0.9990005-0.9990005S44.5517006,45.0322495,44,45.0322495z"/>	<path class="highlight_printer" d="M44,52.0322495H20c-0.5517998,0-0.9990005,0.4472008-0.9990005,0.9990005S19.4482002,54.0302505,20,54.0302505h24		c0.5517006,0,0.9990005-0.4472008,0.9990005-0.9990005S44.5517006,52.0322495,44,52.0322495z"/>	<circle cx="7.9590998" cy="21.8405495" r="2" fill="red"/>	<circle cx="14.2856998" cy="21.8405495" r="2" fill="green"/>	<circle cx="20.6121998" cy="21.8405495" r="2" fill="blue"/>	<path class="highlight_printer" d="M11,62.03125h42v-26H11V62.03125z M13.4036999,38.4349518h37.1925964v21.1925964H13.4036999V38.4349518z"/></g></svg>
	</button>

	</div></div></center>`
	document.getElementsByTagName('body')[0].innerHTML=Examen
	console.log("Puntos: "+S)
	document.getElementById("total_puntos").textContent=S
	scroll(0, 0);

}
