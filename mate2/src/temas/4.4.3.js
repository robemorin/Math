// 4.1.3.js (Ajuste de Parábola a tres puntos con respuesta abierta)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
    return 'Modelos - Parábola III (3 puntos)';
}

export function tipo(){
    return 3; // Tipo para preguntas de llenar el espacio
}

export async function pregunta(i, code, esImprimible=false) {
    try{
        // --- 1. Generación de la Solución (Coeficientes a, b, c) ---
        // Generamos los valores a_sol, b_sol y c_sol (entre -4 y 4, excluyendo 0)
        const a_sol = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 3 + 1); 
        const b_sol = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 3 + 1); 
        const c_sol = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 4 + 1); 

        // --- 2. Generación de los Puntos (x1, y1), (x2, y2), (x3, y3) ---
        let x = [0, 0, 0];
        // Aseguramos que x1, x2, x3 sean distintos y pequeños
        do {
            x[0] = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 3 + 1);
            x[1] = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 3 + 1);
            x[2] = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 3 + 1);
        } while (x[0] === x[1] || x[0] === x[2] || x[1] === x[2]);

        // Calcular las coordenadas y usando f(x) = a_sol * x^2 + b_sol * x + c_sol
        const y = x.map(xi => a_sol * (xi**2) + b_sol * xi + c_sol);

        // Formato de los puntos para la pregunta
        const punto1 = `${x[0]}, ${y[0]}`;
        const punto2 = `${x[1]}, ${y[1]}`;
        const punto3 = `${x[2]}, ${y[2]}`;
        
        // --- 3. Pregunta y HTML ---
        // Almacenamos los 6 parámetros necesarios para el cálculo en 'render': x1, y1, x2, y2, x3, y3.
        const Pregunta = `
            <div class="pregunta-abierta" 
                data-x1="${x[0]}" data-y1="${y[0]}" 
                data-x2="${x[1]}" data-y2="${y[1]}" 
                data-x3="${x[2]}" data-y3="${y[2]}"
                style="display: none;">
                <p>${i + 1}.- Calcule los coeficientes $a, b,$ y $c$ de la parábola $f(x) = ax^2+bx+c$ que pasa por los puntos $(${punto1})$, $(${punto2})$ y $(${punto3})$.</p>
                <p>$a = $<math-field id="math-field-${i}-0"></math-field>; $b = $<math-field id="math-field-${i}-1"></math-field>; $c = $<math-field id="math-field-${i}-2"></math-field> </p>
            </div>` 

        if(esImprimible){
            const respuesta = `a = ${a_sol}, b = ${b_sol}, c = ${c_sol}`;
            return [Pregunta, respuesta]
        }
        
        render()
        return Pregunta
        
    }catch (error){
        console.error('Error al cargar la pregunta:', error);
    }
}
export async function render(container, n, code) {
    window.accionR2P = function(i) {
        let totalPuntos = 3
        let puntos = 0
        let pregunta = document.getElementsByClassName('pregunta-abierta')
        const mathFields = pregunta[i].getElementsByTagName('math-field')
        
        // 1. OBTENER DATOS DEL HTML
        const x1 = Number(pregunta[i].dataset.x1);
        const y1 = Number(pregunta[i].dataset.y1);
        const x2 = Number(pregunta[i].dataset.x2);
        const y2 = Number(pregunta[i].dataset.y2);
        const x3 = Number(pregunta[i].dataset.x3);
        const y3 = Number(pregunta[i].dataset.y3);
        
        // --- 2. CÁLCULO DE LA SOLUCIÓN (Regla de Cramer para 3x3) ---
        const x1_sq = x1**2;
        const x2_sq = x2**2;
        const x3_sq = x3**2;

        // Función para calcular un determinante 3x3:
        // | M11 M12 M13 |
        // | M21 M22 M23 | = M11(M22*M33 - M32*M23) - M12(M21*M33 - M31*M23) + M13(M21*M32 - M31*M22)
        function det3x3(M11, M12, M13, M21, M22, M23, M31, M32, M33) {
            return M11 * (M22 * M33 - M32 * M23) - 
                   M12 * (M21 * M33 - M31 * M23) + 
                   M13 * (M21 * M32 - M31 * M22);
        }

        // Determinante principal (Matriz A de coeficientes [x^2, x, 1]):
        const detA = det3x3(x1_sq, x1, 1, 
                            x2_sq, x2, 1, 
                            x3_sq, x3, 1);

        // Determinante para a (Sustituir columna 1 con vector y)
        const detA_a = det3x3(y1, x1, 1, 
                              y2, x2, 1, 
                              y3, x3, 1);
        
        // Determinante para b (Sustituir columna 2 con vector y)
        const detA_b = det3x3(x1_sq, y1, 1, 
                              x2_sq, y2, 1, 
                              x3_sq, y3, 1);
        
        // Determinante para c (Sustituir columna 3 con vector y)
        const detA_c = det3x3(x1_sq, x1, y1, 
                              x2_sq, x2, y2, 
                              x3_sq, x3, y3);

        // La matriz A debe ser invertible (detA != 0).
        // Nuestros puntos están diseñados para evitar la colinealidad (que daría detA=0).
        if (Math.abs(detA) < 0.0001) {
             console.error("Error de diseño: Los puntos generados resultaron ser colineales (detA ≈ 0).");
             return [0, totalPuntos]; // Fallo si el determinante es ~0
        }

        const a_sol = detA_a / detA;
        const b_sol = detA_b / detA;
        const c_sol = detA_c / detA;
        
        // 3. OBTENER RESPUESTAS DEL USUARIO
        const Usuario_a = Number(mathFields[0].value);
        const Usuario_b = Number(mathFields[1].value);
        const Usuario_c = Number(mathFields[2].value);
        
        // 4. CALIFICACIÓN (Tolerancia de 0.0001)
        
        // Calificación para 'a'
        if(Math.abs(a_sol - Usuario_a) > 0.0001 || mathFields[0].value == ''){
            mathFields[0].style.backgroundColor = "red";
        } else {
            ++puntos
            mathFields[0].style.border = "solid 5px green";
        }
        
        // Calificación para 'b'
        if(Math.abs(b_sol - Usuario_b) > 0.0001 || mathFields[1].value == ''){
            mathFields[1].style.backgroundColor = "red";
        } else {
            ++puntos
            mathFields[1].style.border = "solid 5px green";
        }

        // Calificación para 'c'
        if(Math.abs(c_sol - Usuario_c) > 0.0001 || mathFields[2].value == ''){
            mathFields[2].style.backgroundColor = "red";
        } else {
            ++puntos
            mathFields[2].style.border = "solid 5px green";
        }
        
        return [puntos,totalPuntos]
    };
}