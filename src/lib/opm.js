function agregarPregunta(q){
	function creartipo(q){
		function creartemas(){
			const N = tema.length
			let S='<option></option>'
			for(let k=0;k<N;++k){
				S += `<option value='${k}'>${tema[k].Nombre}</option>`
			}
			return S
		}
		let td = q.parentElement
		let tr = td.parentElement
		let td2= tr.getElementsByTagName("td")[1]
		let txt = document.createElement('span')
		txt.innerHTML = 'Candidad de reactivos: '
		txt.classList.add('elemento_activo')
		td2.appendChild(txt)
		let input = document.createElement("input")
		input.type= 'number'
		input.setAttribute('min',"1")
		input.setAttribute('max',"10")
		input.classList.add('elemento_activo')
		input.style.width = '50px'
		input.value = 1
		td2.appendChild(input)
		txt = document.createElement('span')
		txt.innerHTML = 'Tema: '
		txt.classList.add('elemento_activo')
		td2.appendChild(txt)
		let select = document.createElement("select")
		select.innerHTML=creartemas()
		select.setAttribute('onchange','mostrarSubtema(this)')
		td2.appendChild(select)

		let contenedor = tr.parentElement
		tr = document.createElement('tr')
		td = document.createElement('td')
		td.setAttribute('align', 'right')
		td.innerHTML = `<button class="addbutton" onclick="agregarPregunta(this)"></button>`
		tr.appendChild(td)
		td = document.createElement('td')
		td.setAttribute('align', 'left')
		tr.appendChild(td)
		contenedor.appendChild(tr)





	}
	q.classList.remove('addbutton')
    q.setAttribute('onclick','borrartr(this)')
	q.classList.add('addedbutton')
	creartipo(q)
}
function borrartr(q){
	let td = q.parentElement
	let tr = td.parentElement
	let container = tr.parentElement
	container.removeChild(tr)

}
function mostrarSubtema(q){
	function crearsubtemas(n){
		const N = tema[n].subtema.length
		let S='<option></option>'
		for(let k=0;k<N;++k){
			S += `<option value='${k}'>${tema[n].subtema[k].Nombre}</option>`
		}
		return S
	}
	function blocktema(q){
		const valor = q.value
		const text = q[q.selectedIndex].text
		q.innerHTML=`<option value="${valor}">${text}</option>`
		return valor
	}
	let td = q.parentElement
	let tr = td.parentElement
	let td2 = tr.getElementsByTagName('td')[1]
	let n_tema = blocktema(td2.getElementsByTagName('select')[0])
	
	if(n_tema=='') return
	turnOffTxt(tr)

	let txt = document.createElement('span')
		txt.innerHTML = 'Subtema: '
		txt.classList.add('elemento_activo')
	td2.appendChild(txt)
	let select = document.createElement("select")
		select.innerHTML=crearsubtemas(n_tema)
		select.setAttribute('onchange','mostrarTest(this)')
		td2.appendChild(select)
}
function mostrarTest(q){
	function creartest(n,ns){
		const N = tema[n].subtema[ns].test.length
		let S='<option></option>'
		for(let k=0;k<N;++k){
			S += `<option value='${k}'>${tema[n].subtema[ns].test[k].Nombre}</option>`
		}
		return S
	}
	function blocksubtema(q){
		const valor = q.value
		const text = q[q.selectedIndex].text
		q.innerHTML=`<option value="${valor}">${text}</option>`
		return valor
	}
	let td = q.parentElement
	let tr = td.parentElement
	let td2 = tr.getElementsByTagName('td')[1]
	let n_tema = td2.getElementsByTagName('select')[0].value
	let n_sub = blocksubtema(td2.getElementsByTagName('select')[1])
	
	if(n_sub=='') return
	turnOffTxt(tr)

	let txt = document.createElement('span')
		txt.innerHTML = 'cuestionario: '
		txt.classList.add('elemento_activo')
	td2.appendChild(txt)
	let select = document.createElement("select")
		select.innerHTML=creartest(n_tema,n_sub)
		select.setAttribute('onchange','blockTest(this)')
		td2.appendChild(select)
}
function blockTest(q){

	function blocktest_(q){
		const valor = q.value
		const text = q[q.selectedIndex].text
		q.innerHTML=`<option value="${valor}">${text}</option>`
		return valor
	}
	let td = q.parentElement
	let tr = td.parentElement
	let td2 = tr.getElementsByTagName('td')[1]
	blocktest_(td2.getElementsByTagName('select')[2])
	
	turnOffTxt(tr)

}
function turnOffTxt(tr){
	let td = tr.getElementsByTagName('td')[1]
	const txts =td.getElementsByTagName('span')
	for(let k=txts.length-1;k>-1;--k){
		td.removeChild(txts[k])
	}
}
function generar(titulo = '<h2>Prof. Roberto Morin </h2><h3>Matemáticas</h3>'){
	function encabezado(k,titulo){

		let Enc = document.createElement('div')
		let Tab = document.createElement('table')
		Tab.classList.add('problem2')
		Tab.setAttribute("width","100%")
		let tr = document.createElement('tr')
		let td = document.createElement('td')
		let img = document.createElement('img')
			img.setAttribute("src",'../src/icon2.png')
			img.setAttribute('width', 70)
		td.appendChild(img)
		tr.appendChild(td)
		td = document.createElement('td')
		
		
	
	
	
		td.innerHTML=`${titulo}<h4>${(new Date().toLocaleDateString())}</h4>`
		tr.appendChild(td)
		Tab.appendChild(tr)
		Enc.appendChild(Tab)
		let ID = document.createElement('div')
		ID.textContent="Id: "+(k+1)
		Enc.appendChild(ID)
		
		
		return Enc.outerHTML
	}
	document.getElementById("container").innerHTML=""
	document.getElementById("Respuestas").innerHTML=""
	const botones = document.getElementsByClassName('Addedbutton')
	let queue

	const n_cuestionario = botones.length
	const N = document.getElementById('NCopias').value
	let contador
	const n=[0,0,0,0]
	let boton, td, tr, td2
	for(let impresion=0;impresion<N;++impresion){
		let Copia = document.createElement('div');
		Copia.classList.add('page')
		Copia.innerHTML = encabezado(impresion,titulo)
		contador=0
		queue=[]
		let CR = document.createElement('div');
		CR.classList.add("Respuesta")
		CR.innerHTML="Id "+(impresion+1)+": "
		for (let k0 = 0;k0 < n_cuestionario ; ++k0){
			boton = botones[k0]
			td = boton.parentElement
			tr = td.parentElement
			td2 = tr.getElementsByTagName('td')[1]
			for (let dummyK=0;dummyK<3;++dummyK)n[dummyK]=td2.getElementsByTagName('select')[dummyK].value
			n[3]=td2.getElementsByTagName('input')[0].value
			queue.push(n.map((x) => x))

			for(let k1 = 0; k1<n[3];++k1){
				let Pregunta = document.createElement('div')
				let Respuesta = document.createElement('span')
				Pregunta.classList.add("problem")
				Respuesta.classList.add("Solution")
				Pregunta.innerHTML+="<br>"+((++contador))+".- "
				Respuesta.innerHTML+="[P "+(contador)+"] "
				Copia.innerHTML += Pregunta.outerHTML
				CR.innerHTML += Respuesta.outerHTML
			}
			
		}
		document.getElementById("container").appendChild(Copia)
		document.getElementById("Respuestas").appendChild(CR)
	}

	console.log('Lista')
	console.log(queue)
	for(let copias=0;copias<N;++copias){
		console.log('entra1')
		for(let k0=queue.length-1;k0>-1;--k0){
			console.log('entra2')
			console.log(queue[k0][3])

			for(let k1=0;k1<queue[k0][3];++k1){
				console.log(`tema[${queue[k0][0]}].subtema[${queue[k0][1]}].test[${queue[k0][2]}].fun()`)
				tema[queue[k0][0]].subtema[queue[k0][1]].test[queue[k0][2]].fun()
				
			}
		}
	}
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function abrirPregunta(){
	let C =[]
	const n=document.getElementsByClassName("problem").length
	C[0]= document.getElementsByClassName("Solution")[n-1]
	for(let k=1;k<6;++k){
		C[k]= document.getElementById("C"+k)
	}
	C[6]=document.getElementsByClassName("problem")[n-1]
	C[6].classList.remove("problem");
	C[6].classList.add("problem2");
	return C
	
}
function repetido(cadena){
	var N=cadena.length-1;
	
	for(var k=0;k<N;++k){
		if(cadena[N]===cadena[k]){
			return true;
		}
	}
	return false;
}
function unsortArray(b) {
	let a=b
	a.sort(function(){return 0.5 - Math.random()});
	return a
}