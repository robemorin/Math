// src/ia_service.js
// Servicio de integración de IA con BYOK (Bring Your Own Key) para Math Platform

const STORAGE_KEY = 'r2p_gemini_api_key';
const STORAGE_NOTICE_KEY = 'r2p_ia_notice_accepted';
const STORAGE_EXPIRY_KEY = 'r2p_gemini_api_key_expiry';
const OCHO_HORAS_MS = 8 * 60 * 60 * 1000;

export function getApiKey() {
    const key = localStorage.getItem(STORAGE_KEY) || '';
    if (!key) return '';

    const expiry = localStorage.getItem(STORAGE_EXPIRY_KEY);
    // Si tiene fecha de expiración y ya pasaron las 8 horas, se borra automáticamente
    if (expiry) {
        const tiempoExpiracion = parseInt(expiry, 10);
        if (Date.now() > tiempoExpiracion) {
            console.info('🕒 La API Key temporal ha expirado tras 8 horas y ha sido eliminada por seguridad.');
            saveApiKey('');
            return '';
        }
    }
    return key;
}

export function isKeyPermanent() {
    return localStorage.getItem(STORAGE_KEY) && !localStorage.getItem(STORAGE_EXPIRY_KEY);
}

export function saveApiKey(key, permanente = false) {
    if (!key) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_EXPIRY_KEY);
    } else {
        localStorage.setItem(STORAGE_KEY, key.trim());
        if (permanente) {
            localStorage.removeItem(STORAGE_EXPIRY_KEY);
        } else {
            // Guardar expiración a 8 horas desde este momento
            const expiraEn = Date.now() + OCHO_HORAS_MS;
            localStorage.setItem(STORAGE_EXPIRY_KEY, expiraEn.toString());
        }
    }
}

export function hasAcceptedNotice() {
    return localStorage.getItem(STORAGE_NOTICE_KEY) === 'true';
}

export function setNoticeAccepted() {
    localStorage.setItem(STORAGE_NOTICE_KEY, 'true');
}

/**
 * Solicita o verifica la API Key mostrando la advertencia de privacidad si es la primera vez.
 */
