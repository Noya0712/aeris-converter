import { useState, useRef, useEffect, useCallback } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

/**
 * Custom Hook untuk menangani kompresi Video (FFmpeg.wasm) dan Foto (Smart High-Clarity Canvas Engine)
 * tanpa batas ukuran file upload dan mempertahankan 100% resolusi asli agar hasil tetap tajam/tidak buram.
 */
export default function useVideoCompressor({ targetSizeMB = 12 } = {}) {
    // Mode: 'video' | 'image'
    const [mediaType, setMediaType] = useState('video');

    // State File & Metadata Media
    const [videoFile, setVideoFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [videoDuration, setVideoDuration] = useState(0);
    const [videoResolution, setVideoResolution] = useState({ width: 0, height: 0 });
    const [calculatedBitrate, setCalculatedBitrate] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    // State Proses
    // Status: 'idle' | 'ready' | 'loading-engine' | 'compressing' | 'completed' | 'error'
    const [status, setStatus] = useState('idle');
    const [progress, setProgress] = useState(0);
    const [statusMessage, setStatusMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [ffmpegLoaded, setFfmpegLoaded] = useState(false);

    // State Hasil Kompresi
    const [compressedUrl, setCompressedUrl] = useState(null);
    const [compressedSizeBytes, setCompressedSizeBytes] = useState(0);
    const [outputExtension, setOutputExtension] = useState('mp4');

    // Refs
    const ffmpegRef = useRef(null);
    const durationRef = useRef(1);
    const fileInputRef = useRef(null);
    const uploadCardRef = useRef(null);

    const ALLOWED_VIDEO_EXTENSIONS = ['mp4', 'mov', 'avi', 'mkv', 'webm', 'm4v'];
    const ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'bmp'];

    // Cleanup Object URLs saat unmount
    useEffect(() => {
        return () => {
            if (videoUrl) URL.revokeObjectURL(videoUrl);
            if (compressedUrl) URL.revokeObjectURL(compressedUrl);
        };
    }, [videoUrl, compressedUrl]);

    // Helper: Format Bytes ke KB (< 1 MB) atau MB (>= 1 MB) secara akurat
    const formatSizeMB = (bytes) => {
        if (!bytes || bytes <= 0) return '0 KB';
        if (bytes < 1024 * 1024) {
            const kb = bytes / 1024;
            return `${kb >= 100 ? Math.round(kb) : kb.toFixed(1)} KB`;
        }
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    // Helper: Format detik ke mm:ss
    const formatDuration = (seconds) => {
        if (!seconds || isNaN(seconds)) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.round(seconds % 60);
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')} (${seconds.toFixed(1)}s)`;
    };

    // Hitung Dynamic Bitrate Video
    const computeDynamicBitrate = useCallback((durationSec, fileSizeBytes = 0) => {
        const dur = Math.max(durationSec, 1);
        const originalSizeMB = fileSizeBytes > 0 ? fileSizeBytes / (1024 * 1024) : 35;

        const adaptiveTargetMB =
            originalSizeMB > 0
                ? Math.min(12, Math.max(originalSizeMB * 0.35, 2.5))
                : 12;

        const audioBitrateKbps = 128;
        let videoBitrateKbps;

        if (dur <= 40) {
            const totalBitrate = Math.floor((adaptiveTargetMB * 8192) / dur);
            videoBitrateKbps = totalBitrate - audioBitrateKbps;
        } else {
            const totalBitrate = Math.floor((12 * 8192) / dur);
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

    // Baca resolusi asli foto (100% naturalWidth x naturalHeight)
    const extractImageMetadata = (file) => {
        return new Promise((resolve, reject) => {
            const tempUrl = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => {
                resolve({
                    width: img.naturalWidth || img.width || 1920,
                    height: img.naturalHeight || img.height || 1080,
                    previewUrl: tempUrl,
                });
            };
            img.onerror = () => {
                URL.revokeObjectURL(tempUrl);
                reject(new Error('Gagal membaca file foto. Pastikan format foto valid (JPG, PNG, WEBP).'));
            };
            img.src = tempUrl;
        });
    };

    // Validasi & Pilih File (Mendukung Video maupun Foto Tanpa Batas Ukuran)
    const handleFileSelect = async (file) => {
        if (!file) return;
        setErrorMessage('');

        const ext = file.name.split('.').pop()?.toLowerCase() || '';
        const isVideo = file.type.startsWith('video/') || ALLOWED_VIDEO_EXTENSIONS.includes(ext);
        const isImage = file.type.startsWith('image/') || ALLOWED_IMAGE_EXTENSIONS.includes(ext);

        if (!isVideo && !isImage) {
            setStatus('error');
            setErrorMessage(
                mediaType === 'image'
                    ? 'Format file tidak didukung. Gunakan format foto JPG, JPEG, PNG, atau WEBP.'
                    : 'Format file tidak didukung. Gunakan format video MP4, MOV, AVI, MKV, atau WEBM.'
            );
            return;
        }

        try {
            if (videoUrl) URL.revokeObjectURL(videoUrl);
            if (compressedUrl) URL.revokeObjectURL(compressedUrl);
            setCompressedUrl(null);
            setCompressedSizeBytes(0);

            if (isImage) {
                setMediaType('image');
                const meta = await extractImageMetadata(file);
                setVideoFile(file);
                setVideoUrl(meta.previewUrl);
                setVideoDuration(0);
                setVideoResolution({ width: meta.width, height: meta.height });
                setCalculatedBitrate(null);
                setOutputExtension(ext === 'png' ? 'png' : ext === 'webp' ? 'webp' : 'jpg');
                setProgress(0);
                setStatus('ready');
                setStatusMessage('Siap dikompresi dengan mempertahankan resolusi & ketajaman foto 100%.');
            } else {
                setMediaType('video');
                const meta = await extractVideoMetadata(file);
                const bitrateKbps = computeDynamicBitrate(meta.duration, file.size);

                durationRef.current = Math.max(meta.duration, 1);
                setVideoFile(file);
                setVideoUrl(meta.previewUrl);
                setVideoDuration(meta.duration);
                setVideoResolution({ width: meta.width, height: meta.height });
                setCalculatedBitrate(bitrateKbps);
                setOutputExtension('mp4');
                setProgress(0);
                setStatus('ready');
                setStatusMessage('Siap dikompresi dengan mempertahankan resolusi & FPS asli.');
            }
        } catch (err) {
            setStatus('error');
            setErrorMessage(err?.message || String(err));
        }
    };

    // Helper: Konversi Canvas ke Blob
    const canvasToBlob = (canvas, mimeType, quality) => {
        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    resolve(blob);
                },
                mimeType,
                quality
            );
        });
    };

    // Deteksi apakah foto PNG/WebP memiliki pixel transparan (alpha < 250)
    const checkCanvasTransparency = (ctx, width, height) => {
        try {
            // Sampling grid cepat agar tetap instan pada foto resolusi 4K/8K
            const sampleW = Math.min(width, 240);
            const sampleH = Math.min(height, 240);
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = sampleW;
            tempCanvas.height = sampleH;
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.drawImage(ctx.canvas, 0, 0, sampleW, sampleH);
            const data = tempCtx.getImageData(0, 0, sampleW, sampleH).data;
            for (let i = 3; i < data.length; i += 4) {
                if (data[i] < 250) {
                    return true;
                }
            }
            return false;
        } catch (_) {
            return false;
        }
    };

    /**
     * Kompresi Foto Berketajaman Tinggi (Smart Perceptual Compression):
     * - 100% mempertahankan resolusi asli (naturalWidth x naturalHeight) tanpa downscale sama sekali,
     *   sehingga foto TIDAK menjadi buram atau pecah.
     * - Menghapus metadata berlebih dan mencari titik kualitas visual tinggi (Q 0.76 - 0.88)
     *   yang menghasilkan ukuran file sekecil mungkin.
     */
    const startImageCompression = async () => {
        if (!videoFile) return;

        try {
            setErrorMessage('');
            setStatus('compressing');
            setProgress(15);
            setStatusMessage('Membaca piksel resolusi asli foto...');

            const img = await new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => resolve(image);
                image.onerror = () => reject(new Error('Gagal memuat gambar untuk diproses.'));
                image.src = videoUrl || URL.createObjectURL(videoFile);
            });

            const width = img.naturalWidth || img.width;
            const height = img.naturalHeight || img.height;

            setProgress(35);
            setStatusMessage(`Merender foto ${width}x${height} pada ketajaman penuh...`);

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);

            const ext = videoFile.name.split('.').pop()?.toLowerCase() || 'jpg';
            const mayHaveAlpha = ext === 'png' || ext === 'webp';
            const hasTransparency = mayHaveAlpha ? checkCanvasTransparency(ctx, width, height) : false;

            setProgress(60);
            setStatusMessage('Mengoptimalkan ukuran file dengan tetap menjaga kejelasan foto...');

            // Daftar kandidat encoding dengan kualitas tinggi (>= 0.75) agar foto tetap tajam & tidak buram,
            // diurutkan untuk mencari ukuran terkecil yang tetap jernih.
            const originalSize = videoFile.size;
            const candidates = [];

            if (hasTransparency) {
                // Jika ada transparansi, gunakan WebP high-clarity yang mendukung alpha channel dengan ukuran jauh lebih kecil dari PNG
                const qualities = [0.86, 0.82, 0.78];
                for (const q of qualities) {
                    const blob = await canvasToBlob(canvas, 'image/webp', q);
                    if (blob && blob.size > 0) {
                        candidates.push({ blob, ext: 'webp', quality: q });
                    }
                }
            } else {
                // Jika foto tidak transparan (JPG/JPEG/PNG foto/WEBP):
                // Uji JPEG & WebP pada kualitas visual tajam (0.85, 0.82, 0.78, 0.75)
                const jpegQualities = [0.85, 0.82, 0.78, 0.75];
                for (const q of jpegQualities) {
                    const blob = await canvasToBlob(canvas, 'image/jpeg', q);
                    if (blob && blob.size > 0) {
                        candidates.push({ blob, ext: 'jpg', quality: q });
                    }
                }

                const webpQualities = [0.84, 0.80, 0.76];
                for (const q of webpQualities) {
                    const blob = await canvasToBlob(canvas, 'image/webp', q);
                    if (blob && blob.size > 0) {
                        candidates.push({ blob, ext: 'webp', quality: q });
                    }
                }
            }

            setProgress(85);

            // Pilih kandidat terbaik:
            // 1. Cari kandidat dengan kualitas tajam (>= 0.78) yang ukurannya <= 45% ukuran asli
            // 2. Jika file asli sudah terkompresi ketat sebelumnya, ambil kandidat terkecil yang tetap tajam (>= 0.75)
            const smallerCandidates = candidates.filter((c) => c.blob.size < originalSize);

            let chosen = null;
            if (smallerCandidates.length > 0) {
                // Prioritaskan format asli (.jpg jika input .jpg/.jpeg) bila ukurannya sudah turun drastis (<= 45% ukuran awal)
                const isInputJpg = ext === 'jpg' || ext === 'jpeg';
                const sharpJpgTargets = smallerCandidates.filter(
                    (c) => c.ext === 'jpg' && c.quality >= 0.78 && c.blob.size <= originalSize * 0.45
                );

                if (isInputJpg && sharpJpgTargets.length > 0) {
                    // Ambil yang paling efisien di rentang kualitas tajam
                    chosen = sharpJpgTargets[sharpJpgTargets.length - 1];
                } else {
                    // Jika ingin sekecil mungkin, ambil kandidat dengan ukuran paling kecil di antara kandidat high-clarity
                    chosen = smallerCandidates.reduce((min, cur) =>
                        cur.blob.size < min.blob.size ? cur : min
                    );
                }
            } else {
                // Jika foto awal sudah sangat kecil sehingga semua re-encode lebih besar, pertahankan file asli
                chosen = {
                    blob: videoFile,
                    ext: ext || 'jpg',
                };
            }

            const outputUrl = URL.createObjectURL(chosen.blob);
            setCompressedSizeBytes(chosen.blob.size);
            setCompressedUrl(outputUrl);
            setOutputExtension(chosen.ext);
            setProgress(100);
            setStatus('completed');
            setStatusMessage('Kompresi foto selesai! Resolusi & ketajaman asli tetap terjaga.');
        } catch (err) {
            setStatus('error');
            setErrorMessage(`Gagal memproses foto: ${err?.message || String(err)}`);
        }
    };

    // Load FFmpeg.wasm Engine Single-Thread Lokal (/public/ffmpeg)
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

    // Eksekusi Kompresi (Video atau Foto sesuai mediaType)
    const startCompression = async () => {
        if (!videoFile) return;

        if (mediaType === 'image') {
            await startImageCompression();
            return;
        }

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
            setOutputExtension('mp4');
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

    // Ganti mode antara Kompres Video & Kompres Foto
    const switchMediaType = (newType) => {
        if (newType === mediaType && status === 'idle') return;
        resetConverter();
        setMediaType(newType);
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

        // Refs
        fileInputRef,
        uploadCardRef,

        // Actions & Helpers
        switchMediaType,
        setIsDragging,
        handleFileSelect,
        startCompression,
        resetConverter,
        handleHeroCtaClick,
        formatSizeMB,
        formatDuration,
    };
}
