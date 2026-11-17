import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Navbar({ darkMode, setDarkMode, activePage = 'Beranda' }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { label: 'Beranda', href: '/', icon: true },
        { label: 'Tentang', href: '/tentang', icon: false },
        { label: 'Fitur', href: '/fitur', icon: false },
        { label: 'FAQ', href: '/faq', icon: false },
    ];

    return (
        <>
            <header
                className={`animate-aeris-nav w-full h-[74px] sm:h-[78px] px-5 sm:px-8 rounded-[24px] backdrop-blur-2xl backdrop-saturate-[1.8] border-[1.5px] transition-all flex items-center justify-between ${
                    darkMode
                        ? 'bg-white/10 border-white/25 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_8px_32px_rgba(0,0,0,0.25)]'
                        : 'bg-gradient-to-r from-white/55 via-white/35 to-white/50 border-white/90 shadow-[inset_0_2px_3px_rgba(255,255,255,0.95),0_12px_36px_-6px_rgba(23,107,255,0.14)]'
                }`}
            >
                {/* Logo Kiri */}
                <Link
                    href="/"
                    className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#246BFF] rounded-xl"
                >
                    <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden">
                        <img
                            src="/aeris_logo.png"
                            alt="AERIS Logo"
                            className="w-10 h-10 object-contain object-top drop-shadow-[0_4px_10px_rgba(36,107,253,0.35)]"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const fallback = e.currentTarget.nextElementSibling;
                                if (fallback) fallback.style.display = 'block';
                            }}
                        />
                        {/* Fallback SVG Simbol A */}
                        <svg
                            style={{ display: 'none' }}
                            aria-hidden="true"
                            viewBox="0 0 48 44"
                            className="w-10 h-10 drop-shadow-[0_4px_10px_rgba(36,107,253,0.35)]"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M21.2 4.2C22.5 1.8 25.9 1.8 27.2 4.2L43.4 34.6C44.8 37.2 42.9 40.4 39.9 40.4H32.8C31.2 40.4 29.8 39.5 29.1 38.1L24.2 28.4L16.5 38.6C15.7 39.7 14.3 40.4 12.9 40.4H8.5C5.5 40.4 3.6 37.2 5.0 34.6L21.2 4.2Z"
                                fill="url(#aerisLogoGrad)"
                            />
                            <path
                                d="M11.5 36.5C18.5 28.5 27.5 26.2 37.5 31.5"
                                stroke="white"
                                strokeWidth="3.2"
                                strokeLinecap="round"
                            />
                            <defs>
                                <linearGradient id="aerisLogoGrad" x1="5" y1="3" x2="42" y2="41" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#199BFF" />
                                    <stop offset="0.5" stopColor="#246BFD" />
                                    <stop offset="1" stopColor="#743BFF" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <span
                        className={`text-xl sm:text-[22px] font-extrabold tracking-[0.08em] ${
                            darkMode ? 'text-white' : 'text-[#101A4A]'
                        }`}
                    >
                        AERIS
                    </span>
                </Link>

                {/* Navigasi Tengah (Desktop) */}
                <nav aria-label="Navigasi Utama" className="hidden md:flex items-center gap-8 lg:gap-11 h-full">
                    {navItems.map((item) => {
                        const isActive = activePage === item.label;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                aria-current={isActive ? 'page' : undefined}
                                className={`relative h-full flex items-center gap-2 text-[15px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#246BFF] rounded-lg px-1 ${
                                    isActive
                                        ? 'text-[#246BFF]'
                                        : darkMode
                                        ? 'text-slate-300 hover:text-white'
                                        : 'text-[#2B3B67] hover:text-[#246BFF]'
                                }`}
                            >
                                {item.icon && (
                                    <svg
                                        aria-hidden="true"
                                        className={`w-4 h-4 ${isActive ? 'text-[#246BFF]' : 'text-current'}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2.2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5.5v-6h-5v6H4a1 1 0 01-1-1v-9.5z"
                                        />
                                    </svg>
                                )}
                                <span>{item.label}</span>
                                {isActive && (
                                    <span
                                        aria-hidden="true"
                                        className="absolute bottom-0 left-0 right-0 h-[3.5px] rounded-t-full bg-gradient-to-r from-[#246BFF] to-[#168BFF]"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Tombol Toggle Tema & Hamburger Mobile */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`hidden sm:block h-7 w-[1px] ${darkMode ? 'bg-white/20' : 'bg-[#B9CCEB]/80'}`} />
                    <button
                        type="button"
                        onClick={() => setDarkMode(!darkMode)}
                        aria-label={darkMode ? 'Aktifkan Mode Terang' : 'Aktifkan Mode Gelap'}
                        aria-pressed={darkMode}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#246BFF] ${
                            darkMode
                                ? 'bg-white/15 border-white/30 text-amber-300 hover:bg-white/25'
                                : 'bg-[#E5EEFF]/90 border-white/90 text-[#1E2B58] shadow-inner hover:bg-white'
                        }`}
                    >
                        {darkMode ? (
                            <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                            </svg>
                        ) : (
                            <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <circle cx="12" cy="12" r="4" strokeWidth={2.2} />
                                <path
                                    strokeLinecap="round"
                                    d="M12 3v2m0 14v2M5.64 5.64l1.41 1.41m9.9 9.9l1.41 1.41M3 12h2m14 0h2M5.64 18.36l1.41-1.41m9.9-9.9l1.41-1.41"
                                />
                            </svg>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? 'Tutup Menu Navigasi' : 'Buka Menu Navigasi'}
                        aria-expanded={mobileMenuOpen}
                        className={`md:hidden w-10 h-10 rounded-xl flex items-center justify-center border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#246BFF] ${
                            darkMode ? 'bg-white/10 border-white/25 text-white' : 'bg-white/60 border-white text-[#101A4A]'
                        }`}
                    >
                        <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </header>

            {/* Menu Navigasi Mobile */}
            {mobileMenuOpen && (
                <nav
                    aria-label="Navigasi Mobile"
                    className={`md:hidden mt-3 p-3.5 rounded-2xl backdrop-blur-xl border flex flex-wrap gap-2 ${
                        darkMode ? 'bg-white/10 border-white/20' : 'bg-white/75 border-white'
                    }`}
                >
                    {navItems.map((item) => {
                        const isActive = activePage === item.label;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                aria-current={isActive ? 'page' : undefined}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                                    isActive
                                        ? 'bg-[#246BFF] text-white'
                                        : darkMode
                                        ? 'text-slate-200 hover:bg-white/10'
                                        : 'text-[#101A4A] hover:bg-white'
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            )}
        </>
    );
}
