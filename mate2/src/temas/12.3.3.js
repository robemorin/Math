import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
  return "Descripción del comportamiento a partir de la gráfica";
}

export function tipo() {
  return 0; // Opción múltiple
}

export async function pregunta(numeroPregunta) {
  try {
    // Dimensiones del plano SVG para la gráfica de la pregunta
    const width = 280;
    const height = 210;
    const xMin = -5;
    const xMax = 5;
    const yMin = -6;
    const yMax = 6;

    // Proyecciones cartesianas a coordenadas de pantalla (SVG)
    const toSvgX = (x) => ((x - xMin) / (xMax - xMin)) * width;
    const toSvgY = (y) => height - ((y - yMin) / (yMax - yMin)) * height;

    const origX = toSvgX(0);
    const origY = toSvgY(0);

    // Generador de plano cartesiano con rejilla y numeración
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
        <line x1="0" y1="${origY}" x2="${width}" y2="${origY}" stroke="#333" stroke-width="1.6" />
        <line x1="${origX}" y1="0" x2="${origX}" y2="${height}" stroke="#333" stroke-width="1.6" />
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
      const pasos = 100;
      let d = '';
      let primerPunto = true;

      for (let i = 0; i <= pasos; i++) {
        const x = xMin + (i / pasos) * (xMax - xMin);
        let y = fn(x);

        if (isNaN(y) || !isFinite(y)) {
          primerPunto = true;
          continue;
        }

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
        <svg style="border: 1px solid #ccc; background-color: #fafbfc; border-radius: 6px; display: block; margin: 10px auto; box-shadow: 0 1px 4px rgba(0,0,0,0.06);" width="${width}px" height="${height}px">
          ${generarEjesSVG()}
          <path d="${d}" fill="none" stroke="${color}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `;
    }

    // Configuración aleatoria de parámetros
    // Elegimos dos valores enteros distintos a < b entre -3 y 3
    const posiblesValores = [-3, -2, -1, 0, 1, 2, 3];
    let idxA = Math.floor(Math.random() * (posiblesValores.length - 2));
    let idxB = idxA + 1 + Math.floor(Math.random() * (posiblesValores.length - idxA - 1));

    if (posiblesValores[idxB] - posiblesValores[idxA] < 2) {
      if (idxB < posiblesValores.length - 1) idxB++;
      else if (idxA > 0) idxA--;
    }

    const a = posiblesValores[idxA];
    const b = posiblesValores[idxB];
    const c = (a + b) / 2;
    const cStr = Number.isInteger(c) ? `${c}` : (a + b) % 2 === 0 ? `${(a+b)/2}` : `\\frac{${a+b}}{2}`;

    // tipoConfig: 0 => Máximo en a, Mínimo en b (k > 0)
    //             1 => Mínimo en a, Máximo en b (k < 0)
    const tipoConfig = Math.random() < 0.5 ? 0 : 1;

    const span = b - a;
    const factorK = 8 / (span * span * span + 6);
    const signK = tipoConfig === 0 ? 1 : -1;
    const k = signK * factorK;

    const fMid = k * ((c**3)/3 - ((a+b)/2)*(c**2) + a*b*c);
    const fCurva = (x) => k * ((x**3)/3 - ((a+b)/2)*(x**2) + a*b*x) - fMid;

    // Formateador de tarjeta de condiciones para las respuestas
    function formatoOpcionTexto(items) {
      return `
        <div style="font-size: 0.9em; line-height: 1.5; text-align: left; background: #fafbfc; border-left: 3px solid #2980b9; padding: 8px 12px; border-radius: 4px; box-sizing: border-box; width: 100%;">
          <ul style="margin: 0; padding-left: 18px;">
            ${items.map(it => `<li style="margin-bottom: 2px;">${it}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    // Descripción Correcta (R[0])
    let condCorrecta = [];
    if (tipoConfig === 0) {
      condCorrecta = [
        `$f'(${a}) = 0$ y $f'(${b}) = 0$`,
        `$f'(x) > 0$ para $x < ${a}$ y $x > ${b}$ (creciente)`,
        `$f'(x) < 0$ para $${a} < x < ${b}$ (decreciente)`,
        `$f''(x) < 0$ para $x < ${cStr}$ (cóncava hacia abajo)`,
        `$f''(x) > 0$ para $x > ${cStr}$ (cóncava hacia arriba)`
      ];
    } else {
      condCorrecta = [
        `$f'(${a}) = 0$ y $f'(${b}) = 0$`,
        `$f'(x) < 0$ para $x < ${a}$ y $x > ${b}$ (decreciente)`,
        `$f'(x) > 0$ para $${a} < x < ${b}$ (creciente)`,
        `$f''(x) > 0$ para $x < ${cStr}$ (cóncava hacia arriba)`,
        `$f''(x) < 0$ para $x > ${cStr}$ (cóncava hacia abajo)`
      ];
    }

    // Distractor 1: Signos de primera y segunda derivada invertidos (confusión de extremos y concavidad)
    let condD1 = [];
    if (tipoConfig === 0) {
      condD1 = [
        `$f'(${a}) = 0$ y $f'(${b}) = 0$`,
        `$f'(x) < 0$ para $x < ${a}$ y $x > ${b}$ (decreciente)`,
        `$f'(x) > 0$ para $${a} < x < ${b}$ (creciente)`,
        `$f''(x) > 0$ para $x < ${cStr}$ (cóncava hacia arriba)`,
        `$f''(x) < 0$ para $x > ${cStr}$ (cóncava hacia abajo)`
      ];
    } else {
      condD1 = [
        `$f'(${a}) = 0$ y $f'(${b}) = 0$`,
        `$f'(x) > 0$ para $x < ${a}$ y $x > ${b}$ (creciente)`,
        `$f'(x) < 0$ para $${a} < x < ${b}$ (decreciente)`,
        `$f''(x) < 0$ para $x < ${cStr}$ (cóncava hacia abajo)`,
        `$f''(x) > 0$ para $x > ${cStr}$ (cóncava hacia arriba)`
      ];
    }

    // Distractor 2: Puntos críticos desplazados hacia la derecha (+2)
    const aD2 = a + 2, bD2 = b + 2, cD2 = c + 2;
    const cStrD2 = Number.isInteger(cD2) ? `${cD2}` : `\\frac{${aD2+bD2}}{2}`;
    let condD2 = [];
    if (tipoConfig === 0) {
      condD2 = [
        `$f'(${aD2}) = 0$ y $f'(${bD2}) = 0$`,
        `$f'(x) > 0$ para $x < ${aD2}$ y $x > ${bD2}$`,
        `$f'(x) < 0$ para $${aD2} < x < ${bD2}$`,
        `$f''(x) < 0$ para $x < ${cStrD2}$`,
        `$f''(x) > 0$ para $x > ${cStrD2}$`
      ];
    } else {
      condD2 = [
        `$f'(${aD2}) = 0$ y $f'(${bD2}) = 0$`,
        `$f'(x) < 0$ para $x < ${aD2}$ y $x > ${bD2}$`,
        `$f'(x) > 0$ para $${aD2} < x < ${bD2}$`,
        `$f''(x) > 0$ para $x < ${cStrD2}$`,
        `$f''(x) < 0$ para $x > ${cStrD2}$`
      ];
    }

    // Distractor 3: Puntos críticos desplazados hacia la izquierda (-2)
    const aD3 = a - 2, bD3 = b - 2, cD3 = c - 2;
    const cStrD3 = Number.isInteger(cD3) ? `${cD3}` : `\\frac{${aD3+bD3}}{2}`;
    let condD3 = [];
    if (tipoConfig === 0) {
      condD3 = [
        `$f'(${aD3}) = 0$ y $f'(${bD3}) = 0$`,
        `$f'(x) > 0$ para $x < ${aD3}$ y $x > ${bD3}$`,
        `$f'(x) < 0$ para $${aD3} < x < ${bD3}$`,
        `$f''(x) < 0$ para $x < ${cStrD3}$`,
        `$f''(x) > 0$ para $x > ${cStrD3}$`
      ];
    } else {
      condD3 = [
        `$f'(${aD3}) = 0$ y $f'(${bD3}) = 0$`,
        `$f'(x) < 0$ para $x < ${aD3}$ y $x > ${bD3}$`,
        `$f'(x) > 0$ para $${aD3} < x < ${bD3}$`,
        `$f''(x) > 0$ para $x < ${cStrD3}$`,
        `$f''(x) < 0$ para $x > ${cStrD3}$`
      ];
    }

    // Distractor 4: Concavidad invertida pero primera derivada correcta (error en f'')
    let condD4 = [];
    if (tipoConfig === 0) {
      condD4 = [
        `$f'(${a}) = 0$ y $f'(${b}) = 0$`,
        `$f'(x) > 0$ para $x < ${a}$ y $x > ${b}$`,
        `$f'(x) < 0$ para $${a} < x < ${b}$`,
        `$f''(x) > 0$ para $x < ${cStr}$ (cóncava hacia arriba)`,
        `$f''(x) < 0$ para $x > ${cStr}$ (cóncava hacia abajo)`
      ];
    } else {
      condD4 = [
        `$f'(${a}) = 0$ y $f'(${b}) = 0$`,
        `$f'(x) < 0$ para $x < ${a}$ y $x > ${b}$`,
        `$f'(x) > 0$ para $${a} < x < ${b}$`,
        `$f''(x) < 0$ para $x < ${cStr}$ (cóncava hacia abajo)`,
        `$f''(x) > 0$ para $x > ${cStr}$ (cóncava hacia arriba)`
      ];
    }

    // Distractor 5: Error en los ceros de la derivada (asume un solo extremo en el punto de inflexión)
    let condD5 = [];
    if (tipoConfig === 0) {
      condD5 = [
        `$f'(${cStr}) = 0$ (único punto crítico)`,
        `$f'(x) > 0$ para $x < ${cStr}$`,
        `$f'(x) < 0$ para $x > ${cStr}$`,
        `$f''(x) < 0$ para todo $x \\in \\mathbb{R}$`,
        `Sin cambios de concavidad`
      ];
    } else {
      condD5 = [
        `$f'(${cStr}) = 0$ (único punto crítico)`,
        `$f'(x) < 0$ para $x < ${cStr}$`,
        `$f'(x) > 0$ para $x > ${cStr}$`,
        `$f''(x) > 0$ para todo $x \\in \\mathbb{R}$`,
        `Sin cambios de concavidad`
      ];
    }

    // Construcción de la pregunta
    const P = `
      ${numeroPregunta === 0 ? '<h2>Descripción de una función a partir de su gráfica</h2>' : ''}
      <p><b>${numeroPregunta + 1}.-</b> A partir de la gráfica de la función $y = f(x)$ mostrada a continuación, determine cuál es la descripción analítica correcta en términos de su primera derivada $f'(x)$ y su segunda derivada $f''(x)$:</p>
      <center style="margin: 10px auto;">
        ${graficarCurva(fCurva)}
      </center>
      <p>Seleccione la opción que describe correctamente el comportamiento de la función:</p>
    `;

    const R = [
      formatoOpcionTexto(condCorrecta), // R[0]: Correcta
      formatoOpcionTexto(condD1),       // R[1]: Extremos invertidos
      formatoOpcionTexto(condD2),       // R[2]: Extremos desplazados a la derecha
      formatoOpcionTexto(condD3),       // R[3]: Extremos desplazados a la izquierda
      formatoOpcionTexto(condD4),       // R[4]: Concavidad invertida
      formatoOpcionTexto(condD5)        // R[5]: Único punto crítico
    ];

    return [P, R];

  } catch (error) {
    console.error('Error al generar la pregunta 12.3.3:', error);
    return ["Error al generar pregunta.", ["", "", "", "", "", ""]];
  }
}
