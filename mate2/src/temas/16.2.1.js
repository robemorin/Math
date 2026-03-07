//16.2.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Prueba t para una muestra (Estadísticos) I';
}
export function tipo() {
    return 0;
}

function generarParametrosValidos() {
    let mu0, mean, sd, n, H1, t, p, askPValue;
    do {
        mu0 = Math.floor(Math.random() * 50 + 100);
        mean = mu0 + (Math.random() * 10 - 5);
        mean = Number(mean.toFixed(2));
        sd = Math.floor(Math.random() * 10 + 2) + Math.round(Math.random() * 10) / 10;
        n = Math.floor(Math.random() * 30 + 10);
        H1 = Math.floor(Math.random() * 3); // 0: >, 1: <, 2: !=

        let res = tlacu.stat.t_test(mu0, mean, sd, n, H1);
        t = res[0];
        p = res[1];

        askPValue = Math.random() < 0.5;
    } while (askPValue && p < 1e-4);

    let ans = askPValue ? p : t;
    let ansStr = tlacu.cs(ans, 3);

    return { mu0, mean, sd, n, H1, ansStr, askPValue };
}

export async function pregunta(i, code) {
    try {
        let { mu0, mean, sd, n, H1, ansStr, askPValue } = generarParametrosValidos();
        let a = Math.random();
        let P = "";

        let compText = H1 === 0 ? "mayor a" : (H1 === 1 ? "menor a" : "diferente de");
        let queryText = askPValue ? "el valor $p$ (p-value)" : "el valor del estadístico de prueba ($t$)";

        if (a < 1 / 4) {
            P = `${i + 1}.- Se afirma que el peso promedio de un producto es de $\\mu_0 = ${mu0}$ gramos. Se toma una muestra de $n = ${n}$ productos, encontrando una media muestral de $\\bar{x} = ${mean}$ gramos con una desviación estándar de $s = ${sd}$ gramos. Si se desea probar la hipótesis de que el peso promedio real es ${compText} ${mu0} gramos, ¿cuál es ${queryText}?`;
        } else if (a < 2 / 4) {
            P = `${i + 1}.- Una empresa indica que el tiempo de vida de sus baterías es de ${mu0} horas. Una muestra aleatoria de ${n} baterías duró en promedio ${mean} horas con una desviación estándar de ${sd} horas. Para determinar si el tiempo de vida es ${compText} ${mu0} horas, ¿cuál es ${queryText}?`;
        } else if (a < 3 / 4) {
            P = `${i + 1}.- El rendimiento promedio reportado de un automóvil es de ${mu0} km/l. En pruebas recientes a ${n} automóviles, se obtuvo un rendimiento promedio de ${mean} km/l con una desviación estándar muestral de ${sd} km/l. Si queremos verificar si el rendimiento real es ${compText} ${mu0} km/l, calcula ${queryText}.`;
        } else {
            P = `${i + 1}.- Históricamente la temperatura promedio de un proceso químico es de $${mu0}^{\\circ}\\text{C}$. Se registran ${n} mediciones obteniendo una media de $${mean}^{\\circ}\\text{C}$ y una desviación estándar de $${sd}^{\\circ}\\text{C}$. Si se plantea la hipótesis de que la temperatura ha cambiado a ser ${compText} $${mu0}^{\\circ}\\text{C}$, halla ${queryText}.`;
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
