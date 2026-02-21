import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        open: true,
    },
    build: {
        outDir: 'build',
        // Suppress the 500 kB warning for the Three.js chunk (expected to be large)
        chunkSizeWarningLimit: 800,
        // Skip gzip-size reporting to speed up build output step
        reportCompressedSize: false,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // Three.js + react-three — only needed on the Home page (lazy-loaded WebGL sections).
                    // Splitting it means /blog, /portfolio, /contact etc. never download it.
                    if (
                        id.includes('node_modules/three') ||
                        id.includes('node_modules/@react-three')
                    ) {
                        return 'vendor-three';
                    }
                    // Framer Motion — large animation library, split for independent caching
                    if (id.includes('node_modules/framer-motion')) {
                        return 'vendor-framer';
                    }
                    // PDF Viewer + pdfjs-dist — only needed on /resume
                    if (
                        id.includes('node_modules/@react-pdf-viewer') ||
                        id.includes('node_modules/pdfjs-dist')
                    ) {
                        return 'vendor-pdf';
                    }
                    // React Router
                    if (id.includes('node_modules/react-router')) {
                        return 'vendor-router';
                    }
                },
            },
        },
    },
})
