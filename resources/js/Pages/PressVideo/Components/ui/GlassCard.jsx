import React from 'react';

/**
 * Reusable Glassmorphism Panel (Section 3.3 & 3.5)
 * Konsisten pada radius, border putih transparan 1px, backdrop-blur, dan shadow biru lembut.
 */
export default function GlassCard({
    children,
    darkMode = false,
    className = '',
    size = 'lg',
    interactive = false,
}) {
    const radiusClass =
        size === 'sm'
            ? 'rounded-[16px]'
            : size === 'md'
            ? 'rounded-[22px]'
            : 'rounded-[26px]';

    const surfaceClass = darkMode
        ? 'bg-white/[0.08] border-white/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.18),0_18px_46px_rgba(0,0,0,0.35)]'
        : 'bg-gradient-to-br from-white/55 via-white/[0.42] to-[#EAF1FF]/45 border-white/75 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.9),0_18px_48px_-12px_rgba(36,107,255,0.14)]';

    const interactiveClass = interactive
        ? darkMode
            ? 'transition-all duration-200 hover:-translate-y-1 hover:border-white/40 hover:bg-white/[0.12]'
            : 'transition-all duration-200 hover:-translate-y-1 hover:border-white hover:shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.95),0_22px_52px_-12px_rgba(36,107,255,0.22)]'
        : 'transition-all duration-200';

    return (
        <div
            className={`relative backdrop-blur-xl backdrop-saturate-[1.6] border ${radiusClass} ${surfaceClass} ${interactiveClass} ${className}`}
        >
            {children}
        </div>
    );
}
