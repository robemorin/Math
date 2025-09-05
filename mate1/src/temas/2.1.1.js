//1.1.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Trinomio cuadrado perfecto I';
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
  try {/*
    let cadena, den, num, a;
    do{
							cadena="$"
							den=0,
							num=0

							let n1=Math.round(Math.random()*3+1)
							let n2=Math.round(Math.random()*3+1)
							
							for(let k1=0;k1<n1;++k1){
								a=(Math.ceil(Math.random()*8+1)*(Math.random()<.5?1:-1))
								cadena+=(k1==0?(a<0?" - ":" "):(a<0?" - ":" + "))+Math.abs(a)+"x"
								den+=a
								a=(Math.ceil(Math.random()*6)*(Math.random()<.5?1:-1))
								cadena+=(a<0?" - ":" + ")+Math.abs(a)
								num+=a
							}
							cadena+=" = "
							for(let k1=0;k1<n2;++k1){
								a=(Math.ceil(Math.random()*8+1)*(Math.random()<.5?1:-1))
								cadena+=(k1==0?(a<0?" - ":" "):(a<0?" - ":" + "))+Math.abs(a)+" x"
								den-=a
								a=(Math.ceil(Math.random()*6)*(Math.random()<.5?1:-1))
								cadena+=(a<0?" - ":" + ")+Math.abs(a)
								num-=a
							}
							
		}while(den==0)
		cadena+="$"


    const P=`${numeroPregunta+1}.- Resuelva la ecuación ${cadena}`;
    const R=[(-num/den).toPrecision(3)];
    
    for(let i=1;i<6;++i){
      do{
        R[i]=(-(num+2.5-Math.random()*5)/(den+2.5-Math.random()*5)).toPrecision(3)
      }while( tlacu.pregunta.hayRepetidos(R) )
    }
    return [P,R]*/
	return reciclado()

  } catch (error) {
    console.error('Error loading r2p_core.js:', error);
  }
}


function reciclado(){
							let a=[	1,
									(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),
									(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
							
								
							
							var P=`Exprese a $${tlacu.poli.print([a[0]**2,2*a[0]*a[1],a[1]**2+a[2]])}$ en la forma $(ax+b)^2+c$`
							
							
							var R=[];
							
							R[0]=`$(${tlacu.poli.print([a[0],a[1]])})^2${(a[2]>0?'+':'')+a[2]}$`
							const Coef=Math.floor(Math.random()*2+1)
							var dummy=0;
							for(var i=1;i<6;++i){
								do{
									a[Coef]=(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)
									
									R[i]=`$(${tlacu.poli.print([a[0],a[1]])})^2${(a[2]>0?'+':'')+a[2]}$`
								}while(tlacu.pregunta.hayRepetidos(R))
							}
							return [P,R]
						}