//Transformaciones de funciones a trozos
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Transformaciones de funciones II';
}
export function tipo(){
  return 0
  /*
  0 - Opción múltiple
  1 - Abierto
  2 - Geogebra
  */
}
export async function pregunta(numeroPregunta) { 
  try {
    return PP(numeroPregunta+1)
  } catch (error) {
    console.error('Error loading r2p_core.js:', error);
  }
}

function PP(numeroPregunta){
  function P1(numeroPregunta){
    // Generar función base a trozos
    let f = generarFuncion_Prob1();
    
    // Seleccionar una transformación aleatoria
    let trans = generarTransformacion();
    
    // Aplicar la transformación
    let g = aplicarTransformacionATrozos(f, trans);
    
    console.log('Función base:', f);
    console.log('Transformación:', trans);
    console.log('Función transformada:', g);
    
    let P = `<div class="pregunta" data-f="${f.geogebra}" data-g="${g.geogebra}">
    ${numeroPregunta}.- La gráfica azul representa la función $f(x)$ y la gráfica roja representa la función $g(x)$. Exprese a $g(x)$ en términos de  $f(x)$:
    <div id="applet_container_${numeroPregunta-1}" class="ggb-container"></div></div>`;
    
    var R = [];
    // Respuesta correcta
    R[0] = `$g(x) = ${trans.latex}$`;

    // Generar 5 opciones incorrectas
    for(var i = 1; i < 6; ++i){
      do{
        let transTemp = generarTransformacion();
        R[i] = `$g(x) = ${transTemp.latex}$`;
      } while(tlacu.pregunta.hayRepetidos(R))
    }
    return [P, R];
  }
  return P1(numeroPregunta);
}

export async function render(container, n, code) {
  console.log('Ejecutar render');
  const material_id = "bczvfa7b";
  window.ggbApps = [];
  
  const preguntas = document.getElementsByClassName('ggb-container');

  for (let i = 0; i < n; i++) {
    const params = {
      appName: 'classic',
      width: 600,
      height: 600,
      material_id,
      id: `applet_container_${i}`,
      appletOnLoad(api) {
        const funcionBase = preguntas[i].parentElement.getAttribute('data-f');
        const funcionTransformada = preguntas[i].parentElement.getAttribute('data-g');
        preguntas[i].parentElement.setAttribute('data-f', "");
        preguntas[i].parentElement.setAttribute('data-g', "");
        window.ggbApps[i] = api;
        
        // Función base f(x) en azul
        api.evalCommand(funcionBase);
        api.setColor('f', 0, 0, 255); // Azul
        api.setLineThickness('f', 3);
        
        // Función transformada g(x) en rojo
        api.evalCommand(funcionTransformada);
        api.setColor('g', 255, 0, 0); // Rojo
        api.setLineThickness('g', 3);
      }
    };
    new GGBApplet(params, true).inject(`applet_container_${i}`);
  }
}

/**
 * Genera un entero aleatorio en un rango, opcionalmente excluyendo un valor.
 */
