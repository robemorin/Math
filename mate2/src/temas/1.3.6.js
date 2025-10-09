//import * as tlacu from 'http://192.168.0.7:5500/Math/tlacuache/src/tlacuache-modulo.mjs'
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
export function name() {
  return 'Error porcentual II';
}

export function tipo() {
  return 3;
}

export async function pregunta(i, code, esImprimible = false) {
  try{
	let ve = Number(((Math.random()*2-1 )* 10 ** Math.round(Math.random() * 10 - 5)).toPrecision(6));
  let sf = Math.round(Math.random() * 4 + 1);
  let va = Number((ve*(0.8+0.4*Math.random())).toPrecision(sf))
  while((va-ve) == 0){
    ve = Number((Math.random() * 10 ** Math.round(Math.random() * 10 - 5)).toPrecision(6));
    sf = Math.round(Math.random() * 4 + 1);
    va = Number(ve*(0.8+0.4*Math.random())).toPrecision(sf);
  }
  //console.log(`(${i+1}) ${(va-ve)/ve*100}`)
	const Pregunta = `
	  <div class="pregunta-abierta"  data-va="${tlacu.cs(va,sf)}" data-ve="${tlacu.cs(ve,6)}" style="display: none;">
	  <p>${i + 1}.- Calcula el error porcentual si se toma a $V_a=${tlacu.cs(va,sf)}$ como una aproximación de $V_e=${tlacu.cs(ve,6)}$</p>
	  <table>
	  <tr><td>Error porcentual </td><td> <math-field></math-field></td></tr>
		</table>
	  </div>
	`;
	if(esImprimible){
	//console.log('Debo imprimir la pregunta y su respuesta')
	const respuesta = tlacu.cs(Math.abs((va-ve)/ve)*100,3)
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
	let totalPuntos = 1
	let puntos = 0
	let pregunta = document.getElementsByClassName('pregunta-abierta')
	const mathFields= pregunta[i].getElementsByTagName('math-field')
	let respuesta = mathFields[0].value
	//Vamos a quitar los espacios vacios
	respuesta = respuesta.replace(/\s+/g, "")
	//console.log(`(${i+1}.A) ${respuesta}`)
	if(respuesta.indexOf('%') != respuesta.length-1 || pregunta[i].getElementsByTagName('math-field')[0].value == ''){
		//console.log(`(${i+1})no está bien el %`)
		mathFields[0].style.backgroundColor = "red";
		return [puntos,totalPuntos]
	}
	respuesta = Number(respuesta.replace(/\\%/g, ""))
	//console.log(`(${i+1}.B) ${respuesta}`)
	let va = Number(pregunta[i].dataset.va)
	let ve = Number(pregunta[i].dataset.ve)
	let ans = tlacu.cs(Math.abs((va-ve)/ve)*100,3)
	//console.log(`(${i+1}) ans: ${respuesta} rans=100*(${va}-${ve})/${ve}) = ${ans}`)

	if(Number(ans)!=Number(respuesta)){
	  mathFields[0].style.backgroundColor = "red";
	} else{
	  ++puntos
	  mathFields[0].style.border = "solid 5px green";
	}
	return [puntos,totalPuntos]
  };
}