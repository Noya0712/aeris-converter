import React from 'react';

export default function UploadState({
    darkMode,
    mediaType = 'video',
    status,
    videoFile,
    videoDuration,
    videoResolution,
    calculatedBitrate,
    isDragging,
    setIsDragging,
    fileInputRef,
    onFileSelect,
    onStartCompression,
    onReset,
    formatSizeMB,
    formatDuration,
}) {
    const isImageMode = mediaType === 'image';

    const onDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const onDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const onDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const droppedFile = e.dataTransfer?.files?.[0];
        if (droppedFile) onFileSelect(droppedFile);
    };

    // State 2: File sudah dipilih dan siap dikompresi
    if (status === 'ready' && videoFile) {
        const fileExt = videoFile.name.split('.').pop()?.toUpperCase() || (isImageMode ? 'FOTO' : 'VIDEO');

        return (
            <div className="rounded-[24px] border-2 border-dashed border-[#8FB0E6]/80 bg-white/30 dark:bg-white/10 backdrop-blur-md shadow-[inset_0_2px_6px_rgba(255,255,255,0.75)] p-5 sm:p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#176BFF]">
                            {isImageMode ? 'Foto Siap Dikompresi' : 'Video Siap Dikompresi'}
                        </p>
                        <h3 className="text-sm sm:text-base font-bold truncate mt-0.5">
                            {videoFile.name}
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={onReset}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/75 text-slate-700 hover:bg-white border border-white shrink-0 shadow-sm"
                    >
                        Ganti File
                    </button>
                </div>

                {/* Grid Informasi File */}
                <div className="grid grid-cols-3 gap-2.5 text-center">
                    <div className="p-2.5 rounded-xl bg-white/55 dark:bg-white/10 backdrop-blur-sm border border-white/80">
                        <span className="block text-[11px] text-[#46577F] dark:text-slate-300">Ukuran Awal</span>
                        <span className="text-xs sm:text-sm font-extrabold text-[#101943] dark:text-white">
                            {formatSizeMB(videoFile.size)}
                        </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/55 dark:bg-white/10 backdrop-blur-sm border border-white/80">
                        <span className="block text-[11px] text-[#46577F] dark:text-slate-300">
                            {isImageMode ? 'Format' : 'Durasi'}
                        </span>
                        <span className="text-xs sm:text-sm font-extrabold text-[#101943] dark:text-white">
                            {isImageMode ? fileExt : formatDuration(videoDuration)}
                        </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/55 dark:bg-white/10 backdrop-blur-sm border border-white/80">
                        <span className="block text-[11px] text-[#46577F] dark:text-slate-300">Resolusi (Tetap)</span>
                        <span className="text-xs sm:text-sm font-extrabold text-[#176BFF]">
                            {videoResolution.width}x{videoResolution.height}
                        </span>
                    </div>
                </div>

                <div className="text-xs text-[#46577F] dark:text-slate-300 flex items-center justify-between bg-white/45 dark:bg-blue-950/40 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-white/80">
                    {isImageMode ? (
                        <>
                            <span>
                                Mode: <strong>High-Clarity Perceptual</strong> (Tanpa Buram)
                            </span>
                            <span className="font-semibold text-[#176BFF]">Resolusi Asli 100%</span>
                        </>
                    ) : (
                        <>
                            <span>
                                Dynamic Bitrate: <strong>{calculatedBitrate} kbps</strong> (Video) + <strong>128 kbps</strong> (AAC)
                            </span>
                            <span className="font-semibold text-[#176BFF]">Resolusi Asli 100%</span>
                        </>
                    )}
                </div>

                <button
                    type="button"
                    onClick={onStartCompression}
                    className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#0989FF] via-[#246BFD] to-[#6D38FF] text-white font-bold text-sm sm:text-base shadow-[0_10px_25px_rgba(36,107,253,0.45)] hover:shadow-[0_14px_30px_rgba(36,107,253,0.65)] transition-all"
                >
                    Mulai Kompresi Sekarang
                </button>
            </div>
        );
    }

    // State 1: Dropzone Kosong
    return (
        <div
            role="button"
            tabIndex={0}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    fileInputRef.current?.click();
                }
            }}
            className={`cursor-pointer rounded-[24px] border-[1.8px] border-dashed p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-all backdrop-blur-md focus:outline-none focus:ring-4 focus:ring-[#176BFF]/30 ${
                isDragging
                    ? 'border-[#176BFF] bg-[#176BFF]/15 scale-[1.01]'
                    : darkMode
                    ? 'border-blue-300/40 bg-white/[0.06] hover:bg-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]'
                    : 'border-[#8AAEE6]/80 bg-gradient-to-b from-white/35 via-white/20 to-[#E8F1FF]/30 hover:from-white/50 hover:to-white/35 shadow-[inset_0_2px_6px_rgba(255,255,255,0.85),0_8px_24px_rgba(23,107,255,0.06)]'
            }`}
        >
            {/* Ikon Cloud Upload Gradien Biru-Ungu */}
            <div className="mb-4">
                <svg className="w-14 h-14 mx-auto drop-shadow-[0_4px_10px_rgba(36,107,253,0.2)]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M22 46H17C11.477 46 7 41.523 7 36C7 30.895 10.824 26.684 15.768 26.075C17.445 18.59 24.127 13 32.111 13C41.438 13 49 20.562 49 29.889C49 30.285 48.986 30.678 48.959 31.067C53.532 32.15 57 36.25 57 41.143C57 46.863 52.363 51.5 46.643 51.5H42"
                        stroke="url(#cloudUploadGrad)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M32 50V31M32 31L24.5 38.5M32 31L39.5 38.5"
                        stroke="url(#cloudUploadGrad)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <defs>
                        <linearGradient id="cloudUploadGrad" x1="7" y1="13" x2="57" y2="51" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1E9BFF" />
                            <stop offset="0.55" stopColor="#246BFD" />
                            <stop offset="1" stopColor="#743BFF" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Tombol Pilih File Bergaya Kapsul Kaca Glossy */}
            <span className="inline-block px-8 py-2.5 rounded-full bg-gradient-to-b from-white/95 via-[#F2F7FF]/90 to-[#DCE9FF]/85 backdrop-blur-md text-[#176BFF] font-bold text-sm sm:text-[15px] border border-white shadow-[inset_0_1.5px_2px_rgba(255,255,255,1),0_8px_20px_rgba(23,107,255,0.18)] hover:shadow-[inset_0_1.5px_2px_rgba(255,255,255,1),0_10px_24px_rgba(23,107,255,0.28)] transition-all mb-4">
                Pilih File
            </span>

            {/* Informasi Format & Ukuran Tidak Terbatas */}
            <p className={`text-xs sm:text-[13px] font-medium ${darkMode ? 'text-slate-300' : 'text-[#46577F]'}`}>
                {isImageMode
                    ? 'Format: JPG, JPEG, PNG, WEBP, dll.  •  Ukuran file: Tidak terbatas'
                    : 'Format: MP4, MOV, AVI, MKV, dll.  •  Ukuran file: Tidak terbatas'}
            </p>
        </div>
    );
}
