//15.2.5.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
    return 'Cálculo de Parámetros en la Distribución Normal';
}
export function tipo() {
    return 0
}

function P1(numeroPregunta) {
    // Ambas probabilidades son menores (cola izquierda) P(X < x1) y P(X < x2)
    let mu = Math.floor(Math.random() * 50 + 50);
    let sigma = Math.floor(Math.random() * 10 + 5);

    let d1 = Math.floor(Math.random() * sigma + 1);
    let d2 = Math.floor(Math.random() * sigma + 2);
    if (d1 === d2) d2 += 1; // Para evitar que sean equidistantes/simétricos

    let x1 = mu - d1;
    let x2 = mu + d2;

    let p1 = tlacu.stat.normalcdf(-1e99, x1, mu, sigma);
    let p2 = tlacu.stat.normalcdf(-1e99, x2, mu, sigma);

    let ask_mu = Math.random() < 0.5;
    let word = ask_mu ? 'la media ($\\mu$)' : 'la desviación estándar ($\\sigma$)';
    let ans = ask_mu ? mu : sigma;

    let P = `${numeroPregunta + 1}.- Sea $X$ una variable aleatoria con distribución normal. Se sabe que $P(X < ${x1}) = ${p1.toFixed(4)}$ y $P(X < ${x2}) = ${p2.toFixed(4)}$. Con esta información, determine el valor de ${word}.`;

    let R = [`$${ans}$`];

    for (let i = 1; i < 6; ++i) {
        do {
            let dummy = ans + Math.floor(Math.random() * 10 - 5);
            if (dummy <= 0 && !ask_mu) dummy = ans + Math.floor(Math.random() * 5 + 1); // sigma siempre positivo
            R[i] = `$${dummy}$`;
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R];
}

function P2(numeroPregunta) {
    // Probabilidades cruzadas: P(X < x1) y P(X > x2) (uno de cada cola)
    let mu = Math.floor(Math.random() * 50 + 100);
    let sigma = Math.floor(Math.random() * 10 + 5);

    let d1 = Math.floor(Math.random() * sigma + 1);
    let d2 = Math.floor(Math.random() * sigma + 2);
    if (d1 === d2) d2 += 1; // Para evitar simetría

    let x1 = mu - d1;
    let x2 = mu + d2;

    let p1 = tlacu.stat.normalcdf(-1e99, x1, mu, sigma); // P(X < x1)
    let p2 = tlacu.stat.normalcdf(x2, 1e99, mu, sigma);  // P(X > x2)

    let ask_mu = Math.random() < 0.5;
    let word = ask_mu ? 'la media ($\\mu$)' : 'la desviación estándar ($\\sigma$)';
    let ans = ask_mu ? mu : sigma;

    let P = `${numeroPregunta + 1}.- En una distribución normal, se observó que la probabilidad de obtener un valor menor a ${x1} es de ${p1.toFixed(4)} ($P(X < ${x1}) = ${p1.toFixed(4)}$), mientras que la probabilidad de superar los ${x2} es de ${p2.toFixed(4)} ($P(X > ${x2}) = ${p2.toFixed(4)}$). Calcule ${word}.`;

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

function P3(numeroPregunta) {
    // Ambas probabilidades son mayores (cola derecha) P(X > x1) y P(X > x2) y pide AHORA AMBOS parámetros
    let mu = Math.floor(Math.random() * 200 + 500);
    let sigma = Math.floor(Math.random() * 20 + 10);

    let d1 = Math.floor(Math.random() * sigma + 1);
    let d2 = Math.floor(Math.random() * sigma + 2);
    if (d1 === d2) d2 += 1; // Para evitar simetría

    let x1 = mu - d1;
    let x2 = mu + d2;

    let p1 = tlacu.stat.normalcdf(x1, 1e99, mu, sigma); // P(X > x1)
    let p2 = tlacu.stat.normalcdf(x2, 1e99, mu, sigma); // P(X > x2)

    let P = `${numeroPregunta + 1}.- Se sabe que una variable aleatoria $X$ tiene una distribución normal estadística y cumple con las condiciones de que $P(X > ${x1}) = ${p1.toFixed(4)}$ y $P(X > ${x2}) = ${p2.toFixed(4)}$. Con esto en mente, modele un sistema de ecuaciones para encontrar el valor de la media $\\mu$ y la desviación estándar $\\sigma$.`;

    let R = [`$\\mu = ${mu}$, $\\sigma = ${sigma}$`];

    for (let i = 1; i < 6; ++i) {
        do {
            let mu_dummy = mu + Math.floor(Math.random() * 20 - 10);
            let sigma_dummy = sigma + Math.floor(Math.random() * 10 - 5);
            if (sigma_dummy <= 0) sigma_dummy = sigma + Math.floor(Math.random() * 5 + 1);
            R[i] = `$\\mu = ${mu_dummy}$, $\\sigma = ${sigma_dummy}$`;
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
