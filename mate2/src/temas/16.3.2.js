//16.3.2.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
    return 'Prueba t para dos muestras (Abierta)';
}
export function tipo() {
    return 3;
}

function generarParametrosValidos() {
    let mean1, sd1, n1, mean2, sd2, n2, H1_str, t, p, df, askPValue, pooled;
    do {
        let base_mean = Math.floor(Math.random() * 50 + 100);
        mean1 = base_mean + (Math.random() * 10 - 5);
        mean2 = base_mean + (Math.random() * 10 - 5);

        mean1 = Number(mean1.toFixed(2));
        mean2 = Number(mean2.toFixed(2));

        sd1 = Math.floor(Math.random() * 10 + 2) + Math.round(Math.random() * 10) / 10;
        sd2 = Math.floor(Math.random() * 10 + 2) + Math.round(Math.random() * 10) / 10;

        n1 = Math.floor(Math.random() * 30 + 15);
        n2 = Math.floor(Math.random() * 30 + 15);

        pooled = Math.random() < 0.5;

        // Distribuir H1_str para que un ~30% sea != y que en > o < el p-value tienda a coincidir con la cola
        let r = Math.random();
        if (r < 0.3) {
            H1_str = '!=';
        } else if (mean1 > mean2) {
            H1_str = '>';
        } else {
            H1_str = '<';
        }

        let res = tlacu.stat.two_sampTTest(mean1, sd1, n1, mean2, sd2, n2, H1_str, pooled);
        t = res[0];
        p = res[1];
        df = res[2];

        askPValue = Math.random() < 0.5;
        // Validamos p < 0.5 para que la hipótesis alternativa sea factible y no muy contradictoria, ademas se cuida p >= 1e-4
    } while (p >= 0.5 || p < 1e-4);

    let ans = askPValue ? p : t;
    let ansStr = tlacu.cs(ans, 3);

    return { mean1, sd1, n1, mean2, sd2, n2, H1_str, pooled, ansStr, askPValue };
}

export async function pregunta(i, code, esImprimible = false) {
    try {
        let { mean1, sd1, n1, mean2, sd2, n2, H1_str, pooled, ansStr, askPValue } = generarParametrosValidos();
        let a = Math.random();
        let P = "";

        let compText = H1_str === '>' ? "mayor al de" : (H1_str === '<' ? "menor al de" : "diferente al de");
        let pooledText = pooled ? "se asume que las varianzas poblacionales son similares (iguales)" : "no se asume que las varianzas poblacionales sean similares (diferentes)";
        let queryText = askPValue ? "el valor $p$ (p-value)" : "el valor del estadístico de prueba ($t$)";

        if (a < 1 / 4) {
            P = `${i + 1}.- Se desea comparar el peso promedio de los productos elaborados por dos máquinas diferentes. Se toma una muestra de $n_1 = ${n1}$ productos de la Máquina A, obteniendo una media de $\\bar{x}_1 = ${mean1}$ gramos y desviación estándar $s_1 = ${sd1}$ gramos. De la Máquina B, una muestra de $n_2 = ${n2}$ productos da $\\bar{x}_2 = ${mean2}$ gramos y $s_2 = ${sd2}$ gramos. Si se desea probar la hipótesis de que el peso promedio de la Máquina A es ${compText} la Máquina B, y ${pooledText}, ¿cuál es ${queryText}?`;
        } else if (a < 2 / 4) {
            P = `${i + 1}.- Para comparar el tiempo de vida de dos marcas de baterías, se prueban $n_1 = ${n1}$ baterías de la Marca 1 y duraron en promedio $\\bar{x}_1 = ${mean1}$ horas con una desviación estándar de $s_1 = ${sd1}$ horas. Una muestra de $n_2 = ${n2}$ baterías de la Marca 2 dio una media de $\\bar{x}_2 = ${mean2}$ horas con $s_2 = ${sd2}$ horas. Determine si el tiempo de la Marca 1 es ${compText} la Marca 2. Sabiendo que ${pooledText}, calcule ${queryText}.`;
        } else if (a < 3 / 4) {
            P = `${i + 1}.- Se evalúa el rendimiento promedio de dos modelos de automóviles en la ciudad. El Modelo X (con $n_1 = ${n1}$ autos) registró $\\bar{x}_1 = ${mean1}$ km/l con $s_1 = ${sd1}$ km/l. El Modelo Y (con $n_2 = ${n2}$ autos) registró $\\bar{x}_2 = ${mean2}$ km/l con $s_2 = ${sd2}$ km/l. Deseamos probar si el rendimiento verdadero de X es ${compText} Y. Además, ${pooledText}. Calcula ${queryText}.`;
        } else {
            P = `${i + 1}.- Dos catalizadores se utilizan en un proceso químico. El Catalizador 1, en $n_1 = ${n1}$ repeticiones, obtuvo un tiempo de reacción promedio de $\\bar{x}_1 = ${mean1}$ min y $s_1 = ${sd1}$ min. El Catalizador 2, en $n_2 = ${n2}$ repeticiones, promedió $\\bar{x}_2 = ${mean2}$ min y $s_2 = ${sd2}$ min. Se sospecha que el tiempo con el Catalizador 1 es ${compText} el Catalizador 2. Si ${pooledText}, halla ${queryText}.`;
        }

        if (esImprimible) {
            const respuesta = `$${ansStr}$`
            return [`<p>${P}</p><br><i>(Indica tu respuesta con 3 cifras significativas)</i>`, respuesta]
        }
        render()
        return `
          <div class="pregunta-abierta" data-mean1="${mean1}" data-sd1="${sd1}" data-n1="${n1}" data-mean2="${mean2}" data-sd2="${sd2}" data-n2="${n2}" data-h1_str="${H1_str}" data-pooled="${pooled}" data-askpvalue="${askPValue}" style="display: none;">
            <p>${P}</p>
            <p><i>(Indica tu respuesta con 3 cifras significativas)</i></p>
            <p>Respuesta: <math-field></math-field> </p>
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

        const mean1 = Number(pregunta[i].dataset.mean1);
        const sd1 = Number(pregunta[i].dataset.sd1);
        const n1 = Number(pregunta[i].dataset.n1);
        const mean2 = Number(pregunta[i].dataset.mean2);
        const sd2 = Number(pregunta[i].dataset.sd2);
        const n2 = Number(pregunta[i].dataset.n2);
        const H1_str = pregunta[i].dataset.h1_str;
        const pooled = pregunta[i].dataset.pooled === 'true';
        const askPValue = pregunta[i].dataset.askpvalue === 'true';

        const res = tlacu.stat.two_sampTTest(mean1, sd1, n1, mean2, sd2, n2, H1_str, pooled);
        const ansReal = askPValue ? res[1] : res[0];

        const ansCorrectaStr = tlacu.cs(ansReal, 3);
        const ansCorrecta = Number(ansCorrectaStr);

        let precision = 3;
        let num2 = Math.abs(ansCorrecta);
        const maxP10 = Math.ceil(Math.log10(num2));
        const minP10 = maxP10 - precision;
        let errorMargin = minP10 >= 0 ? 0.5 * Math.pow(10, minP10) : 0.5 * Math.pow(10, minP10);

        if (Math.abs(respuestaUsuario - ansCorrecta) <= errorMargin || respuestaUsuario == ansCorrecta) {
            puntos = 1;
            mathFields[0].style.border = "solid 5px green";
        } else {
            mathFields[0].style.backgroundColor = "red";
        }
        return [puntos, totalPuntos];
    };
}
