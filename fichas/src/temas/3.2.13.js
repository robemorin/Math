<ref_base>
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Trigonometría en Triángulos Rectángulos';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Fuentes originales: Ejercicios 5, 8, 9, 10, 11 de [54].pdf
    
    // Problema 1: Triángulo rectángulo (Ejercicio 5 base)
    let angulo = 50 + Math.floor(Math.random() * 20); // 50-69 grados
    let hipotenusa = 8 + Math.floor(Math.random() * 5); // 8-12 cm
    let x = (hipotenusa * Math.sin(angulo * Math.PI / 180)).toFixed(1);
    let y = (hipotenusa * Math.cos(angulo * Math.PI / 180)).toFixed(1);

    let Pregunta = `<div class="problema2">1.- En el triángulo rectángulo dado, calcule las medidas de los lados desconocidos $x$ e $y$ y el ángulo faltante $\\theta$.
    <br><br>
    <div style="text-align:center; border: 1px solid #ccc; padding:10px; width: 200px; margin: auto;">
        Triángulo con ángulo conocido $${angulo}^\\circ$ y lado opuesto a este de $${x}$ cm.
    </div>
    <ol class="FT_ol_a">
        <li>Determine el ángulo $\\theta$. <div>1</div></li>${CR(1)}
        <li>Halle el valor de $x$ e $y$ (muestre su procedimiento). <div>3</div></li>${CR(2)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (a) $\\theta = ${90-angulo}^\\circ$. (b) $x = ${x}$, $y = ${y}$ (aprox).</div><br>`;

    // Problema 2: Elevación (Ejercicio 8)
    let dist = 20 + Math.floor(Math.random() * 30);
    let elev = 30 + Math.floor(Math.random() * 15);
    let h = (dist * Math.tan(elev * Math.PI / 180)).toFixed(1);

    Pregunta += `<div class="problema2">2.- Un observador se encuentra a $${dist}$ m de la base de una antena. El ángulo de elevación a la punta es de $${elev}^\\circ$.
    <ol class="FT_ol_a">
        <li>Dibuje un esquema que represente la situación. <div>2</div></li>${CR(3)}
        <li>Halle la altura de la antena. <div>2</div></li>${CR(1)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> (b) $h = ${dist} \\cdot \\tan(${elev}^\\circ) \\approx ${h}$ m.</div><br>`;

    // Problema 3: Bearing/Rumbos (Ejercicio 9)
    let bearing = 20 + Math.floor(Math.random() * 30);
    Pregunta += `<div class="problema2">3.- Un punto Q tiene un rumbo (bearing) de $${bearing}^\\circ$ respecto a P.
    <ol class="FT_ol_a">
        <li>Dibuje el diagrama del rumbo indicando el Norte. <div>2</div></li>${CR(3)}
        <li>Si la distancia PQ es de 10 km, calcule la distancia hacia el Este desde P. <div>2</div></li>${CR(2)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P3:</b> (b) $10 \\cdot \\sin(${bearing}^\\circ) \\approx ${(10 * Math.sin(bearing * Math.PI/180)).toFixed(2)}$ km.</div><br>`;

    // Problema 4: Ángulo de depresión (Ejercicio 11)
    let alt_edificio = 15 + Math.floor(Math.random() * 10);
    let sep = 20 + Math.floor(Math.random() * 10);
    let ang_dep = (Math.atan(alt_edificio / sep) * 180 / Math.PI).toFixed(1);

    Pregunta += `<div class="problema2">4.- Dos edificios están separados por una calle de $${sep}$ m. La altura de uno de los edificios es de $${alt_edificio}$ m. Halle el ángulo de depresión desde la azotea del edificio alto hacia la base del opuesto. 
    <br><i>Espacio para cálculos:</i>${CR(4)}<div>4</div></div>`;

    Solucion += `<div class="ans"><b>P4:</b> $\\tan(\\theta) = ${alt_edificio}/${sep} \\Rightarrow \\theta \\approx ${ang_dep}^\\circ$.</div><br><div class="page"></div>`;

    return [Pregunta, Solucion];
}
</ref_base>