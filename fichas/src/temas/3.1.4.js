/* 
   Fuente original: [32].pdf 
   Módulo para práctica de Geometría (Superficie y Volumen) 
*/

import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Área de Superficie y Geometría Sólida';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Parámetros dinámicos
    let h_cyl = Math.floor(Math.random() * 10) + 5;
    let r_cyl = Math.floor(Math.random() * 5) + 3;
    let r_sph = Math.floor(Math.random() * 6) + 4;
    let r_cone = Math.floor(Math.random() * 5) + 3;
    let h_cone = Math.floor(Math.random() * 5) + 8;
    let s_cone = Math.sqrt(r_cone**2 + h_cone**2).toFixed(1);

    let Pregunta = `<div class="problema">
    <h3>Práctica: Superficie de sólidos</h3>
    <p>Resuelva los siguientes ejercicios. Muestre el procedimiento y la fórmula utilizada en cada caso.</p>
    
    <ol class="FT_ol_a">
        <li><b>Cilindro hueco:</b> Un cilindro sin tapas tiene una altura de $${h_cyl} \\text{ cm}$ y un radio de base de $${r_cyl} \\text{ cm}$. Calcule el área de su superficie lateral. <div>3</div></li>${CR(3)}
        
        <li><b>Esfera:</b> Calcule el área de la superficie total de una esfera de radio $${r_sph} \\text{ cm}$. Utilice $\\pi \\approx 3.14159$. <div>3</div></li>${CR(3)}
        
        <li><b>Cono:</b> Un cono tiene un radio de $${r_cone} \\text{ cm}$ y una altura vertical de $${h_cone} \\text{ cm}$.
            <ol style="list-style-type: lower-roman;">
                <li>Halle la longitud de la generatriz ($s$). <div>2</div></li>${CR(2)}
                <li>Halle el área de la superficie total (base + lateral). <div>3</div></li>${CR(3)}
            </ol>
        </li>
        
        <li><b>Contexto (Prisma Hexagonal):</b> Un prisma regular hexagonal tiene una altura de $38 \\text{ cm}$ y un lado de base de $8.5 \\text{ cm}$. Si el área de un hexágono regular se calcula como $A = \\frac{3\\sqrt{3}}{2} \times L^2$, calcule el área de superficie total del prisma. <div>5</div></li>${CR(5)}
    </ol>
    </div>`;

    // Cálculos para soluciones
    let sol_cyl = (2 * Math.PI * r_cyl * h_cyl).toFixed(1);
    let sol_sph = (4 * Math.PI * Math.pow(r_sph, 2)).toFixed(1);
    let sol_cone_lat = (Math.PI * r_cone * s_cone).toFixed(1);
    let sol_cone_base = (Math.PI * Math.pow(r_cone, 2)).toFixed(1);
    let sol_cone_tot = (parseFloat(sol_cone_lat) + parseFloat(sol_cone_base)).toFixed(1);
    
    let area_hex = ((3 * Math.sqrt(3) / 2) * Math.pow(8.5, 2)).toFixed(1);
    let perim_hex = (6 * 8.5).toFixed(1);
    let sol_hex = (2 * parseFloat(area_hex) + parseFloat(perim_hex) * 38).toFixed(1);

    let Solucion = `<div class="ans">
    <b>Soluciones:</b><br>
    1. Área lateral = $2\\pi rh = 2 \\cdot \\pi \\cdot ${r_cyl} \\cdot ${h_cyl} \\approx ${sol_cyl} \\text{ cm}^2$<br>
    2. Área esfera = $4\\pi r^2 = 4 \\cdot \\pi \\cdot ${r_sph}^2 \\approx ${sol_sph} \\text{ cm}^2$<br>
    3. (i) $s = \\sqrt{${r_cone}^2 + ${h_cone}^2} = ${s_cone} \\text{ cm}$. (ii) Total = $\\pi r s + \\pi r^2 \\approx ${sol_cone_tot} \\text{ cm}^2$<br>
    4. Total = $2 \\cdot Area_{hex} + Perimetro \\cdot h = 2(${area_hex}) + (${perim_hex} \\cdot 38) \\approx ${sol_hex} \\text{ cm}^2$
    </div>`;

    return [Pregunta, Solucion];
}