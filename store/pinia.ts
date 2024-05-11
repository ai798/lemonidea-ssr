// plugins/pinia.js
import { useUserStore } from '@/store/user'

export default defineNuxtPlugin(({ $pinia }: any) => {
  return {
    provide: {
      store: useUserStore($pinia),
    },
  }
})
