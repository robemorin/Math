import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Cuadráticas - Sustitución en fórmula general';
}

export function tipo(){
  return 0; // Opción múltiple
}

export async function pregunta(numeroPregunta){
  try{
    // Generar coeficientes enteros con a != 0
    let a=0,b=0,c=0;
    do{
      a = (Math.random()<0.5?1:-1)*(Math.floor(Math.random()*4)+1); // ±1..±4
      b = Math.floor(Math.random()*21)-10; // -10..10
      c = Math.floor(Math.random()*21)-10;
    }while(a===0)

    const poliPrint = tlacu.poli.print([a,b,c]);
    const P = `${numeroPregunta+1}.- Aplica la fórmula general y selecciona la sustitución correcta para la ecuación $f(x)=${poliPrint}$:`;

    // Construir la sustitución correcta (cerrando llaves en \sqrt y en \frac)
    const corr = `\\frac{${-b}\\pm\\sqrt{(${b})^2-4(${a})(${c})}}{2(${a})}`;

    const R = [];
    R[0] = `$x = ${corr}$`;

    // Generar distractores con errores comunes
    for(let i=1;i<6;++i){
      do{
        let tipoError = Math.floor(Math.random()*4);
        let opt;
        switch(tipoError){
          case 0:
            // signo de b mal (sin el -)
            opt = `\\frac{${-b}\\pm\\sqrt{(${b})^2-4(${a})(${c})}}{2(${a})}`;
            break;
          case 1:
            // discriminante con + en lugar de -
            opt = `\\frac{${-b}\\pm\\sqrt{(${b})^2+4(${a})(${c})}}{2(${a})}`;
            break;
          case 2:
            // denominador sin 2a
            opt = `\\frac{${-b}\\pm\\sqrt{(${b})^2-4(${a})(${c})}}{${a}}`;
            break;
          case 3:
            // quitar paréntesis en producto
            opt = `\\frac{${-b}\\pm\\sqrt{${b}^2-4${a}${c}}}{2${a}}`;
            break;
          default:
            // intercambiar a y c en el discriminante
            opt = `\\frac{${-b}\\pm\\sqrt{(${b})^2-4(${c})(${a})}}{2(${a})}`;
        }
        R[i] = `$x = ${opt}$`;
        if(tlacu.pregunta.hayRepetidos(R)){
            tipoError = Math.floor(Math.random()*2);
            let ae = a+ (tipoError==0?Math.round(10)-5:0), be = b+ (tipoError==1?Math.round(10)-5:0), ce = c+ (tipoError==2?Math.round(10)-5:0);
            opt = `\\frac{${-be}\\pm\\sqrt{(${be})^2-4(${ae})(${ce})}}{2(${ae})}`;
            R[i] = `$x = ${opt}$`;
        }
      }while(tlacu.pregunta.hayRepetidos(R))
    }

    return [P,R];
  }catch(error){
    console.error('Error al generar 6.2.2:', error);
  }
}
