//16.2.4.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Prueba t para una muestra (Muestra) II';
}
export function tipo() {
    return 3;
}

function generarParametrosValidos() {
    let mu0, n, H1, t, p, askPValue, values;
    do {
        mu0 = Math.floor(Math.random() * 50 + 100);
        n = Math.floor(Math.random() * 8 + 6); // Entre 6 y 13 elementos

        let shift = (Math.random() * 10 - 5);
        let std = Math.floor(Math.random() * 10 + 2);

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

export async function pregunta(i, code, esImprimible = false) {
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

        if (esImprimible) {
            const respuesta = `$${ansStr}$`
            return [`<p>${P}</p><br><i>(Indica tu respuesta con 3 cifras significativas)</i>`, respuesta]
        }
        render()

        let valuesStr = values.join(',');

        return `
          <div class="pregunta-abierta" data-mu0="${mu0}" data-h1="${H1}" data-askpvalue="${askPValue}" data-values="${valuesStr}" style="display: none;">
            <p>${P}</p>
            <p><i>(Indica tu respuesta con 3 cifras significativas)</i></p>
            <p>Respuesta: <math-field></math-field> </p>
            <p class="respuesta-real mt-2" style="color: #d9534f; font-weight: bold; display: none;">La respuesta correcta es: $${ansStr}$</p>
          </div>
        `;
    } catch (error) {
        console.error('Error al cargar la pregunta:', error);
    }
}

export async function render() {
    window.accionR2P = function (i) {
        let totalPuntos = 1;
        let puntos = 0;
        let pregunta = document.getElementsByClassName('pregunta-abierta');
        const mathFields = pregunta[i].getElementsByTagName('math-field');
        if (mathFields[0].value === '') return [0, totalPuntos];

        const respuestaUsuario = Number(mathFields[0].value.replace(/\\,/g, ''));

        const mu0 = Number(pregunta[i].dataset.mu0);
        const H1 = Number(pregunta[i].dataset.h1);
        const askPValue = pregunta[i].dataset.askpvalue === 'true';
        const valuesStr = pregunta[i].dataset.values;
        const values = valuesStr.split(',').map(Number);

        const res = tlacu.stat.t_test(mu0, values, H1);
        const ansReal = askPValue ? res[1] : res[0];

        const ansCorrectaStr = tlacu.cs(ansReal, 3);
        const ansCorrecta = Number(ansCorrectaStr);

        let precision = 3;
        let num2 = Math.abs(ansCorrecta);
        const maxP10 = Math.ceil(Math.log10(num2));
        const minP10 = maxP10 - precision;
        let errorMargin = minP10 >= 0 ? 0.5 * Math.pow(10, minP10) : 0.5 * Math.pow(10, minP10);

        const respuestaRealElem = pregunta[i].getElementsByClassName('respuesta-real')[0];

        if (Math.abs(respuestaUsuario - ansCorrecta) <= errorMargin || respuestaUsuario == ansCorrecta) {
            puntos = 1;
            mathFields[0].style.border = "solid 5px green";
            mathFields[0].style.backgroundColor = "transparent";
            respuestaRealElem.style.display = "none";
        } else {
            mathFields[0].style.backgroundColor = "#ffcccc";
            mathFields[0].style.border = "solid 5px red";
            respuestaRealElem.style.display = "block";

            // Si MathJax está renderizando en la página, procesar la fórmula descubierta
            if (window.MathJax) {
                MathJax.typesetPromise([respuestaRealElem]).catch((err) => console.log(err));
            }
        }
        return [puntos, totalPuntos];
    };
}
