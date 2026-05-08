import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
  return 'Gráfica de funciones sinusoidales';
}

export function tipo() {
  return 2;
}

export async function pregunta(i, code) {
  try {
    let a = (Math.random() < 0.5 ? 1 : -1) * (Math.floor(Math.random() * 4) + 2);  // Amplitud
    let periodo = 4 * Math.floor(Math.random() * 5 + 1);  // Periodo
    let b = 360 / periodo;  // Coeficiente de x
    let d = (Math.random() < 0.5 ? 1 : -1) * Math.floor(Math.random() * 4) + 1;  // Desplazamiento vertical
    let funcType = Math.random() < 0.5 ? 'sin' : 'cos';

    let geogebraExpr = `f(x) = ${a}*${funcType}(${b}*x*pi/180 ) ${d > 0 ? '+' : ''} ${d}`;

    return `
      <div class="pregunta-geogebra" data-params='{"a":${a},"b":${b},"d":${d},"type":"${funcType}"}'   style="display: none;">
        <p>${i + 1}.- Grafique la función $f(x)=${a} \\${funcType}(${b}x°) ${d > 0 ? '+' : ''} ${d == 0 ? "" : d}$.  <span id="resultado_${i}" name="question"></span></p>
        <div id="applet_container_${i}" class="ggb-container"></div>
      </div>
    `;
  } catch (error) {
    console.error('Error al carga la pregunta:', error);
  }
}

export async function renderGeoGebra(container, n, code) {
  const material_id = "uaxkzmpb";
  window.ggbApps = window.ggbApps || [];

  for (let i = 0; i < n; i++) {
    const params = {
      appName: 'classic',
      width: 600,
      height: 600,
      material_id,
      id: `ggbApplet_${i}`,

      appletOnLoad(api) {
        window.ggbApps[i] = api;
        api.setGraphicsOptions(1, {
          gridType: 0,                    // 0 = cuadrícula cartesiana
          gridDistance: { "x": 0.5, "y": 0.5 },     //  funciona
          gridIsAutomatic: false,         // si funciona
        });

        api.setAxisSteps(1, 1, 1);
        let pregunta = document.getElementsByClassName('pregunta-geogebra')[i];
        const parametrosStr = pregunta.getAttribute('data-params');
        const parametros = JSON.parse(parametrosStr);
        window.ggbApps[i] = api;
        window.ggbApps[i].parametros = parametros;

        // Crear puntos móviles iniciales
        const { a, b, d, type } = parametros;
        api.evalCommand(`f(x) = ${a}*${type}(${b}*x°) + ${d}`);
        api.setVisible('f', false);
        api.evalCommand(`SetColor(f, "Red")`);
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

        api.evalCommand(`SetColor(g, "Orange")`);

      }
    };
    new GGBApplet(params, true).inject(`applet_container_${i}`);
  }

  // 🔁 Registrar función específica del tema
  window.accionGeoGebra = function (i) {
    const api = window.ggbApps[i];
    let pregunta = document.getElementsByClassName('pregunta-geogebra')[i];
    if (!api) return alert("Applet no listo");

    api.setVisible('f', true);
    const maxIt = 9
    // fijar puntos para que no se muevan
    api.setFixed('P', true);
    api.setFixed('Q', true);
    for (let it = 0; it < maxIt; ++it) {
      const x = Math.random() * 10 - 5; // x aleatorio entre -5 y 5
      const fx = api.getValue(`f(${x})`);
      const gx = api.getValue(`g(${x})`);
      if (Math.abs(fx - gx) > 0.1) {
        return false;
      }
    }

    return true;
  };
}
