import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
  return 'Gráfica de la mediatriz a partir de dos puntos';
}

export function tipo() {
  return 2;
}

export async function pregunta(i, code) {
  try {
    let A, B;
    do {
      A = [Math.ceil(Math.random() * 10 - 5), Math.ceil(Math.random() * 10 - 5)];
      B = [Math.ceil(Math.random() * 10 - 5), Math.ceil(Math.random() * 10 - 5)];
    } while (A[0] === B[0] && A[1] === B[1])

    return `
      <div class="pregunta-geogebra"  data-a="${A}" data-b="${B}" style="display: none;">
        <p>${i + 1}.- Se muestran los puntos $A:(${A[0]}, ${A[1]})$ y $B:(${B[0]}, ${B[1]})$ fijos. Mueva los puntos rojos $C$ y $D$ para que la línea que forman coincida con la mediatriz del segmento que une $A$ y $B$. <span id="resultado_${i}" name="question"></span></p>
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
        const A = pregunta.dataset.a.split(',').map(Number);
        const B = pregunta.dataset.b.split(',').map(Number);

        // Puntos fijos
        api.evalCommand(`A = (${A[0]}, ${A[1]})`);
        api.evalCommand(`B = (${B[0]}, ${B[1]})`);
        api.setFixed('A', true);
        api.setFixed('B', true);
        api.evalCommand(`SetColor(A, "Blue")`);
        api.evalCommand(`SetColor(B, "Blue")`);

        // Puntos móviles
        // Los inicializamos en una posición que no sea ya la mediatriz
        api.evalCommand(`C = (0,0)`);
        api.evalCommand(`D = (1,0)`);
        api.evalCommand(`SetColor(C, "Red")`);
        api.evalCommand(`SetColor(D, "Red")`);

        // Línea definida por C y D
        api.evalCommand(`L=Line(C, D)`);
        api.evalCommand(`SetColor(L, "red")`);

        api.setLabelVisible('C', false);
        api.setLabelVisible('D', false);
        //gbApplet.evalCommand("SetGridDistances(0.5, 0.5)");
        //ggbApplet.evalCommand("SetAxesRatio(1, 1)");
        //---
        // Definición técnica del objeto de configuración
        console.log(api.getGraphicsOptions(1));
        //--
      }
    };
    new GGBApplet(params, true).inject(`applet_container_${i}`);
  }

  // 🔁 Registrar función específica del tema
  window.accionGeoGebra = function (i) {
    const api = window.ggbApps[i];
    let pregunta = document.getElementsByClassName('pregunta-geogebra')[i];
    if (!api) return alert("Applet no listo");

    const cx = api.getXcoord("C");
    const cy = api.getYcoord("C");
    const dx = api.getXcoord("D");
    const dy = api.getYcoord("D");

    api.setFixed('C', true);
    api.setFixed('D', true);

    const A = pregunta.dataset.a.split(',').map(Number);
    const B = pregunta.dataset.b.split(',').map(Number);

    // Verificamos que C y D no sean el mismo punto
    const distCD = Math.hypot(cx - dx, cy - dy);
    if (distCD < 0.1) return false;

    // Propiedad de la mediatriz: sus puntos equidistan de A y B
    const distCA = Math.hypot(cx - A[0], cy - A[1]);
    const distCB = Math.hypot(cx - B[0], cy - B[1]);

    const distDA = Math.hypot(dx - A[0], dy - A[1]);
    const distDB = Math.hypot(dx - B[0], dy - B[1]);

    // Margen de error para la igualación
    if (Math.abs(distCA - distCB) < 0.1 && Math.abs(distDA - distDB) < 0.1) {
      return true;
    }
    api.evalCommand(`corr = PerpendicularBisector(A , B)`);
    api.evalCommand(`SetColor(corr, "green")`);
    api.setFixed('corr', true);
    api.setLabelVisible('corr', false);
    return false;
  };
}
