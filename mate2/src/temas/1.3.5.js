//1.1.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Error porcentual';
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
  function P1(x){
							let ve = Number((Math.random() * 100).toPrecision(4));
              let va = Number(ve.toPrecision(Math.random()<0.5?1:2))
              do{
                ve = Number((Math.random() * 100).toPrecision(4));
                va = Number(ve.toPrecision(Math.random()<0.5?1:2))
              }while(ve-va==0)
              
							const P=`${np+1}.- Calcula el error relativo si se toma a $V_a=${va}$ como una aproximación de $V_e=${ve}$`
							const ans =(Math.abs(100*(ve-va)/ve))
							const R=[`${ans.toPrecision(3)}%`];
							for(let i=1;i<6;++i){
								do{
									
									R[i]=`${(ans*(0.4*Math.random()+0.8)).toPrecision(3)}%`
								}while(tlacu.pregunta.hayRepetidos(R))
							}
							return [P,R]
						}
  try {
	
    return P1()

  } catch (error) {
    console.error('Error loading r2p_core.js:', error);
  }
}
