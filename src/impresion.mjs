// nomCurso() lee la variable global window.r2pNomCurso si está definida
// (el main.js de cada curso la puede establecer antes de cargar este módulo)
function nomCurso() {
    return window.r2pNomCurso ?? 'Curso';
}

// Nombre de la carpeta del proyecto en local. Si la renombras, actualiza esta variable:
export const PROJECT_DIR = 'MathCopy';

function calcularImpresionBase() {
    const scriptUrl = import.meta.url;
    if (PROJECT_DIR && scriptUrl.includes(`/${PROJECT_DIR}/`)) {
        const idx = scriptUrl.indexOf(`/${PROJECT_DIR}/`);
        return `${scriptUrl.substring(0, idx + PROJECT_DIR.length + 2)}src/`;
    }
    return new URL('./', scriptUrl).href;
}

const _IMPRESION_BASE = calcularImpresionBase();

// ── Caché en memoria para evitar peticiones repetitivas ───────────────────────
let _temasCache = null;
let _selectHTMLCache = null;
const _modulosCache = new Map();

export function setup(){
    // Configurar encabezado y contenedores
    let dtitulo = document.getElementById('titulo');
    let dcabecera = document.getElementById('parametros');
    let dcontenedor = document.getElementById('contenedor');

    document.getElementById('addButton').onclick = async function() { await addReactivo(); };
    document.getElementById('crearCuestionarios').onclick = async function() { await genCuestionarios(); };

    dcontenedor.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete')) {
            cerrar(event.target);
        }
    });

    dtitulo.innerHTML = `Generador de reactivos`;
    dcabecera.style.display = 'block';
    dtitulo.style.display = 'block';
    dcontenedor.style.display = 'block';

    // Pre-cargar la lista de temas en segundo plano inmediatamente
    leerJsonTemas();
}

async function leerJsonTemas(){
    if (_temasCache) return _temasCache;
    try{
        let ruta = window.location.href;
        if(ruta.endsWith('imp.html')) ruta = ruta.substring(0, ruta.length - 8);
        if(ruta.endsWith('imp')) ruta = ruta.substring(0, ruta.length - 3);
        const res = await fetch(`${ruta}${ruta.endsWith('/') ? '' : '/'}src/temas/index.json`);
        _temasCache = await res.json();
        return _temasCache;
    }
    catch(e){
        console.error(`Error al leer index.json en impresion: `, e);
        return [];
    }
}

async function creaSelectInputTemas(temas){
    // Si ya fue generado previamente, lo devolvemos al instante (0 ms)
    if (_selectHTMLCache) return _selectHTMLCache;

    if (!temas || !temas.length) {
        return `<select><option>Sin temas disponibles</option></select>`;
    }

    // index.json contiene [[id, nombre], ...]. Construimos el select de inmediato
    // sin hacer 100+ imports secuenciales por red:
    let options = '';
    for (let i = 0; i < temas.length; i++) {
        options += `<option value="${temas[i][0]}">${temas[i][0]}.- ${temas[i][1]}</option>`;
    }
    _selectHTMLCache = `<select class="select-tema">${options}</select>`;
    return _selectHTMLCache;
}

export function cerrar(boton){ boton.parentElement.remove(); }

export async function addReactivo(){
    let dcontenedor = document.getElementById('contenedor');
    const temas = await leerJsonTemas();
    const selectHTML = await creaSelectInputTemas(temas);
    
    let codigoAdd = `<div class="nuevaPregunta">
        <button class="delete"></button>
        Num. reactivos <input name="cantidad" type="number" value="1" min="1" class="inputDosDigitos">
        ${selectHTML}
    </div>`;
    dcontenedor.insertAdjacentHTML('beforeend', codigoAdd);
}

