import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Puntos Máximos, Mínimos (Polinomiales, Radicales y Racionales)";
}

export function tipo() {
    return 1; // Abierta / Imprimible
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    // =========================================================================
    // PARÁMETROS ALEATORIOS CONTROLADOS (Nivel 1 a 3)
    // =========================================================================

    // --- PÁGINA 1: EJERCICIO 1 (Polinomio factorizado / producto de binomios) ---
    // f(x) = x * (x - 3k)^2 = x * (x^2 - 6kx + 9k^2) = x^3 - 6k x^2 + 9k^2 x
    // f'(x) = 3x^2 - 12kx + 9k^2 = 3(x^2 - 4kx + 3k^2) = 3(x - k)(x - 3k)
    // Puntos críticos: x = k (máximo local) y x = 3k (mínimo local)
    const k1 = Math.floor(Math.random() * 2) + 1; // 1 o 2
    const coef_b1 = 6 * k1;
    const coef_c1 = 9 * k1 * k1;
    const x_max1 = k1;
    const y_max1 = Math.pow(x_max1, 3) - coef_b1 * Math.pow(x_max1, 2) + coef_c1 * x_max1;
    const x_min1 = 3 * k1;
    const y_min1 = Math.pow(x_min1, 3) - coef_b1 * Math.pow(x_min1, 2) + coef_c1 * x_min1; // = 0

    // --- PÁGINA 1: EJERCICIO 2 (Función con potencia fraccionaria / radical a*root[n]{x^m}) ---
    // g(x) = 3x - 4 * sqrt(x) = 3x - 4 x^(1/2)  o  variantes
    // g(x) = a2 * x - b2 * \sqrt{x}
    // g'(x) = a2 - (b2 / 2) * x^(-1/2) = a2 - b2 / (2 \sqrt{x}) = 0
    // 2 a2 \sqrt{x} = b2 => \sqrt{x} = b2 / (2 a2) => x = (b2 / (2 a2))^2
    // Elegimos valores para que la raíz o fracción sea exacta y limpia:
    // Sea r = \sqrt{x} entero: r = 2 o 3. Si r = 2 => x = 4.
    // a2 = 3, b2 = 12 => \sqrt{x} = 12 / 6 = 2 => x = 4.
    const r2_list = [2, 3];
    const r2 = r2_list[Math.floor(Math.random() * r2_list.length)];
    const a2 = Math.floor(Math.random() * 2) + 2; // 2 o 3
    const b2 = 2 * a2 * r2;
    const x_crit2 = r2 * r2;
    const y_crit2 = a2 * x_crit2 - b2 * r2;

    // --- PÁGINA 2: EJERCICIO 3 (Función racional b / (a x^n) y suma lineal) ---
    // h(x) = a3 * x + b3 / x^2  (para x > 0)
    // h'(x) = a3 - 2 * b3 / x^3 = 0 => x^3 = (2 * b3) / a3
    // Sea x_crit3 = 2 => x^3 = 8 => 2 * b3 = 8 * a3 => b3 = 4 * a3
    const a3 = Math.floor(Math.random() * 3) + 2; // 2, 3, 4
    const x_crit3 = 2;
    const b3 = 4 * a3;
    const y_crit3 = a3 * x_crit3 + (b3 / (x_crit3 * x_crit3)); // a3*2 + 4*a3/4 = 3*a3

    // --- PÁGINA 2: EJERCICIO 4 (Función con radical en denominador b / (a * \sqrt{x})) ---
    // p(x) = a4 * x + b4 / \sqrt{x}  (x > 0)
    // p(x) = a4 * x + b4 * x^(-1/2)
    // p'(x) = a4 - (1/2) * b4 * x^(-3/2) = 0 => x^(3/2) = b4 / (2 * a4)
    // x = ( b4 / (2 * a4) )^(2/3)  = \sqrt[3]{ (b4 / (2*a4))^2 }
    // Puede resultar entero, racional o irracional.
    const a4 = Math.floor(Math.random() * 4) + 2; // 2, 3, 4, 5
    const b4 = Math.floor(Math.random() * 12) + 3; // 3 a 14
    
    // Fracción sin simplificar k_crit = b4 / (2 * a4)
    const num_k = b4;
    const den_k = 2 * a4;
    const gcd4 = ai.gcd(num_k, den_k);
    const num_k_simp = num_k / gcd4;
    const den_k_simp = den_k / gcd4;

    const x_crit4_exact_frac = den_k_simp === 1 ? `${num_k_simp}` : `\\frac{${num_k_simp}}{${den_k_simp}}`;
    const x_crit4_num = Math.pow(num_k / den_k, 2 / 3);
    const x_crit4_3cs = x_crit4_num.toPrecision(3);
    const y_crit4_num = a4 * x_crit4_num + (b4 / Math.sqrt(x_crit4_num));
    const y_crit4_3cs = y_crit4_num.toPrecision(3);

    // --- PÁGINA 3: EJERCICIO 5 (Desarrollo con TI-84 y producto de binomios con racional) ---
    // f5(x) = (x - c5) * (x + d5) + e5 / x = x^2 + (d5 - c5) x - c5*d5 + e5/x
    // Para resolver analíticamente y comparar numéricamente con TI-84
    const c5 = 2;
    const d5 = 3;
    const e5 = 16;
    // f5(x) = x^2 + x - 6 + 16/x
    // f5'(x) = 2x + 1 - 16/x^2 = 0 => 2x^3 + x^2 - 16 = 0
    // Evaluando x = 2: 2(8) + 4 - 16 = 16 + 4 - 16 = 4 != 0
    // Usemos f5(x) = x^2 + 54 / x  para x > 0:
    // f5'(x) = 2x - 54/x^2 = 0 => 2x^3 = 54 => x^3 = 27 => x = 3 (exacto y elegante)
    // Para incluir multiplicación de binomios:
    // f5(x) = (x + m5)(x - m5) + k5 / x = x^2 - m5^2 + k5 / x
    const m5 = Math.floor(Math.random() * 3) + 2; // 2, 3, 4
    const m5_sq = m5 * m5;
    // f5'(x) = 2x - k5 / x^2 = 0 => x^3 = k5 / 2 => para x = 3 => k5 = 54
    const x_crit5 = 3;
    const k5 = 54;
    const y_crit5 = (x_crit5 + m5) * (x_crit5 - m5) + (k5 / x_crit5);

    // --- PÁGINA 4: EJERCICIO 6 (Modelización Real - Paper 2 IB: Optimización de Costo / Envase) ---
    // Un contenedor cilíndrico o caja prismática abierta de base cuadrada con volumen V0 fijo.
    // O costo total de una empresa de logística:
    // C(x) = a6 * x + b6 / x + c6  (o costo medio por unidad producida en cientos de piezas)
    // O modelo de diseño: Se desea fabricar un envase de base cuadrada abierta con volumen V0 = 250 cm^3.
    // Lado de base = x, altura h = V0 / x^2.
    // Área de material: A(x) = x^2 + 4 * x * h = x^2 + 4 * V0 / x = x^2 + 1000 / x.
    // A'(x) = 2x - 1000 / x^2 = 0 => 2x^3 = 1000 => x^3 = 500 => x = \sqrt[3]{500} \approx 7.937 => 7.94 cm.
    // Área mínima: A(7.937) = (7.937)^2 + 1000 / 7.937 \approx 63.0 + 126.0 = 189 cm^2.
    const V0 = (Math.floor(Math.random() * 3) + 2) * 100; // 200, 300, 400
    const coef_area_lateral = 4 * V0;
    const x_opt6 = Math.cbrt(coef_area_lateral / 2);
    const x_opt6_3cs = x_opt6.toPrecision(3);
    const A_min6 = Math.pow(x_opt6, 2) + (coef_area_lateral / x_opt6);
    const A_min6_3cs = A_min6.toPrecision(3);
    const h_opt6 = V0 / (x_opt6 * x_opt6);
    const h_opt6_3cs = h_opt6.toPrecision(3);


    // =========================================================================
    // HOJA 1 - PÁGINA 1: FLUJOS ALGEBRAICOS Y MULTIPLICACIÓN DE BINOMIOS
    // =========================================================================
    html += ai.getHeader("5.3.1", "5. Cálculo", "Ficha: Puntos Máximos y Mínimos (Pág. 1/4)");

    html += `
    
    <div class="exercise-step">
        <p><strong>1.</strong> Considere la función cúbica expresada como producto de factores:</p>
        <p style="text-align:center; font-size:1.1em;">
            $$f(x) = x(x - ${3 * k1})^2, \\quad x \\in \\mathbb{R}$$
        </p>
        <ol class="FT_ol_a">
            <li>
                Desarrolle la expresión  en la forma polinómica $f(x) = x^3 - ax^2 + bx$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Escriba la derivada $f'(x)$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Resuelva analíticamente la ecuación $f'(x) = 0$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Determine las coordenadas completas $(x, y)$ del punto máximo local y del punto mínimo local de la función. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="exercise-step" style="margin-top: 15px;">
        <p><strong>2.</strong> Sea $g(x) = ${a2}x - ${b2}\\sqrt{x}$, definida para $x > 0$.</p>
        <ol class="FT_ol_a">
            <li>
                Escriba  $g'(x)$ y $g''(x)$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Halle el valor de $x$ que satisface $g'(x) = 0$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Calcule el valor de $x$ cuando la función $g(x)=0$ e indique si es máximo o minimo usando la segunda derivada. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    </div>
    <!--div class="page-break"></div-->
    `;

    // =========================================================================
    // HOJA 1 - PÁGINA 2: POTENCIAS NEGATIVAS Y RADICALES EN DENOMINADOR
    // =========================================================================
    html += ai.getHeader("5.3.1", "5. Cálculo", "Ficha: Puntos Máximos y Mínimos (Pág. 2/4)");

    html += `
    <div class="seccion-title">Nivel 1 (Continuación): Formas Racionales y Radicales en Denominador</div>
    
    <div class="exercise-step">
        <p><strong>3.</strong> Considere la función</p>
        <p style="text-align:center; font-size:1.1em;">
            $$h(x) = ${a3}x + \\frac{${b3}}{x^2}, \\quad x > 0$$
        </p>
        <ol class="FT_ol_a">
            <li>
                Escriba $h'(x)$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Resuelva la ecuación $h'(x) = 0$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Determine el tipo de punto crítico del resultado anterior. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Halle las coordenadas $(x, y)$ del punto crítico de $h(x)$. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>

    <div class="exercise-step" style="margin-top: 15px;">
        <p><strong>4.</strong> Se define $p(x) = ${a4}x + \\frac{${b4}}{\\sqrt{x}}$, para $x > 0$.</p>
        <ol class="FT_ol_a">
            <li>
                Escriba $p'(x)$ en términos de exponentes racionales o radicales. <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Resuelva analíticamente $p'(x) = 0$ para hallar la coordenada $x$ del punto estacionario. Exprese su respuesta en forma exacta o redondeada a 3 cifras significativas. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Calcule la coordenada $y$ correspondiente al punto estacionario (a 3 cifras significativas). <span class="mark">2</span>
                <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    </div>
    <div class="page-break"></div>
    `;

    // =========================================================================
    // HOJA 2 - PÁGINA 3: DESARROLLO Y USO DE CALCULADORA TI-84
    // =========================================================================
    html += ai.getHeader("5.3.1", "5. Cálculo", "Ficha: Puntos Máximos y Mínimos (Pág. 3/4)");

    html += `
    <div class="seccion-title">Nivel 2: Desarrollo y Verificación con Calculadora de Pantalla Gráfica (GDC / TI-84)</div>
    
    ${ai.getTiTip(`
        <b>Para hallar máximos o mínimos en la TI-84 CE:</b><br>
        1. Presiona <kbd>Y=</kbd> e introduce la función en <code>Y1</code> (ej. <code>(X+${m5})(X-${m5})+${k5}/X</code>).<br>
        2. Presiona <kbd>WINDOW</kbd> y ajusta: <code>Xmin = 0.5</code>, <code>Xmax = 8</code>, <code>Ymin = 0</code>, <code>Ymax = 50</code>.<br>
        3. Presiona <kbd>GRAPH</kbd> para visualizar la curva.<br>
        4. Accede a <kbd>2nd</kbd> <kbd>TRACE</kbd> [CALC] y selecciona <b>3: minimum</b>.<br>
        5. Define el <i>Left Bound?</i> (a la izquierda del vértice), <i>Right Bound?</i> (a la derecha) y pulsa <kbd>ENTER</kbd> en <i>Guess?</i>.<br>
        6. Anota las coordenadas mostradas con <b>3 cifras significativas</b>.
    `)}

    <div class="exercise-step">
        <p><strong>5.</strong> Considere la función compuesta por un producto de binomios y un término racional inverso:</p>
        <p style="text-align:center; font-size:1.1em;">
            $$f(x) = (x + ${m5})(x - ${m5}) + \\frac{${k5}}{x}, \\quad x > 0$$
        </p>
        <ol class="FT_ol_a">
            <li>
                Expanda el producto de binomios $(x + ${m5})(x - ${m5})$ y derive algebraicamente $f(x)$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Resuelva la ecuación $f'(x) = 0$ de forma analítica y halle el valor exacto del valor crítico $x$. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Siguiendo las instrucciones de la 💡 <b>TI-84 Hint</b>, utilice su calculadora de pantalla gráfica para graficar la función y confirmar las coordenadas del mínimo local. Registre la ventana gráfica utilizada y el resultado obtenido. <span class="mark">3</span>
                <tlacuache-renglon n="4" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Escriba el valor de $x$ donde la gráfica de la derivada corta el eje horizontal ($y=0$). <span class="mark">2</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    </div>
    <div class="page-break"></div>
    `;

    // =========================================================================
    // HOJA 2 - PÁGINA 4: MODELIZACIÓN EN CONTEXTO REAL (PAPER 2 IB)
    // =========================================================================
    html += ai.getHeader("5.3.1", "5. Cálculo", "Ficha: Puntos Máximos y Mínimos (Pág. 4/4)");

    html += `
    <div class="seccion-title">Nivel 3: Modelización en Contexto Real (Tipo Prueba 2 IB)</div>
    
    <div class="exercise-step">
        <div class="contexto-especial">
            <strong>Contexto de Diseño Industrial:</strong> Una empresa de biotecnología diseña un depósito contenedor abierto por su parte superior, con base cuadrada de lado $x$ cm y caras laterales verticales de altura $h$ cm. El depósito debe tener una capacidad obligatoria de volumen fijo de <strong>$V = ${V0}\\text{ cm}^3$</strong>.
        </div>

        <p><strong>6.</strong> Sea $A(x)$ la superficie total de material metálico (en $\\text{cm}^2$) requerida para construir el fondo y las cuatro caras laterales del contenedor.</p>
        
        <ol class="FT_ol_a">
            <li>
                Escriba una expresión para la altura $h$ en función de $x$ utilizando el volumen dado, y demuestre detalladamente que el área total de la superficie está dada por el modelo:
                $$A(x) = x^2 + \\frac{${coef_area_lateral}}{x}, \\quad x > 0$$ <span class="mark">3</span>
                <tlacuache-renglon n="4" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Halle la derivada $A'(x)$ con respecto a $x$. <span class="mark">2</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Halle el valor de $x$ para el cual se minimiza el área de material. Exprese su respuesta con <strong>3 cifras significativas</strong>. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Calcule la superficie mínima de material requerida y la correspondiente altura $h$ del contenedor. Proporcione ambos valores con <strong>3 cifras significativas</strong> indicando las unidades correctas. <span class="mark">3</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
            <li>
                Justifique matemáticamente (mediante el criterio de la primera derivada o análisis de curvatura) por qué este valor de $x$ corresponde efectivamente a un mínimo costo de material y no a un máximo. <span class="mark">2</span>
                <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon>
            </li>
        </ol>
    </div>
    </div>
    <div class="page-break"></div>
    `;

    // =========================================================================
    // SOLUCIONARIO DETALLADO
    // =========================================================================
    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem; line-height: 1.45;">
        <b>Solucionario Ficha 5.3.1 (Puntos Máximos, Mínimos y Optimización):</b><br><br>

        <b>1. Polinomio $f(x) = x(x - ${3 * k1})^2$:</b><br>
        * a) $(x - ${3 * k1})^2 = x^2 - ${6 * k1}x + ${9 * k1 * k1} \\implies f(x) = $ <b>$x^3 - ${coef_b1}x^2 + ${coef_c1}x$</b>.<br>
        * b) $f'(x) = 3x^2 - 2(${coef_b1})x + ${coef_c1} = $ <b>$3x^2 - ${2 * coef_b1}x + ${coef_c1}$</b> $= 3(x - ${k1})(x - ${3 * k1})$.<br>
        * c) $f'(x) = 0 \\implies 3(x - ${k1})(x - ${3 * k1}) = 0 \\implies $ <b>$x = ${x_max1}$</b> y <b>$x = ${x_min1}$</b>.<br>
        * d) En $x = ${x_max1}$: $f(${x_max1}) = ${y_max1} \\implies$ <b>Máximo local: $(${x_max1}, ${y_max1})$</b>.<br>
        &nbsp;&nbsp;&nbsp;En $x = ${x_min1}$: $f(${x_min1}) = ${y_min1} \\implies$ <b>Mínimo local: $(${x_min1}, ${y_min1})$</b>.<br><br>

        <b>2. Potencia fraccionaria $g(x) = ${a2}x - ${b2}\\sqrt{x}$:</b><br>
        * a) $g(x) = ${a2}x - ${b2}x^{1/2} \\implies g'(x) = $ <b>$${a2} - ${b2/2}x^{-1/2} = ${a2} - \\frac{${b2/2}}{\\sqrt{x}}$</b>.<br>
        * b) $g'(x) = 0 \\implies ${a2} = \\frac{${b2/2}}{\\sqrt{x}} \\implies \\sqrt{x} = \\frac{${b2/2}}{${a2}} = ${r2} \\implies x = ${r2}^2 = $ <b>${x_crit2}</b>.<br>
        * c) $g(${x_crit2}) = ${a2}(${x_crit2}) - ${b2}(${r2}) = ${y_crit2}$. Punto crítico: <b>$(${x_crit2}, ${y_crit2})$</b>.<br><br>

        <b>3. Racional $h(x) = ${a3}x + \\frac{${b3}}{x^2}$:</b><br>
        * a) $h(x) = ${a3}x + ${b3}x^{-2} \\implies h'(x) = $ <b>$${a3} - ${2 * b3}x^{-3} = ${a3} - \\frac{${2 * b3}}{x^3}$</b>.<br>
        * b) $h'(x) = 0 \\implies ${a3} = \\frac{${2 * b3}}{x^3} \\implies x^3 = \\frac{${2 * b3}}{${a3}} = 8 \\implies $ <b>$x = 2$</b>.<br>
        * c) Para $x < 2$ (ej. $x = 1$), $h'(1) = ${a3} - ${2*b3} < 0$ (decrece). Para $x > 2$ (ej. $x = 3$), $h'(3) > 0$ (crece). Por tanto, la pendiente cambia de negativa a positiva: es un <b>mínimo local</b>.<br>
        * d) $h(2) = ${a3}(2) + \\frac{${b3}}{4} = ${y_crit3}$. Coordenadas: <b>$(2, ${y_crit3})$</b>.<br><br>

        <b>4. Raíz en denominador $p(x) = ${a4}x + \\frac{${b4}}{\\sqrt{x}}$:</b><br>
        * a) $p(x) = ${a4}x + ${b4}x^{-1/2} \\implies p'(x) = $ <b>$${a4} - ${b4 % 2 === 0 ? b4 / 2 : `\\frac{${b4}}{2}`}x^{-3/2} = ${a4} - \\frac{${b4}}{2\\sqrt{x^3}}$</b>.<br>
        * b) $p'(x) = 0 \\implies \\frac{${b4}}{2x^{3/2}} = ${a4} \\implies x^{3/2} = \\frac{${b4}}{${2 * a4}} = ${x_crit4_exact_frac}$.<br>
        &nbsp;&nbsp;&nbsp;Elevando a la potencia $\\frac{2}{3}$: $x = \\left(${x_crit4_exact_frac}\\right)^{2/3} = \\sqrt[3]{\\left(${x_crit4_exact_frac}\\right)^2} \\approx$ <b>${x_crit4_3cs}</b>.<br>
        * c) $p(${x_crit4_3cs}) = ${a4}(${x_crit4_3cs}) + \\frac{${b4}}{\\sqrt{${x_crit4_3cs}}} \\approx$ <b>${y_crit4_3cs}</b>. Punto estacionario: <b>$(${x_crit4_3cs}, ${y_crit4_3cs})$</b>.<br><br>

        <b>5. Desarrollo y TI-84 $f(x) = (x + ${m5})(x - ${m5}) + \\frac{${k5}}{x}$:</b><br>
        * a) $(x + ${m5})(x - ${m5}) = x^2 - ${m5_sq} \\implies f(x) = x^2 - ${m5_sq} + ${k5}x^{-1} \\implies f'(x) = $ <b>$2x - \\frac{${k5}}{x^2}$</b>.<br>
        * b) $2x - \\frac{${k5}}{x^2} = 0 \\implies 2x^3 = ${k5} \\implies x^3 = 27 \\implies $ <b>$x = 3$</b>.<br>
        * c) Gráfica en TI-84 CE: Mínimo local en <b>$(3.00, ${y_crit5.toFixed(2)})$</b>.<br>
        * d) La gráfica de la derivada $Y2 = f'(x)$ corta el eje $X$ exactamente en $X = 3.00$, lo que confirma que la pendiente instantánea se anula en el valor crítico.<br><br>

        <b>6. Modelización Contextualizada (Contenedor $V = ${V0}\\text{ cm}^3$):</b><br>
        * a) Volumen: $V = x^2 h = ${V0} \\implies h = \\frac{${V0}}{x^2}$.<br>
        &nbsp;&nbsp;&nbsp;Área: $A = \\text{Base} + 4 \\times \\text{Cara} = x^2 + 4(xh) = x^2 + 4x\\left(\\frac{${V0}}{x^2}\\right) = $ <b>$x^2 + \\frac{${coef_area_lateral}}{x}$</b>.<br>
        * b) $A'(x) = $ <b>$2x - \\frac{${coef_area_lateral}}{x^2}$</b>.<br>
        * c) $A'(x) = 0 \\implies 2x = \\frac{${coef_area_lateral}}{x^2} \\implies 2x^3 = ${coef_area_lateral} \\implies x = \\sqrt[3]{${coef_area_lateral / 2}} \\approx$ <b>${x_opt6_3cs} cm</b>.<br>
        * d) $A_{\\text{mín}} = (${x_opt6_3cs})^2 + \\frac{${coef_area_lateral}}{${x_opt6_3cs}} \\approx$ <b>${A_min6_3cs} cm$^2$</b>.<br>
        &nbsp;&nbsp;&nbsp;Altura: $h = \\frac{${V0}}{(${x_opt6_3cs})^2} \\approx$ <b>${h_opt6_3cs} cm</b>.<br>
        * e) Justificación: Para $x < ${x_opt6_3cs}$, $A'(x) < 0$ (el área decrece); para $x > ${x_opt6_3cs}$, $A'(x) > 0$ (el área crece). Al cambiar la pendiente de negativa a positiva, se confirma un <b>mínimo global</b> para $x > 0$.
    </div>
    `;

    return [html, solucion];
}

export async function render(container, n, code) {
}
