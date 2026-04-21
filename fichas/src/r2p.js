//Archivo r2p.js
class R2PDinamico extends HTMLElement {
  static get observedAttributes() {
    return ['tema', 'n', 'nfichas', 'docente'];
  }

  constructor() {
    super();
    this.container = document.createElement('div');
    this.appendChild(this.container);

    this.n = 5;
    this.nfichas = 1;
    this.docente = 'M.C. Roberto Alejandro Morin Romero';
  }

  connectedCallback() {
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    switch (name) {
      case 'tema':
        this.cargarTema(newValue);
        break;
      case 'n':
        this.n = parseInt(newValue) || 5;
        break;
      case 'nfichas':
        this.nfichas = parseInt(newValue) || 1;
        break;
      case 'docente':
        this.docente = newValue;
        break;
    }
  }

  async esperarMathJaxListo() {
    return new Promise((resolve) => {
      const revisar = () => {
        if (window.MathJax && window.MathJax.typesetPromise) {
          resolve();
        } else {
          setTimeout(revisar, 50);
        }
      };
      revisar();
    });
  }

  async cargarTema(tema) {
    if (!tema) return;
    try {
      // Utilizamos un seed u objeto simple si hiciera falta luego.
      const modulo = await import(`./temas/${tema}.js`);

      const fecha = new Date();
      const fechaStr = fecha.toLocaleDateString();
      const horaStr = fecha.toLocaleTimeString();

      let lienzoGlobal = '';
      let solucionesGlobales = '';

      for (let numFicha = 0; numFicha < this.nfichas; numFicha++) {

        let lienzoFicha = `
            <table class="r2pi-head">
              <tr>
                <td width="20%">
                  <center>
                    <img src="https://math-ca5.pages.dev/src/icon2.png" width="50%"> 
                    <p>raiz2pi.cc</p>
                  </center>
                </td>
                <td>
                  <center><h2>Tema: ${tema} ${modulo.name()}</h2></center>
                  <center><h3 style="color:blue;">Fecha: ${fechaStr} - Id: ${numFicha + 1} </h3></center>
                  <center><h3>Docente: <span id='docente'>${this.docente}</span></h3></center>
                </td>
              </tr>
            </table>
            <div class="r2pi-contenedor">
              <p>Alumno: ____________________________________________________</p>
            `;

        // Generar los problemas de la Ficha (1 llamada = 1 Ficha completa)
        // Usamos numFicha como índice si el módulo ocupa generar algo que no choque en el DOM (como applets de Geogebra)
        const res = await modulo.pregunta(numFicha);
        const p = Array.isArray(res) ? res[0] : res;
        const s = Array.isArray(res) && res.length > 1 ? res[1] : '';

        lienzoFicha += p;
        lienzoFicha += `</div>`;
        
        // Agregar salto de página entre fichas 
        if (numFicha < this.nfichas - 1) {
             lienzoFicha += `<div class="page page-break-ficha noprint" style="border-bottom: 2px solid #000; margin: 40px 0;"></div>`;
        }

        lienzoGlobal += lienzoFicha;
        solucionesGlobales += `<div><span style="font-weight:bold; font-size: 1.2em;">[Id: ${numFicha + 1}]</span>${s}</div><br>`;
      }
      
      // Al final de todas las fichas, ponemos el contenedor maestro de Soluciones
      lienzoGlobal += `<div class="page"></div><div class="soluciones-ficha" style="column-count: 1;"><h2>Soluciones</h2>${solucionesGlobales}</div>`;

      this.container.innerHTML = lienzoGlobal;

      // Renderizar GeoGebra si existe el método en el módulo
      if (modulo.renderGeoGebra) {
        await modulo.renderGeoGebra(this.container, this.n * this.nfichas);
      }

      await this.esperarMathJaxListo();
      await MathJax.typesetPromise([this.container]);

    } catch (error) {
      this.container.innerHTML = `<p style="color:red;">Error: tema "${tema}" no encontrado.</p>`;
      console.error(`No se pudo cargar el tema: ${tema}`, error);
    }
  }
}

customElements.define('r2p-dinamico', R2PDinamico);
