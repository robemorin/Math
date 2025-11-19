import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import {desencriptar, encriptar, generarCodigo} from '../r2p_core.js'
export function name() {
  return 'Gráficas a trozos';
}

export function tipo() {
  return 3;
}

export async function pregunta(i, totalPreguntas, esImprimible=false) {
  try{
    let f = generarFuncion_Prob1();



    const Pregunta = `
      <div class="pregunta-abierta"  style="display: none;">
        <p>${i + 1}.- Obtenga la ecuación de la línea en la forma $y-y_0 = m(x-x_0)$<span id="resultado_${i}" name="question"></span></p>
        <div id="applet_container_${i}" class="ggb-container"></div>
        
        <table>
          
          <tr><td>Ecuación de la línea: </td><td><math-field>y=</math-field></td></tr>
          </table>
      </div>
    `;
    if(esImprimible){
	const respuesta=`$${f.latex}$`
	return [Pregunta, respuesta]
  }
  
    if (totalPreguntas-1 == i) render(null,totalPreguntas)
    return Pregunta
  
    
  }catch (error){
    console.error('Error al carga la pregunta:', error);
  }
}

export async function render(container, n, code) {
  console.log('Ejecutar render')
   const material_id = "zpp4kdej";
  window.ggbApps = [];

  for (let i = 0; i < n; i++) {
    const params = {
      appName: 'classic',
      width: 600,
      height: 600,
      material_id,
      id: `ggbApplet_${i}`,
      appletOnLoad(api) {
        let pregunta = document.getElementsByClassName('pregunta-abierta')
        const A = pregunta[i].dataset.a.split(',').map(Number)
        const m = pregunta[i].dataset.m.split(',').map(Number)
        
        console.log(`${i}.- A:${pregunta[i].dataset.a} m:${pregunta[i].dataset.m}`)
        window.ggbApps[i] = api;
      api.evalCommand(`f(x) = If(x<-2,-x,If(x<=2, x^2,4))`);
      api.evalCommand(`A:(${A[0]},${A[1]})`);
      api.setFixed('A', true);

      }
    };
    new GGBApplet(params, true).inject(`applet_container_${i}`);
  }
  console.log('vamos a publicar la revisión')
  window.accionR2P = function(i) {
    const api = window.ggbApps[i];
    if (!api) return alert("Applet no listo");

    let totalPuntos = 1
    let puntos = 0
    let pregunta = document.getElementsByClassName('pregunta-abierta')
    const mathFields= pregunta[i].getElementsByTagName('math-field')
    const ans = mathFields[0].value

    const A = pregunta[i].dataset.a.split(',').map(Number)
    let m = pregunta[i].dataset.m.split(',').map(Number)
    m = tlacu.simplify_frac(m)
    const correcta = linea_puntopendiente(m,A)

    if( ans != correcta ){
      mathFields[0].style.backgroundColor = "red";
      document.getElementById(`resultado_${i}`).innerHTML = `'${correcta}' != '${ans}'`
    } else{
      ++puntos
      mathFields[0].style.border = "solid 5px green";
    }
    return [puntos,totalPuntos]
  };
}

/**
 * Genera un entero aleatorio en un rango, opcionalmente excluyendo un valor.
 * @param {number} min - Mínimo inclusivo
 * @param {number} max - Máximo inclusivo
 * @param {number[]} [exclude=[]] - Array de números a excluir
 */
function randomInt(min, max, exclude = []) {
    let num;
    do {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (exclude.includes(num));
    return num;
}

/**
 * Genera una pieza de función aleatoria (lineal, cuadrática o constante).
 * @returns {object} - {latex: string, geogebra: string, callable: function}
 */
function generarTrozos(xmin, xmax) {
    const tipo = randomInt(1, 3);
    let a, b, c, h, k;
    let latex, geogebra, callable;

    switch (tipo) {
        case 1: // Lineal: ax + b
            a = randomInt(-3, 3, [0]);
            b = (a < 0 ? 1 : -1) * randomInt(0, 5) - a * xmin;
            
            latex = `${a}x ${b < 0 ? '' : '+'} ${b}`;
            geogebra = `${a}*x ${b < 0 ? '' : '+'} ${b}`;
            callable = (x) => a * x + b;
            break;

        case 2: // Constante: c
            c = randomInt(-5, 5);
            
            latex = `${c}`;
            geogebra = `${c}`;
            callable = (x) => c;
            break;

        case 3: // Cuadrática: a(x-h)^2 + k
            a = randomInt(-2, 2, [0]);
            h = randomInt(xmin, xmax);
            k = (a < 0 ? 1 : -1) * randomInt(0, 5);
            
            // LaTeX
            if (h === 0) {
                latex = `${a}x^2 ${k > 0 ? '+' : ''} ${k === 0 ? '' : k}`;
            } else {
                latex = `${a}(x ${h > 0 ? '-' : '+'} ${Math.abs(h)})^2 ${k > 0 ? '+' : ''} ${k === 0 ? '' : k}`;
            }
            
            // GeoGebra
            if (h === 0) {
                geogebra = `${a}*x^2 ${k > 0 ? '+' : ''} ${k === 0 ? '' : k}`;
            } else {
                geogebra = `${a}*(x ${h > 0 ? '-' : '+'} ${Math.abs(h)})^2 ${k > 0 ? '+' : ''} ${k === 0 ? '' : k}`;
            }
            
            callable = (x) => a * Math.pow(x - h, 2) + k;
            break;
    }

    return { latex, geogebra, callable };
}

/**
 * Genera una función a trozos de 3 partes para el Problema 1.
 * @returns {object} - {latex, geogebra, callable, bp1, bp2}
 */
function generarFuncion_Prob1() {
    let bp1 = randomInt(-3, 0);
    let bp2 = randomInt(1, 4);

    let f1 = generarTrozos(-5, bp1);
    let f2 = generarTrozos(bp1, bp2);
    let f3 = generarTrozos(bp2, 5);

    // LaTeX
    let latex = `f(x) = \\begin{cases} ${f1.latex} & \\text{si } x \\le ${bp1} \\\\ ${f2.latex} & \\text{si } ${bp1} < x \\le ${bp2} \\\\ ${f3.latex} & \\text{si } x > ${bp2} \\end{cases}`;

    // GeoGebra (usa If anidados)
    let geogebra = `f(x) = If(x <= ${bp1}, ${f1.geogebra}, If(x <= ${bp2}, ${f2.geogebra}, ${f3.geogebra}))`;

    // Función callable
    let callable = (x) => {
        if (x <= bp1) return f1.callable(x);
        if (x > bp1 && x <= bp2) return f2.callable(x);
        if (x > bp2) return f3.callable(x);
    };

    return { latex, geogebra, callable, bp1, bp2 };
}

// ============ EJEMPLO DE USO ============
/*
console.log("=== GENERANDO FUNCIÓN A TROZOS ===\n");

const funcion = generarFuncion_Prob1();

console.log("LaTeX (para mostrar):");
console.log(funcion.latex);
console.log("\n");

console.log("GeoGebra (copiar y pegar):");
console.log(funcion.geogebra);
console.log("\n");

console.log(`Puntos de ruptura: x = ${funcion.bp1} y x = ${funcion.bp2}`);
console.log("\n");

// Probar la función
console.log("Evaluaciones de prueba:");
[-5, funcion.bp1, 0, funcion.bp2, 5].forEach(x => {
    console.log(`f(${x}) = ${funcion.callable(x)}`);
});*/