// src/r2p.js — Custom Element universal <r2p-dinamico>
// Versión centralizada. Se puede incrustar desde cualquier sitio apuntando a:
//   https://math-ca5.pages.dev/src/r2p.js
//
// Uso desde un sitio externo:
//   <script type="module" src="https://math-ca5.pages.dev/src/r2p.js"></script>
//   <r2p-dinamico curso="mate1" tema="1.1.1" n="10"></r2p-dinamico>

// =============================================================================
// CONFIGURACIÓN DE RUTAS Y PROYECTO
// =============================================================================
// Nombre de la carpeta del proyecto cuando Live Server u otro servidor local
// se ejecuta desde una carpeta padre (por ejemplo: C:\Users\...\git\).
// Si renombras la carpeta 'MathCopy' a futuro, solo cambia el valor de esta variable:
export const PROJECT_DIR = 'MathCopy';

/**
 * Calcula la raíz del proyecto (la carpeta donde coexisten src/, mate1/, mate2/, etc.)
 */
function calcularProjectRoot() {
    const scriptUrl = import.meta.url;
    // Si la URL del script contiene la carpeta del proyecto (ej: http://127.0.0.1:5501/MathCopy/src/r2p.js)
    if (PROJECT_DIR && scriptUrl.includes(`/${PROJECT_DIR}/`)) {
        const idx = scriptUrl.indexOf(`/${PROJECT_DIR}/`);
        return scriptUrl.substring(0, idx + PROJECT_DIR.length + 2); // -> 'http://127.0.0.1:5501/MathCopy/'
    }
    // En Cloudflare Pages (https://math-ca5.pages.dev/src/r2p.js) o si el servidor corre en la raíz de MathCopy:
    return new URL('../', scriptUrl).href;
}

const _ROOT = calcularProjectRoot();
const _BASE = `${_ROOT}src/`;

// ── Inyección de estilos ──────────────────────────────────────────────────────
(function inyectarCSS() {
    const id = 'r2p-styles';
    if (document.getElementById(id)) return; // ya cargado
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `${_BASE}raiz2pi.css`;
    document.head.appendChild(link);
})();

// ── Inyección de MathJax (si no está presente) ───────────────────────────────
(function inyectarMathJax() {
    if (window.MathJax) return; // ya configurado por el sitio anfitrión
    window.MathJax = {
        tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']]
        },
        options: {
            skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
            ignoreHtmlClass: 'tex2jax_ignore',
            processHtmlClass: 'tex2jax_process'
        }
    };
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    s.async = true;
    document.head.appendChild(s);
})();

// ── Inyección de MathLive ─────────────────────────────────────────────────────
(function inyectarMathLive() {
    if (customElements.get('math-field')) return; // ya registrado
    const s = document.createElement('script');
    s.type = 'module';
    s.textContent = `import 'https://unpkg.com/mathlive?module';`;
    document.head.appendChild(s);
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/mathlive/dist/mathlive-static.css';
    document.head.appendChild(link);
})();

// ─────────────────────────────────────────────────────────────────────────────
class R2PDinamico extends HTMLElement {
    static get observedAttributes() {
        return ['tema', 'n', 'docente', 'tiempo', 'modo', 'curso', 'base-url'];
    }

    constructor() {
        super();
        this.container = document.createElement('div');
        this.appendChild(this.container);

        this.n = 10;
        this.docente = 'M.C. Roberto Alejandro Morin Romero';
        this.tiempo = 60;
        this.clave = null;
        this.modo = 0; // 0 = Revisión+Evidencia, 1 = Solo Revisión
        this.curso = '';       // ej. "mate1", "mate2", "FundamentosMatematicas"
        this.tema = '';
        this.baseUrl = _BASE;  // por defecto: carpeta src/ del script
        this._cargaTimer = null;
    }

    connectedCallback() {
        if (!this.curso && this.getAttribute('curso')) {
            this.curso = this.getAttribute('curso');
        }
        if (!this.tema && this.getAttribute('tema')) {
            this.tema = this.getAttribute('tema');
        }
        this._programarCarga();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        switch (name) {
            case 'tema':
                this.tema = newValue;
                this._programarCarga();
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
                this.modo = eval(newValue);
                break;
            case 'curso':
                this.curso = newValue;
                this._programarCarga();
                break;
            case 'base-url':
                this.baseUrl = newValue.endsWith('/') ? newValue : newValue + '/';
                this._programarCarga();
                break;
        }
    }

