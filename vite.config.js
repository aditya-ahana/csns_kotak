import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    plugins: [react()],
    build: {
      outDir: 'build',
    },
    server : {
    //  port : 5173
    //   hmr : {
    //     overlay : false
    //   }
    }
  };
});