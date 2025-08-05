// main.js
import './r2p.js';
import * as r2pCoremodule from './r2p_core.js';
const nombreCurso = 'Matemáticas parte 2';
const informacionCurso = '<h2>Docente: M.C. Roberto Alejandro Morin Romero</h2>';

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
  window.open(`./actividad.html?a=${setup}`, "_blank");
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
  function separarTemas(name){
      const partes = name.split('.');
      return partes.slice(0, 3);
    }
  //console.log('Cargando temas...');
  let mainE = document.getElementById('contenido');
  let lista = [];
  
  try {
    let ruta =window.location.href
    if(ruta.endsWith('index.html')) ruta = ruta.substring(0,ruta.length-10)
    if(ruta.endsWith('index')) ruta = ruta.substring(0,ruta.length-5)

    const res = await fetch(`${ruta}${ruta.endsWith('/')?'':'/'}src/temas/index.json`);
    const temas = await res.json();
    
    //console.log('temas:', temas);
    mainE.innerHTML = '';
    for (const t of temas) {
      const posicionTema = separarTemas(t)
      
      
      /*if (posicionTema[0] in lista && Array.isArray(lista[posicionTema[0]])) {
          console.log(`lista[${posicionTema[0]}] existe y es un arreglo`);
      } else {
          console.log(`lista[${posicionTema[0]}] NO existe o no es un arreglo`);
          lista[posicionTema[0]] = [];
      }*/
     if (!(posicionTema[0] in lista && Array.isArray(lista[posicionTema[0]]))) lista[posicionTema[0]] = [];
      
      //console.log(`>${window.location.href}/src/temas/${t}.js ---${posicionTema}`);
      try {
        //const ruta =window.location.href
        
        const mod = await import(`${ruta}${ruta.endsWith('/')?'':'/'}src/temas/${t}.js`);
        const nombre = `${t} ${mod.name()}`
        lista[posicionTema[0]].push([t,nombre]);
        
        //mainE.innerHTML += ` ${nombre}<br>`;
        
      } catch (error) {
        console.error(`No se pudo cargar el tema ${t}`, error);
        mainE.innerHTML = error+"<br>"+`${ruta}${ruta.endsWith('/')?'':'/'}src/temas/${t}.js`;
        alert(error)
      }
    }
  } catch (error) {
    mainE.innerHTML = 'Error al cargar los temas';
    let ruta =window.location.href
    if(ruta.endsWith('index.html')) ruta = ruta.substring(0,ruta.length-10)
    if(ruta.endsWith('index')) ruta = ruta.substring(0,ruta.length-5)
    console.log(`${ruta}${ruta.endsWith('/')?'':'/'}src/temas/index.json`);
    console.error(error);
  }
  
  for(let k=1; k<lista.length; k++){
    if(lista[k] && lista[k].length >= 0){
      let card = `<div class="card"><div class="card-icon">Bloque ${k}</div><div>`
        
        for(let k2=0; k2<lista[k].length; k2++){
          
          card += `<p><a target="_blank" class="activity-link" data-archivo="${lista[k][k2][0]}"> ${lista[k][k2][1]}</a></p>`;
        }
      card += `</div></div>`;
      mainE.innerHTML+=card;
      
    }
  }

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

