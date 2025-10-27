import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import formsPlugin from '@tailwindcss/forms' 
import prelinePlugin from 'preline/plugin' 

// https://vite.dev/config/
export default defineConfig({
  theme:{
    extend:{
      fontFamily:{
        'inter': ['Inter', 'serif']
      }
    },
  },
  variants: {
    extend: {
        rotate: ['hs-accordion-active'], // Adiciona a variante hs-accordion-active para a propriedade rotate
    },
},
  content: [
    'node_modules/preline/dist/*.js',
    './index.html', 
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    react(),
    tailwindcss({
      config:{
        plugins:[
          formsPlugin,
          prelinePlugin
        ]
      }
    })
  ]
})
