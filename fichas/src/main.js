// main.js
import './r2p.js';
import * as r2pCoremodule from './r2p_core.js';
const nombreCurso = 'Matemáticas parte 1';
const informacionCurso = '<h2>Docente: M.C. Roberto Alejandro Morin Romero</h2>';
export function nomCurso() {
  return nombreCurso;
}
export async function info() {
  document.getElementById('nombreCurso').innerText = nombreCurso;
  document.getElementsByTagName('title')[0].innerText = nombreCurso;
  document.getElementById('Info').innerHTML = informacionCurso;
  setupActividad()
  console.log('Información del curso cargada correctamente');
  await mostrar()
}
export async function autenticar() {
  
  document.getElementById('nombreCurso').innerText = nombreCurso;
  document.getElementsByTagName('title')[0].innerText = nombreCurso;
  document.getElementById('Info').innerHTML = informacionCurso;
  //Vamos a desencriptar a info
  const a = window.location.href
  const nLocation = a.indexOf('?a=')
  let cadena = a.substring(nLocation+3)
  //console.log(`a: ${cadena} nloc: ${nLocation}`)
  const msm = r2pCoremodule.desencriptar(cadena,'','raw')

  console.log(`msm: ${msm.slice(12)}  `)
  
  console.log(`mensaje desencriptado: ${msm}`)
  const tema=msm.slice(0,3)
  const aciertos = msm[3]
  const total = msm[4]
  const tipo = msm[5]
  const Hi=msm.slice(6,8)
  const Hf=msm.slice(8,10)
  const fecha=msm.slice(10,12)
  const temaInfo = await import(`./temas/${tema[0]}.${tema[1]}.${tema[2]}.js`);

  let contenedor = document.getElementById('datos')
  contenedor.innerHTML =`
  ${msm.length>12?`<h2>Alumno: <b>${msm.slice(12).join('')}</b></h2>`:''}
  <h2>Tema: <b>${tema[0]}.${tema[1]}.${tema[2]} ${temaInfo.name()}</b></h2>
  <h2>Fecha de realización <b>${fecha[0]} / ${fecha[1]}</b></h2>
  <h2>Aciertos: <b>${aciertos}/${total}</b></h2>
  <h2>Calificación: <b>${Math.ceil(aciertos/total*100)}</b></h2>
  <h2>Tipo de ejercicio: <b>${tipo==0?'Opción múltiple':(tipo==1?'Abierto':'Geogebra')}</b></h2>
  `

  let contenedor2 = document.getElementById('oculto')
  contenedor2.innerHTML =`
  <h2>Hora de inicio: <b>${Hi[0]}:${Hi[1]}</b></h2>
  <h2>Hora finalización <b>${Hf[0]}:${Hf[1]}</b></h2>
  `
  console.log(`tema: ${tema}`)
  console.log(`aciertos: ${aciertos}`)
  console.log(`total: ${total}`)
  console.log(`tipo: ${tipo}`)
  console.log(`Hora de inicio: ${Hi}`)
  console.log(`Hora de finalizar: ${Hf}`)
  console.log(`Hora de fecha: ${fecha}`)
  
  /*
    Organización de la información
    Pendiente
    [0-8]codigo
    [9-11] tema
    [12] aciertos
    [13] total
    [14] tipo 
    [15-16] Hora de inicio 
    [17-18] Hora de fin
    [19-21] fecha  
    */
  
}
export function setupActividad(callback) {
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'm') {
      e.preventDefault();
      console.log('Combinación Ctrl+M detectada');
      document.getElementById('setup').style.display = 'block';
    }
  });
}
export function generaLink(archivoString){
  
  //console.log('Generando link para:', archivoString);
  const numPreguntas = document.getElementById('numPreguntas').value || 10;
  const modo = document.getElementById('modo').value || 0;
  const tiempo = document.getElementById('tiempo').value || 60;
  const setup = `${archivoString}.${numPreguntas}.${modo}.${tiempo}`
  window.open(`./ficha.html?a=${setup}`, "_blank");
}
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

// Cambiar tema desde botón
window.cambiarTema = function(nuevoTema) {
  const comp = document.querySelector('r2p-dinamico');
  comp.setAttribute('tema', nuevoTema);
};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contenido').addEventListener('click', (e) => {
    const link = e.target.closest('.activity-link');
    if (link) {
      e.preventDefault();
      const archivo = link.getAttribute('data-archivo');
      generaLink(archivo);
    }
  });
  
});

