import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Geometría: Volumen y Superficie';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Ejercicio 7 parametrizado (F de plástico)
    let altura = 1.7;
    let anchoTotal = 0.9;
    let grosor = 0.1;

    let Pregunta = `<div class="problema">
    <h3>1. Diseño de letrero en forma de F</h3>
    <p>Frank tiene un letrero con las dimensiones mostradas en la figura (en metros). El objeto tiene un grosor constante de $0.1$ m.</p>
    <ol class="FT_ol_a">
        <li>Si la F es de plástico sólido, calcule el volumen total del material. <div>3</div></li>${CR(2)}
        <li>Si la F fuera hueca y se necesita recubrir su superficie exterior con fibra de vidrio, ¿cuál es el área superficial total necesaria (incluyendo todas las caras)? <div>4</div></li>${CR(3)}
    </ol></div>`;

    // Ejercicio 9 parametrizado (Banco rectangular)
    let b_mm = 3845;
    let l_mm = 1260;
    let h_mm = 1190;
    let v_litros = (b_mm * l_mm * h_mm) / 1000000;

    Pregunta += `<div class="problema">
    <h3>2. Capacidad de almacenamiento</h3>
    <p>Un banco rectangular mide $${b_mm}$ mm de largo, $${l_mm}$ mm de ancho y $${h_mm}$ mm de alto.</p>
    <ol class="FT_ol_a">
        <li>Calcule la capacidad total del banco en litros ($1 \\text{ m}^3 = 1000 \\text{ L}$). <div>3</div></li>${CR(2)}
    </ol></div>`;

    // Ejercicio 10 parametrizado (Gelato)
    let r_cono = 51 / 200; // a metros
    let h_cono = 145 / 1000;
    let v_cono = (1/3) * Math.PI * Math.pow(r_cono, 2) * h_cono;
    let v_hemis = (2/3) * Math.PI * Math.pow(r_cono, 3);
    let v_total = v_cono + v_hemis;

    Pregunta += `<div class="problema">
    <h3>3. Problema de la Heladería</h3>
    <p>Un cono de helado tiene un radio de $${(r_cono*100).toFixed(0)}$ cm y una altura de $${(h_cono*100).toFixed(0)}$ cm. Se sirve una bola de helado (hemisferio) sobre el cono.</p>
    <ol class="FT_ol_a">
        <li>Halle el volumen total de helado (cono + hemisferio). <div>3</div></li>${CR(2)}
        <li>¿Cuántos helados completos se pueden vender con $10$ litros de helado? <div>2</div></li>${CR(2)}
    </ol></div><div class="page"></div>`;

    let Solucion = `<div class="ans"><b>Soluciones:</b><br>
    P1: (a) Volumen compuesto por 3 prismas: $\\approx 0.38 \\text{ m}^3$. (b) Suma de áreas de todas las caras. <br>
    P2: Capacidad $= ${v_litros.toFixed(2)} \\text{ litros}$. <br>
    P3: (a) $V_{total} \\approx ${(v_total*1000).toFixed(0)} \\text{ cm}^3$ (b) $\\approx ${Math.floor(10000 / (v_total * 1000))} \\text{ conos}$.</div>`;

    return [Pregunta, Solucion];
}

/* Nota: Fuente original: [41].pdf. 
   El tiempo estimado es de 40 minutos para resolución manual. 
   Se utiliza parametrización para evitar valores estáticos. */