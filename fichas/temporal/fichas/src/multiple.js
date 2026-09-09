// src/multiple.js

let temario = [];
let previewTimer = null;

document.addEventListener('DOMContentLoaded', async () => {
    crearContenedorPreview();
    await cargarTemario();

    // Listeners para visibilidad inmediata (sin regenerar)
    const checkExamenes = document.getElementById('check-examenes');
    const checkRespuestas = document.getElementById('check-respuestas');
    
    if(checkExamenes) checkExamenes.addEventListener('change', actualizarVisibilidad);
    if(checkRespuestas) checkRespuestas.addEventListener('change', actualizarVisibilidad);
});

function actualizarVisibilidad() {
    const checkExamenes = document.getElementById('check-examenes');
    const checkRespuestas = document.getElementById('check-respuestas');
    const contExamenes = document.getElementById('contenedor-examenes');
    const contRespuestas = document.getElementById('contenedor-respuestas');

    if (contExamenes) {
        contExamenes.style.display = checkExamenes.checked ? 'block' : 'none';
    }
    if (contRespuestas) {
        contRespuestas.style.display = checkRespuestas.checked ? 'block' : 'none';
    }
}

// --- REUTILIZADO: VISTA PREVIA ---
function crearContenedorPreview() {
    const div = document.createElement('div');
    div.id = 'preview-overlay';
    div.innerHTML = '<h4>Vista Previa</h4><div id="preview-content"></div>';
    document.body.appendChild(div);
}

async function mostrarPreview(ruta, titulo) {
    const overlay = document.getElementById('preview-overlay');
    const content = document.getElementById('preview-content');
    overlay.style.display = 'block';
    content.innerHTML = '<div class="loader-preview">Cargando...</div>';

    try {
        const rutaAbsoluta = new URL(ruta, document.baseURI).href;
        const modulo = await import(rutaAbsoluta);
        const data = await modulo.generar("Vista");

        content.innerHTML = `
            <div class="preview-header"><strong>${titulo}</strong></div>
            <div class="preview-body">${data.html}</div>
            <div class="preview-footer">Respuesta: <span style="color:blue">${data.respuesta || "?"}</span></div>
        `;
        if (window.MathJax) MathJax.Hub.Queue(["Typeset", MathJax.Hub, content]);
    } catch (err) {
        console.error(err);
        content.innerHTML = '<span style="color:red">Error cargando vista previa</span>';
    }
}

function ocultarPreview() {
    const overlay = document.getElementById('preview-overlay');
    if(overlay) overlay.style.display = 'none';
}

// --- REUTILIZADO: CARGA DE TEMARIO ---
async function cargarTemario() {
    const contenedorMenu = document.getElementById('menu-container');
    try {
        const response = await fetch('./temario.json');
        if (!response.ok) throw new Error("No se encontró temario.json");
        temario = await response.json();
        renderizarMenu(temario, contenedorMenu);
    } catch (error) {
        console.error(error);
        contenedorMenu.innerHTML = `<p style="color:red; padding:10px">Error cargando temario.json.</p>`;
    }
}

