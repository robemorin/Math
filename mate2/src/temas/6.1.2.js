import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import {encriptar, generarCodigo} from '../r2p_core.js'

export function name(){
  return 'Cuadráticas - Evaluación II';
}

export function tipo(){
  return 3;
  /*
  0 - Opción múltiple
  1 - Abierto
  2 - Geogebra
  3 - Híbrido
  */
}

export async function pregunta(i, code, esImprimible=false){
  try{
    // Coeficientes para ax^2 + bx + c
    const a = (Math.random()<0.5?1:-1)*(Math.floor(Math.random()*6)+1);
    const b = Math.floor(Math.random()*15)-7;
    const c = Math.floor(Math.random()*15)-7;
    const x = Math.floor(Math.random()*11)-5;

    // Evaluación usando tlacu.poli.eval
    const y = tlacu.poli.eval([a,b,c], x);

    const poliPrint = tlacu.poli.print([a,b,c]);
    const code = generarCodigo()
    const respuesta = String(y)
    const respuestaE = encriptar(respuesta, code)

    const Pregunta = `
      <div class="pregunta-abierta" data-a="${a}" data-b="${b}" data-c="${c}" data-x="${x}" data-y="${y}" style="display: none;">
        <p>${i+1}.- Para la función $f(x)= ${poliPrint}$, escribe el valor de $y$ cuando $x=${x}$.</p>
        <p>$y = $ <math-field 
            data-code="${code}"
            data-respuesta_e="${respuestaE}"
            data-tipo="expresion"
        ></math-field></p>
      </div>`;

    if(esImprimible){
      return [Pregunta, y];
    }

    return Pregunta;
  }catch(error){
    console.error('Error al generar la pregunta 6.1.2:', error);
  }
}

export async function render(container, n, code){
  // Define la función de validación para preguntas tipo "llenar espacios"
  window.accionR2P = function(i){
    const pregunta = document.getElementsByClassName('pregunta-abierta')[i];
    if(!pregunta) return [0,1];
    const mathFields = pregunta.getElementsByTagName('math-field');
    if(mathFields.length===0) return [0,1];
    const mf = mathFields[0];
    // Obtener valor ingresado y tratar de parsearlo a número
    const raw = mf.value || mf.getAttribute('value') || '';
    const parsed = parseFloat(raw.toString().replace(/[^0-9eE+\-.]/g,''));
    const correcta = Number(pregunta.dataset.y);
    if(Number.isNaN(parsed)) return [0,1];
    // Comparación exacta para enteros
    const ok = parsed === correcta;
    return [ok?1:0,1];
  }
}
