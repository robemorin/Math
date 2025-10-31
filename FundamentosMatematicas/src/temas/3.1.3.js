// 3.1.3.js (Fracciones Parciales TIL - Denominador Cúbico Factorizado)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
    return 'Fracciones Parciales TIL (Denominador Cúbico)';
}

export function tipo(){
    return 0; // Opción múltiple
}

export async function pregunta(numeroPregunta) { 
    try {
        let P, R = [];
        const tipoFactorizacion = Math.random() < 0.5 ? 1 : 2; // 1: Lineales, 2: Cuadrático Irreducible

        if (tipoFactorizacion === 1) {
            // --- Caso 1: Tres Factores Lineales Distintos (x-a)(x-b)(x-c) ---
            
            // 1. Generar factores y coeficientes (A, B, C)
            let a, b, c; // Raíces
            do {
                a = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 3 + 1);
                b = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 3 + 1);
                c = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 3 + 1);
            } while (a === b || a === c || b === c);

            const A = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 5 + 1);
            const B = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 5 + 1);
            const C = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 5 + 1);

            // 2. Construir el Denominador
            const p2 = [1, -(a + b), a * b];
            const Den_coef = tlacu.conv(p2, [1, -c]);
            
            // 3. Construir el Numerador N(x)
            const c_lin_a = tlacu.conv([1, -b], [1, -c]); 
            const c_lin_b = tlacu.conv([1, -a], [1, -c]); 
            const c_lin_c = tlacu.conv([1, -a], [1, -b]); 

            // N_coef es de longitud 3 (grado 2)
            const N_coef = [0, 0, 0]; 
            for (let j = 0; j < 3; j++) { 
                N_coef[j] += A * c_lin_a[j];
                N_coef[j] += B * c_lin_b[j];
                N_coef[j] += C * c_lin_c[j];
            }

            // 4. Pregunta
            P = `${numeroPregunta+1}.- Determine los coeficientes de la fracción parcial: $\\frac{${tlacu.poli.print(N_coef)}}{${tlacu.poli.print(Den_coef)}}$`;

            // 5. Respuesta Correcta
            R[0] = `$ \\frac{${A}}{${tlacu.poli.print([1, -a])}}+\\frac{${B}}{${tlacu.poli.print([1, -b])}}+\\frac{${C}}{${tlacu.poli.print([1, -c])}}$`;
            
            // 6. Generar distractores (R[1] a R[5])
            const sols = [A, B, C];
            for(let i = 1; i < 6; ++i){
                do{
                    let a_temp = [...sols];
                    const index = Math.floor(Math.random() * 3); // Varia A, B o C
                    const ran_sign = (Math.random() < 0.5 ? 1 : -1);
                    a_temp[index] = ran_sign * Math.round(Math.random() * 5 + 1);

                    R[i] = `$ \\frac{${a_temp[0]}}{${tlacu.poli.print([1, -a])}}+\\frac{${a_temp[1]}}{${tlacu.poli.print([1, -b])}}+\\frac{${a_temp[2]}}{${tlacu.poli.print([1, -c])}}$`;
                } while (tlacu.pregunta.hayRepetidos(R));
            }


        } else {
            // --- Caso 2: Factor Cuadrático Irreducible ((x-a)^2+b^2)(x-c) ---
            
            // 1. Generar factores y coeficientes
            const a_sq = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 3 + 1); 
            const b_sq = Math.round(Math.random() * 3 + 1); 
            const c_lin = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 3 + 1); 
            const B_sq = b_sq**2; 
            
            const A = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 5 + 1); 
            const B = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 5 + 1); 
            const C = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 5 + 1); 

            // 2. Construir el Denominador
            const Q_poli = [1, -2 * a_sq, a_sq**2 + B_sq]; 
            const Den_coef = tlacu.conv(Q_poli, [1, -c_lin]); 

            // 3. Construir el Numerador N(x)
            const term1_coef = tlacu.conv([A, B], [1, -c_lin]); // (Ax+B)(x-c)
            const term2_coef = Q_poli.map(coef => C * coef);    // C*Q(x)

            // N_coef es de longitud 3 (grado 2)
            const N_coef = [0, 0, 0]; 
            N_coef[0] = term1_coef[0] + term2_coef[0]; 
            N_coef[1] = term1_coef[1] + term2_coef[1]; 
            N_coef[2] = term1_coef[2] + term2_coef[2]; 
            
            // 4. Pregunta
            P = `${numeroPregunta+1}.- Determine los coeficientes de la fracción parcial: $\\frac{${tlacu.poli.print(N_coef)}}{${tlacu.poli.print(Den_coef)}}$`;

            // 5. Respuesta Correcta
            R[0] = `$ \\frac{${tlacu.poli.print([A, B])}}{(${tlacu.poli.print([1, -a_sq])})^2+${B_sq}} + \\frac{${C}}{${tlacu.poli.print([1, -c_lin])}}$`;
            
            // 6. Generar distractores (R[1] a R[5])
            const sols = [A, B, C];
            for(let i = 1; i < 6; ++i){
                do{
                    let a_temp = [...sols];
                    const index = Math.floor(Math.random() * 3); // Varia A, B o C
                    const ran_sign = (Math.random() < 0.5 ? 1 : -1);
                    a_temp[index] = ran_sign * Math.round(Math.random() * 5 + 1);

                    R[i] = `$ \\frac{${tlacu.poli.print([a_temp[0], a_temp[1]])}}{(${tlacu.poli.print([1, -a_sq])})^2+${B_sq}} + \\frac{${a_temp[2]}}{${tlacu.poli.print([1, -c_lin])}}$`;
                } while (tlacu.pregunta.hayRepetidos(R));
            }
        }
        return [P, R];

    } catch (error) {
        console.error('Error al cargar la pregunta:', error);
        return [`${numeroPregunta+1}.- Error al generar la pregunta.`, ["Error"]];
    }
}