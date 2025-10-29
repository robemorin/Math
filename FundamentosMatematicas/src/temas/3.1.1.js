// 3.1.1.js (Ajuste Cuadrático Irreducible: variable x)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
    return 'Fracciones parciales TIL';
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
    // 1. Generación de Coeficientes de la Respuesta (A y B)
    // Coeficientes A y B (para el coseno y seno amortiguados)
    const A = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 8 + 1); 
    const B = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 8 + 1); 
    
    // Parámetros del Denominador
    const b = Math.round(Math.random()*4 + 1) * (Math.random() < 0.5 ? 1 : -1); // 'b' de x+b
    const omega = Math.round(Math.random()*5 + 1);                            // 'omega' (siempre positivo)

    // 2. Construcción del Denominador X^2 + D1*X + D0
    // (x+b)^2 + omega^2  = x^2 + (2*b)x + (b^2 + omega^2)
    const D1 = 2 * b;
    const D0 = b**2 + omega**2;
    const Den_coef = [1, D1, D0];
    
    // 3. Construcción del Numerador N(X) = A*(x+b) + B*omega
    // N(X) = (A*x) + (A*b + B*omega)
    const N1 = A;
    const N0 = A*b + B*omega;
    const Num_coef = [N1, N0]; 

    // 4. Pregunta
    // Usamos 'x' en las funciones tlacu.poli.print
    const P = `Determine los coeficientes A y B que permiten reescribir la expresión $\\frac{${tlacu.poli.print(Num_coef, 'x')}}{${tlacu.poli.print(Den_coef, 'x')}}$ en la forma canónica $A \\cdot \\frac{x+a}{ (x+a)^2 + \\omega^2 } + B\\cdot \\frac{\\omega}{ (x+a)^2 + \\omega^2 }$.`;

    // 5. Respuestas
    const R=[];
    
    // Respuesta Correcta R[0]
    R[0]=`$ ${A} \\cdot \\frac{${tlacu.poli.print([1,b])}}{ (x+${b})^2 + ${omega}^2 } ${B<0?'':'+'} ${B} \\cdot \\frac{${omega}}{ (${tlacu.poli.print([1,b])})^2 + ${omega}^2 }$`;
    
    // 6. Generar 5 respuestas incorrectas variando A o B
    const a_resp = [A, B]; // Arreglo para manejar la variación
    for(let i=1; i<6; ++i){
        const index = Math.floor(Math.random()*2); // Varia A (0) o B (1)
        
        do{
            let a_temp = [...a_resp];
            
            // Genera un nuevo valor para el coeficiente seleccionado
            const ran_sign = (Math.random() < 0.5 ? 1 : -1);
            a_temp[index] = ran_sign * Math.round(Math.random() * 8 + 1);
            
            const A_temp = a_temp[0];
            const B_temp = a_temp[1];
            
            //R[i]=`$ ${tlacu.poli.print([A_temp])} \\frac{${tlacu.poli.print([1,b])}}{ (${tlacu.poli.print([1,b])})^2 + ${omega}^2 } + ${tlacu.poli.print([B_temp])} \\frac{${omega}}{ (${tlacu.poli.print([1,b])})^2 + ${omega}^2 }$`;
            R[i]= `$ ${A_temp} \\cdot \\frac{${tlacu.poli.print([1,b])}}{ (${tlacu.poli.print([1,b])})^2 + ${omega}^2 } ${B_temp<0?'':'+'} ${B_temp} \\cdot \\frac{${omega}}{ (${tlacu.poli.print([1,b])})^2 + ${omega}^2 }$`;

        }while(tlacu.pregunta.hayRepetidos(R))
    }
    
    return [P,R]
}