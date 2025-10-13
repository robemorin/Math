import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import {desencriptar, encriptar, generarCodigo} from '../r2p_core.js'
export function name() {
  return 'Gráfica de la línea forma general';
}

export function tipo() {
  return 3;
}

export async function pregunta(i, totalPreguntas, esImprimible=false) {
  try{
    let A=[Math.round(Math.random()*10-5),Math.round(Math.random()*8-4)], B
    
    let m=[Math.ceil(Math.random()*5)*(Math.random()<0.5?1:-1),Math.ceil(Math.random()*5)]
    m = tlacu.simplify_frac(m)



    const Pregunta = `
      <div class="pregunta-abierta"  data-a="${A}" data-m="${m}" style="display: none;">
        <p>${i + 1}.- Obtenga la ecuación de la línea en la forma $y-y_0 = m(x-x_0)$<span id="resultado_${i}" name="question"></span></p>
        <div id="applet_container_${i}" class="ggb-container"></div>
        
        <table>
          
          <tr><td>Ecuación de la línea: </td><td><math-field>y=</math-field></td></tr>
          </table>
      </div>
    `;
    if(esImprimible){
	const respuesta=`$${tempEcLine(A,m)}$`
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
   const material_id = "zpp4kdej";
  window.ggbApps = [];

  for (let i = 0; i < n; i++) {
    const params = {
      appName: 'classic',
      width: 600,
      height: 600,
      material_id,
      id: `ggbApplet_${i}`,
      appletOnLoad(api) {
        let pregunta = document.getElementsByClassName('pregunta-abierta')
        const A = pregunta[i].dataset.a.split(',').map(Number)
        const m = pregunta[i].dataset.m.split(',').map(Number)
        
        console.log(`${i}.- A:${pregunta[i].dataset.a} m:${pregunta[i].dataset.m}`)
        window.ggbApps[i] = api;
      api.evalCommand(`f(x) = (${m[0]}/${m[1]})*(x-(${A[0]}))+(${A[1]})`);
      api.evalCommand(`A:(${A[0]},${A[1]})`);

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
    const mathFields= pregunta[i].getElementsByTagName('math-field')
    const ans = mathFields[0].value

    const A = pregunta[i].dataset.a.split(',').map(Number)
    let m = pregunta[i].dataset.m.split(',').map(Number)
    m = tlacu.simplify_frac(m)
    const correcta = linea_puntopendiente(m,A)

    if( ans != correcta ){
      mathFields[0].style.backgroundColor = "red";
      document.getElementById(`resultado_${i}`).innerHTML = `'${correcta}' != '${ans}'`
    } else{
      ++puntos
      mathFields[0].style.border = "solid 5px green";
    }
    return [puntos,totalPuntos]
  };
}


function linea_puntopendiente(m,A){
            let cadena = `y${A[1]==0? '' : `${A[1]<0 ? '+' : ''}${-A[1]}` }=`
            if(A[0]==0){
              if(Math.abs(m[0])==1 && m[1]==1)  cadena += `${ m[0]<0 ? '-' : '' }x`
              else                              cadena += `${tlacu.fraccion(m[0],m[1],true)}x`
            }else if(Math.abs(m[0])==1 && m[1]==1){
              if(m[0]==1) cadena += `x${A[0]<0 ? '+' : ''}${-A[0]}`
              else  cadena += `-\\left(x${A[0]<0 ? '+' : ''}${-A[0]}\\right)`
            }else{
              cadena += `${tlacu.fraccion(m[0],m[1],true)}\\left(x${A[0]<0 ? '+' : ''}${-A[0]}\\right)`
            }

            return cadena
        }