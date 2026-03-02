//14.4.9.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Esperanza matemática (General - Abierta)';
}
export function tipo() {
    return 3;
}

export async function pregunta(i, code, esImprimible = false) {
    if (!window.tlacu) window.tlacu = tlacu;
    try {
        const sum = arr => arr.reduce((a, b) => a + b, 0);

        function crearTablas() {
            let W = [Math.round(Math.random() * 200 + 50)];
            let P = [Math.round(Math.random() * 10 - 5)];
            let d = Math.round(Math.random() * 3 + 1);

            while (sum(W) < 1000) {
                let currentSum = sum(W);
                let rem = 1000 - currentSum;
                if (rem <= 0) break;
                let val = Math.round(Math.random() * 200 + 50);
                if (val >= rem) { W.push(rem); } else { W.push(val); }
                P.push(P[P.length - 1] + d);
            }
            for (let k = 0; k < W.length; ++k) { W[k] = W[k] / 1000; }
            return [W, P]
        }

        function calcularE(T) {
            let e = 0;
            for (let k = 0; k < T[0].length; ++k) {
                e += T[0][k] * T[1][k];
            }
            return e;
        }

        let T = crearTablas();

        let tableHTML = `<div style="overflow-x:auto; margin:10px 0; display:flex; justify-content:center;">
    <table border="1" style="border-collapse: collapse; text-align:center; min-width:300px;" cellpadding="5">
      <tr><th>$x_i$</th>`;
        for (let x of T[1]) tableHTML += `<td>$${x}$</td>`;
        tableHTML += `</tr><tr><th>$P(X=x_i)$</th>`;
        for (let w of T[0]) tableHTML += `<td>$${w.toFixed(3)}$</td>`;
        tableHTML += `</tr></table></div>`;

        const P = `${i + 1}.- Calcule la esperanza matemática $E(X)$ de la siguiente tabla de distribución de probabilidad discreta:<br>${tableHTML}`;

        let res = calcularE(T);
        let ansStr = res.toPrecision(3);
        let dataAttrs = `data-opcion="1" data-tablep="${T[0].join(',')}" data-tablex="${T[1].join(',')}"`;

        if (esImprimible) {
            const respuesta = `$${ansStr}$`
            return [`<p>${P}</p><br><i>(Indica tu respuesta a 3 cifras significativas)</i>`, respuesta]
        }
        render()
        return `
          <div class="pregunta-abierta" ${dataAttrs} style="display: none;">
            <p>${P}</p>
            <p><i>(Indica tu respuesta a 3 cifras significativas)</i></p>
            <p>Respuesta: <math-field></math-field></p>
          </div>
        `;
    } catch (error) {
        console.error('Error al cargar la pregunta:', error);
    }
}

export async function render() {
    window.accionR2P = function (i) {
        let totalPuntos = 1
        let puntos = 0
        let pregunta = document.getElementsByClassName('pregunta-abierta')
        const mathFields = pregunta[i].getElementsByTagName('math-field')
        if (mathFields[0].value === '') return [0, totalPuntos]

        const respuestaUsuario = Number(mathFields[0].value.replace(/\\,/g, '').replace(/\\cdot/g, '*').replace(/\\times/g, '*'));

        let ansCorrecta = 0;
        const opcion = Number(pregunta[i].dataset.opcion);
        if (opcion === 1) {
            const tablePStr = pregunta[i].dataset.tablep;
            const tableXStr = pregunta[i].dataset.tablex;
            const tableP = tablePStr.split(',').map(Number);
            const tableX = tableXStr.split(',').map(Number);
            let s = 0;
            for (let k = 0; k < tableP.length; ++k) {
                s += tableP[k] * tableX[k];
            }
            ansCorrecta = Number(s).toPrecision(3);
        }
        ansCorrecta = Number(ansCorrecta);

        // Verificamos si la respuesta del usuario está dentro de una tolerancia para las 3 cifras significativas
        if (Math.abs(respuestaUsuario - ansCorrecta) / (Math.abs(ansCorrecta) || 1) < 0.005 || respuestaUsuario == ansCorrecta) {
            puntos = 1;
            mathFields[0].style.border = "solid 5px green";
        } else {
            mathFields[0].style.backgroundColor = "red";
        }
        return [puntos, totalPuntos]
    };
}
