import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, '../server/dist'),
  },
  root: path.resolve(__dirname,''),
  envDir: path.resolve(__dirname,'..'), 
});
