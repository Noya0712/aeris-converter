import React from 'react';

/**
 * Reusable Section Heading dengan Eyebrow Pill, Heading, & Deskripsi opsional.
 */
export default function SectionHeading({
    eyebrow,
    title,
    highlight,
    subtitle,
    description,
    darkMode = false,
    align = 'left',
    as = 'h1',
    className = '',
}) {
    const HeadingTag = as;
    const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

    return (
        <div className={`flex flex-col gap-3.5 ${alignClass} ${className}`}>
            {eyebrow && (
                <span
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-wide backdrop-blur-md border ${
                        darkMode
                            ? 'bg-white/10 border-white/25 text-blue-300'
                            : 'bg-white/60 border-white/85 text-[#246BFF] shadow-[0_4px_14px_rgba(36,107,255,0.08)]'
                    }`}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#168BFF] to-[#6848F5]" aria-hidden="true" />
                    {eyebrow}
                </span>
            )}

            <HeadingTag
                className={`font-extrabold tracking-tight leading-[1.12] ${
                    as === 'h1'
                        ? 'text-[34px] sm:text-5xl lg:text-[52px]'
                        : 'text-[26px] sm:text-3xl lg:text-[36px]'
                } ${darkMode ? 'text-white' : 'text-[#101A4A]'}`}
            >
                {highlight ? (
                    <>
                        <span className="bg-gradient-to-r from-[#6848F5] via-[#246BFF] to-[#168BFF] bg-clip-text text-transparent">
                            {highlight}
                        </span>{' '}
                        <span>{title}</span>
                    </>
                ) : (
                    title
                )}
            </HeadingTag>

            {subtitle && (
                <p
                    className={`text-base sm:text-lg font-semibold leading-snug ${
                        darkMode ? 'text-blue-200' : 'text-[#246BFF]'
                    }`}
                >
                    {subtitle}
                </p>
            )}

            {description && (
                <p
                    className={`text-[15px] sm:text-[16px] leading-relaxed max-w-2xl ${
                        darkMode ? 'text-slate-300' : 'text-[#3E4D78]'
                    }`}
                >
                    {description}
                </p>
            )}
        </div>
    );
}
