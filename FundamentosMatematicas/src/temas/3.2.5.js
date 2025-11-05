// 3.1.3.js (Fracciones Parciales TIL - Denominador Cúbico Factorizado)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
    return 'Ley de senos';
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
						
						let R=[],side=[],angle=[]
						side[0]=Math.round(Math.random()*20+1)
						
						do{
							side[1]=Math.round(Math.random()*20+1)
							angle[0]=Math.round(Math.random()*70+10)
							angle[1] = side[1]*Math.sin(angle[0]*Math.PI/180)/side[0]
						}while(angle[1]>.95 || angle[1]<-0.95)
							angle[1]=180*Math.asin(angle[1])/Math.PI
						
						const label=[	['a','b','A','B'],
										['a','c','A','C'],
										['b','a','B','A'],
										['b','c','B','C'],
										['c','a','C','A'],
										['c','b','C','B']]
						const op=Math.floor(Math.random()*label.length-.01)
						const P= "Considere un triángulo con lados $"+label[op][0]+"="+side[0]+"$, $"+label[op][1]+"="+side[1]+"$ y angulo $"+label[op][2]+"="+angle[0]+
						"$. Calcule ángulo $"+label[op][3]+"$."
						

						
						R[0]=angle[1].toPrecision(3)+"°"
						for(let i=1;i<6;++i){
							do{
								R[i]=(angle[1]+30*(Math.random()-.5)).toPrecision(3)+"°"
							}while(tlacu.pregunta.hayRepetidos(R))
						
						}
						return [P,R]
					}
					function P2(){
						
						const R=[],side=[],angle=[]
						side[0]  = Math.round(Math.random()*20+1)
						angle[0] = Math.round(Math.random()*70+10)
						angle[1] = Math.round(Math.random()*70+10)
						side[1]  = side[0]*Math.sin(angle[1]*Math.PI/180)/Math.sin(angle[0]*Math.PI/180)
							
							
						
						
						
						const label=[	['A','B','a','b'],
										['A','C','a','c'],
										['B','A','b','a'],
										['B','C','b','c'],
										['C','A','c','a'],
										['C','B','c','b']]
						const op=Math.floor(Math.random()*label.length-.01)
						
						
						const P="Considere un triángulo con ángulos de $"+label[op][0]+" = "+angle[0]+"°$, $"+label[op][1]+"="+angle[1]+
						"°$ y un lado $"+label[op][2]+"="+side[0]+"$. Calcule el lado "+label[op][3]+"."
						
						

						R[0]=side[1].toPrecision(3)
						for(let i=1;i<6;++i){
							do{
								R[i]=(side[1]+10*(Math.random()-.5)).toPrecision(3)
							}while(tlacu.pregunta.hayRepetidos(R))
						
						}
						return [P,R]
					}
					return Math.random()<0.5 ? P1() : P2()
				}