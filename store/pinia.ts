// plugins/pinia.js
import { createPinia } from 'pinia'
import { useUserStore } from '@/store/user'

export default defineNuxtPlugin(({ $pinia }: any) => {
  return {
    provide: {
      store: useUserStore($pinia),
    },
  }
})