async function mostrar() {
    let mainE = document.getElementById('contenido');
    mainE.innerHTML = '<div style="text-align:center; padding: 2rem;">Cargando temas...</div>';
    
    let temario = {};
    let temas = [];

    try {
        let ruta = window.location.href;
        if(ruta.endsWith('index.html')) ruta = ruta.substring(0, ruta.length - 10);
        else if(ruta.endsWith('index')) ruta = ruta.substring(0, ruta.length - 5);
        if(!ruta.endsWith('/')) ruta += '/';

        const res = await fetch(`${ruta}src/temas/index.json`);
        temas = await res.json(); 

        try {
            const resT = await fetch(`${ruta}src/temas/temario.json`);
            if (resT.ok) {
                temario = await resT.json();
            }
        } catch (e) {
            console.warn('No se pudo cargar temario.json');
        }
    } catch (error) {
        mainE.innerHTML = '<div style="color:red; padding: 2rem;">Error al cargar los temas.</div>';
        console.error(`Fallo al intentar cargar datos`, error);
        return; 
    }

    // Structure data: Block -> Subtheme -> Exercises
    const structure = {};
    
    // First, initialize structure from temario
    for (const blockId in temario) {
        structure[blockId] = {
            nombre: temario[blockId].nombre,
            subtemas: {}
        };
        for (const subId in temario[blockId].subtemas) {
            structure[blockId].subtemas[subId] = {
                nombre: temario[blockId].subtemas[subId],
                ejercicios: []
            };
        }
    }

    // Then, add exercises to the structure
    for (const [id, nombre] of temas) {
        const parts = id.split('.');
        if (parts.length < 2) continue;
        
        const blockId = parts[0];
        const subId = `${parts[0]}.${parts[1]}`;

        if (!structure[blockId]) {
            structure[blockId] = { nombre: `Bloque ${blockId}`, subtemas: {} };
        }
        if (!structure[blockId].subtemas[subId]) {
            structure[blockId].subtemas[subId] = { 
                nombre: `Subtema ${subId}`, 
                ejercicios: [] 
            };
        }
        structure[blockId].subtemas[subId].ejercicios.push({ id, nombre });
    }

    // Render Accordion
    let html = '<div class="accordion">';
    const icons = ['🔢', '📈', '📐', '📊', '∫'];
    
    const sortedBlockIds = Object.keys(structure).sort((a,b) => Number(a) - Number(b));
    
    sortedBlockIds.forEach((blockId, index) => {
        const block = structure[blockId];
        const icon = icons[index % icons.length];
        
        let hasExercises = false;
        for (const subId in block.subtemas) {
            if (block.subtemas[subId].ejercicios.length > 0) {
                hasExercises = true;
                break;
            }
        }
        
        if (!hasExercises) return;

        html += `
        <div class="accordion-item" id="block-${blockId}">
          <div class="accordion-header">
            <span class="icon">${icon}</span>
            <span class="title">${blockId}. ${block.nombre}</span>
            <span class="arrow">▼</span>
          </div>
          <div class="accordion-content">
            <div class="sub-accordion">
        `;

        const sortedSubIds = Object.keys(block.subtemas).sort((a,b) => {
            const pa = a.split('.').map(Number);
            const pb = b.split('.').map(Number);
            return pa[1] - pb[1];
        });

        sortedSubIds.forEach(subId => {
            const subtema = block.subtemas[subId];
            if (subtema.ejercicios.length === 0) return;

            html += `
            <div class="accordion-item sub-item" id="sub-${subId}">
              <div class="accordion-header sub-header">
                <span class="sub-title">${subId} ${subtema.nombre}</span>
                <span class="arrow">▼</span>
              </div>
              <div class="accordion-content">
                <div class="exercise-list">
            `;

            subtema.ejercicios.forEach(ex => {
                html += `
                <div class="exercise-item">
                  <a href="#" class="activity-link" data-archivo="${ex.id}">
                    <span class="id">${ex.id}</span>
                    <span class="name">${ex.nombre}</span>
                  </a>
                </div>
                `;
            });

            html += `
                </div>
              </div>
            </div>
            `;
        });

        html += `
            </div>
          </div>
        </div>
        `;
    });

    html += '</div>';
    mainE.innerHTML = html;

    // Add accordion click handlers using delegation
    mainE.addEventListener('click', (e) => {
        const header = e.target.closest('.accordion-header');
        if (header) {
            e.stopPropagation();
            const item = header.parentElement;
            item.classList.toggle('active');
        }
    });
}
export async function mostrarEjercicio() {
  
  const url = new URL(window.location.href);
  const parametrosString = url.searchParams.get('a');
  if (!parametrosString) {
    window.location.assign("./");
    return;
  }
  const parametros = parametrosString.split('.').map(Number);
  //console.log(parametros); // [1, 1, 1, 10, 0, 60]
  const contenedor = document.getElementById('contenedorEjercicio');
  contenedor.innerHTML = `<r2p-dinamico tema="${parametros[0]}.${parametros[1]}.${parametros[2]}" n="${parametros[3]}" modo="${parametros[4]}" tiempo="${parametros[5]}"></r2p-dinamico>`;
}

export async function mostrarEjercicioFicha() {
  const url = new URL(window.location.href);
  const parametrosString = url.searchParams.get('a');
  if (!parametrosString) {
    window.location.assign("./");
    return;
  }
  const parametros = parametrosString.split('.').map(Number);
  
  // En caso que desde index.html lleguen las cosas en la url
  const tema = parametros.slice(0, 3).join('.');
  const n = parametros[3] || 5; 
  const nfichas = 1; // Por deceto generamos 1 ficha

  const UI_num = document.getElementById('uiNum');
  const UI_fichas = document.getElementById('uiFichas');
  if(UI_num) UI_num.value = n;
  if(UI_fichas) UI_fichas.value = nfichas;

  const contenedor = document.getElementById('contenedorEjercicio');
  contenedor.innerHTML = `<r2p-dinamico tema="${tema}" n="${n}" nfichas="${nfichas}"></r2p-dinamico>`;
}

