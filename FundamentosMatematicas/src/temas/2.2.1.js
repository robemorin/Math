import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import * as math from "https://cdn.jsdelivr.net/npm/mathjs@13.0.3/+esm";
import {desencriptar, encriptar, generarCodigo} from '../r2p_core.js'
export function name() {
  return 'Gráfica de la parábola I';
}

export function tipo() {
  return 3;
}

export async function pregunta(i, totalPreguntas, esImprimible=false) {
  try{
    const h= Math.ceil(Math.random()*8-4), k= Math.ceil(Math.random()*8-4)
    let a=[Math.ceil(Math.random()*5)*(Math.random()<0.5?1:-1),(Math.ceil(Math.random()*5))**2]
    let exp = `(${tlacu.poli.print([1,-h])})^2+(${k})`
    console.log(`${i+1}.- exp:${exp}`)
    exp = math.simplify(exp)
    exp = tlacu.fraccion(a[0],a[1],true)+exp.toTex();
    //exp = exp.replace(/\\cdot\s*(-\d+)/g, '$1');
    console.log(`${i+1}  --> ${exp}`)



    const Pregunta = `
      <div class="pregunta-abierta"  data-h="${h}" data-k="${k}" data-a="${a}" style="display: none;">
        <p>${i + 1}.- Grafique la función $f(x)=${exp}$. <span id="resultado_${i}" name="question"></span></p>
        <div id="applet_container_${i}" class="ggb-container"></div>

      </div>
    `;
    if(esImprimible){
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
   const material_id = "g5xqr4yr";
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
    //const mathFields= pregunta[i].getElementsByTagName('math-field')
    //const A = pregunta[i].dataset.a.split(',').map(Number)
    const A = [api.getXcoord("A"), api.getYcoord("A")]
    const V = [api.getXcoord("V"), api.getYcoord("V")]
    const a = pregunta[i].dataset.a.split(',').map(Number)
    const h = parseInt(pregunta[i].dataset.h)
    const k = parseInt(pregunta[i].dataset.k)

    console.log(`A: ${A} V: ${V} h: ${h} k: ${k} a: ${a}`)
    
    if( V[0]!=h || V[0]!=h){
      document.getElementById(`resultado_${i}`).innerHTML = `❌`
      return [puntos,totalPuntos]
    } else{
      console.log(`B: ${(a[0]/a[1]*(A[0]-h)**2+k)}-${A[1]}`)
      if( Math.abs((a[0]/a[1]*(A[0]-h)**2+k)-A[1])>0.01 ){
        document.getElementById(`resultado_${i}`).innerHTML = `❌`
        return [puntos,totalPuntos]
      } 
    }
    ++puntos
    document.getElementById(`resultado_${i}`).innerHTML = `✅`
    return [puntos,totalPuntos]
  };
}

