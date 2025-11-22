import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
    return 'Forma polar/exponencial a forma cartesiana de números complejos';
}

export function tipo(){
    return 0; // Opción múltiple
}

export async function pregunta(numeroPregunta) { 
    try {
    return PP(numeroPregunta); // Llamamos a la nueva función PP

    } catch (error) {
        console.error('Error al cargar la pregunta:', error);
        return [`${numeroPregunta+1}.- Error al generar la pregunta.`, ["Error"]];
    }
}

/**
 * Genera la pregunta de Polar/Exponencial a Cartesiana
 */
function PP(numeroPregunta){
    const r = (Math.random() * 19 + 1).toFixed(2); 
    const theta_deg = (Math.random() * 360 - 180).toFixed(2); 

    
    const P = `${numeroPregunta+1}.- Exprese a $${r}e^{${theta_deg}°j}$ en forma cartesiana $a + bj$`;

    
    const theta_rad = theta_deg * (Math.PI / 180);
    const a = (r * Math.cos(theta_rad)).toFixed(2);
    const b = (r * Math.sin(theta_rad)).toFixed(2);

    const R = [];
    R[0] = `$${a} ${b < 0 ? '-' : '+'} ${Math.abs(b)}j$`;

    const op = Math.round(Math.random()); 

    for(let i=1; i<6; ++i){
        let a_fake, b_fake;
    do{
            // Usamos la misma lógica de distracción que el código original:
            // Modificamos aleatoriamente 'a' o 'b', pero no ambos.
            // eval() es necesario porque 'a' y 'b' son strings (por .toFixed(2))
         a_fake = (eval(a) + (op === 0 ? 0 : 1) * 3 * (Math.random() - 0.5)).toFixed(2);
         b_fake = (eval(b) + (op === 0 ? 1 : 0) * 3 * (Math.random() - 0.5)).toFixed(2);
            
            // Formatear la opción falsa
        R[i] = `$${a_fake} ${b_fake < 0 ? '-' : '+'} ${Math.abs(b_fake)}j$`;

        // Asegurarse de que no haya opciones repetidas
        } while(tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R];
}