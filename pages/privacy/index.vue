<script lang="ts" setup>
import { getUserPrivacy } from '@/api/index'
import { useUserStore } from '@/store/user'

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

getUserPrivacy(userStore.getLang)
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
