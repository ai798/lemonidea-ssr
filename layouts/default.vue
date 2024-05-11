<script lang="ts" setup>
const isDev = computed(() => import.meta.env.DEV)
</script>

<template>
  <div class="main">
    <slot />
  </div>
</template>

<style lang="scss">
.main {
  height: 100%;
}
</style>
