import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import { config } from 'dotenv';

// config();

export default defineConfig(() => {
  return {
    // define:{
    //  'process.env': process.env
    // },
    // esbuild: {
    //   loader: 'jsx',
    // },
    // optimizeDeps: {
    //   esbuildOptions: {
    //     loader: {
    //       '.js': 'jsx',
    //     },
    //   },
    // },
    plugins: [react()],
    build: {
      outDir: 'build',
    },
    server : {
    //  port : 5173
    //   hmr : {
    //     overlay : false
    //   }
    },
    test: {
      deps: {
        inline: ['vitest-canvas-mock'],
      },
      threads: false,
      globals : true,
      setupFiles: ["src/Mocks/VitestSetup.js"],
      environment: 'jsdom',
      testTimeout : 2000,
      css : true,
      coverage: {
        reporter: ['lcov', 'text'],
      },
    },
    resolve: {
      alias: [{ find: '@/', replacement: fileURLToPath(new URL('./', import.meta.url))}]
        },
  };
});