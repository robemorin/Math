//14.4.8.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
    return 'Distribución Binomial Aplicaciones (Abierta)';
}
export function tipo() {
    return 3;
}

export async function pregunta(i, code, esImprimible = false) {
    if (!window.tlacu) window.tlacu = tlacu;
    try {
        let P = "";
        let ansStr = "";
        let dataAttrs = "";

        const a = Math.random();
        if (a < 1 / 8) {
            let n = Math.ceil(Math.random() * 5 + 20)
            let r = Math.ceil(Math.random() * (n - 2))
            P = `${i + 1}.- Usando tu calculadora calcula $\\binom{${n}}{${r}}$ (también denotado como $_{${n}}C_{${r}}$).`
            ansStr = Number(tlacu.stat.nCr(n, r)).toPrecision(3)
            dataAttrs = `data-opcion="1" data-n="${n}" data-r="${r}"`
        } else if (a < 2 / 8) {
            let n = Math.ceil(Math.random() * 5 + 20)
            let r = Math.ceil(Math.random() * (n - 4) + 2)
            P = `${i + 1}.- Calcula la probabilidad de obtener exactamente ${r} caras al lanzar ${n} monedas (suponga que la moneda es justa).`
            let S = tlacu.stat.binomialpdf(n, 0.5, r)
            ansStr = S.toPrecision(3)
            dataAttrs = `data-opcion="2" data-n="${n}" data-r="${r}"`
        } else if (a < 3 / 8) {
            let n = Math.ceil(Math.random() * 5 + 20)
            let p = (Math.random() * 0.8 + 0.1).toFixed(3)
            let r = Math.ceil(Math.random() * (n - 6) + 3)
            P = `${i + 1}.- La probabilidad de que un auto vaya a exceso de velocidad por una autopista en particular es de ${p}. Si han pasado ${n} autos, ¿cuál es la probabilidad de que <strong>al menos</strong> ${r} autos hayan ido a exceso de velocidad?`;
            let S = tlacu.stat.binomialcdf_R(n, Number(p), r, n)
            ansStr = S.toPrecision(3)
            dataAttrs = `data-opcion="3" data-n="${n}" data-p="${p}" data-r="${r}"`
        } else if (a < 4 / 8) {
            let n = Math.ceil(Math.random() * 5 + 20)
            let p = (Math.random() * 0.8 + 0.1).toFixed(3)
            let r = Math.ceil(Math.random() * (n - 6) + 3)
            P = `${i + 1}.- La probabilidad de que una persona compre refresco de la marca X en vez de la competencia es de ${p}. Si ${n} personas compraron refresco, ¿cuál es la probabilidad de que <strong>a lo más</strong> ${r} personas hayan preferido la marca X?`;
            let S = tlacu.stat.binomialcdf(n, Number(p), r)
            ansStr = S.toPrecision(3)
            dataAttrs = `data-opcion="4" data-n="${n}" data-p="${p}" data-r="${r}"`
        } else if (a < 5 / 8) {
            let p = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
            let sum = p.reduce((acc, b) => acc + b, 0);
            let tableP = [];
            let S_expected = 0;
            for (let k = 0; k < 5; ++k) {
                let val = Number((100 * p[k] / sum).toFixed(1));
                tableP.push(val);
            }
            let last = 100 - tableP.reduce((acc, b) => acc + b, 0);
            tableP.push(Number(last.toFixed(1)));

            P = `${i + 1}.- La siguiente tabla muestra el porcentaje poblacional según la cantidad de hijos por familia:
            <div style="display:flex; justify-content:center; margin:10px 0;">
            <table border="1" style="border-collapse: collapse; text-align:center;" cellpadding="5">
                <tr><th>Hijos (x)</th><th>Porcentaje (%)</th></tr>`;
            for (let k = 0; k < 6; ++k) {
                P += `<tr><td>${k}</td><td>${tableP[k]}%</td></tr>`;
                S_expected += k * (tableP[k] / 100);
            }
            P += `</table></div>Calcule la esperanza matemática (valor esperado) del número de hijos por familia.`;
            ansStr = S_expected.toPrecision(3)
            dataAttrs = `data-opcion="5" data-table="${tableP.join(',')}"`
        } else if (a < 6 / 8) {
            let n = Math.ceil(Math.random() * 5 + 20)
            let p = (Math.random() * 0.8 + 0.1).toFixed(3)
            let r = Math.ceil(Math.random() * (n - 10) + 5)
            let mR = Math.ceil(Math.random() * (n - r - 1) + r + 1)
            P = `${i + 1}.- La probabilidad de que un árbol sobreviva más de un año es de ${p}. Si se toma una muestra de ${n} árboles, calcula la probabilidad de que hayan sobrevivido <strong>entre ${r} y ${mR}</strong> árboles (ambos inclusivos).`;
            let S = tlacu.stat.binomialcdf_R(n, Number(p), r, mR)
            ansStr = S.toPrecision(3)
            dataAttrs = `data-opcion="6" data-n="${n}" data-p="${p}" data-r="${r}" data-mr="${mR}"`
        } else if (a < 7 / 8) {
            let n = Math.ceil(Math.random() * 5 + 30)
            let p = (Math.random() * 0.1 + 0.01).toFixed(3)
            let r = Math.ceil(Math.random() * 3 + 1)
            P = `${i + 1}.- Una fábrica produce componentes electrónicos con una tasa de defectos del ${Number((p * 100)).toFixed(1)}%. Si se revisa un lote de ${n} componentes al azar, ¿cuál es la probabilidad de encontrar <strong>exactamente</strong> ${r} componentes defectuosos?`;
            let S = tlacu.stat.binomialpdf(n, Number(p), r)
            ansStr = S.toPrecision(3)
            dataAttrs = `data-opcion="7" data-n="${n}" data-p="${p}" data-r="${r}"`
        } else {
            let n = Math.ceil(Math.random() * 100 + 100)
            let p = (Math.random() * 0.5 + 0.1).toFixed(3)
            let tipoV = Math.random() < 0.5 ? 'el valor esperado (esperanza)' : 'la desviación estándar';
            P = `${i + 1}.- Un examen de opción múltiple tiene ${n} preguntas. La probabilidad de adivinar correctamente cualquier pregunta es de ${p}. Calcula ${tipoV} del número de respuestas correctas.`;
            let ans = tipoV === 'el valor esperado (esperanza)' ? n * Number(p) : Math.sqrt(n * Number(p) * (1 - Number(p)));
            ansStr = ans.toPrecision(3)
            dataAttrs = `data-opcion="8" data-n="${n}" data-p="${p}" data-esp="${tipoV === 'el valor esperado (esperanza)' ? 1 : 0}"`
        }

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
        const t = window.tlacu.stat;

        if (opcion === 1) {
            const n = Number(pregunta[i].dataset.n);
            const r = Number(pregunta[i].dataset.r);
            ansCorrecta = Number(t.nCr(n, r)).toPrecision(3);
        } else if (opcion === 2) {
            const n = Number(pregunta[i].dataset.n);
            const r = Number(pregunta[i].dataset.r);
            ansCorrecta = Number(t.binomialpdf(n, 0.5, r)).toPrecision(3);
        } else if (opcion === 3) {
            const n = Number(pregunta[i].dataset.n);
            const p = Number(pregunta[i].dataset.p);
            const r = Number(pregunta[i].dataset.r);
            ansCorrecta = Number(t.binomialcdf_R(n, p, r, n)).toPrecision(3);
        } else if (opcion === 4) {
            const n = Number(pregunta[i].dataset.n);
            const p = Number(pregunta[i].dataset.p);
            const r = Number(pregunta[i].dataset.r);
            ansCorrecta = Number(t.binomialcdf(n, p, r)).toPrecision(3);
        } else if (opcion === 5) {
            const tableStr = pregunta[i].dataset.table;
            const tableP = tableStr.split(',').map(Number);
            let s = 0;
            for (let k = 0; k < 6; k++) s += k * (tableP[k] / 100);
            ansCorrecta = Number(s).toPrecision(3);
        } else if (opcion === 6) {
            const n = Number(pregunta[i].dataset.n);
            const p = Number(pregunta[i].dataset.p);
            const r = Number(pregunta[i].dataset.r);
            const mR = Number(pregunta[i].dataset.mr);
            ansCorrecta = Number(t.binomialcdf_R(n, p, r, mR)).toPrecision(3);
        } else if (opcion === 7) {
            const n = Number(pregunta[i].dataset.n);
            const p = Number(pregunta[i].dataset.p);
            const r = Number(pregunta[i].dataset.r);
            ansCorrecta = Number(t.binomialpdf(n, p, r)).toPrecision(3);
        } else if (opcion === 8) {
            const n = Number(pregunta[i].dataset.n);
            const p = Number(pregunta[i].dataset.p);
            const isEsp = Number(pregunta[i].dataset.esp);
            let val = isEsp === 1 ? (n * p) : Math.sqrt(n * p * (1 - p));
            ansCorrecta = Number(val).toPrecision(3);
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
