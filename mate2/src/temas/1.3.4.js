//import * as tlacu from 'http://192.168.0.7:5500/Math/tlacuache/src/tlacuache-modulo.mjs'
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
export function name() {
  return 'Error relativo II';
}

export function tipo() {
  return 3;
}

export async function pregunta(i, code, esImprimible=false) {
  try{
	let ve = Number(((Math.random()*2-1 )* 10 ** Math.round(Math.random() * 10 - 5)).toPrecision(6));
  let sf = Math.round(Math.random() * 4 + 1);
  let va = Number((ve*(0.8+0.4*Math.random())).toPrecision(sf))
  while((va-ve) == 0){
    ve = Number((Math.random() * 10 ** Math.round(Math.random() * 10 - 5)).toPrecision(6));
    sf = Math.round(Math.random() * 4 + 1);
    va = Number(ve*(0.8+0.4*Math.random())).toPrecision(sf);
  }
  //console.log(`(${i+1}) ${(va-ve)/ve}`)
  const Pregunta =  `
  <div class="pregunta-abierta"  data-va="${tlacu.cs(va,sf)}" data-ve="${tlacu.cs(ve,6)}" style="display: none;">
  <p>${i + 1}.- Calcula el error relativo si se toma a $V_a=${tlacu.cs(va,sf)}$ como una aproximación de $V_e=${tlacu.cs(ve,6)}$</p>
	<table>
	  <tr><td>Error relativo </td><td> <math-field></math-field></td></tr>
	</table>
	  </div>` 
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

export async function render() {
  window.accionR2P = function(i) {
	let totalPuntos = 1
	let puntos = 0
	let pregunta = document.getElementsByClassName('pregunta-abierta')
	const mathFields= pregunta[i].getElementsByTagName('math-field')
	const rnumero = Number(mathFields[0].value)	

	let va = Number(pregunta[i].dataset.va)
	let ve = Number(pregunta[i].dataset.ve)
	let ans = tlacu.cs(Math.abs((va-ve)/ve),3)
	//console.log(`(${i+1}) ans: ${rnumero} rans=(${va}-${ve})/${ve}) = ${ans}`)

	if(Math.abs((ans-rnumero)/ans ) > 0.01 || pregunta[i].getElementsByTagName('math-field')[0].value == ''){
	  mathFields[0].style.backgroundColor = "red";
	} else{
	  ++puntos
	  mathFields[0].style.border = "solid 5px green";
	}
	return [puntos,totalPuntos]
  };
}
