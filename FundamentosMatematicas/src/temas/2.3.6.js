// 2.3.6.js (Fracciones parciales V: Lineal Repetido y Cuadrático Irreducible)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
    return 'Fracciones parciales V Parte B';
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

function problema(numeroPregunta){
    // a = [A, B, C, D] (Numeradores de las 4 fracciones: A*x+B, C, D)
    let a = [];
    
    // ran_sign es un factor de signo (-1 o 1) para la generación de números aleatorios.
    // Usar un nombre distinto evita el conflicto con el arreglo de Respuestas 'R'.
    let ran_sign; 
    
    do{
        // Genera 4 coeficientes para los numeradores
        for(let k=0; k<4; ++k){
            ran_sign = (Math.random() < 0.5 ? 1 : -1);
            a[k] = ran_sign * Math.round(Math.random() * 9 + 1);
        }
    }while(a.every(val => val === 0)); // Asegura que no todos los numeradores sean cero

    // b = [b0, b1, r]
    // Factor cuadrático: (x+b0)^2 + b1, donde b1 > 0
    // Factor lineal: (x-r)^2
    const b = [	
        (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random()*3+1), // b0
        Math.round(Math.random()*8+1),                       // b1 (positivo)
        (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random()*3+1)  // r
    ] 
    
    const B0 = b[0];
    const B1 = b[1];
    let R = b[2];
    
    // C_quad = B0^2 + B1 (Término constante del trinomio irreducible)
    const C_quad = B0**2 + B1;
    const Q_coef = [1, 2*B0, C_quad]; // Coeficientes de Q(x)
    
    // R2 = R^2 
    const R2 = R**2;

    // --- CÁLCULO DEL NUMERADOR P(x) (Grado 3) ---
    // P(x) = (A x + B) * (x - R)^2 + C * Q(x) * (x - R) + D * Q(x)
    
    // Coeficiente x^3: 
    const P3 = a[0] + a[2];
    
    // Coeficiente x^2: 
    const P2 = (-2*R*a[0] + a[1]) + a[2]*(-R + 2*B0) + a[3];
    
    // Coeficiente x^1: 
    const P1 = (R2*a[0] - 2*R*a[1]) + a[2]*(-2*B0*R + C_quad) + 2*B0*a[3];
    
    // Coeficiente x^0: 
    const P0 = (R2*a[1]) + (-a[2]*C_quad*R) + C_quad*a[3];
    
    const num = [P3, P2, P1, P0]; 
    
    // Denominador: (Cuadrático Irreducible) * (Lineal)^2
    const R_den1 = tlacu.poli.print(Q_coef);
    const R_den2_lin = tlacu.poli.print([1, -R]);
    const Den = `(${R_den1})(${R_den2_lin})^2`;

    // Pregunta
    const P = `${numeroPregunta}.- Separe la siguiente expresión $\\frac{${tlacu.poli.print(num)}}{${Den}}$`;

    // Respuestas (R es inicializado correctamente aquí)
    R = []; 
    const R_correct_num1 = tlacu.poli.print([a[0], a[1]]); 
    const R_correct_num2 = tlacu.poli.print([a[2]]);      
    const R_correct_num3 = tlacu.poli.print([a[3]]);      

    // LINEA 88 (Anteriormente conflictiva): R[0]
    R[0]=`$ \\frac{${R_correct_num1}}{${R_den1}}+\\frac{${R_correct_num2}}{${R_den2_lin}}+\\frac{${R_correct_num3}}{(${R_den2_lin})^2}$`;
    
    // Generar 5 respuestas incorrectas
    for(let i=1; i<6; ++i){
        // Elige un índice para variar (0, 1, 2 o 3)
        const index = Math.floor(Math.random()*4); 
        
        do{
            let a_temp = [...a]; 
            // Genera un nuevo valor para el coeficiente seleccionado
            ran_sign = (Math.random() < 0.5 ? 1 : -1);
            a_temp[index] = ran_sign * Math.round(Math.random() * 9 + 1);
            
            const R_temp_num1 = tlacu.poli.print([a_temp[0], a_temp[1]]);
            const R_temp_num2 = tlacu.poli.print([a_temp[2]]);
            const R_temp_num3 = tlacu.poli.print([a_temp[3]]);
            
            R[i]=`$ \\frac{${R_temp_num1}}{${R_den1}}+\\frac{${R_temp_num2}}{${R_den2_lin}}+\\frac{${R_temp_num3}}{(${R_den2_lin})^2}$`;

        }while(tlacu.pregunta.hayRepetidos(R))
    }
    
    return [P,R];
}