// 4.1.2.js (Ajuste de Parábola a dos puntos con respuesta abierta - Solución en Render)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
    return 'Modelos - Parábola II';
}

export function tipo(){
    return 3; // Tipo para preguntas de llenar el espacio
}

export async function pregunta(i, code, esImprimible=false) {
    try{
        // --- 1. Generación de la Solución (Coeficientes a, c, y parámetro b) ---
        // Generamos los valores a_sol y c_sol, pero NO los guardamos en el HTML.
        const a_sol = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 4 + 1); 
        const c_sol = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 5 + 1); 
        const b_dado = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 5 + 1); 

        // --- 2. Generación de los Puntos (x1, y1) y (x2, y2) ---
        let x1 = 0;
        let x2 = 0;
        do {
            x1 = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 2 + 1);
            x2 = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 2 + 1);
        } while (Math.abs(x1) === Math.abs(x2));

        const y1 = a_sol * (x1**2) + b_dado * x1 + c_sol;
        const y2 = a_sol * (x2**2) + b_dado * x2 + c_sol;

        const puntoA = `${x1}, ${y1}`;
        const puntoB = `${x2}, ${y2}`;
        
        // --- 3. Pregunta y HTML ---
        // Almacenamos los 5 parámetros necesarios para el cálculo en 'render':
        // x1, y1, x2, y2, y el coeficiente b_dado.
        const Pregunta = `
            <div class="pregunta-abierta" 
                data-x1="${x1}" data-y1="${y1}" 
                data-x2="${x2}" data-y2="${y2}" 
                data-b="${b_dado}" style="display: none;">
                <p>${i + 1}.- El modelo $f(x) = ax^2+bx+c$  se sabe que $b=${b_dado}$ y pasa por los puntos $(${puntoA})$ y $(${puntoB})$. Calcule los valores de los coeficientes $a$ y $c$.</p>
                <p>$a = $<math-field id="math-field-${i}-0"></math-field>; $c = $<math-field id="math-field-${i}-1"></math-field> </p>
            </div>` 

        if(esImprimible){
            // Devolvemos la pregunta y la solución REAL (a_sol) para la impresión.
            // Para este formato, necesitarías decidir si devolver 'a', 'c', o ambos.
            // Devolveremos una cadena con ambos para fines de depuración/impresión.
            const respuesta = `a = ${a_sol}, c = ${c_sol}`;
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
        let totalPuntos = 2
        let puntos = 0
        let pregunta = document.getElementsByClassName('pregunta-abierta')
        const mathFields= pregunta[i].getElementsByTagName('math-field')
        
        // 1. OBTENER DATOS DEL HTML
        const x1 = Number(pregunta[i].dataset.x1);
        const y1 = Number(pregunta[i].dataset.y1);
        const x2 = Number(pregunta[i].dataset.x2);
        const y2 = Number(pregunta[i].dataset.y2);
        const b = Number(pregunta[i].dataset.b);
        
        // 2. CALCULAR LA SOLUCIÓN (Sistema de ecuaciones)
        // Ecuaciones reescritas:
        // (1) a*x1^2 + c = y1 - b*x1
        // (2) a*x2^2 + c = y2 - b*x2
        const K1 = y1 - b * x1;
        const K2 = y2 - b * x2;
        
        // Restamos (2) - (1) para eliminar c:
        // a*(x2^2 - x1^2) = K2 - K1
        // a = (K2 - K1) / (x2^2 - x1^2)
        const den_a = x2**2 - x1**2;
        // La división por cero se evita porque se garantiza que x1 != x2
        const a_sol = (K2 - K1) / den_a;

        // Sustituimos a en (1) para encontrar c:
        // c = K1 - a*x1^2
        const c_sol = K1 - a_sol * (x1**2);
        
        // 3. OBTENER RESPUESTAS DEL USUARIO
        // CORRECCIÓN CLAVE: mathFields[0] es 'a', mathFields[1] es 'c'
        const Usuario_a = Number(mathFields[0].value);
        const Usuario_c = Number(mathFields[1].value); // Se corrigió el índice aquí
        
        // 4. CALIFICACIÓN
        
        // Calificación para 'a'
        if(Math.abs(a_sol - Usuario_a) > 0.0001 || mathFields[0].value == '' || isNaN(Usuario_a)){
            mathFields[0].style.backgroundColor = "red";
        } else {
            ++puntos
            mathFields[0].style.border = "solid 5px green";
        }
        
        // Calificación para 'c'
        if(Math.abs(c_sol - Usuario_c) > 0.0001 || mathFields[1].value == ''){
            mathFields[1].style.backgroundColor = "red";
        } else {
            ++puntos
            mathFields[1].style.border = "solid 5px green";
        }
        
        return [puntos,totalPuntos]
    };
}