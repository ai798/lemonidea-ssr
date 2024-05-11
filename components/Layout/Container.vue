<script lang="ts" setup>
interface Props {
  margin?: boolean
  fixed?: boolean
}

withDefaults(defineProps<Props>(), {
  margin: true,
  fixed: false,
})
</script>

<template>
  <div>
    <div class="mx-auto max-w-7xl lg:px-8">
      <div class="relative px-4 sm:px-8 lg:px-12">
        <div class="mx-auto max-w-2xl lg:max-w-5xl">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
