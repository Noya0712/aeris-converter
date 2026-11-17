import React from 'react';

export default function HeroSection({ darkMode, onCtaClick }) {
    const benefits = [
        'Upayakan kualitas visual terbaik',
        'Ukuran file lebih kecil',
        'Diproses langsung di browser Anda',
    ];

    return (
        <div className="lg:col-span-6 xl:col-span-6 space-y-6 sm:space-y-7 lg:pl-4">
            {/* 1. Badge Kapsul */}
            <div
                className={`animate-aeris-up-1 inline-flex items-center gap-2.5 px-4 py-2 rounded-full backdrop-blur-md border shadow-sm ${
                    darkMode
                        ? 'bg-white/10 border-white/25 text-blue-300'
                        : 'bg-white/60 border-white/90 text-[#176BFF]'
                }`}
            >
                <svg className="w-4 h-4 fill-current text-[#176BFF]" viewBox="0 0 24 24">
                    <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
                </svg>
                <span className="text-xs sm:text-sm font-semibold tracking-wide">
                    Fast &bull; Smart &bull; High Quality
                </span>
            </div>

            {/* 2. Headline Besar */}
            <div className="animate-aeris-up-2 space-y-1">
                <h1 className="text-5xl sm:text-6xl xl:text-[66px] font-extrabold tracking-tight leading-[1.06]">
                    <span className="block bg-gradient-to-r from-[#6C3BFF] via-[#246BFD] to-[#1296FF] bg-clip-text text-transparent">
                        AERIS
                    </span>
                    <span className={`block mt-1 ${darkMode ? 'text-white' : 'text-[#0E163B]'}`}>
                        Video Converter
                    </span>
                </h1>
            </div>

            {/* 3. Deskripsi */}
            <p
                className={`animate-aeris-up-3 text-base sm:text-lg xl:text-[19px] leading-relaxed max-w-xl ${
                    darkMode ? 'text-slate-300' : 'text-[#3B4B75]'
                }`}
            >
                Kompres video Anda dengan
                kualitas tetap jernih, cepat, dan mudah!
            </p>

            {/* 4. Daftar Keunggulan */}
            <ul className="animate-aeris-up-4 space-y-3.5 pt-1">
                {benefits.map((point) => (
                    <li key={point} className="flex items-center gap-3.5">
                        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#20A7FF] to-[#176BFF] text-white flex items-center justify-center shadow-[0_4px_10px_rgba(23,107,255,0.35)] shrink-0">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                        <span className={`text-[15px] sm:text-base font-medium ${darkMode ? 'text-slate-200' : 'text-[#2B3B64]'}`}>
                            {point}
                        </span>
                    </li>
                ))}
            </ul>

            {/* 5. Tombol CTA Utama */}
            <div className="animate-aeris-up-5 pt-2">
                <button
                    type="button"
                    onClick={onCtaClick}
                    className="group relative inline-flex items-center gap-3.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#0989FF] via-[#246BFD] to-[#6D38FF] text-white font-bold text-base sm:text-lg shadow-[0_14px_32px_-6px_rgba(36,107,253,0.6)] hover:shadow-[0_18px_38px_-4px_rgba(36,107,253,0.75)] hover:scale-[1.02] active:scale-[0.99] transition-all border border-white/40 focus:outline-none focus:ring-4 focus:ring-[#176BFF]/40"
                >
                    <span>Mulai Konversi</span>
                    <svg
                        className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.4}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