function randomInt(min, max, exclude = []) {
  let num;
  do {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (exclude.includes(num));
  return num;
}

/**
 * Selecciona un elemento aleatorio de un array
 */
function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Genera una pieza de función aleatoria (lineal, cuadrática o constante).
 */
function generarTrozos(xmin, xmax) {
  const tipo = randomInt(1, 3);
  let a, b, c, h, k;
  let latex, geogebra, callable;

  switch (tipo) {
    case 1: // Lineal: ax + b
      a = randomInt(-3, 3, [0]);
      b = (a < 0 ? 1 : -1) * randomInt(0, 5) - a * xmin;
      
      latex = `${a}x ${b < 0 ? '' : '+'} ${b}`;
      geogebra = `${a}*x ${b < 0 ? '' : '+'} ${b}`;
      callable = (x) => a * x + b;
      break;

    case 2: // Constante: c
      c = randomInt(-5, 5);
      
      latex = `${c}`;
      geogebra = `${c}`;
      callable = (x) => c;
      break;

    case 3: // Cuadrática: a(x-h)^2 + k
      a = randomInt(-2, 2, [0]);
      h = randomInt(xmin, xmax);
      k = (a < 0 ? 1 : -1) * randomInt(0, 5);
      
      // LaTeX
      if (h === 0) {
        latex = `${a}x^2 ${k > 0 ? '+' : ''} ${k === 0 ? '' : k}`;
      } else {
        latex = `${a}(x ${h > 0 ? '-' : '+'} ${Math.abs(h)})^2 ${k > 0 ? '+' : ''} ${k === 0 ? '' : k}`;
      }
      
      // GeoGebra
      if (h === 0) {
        geogebra = `${a}*x^2 ${k > 0 ? '+' : ''} ${k === 0 ? '' : k}`;
      } else {
        geogebra = `${a}*(x ${h > 0 ? '-' : '+'} ${Math.abs(h)})^2 ${k > 0 ? '+' : ''} ${k === 0 ? '' : k}`;
      }
      
      callable = (x) => a * Math.pow(x - h, 2) + k;
      break;
  }

  return { latex, geogebra, callable };
}

/**
 * Genera una función a trozos de 3 partes.
 */
function generarFuncion_Prob1() {
  let bp1 = randomInt(-3, 0);
  let bp2 = randomInt(1, 4);

  let f1 = generarTrozos(-5, bp1);
  let f2 = generarTrozos(bp1, bp2);
  let f3 = generarTrozos(bp2, 5);

  // LaTeX
  let latex = `f(x) = \\begin{cases} ${f1.latex} & \\text{si } x \\le ${bp1} \\\\ ${f2.latex} & \\text{si } ${bp1} < x \\le ${bp2} \\\\ ${f3.latex} & \\text{si } x > ${bp2} \\end{cases}`;

  // GeoGebra (usa If anidados)
  let geogebra = `f(x) = If(x <= ${bp1}, ${f1.geogebra}, If(x <= ${bp2}, ${f2.geogebra}, ${f3.geogebra}))`;

  // Función callable
  let callable = (x) => {
    if (x <= bp1) return f1.callable(x);
    if (x > bp1 && x <= bp2) return f2.callable(x);
    if (x > bp2) return f3.callable(x);
  };

  return { latex, geogebra, callable, bp1, bp2 };
}

/**
 * Genera una transformación aleatoria (formato simbólico)
 * @returns {object} - {tipo, valor, latex, descripcion}
 */
function generarTransformacion() {
  const tipos = ['traslacion_x', 'traslacion_y', 'escalamiento_x', 'escalamiento_y'];
  const tipo = randomChoice(tipos);
  
  let valor, latex, descripcion;

  switch (tipo) {
    case 'traslacion_x':
      // f(x + h) o f(x - h)
      valor = randomChoice([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]);
      if (valor > 0) {
        latex = `f(x - ${valor})`;
      } else {
        latex = `f(x + ${Math.abs(valor)})`;
      }
      descripcion = `Traslación horizontal`;
      break;

    case 'traslacion_y':
      // f(x) + k
      valor = randomChoice([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]);
      if (valor > 0) {
        latex = `f(x) + ${valor}`;
      } else {
        latex = `f(x) - ${Math.abs(valor)}`;
      }
      descripcion = `Traslación vertical`;
      break;

    case 'escalamiento_x':
      // f(ax) o f(x/a)
      const factores_x = [3, 2, 1/2, 1/3, -1, -2, -3, -1/2, -1/3];
      valor = randomChoice(factores_x);
      
      if (valor === 1/2) {
        latex = `f(2x)`;
      } else if (valor === 1/3) {
        latex = `f(3x)`;
      } else if (valor === 2) {
        latex = `f(\\frac{x}{2})`;
      } else if (valor === 3) {
        latex = `f(\\frac{x}{3})`;
      } else if (valor === -1) {
        latex = `f(-x)`;
      } else if (valor === -2) {
        latex = `f(-\\frac{x}{2})`;
      } else if (valor === -3) {
        latex = `f(-\\frac{x}{3})`;
      } else if (valor === -1/2) {
        latex = `f(-2x)`;
      } else if (valor === -1/3) {
        latex = `f(-3x)`;
      }
      descripcion = `Escalamiento/Reflexión horizontal`;
      break;

    case 'escalamiento_y':
      // a*f(x)
      const factores_y = [3, 2, 1/2, 1/3, -1, -2, -3, -1/2, -1/3];
      valor = randomChoice(factores_y);
      
      if (valor === 1/2) {
        latex = `\\frac{1}{2}f(x)`;
      } else if (valor === 1/3) {
        latex = `\\frac{1}{3}f(x)`;
      } else if (valor === -1/2) {
        latex = `-\\frac{1}{2}f(x)`;
      } else if (valor === -1/3) {
        latex = `-\\frac{1}{3}f(x)`;
      } else if (valor < 0) {
        latex = `${valor}f(x)`;
      } else {
        latex = `${valor}f(x)`;
      }
      descripcion = `Escalamiento/Reflexión vertical`;
      break;
  }

  return { tipo, valor, latex, descripcion };
}

/**
 * Aplica una transformación a una función a trozos
 */
function aplicarTransformacionATrozos(funcion, transformacion) {
  const { tipo, valor } = transformacion;
  const { bp1, bp2 } = funcion;
  
  let geogebra_expr;
  
  // Extraer las expresiones de cada trozo de la función original
  const regex = /If\(x <= ([-\d]+), (.+?), If\(x <= ([-\d]+), (.+?), (.+?)\)\)/;
  const match = funcion.geogebra.match(regex);
  
  if (!match) {
    console.error('No se pudo parsear la función');
    return funcion;
  }
  
  const expr1 = match[2];
  const expr2 = match[4];
  const expr3 = match[5];
  
  switch (tipo) {
    case 'traslacion_x':
      // g(x) = f(x - h) -> sustituir x por (x - h)
      const h = valor;
      const nuevoBp1 = bp1 + h;
      const nuevoBp2 = bp2 + h;
      
      const expr1_tx = expr1.replace(/x/g, `(x - ${h})`);
      const expr2_tx = expr2.replace(/x/g, `(x - ${h})`);
      const expr3_tx = expr3.replace(/x/g, `(x - ${h})`);
      
      geogebra_expr = `g(x) = If(x <= ${nuevoBp1}, ${expr1_tx}, If(x <= ${nuevoBp2}, ${expr2_tx}, ${expr3_tx}))`;
      break;

    case 'traslacion_y':
      // g(x) = f(x) + k -> sumar k a cada expresión
      const k = valor;
      const expr1_ty = `(${expr1}) + ${k}`;
      const expr2_ty = `(${expr2}) + ${k}`;
      const expr3_ty = `(${expr3}) + ${k}`;
      
      geogebra_expr = `g(x) = If(x <= ${bp1}, ${expr1_ty}, If(x <= ${bp2}, ${expr2_ty}, ${expr3_ty}))`;
      break;

    case 'escalamiento_x':
      // g(x) = f(ax) o f(x/a) -> sustituir x por ax o x/a
      let factor_x = valor;
      let nuevoBp1_ex, nuevoBp2_ex, expr1_ex, expr2_ex, expr3_ex;
      
      if (valor === 1/2) {
        // f(2x)
        nuevoBp1_ex = bp1 / 2;
        nuevoBp2_ex = bp2 / 2;
        expr1_ex = expr1.replace(/x/g, `(2*x)`);
        expr2_ex = expr2.replace(/x/g, `(2*x)`);
        expr3_ex = expr3.replace(/x/g, `(2*x)`);
      } else if (valor === 1/3) {
        // f(3x)
        nuevoBp1_ex = bp1 / 3;
        nuevoBp2_ex = bp2 / 3;
        expr1_ex = expr1.replace(/x/g, `(3*x)`);
        expr2_ex = expr2.replace(/x/g, `(3*x)`);
        expr3_ex = expr3.replace(/x/g, `(3*x)`);
      } else if (valor === 2) {
        // f(x/2)
        nuevoBp1_ex = bp1 * 2;
        nuevoBp2_ex = bp2 * 2;
        expr1_ex = expr1.replace(/x/g, `(x/2)`);
        expr2_ex = expr2.replace(/x/g, `(x/2)`);
        expr3_ex = expr3.replace(/x/g, `(x/2)`);
      } else if (valor === 3) {
        // f(x/3)
        nuevoBp1_ex = bp1 * 3;
        nuevoBp2_ex = bp2 * 3;
        expr1_ex = expr1.replace(/x/g, `(x/3)`);
        expr2_ex = expr2.replace(/x/g, `(x/3)`);
        expr3_ex = expr3.replace(/x/g, `(x/3)`);
      } else if (valor === -1) {
        // f(-x) - Reflexión sobre el eje y
        nuevoBp1_ex = -bp2;
        nuevoBp2_ex = -bp1;
        expr1_ex = expr3.replace(/x/g, `(-x)`);
        expr2_ex = expr2.replace(/x/g, `(-x)`);
        expr3_ex = expr1.replace(/x/g, `(-x)`);
      } else if (valor === -2) {
        // f(-x/2)
        nuevoBp1_ex = -bp2 * 2;
        nuevoBp2_ex = -bp1 * 2;
        expr1_ex = expr3.replace(/x/g, `(-x/2)`);
        expr2_ex = expr2.replace(/x/g, `(-x/2)`);
        expr3_ex = expr1.replace(/x/g, `(-x/2)`);
      } else if (valor === -3) {
        // f(-x/3)
        nuevoBp1_ex = -bp2 * 3;
        nuevoBp2_ex = -bp1 * 3;
        expr1_ex = expr3.replace(/x/g, `(-x/3)`);
        expr2_ex = expr2.replace(/x/g, `(-x/3)`);
        expr3_ex = expr1.replace(/x/g, `(-x/3)`);
      } else if (valor === -1/2) {
        // f(-2x)
        nuevoBp1_ex = -bp2 / 2;
        nuevoBp2_ex = -bp1 / 2;
        expr1_ex = expr3.replace(/x/g, `(-2*x)`);
        expr2_ex = expr2.replace(/x/g, `(-2*x)`);
        expr3_ex = expr1.replace(/x/g, `(-2*x)`);
      } else if (valor === -1/3) {
        // f(-3x)
        nuevoBp1_ex = -bp2 / 3;
        nuevoBp2_ex = -bp1 / 3;
        expr1_ex = expr3.replace(/x/g, `(-3*x)`);
        expr2_ex = expr2.replace(/x/g, `(-3*x)`);
        expr3_ex = expr1.replace(/x/g, `(-3*x)`);
      }
      
      geogebra_expr = `g(x) = If(x <= ${nuevoBp1_ex}, ${expr1_ex}, If(x <= ${nuevoBp2_ex}, ${expr2_ex}, ${expr3_ex}))`;
      break;

    case 'escalamiento_y':
      // g(x) = a*f(x) -> multiplicar cada expresión por a
      const a = valor;
      let expr1_ey, expr2_ey, expr3_ey;
      
      if (valor === 1/2) {
        expr1_ey = `(1/2)*(${expr1})`;
        expr2_ey = `(1/2)*(${expr2})`;
        expr3_ey = `(1/2)*(${expr3})`;
      } else if (valor === 1/3) {
        expr1_ey = `(1/3)*(${expr1})`;
        expr2_ey = `(1/3)*(${expr2})`;
        expr3_ey = `(1/3)*(${expr3})`;
      } else if (valor === -1/2) {
        expr1_ey = `(-1/2)*(${expr1})`;
        expr2_ey = `(-1/2)*(${expr2})`;
        expr3_ey = `(-1/2)*(${expr3})`;
      } else if (valor === -1/3) {
        expr1_ey = `(-1/3)*(${expr1})`;
        expr2_ey = `(-1/3)*(${expr2})`;
        expr3_ey = `(-1/3)*(${expr3})`;
      } else {
        expr1_ey = `${a}*(${expr1})`;
        expr2_ey = `${a}*(${expr2})`;
        expr3_ey = `${a}*(${expr3})`;
      }
      
      geogebra_expr = `g(x) = If(x <= ${bp1}, ${expr1_ey}, If(x <= ${bp2}, ${expr2_ey}, ${expr3_ey}))`;
      break;
  }
  
  return { geogebra: geogebra_expr };
}