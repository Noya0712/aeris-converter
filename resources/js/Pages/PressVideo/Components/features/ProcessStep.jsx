import React from 'react';
import GlassCard from '../ui/GlassCard';

/**
 * Komponen Langkah Alur Penggunaan (Section 6.5: Cara Kerja AERIS)
 */
export default function ProcessStep({ step, title, description, isLast = false, darkMode = false }) {
    return (
        <div className="relative flex flex-col">
            <GlassCard darkMode={darkMode} size="sm" className="p-5 sm:p-6 h-full flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <span
                        className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-xs font-extrabold tracking-wider border ${
                            darkMode
                                ? 'bg-[#246BFF]/25 border-white/25 text-blue-200'
                                : 'bg-gradient-to-br from-[#246BFF] to-[#6848F5] border-white/60 text-white shadow-[0_6px_14px_rgba(36,107,255,0.28)]'
                        }`}
                    >
                        {step}
                    </span>

                    {!isLast && (
                        <span
                            aria-hidden="true"
                            className={`hidden md:block flex-1 h-[1px] ml-3 ${
                                darkMode
                                    ? 'bg-gradient-to-r from-white/30 to-transparent'
                                    : 'bg-gradient-to-r from-[#246BFF]/40 to-transparent'
                            }`}
                        />
                    )}
                </div>

                <h3
                    className={`text-[16px] sm:text-[17px] font-semibold ${
                        darkMode ? 'text-white' : 'text-[#101A4A]'
                    }`}
                >
                    {title}
                </h3>
                <p
                    className={`text-[14px] leading-relaxed ${
                        darkMode ? 'text-slate-300' : 'text-[#3E4D78]'
                    }`}
                >
                    {description}
                </p>
            </GlassCard>
        </div>
    );
}
