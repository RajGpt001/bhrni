const fs = require('fs');
const path = require('path');

const headerPath = path.join(__dirname, 'src', 'components', 'layout', 'Header.tsx');

if (fs.existsSync(headerPath)) {
    let content = fs.readFileSync(headerPath, 'utf-8');

    // Make main nav links bigger and bolder
    content = content.replace(/text-sm font-medium text-beige-800 font-semibold/g, 'text-base font-bold text-beige-900 tracking-wide');
    
    // Make dropdown links bigger and bolder
    content = content.replace(/text-sm text-gray-800 font-semibold/g, 'text-base text-gray-900 font-bold');
    
    // Make icons bigger
    content = content.replace(/width="20" height="20"/g, 'width="24" height="24"');
    content = content.replace(/width="14" height="14"/g, 'width="18" height="18"'); // chevron icons

    // Make search input text bigger
    content = content.replace(/text-sm text-beige-800/g, 'text-base text-beige-900 font-medium');

    fs.writeFileSync(headerPath, content, 'utf-8');
    console.log('Header updated successfully!');
} else {
    console.log('Header file not found!');
}
