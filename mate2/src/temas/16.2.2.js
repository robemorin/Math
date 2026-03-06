//16.2.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
    return 'Prueba t para una muestra (Datos) II';
}
export function tipo() {
    return 3;
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
        //console.log(`t_test(mu:${mu0}, mean:${mean}, sx:${sd}, n:${n} tipo:${H1}) --> ${res}`);
        t = res[0];
        p = res[1];

        askPValue = Math.random() < 0.5;
    } while (askPValue && p < 1e-4);

    let ans = askPValue ? p : t;
    let ansStr = tlacu.cs(ans, 3);

    return { mu0, mean, sd, n, H1, ansStr, askPValue };
}

export async function pregunta(i, code, esImprimible = false) {
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

        if (esImprimible) {
            const respuesta = `$${ansStr}$`
            return [`<p>${P}</p><br><i>(Indica tu respuesta con 3 cifras significativas)</i>`, respuesta]
        }
        render()
        return `
          <div class="pregunta-abierta" data-mu0="${mu0}" data-mean="${mean}" data-sd="${sd}" data-n="${n}" data-h1="${H1}" data-askpvalue="${askPValue}" style="display: none;">
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

        const mu0 = Number(pregunta[i].dataset.mu0);
        const mean = Number(pregunta[i].dataset.mean);
        const sd = Number(pregunta[i].dataset.sd);
        const n = Number(pregunta[i].dataset.n);
        const H1 = Number(pregunta[i].dataset.h1);
        const askPValue = pregunta[i].dataset.askpvalue === 'true';

        const res = tlacu.stat.t_test(mu0, mean, sd, n, H1);
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
