import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: '/',
    build: {
        rollupOptions: {
        input: {
            main: resolve(__dirname, 'index.html'),
            detalles: resolve(__dirname, 'src/pages/detalles.html'),
            favoritos: resolve(__dirname, 'src/pages/favorites.html'),
        }
        }
    }
});