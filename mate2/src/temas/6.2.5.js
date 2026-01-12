import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Cuadráticas - Eje de simetría';
}

export function tipo(){
  return 2; // GeoGebra
}

export async function pregunta(i, code){
  try{
    // Generar raíces reales distintas en [-5, 5]
    let r1, r2, verticeY, validParams = false;
    let a, b, c;
    
    while(!validParams){
      r1 = Math.floor(Math.random()*11)-5; // -5..5
      r2 = Math.floor(Math.random()*11)-5;
      
      // Asegurar que sean distintas
      if(r1 === r2) continue;
      
      // Generar coeficiente principal a
      a = (Math.random()<0.5?1:-1)*(Math.floor(Math.random()*4)+1); // ±1..±4
      
      // Eje de simetría: x = (r1 + r2) / 2
      const ejeSimetria = (r1 + r2) / 2;
      
      // Forma estándar: ax² + bx + c
      b = -(a*(r1+r2));
      c = a*r1*r2;
      
      // Calcular componente y del vértice
      verticeY = a * ejeSimetria**2 + b * ejeSimetria + c;
      
      // Validar que el vértice esté en [-5, 5]
      if(Math.abs(verticeY) <= 5){
        validParams = true;
      }
    }

    // Eje de simetría: x = (r1 + r2) / 2
    const ejeSimetria = (r1 + r2) / 2;

    return `
      <div class="pregunta-geogebra" 
           data-a="${a}" 
           data-b="${b}" 
           data-c="${c}"
           data-ejex="${ejeSimetria}"
           style="display: none;">
        <p>${i + 1}.- Encuentra el eje de simetría de la parábola (en decimal). <span id="resultado_${i}" name="question"></span></p>
        <p> $x=$ <math-field></math-field></p>
        <div id="applet_container_${i}" class="ggb-container"></div>
      </div>
    `;
  }catch(error){
    console.error('Error al generar 6.2.5:', error);
  }
}

export async function renderGeoGebra(container, n, code){
  const material_id = "uaxkzmpb"; // Reutilizar el mismo applet de 6.2.3
  window.ggbApps = [];

  for(let i = 0; i < n; i++){
    const params = {
      appName: 'classic',
      width: 600,
      height: 400,
      material_id,
      id: `ggbApplet_${i}`,
      appletOnLoad(api){
        window.ggbApps[i] = api;
        
        // Obtener datos de la pregunta
        const pregunta = document.getElementsByClassName('pregunta-geogebra')[i];
        const a = Number(pregunta.dataset.a);
        const b = Number(pregunta.dataset.b);
        const c = Number(pregunta.dataset.c);
        
        // Dibujar la parábola
        api.evalCommand(`f(x) = ${a}*x^2 + ${b}*x + ${c}`);
        
        // Dibujar el eje de simetría como línea punteada
        const ejeSimetria = Number(pregunta.dataset.ejeX);
        api.evalCommand(`eje : x = ${ejeSimetria}`);
        api.setLineStyle(`eje`, 2); // Línea punteada
        api.setColor(`eje`, 255, 0, 0); // Rojo
      }
    };
    new GGBApplet(params, true).inject(`applet_container_${i}`);
  }

  // Registrar función de validación
  window.accionGeoGebra = function(i){
    const api = window.ggbApps[i];
    const pregunta = document.getElementsByClassName('pregunta-geogebra')[i];
    
    if(!api) return false;

    // Obtener la respuesta del usuario desde math-field
    const mathField = pregunta.getElementsByTagName('math-field')[0];
    const respuestaUsuario = mathField.value;
    
    // Obtener el eje de simetría correcto
    const ejeCorrect = Number(pregunta.dataset.ejex);
    console.log(`Eje correcto: x = ${ejeCorrect}`);
    
    // Parsear la respuesta del usuario
    let respuestaNum;
    try{
      respuestaNum = Function('"use strict"; return (' + respuestaUsuario.replace(/x/g, '') + ')')();
    }catch(e){
      return false;
    }

    // Comparar con tolerancia
    const tolerancia = 0.0001;
    return Math.abs(respuestaNum - ejeCorrect) < tolerancia;
  };
}