export async function genCuestionarios(){
    const btnGenerar = document.getElementById('crearCuestionarios');
    const textoOriginal = btnGenerar ? btnGenerar.innerText : 'Generar';
    if (btnGenerar) {
        btnGenerar.disabled = true;
        btnGenerar.innerText = 'Generando...';
    }

    try {
        async function procesaPregunta(cont, modulo){
            if (!modulo) return ['', ''];
            // Tipo 0: Opción múltiple
            if(modulo.tipo() == 0){
                const [P, R] = await modulo.pregunta(cont);
                return [`<div class="pregunta-abierta">${P}<br></div>`, `<span class="solucionario">[${cont+1}] ${R[0]}</span>`];
            } else if(modulo.tipo() == 3){ // Tipo 3: Híbrido / imprimible
                const [P, R] = await modulo.pregunta(cont, 0, true);
                return [P, R];
            } else if(modulo.tipo() == 1){ // Tipo 1: Abierto con esImprimible
                const res = await modulo.pregunta(cont, 0, true);
                if (Array.isArray(res)) {
                    return [res[0], `<span class="solucionario">[${cont+1}] ${res[1]}</span>`];
                }
                return [res, ''];
            }
            return ['', ''];
        }

        const numCuestionarios = Number(document.getElementById('nFichas').value) || 1;
        const cuestionario = document.getElementById('cuestionarios');
        const solucionario = document.getElementById('cuestionariosRespuestas');
        const typeHeader = Number(document.querySelector('input[name="portada"]:checked')?.value || 1);
        
        let contCuestionario = '';
        let contSolucionario = '';
        let ruta = window.location.href;
        if(ruta.endsWith('imp.html')) ruta = ruta.substring(0, ruta.length - 8);
        if(ruta.endsWith('imp')) ruta = ruta.substring(0, ruta.length - 3);

        const peticiones = document.getElementsByClassName('nuevaPregunta');
        const numeroPeticiones = peticiones.length;

        for(let IDcuest = 0; IDcuest < numCuestionarios; ++IDcuest){
            contCuestionario += `<div class="">${encabezadoCuestionario(typeHeader, IDcuest + 1)} `;
            contSolucionario += `<div class="solucionId">(ID ${IDcuest + 1})`;
            let contadorPregunta = 0;

            for(let k0 = 0; k0 < numeroPeticiones; ++k0){
                const peticion = peticiones[k0];
                let numPreguntaPeticion = Number(peticion.getElementsByTagName('input')[0].value) || 1;
                let tema = peticion.getElementsByTagName('select')[0].value;

                let mod;
                try{
                    // Reutilizar módulo cacheado si ya se descargó
                    if (!_modulosCache.has(tema)) {
                        const temaUrl = `${ruta}${ruta.endsWith('/') ? '' : '/'}src/temas/${tema}.js`;
                        const m = await import(temaUrl);
                        _modulosCache.set(tema, m);
                    }
                    mod = _modulosCache.get(tema);
                }catch(e){
                    console.error(`No se pudo cargar el tema ${tema}: `, e);
                    continue;
                }

                for(let k1 = 0; k1 < numPreguntaPeticion; ++k1){
                    const [pregunta, respuesta] = await procesaPregunta(contadorPregunta++, mod);
                    contCuestionario += pregunta;
                    contSolucionario += `${mod.tipo() == 0 ? '' : `[${contadorPregunta}]`} ${respuesta} `;
                }
            }
            contCuestionario += '</div>';
            contSolucionario += '</div>';
        }

        cuestionario.innerHTML = contCuestionario;
        solucionario.innerHTML = contSolucionario;

        // Mostrar preguntas
        const preguntas = document.querySelectorAll('.pregunta-abierta');
        preguntas.forEach(pregunta => {
            pregunta.style.display = 'block';
        });

        // Renderizar fórmulas con MathJax de forma limpia y directa (sin MutationObserver excesivo)
        if (window.MathJax && window.MathJax.typesetPromise) {
            if (btnGenerar) btnGenerar.innerText = 'Renderizando fórmulas...';
            await window.MathJax.typesetPromise([cuestionario, solucionario]);
        }

    } finally {
        if (btnGenerar) {
            btnGenerar.disabled = false;
            btnGenerar.innerText = textoOriginal;
        }
    }
}

function encabezadoCuestionario(tipo, id){
    const docente = document.getElementById('docente').value;
    const escuela = document.getElementById('escuela').value;
    let fecha = document.getElementById('fecha').value;
    const tiempo = document.getElementById('tiempo').value;

    if(fecha === ''){
        const meses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        const dummy = new Date();
        const mes = meses[dummy.getMonth()];
        const ano = dummy.getFullYear();
        fecha = `${mes} ${ano}`;
    }

    switch(tipo){
        case 2:
            return `
            <table class="r2pi-encabezado">
                <tr>
                    <td rowspan="3" width="105px">
                        <img src="${_IMPRESION_BASE}icon2.png" alt="Raiz2pi">
                    </td>
                    <td style="border-bottom: 2px solid black;" colspan="3"><b>${escuela === '' ? 'Escuela:' : escuela}</b></td>
                </tr>
                <tr>
                    <td style="border-bottom: 2px solid black;" colspan="3">Docente: ${docente}</td>
                </tr>
                <tr>
                    <td>ID: ${id}</td><td>Tiempo: ${tiempo} min</td><td> Fecha: ${fecha}</td>
                </tr>
            </table>`;
        case 3:    
            return `
            <div class="r2p-portada">
              <div class="header">
                <table class="r2pi-encabezado">
                  <tr>
                    <td rowspan="3" width="105px">
                      <img src="${_IMPRESION_BASE}icon2.png" alt="Raiz2pi">
                    </td>
                    <td style="border-bottom: 2px solid black;" colspan="3">
                      <b>${escuela === '' ? 'Escuela:' : escuela}</b>
                    </td>
                  </tr>
                  <tr>
                    <td style="border-bottom: 2px solid black;" colspan="3">Docente: ${docente}</td>
                  </tr>
                </table>

                <div class="exam-title">Curso - ${nomCurso()}</div>
                <div class="exam-level">Nivel Medio</div>
                <div class="exam-level">${fecha}</div>
                <div class="exam-duration">${tiempo} minutos</div>
              </div>
              
              <div class="instructions">
                ID: ${id}
                <div class="instructions-title">INSTRUCCIONES PARA LOS ALUMNOS</div>
                <ul style="margin-top: 0; padding-left: 20px;">
                  <li>Escriba su nombre en el recuadro correspondiente.</li>
                  <li>No abra este examen hasta que se lo indiquen.</li>
                  <li>En esta prueba es necesario usar una calculadora de pantalla gráfica.</li>
                  <li>Conteste todas las preguntas.</li>
                  <li>Escriba sus respuestas en las casillas provistas para tal efecto.</li>
                  <li>A menos que se indique lo contrario en la pregunta, todas las respuestas numéricas deben ser exactas o tener tres cifras significativas.</li>
                  <li>Necesitará un ejemplar limpio del cuadernillo de fórmulas de Matemáticas: Aplicaciones e interpretaciones.</li>
                </ul>
              </div>
            </div>`;
    }

    return `
    <table class="r2pi-encabezado">
        <tr>
            <td><img src="${_IMPRESION_BASE}icon2.png" alt="Raiz2pi" /></td>
            <td style="border-bottom: 2px solid black;">Nombre:</td>
        </tr>
        <tr>
            <td>Id: ${id}</td>
        </tr>
    </table>`;
}

// ── Carga y configuración de MathJax ─────────────────────────────────────────
if (!window.MathJax) {
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

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    script.async = true;
    document.head.appendChild(script);
}
