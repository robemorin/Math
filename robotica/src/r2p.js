//Archivo r2p.js
class R2PDinamico extends HTMLElement {
  static get observedAttributes() {
    return ['tema', 'n', 'docente', 'tiempo','modo'];
  }

  constructor() {
    super();
    this.container = document.createElement('div');
    this.appendChild(this.container);

    this.n = 10;
    this.docente = 'M.C. Roberto Alejandro Morin Romero';
    this.tiempo = 60;
    this.clave = null;
    this.modo=0//0 R+E; 1 R *** R-Revsión E-mostrar correcto
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
        this.n = eval(newValue);
        break;
      case 'docente':
        this.docente = newValue;
        break;
      case 'tiempo':
        this.tiempo = eval(newValue);
        break;
      case 'modo':
        this.modo = eval(newValue)
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
    try {
      const coreModule = await import('./r2p_core.js');
      const code = coreModule.generarCodigo();
      const modulo = await import(`./temas/${tema}.js`);
      const tipo = modulo.tipo()
      let lienzo 

      this.container.innerHTML = `
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
              <center><h3>Docente: <span id='docente'>${this.docente}<span></h3></center>
            </td>
          </tr>
        </table>
        `;
        lienzo = `<div class="r2pi-contenedor" code="${code}" type="${tipo}" modo="${this.modo}" tiempo="${this.tiempo}">
          <p>Alumno: <input type="text" id="alumno" placeholder="Nombre del alumno"></p>
          <p id="r2p-calificacion"></p>
          <div id="r2p-evidencia"></div>
          <div id="r2p-qr"></div>
          `
        if (tipo === 0) {// Opcion múltiple
          
          for (let i = 0; i < this.n; i++) {
            const preguntaHTML = await modulo.pregunta( i);
            lienzo += coreModule.pregunta(preguntaHTML,code,i);
          }
          lienzo += `<button class="r2p-revisar" id="revisar" style="display: none;"></button>
          
          </div>`;

        }else if (tipo === 1 || tipo == 2 || tipo==3){
          for (let i = 0; i < this.n; i++) {
            const preguntaHTML = await modulo.pregunta(i, tipo == 3? this.n:code);
            lienzo += preguntaHTML;
          }
          lienzo += `<button class="r2p-revisar" id="revisar" style="display: none;"></button>
          </div>`;
        }
      this.container.innerHTML += lienzo;
      coreModule.setupEvents();
      if (tipo === 2 && modulo.renderGeoGebra) {
        await modulo.renderGeoGebra(this.container, this.n, code);
      }
      /*
      if (tipo === 3 && modulo.render) {
        await modulo.render(this.container, this.n, code);
      }*/


      //console.log(`n: ${this.n}, codigo: ${code}`);
      //await modulo.renderTo(this.container, this.n, code);
      //console.log(`Tema cargado: ${tema}`);

      await this.esperarMathJaxListo();
      await MathJax.typesetPromise([this.container]);

    } catch (error) {
      this.container.innerHTML = `<p style="color:red;">Error: tema "${tema}" no encontrado.</p>`;
      console.error(`No se pudo cargar el tema: ${tema}`, error);
    }
  }
}

customElements.define('r2p-dinamico', R2PDinamico);
