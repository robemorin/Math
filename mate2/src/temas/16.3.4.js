//16.3.4.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Prueba t para dos muestras (Datos Abierta)';
}
export function tipo() {
    return 3;
}

function generarParametrosValidos() {
    let base_mean, values1, values2, n1, n2, H1_str, t, p, askPValue, pooled;
    do {
        base_mean = Math.floor(Math.random() * 50 + 100);
        let shift1 = (Math.random() * 10 - 5);
        let shift2 = (Math.random() * 10 - 5);

        let mean1 = base_mean + shift1;
        let mean2 = base_mean + shift2;

        let sd1 = Math.floor(Math.random() * 10 + 2) + Math.round(Math.random() * 10) / 10;
        let sd2 = Math.floor(Math.random() * 10 + 2) + Math.round(Math.random() * 10) / 10;

        n1 = Math.floor(Math.random() * 8 + 6); // Entre 6 y 13 elementos
        n2 = Math.floor(Math.random() * 8 + 6);

        values1 = [];
        for (let j = 0; j < n1; j++) {
            let u1 = Math.random(), u2 = Math.random();
            let z0 = Math.sqrt(-2.0 * Math.log(u1 + 1e-10)) * Math.cos(2.0 * Math.PI * u2);
            values1.push(Math.round((mean1 + z0 * sd1) * 10) / 10);
        }

        values2 = [];
        for (let j = 0; j < n2; j++) {
            let u1 = Math.random(), u2 = Math.random();
            let z0 = Math.sqrt(-2.0 * Math.log(u1 + 1e-10)) * Math.cos(2.0 * Math.PI * u2);
            values2.push(Math.round((mean2 + z0 * sd2) * 10) / 10);
        }

        pooled = Math.random() < 0.5;

        // Para determinar el sentido de la prueba podemos usar la media *real* de la muestra
        let m1 = values1.reduce((a, b) => a + b, 0) / n1;
        let m2 = values2.reduce((a, b) => a + b, 0) / n2;

        let r = Math.random();
        if (r < 0.3) {
            H1_str = '!=';
        } else if (m1 > m2) {
            H1_str = '>';
        } else {
            H1_str = '<';
        }

        let res = tlacu.stat.two_sampTTest(values1, values2, H1_str, pooled);
        t = res[0];
        p = res[1];

        askPValue = Math.random() < 0.5;
        // Validamos p < 0.5 para que la hipótesis alternativa sea factible y no muy contradictoria, ademas se cuida p >= 1e-4
    } while (p >= 0.5 || p < 1e-4);

    let ans = askPValue ? p : t;
    let ansStr = tlacu.cs(ans, 3);

    return { values1, values2, n1, n2, H1_str, pooled, ansStr, askPValue };
}

export async function pregunta(i, code, esImprimible = false) {
    try {
        let { values1, values2, n1, n2, H1_str, pooled, ansStr, askPValue } = generarParametrosValidos();
        let a = Math.random();
        let P = "";

        let compText = H1_str === '>' ? "mayor al de" : (H1_str === '<' ? "menor al de" : "diferente al de");
        let pooledText = pooled ? "se asume que las varianzas poblacionales son similares (iguales)" : "no se asume que las varianzas poblacionales sean similares (diferentes)";
        let queryText = askPValue ? "el valor $p$ (p-value)" : "el valor del estadístico de prueba ($t$)";

        let tabla1HTML = '<div style="overflow-x:auto;"><table border="1" cellpadding="5" cellspacing="0" style="margin: 10px auto; border-collapse: collapse; text-align: center;"><tr>';
        for (let j = 0; j < n1; j++) {
            tabla1HTML += `<td>${values1[j]}</td>`;
        }
        tabla1HTML += '</tr></table></div>';

        let tabla2HTML = '<div style="overflow-x:auto;"><table border="1" cellpadding="5" cellspacing="0" style="margin: 10px auto; border-collapse: collapse; text-align: center;"><tr>';
        for (let j = 0; j < n2; j++) {
            tabla2HTML += `<td>${values2[j]}</td>`;
        }
        tabla2HTML += '</tr></table></div>';

        if (a < 1 / 4) {
            P = `${i + 1}.- Se desea comparar el peso de los productos elaborados por dos máquinas diferentes. Se toma una muestra de la Máquina A obteniendo en gramos los siguientes pesos:<br>${tabla1HTML}<br>Mientras que de la Máquina B se toma una muestra con los siguientes pesos:<br>${tabla2HTML}<br>Si se desea probar la hipótesis de que el peso promedio de la Máquina A es ${compText} la Máquina B, y ${pooledText}, ¿cuál es ${queryText}?`;
        } else if (a < 2 / 4) {
            P = `${i + 1}.- Para comparar el tiempo de vida de dos marcas de baterías, se prueban baterías de la Marca 1 y duraron las siguientes horas:<br>${tabla1HTML}<br>Las baterías de la Marca 2 arrojaron en horas los siguientes datos:<br>${tabla2HTML}<br>Determine si el tiempo promedio de la Marca 1 es ${compText} la Marca 2. Sabiendo que ${pooledText}, calcule ${queryText}.`;
        } else if (a < 3 / 4) {
            P = `${i + 1}.- Se evalúa el rendimiento promedio de dos modelos de automóviles en la ciudad. El Modelo X registró (en km/l) las siguientes lecturas:<br>${tabla1HTML}<br>Y el Modelo Y registró:<br>${tabla2HTML}<br>Deseamos probar si el rendimiento verdadero de X es ${compText} Y. Además, ${pooledText}. Calcula ${queryText}.`;
        } else {
            P = `${i + 1}.- Dos catalizadores se utilizan en un proceso químico. El Catalizador 1 obtuvo un tiempo de reacción con las siguientes mediciones (min):<br>${tabla1HTML}<br>El Catalizador 2 arrojó los siguientes tiempos de reacción:<br>${tabla2HTML}<br>Se sospecha que el tiempo con el Catalizador 1 es ${compText} el Catalizador 2. Si ${pooledText}, halla ${queryText}.`;
        }

        if (esImprimible) {
            const respuesta = `$${ansStr}$`
            return [`<p>${P}</p><br><i>(Indica tu respuesta con 3 cifras significativas)</i>`, respuesta]
        }
        render()

        let values1Str = values1.join(',');
        let values2Str = values2.join(',');

        return `
          <div class="pregunta-abierta" data-values1="${values1Str}" data-values2="${values2Str}" data-h1_str="${H1_str}" data-pooled="${pooled}" data-askpvalue="${askPValue}" style="display: none;">
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

        const values1 = pregunta[i].dataset.values1.split(',').map(Number);
        const values2 = pregunta[i].dataset.values2.split(',').map(Number);
        const H1_str = pregunta[i].dataset.h1_str;
        const pooled = pregunta[i].dataset.pooled === 'true';
        const askPValue = pregunta[i].dataset.askpvalue === 'true';

        const res = tlacu.stat.two_sampTTest(values1, values2, H1_str, pooled);
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
            if (respuestaRealElem) respuestaRealElem.style.display = "none";
        } else {
            mathFields[0].style.backgroundColor = "#ffcccc";
            mathFields[0].style.border = "solid 5px red";
            if (respuestaRealElem) {
                respuestaRealElem.style.display = "block";
                // Si MathJax está renderizando en la página, procesar la fórmula descubierta
                if (window.MathJax) {
                    MathJax.typesetPromise([respuestaRealElem]).catch((err) => console.log(err));
                }
            }
        }
        return [puntos, totalPuntos];
    };
}
