//1.1.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Redondeo de números I';
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
	const numero = Math.random()*10**(Math.random()*5+3)
	const q=[2,5,10,20,50,100,200,500]
	const dummy = Math.floor(Math.random()*q.length)


    const P=`${numeroPregunta+1}.- Redondea ${numero} al ${q[dummy]} más cercano.`;
    const R=[Math.round(numero/q[dummy])*q[dummy]];
    
    for(let i=1;i<6;++i){
      do{
        R[i]=Math.round(numero/q[dummy])*q[dummy]+Math.round(q[dummy]*(Math.random()*6-3))*q[dummy]
        console.log('.')
      }while( tlacu.pregunta.hayRepetidos(R) )
    }
    return [P,R]

  } catch (error) {
    console.error('Error loading r2p_core.js:', error);
  }
}
