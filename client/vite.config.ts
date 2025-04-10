// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  root:"client",
  build: {
    outDir: '../server/dist', 
    rollupOptions: {
      input: '/index.html'
    }
  }
});
