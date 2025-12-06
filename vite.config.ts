import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/atoms': path.resolve(__dirname, './src/atoms'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/data': path.resolve(__dirname, './src/data'),
      '@/i18n': path.resolve(__dirname, './src/i18n'),
      '@/styles': path.resolve(__dirname, './src/styles'),
    },
  },
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'i18n-vendor': ['i18next', 'react-i18next'],
          'state-vendor': ['jotai'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'jotai', 'three', '@react-three/fiber'],
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
