//16.3.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Prueba t para dos muestras (Opción Múltiple)';
}
export function tipo() {
    return 0;
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

        // Distribuir H1_str para que un ~30% sea != y que en > o < el p-value tienda a coincidir con la cola (condición mean1 vs mean2)
        let r = Math.random();
        if (r < 0.3) {
            H1_str = '!=';
        } else {
            if (mean1 > mean2) {
                H1_str = '>';
            } else if (mean1 < mean2) {
                H1_str = '<';
            } else {
                H1_str = '!=';
            }
        }

        let res = tlacu.stat.two_sampTTest(mean1, sd1, n1, mean2, sd2, n2, H1_str, pooled);
        t = res[0];
        p = res[1];
        df = res[2];

        askPValue = Math.random() < 0.5;

        // Validamos p < 0.5 para que la hipótesis alternativa sea factible y no muy contradictoria, ademas se cuida p >= 1e-4
    } while (p >= 0.5 || (askPValue && p < 1e-4));

    let ans = askPValue ? p : t;
    let ansStr = tlacu.cs(ans, 3);

    return { mean1, sd1, n1, mean2, sd2, n2, H1_str, pooled, ansStr, askPValue };
}

export async function pregunta(i, code) {
    try {
        let { mean1, sd1, n1, mean2, sd2, n2, H1_str, pooled, ansStr, askPValue } = generarParametrosValidos();
        let a = Math.random();
        let P = "";

        let compText = H1_str === '>' ? "mayor al de" : (H1_str === '<' ? "menor al de" : "diferente al de");
        let pooledText = pooled ? "se asume que las varianzas poblacionales son similares (iguales)" : "no se asume que las varianzas poblacionales sean similares";
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

        let R = [`$${ansStr}$`];

        for (let j = 1; j < 6; ++j) {
            do {
                let S_dummy;
                if (askPValue) {
                    S_dummy = Math.random();
                } else {
                    S_dummy = (Math.random() - 0.5) * 10;
                }
                R[j] = `$${tlacu.cs(S_dummy, 3)}$`;
            } while (tlacu.pregunta.hayRepetidos(R))
        }

        return [P, R];

    } catch (error) {
        console.error('Error al cargar la pregunta:', error);
    }
}
