//import * as tlacu from 'http://127.0.0.1:5500/Math/tlacuache/src/tlacuache-modulo.mjs'
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
export function name() {
  return 'Método del trapecio'
}

export function tipo() {
  return 3;
}

export async function pregunta(i, code, esImprimible=false) {
  try{
	let h=[0.5,1,2,2.5,3,5]
	h=h[Math.floor(Math.random()*h.length)]
	const n = Math.round(Math.random()*5+3)
	const a = Math.round(Math.random()*10-5)
	const b = a+n*h
	const poli = [(Math.random()<0.5?-1:1)*Math.ceil(Math.random()*3),(Math.random()<0.5?-1:1)*Math.ceil(Math.random()*6),(Math.random()<0.5?-1:1)*Math.ceil(Math.random()*6)]
  //console.log(`(${i+1}) ${(va-ve)/ve}`)
	let demasColumnas=''
	for(let k=0;k<n;++k) demasColumnas += `<tr><td><math-field class='noVerMathFiels'></math-field></td><td><math-field class='noVerMathFiels'></math-field></td></tr>`

	const dummy = tlacu.metTrapecio(a,b,n,poli)
	console.log('dummy ')
	console.log('x',dummy.x)
	console.log('y',dummy.y)
	console.log('A',dummy.A)
  const Pregunta =  `
  <div class="pregunta-abierta" data-a="${a}" data-n="${n}" data-b="${b}" data-poli=${poli} style="display: none;">
  <p>${i + 1}.- Use el método del trapecio con ${n} subintervalos para estimar el área de 
  $f(x) =  ${tlacu.poli.print(poli)}$ bajo su curva de $a=${a}$ hasta $b=${b}$. </p>
  <p>Complete lo que se solicita</p>
  <ul class="lista-IB">
  <li>  Calcule $h=\\frac{b-a}{n}=$ <math-field></math-field>  </li>
  <li> Completa la siguiente tabla
 <center>
 		<table class="allLines">
		<tr><td align="center">$x$</td><td align="center">$f(x)$</td></tr>
		<tr><td align="center">${a}</td><td><math-field class='noVerMathFiels'></math-field></td></tr>
		${demasColumnas}
		</table>
 </center> 
  </li>
  <li>
  Use el método del trapecio para estimar el área 
	$$\\int_a^b f(x)dx \\approx \\frac{h}{2}\\left(f(x_0)+2f(x_1)+\\cdots +2f(x_{n-1})+f(x_n) \\right)$$
	 <center>
	$\\int_a^b f(x)dx \\approx$ <math-field></math-field>
	<center>
  </li>
  </ul>
	  </div><br><br><br>` 
  if(esImprimible){
	console.log('Debo imprimir la pregunta y su respuesta')
	const respuesta='Pendiente'
	return {Pregunta, respuesta}
  }

render()
return Pregunta
	
  }catch (error){
	console.error('Error al carga la pregunta:', error);
  }
}

export async function render() {
  window.accionR2P = function(i) {
	let totalPuntos = 3
	let puntos = 0
	let pregunta = document.getElementsByClassName('pregunta-abierta')
	const mathFields= pregunta[i].getElementsByTagName('math-field')
	const rh = Number(mathFields[0].value)	

	const a = Number(pregunta[i].dataset.a)
	const b = Number(pregunta[i].dataset.b)
	const n = Number(pregunta[i].dataset.n)
	const poli = eval(`[${pregunta[i].dataset.poli}]`)
	const sol = tlacu.metTrapecio(a,b,n,poli)
	//let n = tlacu.cs(Math.abs((va-ve)/ve),3)
	//console.log(`(${i+1}) ans: ${rnumero} rans=(${va}-${ve})/${ve}) = ${ans}`)

	if( sol.h != rh || pregunta[i].getElementsByTagName('math-field')[0].value == ''){
	  mathFields[0].style.backgroundColor = "red";
	} else{
	  ++puntos
	  mathFields[0].style.border = "solid 5px green";
	}
	
	let dummyPuntos=1
	for (let counter=1;counter<2*(n+1);++counter){
		
		let ans = counter%2==0?sol.x[counter/2]:sol.y[(counter-1)/2]
		let rans = Number(mathFields[counter].value)	
		if( ans.toPrecision(3) != rans.toPrecision(3) || pregunta[i].getElementsByTagName('math-field')[counter].value == ''){
			dummyPuntos = 0
			mathFields[counter].style.backgroundColor = "red";
		} else{	
			
			mathFields[counter].classList.remove('noVerMathFiels')
			mathFields[counter].style.border = "solid 5px green";
		}
	}
	puntos += dummyPuntos

	const Area = Number(mathFields[mathFields.length-1].value)	
	if( Number(sol.A.toPrecision(3)) != Area || mathFields[mathFields.length-1].value == ''){
	  mathFields[mathFields.length-1].style.backgroundColor = "red";
	} else{
	  ++puntos
	  mathFields[mathFields.length-1].style.border = "solid 5px green";
	}
	
	return [puntos,totalPuntos]
  };
}
