import React, { useState, useEffect } from 'react';
import BackgroundDecor from './BackgroundDecor';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Reusable Page Container untuk seluruh halaman AERIS (Beranda, Tentang, Fitur, FAQ).
 * Menjaga konsistensi latar, glassmorphism, navbar, footer, serta preferensi tema.
 */
export default function PageContainer({ activePage = 'Beranda', children }) {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.localStorage.getItem('aeris_theme') === 'dark';
        }
        return false;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('aeris_theme', darkMode ? 'dark' : 'light');
        }
    }, [darkMode]);

    return (
        <div
            className={`min-h-screen relative overflow-x-hidden font-sans selection:bg-[#246BFF] selection:text-white transition-colors duration-300 ${
                darkMode
                    ? 'bg-gradient-to-br from-[#0B112B] via-[#111B42] to-[#0D1536] text-white'
                    : 'bg-gradient-to-br from-[#CFE0FF] via-[#EAF1FF] to-[#DCE8FF] text-[#101A4A]'
            }`}
        >
            <BackgroundDecor darkMode={darkMode} />

            <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-10 pt-5 sm:pt-7 pb-8 flex flex-col min-h-screen justify-between">
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} activePage={activePage} />

                <div className="flex-1 flex flex-col justify-center">
                    {typeof children === 'function' ? children({ darkMode }) : children}
                </div>

                <Footer darkMode={darkMode} activePage={activePage} />
            </div>
        </div>
    );
}
