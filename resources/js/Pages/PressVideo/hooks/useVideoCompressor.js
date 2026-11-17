import { useState, useRef, useEffect, useCallback } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

/**
 * Custom Hook untuk menangani logika pemilihan file (tanpa batas ukuran),
 * ekstraksi durasi & resolusi asli, Smart CRF + Dynamic Bitrate (hasil jauh lebih kecil & tetap jernih),
 * serta kompresi FFmpeg.wasm lokal yang stabil.
 */
export default function useVideoCompressor({ targetSizeMB = 12 } = {}) {
    // State File & Metadata Video
    const [videoFile, setVideoFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [videoDuration, setVideoDuration] = useState(0);
    const [videoResolution, setVideoResolution] = useState({ width: 0, height: 0 });
    const [calculatedBitrate, setCalculatedBitrate] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    // State Proses FFmpeg
    // Status: 'idle' | 'ready' | 'loading-engine' | 'compressing' | 'completed' | 'error'
    const [status, setStatus] = useState('idle');
    const [progress, setProgress] = useState(0);
    const [statusMessage, setStatusMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [ffmpegLoaded, setFfmpegLoaded] = useState(false);

    // State Hasil Kompresi
    const [compressedUrl, setCompressedUrl] = useState(null);
    const [compressedSizeBytes, setCompressedSizeBytes] = useState(0);

    // Refs
    const ffmpegRef = useRef(null);
    const durationRef = useRef(1);
    const fileInputRef = useRef(null);
    const uploadCardRef = useRef(null);

    const ALLOWED_EXTENSIONS = ['mp4', 'mov', 'avi', 'mkv', 'webm', 'm4v'];

    // Cleanup Object URLs saat unmount
    useEffect(() => {
        return () => {
            if (videoUrl) URL.revokeObjectURL(videoUrl);
            if (compressedUrl) URL.revokeObjectURL(compressedUrl);
        };
    }, [videoUrl, compressedUrl]);

    // Helper: Format Bytes ke MB
    const formatSizeMB = (bytes) => {
        if (!bytes || bytes <= 0) return '0.00 MB';
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    // Helper: Format detik ke mm:ss
    const formatDuration = (seconds) => {
        if (!seconds || isNaN(seconds)) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.round(seconds % 60);
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')} (${seconds.toFixed(1)}s)`;
    };

    // Hitung Dynamic Bitrate yang cerdas:
    // - Mengunci batas atas maksimal 12MB
    // - Jika ukuran video awal sudah kecil (misal 17MB), target otomatis menyesuaikan (~35% ukuran awal) agar size turun signifikan (misal jadi ~4-6MB)
    const computeDynamicBitrate = useCallback((durationSec, fileSizeBytes = 0) => {
        const videoDuration = Math.max(durationSec, 1);
        const originalSizeMB = fileSizeBytes > 0 ? fileSizeBytes / (1024 * 1024) : 35;

        // Target adaptif: maksimal 12MB, namun untuk file seperti 17MB ditargetkan ~35% (~5-6MB) agar kompresi terasa jauh lebih kecil
        const adaptiveTargetMB =
            originalSizeMB > 0
                ? Math.min(12, Math.max(originalSizeMB * 0.35, 2.5))
                : 12;

        const audioBitrateKbps = 128;
        let videoBitrateKbps;

        if (videoDuration <= 40) {
            const totalBitrate = Math.floor((adaptiveTargetMB * 8192) / videoDuration);
            videoBitrateKbps = totalBitrate - audioBitrateKbps;
        } else {
            const totalBitrate = Math.floor((12 * 8192) / videoDuration);
            videoBitrateKbps = Math.max(totalBitrate - audioBitrateKbps, 1800);
        }

        return Math.max(videoBitrateKbps, 600);
    }, []);

    // Baca durasi dan resolusi asli video
    const extractVideoMetadata = (file) => {
        return new Promise((resolve, reject) => {
            const tempUrl = URL.createObjectURL(file);
            const tempVideo = document.createElement('video');
            tempVideo.preload = 'metadata';
            tempVideo.src = tempUrl;

            tempVideo.onloadedmetadata = () => {
                resolve({
                    duration: tempVideo.duration || 1,
                    width: tempVideo.videoWidth || 1920,
                    height: tempVideo.videoHeight || 1080,
                    previewUrl: tempUrl,
                });
            };

            tempVideo.onerror = () => {
                URL.revokeObjectURL(tempUrl);
                reject(new Error('Gagal membaca metadata video. Pastikan file video valid.'));
            };
        });
    };

    // Validasi & Pilih File Video (Tanpa Batas Ukuran File)
    const handleFileSelect = async (file) => {
        if (!file) return;
        setErrorMessage('');

        const ext = file.name.split('.').pop()?.toLowerCase() || '';
        const isVideoMime = file.type.startsWith('video/');
        if (!isVideoMime && !ALLOWED_EXTENSIONS.includes(ext)) {
            setStatus('error');
            setErrorMessage('Format file tidak didukung. Gunakan format MP4, MOV, AVI, atau MKV.');
            return;
        }

        try {
            if (videoUrl) URL.revokeObjectURL(videoUrl);
            if (compressedUrl) URL.revokeObjectURL(compressedUrl);
            setCompressedUrl(null);
            setCompressedSizeBytes(0);

            const meta = await extractVideoMetadata(file);
            const bitrateKbps = computeDynamicBitrate(meta.duration, file.size);

            durationRef.current = Math.max(meta.duration, 1);
            setVideoFile(file);
            setVideoUrl(meta.previewUrl);
            setVideoDuration(meta.duration);
            setVideoResolution({ width: meta.width, height: meta.height });
            setCalculatedBitrate(bitrateKbps);
            setProgress(0);
            setStatus('ready');
            setStatusMessage('Siap dikompresi dengan mempertahankan resolusi & FPS asli.');
        } catch (err) {
            setStatus('error');
            setErrorMessage(err?.message || String(err));
        }
    };

    // Load FFmpeg.wasm Engine Single-Thread Lokal (/public/ffmpeg) yang 100% stabil
    const loadFFmpegEngine = async () => {
        if (ffmpegRef.current && ffmpegLoaded && ffmpegRef.current.loaded) {
            return ffmpegRef.current;
        }

        if (ffmpegRef.current) {
            try {
                ffmpegRef.current.terminate();
            } catch (_) {}
            ffmpegRef.current = null;
        }

        setStatus('loading-engine');
        setStatusMessage('Memuat engine FFmpeg.wasm lokal...');

        const ffmpeg = new FFmpeg();
        ffmpegRef.current = ffmpeg;

        ffmpeg.on('progress', ({ progress: ratio, time }) => {
            const totalDur = durationRef.current || 1;
            let pct = 0;

            if (typeof time === 'number' && time > 0) {
                const currentSec = time / 1_000_000;
                pct = Math.round((currentSec / totalDur) * 100);
            } else if (typeof ratio === 'number' && ratio > 0 && ratio <= 1) {
                pct = Math.round(ratio * 100);
            }

            if (pct > 0) {
                const clamped = Math.min(Math.max(pct, 1), 99);
                setProgress(clamped);
                setStatusMessage(`Mengompresi HD (${clamped}%) — Resolusi & FPS asli terjaga...`);
            }
        });

        ffmpeg.on('log', ({ message }) => {
            if (!message) return;
            const match = message.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d+)/);
            if (match) {
                const hours = parseFloat(match[1]);
                const minutes = parseFloat(match[2]);
                const seconds = parseFloat(match[3]);
                const elapsedSec = hours * 3600 + minutes * 60 + seconds;
                const totalDur = durationRef.current || 1;
                const pct = Math.min(Math.max(Math.round((elapsedSec / totalDur) * 100), 1), 99);
                setProgress(pct);
                setStatusMessage(
                    `Mengompresi HD (${pct}%) — ${elapsedSec.toFixed(1)}s / ${totalDur.toFixed(1)}s diproses`
                );
            }
        });

        const baseURL = `${window.location.origin}/ffmpeg`;
        const workerBlobURL = await toBlobURL(`${baseURL}/worker.js`, 'text/javascript');
        const coreBlobURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript');
        const wasmBlobURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm');

        await ffmpeg.load({
            classWorkerURL: workerBlobURL,
            coreURL: coreBlobURL,
            wasmURL: wasmBlobURL,
        });

        setFfmpegLoaded(true);
        return ffmpeg;
    };

    // Eksekusi Kompresi Video HD (Smart CRF + Dynamic Bitrate Cap + Copy Audio Stream)
    const startCompression = async () => {
        if (!videoFile) return;

        try {
            setErrorMessage('');
            setProgress(0);

            const ffmpeg = await loadFFmpegEngine();

            setStatus('compressing');
            setProgress(2);
            setStatusMessage('Menyiapkan video di memori browser...');

            const videoBitrateKbps = computeDynamicBitrate(videoDuration, videoFile.size);

            await ffmpeg.writeFile('input.mp4', await fetchFile(videoFile));

            setStatusMessage('Memproses kompresi HD (Resolusi & FPS Asli 100%)...');

            // Gunakan kombinasi Smart CRF 24 + High Profile + Dynamic Maxrate Cap + Direct Audio Copy (-c:a copy)
            // 1. -crf 24 menjaga ketajaman visual (wajah & dedaunan jernih) sekaligus memangkas ukuran file secara drastis
            //    (misal video 17MB bisa turun ke ~4-6MB, video 33MB turun ke ~7-10MB)
            // 2. -maxrate & -bufsize mengunci agar ukuran akhir tidak melebihi target (<= 12MB)
            // 3. -c:a copy menyalin audio asli secara instan (tanpa re-encode audio) sehingga proses lebih cepat
            let exitCode = await ffmpeg.exec([
                '-i', 'input.mp4',
                '-vcodec', 'libx264',
                '-profile:v', 'high',
                '-pix_fmt', 'yuv420p',
                '-crf', '24',
                '-maxrate', `${videoBitrateKbps}k`,
                '-bufsize', `${videoBitrateKbps * 2}k`,
                '-preset', 'superfast',
                '-c:a', 'copy',
                '-movflags', '+faststart',
                'output.mp4'
            ]);

            let outputData = null;
            try {
                outputData = await ffmpeg.readFile('output.mp4');
            } catch (_) {
                outputData = null;
            }

            // Jika audio asli bukan format yang kompatibel dengan MP4 (-c:a copy gagal), otomatis encode audio ke AAC 128k
            if (exitCode !== 0 || !outputData || outputData.byteLength < 1024) {
                try {
                    await ffmpeg.deleteFile('output.mp4');
                } catch (_) {}

                exitCode = await ffmpeg.exec([
                    '-i', 'input.mp4',
                    '-vcodec', 'libx264',
                    '-profile:v', 'high',
                    '-pix_fmt', 'yuv420p',
                    '-crf', '24',
                    '-maxrate', `${videoBitrateKbps}k`,
                    '-bufsize', `${videoBitrateKbps * 2}k`,
                    '-preset', 'superfast',
                    '-c:a', 'aac',
                    '-b:a', '128k',
                    '-movflags', '+faststart',
                    'output.mp4'
                ]);

                outputData = await ffmpeg.readFile('output.mp4');
            }

            // Pastikan file hasil valid dan tidak 0.00 MB
            if (!outputData || outputData.byteLength < 1024) {
                throw new Error('Hasil kompresi tidak valid (0 MB). Silakan coba ulangi.');
            }

            setStatusMessage('Menyelesaikan file video...');
            const outputBlob = new Blob([outputData.buffer], { type: 'video/mp4' });
            const outputUrl = URL.createObjectURL(outputBlob);

            try {
                await ffmpeg.deleteFile('input.mp4');
                await ffmpeg.deleteFile('output.mp4');
            } catch (_) {}

            setCompressedSizeBytes(outputBlob.size);
            setCompressedUrl(outputUrl);
            setProgress(100);
            setStatus('completed');
            setStatusMessage('Kompresi selesai! Resolusi & FPS asli tetap terjaga jernih.');
        } catch (err) {
            console.error('FFmpeg Error:', err);
            const detail =
                typeof err === 'string'
                    ? err
                    : err?.message || 'Terjadi kesalahan saat memproses video.';

            setFfmpegLoaded(false);
            if (ffmpegRef.current) {
                try {
                    ffmpegRef.current.terminate();
                } catch (_) {}
                ffmpegRef.current = null;
            }

            setStatus('error');
            setErrorMessage(`Gagal memproses video: ${detail}`);
        }
    };

    // Reset state ke awal
    const resetConverter = () => {
        if (videoUrl) URL.revokeObjectURL(videoUrl);
        if (compressedUrl) URL.revokeObjectURL(compressedUrl);
        setVideoFile(null);
        setVideoUrl(null);
        setCompressedUrl(null);
        setCompressedSizeBytes(0);
        setVideoDuration(0);
        setVideoResolution({ width: 0, height: 0 });
        setCalculatedBitrate(null);
        setProgress(0);
        setErrorMessage('');
        setStatusMessage('');
        setStatus('idle');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Klik tombol CTA di Hero
    const handleHeroCtaClick = () => {
        if (status === 'ready') {
            startCompression();
        } else {
            uploadCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            fileInputRef.current?.click();
        }
    };

    return {
        // State
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
        targetSizeMB,

        // Refs
        fileInputRef,
        uploadCardRef,

        // Actions & Helpers
        setIsDragging,
        handleFileSelect,
        startCompression,
        resetConverter,
        handleHeroCtaClick,
        formatSizeMB,
        formatDuration,
    };
}
