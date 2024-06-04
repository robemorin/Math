

function inicia(){
    //console.log('inicia')
    language()
	startButtons()
    generar_temas()
    load_problems()
    
	
}
function language(){
    //console.log('lang start')
      const lan = document.getElementById("Lang").value
      let tagOff = document.getElementsByClassName(lan=='EN'?'ES':'EN')
      let tagON = document.getElementsByClassName(lan=='ES'?'ES':'EN')
      
      for(let k=0; k<tagOff.length;++k){
        tagOff[k].classList.add('langOFF')
        tagOff[k].classList.remove('langON')
      }
      for(let k=0; k<tagON.length;++k){
        tagON[k].classList.add('langON')
        tagON[k].classList.remove('langOFF')
      } 
      localStorage.lang=lan
}
function startButtons(){
    const courses=JSON.parse(courses_data)
    //console.log(courses.length)
    let options_course = ''
    for(var k in courses){
        //console.log(k+": "+courses[k].nombre)
        options_course += `<option value="${k}">${courses[k].nombre}</option>`
    }
    document.getElementById('course_sel').innerHTML = options_course
    course_selected()
}
function load_problems(){
    const site=`http://127.0.0.1:8787/questionBank`
  //const site=`https://d1-tutorial.robertomorin2.workers.dev/porevaluar`

  fetch(site).then((response) => {
    if (response.ok) {
      return response.json();
    }
    document.getElementById('warning_QB').textContent = "Error, inténtelo más tarde"
    throw new Error('Something went wrong');
  })
  .then((json) => {
    document.getElementById('problemas_json').value = JSON.stringify(json)
    load_prob(json)
	//console.log("Problemas cargados")
    
  
  })
  .catch((error) => {
    console.log(error)
    document.getElementById('warning_QB').textContent = "Error, inténtelo más tarde."
  });
}
function course_selected(){
    const key = document.getElementById('course_sel').value
    let S=(key.substring(5)=='S'||key.substring(5)=='H')?true:false

    let option_test =   `<option value="1">1</option>
                         <option value="2">2</option>
                        ${S?'<option value="3">3</option>':''}`
    document.getElementById('test_sel').innerHTML = option_test
    generar_temas()
}
function generar_temas(){
        const name_course = document.getElementById('course_sel').value
        const number_test = document.getElementById('test_sel').value
        const cursos=JSON.parse(courses_data)
        //console.log("Nombre del curso: "+name_course)
        const curso = cursos[name_course]
        //console.log(curso.tema)
        
        let contenedor
        for(let k=0;k<curso.tema.length;++k){
            contenedor = document.getElementById(`CC${k+1}`)
            let boton = ''
            for(let k1=0;k1<curso.tema[k].subtema.length;++k1){
                boton += ` <label for="${k}_${k1}"><div class="button-item">
                            <input class="tema1" type="checkbox" id="${k}_${k1}" name="subtema" onclick="IO_problema('${name_course}.${k}.${k1}.${number_test}','${k}_${k1}')"  />
                            ${curso.tema[k].subtema[k1].nombre}</div></label>`
            }
            contenedor.innerHTML = boton
        }
		off_all_problema()
}

