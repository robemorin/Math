//15.2.4.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
    return 'Distribución Normal Inversa Aplicaciones';
}
export function tipo() {
    return 0
}

function P1(numeroPregunta) {
    // Top P% (Right tail)
    let mu = Math.floor(Math.random() * 200 + 1000); // 1000 a 1200 puntos
    let sigma = Math.floor(Math.random() * 50 + 100);
    let p_pct = Math.floor(Math.random() * 15 + 5); // del 5% al 20%
    let p = p_pct / 100;

    let P = `${numeroPregunta + 1}.- Las puntuaciones en un examen nacional de ingreso a la universidad se distribuyen normalmente con una media de ${mu} puntos y una desviación estándar de ${sigma} puntos. Si una universidad de prestigio decide admitir únicamente al mejor ${p_pct}% de los aspirantes, ¿cuál es el puntaje mínimo requerido para ser admitido?`;

    // Para InvNorm se requiere el área a la izquierda: 1 - probabilidad_derecha
    let area_izq = 1 - p;
    let S = tlacu.stat.invNorm(area_izq, mu, sigma);
    let R = [`$${S.toFixed(2)}$`];

    for (let i = 1; i < 6; ++i) {
        do {
            let p_dummy = p + (Math.random() * 0.2 - 0.1); // dummy prob
            if (p_dummy < 0) p_dummy = 0.01;
            if (p_dummy > 0.99) p_dummy = 0.99;
            let S_dummy = tlacu.stat.invNorm(p_dummy, mu, sigma);
            R[i] = `$${S_dummy.toFixed(2)}$`;
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R];
}

function P2(numeroPregunta) {
    // Bottom P% (Left tail)
    let mu = Math.floor(Math.random() * 10 + 40); // 40 a 50 meses
    let sigma = Math.floor(Math.random() * 4 + 3);
    let p_pct = Math.floor(Math.random() * 10 + 2); // del 2% al 12%
    let p = p_pct / 100;

    let P = `${numeroPregunta + 1}.- La vida útil de cierto electrodoméstico sigue una distribución normal con media de ${mu} meses y desviación estándar de ${sigma} meses. El fabricante desea ofrecer una garantía de reemplazo gratuito, pero solo quiere que aplique para el ${p_pct}% de los aparatos que fallan más rápido. ¿Cuántos meses de garantía debe ofrecer como máximo?`;

    let S = tlacu.stat.invNorm(p, mu, sigma);
    let R = [`$${S.toFixed(2)}$`];

    for (let i = 1; i < 6; ++i) {
        do {
            let p_dummy = p + (Math.random() * 0.2 - 0.1);
            if (p_dummy < 0) p_dummy = 0.01;
            if (p_dummy > 0.99) p_dummy = 0.99;
            let S_dummy = tlacu.stat.invNorm(1 - p_dummy, mu, sigma);
            R[i] = `$${S_dummy.toFixed(2)}$`;
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R];
}

function P3(numeroPregunta) {
    // Central P% (Middle)
    let mu = Math.floor(Math.random() * 10 + 170); // 170 a 180 cm
    let sigma = Math.floor(Math.random() * 4 + 4);
    let p_pct = Math.floor(Math.random() * 20 + 70); // del 70 al 90%
    let p = p_pct / 100;

    let P = `${numeroPregunta + 1}.- La estatura de los hombres adultos de una ciudad se distribuye normalmente con media de ${mu} cm y desviación estándar de ${sigma} cm. Un fabricante de ropa desea diseñar una talla estándar que le quede cómodamente al ${p_pct}% central de esta población. ¿Cuáles son la estatura mínima y máxima que abarcará esta talla estándar?`;

    // El área restante se divide en ambas colas
    let area_izq_1 = (1 - p) / 2;
    let area_izq_2 = 1 - area_izq_1;

    let S1 = tlacu.stat.invNorm(area_izq_1, mu, sigma);
    let S2 = tlacu.stat.invNorm(area_izq_2, mu, sigma);

    let R = [`Entre $${S1.toFixed(2)}$ y $${S2.toFixed(2)}$ cm`];

    for (let i = 1; i < 6; ++i) {
        do {
            let delta = (Math.random() * 1.5 + 0.5) * sigma;
            let S1_dummy = mu - delta;
            let S2_dummy = mu + delta;
            R[i] = `Entre $${S1_dummy.toFixed(2)}$ y $${S2_dummy.toFixed(2)}$ cm`;
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R];
}

function P4(numeroPregunta) {
    // Percentil (Left tail)
    let mu = Math.floor(Math.random() * 5 + 60); // 60 a 65 kg
    let sigma = Math.floor(Math.random() * 3 + 5);
    let p_pct = Math.floor(Math.random() * 15 + 75); // percentil 75 a 90
    let p = p_pct / 100;

    let P = `${numeroPregunta + 1}.- El peso de los perros adultos de cierta raza sigue una distribución normal con una media de ${mu} kg y una desviación estándar de ${sigma} kg. Para clasificar en la categoría de "peso pesado" en una competencia, un perro debe estar en el percentil ${p_pct} de peso o superior. ¿Cuál es el peso mínimo para entrar en esta categoría?`;

    // El percentil p_pct significa que el área a la izquierda es p_pct / 100
    let S = tlacu.stat.invNorm(p, mu, sigma);
    let R = [`$${S.toFixed(2)}$ kg`];

    for (let i = 1; i < 6; ++i) {
        do {
            let p_dummy = p + (Math.random() * 0.2 - 0.1);
            if (p_dummy < 0) p_dummy = 0.01;
            if (p_dummy > 0.99) p_dummy = 0.99;
            let S_dummy = tlacu.stat.invNorm(1 - p_dummy, mu, sigma);
            R[i] = `$${S_dummy.toFixed(2)}$ kg`;
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R];
}


export async function pregunta(numeroPregunta) {
    try {
        const a = Math.random();
        if (a < 1 / 4) return P1(numeroPregunta);
        if (a < 2 / 4) return P2(numeroPregunta);
        if (a < 3 / 4) return P3(numeroPregunta);
        return P4(numeroPregunta);
    } catch (error) {
        console.error('Error:', error);
    }
}
