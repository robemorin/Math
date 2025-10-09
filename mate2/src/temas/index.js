// index.js (Usando Lectura de Texto para evitar errores de importación)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const temasDir = path.join(__dirname, '.');

// Expresión regular para encontrar el valor retornado por la función 'name()'
// Busca: export function name(){ return '...'; }
const NAME_REGEX = /export\s+function\s+name\s*\(\s*\)\s*\{\s*return\s+['"](.+?)['"]\s*;\s*\}/s;

async function generarIndex() {
  
  // 1. Obtener la lista de archivos (IDs)
  const temaIds = fs.readdirSync(temasDir)
    .filter(f => /^\d+\.\d+\.\d+\.js$/.test(f))
    .map(f => f.replace('.js', ''));

  const temasConNombre = [];

  // 2. Iterar sobre los IDs, leer el contenido del archivo y extraer el nombre
  for (const temaId of temaIds) {
    const rutaArchivo = path.join(temasDir, `${temaId}.js`);
    
    try {
      // Lee el archivo como texto plano
      const contenido = fs.readFileSync(rutaArchivo, 'utf8');
      
      // Usa la expresión regular para buscar el nombre
      const match = contenido.match(NAME_REGEX);
      
      let nombreTema = `Nombre no encontrado para ${temaId}`;

      if (match && match[1]) {
        // match[1] contiene el texto capturado dentro de las comillas simples o dobles
        nombreTema = match[1];
      }
      
      // Agregar al resultado: [ "1.1.1", "Ecuaciones lineales" ]
      temasConNombre.push([temaId, nombreTema]);

    } catch (error) {
      console.error(`Error procesando el archivo ${temaId}.js:`, error.message);
      temasConNombre.push([temaId, `ERROR AL LEER ARCHIVO`]);
    }
  }

  // 3. Escribir el nuevo archivo index.json
  fs.writeFileSync(
    path.join(temasDir, 'index.json'),
    JSON.stringify(temasConNombre, null, 2)
  );

  console.log('✅ index.json generado con', temasConNombre.length, 'temas');
}

// Ejecutar la función
generarIndex().catch(console.error);