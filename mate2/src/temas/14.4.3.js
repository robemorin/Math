//14.4.3.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
    return 'Distribución Binomial II';
}
export function tipo() {
    return 0
}

export async function pregunta(numeroPregunta) {
    try {
        let n = Math.round(Math.random() * 17 + 3);
        let r = Math.round(Math.random() * n);
        let p = Math.round(Math.random() * 950 + 50) / 1000;

        const P = `${numeroPregunta + 1}.- Considere $X \\sim B(${n}, ${p.toPrecision(3)})$, calcule $P(X = ${r})$.`;

        let res = tlacu.stat.binomialpdf(n, p, r);
        // Usamos toPrecision(3) para igualar el nivel de las respuestas requeridas
        const R = [`$${res.toPrecision(3)}$`];

        for (let i = 1; i < 6; ++i) {
            do {
                let pDummy = Math.round(Math.random() * 950 + 50) / 1000;
                let rDummy = Math.round(Math.random() * n);
                let resDummy = tlacu.stat.binomialpdf(n, pDummy, rDummy);
                R[i] = `$${resDummy.toPrecision(3)}$`;
            } while (tlacu.pregunta.hayRepetidos(R))
        }

        return [P, R];

    } catch (error) {
        console.error('Error:', error);
    }
}