function renderizarMenu(datos, contenedor) {
    contenedor.innerHTML = '';
    datos.forEach(tema => {
        const detalleTema = document.createElement('details');
        detalleTema.open = true;
        detalleTema.className = 'nivel-tema';
        const resumenTema = document.createElement('summary');
        resumenTema.textContent = tema.nombre;
        detalleTema.appendChild(resumenTema);

        const listaSubtemas = document.createElement('div');
        listaSubtemas.className = 'contenedor-subtemas';

        tema.subtemas.forEach(sub => {
            const detalleSub = document.createElement('details');
            detalleSub.open = true;
            detalleSub.className = 'nivel-subtema';
            const resumenSub = document.createElement('summary');
            resumenSub.textContent = sub.nombre;
            resumenSub.style.fontSize = "0.95rem";
            resumenSub.style.color = "#444";
            detalleSub.appendChild(resumenSub);

            const listaSecciones = document.createElement('div');
            listaSecciones.className = 'contenedor-secciones';

            sub.secciones.forEach(sec => {
                const fieldset = document.createElement('fieldset');
                const legend = document.createElement('legend');
                legend.textContent = sec.nombre;
                fieldset.appendChild(legend);

                sec.ejercicios.forEach(ej => {
                    const label = document.createElement('label');
                    label.className = 'control-ejercicio';
                    label.addEventListener('mouseenter', () => {
                        clearTimeout(previewTimer);
                        previewTimer = setTimeout(() => mostrarPreview(ej.ruta, ej.titulo), 300);
                    });
                    label.addEventListener('mouseleave', () => {
                        clearTimeout(previewTimer);
                        ocultarPreview();
                    });

                    label.innerHTML = `
                        <input type="checkbox" class="selector-ejercicio" 
                               data-ruta="${ej.ruta}" 
                               data-puntos="${ej.puntos}">
                        <span>${ej.titulo}</span>
                    `;
                    fieldset.appendChild(label);
                });
                listaSecciones.appendChild(fieldset);
            });
            detalleSub.appendChild(listaSecciones);
            listaSubtemas.appendChild(detalleSub);
        });
        detalleTema.appendChild(listaSubtemas);
        contenedor.appendChild(detalleTema);
    });
}

// --- NUEVO: GENERACIÓN MÚLTIPLE ---

