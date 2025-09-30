//1.1.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Ecuaciones lineales';
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

						const a=[	[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),	(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)],
									[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),	(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]]
						let D = a[0][0]*a[1][1]-a[0][1]*a[1][0]
						if(D == 0){
							a[0][0]++
							D = a[0][0]*a[1][1]-a[0][1]*a[1][0]
						}
						let num
						const q=Math.round(Math.random())
						const b=[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),	(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
						if(q==0){
							num = b[0]*a[1][1]-b[1]*a[0][1]
						}else{
							num = b[1]*a[0][0]-b[0]*a[1][0]
						}

						const P=`Determine el valor de $${q==0?'x':'y'}$ <br><center> $\\begin{array}{rcl} ${a[0][0]}x ${(a[0][1]>0?'+':'-')+Math.abs(a[0][1])}y & = & ${b[0]} \\\\ ${a[1][0]}x ${(a[1][1]>0?'+':'-')+Math.abs(a[1][1])}y & = & ${b[1]} \\end{array} $</center>`
						const R=[];
						R[0]=`$${tlacu.fraccion(num,D)}$`
						for(let i=1;i<6;++i){
							do{
								R[i]=`$${tlacu.fraccion(num+Math.round(Math.random()*12-5),D)}$`
							}while(tlacu.pregunta.hayRepetidos(R))
						}
						return [P,R]
					}
				