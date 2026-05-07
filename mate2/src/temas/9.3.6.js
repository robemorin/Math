import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Grafica de funciones sinusoidales';
}

export function tipo() {
  return 2;
}

function randomInt(min, max, exclude = []) {
  let num;
  do {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (exclude.includes(num));
  return num;
}

export async function pregunta(numeroPregunta) {
  try {
    let a = randomInt(1, 4);  // Amplitud
    let periodo =2 * randomInt(2, 8);  // Periodo
    let b = 360 / periodo;  // Coeficiente de x
    let c = randomInt(-180, 180, [0]);  // Desplazamiento de fase (en grados)
    let d = randomInt(0, 3);  // Desplazamiento vertical
    let funcType = Math.random() < 0.5 ? 'sin' : 'cos';

    // Función para GeoGebra (usamos pi/180 para que el eje x represente grados)
    let geogebraExpr = `f(x) = ${a}*${funcType}(${b}*x*pi/180 ) ${d > 0 ? '+' : ''} ${d}`;

    let P = `<div class="pregunta" data-params='{"a":${a},"b":${b},"c":${c},"d":${d},"type":"${funcType}","periodo":${periodo}}'
     data-f="${a} ${funcType}(${b}x°) + ${d}">
      ${numeroPregunta + 1}.- Grafique la función $f(x)=${a} \\${funcType}(${b}x°) + ${d}$:
   <strong style="color: green;">Q</strong>: un nodo (donde la función cruza el eje x)</li>
      </ul>
      <div id="applet_container_${numeroPregunta}" class="ggb-container"></div>
    </div>`;

    return P;

  } catch (error) {
    console.error('Error al generar pregunta 9.3.6:', error);
  }
}

export async function render(container, n, code) {
  const material_id = "uaxkzmpb";
  window.ggbApps = window.ggbApps || [];
  const preguntas = document.getElementsByClassName('ggb-container');

  for (let i = 0; i < n; i++) {
    const params = {
      appName: 'classic',
      width: 600,
      height: 600,
      //material_id,
      id: `applet_container_${i}`,
      appletOnLoad(api) {
        api.setAxisSteps(1, 1, 1);
        api.setGraphicsOptions(1, {
          gridType: 0,
          gridDistance: { "x": 0.5, "y": 0.5 },
          gridIsAutomatic: false,
        });

        const latexExpression = preguntas[i].parentElement.getAttribute('data-f');
        const parametrosStr = preguntas[i].parentElement.getAttribute('data-params');
        const parametros = JSON.parse(parametrosStr);

        window.ggbApps[i] = api;
        window.ggbApps[i].parametros = parametros;

        // Graficar la función
        api.evalCommand(latexExpression);

        // Crear puntos móviles iniciales
        const { a,b, d } = parametros;
        api.evalCommand(`P = (0, 1)`);  // Nodo inicial aproximado
        api.evalCommand(`Q = (1, 0)`);  // Cresta inicial aproximada
        api.evalCommand(`SetColor(P, "Orange")`);
        api.evalCommand(`SetColor(Q, "Orange")`);
        api.setLabelVisible('P', false);
        api.setLabelVisible('Q', false);
        api.evalCommand(`p = 4*(P(1,0)-Q(1,0))`);
        api.evalCommand(`frec=360/p`);
        api.evalCommand(`a = P(0,1)-Q(0,1)`);
        api.evalCommand(`h = P(1,0)`);
        api.evalCommand(`k = P(0,1)`);
        api.evalCommand(`g(x)=a*sin(frec*(x-h)°)+k`);


      }
    };
    new GGBApplet(params, true).inject(`applet_container_${i}`);
  }
}

// Registrar función específica del tema
window.accionGeoGebra = function (i) {
  const api = window.ggbApps[i];
  if (!api) return alert("Applet no listo");
/*
  const parametros = api.parametros;
  const { a, b, c, d, type } = parametros;

  // Obtener coordenadas de los puntos
  const px = api.getXcoord("P");
  const py = api.getYcoord("P");
  const qx = api.getXcoord("Q");
  const qy = api.getYcoord("Q");

  // Bloquear puntos
  api.setFixed('P', true);
  api.setFixed('Q', true);

  // Tolerancia para validación
  const tolerance = 0.3;

  // Calcular valores de la función esperados
  const angleP = b * px + c;  // en grados
  const angleQ = b * qx + c;  // en grados
  
  const fP = type === 'sin' ? a * Math.sin(angleP * Math.PI / 180) + d : a * Math.cos(angleP * Math.PI / 180) + d;
  const fQ = type === 'sin' ? a * Math.sin(angleQ * Math.PI / 180) + d : a * Math.cos(angleQ * Math.PI / 180) + d;

  // Validar que P esté en un nodo (donde y ≈ d)
  const isPNode = Math.abs(py - d) < tolerance;

  // Validar que Q esté en una cresta (y ≈ a + d) o valle (y ≈ -a + d)
  const isQCrest = Math.abs(py - (a + d)) < tolerance;
  const isQValley = Math.abs(py - (-a + d)) < tolerance;*/


/*
  if (isPNode && (isQCrest || isQValley)) {
    return true;
  }

  // Mostrar líneas de referencia si no es correcto
  api.evalCommand(`lineX = y = ${d}`);
  api.evalCommand(`SetColor(lineX, "LightGray")`);
  api.evalCommand(`lineCrest = y = ${a + d}`);
  api.evalCommand(`SetColor(lineCrest, "LightGreen")`);
  api.evalCommand(`lineValley = y = ${-a + d}`);
  api.evalCommand(`SetColor(lineValley, "LightGreen")`);

  return false;*/
  api.evalCommand(`Q(x)=Simplify(f(x)=g(x))`);
  return true;
};
