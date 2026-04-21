const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir);

const exerciseFiles = files.filter(f => /^\d+\.\d+\.\d+\.js$/.test(f));

const indexData = [];

exerciseFiles.forEach(file => {
    const id = file.replace('.js', '');
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Improved regex to handle different spacing and potential async
    const nameMatch = content.match(/export\s+(?:async\s+)?function\s+name\s*\(\)\s*\{[\s\S]*?return\s+['"`]([\s\S]*?)['"`;]/);
    
    if (nameMatch) {
        let name = nameMatch[1].trim();
        indexData.push([id, name]);
    } else {
        // Fallback: try to find a title in the pregunta function if name is missing
        const h3Match = content.match(/<h3>(.*?)<\/h3>/);
        if (h3Match) {
            indexData.push([id, h3Match[1].trim()]);
        } else {
            console.warn(`Could not find name for ${file}`);
            indexData.push([id, id]); // Fallback to ID
        }
    }
});

// Sort by ID (numerical sort)
indexData.sort((a, b) => {
    const partsA = a[0].split('.').map(Number);
    const partsB = b[0].split('.').map(Number);
    for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
        if ((partsA[i] || 0) !== (partsB[i] || 0)) {
            return (partsA[i] || 0) - (partsB[i] || 0);
        }
    }
    return 0;
});

const output = '[\n' + indexData.map(entry => `  ${JSON.stringify(entry)}`).join(',\n') + '\n]';
const indexPath = path.join(dir, 'index.json');
fs.writeFileSync(indexPath, output, 'utf8');
console.log('index.json updated successfully with ' + indexData.length + ' entries.');

