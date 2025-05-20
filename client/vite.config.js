import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss() ],
  //se agrega para generar imagen docker
  //Se define puerto 
  preview:{
    host:true,
    port:8087
  }
})
