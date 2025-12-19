import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import {desencriptar, encriptar, generarCodigo} from '../r2p_core.js'

export function name() {
  return 'Cuadráticas - Graficar puntos';
}

export function tipo() {
  return 2;
}

export async function pregunta(i, code) {
  try{
    let a, b, c, xs, ys, validosy = false;

    // Generar coeficientes garantizando que todos los y estén en [-10, 10]
    while(!validosy){
      // Generar a pequeño
      a = (Math.random()<0.5?1:-1)*(Math.floor(Math.random()*3)+1); // ±1, ±2, ±3
      
      // Generar 5 valores de x (consecutivos para claridad)
      const start = Math.floor(Math.random()*5)-2; // -2 .. 2
      xs = [start, start+1, start+2, start+3, start+4];
      
      // Calcular b para que el eje de simetría esté en start+2
      const ejeSimetria = start + 2;
      b = -2 * a * ejeSimetria;
      
      // Generar c
      c = Math.floor(Math.random()*11)-5; // -5 .. 5
      
      // Calcular los valores de y
      ys = xs.map(x => tlacu.poli.eval([a,b,c], x));
      
      // Verificar que todos los y estén en [-10, 10]
      validosy = ys.every(y => y >= -10 && y <= 10);
    }

    // Crear puntos A, B, C, D, E con coordenadas (x, y)
    const puntos = {
      A: [xs[0], ys[0]],
      B: [xs[1], ys[1]],
      C: [xs[2], ys[2]],
      D: [xs[3], ys[3]],
      E: [xs[4], ys[4]]
    };

    const poliPrint = tlacu.poli.print([a,b,c]);
    
    return `
      <div class="pregunta-geogebra" 
           data-a="${a}" 
           data-b="${b}" 
           data-c="${c}"
           data-puntos='${JSON.stringify(puntos)}'
           style="display: none;">
        <p>${i + 1}.- Grafica los puntos de la función $f(x)=${poliPrint}$. <span id="resultado_${i}" name="question"></span></p>
        <div id="applet_container_${i}" class="ggb-container"></div>
      </div>
    `;
  }catch (error){
    console.error('Error al cargar la pregunta:', error);
  }
}

export async function renderGeoGebra(container, n, code) {
  const material_id = "uaxkzmpb";
  window.ggbApps = [];

  for (let i = 0; i < n; i++) {
    const params = {
      appName: 'classic',
      width: 600,
      height: 400,
      material_id,
      id: `ggbApplet_${i}`,
      appletOnLoad(api) {
        window.ggbApps[i] = api;
        
        // Obtener datos de la pregunta
        const pregunta = document.getElementsByClassName('pregunta-geogebra')[i];
        const puntos = JSON.parse(pregunta.dataset.puntos);
        
        // Crear los 5 puntos en GeoGebra con sus coordenadas (x, y)
        const etiquetas = ['A', 'B', 'C', 'D', 'E'];
        etiquetas.forEach((etiq) => {
          const [x, y] = puntos[etiq];
          api.evalCommand(`${etiq} = (0,0)`);
        });
      }
    };
    new GGBApplet(params, true).inject(`applet_container_${i}`);
  }

  // Registrar función específica del tema
  window.accionGeoGebra = function(i) {
    const api = window.ggbApps[i];
    const pregunta = document.getElementsByClassName('pregunta-geogebra')[i];
    
    if (!api) return alert("Applet no listo");

    const a = Number(pregunta.dataset.a);
    const b = Number(pregunta.dataset.b);
    const c = Number(pregunta.dataset.c);
    
    // Validar: pertenencia a la parábola y no repetición
    const etiquetas = ['A', 'B', 'C', 'D', 'E'];
    let puntosValidos = 0;
    const puntosGraficados = [];

    etiquetas.forEach(etiq => {
      const actualX = api.getXcoord(etiq);
      const actualY = api.getYcoord(etiq);
      
      // Calcular el valor esperado en la parábola para este x
      const yEsperado = a * actualX * actualX + b * actualX + c;
      
      // Verificar 1: Punto pertenece a la parábola (tolerancia 0.01)
      const perteneceParabola = Math.abs(actualY - yEsperado) < 0.01;
      
      // Verificar 2: No es repetido (no existe otro punto con las mismas coordenadas)
      const esRepetido = puntosGraficados.some(p => 
        Math.abs(p[0] - actualX) < 0.01 && Math.abs(p[1] - actualY) < 0.01
      );
      
      if(perteneceParabola && !esRepetido){
        api.setColor(etiq, 0, 255, 0); // Verde
        puntosValidos++;
        puntosGraficados.push([actualX, actualY]);
      } else {
        api.setColor(etiq, 255, 0, 0); // Rojo
      }
    });

    // Retornar verdadero si todos los 5 puntos son válidos
    return puntosValidos === 5;
  };
}