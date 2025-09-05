import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Línea recta a partir de dos puntos';
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
    function tempEcLine(m,b){
        let cadena = `$y =`
        if(m[0]!=0){
            cadena += (m[1]==1 && Math.abs(m[0])==1?(m[0]<0?"-":"")+'x':(m[0]<0?"-":"")+tlacu.fraccion(Math.abs(m[0]),m[1])+'x') 
        }
        cadena += (b[0]==0?'':(b[0]<0?"-":"+")+tlacu.fraccion(Math.abs(b[0]),b[1]))+"$"
        return cadena
    }


    let A=[Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)], B
    do{
        B = [Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)]
        console.log(`A:${A}, B:${B}`)
    }while( (A[0] == B[0]) || (A[1] == B[1]) )
    const dummy=Math.round(Math.random())
    
    let m=[ B[1]-A[1], B[0]-A[0] ]
    m=tlacu.simplify_frac(m)

    let b=[m[1]*A[1]-m[0]*A[0],m[1]]
    b=tlacu.simplify_frac(b)


    const P=`${numeroPregunta+1}.- Determine la ecuación de la línea recta que pasa por los puntos $A:(${A[0]}, ${A[1]})$ y $B:(${B[0]}, ${B[1]})$`
    const R=[tempEcLine(m,b)];
    
    for(let i=1;i<6;++i){
      do{
        if(dummy==1){
									m[0] += Math.round(Math.random()*4-2)
								}else{
									b[0] += Math.round(Math.random()*4-2)
								}
								R[i]= tempEcLine(m,b)
      }while( tlacu.pregunta.hayRepetidos(R) )
    }
    return [P,R]

  } catch (error) {
    console.error('Error loading r2p_core.js:', error);
  }
}

/*

						//  Inicio de preguntas
						let C=abrirPregunta()
						
	
						
						const P=
	
						spanContenido(P,C[6])
						
						const R=[tempEcLine(m,b)]
						for(let i=1;i<6;++i){
							do{
								if(dummy==1){
									m[0] += Math.round(Math.random()*4-2)
								}else{
									b[0] += Math.round(Math.random()*4-2)
								}
								R[i]= tempEcLine(m,b)
							}while(repetido(R))
						
						}
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
*/