import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import {desencriptar, encriptar, generarCodigo} from '../r2p_core.js'
export function name() {
  return 'Línea recta a partir de dos puntos II';
}

export function tipo() {
  return 3;
}

export async function pregunta(i, code, esImprimible=false) {
  try{
    
    
    
        let A=[Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)], B
        do{
            B = [Math.ceil(Math.random()*10-5),Math.ceil(Math.random()*10-5)]
            //console.log(`A:${A}, B:${B}`)
        }while( (A[0] == B[0]) || (A[1] == B[1]) )
        
        
    //console.log(`${i}<- Re(a):${r*Math.cos(arg*Math.PI/12)} Im(a):${r*Math.sin(arg*Math.PI/12)}`)

    const Pregunta = `
      <div class="pregunta-abierta"  data-a="${A}" data-b="${B}" style="display: none;">
        <p>${i + 1}.-Determine la ecuación de la línea recta que pasa por los puntos 
        $A:(${A[0]}, ${A[1]})$ y $B:(${B[0]}, ${B[1]})$ en la forma mínima. <span id="resultado_${i}" name="question"></span></p>
        <!--div id="applet_container_${i}" class="ggb-container"></div-->
        <p><math-field>y=</math-field> <i>e.g.</i> $y=\\frac{5}{2}x-\\frac{5}{3}$</p>
      </div>
    `;
    if(esImprimible){
      let m=[ B[1]-A[1], B[0]-A[0] ]
        m=tlacu.simplify_frac(m)
    
        let b=[m[1]*A[1]-m[0]*A[0],m[1]]
        b=tlacu.simplify_frac(b)

	const respuesta= tempEcLine(m,b)
	return [Pregunta, respuesta]
  }
    render()
    return Pregunta
  
    
  }catch (error){
    console.error('Error al carga la pregunta:', error);
  }
}

export async function render() {
  console.log('vamos a publicar la revisión')
  window.accionR2P = function(i) {
    let totalPuntos = 1
    let puntos = 0
    let pregunta = document.getElementsByClassName('pregunta-abierta')
    //console.log(`r: ${pregunta[i].dataset.r} arg: ${pregunta[i].dataset.arg}`)
    //console.log(`id del mathlive: math-field-${i}-0`)
    const mathFields= pregunta[i].getElementsByTagName('math-field')
    const ans = mathFields[0].value
    
    const A = pregunta[i].dataset.a.split(',').map(Number)
    const B = pregunta[i].dataset.b.split(',').map(Number)
    let m=[ B[1]-A[1], B[0]-A[0] ]
    m=tlacu.simplify_frac(m)

    let b=[m[1]*A[1]-m[0]*A[0],m[1]]
    b=tlacu.simplify_frac(b)

	let respuesta = tempEcLine(m,b)

    if( ans != respuesta ){
      mathFields[0].style.backgroundColor = "red";
      //document.getElementById(`resultado_${i}`).innerHTML = `$${respuesta}$`
    } else{
      ++puntos
      mathFields[0].style.border = "solid 5px green";
    }
    return [puntos,totalPuntos]
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