//1.1.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Funcion a trozos 2';
}
export function tipo(){
  return 0
  /*
  0 - Opción múltiple
  1 - Abierto
  2 - Geogebra
  */
}
export async function pregunta(numeroPregunta) { 
  try {
    return PP(numeroPregunta+1)

  } catch (error) {
    console.error('Error loading r2p_core.js:', error);
  }
}

function PP(numeroPregunta){
						function P1(numeroPregunta){
              let f= generarFuncion_Prob1();
							
              let P=`<div class="pregunta" data-f="${f.geogebra}">${numeroPregunta}.- Determine la función a trozos que corresponde a la siguiente gráfica: 
              <div id="applet_container_${numeroPregunta}" class="ggb-container"></div></div>`
              
							
						
					var R=[];
					R[0]=`$${f.latex}$`

					for(var i=1;i<6;++i){
						do{
              f= generarFuncion_Prob1();
							R[i]=`$${f.latex}$`
						}while(tlacu.pregunta.hayRepetidos(R))
					
					}
					return [P,R]
						}
						return P1(numeroPregunta)
					}
			
export async function render(container, n, code) {
  console.log('Ejecutar render')
   const material_id = "zpp4kdej";
  window.ggbApps = [];
  console.log('n=',document.getElementsByClassName('ggb-container').length)
  const preguntas = document.getElementsByClassName('ggb-container');
//Vamos a tomar la función de cada contenedor
  for (let i = 0; i < n; i++) {
    const params = {
      appName: 'classic',
      width: 600,
      height: 600,
      material_id,
      id: `applet_container_${i}`,
      appletOnLoad(api) {
        const latexXpression = preguntas[i].parentElement.getAttribute('data-f');
        window.ggbApps[i] = api;
      api.evalCommand(latexXpression);


      }
    };
    new GGBApplet(params, true).inject(`applet_container_${i}`);
  }
  console.log('vamos a publicar la revisión')
  window.accionR2P = function(i) {
    const api = window.ggbApps[i];
    if (!api) return alert("Applet no listo");

    
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