export async function solicitarApiKeySiNecesario(forzar = false) {
    const existingKey = getApiKey();
    const noticeSeen = hasAcceptedNotice();

    if (!forzar && existingKey && noticeSeen) {
        return existingKey;
    }

    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'r2p-ia-modal-overlay';

        // Si ya hay una clave guardada en el navegador, mostramos el botón rojo de Borrar Llave
        const tieneClaveGuardada = Boolean(existingKey);
        const botonBorrarHTML = `
            <button type="button" id="r2p-delete-key" class="r2p-btn r2p-btn-danger" style="${tieneClaveGuardada ? '' : 'display:none;'} margin-right: auto;" title="Eliminar API Key de este dispositivo">
                🗑️ Borrar Llave
            </button>`;

        overlay.innerHTML = `
        <div class="r2p-ia-modal">
            <h3>🤖 Configuración de Asistente IA</h3>
            
            <div class="r2p-ia-aviso-privacidad">
                <p><strong>Aviso importante sobre privacidad y servicio:</strong></p>
                <ul>
                    <li>Tu API Key <strong>no se almacena en nuestros servidores ni en cookies</strong>; se guarda exclusivamente en el almacenamiento local de tu dispositivo (navegador).</li>
                    <li>Las consultas son procesadas directamente por el proveedor de IA (Google Gemini) y están sujetas a sus términos de uso y directivas de privacidad.</li>
                    <li>Las respuestas generadas por la inteligencia artificial <strong>pueden contener errores</strong> o imprecisiones matemáticas. Úsalas como orientación de apoyo pedagógico.</li>
                </ul>
            </div>

            <p style="margin: 10px 0 5px 0;">Ingresa tu <strong>Google Gemini API Key</strong>:</p>
            <div style="display: flex; gap: 8px; align-items: center;">
                <input type="password" id="r2p-input-key" class="r2p-ia-input" style="flex: 1; margin-bottom: 0;" placeholder="AIzaSy..." value="${existingKey}" />
                <button type="button" id="r2p-clear-input" class="r2p-btn r2p-btn-secondary" style="padding: 10px 12px;" title="Limpiar texto">🧹</button>
            </div>
            
            <div style="font-size: 0.85em; margin: 8px 0 12px 0; color: #555;">
                ¿No tienes una? Puedes obtener una gratuita en <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener">Google AI Studio</a>.
            </div>

            <div style="margin: 12px 0 16px 0; padding: 10px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;">
                <label style="display: flex; align-items: center; gap: 8px; font-size: 0.9em; cursor: pointer; color: #1e293b; user-select: none;">
                    <input type="checkbox" id="r2p-chk-permanente" ${isKeyPermanent() ? 'checked' : ''} style="cursor: pointer; width: 16px; height: 16px;" />
                    <span><strong>Recordar permanentemente</strong> en este dispositivo</span>
                </label>
                <div style="font-size: 0.8em; color: #64748b; margin-top: 4px; padding-left: 24px;">
                    🛡️ <em>Por seguridad (equipos compartidos o de la escuela), si dejas esta casilla desmarcada, la clave <strong>se borrará automáticamente a las 8 horas</strong>.</em>
                </div>
            </div>

            <div class="r2p-ia-modal-buttons">
                <button type="button" id="r2p-delete-key" class="r2p-btn r2p-btn-danger" style="${tieneClaveGuardada ? '' : 'display:none;'} margin-right: auto;" title="Eliminar API Key de este dispositivo">
                    🗑️ Borrar Llave
                </button>
                <button type="button" id="r2p-cancel-key" class="r2p-btn r2p-btn-secondary">Cancelar</button>
                <button type="button" id="r2p-save-key" class="r2p-btn r2p-btn-primary">Aceptar y Guardar</button>
            </div>
        </div>
        `;

        document.body.appendChild(overlay);

        const btnSave = overlay.querySelector('#r2p-save-key');
        const btnCancel = overlay.querySelector('#r2p-cancel-key');
        const btnDelete = overlay.querySelector('#r2p-delete-key');
        const btnClear = overlay.querySelector('#r2p-clear-input');
        const inputKey = overlay.querySelector('#r2p-input-key');
        const chkPermanente = overlay.querySelector('#r2p-chk-permanente');

        if (btnClear) {
            btnClear.addEventListener('click', (e) => {
                e.preventDefault();
                inputKey.value = '';
                inputKey.focus();
            });
        }

        if (btnDelete) {
            btnDelete.addEventListener('click', () => {
                if (confirm('¿Estás seguro de que deseas eliminar tu API Key guardada de este navegador?')) {
                    saveApiKey('');
                    inputKey.value = '';
                    alert('Clave eliminada correctamente de este navegador.');
                    document.body.removeChild(overlay);
                    resolve(null);
                }
            });
        }

        btnCancel.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.removeChild(overlay);
            resolve(existingKey || null);
        });

        btnSave.addEventListener('click', (e) => {
            e.preventDefault();
            const keyVal = inputKey.value.trim();
            if (!keyVal) {
                alert('Por favor ingresa una clave válida o haz clic en Cancelar.');
                return;
            }
            const esPermanente = Boolean(chkPermanente && chkPermanente.checked);
            saveApiKey(keyVal, esPermanente);
            setNoticeAccepted();
            if (esPermanente) {
                alert('¡Clave guardada permanentemente en este dispositivo!');
            } else {
                alert('¡Clave guardada de forma temporal! Se eliminará automáticamente a las 8 horas por seguridad.');
            }
            document.body.removeChild(overlay);
            resolve(keyVal);
        });
    });
}

/**
 * Realiza la llamada a la API de Gemini
 */
