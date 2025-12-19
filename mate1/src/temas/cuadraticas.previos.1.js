import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
  return 'Evaluación de funciones cuadráticas';
}

export function tipo() {
  return 0;
  /*
  0 - Opción múltiple
  1 - Abierto
  2 - Geogebra
  3 - Híbrido
  */
}

export async function pregunta(numeroPregunta) {
  try {
    // Generar coeficientes para polinomio cuadrático: ax² + bx + c
    let a = Math.round(Math.random() * 6 + 1);  // a: 1-7 (no cero)
    let b = Math.round(Math.random() * 14 - 7); // b: -7 a 7
    let c = Math.round(Math.random() * 14 - 7); // c: -7 a 7
    
    // Valor de x para evaluar
    let x = Math.round(Math.random() * 10 - 5); // x: -5 a 5
    
    // Calcular y = ax² + bx + c
    let y = a * x * x + b * x + c;
    
    // Mostrar polinomio usando tlacu.poli.print
    const polinomio = tlacu.poli.print([a, b, c]);
    
    const P = `Find the value of $y$ for the given function $f(x) = ${polinomio}$ when $x = ${x}$.`;
    
    // Respuesta correcta
    const R = [`$y = ${y}$`];
    
    // Generar 5 opciones incorrectas variadas
    for (let i = 1; i < 6; ++i) {
      let incorrecta;
      do {
        // Generar errores comunes en la evaluación
        const tipoError = Math.floor(Math.random() * 3);
        
        switch(tipoError) {
          case 0:
            // Error: olvidar cuadrado en x²
            incorrecta = a * x + b * x + c;
            break;
          case 1:
            // Error: signo incorrecto
            incorrecta = a * x * x + b * x - c;
            break;
          case 2:
            // Error: cálculo erróneo del término x²
            incorrecta = a * (x + 1) * (x + 1) + b * x + c;
            break;
        }
        
        R[i] = `$y = ${incorrecta}$`;
      } while (tlacu.pregunta.hayRepetidos(R));
    }
    
    return [P, R];
    
  } catch (error) {
    console.error('Error loading pregunta:', error);
  }
}
