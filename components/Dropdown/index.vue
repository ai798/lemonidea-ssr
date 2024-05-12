<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'
import { useUserStore } from '@/store/user'

const { locale, setLocale } = useI18n()

const userStore = useUserStore()
const langs = ['English', 'ภาษาไทย', '日本語', '繁體中文', 'Malay']
const languagesArray = ref([
  { type: 'ja', name: '日本語' },
  { type: 'en', name: 'English' },
  { type: 'th', name: 'ภาษาไทย' },
  { type: 'zh-tw', name: '繁體中文' },
  { type: 'ma', name: 'Malay' },
])
const currentLang = computed(() => {
  return languagesArray.value.find((item: any) => item.type === locale.value)
    ?.name
})
const visiable = ref(false)
function dropdownHandler() {
  visiable.value = false
}
function handleChangeLocal(lang: any) {
  let locals: any = ''
  if (lang === langs[0])
    locals = 'en'
  else if (lang === langs[1])
    locals = 'th'
  else if (lang === langs[2])
    locals = 'ja'
  else if (lang === langs[3])
    locals = 'zh-tw'
  else if (lang === langs[4])
    locals = 'ma'

  setLocale(locals)
  userStore.setLang(locals)
  locale.value = locals
  visiable.value = false
  localStorage.setItem('lemon_web_lang', lang)
}
</script>

<template>
  <ClientOnly>
    <div class="relative-dropdownbox">
      <div class="inline-flex items-center overflow-hidden rounded-md">
        <button
          class="h-full cursor-pointer border-0 bg-white p-2 text-gray-600"
          dark="bg-transparent hover:bg-gray-500"
          :class="visiable ? 'bg-gray-200 bg-gray-500' : ''"
          @click.stop="visiable = !visiable"
        >
          <p>{{ currentLang }}</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <Transition
        name="fade"
        mode="out-in"
      >
        <div
          v-if="visiable"
          v-on-click-outside.bubble="dropdownHandler"
          dark="bg-gray-500"
          class="absolute end-0 z-10 mt-2 rounded-md bg-white shadow-lg divide-y divide-gray-100"
        >
          <div class="options">
            <span
              v-for="(item, index) of languagesArray"
              :key="index"
              :class="
                locale === item.type
                  ? 'bg-gray-100 text-gray-800 dark:bg-gray-400'
                  : ''
              "
              class="block cursor-pointer rounded-lg px-4 py-2 text-sm text-gray-500"
              dark="text-light-500"
              @click="handleChangeLocal(item.name)"
            >
              {{ item.name }}
            </span>

            <!-- <NuxtLink
              v-for="(item, index) of languagesArray"
              :key="index"
              :to="switchLocalePath(item.type)"
              :class="
                locale === item.type
                  ? 'bg-gray-100 text-gray-800 dark:bg-gray-400'
                  : ''
              "
              class="block cursor-pointer rounded-lg px-4 py-2 text-sm text-gray-500"
              dark="text-light-500"
              @click="handleChangeLocal(item.type)"
            >
              {{ item.name }}
            </NuxtLink> -->
          </div>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.relative-dropdownbox {
  position: relative;
  .h-full {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 103px;
    height: 40px;
    border-radius: 29px;
    border: 1px #e0e2da solid;
    justify-content: center;
    p {
      font-family: Poppins;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
    }
  }
  .h-4,
  .w-4 {
    width: 1rem;
    height: 1rem;
  }
  .options {
    width: 108px;
    top: 64px;
    left: 1258px;
    padding: 8px;
    border-radius: 6px;
  }
  .dark [dark~="hover:bg-gray-500"]:hover,
  .hover\:bg-gray-500:hover,
  .bg-gray-500,
  .dark .dark\:bg-gray-500 {
    background-color: #fff !important;
  }
}
</style>

<style lang="scss">
.bg-gray-500,
.dark .dark\:bg-gray-500,
.dark [dark~="bg-gray-500"] {
  background-color: #fff;
  overflow: hidden;
}
.dark [dark~="text-light-500"],
.text-light-500 {
  color: #1d2331;
  text-overflow: ellipsis;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
}
.dark .\.dark\:bg-gray-400,
.dark .dark\:bg-gray-400 {
  border-radius: 3px;
  background: #e9edf5;
}
.text-gray-500:hover {
  border-radius: 3px;
  background: #f3f3f3;
}
.dark [dark~="hover:bg-gray-500"]:hover,
.hover\:bg-gray-500:hover {
  background-color: #fff;
}
</style>
