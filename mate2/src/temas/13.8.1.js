// 5.1.1.js (Integral Definida de Polinomio Cúbico - Paso a Paso)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
    return 'Integral Definida Paso a Paso';
}

export function tipo(){
    return 3; // Tipo para preguntas de llenar el espacio
}

// Función auxiliar para calcular la antiderivada (Primitiva F(x))
function getAntiderivative(poli) {
    // Si poli = [a, b, c, d] (a*x^3 + b*x^2 + c*x + d)
    // Antiderivada F(x) = [a/4, b/3, c/2, d, C] (aunque C es 0 para la integral definida)
    const ant_poli = [];
    ant_poli[0] = poli[0] / 4; // Coeficiente x^4
    ant_poli[1] = poli[1] / 3; // Coeficiente x^3
    ant_poli[2] = poli[2] / 2; // Coeficiente x^2
    ant_poli[3] = poli[3];     // Coeficiente x^1 (constante d)
    ant_poli[4] = 0;           // La constante de integración (que ignoramos)
    return ant_poli;
}

// Función auxiliar para evaluar el polinomio en un punto
function evalPolinomio(poli, x) {
    // Polinomio [a, b, c, d] (ax^3 + bx^2 + cx + d)
    if (poli.length === 5) { // Si es la Antiderivada F(x) [a, b, c, d, 0]
        return poli[0]*x**4 + poli[1]*x**3 + poli[2]*x**2 + poli[3]*x;
    }
    // Polinomio original f(x) [a, b, c, d]
    return poli[0]*x**3 + poli[1]*x**2 + poli[2]*x + poli[3];
}


