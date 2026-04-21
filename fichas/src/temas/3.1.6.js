import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

// Fuente original: [34].pdf - Geometría y trigonometría, superficie y volumen
export function name() {
    return 'Cálculo de Volúmenes y Áreas';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Parámetros dinámicos para los problemas
    let r_cyl = Math.floor(Math.random() * 10) + 5;
    let h_cyl = Math.floor(Math.random() * 20) + 10;
    
    let base_tri = Math.floor(Math.random() * 8) + 4;
    let h_tri = Math.floor(Math.random() * 6) + 3;
    let l_prism = Math.floor(Math.random() * 15) + 10;

    let Pregunta = `<div class="problema2">
    <h3>Práctica: Geometría de Sólidos (Tiempo estimado: 40 min)</h3>
    <p>Resuelva los siguientes ejercicios mostrando sus procedimientos. Asegúrese de incluir las unidades correspondientes.</p>
    
    <ol class="FT_ol_a">
        <li><b>Cilindros y prismas:</b> Un cilindro tiene un radio de $${r_cyl} \\text{ mm}$ y una altura de $${h_cyl} \\text{ mm}$. Calcule su volumen.
        ${CR(2)}</li>
        
        <li><b>Prisma triangular:</b> Un prisma tiene una base triangular con base $b = ${base_tri} \\text{ cm}$ y altura $h = ${h_tri} \\text{ cm}$. Si la longitud del prisma es de $${l_prism} \\text{ cm}$, halle el volumen total.
        ${CR(2)}</li>
        
        <li><b>Contexto real:</b> Se tiene un recipiente cilíndrico de radio $r = 20 \\text{ cm}$ y altura $H = 7 \\text{ cm}$. Se vierte una mezcla cuya altura inicial es de $2 \\text{ cm}$. Tras la cocción, la altura de la mezcla llega a $1.5 \\text{ cm}$ del borde superior. 
        <ol>
            <li>Calcule el volumen de la mezcla inicial. ${CR(1)}</li>
            <li>Calcule el volumen final tras la cocción. ${CR(1)}</li>
            <li>Determine el porcentaje de cambio en el volumen. ${CR(2)}</li>
        </ol></li>
        
        <li><b>Análisis de formas:</b> Observe el siguiente prisma base. Si el área de la cara transversal es de $25 \\text{ m}^2$ y su longitud es de $8 \\text{ m}$, ¿cuál es su volumen? 
        ${CR(2)}</li>
    </ol>
    </div>
    <div class="page"></div>`;

    let vol_cyl = (Math.PI * Math.pow(r_cyl, 2) * h_cyl).toFixed(2);
    let vol_prism = (0.5 * base_tri * h_tri * l_prism).toFixed(2);
    let vol_mix_init = (Math.PI * Math.pow(20, 2) * 2).toFixed(2);
    let vol_mix_final = (Math.PI * Math.pow(20, 2) * (7 - 1.5)).toFixed(2);
    let pct = (((vol_mix_final - vol_mix_init) / vol_mix_init) * 100).toFixed(1);

    let Solucion = `<div class="ans">
    <b>Soluciones:</b><br>
    1. $V = \\pi \\cdot (${r_cyl})^2 \\cdot ${h_cyl} \\approx ${vol_cyl} \\text{ mm}^3$<br>
    2. $V = (0.5 \\cdot ${base_tri} \\cdot ${h_tri}) \\cdot ${l_prism} = ${vol_prism} \\text{ cm}^3$<br>
    3. (a) $V_i = \\pi \\cdot 20^2 \\cdot 2 \\approx ${vol_mix_init} \\text{ cm}^3$ (b) $V_f = \\pi \\cdot 20^2 \\cdot 5.5 \\approx ${vol_mix_final} \\text{ cm}^3$ (c) Cambio = ${pct}\\% $<br>
    4. $V = \\text{Área} \\cdot L = 25 \\cdot 8 = 200 \\text{ m}^3$
    </div>`;

    return [Pregunta, Solucion];
}