import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import path from 'path'
const timeStamp = new Date().getTime()
export default ({ mode }) => defineConfig({
  base: '/',
  publicDir: 'public',
  plugins: [
    vue()
  ],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    alias: {
      '@env': path.resolve(__dirname, `./.env.${process.env.NODE_ENV}`),
      '@': path.resolve(__dirname, 'src')
    },
  },
  server: {
    host: "localhost",
    port: 8080,
    // host:'10.10.34.183',
    hmr: true,
    cors: true,
    open: true,
    proxy: {
    }
  },
  build: {
    // assetsDir: 'src/assets',
    outDir: 'dist',
    cssCodeSplit: true,
    sourcemap: false,
    manifest: false,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].${timeStamp}.js`,
        chunkFileNames: `assets/[name].${timeStamp}.js`,
        assetFileNames: `assets/[name].${timeStamp}.[ext]`
      }
    },
    // 打包删除控制台打印
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    }
  },
  lintOnSave: false
})
