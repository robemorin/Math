//1.1.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Redondeo a cifras significativas I';
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
	let numero =Math.random()*10**(Math.random()*5+3)
	const ndecimales = Math.ceil(Math.random()*5+1)


    const P=`${numeroPregunta+1}.- Redondea ${numero} a ${ndecimales} cifras significativas.`;
    const R=[Number(numero.toPrecision(ndecimales)).toLocaleString().replace(/,/g, " ")];
    
    for(let i=1;i<6;++i){
      do{
        const cs =Math.ceil(Math.random()*6+1)
        const dummy = Math.ceil(Math.log10(Math.abs(numero))-cs)

        R[i] = Number((numero+(Math.round(Math.random()*3-1.5))*10**dummy).toPrecision(cs)).toLocaleString().replace(/,/g, " ")
        //console.log(`numero: ${numero} R:`,R)
      }while( tlacu.pregunta.hayRepetidos(R) )
    }
    return [P,R]

  } catch (error) {
    console.error('Error loading r2p_core.js:', error);
  }
}
