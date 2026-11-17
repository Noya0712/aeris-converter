/**
 * Data Fitur & Cara Kerja AERIS (Section 6.3 & 6.5)
 * Mematuhi aturan konten Section 9 (tanpa angka 12MB / 120MB dan tanpa janji tidak realistis).
 */

export const FEATURES_LIST = [
    {
        id: 'flexible-compression',
        title: 'Kompresi Video Fleksibel',
        description:
            'Kurangi ukuran file video dengan pengaturan kompresi yang menyesuaikan karakteristik video Anda.',
        iconName: 'sliders',
    },
    {
        id: 'no-ui-limit',
        title: 'Unggah Video Tanpa Batas UI',
        description:
            'Pilih video dari perangkat tanpa batas ukuran unggahan yang ditetapkan oleh antarmuka AERIS.',
        iconName: 'cloud-upload',
    },
    {
        id: 'adjustable-quality',
        title: 'Kualitas Dapat Disesuaikan',
        description:
            'Atur keseimbangan antara ukuran hasil dan kualitas visual sesuai kebutuhan penggunaan Anda.',
        iconName: 'gem',
    },
    {
        id: 'transparent-progress',
        title: 'Proses dan Progres Transparan',
        description:
            'Pantau status proses kompresi melalui indikator progres dan informasi tahapan yang jelas.',
        iconName: 'activity',
    },
    {
        id: 'speed-by-file',
        title: 'Kecepatan Mengikuti Ukuran File',
        description:
            'Waktu ekspor bergantung pada ukuran, durasi, resolusi, codec, kompleksitas video, serta kemampuan perangkat pemroses.',
        iconName: 'gauge',
    },
    {
        id: 'multi-device',
        title: 'Mudah Digunakan di Berbagai Perangkat',
        description:
            'Antarmuka dirancang responsif agar nyaman digunakan melalui desktop, tablet, maupun ponsel.',
        iconName: 'devices',
    },
];

export const PROCESS_STEPS = [
    {
        step: '01',
        title: 'Pilih Video',
        description: 'Pilih file video dari perangkat Anda.',
        iconName: 'upload',
    },
    {
        step: '02',
        title: 'Atur Kompresi',
        description: 'Sistem menyiapkan parameter sesuai kebutuhan video.',
        iconName: 'sliders',
    },
    {
        step: '03',
        title: 'Proses Video',
        description: 'AERIS memproses file dan menampilkan progres.',
        iconName: 'loader',
    },
    {
        step: '04',
        title: 'Unduh Hasil',
        description: 'Simpan video hasil kompresi ke perangkat.',
        iconName: 'download',
    },
];
