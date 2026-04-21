import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Repaso: Sucesiones, Series y Finanzas';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

/**
 * Ficha de practica basada en ejercicios del PDF [28].pdf
 * Tiempo estimado: 40 minutos.
 */
export async function pregunta() {
    // Variables dinámicas para problemas financieros (Ej 12)
    let inv = 7000 + Math.floor(Math.random() * 3) * 1000;
    let rate = 6;
    let years = 3;

    // Variables dinámicas para sucesiones (Ej 13)
    let k = Math.floor(Math.random() * 5) + 3;
    let t1 = k;
    let t2 = 4;
    let t3 = k * k - 1;

    let Pregunta = `<div class="problema2">
    <h3>Práctica de Sucesiones y Aplicaciones Financieras</h3>
    
    <div class="problema2">1.- <b>Aplicaciones Financieras:</b> Se invierten $${inv} al ${rate}\\% anual compuesto. Calcule el valor de la inversión tras ${years} años si el interés se capitaliza:
    <ol class="FT_ol_a">
        <li>Anualmente: <div>2</div></li>${CR(1)}
        <li>Trimestralmente: <div>2</div></li>${CR(1)}
        <li>Mensualmente: <div>2</div></li>${CR(1)}
    </ol></div>

    <div class="problema2">2.- <b>Sucesiones Geométricas:</b> Dadas las expresiones $${k}, ${t2}, ${t3}$ como términos consecutivos de una sucesión geométrica:
    <ol class="FT_ol_a">
        <li>Halle el valor de $k$ (considerando $k > 0$). <div>3</div></li>${CR(2)}
        <li>Determine la razón común $r$ de la sucesión. <div>2</div></li>${CR(1)}
    </ol></div>

    <div class="problema2">3.- <b>Modelización (Aritmética):</b> Una persona camina $10\\text{ km}$ en la primera semana. Cada semana posterior, aumenta su distancia en $0.5\\text{ km}$.
    <ol class="FT_ol_a">
        <li>Escriba el término general $u_n$ que modela la distancia recorrida en la semana $n$. <div>2</div></li>${CR(1)}
        <li>¿Qué distancia recorrerá en la semana 52? <div>2</div></li>${CR(2)}
        <li>¿Cuál es la distancia total recorrida al finalizar el año (52 semanas)? <div>3</div></li>${CR(2)}
    </ol></div>

    <div class="problema2">4.- <b>Series Infinitas:</b> Calcule la suma de la siguiente serie geométrica infinita: $S = \\frac{14}{3} + \\frac{4}{3} + \\frac{8}{21} + \\dots$
    <div>3</div>${CR(3)}
    </div>
    </div>`;

    // Lógica de soluciones
    let sol1a = (inv * Math.pow(1 + rate/100, years)).toFixed(2);
    let sol1b = (inv * Math.pow(1 + (rate/100)/4, years * 4)).toFixed(2);
    let sol1c = (inv * Math.pow(1 + (rate/100)/12, years * 12)).toFixed(2);
    
    let Solucion = `<div class="ans"><b>Soluciones:</b><br>
    <b>P1:</b> (a) $${sol1a} (b) $${sol1b} (c) $${sol1c}<br>
    <b>P2:</b> $k$ se obtiene resolviendo $\\frac{4}{k} = \\frac{k^2-1}{4} \\Rightarrow k^3 - k = 16$. Resolviendo, $k \\approx 2.65$. $r = \\frac{4}{k}$.<br>
    <b>P3:</b> (a) $u_n = 10 + (n-1)0.5$ (b) $u_{52} = 10 + 51(0.5) = 35.5\\text{ km}$. (c) $S_{52} = \\frac{52}{2}(10 + 35.5) = 1183\\text{ km}$.<br>
    <b>P4:</b> $u_1 = 14/3$, $r = (4/3) / (14/3) = 2/7$. $S = \\frac{14/3}{1 - 2/7} = \\frac{14/3}{5/7} = \\frac{98}{15} \\approx 6.53$.
    </div>`;

    return [Pregunta, Solucion];
}