import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Cuerpos Geométricos en el Espacio (Pirámide y Cono)";
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("3.1.22", "3. Geometría y trigonometría", "Ficha: Cuerpos Geométricos en el Espacio (Pirámide y Cono)");

    // ==========================================
    // EJERCICIO 1: PIRÁMIDE DE BASE CUADRADA (10 PUNTOS)
    // ==========================================
    const configsPiramide = [
        { L: 10, H: 12, apex_x: 5, apex_y: 5, MD: 13, volumen: 400, area_lat: 260, area_tot: 360 },
        { L: 6, H: 4, apex_x: 3, apex_y: 3, MD: 5, volumen: 48, area_lat: 60, area_tot: 96 }
    ];
    const cfgP = configsPiramide[Math.floor(Math.random() * configsPiramide.length)];

    const O = { x: 0, y: 0, z: 0 };
    const A = { x: cfgP.L, y: 0, z: 0 };
    const B = { x: cfgP.L, y: cfgP.L, z: 0 };
    const C = { x: 0, y: cfgP.L, z: 0 };
    const D = { x: cfgP.apex_x, y: cfgP.apex_y, z: cfgP.H };

    const M = { x: cfgP.L, y: cfgP.L / 2, z: 0 };

    html += `
    <div class="seccion-title">I. Pirámide de Base Cuadrada</div>
    <div class="exercise-step">
        <div class="contexto-especial">
            <strong>Instrucciones:</strong> Lea detenidamente los problemas que se presentan a continuación. Interprete los datos geométricos espaciales provistos y resuelva de manera analítica en los espacios asignados. No se proporcionan diagramas, por lo que se recomienda realizar bocetos propios.
        </div>
        <p><strong>1.</strong> Una pirámide de base cuadrada tiene los vértices de su base en los puntos coordenados $O(${O.x}, ${O.y}, ${O.z})$, $A(${A.x}, ${A.y}, ${A.z})$, $B(${B.x}, ${B.y}, ${B.z})$ y $C(${C.x}, ${C.y}, ${C.z})$. La cúspide (ápice) de la pirámide se ubica en el punto $D(${D.x}, ${D.y}, ${D.z})$.</p>
        <ol class="FT_ol_a">
            <li>Verifique analíticamente que la cúspide $D$ de la pirámide se encuentra directamente sobre el centro de la base cuadrada. <span class="mark">2</span><tlacuache-renglon n="4" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule el volumen total de la pirámide. <span class="mark">2</span><tlacuache-renglon n="5" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Si $M$ es el punto medio del segmento de la base $[AB]$, halle sus coordenadas y calcule la longitud de la altura de la cara lateral $[MD]$. <span class="mark">4</span><tlacuache-renglon n="8" color="#f9f9f9"></tlacuache-renglon></li>
            <li>A partir de lo anterior, calcule el área de la superficie total de la pirámide. <span class="mark">2</span><tlacuache-renglon n="6" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 3.1.22:</b><br><br>
        <b>1. Pirámide de Base Cuadrada [10 Puntos]:</b><br>
        <b>a) Verificación del centro de la base [2 puntos]:</b><br>
        * Las esquinas opuestas de la base cuadrada de lado $L = ${cfgP.L}$ son $O(0,0,0)$ y $B(${cfgP.L}, ${cfgP.L}, 0)$.<br>
        * El punto medio (centro del cuadrado) es: $Centro = \\left(\\frac{0 + ${cfgP.L}}{2}, \\frac{0 + ${cfgP.L}}{2}, \\frac{0 + 0}{2}\\right) = (${cfgP.apex_x}, ${cfgP.apex_y}, 0)$. [1 punto]<br>
        * Las coordenadas de la cúspide son $D(${cfgP.apex_x}, ${cfgP.apex_y}, ${cfgP.H})$. Dado que las coordenadas $x$ e $y$ de $D$ coinciden con el centro de la base, el ápice se encuentra directamente sobre el centro de la base cuadrada a una altura de $H = ${cfgP.H}$. [1 punto]<br><br>
        
        <b>b) Volumen de la pirámide [2 puntos]:</b><br>
        * Área de la base cuadrada: $A_{\\text{base}} = L^2 = ${cfgP.L}^2 = ${cfgP.L * cfgP.L}$ [1 punto]<br>
        * Volumen: $V = \\frac{1}{3} \\cdot ${cfgP.L * cfgP.L} \\cdot ${cfgP.H} = \\mathbf{${cfgP.volumen}\\text{ unidades}^3}$. [1 punto]<br><br>

        <b>c) Coordenadas de $M$ y longitud de $[MD]$ [4 puntos]:</b><br>
        * Punto medio de $[AB]$ con $A(${cfgP.L}, 0, 0)$ y $B(${cfgP.L}, ${cfgP.L}, 0)$:<br>
        $M = \\left(\\frac{${cfgP.L} + ${cfgP.L}}{2}, \\frac{0 + ${cfgP.L}}{2}, 0\\right) = \\mathbf{(${M.x}, ${M.y}, 0)}$ [2 puntos]<br>
        * Distancia tridimensional $[MD]$ (altura lateral):<br>
        $MD = \\sqrt{(${cfgP.apex_x} - ${M.x})^2 + (${cfgP.apex_y} - ${M.y})^2 + (${cfgP.H} - 0)^2} = \\sqrt{(${cfgP.apex_x - M.x})^2 + 0^2 + ${cfgP.H}^2}$<br>
        $MD = \\sqrt{${(cfgP.apex_x - M.x)**2} + ${cfgP.H * cfgP.H}} = \\mathbf{${cfgP.MD}\\text{ unidades}}$. [2 puntos]<br><br>

        <b>d) Área de la superficie de la pirámide [2 puntos]:</b><br>
        * Área lateral (4 caras triangulares de base $L = ${cfgP.L}$ y altura de cara $MD = ${cfgP.MD}$):<br>
        $A_{\\text{lateral}} = 4 \\cdot \\left(\\frac{1}{2} \\cdot L \\cdot MD\\right) = 2 \\cdot ${cfgP.L} \\cdot ${cfgP.MD} = ${cfgP.area_lat}$ [1 punto]<br>
        * Área superficial total: $A_{\\text{total}} = A_{\\text{base}} + A_{\\text{lateral}} = ${cfgP.L * cfgP.L} + ${cfgP.area_lat} = \\mathbf{${cfgP.area_tot}\\text{ unidades}^2}$. [1 punto]<br><br>
    `;

    // ==========================================
    // EJERCICIO 2: CONO EN TRES DIMENSIONES (10 PUNTOS)
    // ==========================================
    const configsConoLimpios = [
        { px: 4, py: 3, R: 5, H: 12, g: 13, vol_exact: 100, area_exact: 90 },
        { px: 3, py: 4, R: 5, H: 12, g: 13, vol_exact: 100, area_exact: 90 },
        { px: 8, py: 6, R: 10, H: 24, g: 26, vol_exact: 800, area_exact: 360 }
    ];
    const cfgC = configsConoLimpios[Math.floor(Math.random() * configsConoLimpios.length)];

    html += `
    <div class="seccion-title">II. Cono en Tres Dimensiones</div>
    <div class="exercise-step">
        <p><strong>2.</strong> La base circular de un cono recto se encuentra sobre el plano cartesiano $X-Y$ y está centrada en el origen $(0, 0, 0)$. Se sabe que el punto $P(${cfgC.px}, ${cfgC.py}, 0)$ se sitúa sobre la circunferencia de la base, y la cúspide (ápice) del cono está ubicada en el punto $(0, 0, ${cfgC.H})$.</p>
        <ol class="FT_ol_a">
            <li>Halle la longitud del radio de la base del cono circular. <span class="mark">2</span><tlacuache-renglon n="5" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Determine el volumen exacto del cono en términos de $\\pi$. <span class="mark">2</span><tlacuache-renglon n="5" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule la longitud de la generatriz (altura inclinada) del cono. <span class="mark">3</span><tlacuache-renglon n="6" color="#f9f9f9"></tlacuache-renglon></li>
            <li>Calcule el área total de la superficie del cono, expresando su resultado en forma exacta en términos de $\\pi$. <span class="mark">3</span><tlacuache-renglon n="6" color="#f9f9f9"></tlacuache-renglon></li>
        </ol>
    </div><div class="page-break"></div>
    `;

    solucion += `
        <b>2. Cono en Tres Dimensiones [10 Puntos]:</b><br>
        <b>a) Radio de la base del cono [2 puntos]:</b><br>
        * El radio es la distancia del origen $(0,0,0)$ al punto en la circunferencia $P(${cfgC.px}, ${cfgC.py}, 0)$:<br>
        $R = \\sqrt{(${cfgC.px} - 0)^2 + (${cfgC.py} - 0)^2 + 0^2} = \\sqrt{${cfgC.px}^2 + ${cfgC.py}^2} = \\mathbf{${cfgC.R}\\text{ unidades}}$. [2 puntos]<br><br>

        <b>b) Volumen exacto del cono [2 puntos]:</b><br>
        * Fórmula del volumen: $V = \\frac{1}{3} \\pi R^2 H$<br>
        * Sustituyendo $R = ${cfgC.R}$ y $H = ${cfgC.H}$:<br>
        $V = \\frac{1}{3} \\pi \\cdot (${cfgC.R})^2 \\cdot ${cfgC.H} = \\mathbf{${cfgC.vol_exact}\\pi\\text{ unidades}^3}$. [2 puntos]<br><br>

        <b>c) Generatriz (altura inclinada) del cono [3 puntos]:</b><br>
        * La generatriz $g$ es la distancia desde el ápice $(0,0,${cfgC.H})$ a $P(${cfgC.px}, ${cfgC.py}, 0)$:<br>
        $g = \\sqrt{(${cfgC.px} - 0)^2 + (${cfgC.py} - 0)^2 + (0 - ${cfgC.H})^2} = \\sqrt{${cfgC.px}^2 + ${cfgC.py}^2 + ${cfgC.H}^2}$<br>
        $g = \\sqrt{R^2 + H^2} = \\sqrt{${cfgC.R}^2 + ${cfgC.H}^2} = \\sqrt{${cfgC.R * cfgC.R + cfgC.H * cfgC.H}} = \\mathbf{${cfgC.g}\\text{ unidades}}$. [3 puntos]<br><br>

        <b>d) Área superficial total del cono [3 puntos]:</b><br>
        * Área lateral: $A_{\\text{lateral}} = \\pi R g = \\pi \\cdot ${cfgC.R} \\cdot ${cfgC.g} = ${cfgC.R * cfgC.g}\\pi$<br>
        * Área base circular: $A_{\\text{base}} = \\pi R^2 = \\pi \\cdot ${cfgC.R}^2 = ${cfgC.R * cfgC.R}\\pi$<br>
        * Área total: $A_{\\text{total}} = A_{\\text{base}} + A_{\\text{lateral}} = ${cfgC.R * cfgC.R}\\pi + ${cfgC.R * cfgC.g}\\pi = \\mathbf{${cfgC.area_exact}\\pi\\text{ unidades}^2}$. [3 puntos]
    </div>
    `;

    return [html, solucion];
}
