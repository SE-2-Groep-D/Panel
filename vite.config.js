import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import autoprefixer from 'autoprefixer'

export default defineConfig({
  build: {
    define: {
      'process.env': {},
    },
  },
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          browsers: ['last 8 versions'],
        }) 
      ],
    }
  },
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
      '@api': path.resolve(__dirname, 'src/api'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@pagestyles': path.resolve(__dirname, 'src/styles/page'),

      '@utils': path.resolve(__dirname, 'src/utils')
    }
  },
})