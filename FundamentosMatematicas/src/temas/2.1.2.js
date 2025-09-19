//1.1.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Parábola. eje de simetría';
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
    return reciclado()
  } catch (error) {
    console.error('Error loading r2p_core.js:', error);
  }
}

function reciclado(){
							let CC
							do{
								CC=[Math.ceil(5*Math.random())*(Math.random()<0.5?1:-1),
										Math.round(20*(Math.random()-.5)),Math.round(20*(Math.random()-.5))]
							}while(CC[1]==0 & CC[2]==0)

							const P=`Calcule el eje de simetría de $y = ${tlacu.poli.print(CC)}$`
							
							let xs=[-CC[1],2*CC[0]]
							xs = tlacu.simplify_frac(xs)

							const R=[`$x_s = ${tlacu.fraccion(xs[0],xs[1],true)} $`]
							
							for(let i=1;i<6;++i){
								do{
									CC=[Math.ceil(5*Math.random())*(Math.random()<0.5?1:-1),
										Math.round(20*(Math.random()-.5)),Math.round(20*(Math.random()-.5))]
										xs=[-CC[1],2*CC[0]]
										xs = tlacu.simplify_frac(xs)
									R[i]=`$x_s = ${tlacu.fraccion(xs[0],xs[1],true)} $`
								}while(tlacu.pregunta.hayRepetidos(R))
							
							}
							return [P,R]
						
				}