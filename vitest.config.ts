import path from 'node:path'
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        // {
        //   '#imports': [
        //     'useNuxtApp',
        //     'useBaseFetch',
        //     'useRuntimeConfig',
        //     'useState',
        //     'useLazyAsyncData',
        //     'useLocalisationOptions',
        //     'useFavoriteLocalisation',
        //     'useInputValidation',
        //   ],
        // },
      ],
    }),
    Components({
      dirs: ['./components'],
      resolvers: [ElementPlusResolver()],
      directoryAsNamespace: true,
    }),
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
    },
    deps: {
      inline: [/@nuxt\/test-utils-edge/],
    },
  },
  root: '.',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '~': path.resolve(__dirname, './'),
      '#imports': path.resolve(__dirname, './.nuxt/imports.d.ts'),
      '#app': path.resolve(
        __dirname,
        './node_modules/nuxt/dist/app/index.d.ts',
      ),
      '#head': path.resolve(
        __dirname,
        './node_modules/nuxt/dist/app/index.d.ts',
      ),
    },
  },
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://8.218.221.95:18001',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req, res, options) => {
            // proxyReq.setHeader('cookie', cookie);
          })
        },
      },
    },
  },
})
