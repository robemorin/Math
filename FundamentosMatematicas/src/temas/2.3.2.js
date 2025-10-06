//1.1.3.js (Ejemplo de nombre de archivo)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
    return 'Fracciones parciales I parte B';
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
function problema(n){
    function construye_a(){
        function asegura_desigual(a,n,m){
            if(a[n]>a[m]){
                [a[n],a[m]]=[a[m],a[n]]
            }else if(a[n]==a[m]){
                a[m]+=1
            }
            
            return a
        }
        let a=[]
        for(let k=0;k<6;++k){ a[k] = (Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1) }

        a = asegura_desigual(a,1,3)
        a = asegura_desigual(a,1,5)
        a = asegura_desigual(a,3,5)
        return a
    }
    
    let a=construye_a()
    const P = `Separe la siguiente expresión $\\frac{${tlacu.poli.print([a[0]+a[2]+a[4], a[0]*(a[3]+a[5]) + a[2]*(a[1]+a[5]) + a[4]*(a[1]+a[3]),a[0]*a[3]*a[5]+a[2]*a[1]*a[5]+a[4]*a[1]*a[3]])}}{(${tlacu.poli.print([1,a[1]])})(${tlacu.poli.print([1,a[3]])})(${tlacu.poli.print([1,a[5]])})}$`
    const R=[];
    R[0]=`$\\frac{${tlacu.poli.print([a[0]])}}{${tlacu.poli.print([1,a[1]])}}+\\frac{${tlacu.poli.print([a[2]])}}{${tlacu.poli.print([1,a[3]])}}+\\frac{${tlacu.poli.print([a[4]])}}{${tlacu.poli.print([1,a[5]])}}$`
    const index=Math.floor(Math.random()*3)*2
    for(let i=1;i<6;++i){
        do{
            a[index] = (Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)
            R[i]=`$\\frac{${tlacu.poli.print([a[0]])}}{${tlacu.poli.print([1,a[1]])}}+\\frac{${tlacu.poli.print([a[2]])}}{${tlacu.poli.print([1,a[3]])}}+\\frac{${tlacu.poli.print([a[4]])}}{${tlacu.poli.print([1,a[5]])}}$`
        }while(tlacu.pregunta.hayRepetidos(R))
    }
    return [P,R]
}