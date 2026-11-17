import React from 'react';
import { Head } from '@inertiajs/react';
import PageContainer from './Components/PageContainer';
import GlassCard from './Components/ui/GlassCard';
import SectionHeading from './Components/ui/SectionHeading';
import Accordion from './Components/ui/Accordion';
import { FAQ_ITEMS } from './data/faqData';

/**
 * Halaman FAQ (Section 7 AERIS-UI-Specification.md)
 */
export default function FAQ() {
    return (
        <>
            <Head title="FAQ — AERIS Video Converter" />

            <PageContainer activePage="FAQ">
                {({ darkMode }) => (
                    <main className="my-8 lg:my-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                            {/* Kolom Kiri: Intro & Ilustrasi Gelembung Percakapan */}
                            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                                <SectionHeading
                                    eyebrow="Pertanyaan Umum"
                                    title="FAQ"
                                    description="Temukan jawaban atas pertanyaan seputar batasan, durasi pemrosesan, kualitas hasil, format yang didukung, dan keamanan video di AERIS."
                                    darkMode={darkMode}
                                    as="h1"
                                />

                                {/* Ilustrasi Gelembung Percakapan dengan Tanda Tanya */}
                                <GlassCard darkMode={darkMode} size="md" className="p-6 sm:p-7 overflow-hidden">
                                    <div className="relative flex items-center gap-4">
                                        <div
                                            aria-hidden="true"
                                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#168BFF] via-[#246BFF] to-[#6848F5] text-white flex items-center justify-center shrink-0 shadow-[0_10px_24px_rgba(36,107,255,0.35)]"
                                        >
                                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                            </svg>
                                        </div>
                                        <div className="space-y-1">
                                            <h2
                                                className={`text-[16px] font-semibold ${
                                                    darkMode ? 'text-white' : 'text-[#101A4A]'
                                                }`}
                                            >
                                                Transparansi Proses
                                            </h2>
                                            <p
                                                className={`text-[13px] sm:text-[14px] leading-relaxed ${
                                                    darkMode ? 'text-slate-300' : 'text-[#3E4D78]'
                                                }`}
                                            >
                                                Semua informasi di samping disusun sesuai cara kerja aktual mesin kompresi AERIS di browser Anda.
                                            </p>
                                        </div>
                                    </div>
                                </GlassCard>
                            </div>

                            {/* Kolom Kanan: Daftar Accordion Interaktif */}
                            <div className="lg:col-span-7">
                                <Accordion items={FAQ_ITEMS} darkMode={darkMode} defaultOpenIndex={0} />
                            </div>
                        </div>
                    </main>
                )}
            </PageContainer>
        </>
    );
}
