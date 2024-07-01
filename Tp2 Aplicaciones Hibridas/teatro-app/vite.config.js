import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['swiper'],
  },
  css: {
    modules: {
      // Agrega una entrada específica para los estilos de Swiper aquí
      './src/assets/swiper-bundle.min.css': [],
    },
  },
});
