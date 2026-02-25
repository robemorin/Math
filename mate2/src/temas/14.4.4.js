//14.4.4.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Distribución Binomial III';
}
export function tipo() {
    return 0
}

export async function pregunta(numeroPregunta) {
    try {
        let n = Math.round(Math.random() * 17 + 6)
        let li = Math.round(Math.random() * n)
        let lu = Math.round(Math.random() * n)
        let p = Math.round(Math.random() * 950 + 50) / 1000
        let legenda = `Error!`

        if (li > lu) {
            [li, lu] = [lu, li]
        }

        // Adaptación para que la notación matemática ($P(...)$) concuerde con los límites [li, lu]
        if (li === lu) {
            legenda = `X = ${li}`
        } else if (li === 0) {
            legenda = Math.random() < 0.5 ? `X \\leq ${lu}` : `X < ${lu + 1}`
        } else if (lu === n) {
            legenda = Math.random() < 0.5 ? `X \\geq ${li}` : `X > ${li - 1}`
        } else {
            let limitInf = Math.random() < 0.5 ? `${li} \\leq ` : `${li - 1} < `
            let limitSup = Math.random() < 0.5 ? ` \\leq ${lu}` : ` < ${lu + 1}`
            legenda = `${limitInf} X ${limitSup}`
        }

        const P = `${numeroPregunta + 1}.- Considere $X \\sim B(${n}, ${p.toPrecision(3)})$, calcule $P(${legenda})$.`;

        let res = tlacu.stat.binomialcdf_R(n, p, li, lu);
        const R = [`$${res.toPrecision(3)}$`];

        for (let i = 1; i < 6; ++i) {
            do {
                let liDummy = Math.round(Math.random() * n)
                let luDummy = Math.round(Math.random() * n)
                if (liDummy > luDummy) {
                    [liDummy, luDummy] = [luDummy, liDummy]
                }
                let resDummy = tlacu.stat.binomialcdf_R(n, p, liDummy, luDummy);
                R[i] = `$${resDummy.toPrecision(3)}$`;
            } while (tlacu.pregunta.hayRepetidos(R))
        }

        return [P, R];

    } catch (error) {
        console.error('Error:', error);
    }
}
