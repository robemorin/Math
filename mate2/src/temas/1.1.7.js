import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
export function name() {
  return 'Redondeo'
}

export function tipo() {
  return 3;
}

export async function pregunta(i, code, esImprimible = false) {
  try{
	const numero = Math.random()*10**(Math.random()*8)
	const de = Math.ceil(Math.random()*6)
	const cs = Math.ceil(Math.random()*6)
	
	const otro = Math.ceil(Math.random()*6)
	const Pregunta =  `
	<div class="pregunta-abierta"  data-numero="${numero}" data-de="${de}" data-cs="${cs}" data-otro="${otro}" style="display: none;">
	<p>${i + 1}.- Redondea ${numero} :</p>
	  <center><table>
	  <tr><td>a ${de} decimales</td><td> <math-field></math-field></td></tr>
		<tr><td>a ${cs} cifras significativas</td><td> <math-field></math-field></td></tr>
		<tr><td>al ${otro} más cercano</td><td> <math-field></math-field></td></tr>
		</table></center>
		</div>` 

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

export async function render(container, n, code) {
  window.accionR2P = function(i) {
	let totalPuntos = 3
	let puntos = 0
	let pregunta = document.getElementsByClassName('pregunta-abierta')
	const mathFields= pregunta[i].getElementsByTagName('math-field')
	const rde = Number(mathFields[0].value)
	const rcs = Number(mathFields[1].value)
	const rotro = Number(mathFields[2].value)
	
	const numero = Number(pregunta[i].dataset.numero)
	const de = Number(pregunta[i].dataset.de)
	const cs = Number(pregunta[i].dataset.cs)
	const otro = Number(pregunta[i].dataset.otro)
	


	if(Math.abs(rde - Number(numero.toFixed(de)) ) != 0 || pregunta[i].getElementsByTagName('math-field')[0].value == ''){
	  mathFields[0].style.backgroundColor = "red";
	} else{
	  ++puntos
	  mathFields[0].style.border = "solid 5px green";
	}
	if(Math.abs(rcs - Number(numero.toPrecision(cs)) ) != 0 || pregunta[i].getElementsByTagName('math-field')[1].value == ''){
	  mathFields[1].style.backgroundColor = "red";
	} else{
	  ++puntos
	  mathFields[1].style.border = "solid 5px green";
	}
	if(Math.abs(rotro - Math.round(numero/otro)*otro ) != 0 || pregunta[i].getElementsByTagName('math-field')[2].value == ''){
	  mathFields[2].style.backgroundColor = "red";
	} else{
	  ++puntos
	  mathFields[2].style.border = "solid 5px green";
	}
	return [puntos,totalPuntos]
  };
}
