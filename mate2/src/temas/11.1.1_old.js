import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import {desencriptar, encriptar, generarCodigo} from '../r2p_core.js'
export function name() {
  return 'Línea tangente';
}

export function tipo() {
  return 3;
}

export async function pregunta(i, code, esImprimible=false) {
  try{
    const f=[]
    const size=Math.ceil(Math.random()*2)+3
    for(let j=0;j<size;++j) f.push(Math.round(Math.random()*10-5))
    const fp = tlacu.poli.derivate(f)

      const A=[Math.ceil(Math.random()*10-5)]
      A.push(tlacu.poli.eval(f,A[0]))
      let m=[tlacu.poli.eval(fp,A[0]),1]
      let b=[A[1]*m[1]-m[0]*A[0],m[1]]
      //m[1]=Math.abs(m[0])//// Código temporal ----------------------------------------------------------------
        
      m=tlacu.simplify_frac(m)
      b=tlacu.simplify_frac(b)
    //console.log(`${i}<- Re(a):${r*Math.cos(arg*Math.PI/12)} Im(a):${r*Math.sin(arg*Math.PI/12)}`)

    const Pregunta = `
      <div class="pregunta-abierta"  data-a="${A}" data-f="${f}" style="display: none;">
        <p>${i + 1}.- Obtenga la línea tangente a $f(x)=${tlacu.poli.print(f)}$ en $a=${A[0]}$  que pasa por $A:(${A})$.
        <br> a)$f'(x)=${tlacu.poli.print(fp)}$ b)m=$${tlacu.fraccion(m[0],m[1],true)}$ c)$(${A})$, d)$${tempEcLine(m,b)}$
        <span id="resultado_${i}" name="question"></span></p>
        <!--div id="applet_container_${i}" class="ggb-container"></div-->
        <p>Obtenga la derivada de $f(x)$<math-field>f'(x)=</math-field> </p>
        <p>Obtenga la pendiente de la tangente <math-field>m=</math-field> </p>
        <p>Obtenga el punto $(${A[0]}, f(${A[0]}))$<math-field>(,)</math-field> </p>
        <p>Escriba la ecuación de la línea tangente <math-field>$${tempEcLine(m,b)}$</math-field> </p>
      </div>
    `;
    if(esImprimible){
      
        
	const respuesta= `a)$f'(x)=${tlacu.poli.print(fp)}$ b)m=$${tlacu.fraccion(m[0],m[1],true)}$ c)$(${A})$, d)$${tempEcLine(m,b)}$`
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
    mathFields[0].value
    
    const A = pregunta[i].dataset.a.split(',').map(Number)
    const f = pregunta[i].dataset.f.split(',').map(Number)
    const fp = tlacu.poli.derivate(f)
    let m=[tlacu.poli.eval(fp,A[0]),1]
    let b=[A[1]*m[1]-m[0]*A[0],m[1]]
      
    m=tlacu.simplify_frac(m)
    b=tlacu.simplify_frac(b)


    console.log(`${i}.- `)
    console.log(`'f^{\\prime}(0)=${tlacu.poli.print(fp)}' != '${mathFields[0].value}'`)
    console.log(mathFields[1].value)
    console.log(mathFields[2].value)
    console.log(mathFields[3].value)
    let dummy = `f^{\\prime}(x)=${tlacu.poli.print(fp).trim().replaceAll('{', '').replaceAll('}', '')}`
  
    
    if( dummy != mathFields[0].value ){
      mathFields[0].style.backgroundColor = "red";
      document.getElementById(`resultado_${i}`).innerHTML += `a)'${dummy}' != '${mathFields[0].value}'`
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