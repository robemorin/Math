import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return "Ficha: Geometría 3D (Prismas, Pirámides y Conos)";
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    html += ai.getHeader("3.3.20", "3. Geometría y trigonometría", "Ficha: Geometría 3D (Prismas, Pirámides y Conos)");
    html += `<div class="contexto-especial" style="margin-bottom: 20px;"><b>Nota:</b> Resuelve los siguientes problemas utilizando tres cifras significativas.</div>`;

    // ======================================================
    // EJERCICIO 1: Prisma triangular (Rampa)
    // ======================================================
    const h1 = (Math.floor(Math.random() * 5) * 0.05 + 0.20).toFixed(2);
    const w1 = (Math.floor(Math.random() * 6) * 0.2 + 1.4).toFixed(1);
    const l1 = (Math.floor(Math.random() * 5) * 0.2 + 1.0).toFixed(1);

    const ce1 = Math.sqrt(w1*w1 + l1*l1);
    const cd1 = Math.sqrt(h1*h1 + ce1*ce1);
    const ang1 = Math.atan(h1 / ce1) * 180 / Math.PI;

    const svg1 = `
    <svg width="220" height="150" style="display: block; margin: auto; overflow: visible;">
        <polygon points="30,50 30,110 110,130" fill="none" stroke="black" stroke-width="1.8" />
        <polygon points="30,50 110,130 190,100 110,20" fill="none" stroke="black" stroke-width="1.8" />
        <line x1="110" y1="130" x2="190" y2="100" stroke="black" stroke-width="1.8" />
        <line x1="110" y1="20" x2="190" y2="100" stroke="black" stroke-width="1.8" />

        <line x1="30" y1="110" x2="110" y2="80" stroke="black" stroke-width="1.2" stroke-dasharray="4 4" />
        <line x1="110" y1="20" x2="110" y2="80" stroke="black" stroke-width="1.2" stroke-dasharray="4 4" />
        <line x1="110" y1="80" x2="190" y2="100" stroke="black" stroke-width="1.2" stroke-dasharray="4 4" />
        <line x1="110" y1="130" x2="110" y2="80" stroke="blue" stroke-width="1" stroke-dasharray="2 2" />
        <line x1="110" y1="130" x2="110" y2="20" stroke="red" stroke-width="1" stroke-dasharray="2 2" />

        <polyline points="30,100 40,102 40,112" fill="none" stroke="black" stroke-width="1" />
        <polyline points="110,70 120,72 120,82" fill="none" stroke="black" stroke-width="1" />

        <text x="25" y="45" font-family="Cambria Math, serif" font-size="12" font-style="italic">A</text>
        <text x="20" y="120" font-family="Cambria Math, serif" font-size="12" font-style="italic">B</text>
        <text x="110" y="145" font-family="Cambria Math, serif" font-size="12" font-style="italic">C</text>
        <text x="110" y="15" font-family="Cambria Math, serif" font-size="12" font-style="italic">D</text>
        <text x="100" y="85" font-family="Cambria Math, serif" font-size="12" font-style="italic">E</text>
        <text x="200" y="105" font-family="Cambria Math, serif" font-size="12" font-style="italic">F</text>

        <text x="12" y="80" font-family="Arial" font-size="11" text-anchor="middle">${h1} m</text>
        <text x="65" y="132" font-family="Arial" font-size="11" text-anchor="middle">${w1} m</text>
        <text x="158" y="123" font-family="Arial" font-size="11" text-anchor="middle">${l1} m</text>
    </svg>`;

    html += `
    <div class="seccion-title">I. Prisma Triangular 1</div>
    <div class="exercise-step">
        <p>Una rampa de acceso se construye en forma de prisma triangular, como se muestra en la siguiente figura. La altura vertical $AB$ es de $${h1}\\text{ m}$, la base horizontal de la sección transversal $BC$ mide $${w1}\\text{ m}$ y la longitud de la rampa $CF$ mide $${l1}\\text{ m}$.</p>
        
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin: 15px 0;">
            <div style="flex: 1; min-width: 250px;">
                <ol class="FT_ol_a">
                    <li>Halle la longitud de:
                        <ol class="FT_ol_i">
                            <li>$CE$ <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                            <li>$CD$ <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                        </ol>
                    </li>
                    <li>Calcule la medida del ángulo de elevación $D\\hat{C}E$. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                </ol>
            </div>
            <div style="flex: 1; min-width: 200px; text-align: center;">
                ${svg1}
            </div>
        </div>
    </div>
    `;

    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 3.3.20:</b><br>
        <b>I.</b><br>
        a) i) $CE = \\sqrt{${w1}^2 + ${l1}^2} = ${ce1.toFixed(3)}\\text{ m} \\approx \\mathbf{${ce1.toFixed(2)}\\text{ m}}$<br>
        a) ii) $CD = \\sqrt{${h1}^2 + CE^2} = \\sqrt{${h1}^2 + ${ce1.toFixed(4)}^2} = ${cd1.toFixed(3)}\\text{ m} \\approx \\mathbf{${cd1.toFixed(2)}\\text{ m}}$<br>
        b) $\\tan(D\\hat{C}E) = \\frac{${h1}}{CE} \\implies D\\hat{C}E = \\arctan\\left(\\frac{${h1}}{${ce1.toFixed(3)}}\\right) = ${ang1.toFixed(2)}^\\circ \\approx \\mathbf{${ang1.toFixed(1)}^\\circ}$<br>
    `;


    // ======================================================
    // EJERCICIO 2: Prisma triangular (Rampa Mirrored)
    // ======================================================
    const h2 = (Math.floor(Math.random() * 5) * 0.05 + 0.25).toFixed(2);
    const w2 = (Math.floor(Math.random() * 6) * 0.2 + 1.2).toFixed(1);
    const l2 = (Math.floor(Math.random() * 5) * 0.2 + 0.8).toFixed(1);

    const bf2 = Math.sqrt(w2*w2 + l2*l2);
    const af2 = Math.sqrt(h2*h2 + bf2*bf2);
    const ang2 = Math.atan(h2 / bf2) * 180 / Math.PI;

    const svg2 = `
    <svg width="220" height="150" style="display: block; margin: auto; overflow: visible;">
        <polygon points="190,50 190,110 110,130" fill="none" stroke="black" stroke-width="1.8" />
        <polygon points="190,50 110,130 30,100 110,20" fill="none" stroke="black" stroke-width="1.8" />
        <line x1="110" y1="130" x2="30" y2="100" stroke="black" stroke-width="1.8" />
        <line x1="110" y1="20" x2="30" y2="100" stroke="black" stroke-width="1.8" />

        <line x1="190" y1="110" x2="110" y2="80" stroke="black" stroke-width="1.2" stroke-dasharray="4 4" />
        <line x1="110" y1="20" x2="110" y2="80" stroke="black" stroke-width="1.2" stroke-dasharray="4 4" />
        <line x1="110" y1="80" x2="30" y2="100" stroke="black" stroke-width="1.2" stroke-dasharray="4 4" />
        <line x1="110" y1="130" x2="110" y2="80" stroke="blue" stroke-width="1" stroke-dasharray="2 2" />
        <line x1="110" y1="130" x2="110" y2="20" stroke="red" stroke-width="1" stroke-dasharray="2 2" />

        <polyline points="190,100 180,98 180,108" fill="none" stroke="black" stroke-width="1" />
        <polyline points="110,70 100,72 100,82" fill="none" stroke="black" stroke-width="1" />

        <text x="110" y="15" font-family="Cambria Math, serif" font-size="12" font-style="italic">A</text>
        <text x="115" y="85" font-family="Cambria Math, serif" font-size="12" font-style="italic">B</text>
        <text x="20" y="105" font-family="Cambria Math, serif" font-size="12" font-style="italic">C</text>
        <text x="195" y="45" font-family="Cambria Math, serif" font-size="12" font-style="italic">D</text>
        <text x="195" y="120" font-family="Cambria Math, serif" font-size="12" font-style="italic">E</text>
        <text x="110" y="145" font-family="Cambria Math, serif" font-size="12" font-style="italic">F</text>

        <text x="208" y="80" font-family="Arial" font-size="11" text-anchor="middle">${h2} m</text>
        <text x="155" y="132" font-family="Arial" font-size="11" text-anchor="middle">${w2} m</text>
        <text x="62" y="123" font-family="Arial" font-size="11" text-anchor="middle">${l2} m</text>
    </svg>`;

    html += `
    <div class="seccion-title">II. Prisma Triangular 2</div>
    <div class="exercise-step">
        <p>Una estructura de rampa metálica tiene la forma de un prisma triangular de tal manera que la altura $DE$ es de $${h2}\\text{ m}$, el ancho de la base horizontal $EF$ mide $${w2}\\text{ m}$, y el largo del prisma es de $${l2}\\text{ m}$.</p>
        
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin: 15px 0;">
            <div style="flex: 1; min-width: 250px;">
                <ol class="FT_ol_a">
                    <li>Halle la longitud de:
                        <ol class="FT_ol_i">
                            <li>$BF$ <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                            <li>$AF$ <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                        </ol>
                    </li>
                    <li>Calcule la medida del ángulo de elevación $A\\hat{F}B$. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                </ol>
            </div>
            <div style="flex: 1; min-width: 200px; text-align: center;">
                ${svg2}
            </div>
        </div>
    </div>
    `;

    solucion += `
        <br><b>II.</b><br>
        a) i) $BF = \\sqrt{${w2}^2 + ${l2}^2} = ${bf2.toFixed(3)}\\text{ m} \\approx \\mathbf{${bf2.toFixed(2)}\\text{ m}}$<br>
        a) ii) $AF = \\sqrt{${h2}^2 + BF^2} = \\sqrt{${h2}^2 + ${bf2.toFixed(4)}^2} = ${af2.toFixed(3)}\\text{ m} \\approx \\mathbf{${af2.toFixed(2)}\\text{ m}}$<br>
        b) $\\tan(A\\hat{F}B) = \\frac{${h2}}{BF} \\implies A\\hat{F}B = \\arctan\\left(\\frac{${h2}}{${bf2.toFixed(3)}}\\right) = ${ang2.toFixed(2)}^\\circ \\approx \\mathbf{${ang2.toFixed(1)}^\\circ}$<br>
    `;


    // ======================================================
    // EJERCICIO 3: Pirámide de base cuadrada
    // ======================================================
    const s3 = (Math.floor(Math.random() * 5) * 0.15 + 1.20).toFixed(2);
    const angDeg3 = Math.floor(Math.random() * 11) + 45;
    const angRad3 = angDeg3 * Math.PI / 180;
    const semidiag3 = s3 * Math.sqrt(2) / 2;
    const hPyramid3 = semidiag3 * Math.tan(angRad3);
    const vol3 = (1/3) * (s3 * s3) * hPyramid3;

    const svg3 = `
    <svg width="200" height="150" style="display: block; margin: auto; overflow: visible;">
        <polygon points="40,110 120,125 160,100 100,20" fill="none" stroke="black" stroke-width="1.8" />
        <line x1="120" y1="125" x2="100" y2="20" stroke="black" stroke-width="1.8" />
        
        <line x1="40" y1="110" x2="80" y2="85" stroke="black" stroke-width="1.2" stroke-dasharray="4 4" />
        <line x1="80" y1="85" x2="160" y2="100" stroke="black" stroke-width="1.2" stroke-dasharray="4 4" />
        <line x1="100" y1="20" x2="80" y2="85" stroke="black" stroke-width="1.2" stroke-dasharray="4 4" />

        <line x1="100" y1="20" x2="100" y2="105" stroke="red" stroke-width="1.2" stroke-dasharray="3 3" />
        <line x1="40" y1="110" x2="160" y2="100" stroke="blue" stroke-width="1.2" stroke-dasharray="3 3" />

        <path d="M 55,100 A 20,20 0 0 1 52,109" fill="none" stroke="red" stroke-width="1.2" />
        <text x="65" y="103" font-family="Arial" font-size="10" fill="red">${angDeg3}°</text>

        <text x="80" y="132" font-family="Arial" font-size="11" text-anchor="middle">s = ${s3} m</text>
        
        <line x1="78" y1="114" x2="82" y2="122" stroke="black" stroke-width="1" />
        <line x1="138" y1="109" x2="142" y2="117" stroke="black" stroke-width="1" />
    </svg>`;

    html += `
    <div class="seccion-title">III. Pirámide de Base Cuadrada</div>
    <div class="exercise-step">
        <p>La siguiente figura muestra una pirámide recta con una base cuadrada de lado $s = ${s3}\\text{ m}$. El ángulo entre la arista lateral y la diagonal de la base es de $${angDeg3}^\\circ$.</p>
        
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin: 15px 0;">
            <div style="flex: 1; min-width: 250px;">
                <ol class="FT_ol_a">
                    <li>Determine la altura vertical de la pirámide. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
                    <li>Calcule el volumen total de la pirámide. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
                </ol>
            </div>
            <div style="flex: 1; min-width: 200px; text-align: center;">
                ${svg3}
            </div>
        </div>
    </div>
    `;

    solucion += `
        <br><b>III.</b><br>
        a) Mitad de la diagonal de la base $d_m = \\frac{${s3}\\sqrt{2}}{2} = ${semidiag3.toFixed(3)}\\text{ m}$. Altura $h = d_m \\tan(${angDeg3}^\\circ) = ${hPyramid3.toFixed(3)}\\text{ m} \\approx \\mathbf{${hPyramid3.toFixed(2)}\\text{ m}}$.<br>
        b) Volumen $V = \\frac{1}{3} s^2 h = \\frac{1}{3} (${s3})^2 (${hPyramid3.toFixed(3)}) = ${vol3.toFixed(3)}\\text{ m}^3 \\approx \\mathbf{${vol3.toFixed(2)}\\text{ m}^3}$<br>
    `;


    // ======================================================
    // EJERCICIO 4: Cono recto
    // ======================================================
    const d4 = Math.floor(Math.random() * 5) * 2 + 6;
    const r4 = d4 / 2;
    const angDeg4 = Math.floor(Math.random() * 11) + 60;
    const angRad4 = angDeg4 * Math.PI / 180;
    const hCone4 = r4 * Math.tan(angRad4);
    const vol4 = (1/3) * Math.PI * (r4 * r4) * hCone4;

    const svg4 = `
    <svg width="200" height="150" style="display: block; margin: auto; overflow: visible;">
        <path d="M 40,110 A 60,20 0 0 0 160,110" fill="none" stroke="black" stroke-width="1.8" />
        <path d="M 40,110 A 60,20 0 0 1 160,110" fill="none" stroke="black" stroke-width="1.2" stroke-dasharray="4 4" />
        <line x1="40" y1="110" x2="100" y2="20" stroke="black" stroke-width="1.8" />
        <line x1="160" y1="110" x2="100" y2="20" stroke="black" stroke-width="1.8" />

        <line x1="100" y1="20" x2="100" y2="110" stroke="red" stroke-width="1.2" stroke-dasharray="3 3" />
        <line x1="40" y1="110" x2="160" y2="110" stroke="blue" stroke-width="1.2" stroke-dasharray="3 3" />

        <path d="M 55,110 A 15,15 0 0 1 50,100" fill="none" stroke="red" stroke-width="1.2" />
        <text x="58" y="104" font-family="Arial" font-size="10" fill="red">${angDeg4}°</text>

        <text x="100" y="125" font-family="Arial" font-size="11" text-anchor="middle">d = ${d4} cm</text>
    </svg>`;

    html += `
    <div class="seccion-title">IV. Cono Recto</div>
    <div class="exercise-step">
        <p>Un cono recto de metal tiene un diámetro en su base de $d = ${d4}\\text{ cm}$. El ángulo formado entre el lado inclinado (generatriz) y el plano de la base es de $${angDeg4}^\\circ$, como se ilustra en el siguiente diagrama.</p>
        
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin: 15px 0;">
            <div style="flex: 1; min-width: 250px;">
                <ol class="FT_ol_a">
                    <li>Halle la altura vertical del cono. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
                    <li>Calcule el volumen del cono. <span class="mark">3</span> <tlacuache-renglon n="3" color="#f9f9f9"></tlacuache-renglon></li>
                </ol>
            </div>
            <div style="flex: 1; min-width: 200px; text-align: center;">
                ${svg4}
            </div>
        </div>
    </div>
    <div class="page-break"></div>
    `;

    solucion += `
        <br><b>IV.</b><br>
        a) Radio $r = ${r4}\\text{ cm}$. Altura $h = ${r4} \\tan(${angDeg4}^\\circ) = ${hCone4.toFixed(3)}\\text{ cm} \\approx \\mathbf{${hCone4.toFixed(2)}\\text{ cm}}$.<br>
        b) Volumen $V = \\frac{1}{3} \\pi r^2 h = \\frac{1}{3} \\pi (${r4})^2 (${hCone4.toFixed(3)}) = ${vol4.toFixed(2)}\\text{ cm}^3 \\approx \\mathbf{${vol4.toFixed(0)}\\text{ cm}^3}$ (o $166\\text{ cm}^3$ para 3 cifras sig.)
    </div>
    `;

    return [html, solucion];
}
