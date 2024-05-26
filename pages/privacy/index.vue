<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { getUserPrivacy } from '@/api/index'
import { useUserStore } from '@/store/user'
import { findSEOOptions } from '@/composables/seo'

const route = useRoute()
const canonicalUrl = `https://www.lemonaidea.com${route.fullPath}`

const userStore = useUserStore()

const loading = ref(false)
const content = ref()
loading.value = true
// const headers = useRequestHeaders(["cookie"]);
// const { data: content } = await useFetch('/api/user/privacy', {
//   method: 'get',
//   headers: {
//     'Accept-Language': userStore.getLang,
//   },
// })
// const { data: content } = await useFetch(`http://8.218.221.95:18001/api/user/privacy`, {
//   method: 'GET',
//   headers: {
//     'Accept-Language': userStore.getLang,
//   },
// })
useSeoMeta(findSEOOptions(useRoute().fullPath))
useHead({
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl,
    },
  ],
})

getUserPrivacy(userStore.getLang, userStore.getUserToken)
  .then((res) => {
    content.value = res
  })
  .finally(() => {
    loading.value = false
  })
</script>

<template>
  <div
    :on-load="loading"
    class="content"
    v-html="content"
  />
</template>

<style lang="scss" scoped>
.content {
  height: 100%;
  width: 100%;
  padding: 0;
}
</style>
