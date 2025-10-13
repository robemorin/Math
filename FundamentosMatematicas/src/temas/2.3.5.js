// 2.3.5.js (Fracciones parciales IV: Factor cuadrático irreducible repetido)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
    return 'Fracciones parciales IV Parte A';
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
    // a = [A1, B1, A2, B2]
    let a = []
    do{
        // Generar coeficientes para los numeradores
        for(let k=0; k<4; ++k){
             a[k] = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 9 + 1);
        }
    }while((a[0] == 0 && a[1] == 0) && (a[2] == 0 && a[3] == 0)); // Asegura que no todos sean cero
    
    // b = [b0, b1] donde el factor irreducible es (x^2 + 2*b0*x + b0^2 + b1)
    // b0 (coeficiente x) debe ser distinto de cero
    // b1 debe ser positivo para asegurar que (x+b0)^2 + b1 sea irreducible
    const b = [	Math.round(Math.random()*3+1)*(Math.random()<0.5?1:-1), // b0
                Math.round(Math.random()*8+1)]                       // b1 (positivo)
    
    const b0 = b[0];
    const b1 = b[1];
    
    // Calculamos el numerador P(x) = (A1*x + B1)(x^2 + 2b0*x + b0^2 + b1) + (A2*x + B2)
    // Coeficientes del denominador cuadrático (Q(x) = x^2 + 2b0*x + b0^2 + b1)
    const Q_coef = [1, 2*b0, b0**2 + b1]; 

    // P(x) = (A1x+B1) * Q(x) + (A2x+B2)
    // Grado 3: A1 * 1 
    const num_g3 = a[0];
    // Grado 2: A1 * 2b0 + B1 * 1
    const num_g2 = a[0]*(2*b0) + a[1];
    // Grado 1: A1 * (b0^2 + b1) + B1 * 2b0 + A2
    const num_g1 = a[0]*(b0**2 + b1) + a[1]*(2*b0) + a[2];
    // Grado 0: B1 * (b0^2 + b1) + B2
    const num_g0 = a[1]*(b0**2 + b1) + a[3];
    
    const num = [num_g3, num_g2, num_g1, num_g0];
    
    // Denominador: (x^2 + 2b0*x + b0^2 + b1)^2
    const Den = `(${tlacu.poli.print(Q_coef)})^2`;

    // Pregunta
    const P = `Separe la siguiente expresión $\\frac{${tlacu.poli.print(num)}}{${Den}}$`;

    // Respuestas (la primera es la correcta)
    const R=[];
    R[0]=`$ \\frac{${tlacu.poli.print([a[0],a[1]])}}{${tlacu.poli.print(Q_coef)}}+\\frac{${tlacu.poli.print([a[2],a[3]])}}{(${tlacu.poli.print(Q_coef)})^2}$`;
    
    // Generar 5 respuestas incorrectas variando aleatoriamente uno de los 4 coeficientes A1, B1, A2, B2
    for(let i=1; i<6; ++i){
        // Elige un índice para variar (0, 1, 2 o 3)
        const index = Math.floor(Math.random()*4); 
        
        do{
            let a_temp = [...a]; // Copia de los coeficientes originales
            // Genera un nuevo valor para el coeficiente seleccionado
            a_temp[index] = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 9 + 1);
            
            R[i]=`$ \\frac{${tlacu.poli.print([a_temp[0], a_temp[1]])}}{${tlacu.poli.print(Q_coef)}}+\\frac{${tlacu.poli.print([a_temp[2], a_temp[3]])}}{(${tlacu.poli.print(Q_coef)})^2}$`;

        }while(tlacu.pregunta.hayRepetidos(R)); // Asegura que no se repitan las opciones
    }
    
    return [P,R];
}