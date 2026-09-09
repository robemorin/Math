import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIR_EJERCICIOS = path.join(__dirname, 'ejercicios');
const ARCHIVO_SALIDA = path.join(__dirname, 'temario.json');

// Regex para capturar metadata
const REGEX_META = /export\s+const\s+metadata\s*=\s*({[\s\S]*?});/;

function extraerMetadata(contenido, archivo) {
    try {
        const match = contenido.match(REGEX_META);
        if (match && match[1]) {
            return new Function(`return ${match[1]}`)();
        }
    } catch (e) {
        console.error(`⚠️ Error en metadata de: ${archivo}`, e.message);
    }
    return null;
}

function construirTemario() {
    console.time('Tiempo de construcción');
    if (!fs.existsSync(DIR_EJERCICIOS)) fs.mkdirSync(DIR_EJERCICIOS);

    const archivos = fs.readdirSync(DIR_EJERCICIOS);
    const mapaTemas = new Map();

    archivos.forEach(archivo => {
        // CAMBIO: Regex para 4 niveles (N.N.N.N.js)
        if (!/^\d+\.\d+\.\d+\.\d+\.js$/.test(archivo)) return;

        const rutaCompleta = path.join(DIR_EJERCICIOS, archivo);
        const contenido = fs.readFileSync(rutaCompleta, 'utf-8');
        const meta = extraerMetadata(contenido, archivo);

        if (!meta) return;

        // Desglosar ID: 1.2.3.4.js -> [1, 2, 3, 4]
        const [temaId, subtemaId, seccionId, ejId] = archivo.split('.').map(Number);

        // NIVEL 1: TEMA
        if (!mapaTemas.has(temaId)) {
            mapaTemas.set(temaId, { 
                id: temaId, 
                nombre: meta.tema, 
                subtemas: new Map() 
            });
        }
        const tema = mapaTemas.get(temaId);

        // NIVEL 2: SUBTEMA
        if (!tema.subtemas.has(subtemaId)) {
            tema.subtemas.set(subtemaId, { 
                id: subtemaId, 
                nombre: meta.subtema, 
                secciones: new Map() // Nuevo contenedor
            });
        }
        const subtema = tema.subtemas.get(subtemaId);

        // NIVEL 3: SECCIÓN (NUEVO)
        if (!subtema.secciones.has(seccionId)) {
            subtema.secciones.set(seccionId, {
                id: seccionId,
                nombre: meta.seccion || `Sección ${seccionId}`,
                ejercicios: []
            });
        }
        const seccion = subtema.secciones.get(seccionId);

        // NIVEL 4: EJERCICIO
        seccion.ejercicios.push({
            id: archivo,
            titulo: meta.titulo,
            ruta: `./ejercicios/${archivo}`,
            puntos: meta.puntos,
            orden: ejId
        });
    });

    // Convertir Maps a Arrays anidados y ordenar
    const resultado = Array.from(mapaTemas.values())
        .sort((a, b) => a.id - b.id)
        .map(tema => ({
            ...tema,
            subtemas: Array.from(tema.subtemas.values())
                .sort((a, b) => a.id - b.id)
                .map(sub => ({
                    ...sub,
                    secciones: Array.from(sub.secciones.values()) // Procesar secciones
                        .sort((a, b) => a.id - b.id)
                        .map(sec => ({
                            ...sec,
                            ejercicios: sec.ejercicios.sort((a, b) => a.orden - b.orden)
                        }))
                }))
        }));

    fs.writeFileSync(ARCHIVO_SALIDA, JSON.stringify(resultado, null, 2));
    console.log(`✅ Temario generado (Estructura 4 Niveles). ${archivos.length} archivos procesados.`);
    console.timeEnd('Tiempo de construcción');
}

construirTemario();