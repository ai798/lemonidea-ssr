<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const canonicalUrl = `https://www.lemonaidea.com${route.fullPath}`
useSeoMeta(findSEOOptions(useRoute().fullPath))
useHead({
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl,
    },
  ],
})
</script>

<template>
  <LayoutHeader />
  <Content />
</template>

<style lang="scss" scoped>
</style>
