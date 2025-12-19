import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Cuadráticas - Tabla de valores (Complete the table)';
}

export function tipo(){
  return 3; // llenar la tabla (window.accionR2P devuelve [puntos,total])
}

export async function pregunta(i, code, esImprimible=false){
  try{
    // Generar coeficientes pequeños para f(x)=ax^2+bx+c
    const a = (Math.random()<0.5?1:-1)*(Math.floor(Math.random()*5)+1);
    const b = Math.floor(Math.random()*11)-5;
    const c = Math.floor(Math.random()*11)-5;

    // Generar 5 valores de x (consecutivos para claridad)
    const start = Math.floor(Math.random()*5)-2; // -2 .. 2
    const xs = [start, start+1, start+2, start+3, start+4];

    // Crear la tabla HTML
    const poliPrint = tlacu.poli.print([a,b,c]);

    let rowX = '<tr><th style="border-right:solid 2px gray">$x$</th>';
    xs.forEach(x => { rowX += `<td><center>${x}</center></td>` });
    rowX += '</tr>';

    let rowY = `<tr><th style="border-right:solid 2px gray">$ ${poliPrint}$</th>`;
    for(let k=0;k<5;++k){
      rowY += `<td><math-field id="math-field-${i}-${k}"></math-field></td>`;
    }
    rowY += '</tr>';

    const Pregunta = `
      <div class="pregunta-abierta" 
           data-a="${a}" data-b="${b}" data-c="${c}"
           data-x0="${xs[0]}" data-x1="${xs[1]}" data-x2="${xs[2]}" data-x3="${xs[3]}" data-x4="${xs[4]}"
           style="display: none;">
        <p>${i+1}.- Completa la siguiente tabla:</p>
        <table class="tabla-eval">
          ${rowX}
          ${rowY}
        </table>
      </div>`;

    if(esImprimible){
      // devolver respuestas para impresión
      const ys = xs.map(x => tlacu.poli.eval([a,b,c], x));
      return [Pregunta, ys.join(', ')];
    }

    return Pregunta;
  }catch(error){
    console.error('Error al generar 6.1.3:', error);
  }
}

export async function render(container, n, code){
  // Registramos la función de evaluación por pregunta (llenar tabla)
  window.accionR2P = function(i){
    const pregunta = document.getElementsByClassName('pregunta-abierta')[i];
    if(!pregunta) return [0,5];
    const mathFields = pregunta.getElementsByTagName('math-field');
    if(mathFields.length < 5) return [0,5];

    const a = Number(pregunta.dataset.a);
    const b = Number(pregunta.dataset.b);
    const c = Number(pregunta.dataset.c);
    const xs = [Number(pregunta.dataset.x0), Number(pregunta.dataset.x1), Number(pregunta.dataset.x2), Number(pregunta.dataset.x3), Number(pregunta.dataset.x4)];

    let puntos = 0;
    const total = 5;

    for(let k=0;k<5;++k){
      const mf = mathFields[k];
      const raw = mf.value || mf.getAttribute('value') || '';
      const parsed = parseFloat(raw.toString().replace(/[^0-9eE+\-.]/g,''));
      const esperado = tlacu.poli.eval([a,b,c], xs[k]);
      if(!Number.isFinite(parsed)){
        mf.style.backgroundColor = 'red';
        continue;
      }
      // Comparación exacta para enteros
      if(parsed === esperado){
        ++puntos;
        mf.style.border = 'solid 3px green';
      } else {
        mf.style.backgroundColor = 'red';
      }
    }

    return [puntos, total];
  }
}
