import React from 'react';
import { Head } from '@inertiajs/react';
import useVideoCompressor from './hooks/useVideoCompressor';
import PageContainer from './Components/PageContainer';
import HeroSection from './Components/HeroSection';
import UploadCard from './Components/UploadCard';
import FeatureStrip from './Components/FeatureStrip';

export default function Index() {
    const compressor = useVideoCompressor();

    return (
        <>
            <Head title="AERIS — Video Converter" />

            <PageContainer activePage="Beranda">
                {({ darkMode }) => (
                    <>
                        {/* Hero Section (2 Kolom: Pengenalan & Kartu Upload) */}
                        <main className="my-8 lg:my-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                            <HeroSection
                                darkMode={darkMode}
                                onCtaClick={compressor.handleHeroCtaClick}
                            />
                            <UploadCard
                                darkMode={darkMode}
                                compressor={compressor}
                            />
                        </main>

                        {/* Feature Strip (4 Fitur Utama) */}
                        <FeatureStrip darkMode={darkMode} />
                    </>
                )}
            </PageContainer>
        </>
    );
}
