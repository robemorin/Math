import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import {desencriptar, encriptar, generarCodigo} from '../r2p_core.js'
export function name() {
  return 'Línea tangente a una función en un punto';
}

export function tipo() {
  return 3;
}

export async function pregunta(i, totalPreguntas, esImprimible=false) {
  try{
   
    const Pregunta = `
      <div class="pregunta-abierta"  data-a="a" data-b="b" style="display: none;">
        <p>${i + 1}.- Obtenga la tangente a $f(x)$ para $x=a$. <span id="resultado_${i}" name="question"></span></p>
        <div id="applet_container_${i}" class="ggb-container"></div>
        
        <table>
          <tr><td>Punto por el que pasa: </td><td><math-field>(,)</math-field></td></tr>
          <tr><td>Línea tangente: </td><td><math-field>y=0</math-field></td></tr>
          </table>
      </div>
    `;
    if(esImprimible){
	const respuesta=`$${tempEcLine(A,m)}$`
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
   const material_id = "jjrsj9dp";
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
       
        window.ggbApps[i] = api;
        api.evalCommand(`a = ${Math.ceil(Math.random()*4)*(Math.random()<0.5?1:-1)}`);
        api.evalCommand(`f(x) = ${Math.ceil(Math.random()*4)*(Math.random()<0.5?1:-1)}x^2+${Math.ceil(Math.random()*4)*(Math.random()<0.5?1:-1)}x+(${Math.ceil(Math.random()*4)*(Math.random()<0.5?1:-1)})/x`); 
        api.evalCommand('SetFixed(A, true)');

      }
    };
    new GGBApplet(params, true).inject(`applet_container_${i}`);
  }
  console.log('vamos a publicar la revisión')
  window.accionR2P = function(i) {
    const api = window.ggbApps[i];
    if (!api) return alert("Applet no listo");

    let totalPuntos = 2
    let puntos = 0
    let pregunta = document.getElementsByClassName('pregunta-abierta')
    const mathFields= pregunta[i].getElementsByTagName('math-field')

    console.log(`Revisar la pregunta ${i}`)
    const A =extractCoordinates(latexToGeoGebra( mathFields[0].value))
    const tangente =latexToGeoGebra( mathFields[1].value )
    console.log(`Mandar a Geogebra ${tangente}`)
    api.evalCommand(`h: ${tangente}`);
    const Q=api.getValue('Q')
    console.log(`Evaluar Q es ${Q}`)
    const Ax=api.getXcoord('A')
    const Ay=api.getYcoord('A')
    console.log(`sobre A: ${A}  == (${Ax.toFixed(3)},${Ay.toFixed(3)})`)
    if( Math.abs(A[0] - Ax)<0.001 && Math.abs(A[1] - Ay)<0.001){
      ++puntos
      mathFields[0].style.border = "solid 5px green";
    } else{
      mathFields[0].style.backgroundColor = "red";
    }
    
    if( Q){
      ++puntos
      mathFields[1].style.border = "solid 5px green";
    } else{
      
      mathFields[1].style.backgroundColor = "red";
    }

    return [puntos,totalPuntos]
  };
}



function latexToGeoGebra(latexExpr) {
  // 1. Maneja paréntesis y corchetes extendidos de LaTeX
  let geoGebraExpr = latexExpr.replace(/\\left\(/g, '(');

  // Reemplaza \right) con )
  geoGebraExpr = geoGebraExpr.replace(/\\right\)/g, ')');

  // 2. Reemplaza las fracciones \frac{a}{b} con a/b
  geoGebraExpr = geoGebraExpr.replace(/\\frac{([^}]+)}{([^}]+)}/g, '($1)/($2)');

  // 3. Añade un * entre un número y una variable (ej. 5x -> 5*x)
  geoGebraExpr = geoGebraExpr.replace(/(\d+)([a-zA-Z])/g, '$1*$2');

  // 4. Si no hay corchetes en la fracción, maneja el caso simple \frac12
  geoGebraExpr = geoGebraExpr.replace(/\\frac(\d+)(\d+)/g, '($1)/($2)');

  return geoGebraExpr;
}
function extractCoordinates(coordsString) {
  // 1. Elimina los paréntesis exteriores
  let cleanedString = coordsString.replace(/[\(\)]/g, '');

  // 2. Separa por la coma para obtener las coordenadas como cadenas
  let coordsArray = cleanedString.split(',');

  // 3. Evalúa cada coordenada para obtener el valor numérico
  let resultArray = coordsArray.map(coord => {
    try {
      // eval() es potente, úsalo con precaución si el origen de la cadena no es seguro.
      // Para este caso, donde la cadena viene de tu propia conversión, es aceptable.
      return eval(coord);
    } catch (e) {
      console.error("Error al evaluar la coordenada:", e);
      return NaN; // Devuelve NaN si hay un error
    }
  });

  return resultArray;
}