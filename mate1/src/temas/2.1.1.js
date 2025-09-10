//1.1.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Trinomio cuadrado perfecto I';
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
							let a=[	1,
									(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),
									(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
							
								
							
							var P=`Exprese a $${tlacu.poli.print([a[0]**2,2*a[0]*a[1],a[1]**2+a[2]])}$ en la forma $(ax+b)^2+c$`
							
							
							var R=[];
							
							R[0]=`$(${tlacu.poli.print([a[0],a[1]])})^2${(a[2]>0?'+':'')+a[2]}$`
							const Coef=Math.floor(Math.random()*2+1)
							var dummy=0;
							for(var i=1;i<6;++i){
								do{
									a[Coef]=(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)
									
									R[i]=`$(${tlacu.poli.print([a[0],a[1]])})^2${(a[2]>0?'+':'')+a[2]}$`
								}while(tlacu.pregunta.hayRepetidos(R))
							}
							return [P,R]
						}