import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
export function name() {
  return 'Redondeo cifras significativas II'
}

export function tipo() {
  return 3;
}

export async function pregunta(i, code, esImprimible = false) {
  try{
	const numero = Math.random()*10**(Math.random()*8)
	const ndecimales = Math.ceil(Math.random()*6)

	const Pregunta =  `<p>${i + 1}.- Redondea ${numero} a ${ndecimales} cifras sigificativas.</p>` 
	if(esImprimible){
		//console.log('Debo imprimir la pregunta y su respuesta')
		const respuesta='Pendiente'
		return [Pregunta, respuesta]
	  }
	render()
	return `
	  <div class="pregunta-abierta"  data-numero="${numero}" data-nd="${ndecimales}" style="display: none;">
		${Pregunta}
		<p>$${numero}\\approx $<math-field></math-field> &Tab;&Tab;
	  </div>
	`;
	
  }catch (error){
	console.error('Error al carga la pregunta:', error);
  }
}

export async function render() {
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
	


	if(Math.abs(respuesta - Number(numero.toPrecision(ndecimales)) ) != 0 || pregunta[i].getElementsByTagName('math-field')[0].value == ''){
	  mathFields[0].style.backgroundColor = "red";
	} else{
	  ++puntos
	  mathFields[0].style.border = "solid 5px green";
	}
	return [puntos,totalPuntos]
  };
}
