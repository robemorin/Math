// 3.1.3.js (Fracciones Parciales TIL - Denominador Cúbico Factorizado)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
    return 'Ley de cosenos';
}

export function tipo(){
    return 0; // Opción múltiple
}

export async function pregunta(numeroPregunta) { 
    try {
        
        return PP();

    } catch (error) {
        console.error('Error al cargar la pregunta:', error);
        return [`${numeroPregunta+1}.- Error al generar la pregunta.`, ["Error"]];
    }
}

function PP(){
					function P1(){
						
						const R=[],side=[],angle=[]
						side[0]=Math.round(Math.random()*20+1)
						side[1]=Math.round(Math.random()*20+1)
						angle[2]=Math.round(Math.random()*70+10)
						const dummy=(Math.sqrt(side[0]*side[0]+side[1]*side[1]-2*side[0]*side[1]*Math.cos(angle[2]*Math.PI/180))).toFixed(2)
						side[2]=eval(dummy)

						angle[0]=(Math.acos((side[1]*side[1]+side[2]*side[2]-side[0]*side[0])/(2*side[1]*side[2]))*180/Math.PI)
						angle[1]=(Math.acos((side[0]*side[0]+side[2]*side[2]-side[1]*side[1])/(2*side[0]*side[2]))*180/Math.PI)
						angle[2]=(Math.acos((side[0]*side[0]+side[1]*side[1]-side[2]*side[2])/(2*side[0]*side[1]))*180/Math.PI)
						let op=Math.floor(Math.random()*2.99)
						
						
						const Angle=['A','B','C']
						
						
						const P = "Considere un triángulo con lados $a="+side[0]+"$, $b="+side[1]+"$ y $c="+side[2].toFixed(2)+
						"$. Calcule ángulo $"+Angle[op]+"$."
						
						

						
						R[0]=angle[op].toFixed(2)+"°"
						for(let i=1;i<6;++i){
							do{
								R[i]=(angle[op]+30*(Math.random()-.5)).toFixed(2)+"°"
							}while(tlacu.pregunta.hayRepetidos(R))
						
						}
						return [P,R]
					}
					function P2(){
						
						const R=[],side=[],angle=[]
						side[0]=Math.round(Math.random()*20+1)
						side[1]=Math.round(Math.random()*20+1)
						angle[2]=Math.round(Math.random()*70+10)
						const dummy=(Math.sqrt(side[0]*side[0]+side[1]*side[1]-2*side[0]*side[1]*Math.cos(angle[2]*Math.PI/180))).toFixed(2)
						side[2]=eval(dummy)
						
						/*R[6]="Considere un triángulo con lados a="+side[0]+"b="+side[1]+"c="+side[2].toFixed(2)+
						". Calcule ángulo "+Angle[op]*/
						const P="Considere un triángulo con lados $a="+side[0]+"$, $b="+side[1]+"$ y un ángulo entre ellos de $C="+angle[2]+
						"°$. Calcule el lado faltante."
						
						

						
						R[0]=dummy
						for(let i=1;i<6;++i){
							do{
								R[i]=(side[2]+10*(Math.random()-.5)).toFixed(2)
							}while(tlacu.pregunta.hayRepetidos(R))
						
						}
						
						return [P,R]
					}
					return Math.random()<0.5?P1():P2()
					




				}