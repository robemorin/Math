import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() {
  return 'Ecuación general de la mediatriz a partir de dos puntos (Abierta)';
}

export function tipo() {
  return 3;
}

// Custom GCD function
function gcdA(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b > a) { let temp = a; a = b; b = temp; }
    while (true) {
        if (b === 0) return a;
        a %= b;
        if (a === 0) return b;
        b %= a;
    }
}

function tempEcLine(A, B) {
    let Ap = 2 * (B[0] - A[0]);
    let Bp = 2 * (B[1] - A[1]);
    let Cp = A[0]*A[0] - B[0]*B[0] + A[1]*A[1] - B[1]*B[1];
    
    // Simplify parameters
    let g = gcdA(Ap, gcdA(Bp, Cp));
    if (g !== 0) {
        Ap /= g;
        Bp /= g;
        Cp /= g;
    }

    // Normalize so that A > 0 or A=0, B>0
    if (Ap < 0 || (Ap === 0 && Bp < 0)) {
      Ap = -Ap;
      Bp = -Bp;
      Cp = -Cp;
    }

    let cadena = "";
    let terms = 0;
    
    if (Ap !== 0) {
        if (Ap === 1) cadena += "x";
        else if (Ap === -1) cadena += "-x";
        else cadena += `${Ap}x`;
        terms++;
    }

    if (Bp !== 0) {
        if (terms > 0 && Bp > 0) cadena += "+";
        if (Math.abs(Bp) === 1) {
            cadena += (Bp < 0 ? "-" : "") + "y";
        } else {
            cadena += `${Bp}y`;
        }
        terms++;
    }

    if (Cp !== 0) {
        if (terms > 0 && Cp > 0) cadena += "+";
        cadena += `${Cp}`;
    } else if (terms === 0) {
        cadena += "0";
    }
    cadena += `=0`;

    return cadena;
}

export async function pregunta(i, totalPreguntas, esImprimible = false) {
  try {
    let A = [Math.ceil(Math.random() * 8 - 4), Math.ceil(Math.random() * 8 - 4)], B
    do {
      B = [Math.ceil(Math.random() * 8 - 4), Math.ceil(Math.random() * 8 - 4)]
    } while (A[0] === B[0] && A[1] === B[1])

    const Pregunta = `${i == 0 ? '<h2>Considere que en la ecuación general $Ax+By+C=0$, $A \\ge 0$ y $A,B,C$ son números enteros primos relativos.</h2>' : ''}
      <div class="pregunta-abierta"  data-a="${A}" data-b="${B}" style="display: none;">
        <p>${i + 1}.- Determine la ecuación en forma general de la mediatriz del segmento que une los puntos $A:(${A[0]}, ${A[1]})$ y $B:(${B[0]}, ${B[1]})$. <span id="resultado_${i}" name="question"></span></p>
        
        <table>
          <tr><td>Ecuación de la mediatriz: </td><td><math-field>=0</math-field></td></tr>
        </table>
      </div>
    `;
    if (esImprimible) {
      const respuesta = `$${tempEcLine(A, B)}$`
      return [Pregunta, respuesta]
    }

    if (totalPreguntas - 1 == i) render(null, totalPreguntas)
    return Pregunta

  } catch (error) {
    console.error('Error al carga la pregunta:', error);
  }
}

export async function render(container, n, code) {
  // Ya no usamos GeoGebra en este archivo
  window.accionR2P = function (i) {
    let totalPuntos = 1;
    let puntos = 0;
    let pregunta = document.getElementsByClassName('pregunta-abierta');
    const mathFields = pregunta[i].getElementsByTagName('math-field');
    const A = pregunta[i].dataset.a.split(',').map(Number);
    const B = pregunta[i].dataset.b.split(',').map(Number);
    
    // Obtenemos la respuesta correcta y la de estudiante
    const respuestaC = tempEcLine(A, B);
    let respuesta = mathFields[0].value;
    
    console.log(`'${respuesta}' ? '${respuestaC}'`);

    if (respuestaC !== respuesta) {
      mathFields[0].style.backgroundColor = "red";
      return [puntos, totalPuntos];
    } else {
      puntos++;
      mathFields[0].style.border = "solid 5px green";
    }

    return [puntos, totalPuntos];
  };
}
