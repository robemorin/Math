import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Línea recta a partir de dos puntos';
}
export function tipo(){
  return 0
  /*
  0 - Opción múltiple
  1 - Abierto
  2 - Geogebra
  */
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
export function video(){
  return "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // Reemplaza con tu enlace de YouTube
}
export async function pregunta(numeroPregunta) { 
  try {
    function tempEcLine(m,b){
        let ms = tlacu.simplify_frac([m[0], m[1]]);
        let bs = tlacu.simplify_frac([b[0], b[1]]);
        let cadena = `$y =`;
        if (ms[0] != 0) {
            if (ms[0] < 0) cadena += "-";
            if (Math.abs(ms[0]) == 1 && ms[1] == 1) {
                cadena += "x";
            } else {
                cadena += tlacu.fraccion(Math.abs(ms[0]), ms[1]) + "x";
            }
        }
        if (bs[0] != 0) {
            if (ms[0] != 0 && bs[0] > 0) cadena += "+";
            else if (bs[0] < 0) cadena += "-";
            cadena += tlacu.fraccion(Math.abs(bs[0]), bs[1]);
        } else if (ms[0] == 0) {
            cadena += "0";
        }
        return cadena + "$";
    }


    let A=[Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)], B
    do{
        B = [Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)]
        console.log(`A:${A}, B:${B}`)
    }while( (A[0] == B[0]) || (A[1] == B[1]) )
    const dummy=Math.round(Math.random())
    
    let m=[ B[1]-A[1], B[0]-A[0] ]
    m=tlacu.simplify_frac(m)

    let b=[m[1]*A[1]-m[0]*A[0],m[1]]
    b=tlacu.simplify_frac(b)


    const P=`${numeroPregunta+1}.- Determine la ecuación de la línea recta que pasa por los puntos $A:(${A[0]}, ${A[1]})$ y $B:(${B[0]}, ${B[1]})$`
    const R=[tempEcLine(m, b)];
    
    for(let i=1;i<6;++i){
      do{
        if(dummy==1){
									m[0] += Math.round(Math.random()*4-2)
								}else{
									b[0] += Math.round(Math.random()*4-2)
								}
								R[i]= tempEcLine(m,b)
      }while( tlacu.pregunta.hayRepetidos(R) )
    }

    // Datos primarios (únicamente las coordenadas de entrada, sin respuestas ni ecuaciones calculadas)
    const datosPrimarios = {
      x1: A[0],
      y1: A[1],
      x2: B[0],
      y2: B[1]
    };

    return [P, R, datosPrimarios]

  } catch (error) {
    console.error('Error generando pregunta:', error);
  }
}

/**
 * Genera el procedimiento matemático paso a paso BAJO DEMANDA.
 * Se invoca únicamente cuando el usuario presiona el botón "Ver procedimiento" tras calificar.
 */
export function procedimiento(datos) {
    function formatearRecta(m, b) {
        let ms = tlacu.simplify_frac([m[0], m[1]]);
        let bs = tlacu.simplify_frac([b[0], b[1]]);
        let cadena = `$y =`;
        if (ms[0] != 0) {
            if (ms[0] < 0) cadena += "-";
            if (Math.abs(ms[0]) == 1 && ms[1] == 1) {
                cadena += "x";
            } else {
                cadena += tlacu.fraccion(Math.abs(ms[0]), ms[1]) + "x";
            }
        }
        if (bs[0] != 0) {
            if (ms[0] != 0 && bs[0] > 0) cadena += "+";
            else if (bs[0] < 0) cadena += "-";
            cadena += tlacu.fraccion(Math.abs(bs[0]), bs[1]);
        } else if (ms[0] == 0) {
            cadena += "0";
        }
        return cadena + "$";
    }

    const x1 = Number(datos.x1);
    const y1 = Number(datos.y1);
    const x2 = Number(datos.x2);
    const y2 = Number(datos.y2);

    const dy = y2 - y1;
    const dx = x2 - x1;
    let m = tlacu.simplify_frac([dy, dx]);
    let b = tlacu.simplify_frac([m[1] * y1 - m[0] * x1, m[1]]);
    const fracM = tlacu.fraccion(m[0], m[1]);
    const fracB = tlacu.fraccion(b[0], b[1]);
    const ecuacionFinal = formatearRecta(m, b);

    return `
      <p><strong>Paso 1: Calcular la pendiente $m$</strong></p>
      <p>Usando la fórmula $m = \\frac{y_2 - y_1}{x_2 - x_1}$ con $A(${x1}, ${y1})$ y $B(${x2}, ${y2})$:</p>
      <p>$$m = \\frac{${y2} - (${y1})}{${x2} - (${x1})} = \\frac{${dy}}{${dx}} = ${fracM}$$</p>
      
      <p><strong>Paso 2: Calcular la ordenada al origen $b$</strong></p>
      <p>Sustituyendo el punto $A(${x1}, ${y1})$ en $y = mx + b$:</p>
      <p>$$${y1} = (${fracM})(${x1}) + b \\implies b = ${y1} - (${fracM})(${x1}) = ${fracB}$$</p>
      
      <p><strong>Paso 3: Escribir la ecuación de la recta</strong></p>
      <p>Resultado final: <strong>${ecuacionFinal}</strong></p>
    `;
}

/*

						//  Inicio de preguntas
						let C=abrirPregunta()
						
	
						
						const P=
	
						spanContenido(P,C[6])
						
						const R=[tempEcLine(m,b)]
						for(let i=1;i<6;++i){
							do{
								if(dummy==1){
									m[0] += Math.round(Math.random()*4-2)
								}else{
									b[0] += Math.round(Math.random()*4-2)
								}
								R[i]= tempEcLine(m,b)
							}while(repetido(R))
						
						}
						for(let k=0;k<6;++k) spanContenido(R[k],C[k])
*/