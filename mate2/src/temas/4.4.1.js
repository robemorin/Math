// 4.1.1.js (Ajuste de Parábola a dos puntos con coeficiente 'b' dado)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
    return 'Modelos - Parábola';
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
    // --- 1. Generación de la Solución (Coeficientes a y c, y parámetro b) ---
    
    // Coeficientes a y c que serán la respuesta correcta (entre -5 y 5, excluyendo 0)
    const a_sol = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 4 + 1); 
    const c_sol = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 5 + 1); 
    
    // Coeficiente b (dado en la pregunta)
    const b_dado = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 5 + 1); 

    // --- 2. Generación de los Puntos (x1, y1) y (x2, y2) ---
    
    // Coordenadas x1 y x2 (diferentes entre -3 y 3, excluyendo 0)
    let x1 = 0;
    let x2 = 0;
    do {
        x1 = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 2 + 1);
        x2 = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 2 + 1);
    } while (x1 === x2);

    // Calcular las coordenadas y1 y y2 usando la solución (a_sol, b_dado, c_sol)
    // f(x) = a_sol * x^2 + b_dado * x + c_sol
    const y1 = a_sol * (x1**2) + b_dado * x1 + c_sol;
    const y2 = a_sol * (x2**2) + b_dado * x2 + c_sol;

    // Formateo de los puntos para la pregunta
    const puntoA = `${x1}, ${y1}`;
    const puntoB = `${x2}, ${y2}`;

    // --- 3. Pregunta ---
    // Usamos el formato solicitado por el usuario
    const P = `Obtenga los valores de $a$ y $c$ que se ajustan al modelo $f(x) = ax^2+bx+c$ conociendo que $b=${b_dado}$ que pasa por los puntos $(${puntoA})$ y $(${puntoB})$.`;

    // --- 4. Respuestas ---
    const R = [];
    const a_sol_print = tlacu.poli.print([a_sol]);
    const c_sol_print = tlacu.poli.print([c_sol]);

    // Respuesta Correcta R[0]
    R[0] = `$a = ${a_sol_print}, c = ${c_sol_print}$`;

    // Generar 5 respuestas incorrectas variando a y/o c
    const sols = [a_sol, c_sol];
    for (let i = 1; i < 6; ++i) {
        let a_temp = [...sols];
        let ran_sign;
        
        // Decide qué coeficiente variar (0=a, 1=c) o variar ambos
        const indexToVary = Math.floor(Math.random() * 2); // 0 o 1
        const varyBoth = Math.random() < 0.3; // 30% de probabilidad de variar ambos

        do {
            a_temp = [...sols]; // Reset al valor correcto

            // Varia el primer coeficiente
            ran_sign = (Math.random() < 0.5 ? 1 : -1);
            a_temp[indexToVary] = ran_sign * Math.round(Math.random() * 4 + 1);
            
            // Varia el segundo coeficiente si aplica
            if (varyBoth) {
                const otherIndex = 1 - indexToVary;
                ran_sign = (Math.random() < 0.5 ? 1 : -1);
                a_temp[otherIndex] = ran_sign * Math.round(Math.random() * 5 + 1);
            }

            const a_temp_print = tlacu.poli.print([a_temp[0]]);
            const c_temp_print = tlacu.poli.print([a_temp[1]]);
            
            R[i] = `$a = ${a_temp_print}, c = ${c_temp_print}$`;

        } while (tlacu.pregunta.hayRepetidos(R) || (a_temp[0] === a_sol && a_temp[1] === c_sol));
    }

    return [P, R];
}