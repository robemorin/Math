import * as tlacu from 'http://127.0.0.1:5500/Math/tlacuache/src/tlacuache-modulo.mjs';
import {desencriptar, encriptar, generarCodigo} from '../r2p_core.js'
export function name() {
  return 'Números complejos en el plano';
}

export function tipo() {
  return 2;
}

export async function pregunta(i, code) {
  try{
    const r = Math.ceil(Math.random()*5)
    const arg = Math.round(Math.random()*24)
    const f = tlacu.fraccion(arg,12)
    return `
      <div class="pregunta-geogebra"  data-r="${r}" data-arg="${arg}" style="display: none;">
        <p>${i + 1}.- Ubique el punto $a = ${r}e^{${f}\\pi j}$. <span id="resultado_${i}" name="question"></span></p>
        <div id="applet_container_${i}" class="ggb-container"></div>
      </div>
    `;
  }catch (error){
    console.error('Error al carga la pregunta:', error);
  }
}

export async function renderGeoGebra(container, n, code) {
  const material_id = "rpf6bqta";
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
      }
    };
    new GGBApplet(params, true).inject(`applet_container_${i}`);
  }

  // 🔁 Registrar función específica del tema
  window.accionGeoGebra = function(i) {
    const api = window.ggbApps[i];
    let pregunta = document.getElementsByClassName('pregunta-geogebra')[i]
    if (!api) return alert("Applet no listo");

    const ax = api.getXcoord("a")
    const ay = api.getYcoord("a")
    const arg = pregunta.dataset.arg
    const r = pregunta.dataset.r
    const bx = r*Math.cos(arg*Math.PI/12)
    const by = r*Math.sin(arg*Math.PI/12)

    if(Math.abs(ax-bx)<0.01 && Math.abs(ay-by)<0.01)   return true
    return false
    
  };
}
