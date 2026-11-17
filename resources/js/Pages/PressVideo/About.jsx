import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PageContainer from './Components/PageContainer';
import GlassCard from './Components/ui/GlassCard';
import SectionHeading from './Components/ui/SectionHeading';
import IconBadge from './Components/ui/IconBadge';

/**
 * Halaman Tentang (Section 5 AERIS-UI-Specification.md)
 */
export default function About() {
    const highlights = [
        {
            title: 'Kontrol Kualitas',
            description:
                'Pengaturan kompresi membantu Anda menyeimbangkan ukuran file dan kualitas visual.',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M1 14h6m2-6h6m2 8h6" />
                </svg>
            ),
        },
        {
            title: 'Proses Transparan',
            description:
                'Pantau tahapan pemrosesan dan informasi hasil tanpa menebak-nebak.',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
            ),
        },
    ];

    const coreValues = [
        {
            title: 'Mudah Digunakan',
            description: 'Alur yang sederhana dari unggah hingga unduh.',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
        },
        {
            title: 'Kualitas Fleksibel',
            description: 'Pengaturan kompresi dapat disesuaikan dengan kebutuhan.',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            ),
        },
        {
            title: 'Informasi Jelas',
            description: 'Status dan hasil proses ditampilkan secara transparan.',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
    ];

    return (
        <>
            <Head title="Tentang — AERIS Video Converter" />

            <PageContainer activePage="Tentang">
                {({ darkMode }) => (
                    <main className="my-8 lg:my-10 space-y-8">
                        {/* Hero Dua Kolom di Dalam Panel Kaca Lebar */}
                        <GlassCard darkMode={darkMode} size="lg" className="p-6 sm:p-10 lg:p-12 overflow-hidden">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                                {/* Kolom Kiri (~48%) */}
                                <div className="lg:col-span-6 space-y-6">
                                    <SectionHeading
                                        eyebrow="Tentang AERIS"
                                        highlight="AERIS"
                                        title="Video Converter"
                                        subtitle="Solusi kompresi video modern yang praktis, cepat, dan mudah digunakan."
                                        description="AERIS hadir untuk membantu Anda mengurangi ukuran file video dengan alur yang sederhana. Atur kebutuhan kompresi, proses video, lalu unduh hasilnya. AERIS dirancang agar informasi proses mudah dipahami dan kualitas hasil dapat disesuaikan dengan kebutuhan."
                                        darkMode={darkMode}
                                        as="h1"
                                    />

                                    {/* Dua Indikator Keunggulan */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                                        {highlights.map((item) => (
                                            <div
                                                key={item.title}
                                                className={`p-4 rounded-[16px] border backdrop-blur-md space-y-2 ${
                                                    darkMode
                                                        ? 'bg-white/[0.06] border-white/15'
                                                        : 'bg-white/55 border-white/85 shadow-[0_6px_18px_rgba(36,107,255,0.06)]'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    <IconBadge darkMode={darkMode} size="sm">
                                                        {item.icon}
                                                    </IconBadge>
                                                    <h2
                                                        className={`text-[15px] font-semibold ${
                                                            darkMode ? 'text-white' : 'text-[#101A4A]'
                                                        }`}
                                                    >
                                                        {item.title}
                                                    </h2>
                                                </div>
                                                <p
                                                    className={`text-[13px] leading-relaxed ${
                                                        darkMode ? 'text-slate-300' : 'text-[#3E4D78]'
                                                    }`}
                                                >
                                                    {item.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-1">
                                        <Link
                                            href="/"
                                            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-[14px] bg-gradient-to-r from-[#168BFF] via-[#246BFF] to-[#6848F5] text-white font-semibold text-sm sm:text-[15px] shadow-[0_12px_28px_-6px_rgba(36,107,255,0.55)] hover:brightness-110 active:scale-[0.99] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#246BFF] focus-visible:ring-offset-2"
                                        >
                                            <span>Mulai Kompres Video</span>
                                            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>

                                {/* Kolom Kanan (~52%): Ilustrasi Video Modern */}
                                <div className="lg:col-span-6 relative flex items-center justify-center py-4">
                                    {/* Ornamen Blur Biru & Ungu di Belakang Ilustrasi */}
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-[#246BFF]/30 via-[#168BFF]/25 to-[#6848F5]/30 blur-3xl"
                                    />

                                    {/* Garis Orbit Tipis */}
                                    <div
                                        aria-hidden="true"
                                        className={`pointer-events-none absolute w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] rounded-full border border-dashed ${
                                            darkMode ? 'border-white/15' : 'border-[#246BFF]/20'
                                        }`}
                                    />

                                    {/* Representasi Alur Original Video -> Compressed Video */}
                                    <div className="relative z-10 w-full max-w-md space-y-5 animate-aeris-float">
                                        {/* Kartu Original Video */}
                                        <div
                                            className={`p-4 sm:p-5 rounded-[20px] backdrop-blur-xl border flex items-center gap-4 ${
                                                darkMode
                                                    ? 'bg-white/10 border-white/25'
                                                    : 'bg-white/75 border-white shadow-[0_14px_34px_-10px_rgba(36,107,255,0.2)]'
                                            }`}
                                        >
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#246BFF] to-[#6848F5] text-white flex items-center justify-center shrink-0 shadow-[0_8px_18px_rgba(36,107,255,0.35)]">
                                                <svg aria-hidden="true" className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <span
                                                    className={`text-xs font-semibold uppercase tracking-wider ${
                                                        darkMode ? 'text-blue-300' : 'text-[#246BFF]'
                                                    }`}
                                                >
                                                    Input File
                                                </span>
                                                <p
                                                    className={`text-base font-bold truncate ${
                                                        darkMode ? 'text-white' : 'text-[#101A4A]'
                                                    }`}
                                                >
                                                    Original Video
                                                </p>
                                                <div className={`mt-2 h-2 w-full rounded-full ${darkMode ? 'bg-white/15' : 'bg-[#EAF1FF]'}`}>
                                                    <div className="h-full w-full rounded-full bg-gradient-to-r from-[#246BFF] to-[#6848F5]" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Simbol Panah Kompresi di Tengah */}
                                        <div className="flex justify-center">
                                            <div
                                                className={`w-11 h-11 rounded-full backdrop-blur-md border flex items-center justify-center ${
                                                    darkMode
                                                        ? 'bg-[#246BFF]/30 border-white/25 text-blue-200'
                                                        : 'bg-white/85 border-white text-[#246BFF] shadow-[0_8px_20px_rgba(36,107,255,0.2)]'
                                                }`}
                                            >
                                                <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Kartu Compressed Video */}
                                        <div
                                            className={`p-4 sm:p-5 rounded-[20px] backdrop-blur-xl border flex items-center gap-4 ${
                                                darkMode
                                                    ? 'bg-white/10 border-[#16A58A]/50'
                                                    : 'bg-white/85 border-white shadow-[0_14px_34px_-10px_rgba(22,165,138,0.22)]'
                                            }`}
                                        >
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#168BFF] to-[#16A58A] text-white flex items-center justify-center shrink-0 shadow-[0_8px_18px_rgba(22,165,138,0.3)]">
                                                <svg aria-hidden="true" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <span className="text-xs font-semibold uppercase tracking-wider text-[#16A58A]">
                                                    Output Optimal
                                                </span>
                                                <p
                                                    className={`text-base font-bold truncate ${
                                                        darkMode ? 'text-white' : 'text-[#101A4A]'
                                                    }`}
                                                >
                                                    Compressed Video
                                                </p>
                                                <div className={`mt-2 h-2 w-full rounded-full ${darkMode ? 'bg-white/15' : 'bg-[#EAF1FF]'}`}>
                                                    <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-[#168BFF] to-[#16A58A]" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Tiga Kartu Nilai Utama */}
                        <section aria-label="Nilai Utama AERIS" className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {coreValues.map((val) => (
                                <GlassCard
                                    key={val.title}
                                    darkMode={darkMode}
                                    size="md"
                                    interactive
                                    className="p-6 flex flex-col gap-3.5"
                                >
                                    <IconBadge darkMode={darkMode}>
                                        {val.icon}
                                    </IconBadge>
                                    <h2
                                        className={`text-[18px] font-semibold ${
                                            darkMode ? 'text-white' : 'text-[#101A4A]'
                                        }`}
                                    >
                                        {val.title}
                                    </h2>
                                    <p
                                        className={`text-[14px] sm:text-[15px] leading-relaxed ${
                                            darkMode ? 'text-slate-300' : 'text-[#3E4D78]'
                                        }`}
                                    >
                                        {val.description}
                                    </p>
                                </GlassCard>
                            ))}
                        </section>
                    </main>
                )}
            </PageContainer>
        </>
    );
}