function load_prob_input(){
    const jsonstring = document.getElementById("problemas_json").value
    return JSON.parse(jsonstring)
}
function load_prob(DBP){
    // Solo se invoca una vez
	const cursos = JSON.parse(courses_data)
	function info(json){
		//console.log('Extrayendo información')
		const info1 = json.P1
		let n = info1.indexOf('.')
		const curso = info1.substring(0,n)
		let resto = info1.substring(n+1)
		n = resto.indexOf('.')
		const numero_tema = resto.substring(0,n)
		//console.log('número de tema: '+numero_tema)
		resto = resto.substring(n+1)
		n = resto.indexOf('.')
		const numero_subtema = resto.substring(0,n)
		const prueba = resto.substring(n+1)
		//<div class="info">
		const div1 = `<div class="info">${numero_tema-0+1}.${numero_subtema-0+1} ${cursos[curso].tema[numero_tema].subtema[numero_subtema].nombre}</div>`
		
		const info2 = json.P2
		let div2=''
		if(info2!='null'){
			n = info2.indexOf('.')
			const curso2 = info1.substring(0,n)
			resto = info1.substring(n+1)
			n = resto.indexOf('.')
			const numero_tema2 = resto.substring(0,n)
			//console.log('número de tema: '+numero_tema2)
			resto = resto.substring(n+1)
			n = resto.indexOf('.')
			const numero_subtema2 = resto.substring(0,n)
			div2 = `<div class="info">${numero_tema2-0+1}.${numero_subtema2-0+1} ${cursos[curso2].tema[numero_tema2].subtema[numero_subtema2].nombre}</div>`
		}
		//<div class="info">
		//console.log(div1+div2)

		
		

		return div1+div2
	}
	const n = DBP.length
    //console.log(`Cantidad de problemas: ${n}`)
    
	const contenedor = [], png_img =[]
	let tb
	const w_png = Math.round(window.innerWidth*0.8);
	let h_png=Math.round(w_png*1.27173418298)
	for(let k=0;k<5;++k){
		tb = document.createElement("table")
		tb.setAttribute( 'id' , `T_${k}` )
		document.getElementById(`C${k+1}`).appendChild(tb)

		contenedor.push(document.getElementById(`T_${k}`))
	}
	for(let k=0;k<n;++k){
			try{
				let top = DBP[k].t1, alto = DBP[k].b1
				top= top.substring(0,top.length-1)*h_png/100
				alto= alto.substring(0,alto.length-1)*h_png/100

				let fecha = new Date(eval(DBP[k].Fecha))
				const ubicacion = 'https://drive.google.com/thumbnail?id='+DBP[k].L1+'&sz=w'+w_png
				//console.log(`Ubicación: ${ubicacion}`)
				let rowProb=`<tr  class=" ${DBP[k].P1} ${DBP[k].P2=='null'?'':DBP[k].P2}" name="tr_problema"><td>
						<input class="select_prob" type="checkbox" k="${k}" w="${w_png}px" h="200px" onchange="update()" puntos="${DBP[k].puntos}" id="S${k}" />
						</td><td>
						<label for="S${k}">
						<img  style="height:${alto}px; width:${w_png};background: url('${ubicacion}');background-repeat: no-repeat;background-position:0px -${top}px;" /></br>
						<div class="info">ID: ${DBP[k].Id}</div><div class="info">Autor: ${DBP[k].A}</div><div class="info">Año: ${fecha.getFullYear()}</div><div class="info">Puntos: ${DBP[k].puntos}</div> ${info(DBP[k])}</label>
					</td><td></td></tr>`
					//console.log('TEma'+DBP[k].P1.substring(7,8))
				contenedor[DBP[k].P1.substring(7,8)].innerHTML += rowProb
			}catch(error){
				console.error(error)
			}
		
	}
}
function off_all_problema(){
	const trs = document.getElementsByName("tr_problema")
	for(let k=0;k<trs.length;++k){
		trs[k].classList.add('noSeeProblem')
	}
	const botones = document.getElementsByClassName("select_prob")
	//console.log('problemas a apagar: '+botones.length)
	for(let k = 0; k<botones.length; ++k){
		botones[k].checked = false
	}
	update()
}
function IO_problema(clase,id){
		//console.log(id)
		const button = document.getElementById(id)
		
		//console.log(`boton: ${button.checked} para la clase ${clase}`)
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
	function position_number(json,num){
		//console.log(json[num])
		let s=json[num]
		let n=s.indexOf('*')
		//console.log(s.substring(0,n))
		//console.log(s.substring(n+1,s.length))
		return `top:${s.substring(0,n)}; left:${s.substring(n+1,s.length)};`
	}
// Hay que trabajar en este
	const Todos=document.getElementsByClassName('select_prob')
	let N=Todos.length
	
	const indice=[]
	for(let K=0; K<N; ++K){
      if(Todos[K].checked){
		indice.push(Todos[K].getAttribute('k'))
      }
	}
	//console.log(indice)
	let Ans=""
	const linePage='――――――――――――――――――――――――――――――――――――――――――――――――――'
	
	let linkLogo = `https://drive.google.com/thumbnail?id=${localStorage.logo}&sz=w600`
	//console.log(linkLogo)
	let Examen=`<div class="examen_completo"><div class="page">
				<table width="100%"><tr>
					<td width="20%"><div style="position: relative;">
					<img width="200px" height="200px" src="${linkLogo}">
					</div></td>
					<td style='border-bottom:solid 1px red'><center><h2><i>${localStorage.Escuela}</i></h2><h3>${localStorage.titulo} ${localStorage.nombre}</h3></center>	
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
	const DBP = JSON.parse(document.getElementById('problemas_json').value)
	const w = Math.round(window.innerWidth*0.8);
	for( let k=0 ; k<N ; ++k){
		let ubicacion = 'https://drive.google.com/thumbnail?id='+DBP[indice[k]].L1+"&sz=w"+w
		S += DBP[indice[k]].puntos
		let divProb = `	<div class="page" style="position: relative;">
							
							<img width="100%" style="" src="${ubicacion}">
							<div style="background-color:#000; position: absolute; ${position_number(DBP[indice[k]],'n1')} size-font:x-large;transform: translate(-50%, -50%);">${k+1}.-</div>								
							<div style="background-color:#000; size-font:medium;position: absolute;  top:0%;  left:50%;transform: translate(-50%, 0%);" ><center> ${linePage+(++numberPage)+linePage} <br>${localStorage.Escuela} </center></div>								
							<div style="background-color:#000; size-font:medium;position: absolute;  bottom:0%;  left:50%;transform: translate(-50%, 0%);" ><center> ${localStorage.titulo} ${localStorage.nombre} <br> raiz2pi.cc</center></div>								
						</div>`
		if(DBP[indice[k]].L2 != '-1'){
			ubicacion = 'https://drive.google.com/thumbnail?id='+DBP[indice[k]].L2+"&sz=w"+w
			divProb += `	<div class="page" style="position: relative;">
							<img width="100%" style="" src="${ubicacion}">
							<div style="background-color:#000;font-size: 1.2rem;position: absolute;  top:0%;  left:50%;transform: translate(-50%, 0%);" > ${linePage+(++numberPage)+linePage} </div>								
							<div style="background-color:#000;size-font:medium;position: absolute;  bottom:0%;  left:50%;transform: translate(-50%, 0%);" > ${"raiz2pi.cc"} </div>								
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
	//console.log("Puntos: "+S)
	document.getElementById("total_puntos").textContent=S
	scroll(0, 0);

}
