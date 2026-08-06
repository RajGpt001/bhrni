import os
import re

files_to_process = [
    r'd:\2\lyke-india\src\components\ui\sign-in-card-2.tsx',
    r'd:\2\lyke-india\src\components\ui\sign-up-card.tsx',
    r'd:\2\lyke-india\src\app\loading.tsx'
]

replacements = {
    r'bg-black': 'bg-[#FAF8F5]',
    r'from-purple-500/40': 'from-[#D2B48C]/40',
    r'via-purple-700/50': 'via-[#8B5A2B]/20',
    r'to-black': 'to-[#FAF8F5]',
    r'bg-purple-400/20': 'bg-[#D2B48C]/30',
    r'bg-purple-300/20': 'bg-[#C19A6B]/30',
    r'bg-white/5': 'bg-[#8B5A2B]/5',
    r'rgba\(255,255,255,0\.03\)': 'rgba(139,90,43,0.05)',
    r'rgba\(255,255,255,0\.05\)': 'rgba(139,90,43,0.08)',
    r'via-white': 'via-[#8B5A2B]',
    r'from-white/3': 'from-[#8B5A2B]/10',
    r'via-white/7': 'via-[#8B5A2B]/20',
    r'bg-black/40': 'bg-white/40',
    r'border-white/\[0\.05\]': 'border-[#8B5A2B]/10',
    r'linear-gradient\(135deg, white 0\.5px': 'linear-gradient(135deg, rgba(139,90,43,0.2) 0.5px',
    r'linear-gradient\(45deg, white 0\.5px': 'linear-gradient(45deg, rgba(139,90,43,0.2) 0.5px',
    r'border-white/10': 'border-[#8B5A2B]/20',
    r'bg-black/50': 'bg-white/60',
    r'from-white to-white/70': 'from-[#4A3728] to-[#8B5A2B]',
    r'from-white/10 to-transparent': 'from-[#8B5A2B]/10 to-transparent',
    r'from-white to-white/80': 'from-[#4A3728] to-[#5C4033]',
    r'text-white/60': 'text-[#5C4033]/70',
    r'bg-red-500/20': 'bg-red-100',
    r'border-red-500/30': 'border-red-200',
    r'text-red-200': 'text-red-600',
    r'text-white/40': 'text-[#8B5A2B]/60',
    r'text-white/30': 'text-[#8B5A2B]/50',
    r'text-white/70': 'text-[#8B5A2B]/90',
    r'text-white/80': 'text-[#8B5A2B]',
    r'text-white': 'text-[#4A3728]',
    r'border-white/20': 'border-[#8B5A2B]/30',
    r'focus:border-white/20': 'focus:border-[#8B5A2B]/40',
    r'focus:bg-white/10': 'focus:bg-white/80',
    r'border-t border-white/5': 'border-t border-[#8B5A2B]/10',
    r'bg-white text-black': 'bg-[#4A3728] text-[#FAF8F5]',
    r'bg-white/10': 'bg-[#4A3728]/10',
    r'from-white/0 via-white/30': 'from-[#FAF8F5]/0 via-[#FAF8F5]/30',
    r'border-black/70': 'border-[#FAF8F5]/70',
    r'hover:text-white': 'hover:text-[#4A3728]',
    r'checked:bg-white': 'checked:bg-[#4A3728]',
    r'checked:border-white': 'checked:border-[#4A3728]',
    r'focus:ring-white/30': 'focus:ring-[#4A3728]/30',
    r'text-black pointer-events-none': 'text-[#FAF8F5] pointer-events-none',
    r'border-t-purple-400': 'border-t-[#8B5A2B]',
    r'bg-white': 'bg-[#8B5A2B]',  # line underline in link
    r'bg-\[\#8B5A2B\]/5 border-transparent focus:border-\[\#8B5A2B\]/40': 'bg-transparent border-transparent focus:border-[#8B5A2B]/40',
    r'bg-\[\#4A3728\]/10 text-\[\#FAF8F5\] font-medium h-10 rounded-lg transition-all duration-300 flex items-center justify-center': 'bg-[#4A3728] text-[#FAF8F5] font-medium h-10 rounded-lg transition-all duration-300 flex items-center justify-center',
}

for file_path in files_to_process:
    if not os.path.exists(file_path):
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for pattern, replacement in replacements.items():
        content = re.sub(pattern, replacement, content)
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
