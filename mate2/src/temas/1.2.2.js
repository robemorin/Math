//import * as tlacu from 'http://192.168.0.7:5500/Math/tlacuache/src/tlacuache-modulo.mjs'
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
export function name() {
  return 'Notación científica II'
}

export function tipo() {
  return 3;
}

export async function pregunta(i, code, esImprimible = false) {
  try{
	const numero = Math.random()*10**(Math.random()*10-5)

	const Pregunta = `
	  <div class="pregunta-abierta"  data-numero="${numero}" style="display: none;">
	  <p>${i + 1}.- Considera el número ${numero} :</p>
	  <center><table>
	  <tr><td>Redondealo a 3 c.s. </td><td> <math-field></math-field></td></tr>
		<tr><td>Expresa el número en notación científica a 3 c.s.</td><td> <math-field></math-field></td></tr>
		</table></center>
	  </div>
	`

	if(esImprimible){
			//console.log('Debo imprimir la pregunta y su respuesta')
			const respuesta='Pendiente'
			return [Pregunta, respuesta]
			}
		render()
		return Pregunta

	
	
  }catch (error){
	console.error('Error al carga la pregunta:', error);
  }
}

export async function render(container, n, code) {
  window.accionR2P = function(i) {
	let totalPuntos = 2
	let puntos = 0
	let pregunta = document.getElementsByClassName('pregunta-abierta')
	const mathFields= pregunta[i].getElementsByTagName('math-field')
	const rnumero = Number(mathFields[0].value)
	let rnotCien = mathFields[1].value.replace(/\s+/g, "")
	

	let numero = Number(pregunta[i].dataset.numero)
	numero = Number(numero.toPrecision(3))
	let NC = tlacu.NotacionCientifica(numero)


	if(Math.abs(rnumero - numero ) != 0 || pregunta[i].getElementsByTagName('math-field')[0].value == ''){
	  mathFields[0].style.backgroundColor = "red";
	} else{
	  ++puntos
	  mathFields[0].style.border = "solid 5px green";
	}
	if(rnotCien != NC || pregunta[i].getElementsByTagName('math-field')[1].value == ''){
	  mathFields[1].style.backgroundColor = "red";
	} else{
	  ++puntos
	  mathFields[1].style.border = "solid 5px green";
	}
	console.log(`Notación resp: '${rnotCien}' *** compu: '${NC}'`)
	return [puntos,totalPuntos]
  };
}
