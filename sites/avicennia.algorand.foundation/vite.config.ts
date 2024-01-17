import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
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
      outDir: "./dist-frontend"
    },
    plugins: [react()],
})
