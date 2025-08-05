//1.1.1.js
//import * as tlacu from 'http://127.0.0.1:5500//Math/tlacuache/src/tlacuache-modulo.mjs'
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Diagramas de asignación I';
}
export function tipo(){
  return 0
  /*
  0 - Opción múltiple
  1 - Abierto
  2 - Geogebra
  */
}
export async function pregunta(np) { 
	function P1(){
		const tipo=[['RS', 	'relación no funcional sobreyectiva'],
					['RNS', 'relacion no funcional no sobreyectiva'],
					['FB',	'funcion biyectiva'],
					['FSNI','funcion sobreyectiva no inyectiva'],
					['FNSNI','funcion no sobreyectiva no inyectiva'],
					['FNSI','funcion inyectiva no sobreyectiva'],]
		const dummy=Math.floor(Math.random()*tipo.length)
		let dummy2
		const P = `Una representación gráfica de una ${tipo[dummy][1]} es:`
		const DI=[[1,2,3,4,5],['\u03B1','\u03B2','\u03B3','\u03B4','\u03B5','\u03B6']]
		let R=[]
		let ans=tlacu.TipoRelacionesDiagAsig(tipo[dummy][0],DI)
		R[0] = ans
		for (let k = 1; k < 6; ++k) {
				do{
					dummy2=Math.floor(Math.random()*tipo.length)
				}while(dummy==dummy2)
				R[k] = tlacu.TipoRelacionesDiagAsig(tipo[dummy2][0],DI)
			}
		return [P,R]
		}
						
  try {

    return P1()

  } catch (error) {
    console.error('Error loading r2p_core.js:', error);
  }
}
