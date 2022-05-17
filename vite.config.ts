import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';
import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/meta-wall-web/' : './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
  plugins: [vue(), eslintPlugin({ cache: true }), WindiCSS()],
  server: {
    port: 3001,
    host: '0.0.0.0',
    // open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/variables.scss";`,
      },
    },
  },
});
