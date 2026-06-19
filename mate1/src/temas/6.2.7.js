//1.1.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
  return 'Área de triángulos - 3L';
}
export function tipo() {
  return 0
  /*
  0 - Opción múltiple
  1 - Abierto
  2 - Geogebra
  */
}
export async function pregunta(numeroPregunta) {
  try {
    return PP(numeroPregunta + 1)

  } catch (error) {
    console.error('Error loading r2p_core.js:', error);
  }
}

function genTriangulo() {
  let a, b, c;
  do {
    a = Math.floor(Math.random() * 20) + 5; // 5 a 25
    b = Math.floor(Math.random() * 20) + 5; // 5 a 25
    c = Math.floor(Math.random() * 20) + 5; // 5 a 25
  } while (a + b <= c + 3 || a + c <= b + 3 || b + c <= a + 3);
  return [a, b, c];

}

function PP(numeroPregunta) {
  function P1(numeroPregunta) {
    let [a, b, c] = genTriangulo();
    const angleA = Math.acos((b * b + c * c - a * a) / (2 * b * c));
    const area = 0.5 * b * c * Math.sin(angleA);

    let P = `<div class="pregunta" data-a="${a}" data-b="${b}" data-c="${c}">${numeroPregunta}.- Calcule el área de un triángulo cuyos lados miden ${a} cm, ${b} cm y ${c} cm.
              <div width="200" height="200" style="width=200px; height=200px;" id="applet_container_${numeroPregunta - 1}" class="ggb-container"></div></div>`



    var R = [];
    R[0] = `$${area.toPrecision(3)}$`

    for (var i = 1; i < 6; ++i) {
      do {
        R[i] = `$${((Math.random() * .4 + .8) * area).toPrecision(3)}$`
      } while (tlacu.pregunta.hayRepetidos(R))

    }
    return [P, R]
  }
  return P1(numeroPregunta)
}

export async function render(container, n, code) {
  console.log('Ejecutar render')
  const material_id = "zpp4kdej";
  window.ggbApps = [];
  console.log('n=', document.getElementsByClassName('ggb-container').length)
  const preguntas = document.getElementsByClassName('ggb-container');
  //Vamos a tomar la función de cada contenedor
  for (let i = 0; i < n; i++) {
    const params = {
      appName: 'classic',
      width: 600,
      height: 600,
      material_id,
      id: `applet_container_${i}`,
      appletOnLoad(api) {
        const a = preguntas[i].parentElement.getAttribute('data-a');
        const b = preguntas[i].parentElement.getAttribute('data-b');
        const c = preguntas[i].parentElement.getAttribute('data-c');
        const angleA = Math.acos((b * b + c * c - a * a) / (2 * b * c));

        window.ggbApps[i] = api;
        api.evalCommand(`A=(0,0)`);
        api.evalCommand(`=(${c},0)`);
        api.evalCommand(`C=(${b * Math.cos(angleA)}, ${b * Math.sin(angleA)})`);
        api.evalCommand(`P=Polygon(A,B,C)`);
        //api.setVisible(`P`, true);
        api.setLabelStyle(`P`, 2)
        api.setFixed(`P`, true)
        api.setVisible(`f`, false)
        api.setVisible(`A`, false)
        api.setVisible(`B`, false)
        api.setVisible(`C`, false)
        api.setLabelStyle(`a`, 2);
        api.setLabelStyle(`b`, 2);
        api.setLabelStyle(`c`, 2);
        //api.setLabelStyle(`PolyG`, 2);
        // Vamos a sacar el centroide
        const cx = c / 2;
        const cy = (b * Math.cos(angleA) - c) / (2 * Math.tan(angleA)) + b / 2 * Math.sin(angleA);
        //api.evalCommand(`Q=(${cx},${cy})`)



        const d = Math.sqrt((cx) ** 2 + (cy) ** 2)
        //api.evalCommand(`Circle(Q,${d})`)
        api.setCoordSystem(cx - 1.05 * d, cx + 1.05 * d, cy - 1.05 * d, cy + 1.05 * d);
        api.setGridVisible(false)
        api.setAxesVisible(1, false)
        api.setAxesVisible(0, false)


      }
    };
    new GGBApplet(params, true).inject(`applet_container_${i}`);
  }
  console.log('vamos a publicar la revisión')
  window.accionR2P = function (i) {
    const api = window.ggbApps[i];
    if (!api) return alert("Applet no listo");


  };
}

/**
 * Genera un entero aleatorio en un rango, opcionalmente excluyendo un valor.
 * @param {number} min - Mínimo inclusivo
 * @param {number} max - Máximo inclusivo
 * @param {number[]} [exclude=[]] - Array de números a excluir
 */
function randomInt(min, max, exclude = []) {
  let num;
  do {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (exclude.includes(num));
  return num;
}

