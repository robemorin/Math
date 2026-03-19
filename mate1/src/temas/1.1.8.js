import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
  return 'Línea recta forma general - Tabla de valores';
}

export function tipo() {
  return 3;
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

export async function pregunta(i, code, esImprimible = false) {
  try {
    let P1 = [Math.floor(Math.random() * 11) - 5, Math.floor(Math.random() * 11) - 5];
    let dx = Math.floor(Math.random() * 5) + 1; // 1 to 5
    let dy;
    do {
      dy = Math.floor(Math.random() * 11) - 5;
    } while (dy === 0);

    let ks = [-2, -1, 0, 1, 2];
    let xs = ks.map(k => P1[0] + k * dx);
    let ys = ks.map(k => P1[1] + k * dy);

    let a = dy;
    let b = -dx;
    let c = dx * P1[1] - dy * P1[0];

    if (a < 0) {
      a = -a;
      b = -b;
      c = -c;
    }

    let divisor = gcd(gcd(a, b), c);
    a = a / divisor;
    b = b / divisor;
    c = c / divisor;

    let hides = [0, 1, 0, 1, 0]; // 0: mostrar x, pedir y. 1: mostrar y, pedir x.
    hides.sort(() => Math.random() - 0.5);

    const ecuacion = tempEcLineGeneral(a, b, c);

    let rowX = '<tr><th style="border-right:solid 2px gray">$x$</th>';
    let rowY = `<tr><th style="border-right:solid 2px gray">$y$</th>`;

    for (let k = 0; k < 5; ++k) {
      if (hides[k] === 0) {
        rowX += `<td><center>${xs[k]}</center></td>`;
        rowY += `<td><math-field id="math-field-${i}-${k}" data-x="${xs[k]}"></math-field></td>`;
      } else {
        rowX += `<td><math-field id="math-field-${i}-${k}" data-y="${ys[k]}"></math-field></td>`;
        rowY += `<td><center>${ys[k]}</center></td>`;
      }
    }
    rowX += '</tr>';
    rowY += '</tr>';

    const Pregunta = `
      <div class="pregunta-abierta" 
           data-a="${a}" data-b="${b}" data-c="${c}"
           style="display: none;">
        <p>${i + 1}.- Dada la ecuación de la recta $${ecuacion}$, completa los valores faltantes en la siguiente tabla:</p>
        <table class="tabla-eval" style="margin-top: 10px;">
          ${rowX}
          ${rowY}
        </table>
      </div>`;

    if (esImprimible) {
      const answers = ks.map(k => hides[k] === 0 ? ys[k] : xs[k]);
      return [Pregunta, answers.join(', ')];
    }

    render();
    return Pregunta;
  } catch (error) {
    console.error('Error al generar:', error);
  }
}

export async function render(container, n, code) {
  window.accionR2P = function (i) {
    const pregunta = document.getElementsByClassName('pregunta-abierta')[i];
    if (!pregunta) return [0, 5];
    const mathFields = pregunta.getElementsByTagName('math-field');
    if (mathFields.length < 5) return [0, 5];

    const a = Number(pregunta.dataset.a);
    const b = Number(pregunta.dataset.b);
    const c = Number(pregunta.dataset.c);

    let puntos = 0;
    const total = 5;

    for (let k = 0; k < 5; ++k) {
      const mf = mathFields[k];
      const raw = mf.value || mf.getAttribute('value') || '';
      const parsed = parseFloat(raw.toString().replace(/[^0-9eE+\-.]/g, ''));

      let x, y;
      if (mf.hasAttribute('data-x')) {
        x = Number(mf.dataset.x);
        y = parsed;
      } else if (mf.hasAttribute('data-y')) {
        y = Number(mf.dataset.y);
        x = parsed;
      } else {
        continue;
      }

      if (!Number.isFinite(parsed)) {
        mf.style.backgroundColor = 'red';
        continue;
      }

      if (Math.abs(a * x + b * y + c) < 1e-5) {
        ++puntos;
        mf.style.border = 'solid 3px green';
        mf.style.backgroundColor = 'transparent';
      } else {
        mf.style.border = '';
        mf.style.backgroundColor = 'red';
      }
    }

    return [puntos, total];
  }
}
