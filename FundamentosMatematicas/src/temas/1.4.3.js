import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import {desencriptar, encriptar, generarCodigo} from '../r2p_core.js'
export function name() {
  return 'Graficar línea recta a partir de dos puntos';
}

export function tipo() {
  return 2;
}

export async function pregunta(i, code) {
  try{
    let A=[0,Math.ceil(Math.random()*10-5)], B
    do{
        B = [Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)]
    }while( (A[0] == B[0]) || (A[1] == B[1]) )
      let m=[ B[1]-A[1], B[0]-A[0] ]
              m=tlacu.simplify_frac(m)
          
              let b=[m[1]*A[1]-m[0]*A[0],m[1]]
              b=tlacu.simplify_frac(b)
      
        const linea= tempEcLine(m,b)
    return `
      <div class="pregunta-geogebra"  data-a="${A}" data-b="${B}" style="display: none;">
        <p>${i + 1}.- Mueva los puntos $A$ y $B$ para obtener la línea $${linea}$. <span id="resultado_${i}" name="question"></span></p>
        <div id="applet_container_${i}" class="ggb-container"></div>
      </div>
    `;
  }catch (error){
    console.error('Error al carga la pregunta:', error);
  }
}

export async function renderGeoGebra(container, n, code) {
  const material_id = "svwd7yrm";
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

    const ax = api.getXcoord("A")
    const ay = api.getYcoord("A")
    const bx = api.getXcoord("B")
    const by = api.getYcoord("B")
    api.setFixed('A', true);
    api.setFixed('B', true);

    const A = pregunta.dataset.a.split(',').map(Number)
    const B = pregunta.dataset.b.split(',').map(Number)
    let m=(B[1]-A[1])/( B[0]-A[0] )
    let b=B[1]-m*B[0]

    if(ax != bx && Math.abs(ay - (m*ax+b)) < 0.01 && Math.abs(by - (m*bx+b)) < 0.01 )   return true
    return false
    
  };
}
function tempEcLine(m,b){
            let cadena = `y=`
            if(m[0]!=0){
                cadena += (m[1]==1 && Math.abs(m[0])==1?(m[0]<0?"-":"")+'x':(m[0]<0?"-":"")+tlacu.fraccion(Math.abs(m[0]),m[1])+'x') 
            }
            cadena += (b[0]==0?'':(b[0]<0?"-":"+")+tlacu.fraccion(Math.abs(b[0]),b[1]))
            return cadena
        }