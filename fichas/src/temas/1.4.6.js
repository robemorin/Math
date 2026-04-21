import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/**
 * Fuente original: [15].pdf
 * Ejercicios de Aplicaciones Financieras (Interés compuesto)
 */

export function name() {
    return 'Aplicaciones Financieras: Interés Compuesto';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Problema 1: Inversión simple
    let cap1 = 5000 + Math.floor(Math.random() * 50) * 1000;
    let rate1 = (2 + Math.floor(Math.random() * 4)) / 100;
    let years1 = 5 + Math.floor(Math.random() * 5);
    
    // Problema 2: Compuesto mensual
    let cap2 = 2000 + Math.floor(Math.random() * 40) * 100;
    let rate2 = (3 + Math.floor(Math.random() * 4)) / 100;
    let years2 = 2 + Math.floor(Math.random() * 3);

    // Problema 3: Depósito y plazo
    let cap3 = 1000 + Math.floor(Math.random() * 10) * 500;
    let rate3 = (3 + Math.floor(Math.random() * 3)) / 100;
    let años_hijo = 18;

    let Pregunta = `<div class="problema2"><h3>Práctica de Aplicaciones Financieras (IB Math AA/AI)</h3>
    <p><b>Instrucciones:</b> Utilice la fórmula del interés compuesto $FV = PV(1 + \\frac{r}{k \\times 100})^{nk}$ donde $k$ es el número de periodos de capitalización por año.</p>
    
    <ol class="FT_ol_a">
        <li>Enrique invierte $${cap1} pesos a una tasa del ${rate1 * 100}\\% anual compuesta anualmente. ¿Cuál será el valor de su inversión después de ${years1} años? <div>3</div></li>${CR(4)}
        
        <li>Usted deposita ${cap2} en una cuenta que paga ${rate2 * 100}\\% anual compuesta mensualmente. ¿Cuánto dinero tendrá en la cuenta después de ${years2} años? <div>3</div></li>${CR(4)}
        
        <li>Al nacer su hija, usted deposita ${cap3} en una cuenta que paga ${rate3 * 100}\\% anual capitalizable semestralmente. ¿Cuánto dinero tendrá su hija al cumplir los ${años_hijo} años? <div>4</div></li>${CR(4)}
        
        <li>Kenneth vende su barco por 8000 y lo deposita en un banco al 5.6\\% anual capitalizable trimestralmente.
            <ol type="a">
                <li>Calcule el valor tras 3 años. <div>2</div></li>${CR(2)}
                <li>Calcule el valor tras 8 años. <div>2</div></li>${CR(2)}
            </ol>
        </li>
    </ol></div><div class="page"></div>`;

    let sol1 = (cap1 * Math.pow(1 + rate1, years1)).toFixed(2);
    let sol2 = (cap2 * Math.pow(1 + rate2 / 12, years2 * 12)).toFixed(2);
    let sol3 = (cap3 * Math.pow(1 + rate3 / 2, años_hijo * 2)).toFixed(2);
    let sol4a = (8000 * Math.pow(1 + 0.056 / 4, 3 * 4)).toFixed(2);
    let sol4b = (8000 * Math.pow(1 + 0.056 / 4, 8 * 4)).toFixed(2);

    let Solucion = `<div class="ans"><b>Soluciones:</b><br>
    P1: $${sol1}<br>
    P2: $${sol2}<br>
    P3: $${sol3}<br>
    P4a: $${sol4a}<br>
    P4b: $${sol4b}</div>`;

    return [Pregunta, Solucion];
}