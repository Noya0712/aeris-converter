import React from 'react';
import { Link } from '@inertiajs/react';

/**
 * Footer Global AERIS (Section 8)
 * - Wordmark AERIS — Video Converter
 * - Navigasi ringkas: Beranda, Tentang, Fitur, FAQ
 * - Tahun copyright dinamis
 */
export default function Footer({ darkMode, activePage = 'Beranda' }) {
    const currentYear = new Date().getFullYear();
    const links = [
        { label: 'Beranda', href: '/' },
        { label: 'Tentang', href: '/tentang' },
        { label: 'Fitur', href: '/fitur' },
        { label: 'FAQ', href: '/faq' },
    ];

    return (
        <footer
            className={`animate-aeris-footer mt-10 pt-5 pb-2 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm ${
                darkMode ? 'border-white/15 text-slate-300' : 'border-white/70 text-[#3E4D78]'
            }`}
        >
            <div className="flex items-center gap-2.5">
                <span className={`font-extrabold tracking-wide ${darkMode ? 'text-white' : 'text-[#101A4A]'}`}>
                    AERIS
                </span>
                <span aria-hidden="true" className="opacity-50">&mdash;</span>
                <span>Video Converter</span>
            </div>

            <nav aria-label="Navigasi Footer" className="flex flex-wrap items-center justify-center gap-5">
                {links.map((item) => {
                    const isActive = activePage === item.label;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`font-medium transition-colors focus:outline-none focus-visible:underline ${
                                isActive
                                    ? 'text-[#246BFF] font-semibold'
                                    : darkMode
                                    ? 'hover:text-white'
                                    : 'hover:text-[#246BFF]'
                            }`}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <p className="text-center sm:text-right">
                &copy; {currentYear} <strong className={darkMode ? 'text-white' : 'text-[#101A4A]'}>AERIS</strong>. All rights reserved.
            </p>
        </footer>
    );
}
