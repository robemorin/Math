import {nomCurso} from './main.js'

export function setup(){
    //VAmos a configurar primero el encabezado
    let dtitulo = document.getElementById('titulo')
    let dcabecera = document.getElementById('parametros')
    let dcontenedor = document.getElementById('contenedor')

    //configurarBoton()
    document.getElementById('addButton').onclick = async function() {  addReactivo() }
    document.getElementById('crearCuestionarios').onclick = async function() {  await genCuestionarios() }

    dcontenedor.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete')) {
            cerrar(event.target)
        }
    });

    dtitulo.innerHTML = `Generador de reactivos`
    dcabecera.style.display = 'block'
    dtitulo.style.display = 'block'
    dcontenedor.style.display = 'block'
}

async function leerJsonTemas(){
    try{
        let ruta =window.location.href
        if(ruta.endsWith('imp.html')) ruta = ruta.substring(0,ruta.length-8)
        if(ruta.endsWith('imp')) ruta = ruta.substring(0,ruta.length-3)
        const res = await fetch(`${ruta}${ruta.endsWith('/')?'':'/'}src/temas/index.json`);

        const temas = await res.json();
        //console.log(temas)
        return temas
    }
    catch(e){
        console.log(`Error: `,e)
        return 0
    }
}
async function creaSelectInputTemas(temas){
    let ruta =window.location.href
    if(ruta.endsWith('imp.html')) ruta = ruta.substring(0,ruta.length-8)
    if(ruta.endsWith('imp')) ruta = ruta.substring(0,ruta.length-3)

    const n = temas.length
    let options=``
    try{
        for(let counter=0; counter<n;++counter){
            // ¡ESTE IMPORT FALLA!
            const mod = await import(`${ruta}${ruta.endsWith('/')?'':'/'}src/temas/${temas[counter][0]}.js`); 
            
            //const nombre = mod.name()
            const tipo = mod.tipo() // Aún se usa para el filtro
            if(tipo==0 || tipo == 3 )  options += `<option value="${temas[counter][0]}">${temas[counter][0]}.- ${temas[counter][1]} </option>`
        }
        return `<select>${options}</select>`
    }catch(e){
        console.log(`Error al cargar temas --> funcion crearSelectInputTemas `,e)
        return 0
    }
}
export function cerrar(boton){ boton.parentElement.remove() }

