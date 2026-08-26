import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import * as ai from '../utils/fichas-ai.js';

ai.initTlacuache();

export function name() {
    return 'Sucesiones Geométricas: Modelos de Población';
}

export async function pregunta(numeroPregunta, globalIndex) {
    let html = '';
    let solucion = '';

    // --- DATOS ALEATORIOS ---
    // Problema 1: Crecimiento
    const insectos_tipos = ['hormigas', 'abejas', 'termitas', 'escarabajos'];
    const insecto = insectos_tipos[Math.floor(Math.random() * insectos_tipos.length)];
    const u0_1 = 400 + Math.floor(Math.random() * 200); // 400 a 599
    const p_inc = 8 + Math.floor(Math.random() * 7); // 8% a 14%
    const r_1 = 1 + (p_inc / 100);
    const n_1a = 8 + Math.floor(Math.random() * 4); // 8 a 11 semanas
    const n_1b = 15 + Math.floor(Math.random() * 5); // 15 a 19 semanas
    const pop_target = u0_1 * (3 + Math.floor(Math.random() * 2)); 

    const ans_1a = u0_1 * Math.pow(r_1, n_1a);
    const ans_1b = u0_1 * Math.pow(r_1, n_1b);
    const ans_1c = Math.log(pop_target / u0_1) / Math.log(r_1);

    // Problema 2: Decrecimiento
    const animal_tipos = ['lince ibérico', 'rinoceronte negro', 'panda gigante', 'tigre de bengala', 'gorila de montaña'];
    const animal = animal_tipos[Math.floor(Math.random() * animal_tipos.length)];
    const year_ini = 2000 + Math.floor(Math.random() * 10);
    const u0_2 = 500 + Math.floor(Math.random() * 300); // 500 a 799
    const p_dec = 3 + (Math.random() * 3); // 3% a 6%
    const p_dec_round = p_dec.toFixed(1);
    const r_2 = 1 - (parseFloat(p_dec_round) / 100);
    const year_target = year_ini + 10 + Math.floor(Math.random() * 10);
    const n_2a = year_target - year_ini;
    const pop_target_2 = 50 + Math.floor(Math.random() * 50); // 50 a 99

    const ans_2a = u0_2 * Math.pow(r_2, n_2a);
    const ans_2b = Math.log(pop_target_2 / u0_2) / Math.log(r_2);

    // Problema 3: Propagación Viral (Crecimiento)
    const media_tipos = ['un video en TikTok', 'un reel en Instagram', 'un meme en Twitter', 'un post en Facebook'];
    const media = media_tipos[Math.floor(Math.random() * media_tipos.length)];
    const u0_3 = 100 + Math.floor(Math.random() * 900); // 100 a 999 vistas iniciales
    const p_inc_3 = 25 + Math.floor(Math.random() * 25); // 25% a 49% diario
    const r_3 = 1 + (p_inc_3 / 100);
    const n_3a = 5 + Math.floor(Math.random() * 5); // 5 a 9 dias
    const pop_target_3 = u0_3 * (10 + Math.floor(Math.random() * 10)); 

    const ans_3a = u0_3 * Math.pow(r_3, n_3a);
    const ans_3b = Math.log(pop_target_3 / u0_3) / Math.log(r_3);

    // Problema 4: Desintegración Médica (Decrecimiento)
    const med_tipos = ['Paracetamol', 'Ibuprofeno', 'Amoxicilina', 'Aspirina'];
    const med = med_tipos[Math.floor(Math.random() * med_tipos.length)];
    const u0_4 = 200 + Math.floor(Math.random() * 400); // 200 a 599 mg
    const p_dec_4 = 15 + Math.floor(Math.random() * 15); // 15% a 29% por hora
    const r_4 = 1 - (p_dec_4 / 100);
    const n_4a = 3 + Math.floor(Math.random() * 4); // 3 a 6 horas
    const pop_target_4 = 10 + Math.floor(Math.random() * 10); // 10 a 19 mg

    const ans_4a = u0_4 * Math.pow(r_4, n_4a);
    const ans_4b = Math.log(pop_target_4 / u0_4) / Math.log(r_4);

    // --- CONSTRUCCIÓN DEL HTML ---
    html += ai.getHeader("1.3.7", "Sucesiones Geométricas", "Matemáticas AI NM - Sucesiones");

    html += `
        <div class="seccion-title">I. Crecimiento Poblacional</div>
        <div class="exercise-step">
            <div class="contexto-especial">
                Un nido de ${insecto} contiene inicialmente $${u0_1}$ individuos. La población está aumentando un $${p_inc}\\%$ cada semana.
            </div>
            <ol class="FT_ol_a">
                <li>¿Cuántos individuos habrá después de $${n_1a}$ semanas? <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
                <li>¿Cuántos individuos habrá después de $${n_1b}$ semanas? <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
                <li>¿Cuántas semanas tendrán que pasar para que la población alcance los $${pop_target}$ individuos? <span class="mark">3</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            </ol>
        </div>

        <div class="seccion-title">II. Decrecimiento Poblacional</div>
        <div class="exercise-step">
            <div class="contexto-especial">
                El ${animal} es una especie en peligro de extinción. Desde el año ${year_ini} la población ha sido monitoreada. En ese momento, la población era de $${u0_2}$ individuos y ha ido disminuyendo a un ritmo constante del $${p_dec_round}\\%$ anual.
            </div>
            <ol class="FT_ol_a">
                <li>Estime la población en el año ${year_target}. <span class="mark">2</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
                <li>¿En qué año se espera que la población haya disminuido hasta alcanzar los $${pop_target_2}$ individuos? <span class="mark">3</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            </ol>
        </div>

        <div class="seccion-title">III. Propagación en Redes Sociales</div>
        <div class="exercise-step">
            <div class="contexto-especial">
                Un estudiante sube ${media} que se hace viral. El primer día obtiene $${u0_3}$ visualizaciones. El número de visualizaciones diarias aumenta un $${p_inc_3}\\%$ cada día con respecto al día anterior.
            </div>
            <ol class="FT_ol_a">
                <li>¿Cuántas visualizaciones obtendrá en el día $${n_3a}$? <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
                <li>¿Cuántos días tendrán que pasar para que obtenga $${pop_target_3}$ visualizaciones en un solo día? <span class="mark">3</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            </ol>
        </div>

        <div class="seccion-title">IV. Eliminación de Medicamentos</div>
        <div class="exercise-step">
            <div class="contexto-especial">
                Un paciente toma una pastilla que contiene $${u0_4}$ mg de ${med}. La cantidad de medicamento en su torrente sanguíneo disminuye a una tasa del $${p_dec_4}\\%$ cada hora.
            </div>
            <ol class="FT_ol_a">
                <li>Calcule la cantidad de medicamento que quedará en el cuerpo después de $${n_4a}$ horas. <span class="mark">2</span> <tlacuache-renglon n="1" color="#f9f9f9"></tlacuache-renglon></li>
                <li>El medicamento deja de ser efectivo cuando la cantidad en el torrente sanguíneo es menor a $${pop_target_4}$ mg. ¿Después de cuántas horas completas ocurrirá esto? <span class="mark">3</span> <tlacuache-renglon n="2" color="#f9f9f9"></tlacuache-renglon></li>
            </ol>
        </div>

        ${ai.getTiTip("Recuerda usar la función <code>Solver</code> (Ecuación) de tu calculadora o representar $Y_1 = u_0 \\times r^x$ y $Y_2 = \\text{objetivo}$ para buscar la intersección. Alternativamente, puedes usar logaritmos.")}
    </div><div class="page-break"></div>
    `;

    // --- SOLUCIONARIO ---
    solucion += `
    <div style="font-family: sans-serif; font-size: 0.85rem;">
        <b>Solucionario 1.3.7:</b><br>
        1a. Usando $u_n = u_0 \\times r^n$ donde $r = ${r_1}$. Población = $${u0_1} \\times (${r_1})^{${n_1a}} \\approx ${Math.round(ans_1a)}$ individuos. [M1 A1]<br>
        1b. Población = $${u0_1} \\times (${r_1})^{${n_1b}} \\approx ${Math.round(ans_1b)}$ individuos. [M1 A1]<br>
        1c. $${u0_1} \\times (${r_1})^n = ${pop_target} \\rightarrow n = \\log(${pop_target}/${u0_1}) / \\log(${r_1}) \\approx ${ans_1c.toFixed(2)}$ semanas. [M1 A2]<br>
        2a. Usando $r = 1 - ${p_dec_round}/100 = ${r_2}$. Han pasado ${n_2a} años. Población = $${u0_2} \\times (${r_2})^{${n_2a}} \\approx ${Math.round(ans_2a)}$ individuos. [M1 A1]<br>
        2b. $${u0_2} \\times (${r_2})^n = ${pop_target_2} \\rightarrow n = \\log(${pop_target_2}/${u0_2}) / \\log(${r_2}) \\approx ${ans_2b.toFixed(2)}$ años. Año = ${year_ini} + ${ans_2b.toFixed(2)} $\\rightarrow$ Año ${year_ini + Math.floor(ans_2b)}. [M1 A2]<br>
        3a. Usando $r = ${r_3}$. Vistas = $${u0_3} \\times (${r_3})^{${n_3a}} \\approx ${Math.round(ans_3a)}$. [M1 A1]<br>
        3b. $${u0_3} \\times (${r_3})^n = ${pop_target_3} \\rightarrow n = \\log(${pop_target_3}/${u0_3}) / \\log(${r_3}) \\approx ${ans_3b.toFixed(2)}$ días. [M1 A2]<br>
        4a. Usando $r = 1 - ${p_dec_4}/100 = ${r_4}$. Cantidad = $${u0_4} \\times (${r_4})^{${n_4a}} \\approx ${ans_4a.toFixed(1)}$ mg. [M1 A1]<br>
        4b. $${u0_4} \\times (${r_4})^n = ${pop_target_4} \\rightarrow n = \\log(${pop_target_4}/${u0_4}) / \\log(${r_4}) \\approx ${ans_4b.toFixed(2)}$ horas. Se necesitan ${Math.ceil(ans_4b)} horas completas. [M1 A2]
    </div>
    `;

    return [html, solucion];
}

export async function renderGeoGebra(container, totalElements) { }
