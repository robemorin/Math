//16.1.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Hipótesis Nula y Alternativa I';
}
export function tipo() {
    return 0; // Opción múltiple
}

export async function pregunta(i, code) {
    try {
        let mu0 = Math.floor(Math.random() * 50 + 100);
        let H1_type = Math.floor(Math.random() * 3); // 0: >, 1: <, 2: !=
        let askH0 = Math.random() < 0.5; // true pide H0, false pide H1
        let context = Math.floor(Math.random() * 14); // 14 contextos

        let compText = H1_type === 0 ? "mayor a" : (H1_type === 1 ? "menor a" : "diferente a");
        let queryText = askH0 ? "la hipótesis nula" : "la hipótesis alternativa";

        let P = "";
        let baseText = "";
        let unidad = "";

        if (context === 0) {
            unidad = "gramos";
            baseText = "El peso promedio del producto";
            P = `${i + 1}.- Se afirma que el peso promedio de un producto es de $\\mu = ${mu0}$ ${unidad}. Si el equipo de control de calidad desea probar la hipótesis de que el peso promedio real es ${compText} ${mu0} ${unidad}, determina ${queryText}.`;
        } else if (context === 1) {
            unidad = "horas";
            baseText = "El tiempo de vida de las baterías";
            P = `${i + 1}.- Una empresa indica que el tiempo de vida de sus baterías es de $\\mu = ${mu0}$ ${unidad}. Se realizará un estudio para probar la hipótesis de que el tiempo de vida real es ${compText} ${mu0} ${unidad}. Determina ${queryText}.`;
        } else if (context === 2) {
            unidad = "km/l";
            baseText = "El rendimiento promedio del automóvil";
            P = `${i + 1}.- El rendimiento promedio reportado de un automóvil es de $\\mu = ${mu0}$ ${unidad}. En pruebas recientes se busca verificar la hipótesis de que el rendimiento real es ${compText} ${mu0} ${unidad}. Determina ${queryText}.`;
        } else if (context === 3) {
            unidad = "$^{\\circ}\\text{C}$";
            baseText = "La temperatura promedio del proceso";
            P = `${i + 1}.- Históricamente la temperatura promedio de un proceso químico es de $\\mu = ${mu0}$ ${unidad}. Se plantea la hipótesis de que la temperatura ha cambiado a ser ${compText} ${mu0} ${unidad}. Determina ${queryText}.`;
        } else if (context === 4) {
            unidad = "pesos";
            baseText = "El gasto promedio diario de los estudiantes";
            P = `${i + 1}.- Un análisis previo señala que el gasto promedio diario de los estudiantes en la cafetería es de $\\mu = ${mu0}$ ${unidad}. Si se desea evaluar la hipótesis de que el gasto promedio diario es ${compText} ${mu0} ${unidad}, determina ${queryText}.`;
        } else if (context === 5) {
            unidad = "ml";
            baseText = "El contenido promedio de la botella";
            P = `${i + 1}.- La etiqueta de un refresco indica que el volumen promedio por botella es de $\\mu = ${mu0}$ ${unidad}. Un organismo evalúa la hipótesis de que el contenido promedio real es ${compText} ${mu0} ${unidad}. Determina ${queryText}.`;
        } else if (context === 6) {
            unidad = "minutos";
            baseText = "El tiempo promedio de espera";
            P = `${i + 1}.- Un banco afirma que el tiempo promedio de espera en fila para sus clientes es de $\\mu = ${mu0}$ ${unidad}. Se lleva a cabo una auditoría para comprobar la hipótesis de que el tiempo promedio de espera es ${compText} ${mu0} ${unidad}. Determina ${queryText}.`;
        } else if (context === 7) {
            unidad = "kg";
            baseText = "La resistencia promedio del cable";
            P = `${i + 1}.- El fabricante asegura que la resistencia a la tensión promedio de un cable es de $\\mu = ${mu0}$ ${unidad}. Para garantizar la seguridad del producto, se busca someter a prueba la hipótesis de que la resistencia promedio es ${compText} ${mu0} ${unidad}. Determina ${queryText}.`;
        } else if (context === 8) {
            unidad = "días";
            baseText = "El tiempo de vida de los focos";
            P = `${i + 1}.- El fabricante reporta que el tiempo de vida de sus focos LED es de $\\mu = ${mu0}$ ${unidad}. Si se analiza una muestra para investigar la hipótesis de que el tiempo de vida es ${compText} ${mu0} ${unidad}, determina ${queryText}.`;
        } else if (context === 9) {
            unidad = "ml";
            baseText = "La cantidad promedio de jugo";
            P = `${i + 1}.- Se empacan botellas de jugo donde la cantidad promedio declarada es $\\mu = ${mu0}$ ${unidad}. Si se hace una auditoría para verificar la hipótesis de que la cantidad promedio es ${compText} ${mu0} ${unidad}, determina ${queryText}.`;
        } else if (context === 10) {
            unidad = "cm";
            baseText = "La longitud promedio de las piezas";
            P = `${i + 1}.- Las especificaciones de una pieza de madera exigen que su longitud promedio sea de $\\mu = ${mu0}$ ${unidad}. Si se toma una muestra para someter a prueba la hipótesis de que la longitud promedio de las piezas es ${compText} ${mu0} ${unidad}, determina ${queryText}.`;
        } else if (context === 11) {
            unidad = "puntos";
            baseText = "El puntaje promedio del examen";
            P = `${i + 1}.- Históricamente, el puntaje promedio de cierto examen estandarizado es de $\\mu = ${mu0}$ ${unidad}. Si se busca probar la hipótesis de que el puntaje promedio de la última generación de estudiantes es ${compText} ${mu0} ${unidad}, determina ${queryText}.`;
        } else if (context === 12) {
            unidad = "meses";
            baseText = "El tiempo promedio de uso de una computadora";
            P = `${i + 1}.- Se afirma que el tiempo promedio que un usuario conserva su computadora antes de reemplazarla es de $\\mu = ${mu0}$ ${unidad}. Si un analista de mercado quiere comprobar la hipótesis de que el tiempo de uso es ${compText} ${mu0} ${unidad}, determina ${queryText}.`;
        } else {
            unidad = "calorías";
            baseText = "La cantidad promedio de calorías del platillo";
            P = `${i + 1}.- Un menú dietético exhibe que la cantidad de calorías de cierto platillo es de $\\mu = ${mu0}$ ${unidad}. Si se evalúa la hipótesis de que la cantidad promedio de calorías real es ${compText} ${mu0} ${unidad}, determina ${queryText}.`;
        }

        // Generar respuesta correcta y distractores
        let labelQuery = askH0 ? "$H_0$" : "$H_1$";
        let esCorrecto = askH0 ? `no es ${compText}` : `es ${compText}`;

        let ansCorrect = `${labelQuery}: ${baseText} ${esCorrecto} ${mu0} ${unidad}`;

        let R = [ansCorrect];

        // Crear una lista de opciones falsas cambiando la afirmación y la etiqueta
        let allOptions = [];
        let labels = ["$H_0$", "$H_1$"];
        let afirmaciones = [
            "es mayor a", "no es mayor a",
            "es menor a", "no es menor a",
            "es diferente a", "no es diferente a"
        ];

        for (let l of labels) {
            for (let af of afirmaciones) {
                let opt = `${l}: ${baseText} ${af} ${mu0} ${unidad}`;
                if (opt !== ansCorrect) {
                    allOptions.push(opt);
                }
            }
        }

        // Barajar opciones falsas y tomar 5
        allOptions.sort(() => Math.random() - 0.5);

        for (let j = 0; j < 5; ++j) {
            R.push(allOptions[j]);
        }

        return [P, R];

    } catch (error) {
        console.error('Error al cargar la pregunta:', error);
    }
}
