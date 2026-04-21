import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

/* 
   Fuente original: [101].pdf
   Subtema: 4.1 Recolección de datos y muestreo
   Tiempo estimado: 40 minutos
*/

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export function name() {
    return 'Recolección de datos y muestreo - Caso Práctico';
}

export async function pregunta() {
    let poblacion = 200;
    let muestra_n = 30;
    
    let Pregunta = `<div class="problema2">
    <h3>Análisis de Muestreo: Estudio sobre hábitos de salud</h3>
    <p>En un colegio se realizó una encuesta a los <b>${poblacion}</b> estudiantes de los cursos finales para determinar la prevalencia del tabaquismo. Los resultados se tabularon en una secuencia de respuestas (y=sí, n=no).</p>
    
    <div style="font-family: monospace; font-size: 0.9em; border: 1px solid #ccc; padding: 10px; background: #f9f9f9;">
    n n n n y | n n y n n | y y n y y | y n n y n | n y n n y | n y n n n<br>
    y n y n y | y y n y y | y y n n y | n n n n n | n n y n y | n y n n y<br>
    n y n n n | y n y y n | y n y y y | y n n n n | y n n n n | y y n y y<br>
    n y n n n | y y n y y | n y n n n | y n y n y | n y n y n | y n y n n
    </div>

    <ol class="FT_ol_a">
        <li>¿Por qué se considera que este estudio es un <b>censo</b> y no una muestra? Explique brevemente. <div>2</div></li>${CR(2)}
        <li>Un investigador decide tomar una submuestra de ${muestra_n} estudiantes seleccionando sistemáticamente cada 5to estudiante de la lista. ¿Cuál es el inconveniente técnico de este tipo de muestreo si la lista tiene un patrón cíclico? <div>3</div></li>${CR(3)}
        <li>Defina y contraste la diferencia entre <b>muestreo estratificado</b> y <b>muestreo por cuotas</b> en el contexto de este colegio (división por años 11 y 12). <div>4</div></li>${CR(4)}
    </ol>
    
    <h3>Reflexión sobre representatividad (Referéndum)</h3>
    <p>Considere el gráfico de sectores del referéndum del "Brexit" (donde ${51.9}\\%$ votó por "Leave").</p>
    <ol class="FT_ol_a" start="4">
        <li>Si el ${51.9}\\%$ de los votantes eligió "Leave", pero hubo una alta abstención, ¿es válido afirmar que el resultado refleja la "voluntad del pueblo"? Justifique su respuesta utilizando el concepto de <b>sesgo de no respuesta</b>. <div>4</div></li>${CR(5)}
    </ol>
    </div>`;

    let Solucion = `<div class="ans"><b>Solucionario:</b><br>
    1. Es un censo porque se ha consultado a la totalidad de la población objetivo (${poblacion} estudiantes).<br>
    2. Si el patrón de la lista (ej. respuestas) es cíclico y coincide con el intervalo de muestreo ($k=5$), la muestra estará fuertemente sesgada al incluir siempre el mismo tipo de respuesta.<br>
    3. Muestreo estratificado: Selecciona individuos aleatoriamente dentro de cada estrato (años 11 y 12). Muestreo por cuotas: Selecciona individuos no aleatoriamente hasta llenar un número predeterminado por categoría.<br>
    4. Argumento centrado en que la muestra (quienes votaron) no representa a la población total (incluyendo quienes no votaron o no están registrados), lo que constituye un sesgo de selección y no respuesta.</div>`;

    return [Pregunta, Solucion];
}