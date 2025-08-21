//1.1.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import {encriptar, generarCodigo} from '../r2p_core.js'

export function name(){
  return 'Multiplicación de polinomios II';
}
export function tipo(){
  return 3
  /*
  0 - Opción múltiple
  1 - Abierto
  2 - Geogebra
  */
}
export async function pregunta(numeroPregunta,code, esImprimible=false) { 
  try {	
    const code = generarCodigo()
    let a=[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
    let b=[(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1),Math.round(Math.random()*19-9),(Math.random()<0.5?1:-1)*Math.round(Math.random()*9+1)]
    
    
    //console.log(respuesta)
    const Pregunta = `
        <div class="pregunta-abierta" data-a="${a}" data-b="${b}" style="display:none" data-respuesta="---">
          <p>${numeroPregunta+1}.- Resultado de $(${tlacu.poli.print(a)})(${tlacu.poli.print(b)})$ = </p>
          <math-field 
            id="math-field-${numeroPregunta}" 
            name="campo-${numeroPregunta}"
        data-tipo="expresion"
          ></math-field><span style='color:red'></span>
        </div>
      `
    if(esImprimible){
      const respuesta=`$${tlacu.poli.print(tlacu.poli.conv(a,b))}$`
      return [Pregunta, respuesta]
    }
    render()
    return Pregunta				

  } catch (error) {

    console.error(tlacu.conv([1,1],[1,1]));
    console.error('Error al carga la pregunta:', error);
  }
}

export async function render(container, n, code) {
  console.log('vamos a publicar la revisión')
  window.accionR2P = function(i) {
    let totalPuntos = 1
    let puntos = 0
    let pregunta = document.getElementsByClassName('pregunta-abierta')
    //console.log(`r: ${pregunta[i].dataset.r} arg: ${pregunta[i].dataset.arg}`)
    //console.log(`id del mathlive: math-field-${i}-0`)
    const mathFields= pregunta[i].getElementsByTagName('math-field')
    const dialogo= pregunta[i].getElementsByTagName('span')[0]
    const resp = mathFields[0].value

    const a = pregunta[i].dataset.a.split(',').map(Number)
    const b = pregunta[i].dataset.b.split(',').map(Number)
    const c = tlacu.conv(a,b)
    const caracteresAEliminar = /[ ,{,}]/g;
    let respuesta = tlacu.poli.print(c).replace(caracteresAEliminar, "")
    
    console.log(`a=${pregunta[i].dataset.a}; b=${pregunta[i].dataset.b}`) 
    
    if(respuesta != resp || resp==''){
      mathFields[0].style.backgroundColor = "red";
      dialogo.innerHTML = `'${respuesta}' != '${resp}'`
    } else{
      ++puntos
      mathFields[0].style.border = "solid 5px green";
    }

    return [puntos,totalPuntos]
  };
}
