import React from 'react';


export default function CompressionProgress({
    status,
    progress,
    statusMessage,
    videoResolution,
}) {
    const isEngineLoading = status === 'loading-engine';

    return (
        <div className="rounded-[24px] border-2 border-dashed border-[#8FB0E6]/85 bg-white/55 dark:bg-white/10 p-6 sm:p-7 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#176BFF]/15 text-[#176BFF] flex items-center justify-center mx-auto animate-spin">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
            </div>

            <div>
                <h3 className="text-base font-bold">
                    {isEngineLoading ? 'Menyiapkan video...' : 'Memproses Kompresi Video...'}
                </h3>
                <p className="text-xs text-[#46577F] dark:text-slate-300 mt-1">
                    {statusMessage}
                </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/80 dark:bg-slate-800 rounded-full h-3.5 overflow-hidden border border-white p-0.5">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-[#176BFF] via-[#20A7FF] to-[#743BFF] transition-all duration-300"
                    style={{
                        width: `${isEngineLoading ? 12 : Math.max(progress, 8)}%`,
                    }}
                />
            </div>

            <div className="flex items-center justify-between text-xs font-semibold text-[#46577F] dark:text-slate-300">
                <span>
                    Resolusi: {videoResolution.width}x{videoResolution.height} (Tetap)
                </span>
                <span>{isEngineLoading ? 'Memuat WASM...' : `${progress}%`}</span>
            </div>
        </div>
    );
}
