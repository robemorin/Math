const fs = require('fs');
let code = fs.readFileSync('src/temas/3.1.31.js', 'utf8');
code = code.replace(/import [^;]+;/g, '// import');
code = code.replace(/export /g, '');
const wrapper = `
const ai = {
    initTlacuache: () => {},
    getHeader: (id, cat, title) => '<header>' + id + ' ' + title + '</header>',
    getTiTip: (tip) => '<tip>' + tip + '</tip>'
};
${code}

(async () => {
    try {
        const [html, sol] = await pregunta(1, 1);
        console.log('SUCCESS! HTML length:', html.length, 'Solucion length:', sol.length);
    } catch (err) {
        console.error('ERROR in pregunta:', err);
    }
})();
`;
fs.writeFileSync('scratch/run.js', wrapper, 'utf8');
