import React from 'react';


export default function FeatureItem({ icon, title, description, darkMode }) {
    return (
        <div className="px-4 py-4 sm:py-1 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-b from-white/95 to-[#E2EEFF]/90 border border-white shadow-[0_8px_20px_rgba(23,107,255,0.15)] flex items-center justify-center mb-3.5">
                {icon}
            </div>
            <h3 className="text-base sm:text-[17px] font-extrabold mb-1">
                {title}
            </h3>
            <p
                className={`text-xs sm:text-[13.5px] leading-relaxed max-w-[200px] ${
                    darkMode ? 'text-slate-300' : 'text-[#46577F]'
                }`}
            >
                {description}
            </p>
        </div>
    );
}
