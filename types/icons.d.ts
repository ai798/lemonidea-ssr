/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-svg-transformer
export {};

declare global {
  export type SvgName = 'arrow-up' | 'bag' | 'check' | 'chevron-right' | 'download' | 'feature/code' | 'feature/documentation' | 'feature/experiments' | 'feature/file-upload' | 'feature/framework' | 'feature/open-book' | 'feature/seo' | 'feature/server' | 'feature/settings' | 'feature/web-design' | 'feature/web-programming' | 'heart' | 'history/developer-designer-of-applications' | 'history/freelance' | 'history/manager-of-digital-and-data-solutions' | 'history/poec-java' | 'history/psychology-bachelor' | 'history/useweb' | 'history/web-and-mobile-developer' | 'hobbies/develop' | 'hobbies/paint' | 'hobbies/podcasts' | 'hobbies/read' | 'hobbies/role-play' | 'hobbies/tv-shows' | 'hobbies/video-games' | 'locale' | 'logo/classic' | 'logo/text' | 'menu' | 'moon' | 'open-source' | 'server' | 'settings' | 'social/github' | 'social/gitlab' | 'social/instagram' | 'social/linkedin' | 'social/stackoverflow' | 'social/twitter' | 'star' | 'statistics/education' | 'statistics/experience' | 'statistics/projects' | 'sun' | 'technology/alpinejs' | 'technology/backpack' | 'technology/bash' | 'technology/bootstrap' | 'technology/bun-sh' | 'technology/coreui' | 'technology/dart' | 'technology/docker' | 'technology/fastify' | 'technology/flutter' | 'technology/git' | 'technology/inertiajs' | 'technology/java' | 'technology/javascript' | 'technology/laravel' | 'technology/latex' | 'technology/linux' | 'technology/livewire' | 'technology/markdoc' | 'technology/markdown' | 'technology/meilisearch' | 'technology/mysql' | 'technology/nginx' | 'technology/node-js' | 'technology/nuxt-js' | 'technology/pest' | 'technology/php' | 'technology/sass' | 'technology/strapi' | 'technology/tailwind-css' | 'technology/typescript' | 'technology/vite' | 'technology/vitest' | 'technology/vue-js' | 'default'
  interface Window {
    ust: {
      options: { cacheDir?: string, global: boolean, libraryDir?: string, svgDir?: string, useTypes: boolean, isTesting: boolean, isNuxt: boolean, nuxtDir: string, fallback: string, svg: { classDefault?: string[], clearSize: 'all' | 'parent' | 'none', clearClass: 'all' | 'parent' | 'none', clearStyle: 'all' | 'parent' | 'none', currentColor: boolean, inlineStyleDefault?: string[], sizeInherit: boolean, title?: boolean }, warning: boolean }
      svgList: Record<SvgName, () => Promise<{ default: string }>>
      importSvg: (name: SvgName) => Promise<string>
    }
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    SvgIcon: typeof import('unplugin-svg-transformer/dist/vue')['SvgIcon']
  }
}
