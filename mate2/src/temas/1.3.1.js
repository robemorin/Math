//1.1.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs'
//import * as tlacu from 'http://127.0.0.1:5500/Math/tlacuache/src/tlacuache-modulo.mjs'
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Error absoluto';
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
							let ve = Number(((Math.random()*2-1 )* 10 ** Math.round(Math.random() * 10 - 5)).toPrecision(6));
              let sf = Math.round(Math.random() * 4 + 1);
              let va = Number((ve*(0.8+0.4*Math.random())).toPrecision(sf))
              while((va-ve) == 0){
                ve = Number((Math.random() * 10 ** Math.round(Math.random() * 10 - 5)).toPrecision(6));
                sf = Math.round(Math.random() * 4 + 1);
                va = Number(ve*(0.8+0.4*Math.random())).toPrecision(sf);
              }
              
							
							const P=`${np+1}.- Calcula el error absoluto si se toma a $V_a=${tlacu.cs(va,sf)}$ como una aproximación de $V_e=${tlacu.cs(ve,6)}$`
							const ans =Math.abs(ve-va) 
              //console.log(`(${np}) ans:${ans} corregido: ${tlacu.cs(ans)}`)
							const R=[`$${tlacu.cs(ans)}$`];
							for(let i=1;i<6;++i){
								do{
									
									R[i]=`$${tlacu.cs(ans*(0.4*Math.random()+0.8))}$`
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
