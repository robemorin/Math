import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
  return "Comportamiento de la derivada";
}

export function tipo() {
  return 0; // Opción múltiple
}

export async function pregunta(numeroPregunta) {
  try {
    function poly(y0, yp0, ya, ypa, mx, bx, h) {
      let a = 5;
      let omega = [(ya - yp0 * a - y0) / (a * a), (ypa - yp0) / a];
      var alfa = [(omega[1] - 2 * omega[0]) / a, 3 * omega[0] - omega[1], yp0, y0];
      var n = 100;
      var x = [];
      var y = [];
      var sr = '';
      for (var k = 0; k < n; ++k) {
        x[k] = (a * k) / n;
        y[k] = alfa[0];
        for (var j = 1; j < 4; ++j) y[k] = y[k] * x[k] + alfa[j];
        sr += (mx * (x[k] - h) + bx) + ', ' + (-mx * 2 * y[k] + bx) + ' ';
      }
      return [sr, 6 * alfa[0] * a + 2 * alfa[1]];
    }

    function polyII(y0, yp0, ya, ypa, mx, bx, ypp0) {
      var a = 5;
      var alfa = [(ya - (ypp0 * a * a / 2 + yp0 * a + y0)) / (a * a * a), ypp0 / 2, yp0, y0];
      var n = 100;
      var x = [];
      var y = [];
      var sr = '';
      for (var k = 0; k < n; ++k) {
        x[k] = (a * k) / n;
        y[k] = alfa[0];
        for (var j = 1; j < 4; ++j) y[k] = y[k] * x[k] + alfa[j];
        sr += (mx * x[k] + bx) + ', ' + (-mx * 2 * y[k] + bx) + ' ';
      }
      return sr;
    }

    function polyII2(y0, yp0, ya, ypa, mx, bx, ypp0) {
      var a = 5;
      var alfa = [3 * (ya - (ypp0 * a * a / 2 + yp0 * a + y0)) / (a * a * a), ypp0, yp0];
      var n = 100;
      var x = [];
      var y = [];
      var sr = '';
      for (var k = 0; k < n; ++k) {
        x[k] = (a * k) / n;
        y[k] = alfa[0];
        for (var j = 1; j < 3; ++j) y[k] = y[k] * x[k] + alfa[j];
        sr += (mx * x[k] + bx) + ', ' + (-mx * 2 * y[k] + bx) + ' ';
      }
      return sr;
    }

    function poly2(y0, yp0, ya, ypa, mx, bx, h) {
      var a = 5;
      var omega = [(ya - yp0 * a - y0) / (a * a), (ypa - yp0) / a];
      var alfa = [3 * ((omega[1] - 2 * omega[0]) / a), 2 * (3 * omega[0] - omega[1]), yp0];
      var n = 100;
      var x = [];
      var y = [];
      var sr = '';
      for (var k = 0; k < n; ++k) {
        x[k] = (a * k) / n;
        y[k] = alfa[0];
        for (var j = 1; j < 3; ++j) y[k] = y[k] * x[k] + alfa[j];
        sr += (mx * (x[k] - h) + bx) + ', ' + (-mx * 2 * y[k] + bx) + ' ';
      }
      return sr;
    }

    var mx = 20;
    var bx = 110;
    var w = mx * 11; // 220px

    var y0 = 2 * (0.5 - Math.random());
    var yp0 = 2 * (0.5 - Math.random());
    var ya = 2 * (0.5 - Math.random());
    var ypa = 2 * (0.5 - Math.random());
    var yb = 2 * (0.5 - Math.random());
    var ypb = 2 * (0.5 - Math.random());

    let dummy = poly(y0, yp0, ya, ypa, mx, bx, 5);
    let q = dummy[1];
    let sr = dummy[0];
    sr += polyII(ya, ypa, yb, ypb, mx, bx, q);

    let sr2 = poly2(y0, yp0, ya, ypa, mx, bx, 5);
    sr2 += polyII2(ya, ypa, yb, ypb, mx, bx, q);

    // Ejes con marcas y rejilla
    const crearEjesSVG = (w, bx, mx) => `
      <!-- Cuadrícula tenue -->
      ${Array.from({ length: 11 }, (_, idx) => {
        const coord = idx * mx;
        return `<line x1="${coord}" y1="0" x2="${coord}" y2="${w}" stroke="#f0f0f0" stroke-width="1" />
                <line x1="0" y1="${coord}" x2="${w}" y2="${coord}" stroke="#f0f0f0" stroke-width="1" />`;
      }).join('')}
      <!-- Eje X -->
      <line y1="${bx}" x1="0" y2="${bx}" x2="${w}" stroke="#444" stroke-width="1.8" />
      <!-- Eje Y -->
      <line x1="${bx}" y1="0" x2="${bx}" y2="${w}" stroke="#444" stroke-width="1.8" />
      <!-- Marcas en los ejes -->
      ${Array.from({ length: 11 }, (_, idx) => {
        const coord = idx * mx;
        return `<line x1="${coord}" y1="${bx - 3}" x2="${coord}" y2="${bx + 3}" stroke="#444" stroke-width="1.2" />
                <line x1="${bx - 3}" y1="${coord}" x2="${bx + 3}" y2="${coord}" stroke="#444" stroke-width="1.2" />`;
      }).join('')}
    `;

    // Gráfica de la función en la pregunta
    const P = `
      ${numeroPregunta === 0 ? '<h2>Comportamiento de la función derivada $f\'(x)$</h2>' : ''}
      <p><b>${numeroPregunta + 1}.-</b> Determine cuál de los siguientes bosquejos representa a la derivada $f'(x)$ (trazada en color rojo) de la función $f(x)$ mostrada en color azul.</p>
      <center style="margin: 15px auto;">
        <svg style="border: 1px solid #ccc; background-color: #fafafa; border-radius: 6px; box-shadow: 0 1px 4px rgba(0,0,0,0.08);" width="${w}px" height="${w}px">
          ${crearEjesSVG(w, bx, mx)}
          <polyline points="${sr}" style="fill:none; stroke:#2980b9; stroke-width:3" />
        </svg>
      </center>
    `;

    const R = [];
    // Opción correcta 0: f(x) en azul con su derivada correcta en rojo
    R[0] = `
        <svg style="border: 1px solid #ccc; background-color: #fafafa; border-radius: 6px;" width="${w}px" height="${w}px">
          ${crearEjesSVG(w, bx, mx)}
          <polyline points="${sr}" style="fill:none; stroke:#2980b9; stroke-width:2.5" />
          <polyline points="${sr2}" style="fill:none; stroke:#e74c3c; stroke-width:2.5" />
        </svg>
    `;

    // 5 opciones incorrectas con distintas funciones derivadas plausibles
    for (var ii = 1; ii < 6; ++ii) {
      do {
        var dy0 = 2 * (0.5 - Math.random());
        var dyp0 = 2 * (0.5 - Math.random());
        var dya = 2 * (0.5 - Math.random());
        var dypa = 2 * (0.5 - Math.random());
        var dyb = 2 * (0.5 - Math.random());
        var dypb = 2 * (0.5 - Math.random());

        let dummyErr = poly(dy0, dyp0, dya, dypa, mx, bx, 5);
        let dq = dummyErr[1];

        let dsr2 = poly2(dy0, dyp0, dya, dypa, mx, bx, 5);
        dsr2 += polyII2(dya, dypa, dyb, dypb, mx, bx, dq);

        R[ii] = `
            <svg style="border: 1px solid #ccc; background-color: #fafafa; border-radius: 6px;" width="${w}px" height="${w}px">
              ${crearEjesSVG(w, bx, mx)}
              <polyline points="${sr}" style="fill:none; stroke:#2980b9; stroke-width:2.5" />
              <polyline points="${dsr2}" style="fill:none; stroke:#e74c3c; stroke-width:2.5" />
            </svg>
        `;
      } while (tlacu.pregunta.hayRepetidos(R));
    }

    return [P, R];

  } catch (error) {
    console.error('Error al generar la pregunta 12.3.1:', error);
  }
}
