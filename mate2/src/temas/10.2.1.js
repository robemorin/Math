import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
  return "Exploración límite de la derivada";
}

export function tipo() {
  return 3;
}

export async function pregunta(i, code, esImprimible = false) {
  const contextos = [
    { variableX: "t", variableY: "T", unidadX: "horas", unidadY: "°C", fenomeno: "la temperatura de un proceso térmico", funName: "T(t)" },
    { variableX: "t", variableY: "s", unidadX: "s", unidadY: "m", fenomeno: "la posición de un objeto", funName: "s(t)" },
    { variableX: "t", variableY: "V", unidadX: "min", unidadY: "L", fenomeno: "el volumen de agua en un tanque", funName: "V(t)" },
    { variableX: "t", variableY: "I", unidadX: "días", unidadY: "USD", fenomeno: "los ingresos de una empresa", funName: "I(t)" }
  ];
  
  const ctx = contextos[Math.floor(Math.random() * contextos.length)];
  
  const a = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 5) + 1);
  const b = (Math.floor(Math.random() * 10) + 1) * (Math.random() > 0.5 ? 1 : -1);
  const c = Math.floor(Math.random() * 20) + 10;
  
  const t0 = Math.floor(Math.random() * 4) + 2; 
  
  const approachRight = Math.random() > 0.5;
  
  let h1, h2, h3;
  if(approachRight) {
      h1 = 0.1; h2 = 0.01; h3 = 0.001;
  } else {
      h1 = -0.1; h2 = -0.01; h3 = -0.001;
  }
  
  const ans1 = 2 * a * t0 + a * h1 + b;
  const ans2 = 2 * a * t0 + a * h2 + b;
  const ans3 = 2 * a * t0 + a * h3 + b;
  const ansLimit = 2 * a * t0 + b;
  
  let coefA = a === 1 ? "" : (a === -1 ? "-" : a);
  let signoB = b >= 0 ? "+" : "-";
  let signoC = c >= 0 ? "+" : "-";
  let funcStr = `${coefA}${ctx.variableX}^2 ${signoB} ${Math.abs(b)}${ctx.variableX} ${signoC} ${Math.abs(c)}`;
  
  let intervalHtml1 = approachRight ? `$[${t0}, ${t0 + 0.1}]$` : `$[${(t0 - 0.1).toFixed(1)}, ${t0}]$`;
  let intervalHtml2 = approachRight ? `$[${t0}, ${t0 + 0.01}]$` : `$[${(t0 - 0.01).toFixed(2)}, ${t0}]$`;
  let intervalHtml3 = approachRight ? `$[${t0}, ${t0 + 0.001}]$` : `$[${(t0 - 0.001).toFixed(3)}, ${t0}]$`;

  const P = `
    <div class="pregunta-abierta" data-a1="${ans1}" data-a2="${ans2}" data-a3="${ans3}" data-al="${ansLimit}" style="display: none;">
      <p>${i + 1}.- El modelo matemático para ${ctx.fenomeno} (${ctx.variableY}) en función del tiempo (${ctx.variableX}) está dado por la función:</p>
      <p style="text-align: center;">$${ctx.funName} = ${funcStr}$</p>
      <p>Calcule la tasa de cambio promedio de ${ctx.variableY} con respecto a ${ctx.variableX} en cada intervalo y complete la tabla para estimar la tasa de cambio instantánea en $${ctx.variableX} = ${t0}$.</p>
      
      <div style="display:flex; justify-content:center; margin:15px 0;">
          <table class="table-borders" style="text-align: center; border-collapse: collapse;" border="1" cellpadding="8">
            <tr>
              <th>Intervalo</th>
              <th>Tasa de cambio promedio (${ctx.unidadY}/${ctx.unidadX})</th>
            </tr>
            <tr>
              <td>${intervalHtml1}</td>
              <td><math-field></math-field></td>
            </tr>
            <tr>
              <td>${intervalHtml2}</td>
              <td><math-field></math-field></td>
            </tr>
            <tr>
              <td>${intervalHtml3}</td>
              <td><math-field></math-field></td>
            </tr>
          </table>
      </div>
      <p>A partir de la tabla, escriba su estimación para la tasa de cambio instantánea en $${ctx.variableX} = ${t0}$:</p>
      <div style="text-align:left; margin-left:20px;">Estimación: <math-field></math-field> ${ctx.unidadY}/${ctx.unidadX}</div>
    </div>
  `;
  
  if (esImprimible) {
      const respuesta = `$a) ${ans1.toFixed(3)}$<br>$b) ${ans2.toFixed(3)}$<br>$c) ${ans3.toFixed(3)}$<br>Estimación (límite): $${ansLimit}$`;
      return [P.replace('style="display: none;"', ''), respuesta];
  }
  
  render();
  return P;
}

export async function render() {
  window.accionR2P = function(i) {
    let puntos = 0;
    let totalPuntos = 4;
    let pregunta = document.getElementsByClassName('pregunta-abierta')[i];
    const mathFields = pregunta.getElementsByTagName('math-field');
    
    let a1 = parseFloat(pregunta.getAttribute('data-a1'));
    let a2 = parseFloat(pregunta.getAttribute('data-a2'));
    let a3 = parseFloat(pregunta.getAttribute('data-a3'));
    let al = parseFloat(pregunta.getAttribute('data-al'));
    
    let expected = [a1, a2, a3, al];
    
    for(let j = 0; j < 4; j++) {
       let mf = mathFields[j];
       let sibling = mf.nextElementSibling;
       let corrSpan;
       if (sibling && sibling.className === 'corr-ans') {
           corrSpan = sibling;
       } else {
           corrSpan = document.createElement('span');
           corrSpan.className = 'corr-ans';
           corrSpan.style.color = 'red';
           corrSpan.style.fontWeight = 'bold';
           corrSpan.style.marginLeft = '10px';
           mf.parentNode.insertBefore(corrSpan, mf.nextSibling);
       }

       if (mf.value === '') {
           mf.style.backgroundColor = "#fff";
           mf.style.border = "solid 1px #ccc";
           corrSpan.innerHTML = "";
           continue;
       }
       
       let val = parseFloat(mf.value.replace(/\\,/g, '').replace(',', '.'));
       let exact = expected[j];
       
       let isCorrect = false;
       if (exact === 0) {
           isCorrect = (val === 0);
       } else {
           let relErr = Math.abs((val - exact) / exact);
           isCorrect = (relErr < 0.005 || val === exact || val === Number(exact.toPrecision(3)));
       }
       
       if (isCorrect) {
           puntos++;
           mf.style.border = "solid 3px green";
           mf.style.backgroundColor = "#e0ffe0";
           corrSpan.innerHTML = "";
       } else {
           mf.style.border = "solid 3px red";
           mf.style.backgroundColor = "#ffe0e0";
           corrSpan.innerHTML = `(Resp: ${exact})`;
       }
    }
    return [puntos, totalPuntos];
  };
}
