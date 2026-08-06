const fs = require('fs');
const path = require('path');

const filesToProcess = [
    path.join(__dirname, 'src', 'components', 'ui', 'sign-in-card-2.tsx'),
    path.join(__dirname, 'src', 'components', 'ui', 'sign-up-card.tsx'),
    path.join(__dirname, 'src', 'app', 'loading.tsx')
];

const replacements = [
    // Reverse the gradient direction: light at top, dark at bottom
    { 
        pattern: /bg-gradient-to-b from-\[\#4A3728\]\/80 via-\[\#8B5A2B\]\/40 to-\[\#FAF8F5\]/g, 
        replacement: 'bg-gradient-to-b from-[#FAF8F5]/80 via-[#8B5A2B]/40 to-[#4A3728]' 
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
