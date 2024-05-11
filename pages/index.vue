<script lang="ts" setup>
// import '@element-plus/nuxt/dist/index.css'

// const { documents } = await useMarkdown('articles')
const { t } = useI18n()

useSeoMeta({
  // title: t('head.home'),
})
</script>

<template>
  <div>
    <HomeMainPage />
  </div>
</template>
