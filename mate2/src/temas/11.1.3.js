import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import {desencriptar, encriptar, generarCodigo} from '../r2p_core.js'
export function name() {
  return 'Línea tangente y normal';
}

export function tipo() {
  return 3;
}

export async function pregunta(i, totalPreguntas, esImprimible=false) {
  try{
    const a = Math.ceil(Math.random()*4)*(Math.random()<0.5?1:-1);
    const b = Math.ceil(Math.random()*4)*(Math.random()<0.5?1:-1);
    const c = Math.ceil(Math.random()*4)*(Math.random()<0.5?1:-1);
    let x0 
    do{
      x0= Math.ceil(Math.random()*5)*(Math.random()<0.5?1:-1);
    }while(2*a*x0+b == 0)

   
    const Pregunta = `${i==0?'<p><b>Nota:</b> Las respuestas de ecuaciones deben ser exactas, los puntos y áreas valores numéricos con dos decimales.</p>':''}
      <div class="pregunta-abierta"  data-a="${a}" data-b="${b}" data-c="${c}" data-x="${x0}" style="display: none;">
        <p>${i + 1}.- La siguiente función que se muestra a continuación es $f(x) = ${tlacu.poli.print([a,b,c])}$. <span id="resultado_${i}" name="question"></span></p>
        <div id="applet_container_${i}" class="ggb-container"></div>
        
        <table>
          <tr><td>a) Calcule la línea tangente a $f$ para $x=${x0.toFixed(1)}$, llámela $L_1$. </td><td><math-field>y=x</math-field></td></tr>
          <tr><td>b) En un punto $B$ que pertenece a $f$, existe otra tangente llamada $L_2$ que es perpendicular a $L_1$. Calcule el valor $B$</td><td><math-field>(,)</math-field></td></tr>
          <tr><td>c) Las tangentes $L_1$ y $L_2$ en un punto $C$. Escriba el valor de $C$.</td><td><math-field>(,)</math-field></td></tr>
          <tr><td>d) Calcule al área de la figura $ABC$.</td><td><math-field></math-field></td></tr>
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
   const material_id = "fv47bect";
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
        const a = parseFloat(pregunta[i].getAttribute('data-a'))
        const b = parseFloat(pregunta[i].getAttribute('data-b'))
        const c = parseFloat(pregunta[i].getAttribute('data-c'))
        const x0 = parseFloat(pregunta[i].getAttribute('data-x'))
       
        window.ggbApps[i] = api;
        api.evalCommand(`a = ${a}`);
        api.evalCommand(`b = ${b}`);
        api.evalCommand(`c = ${c}`);
        api.evalCommand(`x_0 = ${x0}`);
        api.evalCommand('SetFixed(A, true)');
        
        
        console.log(`f(x) = ${getFunctionDefinitionFromXML(api,'f')}`)

      }
    };
    new GGBApplet(params, true).inject(`applet_container_${i}`);
  }
  console.log('vamos a publicar la revisión')
  window.accionR2P = function(i) {
    const api = window.ggbApps[i];
    if (!api) return alert("Applet no listo");
    api.setVisible("A", true);
    api.setVisible("B", true);
    api.setVisible("C", true);
    api.setVisible("Area", true);
    api.setVisible("h", true);
    api.setVisible("g", true);

    let totalPuntos = 2
    let puntos = 0
    let pregunta = document.getElementsByClassName('pregunta-abierta')
    const mathFields= pregunta[i].getElementsByTagName('math-field')

    console.log(`Revisar la pregunta ${i}`)
    const L1 =latexToGeoGebra( mathFields[0].value )
    

    
    console.log(`Mandar a Geogebra ${L1}`)
    api.evalCommand(`h_1: ${L1}`);
    const B = extractCoordinates(latexToGeoGebra( mathFields[1].value))
    const C = extractCoordinates(latexToGeoGebra( mathFields[2].value))
    
    
    const Q=api.getValue('Q')
    if( Q){
      ++puntos
      mathFields[0].style.border = "solid 5px green";
    } else{
      mathFields[0].style.backgroundColor = "red";
    }

    if( Math.abs(B[0] - api.getXcoord('B'))<0.01 && Math.abs(B[1] - api.getYcoord('B'))<0.01 ){
      ++puntos
      mathFields[1].style.border = "solid 5px green";
    } else{
      mathFields[1].style.backgroundColor = "red";
    }

    if( Math.abs(C[0] - api.getXcoord('C'))<0.01 && Math.abs(C[1] - api.getYcoord('C'))<0.01 ){
      ++puntos
      mathFields[2].style.border = "solid 5px green";
    } else{
      mathFields[2].style.backgroundColor = "red";
    }
    
    if( Math.abs(mathFields[3].value - api.getValue('Area'))<0.01){
      ++puntos
      mathFields[3].style.border = "solid 5px green";
    } else{
      mathFields[3].style.backgroundColor = "red";
    }
    /*
    //console.log(`f(x) = ${getFunctionDefinitionFromXML(api,'f')}`)
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
    }*/

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
function getFunctionDefinitionFromXML(api,varName) {
  
  const valueString = api.getValueString(varName);

  if (!valueString) {
    return null; 
  }
  const regex = new RegExp(`${varName}\\(x\\)\\s*=\\s*(.*)`);
  const match = valueString.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}