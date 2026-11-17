import React from 'react';
import FeatureItem from './FeatureItem';

export default function FeatureStrip({ darkMode }) {
    const features = [
        {
            title: 'Proses Adaptif',
            description: 'Waktu proses bergantung pada karakteristik video.',
            icon: (
                <svg className="w-6 h-6 text-[#246BFD]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
                </svg>
            ),
        },
        {
            title: 'Kualitas Terjaga',
            description: 'Upayakan kualitas visual terbaik dengan ukuran lebih ringkas.',
            icon: (
                <svg className="w-6 h-6 text-[#246BFD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h12l4 6-10 12L2 9l4-6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 9h20M12 21L8 9l4-6 4 6-4 12z" />
                </svg>
            ),
        },
        {
            title: 'Privasi Terjaga',
            description: 'Video diproses langsung di browser perangkat Anda.',
            icon: (
                <svg className="w-6 h-6 text-[#246BFD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v5c0 5-3.5 9.74-7 11-3.5-1.26-7-6-7-11V6l7-3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
            ),
        },
        {
            title: 'Mudah Digunakan',
            description: 'Antarmuka sederhana untuk semua orang.',
            icon: (
                <svg className="w-6 h-6 text-[#4355FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.1}>
                    <rect x="7" y="2" width="10" height="20" rx="2.5" />
                    <path strokeLinecap="round" d="M11 18h2" />
                </svg>
            ),
        },
    ];

    return (
        <section
            className={`animate-aeris-strip w-full rounded-[28px] backdrop-blur-2xl backdrop-saturate-[1.8] border-[1.5px] px-4 sm:px-8 py-7 sm:py-8 transition-all ${
                darkMode
                    ? 'bg-white/10 border-white/25 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_16px_44px_rgba(0,0,0,0.3)]'
                    : 'bg-gradient-to-br from-white/55 via-white/30 to-[#E8F1FF]/40 border-white/90 shadow-[inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-1px_2px_rgba(255,255,255,0.5),0_20px_50px_-12px_rgba(23,107,255,0.16)]'
            }`}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#B9CEEE]/60 dark:divide-white/15">
                {features.map((feat) => (
                    <FeatureItem
                        key={feat.title}
                        icon={feat.icon}
                        title={feat.title}
                        description={feat.description}
                        darkMode={darkMode}
                    />
                ))}
            </div>
        </section>
    );
}
