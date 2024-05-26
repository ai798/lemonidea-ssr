import type { Link, Meta, Script } from '@unhead/schema'

// const { locale } = useI18n()
const link: Link<any['link']>[] = [
  {
    rel: 'alternate',
    hreflang: 'x-default',
    href: 'https://lemonaidea.com/',
  },
  {
    rel: 'alternate',
    hreflang: 'ja',
    href: 'https://lemonaidea.com/ja/',
  },
  {
    rel: 'alternate',
    hreflang: 'en',
    href: 'https://lemonaidea.com/',
  },
  {
    rel: 'alternate',
    hreflang: 'zh-tw',
    href: 'https://lemonaidea.com/zh-tw/',
  },
  {
    rel: 'alternate',
    hreflang: 'th',
    href: 'https://lemonaidea.com/th/',
  },
  {
    rel: 'lemon2',
    sizes: '180x180',
    href: '/lemon2.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/lemon2.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/lemon2.png',
  },
  {
    rel: 'manifest',
    href: '/site.webmanifest',
  },
]
const meta: Meta<any['link']>[] = [
  {
    hid: 'robots',
    name: 'robots',
    content: 'index,follow',
  },
  { name: 'msapplication-TileColor', content: '#9333EA' },
  {
    name: 'theme-color',
    content: '#9333EA',
  },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  {
    hid: 'author',
    name: 'author',
    content: 'lemonaidea',
  },
  {
    hid: 'language',
    name: 'language',
    content: 'en-US',
  },
  {
    hid: 'designer',
    name: 'designer',
    content: 'lemonaidea',
  },
  {
    hid: 'publisher',
    name: 'publisher',
    content: 'lemonaidea',
  },
  {
    hid: 'copyright',
    name: 'copyright',
    content: 'lemonaidea',
  },
  {
    hid: 'og:site_name',
    property: 'og:site_name',
    content: 'lemonaidea',
  },
  {
    hid: 'og:locale',
    property: 'og:locale',
    content: 'en-US',
  },
  {
    hid: 'twitter:site',
    name: 'twitter:site',
    content: '@ewilanriviere',
  },
  {
    hid: 'twitter:creator',
    name: 'twitter:creator',
    content: '@ewilanriviere',
  },
  {
    hid: 'google-site-verification',
    name: 'google-site-verification',
    content: process.env.GOOGLE_SITE_TOKEN,
  },
  {
    hid: 'og:type',
    property: 'og:type',
    content: 'website',
  },
  {
    hid: 'og:url',
    property: 'og:url',
    content: process.env.NUXT_PUBLIC_SITE_URL,
  },
  {
    hid: 'og:image:alt',
    property: 'og:image:alt',
    content: 'lemonaidea',
  },
  {
    hid: 'twitter:card',
    name: 'twitter:card',
    content: 'summary_large_image',
  },
  {
    hid: 'og:image',
    property: 'og:image',
    content: `${process.env.NUXT_PUBLIC_SITE_URL}/default.jpg`,
  },
  {
    hid: 'twitter:image',
    name: 'twitter:image',
    content: `${process.env.NUXT_PUBLIC_SITE_URL}/default.jpg`,
  },
]
const script: Script<any['script']>[] = [
  {
    'src': process.env.UMAMI_URL,
    'async': true,
    'data-website-id': process.env.UMAMI_ID ?? '',
  },
  // {
  //   src: '/color-scheme.js',
  // },
]

export default { link, meta, script }
