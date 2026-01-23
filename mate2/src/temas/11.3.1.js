import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
  return "Comportamiento de la derivada";
}

export function tipo() {
  return 0;
}

export async function pregunta(numeroPregunta) {
  function poly(y0, yp0, ya, ypa, mx, bx, h) {
    let a = 5;
    let omega = [(ya - yp0 * a - y0) / (a * a), (ypa - yp0) / a];

    var alfa = [(omega[1] - 2 * omega[0]) / a, 3 * omega[0] - omega[1], yp0, y0];
    var n = 100;
    var x = [];
    var y = [];
    var sr = '';
    for (var k = 0; k < n; ++k) { //Horner evaluation
      x[k] = a * k / n;
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
    for (var k = 0; k < n; ++k) { //Horner evaluation
      x[k] = a * k / n;
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
    for (var k = 0; k < n; ++k) { //Horner evaluation
      x[k] = a * k / n;
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
    for (var k = 0; k < n; ++k) { //Horner evaluation
      x[k] = a * k / n;
      y[k] = alfa[0];
      for (var j = 1; j < 3; ++j) y[k] = y[k] * x[k] + alfa[j];
      sr += (mx * (x[k] - h) + bx) + ', ' + (-mx * 2 * y[k] + bx) + ' ';
    }
    return sr;
  }

  var mx = 20;
  var bx = 110;
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

  var P = `${numeroPregunta + 1}.- Determine un bosquejo de la derivada de la siguiente función.
    <center><svg width="${mx * 11}px" height="${mx * 11}">
    <line y1="${bx}" x1="0" y2="${bx}" x2="${mx * 11}" style="stroke:black;stroke-width:2"> </line><polyline points="${sr}" style="fill:none;stroke:blue;stroke-width:3" /></svg></center>`;

  var R = [];

  R[0] = `<center><svg style="border: solid gray 1px" width="${mx * 11}px" height="${mx * 11}">
    <line y1="${bx}" x1="0" y2="${bx}" x2="${mx * 11}" style="stroke:black;stroke-width:2"> </line><polyline points="${sr}" style="fill:none;stroke:blue;stroke-width:3" /><polyline points="${sr2}" style="fill:none;stroke:red;stroke-width:3" /></svg></center>`;

  for (var ii = 1; ii < 6; ++ii) {
    do {
      var dy0 = 2 * (0.5 - Math.random());
      var dyp0 = 2 * (0.5 - Math.random());
      var dya = 2 * (0.5 - Math.random());
      var dypa = 2 * (0.5 - Math.random());
      var dyb = 2 * (0.5 - Math.random());
      var dypb = 2 * (0.5 - Math.random());
      
      let dummy = poly(dy0, dyp0, dya, dypa, mx, bx, 5);
      let dq = dummy[1];
      
      let dsr2 = poly2(dy0, dyp0, dya, dypa, mx, bx, 5);
      dsr2 += polyII2(dya, dypa, dyb, dypb, mx, bx, dq);

      R[ii] = `<center><svg style="border: solid gray 1px" width="${mx * 11}px" height="${mx * 11}">
      <line y1="${bx}" x1="0" y2="${bx}" x2="${mx * 11}" style="stroke:black;stroke-width:2"> </line><polyline points="${sr}" style="fill:none;stroke:blue;stroke-width:3" /><polyline points="${dsr2}" style="fill:none;stroke:red;stroke-width:3" /></svg></center>`;

    } while (tlacu.pregunta.hayRepetidos(R));
  }
  
  return [P, R];
}
