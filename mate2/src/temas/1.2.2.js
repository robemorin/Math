//1.1.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Multiplicación de polinomios I';
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
    
							let a=[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
							let b=[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),Math.round(Math.random()*19-9),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
														
							let P=`${numeroPregunta+1}.- El valor de la multiplicación de $$(${tlacu.poli.print(a)})(${tlacu.poli.print(b)})$$ es:`
							//var P="El valor de la división de $$\\frac{"+tlacu.poli.print(tlacu.conv(a,b))+"}{"+tlacu.tlacuPoli.print(a)+"}$$ es:"
							
							let c=tlacu.conv(a,b)
							let R=[];
							R[0]=`$${tlacu.poli.print(c)}$`
							let dummy=Math.floor(Math.random()*c.length)
							for(let i=1;i<6;++i){
								do{
									c[dummy]+=Math.round(Math.random()*4-2)
									R[i]=`$${tlacu.poli.print(c)}$`
								}while(tlacu.pregunta.hayRepetidos(R))
							}
							return [P,R]
						

  } catch (error) {

    console.error(tlacu.conv([1,1],[1,1]));
    console.error('Error loading r2p_core.js:', error);
  }
}
