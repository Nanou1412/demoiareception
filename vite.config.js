import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: 'src',
    base: '/',
    
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                demo: resolve(__dirname, 'src/demo.html')
            },
            output: {
                // Nommage des chunks
                chunkFileNames: 'js/[name]-[hash].js',
                entryFileNames: 'js/[name]-[hash].js',
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name.endsWith('.css')) {
                        return 'css/[name]-[hash][extname]';
                    }
                    return 'assets/[name]-[hash][extname]';
                }
            }
        },
        // Seuil d'avertissement pour la taille des chunks
        chunkSizeWarningLimit: 500
    },
    
    // Configuration du serveur de développement
    server: {
        port: 5173,
        open: true,
        proxy: {
            // Proxy les appels API vers le serveur Node.js
            '/.netlify/functions': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    },
    
    // Configuration du preview
    preview: {
        port: 4173
    },
    
    // Optimisations
    optimizeDeps: {
        include: []
    },
    
    // CSS
    css: {
        devSourcemap: true
    },
    
    // Résolution des chemins
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@core': resolve(__dirname, 'src/js/core'),
            '@services': resolve(__dirname, 'src/js/services'),
            '@ui': resolve(__dirname, 'src/js/ui'),
            '@industries': resolve(__dirname, 'src/industries')
        }
    }
});
