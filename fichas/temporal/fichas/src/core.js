// src/core.js

let temario = [];
let previewTimer = null; // Temporizador para evitar parpadeos al mover el mouse rápido

// Inicialización
document.addEventListener('DOMContentLoaded', async () => {
    crearContenedorPreview(); // Crear el div oculto para la vista previa
    await cargarTemario();
});

// --- 1. LÓGICA DE VISTA PREVIA ---

function crearContenedorPreview() {
    const div = document.createElement('div');
    div.id = 'preview-overlay';
    div.innerHTML = '<h4>Vista Previa</h4><div id="preview-content"></div>';
    document.body.appendChild(div);
}

async function mostrarPreview(ruta, titulo) {
    const overlay = document.getElementById('preview-overlay');
    const content = document.getElementById('preview-content');

    // Mostrar el cuadro cargando
    overlay.style.display = 'block';
    content.innerHTML = '<div class="loader-preview">Cargando...</div>';

    try {
        // Ruta absoluta (Crítico para que funcione)
        const rutaAbsoluta = new URL(ruta, document.baseURI).href;

        // Importar solo este módulo
        const modulo = await import(rutaAbsoluta);

        // Generar versión de muestra (Usamos "Vista" como índice)
        const data = await modulo.generar("Vista");

        content.innerHTML = `
            <div class="preview-header"><strong>${titulo}</strong></div>
            <div class="preview-body">
                ${data.html}
            </div>
            <div class="preview-footer">
                Respuesta: <span style="color:blue">${data.respuesta || "?"}</span>
            </div>
        `;

        // Renderizar MathJax en el preview
        if (window.MathJax) {
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, content]);
        }

    } catch (err) {
        console.error(err);
        content.innerHTML = '<span style="color:red">Error cargando vista previa</span>';
    }
}

function ocultarPreview() {
    const overlay = document.getElementById('preview-overlay');
    if (overlay) {
        overlay.style.display = 'none';
        const content = document.getElementById('preview-content');
        if (content) content.innerHTML = '';
    }
}

// --- 2. CARGA DE TEMARIO ---

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
        // NIVEL 1: TEMA (Details Principal)
        const detalleTema = document.createElement('details');
        detalleTema.open = true; // Temas abiertos por defecto
        detalleTema.className = 'nivel-tema';
        const resumenTema = document.createElement('summary');
        resumenTema.textContent = tema.nombre;
        detalleTema.appendChild(resumenTema);

        const listaSubtemas = document.createElement('div');
        listaSubtemas.className = 'contenedor-subtemas';

        tema.subtemas.forEach(sub => {
            // NIVEL 2: SUBTEMA (Details Anidado)
            // Usamos details aquí para colapsar subtemas si hay muchos
            const detalleSub = document.createElement('details');
            detalleSub.open = true;
            detalleSub.className = 'nivel-subtema';

            const resumenSub = document.createElement('summary');
            resumenSub.textContent = sub.nombre;
            // Estilo diferenciado para subtema
            resumenSub.style.fontSize = "0.95rem";
            resumenSub.style.color = "#444";

            detalleSub.appendChild(resumenSub);

            const listaSecciones = document.createElement('div');
            listaSecciones.className = 'contenedor-secciones';

            sub.secciones.forEach(sec => {
                // NIVEL 3: SECCIÓN (Fieldset)
                const fieldset = document.createElement('fieldset');
                const legend = document.createElement('legend');
                legend.textContent = sec.nombre;
                fieldset.appendChild(legend);

                sec.ejercicios.forEach(ej => {
                    // NIVEL 4: EJERCICIO (Input)
                    const label = document.createElement('label');
                    label.className = 'control-ejercicio';

                    // Eventos hover (Vista Previa)
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

// --- 3. GENERACIÓN DE EXAMEN (Versión Robusta) ---

window.generarExamen = async function () {
    const seleccionados = document.querySelectorAll('.selector-ejercicio:checked');
    const lienzo = document.getElementById('examen-lienzo');

    lienzo.innerHTML = '<div class="loader">Generando examen...</div>';

    let htmlPreguntas = '';
    let htmlRespuestas = '';
    let colaDeScripts = [];
    let totalPuntos = 0;
    let contadorPregunta = 1;

    const fecha = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long' });
    htmlPreguntas += `<div class="no-screen">
                <p><strong>Docente:</strong> M.C. Roberto A. Morin R.</p>
                <p><strong>Nombre:</strong> ___________________________________________________</p>
                <p><strong>Fecha:</strong> ${fecha} &nbsp;&nbsp; | &nbsp;&nbsp; <strong>Calificación:</strong> _______</p>
                </div>

    `;

    for (const input of seleccionados) {
        const ruta = input.dataset.ruta;
        try {
            const rutaAbsoluta = new URL(ruta, document.baseURI).href;
            const modulo = await import(rutaAbsoluta);
            const data = await modulo.generar(contadorPregunta);
            // ... dentro del bucle for ...

            // Formato del puntaje (Ej: [6 puntos])
            const labelPuntos = `[Puntos del ejercicio ${input.dataset.puntos}]`;

            htmlPreguntas += `
                <article class="pregunta-wrapper">
                    <aside class="info-pregunta">
                        ${labelPuntos}
                    </aside>
                    
                    <div class="contenido-pregunta">
                        ${data.html}
                    </div>
                </article>
            `;

            const textoRespuesta = data.respuesta ? data.respuesta : "<i>Sin respuesta definida</i>";
            htmlRespuestas += `
                <div class="item-respuesta">
                    <strong>${contadorPregunta}.</strong> ${textoRespuesta}
                </div>
            `;

            if (data.postRender && typeof data.postRender === 'function') {
                colaDeScripts.push(data.postRender);
            }

            totalPuntos += parseInt(input.dataset.puntos || 0);
            const increment = data.numPreguntas || 1;
            contadorPregunta += increment;

        } catch (err) {
            console.error(`Error cargando ${ruta}:`, err);
            htmlPreguntas += `<div class="error-box">Error al cargar ejercicio ${contadorPregunta}</div>`;
        }
    }

    htmlPreguntas += `
        <div class="resumen-final no-print">
            <p>Total de preguntas: ${contadorPregunta - 1}</p>
            <p>Total de puntos: ${totalPuntos}</p>
        </div>
    `;

    const bloqueSolucionario = `
        <section class="seccion-respuestas">
            <h2>Hoja de Claves y Respuestas</h2>
            <div class="lista-respuestas">
                ${htmlRespuestas}
            </div>
        </section>
    `;

    lienzo.innerHTML = htmlPreguntas + bloqueSolucionario;

    colaDeScripts.forEach(fn => { try { fn(); } catch (e) { console.error(e); } });

    if (window.MathJax) {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, lienzo]);
    }
};