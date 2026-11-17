import React from 'react';
import GlassCard from '../ui/GlassCard';
import IconBadge from '../ui/IconBadge';

const FEATURE_ICONS = {
    sliders: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M1 14h6m2-6h6m2 8h6" />
        </svg>
    ),
    'cloud-upload': (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
    ),
    gem: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h12l4 6-10 12L2 9l4-6z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 9h20M12 21L8 9l4-6 4 6-4 12z" />
        </svg>
    ),
    activity: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    ),
    gauge: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l4-4M3.34 19a10 10 0 1117.32 0" />
        </svg>
    ),
    devices: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <rect x="2" y="4" width="14" height="11" rx="2" />
            <path strokeLinecap="round" d="M6 19h6M9 15v4" />
            <rect x="16" y="9" width="6" height="11" rx="1.5" />
        </svg>
    ),
};

/**
 * Reusable Feature Card (Section 6.4)
 * - Ikon di dalam lingkaran kaca kecil
 * - Judul semibold & deskripsi ringkas
 * - Hover terangkat & border lebih terang
 * - Focus visible untuk navigasi keyboard
 * - Tanpa tombol tambahan karena bersifat informatif
 */
export default function FeatureCard({ title, description, iconName, darkMode = false }) {
    return (
        <GlassCard
            darkMode={darkMode}
            size="md"
            interactive
            className="p-6 sm:p-7 flex flex-col gap-4 focus-within:ring-2 focus-within:ring-[#246BFF]"
        >
            <IconBadge darkMode={darkMode}>
                {FEATURE_ICONS[iconName] || FEATURE_ICONS.sliders}
            </IconBadge>

            <div className="space-y-2">
                <h2
                    className={`text-[17px] sm:text-[19px] font-semibold leading-snug ${
                        darkMode ? 'text-white' : 'text-[#101A4A]'
                    }`}
                >
                    {title}
                </h2>
                <p
                    className={`text-[14px] sm:text-[15px] leading-relaxed ${
                        darkMode ? 'text-slate-300' : 'text-[#3E4D78]'
                    }`}
                >
                    {description}
                </p>
            </div>
        </GlassCard>
    );
}
