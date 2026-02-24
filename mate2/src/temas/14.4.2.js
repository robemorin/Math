//14.4.2.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
    return 'Distribución Binomial Aplicaciones';
}
export function tipo() {
    return 0
}

function P1(numeroPregunta) {
    let n = Math.ceil(Math.random() * 5 + 20)
    let r = Math.ceil(Math.random() * (n - 2))

    let P = `${numeroPregunta + 1}.- Usando tu calculadora calcula $\\binom{${n}}{${r}}$ (también denotado como $_{${n}}C_{${r}}$).`

    let R = [`$${tlacu.stat.nCr(n, r)}$`]
    for (let i = 1; i < 6; ++i) {
        do {
            let nD = Math.ceil(Math.random() * 5 + 20)
            let rD = Math.ceil(Math.random() * (nD - 2))
            R[i] = `$${tlacu.stat.nCr(nD, rD)}$`
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R]
}

function P2(numeroPregunta) {
    let n = Math.ceil(Math.random() * 5 + 20)
    let r = Math.ceil(Math.random() * (n - 4) + 2)

    let P = `${numeroPregunta + 1}.- Calcula la probabilidad de obtener exactamente ${r} caras al lanzar ${n} monedas (suponga que la moneda es justa).`

    let S = tlacu.stat.binomialpdf(n, 0.5, r)
    let R = [S < 1e-3 ? `$${tlacu.NotacionCientifica(S)}$` : `$${S.toFixed(4)}$`]

    for (let i = 1; i < 6; ++i) {
        do {
            let S_dummy = Math.random();
            if (Math.random() < 0.3) S_dummy = tlacu.stat.binomialpdf(n, Math.random() * 0.5 + 0.1, Math.floor(Math.random() * n));
            R[i] = S_dummy < 1e-3 ? `$${tlacu.NotacionCientifica(S_dummy)}$` : `$${S_dummy.toFixed(4)}$`;
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R]
}

function P3(numeroPregunta) {
    let n = Math.ceil(Math.random() * 5 + 20)
    let p = (Math.random() * 0.8 + 0.1).toFixed(3)
    let r = Math.ceil(Math.random() * (n - 6) + 3)

    let P = `${numeroPregunta + 1}.- La probabilidad de que un auto vaya a exceso de velocidad por una autopista en particular es de ${p}. Si han pasado ${n} autos, ¿cuál es la probabilidad de que <strong>al menos</strong> ${r} autos hayan ido a exceso de velocidad?`;

    let S = tlacu.stat.binomialcdf_R(n, Number(p), r, n)
    let R = [S < 1e-3 ? `$${tlacu.NotacionCientifica(S)}$` : `$${S.toFixed(4)}$`]

    for (let i = 1; i < 6; ++i) {
        do {
            let S_dummy = Math.random();
            R[i] = S_dummy < 1e-3 ? `$${tlacu.NotacionCientifica(S_dummy)}$` : `$${S_dummy.toFixed(4)}$`;
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R]
}

function P4(numeroPregunta) {
    let n = Math.ceil(Math.random() * 5 + 20)
    let p = (Math.random() * 0.8 + 0.1).toFixed(3)
    let r = Math.ceil(Math.random() * (n - 6) + 3)

    let P = `${numeroPregunta + 1}.- La probabilidad de que una persona compre refresco de la marca X en vez de la competencia es de ${p}. Si ${n} personas compraron refresco, ¿cuál es la probabilidad de que <strong>a lo más</strong> ${r} personas hayan preferido la marca X?`;

    let S = tlacu.stat.binomialcdf(n, Number(p), r)
    let R = [S < 1e-3 ? `$${tlacu.NotacionCientifica(S)}$` : `$${S.toFixed(4)}$`]

    for (let i = 1; i < 6; ++i) {
        do {
            let S_dummy = Math.random();
            R[i] = S_dummy < 1e-3 ? `$${tlacu.NotacionCientifica(S_dummy)}$` : `$${S_dummy.toFixed(4)}$`;
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R]
}

function P5(numeroPregunta) {
    let p = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
    let sum = p.reduce((a, b) => a + b, 0);

    let tableP = [];
    let S_expected = 0;

    for (let k = 0; k < 5; ++k) {
        let val = Number((100 * p[k] / sum).toFixed(1));
        tableP.push(val);
    }
    let last = 100 - tableP.reduce((a, b) => a + b, 0);
    tableP.push(Number(last.toFixed(1)));

    let P = `${numeroPregunta + 1}.- La siguiente tabla muestra el porcentaje poblacional según la cantidad de hijos por familia:
    <div style="display:flex; justify-content:center; margin:10px 0;">
    <table border="1" style="border-collapse: collapse; text-align:center;" cellpadding="5">
        <tr><th>Hijos (x)</th><th>Porcentaje (%)</th></tr>`;
    for (let k = 0; k < 6; ++k) {
        P += `<tr><td>${k}</td><td>${tableP[k]}%</td></tr>`;
        S_expected += k * (tableP[k] / 100);
    }
    P += `</table></div>Calcule la esperanza matemática (valor esperado) del número de hijos por familia.`;

    let R = [`$${S_expected.toFixed(2)}$`]
    for (let i = 1; i < 6; ++i) {
        do {
            let dummy = (Math.random() * 5).toFixed(2);
            R[i] = `$${dummy}$`;
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R]
}

function P6(numeroPregunta) {
    let n = Math.ceil(Math.random() * 5 + 20)
    let p = (Math.random() * 0.8 + 0.1).toFixed(3)
    let r = Math.ceil(Math.random() * (n - 10) + 5)
    let mR = Math.ceil(Math.random() * (n - r - 1) + r + 1)

    let P = `${numeroPregunta + 1}.- La probabilidad de que un árbol sobreviva más de un año es de ${p}. Si se toma una muestra de ${n} árboles, calcula la probabilidad de que hayan sobrevivido <strong>entre ${r} y ${mR}</strong> árboles (ambos inclusivos).`;

    let S = tlacu.stat.binomialcdf_R(n, Number(p), r, mR)
    let R = [S < 1e-3 ? `$${tlacu.NotacionCientifica(S)}$` : `$${S.toFixed(4)}$`]

    for (let i = 1; i < 6; ++i) {
        do {
            let S_dummy = Math.random();
            R[i] = S_dummy < 1e-3 ? `$${tlacu.NotacionCientifica(S_dummy)}$` : `$${S_dummy.toFixed(4)}$`;
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R]
}

function P7(numeroPregunta) {
    let n = Math.ceil(Math.random() * 5 + 30)
    let p = (Math.random() * 0.1 + 0.01).toFixed(3)
    let r = Math.ceil(Math.random() * 3 + 1)

    let P = `${numeroPregunta + 1}.- Una fábrica produce componentes electrónicos con una tasa de defectos del ${Number((p * 100)).toFixed(1)}%. Si se revisa un lote de ${n} componentes al azar, ¿cuál es la probabilidad de encontrar <strong>exactamente</strong> ${r} componentes defectuosos?`;

    let S = tlacu.stat.binomialpdf(n, Number(p), r)
    let R = [S < 1e-3 ? `$${tlacu.NotacionCientifica(S)}$` : `$${S.toFixed(4)}$`]

    for (let i = 1; i < 6; ++i) {
        do {
            let S_dummy = Math.random() * 0.5;
            R[i] = S_dummy < 1e-3 ? `$${tlacu.NotacionCientifica(S_dummy)}$` : `$${S_dummy.toFixed(4)}$`;
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R]
}

function P8(numeroPregunta) {
    let n = Math.ceil(Math.random() * 100 + 100)
    let p = (Math.random() * 0.5 + 0.1).toFixed(3)

    let tipoV = Math.random() < 0.5 ? 'el valor esperado (esperanza)' : 'la desviación estándar';

    let P = `${numeroPregunta + 1}.- Un examen de opción múltiple tiene ${n} preguntas. La probabilidad de adivinar correctamente cualquier pregunta es de ${p}. Calcula ${tipoV} del número de respuestas correctas.`;

    let ans;
    if (tipoV === 'el valor esperado (esperanza)') {
        ans = n * Number(p);
    } else {
        ans = Math.sqrt(n * Number(p) * (1 - Number(p)));
    }

    let R = [`$${ans.toFixed(2)}$`]

    for (let i = 1; i < 6; ++i) {
        do {
            let S_dummy = Math.random() * n;
            if (tipoV !== 'el valor esperado (esperanza)') S_dummy = Math.random() * 20;
            R[i] = `$${S_dummy.toFixed(2)}$`;
        } while (tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R]
}

export async function pregunta(numeroPregunta) {
    try {
        const a = Math.random();
        if (a < 1 / 8) return P1(numeroPregunta);
        if (a < 2 / 8) return P2(numeroPregunta);
        if (a < 3 / 8) return P3(numeroPregunta);
        if (a < 4 / 8) return P4(numeroPregunta);
        if (a < 5 / 8) return P5(numeroPregunta);
        if (a < 6 / 8) return P6(numeroPregunta);
        if (a < 7 / 8) return P7(numeroPregunta);
        return P8(numeroPregunta);
    } catch (error) {
        console.error('Error:', error);
    }
}
