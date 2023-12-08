import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://localhost:5000', // Your ASP.NET API server address
        changeOrigin: true,
        secure: false, // Set to true if your ASP.NET server uses HTTPS with a self-signed certificate
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@icons': path.resolve(__dirname, 'src/assets/icon'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@services': path.resolve(__dirname, 'src/services'),
      
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@pagestyles': path.resolve(__dirname, 'src/styles/page'),

      '@utils': path.resolve(__dirname, 'src/utils')
    }
  },
})
