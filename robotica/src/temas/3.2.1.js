import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import {desencriptar, encriptar, generarCodigo} from '../r2p_core.js'
export function name() {
  return 'Denavit-Hartenberg I';
}

export function tipo() {
  return 3;
}

export async function pregunta(i, totalPreguntas, esImprimible=false) {
  try{
    
    const Pregunta = `
      <div class="pregunta-abierta"  data-r="0" data-arg="0" style="display: none;">
        <p>${i + 1}.- Obtenga los parámetros de Denavit-Hartenger de $\\Sigma_0$ a $\\Sigma_1$. <span id="resultado_${i}" name="question"></span></p>
        <div id="applet_container_${i}" class="ggb-container"></div>
        
        <table>
          <tr><td>$$\\theta$$</td><td>$$d$$</td><td>$$a$$</td><td>$$\\alpha$$</td></tr>
          <tr><td><math-field>°</math-field></td><td><math-field></math-field></td><td><math-field></math-field></td><td><math-field>°</math-field></td></tr>
          </table>
      </div>
    `;
    if(esImprimible){
	const respuesta=`$\\Re(a)= ${(r*Math.cos(arg*Math.PI/12)).toPrecision(2)}$  $\\Im(a)= ${(r*Math.sin(arg*Math.PI/12)).toPrecision(3)}$`
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
   const material_id = "kxgckmnq";
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
      api.setValue("a", Math.round(Math.random()*7-3.5))
      api.setValue("d", Math.round(Math.random()*3+1))
      api.setValue("theta", `${90*Math.round(Math.random()*3-1.5)*Math.PI/180}`)
      api.setValue("alpha", `${90*Math.round(Math.random()*4-1)*Math.PI/180}`)

      }
    };
    new GGBApplet(params, true).inject(`applet_container_${i}`);
  }
  console.log('vamos a publicar la revisión')
  window.accionR2P = function(i) {
    const api = window.ggbApps[i];
    if (!api) return alert("Applet no listo");

    let totalPuntos = 4
    let puntos = 0
    let pregunta = document.getElementsByClassName('pregunta-abierta')
    const mathFields= pregunta[i].getElementsByTagName('math-field')

    
    const rtheta = mathFields[0].value
    const rd = Number(mathFields[1].value)
    const ra = Number(mathFields[2].value)
    const ralpha = mathFields[3].value

    const d = api.getValue("d")
    const theta = Math.round(api.getValue("theta")*180/Math.PI)+"\\degree"
    const alpha = Math.round(api.getValue("alpha")*180/Math.PI)+"\\degree"
    const a = api.getValue("a")
    //console.log(`rd: ${rd}:${d}, rtheta: ${rtheta}:${theta}, ra:${ra}:${a}, ralpha:${ralpha}:${alpha}`)

    


    if( theta != rtheta){
      mathFields[0].style.backgroundColor = "red";mathFields[0].disabled = true;
      mathFields[1].style.backgroundColor = "red";mathFields[1].disabled = true;
      mathFields[2].style.backgroundColor = "red";mathFields[2].disabled = true;
      mathFields[3].style.backgroundColor = "red";mathFields[3].disabled = true;
      return [puntos,totalPuntos]
    } else{
      ++puntos
      mathFields[0].style.border = "solid 5px green";
    }
    mathFields[0].disabled = true;

    if( rd == NaN || rd != d ){
      mathFields[1].style.backgroundColor = "red";mathFields[1].disabled = true;
      mathFields[2].style.backgroundColor = "red";mathFields[2].disabled = true;
      mathFields[3].style.backgroundColor = "red";mathFields[3].disabled = true;
      return [puntos,totalPuntos]
    } else{
      ++puntos
      mathFields[1].style.border = "solid 5px green";
    }
    mathFields[1].disabled = true;

    if( ra == NaN || ra != a ){
      mathFields[2].style.backgroundColor = "red";mathFields[2].disabled = true;
      mathFields[3].style.backgroundColor = "red";mathFields[3].disabled = true;
      return [puntos,totalPuntos]
    } else{
      ++puntos
      mathFields[2].style.border = "solid 5px green";
    }
    mathFields[2].disabled = true;

    if( alpha != ralpha){
      mathFields[3].style.backgroundColor = "red";
    } else{
      ++puntos
      mathFields[3].style.border = "solid 5px green";
    }
    mathFields[3].disabled = true;

    return [puntos,totalPuntos]
  };
}
