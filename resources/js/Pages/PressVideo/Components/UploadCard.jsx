import React from 'react';
import UploadState from './UploadState';
import CompressionProgress from './CompressionProgress';
import CompressionResult from './CompressionResult';

export default function UploadCard({ darkMode, compressor }) {
    const {
        mediaType,
        videoFile,
        videoDuration,
        videoResolution,
        calculatedBitrate,
        isDragging,
        status,
        progress,
        statusMessage,
        errorMessage,
        compressedUrl,
        compressedSizeBytes,
        outputExtension,
        targetSizeMB,
        fileInputRef,
        uploadCardRef,
        switchMediaType,
        setIsDragging,
        handleFileSelect,
        startCompression,
        resetConverter,
        formatSizeMB,
        formatDuration,
    } = compressor;

    const isImageMode = mediaType === 'image';

    const onInputChange = (e) => {
        const selected = e.target.files?.[0];
        if (selected) handleFileSelect(selected);
    };

    return (
        <div ref={uploadCardRef} className="animate-aeris-card lg:col-span-6 xl:col-span-6 relative">
            {/* Glow Cahaya Biru-Ungu Halus di Belakang Kaca Upload Card */}
            <div
                className={`pointer-events-none absolute -inset-3 rounded-[40px] blur-2xl transition-opacity ${
                    darkMode
                        ? 'bg-gradient-to-br from-[#246BFD]/20 via-transparent to-[#743BFF]/20 opacity-80'
                        : 'bg-gradient-to-br from-white/60 via-[#7EB0FF]/35 to-[#6B4BFF]/25 opacity-90'
                }`}
            />

            {/* Panel Utama Frosted Glassmorphism */}
            <div
                className={`relative overflow-hidden rounded-[30px] sm:rounded-[34px] p-6 sm:p-9 backdrop-blur-2xl backdrop-saturate-[1.8] border-[1.5px] transition-all ${
                    darkMode
                        ? 'bg-gradient-to-br from-white/15 via-white/[0.07] to-white/12 border-white/30 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.35),0_24px_60px_rgba(0,0,0,0.45)]'
                        : 'bg-gradient-to-br from-white/55 via-white/30 to-[#E8F1FF]/40 border-white/90 shadow-[inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-1.5px_3px_rgba(255,255,255,0.55),0_25px_65px_-12px_rgba(23,107,255,0.24)]'
                }`}
            >
                {/* Pantulan Kilau Kaca Diagonal (Glass Specular Reflection) */}
                <div
                    className={`pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full blur-2xl ${
                        darkMode ? 'bg-white/5' : 'bg-white/50'
                    }`}
                />
                <div
                    className={`pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-95`}
                />

                {/* Efek Kilau Bintang 4-Sudut Dekoratif */}
                <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 w-64 h-32 select-none">
                    <svg className="animate-aeris-twinkle absolute top-0 right-3 w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,1)]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C12.6 6.6 17.4 11.4 24 12C17.4 12.6 12.6 17.4 12 24C11.4 17.4 6.6 12.6 0 12C6.6 11.4 11.4 6.6 12 0Z" />
                    </svg>
                    <svg className="animate-aeris-twinkle absolute top-6 left-4 w-3.5 h-3.5 text-white/90 drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C12.6 6.6 17.4 11.4 24 12C17.4 12.6 12.6 17.4 12 24C11.4 17.4 6.6 12.6 0 12C6.6 11.4 11.4 6.6 12 0Z" />
                    </svg>
                    <span className="absolute bottom-3 left-6 w-2 h-2 rounded-full bg-white/90 shadow-[0_0_8px_#fff]" />
                    <span className="absolute top-12 right-1 w-1.5 h-1.5 rounded-full bg-white/90 shadow-[0_0_6px_#fff]" />
                </div>

                {/* 1. Ilustrasi Clapperboard / Foto 3D dengan Badge Compress */}
                <div className="animate-aeris-float relative mx-auto w-32 h-28 flex items-center justify-center mb-2 select-none">
                    <div className="absolute inset-0 rounded-full bg-[#246BFD]/25 blur-2xl" />
                    <svg
                        className="w-28 h-24 drop-shadow-[0_14px_22px_rgba(36,107,253,0.38)]"
                        viewBox="0 0 120 105"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g transform="rotate(-12 24 22)">
                            <rect x="18" y="12" width="76" height="18" rx="6" fill="url(#clapperTopGrad)" />
                            <path d="M32 12L24 30H35L43 12H32Z" fill="white" fillOpacity="0.88" />
                            <path d="M54 12L46 30H57L65 12H54Z" fill="white" fillOpacity="0.88" />
                            <path d="M76 12L68 30H79L87 12H76Z" fill="white" fillOpacity="0.88" />
                        </g>
                        <rect
                            x="22"
                            y="27"
                            width="76"
                            height="58"
                            rx="14"
                            transform="rotate(-10 22 27)"
                            fill="url(#clapperBodyGrad)"
                            stroke="white"
                            strokeOpacity="0.65"
                            strokeWidth="1.5"
                        />
                        {isImageMode ? (
                            <g transform="rotate(-10 60 55)">
                                <circle cx="52" cy="46" r="5" fill="white" />
                                <path
                                    d="M42 66L53 54L61 61L69 51L80 66H42Z"
                                    fill="white"
                                />
                            </g>
                        ) : (
                            <path
                                d="M54 44.5C53.8 43.1 55.3 42.1 56.5 42.8L71.2 50.8C72.4 51.5 72.5 53.2 71.4 54.0L58.4 63.6C57.2 64.5 55.6 63.7 55.4 62.3L54 44.5Z"
                                fill="white"
                            />
                        )}
                        <defs>
                            <linearGradient id="clapperTopGrad" x1="18" y1="12" x2="94" y2="30" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#6D4AFF" />
                                <stop offset="1" stopColor="#209BFF" />
                            </linearGradient>
                            <linearGradient id="clapperBodyGrad" x1="22" y1="27" x2="98" y2="85" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#6E48FF" />
                                <stop offset="0.5" stopColor="#2870FF" />
                                <stop offset="1" stopColor="#1DB0FF" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Badge Panah Kompresi */}
                    <div className="absolute right-1 bottom-2 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md shadow-[0_8px_20px_rgba(16,25,67,0.2)] border border-white flex items-center justify-center text-[#101943]">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7M4 10h6V4M20 14h-6v6M10 10L3 3m18 18l-7-7" />
                        </svg>
                    </div>
                </div>

                {/* Switcher Tab: Kompres Video | Kompres Foto */}
                <div className="relative z-10 flex justify-center mb-4">
                    <div
                        className={`inline-flex p-1 rounded-full backdrop-blur-md border ${
                            darkMode
                                ? 'bg-white/10 border-white/20'
                                : 'bg-white/55 border-white/90 shadow-inner'
                        }`}
                    >
                        <button
                            type="button"
                            onClick={() => switchMediaType('video')}
                            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                                !isImageMode
                                    ? 'bg-gradient-to-r from-[#0989FF] to-[#246BFD] text-white shadow-[0_4px_12px_rgba(36,107,253,0.4)]'
                                    : darkMode
                                    ? 'text-slate-300 hover:text-white'
                                    : 'text-[#46577F] hover:text-[#101943]'
                            }`}
                        >
                            Kompres Video
                        </button>
                        <button
                            type="button"
                            onClick={() => switchMediaType('image')}
                            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                                isImageMode
                                    ? 'bg-gradient-to-r from-[#0989FF] to-[#246BFD] text-white shadow-[0_4px_12px_rgba(36,107,253,0.4)]'
                                    : darkMode
                                    ? 'text-slate-300 hover:text-white'
                                    : 'text-[#46577F] hover:text-[#101943]'
                            }`}
                        >
                            Kompres Foto
                        </button>
                    </div>
                </div>

                {/* 2. Judul & Subjudul Kartu */}
                <div className="relative z-10 text-center space-y-1.5 mb-6">
                    <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-[#101943]'}`}>
                        {isImageMode ? 'Upload Foto Anda' : 'Upload Video Anda'}
                    </h2>
                    <p className={`text-xs sm:text-sm ${darkMode ? 'text-slate-300' : 'text-[#46577F]'}`}>
                        Seret dan lepas file di sini, atau klik untuk memilih file
                    </p>
                </div>

                {/* Input File Tersembunyi */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={
                        isImageMode
                            ? 'image/jpeg,image/png,image/webp,image/bmp,.jpg,.jpeg,.png,.webp,.bmp'
                            : 'video/mp4,video/quicktime,video/x-msvideo,video/x-matroska,video/webm,.mp4,.mov,.avi,.mkv,.webm'
                    }
                    onChange={onInputChange}
                    className="hidden"
                    id="pressvideo-file-input"
                />

                {/* Alert Error Validasi / Proses */}
                {status === 'error' && errorMessage && (
                    <div className="relative z-10 mb-4 p-3.5 rounded-2xl bg-red-500/15 backdrop-blur-md border border-red-400/50 text-red-700 dark:text-red-200 text-xs sm:text-sm flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z" />
                            </svg>
                            <span className="font-medium break-words">{errorMessage}</span>
                        </div>
                        <button
                            type="button"
                            onClick={resetConverter}
                            className="px-3 py-1 rounded-lg bg-white/80 text-red-700 font-semibold text-xs hover:bg-white shrink-0"
                        >
                            Coba Lagi
                        </button>
                    </div>
                )}

                {/* Render State Berdasarkan Status */}
                <div className="relative z-10">
                    {(status === 'idle' || status === 'ready' || status === 'error') && (
                        <UploadState
                            darkMode={darkMode}
                            mediaType={mediaType}
                            status={status}
                            videoFile={videoFile}
                            videoDuration={videoDuration}
                            videoResolution={videoResolution}
                            calculatedBitrate={calculatedBitrate}
                            targetSizeMB={targetSizeMB}
                            isDragging={isDragging}
                            setIsDragging={setIsDragging}
                            fileInputRef={fileInputRef}
                            onFileSelect={handleFileSelect}
                            onStartCompression={startCompression}
                            onReset={resetConverter}
                            formatSizeMB={formatSizeMB}
                            formatDuration={formatDuration}
                        />
                    )}

                    {(status === 'loading-engine' || status === 'compressing') && (
                        <CompressionProgress
                            mediaType={mediaType}
                            status={status}
                            progress={progress}
                            statusMessage={statusMessage}
                            videoResolution={videoResolution}
                        />
                    )}

                    {status === 'completed' && compressedUrl && videoFile && (
                        <CompressionResult
                            mediaType={mediaType}
                            videoFile={videoFile}
                            compressedUrl={compressedUrl}
                            compressedSizeBytes={compressedSizeBytes}
                            outputExtension={outputExtension}
                            videoResolution={videoResolution}
                            targetSizeMB={targetSizeMB}
                            onReset={resetConverter}
                            formatSizeMB={formatSizeMB}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
