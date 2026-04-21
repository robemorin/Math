import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Ficha de Práctica: Densidad y Aplicaciones Geométricas';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Parámetros dinámicos
    let masa1 = Math.floor(Math.random() * 50) + 10;
    let vol1 = Math.floor(Math.random() * 20) + 2;
    let radio2 = (Math.random() * 5 + 1).toFixed(1);
    let masa2 = (Math.random() * 5 + 1).toFixed(2);
    let lado3 = Math.floor(Math.random() * 5) + 3;
    let densidad3 = (Math.random() * 2 + 1).toFixed(2);
    let masaGold = (Math.random() * 10 + 5).toFixed(2);
    
    let Pregunta = `<div class="problema2">
    <h3>Actividad: Análisis de Densidad</h3>
    <ol class="FT_ol_a">
        <li><b>Cálculo de densidad:</b> Una pieza de metal tiene una masa de $${masa1} \\text{ g}$ y ocupa un volumen de $${vol1} \\text{ cm}^3$. Calcule su densidad en $\\text{g cm}^{-3}$.<div>3</div></li>${CR(2)}
        
        <li><b>Geometría y densidad:</b> Una esfera tiene un radio de $${radio2} \\text{ cm}$ y una masa de $${masa2} \\text{ kg}$. 
        <br>a) Calcule el volumen de la esfera ($V = \\frac{4}{3}\\pi r^3$).
        <br>b) Determine su densidad en $\\text{g cm}^{-3}$ (Recuerde convertir kg a g). <div>6</div></li>${CR(3)}
        
        <li><b>Inversión de fórmulas:</b> Se tiene un bloque cúbico de arista $${lado3} \\text{ cm}$ y densidad $${densidad3} \\text{ g cm}^{-3}$. Calcule la masa del bloque. <div>4</div></li>${CR(2)}
        
        <li><b>Problema de contexto (Barra de Oro):</b> Una barra de oro con forma de prisma trapezoidal tiene una masa de $${masaGold} \\text{ kg}$. Si el volumen calculado mediante sus dimensiones es de $500 \\text{ cm}^3$, halle la densidad del oro e indique si el material es puro (densidad teórica aproximada del oro: $19.3 \\text{ g cm}^{-3}$). <div>5</div></li>${CR(4)}
        
        <li><b>Pensamiento Crítico:</b>
            <br>a) Si una sustancia se calienta, su volumen generalmente aumenta. ¿Cómo afecta esto a su densidad? Justifique usando la fórmula $\\rho = \\frac{m}{V}$.
            <br>b) El agua es inusual porque su densidad en estado sólido (hielo) es menor que en estado líquido. Mencione una observación de la vida cotidiana que confirme este fenómeno. <div>4</div></li>${CR(4)}
    </ol>
    </div>
    <div class="page"></div>`;

    let Solucion = `<div class="ans">
    <b>Soluciones sugeridas:</b><br>
    1. $\\rho = \\frac{${masa1}}{${vol1}} \\approx ${(masa1/vol1).toFixed(2)} \\text{ g cm}^{-3}$<br>
    2. a) $V = \\frac{4}{3}\\pi(${radio2})^3 \\approx ${(4/3 * Math.PI * Math.pow(radio2, 3)).toFixed(2)} \\text{ cm}^3$. b) $\\rho = \\frac{${masa2} \\times 1000}{V} \\approx ${((masa2*1000)/(4/3 * Math.PI * Math.pow(radio2, 3))).toFixed(2)} \\text{ g cm}^{-3}$<br>
    3. $V = ${lado3}^3 = ${Math.pow(lado3, 3)} \\text{ cm}^3$. $m = \\rho \\times V = ${densidad3} \\times ${Math.pow(lado3, 3)} = ${(densidad3 * Math.pow(lado3, 3)).toFixed(2)} \\text{ g}$<br>
    4. $\\rho = \\frac{${masaGold} \\times 1000}{500} = ${(masaGold * 1000 / 500).toFixed(2)} \\text{ g cm}^{-3}$. Comparación con $19.3$.<br>
    5. a) Al aumentar $V$ y mantener $m$ constante, la densidad disminuye. b) El hielo flota en el agua líquida.
    </div>`;

    return [Pregunta, Solucion];
}