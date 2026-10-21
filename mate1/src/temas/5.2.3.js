import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Sucesiones aritméticas III';
}

export function tipo() {
  return 0; // 0 - Opción múltiple
}

export function directivaIA(){
  return `Actúa como un examinador senior y redactor jefe de currículo para el curso de Matemáticas: Aplicaciones e Interpretaciones NM (Nivel Medio) 
del Bachillerato Internacional (IB). Tu tarea es diseñar un único ejercicio original tipo examen (que conste de varios incisos progresivos: a, b, c...) 
acompañado de su respectivo criterio de corrección oficial (mark scheme).Sigue rigurosamente las siguientes directrices pedagógicas y de formato del IB:
1. Contextualización Realista: El problema debe estar situado en un contexto del mundo real con el tema central sea '${name()}' y
contextualizado (ej. economía y finanzas, ecología, logística, crecimiento poblacional, ergonomía o análisis estadístico de un fenómeno social). 
Evita problemas puramente abstractos o algebraicos sin aplicación.
2. Uso de la Tecnología (GDC) Recuerda que en el curso AI SL el uso de la calculadora gráfica (GDC) está permitido en ambos exámenes (Paper 1 y Paper 2).
Diseña el ejercicio de modo que requiera el uso inteligente de funciones de la GDC, sin caer en cálculos manuales tediosos innecesarios.
3. Selección y Rigor de los Términos de Instrucción (Command Terms)Utiliza estrictamente la taxonomía oficial de términos de instrucción del IB para los distintos incisos
(por ejemplo: Determine, Escriba, Calcula, Encuentre, Mueste, Demuestre, Explique, Interprete, Compruebe, Bosqueje). La dificultad debe escalar de forma natural:
Inciso inicial (a): Directo, uso básico de una fórmula del cuadernillo de fórmulas o lectura simple de datos (1-2 marcas).
Inciso intermedio (b): Aplicación de un modelo matemático, interpretación de un parámetro en contexto o análisis estadístico (2-4 marcas).
Inciso final (c): Justificación crítica, limitación del modelo matemático propuesto, o un cálculo más complejo que requiera conectar dos bloques temáticos (2-3 marcas).
El puntaje total del ejercicio debe oscilar entre 6 y 9 marcas.
4. Estructura de Salida Requerida: Proporciona la respuesta estructurada estrictamente en dos secciones con encabezados de nivel 3:
### Enunciado del Ejercicio
Numerado correctamente, con contexto del mundo real y definición clara de variables y unidades. Con incisos progresivos (a, b, c...).
### Solución y Mark Scheme Oficial
Desglosando paso a paso las marcas de método ($M$), de respuesta exacta/precisa ($A$), de razonamiento/explicación ($R$), y las marcas de tendencia (FT - Follow Through) si aplican en incisos posteriores.
5. Formato de Respuesta y Matemáticas: Redacta la respuesta en formato Markdown estándar estructurado (usa encabezados ###, negritas **, listas - y párrafos limpios). Para todas las expresiones, variables y fórmulas matemáticas utiliza estrictamente delimitadores LaTeX: usa $...$ para matemáticas en línea (ejemplo: $y = mx + b$, marcas $[M1]$) y $$...$$ para ecuaciones principales en bloque. Asegúrate de cerrar siempre cada signo de dólar para no romper el modo matemático. NO uses el signo $ para representar dinero (si hablas de dinero escribe "USD", "euros" o "MXN").
6. La respuesta debe ser exclusivamente en español, sin traducciones al inglés ni a otros idiomas. No incluyas explicaciones adicionales fuera de la estructura solicitada.
`;
}

export async function pregunta(numeroPregunta) {
  try {
    return reciclado(numeroPregunta);
  } catch (error) {
    console.error('Error:', error);
  }
}

function reciclado(numeroPregunta) {
  let u1 = Math.floor(Math.random() * 101) - 50; // -50 a 50
  let d = 0;
  while (d === 0) {
    d = Math.floor(Math.random() * 41) - 20; // -20 a 20, dif de 0
  }

  let m = Math.floor(Math.random() * 10) + 2; // 2 a 11
  let n = m + Math.floor(Math.random() * 10) + 2; // m+2 a m+11
  
  let um = u1 + (m - 1) * d;
  let un = u1 + (n - 1) * d;

  let q_type = Math.floor(Math.random() * 3); // 0, 1, 2
  
  let P_base = `${numeroPregunta + 1}.- En una sucesión aritmética, sabemos que $u_{${m}} = ${um}$ y $u_{${n}} = ${un}$. `;
  let P = "";
  let answer;
  let R = [];
  let q = 0;

  if (q_type === 0) {
    P = P_base + `Halla el primer término $u_1$.`;
    answer = u1;
  } else if (q_type === 1) {
    P = P_base + `Halla la diferencia común $d$.`;
    answer = d;
  } else {
    q = Math.floor(Math.random() * 25) + 5; // 5 a 29
    while (q === m || q === n) q++; // Evitar preguntar por uno de los datos
    P = P_base + `Halla el valor del término $u_{${q}}$.`;
    answer = u1 + (q - 1) * d;
  }

  R[0] = `$${answer}$`;

  for (let i = 1; i < 6; ++i) {
    let fake_ans;
    do {
      let rnd = Math.random();
      if (q_type === 0) { // Distractores para u1
        if (rnd < 0.25) fake_ans = answer + d;
        else if (rnd < 0.5) fake_ans = answer - d;
        else if (rnd < 0.75) fake_ans = answer + um; 
        else fake_ans = answer + Math.floor(Math.random() * 21) - 10;
      } else if (q_type === 1) { // Distractores para d
        if (rnd < 0.25) fake_ans = -answer; 
        else if (rnd < 0.5) fake_ans = Math.round((un - um) / (n - m + 1)); 
        else if (rnd < 0.75) fake_ans = Math.round((un - um) / (n - m - 1));
        else fake_ans = answer + (Math.floor(Math.random() * 2) === 0 ? 1 : -1) * (Math.floor(Math.random() * 5) + 1);
      } else { // Distractores para u_q
        if (rnd < 0.2) fake_ans = u1 + q * d; 
        else if (rnd < 0.4) fake_ans = u1 + (q - 1) * (-d); 
        else if (rnd < 0.6) fake_ans = answer + d;
        else if (rnd < 0.8) fake_ans = answer - d;
        else {
          let offset = Math.floor(Math.random() * 11) - 5;
          if (offset === 0) offset = 1;
          fake_ans = answer + offset * Math.abs(d);
        }
      }

      if (fake_ans === answer || isNaN(fake_ans)) {
        fake_ans = answer + (Math.floor(Math.random() * 2) === 0 ? 1 : -1) * (Math.floor(Math.random() * 10) + 1);
      }
      R[i] = `$${fake_ans}$`;
    } while (tlacu.pregunta.hayRepetidos(R));
  }

  return [P, R];
}
