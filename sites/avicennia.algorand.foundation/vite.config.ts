import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'
// https://vitejs.dev/config/

console.log(resolve(__dirname, 'src/frontend/pages/home/index.html'))
export default defineConfig({
    server: {
      proxy: {
        // string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
        '^/attestation|^/connect|^/assertion|^/auth|^/socket.io|^/\.well-known': {
          target: 'http://192.168.101.172:3000',
          changeOrigin: true,
          rewrite: (path) => {
            console.log(path)
            return path
          },
        },
      }
    },
    build:{
      outDir: "./dist-frontend",
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          dashboard: resolve(__dirname, 'dashboard/index.html'),
        },
      },
    },
    plugins: [react()],
})
