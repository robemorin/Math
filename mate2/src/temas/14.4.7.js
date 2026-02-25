//14.4.7.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
    return 'Distribución Binomial V';
}
export function tipo() {
    return 0
}

function generarParametrosValidos() {
    let n, p, x, prob, probStr, unique;
    let attempts = 0;
    let dir = Math.random() < 0.5 ? '<=' : '>=';

    do {
        x = Math.floor(Math.random() * 11) + 20; // 20 a 30
        n = Math.ceil(Math.random() * 25 + 35); // 36 a 60, para asegurar n >= x

        do {
            p = Number((Math.random() * 0.7 + 0.15).toFixed(2)); // 0.15 a 0.85
        } while (Math.abs(p - 0.5) < 0.05); // Evitar 0.5

        if (dir === '<=') {
            prob = tlacu.stat.binomialcdf(n, p, x);
        } else {
            prob = tlacu.stat.binomialcdf_R(n, p, x, n);
        }

        probStr = prob < 1e-4 ? tlacu.NotacionCientifica(prob) : prob.toFixed(4);

        unique = true;
        for (let i = 0; i <= n; i++) {
            if (i !== x) {
                let otherProb = dir === '<=' ? tlacu.stat.binomialcdf(n, p, i) : tlacu.stat.binomialcdf_R(n, p, i, n);
                let otherProbStr = otherProb < 1e-4 ? tlacu.NotacionCientifica(otherProb) : otherProb.toFixed(4);
                if (otherProbStr === probStr) {
                    unique = false;
                    break;
                }
            }
        }
        attempts++;
        if (attempts > 500) {
            n = 50; p = 0.35; x = 25; dir = '<=';
            prob = tlacu.stat.binomialcdf(n, p, x);
            probStr = prob.toFixed(4);
            break;
        }
    } while (!unique || prob <= 0.01 || prob >= 0.99);

    return { n, p, x, probStr, dir };
}

function generarOpciones(n, x) {
    let R = [`$${x}$`];
    for (let i = 1; i < 6; ++i) {
        do {
            let xD = Math.floor(Math.random() * (n + 1));
            R[i] = `$${xD}$`;
        } while (tlacu.pregunta.hayRepetidos(R));
    }
    return R;
}

function P1(numeroPregunta) {
    let { n, p, x, probStr, dir } = generarParametrosValidos();
    let condicion = dir === '<=' ? "<strong>a lo más</strong>" : "<strong>por lo menos</strong>";
    let P = `${numeroPregunta + 1}.- Una máquina produce piezas con una probabilidad de que sean defectuosas del ${Number((p * 100).toFixed(0))}%. Se toma una muestra aleatoria de ${n} piezas. Si la probabilidad de encontrar ${condicion} $x$ piezas defectuosas es de $${probStr}$, ¿cuál es el valor de $x$?`;
    return [P, generarOpciones(n, x)];
}

function P2(numeroPregunta) {
    let { n, p, x, probStr, dir } = generarParametrosValidos();
    let condicion = dir === '<=' ? "<strong>como máximo</strong>" : "<strong>al menos</strong>";
    let P = `${numeroPregunta + 1}.- La probabilidad de que un auto vaya a exceso de velocidad en una avenida es de ${p}. Si han pasado ${n} autos, y la probabilidad de que ${condicion} $x$ autos hayan ido a exceso de velocidad es $${probStr}$, determina el valor de $x$.`;
    return [P, generarOpciones(n, x)];
}

function P3(numeroPregunta) {
    let { n, p, x, probStr, dir } = generarParametrosValidos();
    let condicion = dir === '<=' ? "<strong>$x$ o menos</strong>" : "<strong>$x$ o más</strong>";
    let P = `${numeroPregunta + 1}.- La probabilidad de que una persona prefiera la marca X de refresco es del ${Number((p * 100).toFixed(0))}%. Se entrevista a ${n} personas. Determina la cantidad $x$ de personas que prefirieron la marca X, si la probabilidad de que ${condicion} personas la hayan preferido es $${probStr}$.`;
    return [P, generarOpciones(n, x)];
}

