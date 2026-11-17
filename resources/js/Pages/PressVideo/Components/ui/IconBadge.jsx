import React from 'react';

/**
 * Reusable Icon Badge dalam lingkaran kaca kecil (Section 5.5 & 6.4)
 */
export default function IconBadge({ children, darkMode = false, size = 'md', className = '' }) {
    const sizeClass = size === 'sm' ? 'w-10 h-10' : 'w-12 h-12';

    return (
        <div
            aria-hidden="true"
            className={`${sizeClass} rounded-full flex items-center justify-center shrink-0 backdrop-blur-md border transition-colors ${
                darkMode
                    ? 'bg-[#246BFF]/20 border-white/20 text-[#5BA3FF]'
                    : 'bg-gradient-to-br from-[#EAF1FF] to-white/90 border-white text-[#246BFF] shadow-[0_6px_16px_rgba(36,107,255,0.14)]'
            } ${className}`}
        >
            {children}
        </div>
    );
}
