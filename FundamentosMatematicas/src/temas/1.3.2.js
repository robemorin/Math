import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import {desencriptar, encriptar, generarCodigo} from '../r2p_core.js'
export function name() {
  return 'Números complejos en el plano II';
}

export function tipo() {
  return 3;
}

export async function pregunta(i, code) {
  try{
    const r = Math.ceil(Math.random()*5)
    const arg = Math.round(Math.random()*24)
    const f = tlacu.fraccion(arg,12)
    //console.log(`${i}<- Re(a):${r*Math.cos(arg*Math.PI/12)} Im(a):${r*Math.sin(arg*Math.PI/12)}`)
    return `
      <div class="pregunta-abierta"  data-r="${r}" data-arg="${arg}" style="display: none;">
        <p>${i + 1}.- Obtenga la forma cartesiana de $a = ${r}e^{${f}\\pi j}$. <span id="resultado_${i}" name="question"></span></p>
        <!--div id="applet_container_${i}" class="ggb-container"></div-->
        <p>$\\Re(a)$=<math-field></math-field> &Tab;&Tab;
        $\\Im(a)$=<math-field></math-field></p>
      </div>
    `;
    
  }catch (error){
    console.error('Error al carga la pregunta:', error);
  }
}

export async function render(container, n, code) {
  console.log('vamos a publicar la revisión')
  window.accionR2P = function(i) {
    let totalPuntos = 2
    let puntos = 0
    let pregunta = document.getElementsByClassName('pregunta-abierta')
    //console.log(`r: ${pregunta[i].dataset.r} arg: ${pregunta[i].dataset.arg}`)
    //console.log(`id del mathlive: math-field-${i}-0`)
    const mathFields= pregunta[i].getElementsByTagName('math-field')
    const ax = Number(mathFields[0].value)
    const ay = Number(mathFields[1].value)
    
    const arg = pregunta[i].dataset.arg
    const r = pregunta[i].dataset.r
    const bx = r*Math.cos(arg*Math.PI/12)
    const by = r*Math.sin(arg*Math.PI/12)


    if(Math.abs(ax-bx)>0.01 || ax==''){
      mathFields[0].style.backgroundColor = "red";
    } else{
      ++puntos
      mathFields[0].style.border = "solid 5px green";
    }
    mathFields[0].disabled = true;
    if(Math.abs(ay-by)>0.01 || ay==''){
      console.log(`${ay}-${by} = ${ay-by}`)
      mathFields[1].style.backgroundColor = "red";
    } else{
      ++puntos
      mathFields[1].style.border = "solid 5px green";
    }
    mathFields[1].disabled = true;
    console.log(`desde la función ${puntos},${totalPuntos}`)
    return [puntos,totalPuntos]
  };
}
