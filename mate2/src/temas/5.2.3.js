//1.1.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Línea de mejor ajuste (Cuadro de diálogo)';
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
    return P1(numeroPregunta+1)

  } catch (error) {
    console.error('Error loading r2p_core.js:', error);
  }
}

function P1(numPreg){
    let a = (Math.random()<0.5?1:-1)*Math.random()*5+0.51
    var b=Math.random()*10-5
    var e=30*(Math.random()+0.5);
    

    const x=[], y=[]
    const n=Math.round(Math.random()*5+5)
    for(let k=0;k<n;++k){
        x.push(Math.round(Math.random()*100-50)/10)
        y[k]=(Math.round(a*x[k]+b+e*(Math.random()-0.5))/10)
    }

    const ans=tlacu.stat.linReg(x,y)
        
        
        const P=`${numPreg}.- Obtenga la línea de mejor ajuste de los siguientes datos ${tlacu.stat.calc_2varStat(x,y)}.`
        var R=[];
        
        R[0]=`$y=${tlacu.poli.print([ans[0].toPrecision(3),ans[1].toPrecision(3)])}$`
        for(var i=1;i<6;++i){
            do{
                R[i]=`$y=${tlacu.poli.print([(ans[0]+Math.random()-0.5).toPrecision(3),(ans[1]+Math.random()-0.5).toPrecision(3)])}$`
            }while(tlacu.pregunta.hayRepetidos(R))
        }
        console.log(P)
        return [P,R]
    }
