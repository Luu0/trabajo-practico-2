import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/', // Esto es importante para producción (Vercel) para que las rutas funcionen bien
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