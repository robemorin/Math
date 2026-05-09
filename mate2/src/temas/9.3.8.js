import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
  return 'Ecuación de funciones sinusoidales a partir de su gráfica';
}

export function tipo() {
  return 2;
}

export async function pregunta(i, code) {
  try {
    return `
      <div class="pregunta-geogebra" style="display: none;">
        <p>${i + 1}.- Escriba la ecuación de la función mostrada en la gráfica, de la forma $f(x)=a \\cdot f(b x°) + c$, donde $f$ es seno o coseno. <span id="resultado_${i}" name="question"></span></p>
        <div id="applet_container_${i}" class="ggb-container"></div>
        <table>
          <tr><td>$f(x) =$ </td><td><math-field>\\sin(x°)</math-field></td></tr>
        </table>
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
      width: 800,
      height: 400,
      material_id,
      id: `ggbApplet_${i}`,

      appletOnLoad(api) {
        window.ggbApps[i] = api;
        api.setGraphicsOptions(1, {
          gridType: 0,
          gridDistance: { "x": 0.5, "y": 0.5 },
          gridIsAutomatic: false,
        });
        api.setAxisSteps(1, 1, 1);

        // Generar valores aleatorios
        let a = (Math.random() < 0.5 ? 1 : -1) * (Math.floor(Math.random() * 4) + 2);
        let periodo = 4 * Math.ceil(Math.random() * 30);
        let b = 360 / periodo;
        let c = (Math.random() < 0.5 ? 1 : -1) * Math.floor(Math.random() * 10) + 1;
        let funcType = Math.random() < 0.5 ? 'sin' : 'cos';
        //Configurar los ejes
        let tick = periodo / 4;

        api.setCoordSystem(- tick, 7 * tick, Math.min(-1, c - Math.abs(a) - 1), Math.max(1, c + Math.abs(a) + 1));
        api.setAxisSteps(1, tick, 1);
        api.setGraphicsOptions(1, {
          gridType: 0,
          gridDistance: { "x": tick / 2, "y": 1 },
          gridIsAutomatic: false,
        });
        // Guardar valores en GeoGebra en lugar de data-*
        api.setValue('varA', a);
        api.setValue('varB', b);
        api.setValue('varC', c);
        api.setValue('varType', funcType === 'sin' ? 1 : 2);

        // Crear la función
        api.evalCommand(`f(x) = ${a}*${funcType}(${b}*x°) + ${c}`);
        api.evalCommand(`SetColor(f, "Blue")`);
      }
    };
    new GGBApplet(params, true).inject(`applet_container_${i}`);
  }

  window.accionGeoGebra = function (i) {
    const api = window.ggbApps[i];
    let pregunta = document.getElementsByClassName('pregunta-geogebra')[i];
    const mathFields = pregunta.getElementsByTagName('math-field');

    if (!api) return alert("Applet no listo");

    let respuesta = mathFields[0].value;
    console.log(`respuesta: ${respuesta}`);

    // Parsear el string de MathLive (LaTeX) para que GeoGebra lo entienda
    // Solucionamos el problema de \frac{a}{b} y \degree
    let ggbExpr = respuesta
      .replace(/\\frac{([^{}]+)}{([^{}]+)}/g, '($1/$2)') // Convierte \frac{a}{b} en (a/b)
      .replace(/\\degree/g, '°') // Soporte para \degree
      .replace(/\\sin/g, 'sin')
      .replace(/\\cos/g, 'cos')
      .replace(/\\left\(/g, '(')
      .replace(/\\right\)/g, ')')
      .replace(/\\circ/g, '°')
      .replace(/\^\{\\circ\}/g, '°')
      .replace(/\\cdot/g, '*')
      .replace(/\\times/g, '*')
      .replace(/[{}]/g, '') // Elimina llaves residuales
      .replace(/\\,/g, ' ')
      .replace(/\s+/g, '');

    console.log(`ggbExpr intermedio: ${ggbExpr}`);

    // Convertir la x a grados (si no tiene ya el símbolo de grados) 
    // reemplazando 'x°' por 'x' temporalmente, y luego 'x' por '(x*pi/180)'
    // Agregamos un '*' antes del paréntesis para asegurar la multiplicación explícita en GeoGebra
    ggbExpr = ggbExpr.replace(/x°/g, 'x').replace(/x/g, '*(x*pi/180)');
    // Si quedó algo como 'sin*(x*pi/180)', lo corregimos a 'sin(x*pi/180)'
    ggbExpr = ggbExpr.replace(/sin\*/g, 'sin').replace(/cos\*/g, 'cos');
    // Si quedó algo como '(*', corregimos
    ggbExpr = ggbExpr.replace(/\(\*/g, '(');

    console.log(`ggbExpr final para GeoGebra: ${ggbExpr}`);

    // Evaluar la función del estudiante
    api.evalCommand(`g(x) = ${ggbExpr}`);

    // Validar comparando la función f (original) con g (estudiante) en varios puntos
    let isCorrect = true;
    for (let it = 0; it < 9; ++it) {
      const x = Math.random() * 10 - 5;
      const fx = api.getValue(`f(${x})`);
      const gx = api.getValue(`g(${x})`);
      if (isNaN(gx) || Math.abs(fx - gx) > 0.1) {
        isCorrect = false;
        break;
      }
    }

    if (!isCorrect) {
      mathFields[0].style.border = "solid 5px red";
      api.evalCommand(`SetColor(g, "Red")`);
      //hacer que g sea conj uyna linea dashed
      api.setLineStyle("g", 2);
      return false;
    } else {
      mathFields[0].style.border = "solid 5px green";
      api.setVisible('g', false);
      return true;
    }
  };
}
