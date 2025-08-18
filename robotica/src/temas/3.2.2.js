import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import {desencriptar, encriptar, generarCodigo} from '../r2p_core.js'
export function name() {
  return 'Denavit-Hartenberg II';
}

export function tipo() {
  return 3;
}

export async function pregunta(i, totalPreguntas, esImprimible=false) {
  try{
    
    const Pregunta = `
      <div class="pregunta-abierta"  data-r="0" data-arg="0" style="display: none;">
        <p>${i + 1}.- Obtenga los parámetros de Denavit-Hartenger de la siguiente cadena. <span id="resultado_${i}" name="question"></span></p>
        
        
        <table>
          <tr><td>$$\\theta$$</td><td>$$d$$</td><td>$$a$$</td><td>$$\\alpha$$</td></tr>
          <tr><td><math-field>°</math-field></td><td><math-field></math-field></td><td><math-field></math-field></td><td><math-field>°</math-field></td></tr>
          <tr><td><math-field>°</math-field></td><td><math-field></math-field></td><td><math-field></math-field></td><td><math-field>°</math-field></td></tr>
          </table>
          <div id="applet_container_${i}" class="ggb-container"></div>
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
   const material_id = "yczya3k8";
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
      api.setValue("a1", Math.round(Math.random()*7-3.5))
      api.setValue("d1", Math.round(Math.random()*3+1))
      api.setValue("theta1", `${90*Math.round(Math.random()*3-1.5)*Math.PI/180}`)
      api.setValue("alpha1", `${90*Math.round(Math.random()*4-1)*Math.PI/180}`)
      api.setValue("a2", Math.round(Math.random()*7-3.5))
      api.setValue("d2", Math.round(Math.random()*3-1))
      api.setValue("theta2", `${90*Math.round(Math.random()*3-1.5)*Math.PI/180}`)
      api.setValue("alpha2", `${90*Math.round(Math.random()*4-1)*Math.PI/180}`)

      }
    };
    new GGBApplet(params, true).inject(`applet_container_${i}`);
  }
  console.log('vamos a publicar la revisión')
  window.accionR2P = function(i) {
    const api = window.ggbApps[i];
    if (!api) return alert("Applet no listo");

    let totalPuntos = 8
    let puntos = 0
    let pregunta = document.getElementsByClassName('pregunta-abierta')
    const mathFields= pregunta[i].getElementsByTagName('math-field')

    
    const rtheta1 = mathFields[0].value
    const rd1 = Number(mathFields[1].value)
    const ra1 = Number(mathFields[2].value)
    const ralpha1 = mathFields[3].value

    const d1 = api.getValue("d1")
    const theta1 = Math.round(api.getValue("theta1")*180/Math.PI)+"\\degree"
    const alpha1 = Math.round(api.getValue("alpha1")*180/Math.PI)+"\\degree"
    const a1 = api.getValue("a1")
    
    const rtheta2 = mathFields[4].value
    const rd2 = Number(mathFields[5].value)
    const ra2 = Number(mathFields[6].value)
    const ralpha2 = mathFields[7].value

    const d2 = api.getValue("d2")
    const theta2 = Math.round(api.getValue("theta2")*180/Math.PI)+"\\degree"
    const alpha2 = Math.round(api.getValue("alpha2")*180/Math.PI)+"\\degree"
    const a2 = api.getValue("a2")

    


    if( theta1 != rtheta1){
      mathFields[0].style.backgroundColor = "red";mathFields[0].disabled = true;
      mathFields[1].style.backgroundColor = "red";mathFields[1].disabled = true;
      mathFields[2].style.backgroundColor = "red";mathFields[2].disabled = true;
      mathFields[3].style.backgroundColor = "red";mathFields[3].disabled = true;
    } else{
      ++puntos
      mathFields[0].style.border = "solid 5px green";mathFields[0].disabled = true;

      if( rd1 == NaN || rd1 != d1 ){
        mathFields[1].style.backgroundColor = "red";mathFields[1].disabled = true;
        mathFields[2].style.backgroundColor = "red";mathFields[2].disabled = true;
        mathFields[3].style.backgroundColor = "red";mathFields[3].disabled = true;
      } else{
        ++puntos
        mathFields[1].style.border = "solid 5px green";mathFields[1].disabled = true;

        if( ra1 == NaN || ra1 != a1 ){
          mathFields[2].style.backgroundColor = "red";mathFields[2].disabled = true;
          mathFields[3].style.backgroundColor = "red";mathFields[3].disabled = true;
        } else{
          ++puntos
          mathFields[2].style.border = "solid 5px green";mathFields[2].disabled = true;

          if( alpha1 != ralpha1){
            mathFields[3].style.backgroundColor = "red";
          } else{
            ++puntos
            mathFields[3].style.border = "solid 5px green";mathFields[3].disabled = true;
          }
        }
      }
    }

    if( theta2 != rtheta2){
      mathFields[4].style.backgroundColor = "red";mathFields[4].disabled = true;
      mathFields[5].style.backgroundColor = "red";mathFields[5].disabled = true;
      mathFields[6].style.backgroundColor = "red";mathFields[6].disabled = true;
      mathFields[7].style.backgroundColor = "red";mathFields[7].disabled = true;
    } else{
      ++puntos
      mathFields[4].style.border = "solid 5px green";mathFields[4].disabled = true;

      if( rd2 == NaN || rd2 != d2 ){
        mathFields[5].style.backgroundColor = "red";mathFields[5].disabled = true;
        mathFields[6].style.backgroundColor = "red";mathFields[6].disabled = true;
        mathFields[7].style.backgroundColor = "red";mathFields[7].disabled = true;
      } else{
        ++puntos
        mathFields[5].style.border = "solid 5px green";mathFields[5].disabled = true;

        if( ra2 == NaN || ra2 != a2 ){
          mathFields[6].style.backgroundColor = "red";mathFields[6].disabled = true;
          mathFields[7].style.backgroundColor = "red";mathFields[7].disabled = true;
        } else{
          ++puntos
          mathFields[6].style.border = "solid 5px green";mathFields[6].disabled = true;

          if( alpha2 != ralpha2){
            mathFields[7].style.backgroundColor = "red";
          } else{
            ++puntos
            mathFields[7].style.border = "solid 5px green";mathFields[7].disabled = true;
          }
        }
      }
    }
    

    return [puntos,totalPuntos]
  };
}
