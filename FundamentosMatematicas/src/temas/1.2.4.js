//1.1.1.js
/*import * as tlacu from 'http://127.0.0.1:5500/Math/tlacuache/src/tlacuache-modulo.mjs';
import 'http://127.0.0.1:5500/Math/tlacuache/src/tlacuache.mjs';*/
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import {encriptar, generarCodigo} from '../r2p_core.js'

export function name(){
  return 'División de polinomios II';
}
export function tipo(){
  return 1
  /*
  0 - Opción múltiple
  1 - Abierto
  2 - Geogebra
  */
}
export async function pregunta(numeroPregunta) { 
  try {	
	const code = generarCodigo()
	let a=[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
	let b=[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),Math.round(Math.random()*19-9),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
	let c=tlacu.conv(a,b)
	const caracteresAEliminar = /[ ,{,}]/g;
	let respuesta = tlacu.poli.print(a).replace(caracteresAEliminar, "")
	let respuestaE = encriptar(respuesta,code)
	
	console.log(respuesta)
	return `
      <div class="pregunta-abierta" style="display:none">
        <p>${numeroPregunta+1}.- Resultado de $$\\frac{${tlacu.poli.print(c)}}{${tlacu.poli.print(b)}}$$  </p>
        <math-field 
          id="math-field-${numeroPregunta}" 
          name="campo-${numeroPregunta}"
		  data-code = "${code}"
		  data-respuesta_e="${respuestaE}"
		  data-tipo="expresion"
        ></math-field>
      </div>
    `
	/*
	data-tipo=
			"expresion"
			"numero"
	*/					

  } catch (error) {

    console.error('Error al carga la pregunta:', error);
  }
}
