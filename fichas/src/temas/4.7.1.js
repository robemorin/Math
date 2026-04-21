import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Prueba t de Student (Dos muestras)';
}

function tablaDatos(datos, nombres) {
    let S = `<table class="tablaEspaciada" border="1" cellpadding="5" cellspacing="0"><tr><td style="border-right:solid black 1px; font-weight:bold;">${nombres[0]}</td>`;
    let T = `</tr><tr><td style="border-right:solid black 1px; font-weight:bold;">${nombres[1]}</td>`;
    for (let k = 0; k < Math.max(datos[0].length, datos[1].length); ++k) {
        S += `<td>${datos[0][k] !== undefined ? datos[0][k] : ''}</td>`;
        T += `<td>${datos[1][k] !== undefined ? datos[1][k] : ''}</td>`;
    }
    return `${S}${T}</tr></table>`;
}

export async function pregunta() {
    function getContexto() {
        let context = Math.floor(Math.random() * 14);
        let text1, text2, baseText, unidad;

        if (context === 0) {
            unidad = "gramos"; baseText = "el peso";
            text1 = "la Máquina A"; text2 = "la Máquina B";
        } else if (context === 1) {
            unidad = "horas"; baseText = "el tiempo de vida";
            text1 = "la Marca 1"; text2 = "la Marca 2";
        } else if (context === 2) {
            unidad = "km/l"; baseText = "el rendimiento";
            text1 = "el Modelo X"; text2 = "el Modelo Y";
        } else if (context === 3) {
            unidad = "$^{\\circ}\\text{C}$"; baseText = "la temperatura";
            text1 = "el Proceso Antiguo"; text2 = "el Proceso Nuevo";
        } else if (context === 4) {
            unidad = "pesos"; baseText = "el gasto diario";
            text1 = "los Estudiantes de primer año"; text2 = "los Estudiantes de último año";
        } else if (context === 5) {
            unidad = "ml"; baseText = "el contenido";
            text1 = "la Planta Lote 1"; text2 = "la Planta Lote 2";
        } else if (context === 6) {
            unidad = "minutos"; baseText = "el tiempo de espera";
            text1 = "la Sucursal 1"; text2 = "la Sucursal 2";
        } else if (context === 7) {
            unidad = "kg"; baseText = "la resistencia";
            text1 = "el Cable Tipo A"; text2 = "el Cable Tipo B";
        } else if (context === 8) {
            unidad = "días"; baseText = "el tiempo de vida";
            text1 = "los Focos Lote X"; text2 = "los Focos Lote Y";
        } else if (context === 9) {
            unidad = "ml"; baseText = "la cantidad de jugo";
            text1 = "la Envasadora 1"; text2 = "la Envasadora 2";
        } else if (context === 10) {
            unidad = "cm"; baseText = "la longitud";
            text1 = "el Proveedor A"; text2 = "el Proveedor B";
        } else if (context === 11) {
            unidad = "puntos"; baseText = "el puntaje en el examen";
            text1 = "el Grupo Matutino"; text2 = "el Grupo Vespertino";
        } else if (context === 12) {
            unidad = "meses"; baseText = "el tiempo de uso";
            text1 = "el Dispositivo Gamma"; text2 = "el Dispositivo Delta";
        } else {
            unidad = "calorías"; baseText = "la cantidad de calorías";
            text1 = "la Receta Original"; text2 = "la Receta Modificada";
        }

        return { text1, text2, baseText, unidad };
    }

    // --- GENERACIÓN DEL PROBLEMA 1 (Varianza No Agrupada) ---
    let ctx1 = getContexto();
    let datos1 = [[], []];
    let n1 = [Math.round(Math.random() * 10 + 5), Math.round(Math.random() * 10 + 5)];
    let dummy1 = [Math.random() * 20, Math.random() * 10 + 5];

    for (let k = 0; k < n1[0]; ++k) datos1[0].push(Math.round(dummy1[0] + ((1 - Math.random()) * dummy1[1])));
    for (let k = 0; k < n1[1]; ++k) datos1[1].push(Math.round(dummy1[0] + ((1 - Math.random()) * dummy1[1])));

    let m1 = datos1[0].reduce((a, b) => a + b, 0) / n1[0];
    let m2 = datos1[1].reduce((a, b) => a + b, 0) / n1[1];
    let s1 = Math.sqrt(datos1[0].reduce((a, b) => a + Math.pow(b - m1, 2), 0) / (n1[0] - 1));
    let s2 = Math.sqrt(datos1[1].reduce((a, b) => a + Math.pow(b - m2, 2), 0) / (n1[1] - 1));

    let gl1 = n1[0] + n1[1] - 2;
    let t_calc1 = (m1 - m2) / Math.sqrt((s1 * s1) / n1[0] + (s2 * s2) / n1[1]);

    let P1_text = `Se desea comparar ${ctx1.baseText} de dos elementos distintos. Al obtener una muestra para evaluarlo, de ${ctx1.text1} se obtuvieron los siguientes valores (en ${ctx1.unidad}) y también se tomaron mediciones de ${ctx1.text2}.`;

    let Pregunta = `
        <p>Cuando <u>no se asume que las varianzas poblacionales son similares</u>, la estadística de prueba se calcula usando la siguiente fórmula:</p>
        <p>
            \\[
            t_{calc} = \\frac{\\overline{x}_1-\\overline{x}_2}{\\sqrt{\\frac{S_1^2}{n_1}+\\frac{S_2^2}{n_2}}}
            \\]
        </p>
    
        <div class="problema2">
        1.- ${P1_text}
        Se busca aplicar la prueba de t-Student para evaluar si existe una diferencia significativa entre ambas muestras, con un nivel de significancia de 5%.
        Las muestras recopiladas son las siguientes:<br> <center>${tablaDatos(datos1, [ctx1.text1, ctx1.text2])}</center>
        
        <ol class="FT_ol_a">
            <li>Escriba las hipótesis nula y alternativa <div>1</div></li>
            <li>Escriba los grados de libertad (usando la aproximación $n_1 + n_2 - 2$). <div>1</div></li> 
            <li>Escriba las medias y desviaciones estándar muestrales. <div>2</div></li>
            <li>Calcule el valor $t_{calc}$. <div>1</div></li>
            <li>Obtenga el valor p (p-value). <div>1</div></li>
            <li>Realice una conclusión basada en sus resultados anteriores. <div>1</div></li>
            </ol></div><div class="page"></div>
            `;
            
    let test1 = typeof tlacu.stat?.two_sampTTest === 'function' ? tlacu.stat.two_sampTTest(datos1[0], datos1[1], '!=', false) : [t_calc1, 0.05];
    let Solucion = `<div class="ans">
            <div>(1a) $H_0: \\mu_1 = \\mu_2$, $H_1: \\mu_1 \\neq \\mu_2$</div>
            <div>(1b) $gl = ${gl1}$</div>
            <div>(1c) $\\overline{x}_1 = ${m1.toPrecision(4)}$, $S_1 = ${s1.toPrecision(4)}$<br>$\\overline{x}_2 = ${m2.toPrecision(4)}$, $S_2 = ${s2.toPrecision(4)}$</div>
            <div>(1d) $t_{calc} = \\frac{${m1.toPrecision(4)} - ${m2.toPrecision(4)}}{\\sqrt{\\frac{${(s1 * s1).toPrecision(4)}}{${n1[0]}}+\\frac{${(s2 * s2).toPrecision(4)}}{${n1[1]}}}} = ${t_calc1.toPrecision(4)}$</div>
            <div>(1e) $p \\approx ${test1[1].toPrecision(4)}$</div>
            </div><br>`;

    // --- GENERACIÓN DEL PROBLEMA 2 (Varianza Agrupada) ---
    let ctx2 = getContexto();
    let datos2 = [[], []];
    let n2 = [Math.round(Math.random() * 10 + 5), Math.round(Math.random() * 10 + 5)];
    let dummy2 = [Math.random() * 20, Math.random() * 10 + 5];
    
    for (let k = 0; k < n2[0]; ++k) datos2[0].push(Math.round(dummy2[0] + ((1 - Math.random()) * dummy2[1])));
    for (let k = 0; k < n2[1]; ++k) datos2[1].push(Math.round(dummy2[0] + ((1 - Math.random()) * dummy2[1])));

    let m1_2 = datos2[0].reduce((a, b) => a + b, 0) / n2[0];
    let m2_2 = datos2[1].reduce((a, b) => a + b, 0) / n2[1];
    let s1_2 = Math.sqrt(datos2[0].reduce((a, b) => a + Math.pow(b - m1_2, 2), 0) / (n2[0] - 1));
    let s2_2 = Math.sqrt(datos2[1].reduce((a, b) => a + Math.pow(b - m2_2, 2), 0) / (n2[1] - 1));
    let gl2 = n2[0] + n2[1] - 2;

    let SP2 = ((n2[0] - 1) * s1_2 * s1_2 + (n2[1] - 1) * s2_2 * s2_2) / gl2;
    let factorInv = (1 / n2[0] + 1 / n2[1]);
    let t_calc2 = (m1_2 - m2_2) / Math.sqrt(SP2 * factorInv);

    let P2_text = `Se documentan datos sobre ${ctx2.baseText} reportado en dos escenarios diferentes. Investigadores de ${ctx2.text1} publicaron resultados que son contrastados directamente contra ${ctx2.text2} (medido en ${ctx2.unidad}).`;

    Pregunta += `
        <p>Cuando se <u>asume que las varianzas poblacionales son similares</u>, primero se calcula la varianza agrupada ($S_p^2$) y luego el estadístico:</p>
        <p>
            \\[
            t_{calc} = \\frac{\\overline{x}_1-\\overline{x}_2}{\\sqrt{\\left(\\frac{(n_1-1)S_1^2+(n_2-1)S_2^2}{n_1+n_2-2}\\right)\\left(\\frac{1}{n_1}+\\frac{1}{n_2}\\right)}}
            \\]
        </p>
    
        <div class="problema2">
        2.- ${P2_text}
        Se desea aplicar la prueba de t-Student para saber si existe una diferencia significativa entre las medias poblacionales de ambas fuentes, asumiendo su varianza similar con un nivel de significancia de 5%.
        Las muestras son las siguientes:<br> <center>${tablaDatos(datos2, [ctx2.text1, ctx2.text2])}</center>
        
        <ol class="FT_ol_a">
            <li>Escriba las hipótesis nula y alternativa <div>1</div></li>
            <li>Escriba los grados de libertad. <div>1</div></li>
            <li>Escriba las medias y desviaciones estándar muestrales. <div>2</div></li>
            <li> 
                    <ol>
                    <li>Calcule la varianza agrupada $S_p^2 = \\frac{(n_1-1)S_1^2+(n_2-1)S_2^2}{n_1+n_2-2}$</li>
                    <li>Calcule el valor de $\\left(\\frac{1}{n_1}+\\frac{1}{n_2}\\right)$</li>
                    <li>Calcule el valor de $t_{calc}$ sustituyendo <div>1</div></li>
                    </ol>
            </li>
            <li>Obtenga el valor p (p-value). <div>1</div></li>
            <li>Realice una conclusión basada en sus resultados. <div>1</div></li>
            </ol></div>
            `;
            
    let test2 = typeof tlacu.stat?.two_sampTTest === 'function' ? tlacu.stat.two_sampTTest(datos2[0], datos2[1], '!=', true) : [t_calc2, 0.05];
    Solucion += `<div class="ans">
            <div>(2a) $H_0: \\mu_1 = \\mu_2$, $H_1: \\mu_1 \\neq \\mu_2$</div>
            <div>(2b) $gl = ${gl2}$</div>
            <div>(2c) $\\overline{x}_1 = ${m1_2.toPrecision(4)}$, $S_1 = ${s1_2.toPrecision(4)}$<br>$\\overline{x}_2 = ${m2_2.toPrecision(4)}$, $S_2 = ${s2_2.toPrecision(4)}$</div>
            <div>(2d-1) $S_p^2 = \\frac{(${n2[0] - 1})(${(s1_2 * s1_2).toPrecision(4)})+(${n2[1] - 1})(${(s2_2 * s2_2).toPrecision(4)})}{${gl2}} = ${SP2.toPrecision(4)}$</div>
            <div>(2d-2) $\\left(\\frac{1}{n_1}+\\frac{1}{n_2}\\right) = ${factorInv.toPrecision(4)}$</div>
            <div>(2d-3) $t_{calc} = \\frac{${(m1_2 - m2_2).toPrecision(4)}}{\\sqrt{(${SP2.toPrecision(4)})(${factorInv.toPrecision(4)})}} = ${t_calc2.toPrecision(4)}$</div>
            <div>(2e) $p \\approx ${test2[1].toPrecision(4)}$</div>
            </div>`;

    return [Pregunta, Solucion];
}
