//15.2.7.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
    return 'Problemas Combinados: Normal y Binomial';
}
export function tipo() {
    return 0
}

function P1(numeroPregunta) {
    // Probabilidad P(X > x)
    let mu = Math.floor(Math.random() * 50 + 150);
    let sigma = Math.floor(Math.random() * 5 + 10);
    let limit = mu + Math.floor(Math.random() * 10 + 5);

    let p = tlacu.stat.normalcdf(limit, 1e99, mu, sigma);

    let M = Math.floor(Math.random() * 5 + 8); // intentos (8 a 12)
    let q = Math.floor(Math.random() * 3 + 2); // éxitos (2 a 4)

    let P = `${numeroPregunta + 1}.- El peso de las manzanas de un huerto se distribuye normalmente con una media de ${mu} gramos y una desviación estándar de ${sigma} gramos. Las manzanas que pesan más de ${limit} gramos se clasifican como "Premium". Si se seleccionan al azar una muestra de ${M} manzanas de este huerto, ¿cuál es la probabilidad de que exactamente ${q} de ellas sean de la categoría Premium?`;

    let ans = tlacu.stat.binomialpdf(M, p, q);

    let R = [ans < 1e-4 ? `$${tlacu.NotacionCientifica(ans)}$` : `$${ans.toFixed(4)}$`];

    for (let i = 1; i < 6; ++i) {
        do {
            let p_dummy = p + (Math.random() * 0.4 - 0.2);
            if (p_dummy <= 0) p_dummy = 0.01;
            if (p_dummy >= 1) p_dummy = 0.99;
            let ans_dummy = tlacu.stat.binomialpdf(M, p_dummy, q);
            R[i] = ans_dummy < 1e-4 ? `$${tlacu.NotacionCientifica(ans_dummy)}$` : `$${ans_dummy.toFixed(4)}$`;
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R];
}

function P2(numeroPregunta) {
    // Probabilidad P(X < x)
    let mu = Math.floor(Math.random() * 200 + 800);
    let sigma = Math.floor(Math.random() * 50 + 50);
    let limit = mu - Math.floor(Math.random() * 50 + 20);

    let p = tlacu.stat.normalcdf(-1e99, limit, mu, sigma);

    let M = Math.floor(Math.random() * 4 + 6); // intentos (6 a 9)
    let q = Math.floor(Math.random() * 3 + 2); // éxitos (2 a 4)

    let P = `${numeroPregunta + 1}.- La vida útil de unos componentes electrónicos sigue una distribución normal con una media de ${mu} horas y una desviación estándar de ${sigma} horas. Un componente es considerado "defectuoso" si tiene una vida útil menor a ${limit} horas. Si revisamos un empaque con ${M} de estos componentes, ¿qué tan probable es tener preciasmente ${q} componentes defectuosos?`;

    let ans = tlacu.stat.binomialpdf(M, p, q);

    let R = [ans < 1e-4 ? `$${tlacu.NotacionCientifica(ans)}$` : `$${ans.toFixed(4)}$`];

    for (let i = 1; i < 6; ++i) {
        do {
            let p_dummy = p + (Math.random() * 0.4 - 0.2);
            if (p_dummy <= 0) p_dummy = 0.01;
            if (p_dummy >= 1) p_dummy = 0.99;
            let ans_dummy = tlacu.stat.binomialpdf(M, p_dummy, q);
            R[i] = ans_dummy < 1e-4 ? `$${tlacu.NotacionCientifica(ans_dummy)}$` : `$${ans_dummy.toFixed(4)}$`;
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R];
}

function P3(numeroPregunta) {
    // Probabilidad P(x1 < X < x2)
    let mu = Math.floor(Math.random() * 10 + 40);
    let sigma = Math.floor(Math.random() * 3 + 4);
    let limit1 = mu - Math.floor(Math.random() * 5 + 2);
    let limit2 = mu + Math.floor(Math.random() * 5 + 2);

    let p = tlacu.stat.normalcdf(limit1, limit2, mu, sigma);

    let M = Math.floor(Math.random() * 3 + 5); // intentos (5 a 7)
    let q = Math.floor(Math.random() * 2 + 3); // éxitos (3 a 4)

    let P = `${numeroPregunta + 1}.- El tiempo que tarda un estudiante en resolver un examen de matemáticas tiene aproximadamente una distribución normal con una media de ${mu} minutos y una desviación estándar de ${sigma} minutos. El tiempo es considerado acorde a la media esperada si se encuentra entre los ${limit1} y ${limit2} minutos. Al evaluar al azar el tiempo de ${M} estudiantes, ¿cuál es la probabilidad de que exactamente ${q} de ellos logren terminar dentro del tiempo acorde esperado?`;

    let ans = tlacu.stat.binomialpdf(M, p, q);

    let R = [ans < 1e-4 ? `$${tlacu.NotacionCientifica(ans)}$` : `$${ans.toFixed(4)}$`];

    for (let i = 1; i < 6; ++i) {
        do {
            let p_dummy = p + (Math.random() * 0.4 - 0.2);
            if (p_dummy <= 0) p_dummy = 0.01;
            if (p_dummy >= 1) p_dummy = 0.99;
            let ans_dummy = tlacu.stat.binomialpdf(M, p_dummy, q);
            R[i] = ans_dummy < 1e-4 ? `$${tlacu.NotacionCientifica(ans_dummy)}$` : `$${ans_dummy.toFixed(4)}$`;
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