function P4(numeroPregunta) {
    let { n, p, x, probStr, dir } = generarParametrosValidos();
    let condicion1 = dir === '<=' ? "<strong>a lo más</strong>" : "<strong>por lo menos</strong>";
    let condicion2 = dir === '<=' ? "como máximo" : "como mínimo";
    let P = `${numeroPregunta + 1}.- Un jugador de baloncesto tiene una probabilidad de encestar un tiro libre de ${p}. En un entrenamiento lanza ${n} tiros libres. Si la probabilidad de que enceste ${condicion1} $x$ tiros es $${probStr}$, ¿cuántos tiros $x$ encestó ${condicion2}?`;
    return [P, generarOpciones(n, x)];
}

function P5(numeroPregunta) {
    let { n, p, x, probStr, dir } = generarParametrosValidos();
    let condicion = dir === '<=' ? "<strong>como mucho</strong>" : "<strong>al menos</strong>";
    let P = `${numeroPregunta + 1}.- Un nuevo tratamiento médico tiene una tasa de éxito del ${Number((p * 100).toFixed(0))}%. Se aplica el tratamiento a ${n} pacientes. Sabiendo que la probabilidad de que ${condicion} $x$ pacientes se curen es de $${probStr}$, ¿cuál es el valor de $x$?`;
    return [P, generarOpciones(n, x)];
}

function P6(numeroPregunta) {
    let { n, p, x, probStr, dir } = generarParametrosValidos();
    let condicion = dir === '<=' ? "<strong>a lo más</strong>" : "<strong>por lo menos</strong>";
    let P = `${numeroPregunta + 1}.- Un examen de opción múltiple tiene ${n} preguntas, y la probabilidad de adivinar correctamente cada pregunta es de ${p}. Si la probabilidad de que un estudiante adivine ${condicion} $x$ respuestas correctas es $${probStr}$, halla el valor de $x$.`;
    return [P, generarOpciones(n, x)];
}

function P7(numeroPregunta) {
    let { n, p, x, probStr, dir } = generarParametrosValidos();
    let condicion = dir === '<=' ? "<strong>$x$ o menos</strong>" : "<strong>$x$ o más</strong>";
    let P = `${numeroPregunta + 1}.- En una empresa de mensajería, la probabilidad de que un paquete llegue con retraso es ${p}. Si en un día se envían ${n} paquetes, y nosotros sabemos que la probabilidad de que ${condicion} paquetes lleguen con retraso es de $${probStr}$. ¿Cuál es el valor de $x$?`;
    return [P, generarOpciones(n, x)];
}

function P8(numeroPregunta) {
    let { n, p, x, probStr, dir } = generarParametrosValidos();
    let condicion = dir === '<=' ? "<strong>como máximo</strong>" : "<strong>al menos</strong>";
    let P = `${numeroPregunta + 1}.- Una semilla tiene una probabilidad de germinar del ${Number((p * 100).toFixed(0))}%. Se plantan ${n} semillas en un jardín. La probabilidad de que ${condicion} $x$ semillas germinen es $${probStr}$. Calcula el valor de $x$.`;
    return [P, generarOpciones(n, x)];
}

export async function pregunta(numeroPregunta) {
    try {
        const a = Math.random();
        if (a < 1 / 8) return P1(numeroPregunta);
        if (a < 2 / 8) return P2(numeroPregunta);
        if (a < 3 / 8) return P3(numeroPregunta);
        if (a < 4 / 8) return P4(numeroPregunta);
        if (a < 5 / 8) return P5(numeroPregunta);
        if (a < 6 / 8) return P6(numeroPregunta);
        if (a < 7 / 8) return P7(numeroPregunta);
        return P8(numeroPregunta);
    } catch (error) {
        console.error('Error:', error);
    }
}
