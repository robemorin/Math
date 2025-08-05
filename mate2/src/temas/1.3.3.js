//1.1.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Error relativo I';
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
							let ve, decimales, va
              do{
                ve = Number((Math.random() * 10 ** Math.round(Math.random() * 7 + 1)).toPrecision(6));
                decimales = Math.round(Math.random() * 4 + 1);
                va =Number( (ve*(1+Math.random()*0.4) ).toPrecision(decimales))
                //console.log(`test va: ${va} ve:${ve}`)

              }while(( va - ve ) == 0)
              
							
							const P=`${np+1}.- Calcula el error relativo si se toma a $V_a=${va.toString()}$ como una aproximación de $V_e=${ve.toString()}$`
							const ans =Math.abs((ve-va)/ve) 
							const R=[`$${ans.toPrecision(3)}$`];
							for(let i=1;i<6;++i){
								do{
									R[i]=`$${(ans*(0.4*Math.random()+0.8)).toPrecision(3)}$`
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
