/**
 * Data FAQ AERIS (Section 7.3)
 * Mematuhi aturan konten Section 9 & kejujuran implementasi aktual:
 * - Pemrosesan video dilakukan secara lokal di browser perangkat pengguna (FFmpeg.wasm),
 *   file tidak diunggah atau disimpan di server AERIS.
 * - Format yang didukung & diuji: MP4, MOV, AVI, MKV, WEBM.
 */

export const FAQ_ITEMS = [
    {
        id: 'upload-limit',
        question: 'Apakah ada batas ukuran video yang bisa diunggah?',
        answer:
            'AERIS tidak menetapkan batas ukuran unggahan melalui antarmuka. Namun, kemampuan memilih dan memproses file tetap dipengaruhi oleh browser, kapasitas memori perangkat yang Anda gunakan, serta ukuran file video.',
    },
    {
        id: 'duration',
        question: 'Berapa lama proses kompresi video berlangsung?',
        answer:
            'Waktu proses bergantung pada ukuran file, durasi, resolusi, codec, kompleksitas video, dan kemampuan perangkat yang menjalankan browser. File yang lebih besar atau beresolusi tinggi umumnya membutuhkan waktu pemrosesan lebih lama.',
    },
    {
        id: 'quality',
        question: 'Apakah kualitas video akan tetap sama?',
        answer:
            'AERIS dirancang untuk berupaya mempertahankan kualitas visual sebaik mungkin sekaligus menjaga resolusi dan frame rate asli. Namun, kompresi lossy dapat sedikit mengubah detail visual, terutama apabila pengurangan ukuran yang dihasilkan cukup besar.',
    },
    {
        id: 'formats',
        question: 'Format video apa saja yang didukung?',
        answer:
            'Saat ini AERIS mendukung format video populer yang telah diuji pada mesin konversi kami, yaitu MP4, MOV, AVI, MKV, dan WEBM. Dukungan pemutaran pratinjau hasil juga bergantung pada kompatibilitas codec di browser Anda.',
    },
    {
        id: 'mobile',
        question: 'Apakah saya bisa menggunakan AERIS melalui ponsel?',
        answer:
            'Antarmuka AERIS dirancang responsif untuk berbagai ukuran layar, termasuk ponsel dan tablet. Pengalaman serta kecepatan pemrosesan tetap bergantung pada kemampuan browser dan spesifikasi perangkat yang digunakan.',
    },
    {
        id: 'security',
        question: 'Apakah video saya aman?',
        answer:
            'Seluruh proses kompresi pada AERIS berjalan langsung di dalam browser perangkat Anda menggunakan mesin WebAssembly (FFmpeg.wasm). File video Anda tidak dikirim ke server eksternal maupun disimpan di server AERIS.',
    },
    {
        id: 'no-install',
        question: 'Apakah saya perlu memasang aplikasi?',
        answer:
            'Tidak perlu. AERIS berjalan langsung sebagai aplikasi web melalui browser modern yang kompatibel tanpa perlu mengunduh atau memasang aplikasi desktop tambahan.',
    },
    {
        id: 'download',
        question: 'Apakah hasil kompresi bisa langsung diunduh?',
        answer:
            'Ya. Setelah proses kompresi selesai, AERIS menampilkan ringkasan perbandingan ukuran, pratinjau pemutar video, dan tombol unduh untuk langsung menyimpan file hasil ke perangkat Anda.',
    },
];
