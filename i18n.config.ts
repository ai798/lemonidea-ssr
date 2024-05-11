// Disabled cause of https://github.com/nuxt-modules/i18n/issues/2000
// From "@nuxtjs/i18n": "8.0.0-beta.11",
// To "@nuxtjs/i18n": "8.0.0-beta.8"

import type { LocaleMessage } from '@intlify/core-base'
import type { I18nOptions } from '@nuxtjs/i18n'

export default defineI18nConfig(async (): Promise<I18nOptions> => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    'en': await loadLocale('en'),
    'zh-tw': await loadLocale('zh-tw'),
    'ja': await loadLocale('ja'),
    'th': await loadLocale('th'),
    'ma': await loadLocale('ma'),
  },
}))

async function loadLocale(locale: string): Promise<LocaleMessage> {
  return await import(`./config/locales/${locale}.json`).then(module => module.default)
  // return {
  //   welcome: 'Welcome',
  // }
}
