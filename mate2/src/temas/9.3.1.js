import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Funciones sinusoidales a partir de gráfica';
}

export function tipo() {
  return 0; // 0 - Opción múltiple
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
    let a = randomInt(-5, 5, [0]);
    let b = randomInt(1, 4);
    let c = randomInt(-5, 5);
    let funcType = Math.random() < 0.5 ? 'sin' : 'cos';

    // Función para Geogebra (usamos pi/180 para que el eje x represente grados)
    let geogebraExpr = `f(x) = ${a}*${funcType}(${b}*x*pi/180) ${c >= 0 ? '+' : ''} ${c}`;

    let target = randomInt(1, 3); // 1 para 'a', 2 para 'b', 3 para 'c'
    let targetName = target === 1 ? 'a' : (target === 2 ? 'b' : 'c');
    let targetValue = target === 1 ? a : (target === 2 ? b : c);

    let funcLatex = `y = a \\${funcType}(b x^\\circ) + c`;

    let P = `<div class="pregunta" data-f="${geogebraExpr}">${numeroPregunta + 1}.- La siguiente gráfica corresponde a una función de la forma $${funcLatex}$. Determina el valor de $${targetName}$.
    <div id="applet_container_${numeroPregunta}" class="ggb-container"></div></div>`;

    let R = [];
    R[0] = `$${targetName} = ${targetValue}$`;

    // Generar distractores
    for (let i = 1; i < 6; ++i) {
      do {
        let val;
        if (target === 1) { // a
          val = randomInt(-8, 8, [0]);
        } else if (target === 2) { // b
          val = randomInt(1, 8);
        } else { // c
          val = randomInt(-8, 8);
        }
        R[i] = `$${targetName} = ${val}$`;
      } while (tlacu.pregunta.hayRepetidos(R));
    }

    return [P, R];

  } catch (error) {
    console.error('Error al generar pregunta 9.3.1:', error);
  }
}

export async function render(container, n, code) {
  const material_id = "uaxkzmpb"; // Usamos el mismo material base que en el 4.3.1
  window.ggbApps = window.ggbApps || [];
  const preguntas = document.getElementsByClassName('ggb-container');

  for (let i = 0; i < n; i++) {
    const params = {
      appName: 'classic',
      width: 600,
      height: 450,
      material_id,
      id: `applet_container_${i}`,
      appletOnLoad(api) {
        api.setAxisSteps(1, 45, 1, 1)
        api.setGraphicsOptions(1, {
          gridType: 0,                    // 0 = cuadrícula cartesiana
          gridDistance: { "x": 15, "y": 1 },     //  funciona
          gridIsAutomatic: false,         // si funciona
        });
        const latexXpression = preguntas[i].parentElement.getAttribute('data-f');
        window.ggbApps[i] = api;
        api.evalCommand(latexXpression);

        // Ajustamos la vista para que el eje X abarque al menos un periodo (360 grados)
        api.evalCommand("ZoomIn(-90, -12, 450, 12)");
        preguntas[i].parentElement.dataset.f = ':)';
      }
    };
    new GGBApplet(params, true).inject(`applet_container_${i}`);
  }
}
