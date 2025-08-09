import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@images': resolve(__dirname, './src/assets/img'),
      '@documents': resolve(__dirname, './src/assets/documents'),
      '@common': resolve(__dirname, './src/common'),
      '@utils': resolve(__dirname, './src/utils'),
      '@hooks': resolve(__dirname, './src/common/hooks'),
      '@icons': resolve(__dirname, './src/common/components/Icons'),
      '@commonComponents': resolve(__dirname, './src/common/components'),
    },
  },
})
