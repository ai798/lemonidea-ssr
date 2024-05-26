const runtimeConfigPrivate = {
  discordWebhook: process.env.NUXT_DISCORD_WEBHOOK ?? '',
  githubToken: process.env.NUXT_GITHUB_TOKEN ?? '',
  gitlabToken: process.env.NUXT_GITLAB_TOKEN ?? '',
}
const runtimeConfigPublic = {
  siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  siteName: 'lemonaidea',
  siteDescription: '',
  language: 'en-US',
  titleSeparator: '·',
  titleTemplate: '%pageTitle %titleSeparator %siteName',
  ogImage: '/default.jpg',
  twitterImage: '/default.jpg',
}

export { runtimeConfigPrivate, runtimeConfigPublic }
