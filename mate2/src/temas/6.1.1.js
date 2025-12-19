import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Cuadráticas - Evaluación (Encuentra y)';
}

export function tipo(){
  return 0;
}

export async function pregunta(i){
  try{
    // Coeficientes para ax^2 + bx + c
    const a = (Math.random()<0.5?1:-1)*(Math.floor(Math.random()*6)+1);
    const b = Math.floor(Math.random()*15)-7;
    const c = Math.floor(Math.random()*15)-7;
    const x = Math.floor(Math.random()*11)-5;

    const poliPrint = tlacu.poli.print([a,b,c]);
    const y = tlacu.poli.eval([a,b,c], x);

    const P = `${i+1}.- Para la función $f(x)= ${poliPrint}$, calcula $y$ cuando $x=${x}$.`;

    const R = [`$y = ${y}$`];

    // Generar distractores (errores comunes)
    for(let k=1;k<6;++k){
      do{
        const tipoError = Math.floor(Math.random()*4);
        let val;
        if(tipoError===0){
          // Olvidar el cuadrado
          val = a*x + b*x + c;
        }else if(tipoError===1){
          // Signo en c cambiado
          val = a*x*x + b*x - c;
        }else if(tipoError===2){
          // Off-by-one en x^2
          val = a*(x+1)*(x+1) + b*x + c;
        }else{
          // Perturbación aleatoria
          val = y + (Math.floor(Math.random()*11)-5);
        }
        R[k] = `$y = ${val}$`;
      }while(tlacu.pregunta.hayRepetidos(R))
    }

    return [P,R];
  }catch(error){
    console.error('Error al generar pregunta 6.1.1:', error);
  }
}
