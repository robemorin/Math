//1.1.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'División de polinomios';
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
														
							let P=`${numeroPregunta+1}.- El valor de la división de $$\\frac{${tlacu.poli.print(tlacu.conv(a,b))}}{${tlacu.poli.print(a)}}$$ es:`
							//var P="El valor de la división de $$\\frac{"+tlacu.poli.print(tlacu.conv(a,b))+"}{"+tlacu.tlacuPoli.print(a)+"}$$ es:"
							
							
							let R=[];
							R[0]=`$${tlacu.poli.print(b)}$`
							let dummy=0;
							for(let i=1;i<6;++i){
								do{
									b=[Math.round(Math.random()*19-9),Math.round(Math.random()*19-9),Math.round(Math.random()*19-9)]
									R[i]=`$${tlacu.poli.print(b)}$`
								}while(tlacu.pregunta.hayRepetidos(R))
							}
							return [P,R]
						

  } catch (error) {

    console.error(tlacu.conv([1,1],[1,1]));
    console.error('Error loading r2p_core.js:', error);
  }
}
