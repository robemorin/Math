//15.2.3.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
    return 'Distribución Normal Inversa (Cálculo de x)';
}
export function tipo() {
    return 0
}

function P1(numeroPregunta) {
    // Probabilidad de cola izquierda: P(X < x) = p
    let mu = Math.floor(Math.random() * 50 + 50);
    let sigma = Math.floor(Math.random() * 10 + 3);
    let p = (Math.random() * 0.8 + 0.1).toFixed(2); // áreas entre 0.10 y 0.90

    let P = `${numeroPregunta + 1}.- Sea $X$ una variable aleatoria distribuida normalmente con media $\\mu = ${mu}$ y desviación estándar $\\sigma = ${sigma}$. Encuentre el valor de $x$ tal que el área a su izquierda sea equivalente a $${p}$.`;

    let S = tlacu.stat.invNorm(Number(p), mu, sigma);
    let R = [`$${S.toFixed(2)}$`];

    for (let i = 1; i < 6; ++i) {
        do {
            let S_dummy = mu + (Math.random() * 6 - 3) * sigma;
            R[i] = `$${S_dummy.toFixed(2)}$`;
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R];
}

function P2(numeroPregunta) {
    // Probabilidad de cola derecha: P(X > x) = p
    let mu = Math.floor(Math.random() * 40 + 10);
    let sigma = Math.floor(Math.random() * 5 + 2);
    let p = (Math.random() * 0.8 + 0.1).toFixed(2);

    let P = `${numeroPregunta + 1}.- Se tiene una distribución normal con media $\\mu = ${mu}$ y desviación estándar $\\sigma = ${sigma}$. Encuentre el valor de $x$ tal que la probabilidad de obtener un valor mayor a este sea de $${p}$.`;

    // Para InvNorm se requiere el área a la izquierda: 1 - probabilidad_derecha
    let area_izq = 1 - Number(p);
    let S = tlacu.stat.invNorm(area_izq, mu, sigma);
    let R = [`$${S.toFixed(2)}$`];

    for (let i = 1; i < 6; ++i) {
        do {
            let S_dummy = mu + (Math.random() * 6 - 3) * sigma;
            R[i] = `$${S_dummy.toFixed(2)}$`;
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R];
}

function P3(numeroPregunta) {
    // Probabilidad central: P(x1 < X < x2) = p
    let mu = Math.floor(Math.random() * 100 + 100);
    let sigma = Math.floor(Math.random() * 20 + 5);
    // Probabilidades centrales típicas (e.g., 0.90, 0.95, 0.99... o aleatorias grandes)
    let p = (Math.random() * 0.5 + 0.45).toFixed(2); // áreas entre 0.45 y 0.95

    let P = `${numeroPregunta + 1}.- Dada una distribución normal con media $\\mu = ${mu}$ y desviación estándar $\\sigma = ${sigma}$, encuentre los valores simétricos $x_1$ y $x_2$ alrededor de la media que contienen la probabilidad central de $${p}$.`;

    // El área restante se divide en ambas colas
    let area_izq_1 = (1 - Number(p)) / 2;
    let area_izq_2 = 1 - area_izq_1;

    let S1 = tlacu.stat.invNorm(area_izq_1, mu, sigma);
    let S2 = tlacu.stat.invNorm(area_izq_2, mu, sigma);

    let R = [`$x_1 = ${S1.toFixed(2)}, x_2 = ${S2.toFixed(2)}$`];

    for (let i = 1; i < 6; ++i) {
        do {
            let S1_dummy = mu - (Math.random() * 3) * sigma;
            let S2_dummy = mu + (Math.random() * 3) * sigma;
            R[i] = `$x_1 = ${S1_dummy.toFixed(2)}, x_2 = ${S2_dummy.toFixed(2)}$`;
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
