// vite.config.js
import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
    base: '',
    plugins: [
        basicSsl()
    ]
})
