import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import formsPlugin from "@tailwindcss/forms";
import prelinePlugin from "preline/plugin";

// https://vite.dev/config/
export default defineConfig({
server: {
    host: '0.0.0.0',
    proxy: {
      // SUA REGRA ANTIGA (para API / axios)
      '/api': {
        target: 'http://localhost:3000',
        rewrite: (path) => path.replace(/^\/api/, ''),
        changeOrigin: true,
      },

      // 👇 ADICIONE ESTA NOVA REGRA (para WebSocket)
      '/ws': {
        target: 'ws://localhost:3001', // O endereço do seu backend WS
        ws: true,                      // MUITO IMPORTANTE: Habilita o proxy para WebSocket
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ws/, ''), // Remove /ws do caminho
      }
    }
  },

  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "serif"],
      },
    },
  },
  variants: {
    extend: {
      rotate: ["hs-accordion-active"],
    },
  },
  content: [
    "node_modules/preline/dist/*.js",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    react(),
    tailwindcss({
      config: {
        plugins: [formsPlugin, prelinePlugin],
      },
    }),
  ],
});
