import { defineStore } from 'pinia'
import { getUserProfile } from '@/api'

// import { useCookies } from '@vueuse/integrations/useCookies';

const { VITE_TOKEN_KEY } = import.meta.env
// const token = useCookies().get(VITE_TOKEN_KEY as string);

interface StoreUser {
  // token: string;
  info: object
  profile: object
  model: string
  hasToken: boolean
  lang: string
  clickTime: string
  unloginUuid: string
  userToken: string
}

export const useUserStore = defineStore('user', {
  state: (): StoreUser => ({
    // token: token,
    info: {} as any,
    profile: {},
    model: '3.5',
    hasToken: false,
    lang: 'en',
    clickTime: '',
    unloginUuid: '',
    userToken: '',
  }),
  getters: {
    getUserInfo(): any {
      return this.info || {}
    },
    getProfile(): any {
      return this.profile || {}
    },
    getModel(): any {
      return this.model
    },
    getToken(): any {
      return this.hasToken
    },
    getLang(): any {
      return this.lang
    },
    getClickTime(): any {
      return this.clickTime
    },
    getUnLoginUserId(): any {
      return this.unloginUuid
    },
    getUserToken(): any {
      return this.userToken
    },
  },
  actions: {
    setInfo(info: any) {
      Object.assign(this.info, info)
      // this.info = info || {}
      // window.localStorage.removeItem('unlogin_uuid')
    },
    setModel(model: any) {
      this.model = model
    },
    setUnloginUserId(userId: any) {
      this.unloginUuid = userId
    },
    setUserToken(token: any) {
      this.userToken = token
    },
    setClickTime(time: any) {
      this.clickTime = time
    },
    removeClickTime() {
      this.clickTime = ''
    },
    reset(): any {
      this.info = {}
      this.profile = {}
      this.hasToken = false
      // window.localStorage.removeItem('unlogin_uuid')
    },
    setProfile() {
      return new Promise((resolve) => {
        // console.log(this.userToken)
        getUserProfile(this.lang, this.userToken ?? '').then((res) => {
          if (res.errCode === 0) {
            // this.reset()
            if (res.payload.user.username)
              this.hasToken = true

            this.profile = res.payload
            // window.localStorage.setItem('user_profile', JSON.stringify(res.payload))
          }
          resolve(res)
        })
      })
    },
    setLang(lang: string) {
      this.lang = lang
    },
    login() {
      // return new Promise((resolve) => {
      //   loginPassword().then((res) => {
      //     this.setInfo(res);
      //     resolve(res);
      //   });
      // });
    },
  },
  persist: true,
})
