import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import {desencriptar, encriptar, generarCodigo} from '../r2p_core.js'
export function name() {
  return 'Representación de posicion en 2D';
}

export function tipo() {
  return 2;
}

export async function pregunta(i, code) {
  console.log(`code: ${code}`)
  try{
    return `
      <div class="pregunta-geogebra"  data-r="0" data-arg="0" style="display: none;">
        <p>${i + 1}.- Observe la siguiente figura, para determinar las coordenadas $p^0$ y $p^1$.<span id="resultado_${i}" name="question"></span></p>
        <div id="applet_container_${i}" class="ggb-container"></div>
        <p>Da las respuestas a dos decimales.</p>
        <p>$p^0 =$ <math-field>(x,y)</math-field></p>
        <p>$p^1 = $ <math-field>(x,y)</math-field></p> 
      </div>
    `;
  }catch (error){
    console.error('Error al carga la pregunta:', error);
  }
}

export async function renderGeoGebra(container, n, code) {
  const material_id = "ymwvftdc";
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
      api.setValue("xp", Math.round(Math.random()*10-5))
      api.setValue("yp", Math.round(Math.random()*10-5))
      }
    };
    new GGBApplet(params, true).inject(`applet_container_${i}`);
  }

  // 🔁 Registrar función específica del tema
  window.accionGeoGebra = function(i) {
    function extraerCoordenadas(cadena) {
  // Expresión regular que busca números (incluyendo decimales y negativos)
  const regex = /-?\d+\.?\d*/g;
  const matches = cadena.match(regex);
  
  if (matches && matches.length >= 2) {
    return [parseFloat(matches[0]), parseFloat(matches[1])];
  }
  return null;
}
    const api = window.ggbApps[i];
    let pregunta = document.getElementsByClassName('pregunta-geogebra')[i]
    if (!api) return alert("Applet no listo");
	  
    const mathFields= pregunta.getElementsByTagName('math-field')

    const a = api.getValue("a")
    const b = api.getValue("b")
    const c = api.getValue("c")
    const xp = api.getValue("xp")
    const yp = api.getValue("yp")
    const co = Math.cos(c)
    const si = Math.sin(c)
    const x1 =  co*(xp-a) + si*(yp-b)
    const y1 = -si*(xp-a) + co*(yp-b)
    const p0 = extraerCoordenadas(mathFields[0].value)
    const p1 = extraerCoordenadas(mathFields[1].value) 
    const tol = 0.01

    console.log(`(ID:${i+1}) p0 = (${p0})=(${xp},${yp}) p1=(${p1})=(${x1},${y1})`)

    if(p0==null || p1==null) return false
    
    if( Math.abs(p0[0]-xp) < tol && Math.abs(p0[1]-yp) < tol && Math.abs(p1[0]-x1) < tol && Math.abs(p1[1]-y1) < tol ) return true
    return false
    
  };
}
