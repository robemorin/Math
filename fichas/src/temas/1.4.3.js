import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Módulo de práctica para Aplicaciones Financieras (Inflación e Interés)
 * Fuente original: [12].pdf
 * Tiempo estimado: 40 minutos.
 */

export function name() {
    return 'Aplicaciones Financieras: Inflación e Interés';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // --- Datos aleatorios para dinamismo ---
    const val1 = (Math.floor(Math.random() * 20) + 10) * 1000;
    const inf1 = (Math.random() * 2 + 2).toFixed(1); // 2-4%
    const n1 = Math.floor(Math.random() * 5) + 3; // 3-7 años

    const inv2 = 5000 + Math.floor(Math.random() * 5) * 1000;
    const r2 = (Math.random() * 2 + 3).toFixed(1); // Interés 3-5%
    const inf2 = (Math.random() * 1 + 2).toFixed(1); // Inflación 2-3%
    const t2 = 5;

    // --- Generación de problemas ---
    let Pregunta = `<div class="problema2"><h3>Práctica de Aplicaciones Financieras</h3>
    <p><b>Nota:</b> Recuerde que el valor indexado (valor futuro) se calcula como $V_f = V_p \\times (1 + i)^n$ donde $i$ es la tasa de inflación.</p>
    
    <div class="problema2">1.- Cálculo de valores indexados por inflación:
    <ol class="FT_ol_a">
        <li>Un capital de $ $${val1} se ve afectado por una inflación anual del ${inf1}%. Calcule su valor indexado tras ${n1} años. <div>3</div></li>${CR(2)}
        <li>Si el costo de la vida aumenta un ${inf2}% anual, ¿qué cantidad de dinero se requerirá en ${t2} años para comprar bienes que hoy cuestan $ $${inv2}? <div>3</div></li>${CR(2)}
    </ol></div>

    <div class="problema2">2.- Valor Real de la Inversión:
    <p>Gemma invirtió $ $${inv2} a una tasa de interés compuesto del ${r2}% anual durante ${t2} años. Durante este periodo, la inflación media fue del ${inf2}% anual.</p>
    <ol class="FT_ol_a">
        <li>Calcule el valor nominal de la inversión al finalizar los ${t2} años. <div>3</div></li>${CR(2)}
        <li>Determine el "valor real" de dicha inversión en términos de poder adquisitivo de hoy, dividiendo el valor nominal por el factor de inflación acumulado $(1 + r_{inf})^{${t2}}$. <div>3</div></li>${CR(2)}
    </ol></div>
    
    <div class="problema2">3.- Análisis de Poder Adquisitivo:
    <p>Un salario actual es de $ $${(30000 + Math.random()*10000).toFixed(0)}. Si la inflación esperada es del 3% constante por los próximos 5 años:</p>
    <ol class="FT_ol_a">
        <li>¿Cuál debería ser el salario nominal dentro de 5 años para mantener el mismo poder adquisitivo? <div>3</div></li>${CR(2)}
        <li>Si el salario aumenta solo un 10% acumulado en ese periodo, ¿ha mejorado el poder adquisitivo real? Justifique matemáticamente. <div>3</div></li>${CR(2)}
    </ol></div>
    </div><div class="page"></div>`;

    // --- Soluciones calculadas ---
    const val_1 = (val1 * Math.pow(1 + parseFloat(inf1)/100, n1)).toFixed(2);
    const val_2 = (inv2 * Math.pow(1 + parseFloat(inf2)/100, t2)).toFixed(2);
    const nominal = (inv2 * Math.pow(1 + parseFloat(r2)/100, t2)).toFixed(2);
    const real = (nominal / Math.pow(1 + parseFloat(inf2)/100, t2)).toFixed(2);

    let Solucion = `<div class="ans"><b>Soluciones:</b><br>
    <b>P1:</b> (a) $ $${val_1} | (b) $ $${val_2}<br>
    <b>P2:</b> (a) Valor Nominal: $ $${nominal} | (b) Valor Real: $ $${real}<br>
    <b>P3:</b> El estudiante debe comparar el valor real tras el ajuste por inflación contra el aumento nominal propuesto.</div>`;

    return [Pregunta, Solucion];
}