export async function consultarIA({ prompt, systemInstruction, apiKey }) {
    const key = apiKey || getApiKey();
    if (!key) {
        throw new Error('No hay API Key configurada.');
    }

    // Lista de modelos ordenados por prioridad (mayor disponibilidad y cuota de requests a menor)
    // Con fallback automático: si uno agota cuota (429) o falla, pasa al siguiente.
    const modelos = [
        'gemini-3.5-flash-lite',
        'gemini-3.1-flash-lite',
        'gemini-3.8-flash',
        'gemini-3.7-flash',
        'gemini-3.6-flash',
        'gemini-3.5-flash',
        'gemini-3-flash-preview',
        'gemini-2.5-flash-lite',
        'gemini-2.5-flash'
    ];

    // Los modelos 3.x usan v1; los anteriores soportan v1beta.
    // Se prueba primero v1 y luego v1beta como fallback de endpoint.
    const apiVersiones = ['v1', 'v1beta'];

    const bodyData = {
        contents: [
            {
                role: 'user',
                parts: [{ text: prompt }]
            }
        ]
    };

    if (systemInstruction) {
        bodyData.systemInstruction = {
            parts: [{ text: systemInstruction }]
        };
    }

    const errores = [];

    for (const modelo of modelos) {
        for (const version of apiVersiones) {
            try {
                const url = `https://generativelanguage.googleapis.com/${version}/models/${modelo}:generateContent?key=${key}`;
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-goog-api-key': key
                    },
                    body: JSON.stringify(bodyData)
                });

                if (!response.ok) {
                    const errorJson = await response.json().catch(() => ({}));
                    const mensaje = errorJson?.error?.message || `Error HTTP ${response.status}`;
                    errores.push(`[${version}/${modelo}]: ${mensaje}`);
                    console.warn(`Fallback IA: fallo ${version}/${modelo} →`, mensaje);
                    continue;
                }

                const data = await response.json();
                const candidate = data.candidates?.[0];
                const text = candidate?.content?.parts?.map(p => p.text).join('') || 'No se obtuvo respuesta.';
                console.info(`✅ IA respondió: ${version}/${modelo}`);
                return text;
            } catch (err) {
                errores.push(`[${version}/${modelo}]: ${err.message}`);
                console.warn(`Fallback IA: excepción ${version}/${modelo}`, err);
            }
        }
    }

    console.error('Todos los intentos fallaron:\n' + errores.join('\n'));
    throw new Error(`Error de IA. Ningún modelo respondió.\nÚltimos errores:\n${errores.slice(-3).join('\n')}`);
}

/**
 * Diagnóstico: lista los modelos disponibles para la API Key configurada.
 * Ejecutar desde la consola del navegador:
 *   import('/src/ia_service.js').then(m => m.listarModelosDisponibles())
 */
