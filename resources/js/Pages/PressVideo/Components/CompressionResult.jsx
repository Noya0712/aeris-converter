import React from 'react';


export default function CompressionResult({
    videoFile,
    compressedUrl,
    compressedSizeBytes,
    videoResolution,
    targetSizeMB,
    onReset,
    formatSizeMB,
}) {
    const reductionPercentage =
        videoFile && compressedSizeBytes > 0
            ? Math.max(0, Math.round(((videoFile.size - compressedSizeBytes) / videoFile.size) * 100))
            : 0;

    return (
        <div className="rounded-[24px] border-2 border-[#8FB0E6]/85 bg-white/60 dark:bg-white/10 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Kompresi Selesai!
                </span>
                <span className="text-xs font-bold text-[#176BFF]">
                    Hemat {reductionPercentage}%
                </span>
            </div>

            {/* Ringkasan Perbandingan */}
            <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-white/10 border border-white">
                    <span className="block text-[11px] text-[#46577F] dark:text-slate-300">Ukuran Awal</span>
                    <span className="text-xs sm:text-sm font-bold line-through opacity-75">
                        {formatSizeMB(videoFile.size)}
                    </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/90 dark:bg-white/15 border border-[#176BFF]/40">
                    <span className="block text-[11px] text-[#176BFF] font-semibold">Ukuran Hasil</span>
                    <span className="text-xs sm:text-sm font-extrabold text-[#176BFF]">
                        {formatSizeMB(compressedSizeBytes)}
                    </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-white/10 border border-white">
                    <span className="block text-[11px] text-[#46577F] dark:text-slate-300">Resolusi Tetap</span>
                    <span className="text-xs sm:text-sm font-extrabold text-emerald-600">
                        {videoResolution.width}x{videoResolution.height}
                    </span>
                </div>
            </div>

            {/* Video Player Preview */}
            <video
                src={compressedUrl}
                controls
                className="w-full max-h-44 rounded-xl bg-slate-950/90 object-contain"
            />

            {/* Tombol Unduh & Reset */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <a
                    href={compressedUrl}
                    download={`AERIS_Compressed_${videoFile.name.replace(/\.[^/.]+$/, '')}.mp4`}
                    className="flex-1 py-3 px-5 rounded-full bg-gradient-to-r from-[#0989FF] via-[#246BFD] to-[#6D38FF] text-white font-bold text-sm text-center shadow-[0_10px_24px_rgba(36,107,253,0.45)] hover:opacity-95 transition-all"
                >
                    Unduh Video ({formatSizeMB(compressedSizeBytes)})
                </a>
                <button
                    type="button"
                    onClick={onReset}
                    className="py-3 px-5 rounded-full bg-white/85 dark:bg-white/15 text-[#101943] dark:text-white font-bold text-sm border border-white hover:bg-white transition-all"
                >
                    Kompres Video Lain
                </button>
            </div>
        </div>
    );
}
