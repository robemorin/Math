//15.2.2.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
    return 'Probabilidad en Distribución Normal II';
}
export function tipo() {
    return 0
}

function P1(numeroPregunta) {
    // Área entre dos valores
    let mu = Math.floor(Math.random() * 40 + 10);
    let sigma = Math.floor(Math.random() * 5 + 2);
    let x0 = mu - Math.floor(Math.random() * (sigma * 2) + 1);
    let x1 = mu + Math.floor(Math.random() * (sigma * 2) + 1);

    let chart = `<div style="display:flex; justify-content:center; margin:10px 0;">
    <tlacuache-dist-normal mean="${mu}" s="${sigma}" xmin="${x0}" xmax="${x1}" xtick="${mu},${x0},${x1}"></tlacuache-dist-normal>
    </div>`;

    let P = `${numeroPregunta + 1}.- Dada una distribución normal con media $\\mu = ${mu}$ y desviación estándar $\\sigma = ${sigma}$, calcule la probabilidad indicada por el área sombreada en la siguiente gráfica: ${chart}`;

    let S = tlacu.stat.normalcdf(x0, x1, mu, sigma);
    let R = [`$${S.toFixed(4)}$`];

    for (let i = 1; i < 6; ++i) {
        do {
            let S_dummy = Math.random();
            R[i] = `$${S_dummy.toFixed(4)}$`;
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R];
}

function P2(numeroPregunta) {
    // Menor que un valor
    let mu = Math.floor(Math.random() * 50 + 50);
    let sigma = Math.floor(Math.random() * 10 + 3);
    let limit = mu + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * (sigma * 2) + 1);

    let chart = `<div style="display:flex; justify-content:center; margin:10px 0;">
    <tlacuache-dist-normal mean="${mu}" s="${sigma}" xmax="${limit}" xtick="${mu},${limit}"></tlacuache-dist-normal>
    </div>`;

    let P = `${numeroPregunta + 1}.- Para una variable aleatoria distribuida normalmente con media $\\mu = ${mu}$ y desviación estándar $\\sigma = ${sigma}$, encuentre la probabilidad correspondiente al área sombreada en la gráfica: ${chart}`;

    let S = tlacu.stat.normalcdf(-1e99, limit, mu, sigma);
    let R = [`$${S.toFixed(4)}$`];

    for (let i = 1; i < 6; ++i) {
        do {
            let S_dummy = Math.random();
            R[i] = `$${S_dummy.toFixed(4)}$`;
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R];
}

function P3(numeroPregunta) {
    // Mayor que un valor
    let mu = Math.floor(Math.random() * 100 + 100);
    let sigma = Math.floor(Math.random() * 20 + 5);
    let limit = mu + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * (sigma * 2) + 1);

    let chart = `<div style="display:flex; justify-content:center; margin:10px 0;">
    <tlacuache-dist-normal mean="${mu}" s="${sigma}" xmin="${limit}" xtick="${mu},${limit}"></tlacuache-dist-normal>
    </div>`;

    let P = `${numeroPregunta + 1}.- Si $X$ sigue una distribución normal con $\\mu = ${mu}$ y $\\sigma = ${sigma}$, ¿cuál es la probabilidad representada por el área sombreada en la figura? ${chart}`;

    let S = tlacu.stat.normalcdf(limit, 1e99, mu, sigma);
    let R = [`$${S.toFixed(4)}$`];

    for (let i = 1; i < 6; ++i) {
        do {
            let S_dummy = Math.random();
            R[i] = `$${S_dummy.toFixed(4)}$`;
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
