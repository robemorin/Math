//1.1.3.js (Ejemplo de nombre de archivo)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Fracciones parciales I parte A';
}
export function tipo(){
  return 0;
}
export async function pregunta(numeroPregunta) { 
  try {
    return problema(numeroPregunta+1);
  } catch (error) {
    console.error('Error al generar el problema:', error);
  }
}

function problema(n) {
    let a=[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
    if(a[1]<a[3]){
        [a[1],a[3]] = [a[3],a[1]]
    }else if(a[1] == a[3]){
        a[1] += 1
    }
    const P =`${n}.- Separe la siguiente expresión $\\frac{${tlacu.poli.print([a[0]+a[2],a[0]*a[3]+a[1]*a[2]])}}{${tlacu.poli.print([1,a[1]+a[3],a[1]*a[3]])}}$`
    const R=[];
    R[0]=`$\\frac{${tlacu.poli.print([a[0]])}}{${tlacu.poli.print([1,a[1]])}}+\\frac{${tlacu.poli.print([a[2]])}}{${tlacu.poli.print([1,a[3]])}}$`
    for(let i=1;i<6;++i){
        do{
            [a[0],a[2]] = [(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
            R[i]=`$\\frac{${tlacu.poli.print([a[0]])}}{${tlacu.poli.print([1,a[1]])}}+\\frac{${tlacu.poli.print([a[2]])}}{${tlacu.poli.print([1,a[3]])}}$`
        }while(tlacu.pregunta.hayRepetidos(R))
    }
    return [P,R]
}