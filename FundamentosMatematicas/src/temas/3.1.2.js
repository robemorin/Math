// 3.1.2.js (Factorización de Polinomios de Orden 3 para Laplace)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
    return 'Factorización de Polinomios de Orden 3';
}

export function tipo(){
    return 0; // Opción múltiple
}

export async function pregunta(numeroPregunta) { 
    try {
        let P, R = [];
        const tipoFactorizacion =Math.random() < 0.5 ? 1 : 2; // 1: Lineales, 2: Cuadrático Irreducible

        if (tipoFactorizacion === 1) {
            // --- Caso 1: Tres Factores Lineales Distintos (x-a)(x-b)(x-c) ---
            
            // Raíces distintas y pequeñas
            let a, b, c;
            do {
                a = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 9 + 1);
                b = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 9 + 1);
                c = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 9 + 1);
            } while (a === b || a === c || b === c);
            if (a > b) [a, b] = [b, a];
            if (a > c) [a, c] = [c, a];
            if (b > c) [b, c] = [c, b];

            // 
            let Pol = [1, -(a + b), a * b];
            Pol = tlacu.conv(Pol, [1, -c]);
            
            // Formato de la respuesta correcta
            R[0] = `$(${tlacu.poli.print([1, -a])})(${tlacu.poli.print([1, -b])})(${tlacu.poli.print([1, -c])})$`;
            
            P = `${numeroPregunta+1}.- Factorice el polinomio $${tlacu.poli.print(Pol)}$:`;

            // Generar distractores (factorizaciones incorrectas)
            for(let i = 1; i < 6; ++i){
                do{
                    let d = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 4 + 1);
                    let e = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 4 + 1);
                    let f = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 4 + 1);
                    if (d>e) [d, e] = [e, d];
                    if (d>f) [d, f] = [f, d];
                    if (e>f) [e, f] = [f, e];
                    R[i] = `$(${tlacu.poli.print([1, -d])})(${tlacu.poli.print([1, -e])})(${tlacu.poli.print([1, -f])})$`;
                } while (tlacu.pregunta.hayRepetidos(R));
            }
            return [P, R];

        } else {
            // --- Caso 2: Factor Cuadrático Irreducible ((x-a)^2+b^2)(x-c) ---
            
            // Raíz real 'c' y parámetros de la cuadrática 'a' (desplazamiento) y 'b' (frecuencia/amplitud)
            const a_sq = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 3 + 1); // Desplazamiento 'a'
            const b_sq = Math.round(Math.random() * 3 + 1); // Término 'b' (siempre > 0)
            const c_lin = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 3 + 1); // Raíz real 'c'

            // Factor cuadrático: (x-a)^2 + b^2 = x^2 - 2ax + (a^2 + b^2)
            const a_sq_sq = a_sq**2;
            const b_sq_sq = b_sq**2;
            const p2 = [1, -2 * a_sq, a_sq_sq + b_sq_sq];
            
            // Polinomio final (x^2...) * (x-c)
            const p3_coef = tlacu.conv(p2, [1, -c_lin]);

            // Formato de la respuesta correcta
            R[0] = `$\\left((${tlacu.poli.print([1, -a_sq])})^2+${b_sq_sq}\\right)(${tlacu.poli.print([1, -c_lin])})$`;
            
            P = `${numeroPregunta+1}.- Factorice el polinomio $${tlacu.poli.print(p3_coef)}$:`;

            // Generar distractores (factorizaciones incorrectas)
            for(let i = 1; i < 6; ++i){
                do{
                    let d = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 4 + 1);
                    let e = Math.round(Math.random() * 4 + 1);
                    let f = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 4 + 1);
                    R[i] = `$\\left((${tlacu.poli.print([1, -d])})^2+${e**2}\\right)(${tlacu.poli.print([1, -f])})$`;
                } while (tlacu.pregunta.hayRepetidos(R));
            }
        }

        // Desordenar las respuestas y devolver [Pregunta, Respuestas]
        
        return [P, R];

    } catch (error) {
        console.error('Error al cargar la pregunta:', error);
        // Devolver una pregunta de error si algo falla
        return [`${numeroPregunta+1}.- Error al generar la pregunta.`, ["Error"]];
    }
}