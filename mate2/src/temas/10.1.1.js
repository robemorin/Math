import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
  return "Tasa de cambio promedio en fenómenos físicos";
}

export function tipo() {
  return 0;
}

export async function pregunta(i, code, esImprimible = false) {
  const contextos = [
    { variableX: "t", variableY: "T", unidadX: "horas", unidadY: "°C", fenomeno: "la temperatura de una ciudad" },
    { variableX: "t", variableY: "d", unidadX: "s", unidadY: "m", fenomeno: "la distancia recorrida por un objeto" },
    { variableX: "t", variableY: "V", unidadX: "min", unidadY: "L", fenomeno: "el volumen de agua en un tanque" },
    { variableX: "t", variableY: "v", unidadX: "s", unidadY: "m/s", fenomeno: "la velocidad de un automóvil" }
  ];
  
  const ctx = contextos[Math.floor(Math.random() * contextos.length)];
  
  const a = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 5) + 1) * 0.5;
  const b = (Math.floor(Math.random() * 10) + 1);
  const c = Math.floor(Math.random() * 20) + 10;
  
  const startX = Math.floor(Math.random() * 3);
  const stepX = Math.floor(Math.random() * 2) + 1;
  
  const valoresX = [];
  const valoresY = [];
  
  for(let j = 0; j < 6; j++) {
      let x = startX + j * stepX;
      let y = a * x * x + b * x + c;
      y = Math.round(y * 10) / 10;
      valoresX.push(x);
      valoresY.push(y);
  }
  
  let idx1 = Math.floor(Math.random() * 3); 
  let idx2 = idx1 + Math.floor(Math.random() * 2) + 1; 
  
  let x1 = valoresX[idx1];
  let x2 = valoresX[idx2];
  let y1 = valoresY[idx1];
  let y2 = valoresY[idx2];
  
  let ans = (y2 - y1) / (x2 - x1);
  ans = Math.round(ans * 100) / 100;
  
  const isTable = Math.random() > 0.5;
  let contenidoHTML = "";
  
  if (isTable) {
      let tableHTML = `<table class="table-borders" style="margin: 10px auto; text-align: center; border-collapse: collapse;" border="1" cellpadding="5">
        <tr><th>${ctx.variableX} (${ctx.unidadX})</th>`;
      for(let j = 0; j < 6; j++) tableHTML += `<td>${valoresX[j]}</td>`;
      tableHTML += `</tr><tr><th>${ctx.variableY} (${ctx.unidadY})</th>`;
      for(let j = 0; j < 6; j++) tableHTML += `<td>${valoresY[j]}</td>`;
      tableHTML += `</tr></table>`;
      
      contenidoHTML = `
        <p>${i + 1}.- La siguiente tabla muestra ${ctx.fenomeno} (${ctx.variableY}) en función del tiempo (${ctx.variableX}).</p>
        ${tableHTML}
      `;
  } else {
      let signoB = b >= 0 ? "+" : "-";
      let signoC = c >= 0 ? "+" : "-";
      let funcionText = `${ctx.variableY}(${ctx.variableX}) = ${a}${ctx.variableX}² ${signoB} ${Math.abs(b)}${ctx.variableX} ${signoC} ${Math.abs(c)}`;
      
      contenidoHTML = `
        <p>${i + 1}.- El modelo matemático para ${ctx.fenomeno} (${ctx.variableY}) en función del tiempo (${ctx.variableX}) está dado por la función:</p>
        <p style="text-align: center;"><b>${funcionText}</b></p>
      `;
  }
  
  const P = `
    <div class="pregunta-opcion-multiple">
      ${contenidoHTML}
      <p>Determine la tasa de cambio promedio de ${ctx.variableY} con respecto a ${ctx.variableX} en el intervalo desde ${ctx.variableX} = ${x1} hasta ${ctx.variableX} = ${x2}.</p>
    </div>
  `;
  
  const R = [];
  R[0] = `${ans} ${ctx.unidadY}/${ctx.unidadX}`;
  
  if (!esImprimible){
      for(let k=1; k<6; ++k){
          let wrongAns;
          let safe = false;
          while(!safe){
              let errorType = Math.floor(Math.random() * 5);
              if (errorType === 0) {
                  wrongAns = (y2 + y1) / (x2 - x1);
              } else if (errorType === 1) {
                  wrongAns = (y2 - y1) !== 0 ? (x2 - x1) / (y2 - y1) : ans + 2;
              } else if (errorType === 2) {
                  wrongAns = (y2 - y1) / (x2 + x1);
              } else if (errorType === 3) {
                  wrongAns = (y2 - y1);
              } else {
                  wrongAns = ans + (Math.floor(Math.random()*10)+1)*(Math.random()>0.5?1:-1) * 0.5;
              }
              
              wrongAns = Math.round(wrongAns * 100) / 100;
              let wrongStr = `${wrongAns} ${ctx.unidadY}/${ctx.unidadX}`;
              if (!R.includes(wrongStr)) {
                  R[k] = wrongStr;
                  safe = true;
              }
          }
      }
      return [P, R];
  }
  
  return [P, R[0]];
}

export async function render(container, n, code) {
}
