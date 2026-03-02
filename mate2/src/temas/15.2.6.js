//15.2.6.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
    return 'Cálculo de Parámetros en la Distribución Normal Aplicaciones';
}
export function tipo() {
    return 0
}

function P1(numeroPregunta) {
    // Ambas probabilidades son menores (cola izquierda) P(X < x1) y P(X < x2)
    let mu = Math.floor(Math.random() * 500 + 2000); // 2000 a 2500 horas de vida
    let sigma = Math.floor(Math.random() * 100 + 50);

    let d1 = Math.floor(Math.random() * sigma + 1);
    let d2 = Math.floor(Math.random() * sigma + 50);
    if (d1 === d2) d2 += 1;

    let x1 = mu - d1;
    let x2 = mu + d2;

    let p1 = tlacu.stat.normalcdf(-1e99, x1, mu, sigma);
    let p2 = tlacu.stat.normalcdf(-1e99, x2, mu, sigma);

    let ask_mu = Math.random() < 0.5;
    let word = ask_mu ? 'la vida media de los focos' : 'la desviación estándar de la vida útil';
    let ans = ask_mu ? mu : sigma;

    let P = `${numeroPregunta + 1}.- El departamento de control de calidad de una fábrica de focos determinó que el ${(p1 * 100).toFixed(2)}% de los focos se funden antes de llegar a las ${x1} horas de uso, mientras que el ${(p2 * 100).toFixed(2)}% duran menos de ${x2} horas. Si la duración de los focos sigue una distribución normal, calcule ${word}.`;

    let R = [`$${ans}$`];

    for (let i = 1; i < 6; ++i) {
        do {
            let dummy = ans + Math.floor(Math.random() * 100 - 50);
            if (dummy <= 0 && !ask_mu) dummy = ans + Math.floor(Math.random() * 50 + 10);
            R[i] = `$${dummy}$`;
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R];
}

function P2(numeroPregunta) {
    // Probabilidades cruzadas: P(X < x1) y P(X > x2)
    let mu = Math.floor(Math.random() * 50 + 200); // gramos
    let sigma = Math.floor(Math.random() * 10 + 5);

    let d1 = Math.floor(Math.random() * sigma + 1);
    let d2 = Math.floor(Math.random() * sigma + 2);
    if (d1 === d2) d2 += 1;

    let x1 = mu - d1;
    let x2 = mu + d2;

    let p1 = tlacu.stat.normalcdf(-1e99, x1, mu, sigma); // menos de 
    let p2 = tlacu.stat.normalcdf(x2, 1e99, mu, sigma);  // más de 

    let ask_mu = Math.random() < 0.5;
    let word = ask_mu ? 'el peso promedio de las manzanas' : 'la desviación estándar de los pesos';
    let ans = ask_mu ? mu : sigma;

    let P = `${numeroPregunta + 1}.- En una cosecha de manzanas, se encontró que el ${(p1 * 100).toFixed(2)}% de las manzanas pesan menos de ${x1} gramos, y el ${(p2 * 100).toFixed(2)}% pesan más de ${x2} gramos. Asumiendo que el peso se distribuye normalmente, determine ${word}.`;

    let R = [`$${ans}$`];

    for (let i = 1; i < 6; ++i) {
        do {
            let dummy = ans + Math.floor(Math.random() * 20 - 10);
            if (dummy <= 0 && !ask_mu) dummy = ans + Math.floor(Math.random() * 5 + 1);
            R[i] = `$${dummy}$`;
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R];
}

function P3(numeroPregunta) {
    // Ambas probabilidades son mayores (cola derecha) P(X > x1) y P(X > x2)
    let mu = Math.floor(Math.random() * 20 + 70); // puntos
    let sigma = Math.floor(Math.random() * 10 + 5);

    let d1 = Math.floor(Math.random() * sigma + 1);
    let d2 = Math.floor(Math.random() * sigma + 15);
    if (d1 === d2) d2 += 1;

    let x1 = mu + d1;
    let x2 = mu + d2;

    let p1 = tlacu.stat.normalcdf(x1, 1e99, mu, sigma); // más de
    let p2 = tlacu.stat.normalcdf(x2, 1e99, mu, sigma); // más de

    let ask_mu = Math.random() < 0.5;
    let word = ask_mu ? 'el promedio' : 'la desviación estándar';
    let ans = ask_mu ? mu : sigma;

    let P = `${numeroPregunta + 1}.- Los resultados de un examen de certificación siguen una distribución normal. Al analizar los datos, se observó que la probabilidad de obtener una puntuación superior a ${x1} puntos es de ${(p1 * 100).toFixed(2)}%, pero solo el ${(p2 * 100).toFixed(2)}% de los evaluados consiguen rebasar los ${x2} puntos. Determina ${word} de las puntuaciones en dicho examen.`;

    let R = [`$${ans}$`];

    for (let i = 1; i < 6; ++i) {
        do {
            let dummy = ans + Math.floor(Math.random() * 10 - 5);
            if (dummy <= 0 && !ask_mu) dummy = ans + Math.floor(Math.random() * 5 + 1);
            R[i] = `$${dummy}$`;
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R];
}

export async function pregunta(numeroPregunta) {
    try {
        const a = Math.random();
        if (a < 1 / 3) return P1(numeroPregunta);
        if (a < 2 / 3) return P2(numeroPregunta);
        return P3(numeroPregunta);
    } catch (error) {
        console.error('Error:', error);
    }
}
