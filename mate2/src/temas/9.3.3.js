import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Periodo y frecuencia a partir de gráfica';
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
    let a = randomInt(1, 5); // Amplitud positiva para facilitar la lectura
    let b = randomInt(1, 12); // Número de ciclos en 360 grados
    let c = randomInt(-3, 3);
    let funcType = Math.random() < 0.5 ? 'sin' : 'cos';

    // Función para Geogebra (usamos pi/180 para que el eje x represente grados)
    let geogebraExpr = `f(x) = ${a}*${funcType}(${b}*x*pi/180) ${c >= 0 ? '+' : ''} ${c}`;

    // Decidimos aleatoriamente si preguntamos por el periodo o la frecuencia
    let pOrF = Math.random() < 0.5 ? 'periodo' : 'frecuencia';

    let P = `<div class="pregunta" data-f="${geogebraExpr}">${numeroPregunta + 1}.- La siguiente gráfica corresponde a una función sinusoidal. Determina su ${pOrF}.
    <div id="applet_container_${numeroPregunta}" class="ggb-container"></div></div>`;

    let R = [];

    // Cálculo de la respuesta correcta usando tlacu.fraccion
    if (pOrF === 'periodo') {
      let perStr = tlacu.fraccion(360, b);
      R[0] = `$${perStr}^\\circ$`;
    } else {
      R[0] = `$${b}$`;
    }

    // Generar distractores
    for (let i = 1; i < 6; ++i) {
      do {
        let valB = randomInt(1, 24, [b]);
        if (pOrF === 'periodo') {
          let perStr = tlacu.fraccion(360, valB);
          R[i] = `$${perStr}^\\circ$`;
        } else {
          R[i] = `$${valB}$`;
        }
      } while (tlacu.pregunta.hayRepetidos(R));
    }

    return [P, R];

  } catch (error) {
    console.error('Error al generar pregunta 9.3.3:', error);
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
      height: 450,
      material_id,
      id: `applet_container_${i}`,
      appletOnLoad(api) {
        const latexXpression = preguntas[i].parentElement.getAttribute('data-f');
        window.ggbApps[i] = api;
        api.evalCommand(latexXpression);

        // Ajustamos la vista para que se pueda apreciar de 0 a 360 con claridad
        api.evalCommand("ZoomIn(-90, -12, 450, 12)");

        // Ocultamos la función para evitar exponer la respuesta
        preguntas[i].parentElement.dataset.f = ':)';
      }
    };
    new GGBApplet(params, true).inject(`applet_container_${i}`);
  }
}
