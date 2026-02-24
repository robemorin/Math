//14.4.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
    return 'Probabilidad Binomial';
}
export function tipo() {
    return 0
    /*
    0 - Opción múltiple
    1 - Abierto
    2 - Geogebra
    */
}
export async function pregunta(numeroPregunta) {
    try {
        let n = Math.floor(Math.random() * 10 + 6)
        let p = Math.floor(Math.random() * 9 + 1) / 10
        let r = Math.floor(Math.random() * (n + 1))

        const P = `${numeroPregunta + 1}.- Determine la probabilidad $P(X=${r})$ para una distribución binomial $B(${n}, ${p})$.`;

        let res = tlacu.stat.binomialpdf(n, p, r)
        const R = [`$${res.toFixed(4)}$`];

        for (let i = 1; i < 6; ++i) {
            do {
                let nn = Math.floor(Math.random() * 10 + 6)
                let pp = Math.floor(Math.random() * 9 + 1) / 10
                let rr = Math.floor(Math.random() * (nn + 1))
                let res2 = tlacu.stat.binomialpdf(nn, pp, rr)
                R[i] = `$${res2.toFixed(4)}$`
            } while (tlacu.pregunta.hayRepetidos(R))
        }
        return [P, R]

    } catch (error) {
        console.error('Error:', error);
    }
}
