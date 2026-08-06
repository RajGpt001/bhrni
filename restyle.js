const fs = require('fs');
const path = require('path');

const filesToProcess = [
    path.join(__dirname, 'src', 'components', 'ui', 'sign-in-card-2.tsx'),
    path.join(__dirname, 'src', 'components', 'ui', 'sign-up-card.tsx'),
    path.join(__dirname, 'src', 'app', 'loading.tsx')
];

const replacements = [
    { pattern: /bg-black/g, replacement: 'bg-[#FAF8F5]' },
    { pattern: /from-purple-500\/40/g, replacement: 'from-[#D2B48C]/40' },
    { pattern: /via-purple-700\/50/g, replacement: 'via-[#8B5A2B]/20' },
    { pattern: /to-black/g, replacement: 'to-[#FAF8F5]' },
    { pattern: /bg-purple-400\/20/g, replacement: 'bg-[#D2B48C]/30' },
    { pattern: /bg-purple-300\/20/g, replacement: 'bg-[#C19A6B]/30' },
    { pattern: /bg-white\/5/g, replacement: 'bg-[#8B5A2B]/5' },
    { pattern: /rgba\(255,255,255,0\.03\)/g, replacement: 'rgba(139,90,43,0.05)' },
    { pattern: /rgba\(255,255,255,0\.05\)/g, replacement: 'rgba(139,90,43,0.08)' },
    { pattern: /via-white/g, replacement: 'via-[#8B5A2B]' },
    { pattern: /from-white\/3/g, replacement: 'from-[#8B5A2B]/10' },
    { pattern: /via-white\/7/g, replacement: 'via-[#8B5A2B]/20' },
    { pattern: /bg-black\/40/g, replacement: 'bg-white/40' },
    { pattern: /border-white\/\[0\.05\]/g, replacement: 'border-[#8B5A2B]/10' },
    { pattern: /linear-gradient\(135deg, white 0\.5px/g, replacement: 'linear-gradient(135deg, rgba(139,90,43,0.2) 0.5px' },
    { pattern: /linear-gradient\(45deg, white 0\.5px/g, replacement: 'linear-gradient(45deg, rgba(139,90,43,0.2) 0.5px' },
    { pattern: /border-white\/10/g, replacement: 'border-[#8B5A2B]/20' },
    { pattern: /bg-black\/50/g, replacement: 'bg-white/60' },
    { pattern: /from-white to-white\/70/g, replacement: 'from-[#4A3728] to-[#8B5A2B]' },
    { pattern: /from-white\/10 to-transparent/g, replacement: 'from-[#8B5A2B]/10 to-transparent' },
    { pattern: /from-white to-white\/80/g, replacement: 'from-[#4A3728] to-[#5C4033]' },
    { pattern: /text-white\/60/g, replacement: 'text-[#5C4033]/70' },
    { pattern: /bg-red-500\/20/g, replacement: 'bg-red-100' },
    { pattern: /border-red-500\/30/g, replacement: 'border-red-200' },
    { pattern: /text-red-200/g, replacement: 'text-red-600' },
    { pattern: /text-white\/40/g, replacement: 'text-[#8B5A2B]/60' },
    { pattern: /text-white\/30/g, replacement: 'text-[#8B5A2B]/50' },
    { pattern: /text-white\/70/g, replacement: 'text-[#8B5A2B]/90' },
    { pattern: /text-white\/80/g, replacement: 'text-[#8B5A2B]' },
    { pattern: /text-white/g, replacement: 'text-[#4A3728]' },
    { pattern: /border-white\/20/g, replacement: 'border-[#8B5A2B]/30' },
    { pattern: /focus:border-white\/20/g, replacement: 'focus:border-[#8B5A2B]/40' },
    { pattern: /focus:bg-white\/10/g, replacement: 'focus:bg-white/80' },
    { pattern: /border-t border-white\/5/g, replacement: 'border-t border-[#8B5A2B]/10' },
    { pattern: /bg-white text-black/g, replacement: 'bg-[#4A3728] text-[#FAF8F5]' },
    { pattern: /bg-white\/10/g, replacement: 'bg-[#4A3728]/10' },
    { pattern: /from-white\/0 via-white\/30/g, replacement: 'from-[#FAF8F5]/0 via-[#FAF8F5]/30' },
    { pattern: /border-black\/70/g, replacement: 'border-[#FAF8F5]/70' },
    { pattern: /hover:text-white/g, replacement: 'hover:text-[#4A3728]' },
    { pattern: /checked:bg-white/g, replacement: 'checked:bg-[#4A3728]' },
    { pattern: /checked:border-white/g, replacement: 'checked:border-[#4A3728]' },
    { pattern: /focus:ring-white\/30/g, replacement: 'focus:ring-[#4A3728]/30' },
    { pattern: /text-black pointer-events-none/g, replacement: 'text-[#FAF8F5] pointer-events-none' },
    { pattern: /border-t-purple-400/g, replacement: 'border-t-[#8B5A2B]' },
    { pattern: /bg-white/g, replacement: 'bg-[#8B5A2B]' }, // This handles the link underline correctly due to earlier text-white replacements 
    { pattern: /bg-\[\#8B5A2B\]\/5 border-transparent focus:border-\[\#8B5A2B\]\/40/g, replacement: 'bg-transparent border-transparent focus:border-[#8B5A2B]/40' },
    { pattern: /bg-\[\#4A3728\]\/10 text-\[\#FAF8F5\] font-medium h-10 rounded-lg transition-all duration-300 flex items-center justify-center/g, replacement: 'bg-[#4A3728] text-[#FAF8F5] font-medium h-10 rounded-lg transition-all duration-300 flex items-center justify-center' }
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
