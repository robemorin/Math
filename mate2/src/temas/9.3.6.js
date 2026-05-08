import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Gráfica de funciones sinusoidales';
}

export function tipo() {
  return 2;
}

export async function pregunta(i, code) {
  try {
    let a = (Math.random() < 0.5 ? 1 : -1) * (Math.floor(Math.random() * 4) + 2); // Amplitud
    let periodo = 4 * Math.ceil(Math.random() * 25); // Periodo
    let b = 360 / periodo; // Coeficiente de x
    let d = (Math.random() < 0.5 ? 1 : -1) * Math.floor(Math.random() * 4) + 1; // Desplazamiento vertical
    let funcType = Math.random() < 0.5 ? 'sin' : 'cos';
    let frecuencia = tlacu.fraccion(360, periodo);


    let geogebraExpr = `f(x) = ${a}*${funcType}(${b}*x*pi/180) ${d > 0 ? '+' : ''} ${d != 0 ? d : ''}`;

    return `
      <div class="pregunta-geogebra" data-params='{"a":${a},"b":${b},"d":${d},"type":"${funcType}"}' style="display: none;">
        <p>${i + 1}.- Coloque 5 puntos consecutivos, en el mismo orden, que representen nodos, crestas y 
        valles de la función $f(x) = ${a} \\${funcType}(${frecuencia}x°) ${d > 0 ? '+' : ''} ${d == 0 ? "" : d}$. <span id="resultado_${i}" name="question"></span></p>
        <center>
        <input id="slider_${i}" type="range" style="width: 800px;" min="1" max="30" value="1"><br>
        <div id="applet_container_${i}" class="ggb-container"></div>
        
        </center>

      </div>
    `;
  } catch (error) {
    console.error('Error al cargar la pregunta:', error);
  }
}

export async function renderGeoGebra(container, n, code) {
  const material_id = "uaxkzmpb";
  window.ggbApps = window.ggbApps || [];

  for (let i = 0; i < n; i++) {
    const params = {
      appName: 'classic',
      width: 800,
      height: 600,
      material_id,
      id: `ggbApplet_${i}`,

      appletOnLoad(api) {
        window.ggbApps[i] = api;
        let pregunta = document.getElementsByClassName('pregunta-geogebra')[i];
        const parametrosStr = pregunta.getAttribute('data-params');
        const parametros = JSON.parse(parametrosStr);
        window.ggbApps[i].parametros = parametros;

        let slider = document.getElementById(`slider_${i}`);
        if (slider) {
          slider.addEventListener('input', function (e) {
            let v = parseFloat(e.target.value);
            let tick = v;

            api.setCoordSystem(- tick, 7 * tick, -8, 8);
            api.setAxisSteps(1, tick, 1);
            api.setGraphicsOptions(1, {
              gridType: 0,
              gridDistance: { "x": tick / 2, "y": 1 },
              gridIsAutomatic: false,
            });
            api.evalCommand(`A_0 = (0, 0)`); // Nodo
            api.evalCommand(`A_1 = (${tick / 2},0)`); // Cresta
            api.evalCommand(`A_2 = (${tick},0)`); // Nodo
            api.evalCommand(`A_3 = (${3 * tick / 2},0)`); // Valle
            api.evalCommand(`A_4 = (${2 * tick},0)`); // Nodo
          });
          slider.dispatchEvent(new Event('input'));
        }

        // Crear puntos móviles iniciales para 5 puntos consecutivos
        const { a, b, d, type } = parametros;
        api.evalCommand(`f(x) = ${a}*${type}(${b}*x°) + ${d}`);
        api.setVisible('f', false); // No mostrar la gráfica inicialmente
        api.evalCommand(`SetColor(f, "Orange")`);

        // Inicializar 5 puntos: alternando nodos y crestas/valles
        // Secuencia: Nodo, Cresta, Nodo, Valle, Nodo
        api.evalCommand(`A_0 = (0, 0)`); // Nodo
        api.evalCommand(`A_1 = (1, 0)`); // Cresta
        api.evalCommand(`A_2 = (2, 0)`); // Nodo
        api.evalCommand(`A_3 = (3, 0)`); // Valle
        api.evalCommand(`A_4 = (4, 0)`); // Nodo

        api.evalCommand(`SetColor(A_0, "Orange")`);
        api.evalCommand(`SetColor(A_1, "Orange")`);
        api.evalCommand(`SetColor(A_2, "Orange")`);
        api.evalCommand(`SetColor(A_3, "Orange")`);
        api.evalCommand(`SetColor(A_4, "Orange")`);


      }
    };
    new GGBApplet(params, true).inject(`applet_container_${i}`);
  }

  // Registrar función específica del tema
  window.accionGeoGebra = function (i) {
    const api = window.ggbApps[i];
    let pregunta = document.getElementsByClassName('pregunta-geogebra')[i];
    if (!api) return alert("Applet no listo");

    api.setVisible('f', true); // Mostrar la gráfica al revisar

    const parametros = api.parametros;
    const { a, b, d, type } = parametros;

    // Fijar puntos
    api.setFixed('A_0', true);
    api.setFixed('A_1', true);
    api.setFixed('A_2', true);
    api.setFixed('A_3', true);
    api.setFixed('A_4', true);

    const tolerance = 0.5;

    // Verificar posiciones
    const xstep = Math.round(90 / b)
    let x = []
    x.push(api.getXcoord('A_0'))
    x.push(api.getXcoord('A_1'))
    x.push(api.getXcoord('A_2'))
    x.push(api.getXcoord('A_3'))
    x.push(api.getXcoord('A_4'))

    let y = []
    y.push(api.getYcoord('A_0'))
    y.push(api.getYcoord('A_1'))
    y.push(api.getYcoord('A_2'))
    y.push(api.getYcoord('A_3'))
    y.push(api.getYcoord('A_4'))
    //Vamos a verificar que los puntos estén en la posición correcta: A_0, A_2 y A_4 deben ser nodos (y cercanos a d), A_1 debe ser una cresta (y cercano a d+a) y A_3 debe ser un valle (y cercano a d-a)

    for (let j = 0; j < 4; j++) {
      if (Math.abs((x[j] + xstep) - x[j + 1]) > tolerance) {
        console.log('Error en la posición de los puntos')
        console.log(x[j], x[j + 1], xstep)
        return false; // No están en orden creciente
      }
    }
    //Ahora que corresponda con la función
    for (let j = 0; j < 5; j++) {
      const expectedY = a * (type === 'sin' ? Math.sin(b * x[j] * Math.PI / 180) : Math.cos(b * x[j] * Math.PI / 180)) + d;
      if (Math.abs(y[j] - expectedY) > tolerance) {
        return false; // No está cerca de la función
      }
    }
    return true
  }
}