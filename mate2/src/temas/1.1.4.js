import * as tlacu from 'http://127.0.0.1:5500/Math/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
export function name() {
  return 'Redondeo de números I'
}

export function tipo() {
  return 3;
}

export async function pregunta(i, code) {
  try{
	const numero = Math.random()*10**(Math.random()*2)
	const ndecimales = Math.ceil(Math.random()*6)

	//console.log(`${i}<- Re(a):${r*Math.cos(arg*Math.PI/12)} Im(a):${r*Math.sin(arg*Math.PI/12)}`)
	return `
	  <div class="pregunta-abierta"  data-numero="${numero}" data-nd="${ndecimales}" style="display: none;">
		<p>${i + 1}.- Redondea ${numero} a ${ndecimales} decimales.</p>
		<p>$${numero}\\approx $<math-field></math-field> &Tab;&Tab;
	  </div>
	`;
	
  }catch (error){
	console.error('Error al carga la pregunta:', error);
  }
}

export async function render(container, n, code) {
  window.accionR2P = function(i) {
	let totalPuntos = 1
	let puntos = 0
	let pregunta = document.getElementsByClassName('pregunta-abierta')
	//console.log(`r: ${pregunta[i].dataset.r} arg: ${pregunta[i].dataset.arg}`)
	//console.log(`id del mathlive: math-field-${i}-0`)
	const mathFields= pregunta[i].getElementsByTagName('math-field')
	const respuesta = Number(mathFields[0].value)
	
	
	const numero = Number(pregunta[i].dataset.numero)
	const ndecimales = Number(pregunta[i].dataset.nd)
	


	if(Math.abs(respuesta - Number(numero.toFixed(ndecimales)) ) != 0 || pregunta[i].getElementsByTagName('math-field')[0].value == ''){
	  mathFields[0].style.backgroundColor = "red";
	} else{
	  ++puntos
	  mathFields[0].style.border = "solid 5px green";
	}
	return [puntos,totalPuntos]
  };
}
