<ref_base>
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Geometría: Superficie y Volumen';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // --- Problema 1: Cilindro con cúpula (Combinación de sólidos) ---
    let r1 = (Math.floor(Math.random() * 3) + 2);
    let h1 = (Math.floor(Math.random() * 4) + 3);
    let area_base = Math.PI * Math.pow(r1, 2);
    let area_lat_cil = 2 * Math.PI * r1 * h1;
    let area_semi_esfera = 2 * Math.PI * Math.pow(r1, 2);
    let st = (area_lat_cil + area_semi_esfera + area_base).toFixed(1);

    let Pregunta = `<div class="problema"><h3>1.- Superficie de sólidos compuestos</h3>
    <p>Considere un silo compuesto por un cilindro de radio $r = ${r1}$ m y altura $h = ${h1}$ m, coronado por una semiesfera de mismo radio.</p>
    <ol class="FT_ol_a">
        <li>Dibuje el sólido y marque las dimensiones dadas. <div>2</div></li>${CR(4)}
        <li>Calcule el área superficial total (incluyendo la base inferior circular). Redondee a 1 decimal. <div>4</div></li>${CR(2)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (1b) Área total $\\approx ${st}$ m$^2$.</div><br>`;

    // --- Problema 2: Esfera (Neptuno) ---
    let surf_neptuno = (7.618 * Math.pow(10, 9)).toExponential(3);
    let r_calc = Math.sqrt(7.618 * Math.pow(10, 9) / (4 * Math.PI));

    Pregunta += `<div class="problema"><h3>2.- Modelización esférica</h3>
    <p>El planeta Neptuno es aproximadamente esférico y tiene un área superficial de $7.618 \\times 10^9$ km$^2$.</p>
    <ol class="FT_ol_a">
        <li>Utilice la fórmula del área de una esfera $A = 4\\pi r^2$ para estimar el radio de Neptuno. <div>3</div></li>${CR(3)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> $r \\approx ${r_calc.toExponential(3)}$ km.</div><br>`;

    // --- Problema 3: Volumen de prisma triangular ---
    let l = Math.floor(Math.random() * 8) + 4;
    let b = Math.floor(Math.random() * 4) + 3;
    let h_tri = Math.floor(Math.random() * 4) + 3;
    let vol = (0.5 * b * h_tri) * l;

    Pregunta += `<div class="problema"><h3>3.- Volumen de sólidos de sección uniforme</h3>
    <p>Un prisma triangular tiene una base triangular de base $b=${b}$ cm y altura $h=${h_tri}$ cm. La longitud del prisma es $L=${l}$ cm.</p>
    <ol class="FT_ol_a">
        <li>Calcule el volumen del prisma. Recuerde: $V = \\text{Área de la base} \\times \\text{longitud}$. <div>3</div></li>${CR(3)}
    </ol></div><div class="page"></div>`;

    Solucion += `<div class="ans"><b>P3:</b> $V = ${vol}$ cm$^3$.</div><br>`;

    // --- Problema 4: Cono y desarrollo plano ---
    let s_cono = Math.floor(Math.random() * 5) + 5;
    let r_cono = Math.floor(Math.random() * 2) + 2;

    Pregunta += `<div class="problema"><h3>4.- Desarrollo de un cono</h3>
    <p>Se despliega la superficie lateral de un cono en un sector circular de radio $s=${s_cono}$ cm y ángulo central $\\theta$.</p>
    <ol class="FT_ol_a">
        <li>Si la base del cono tiene un radio $r=${r_cono}$ cm, determine la longitud del arco $AB = 2\\pi r$. <div>2</div></li>${CR(2)}
        <li>Halle el valor de $\\theta$ en grados utilizando la relación de la longitud del arco $L = \\frac{\\theta}{360} \\times 2\\pi s$. <div>4</div></li>${CR(3)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P4:</b> (4a) $L = ${2 * Math.PI * r_cono}$ cm. (4b) $\\theta = ${((r_cono * 360) / s_cono).toFixed(1)}^\\circ$.</div>`;

    return [Pregunta, Solucion];
}
</ref_base>