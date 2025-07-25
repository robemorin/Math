//1.1.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Notación científica';
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
  function P1(x){
							let k=Math.round(Math.random()*10-5)
							const cs=eval((Math.round(Math.random()*9+1)+Math.random()).toFixed(2))
							
							const P=`Convierta ${parseFloat((Math.pow(10,k)*cs).toPrecision(3))} a notación científica`
							
							const R=[];
							R[0]=tlacu.NotacionCientifica(Math.pow(10,k)*cs)
							for(var i=1;i<6;++i){
								do{
									k=Math.round(Math.random()*20-5)
									R[i]=tlacu.NotacionCientifica(Math.pow(10,k)*cs)
								}while(tlacu.pregunta.hayRepetidos(R))
							}
							return [P,R]
						}
						function P2(x){
							let k=Math.round(Math.random()*20-5)
							const cs=eval((Math.round(Math.random()*9+1)+Math.random()).toFixed(2))
							
							const P=`Convierta ${tlacu.NotacionCientifica(Math.pow(10,k)*cs)} a expresión regular.`
							
							
							
							
							const R=[];
							R[0]=parseFloat((Math.pow(10,k)*cs).toPrecision(3))
							
							for(let i=1;i<6;++i){
								do{
									k=Math.round(Math.random()*20-5)
									R[i]=parseFloat((Math.pow(10,k)*cs).toPrecision(3))
								}while(tlacu.pregunta.hayRepetidos(R))
							}
							return [P,R]
						}
  try {
	
    return Math.random()<0.5?P1():P2()

  } catch (error) {
    console.error('Error loading r2p_core.js:', error);
  }
}