window.generarFichasMultiples = async function () {
    const seleccionados = document.querySelectorAll('.selector-ejercicio:checked');
    const lienzo = document.getElementById('examen-lienzo');
    const numCopias = parseInt(document.getElementById('num-copias').value) || 1;
    const semillaLabel = document.getElementById('id-inicial').value || "A";
    
    lienzo.innerHTML = '<div class="loader">Generando fichas...</div>';
    
    // Contenedores temporales
    let acumuladorExamenes = '';
    let acumuladorRespuestas = '';
    
    let colaGlobalScripts = [];

    // Bucle para crear N copias
    for (let i = 0; i < numCopias; i++) {
        // Calcular ID visible
        let idFicha = "";
        const esNumero = !isNaN(semillaLabel);
        
        if (esNumero) {
            idFicha = parseInt(semillaLabel) + i;
        } else {
            const charCode = semillaLabel.charCodeAt(0);
            idFicha = String.fromCharCode(charCode + i);
        }

        // --- GENERAR EXAMEN INDIVIDUAL ---
        let htmlPreguntas = '';
        let htmlRespuestasFicha = ''; // Respuestas solo de esta ficha
        let totalPuntos = 0;
        let contadorPregunta = 1;
        
        const fecha = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long' });

        // Cabecera de la Ficha
        htmlPreguntas += `
            <div class="encabezado-ficha">
                <div style="display:flex; justify-content:space-between; border-bottom: 2px solid #000; padding-bottom:10px; margin-bottom:20px;">
                     <div>
                        <h2>Matemáticas NM: Aplicaciones e Interpretaciones</h2>
                        <p><strong>Ficha ID:</strong> <span style="font-size:1.2em; color:red;">${idFicha}</span></p>
                     </div>
                     <div style="text-align:right;">
                        <p><strong>Fecha:</strong> ${fecha}</p>
                        <p><strong>Puntaje:</strong> _______</p>
                     </div>
                </div>
            </div>
        `;

        for (const input of seleccionados) {
            const ruta = input.dataset.ruta;
            try {
                const rutaAbsoluta = new URL(ruta, document.baseURI).href;
                const modulo = await import(rutaAbsoluta);
                
                // Generar ejercicio con nuevos aleatorios
                const data = await modulo.generar(contadorPregunta, idFicha);

                const labelPuntos = `[${input.dataset.puntos} pts]`;

                htmlPreguntas += `
                    <article class="pregunta-wrapper">
                        <aside class="info-pregunta">${labelPuntos}</aside>
                        <div class="contenido-pregunta">${data.html}</div>
                    </article>
                `;

                const textoRespuesta = data.respuesta ? data.respuesta : "<i>Sin respuesta definida</i>";
                
                // Formato de respuesta individual
                htmlRespuestasFicha += `
                    <div class="item-respuesta">
                        <strong>${contadorPregunta}.</strong> ${textoRespuesta}
                    </div>
                `;

                if (data.postRender && typeof data.postRender === 'function') {
                    colaGlobalScripts.push(data.postRender);
                }

                totalPuntos += parseInt(input.dataset.puntos || 0);
                contadorPregunta += (data.numPreguntas || 1);

            } catch (err) {
                console.error(`Error en ficha ${idFicha}, ejercicio ${ruta}:`, err);
                htmlPreguntas += `<div class="error-box">Error cargando ejercicio</div>`;
            }
        }

        // Pie de la ficha (Resumen)
        htmlPreguntas += `
            <div class="resumen-final no-print" style="margin-top:20px; border-top:1px solid #eee; padding-top:10px;">
                <p>Total Puntos: ${totalPuntos} | Preguntas: ${contadorPregunta - 1}</p>
            </div>
        `;

        // 1. Acumular Examen
        acumuladorExamenes += `
            <div class="ficha-container" style="break-after: page; border-bottom: 2px dashed #ccc; padding-bottom: 40px; margin-bottom: 40px;">
                ${htmlPreguntas}
            </div>
        `;

        // 2. Acumular Respuestas
        acumuladorRespuestas += `
            <section class="seccion-respuestas" style="break-after: page; margin-top: 30px;">
                <h3>Solucionario - Ficha ID: ${idFicha}</h3>
                <div class="lista-respuestas" style="display: flex; flex-wrap: wrap; gap: 15px;">
                    ${htmlRespuestasFicha}
                </div>
            </section>
        `;
    }

    // --- RENDERIZADO FINAL ---
    lienzo.innerHTML = ''; 

    // Renderizamos SIEMPRE ambos bloques, ocultos o visibles según el checkbox
    // Usamos contenedores con ID para poder manipularlos luego
    const divExamenes = document.createElement('div');
    divExamenes.id = 'contenedor-examenes';
    divExamenes.innerHTML = acumuladorExamenes;
    
    // Div separador para salto de página entre bloques (si ambos visibles)
    // Lo controlaremos también por CSS si es necesario, pero un break-before always en respuestas suele bastar
    // si están en flujo normal.
    
    const divRespuestas = document.createElement('div');
    divRespuestas.id = 'contenedor-respuestas';
    divRespuestas.innerHTML = acumuladorRespuestas;
    // Forzamos salto de página antes de todo el bloque de respuestas
    divRespuestas.style.breakBefore = 'page';

    // Estilos CSS inyectados para las respuestas
    const estilosRespuestas = document.createElement('style');
    estilosRespuestas.textContent = `
        .item-respuesta {
            flex: 1 1 300px;
            border: 1px solid #ddd;
            padding: 10px;
            border-radius: 4px;
            page-break-inside: avoid;
            background: #f9f9f9;
        }
        @media print {
            .ficha-container { border-bottom: none !important; margin-bottom: 0 !important; }
            .item-respuesta { border: 1px solid #aaa; }
        }
    `;

    lienzo.appendChild(divExamenes);
    lienzo.appendChild(estilosRespuestas);
    lienzo.appendChild(divRespuestas);

    // Aplicar visibilidad inicial correcta
    actualizarVisibilidad();

    // Ejecutar scripts post-render
    colaGlobalScripts.forEach(fn => { try { fn(); } catch (e) { console.error(e); } });

    // Renderizar MathJax
    if (window.MathJax) {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, lienzo]);
    }
};