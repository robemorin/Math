import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

// --- POLYFILL TEMPORAL PARA tlacu.stat.medTendenciaCentral ---
// Una vez actualizado tlacuache-modulo.mjs, este bloque puede eliminarse.
if (!tlacu.stat.medTendenciaCentral) {
  tlacu.stat.medTendenciaCentral = function(x, f) {
    let n = 0;
    let sum_xf = 0;
    let max_f = -1;
    let mode = []; 
    
    for(let i=0; i<f.length; i++) {
        n += f[i];
        sum_xf += x[i] * f[i];
        if(f[i] > max_f) {
            max_f = f[i];
            mode = [x[i]];
        } else if (f[i] === max_f) {
            mode.push(x[i]);
        }
    }
    const mean = sum_xf / n;
    
    let med_val1 = null;
    let med_val2 = null;
    let p1 = Math.floor((n + 1) / 2);
    let p2 = Math.ceil((n + 1) / 2);
    
    let current_cum = 0;
    for(let i=0; i<f.length; i++) {
        current_cum += f[i];
        if (med_val1 === null && current_cum >= p1) med_val1 = x[i];
        if (med_val2 === null && current_cum >= p2) med_val2 = x[i];
    }
    const median = (med_val1 + med_val2) / 2;
    
    return [mean, median, mode];
  }
}
// -----------------------------------------------------------

export function name() {
  return 'Medidas de Tendencia Central (Tabla Frecuencia Acumulada)';
}

export function tipo() {
  return 0; // Opción múltiple
}

export async function pregunta(numeroPregunta) {
  try {
    // 1. Generar datos aleatorios
    const n_rows = Math.floor(Math.random() * 4) + 6; // Entre 4 y 7 filas
    let x = [];
    let start = Math.floor(Math.random() * 10) + 1;
    for(let i=0; i<n_rows; i++) x.push(start + i);
    
    let f = [];
    let F = []; // Frecuencia acumulada
    let sum_f = 0;
    
    for(let i=0; i<n_rows; i++) {
        // Evitar ceros para asegurar consistencia
        let freq = Math.floor(Math.random() * 8) + 2; 
        f.push(freq);
        sum_f += freq;
        F.push(sum_f);
    }
    
    // 2. Construir la Tabla HTML (mostrando solo x y F)
    let tableRows = '';
    for(let i=0; i<n_rows; i++) {
        tableRows += `<tr><td>${x[i]}</td><td>${F[i]}</td></tr>`;
    }
    const opcion = Math.floor(Math.random()*3)
    const tipoTendencia = ['media', 'mediana', 'moda'][opcion];

    
    const P = `
    ${numeroPregunta + 1}.- Dada la siguiente tabla de frecuencia acumulada, determine la ${tipoTendencia}.
    <br><br>
    <center>
    <table border="1" style="border-collapse: collapse; text-align: center; font-family: sans-serif; min-width: 150px;">
        <tr style="background-color: #f0f0f0;">
            <th style="padding: 5px;">$x$</th>
            <th style="padding: 5px;"><b>F A</b></th>
        </tr>
        ${tableRows}
    </table>
    </center>
    `;
    
    // 3. Calcular respuesta correcta usando la función solicitada
    let [mean, median, mode] = tlacu.stat.medTendenciaCentral(x, f);
    
    // Función auxiliar de formateo
    const format = (m, med, mo, opcion) => {
        if (opcion === 0) { // Media
            const mStr = Number.isInteger(m) ? m : m.toFixed(2);
            return `$\\bar{x}=${mStr}$`;
        } else if (opcion === 1) { // Mediana
            const medStr = Number.isInteger(med) ? med : med.toFixed(2);
            return `mediana $=${medStr}$`;
        } else { // Moda
            let moStr = Array.isArray(mo) && mo.length > 1 ? mo.join(', ') : (Array.isArray(mo) ? mo[0] : mo);
            return `moda $=${moStr}$`;
        }

        /*
        let moStr = Array.isArray(mo) && mo.length > 1 ? mo.join(', ') : (Array.isArray(mo) ? mo[0] : mo);
        // Formateo limpio: si es entero no mostrar decimales, si no, 2 decimales
        const mStr = Number.isInteger(m) ? m : m.toFixed(2);
        return `$\\bar{x}=${mStr},\; \\tilde{x}=${med},\; \\hat{x}=${moStr}$`;*/
    };
    
    const correct = format(mean, median, mode, opcion);
    console.log(`Respuesta correcta: ${correct}`);
    let R = [correct];
    
    // 4. Generar distractores
    for(let i=1; i<6; i++) {
        let fakeR;
        do {
            let fakeMean = mean, fakeMedian = median, fakeMode = mode;
            const errorType = i % 4; // Variar tipos de error

            if (opcion == 0) {
                 // cambia el valor de la media 
                fakeMean = mean + (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 5);
            } else if (opcion == 1) {
                // Cambia el valor de la mediana
                fakeMedian = median + (Math.random() > 0.5 ? 1 : -1) * Math.ceil(Math.random() * 5);
            } else{
                // Cambiar la moda
                fakeMode = [x[Math.floor(Math.random() * x.length)]];
            } 
            R[i] = format(fakeMean, fakeMedian, fakeMode, opcion);
            console.log(`R ${i}: ${R}`);
            
        } while (tlacu.pregunta.hayRepetidos(R)); // Evitar duplicados
        
        //R.push(fakeR);
    }
    
    return [P, R];
    
  } catch (error) {
    console.error('Error en pregunta 12.3.1:', error);
    return ["Error generando pregunta", ["Error"]];
  }
}
