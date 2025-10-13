//1.1.3.js (Ejemplo de nombre de archivo)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
    return 'Fracciones parciales II';
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
    function construye_a(){
        let a=[]
        for(let k=0;k<5;++k){ a[k] = (Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1) }
        if(a[1]==a[4]){a[4]++}
        return a
    }
    let a=construye_a()
    const P = `Separe la siguiente expresión $\\frac{${tlacu.poli.print([a[0]+a[3], a[0]*(a[1]+a[4])+a[2]+2*a[1]*a[3],a[0]*a[1]*a[4]+a[2]*a[4]+a[1]**2*a[3]])}}{(${tlacu.poli.print([1,a[1]])})^2(${tlacu.poli.print([1,a[4]])})}$`
    const R=[];
    R[0]=`$\\frac{${tlacu.poli.print([a[0]])}}{${tlacu.poli.print([1,a[1]])}}+\\frac{${tlacu.poli.print([a[2]])}}{(${tlacu.poli.print([1,a[1]])})^2}+\\frac{${tlacu.poli.print([a[3]])}}{${tlacu.poli.print([1,a[4]])}}$`
    let index=Math.floor(Math.random()*3)
    index += index==0?0:1
    //console.log('---')
    //console.log('---')
    for(let i=1;i<6;++i){
        do{
            a[index] = (Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)
            //console.log(index)
            R[i]=`$\\frac{${tlacu.poli.print([a[0]])}}{${tlacu.poli.print([1,a[1]])}}+\\frac{${tlacu.poli.print([a[2]])}}{(${tlacu.poli.print([1,a[1]])})^2}+\\frac{${tlacu.poli.print([a[3]])}}{${tlacu.poli.print([1,a[4]])}}$`
        }while(tlacu.pregunta.hayRepetidos(R))
    }
    return [P,R]
        
}
