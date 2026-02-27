//15.2.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
    return 'Distribución Normal Aplicaciones I';
}
export function tipo() {
    return 0
}

function P1(numeroPregunta) {
    let mu = Math.floor(Math.random() * 50 + 200); // 200 a 250 gramos
    let sigma = Math.floor(Math.random() * 10 + 5);
    let x1 = mu - Math.floor(Math.random() * 15 + 1); // menor al promedio

    let P = `${numeroPregunta + 1}.- El peso de las bolsas de papas fritas de una fábrica sigue una distribución normal con una media de ${mu} gramos y una desviación estándar de ${sigma} gramos. ¿Cuál es la probabilidad de que una bolsa elegida al azar pese <strong>menos de</strong> ${x1} gramos?`;

    let S = tlacu.stat.normalcdf(-1e99, x1, mu, sigma);
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
    let mu = Math.floor(Math.random() * 500 + 1000); // 1000 a 1500 horas
    let sigma = Math.floor(Math.random() * 50 + 50);
    let x0 = mu - Math.floor(Math.random() * 100 + 10);
    let x1 = mu + Math.floor(Math.random() * 100 + 10);

    let P = `${numeroPregunta + 1}.- La vida útil de cierto tipo de batería automotriz sigue una distribución normal con media de ${mu} horas y desviación estándar de ${sigma} horas. Determine la probabilidad de que una batería dure <strong>entre ${x0} y ${x1}</strong> horas.`;

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

function P3(numeroPregunta) {
    let mu = Math.floor(Math.random() * 20 + 70); // 70 a 90 puntos
    let sigma = Math.floor(Math.random() * 5 + 5);
    let x0 = mu + Math.floor(Math.random() * 10 + 5); // mayor al promedio

    let P = `${numeroPregunta + 1}.- Las puntuaciones de un examen estandarizado de admisión se distribuyen normalmente con una media de ${mu} puntos y una desviación estándar de ${sigma} puntos. Si se elige a un estudiante al azar, ¿cuál es la probabilidad de que haya obtenido <strong>más de</strong> ${x0} puntos?`;

    let S = tlacu.stat.normalcdf(x0, 1e99, mu, sigma);
    let R = [`$${S.toFixed(4)}$`];

    for (let i = 1; i < 6; ++i) {
        do {
            let S_dummy = Math.random();
            R[i] = `$${S_dummy.toFixed(4)}$`;
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R];
}

function P4(numeroPregunta) {
    let mu = Math.floor(Math.random() * 10 + 160); // 160 a 170 cm
    let sigma = Math.floor(Math.random() * 5 + 4);
    let x = mu + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 10 + 2);
    let isGreater = Math.random() > 0.5;

    let condText = isGreater ? "mayor a" : "menor a";

    let P = `${numeroPregunta + 1}.- La estatura de los estudiantes de una preparatoria sigue una distribución normal con media de ${mu} cm y desviación estándar de ${sigma} cm. Calcule la probabilidad de que un estudiante seleccionado de manera aleatoria tenga una estatura <strong>${condText}</strong> ${x} cm.`;

    let S = isGreater ? tlacu.stat.normalcdf(x, 1e99, mu, sigma) : tlacu.stat.normalcdf(-1e99, x, mu, sigma);
    let R = [`$${S.toFixed(4)}$`];

    for (let i = 1; i < 6; ++i) {
        do {
            let S_dummy = Math.random();
            R[i] = `$${S_dummy.toFixed(4)}$`;
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R];
}

function P5(numeroPregunta) {
    let mu = Math.floor(Math.random() * 200 + 500); // 500 a 700 ml
    let sigma = Math.floor(Math.random() * 10 + 10);
    let delta1 = Math.floor(Math.random() * 15 + 5);
    let delta2 = Math.floor(Math.random() * 15 + 5);
    let x0 = mu - delta1;
    let x1 = mu + delta2;

    let P = `${numeroPregunta + 1}.- El volumen de líquido que rellena una máquina de refrescos está distribuido normalmente con una media de ${mu} ml y una desviación estándar de ${sigma} ml. ¿Cuál es la probabilidad de que una botella elegida al azar contenga <strong>entre ${x0} y ${x1}</strong> ml de líquido?`;

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

export async function pregunta(numeroPregunta) {
    try {
        const a = Math.random();
        if (a < 1 / 5) return P1(numeroPregunta);
        if (a < 2 / 5) return P2(numeroPregunta);
        if (a < 3 / 5) return P3(numeroPregunta);
        if (a < 4 / 5) return P4(numeroPregunta);
        return P5(numeroPregunta);
    } catch (error) {
        console.error('Error:', error);
    }
}
