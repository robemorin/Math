import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import {desencriptar, encriptar, generarCodigo} from '../r2p_core.js'
export function name() {
  return 'Puntos en el espacio';
}

export function tipo() {
  return 3;
}

export async function pregunta(i, totalPreguntas, esImprimible=false) {
  try{
    
    const Pregunta = `
      <div class="pregunta-geogebra"  data-r="0" data-arg="0" style="display: none;">
        <p>${i + 1}.- Determine las coordenadas del punto $A$.  </p>
        <div id="applet_container_${i}" class="ggb-container"></div>
        <p>Determine la traslación y rotación, e.g. $v=(1,2)$ $\\theta = -90°$</p>
        <p>$A:$ <math-field>(a,b)</math-field></p>
      </div>`;
    if(esImprimible){
	const respuesta=``
  
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
   const material_id = "xtaxx5sj";
  window.ggbApps = [];

  for (let i = 0; i < n; i++) {
    const params = {
      appName: 'classic',
      width: 600,
      height: 600,
      material_id,
      id: `ggbApplet_${i}`,
      appletOnLoad(api) {
        
        window.ggbApps[i] = api;
      api.setValue("xa", Math.round(Math.random()*10-5))
      api.setValue("ya", Math.round(Math.random()*10-5))
      api.setValue("za", Math.round(Math.random()*10-5))

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

    
    const xa = api.getValue("xa")
    const ya = api.getValue("ya")
    const za = api.getValue("za")
    const A = mathFields[0].value

    console.log(`${i+1}.- xa=${xa}; ya=${ya}; za=${za} A=${A}`)


    if( `(${xa},${ya},${za})` != A ){
      mathFields[0].style.backgroundColor = "red";mathFields[0].disabled = true;
    } else{
      ++puntos
      mathFields[0].style.border = "solid 5px green";mathFields[0].disabled = true;
    }
    

    return [puntos,totalPuntos]
  };
}
