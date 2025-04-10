// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  root:"client",
  build: {
    outDir: '../server/dist', 
    rollupOptions: {
      input: 'client/index.html'
    }
  },
  envDir: '..',
});
