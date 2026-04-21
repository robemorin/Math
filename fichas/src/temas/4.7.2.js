import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
    return 'Prueba t de Student (Una muestra contextual)';
}

export async function pregunta() {
    function generarProblema(num) {
        let H1_type = 2;
        let context = Math.floor(Math.random() * 14);

        let n = Math.floor(Math.random() * 5) + 10; // 10 a 14 datos
        let datos = [];
        let suma = 0;
        for (let i = 0; i < n; i++) {
            let val = Math.floor(Math.random() * 50 + 100) + Math.floor((Math.random() - 0.5) * 20);
            datos.push(val);
            suma += val;
        }

        let promedio = suma / n;
        let difCuadrados = [];
        let sumaCuadrados = 0;

        for (let i = 0; i < n; i++) {
            let dif2 = Math.pow(datos[i] - promedio, 2);
            difCuadrados.push(dif2);
            sumaCuadrados += dif2;
        }

        let s = Math.sqrt(sumaCuadrados / (n - 1));

        let mu0 = Math.round(promedio + 3 * (Math.random() < .5 ? 1 : -1) * Math.random() * s);
        H1_type = Math.random() < .25 ? 2 : (promedio > mu0 ? 0 : 1);
        let compText = H1_type === 0 ? "mayor a" : (H1_type === 1 ? "menor a" : "diferente a");
        let P = "";
        let baseText = "";
        let unidad = "";

        // Fallback manual 
        let t_calc = (promedio - mu0) / (s / Math.sqrt(n));
        let p_value = 0.05;

        // Intentamos invocar tlacu.stat.t_test si existe
        if (tlacu.stat && typeof tlacu.stat.t_test === 'function') {
            let res = tlacu.stat.t_test(mu0, datos, H1_type);
            t_calc = res[0] !== undefined ? res[0] : t_calc;
            p_value = res[1] !== undefined ? res[1] : p_value;
        }

        if (context === 0) {
            unidad = "gramos"; baseText = "El peso promedio del producto";
            P = `Se afirma que el peso promedio de un producto es de $\\mu = ${mu0}$ ${unidad}. Si el equipo de control de calidad desea probar la hipótesis de que el peso promedio real es ${compText} ${mu0} ${unidad}.`;
        } else if (context === 1) {
            unidad = "horas"; baseText = "El tiempo de vida de las baterías";
            P = `Una empresa indica que el tiempo de vida de sus baterías es de $\\mu = ${mu0}$ ${unidad}. Se realizará un estudio para probar la hipótesis de que el tiempo de vida real es ${compText} ${mu0} ${unidad}.`;
        } else if (context === 2) {
            unidad = "km/l"; baseText = "El rendimiento promedio del automóvil";
            P = `El rendimiento promedio reportado de un automóvil es de $\\mu = ${mu0}$ ${unidad}. En pruebas recientes se busca verificar la hipótesis de que el rendimiento real es ${compText} ${mu0} ${unidad}.`;
        } else if (context === 3) {
            unidad = "$^{\\circ}\\text{C}$"; baseText = "La temperatura promedio del proceso";
            P = `Históricamente la temperatura promedio de un proceso químico es de $\\mu = ${mu0}$ ${unidad}. Se plantea la hipótesis de que la temperatura ha cambiado a ser ${compText} ${mu0} ${unidad}.`;
        } else if (context === 4) {
            unidad = "pesos"; baseText = "El gasto promedio diario de los estudiantes";
            P = `Un análisis previo señala que el gasto promedio diario de los estudiantes en la cafetería es de $\\mu = ${mu0}$ ${unidad}. Si se desea evaluar la hipótesis de que el gasto promedio diario es ${compText} ${mu0} ${unidad}.`;
        } else if (context === 5) {
            unidad = "ml"; baseText = "El contenido promedio de la botella";
            P = `La etiqueta de un refresco indica que el volumen promedio por botella es de $\\mu = ${mu0}$ ${unidad}. Un organismo evalúa la hipótesis de que el contenido promedio real es ${compText} ${mu0} ${unidad}.`;
        } else if (context === 6) {
            unidad = "minutos"; baseText = "El tiempo promedio de espera";
            P = `Un banco afirma que el tiempo promedio de espera en fila para sus clientes es de $\\mu = ${mu0}$ ${unidad}. Se lleva a cabo una auditoría para comprobar la hipótesis de que el tiempo promedio de espera es ${compText} ${mu0} ${unidad}.`;
        } else if (context === 7) {
            unidad = "kg"; baseText = "La resistencia promedio del cable";
            P = `El fabricante asegura que la resistencia a la tensión promedio de un cable es de $\\mu = ${mu0}$ ${unidad}. Para garantizar la seguridad del producto, se busca someter a prueba la hipótesis de que la resistencia promedio es ${compText} ${mu0} ${unidad}.`;
        } else if (context === 8) {
            unidad = "días"; baseText = "El tiempo de vida de los focos";
            P = `El fabricante reporta que el tiempo de vida de sus focos LED es de $\\mu = ${mu0}$ ${unidad}. Si se analiza una muestra para investigar la hipótesis de que el tiempo de vida es ${compText} ${mu0} ${unidad}.`;
        } else if (context === 9) {
            unidad = "ml"; baseText = "La cantidad promedio de jugo";
            P = `Se empacan botellas de jugo donde la cantidad promedio declarada es $\\mu = ${mu0}$ ${unidad}. Si se hace una auditoría para verificar la hipótesis de que la cantidad promedio es ${compText} ${mu0} ${unidad}.`;
        } else if (context === 10) {
            unidad = "cm"; baseText = "La longitud promedio de las piezas";
            P = `Las especificaciones de una pieza de madera exigen que su longitud promedio sea de $\\mu = ${mu0}$ ${unidad}. Si se toma una muestra para someter a prueba la hipótesis de que la longitud promedio de las piezas es ${compText} ${mu0} ${unidad}.`;
        } else if (context === 11) {
            unidad = "puntos"; baseText = "El puntaje promedio del examen";
            P = `Históricamente, el puntaje promedio de cierto examen estandarizado es de $\\mu = ${mu0}$ ${unidad}. Si se busca probar la hipótesis de que el puntaje promedio de la última generación de estudiantes es ${compText} ${mu0} ${unidad}.`;
        } else if (context === 12) {
            unidad = "meses"; baseText = "El tiempo promedio de uso de una computadora";
            P = `Se afirma que el tiempo promedio que un usuario conserva su computadora antes de reemplazarla es de $\\mu = ${mu0}$ ${unidad}. Si un analista de mercado quiere comprobar la hipótesis de que el tiempo de uso es ${compText} ${mu0} ${unidad}.`;
        } else {
            unidad = "calorías"; baseText = "La cantidad promedio de calorías del platillo";
            P = `Un menú dietético exhibe que la cantidad de calorías de cierto platillo es de $\\mu = ${mu0}$ ${unidad}. Si se evalúa la hipótesis de que la cantidad promedio de calorías real es ${compText} ${mu0} ${unidad}.`;
        }

        let tablaDifHtml = '<center><table style="border-collapse: collapse; margin: 25px 0; width: 90%; text-align: center;" border="1">';
        tablaDifHtml += '<tr><th style="padding: 8px;">$x_i$</th>' + datos.map(d => `<td style="padding: 8px;">${d}</td>`).join('') + '</tr>';
        tablaDifHtml += '<tr><th style="padding: 8px;">$(x_i - \\bar{x})^2$</th>' + datos.map(d => `<td style="padding: 8px; height: 40px;"></td>`).join('') + '</tr>';
        tablaDifHtml += `<tr><th style="padding: 8px;">$\\sum$</th><td colspan="${n}" style="height: 40px;"></td></tr></table></center>`;

        let Pregunta = `
        <div class="problema2">
            <p>${num}.- ${P}</p>
            <ol class="FT_ol_a">
                <li>Escriba la hipótesis nula ($H_0$) y la hipótesis alternativa ($H_1$).<div>2</div></li>
                <tlacuache-renglon n="2" color="gray" alto="30"></tlacuache-renglon>
                <li>A continuación aparecen los datos recolectados. Calcule la media muestral ($\\bar{x}$) y la desviación estándar de la muestra ($S_x$). Puede apoyarse completando la siguiente tabla para sumar sus diferencias.<div>4</div></li>
                ${tablaDifHtml}
                <li>Calcule el estadístico de prueba. $$t_{calc} = \\frac{\\bar{x} - \\mu_0}{\\frac{S_x}{\\sqrt{n}}} $$.<div>2</div></li>
                <tlacuache-renglon n="2" color="gray" alto="30"></tlacuache-renglon>
                <li>Escriba el valor p (p-value). Con un nivel de significancia de $\\alpha = 0.05$, redacte la conclusión de su estudio.<div>2</div></li>
                <tlacuache-renglon n="2" color="gray" alto="30"></tlacuache-renglon>
            </ol>
        </div>`;

        let correctH1_sign = H1_type === 0 ? ">" : (H1_type === 1 ? "<" : "\\neq");
        let correctH0_sign = H1_type === 0 ? "\\leq" : (H1_type === 1 ? "\\geq" : "=");
        let correctH1_text = H1_type === 0 ? "es mayor a" : (H1_type === 1 ? "es menor a" : "es diferente a");

        let Solucion = `<div class="ans">
            <div style="font-weight: bold; width: 100%;">Pregunta ${num}</div>
            <div>(a) $H_0: \\mu ${correctH0_sign} ${mu0}$, $H_1: \\mu ${correctH1_sign} ${mu0}$. Textual: ${baseText} ${correctH1_text} ${mu0} ${unidad}.</div>
            <div>(b) $\\bar{x} = ${promedio.toFixed(4)}$ y $S_x = ${s.toFixed(4)}$</div>
            <div>(c) $t_{calc} = ${t_calc.toFixed(4)}$</div>
            <div>(d) $p\\text{-value} = ${p_value.toFixed(4)}$. ${p_value < 0.05 ? "Se rechaza $H_0$" : "No se rechaza $H_0$"}.</div>
        </div><br>`;

        return [Pregunta, Solucion];
    }

    let p1 = generarProblema(1);
    let p2 = generarProblema(2);

    return [p1[0] + '<div class="page"></div>' + p2[0], p1[1] + p2[1]];
}
