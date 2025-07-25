//0.0.1.js
export function name(){
  return '0.0.1: prueba 1 Plantilla Cuestionario cerrado';
}
export function tipo(){
  return 0
  /*
  0 - Opción múltiple
  1 - Abierto
  */
}
export async function pregunta(numeroPregunta) { 
  try {    
    const P=`${numeroPregunta+1}.- Pregunta`
    const R=[];
    
    R[0]='Respuesta correcta'
    
    for(let i=1;i<6;++i){
      R[i]=`Respuesta  incorrecta ${i} $x^2+\\frac{x^2+2}{e^{2x-1}}$`
    }
    return [P,R]

  } catch (error) {
    console.error('Error loading r2p_core.js:', error);
  }
}

