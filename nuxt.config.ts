import { defineNuxtConfig } from "nuxt"
// import markdownPlugin from 'vite-plugin-markdown'
import svgLoader from "vite-svg-loader"
import markdown from "@dansvel/vite-plugin-markdown"
import config from "./utils/config"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // @ts-ignore
  build: config.build,
  meta: {
    link: config.meta.link,
    meta: config.meta.meta,
    script: config.meta.script,
  },
  modules: [
    "@nuxtjs/tailwindcss", // https://tailwindcss.nuxtjs.org
    "@pinia/nuxt", // https://pinia.vuejs.org/ssr/nuxt.html
    "@vueuse/nuxt", // https://vueuse.org/guide/
    // 'nuxt-schema-org', // https://github.com/vueuse/schema-org
    "@intlify/nuxt3", // https://github.com/intlify/nuxt3
  ],
  tailwindcss: config.modules.tailwindcss,
  vueuse: config.modules.vueuse,
  intlify: config.modules.intlify,
  // schemaOrg: config.modules.schemaOrg,
  // http://v3.nuxtjs.org/guide/features/runtime-config
  runtimeConfig: {
    ...config.runtimeConfigPrivate,
    public: config.runtimeConfigPublic,
    // apiKey: process.env.API_KEY,
    // public: {
    //   baseUrl: process.env.BASE_URL ?? "http://localhost:3000",
    //   apiUrl: process.env.API_URL ?? "http://app.toolbelt.test",
    // },
  },
  typescript: {
    strict: true, // for pinia
    shim: false, // with Take Over Mode from https://github.com/johnsoncodehk/volar/discussions/471
  },
  // https://v3.nuxtjs.org/api/configuration/nuxt.config#vite
  vite: {
    plugins: [
      // markdownPlugin(),
      markdown({}),
      svgLoader(),
    ],
  },
})