export async function addReactivo(){
    let dcontenedor = document.getElementById('contenedor')
    const temas = await leerJsonTemas()
    //console.log(temas)
    console.log('Botón clickeado y correcto');
    let codigoAdd = `<div class="nuevaPregunta">
        <button class="delete"></button>
        Num. reactivos <input name="cantidad" type="number" value="1" class="inputDosDigitos">
        ${await creaSelectInputTemas(temas)}
    </div>`
    dcontenedor.innerHTML += codigoAdd
}
export async function genCuestionarios(){
    async function procesaPregunta(cont,modulo){
        //Aquí vamos a procesar la pregunta de los archivos para impresión
        //console.log(`llamado desde procesa pregunta, tipo ${modulo.tipo()}`)
        //Por ahora solo están habilitados los tipo 0 y 3.
        if(modulo.tipo() == 0){// Es de opción múltiple
            const [P, R] = await modulo.pregunta(cont)
            //console.log(`Pregunta: ${P}`)
            //console.log(`R: ${R}`)
            return [`<div class="pregunta-abierta">${P}<br></div>`,`<span class="solucionario">[${cont+1}] ${R[0]}</span>`]

        }else if(modulo.tipo() == 3){// es un objeto
            const [P, R] = await modulo.pregunta(cont,0,true)
            //console.log(`P: ${P} R: ${R} `)
            return [P,R]
        }
    }
    const numCuestionarios = document.getElementById('nFichas').value

    const cuestionario = document.getElementById('cuestionarios')
    const solucionario = document.getElementById('cuestionariosRespuestas')
    const typeHeader = Number(document.querySelector('input[name="portada"]:checked').value);
    
    let contCuestionario=''
    let contSolucionario=''
    let ruta =window.location.href
    if(ruta.endsWith('imp.html')) ruta = ruta.substring(0,ruta.length-8)
    if(ruta.endsWith('imp')) ruta = ruta.substring(0,ruta.length-3)

    const peticiones = document.getElementsByClassName('nuevaPregunta')
    const numeroPeticiones = peticiones.length
    //contCuestionario = `Peticiones: ${nPeticiones}`
    for(let IDcuest=0;IDcuest<numCuestionarios ; ++IDcuest){
        contCuestionario += `<div class="">${encabezadoCuestionario(typeHeader,IDcuest+1)} `
        contSolucionario += `<div class="solucionId">(ID ${IDcuest+1})`
        let contadorPregunta=0
        for(let k0=0; k0 < numeroPeticiones; ++k0){
            const peticion = peticiones[k0]
            let numPreguntaPeticion = peticion.getElementsByTagName('input')[0].value
            let tema = peticion.getElementsByTagName('select')[0].value
            //console.log(`Peticion ${k0}: ${numPreguntaPeticion}`)
            let pregunta, respuesta,mod
            try{
                mod = await import(`${ruta}${ruta.endsWith('/')?'':'/'}src/temas/${tema}.js`);
                
            }catch(e){
                console.log(`No se pudo cargar el tema ${tema}. `,e)
            }

            for(let k1=0; k1 < numPreguntaPeticion; ++k1){
                [pregunta, respuesta] = await procesaPregunta(contadorPregunta++,mod)
                contCuestionario += pregunta
                contSolucionario += `${mod.tipo()==0?'':`[${contadorPregunta}]`} ${respuesta}`
            }
        }
        contCuestionario += '</div>'
        contSolucionario += '</div>'
    }

    cuestionario.innerHTML = contCuestionario
    solucionario.innerHTML = contSolucionario

    const preguntas = document.querySelectorAll('.pregunta-abierta');

    // Mostrar cada uno
    preguntas.forEach(pregunta => {
    pregunta.style.display = 'block';
    });
    return
}
function encabezadoCuestionario(tipo,id){
    
    const docente = document.getElementById('docente').value
            const escuela = document.getElementById('escuela').value
            let fecha = document.getElementById('fecha').value
            const tiempo = document.getElementById('tiempo').value
if(fecha==''){
    const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const dummy= new Date();
const mes = meses[dummy.getMonth()];
const ano = dummy.getFullYear();
fecha = `${mes} ${ano}`;

}

    switch(tipo){
        case 2:
            
            return `
            <table class="r2pi-encabezado">
    <tr><td rowspan="3" width="105px">
    <img src="../src/icon2.png" alt="Raiz2pi" ></td>
    <td style="border-bottom: 2px solid black;" colspan="3"><b>${escuela==''?'Escuela:':escuela}</center></td></tr>
    <tr><td style="border-bottom: 2px solid black;" colspan="3">Docente: ${docente}</td></tr>
    <tr><td>ID: ${id}</td><td>Tiempo: ${tiempo} min</td><td> Fecha: ${fecha}</td></tr>

</table>
        `
    case 3:    
    return `
<div class="r2p-portada">
  <div class="header">
    <table class="r2pi-encabezado">
      <tr>
        <td rowspan="3" width="105px">
          <img src="../src/icon2.png" alt="Raiz2pi">
        </td>
        <td style="border-bottom: 2px solid black;" colspan="3">
          <b>${escuela==''?'Escuela:':escuela}</b>
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
      <li>En esta prueba es necesario usar una calculadora.</li>
      <li>Conteste todas las preguntas.</li>
    </ul>
  </div>
</div>
`
}
return `
<table class="r2pi-encabezado"><tr><td>
    <img src="../src/icon2.png" alt="Raiz2pi" /></td><td style="border-bottom: 2px solid black;">
    Nombre:</td></tr>
<tr><td>Id: ${id}</td>
</table>
        `
}
/*
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
document.head.appendChild(script);*/

// Configuración de MathJax
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

// Cargar MathJax
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
script.async = true;
script.onload = () => {
  console.log("✅ MathJax cargado");

  // Iniciar el observador después de que MathJax esté listo
  startMathJaxObserver();
};
document.head.appendChild(script);

// Función para procesar un contenedor
function renderMath(container = document.body) {
  if (window.MathJax) {
    MathJax.typesetPromise([container])
      .catch(err => console.error("❌ Error procesando MathJax:", err));
  }
}

function startMathJaxObserver() {
  const observer = new MutationObserver(mutations => {
    for (let mutation of mutations) {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            if (node.innerHTML && /(\$.*\$|\\\(|\\\[)/.test(node.innerHTML)) {
              renderMath(node);
            }
          }
        });
      } else if (mutation.type === "characterData") {
        const parent = mutation.target.parentElement;
        if (parent && /(\$.*\$|\\\(|\\\[)/.test(parent.innerHTML)) {
          renderMath(parent);
        }
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
}
