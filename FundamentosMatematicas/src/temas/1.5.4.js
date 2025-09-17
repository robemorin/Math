//opción múltiple
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
//import * as tlacu from '../../../../tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Factorización de expresiones cuadráticas';
}
export function tipo(){
  return 0
  /*
  0 - Opción múltiple
  1 - Abierto
  2 - Geogebra
  */
}
export async function pregunta(numeroPregunta) { 
  try {
	return reciclado(numeroPregunta+1)

  } catch (error) {
    console.error('Error loading r2p_core.js:', error);
  }
}


function reciclado(numeroPregunta){

{
						let c= [Math.ceil(Math.random()*9),
								Math.ceil(Math.random()*9)*(Math.random()<0.5?1:-1),
								Math.ceil(Math.random()*9)*(Math.random()<0.5?1:-1),
								Math.ceil(Math.random()*9)*(Math.random()<0.5?1:-1)]
						const denominador = tlacu.mcd(c)
						console.log(`C:${c} --->  ${denominador}`)
						c.forEach((elemento, indice) => {
    						c[indice] = elemento / denominador;
						})
						console.log(` --->  ${c}`)

						if(c[0]<c[2]) [c[0],c[2]] = [c[2],c[0]]
    					
						const P=`${numeroPregunta}.- Factorice la siguiente expresión $${tlacu.poli.print(tlacu.conv([c[0],c[1]], [c[2],c[3]]))}$.`
						const R = [];
						R[0] = `$(${tlacu.poli.print([c[0],c[1]])})(${tlacu.poli.print([c[2],c[3]])})$`
						for(let i=1;i<6;++i){
							do{		
								c= [Math.ceil(Math.random()*9),
									Math.ceil(Math.random()*9)*(Math.random()<0.5?1:-1),
									Math.ceil(Math.random()*9)*(Math.random()<0.5?1:-1),
									Math.ceil(Math.random()*9)*(Math.random()<0.5?1:-1)]
							tlacu.mcm(c)
							if(c[0]<c[2]) [c[0],c[2]] = [c[2],c[0]]
								R[i] = `$(${tlacu.poli.print([c[0],c[1]])})(${tlacu.poli.print([c[2],c[3]])})$`
							}while(tlacu.pregunta.hayRepetidos(R))
						}
						return [P,R]
					}
				}