import React from 'react';
import { Head } from '@inertiajs/react';
import PageContainer from './Components/PageContainer';
import GlassCard from './Components/ui/GlassCard';
import SectionHeading from './Components/ui/SectionHeading';
import FeatureCard from './Components/features/FeatureCard';
import ProcessStep from './Components/features/ProcessStep';
import { FEATURES_LIST, PROCESS_STEPS } from './data/featuresData';

/**
 * Halaman Fitur (Section 6 AERIS-UI-Specification.md)
 */
export default function Features() {
    return (
        <>
            <Head title="Fitur — AERIS Video Converter" />

            <PageContainer activePage="Fitur">
                {({ darkMode }) => (
                    <main className="my-8 lg:my-10 space-y-12">
                        {/* Bagian Atas: Intro + Ilustrasi Video & Pengaturan */}
                        <GlassCard darkMode={darkMode} size="lg" className="p-6 sm:p-10 overflow-hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                <div className="lg:col-span-7">
                                    <SectionHeading
                                        eyebrow="Fitur Unggulan"
                                        title="Fitur Lengkap dari"
                                        highlight="AERIS"
                                        description="Dirancang untuk membantu Anda mengecilkan ukuran video dengan kontrol yang jelas, tampilan transparan, dan alur penggunaan yang nyaman di berbagai perangkat."
                                        darkMode={darkMode}
                                        as="h1"
                                    />
                                </div>

                                {/* Ilustrasi Video + Ikon Pengaturan */}
                                <div className="lg:col-span-5 relative flex items-center justify-center">
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute w-56 h-56 rounded-full bg-gradient-to-tr from-[#246BFF]/25 to-[#6848F5]/25 blur-3xl"
                                    />
                                    <div
                                        className={`relative z-10 w-full max-w-xs p-5 rounded-[22px] backdrop-blur-xl border flex items-center gap-4 ${
                                            darkMode
                                                ? 'bg-white/10 border-white/25'
                                                : 'bg-white/75 border-white shadow-[0_14px_34px_-10px_rgba(36,107,255,0.2)]'
                                        }`}
                                    >
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#168BFF] via-[#246BFF] to-[#6848F5] text-white flex items-center justify-center shrink-0 shadow-[0_8px_18px_rgba(36,107,255,0.35)]">
                                            <svg aria-hidden="true" className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>

                                        <div className="flex-1 space-y-2">
                                            <div className={`h-2.5 w-24 rounded-full ${darkMode ? 'bg-white/30' : 'bg-[#246BFF]/30'}`} />
                                            <div className={`h-2 w-32 rounded-full ${darkMode ? 'bg-white/15' : 'bg-[#3E4D78]/20'}`} />
                                            <div className="flex items-center gap-2 pt-1">
                                                <span className="h-2 w-14 rounded-full bg-gradient-to-r from-[#168BFF] to-[#6848F5]" />
                                                <span className={`text-[11px] font-semibold ${darkMode ? 'text-blue-300' : 'text-[#246BFF]'}`}>
                                                    Smart CRF
                                                </span>
                                            </div>
                                        </div>

                                        {/* Badge Ikon Pengaturan */}
                                        <div
                                            aria-hidden="true"
                                            className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 ${
                                                darkMode
                                                    ? 'bg-[#101A4A] border-white/25 text-blue-300'
                                                    : 'bg-white border-white text-[#246BFF] shadow-md'
                                            }`}
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Grid 6 Kartu Fitur (3 kolom desktop, 2 kolom tablet, 1 kolom mobile) */}
                        <section aria-label="Daftar Fitur AERIS">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                                {FEATURES_LIST.map((feat) => (
                                    <FeatureCard
                                        key={feat.id}
                                        title={feat.title}
                                        description={feat.description}
                                        iconName={feat.iconName}
                                        darkMode={darkMode}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Section Alur Penggunaan: Cara Kerja AERIS */}
                        <section aria-label="Cara Kerja AERIS" className="space-y-6">
                            <SectionHeading
                                title="Cara Kerja AERIS"
                                description="Empat langkah sederhana untuk mengompres video Anda secara langsung."
                                darkMode={darkMode}
                                as="h2"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-5">
                                {PROCESS_STEPS.map((item, idx) => (
                                    <ProcessStep
                                        key={item.step}
                                        step={item.step}
                                        title={item.title}
                                        description={item.description}
                                        isLast={idx === PROCESS_STEPS.length - 1}
                                        darkMode={darkMode}
                                    />
                                ))}
                            </div>
                        </section>
                    </main>
                )}
            </PageContainer>
        </>
    );
}