    _programarCarga() {
        if (!this.tema) return;
        // Esperamos al final del ciclo de eventos para asegurar que todos los atributos HTML hayan sido procesados
        if (this._cargaTimer) clearTimeout(this._cargaTimer);
        this._cargaTimer = setTimeout(() => {
            this.cargarTema(this.tema);
        }, 0);
    }

    // ── Utilidad: esperar a que MathJax esté listo ───────────────────────────
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

    // ── Obtener el curso actual (por atributo o auto-detección de URL) ──────
    _obtenerCurso() {
        if (this.curso) return this.curso;
        const attrCurso = this.getAttribute('curso');
        if (attrCurso) return attrCurso;

        // Auto-detección a partir de la URL de la página actual (ej: /MathCopy/mate1/actividad.html)
        const path = window.location.pathname;
        const cursos = ['mate1', 'mate2', 'FundamentosMatematicas', 'robotica', 'fichas'];
        for (const c of cursos) {
            if (path.includes(`/${c}/`) || path.endsWith(`/${c}`)) {
                return c;
            }
        }
        return '';
    }

    // ── Resolver URL del core y de los temas ─────────────────────────────────
    _resolverUrlCore() {
        return `${_BASE}r2p_core.js`;
    }

    _resolverUrlTema(tema) {
        const curso = this._obtenerCurso();
        let root = _ROOT;

        if (this.baseUrl && this.baseUrl !== _BASE) {
            root = this.baseUrl.endsWith('/src/')
                ? this.baseUrl.replace(/\/src\/$/, '/')
                : (this.baseUrl.endsWith('/') ? this.baseUrl : this.baseUrl + '/');
        }

        if (curso) {
            return `${root}${curso}/src/temas/${tema}.js`;
        }

        // Fallback si no hay curso especificado ni detectable
        return `${root}src/temas/${tema}.js`;
    }

    // ── Carga y renderizado del tema ─────────────────────────────────────────
    async cargarTema(tema) {
        try {
            const coreModule = await import(this._resolverUrlCore());
            const code = coreModule.generarCodigo();
            const temaUrl = this._resolverUrlTema(tema);
            const modulo = await import(temaUrl);
            const tipo = modulo.tipo();

            // ── Encabezado ──
            const fecha = new Date();
            const fechaStr = fecha.toLocaleDateString();
            const horaStr = fecha.toLocaleTimeString();

            this.container.innerHTML = `
        <table class="r2pi-head">
          <tr>
            <td width="20%">
              <center>
                <img src="${_BASE}icon2.png" width="50%">
                <p>raiz2pi.cc</p>
              </center>
            </td>
            <td>
              <center><h2>Tema: ${tema} ${modulo.name()}</h2></center>
              <center><h3 style="color:blue;">Fecha: ${fechaStr} ${horaStr}</h3></center>
              <center><h3>Docente: <span id='docente'>${this.docente}<span></h3></center>
            </td>
          </tr>
        </table>
        `;

            // ── Contenedor de preguntas ──
            let lienzo = `<div class="r2pi-contenedor" code="${code}" type="${tipo}" modo="${this.modo}" tiempo="${this.tiempo}">
          <p>Alumno: <input type="text" id="alumno" placeholder="Nombre del alumno"></p>
          <p id="r2p-calificacion"></p>
          <div id="r2p-evidencia"></div>
          <div id="r2p-qr"></div>
          `;

            if (tipo === 0) { // Opción múltiple
                for (let i = 0; i < this.n; i++) {
                    const preguntaHTML = await modulo.pregunta(i);
                    lienzo += coreModule.pregunta(preguntaHTML, code, i);
                }
                lienzo += `<button class="r2p-revisar" id="revisar" style="display: none;"></button>
          </div>`;

            } else if (tipo === 1 || tipo === 2 || tipo === 3) {
                for (let i = 0; i < this.n; i++) {
                    const preguntaHTML = await modulo.pregunta(i, tipo === 3 ? this.n : code);
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

            // Permite que módulos tipo 1/3 registren window.accionR2P
            if (modulo.render) {
                try {
                    await modulo.render(this.container, this.n, code);
                } catch (e) {
                    console.warn('Error al ejecutar modulo.render:', e);
                }
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
