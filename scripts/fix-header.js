const fs = require('fs');
const path = 'src/components/layout/Header.tsx';
let h = fs.readFileSync(path, 'utf8');
h = h.replace(/text-beige-800/g, 'text-beige-900 font-semibold');
h = h.replace(/hover:text-beige-900/g, 'hover:text-accent');
fs.writeFileSync(path, h);
console.log('Done');
