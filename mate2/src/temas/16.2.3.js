//16.2.3.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Prueba t para una muestra (Muestra) I';
}
export function tipo() {
    return 0;
}

function generarParametrosValidos() {
    let mu0, n, H1, t, p, askPValue, values;
    do {
        mu0 = Math.floor(Math.random() * 50 + 100);
        n = 13//Math.floor(Math.random() * 8 + 6); // Entre 6 y 13 elementos

        let shift = (Math.random() * 10 - 5);
        let std = Math.floor(Math.random() * 10 + 2);
        //values = [101.3, 108.6, 123.4, 114.8, 118.1, 107.1, 114.4, 120.1, 105.3, 116.6, 106.7, 107.2, 109.5]
        values = [];
        for (let j = 0; j < n; j++) {
            // Aproximación a la distribución normal
            let u1 = Math.random(), u2 = Math.random();
            let z0 = Math.sqrt(-2.0 * Math.log(u1 + 1e-10)) * Math.cos(2.0 * Math.PI * u2);
            let val = Math.round((mu0 + shift + z0 * std) * 10) / 10;
            values.push(val);
        }

        H1 = Math.floor(Math.random() * 3); // 0: >, 1: <, 2: !=

        let res = tlacu.stat.t_test(mu0, values, H1);
        t = res[0];
        p = res[1];

        askPValue = Math.random() < 0.5;
    } while (askPValue && p < 1e-4);

    let ans = askPValue ? p : t;
    let ansStr = tlacu.cs(ans, 3);

    return { mu0, n, H1, ansStr, askPValue, values };
}

export async function pregunta(i, code) {
    try {
        let { mu0, n, H1, ansStr, askPValue, values } = generarParametrosValidos();
        let a = Math.random();
        let P = "";

        let compText = H1 === 0 ? "mayor a" : (H1 === 1 ? "menor a" : "diferente de");
        let queryText = askPValue ? "el valor $p$ (p-value)" : "el valor del estadístico de prueba ($t$)";

        let tablaHTML = '<div style="overflow-x:auto;"><table border="1" cellpadding="5" cellspacing="0" style="margin: 10px auto; border-collapse: collapse; text-align: center;"><tr>';
        for (let j = 0; j < n; j++) {
            tablaHTML += `<td>${values[j]}</td>`;
        }
        tablaHTML += '</tr></table></div>';

        if (a < 1 / 4) {
            P = `${i + 1}.- Se afirma que el peso promedio de un producto es de $\\mu_0 = ${mu0}$ gramos. Se toma una muestra y se obtienen los siguientes pesos en gramos:<br>${tablaHTML}<br>Si se desea probar la hipótesis de que el peso promedio real es ${compText} ${mu0} gramos, ¿cuál es ${queryText}?`;
        } else if (a < 2 / 4) {
            P = `${i + 1}.- Una empresa indica que el tiempo de vida de sus baterías es de ${mu0} horas. Una muestra aleatoria arrojó los siguientes tiempos de vida (en horas):<br>${tablaHTML}<br>Para determinar si el tiempo de vida es ${compText} ${mu0} horas, ¿cuál es ${queryText}?`;
        } else if (a < 3 / 4) {
            P = `${i + 1}.- El rendimiento promedio reportado de un automóvil es de ${mu0} km/l. En pruebas recientes, se obtuvieron los siguientes rendimientos (en km/l):<br>${tablaHTML}<br>Si queremos verificar si el rendimiento real es ${compText} ${mu0} km/l, calcula ${queryText}.`;
        } else {
            P = `${i + 1}.- Históricamente la temperatura promedio de un proceso químico es de $${mu0}^{\\circ}\\text{C}$. Se registran las siguientes mediciones (en $^{\\circ}\\text{C}$):<br>${tablaHTML}<br>Si se plantea la hipótesis de que la temperatura ha cambiado a ser ${compText} $${mu0}^{\\circ}\\text{C}$, halla ${queryText}.`;
        }

        let R = [`$${ansStr}$`];

        for (let j = 1; j < 6; ++j) {
            do {
                let S_dummy;
                if (askPValue) {
                    S_dummy = Math.random(); // p-values están entre 0 y 1
                } else {
                    S_dummy = (Math.random() - 0.5) * 10; // Valores t ficticios entre -5 y 5
                }
                R[j] = `$${tlacu.cs(S_dummy, 3)}$`;
            } while (tlacu.pregunta.hayRepetidos(R))
        }

        return [P, R];

    } catch (error) {
        console.error('Error al cargar la pregunta:', error);
    }
}
