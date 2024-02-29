import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import 'dotenv/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    // eslint-disable-next-line no-undef
    port: Number(process.env.FRONTEND_PORT) || 3000,
    host: true,
    strictPort: true
  },
})
