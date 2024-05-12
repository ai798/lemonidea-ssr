// composables/useHttp.ts
import { useContext } from '@nuxtjs/composition-api'
import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const Cookies = useCookie('user', {
  maxAge: 1000 * 60,
})
const UnloginUuid = useCookie('UnloginUuid')
const { app } = useContext()

// 创建axios实例
const service = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // console.log('userStore', pinia.asyncData)
    // const getToken = window.localStorage.getItem('user_token')
    console.log(document.cookie)
    const getToken = Cookies.value
    console.log(Cookies, 'getToken')
    if (getToken)
      config!.headers!.Authorization = unref(`Bearer ${getToken}`) ?? ''
    else
    // config!.headers.uuid = window.localStorage.getItem('unlogin_uuid')
      config!.headers.uuid = UnloginUuid.value

    config!.headers.timezone = new Date().getTimezoneOffset() / 60
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    // if (response.headers.uuid) {
    //   const unloginUUid = response.headers.uuid === 'None' ? '' : response.headers.uuid
    //   // localStorage.setItem('unlogin_uuid', unloginUUid)
    //   UnloginUuid.value = unloginUUid
    // }
    if (response.status !== 200) {
      ElMessage(res.msg)
      return Promise.reject(res.msg || 'Error')
    }
    else if (res.errCode === 2030) {
      // route.push('/login')
      return Promise.reject(res.msg || 'Error')
    }
    else {
      return Promise.resolve(res)
    }
  },
  (error: AxiosError) => {
    console.log(`err${error}`)
    ElMessage(error.message)
    return Promise.reject(error.message)
  },
)
export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config)
  },

  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config)
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config)
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config)
  },
}

export default service
