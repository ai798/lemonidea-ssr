<script lang="ts" setup>
// import '@element-plus/nuxt/dist/index.css'
// const route = useRoute()
// const router = useRouter()
// const { params } = useRoute()
// const lang = (params as any).slug as string
// const { documents } = await useMarkdown('articles')
// const { t } = useI18n()
// watch(
//   () => lang,
//   (val) => {
//     console.log(route.fullPath, 'route.fullPath')
//     if (val.slice(-1) === '/') {
//       console.log(val.slice(-1) === '/', 'route.fullPath.slice(-1) === "/"')
//       router.push(val.slice(0, -1))
//     }
//   },
//   {
//     immediate: true,
//   },
// )
useSeoMeta({
  // title: t('head.home'),
})
</script>

<template>
  <div>
    <HomeMainPage />
  </div>
</template>
