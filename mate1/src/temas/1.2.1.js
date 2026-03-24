import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import { desencriptar, encriptar, generarCodigo } from '../r2p_core.js'

export function name() {
  return 'Gráfica de la línea en forma general';
}

export function tipo() {
  return 2;
}

function gcd(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    let t = y;
    y = x % y;
    x = t;
  }
  return x;
}

function tempEcLineGeneral(A, B, C) {
  let cadena = "";
  if (A === 1) cadena += "x";
  else if (A > 1) cadena += A + "x";

  if (B === 1) cadena += "+y";
  else if (B === -1) cadena += "-y";
  else if (B > 1) cadena += "+" + B + "y";
  else if (B < -1) cadena += B + "y";

  if (C > 0) cadena += "+" + C;
  else if (C < 0) cadena += C;

  return cadena + "=0";
}

export async function pregunta(i, code) {
  try {
    let A = [Math.ceil(Math.random() * 10 - 5), Math.ceil(Math.random() * 10 - 5)], B;
    do {
      B = [Math.ceil(Math.random() * 10 - 5), Math.ceil(Math.random() * 10 - 5)]
    } while ((A[0] == B[0]) || (A[1] == B[1]))

    let dy = B[1] - A[1];
    let dx = B[0] - A[0];

    let a = dy;
    let b = -dx;
    let c = dx * A[1] - dy * A[0];

    if (a < 0) {
      a = -a;
      b = -b;
      c = -c;
    }

    let divisor = gcd(gcd(a, b), c);
    a = a / divisor;
    b = b / divisor;
    c = c / divisor;

    const linea = tempEcLineGeneral(a, b, c);

    return `
      <div class="pregunta-geogebra"  data-a="${A}" data-b="${B}" style="display: none;">
        <p>${i + 1}.- Mueva los puntos $A$ y $B$ para obtener la gráfica de la línea $${linea}$. <span id="resultado_${i}" name="question"></span></p>
        <div id="applet_container_${i}" class="ggb-container"></div>
      </div>
    `;
  } catch (error) {
    console.error('Error al carga la pregunta:', error);
  }
}

export async function renderGeoGebra(container, n, code) {
  const material_id = "svwd7yrm";
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
      }
    };
    new GGBApplet(params, true).inject(`applet_container_${i}`);
  }

  // 🔁 Registrar función específica del tema
  window.accionGeoGebra = function (i) {
    const api = window.ggbApps[i];
    let pregunta = document.getElementsByClassName('pregunta-geogebra')[i]
    if (!api) return alert("Applet no listo");

    const ax = api.getXcoord("A")
    const ay = api.getYcoord("A")
    const bx = api.getXcoord("B")
    const by = api.getYcoord("B")
    api.setFixed('A', true);
    api.setFixed('B', true);

    const A = pregunta.dataset.a.split(',').map(Number)
    const B = pregunta.dataset.b.split(',').map(Number)
    let m = (B[1] - A[1]) / (B[0] - A[0])
    let b = B[1] - m * B[0]

    if (ax != bx && Math.abs(ay - (m * ax + b)) < 0.01 && Math.abs(by - (m * bx + b)) < 0.01) return true
    return false

  };
}
