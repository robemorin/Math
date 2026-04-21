import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

// Fuente original: [102].pdf
export function name() {
    return 'Recolección de datos y Ética en Investigación';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Escenarios dinámicos para los problemas
    let poblacionA = ["estudiantes de secundaria", "pacientes con diabetes tipo 2", "usuarios de una red social", "clientes de un banco"];
    let poblacionElegida = poblacionA[Math.floor(Math.random() * poblacionA.length)];
    
    let Pregunta = `<div class="problema2"><h3>Práctica de Teoría del Conocimiento: Ética y Muestreo</h3>
    <p>Contexto: Un equipo de investigadores desea realizar un estudio sobre el impacto de una nueva política en <b>${poblacionElegida}</b>.</p>
    <ol class="FT_ol_a">
        <li><b>Diseño de muestreo:</b> Explique brevemente la diferencia entre una muestra aleatoria y una muestra de conveniencia en este contexto. ¿Cuál sería más ética y representativa? <div>4</div></li>${CR(4)}
        <li><b>Ética y Consentimiento:</b> Imagine que usted es parte del comité de ética. ¿Qué riesgos específicos (físicos, psicológicos o de privacidad) identifica para <b>${poblacionElegida}</b> al participar en este estudio? <div>4</div></li>${CR(4)}
        <li><b>Declaración de Helsinki:</b> La Declaración de Helsinki establece que los pacientes deben estar plenamente informados. ¿Por qué cree que el consentimiento basado únicamente en "Términos y Condiciones" (como en el caso de Facebook) suele ser insuficiente desde una perspectiva ética? <div>4</div></li>${CR(4)}
        <li><b>Sesgo en la recolección:</b> Si el estudio se realizara únicamente a través de un formulario online para <b>${poblacionElegida}</b>, ¿qué sesgo de selección podría introducirse y cómo afectaría la validez de los resultados? <div>4</div></li>${CR(4)}
        <li><b>Análisis crítico:</b> ¿Es siempre posible realizar un experimento perfectamente controlado (con grupo de control y de tratamiento) en seres humanos? Justifique su respuesta basándose en los principios de la ética médica. <div>4</div></li>${CR(4)}
    </ol></div>`;

    // Las soluciones son argumentativas, se proporcionan guías para la evaluación
    let Solucion = `<div class="ans"><b>Guía de corrección (Puntos clave):</b><br>
    (1) La muestra aleatoria evita sesgos al dar a todos la misma probabilidad. La conveniencia es más rápida pero poco representativa.<br>
    (2) Identificar riesgos: privacidad de datos, presión psicológica, o efectos secundarios no deseados en la salud.<br>
    (3) Los "Términos y Condiciones" suelen ser opacos y extensos; el consentimiento debe ser "informado", claro y voluntario, no una letra pequeña aceptada por defecto.<br>
    (4) Sesgo: Exclusión de personas sin acceso a internet o de mayor edad. Los resultados solo serían válidos para el subgrupo conectado.<br>
    (5) No siempre es posible por razones éticas; por ejemplo, si el tratamiento es intrínsecamente dañino o si el grupo de control no puede recibir un placebo por necesidad médica vital.</div>`;

    return [Pregunta, Solucion];
}