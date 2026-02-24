//14.4.5.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Esperanza matemática (General)';
}
export function tipo() {
    return 0
}

export async function pregunta(numeroPregunta) {
    try {
        const sum = arr => arr.reduce((a, b) => a + b, 0);

        function crearTablas() {
            let W = [Math.round(Math.random() * 200 + 50)];
            let P = [Math.round(Math.random() * 10 - 5)];
            let d = Math.round(Math.random() * 3 + 1); // d constante para incrementar P armónicamente

            while (sum(W) < 1000) {
                let currentSum = sum(W);
                let rem = 1000 - currentSum;

                if (rem <= 0) break;

                let val = Math.round(Math.random() * 200 + 50);

                if (val >= rem) {
                    W.push(rem); // Garantizamos que la sumatoria sea 1000 exactos sin pasarse
                } else {
                    W.push(val);
                }
                // Mantenemos x de manera estrictamente creciente
                P.push(P[P.length - 1] + d);
            }
            for (let k = 0; k < W.length; ++k) {
                W[k] = W[k] / 1000;
            }
            return [W, P]
        }

        function calcularE(T) {
            let e = 0;
            for (let k = 0; k < T[0].length; ++k) {
                e += T[0][k] * T[1][k];
            }
            return e; // T[0] es la Probabilidad P(X=x_i), T[1] es x_i
        }

        let T = crearTablas();

        let tableHTML = `<div style="overflow-x:auto; margin:10px 0; display:flex; justify-content:center;">
    <table border="1" style="border-collapse: collapse; text-align:center; min-width:300px;" cellpadding="5">
      <tr><th>$x_i$</th>`;
        for (let x of T[1]) tableHTML += `<td>$${x}$</td>`;
        tableHTML += `</tr><tr><th>$P(X=x_i)$</th>`;
        for (let w of T[0]) tableHTML += `<td>$${w.toFixed(3)}$</td>`;
        tableHTML += `</tr></table></div>`;

        const P_texto = `${numeroPregunta + 1}.- Calcule la esperanza matemática $E(X)$ de la siguiente tabla de distribución de probabilidad discreta:<br>${tableHTML} <br>
    <strong>Nota:</strong> Puedes usar la fórmula:  $E(X)=\\sum\\limits_{i\\in I} P(X=x_i)\\cdot x_i$`;

        let res = calcularE(T);
        const R = [`$${res.toPrecision(3)}$`];

        for (let i = 1; i < 6; ++i) {
            do {
                let T_dummy = crearTablas();
                let res_dummy = calcularE(T_dummy);
                R[i] = `$${res_dummy.toPrecision(3)}$`;
            } while (tlacu.pregunta.hayRepetidos(R))
        }

        return [P_texto, R];

    } catch (error) {
        console.error('Error:', error);
    }
}
