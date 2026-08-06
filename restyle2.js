const fs = require('fs');
const path = require('path');

const filesToProcess = [
    path.join(__dirname, 'src', 'components', 'ui', 'sign-in-card-2.tsx'),
    path.join(__dirname, 'src', 'components', 'ui', 'sign-up-card.tsx'),
    path.join(__dirname, 'src', 'app', 'loading.tsx')
];

const replacements = [
    // Make the gradient go from dark brown to light beige
    { 
        pattern: /bg-gradient-to-b from-\[\#D2B48C\]\/40 via-\[\#8B5A2B\]\/20 to-\[\#FAF8F5\]/g, 
        replacement: 'bg-gradient-to-b from-[#4A3728]/80 via-[#8B5A2B]/40 to-[#FAF8F5]' 
    },
    // Make the radial glows brighter white so they contrast and create that "light" effect
    {
        pattern: /bg-\[\#D2B48C\]\/30 blur-\[80px\]/g,
        replacement: 'bg-white/60 blur-[100px]'
    },
    {
        pattern: /bg-\[\#C19A6B\]\/30 blur-\[60px\]/g,
        replacement: 'bg-white/40 blur-[80px]'
    }
];

filesToProcess.forEach(filePath => {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf-8');
        replacements.forEach(({ pattern, replacement }) => {
            content = content.replace(pattern, replacement);
        });
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Processed ${filePath}`);
    } else {
        console.log(`Skipped ${filePath}`);
    }
});
