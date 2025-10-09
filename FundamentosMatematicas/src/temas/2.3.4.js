//1.1.3.js (Ejemplo de nombre de archivo)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
    return 'Fracciones parciales III';
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

function problema(){
    const b = [	Math.round(Math.random()*20-10),
                Math.round(Math.random()*8+1),
                Math.round(Math.random()*20-10)]
    let a=[]
    do{
        a=[	Math.round(Math.random()*20-10),
                Math.round(Math.random()*20-10),
                Math.round(Math.random()*8+1)*(Math.random()<0.5?1:-1)]
    }while(a[0]==0 && a[1]==0)
    const num = [a[0]+a[2],2*a[2]*b[0]+a[0]*b[2]+a[1],a[1]*b[2]+a[2]*(b[0]**2+b[1])]
    const P = `Separe la siguiente expresión $\\frac{${tlacu.poli.print(num)}}{(${tlacu.poli.print([1,2*b[0],b[0]**2+b[1]])})(${tlacu.poli.print([1,b[2]])})}$`
    const R=[];
    R[0]=`$ \\frac{${tlacu.poli.print([a[0],a[1]])}}{(${tlacu.poli.print([1,b[0]])})^2+${b[1]}}+\\frac{${tlacu.poli.print([a[2]])}}{(${tlacu.poli.print([1,b[2]])})}$`
    const index=Math.floor(Math.random()*2.4)
    
    
    for(let i=1;i<6;++i){
        do{
            a[index] = Math.round(Math.random()*8+1)*(Math.random()<0.5?1:-1)
            //console.log(index)
            R[i]=`$ \\frac{${tlacu.poli.print([a[0],a[1]])}}{(${tlacu.poli.print([1,b[0]])})^2+${b[1]}}+\\frac{${tlacu.poli.print([a[2]])}}{(${tlacu.poli.print([1,b[2]])})}$`
        }while(tlacu.pregunta.hayRepetidos(R))
    }
    return [P,R]
}
