// 6.1.2.js (Área entre Curvas con GeoGebra - Polinomios Q y R)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import {desencriptar, encriptar, generarCodigo} from '../r2p_core.js'

export function name(){
    return 'Cálculo - Área entre Curvas II (Q y R)';
}

export function tipo(){
    return 3; 
}

// Función auxiliar para calcular la antiderivada F(x) de un polinomio de grado 2.
function getAntiderivativeArea(poli_diff) {
    // Si poli_diff = [a, b, c] (a*x^2 + b*x + c)
    // Antiderivada F(x) = [a/3, b/2, c, 0]
    const ant_poli = [];
    ant_poli[0] = poli_diff[0] / 3; // Coeficiente x^3
    ant_poli[1] = poli_diff[1] / 2; // Coeficiente x^2
    ant_poli[2] = poli_diff[2];     // Coeficiente x^1 (constante c)
    ant_poli[3] = 0;           
    return ant_poli;
}

export async function pregunta(i, code, esImprimible=false) {
    try{
        // 1. Generar raíces (a y b) que serán los límites de integración
        let a_inf, b_sup;
        do {
            a_inf = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 2 + 1);
            b_sup = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 3 + 1);
        } while (a_inf === b_sup);

        if (a_inf > b_sup) [a_inf, b_sup] = [b_sup, a_inf]; // Aseguramos que a < b

        // 2. Definir el Polinomio de la Diferencia Q(x) = s(x) - r(x)
        // Coeficiente principal k (múltiplo de 3 para simplificar la integral)
        const k = (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 2 + 1) * 3;
        
        // Coeficientes de Q(x) = [k, -k(a+b), k*a*b]
        const Q_poli = [
            k,                                       
            -k * (a_inf + b_sup),                    
            k * a_inf * b_sup                        
        ];

        // 3. Generar el Polinomio de Referencia r(x) y calcular s(x) = Q(x) + r(x)
        // r(x) = [r_a, r_b, r_c] (parábola simple)
        const r_poli = [
            (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 2 + 1),
            (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 3 + 1),
            (Math.random() < 0.5 ? 1 : -1) * Math.round(Math.random() * 5 + 1)
        ];
        
        // s(x) = Q(x) + r(x)
        const s_poli = [
            Q_poli[0] + r_poli[0], 
            Q_poli[1] + r_poli[1], 
            Q_poli[2] + r_poli[2]
        ];

        // 4. CÁLCULO DE SOLUCIONES (para la calificación)
        const F_x_coef = getAntiderivativeArea(Q_poli); // Antiderivada de Q(x)
        
        // Usamos tlacu.poli.eval para las evaluaciones
        const F_b_sol  = tlacu.poli.eval(F_x_coef, b_sup);
        const F_a_sol  = tlacu.poli.eval(F_x_coef, a_inf);
        const Area_sol = Math.abs(F_b_sol - F_a_sol);
        
        // --- 5. HTML de la Pregunta ---
        const F_x_print = tlacu.poli.print(F_x_coef);
        
        const Pregunta = `
            <div class="pregunta-abierta" 
                data-fcoef="${F_x_coef.join(',')}" 
                data-Qcoef="${Q_poli.join(',')}"
                data-a="${a_inf}" data-b="${b_sup}"
                data-Fb="${F_b_sol}" data-Fa="${F_a_sol}"
                data-area="${Area_sol}"
                style="display: none;">

                <p>${i + 1}.- Determine el área acotada por las curvas $s(x) = ${tlacu.poli.print(s_poli)}$ y $r(x) = ${tlacu.poli.print(r_poli)}$. Use la gráfica para deducir los límites de integración $a$ y $b$. (5 Puntos)</p>
                
                <div id="applet_container_${i}" class="ggb-container"></div>

                <p>a) Límites de integración (puntos de corte): $a = $<math-field id="math-field-${i}-0"></math-field>; $b = $<math-field id="math-field-${i}-1"></math-field> </p>
                
                <p>b) Función a integrar: $Q(x) = |s(x)-r(x)| = $<math-field id="math-field-${i}-2"></math-field></p>
                
                <p>c) $F(x) = \\int Q(x) dx = $<math-field id="math-field-${i}-3"></math-field> + C</p>

                <p>d) Evalúe $F(b) - F(a)$: $${tlacu.poli.print([F_b_sol])} - ${tlacu.poli.print([F_a_sol])} = $<math-field id="math-field-${i}-4"></math-field></p>
            </div>`;

        if(esImprimible){
            const Q_print = tlacu.poli.print(Q_poli);
            const F_x_print = tlacu.poli.print(F_x_coef);
            const respuesta = `a=${a_inf}, b=${b_sup}, Q(x)=${Q_print}, F(x)=${F_x_print}, Área=${Area_sol}`;
            return [Pregunta, respuesta]
        }
        
        // Llamar a render para inicializar GeoGebra
        render(null, 1, code, i, s_poli, r_poli, a_inf, b_sup)
        return Pregunta
        
    }catch (error){
        console.error('Error al carga la pregunta:', error);
    }
}

