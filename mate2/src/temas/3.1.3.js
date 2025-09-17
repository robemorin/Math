//1.1.1.js
//import * as tlacu from 'http://127.0.0.1:5500/Math/tlacuache/src/tlacuache-modulo.mjs'
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Graficas de funciones y relaciones I';
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
	function P1(){
							
							let tipo=[['RS', 	'Relación no funcional sobreyectiva'],
										['RNS', 'Relación no funcional no sobreyectiva'],
										['FB',	'Función biyectiva'],
										['FSNI','Función sobreyectiva no inyectiva'],
										['FNSNI','Función no sobreyectiva no inyectiva'],
										['FNSI','Función inyectiva no sobreyectiva'],]
							const dummy=Math.floor(Math.random()*tipo.length)
							const relacion = tlacu.tipoRelacion(tipo[dummy][0])
							const x=[], y=[]
							for(let k=0;k<relacion.length;++k){
								x.push(relacion[k][0])
								y.push(relacion[k][1])
							}

							const P =`${np+1}.- Determine que tipo de relación es el siguiente diagrama, considere que $\\mathcal{D}=\\{-5,-4,-3,-2,-1,0,1,2,3,4,5\\}$: <br> 
							
<tlacuache-ejes size="320,480" xlabel=" " ylabel=" " xlim="-6,5.5" ylim="-5.5,5.5" dx="1" dy="1" >
    <tlacuache-plot x="${x}" y="${y}" mark="o" color="red"></tlacuache-plot >
</tlacuache-ejes >
							`
							
							let R=[tipo[dummy][1]]
							
							tipo.splice(dummy,1)
							tipo=tlacu.unsortArray(tipo)
							for(let k=1;k<6;++k){
								R[k] = tipo[k-1][1]
							}
							return [P,R]
						}
						
  try {

    return P1()

  } catch (error) {
    console.error('Error loading r2p_core.js:', error);
  }
}
