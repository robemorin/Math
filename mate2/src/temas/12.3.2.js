import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
  return "Propiedades de f a partir de sus derivadas";
}

export function tipo() {
  return 0; // Opción múltiple
}

export async function pregunta(numeroPregunta) {
  try {
    // Dimensiones del plano SVG
    const width = 240;
    const height = 180;
    const xMin = -5;
    const xMax = 5;
    const yMin = -6;
    const yMax = 6;

    // Proyecciones cartesianas a coordenadas de pantalla (SVG)
    const toSvgX = (x) => ((x - xMin) / (xMax - xMin)) * width;
    const toSvgY = (y) => height - ((y - yMin) / (yMax - yMin)) * height;

    const origX = toSvgX(0);
    const origY = toSvgY(0);

    // Generador de plano cartesiano con etiquetas numéricas
    function generarEjesSVG() {
      let gridLines = '';
      let marcas = '';
      let etiquetas = '';

      // Cuadrícula y marcas en X
      for (let x = -4; x <= 4; x++) {
        if (x === 0) continue;
        const sx = toSvgX(x);
        gridLines += `<line x1="${sx}" y1="0" x2="${sx}" y2="${height}" stroke="#ebebeb" stroke-width="1" />`;
        marcas += `<line x1="${sx}" y1="${origY - 3}" x2="${sx}" y2="${origY + 3}" stroke="#555" stroke-width="1.2" />`;
        etiquetas += `<text x="${sx}" y="${origY + 12}" font-size="9" fill="#555" text-anchor="middle" font-family="sans-serif">${x}</text>`;
      }

      // Cuadrícula y marcas en Y
      for (let y = -4; y <= 4; y += 2) {
        if (y === 0) continue;
        const sy = toSvgY(y);
        gridLines += `<line x1="0" y1="${sy}" x2="${width}" y2="${sy}" stroke="#ebebeb" stroke-width="1" />`;
        marcas += `<line x1="${origX - 3}" y1="${sy}" x2="${origX + 3}" y2="${sy}" stroke="#555" stroke-width="1.2" />`;
        etiquetas += `<text x="${origX - 5}" y="${sy + 3}" font-size="8" fill="#555" text-anchor="end" font-family="sans-serif">${y}</text>`;
      }

      return `
        <!-- Cuadrícula -->
        ${gridLines}
        <!-- Ejes -->
        <line x1="0" y1="${origY}" x2="${width}" y2="${origY}" stroke="#333" stroke-width="1.5" />
        <line x1="${origX}" y1="0" x2="${origX}" y2="${height}" stroke="#333" stroke-width="1.5" />
        <!-- Flechas de ejes -->
        <polygon points="${width},${origY} ${width-5},${origY-3} ${width-5},${origY+3}" fill="#333" />
        <polygon points="${origX},0 ${origX-3},5 ${origX+3},5" fill="#333" />
        <text x="${width - 8}" y="${origY - 5}" font-size="10" font-style="italic" fill="#333" font-family="serif">x</text>
        <text x="${origX + 6}" y="10" font-size="10" font-style="italic" fill="#333" font-family="serif">y</text>
        <!-- Marcas y números -->
        ${marcas}
        ${etiquetas}
      `;
    }

    // Convertir una función matemática a puntos SVG
    function graficarCurva(fn, color = '#2980b9') {
      const pasos = 90;
      let d = '';
      let primerPunto = true;

      for (let i = 0; i <= pasos; i++) {
        const x = xMin + (i / pasos) * (xMax - xMin);
        let y = fn(x);

        if (isNaN(y) || !isFinite(y)) {
          primerPunto = true;
          continue;
        }

        // Limitar en rango visual para evitar desbordes
        const cy = Math.max(yMin - 3, Math.min(yMax + 3, y));
        const sx = toSvgX(x).toFixed(1);
        const sy = toSvgY(cy).toFixed(1);

        if (primerPunto) {
          d += `M ${sx} ${sy} `;
          primerPunto = false;
        } else {
          d += `L ${sx} ${sy} `;
        }
      }

      return `
        <svg style="border: 1px solid #ddd; background-color: #fafbfc; border-radius: 6px; display: block; margin: 4px auto;" width="${width}px" height="${height}px">
          ${generarEjesSVG()}
          <path d="${d}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `;
    }

    // Configuración aleatoria de parámetros
    // Elegimos dos valores enteros distintos a < b entre -3 y 3
    const posiblesValores = [-3, -2, -1, 0, 1, 2, 3];
    let idxA = Math.floor(Math.random() * (posiblesValores.length - 2));
    let idxB = idxA + 1 + Math.floor(Math.random() * (posiblesValores.length - idxA - 1));

    // Asegurar diferencia de al menos 2 para buena claridad visual
    if (posiblesValores[idxB] - posiblesValores[idxA] < 2) {
      if (idxB < posiblesValores.length - 1) idxB++;
      else if (idxA > 0) idxA--;
    }

    const a = posiblesValores[idxA];
    const b = posiblesValores[idxB];
    const c = (a + b) / 2; // Punto de inflexión en el punto medio
    const cStr = Number.isInteger(c) ? `${c}` : (a + b) % 2 === 0 ? `${(a+b)/2}` : `\\frac{${a+b}}{2}`;

    // Tipo de configuración:
    // tipoConfig = 0: Máximo en a, Mínimo en b (k > 0)
    // tipoConfig = 1: Mínimo en a, Máximo en b (k < 0)
    const tipoConfig = Math.random() < 0.5 ? 0 : 1;

    // Función base cúbica: f'(x) = k*(x-a)*(x-b)
    // Si tipoConfig == 0 (máx en a, mín en b): f'(x) > 0 para x < a y x > b, f'(x) < 0 para a < x < b
    // Entonces k > 0. Por tanto f''(x) = k*(2x - (a+b)). Para x > c, f''(x) > 0.
    // Si tipoConfig == 1 (mín en a, máx en b): f'(x) < 0 para x < a y x > b, f'(x) > 0 para a < x < b
    // Entonces k < 0. Para x > c, f''(x) < 0.

    let fCorrecta;

    // Factor de escala para que la cúbica quede bien encuadrada entre -5 y 5
    const span = b - a;
    const factorK = 8 / (span * span * span + 6); // escala adaptada
    const signK = tipoConfig === 0 ? 1 : -1;
    const k = signK * factorK;

    // f(x) = k * ( x^3/3 - (a+b)/2 * x^2 + a*b*x ) + C
    // Centramos verticalmente en y = 0 en el punto medio c
    const fMid = k * ((c**3)/3 - ((a+b)/2)*(c**2) + a*b*c);
    fCorrecta = (x) => k * ((x**3)/3 - ((a+b)/2)*(x**2) + a*b*x) - fMid;

    // Condiciones analíticas de la función que se solicitan
    let condicionesTexto = [];
    if (tipoConfig === 0) {
      condicionesTexto = [
        `$f'(${a}) = 0$ y $f'(${b}) = 0$`,
        `$f'(x) > 0$ para $x < ${a}$ y para $x > ${b}$`,
        `$f'(x) < 0$ para $${a} < x < ${b}$`,
        `$f''(x) < 0$ para $x < ${cStr}$ (cóncava hacia abajo)`,
        `$f''(x) > 0$ para $x > ${cStr}$ (cóncava hacia arriba)`
      ];
    } else {
      condicionesTexto = [
        `$f'(${a}) = 0$ y $f'(${b}) = 0$`,
        `$f'(x) < 0$ para $x < ${a}$ y para $x > ${b}$`,
        `$f'(x) > 0$ para $${a} < x < ${b}$`,
        `$f''(x) > 0$ para $x < ${cStr}$ (cóncava hacia arriba)`,
        `$f''(x) < 0$ para $x > ${cStr}$ (cóncava hacia abajo)`
      ];
    }

    // Construcción de la pregunta con las condiciones visibles al inicio
    const P = `
      <p>${numeroPregunta + 1}.- Sea $f$ una función continua y derivable en $\\mathbb{R}$ que satisface:</p>
      <div style="background:#f8f9fa; border: 1px solid #e2e8f0; border-left: 5px solid #2980b9; padding: 12px 20px; margin: 10px 0 14px 0; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); font-size: 1.02em; line-height: 1.75;">
        <ul style="margin: 0; padding-left: 20px;">
          ${condicionesTexto.map(c => `<li style="margin-bottom: 3px;">${c}</li>`).join('')}
        </ul>
      </div>
      <p>La gráfica de $y = f(x)$ correspondiente es:</p>
    `;

    // Empaquetador responsive: gráfica a la izquierda y la lista de condiciones a la derecha
    function empaquetarOpcion(svgGrafica) {
      const itemsHtml = condicionesTexto.map(c => `<li style="margin-bottom: 2px;">${c}</li>`).join('');
      return `
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 12px; padding: 6px; width: 100%; box-sizing: border-box;">
          <div style="flex: 0 0 auto;">
            ${svgGrafica}
          </div>
          <div style="flex: 1 1 210px; min-width: 200px; font-size: 0.9em; line-height: 1.45; text-align: left; background: #fafbfc; border-left: 3px solid #2980b9; padding: 8px 12px; border-radius: 4px; box-sizing: border-box;">
            <b style="color: #2c3e50; display: block; margin-bottom: 4px; font-size: 0.95em;">Condiciones requeridas:</b>
            <ul style="margin: 0; padding-left: 18px;">
              ${itemsHtml}
            </ul>
          </div>
        </div>
      `;
    }

    // Generar opciones y distractores bien diferenciados
    // Distractor 1: Invertida verticalmente (signo opuesto)
    const fDist1 = (x) => -fCorrecta(x);

    // Distractor 2: Desplazada horizontalmente a la derecha (+2)
    const fDist2 = (x) => fCorrecta(x - 2);

    // Distractor 3: Desplazada horizontalmente a la izquierda (-2)
    const fDist3 = (x) => fCorrecta(x + 2);

    // Distractor 4: Parábola cuadrática (un único extremo relativo)
    const fDist4 = (x) => {
      const dir = tipoConfig === 0 ? -1 : 1;
      return dir * 0.45 * Math.pow(x - c, 2) + (tipoConfig === 0 ? 3 : -3);
    };

    // Distractor 5: Función cúbica monótona sin extremos
    const fDist5 = (x) => {
      const dir = tipoConfig === 0 ? 1 : -1;
      return dir * (0.08 * Math.pow(x - c, 3) + 0.6 * (x - c));
    };

    const R = [
      empaquetarOpcion(graficarCurva(fCorrecta)), // R[0]: Correcta
      empaquetarOpcion(graficarCurva(fDist1)),    // R[1]: Invertida
      empaquetarOpcion(graficarCurva(fDist2)),    // R[2]: Desplazada +2
      empaquetarOpcion(graficarCurva(fDist3)),    // R[3]: Desplazada -2
      empaquetarOpcion(graficarCurva(fDist4)),    // R[4]: Cuadrática
      empaquetarOpcion(graficarCurva(fDist5))     // R[5]: Cúbica monótona
    ];

    return [P, R];

  } catch (error) {
    console.error('Error al generar la pregunta 12.3.2:', error);
    return ["Error al generar pregunta.", ["", "", "", "", "", ""]];
  }
}
