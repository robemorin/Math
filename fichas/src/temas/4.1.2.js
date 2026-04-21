import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Recolección de datos y sesgos muestrales';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Parámetros dinámicos para contextualizar
    const medicamentos = ["Cobrasyl", "Cardiovita", "Neurolax", "Dermacure"];
    const med = medicamentos[Math.floor(Math.random() * medicamentos.length)];
    const n_estudio = Math.floor(Math.random() * 20) + 5;
    const exito = Math.floor(Math.random() * 3) + 2;
    
    const lugares = ["centro comercial", "estación de tren", "aeropuerto", "plaza pública"];
    const lugar = lugares[Math.floor(Math.random() * lugares.length)];

    let Pregunta = `<div class="problema2">
    <h3>Práctica: Evaluación de Métodos de Muestreo (40 min)</h3>
    <p>1.- Se ha desarrollado un nuevo fármaco llamado <b>${med}</b> para la hipertensión. Un estudio clínico tomó una muestra de ${n_estudio} pacientes y observó que ${exito} de ellos redujeron su presión arterial a niveles aceptables.</p>
    <ol class="FT_ol_a">
        <li>¿Es esta muestra representativa de la población general de pacientes hipertensos? Justifique su respuesta basándose en el tamaño de la muestra. <div>3</div></li>${CR(3)}
        <li>Identifique qué tipo de error (cobertura, sesgo o error de medición) podría estar presente si el estudio solo incluyó a personas de una sola clínica específica. <div>2</div></li>${CR(2)}
    </ol>
    </div>

    <div class="problema2">
    <p>2.- En un estudio realizado en un <b>${lugar}</b>, se entrevistó a ${20 + Math.floor(Math.random()*30)} personas para conocer su opinión sobre una política pública nacional. Se concluyó que "el ${40 + Math.floor(Math.random()*20)}% de los canadienses apoyan la medida".</p>
    <ol class="FT_ol_a">
        <li>Mencione dos razones por las cuales esta conclusión podría ser <b>poco fiable</b> o estar sesgada. <div>4</div></li>${CR(4)}
    </ol>
    </div>

    <div class="problema2">
    <p>3.- Una encuestadora desea investigar la intención de voto. Evalúe si los siguientes métodos producen muestras sesgadas y explique brevemente por qué:</p>
    <ol class="FT_ol_a">
        <li>Encuestar personas en un club de golf privado durante un día laboral. <div>2</div></li>${CR(2)}
        <li>Llamar por teléfono fijo entre las 9:00 am y las 11:00 am a los hogares registrados en una guía telefónica. <div>2</div></li>${CR(2)}
        <li>Selección aleatoria de votantes de un padrón electoral completo. <div>2</div></li>${CR(2)}
    </ol>
    </div>`;

    let Solucion = `<div class="ans"><b>Solucionario (Guía para el profesor):</b><br>
    <b>P1:</b> (1a) La muestra es demasiado pequeña ($n=${n_estudio}$), lo cual aumenta la variabilidad y no permite generalizar resultados con significancia estadística. (1b) Sesgo de cobertura/muestreo, ya que la población de una sola clínica no representa la diversidad de la población general. <br>
    <b>P2:</b> (2a) Sesgo de lugar (solo personas que pasan por el ${lugar}) y posible sesgo de conveniencia (la muestra no es aleatoria); el lugar puede atraer a un grupo socioeconómico específico que no representa a todo el país. <br>
    <b>P3:</b> (3a) Sesgo de selección: los miembros de un club de golf no representan la media socioeconómica del electorado. (3b) Sesgo de exclusión: las personas trabajando a esa hora no pueden contestar (subrepresentación de población activa). (3c) Es un método adecuado y evita el sesgo de selección si el padrón está actualizado.</div>`;

    return [Pregunta, Solucion];
}