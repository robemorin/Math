import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Cuadráticas - Forma factorizada';
}

export function tipo(){
  return 0; // Opción múltiple
}

export async function pregunta(numeroPregunta){
  try{
    // Generar raíces reales enteras distintas
    let r1, r2;
    do{
      r1 = Math.floor(Math.random()*21)-10; // -10..10
      r2 = Math.floor(Math.random()*21)-10;
    }while(r1===r2);

    // Generar coeficiente principal a
    const a = (Math.random()<0.5?1:-1)*(Math.floor(Math.random()*4)+1); // ±1..±4

    // Forma correcta: a(x - r1)(x - r2)
    const poliPrint = tlacu.poli.print([a, -(a*(r1+r2)), a*r1*r2]);
    const P = `${numeroPregunta+1}.- Expresa $f(x)=${poliPrint}$ en forma factorizada:`;

    // Función auxiliar para formatear la forma factorizada
    const formatFactorizado = (coef, raiz1, raiz2) => {
      let resultado = '';
      
      if(coef === 1){
        resultado = '(x';
      } else if(coef === -1){
        resultado = '-(x';
      } else {
        resultado = `${coef}(x`;
      }
      
      // Primer factor (x - raiz1)
      if(raiz1 < 0){
        resultado += `+${Math.abs(raiz1)})`;
      } else {
        resultado += `-${raiz1})`;
      }
      
      // Segundo factor (x - raiz2)
      resultado += '(x';
      if(raiz2 < 0){
        resultado += `+${Math.abs(raiz2)})`;
      } else {
        resultado += `-${raiz2})`;
      }
      
      return resultado;
    };

    const R = [];
    const corr = formatFactorizado(a, r1, r2);
    R[0] = `$f(x) = ${corr}$`;

    // Generar distractores con errores comunes
    for(let i=1;i<6;++i){
      do{
        let tipoError = Math.floor(Math.random()*5);
        let opt;
        switch(tipoError){
          case 0:
            // Cambiar signo de a
            opt = formatFactorizado(-a, r1, r2);
            break;
          case 1:
            // Cambiar signo de una raíz
            const raizModif = Math.random()<0.5 ? -r1 : -r2;
            const otraRaiz = raizModif === -r1 ? r2 : r1;
            opt = formatFactorizado(a, raizModif, otraRaiz);
            break;
          case 2:
            // Intercambiar raíces (similar pero puede tener efecto visual)
            opt = formatFactorizado(a, r2, r1);
            break;
          case 3:
            // Cambiar a a 1
            opt = formatFactorizado(1, r1, r2);
            break;
          case 4:
          default:
            // Usar raíces completamente diferentes
            let dr1, dr2;
            do{
              dr1 = Math.floor(Math.random()*21)-10;
              dr2 = Math.floor(Math.random()*21)-10;
            }while(dr1===dr2 || dr1===r1 || dr2===r2);
            opt = formatFactorizado(a, dr1, dr2);
            break;
        }
        R[i] = `$f(x) = ${opt}$`;
      }while(tlacu.pregunta.hayRepetidos(R))
    }

    return [P, R];
  }catch(error){
    console.error('Error al generar 6.2.4:', error);
  }
}
