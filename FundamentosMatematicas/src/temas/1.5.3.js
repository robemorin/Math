//1.1.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Fórmula general';
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
	return reciclado(numeroPregunta+1)

  } catch (error) {
    console.error('Error loading r2p_core.js:', error);
  }
}


function reciclado(numeroPregunta){
							do{
							var a=Math.round(Math.random()*20-11)
							var b=Math.round(Math.random()*20-11)
							var c=Math.round(Math.random()*20-11)
							}while((b*b-4*a*c)<=0 || a==0)
							var x=[(-b-Math.sqrt(b*b-4*a*c))/(2*a),(-b+Math.sqrt(b*b-4*a*c))/(2*a)]
							if(x[0]>x[1]){
								var dummy=x[0]
								x[0]=x[1]
								x[1]=dummy;
							}	
								
							
							var P=numeroPregunta+".- La solución de $"+tlacu.poli.print([a,b,c])+"=0$  es"
							
							
							var R=[];
							R[0]="<i>x</i> = "+x[0].toFixed(3)+", "+x[1].toFixed(3)
							var dummy=0;
							for(var i=1;i<6;++i){
								do{
								
								do{
									var a=Math.round(Math.random()*20-11)
									var b=Math.round(Math.random()*20-11)
									var c=Math.round(Math.random()*20-11)
								}while((b*b-4*a*c)<=0 || a==0)
								var x=[(-b-Math.sqrt(b*b-4*a*c))/(2*a),(-b+Math.sqrt(b*b-4*a*c))/(2*a)]
								if(x[0]>x[1]){
									var dummy=x[0]
									x[0]=x[1]
									x[1]=dummy;
								}
								
									R[i]="<i>x</i> = "+x[0].toFixed(3)+", "+x[1].toFixed(3)
								}while(tlacu.pregunta.hayRepetidos(R))
							}
							return [P,R]
						}


/*

							let a=[	Math.round(Math.random()*9+1),
									(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),
									(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
							
								
							
							var P=`Exprese a $${tlacu.poli.print([a[0]**2,2*a[0]*a[1],a[1]**2+a[2]])}$ en la forma $(ax+b)^2+c$`
							
							
							var R=[];
							
							R[0]=`$(${tlacu.poli.print([a[0],a[1]])})^2${(a[2]>0?'+':'')+a[2]}$`
							const Coef=Math.floor(Math.random()*3)
							var dummy=0;
							for(var i=1;i<6;++i){
								do{
									a[Coef]=(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)
									
									R[i]=`$(${tlacu.poli.print([a[0],a[1]])})^2${(a[2]>0?'+':'')+a[2]}$`
								}while(tlacu.pregunta.hayRepetidos(R))
							}
							return [P,R]
						}
				*/