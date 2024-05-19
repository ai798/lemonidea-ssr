import { defineNuxtConfig } from 'nuxt/config'
import { config, head, modules } from './config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  target: 'static',
  app: {
    head: {
      link: head.link,
      meta: head.meta,
      script: head.script,
    },
  },

  css: ['~/assets/css/main.css'],

  extends: [
    '@nuxt-themes/elements', // https://www.npmjs.com/package/@nuxt-themes/elements
    'nuxt-seo-kit', // https://github.com/harlan-zw/nuxt-seo-kit
  ],
  modules: [
    '@element-plus/nuxt',
    '@nuxt/devtools', // https://devtools.nuxtjs.org
    '@nuxtjs/color-mode', // https://color-mode.nuxtjs.org/
    '@nuxt/content', // https://content.nuxtjs.org,
    '@nuxtjs/i18n', // https://i18n.nuxtjs.org
    '@pinia/nuxt', // https://pinia.vuejs.org/ssr/nuxt.html
    '@vueuse/nuxt', // https://vueuse.org/guide/index.html#nuxt
    'unplugin-svg-transformer/nuxt', // https://github.com/kiwilan/unplugin-svg-transformer
    'nuxt-vue3-google-signin',
  ],
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://8.218.221.95:18001',
          changeOrigin: true,
        },
      },
    },
  },
  googleSignIn: {
    clientId: '717982749973-o0cr10k4e5f7so0nb2rp0u2kjeum8278.apps.googleusercontent.com',
  },
  plugins: [
    '~/plugins/animate.ts',
  ],
  experimental: {
    crossOriginPrefetch: true,
  },

  linkChecker: {
    failOn404: false,
  },
  colorMode: modules.colorMode,
  content: modules.content,
  i18n: modules.i18n,
  svgTransformer: modules.svgTransformer,

  runtimeConfig: {
    ...config.private,
    public: config.public,
  },

  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      'tailwindcss': {},
      'autoprefixer': {},
    },
  },

  nitro: {
    prerender: {
      ignore: ['/__pinceau_tokens_config.json', '/__pinceau_tokens_schema.json'],
    },
  },

  typescript: {
    includeWorkspace: true, // https://nuxt.com/docs/api/configuration/nuxt-config#includeworkspace
    // shim: true, // https://nuxt.com/docs/api/configuration/nuxt-config#shim
  },

})
