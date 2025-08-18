import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import {desencriptar, encriptar, generarCodigo} from '../r2p_core.js'
export function name() {
  return 'Desplazamiento y rotación de marcos referenciales en 2D';
}

export function tipo() {
  return 2;
}

export async function pregunta(i, code) {
  console.log(`code: ${code}`)
  try{
    return `
      <div class="pregunta-geogebra"  data-r="0" data-arg="0" style="display: none;">
        <p>${i + 1}.- Observe la siguiente figura, para determinar la traslación, $v$, y rotación, $\\theta$, del marco $\\Sigma_a$, con respecto con el marco inercial. <span id="resultado_${i}" name="question"></span><br>
  [Nota: la rotación es de multiplicidad $45°$ y $-180°\\lt \\theta \\leq 180°$]</p>
        <div id="applet_container_${i}" class="ggb-container"></div>
        <p>Determine la traslación y rotación, e.g. $v=(1,2)$ $\\theta = -90°$</p>
        <p>$v = $ <math-field>(a,b)</math-field></p>
        <p>$\\theta = $ <math-field>\\degree</math-field></p> 
      </div>
    `;
  }catch (error){
    console.error('Error al carga la pregunta:', error);
  }
}

export async function renderGeoGebra(container, n, code) {
  const material_id = "xwqqu9em";
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
      api.setValue("a", Math.round(Math.random()*10-5))
      api.setValue("b", Math.round(Math.random()*10-5))
      api.setValue("c", `${45*Math.round(Math.random()*7-4)*Math.PI/180}`)
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

    const a = api.getValue("a")
    const b = api.getValue("b")
    const c = api.getValue("c")
    const v = mathFields[0].value
    const angle = mathFields[1].value 
    
    console.log(`id=${i+1} a: ${a}, b: ${b}, c:${Math.round(c*180/Math.PI)} v: ${v}, angle: ${angle}`)
    if((v == `\\left(${a},${b}\\right)` || v == `(${a},${b})`) && angle == `${Math.round(c*180/Math.PI)}\\degree`) return true
    return false
    
  };
}
