import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import {desencriptar, encriptar, generarCodigo} from '../../../mate2/src/r2p_core.js'
export function name() {
  return 'Puntos en el espacio';
}

export function tipo() {
  return 2;
}

export async function pregunta(i, code) {
  console.log(`code: ${code}`)
  try{
    return `
      <div class="pregunta-geogebra"  data-r="0" data-arg="0" style="display: none;">
        <p>${i + 1}.- Determine las coordenadas del punto $A$.  </p>
        <div id="applet_container_${i}" class="ggb-container"></div>
        <p>Determine la traslación y rotación, e.g. $v=(1,2)$ $\\theta = -90°$</p>
        <p>$A:$ <math-field>(a,b)</math-field></p>
      </div>
    `;
  }catch (error){
    console.error('Error al carga la pregunta:', error);
  }
}

export async function renderGeoGebra(container, n, code) {
  const material_id = "xtaxx5sj";
  window.ggbApps = [];

  for (let i = 0; i < n; i++) {
    const params = {
      appName: 'classic',
      width: 600,
      height: 400,
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

  // 🔁 Registrar función específica del tema
  window.accionGeoGebra = function(i) {
    const api = window.ggbApps[i];
    let pregunta = document.getElementsByClassName('pregunta-geogebra')[i]
    if (!api) return alert("Applet no listo");
	  
    const mathFields= pregunta.getElementsByTagName('math-field')

    const xa = api.getValue("xa")
    const ya = api.getValue("ya")
    const za = api.getValue("za")
    const A = mathFields[0].value
    
    console.log(`xa=${xa}; ya=${ya}; za=${za} A=${A}`)
    if( `(${xa},${ya},${za})` == A) return true
    return false
    
  };
}
