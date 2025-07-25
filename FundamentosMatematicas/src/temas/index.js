// generar-index.js
const fs = require('fs');
const path = require('path');

const temasDir = path.join(__dirname, '.');

const archivos = fs.readdirSync(temasDir)
  .filter(f => /^\d+\.\d+\.\d+\.js$/.test(f))  // solo nombres como 0.0.1.js
  .map(f => f.replace('.js', ''));

fs.writeFileSync(
  path.join(temasDir, 'index.json'),
  JSON.stringify(archivos, null, 2)
);

console.log('✅ index.json generado con', archivos.length, 'temas');