export async function pregunta(i, code, esImprimible=false) {
    try{
        // --- 1. Generación de Parámetros ---
        
        // Polinomio de 3er orden (ax^3 + bx^2 + cx + d)
        // Generamos coeficientes que suelen ser múltiplos de 4, 3, 2, 1 para obtener enteros
        const poli = [
            (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 4 + 1) * 4, // a (múltiplo de 4)
            (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 3 + 1) * 3, // b (múltiplo de 3)
            (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 2 + 1) * 2, // c (múltiplo de 2)
            (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 5 + 1)       // d
        ]; 
        
        // Límites de integración (enteros pequeños)
        let a_inf, b_sup;
        do {
            a_inf = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 2 + 1);
            b_sup = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 3 + 1);
        } while (a_inf === b_sup);

        // Aseguramos que 'a' sea el límite inferior y 'b' el superior para la notación
        if (a_inf > b_sup) [a_inf, b_sup] = [b_sup, a_inf];


        // --- 2. CÁLCULO DE LA SOLUCIÓN COMPLETA ---
        const F_x_coef = getAntiderivative(poli);
        
        // F(b)
        const F_b_sol = evalPolinomio(F_x_coef, b_sup);
        
        // F(a)
        const F_a_sol = evalPolinomio(F_x_coef, a_inf);
        
        // Área Final
        const Area_sol = F_b_sol - F_a_sol;
        
        // --- 3. Pregunta y HTML ---
        // Almacenamos los coeficientes de la Antiderivada y los límites en data-*
        const F_x_print = tlacu.poli.print(F_x_coef);
        
        const Pregunta = `
            <div class="pregunta-abierta" 
                data-fcoef="${F_x_coef.join(',')}" 
                data-a="${a_inf}" data-b="${b_sup}"
                data-Fb="${F_b_sol}" data-Fa="${F_a_sol}"
                data-area="${Area_sol}"
                style="display: none;">

                <p>${i + 1}.- Calcule el área bajo la curva de $f(x) = ${tlacu.poli.print(poli)}$ en el intervalo $[${a_inf}, ${b_sup}]$.</p>

                <p>a) Integre lo siguiente $\\int (${tlacu.poli.print(poli)}) dx = F(x) = $<math-field id="math-field-${i}-0"></math-field> + C</p>
                
                <p>b) Evalúe la integral $\\int_{${a_inf}}^{${b_sup}} f(x) dx = F(${b_sup}) - F(${a_inf}) = $<math-field id="math-field-${i}-1"></math-field> - <math-field id="math-field-${i}-2"></math-field></p>
                
                <p>c) Escriba el valor numérico de $\\int_{${a_inf}}^{${b_sup}} f(x) dx = $<math-field id="math-field-${i}-3"></math-field></p>
            </div>`;

        if(esImprimible){
            const respuesta = `F(x) = ${F_x_print}, F(b) = ${F_b_sol}, F(a) = ${F_a_sol}, Área = ${Area_sol}`;
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
        let totalPuntos = 4
        let puntos = 0
        let pregunta = document.getElementsByClassName('pregunta-abierta')
        const mathFields = pregunta[i].getElementsByTagName('math-field')
        const TOL = 0.01; // Tolerancia para números de punto flotante
        
        // 1. OBTENER SOLUCIONES Y ESTANDARIZAR F(x)
        const F_x_coef_array = pregunta[i].dataset.fcoef.split(',').map(Number);
        //const F_b_sol  = Number(pregunta[i].dataset.Fb);
        //const F_a_sol  = Number(pregunta[i].dataset.Fa);
        const F_b_sol = tlacu.poli.eval(F_x_coef_array, [Number(pregunta[i].dataset.b)]);
        const F_a_sol = tlacu.poli.eval(F_x_coef_array, [Number(pregunta[i].dataset.a)]);
        console.log(`${i+1}.- F_b_sol calculado: ${F_b_sol}`);
        const Area_sol = Number(pregunta[i].dataset.area);

        // Generar y estandarizar la solución canónica para F(x)
        const Fx_canonico = tlacu.poli.print(F_x_coef_array); 
        const caracteresAEliminar = /[ ,{,}]/g;
        const Fx_sol_estandarizada = Fx_canonico.replace(caracteresAEliminar, "");

        // 2. OBTENER RESPUESTAS DEL USUARIO
        const Usuario_F_x_raw = mathFields[0].value;
        const Usuario_F_x_estandarizada = Usuario_F_x_raw.replace(caracteresAEliminar, "");
        
        const Usuario_F_b = Number(mathFields[1].value);
        const Usuario_F_a = Number(mathFields[2].value);
        const Usuario_Area = Number(mathFields[3].value);

        // 3. CALIFICACIÓN

        // Campo 1: Antiderivada F(x) (COMPARACIÓN SIMBÓLICA)
        if (Fx_sol_estandarizada != Usuario_F_x_estandarizada || Usuario_F_x_raw == '') {
            mathFields[0].style.backgroundColor = "red";
        } else {
            ++puntos; // PUNTO GANADO POR LA EXPRESIÓN SIMBÓLICA
            mathFields[0].style.border = "solid 5px green";
        }
        
        // Campo 2: Evaluación Superior F(b) (NUMÉRICA)
        if (Math.abs(F_b_sol - Usuario_F_b) > TOL || mathFields[1].value == '' || isNaN(Usuario_F_b)) {
            mathFields[1].style.backgroundColor = "red";
        } else {
            ++puntos; // PUNTO GANADO POR F(b)
            mathFields[1].style.border = "solid 5px green";
        }

        // Campo 3: Evaluación Inferior F(a) (NUMÉRICA)
        if (Math.abs(F_a_sol - Usuario_F_a) > TOL || mathFields[2].value == '' || isNaN(Usuario_F_a)) {
            mathFields[2].style.backgroundColor = "red";
        } else {
            ++puntos; // PUNTO GANADO POR F(a)
            mathFields[2].style.border = "solid 5px green";
        }

        // Campo 4: Área Final (NUMÉRICA)
        if (Math.abs(Area_sol - Usuario_Area) > TOL || mathFields[3].value == '' || isNaN(Usuario_Area)) {
            mathFields[3].style.backgroundColor = "red";
        } else {
            ++puntos; // PUNTO GANADO POR EL ÁREA FINAL
            mathFields[3].style.border = "solid 5px green";
        }
        
        return [puntos,totalPuntos];
    };
}
