//1.1.3.js (Ejemplo de nombre de archivo)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Ecuaciones lineales 3x3 (Soluciones Enteras)';
}
export function tipo(){
  return 0;
}
export async function pregunta(numeroPregunta) { 
  try {
    return generaProblema3x3Entero(numeroPregunta+1);
  } catch (error) {
    console.error('Error al generar el problema:', error);
  }
}

// Función para calcular el determinante, necesaria para asegurar que el sistema tiene una única solución
function determinante3x3(m) {
    return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
           m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
           m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
}


function generaProblema3x3Entero(numeroPregunta){

    // ================== INICIO DE CAMBIOS PRINCIPALES ==================

    // 1. Definir primero las soluciones enteras deseadas en el rango de -10 a 10
    const solucion = {
        x: Math.round(Math.random() * 20 - 10),
        y: Math.round(Math.random() * 20 - 10),
        z: Math.round(Math.random() * 20 - 10)
    };

    // 2. Generar la matriz de coeficientes 'a' de 3x3
    const a = [
        [(Math.random()<0.5?1:-1)*Math.round(Math.random()*8+1), (Math.random()<0.5?1:-1)*Math.round(Math.random()*8+1), (Math.random()<0.5?1:-1)*Math.round(Math.random()*8+1)],
        [(Math.random()<0.5?1:-1)*Math.round(Math.random()*8+1), (Math.random()<0.5?1:-1)*Math.round(Math.random()*8+1), (Math.random()<0.5?1:-1)*Math.round(Math.random()*8+1)],
        [(Math.random()<0.5?1:-1)*Math.round(Math.random()*8+1), (Math.random()<0.5?1:-1)*Math.round(Math.random()*8+1), (Math.random()<0.5?1:-1)*Math.round(Math.random()*8+1)]
    ];

    // 3. Asegurar que el determinante no sea cero para que la solución sea única
    let D = determinante3x3(a);
    if(D == 0){
        a[0][0]++; // Modificamos un coeficiente para evitar D=0
        D = determinante3x3(a);
    }

    // 4. Calcular el vector de constantes 'b' usando las soluciones predefinidas
    // b = a * solucion
    const b = [
        a[0][0]*solucion.x + a[0][1]*solucion.y + a[0][2]*solucion.z,
        a[1][0]*solucion.x + a[1][1]*solucion.y + a[1][2]*solucion.z,
        a[2][0]*solucion.x + a[2][1]*solucion.y + a[2][2]*solucion.z
    ];

    // =================== FIN DE CAMBIOS PRINCIPALES ====================


    // 5. Seleccionar aleatoriamente la variable a resolver (0=x, 1=y, 2=z)
    const q = Math.floor(Math.random() * 3);
    const variable = q === 0 ? 'x' : (q === 1 ? 'y' : 'z');
    
    // 6. Construir la pregunta en formato LaTeX
    const P = `${numeroPregunta}.- Determine el valor de $${variable}$ en el siguiente sistema de ecuaciones: <br><center> $\\begin{array}{rcrcrcr} 
        ${a[0][0]}x & ${(a[0][1] > 0 ? '+' : '-')} & ${Math.abs(a[0][1])}y & ${(a[0][2] > 0 ? '+' : '-')} & ${Math.abs(a[0][2])}z & = & ${b[0]} \\\\ 
        ${a[1][0]}x & ${(a[1][1] > 0 ? '+' : '-')} & ${Math.abs(a[1][1])}y & ${(a[1][2] > 0 ? '+' : '-')} & ${Math.abs(a[1][2])}z & = & ${b[1]} \\\\
        ${a[2][0]}x & ${(a[2][1] > 0 ? '+' : '-')} & ${Math.abs(a[2][1])}y & ${(a[2][2] > 0 ? '+' : '-')} & ${Math.abs(a[2][2])}z & = & ${b[2]}
        \\end{array} $</center>`;

    // 7. Generar las opciones de respuesta
    const R=[];
    let respuestaCorrecta;
    switch(variable){
        case 'x': respuestaCorrecta = solucion.x; break;
        case 'y': respuestaCorrecta = solucion.y; break;
        case 'z': respuestaCorrecta = solucion.z; break;
    }

    R[0] = `$${respuestaCorrecta}$`; // La respuesta correcta es la que predefinimos

    // Generar respuestas incorrectas (distractores)
    for(let i=1;i<6;++i){
        let distractor;
        do {
            // Genera un entero cercano a la respuesta correcta
            distractor = respuestaCorrecta + (Math.random() < 0.5 ? -1: 1) * Math.round(Math.random() * 5 + 1);
        } while (R.includes(`$${distractor}$`)); // Evita que los distractores se repitan
        
        R[i] = `$${distractor}$`;
    }
    
    // La función de tu librería tlacuache probablemente reordene las respuestas
    return [P,R];
}