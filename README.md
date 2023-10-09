# Portfolio

![banner](https://raw.githubusercontent.com/ewilan-riviere/portfolio/main/public/portfolio.jpg)

[![Nuxt][nuxt-version-src]][nuxt-version-href]
[![Tailwind CSS][tailwind-version-src]][tailwind-version-href]
[![Content][content-version-src]][content-version-href]
[![i18n][i18n-version-src]][i18n-version-href]

[![tests][tests-src]][tests-href]
[![license][license-src]][license-href]

Ewilan Rivière's portfolio, [Nuxt 3](https://nuxt.com/) SSR app with [content](https://content.nuxt.com/) and [i18n](https://i18n.nuxtjs.org/).

Available at [ewilan-riviere.com](https://ewilan-riviere.com).

## Installation

This is a [Nuxt 3](https://nuxt.com/) project.

Download dependencies:

```bash
pnpm i
```

Start the development server:

```bash
pnpm dev
```

### Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

Use [NGINX](https://www.nginx.com/) and [pm2](https://pm2.keymetrics.io/) to run the production build with SSR.

### Resume size

To reduce the size of the resume, you can use `ps2pdf` to convert the PDF to a smaller size.

```bash
sudo apt-get install ghostscript
ps2pdf resume.pdf resume-ps2pdf.pdf
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## License

[MIT License](./LICENSE)

[nuxt-version-src]: https://img.shields.io/badge/dynamic/json?label=Nuxt&query=dependencies['nuxt']&url=https://raw.githubusercontent.com/ewilan-riviere/portfolio/main/package.json&message=v3&color=28cf8d&logo=nuxt.js&logoColor=ffffff&labelColor=18181b
[nuxt-version-href]: https://nuxt.com
[tailwind-version-src]: https://img.shields.io/badge/dynamic/json?label=Tailwind%20CSS&query=dependencies['tailwindcss']&url=https://raw.githubusercontent.com/ewilan-riviere/portfolio/main/package.json&message=v3&color=28cf8d&labelColor=18181b
[tailwind-version-href]: https://tailwindcss.com/
[content-version-src]: https://img.shields.io/badge/dynamic/json?label=@nuxt/content&query=dependencies['@nuxt/content']&url=https://raw.githubusercontent.com/ewilan-riviere/portfolio/main/package.json&message=v3&color=28cf8d&labelColor=18181b
[content-version-href]: https://content.nuxtjs.org/
[i18n-version-src]: https://img.shields.io/badge/dynamic/json?label=@nuxtjs/i18n&query=dependencies['@nuxtjs/i18n']&url=https://raw.githubusercontent.com/ewilan-riviere/portfolio/main/package.json&message=v3&color=28cf8d&labelColor=18181b
[i18n-version-href]: https://v8.i18n.nuxtjs.org/
[tests-src]: https://img.shields.io/github/actions/workflow/status/ewilan-riviere/portfolio/ci.yml?branch=main&label=tests&style=flat-square&colorA=18181B
[tests-href]: https://github.com/ewilan-riviere/portfolio/actions/workflows/ci.yml
[license-src]: https://img.shields.io/github/license/ewilan-riviere/portfolio.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://github.com/ewilan-riviere/portfolio/blob/main/LICENSE
