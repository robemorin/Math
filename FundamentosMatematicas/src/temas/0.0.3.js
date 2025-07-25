export function name() {
  return '0.0.3: Tema con GeoGebra';
}

export function tipo() {
  return 2;
}

export async function pregunta(i, code) {
  return `
    <div class="pregunta-geogebra" style="display: none;">
      <p>GeoGebra Applet ${i + 1}</p>
      <div id="applet_container_${i}" class="ggb-container"></div>
      <button onclick="window.accionGeoGebra(${i})">Revisar ${i + 1}</button>
      <p>Resultado: <span id="resultado_${i}" name="question">⏳</span></p>
    </div>
  `;
}

export async function renderGeoGebra(container, n, code) {
  const material_id = "jbk4yqfp";
  window.ggbApps = [];

  for (let i = 0; i < n; i++) {
    const params = {
      appName: 'classic',
      width: 600,
      height: 400,
      material_id,
      id: `ggbApplet_${i}`,
      appletOnLoad(api) {
        window.ggbApps[i] = api;
      }
    };
    new GGBApplet(params, true).inject(`applet_container_${i}`);
  }

  // 🔁 Registrar función específica del tema
  window.accionGeoGebra = function(i) {
    const api = window.ggbApps[i];
    if (!api) return alert("Applet no listo");

    const a = api.getValue("a");
    console.log(`Valor de a en el applet ${i}:`, a);
  };
}