// --------------------------------------------------------------------------------------------------
// LÓGICA DE RENDER Y CALIFICACIÓN (Ajustada para 5 puntos)
// --------------------------------------------------------------------------------------------------

export async function render(container, n, code, i, s_poli, r_poli, a_inf, b_sup) {
    // Inicialización de GeoGebra (Solo si se llama con los polinomios)
    if (s_poli && r_poli) {
        const material_id = "efdp7g27"; 
        const params = {
            appName: 'classic',
            width: 600,
            height: 400,
            material_id,
            id: `ggbApplet_${i}`,
            appletOnLoad(api) {
                // Graficar s(x) y r(x)
                api.evalCommand(`f(x) = ${tlacu.poli.print(s_poli)}`);
                api.evalCommand(`q(x) = ${tlacu.poli.print(r_poli)}`);
                // Resaltar el área
                //api.evalCommand(`IntegralBetween[f, r, ${a_inf}, ${b_sup}]`);
                //api.setCoordSystem(-6, 6, -6, 12, true); 
            }
        };
        new GGBApplet(params, true).inject(`applet_container_${i}`);
    }

    // Lógica de Calificación
    window.accionR2P = function(i) {
        let totalPuntos = 5 // a, b, Q(x), F(x), Área
        let puntos = 0
        let pregunta = document.getElementsByClassName('pregunta-abierta')
        const mathFields = pregunta[i].getElementsByTagName('math-field')
        const TOL = 0.01; 
        const caracteresAEliminar = /[ ,{,}]/g;

        // 1. OBTENER SOLUCIONES REALES A PARTIR DE data-*
        const F_x_coef_array = pregunta[i].dataset.fcoef.split(',').map(Number);
        const Q_x_coef_array = pregunta[i].dataset.Qcoef.split(',').map(Number);
        const a_sol  = Number(pregunta[i].dataset.a);
        const b_sol  = Number(pregunta[i].dataset.b);
        const Area_sol = Number(pregunta[i].dataset.area);

        // Soluciones estandarizadas (simbólicas)
        const Qx_canonico = tlacu.poli.print(Q_x_coef_array); 
        const Qx_sol_estandarizada = Qx_canonico.replace(caracteresAEliminar, "");
        const Fx_canonico = tlacu.poli.print(F_x_coef_array); 
        const Fx_sol_estandarizada = Fx_canonico.replace(caracteresAEliminar, "");

        // 2. OBTENER RESPUESTAS DEL USUARIO
        const Usuario_a = Number(mathFields[0].value);
        const Usuario_b = Number(mathFields[1].value);
        const Usuario_Qx_raw = mathFields[2].value;
        const Usuario_Fx_raw = mathFields[3].value;
        const Usuario_Area = Number(mathFields[4].value);

        const Usuario_Qx_estandarizada = Usuario_Qx_raw.replace(caracteresAEliminar, "");
        const Usuario_Fx_estandarizada = Usuario_Fx_raw.replace(caracteresAEliminar, "");

        // 3. CALIFICACIÓN (5 PUNTOS)

        // Campo 1: Límite 'a' (Numérico)
        if (Math.abs(a_sol - Usuario_a) > TOL || mathFields[0].value == '' || isNaN(Usuario_a)) {
            mathFields[0].style.backgroundColor = "red";
        } else {
            ++puntos; 
            mathFields[0].style.border = "solid 5px green";
        }
        
        // Campo 2: Límite 'b' (Numérico)
        if (Math.abs(b_sol - Usuario_b) > TOL || mathFields[1].value == '' || isNaN(Usuario_b)) {
            mathFields[1].style.backgroundColor = "red";
        } else {
            ++puntos; 
            mathFields[1].style.border = "solid 5px green";
        }

        // Campo 3: Función a integrar Q(x) (SIMBÓLICA)
        if (Qx_sol_estandarizada != Usuario_Qx_estandarizada || Usuario_Qx_raw == '') {
            mathFields[2].style.backgroundColor = "red";
        } else {
            ++puntos; // PUNTO GANADO POR Q(x)
            mathFields[2].style.border = "solid 5px green";
        }
        
        // Campo 4: Antiderivada F(x) (SIMBÓLICA)
        if (Fx_sol_estandarizada != Usuario_Fx_estandarizada || Usuario_Fx_raw == '') {
            mathFields[3].style.backgroundColor = "red";
        } else {
            ++puntos; // PUNTO GANADO POR F(x)
            mathFields[3].style.border = "solid 5px green";
        }

        // Campo 5: Área Final (NUMÉRICA) - Es la evaluación F(b) - F(a)
        if (Math.abs(Area_sol - Usuario_Area) > TOL || mathFields[4].value == '' || isNaN(Usuario_Area)) {
            mathFields[4].style.backgroundColor = "red";
        } else {
            ++puntos; // PUNTO GANADO POR EL ÁREA FINAL
            mathFields[4].style.border = "solid 5px green";
        }
        
        return [puntos,totalPuntos];
    };
}