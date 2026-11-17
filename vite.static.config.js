import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    publicDir: 'public',
    resolve: {
        alias: {
            '@inertiajs/react': path.resolve(__dirname, 'resources/js/lib/inertiaShim.jsx'),
        },
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
});
