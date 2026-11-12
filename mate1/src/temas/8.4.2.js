import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return 'Teorema del seno (caso ambiguo)';
}

export function tipo() {
  return 0; // 0 - Opción múltiple
}

export async function pregunta(numeroPregunta) {
  try {
    const letrasTriangulos = [
      { v1: "A", v2: "B", v3: "C", s1: "a", s2: "b", s3: "c" },
      { v1: "P", v2: "Q", v3: "R", s1: "p", s2: "q", s3: "r" },
      { v1: "X", v2: "Y", v3: "Z", s1: "x", s2: "y", s3: "z" },
      { v1: "D", v2: "E", v3: "F", s1: "d", s2: "e", s3: "f" },
      { v1: "H", v2: "J", v3: "K", s1: "h", s2: "j", s3: "k" }
    ];

    const unidades = ["cm", "m", "mm"];

    const lt = letrasTriangulos[Math.floor(Math.random() * letrasTriangulos.length)];
    const u = unidades[Math.floor(Math.random() * unidades.length)];

    // Generamos un caso ambiguo estricto (SSA):
    // Ángulo agudo A
    // b conocido tal que b > a > b * sin(A)
    // De este modo existen exactamente dos soluciones: ángulo B agudo y B obtuso = 180° - B
    const A_deg = Math.floor(Math.random() * 25) + 25; // 25° a 49°
    const A_rad = (A_deg * Math.PI) / 180;
    const b = Math.floor(Math.random() * 10) + 12; // 12 a 21

    const h = b * Math.sin(A_rad);
    // Para que sea ambiguo: h < a < b con margen seguro
    const aMin = Math.ceil(h + 1.2);
    const aMax = b - 1;
    const a = Math.floor(Math.random() * (aMax - aMin + 1)) + aMin;

    const sinB = (b * Math.sin(A_rad)) / a;
    const B_agudo_rad = Math.asin(sinB);
    const B_agudo_deg = (B_agudo_rad * 180) / Math.PI;
    const B_obtuso_deg = 180 - B_agudo_deg;

    const B1_str = B_agudo_deg.toFixed(1);
    const B2_str = B_obtuso_deg.toFixed(1);

    // Modo 0: Pedir los dos valores posibles
    // Modo 1: Pedir el valor del ángulo obtuso
    const modo = Math.random() < 0.5 ? 0 : 1;

    let P = '';
    let ansCorrecta = '';
    const poolDistractores = [];

    if (modo === 0) {
      ansCorrecta = `$${B1_str}^\\circ \\text{ o } ${B2_str}^\\circ$`;

      P = `
        <p>${numeroPregunta + 1}.- En el triángulo $${lt.v1}${lt.v2}${lt.v3}$, se tiene que el lado $${lt.s1} = ${a}\\text{ ${u}}$, el lado $${lt.s2} = ${b}\\text{ ${u}}$ y el ángulo en $${lt.v1}$ mide $${A_deg}^\\circ$. Dado que esta configuración admite dos triángulos posibles, halle los dos valores posibles para la medida del ángulo en el vértice $${lt.v2}$ (redondee a 1 cifra decimal).</p>
      `;

      // Distractores para modo 0:
      // 1. Solo dar el agudo con el tercer ángulo correspondiente
      const C1_deg = (180 - A_deg - B_agudo_deg).toFixed(1);
      poolDistractores.push(`$${B1_str}^\\circ \\text{ o } ${C1_deg}^\\circ$`);

      // 2. Invertir la relación senos a/b en vez de b/a si < 1
      const sinB_inv = (a * Math.sin(A_rad)) / b;
      const B_inv_agudo = ((Math.asin(sinB_inv) * 180) / Math.PI).toFixed(1);
      const B_inv_obtuso = (180 - parseFloat(B_inv_agudo)).toFixed(1);
      poolDistractores.push(`$${B_inv_agudo}^\\circ \\text{ o } ${B_inv_obtuso}^\\circ$`);

      // 3. Proporción lineal sin seno
      const errLineal = ((A_deg * b) / a).toFixed(1);
      const errLinealObt = (180 - parseFloat(errLineal)).toFixed(1);
      poolDistractores.push(`$${errLineal}^\\circ \\text{ o } ${errLinealObt}^\\circ$`);

      // 4. Desplazamientos numéricos plausibles
      const d1 = (B_agudo_deg + 4.5).toFixed(1);
      const d2 = (180 - parseFloat(d1)).toFixed(1);
      poolDistractores.push(`$${d1}^\\circ \\text{ o } ${d2}^\\circ$`);

      const d3 = Math.max(10, B_agudo_deg - 5.2).toFixed(1);
      const d4 = (180 - parseFloat(d3)).toFixed(1);
      poolDistractores.push(`$${d3}^\\circ \\text{ o } ${d4}^\\circ$`);

      const d5 = (B_agudo_deg + 8.1).toFixed(1);
      const d6 = (180 - parseFloat(d5)).toFixed(1);
      poolDistractores.push(`$${d5}^\\circ \\text{ o } ${d6}^\\circ$`);

    } else {
      // Modo 1: Pedir el ángulo obtuso
      ansCorrecta = `$${B2_str}^\\circ$`;

      P = `
        <p>${numeroPregunta + 1}.- En el triángulo $${lt.v1}${lt.v2}${lt.v3}$, se sabe que el lado $${lt.s1} = ${a}\\text{ ${u}}$, el lado $${lt.s2} = ${b}\\text{ ${u}}$ y el ángulo en $${lt.v1}$ mide $${A_deg}^\\circ$. Si el ángulo en el vértice $${lt.v2}$ es obtuso, halle su medida (redondee a 1 cifra decimal).</p>
      `;

      // Distractores para modo 1:
      // 1. El ángulo agudo (olvidar restar de 180°)
      poolDistractores.push(`$${B1_str}^\\circ$`);

      // 2. El tercer ángulo en el caso obtuso: 180° - A - B_obtuso
      const tercerAnguloObtuso = (180 - A_deg - B_obtuso_deg).toFixed(1);
      if (parseFloat(tercerAnguloObtuso) > 0) {
        poolDistractores.push(`$${tercerAnguloObtuso}^\\circ$`);
      }

      // 3. El tercer ángulo en el caso agudo: 180° - A - B_agudo
      const tercerAnguloAgudo = (180 - A_deg - B_agudo_deg).toFixed(1);
      poolDistractores.push(`$${tercerAnguloAgudo}^\\circ$`);

      // 4. Error invirtiendo la razón y tomando suplementario
      const sinB_inv = (a * Math.sin(A_rad)) / b;
      const errInvObt = (180 - ((Math.asin(sinB_inv) * 180) / Math.PI)).toFixed(1);
      poolDistractores.push(`$${errInvObt}^\\circ$`);

      // 5. Variaciones numéricas obtusas
      poolDistractores.push(`$${Math.min(175, B_obtuso_deg + 6.4).toFixed(1)}^\\circ$`);
      poolDistractores.push(`$${Math.max(95, B_obtuso_deg - 7.3).toFixed(1)}^\\circ$`);
    }

    const R = [ansCorrecta];

    for (const opt of poolDistractores) {
      if (opt && opt !== ansCorrecta && !R.includes(opt)) {
        R.push(opt);
      }
      if (R.length >= 6) break;
    }

    let extra = 1;
    while (R.length < 6) {
      if (modo === 0) {
        const alt1 = Math.max(10, B_agudo_deg + (extra % 2 === 0 ? extra * 3.1 : -extra * 2.7)).toFixed(1);
        const alt2 = (180 - parseFloat(alt1)).toFixed(1);
        const opt = `$${alt1}^\\circ \\text{ o } ${alt2}^\\circ$`;
        if (!R.includes(opt)) R.push(opt);
      } else {
        const altVal = Math.min(175, Math.max(95, B_obtuso_deg + (extra % 2 === 0 ? extra * 2.8 : -extra * 3.2))).toFixed(1);
        const opt = `$${altVal}^\\circ$`;
        if (!R.includes(opt)) R.push(opt);
      }
      extra++;
    }

    for (let j = 1; j < 6; ++j) {
      let intentos = 0;
      while (tlacu.pregunta.hayRepetidos(R) && intentos < 20) {
        if (modo === 0) {
          const alt1 = (B_agudo_deg + (j + intentos) * 2.9 + 1.1).toFixed(1);
          const alt2 = (180 - parseFloat(alt1)).toFixed(1);
          R[j] = `$${alt1}^\\circ \\text{ o } ${alt2}^\\circ$`;
        } else {
          const altVal = Math.min(175, Math.max(95, B_obtuso_deg + (j + intentos) * 2.4 + 1.2)).toFixed(1);
          R[j] = `$${altVal}^\\circ$`;
        }
        intentos++;
      }
    }

    return [P, R];
  } catch (error) {
    console.error('Error al generar la pregunta 8.4.2:', error);
  }
}
