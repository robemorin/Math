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
    let A=[Math.ceil(Math.random()*8-4),Math.ceil(Math.random()*8-4)], B
    do{
      B = [Math.ceil(Math.random()*8-4),Math.ceil(Math.random()*8-4)]
    }while( (A[0] == B[0]) || (A[1] == B[1]) )
    let m=[(B[1]-A[1]),(B[0]-A[0])]
    m = tlacu.simplify_frac(m)



    const Pregunta = `
      <div class="pregunta-abierta"  data-a="${A}" data-b="${B}" style="display: none;">
        <p>${i + 1}.- Obtenga la ecuación de la siguiente gráfica en la forma $Ax+By+C=0$. <span id="resultado_${i}" name="question"></span></p>
        <div id="applet_container_${i}" class="ggb-container"></div>
        
        <table>
          
          <tr><td>Ecuación de la línea: </td><td><math-field>=0</math-field></td></tr>
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
   const material_id = "efdp7g27";
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
        const B = pregunta[i].dataset.b.split(',').map(Number)
        const m=[(B[1]-A[1]),(B[0]-A[0])]
        console.log(`${i}.- A:${pregunta[i].dataset.a} B:${pregunta[i].dataset.b} m:${m}`)
        window.ggbApps[i] = api;
      api.evalCommand(`f(x) = (${m[0]}/${m[1]})*(x-(${A[0]}))+(${A[1]})`);

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
    const A = pregunta[i].dataset.a.split(',').map(Number)
    const B = pregunta[i].dataset.b.split(',').map(Number)
    let m=[(B[1]-A[1]),(B[0]-A[0])]
    m = tlacu.simplify_frac(m)
    const respuestaC = tempEcLine(A,m)


    const respuesta = mathFields[0].value
    console.log(`'${respuesta}' ? '${respuestaC}'`)
    
    if( respuestaC != respuesta){
      mathFields[0].style.backgroundColor = "red";
      return [puntos,totalPuntos]
    } else{
      ++puntos
      mathFields[0].style.border = "solid 5px green";
    }

    return [puntos,totalPuntos]
  };
}



						function tempEcLine(A,D){
							if(D[0]<0){
								D=[-D[0],D[1]]
							}else{
                D=[D[0],-D[1]]
              }
							let cadena = `${D[0]==0?'':(D[0]==1?'':D[0])+'x'}`
							cadena += `${D[1]==0?'':(Math.abs(D[1])==1?
														(D[1]<0?'-y':'+y'):
														(D[1]<0?D[1]+'y':`+${D[1]}y`))
							}`
							const c = -(D[0]*A[0]+D[1]*A[1])
							cadena += `${(c==0?'':(c<0?'-':'+')+Math.abs(c))}`
							cadena += `=0`
							
							return cadena
						}
