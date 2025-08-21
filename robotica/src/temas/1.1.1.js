import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import {desencriptar, encriptar, generarCodigo} from '../r2p_core.js'
export function name() {
  return 'Multiplicación de matrices';
}

export function tipo() {
  return 3;
}

export async function pregunta(i, totalPreguntas, esImprimible=false) {
  try{
    const n = [Math.round(Math.random()+2), Math.round(Math.random()+2), Math.round(Math.random()+2)]
    const A = []
    const B = []
    let m1 = '', m2 = '', m3 = ''
    for (let j = 0; j < n[0]; j++){
      A.push([])
      for (let k = 0; k < n[1]; k++){
        A[j].push(Math.round(Math.random()*10-5))
        m1 += `${A[j][k]} &`
      }
      m1 = m1.slice(0, -1) + '\\\\'
    } 
    for (let j = 0; j < n[1]; j++) {
      B.push([])
      for (let k = 0; k < n[2]; k++) {
        B[j].push(Math.round(Math.random()*10-5))
        m2 += `${B[j][k]} &`
      }
      m2 = m2.slice(0, -1) + '\\\\'
    }

    for (let j = 0; j < n[0]; j++) {
      m3 += '<tr>'
      for (let k = 0; k < n[2]; k++) {
        m3 += `<td><math-field></math-field></td>`
      }
      m3 += '</tr>'
    }

    
    const Pregunta = `
      <div class="pregunta-abierta" data-n="${n}"  data-a="${A}" data-b="${B}" style="display: none;">
        <p>${i + 1}.- Realice la siguiente multiplicación.<span id="resultado_${i}" name="question"></span></p>
        <div id="applet_container_${i}" class="ggb-container"></div>
        
        $$\\begin{bmatrix} ${m1} \\end{bmatrix} \\cdot \\begin{bmatrix} ${m2} \\end{bmatrix}$$
        <table style="border-left: solid 2px black;border-right: solid 2px black;">${m3}</table>
      </div>
    `;
    if(esImprimible){
	const respuesta=` `
	return [Pregunta, respuesta]
  }
  
    if (totalPreguntas-1 == i) render(null,totalPreguntas)
    return Pregunta
  
    
  }catch (error){
    console.error('Error al carga la pregunta:', error);
  }
}

export async function render(container, n, code) {
/*  console.log('Ejecutar render')
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
  }*/
  console.log('vamos a publicar la revisión')
  window.accionR2P = function(i) {
    //const api = window.ggbApps[i];
    //if (!api) return alert("Applet no listo");

    let totalPuntos = 1
    let puntos = 1
    let pregunta = document.getElementsByClassName('pregunta-abierta')
    const mathFields= pregunta[i].getElementsByTagName('math-field')

    
    let n = pregunta[i].dataset.n.split(',').map(Number)
    const A = []
    let dummy = pregunta[i].dataset.a.split(',').map(Number)
    console.log(`A: `)
    for (let k0 = 0; k0 < n[0]; k0++){ A.push(dummy.slice(k0 * n[1], (k0 + 1) * n[1])); console.log(`${A[k0]}`) }

    const B = []
    console.log(`B: `)
    dummy = pregunta[i].dataset.b.split(',').map(Number)
    for (let k0 = 0; k0 < n[1]; k0++) {B.push(dummy.slice(k0 * n[2], (k0 + 1) * n[2])); console.log(`${B[k0]}`) }

   // console.log(`${i+1}.- A: ${A.length}x${A[0].length}  B: ${B.length}x${B[0].length} `)

    let C=[]
    console.log(`C: `)
    for (let k0 = 0; k0 < n[0]; k0++) {
      C.push([])
      for (let k1 = 0; k1 < n[2]; k1++) {
        C[k0].push(0)
        for (let k2 = 0; k2 < n[1]; k2++) {
          C[k0][k1] += A[k0][k2] * B[k2][k1]
        }

        /*mathFields[k0 * n[2] + k1].style.backgroundColor = "blue";
        mathFields[k0 * n[2] + k1].value=`${k0},${k1}`;*/
                  let respuesta = mathFields[k0 * n[2] + k1].value
                  if(respuesta - C[k0][k1] != 0 || respuesta.length == 0){
                    mathFields[k0 * n[2] + k1].style.backgroundColor = "red";
                    --puntos
                  }else{
                    mathFields[k0 * n[2] + k1].style.backgroundColor = "green";
                  }

      }
      //console.log(`${C[k0]}`)

    }

    return [puntos==1?1:0,totalPuntos]
  };
}
