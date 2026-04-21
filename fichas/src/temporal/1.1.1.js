// Generado a partir de: 1.1.1.js (Original movido a src/temporal/)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Línea Recta: Pendiente, Punto Medio y Mediatriz';
}

/**
 * Función de utilidad para calcular el MCD de varios números
 */
function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        a %= b;
        [a, b] = [b, a];
    }
    return a;
}

function gcd_list(list) {
    return list.reduce((a, b) => gcd(a, b));
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    // Generación de datos aleatorios para los puntos A y B
    const range = 8;
    const A = [
        Math.floor(Math.random() * (2 * range + 1)) - range,
        Math.floor(Math.random() * (2 * range + 1)) - range
    ];
    let B;
    do {
        B = [
            Math.floor(Math.random() * (2 * range + 1)) - range,
            Math.floor(Math.random() * (2 * range + 1)) - range
        ];
    } while (A[0] === B[0] || A[1] === B[1]); // Evitamos líneas puramente verticales u horizontales para mayor carga cognitiva

    // Cálculos matemáticos
    // 1. Punto Medio M
    const Mx = [A[0] + B[0], 2];
    const My = [A[1] + B[1], 2];
    const Mx_s = tlacu.simplify_frac(Mx);
    const My_s = tlacu.simplify_frac(My);
    const M_str = `\\left( ${tlacu.fraccion(Mx_s[0], Mx_s[1])}, ${tlacu.fraccion(My_s[0], My_s[1])} \\right)`;

    // 2. Pendiente m_AB
    const dy = B[1] - A[1];
    const dx = B[0] - A[0];
    const mab_s = tlacu.simplify_frac([dy, dx]);
    const mab_str = tlacu.fraccion(mab_s[0], mab_s[1]);

    // 3. Pendiente perpendicular m_p
    const mp_s = tlacu.simplify_frac([-dx, dy]);
    const mp_str = tlacu.fraccion(mp_s[0], mp_s[1]);

    // 4. Ecuación General Ax + By + C = 0 de la mediatriz
    // La mediatriz pasa por M(Mx/2, My/2) con pendiente mp = -dx/dy
    // (y - My/2) = (-dx/dy) * (x - Mx/2)
    // 2dy(y) - dy(My) = -2dx(x) + dx(Mx)
    // 2dx(x) + 2dy(y) - (dx(Mx) + dy(My)) = 0
    let coeffA = 2 * dx;
    let coeffB = 2 * dy;
    let coeffC = -(dx * (A[0] + B[0]) + dy * (A[1] + B[1]));

    const common = gcd_list([coeffA, coeffB, coeffC]);
    coeffA /= common;
    coeffB /= common;
    coeffC /= common;

    // Asegurar A >= 0 para la forma estándar
    if (coeffA < 0 || (coeffA === 0 && coeffB < 0)) {
        coeffA *= -1;
        coeffB *= -1;
        coeffC *= -1;
    }

    const eq_gen = `${coeffA !== 0 ? (coeffA === 1 ? 'x' : coeffA + 'x') : ''}${coeffB > 0 ? '+' : ''}${coeffB !== 0 ? (coeffB === 1 ? 'y' : (coeffB === -1 ? '-y' : coeffB + 'y')) : ''}${coeffC > 0 ? '+' : ''}${coeffC !== 0 ? coeffC : ''} = 0`;

    // --- CONSTRUCCIÓN DEL HTML ---
    html += `
    <div class="ficha-container problema2">
        <div class="header-ficha">
            <span class="numero-pregunta">${numeroPregunta + 1}</span>
            <span class="tema-tag">Geometría Analítica - AI NM</span>
        </div>

        <div class="enunciado">
            Sean los puntos $A(${A[0]}, ${A[1]})$ y $B(${B[0]}, ${B[1]})$ representados en el plano coordenado.
        </div>

        <div class="seccion-andamiaje">
            <ol class="FT_ol_a">
                <li>
                    Halle las coordenadas del punto medio, $M$, del segmento $[AB]$.
                    <div class="mark">2</div>
                    <tlacuache-renglon n="1" color="#eee"></tlacuache-renglon>
                </li>
                <li>
                    Muestre que la pendiente del segmento $[AB]$ es $m = ${mab_str}$.
                    <div class="mark">1</div>
                    <tlacuache-renglon n="1" color="#eee"></tlacuache-renglon>
                </li>
                <li>
                    Escriba la pendiente de cualquier recta perpendicular a $[AB]$.
                    <div class="mark">1</div>
                    <tlacuache-renglon n="1" color="#eee"></tlacuache-renglon>
                </li>
                <li>
                    Halle la ecuación de la <b>mediatriz</b> del segmento $[AB]$, dando su respuesta en la forma $Ax + By + D = 0$, donde $A, B, D \in \mathbb{Z}$.
                    <div class="mark">3</div>
                    <tlacuache-renglon n="3" color="#eee"></tlacuache-renglon>
                </li>
            </ol>
        </div>

        <div class="contexto-aplicado">
            <p><b>Situación de Modelización:</b> Una antena de telefonía debe ubicarse en un punto $P$ que sea equidistante de los pueblos $A$ y $B$. Se sabe que el terreno es plano y $P$ debe estar situado sobre la mediatriz calculada anteriormente.</p>
            <ol class="FT_ol_a" start="5">
                <li>
                    Si la antena debe instalarse sobre el eje $x$, halle las coordenadas del punto $P$.
                    <div class="mark">2</div>
                    <tlacuache-renglon n="2" color="#eee"></tlacuache-renglon>
                </li>
            </ol>
        </div>

        <div class="ti-84-tip">
            <small>💡 <b>TI-84 Tip:</b> Utiliza \`STAT\` > \`EDIT\` para ingresar las coordenadas y \`STAT\` > \`CALC\` > \`LinReg(ax+b)\` para verificar la pendiente de la recta que pasa por los puntos, pero recuerda que el examen AI requiere el proceso algebraico para la mediatriz.</small>
        </div>

        <div class="espacio-grafico" style="margin-top: 20px; text-align: center;">
            <p style="font-size: 0.85rem; color: #666;">Esboce los puntos y la mediatriz para verificar su respuesta:</p>
            <tlacuache-ejes size="[300, 300]" xlim="[-10, 10]" ylim="[-10, 10]" dx="2" dy="2" grid="true"></tlacuache-ejes>
        </div>
    </div>
    `;

    // --- SOLUCIONARIO ---
    solucion += `
    <div class="solucion-item">
        <b>${numeroPregunta + 1}:</b> 
        (a) $M = ${M_str}$ [A2] <br>
        (b) $m_{AB} = \\frac{${B[1]} - (${A[1]})}{${B[0]} - (${A[0]})} = ${mab_str}$ [M1 A1] <br>
        (c) $m_p = ${mp_str}$ [A1] <br>
        (d) $y - (${My_s[0]}/${My_s[1]}) = ${mp_str}(x - (${Mx_s[0]}/${Mx_s[1]})) \rightarrow ${eq_gen}$ [M1 A2] <br>
        (e) En eje $x$, $y=0 \rightarrow ${coeffA}x + ${coeffC} = 0 \rightarrow x = ${tlacu.fraccion(-coeffC, coeffA)} \rightarrow P(${tlacu.fraccion(-coeffC, coeffA)}, 0)$ [M1 A1]
    </div>
    `;

    return [html, solucion];
}

export async function renderGeoGebra(container, totalElements) {
    // Para esta ficha, usamos tlacuache-ejes en lugar de GeoGebra por eficiencia 
    // pero mantenemos la exportación por compatibilidad con el sistema.
}