export async function listarModelosDisponibles() {
    const key = getApiKey();
    if (!key) {
        console.error('No hay API Key configurada. Usa el botón IA primero.');
        return;
    }
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}&pageSize=50`;
        const res = await fetch(url, { headers: { 'x-goog-api-key': key } });
        const data = await res.json();
        if (!res.ok) {
            console.error('Error al listar modelos:', data?.error?.message);
            return;
        }
        const generativos = (data.models || []).filter(m =>
            m.supportedGenerationMethods?.includes('generateContent')
        );
        console.group('🤖 Modelos Gemini disponibles para tu API Key (generateContent)');
        generativos.forEach(m => console.log(`✅ ${m.name}  —  ${m.displayName}`));
        console.groupEnd();
        return generativos.map(m => m.name);
    } catch (err) {
        console.error('Excepción al listar modelos:', err);
    }
}

/**
 * Procesa y renderiza texto en Markdown con fórmulas matemáticas LaTeX.
 * Protege las fórmulas LaTeX ($...$ y $$...$$) para que el parser de Markdown
 * no corrompa los caracteres especiales (_, *, #) y renderiza limpiamente con MathJax.
 */
export async function renderizarMarkdownMath(texto, contenedor) {
    if (!texto || !contenedor) return;

    // 1. Limpiar bloques de código que envuelvan toda la respuesta
    let txt = texto.trim();
    if (txt.startsWith('```markdown')) {
        txt = txt.replace(/^```markdown\s*/i, '').replace(/```\s*$/, '');
    } else if (txt.startsWith('```html')) {
        txt = txt.replace(/^```html\s*/i, '').replace(/```\s*$/, '');
    } else if (txt.startsWith('```')) {
        txt = txt.replace(/^```\s*/, '').replace(/```\s*$/, '');
    }

    // 2. Extraer y proteger bloques matemáticos ($$ ... $$ y $ ... $)
    const mathTokens = [];
    const guardarMath = (match) => {
        const id = `@@MATH_TOKEN_${mathTokens.length}@@`;
        mathTokens.push(match);
        return id;
    };

    // Primero ecuaciones en bloque $$...$$
    txt = txt.replace(/\$\$([\s\S]*?)\$\$/g, guardarMath);
    // Luego ecuaciones inline $...$ (evitando coincidir con signos de dinero o espacios vacíos)
    txt = txt.replace(/\$([^\$\n\r]+?)\$/g, guardarMath);

    // 3. Convertir Markdown a HTML
    // Encabezados
    txt = txt.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
    txt = txt.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
    txt = txt.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    txt = txt.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    txt = txt.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    txt = txt.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Negritas y Cursivas
    txt = txt.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    txt = txt.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    txt = txt.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Listas desordenadas (- o *)
    txt = txt.replace(/^\s*[-*]\s+(.*$)/gim, '<li>$1</li>');
    // Envolver <li> contiguos en <ul>
    txt = txt.replace(/(<li>[\s\S]*?<\/li>(\s*<li>[\s\S]*?<\/li>)*)/gim, '<ul>$1</ul>');

    // Párrafos y saltos de línea dobles
    const bloques = txt.split(/\n\s*\n/);
    const htmlBloques = bloques.map(bloque => {
        bloque = bloque.trim();
        if (!bloque) return '';
        if (bloque.startsWith('<h') || bloque.startsWith('<ul') || bloque.startsWith('<ol') || bloque.startsWith('<table')) {
            return bloque;
        }
        // Saltos de línea simples dentro de un párrafo
        bloque = bloque.replace(/\n/g, '<br>');
        return `<p>${bloque}</p>`;
    });
    let htmlFinal = htmlBloques.join('\n');

    // 4. Restaurar las expresiones matemáticas LaTeX protegidas
    mathTokens.forEach((token, idx) => {
        const id = `@@MATH_TOKEN_${idx}@@`;
        htmlFinal = htmlFinal.split(id).join(token);
    });

    // 5. Detectar sección de Solución / Mark Scheme y convertirla en desplegable con click
    // Busca encabezados que indiquen solución o mark scheme para envolverlos en <details class="r2p-ia-solution-details">
    const regexSolucion = /(<h3>.*?(?:soluci[oó]n|mark\s*scheme|criterio|respuestas).*?<\/h3>[\s\S]*)/i;
    const matchSolucion = htmlFinal.match(regexSolucion);

    if (matchSolucion) {
        const enunciadoParte = htmlFinal.substring(0, matchSolucion.index);
        const solucionParte = matchSolucion[1];
        htmlFinal = `
            <div class="r2p-ia-enunciado">${enunciadoParte}</div>
            <details class="r2p-ia-solution-details">
                <summary class="r2p-ia-solution-summary">
                    <span>💡 Ver Solución y Mark Scheme Oficial (Clic para mostrar)</span>
                </summary>
                <div class="r2p-ia-solution-content">
                    ${solucionParte}
                </div>
            </details>
        `;
    }

    // 6. Inyectar en el contenedor y tiposet con MathJax
    contenedor.innerHTML = htmlFinal;

    if (window.MathJax && window.MathJax.typesetPromise) {
        try {
            await window.MathJax.typesetPromise([contenedor]);
        } catch (err) {
            console.warn('Advertencia en MathJax typesetting:', err);
        }
    }
}
