import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Cuadráticas - Raíces reales (Opción múltiple)';
}

export function tipo(){
  return 0;
}

export async function pregunta(numeroPregunta){
  try{
    // Generar raíces reales enteras distintas
    let r1, r2;
    do{
      r1 = Math.floor(Math.random()*21)-10; // -10..10
      r2 = Math.floor(Math.random()*21)-10;
    }while(r1===r2);

    // Crear polinomio monico (x - r1)(x - r2) = x^2 - (r1+r2)x + r1*r2
    const a = 1;
    const b = -(r1 + r2);
    const c = r1 * r2;

    const poliPrint = tlacu.poli.print([a,b,c]);
    const P = `${numeroPregunta+1}.- Dada la ecuación $f(x)= ${poliPrint}$, ¿cuáles son las raíces reales?`;

    const R = [];
    R[0] = `$x = ${r1}, ${r2}$`;

    // Generar distractores: pares de números distintos y evitar repeticiones
    for(let i=1;i<6;++i){
      do{
        const dr1 = Math.floor(Math.random()*21)-10;
        const dr2 = Math.floor(Math.random()*21)-10;
        R[i] = `$x = ${dr1}, ${dr2}$`;
      }while(tlacu.pregunta.hayRepetidos(R))
    }

    return [P,R];
  }catch(error){
    console.error('Error al generar 6.2.1:', error);
  }
}
